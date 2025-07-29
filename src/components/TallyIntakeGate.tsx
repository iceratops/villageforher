import React from 'react';
import { useTallyIntake } from '../hooks/useTallyIntake';
import { DEFAULT_TALLY_URL } from '../lib/tally';

interface TallyIntakeGateProps {
  onComplete: () => void;
  tallyUrl?: string;
}

const TallyIntakeGate: React.FC<TallyIntakeGateProps> = ({ onComplete, tallyUrl = DEFAULT_TALLY_URL }) => {
  const { submitted, loadError, setLoadError, simulateSubmit } = useTallyIntake(onComplete);

  if (submitted) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-lg relative flex flex-col items-center">
        <h2 className="text-xl font-semibold mb-2 text-pink-700">Welcome to Your Healing Companion</h2>
        <p className="mb-4 text-gray-600">Please complete this short intake form to begin.</p>
        {!loadError ? (
          <div className="w-full h-96 mb-4">
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