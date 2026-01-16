"use client";

import { motion, useReducedMotion } from "framer-motion";

export default function Stagger({ children, delayChildren = 0.06, staggerChildren = 0.06 }) {
  const reduce = useReducedMotion();

  const variants = {
    hidden: { opacity: 1 },
    show: {
      opacity: 1,
      transition: reduce ? {} : { delayChildren, staggerChildren },
    },
  };

  return (
    <motion.div variants={variants} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.25 }}>
      {children}
    </motion.div>
  );
}
