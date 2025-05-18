"use client";
import StepCard from "@/components/ui/Steps";
import React from "react";
import { ArrowDown } from "lucide-react";
import { motion } from "framer-motion";

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
    <div className="max-w-md mx-auto space-y-6">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-center text-4xl font-semibold italic text-white"
      >
        How it Works?
      </motion.h2>

      {steps.map((step, index) => (
        <motion.div
          key={step.stepNumber}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: index * 0.3 }}
          viewport={{ once: true, amount: 0.3 }}
          className="flex flex-col items-center text-center space-y-3 pt-6"
        >
          <StepCard
            stepNumber={step.stepNumber}
            title={step.title}
            description={step.description}
          />
          {index < steps.length - 1 && (
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: index * 0.3 + 0.3 }}
              viewport={{ once: true }}
            >
              <ArrowDown className="text-white w-6 h-6 animate-bounce" />
            </motion.div>
          )}
        </motion.div>
      ))}
    </div>
  );
};

export default StepsSection;
