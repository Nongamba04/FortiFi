import React from 'react';

interface GlowingButtonProps {
  label: string;
  onClick?: () => void;
}

const GlowingButton: React.FC<GlowingButtonProps> = ({ label, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="relative inline-flex items-center justify-center px-8 py-4 font-bold text-purple-800 bg-gray-300 rounded-full shadow-sm overflow-hidden transition-transform active:scale-95 hover:text-purple-900"
    >
      {label}
      <div className="absolute inset-0 flex items-center justify-center z-0">
        <div className="w-40 h-40 rounded-full bg-gradient-to-r from-pink-600 via-purple-500 to-cyan-400 opacity-50 blur-2xl transition-all duration-400 animate-spin-slow hover:w-32 hover:h-32"></div>
      </div>
      {/* <span className="relative z-10">{label}</span> */}
    </button>
  );
};

export default GlowingButton;
