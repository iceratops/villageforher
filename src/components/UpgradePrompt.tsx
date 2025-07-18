import React from 'react';

interface UpgradePromptProps {
  onUpgrade?: () => void;
}

const UpgradePrompt: React.FC<UpgradePromptProps> = ({ onUpgrade }) => {
  return (
    <div className="w-full bg-yellow-100 border-l-4 border-yellow-400 p-4 mb-4 rounded flex items-center justify-between shadow">
      <div className="text-yellow-800 font-medium">
        Upgrade to unlock unlimited rituals and deeper reflections.
      </div>
      <button
        className="ml-4 px-4 py-2 bg-pink-600 text-white rounded shadow hover:bg-pink-700 transition"
        onClick={onUpgrade}
        disabled
      >
        Upgrade (Coming Soon)
      </button>
    </div>
  );
};

export default UpgradePrompt; 