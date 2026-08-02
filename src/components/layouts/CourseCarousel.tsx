'use client';

import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import type { Course } from '@/data/courses';
import { CourseCard } from './CourseCard';
import { ArrowButton, CarouselDots, useCarouselButtons } from './CarouselButtons';

interface CourseCarouselProps {
  courses: Course[];
  onEnroll?: (course: Course) => void;
}

export function CourseCarousel({ courses, onEnroll }: CourseCarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: 'start', slidesToScroll: 1 },
    [Autoplay({ delay: 4500, stopOnInteraction: false, stopOnMouseEnter: true })]
  );

  const { selectedIndex, scrollSnaps, prevBtnDisabled, nextBtnDisabled, onPrevButtonClick, onNextButtonClick, onDotButtonClick } =
    useCarouselButtons(emblaApi);

  return (
    <div className="relative">
      {/* Viewport */}
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="-ml-6 flex touch-pan-y">
          {courses.map((course) => (
            <div
              key={course.id}
              className="min-w-0 shrink-0 grow-0 basis-full pl-6 sm:basis-1/2 lg:basis-1/3"
            >
              <div className="h-full py-2">
                <CourseCard course={course} onEnroll={onEnroll} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Arrows -- hidden on small screens, sit beside the track on desktop */}
      <div className="pointer-events-none absolute inset-y-0 -left-4 hidden items-center md:-left-5 md:flex">
        <div className="pointer-events-auto">
          <ArrowButton direction="prev" onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
        </div>
      </div>
      <div className="pointer-events-none absolute inset-y-0 -right-4 hidden items-center md:-right-5 md:flex">
        <div className="pointer-events-auto">
          <ArrowButton direction="next" onClick={onNextButtonClick} disabled={nextBtnDisabled} />
        </div>
      </div>

      {/* Mobile arrows (inline, under the cards) + dots */}
      <div className="mt-6 flex items-center justify-center gap-4">
        <div className="md:hidden">
          <ArrowButton direction="prev" onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
        </div>
        <CarouselDots scrollSnaps={scrollSnaps} selectedIndex={selectedIndex} onDotButtonClick={onDotButtonClick} />
        <div className="md:hidden">
          <ArrowButton direction="next" onClick={onNextButtonClick} disabled={nextBtnDisabled} />
        </div>
      </div>
    </div>
  );
}
