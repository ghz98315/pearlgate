"use client";

import { motion, useScroll } from "framer-motion";

export default function ReadingProgress() {
  const { scrollYProgress } = useScroll();

  return (
    <motion.div
      style={{ scaleX: scrollYProgress }}
      className="fixed top-16 left-0 right-0 h-0.5 bg-orange-500 origin-left z-50"
    />
  );
}
