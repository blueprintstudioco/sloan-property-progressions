"use client";

import { motion, useAnimation, type Variants } from "motion/react";
import { useCallback, useRef, type HTMLAttributes } from "react";

// ─── Shared wrapper for hover-triggered animated icons ────────────────────────

interface AnimatedIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
  className?: string;
}

// ─── Shield Icon ──────────────────────────────────────────────────────────────

const shieldPathVariants: Variants = {
  normal: { pathLength: 1, opacity: 1 },
  animate: {
    pathLength: [0, 1],
    opacity: [0, 1],
    transition: { duration: 0.5, opacity: { duration: 0.1 } },
  },
};

export function AnimatedShield({ size = 24, className, ...props }: AnimatedIconProps) {
  const controls = useAnimation();
  return (
    <div
      className={className}
      onMouseEnter={() => controls.start("animate")}
      onMouseLeave={() => controls.start("normal")}
      {...props}
    >
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <motion.path
          d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"
          variants={shieldPathVariants}
          animate={controls}
        />
      </svg>
    </div>
  );
}

// ─── Clock Icon ───────────────────────────────────────────────────────────────

const clockHandVariants: Variants = {
  normal: { rotate: 0 },
  animate: { rotate: 360, transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] } },
};

const clockMinuteVariants: Variants = {
  normal: { rotate: 0 },
  animate: { rotate: 45, transition: { duration: 0.5, ease: "easeInOut" } },
};

export function AnimatedClock({ size = 24, className, ...props }: AnimatedIconProps) {
  const controls = useAnimation();
  return (
    <div
      className={className}
      onMouseEnter={() => controls.start("animate")}
      onMouseLeave={() => controls.start("normal")}
      {...props}
    >
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <motion.line
          x1="12" y1="12" x2="12" y2="6"
          variants={clockHandVariants}
          animate={controls}
          style={{ originX: "0%", originY: "100%" }}
        />
        <motion.line
          x1="12" y1="12" x2="16" y2="12"
          variants={clockMinuteVariants}
          animate={controls}
          style={{ originX: "0%", originY: "100%" }}
        />
      </svg>
    </div>
  );
}

// ─── Star Icon ────────────────────────────────────────────────────────────────

const starVariants: Variants = {
  normal: { scale: 1, rotate: 0 },
  animate: {
    scale: [1, 1.2, 1],
    rotate: [0, 15, -15, 0],
    transition: { duration: 0.5, ease: "easeInOut" },
  },
};

export function AnimatedStar({ size = 24, className, ...props }: AnimatedIconProps) {
  const controls = useAnimation();
  return (
    <div
      className={className}
      onMouseEnter={() => controls.start("animate")}
      onMouseLeave={() => controls.start("normal")}
      {...props}
    >
      <motion.svg
        width={size} height={size} viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
        variants={starVariants}
        animate={controls}
      >
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </motion.svg>
    </div>
  );
}

// ─── Phone Icon ───────────────────────────────────────────────────────────────

const phoneVariants: Variants = {
  normal: { rotate: 0 },
  animate: {
    rotate: [0, -10, 10, -10, 10, 0],
    transition: { duration: 0.5, ease: "easeInOut" },
  },
};

export function AnimatedPhone({ size = 24, className, ...props }: AnimatedIconProps) {
  const controls = useAnimation();
  return (
    <div
      className={className}
      onMouseEnter={() => controls.start("animate")}
      onMouseLeave={() => controls.start("normal")}
      {...props}
    >
      <motion.svg
        width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
        variants={phoneVariants}
        animate={controls}
      >
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
      </motion.svg>
    </div>
  );
}

// ─── CheckCircle Icon ─────────────────────────────────────────────────────────

const checkVariants: Variants = {
  normal: { pathLength: 1, opacity: 1 },
  animate: {
    pathLength: [0, 1],
    opacity: [0, 1],
    transition: { duration: 0.4, delay: 0.2, opacity: { duration: 0.1 } },
  },
};

const circleVariants: Variants = {
  normal: { pathLength: 1, opacity: 1 },
  animate: {
    pathLength: [0, 1],
    opacity: [0, 1],
    transition: { duration: 0.3, opacity: { duration: 0.1 } },
  },
};

export function AnimatedCheckCircle({ size = 24, className, ...props }: AnimatedIconProps) {
  const controls = useAnimation();
  return (
    <div
      className={className}
      onMouseEnter={() => controls.start("animate")}
      onMouseLeave={() => controls.start("normal")}
      {...props}
    >
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <motion.circle cx="12" cy="12" r="10" variants={circleVariants} animate={controls} />
        <motion.path d="m9 12 2 2 4-4" variants={checkVariants} animate={controls} />
      </svg>
    </div>
  );
}

// ─── Award Icon ───────────────────────────────────────────────────────────────

const awardVariants: Variants = {
  normal: { y: 0 },
  animate: {
    y: [0, -4, 0],
    transition: { duration: 0.4, ease: "easeOut" },
  },
};

export function AnimatedAward({ size = 24, className, ...props }: AnimatedIconProps) {
  const controls = useAnimation();
  return (
    <div
      className={className}
      onMouseEnter={() => controls.start("animate")}
      onMouseLeave={() => controls.start("normal")}
      {...props}
    >
      <motion.svg
        width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
        variants={awardVariants}
        animate={controls}
      >
        <path d="m15.477 12.89 1.515 8.526a.5.5 0 0 1-.81.47l-3.58-2.687a1 1 0 0 0-1.197 0l-3.586 2.686a.5.5 0 0 1-.81-.469l1.514-8.526" />
        <circle cx="12" cy="8" r="6" />
      </motion.svg>
    </div>
  );
}

// ─── MapPin Icon ──────────────────────────────────────────────────────────────

const mapPinVariants: Variants = {
  normal: { y: 0 },
  animate: {
    y: [0, -6, 0],
    transition: { duration: 0.4, type: "spring", stiffness: 300, damping: 10 },
  },
};

export function AnimatedMapPin({ size = 24, className, ...props }: AnimatedIconProps) {
  const controls = useAnimation();
  return (
    <div
      className={className}
      onMouseEnter={() => controls.start("animate")}
      onMouseLeave={() => controls.start("normal")}
      {...props}
    >
      <motion.svg
        width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
        variants={mapPinVariants}
        animate={controls}
      >
        <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" />
        <circle cx="12" cy="10" r="3" />
      </motion.svg>
    </div>
  );
}

// ─── ArrowRight Icon ──────────────────────────────────────────────────────────

const arrowVariants: Variants = {
  normal: { x: 0 },
  animate: {
    x: [0, 4, 0],
    transition: { duration: 0.4, ease: "easeInOut" },
  },
};

export function AnimatedArrowRight({ size = 24, className, ...props }: AnimatedIconProps) {
  const controls = useAnimation();
  return (
    <div
      className={className}
      onMouseEnter={() => controls.start("animate")}
      onMouseLeave={() => controls.start("normal")}
      {...props}
    >
      <motion.svg
        width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
        variants={arrowVariants}
        animate={controls}
      >
        <path d="M5 12h14" />
        <path d="m12 5 7 7-7 7" />
      </motion.svg>
    </div>
  );
}
