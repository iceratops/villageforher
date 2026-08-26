'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import Script from 'next/script';
import { Suspense, useEffect, useRef } from 'react';

const configuredMeasurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID?.trim();
const GA_MEASUREMENT_ID =
  configuredMeasurementId && /^G-[A-Z0-9]+$/i.test(configuredMeasurementId)
    ? configuredMeasurementId
    : undefined;

const UTM_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'] as const;
const UTM_SESSION_KEY = 'vfh_utm_attribution';
const SENSITIVE_ACCESS_PREFIXES = ['/gift', '/thank-you/village-kit'] as const;

function isSensitiveAccessPath(pathname: string): boolean {
  return SENSITIVE_ACCESS_PREFIXES.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`)
  );
}

export type PurchaseType = 'self' | 'gift';
export type AnalyticsProduct = 'village_kit';
export type AnalyticsResource = '10_ways_to_help';
export type AnalyticsAsset = AnalyticsProduct | AnalyticsResource;
export type BuyCtaLocation =
  | 'navigation'
  | 'homepage_hero'
  | 'homepage_product'
  | 'homepage_gift'
  | 'homepage_final'
  | 'village_kit_hero'
  | 'village_kit_contents'
  | 'village_kit_gift'
  | 'village_kit_final'
  | 'free_resource'
  | 'free_resource_thank_you';

export interface FunnelEventPayloads {
  homepage_viewed: undefined;
  village_kit_viewed: undefined;
  free_resource_viewed: { resource: AnalyticsResource };
  lead_captured: { resource: AnalyticsResource };
  buy_cta_clicked: { cta_location: BuyCtaLocation; purchase_type?: PurchaseType };
  checkout_started: {
    product: AnalyticsProduct;
    purchase_type: PurchaseType;
    value?: number;
    currency?: 'USD';
  };
  purchase_completed: {
    product: AnalyticsProduct;
    purchase_type: PurchaseType;
    value?: number;
    currency?: 'USD';
  };
  download_access_completed: { asset: AnalyticsAsset };
  purchase_type_selected: { purchase_type: PurchaseType };
}

export type FunnelEventName = keyof FunnelEventPayloads;
type UtmKey = (typeof UTM_KEYS)[number];
export type UtmAttribution = Partial<Record<UtmKey, string>>;
type AnalyticsValue = string | number | boolean;
type AnalyticsParameters = Record<string, AnalyticsValue>;
type TrackEventArguments<EventName extends FunnelEventName> =
  FunnelEventPayloads[EventName] extends undefined
    ? [eventName: EventName]
    : [eventName: EventName, payload: FunnelEventPayloads[EventName]];

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

function isUtmKey(value: string): value is UtmKey {
  return (UTM_KEYS as readonly string[]).includes(value);
}

function sanitizeUtmValue(value: string): string | undefined {
  const normalized = value.trim();

  // Attribution should be a campaign label, never user contact information.
  if (
    !normalized ||
    normalized.length > 100 ||
    normalized.includes('@') ||
    !/^[\p{L}\p{N} ._~:/+-]+$/u.test(normalized)
  ) {
    return undefined;
  }

  return normalized;
}

function getStoredAttribution(): UtmAttribution {
  try {
    const stored = window.sessionStorage.getItem(UTM_SESSION_KEY);
    if (!stored) return {};

    const parsed: unknown = JSON.parse(stored);
    if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) return {};

    const attribution: UtmAttribution = {};
    for (const [key, value] of Object.entries(parsed)) {
      if (!isUtmKey(key) || typeof value !== 'string') continue;
      const safeValue = sanitizeUtmValue(value);
      if (safeValue) attribution[key] = safeValue;
    }
    return attribution;
  } catch {
    return {};
  }
}

export function getUtmAttribution(): UtmAttribution {
  if (typeof window === 'undefined') return {};
  return getStoredAttribution();
}

function captureAttribution(searchParams: URLSearchParams): void {
  const captured: UtmAttribution = {};

  for (const key of UTM_KEYS) {
    const value = searchParams.get(key);
    if (!value) continue;
    const safeValue = sanitizeUtmValue(value);
    if (safeValue) captured[key] = safeValue;
  }

  if (Object.keys(captured).length === 0) return;

  try {
    window.sessionStorage.setItem(
      UTM_SESSION_KEY,
      JSON.stringify({ ...getStoredAttribution(), ...captured })
    );
  } catch {
    // Analytics must never interrupt the customer journey.
  }
}

function eventParameters(
  eventName: FunnelEventName,
  payload: FunnelEventPayloads[FunnelEventName] | undefined
): AnalyticsParameters {
  const parameters: AnalyticsParameters = {
    page_path: window.location.pathname.slice(0, 200),
    ...getStoredAttribution(),
  };

  if (!payload) return parameters;

  switch (eventName) {
    case 'free_resource_viewed':
    case 'lead_captured': {
      const resourcePayload = payload as FunnelEventPayloads['lead_captured'];
      parameters.resource = resourcePayload.resource;
      break;
    }
    case 'buy_cta_clicked': {
      const ctaPayload = payload as FunnelEventPayloads['buy_cta_clicked'];
      parameters.cta_location = ctaPayload.cta_location;
      if (ctaPayload.purchase_type) parameters.purchase_type = ctaPayload.purchase_type;
      break;
    }
    case 'checkout_started':
    case 'purchase_completed': {
      const purchasePayload = payload as FunnelEventPayloads['purchase_completed'];
      parameters.product = purchasePayload.product;
      parameters.purchase_type = purchasePayload.purchase_type;
      if (typeof purchasePayload.value === 'number' && Number.isFinite(purchasePayload.value)) {
        parameters.value = purchasePayload.value;
      }
      if (purchasePayload.currency) parameters.currency = purchasePayload.currency;
      break;
    }
    case 'download_access_completed': {
      const downloadPayload = payload as FunnelEventPayloads['download_access_completed'];
      parameters.asset = downloadPayload.asset;
      break;
    }
    case 'purchase_type_selected': {
      const selectionPayload = payload as FunnelEventPayloads['purchase_type_selected'];
      parameters.purchase_type = selectionPayload.purchase_type;
      break;
    }
    case 'homepage_viewed':
    case 'village_kit_viewed':
      break;
  }

  return parameters;
}

function ensureGtag(): Window['gtag'] {
  if (!GA_MEASUREMENT_ID) return undefined;

  window.dataLayer ??= [];
  window.gtag ??= (...args: unknown[]) => {
    window.dataLayer?.push(args);
  };
  return window.gtag;
}

/**
 * Sends one allowlisted, PII-free funnel event when GA4 is configured.
 * Event payloads intentionally accept only stable product/funnel properties.
 */
export function trackEvent<EventName extends FunnelEventName>(
  ...args: TrackEventArguments<EventName>
): void {
  if (typeof window === 'undefined') return;

  const [eventName, payload] = args as [
    FunnelEventName,
    FunnelEventPayloads[FunnelEventName] | undefined,
  ];
  const parameters = eventParameters(eventName, payload);
  window.dispatchEvent(
    new CustomEvent('vfh:funnel', {
      detail: { event: eventName, ...parameters },
    })
  );
  if (!isSensitiveAccessPath(window.location.pathname)) {
    ensureGtag()?.('event', eventName, parameters);
  }
}

function AnalyticsRuntime() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const lastTrackedPath = useRef<string | null>(null);
  const queryString = searchParams.toString();

  useEffect(() => {
    captureAttribution(new URLSearchParams(queryString));
  }, [queryString]);

  useEffect(() => {
    if (!pathname || lastTrackedPath.current === pathname) return;
    lastTrackedPath.current = pathname;

    if (pathname === '/') {
      trackEvent('homepage_viewed');
    } else if (pathname === '/village-kit' || pathname === '/village-kit/') {
      trackEvent('village_kit_viewed');
    } else if (pathname === '/free/10-ways-to-help' || pathname === '/free/10-ways-to-help/') {
      trackEvent('free_resource_viewed', { resource: '10_ways_to_help' });
    }
  }, [pathname]);

  return null;
}

export function Analytics() {
  const pathname = usePathname();
  const canLoadThirdPartyAnalytics = !isSensitiveAccessPath(pathname);

  return (
    <>
      {GA_MEASUREMENT_ID && canLoadThirdPartyAnalytics ? (
        <>
          <Script
            id="vfh-ga4-loader"
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
            strategy="afterInteractive"
          />
          <Script id="vfh-ga4-config" strategy="afterInteractive">
            {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}window.gtag=gtag;gtag('js',new Date());gtag('config',${JSON.stringify(
              GA_MEASUREMENT_ID
            )},{send_page_view:false,allow_google_signals:false,allow_ad_personalization_signals:false});`}
          </Script>
        </>
      ) : null}
      <Suspense fallback={null}>
        <AnalyticsRuntime />
      </Suspense>
    </>
  );
}

export default Analytics;
