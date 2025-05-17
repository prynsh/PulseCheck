// components/FadeInWhenVisible.tsx
"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function FadeInWhenVisible({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: false, 
    amount: 0.3,
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }} 
      transition={{ duration: 0.6, delay }}
    >
      {children}
    </motion.div>
  );
}
