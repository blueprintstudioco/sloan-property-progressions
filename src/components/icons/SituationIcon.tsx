"use client";

import { motion, useAnimation, type Variants } from "motion/react";
import { useCallback } from "react";

// Map icon names to SVG paths (Lucide-based)
const ICONS: Record<string, { paths: string[]; viewBox?: string }> = {
  home: { paths: ["M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8", "M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"] },
  building: { paths: ["M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z", "M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2", "M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2", "M10 6h4", "M10 10h4", "M10 14h4", "M10 18h4"] },
  factory: { paths: ["M2 20a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8l-7 5V8l-7 5V4a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z", "M17 18h1", "M12 18h1", "M7 18h1"] },
  droplets: { paths: ["M7 16.3c2.2 0 4-1.83 4-4.05 0-1.16-.57-2.26-1.71-3.19S7.29 6.75 7 5.3c-.29 1.45-1.14 2.84-2.29 3.76S3 11.1 3 12.25c0 2.22 1.8 4.05 4 4.05z", "M12.56 14.57c1.35 0 2.44-1.12 2.44-2.47 0-.7-.35-1.38-1.05-1.95S12.78 8.87 12.56 8c-.18.88-.7 1.73-1.4 2.3s-1.04 1.22-1.04 1.9c0 1.36 1.1 2.47 2.44 2.47z"] },
  trees: { paths: ["M10 10v.2A3 3 0 0 1 8.9 16H5a3 3 0 0 1-1-5.8V10a3 3 0 0 1 6 0Z", "M7 16v6", "M13 19v3", "M16 14v.2A3 3 0 0 1 14.9 20H11a3 3 0 0 1-1-5.8V14a3 3 0 0 1 6 0Z"] },
  shovel: { paths: ["M2 22v-5l5-5 5 5-5 5z", "M9.5 14.5 16 8", "M17 2l5 5-.5.5a3.53 3.53 0 0 1-5 0s0 0 0 0a3.53 3.53 0 0 1 0-5L17 2z"] },
  pickaxe: { paths: ["M14.531 12.469 6.619 20.38a1 1 0 1 1-3-3l7.912-7.912", "M15.686 4.314A12.5 12.5 0 0 0 5.461 2.958l-.108.031c1.349 3.3-1.174 6.84-2.985 8.147l3.217 3.217c1.308-1.81 4.847-4.334 8.147-2.985l.031-.108a12.56 12.56 0 0 0-1.356-5.225"] },
  truck: { paths: ["M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2", "M15 18H9", "M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14", "M7 18a2 2 0 1 0 0-4 2 2 0 0 0 0 4z", "M17 18a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"] },
  wrench: { paths: ["M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"] },
  zap: { paths: ["M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"] },
  waves: { paths: ["M2 6c.6.5 1.2 1 2.5 1C7 7 7 5 9.5 5c2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1", "M2 12c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1", "M2 18c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"] },
  "hard-hat": { paths: ["M2 18a1 1 0 0 0 1 1h18a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v2z", "M10 15V6.5a3.5 3.5 0 0 1 7 0V15", "M4 15v-3a6 6 0 0 1 6-6", "M14 6.5v0a3.5 3.5 0 0 1 6 2V15"] },
  ruler: { paths: ["M21.3 15.3a2.4 2.4 0 0 1 0 3.4l-2.6 2.6a2.4 2.4 0 0 1-3.4 0L2.7 8.7a2.41 2.41 0 0 1 0-3.4l2.6-2.6a2.41 2.41 0 0 1 3.4 0Z", "m14.5 12.5 2-2", "m11.5 9.5 2-2", "m8.5 6.5 2-2", "m17.5 15.5 2-2"] },
  car: { paths: ["M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2", "M7 17a2 2 0 1 0 0-4 2 2 0 0 0 0 4z", "M17 17a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"] },
  plug: { paths: ["M12 22v-5", "M9 8V2", "M15 8V2", "M18 8v5a6 6 0 0 1-6 6 6 6 0 0 1-6-6V8z"] },
  fish: { paths: ["M6.5 12c.94-3.46 4.94-6 8.5-6 3.56 0 6.06 2.54 7 6-.94 3.47-3.44 6-7 6-3.56 0-7.56-2.53-8.5-6Z", "M18 12v.5", "M16 17.93a9.77 9.77 0 0 1 0-11.86", "M7 10.67C7 8 5.58 5.97 2.73 5.5c-1 1.5-1 5 .23 6.5-1.24 1.5-1.24 5 .23 6.5C6.06 18.03 7 16 7 13.33"] },
  "square-parking": { paths: ["M9 17V7h4a3 3 0 0 1 0 6H9", "M3 3h18v18H3z"] },
  cloud_rain: { paths: ["M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242", "M16 14v6", "M8 14v6", "M12 16v6"] },
  construction: { paths: ["M21 21H3", "M3 7v1a3 3 0 0 0 6 0V7", "M9 7v1a3 3 0 0 0 6 0V7", "M15 7v1a3 3 0 0 0 6 0V7", "M6 21V10", "M12 21V10", "M18 21V10"] },
  fence: { paths: ["M4 3v18", "M8 3v18", "M12 3v18", "M16 3v18", "M20 3v18", "M2 9h20", "M2 15h20"] },
  mountain: { paths: ["m8 3 4 8 5-5 5 15H2Z"] },
  leaf: { paths: ["M11 20A7 7 0 0 1 9.8 6.9C15.5 4.9 20 .5 20 .5s-1.7 7.4-3 13.5c0 0-3.5 3-6 6Z", "M10.7 11.3a2 2 0 0 0-2.8 0l-4.2 4.2"] },
  hammer: { paths: ["m15 12-8.373 8.373a1 1 0 1 1-3-3L12 9", "m18 15 4-4", "m21.5 11.5-1.914-1.914A2 2 0 0 1 19 8.172V7l-2.26-2.26a6 6 0 0 0-4.202-1.756L9 2.96l.92.82A6.18 6.18 0 0 1 12 8.4V10l2 2h1.172a2 2 0 0 1 1.414.586L18.5 14.5"] },
  alert: { paths: ["m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3", "M12 9v4", "M12 17h.01"] },
  scale: { paths: ["m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z", "m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z", "M7 21h10", "M12 3v18", "M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2"] },
  pool: { paths: ["M2 6c.6.5 1.2 1 2.5 1C7 7 7 5 9.5 5c2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1", "M2 12c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1", "M2 18c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"] },
  undo: { paths: ["M3 7v6h6", "M21 17a9 9 0 0 0-9-9 9 9 0 0 0-6 2.3L3 13"] },
  snowflake: { paths: ["M2 12h20", "M12 2v20", "m4.93 4.93 4.24 4.24", "m14.83 14.83 4.24 4.24", "m19.07 4.93-4.24 4.24", "m9.17 14.83-4.24 4.24", "m2 12 4-2.5", "m2 12 4 2.5", "m22 12-4-2.5", "m22 12-4 2.5", "m12 2 2.5 4", "m12 2-2.5 4", "m12 22 2.5-4", "m12 22-2.5-4"] },
  "water-waves": { paths: ["M2 6c.6.5 1.2 1 2.5 1C7 7 7 5 9.5 5c2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1", "M2 12c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1", "M2 18c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"] },
  "tree-deciduous": { paths: ["M8 19h8a4 4 0 0 0 3.8-2.8 4 4 0 0 0-1.6-4.5c1-1.1 1-2.7.4-4-.7-1.2-2.2-2-3.6-1.7a3 3 0 0 0-3-3 3 3 0 0 0-3 3c-1.4-.2-2.9.6-3.6 1.8-.7 1.3-.5 2.9.4 4a4 4 0 0 0-1.6 4.5A4 4 0 0 0 8 19Z", "M12 19v3"] },
  "fishing-rod": { paths: ["M18.5 2 20 3.5", "M2 12l3.5 3.5", "M20 3.5 3.5 20 2 18.5 18.5 2", "M18 22a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"] },
  "home-garden": { paths: ["M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z", "M9 22V12h6v10"] },
  bug: { paths: ["m8 2 1.88 1.88", "M14.12 3.88 16 2", "M9 7.13v-1a3.003 3.003 0 1 1 6 0v1", "M12 20c-3.3 0-6-2.7-6-6v-3a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v3c0 3.3-2.7 6-6 6", "M12 20v-9", "M6.53 9C4.6 8.8 3 7.1 3 5", "M6 13H2", "M3 21c0-2.1 1.7-3.9 3.8-4", "M20.97 5c0 2.1-1.6 3.8-3.5 4", "M22 13h-4", "M17.2 17c2.1.1 3.8 1.9 3.8 4"] },
  horse: { paths: ["M22 2s-4 2-6 2-4-2-6-2-6 2-6 2v3s2.5.5 4 2c1.5 1.5 2 4 2 4l4 4 2-4s3-.5 4-2 2-4 2-4V2z", "M2 12l4 4"] },
  gem: { paths: ["M6 3h12l4 6-10 13L2 9Z", "M11 3 8 9l4 13 4-13-3-6", "M2 9h20"] },
  "dollar-sign": { paths: ["M12 2v20", "M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"] },
  toilet: { paths: ["M7 12h10a1 1 0 0 1 1 1v1a5 5 0 0 1-5 5h-2a5 5 0 0 1-5-5v-1a1 1 0 0 1 1-1Z", "M10 2v4", "M14 2v4", "M12 19v3"] },
  "railroad": { paths: ["M2 17 17 2", "m2 14 8 8", "m5 2 15 15", "M2 5l8 8", "M17 17l5 5", "M14 2l8 8"] },
  handshake: { paths: ["m11 17 2 2a1 1 0 1 0 3-3", "m14 14 2.5 2.5a1 1 0 1 0 3-3l-3.88-3.88a3 3 0 0 0-4.24 0l-.88.88a1 1 0 1 1-3-3l2.81-2.81a5.79 5.79 0 0 1 7.06-.87l.47.28a2 2 0 0 0 1.42.25L21 4", "m21 3 1 11h-2", "M3 3 2 14l6.5 6.5a1 1 0 1 0 3-3", "M3 4h8"] },
  "brick-wall": { paths: ["M3 3h18v18H3z", "M3 9h18", "M3 15h18", "M9 3v6", "M15 9v6", "M9 15v6"] },
  axe: { paths: ["m14 12-8.5 8.5a2.12 2.12 0 1 1-3-3L11 9", "M15 13 9 7l4-4 6 6h3a8 8 0 0 1-7 4Z"] },
  "mountain-snow": { paths: ["m8 3 4 8 5-5 5 15H2Z", "M4.14 15.08c2.62-1.57 5.24-1.43 7.86.42 2.74 1.94 5.49 2 8.23.19"] },
};

