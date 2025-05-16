import React from 'react';

type HoverButtonProps = {
  text: string;
  onClick?: () => void;
};

const HoverButton: React.FC<HoverButtonProps> = ({ text, onClick }) => {
  return (
    <div>
      <a
        href="#_"
        onClick={onClick}
        className="relative inline-flex items-center justify-center p-2 px-4 overflow-hidden font-medium text-black transition duration-300 ease-out border-2 rounded-full shadow-md group"
        style={{ borderColor: '#f3da72' }}
      >
        <span
          className="absolute inset-0 flex items-center justify-center w-full h-full text-black duration-300 -translate-x-full group-hover:translate-x-0 ease"
          style={{ backgroundColor: '#f3da72' }}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M14 5l7 7m0 0l-7 7m7-7H3"
            ></path>
          </svg>
        </span>
        <span className="absolute flex items-center justify-center w-full h-full text-white transition-all duration-300 transform group-hover:translate-x-full ease">
          {text}
        </span>
        <span className="relative invisible">{text}</span>
      </a>
    </div>
  );
};

export default HoverButton;
