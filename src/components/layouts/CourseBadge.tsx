'use client';

import { motion } from 'framer-motion';
import type { CourseBadgeType } from 'src/data/courses';

interface RibbonBadgeProps {
  type: CourseBadgeType;
}

/**
 * Top-left ribbon badge shown on the banner: "🔥 Popular" or "🆕 New Course".
 * Renders nothing if `type` is null.
 */
export function RibbonBadge({ type }: RibbonBadgeProps) {
  if (!type) return null;

  const config =
    type === 'popular'
      ? { label: '🔥 Popular', bg: 'bg-gradient-to-r from-pink-500 to-orange-500' }
      : { label: '🚀 New', bg: 'bg-gradient-to-r from-emerald-500 to-teal-500' };

  return (
    <motion.span
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4 }}
      className={`absolute top-3 left-3 z-20 rounded-full px-3 py-1 text-xs font-bold text-white shadow-lg ${config.bg}`}
    >
      {config.label}
    </motion.span>
  );
}

/**
 * Circular "Early Bird" discount badge, shown near the pricing block.
 */
export function EarlyBirdBadge() {
  return (
    <motion.div
      initial={{ scale: 0, rotate: -15 }}
      whileInView={{ scale: 1, rotate: -12 }}
      viewport={{ once: true }}
      transition={{ type: 'spring', stiffness: 260, damping: 16, delay: 0.2 }}
      className="relative flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-amber-400 via-yellow-500 to-orange-500 text-center shadow-lg"
    >
      <span className="text-[9px] font-extrabold leading-tight text-center text-indigo-950">
        EARLY
        <br />
        BIRD
        <br />
        DISCOUNT
      </span>
    </motion.div>
  );
}
