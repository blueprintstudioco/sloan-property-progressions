"use client";

import { useInView, motion, useMotionValue, useTransform, animate } from "motion/react";
import { useRef, useEffect, useState } from "react";

interface CountUpProps {
  target: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  className?: string;
}

export default function CountUp({ target, suffix = "", prefix = "", duration = 2, className }: CountUpProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [display, setDisplay] = useState("0");

  useEffect(() => {
    if (!isInView) return;

    const controls = animate(0, target, {
      duration,
      ease: "easeOut",
      onUpdate: (v) => setDisplay(Math.floor(v).toLocaleString()),
    });

    return () => controls.stop();
  }, [isInView, target, duration]);

  return (
    <span ref={ref} className={className}>
      {prefix}{display}{suffix}
    </span>
  );
}
