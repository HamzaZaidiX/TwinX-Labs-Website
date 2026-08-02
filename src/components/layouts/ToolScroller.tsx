'use client';

import { motion } from 'framer-motion';
import { Bot, Image as ImageIcon, Video, Music, Gamepad2, Sparkles, Wand2, Palette, CodeXml, Play } from 'lucide-react';
import type { CourseTool } from 'src/data/courses';

const ICONS: Record<CourseTool['icon'], React.ElementType> = {
  bot: Bot,
  image: ImageIcon,
  video: Video,
  music: Music,
  gamepad: Gamepad2,
  sparkles: Sparkles,
  wand: Wand2,
  palette: Palette,
  codeXml: CodeXml,
  play: Play,
};

interface ToolScrollerProps {
  tools: CourseTool[];
}

/**
 * A seamless, auto-scrolling row of tool badges ("ChatGPT", "AI tools", ...).
 * The tool list is duplicated once so the marquee loops without a visible seam.
 */
export function ToolScroller({ tools }: ToolScrollerProps) {
  if (!tools?.length) return null;
  const looped = [...tools, ...tools];

  return (
    <div>
      <p className="mb-2 text-[11px] font-bold uppercase tracking-wide text-muted-foreground">
        Tools you&apos;ll explore
      </p>
      <div className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-8 bg-gradient-to-r from-white to-transparent dark:from-slate-900" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-8 bg-gradient-to-l from-white to-transparent dark:from-slate-900" />

        <motion.div
          className="flex gap-2 pr-2"
          animate={{ x: ['0%', '-50%'] }}
          transition={{ duration: 14, ease: 'linear', repeat: Infinity }}
        >
          {looped.map((tool, i) => {
            const Icon = ICONS[tool.icon];
            return (
              <span
                key={`${tool.name}-${i}`}
                className="flex shrink-0 items-center gap-1.5 rounded-full border border-border/60 bg-muted/50 px-3 py-1.5 text-xs font-semibold text-foreground"
              >
                <Icon className="h-3.5 w-3.5" style={{ color: tool.color }} />
                {tool.name}
              </span>
            );
          })}
        </motion.div>
      </div>
    </div>
  );
}
