'use client';

import { motion } from 'framer-motion';
import { Code2, Palette, Bot, Video, Lightbulb, BookOpen, Users, Monitor,  Music, Gamepad2, Sparkles, Wand2, CodeXml, Play, ShieldCheck, ArrowRight } from 'lucide-react';
import type { Course } from 'src/data/courses';
import { RibbonBadge, EarlyBirdBadge } from './CourseBadge';
import { ToolScroller } from './ToolScroller';

const COURSE_ICONS: Record<Course['icon'], React.ElementType> = {
  code: Code2,
  palette: Palette,
  bot: Bot,
  video: Video,
  lightbulb: Lightbulb,
  bookopen: BookOpen,
  music: Music,
  gamepad: Gamepad2,
  sparkles: Sparkles,
  wand: Wand2,
  codeXml: CodeXml,
  play: Play,
};

interface CourseCardProps {
  course: Course;
  onEnroll?: (course: Course) => void;
}

export function CourseCard({ course, onEnroll }: CourseCardProps) {
  const Icon = COURSE_ICONS[course.icon];
  const savings = course.price - course.discountPrice;

  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ type: 'spring', stiffness: 300, damping: 22 }}
      className="flex h-full flex-col overflow-hidden rounded-3xl border border-border/60 bg-white/70 shadow-md backdrop-blur-xl transition-shadow duration-300 hover:shadow-2xl dark:bg-slate-900/60"
    >
      {/* ---- Banner ---- */}
<div className={`relative h-36 w-full shrink-0 overflow-hidden bg-gradient-to-br ${course.gradient}`}>
  <RibbonBadge type={course.badge} />

  {course.bannerImage ? (
    <>
      {/* photo, loaded from an external URL */}
      <img
        src={course.bannerImage}
        alt={course.title}
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover"
      />
      {/* gradient overlay -- keeps badge/icon readable and adds brand color on top of the photo */}
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(180deg, rgba(11,18,48,0.15) 0%, rgba(11,18,48,0.25) 55%, rgba(11,18,48,0.75) 100%)`,
        }}
      />
      <div className={`absolute inset-0 bg-gradient-to-br ${course.gradient} opacity-25 mix-blend-overlay`} />
    </>
  ) : (
    // fallback for any course that doesn't have a bannerImage yet
    <div className="absolute inset-0 opacity-20">
      <div className="absolute -top-6 -right-6 h-28 w-28 rounded-full bg-white/40 blur-2xl" />
      <div className="absolute bottom-0 left-8 h-20 w-20 rounded-full bg-white/30 blur-xl" />
    </div>
  )}

  <motion.div
    initial={{ scale: 0.8, opacity: 0 }}
    whileInView={{ scale: 1, opacity: 1 }}
    viewport={{ once: true }}
    transition={{ duration: 0.4 }}
    className="absolute bottom-3 left-3 z-10"
  >
    <div className="flex h-12 w-12 items-center justify-center rounded-2xl text-white shadow-inner">
      <Icon className="h-6 w-6" />
    </div>
  </motion.div>
</div>

      {/* ---- Body ---- */}
      <div className="flex flex-1 flex-col p-5">
        <p className="mb-1 text-[11px] font-bold uppercase tracking-wider text-primary">
          {course.tagline}
        </p>
        <h3 className="mb-2 text-lg font-bold leading-snug text-foreground">{course.title}</h3>
        <p className="mb-4 line-clamp-3 flex-1 text-sm leading-relaxed text-muted-foreground">
          {course.description}
        </p>

        {/* meta chips */}
        <div className="mb-4 flex flex-wrap gap-2">
          <span className="inline-flex items-center gap-1 rounded-full bg-muted px-2.5 py-1 text-[11px] font-semibold text-muted-foreground">
            <Users className="h-3 w-3" /> {course.ageRange}
          </span>
          <span className="inline-flex items-center gap-1 rounded-full bg-muted px-2.5 py-1 text-[11px] font-semibold text-muted-foreground">
            <Monitor className="h-3 w-3" /> {course.duration}
          </span>
          {course.noTechRequired && (
            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-semibold text-emerald-600 dark:bg-emerald-950/40">
              <ShieldCheck className="h-3 w-3" /> No Tech Knowledge Required
            </span>
          )}
        </div>

        {/* animated tools */}
        {course.tools && (
          <div className="mb-4">
            <ToolScroller tools={course.tools} />
          </div>
        )}

        {/* pricing + CTA */}
        <div className="mt-auto flex items-end justify-between gap-3 border-t border-border/60 pt-4">
          <div className="flex items-center gap-3">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-muted-foreground line-through">
                  Rs. {course.price.toLocaleString()}
                </span>
                {course.earlyBird && (
                  <span className="rounded-full bg-red-50 px-2 py-0.5 text-[10px] font-bold text-red-500 dark:bg-red-950/40">
                    SAVE {savings}
                  </span>
                )}
              </div>
              <span className="text-2xl font-extrabold text-foreground">
                Rs. {course.discountPrice.toLocaleString()}
              </span>
            </div>
            {course.earlyBird && <EarlyBirdBadge />}
          </div>
        </div>

        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={() => onEnroll?.(course)}
          className="mt-4 flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-purple-500/25 transition-opacity hover:opacity-90"
        >
          Enroll Now <ArrowRight className="h-4 w-4" />
        </motion.button>
      </div>
    </motion.div>
  );
}
