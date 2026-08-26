export interface FunctionEvent {
  body: string | null;
  headers: Record<string, string | undefined>;
  httpMethod: string;
  isBase64Encoded?: boolean;
  queryStringParameters?: Record<string, string | undefined> | null;
}

export interface FunctionResponse {
  statusCode: number;
  headers?: Record<string, string>;
  body: string;
  isBase64Encoded?: boolean;
}

export async function requestToFunctionEvent(request: Request): Promise<FunctionEvent> {
  const bodyBuffer = Buffer.from(await request.arrayBuffer());
  const headers: Record<string, string> = {};
  request.headers.forEach((value, key) => {
    headers[key] = value;
  });

  const url = new URL(request.url);
  const queryStringParameters: Record<string, string> = {};
  url.searchParams.forEach((value, key) => {
    queryStringParameters[key] = value;
  });

  return {
    body: bodyBuffer.byteLength > 0 ? bodyBuffer.toString('base64') : null,
    headers,
    httpMethod: request.method,
    isBase64Encoded: bodyBuffer.byteLength > 0,
    queryStringParameters,
  };
}

export function functionResponseToResponse(response: FunctionResponse): Response {
  const body = response.isBase64Encoded
    ? new Uint8Array(Buffer.from(response.body, 'base64'))
    : response.body;

  return new Response(body, {
    status: response.statusCode,
    headers: response.headers,
  });
}

export class HttpError extends Error {
  readonly statusCode: number;

  constructor(statusCode: number, message: string) {
    super(message);
    this.name = 'HttpError';
    this.statusCode = statusCode;
  }
}

const BASE_HEADERS = {
  'Cache-Control': 'no-store',
  'Content-Type': 'application/json; charset=utf-8',
  'X-Content-Type-Options': 'nosniff',
} as const;

export function getHeader(
  headers: Record<string, string | undefined>,
  name: string
): string | undefined {
  const target = name.toLowerCase();

  for (const [key, value] of Object.entries(headers)) {
    if (key.toLowerCase() === target) {
      return value;
    }
  }

  return undefined;
}

export function jsonResponse(
  statusCode: number,
  payload: Readonly<Record<string, unknown>>,
  headers: Record<string, string> = {}
): FunctionResponse {
  return {
    statusCode,
    headers: { ...BASE_HEADERS, ...headers },
    body: JSON.stringify(payload),
  };
}

export function methodNotAllowed(allowed: readonly string[]): FunctionResponse {
  return jsonResponse(405, { error: 'Method not allowed.' }, { Allow: allowed.join(', ') });
}

export function decodeRawBody(
  event: Pick<FunctionEvent, 'body' | 'isBase64Encoded'>,
  maxBytes: number
): Buffer {
  if (event.body === null || event.body === '') {
    throw new HttpError(400, 'Request body is required.');
  }

  const body = event.isBase64Encoded
    ? Buffer.from(event.body, 'base64')
    : Buffer.from(event.body, 'utf8');

  if (body.byteLength > maxBytes) {
    throw new HttpError(413, 'Request body is too large.');
  }

  return body;
}

export function parseJsonBody(
  event: Pick<FunctionEvent, 'body' | 'headers' | 'isBase64Encoded'>,
  maxBytes = 8_192
): unknown {
  const contentType = getHeader(event.headers, 'content-type')
    ?.split(';', 1)[0]
    ?.trim()
    .toLowerCase();

  if (contentType !== 'application/json') {
    throw new HttpError(415, 'Content-Type must be application/json.');
  }

  const body = decodeRawBody(event, maxBytes);

  try {
    return JSON.parse(body.toString('utf8'));
  } catch {
    throw new HttpError(400, 'Request body must be valid JSON.');
  }
}

export function assertTrustedOrigin(
  event: Pick<FunctionEvent, 'headers'>,
  allowedOrigins: readonly string[]
): void {
  const rawOrigin = getHeader(event.headers, 'origin');

  if (!rawOrigin) {
    throw new HttpError(403, 'Request origin could not be verified.');
  }

  let origin: string;

  try {
    const parsed = new URL(rawOrigin);
    if (
      parsed.pathname !== '/' ||
      parsed.search !== '' ||
      parsed.hash !== '' ||
      parsed.username !== '' ||
      parsed.password !== ''
    ) {
      throw new Error('Origin contains unexpected URL components.');
    }
    origin = parsed.origin;
  } catch {
    throw new HttpError(403, 'Request origin could not be verified.');
  }

  if (!allowedOrigins.includes(origin)) {
    throw new HttpError(403, 'Request origin could not be verified.');
  }

  const fetchSite = getHeader(event.headers, 'sec-fetch-site')?.toLowerCase();
  if (fetchSite && fetchSite !== 'same-origin' && fetchSite !== 'none') {
    throw new HttpError(403, 'Request origin could not be verified.');
  }
}

export function publicErrorResponse(error: unknown, fallbackMessage: string): FunctionResponse {
  if (error instanceof HttpError) {
    return jsonResponse(error.statusCode, { error: error.message });
  }

  return jsonResponse(500, { error: fallbackMessage });
}
