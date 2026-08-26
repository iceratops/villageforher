'use client';

import { type PurchaseType, getUtmAttribution, trackEvent } from '@/components/Analytics';
import { VILLAGE_KIT_PRICE } from '@/lib/site';
import { LockKeyhole } from 'lucide-react';
import { useEffect, useId, useState } from 'react';

type CheckoutResponse = {
  url?: string;
  error?: string;
};

export default function CheckoutPanel() {
  const legendId = useId();
  const statusId = useId();
  const [purchaseType, setPurchaseType] = useState<PurchaseType>('self');
  const [isStarting, setIsStarting] = useState(false);
  const [error, setError] = useState('');
  const [wasCanceled, setWasCanceled] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setWasCanceled(params.get('checkout') === 'canceled');
  }, []);

  function choosePurchaseType(nextType: PurchaseType) {
    setPurchaseType(nextType);
    setError('');
    trackEvent('purchase_type_selected', { purchase_type: nextType });
  }

  async function startCheckout() {
    setIsStarting(true);
    setError('');
    trackEvent('buy_cta_clicked', {
      cta_location: purchaseType === 'gift' ? 'village_kit_gift' : 'village_kit_hero',
      purchase_type: purchaseType,
    });

    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          purchase_type: purchaseType,
          attribution: getUtmAttribution(),
        }),
      });
      const body = (await response.json()) as CheckoutResponse;

      if (!response.ok || !body.url) {
        throw new Error(body.error || 'Checkout is unavailable');
      }

      const checkoutUrl = new URL(body.url);
      if (checkoutUrl.protocol !== 'https:' || checkoutUrl.hostname !== 'checkout.stripe.com') {
        throw new Error('Checkout returned an invalid destination');
      }

      trackEvent('checkout_started', {
        product: 'village_kit',
        purchase_type: purchaseType,
        value: VILLAGE_KIT_PRICE,
        currency: 'USD',
      });
      window.location.assign(checkoutUrl.toString());
    } catch {
      setError('Secure checkout could not start. Please try again.');
      setIsStarting(false);
    }
  }

  return (
    <div className="checkout-shell" id="buy" aria-describedby={statusId} tabIndex={-1}>
      {wasCanceled ? (
        <output className="checkout-status">
          Your checkout was canceled and you were not charged. Choose who the kit is for below to
          try again.
        </output>
      ) : null}

      <fieldset aria-labelledby={legendId}>
        <legend id={legendId}>Who is this for?</legend>
        <div className="purchase-options">
          <label className="purchase-option">
            <input
              type="radio"
              name="purchase-type"
              value="self"
              checked={purchaseType === 'self'}
              onChange={() => choosePurchaseType('self')}
            />
            <strong>This is for me</strong>
            <span>I will receive private access immediately after payment.</span>
          </label>
          <label className="purchase-option">
            <input
              type="radio"
              name="purchase-type"
              value="gift"
              checked={purchaseType === 'gift'}
              onChange={() => choosePurchaseType('gift')}
            />
            <strong>I am giving this</strong>
            <span>I will receive a private link to copy or share with her.</span>
          </label>
        </div>
      </fieldset>

      <button
        type="button"
        className="button checkout-button"
        onClick={startCheckout}
        disabled={isStarting}
        aria-describedby={statusId}
      >
        <LockKeyhole aria-hidden="true" size={17} />
        {isStarting
          ? 'Opening secure checkout…'
          : `Continue to secure checkout — $${VILLAGE_KIT_PRICE}`}
      </button>

      <div id={statusId} aria-live="polite">
        {error ? (
          <p className="checkout-status status-error" role="alert">
            {error} If the problem continues, email{' '}
            <a href="mailto:hello@villageforher.com">hello@villageforher.com</a>.
          </p>
        ) : (
          <p className="microcopy">
            One-time digital purchase. Stripe collects the purchaser email and shows eligible
            payment methods securely. Nothing will be shipped.
          </p>
        )}
      </div>
    </div>
  );
}
