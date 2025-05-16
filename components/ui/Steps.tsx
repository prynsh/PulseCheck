import React from "react";

interface StepCardProps {
  stepNumber: number;
  title: string;
  description: string;
}

const StepCard: React.FC<StepCardProps> = ({ stepNumber, title, description }) => {
  return (
    <div className="flex items-center space-x-4 py-6 px-4 bg-[#f3da72] rounded-2xl shadow-md mb-4">
      <div className="text-4xl font-bold text-black drop-shadow-[2px_2px_0_#fff]">
        {stepNumber}
      </div>
      <div>
        <h3 className="text-lg font-semibold text-black">{title}</h3>
        <p className="text-sm text-black mt-1">{description}</p>
      </div>
    </div>
  );
};

export default StepCard;
