import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import {
  type FunctionEvent,
  type FunctionResponse,
  functionResponseToResponse,
  jsonResponse,
  methodNotAllowed,
  requestToFunctionEvent,
} from './_shared/http.mts';
import {
  PaymentConfigurationError,
  PaymentValidationError,
  loadDownloadConfig,
  verifyEntitlementToken,
} from './_shared/payments.mts';
import { createStripeClient, retrieveFulfilledSession } from './_shared/stripe-fulfillment.mts';

const PDF_PATH = resolve(process.cwd(), 'output', 'pdf', 'the-village-kit.pdf');
let pdfPromise: Promise<Buffer> | undefined;

async function villageKitPdf(): Promise<Buffer> {
  pdfPromise ??= readFile(PDF_PATH).then((file) => {
    if (file.byteLength === 0 || file.subarray(0, 5).toString('ascii') !== '%PDF-') {
      throw new Error('The Village Kit artifact is not a valid PDF.');
    }
    return file;
  });
  return pdfPromise;
}

export async function handler(event: FunctionEvent): Promise<FunctionResponse> {
  if (event.httpMethod !== 'GET') {
    return methodNotAllowed(['GET']);
  }

  try {
    const config = loadDownloadConfig();
    const entitlement = verifyEntitlementToken(
      event.queryStringParameters?.token,
      config.tokenSecret
    );

    const stripe = createStripeClient(config);
    await retrieveFulfilledSession(stripe, config, entitlement.sid);
    const pdf = await villageKitPdf();

    return {
      statusCode: 200,
      headers: {
        'Cache-Control': 'private, no-store, max-age=0',
        'Content-Disposition': 'attachment; filename="the-village-kit.pdf"',
        'Content-Length': String(pdf.byteLength),
        'Content-Security-Policy': "default-src 'none'; sandbox",
        'Content-Type': 'application/pdf',
        'Referrer-Policy': 'no-referrer',
        'X-Content-Type-Options': 'nosniff',
        'X-Robots-Tag': 'noindex, noarchive',
      },
      body: pdf.toString('base64'),
      isBase64Encoded: true,
    };
  } catch (error) {
    if (error instanceof PaymentConfigurationError) {
      return jsonResponse(503, {
        error: 'Download is temporarily unavailable. Please try again later.',
      });
    }
    if (error instanceof PaymentValidationError) {
      return jsonResponse(403, { error: 'Download access could not be verified.' });
    }
    return jsonResponse(503, {
      error: 'Download is temporarily unavailable. Please try again later.',
    });
  }
}

export default async function netlifyHandler(request: Request): Promise<Response> {
  return functionResponseToResponse(await handler(await requestToFunctionEvent(request)));
}

export const config = {
  path: '/api/download/village-kit',
  method: 'GET',
};
