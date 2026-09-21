"use client";

import { motion, useReducedMotion } from "framer-motion";

export function EditorialReveal({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={
        reduceMotion
          ? false
          : { opacity: 0, y: 18, clipPath: "inset(10% 0 0 0)" }
      }
      whileInView={{ opacity: 1, y: 0, clipPath: "inset(0% 0 0 0)" }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.62, ease: [0.2, 0.8, 0.2, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
