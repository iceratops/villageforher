'use client';

import { useRouter } from 'next/navigation';
import { type FormEvent, useId, useRef, useState } from 'react';
import { trackEvent } from './Analytics';

const FORM_NAME = 'free-guide-lead';
const THANK_YOU_PATH = '/free/10-ways-to-help/thank-you/';
const FREE_GUIDE_PATH = '/downloads/10-ways-to-actually-help-a-new-mom.pdf';

export interface LeadCaptureFormProps {
  className?: string;
  buttonLabel?: string;
}

type SubmissionState = 'idle' | 'submitting' | 'error';

export function LeadCaptureForm({
  className = '',
  buttonLabel = 'Send me the free guide',
}: LeadCaptureFormProps) {
  const router = useRouter();
  const emailId = useId();
  const consentId = useId();
  const messageId = useId();
  const emailInputRef = useRef<HTMLInputElement>(null);
  const [email, setEmail] = useState('');
  const [submissionState, setSubmissionState] = useState<SubmissionState>('idle');
  const [validationError, setValidationError] = useState('');

  const isSubmitting = submissionState === 'submitting';
  const hasError = Boolean(validationError) || submissionState === 'error';

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setValidationError('');

    const emailInput = emailInputRef.current;
    if (!emailInput || !emailInput.validity.valid) {
      setValidationError(
        emailInput?.validity.valueMissing
          ? 'Enter your email address to get the guide.'
          : 'Enter a valid email address, such as you@example.com.'
      );
      emailInput?.focus();
      return;
    }

    const formData = new FormData(event.currentTarget);
    const honeypot = formData.get('bot-field');
    if (typeof honeypot === 'string' && honeypot.trim()) {
      router.push(THANK_YOU_PATH);
      return;
    }

    const encodedBody = new URLSearchParams();
    for (const [key, value] of formData.entries()) {
      if (typeof value === 'string') encodedBody.append(key, value);
    }
    encodedBody.set('form-name', FORM_NAME);
    encodedBody.set('email', email.trim().toLowerCase());

    setSubmissionState('submitting');

    try {
      const response = await fetch('/__forms.html', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: encodedBody.toString(),
      });

      if (!response.ok) throw new Error('Lead form submission failed');

      trackEvent('lead_captured', { resource: '10_ways_to_help' });
      router.push(THANK_YOU_PATH);
    } catch {
      setSubmissionState('error');
    }
  }

  return (
    <div className={`lead-capture ${className}`.trim()}>
      <form
        name={FORM_NAME}
        method="POST"
        action={THANK_YOU_PATH}
        data-netlify="true"
        data-netlify-honeypot="bot-field"
        noValidate
        onSubmit={handleSubmit}
        aria-describedby={messageId}
      >
        <input type="hidden" name="form-name" value={FORM_NAME} />
        <div hidden aria-hidden="true">
          <label>
            Leave this field empty
            <input name="bot-field" tabIndex={-1} autoComplete="off" />
          </label>
        </div>

        <label htmlFor={emailId} className="lead-label">
          Email address
        </label>
        <div className="lead-row">
          <input
            ref={emailInputRef}
            id={emailId}
            name="email"
            type="email"
            value={email}
            onChange={(event) => {
              setEmail(event.target.value);
              if (hasError) {
                setValidationError('');
                setSubmissionState('idle');
              }
            }}
            required
            autoComplete="email"
            inputMode="email"
            spellCheck={false}
            aria-invalid={Boolean(validationError)}
            aria-describedby={messageId}
            className="lead-input"
            placeholder="you@example.com"
            disabled={isSubmitting}
          />
          <button type="submit" disabled={isSubmitting} className="button">
            {isSubmitting ? 'Getting your guide…' : buttonLabel}
          </button>
        </div>

        <label className="consent-row" htmlFor={consentId}>
          <input
            id={consentId}
            name="marketing-consent"
            type="checkbox"
            value="yes"
            disabled={isSubmitting}
          />
          <span>
            Yes, send me occasional practical emails from Village For Her. Optional; the guide is
            mine either way.
          </span>
        </label>

        <div id={messageId} className="lead-message" aria-live="polite">
          {validationError ? (
            <p role="alert" className="lead-error">
              {validationError}
            </p>
          ) : submissionState === 'error' ? (
            <p role="alert" className="lead-error">
              We couldn&apos;t save your email right now. Your guide is still ready:{' '}
              <a
                href={FREE_GUIDE_PATH}
                download
                className="text-link"
                onClick={() =>
                  trackEvent('download_access_completed', { asset: '10_ways_to_help' })
                }
              >
                download it directly
              </a>
              .
            </p>
          ) : (
            <p>
              We save your email to understand interest in this resource. Practical emails are sent
              only if you choose the optional update box.
            </p>
          )}
        </div>

        <noscript>
          <p className="lead-message">
            You can also{' '}
            <a className="text-link" href={FREE_GUIDE_PATH} download>
              download the guide directly
            </a>
            .
          </p>
        </noscript>
      </form>
    </div>
  );
}

export default LeadCaptureForm;
