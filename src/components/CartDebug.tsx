import React, { useState } from 'react';

const CartDebug: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  const handleClearLocalStorage = () => {
    try {
      localStorage.clear();
      alert('LocalStorage cleared. Please refresh the page.');
    } catch (error) {
      alert('Error clearing localStorage: ' + error);
    }
  };

  if (!isVisible) {
    return (
      <button
        onClick={() => setIsVisible(true)}
        className="fixed bottom-4 right-4 bg-red-500 text-white p-2 rounded-full text-xs z-50"
        title="Cart Debug Tools"
      >
        🐛
      </button>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 bg-white border border-gray-300 rounded-lg shadow-lg p-4 z-50 max-w-xs">
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-sm font-semibold">Cart Debug Tools</h3>
        <button
          onClick={() => setIsVisible(false)}
          className="text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>
      </div>
      <div className="space-y-2">
        <button
          onClick={handleClearLocalStorage}
          className="w-full px-3 py-2 bg-orange-500 text-white text-xs rounded hover:bg-orange-600"
        >
          Clear All localStorage
        </button>
        <div className="text-xs text-gray-600 mt-2">
          Use this if you experience cart issues with stale data.
        </div>
      </div>
    </div>
  );
};

export default CartDebug;