'use client';

import { motion } from 'framer-motion';
import { COURSES, type Course } from '../data/courses';
import { CourseCarousel } from '../components/layouts/CourseCarousel';

interface CoursesSectionProps {
  coursesRef?: React.RefObject<HTMLElement | null>;
  onEnroll?: (course: Course) => void;
}

export function CoursesSection({ coursesRef, onEnroll }: CoursesSectionProps) {
  return (
    <section ref={coursesRef} id="courses" className="w-full py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <span className="mb-4 inline-block rounded-full bg-cyan-50 px-4 py-1.5 text-sm font-semibold text-cyan-600 dark:bg-pink-300">
            Our Programs
          </span>
          <h2 className="text-3xl font-bold tracking-tight text-foreground text-balance md:text-4xl">
            Courses Designed for Young Minds
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground text-pretty">
            From first-time coders to aspiring engineers, we have programs tailored to
            every age and skill level.
          </p>
        </motion.div>

        <CourseCarousel courses={COURSES} onEnroll={onEnroll} />
      </div>
    </section>
  );
}
