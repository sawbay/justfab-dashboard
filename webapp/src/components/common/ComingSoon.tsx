import React from "react";

interface ComingSoonProps {
  onClose?: () => void;
}

const ComingSoon = ({ onClose }: ComingSoonProps) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-8 rounded-xl shadow-lg relative">
        <button
          onClick={onClose}
          className="absolute -top-2 -right-2 bg-[#7B3F00] text-white rounded-full p-1 hover:bg-[#5a2e00] transition-colors"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        <h2 className="text-2xl font-bold text-[#7B3F00] font-dynapuff">
          Coming Soon
        </h2>
      </div>
    </div>
  );
};

export default ComingSoon;