// Map emoji to icon name
const EMOJI_MAP: Record<string, string> = {
  "🏠": "home", "🏢": "building", "🏭": "factory", "💧": "droplets",
  "🌲": "trees", "🌿": "leaf", "⛏️": "pickaxe", "🚜": "truck",
  "🔧": "wrench", "⚡": "zap", "🌧️": "cloud_rain", "🌩️": "cloud_rain",
  "🏗️": "construction", "🏘️": "home", "🏚️": "construction",
  "🪨": "mountain", "🔨": "hammer", "📋": "ruler", "📏": "ruler",
  "📐": "ruler", "🔄": "undo", "🔌": "plug", "🐟": "fish",
  "🅿️": "square-parking", "🚗": "car", "🚧": "hard-hat",
  "🚰": "droplets", "🍂": "leaf", "⚠️": "alert", "↩️": "undo",
  "⚖️": "scale", "🏊": "pool", "⚽": "mountain",
  "⛰️": "mountain-snow", "❄️": "snowflake", "🌊": "water-waves",
  "🌳": "tree-deciduous", "🎣": "fishing-rod", "🏡": "home-garden",
  "🐜": "bug", "🐴": "horse", "💎": "gem", "💰": "dollar-sign",
  "🚽": "toilet", "🛤️": "railroad", "🤝": "handshake",
  "🧱": "brick-wall", "🪓": "axe",
};

const pathVariants: Variants = {
  normal: { pathLength: 1, opacity: 1 },
  animate: {
    pathLength: [0, 1],
    opacity: [0, 1],
    transition: { duration: 0.5, opacity: { duration: 0.1 } },
  },
};

interface SituationIconProps {
  icon: string;
  size?: number;
  className?: string;
}

export default function SituationIcon({ icon, size = 32, className = "" }: SituationIconProps) {
  const controls = useAnimation();
  
  // Resolve emoji to icon name, or use directly if it's already a name
  const iconName = EMOJI_MAP[icon] || icon;
  const iconData = ICONS[iconName];

  // Fallback: render the emoji if we don't have a mapping
  if (!iconData) {
    return <span className={className} style={{ fontSize: size * 0.8 }}>{icon}</span>;
  }

  return (
    <div
      className={className}
      onMouseEnter={() => controls.start("animate")}
      onMouseLeave={() => controls.start("normal")}
      style={{ cursor: "default" }}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {iconData.paths.map((d, i) => (
          <motion.path
            key={i}
            d={d}
            variants={pathVariants}
            animate={controls}
            initial="normal"
            transition={{ delay: i * 0.08 }}
          />
        ))}
      </svg>
    </div>
  );
}
