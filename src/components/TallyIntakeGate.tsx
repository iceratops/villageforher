import React, { useState, useEffect } from 'react';

interface TallyIntakeGateProps {
  onComplete: () => void;
  tallyUrl?: string; // Placeholder for Tally form URL
}

const DEFAULT_TALLY_URL = 'https://tally.so/r/PLACEHOLDER'; // Replace with your Tally form URL

const TallyIntakeGate: React.FC<TallyIntakeGateProps> = ({ onComplete, tallyUrl = DEFAULT_TALLY_URL }) => {
  const [submitted, setSubmitted] = useState(false);
  const [loadError, setLoadError] = useState(false);

  // Listen for Tally form submission via postMessage (for future real integration)
  useEffect(() => {
    function handleMessage(event: MessageEvent) {
      // Placeholder: In real use, check event.origin and event.data for Tally's submission event
      if (event.data === 'tally-form-submitted') {
        setSubmitted(true);
        onComplete();
      }
    }
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [onComplete]);

  // Simulate completion for now (remove for real integration)
  const simulateSubmit = () => {
    setSubmitted(true);
    onComplete();
  };

  if (submitted) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-lg relative flex flex-col items-center">
        <h2 className="text-xl font-semibold mb-2 text-pink-700">Welcome to Your Healing Companion</h2>
        <p className="mb-4 text-gray-600">Please complete this short intake form to begin.</p>
        {!loadError ? (
          <div className="w-full h-96 mb-4">
            {/* Placeholder for Tally form embed */}
            <iframe
              src={tallyUrl}
              title="Tally Intake Form"
              className="w-full h-full rounded border"
              onError={() => setLoadError(true)}
            />
          </div>
        ) : (
          <div className="w-full h-40 flex flex-col items-center justify-center bg-gray-100 rounded mb-4">
            <span className="text-gray-500">Failed to load the intake form.</span>
            <button
              className="mt-2 px-4 py-2 bg-blue-500 text-white rounded shadow"
              onClick={() => setLoadError(false)}
            >
              Retry
            </button>
          </div>
        )}
        {/* Simulate submit for now */}
        <button
          className="px-6 py-2 bg-pink-600 text-white rounded-lg shadow hover:bg-pink-700 transition"
          onClick={simulateSubmit}
        >
          Simulate Form Submission
        </button>
      </div>
    </div>
  );
};

export default TallyIntakeGate; 