'use client';

import { type PurchaseType, trackEvent } from '@/components/Analytics';
import { VILLAGE_KIT_PRICE } from '@/lib/site';
import { Check, Copy, Download, Gift, Mail, Share2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useMemo, useRef, useState } from 'react';

type AccessResponse = {
  expires_at: number;
  purchase_type: PurchaseType;
  download_path: string;
  gift_access_path: string | null;
};

type AccessState =
  | { status: 'loading' }
  | { status: 'error'; message: string }
  | { status: 'ready'; access: AccessResponse };

type PurchaseAccessProps = {
  recipient?: boolean;
};

const SESSION_PATTERN = /^cs_(?:test|live)_[A-Za-z0-9]{10,200}$/;

export default function PurchaseAccess({ recipient = false }: PurchaseAccessProps) {
  const [state, setState] = useState<AccessState>({ status: 'loading' });
  const [copyStatus, setCopyStatus] = useState('');
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const fragmentParams = new URLSearchParams(window.location.hash.replace(/^#/, ''));
    const currentSessionId =
      fragmentParams.get('session_id') || queryParams.get('session_id') || '';

    if (!SESSION_PATTERN.test(currentSessionId)) {
      setState({
        status: 'error',
        message: 'This access link is incomplete. Return to the purchase page or contact support.',
      });
      return;
    }

    if (queryParams.has('session_id')) {
      window.history.replaceState(
        null,
        '',
        `${window.location.pathname}#session_id=${encodeURIComponent(currentSessionId)}`
      );
    }

    const controller = new AbortController();

    async function verifyAccess() {
      for (let attempt = 0; attempt < 6; attempt += 1) {
        try {
          const response = await fetch('/api/access/village-kit', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ session_id: currentSessionId }),
            cache: 'no-store',
            signal: controller.signal,
          });

          if (response.ok) {
            const access = (await response.json()) as AccessResponse;
            if (recipient && access.purchase_type !== 'gift') {
              throw new Error('This is not a gift entitlement.');
            }
            setState({ status: 'ready', access });

            if (!recipient) {
              const trackingKey = `vfh_purchase_tracked_${currentSessionId}`;
              if (window.sessionStorage.getItem(trackingKey) !== '1') {
                trackEvent('purchase_completed', {
                  product: 'village_kit',
                  purchase_type: access.purchase_type,
                  value: VILLAGE_KIT_PRICE,
                  currency: 'USD',
                });
                window.sessionStorage.setItem(trackingKey, '1');
              }
            }
            return;
          }

          if (response.status === 403 && attempt < 5) {
            await new Promise((resolve) => window.setTimeout(resolve, 2_000));
            continue;
          }

          throw new Error('Access could not be verified.');
        } catch (_error) {
          if (controller.signal.aborted) return;
          if (attempt < 5) {
            await new Promise((resolve) => window.setTimeout(resolve, 2_000));
            continue;
          }
          setState({
            status: 'error',
            message:
              'We could not verify access yet. Payment may still be processing, or this private link may be incomplete.',
          });
          return;
        }
      }
    }

    void verifyAccess();
    return () => controller.abort();
  }, [recipient]);

  useEffect(() => {
    if (state.status !== 'loading') {
      headingRef.current?.focus();
    }
  }, [state.status]);

  const giftUrl = useMemo(() => {
    if (
      state.status !== 'ready' ||
      !state.access.gift_access_path ||
      typeof window === 'undefined'
    ) {
      return '';
    }
    return new URL(state.access.gift_access_path, window.location.origin).toString();
  }, [state]);

  async function copyGiftLink() {
    if (!giftUrl) return;
    try {
      await navigator.clipboard.writeText(giftUrl);
      setCopyStatus('Gift link copied.');
    } catch {
      setCopyStatus('Select and copy the private link below.');
    }
  }

  async function shareGiftLink() {
    if (!giftUrl) return;
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'A Village For Her gift for you',
          text: 'I wanted to give you something practical. The Village Kit is ready for you here:',
          url: giftUrl,
        });
      } catch (error) {
        if (!(error instanceof DOMException) || error.name !== 'AbortError') {
          setCopyStatus('Sharing did not open. Copy the private link instead.');
        }
      }
      return;
    }
    await copyGiftLink();
  }

  function trackPaidDownload() {
    trackEvent('download_access_completed', { asset: 'village_kit' });
  }

  if (state.status === 'loading') {
    return (
      <AccessLayout recipient={recipient}>
        <div className="access-card" aria-live="polite" aria-busy="true">
          <p className="eyebrow">Confirming secure access</p>
          <h1>Preparing The Village Kit…</h1>
          <p className="lede">
            We are checking the payment and fulfillment record on the server. This usually takes
            only a few seconds.
          </p>
          <output className="access-status">Please keep this page open.</output>
        </div>
      </AccessLayout>
    );
  }

  if (state.status === 'error') {
    return (
      <AccessLayout recipient={recipient}>
        <div className="access-card">
          <p className="eyebrow">Access needs attention</p>
          <h1 ref={headingRef} tabIndex={-1}>
            We could not open the kit yet.
          </h1>
          <p className="lede">{state.message}</p>
          <p className="access-status status-error" role="alert">
            Refresh once after a minute. If the issue continues, email{' '}
            <a href="mailto:hello@villageforher.com">hello@villageforher.com</a> with the purchaser
            email. Never send card details.
          </p>
          <div className="access-actions">
            <button type="button" className="button" onClick={() => window.location.reload()}>
              Try again
            </button>
            <Link href="/village-kit/" className="button button-secondary">
              Return to The Village Kit
            </Link>
          </div>
        </div>
      </AccessLayout>
    );
  }

  const { access } = state;
  const expirationTime = new Date(access.expires_at * 1_000).toLocaleTimeString(undefined, {
    hour: 'numeric',
    minute: '2-digit',
  });

  if (recipient) {
    return (
      <AccessLayout recipient>
        <div className="access-card">
          <p className="eyebrow">A practical gift from someone who cares</p>
          <h1 ref={headingRef} tabIndex={-1}>
            The Village Kit is ready for you.
          </h1>
          <p className="lede">
            Use any page that makes care easier to ask for or coordinate. Skip what does not fit.
            Change your mind whenever you need to.
          </p>
          <div className="access-actions">
            <a href={access.download_path} className="button" onClick={trackPaidDownload} download>
              <Download aria-hidden="true" size={18} /> Download The Village Kit
            </a>
          </div>
          <p className="microcopy">
            This secure download link is valid until {expirationTime}. If it expires, refresh this
            private page for a new verified link. Save the PDF to your device for ongoing personal
            use.
          </p>
        </div>
      </AccessLayout>
    );
  }

  return (
    <AccessLayout recipient={false}>
      <div className="access-card">
        <p className="eyebrow">
          <Check aria-hidden="true" size={16} /> Payment confirmed
        </p>
        <h1 ref={headingRef} tabIndex={-1}>
          {access.purchase_type === 'gift'
            ? 'Your gift is ready to share.'
            : 'Your Village Kit is ready.'}
        </h1>
        <p className="lede">
          {access.purchase_type === 'gift'
            ? 'Copy the private gift link below and send it to one recipient. You can also save a delivery copy for her.'
            : 'Download the PDF now and save it somewhere you can return to when support needs a clearer plan.'}
        </p>

        <div className="access-actions">
          <a href={access.download_path} className="button" onClick={trackPaidDownload} download>
            <Download aria-hidden="true" size={18} />{' '}
            {access.purchase_type === 'gift' ? 'Download a gift copy' : 'Download The Village Kit'}
          </a>
        </div>

        {access.purchase_type === 'gift' && giftUrl ? (
          <div className="share-link-box">
            <p className="eyebrow">
              <Gift aria-hidden="true" size={16} /> Private gift access
            </p>
            <p>
              Share this private access link with one intended recipient. She can revisit it if she
              needs to download the kit again.
            </p>
            <p className="microcopy">{giftUrl}</p>
            <div className="access-actions">
              <button type="button" className="button" onClick={shareGiftLink}>
                <Share2 aria-hidden="true" size={17} /> Share gift link
              </button>
              <button type="button" className="button button-secondary" onClick={copyGiftLink}>
                <Copy aria-hidden="true" size={17} /> Copy link
              </button>
              <a
                className="button button-secondary"
                href={`mailto:?subject=${encodeURIComponent('A practical Village For Her gift')}&body=${encodeURIComponent(`I wanted to give you something practical. The Village Kit is ready here:\n\n${giftUrl}`)}`}
              >
                <Mail aria-hidden="true" size={17} /> Email it
              </a>
            </div>
            <output className="form-status" aria-live="polite">
              {copyStatus}
            </output>
          </div>
        ) : null}

        <p className="microcopy">
          Keep this page until you have saved the file
          {access.purchase_type === 'gift' ? ' and shared the gift link' : ''}. For access help,
          email hello@villageforher.com with the purchaser email. This page&apos;s download link is
          valid until {expirationTime}; refresh for a new verified link if needed.
        </p>
      </div>
    </AccessLayout>
  );
}

function AccessLayout({ recipient, children }: { recipient: boolean; children: React.ReactNode }) {
  return (
    <section className="access-page">
      <div className="page-shell access-grid">
        <div>{children}</div>
        <div className="free-cover-wrap">
          <Image
            src="/images/village-kit-cover.webp"
            alt="The Village Kit"
            width={720}
            height={932}
            priority
          />
          <span className="sr-only">{recipient ? 'Gift access' : 'Purchase access'}</span>
        </div>
      </div>
    </section>
  );
}
