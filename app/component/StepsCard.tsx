import StepCard from "@/components/ui/Steps";
import React from "react";
import { ArrowDown } from "lucide-react"; 

const StepsSection = () => {
  const steps = [
    {
      stepNumber: 1,
      title: "Add your website URL(s)",
      description: "Simple input, no code setup",
    },
    {
      stepNumber: 2,
      title: "Choose your notification preferences",
      description: "Email, SMS, Slack, etc.",
    },
    {
      stepNumber: 3,
      title: "We ping it regularly and alert you instantly",
      description: "If it goes down or returns any error",
    },
  ];

  return (
    <div className=" p-6 rounded-3xl max-w-md mx-auto space-y-4">
      {steps.map((step, index) => (
        <div key={step.stepNumber} className="flex flex-col items-center space-y-4">
          <StepCard
            stepNumber={step.stepNumber}
            title={step.title}
            description={step.description}
          />
          {index < steps.length - 1 && (
            <ArrowDown className="text-white w-6 h-6 animate-bounce" />
          )}
        </div>
      ))}
    </div>
  );
};

export default StepsSection;
