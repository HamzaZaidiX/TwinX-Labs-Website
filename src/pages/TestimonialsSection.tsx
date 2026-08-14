import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { Expand, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { TESTIMONIALS } from '@/data/testimonials';
import { useCarouselButtons, ArrowButton, CarouselDots } from '@/components/layouts/CarouselButtons';

interface TestimonialsSectionProps {
  testimonialsRef?: React.RefObject<HTMLElement | null>;
}

export function TestimonialsSection({ testimonialsRef }: TestimonialsSectionProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: 'start', slidesToScroll: 1 },
    [Autoplay({ delay: 4000, stopOnInteraction: false, stopOnMouseEnter: true })]
  );

  const {
    selectedIndex: dotIndex,
    scrollSnaps,
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
    onDotButtonClick,
  } = useCarouselButtons(emblaApi);

  // Escape key + arrow key navigation + scroll lock for the lightbox
  useEffect(() => {
    if (selectedIndex === null) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedIndex(null);
      if (e.key === 'ArrowLeft') {
        setSelectedIndex((prev) => (prev === null ? null : (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length));
      }
      if (e.key === 'ArrowRight') {
        setSelectedIndex((prev) => (prev === null ? null : (prev + 1) % TESTIMONIALS.length));
      }
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKey);
    };
  }, [selectedIndex]);

  return (
    <section
      ref={testimonialsRef as React.RefObject<HTMLElement>}
      id="testimonials"
      className="w-full py-16 md:py-24 bg-gradient-to-b from-[#f8f9fc] to-white"
    >
      <div className="container mx-auto px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-emerald-50 text-emerald-600 text-sm font-semibold mb-4">
            Testimonials
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight text-balance">
            What Parents Are Saying
          </h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto text-pretty">
            Feedback from Happy Parents whose Children's have learned with TwinX Labs.
          </p>
        </motion.div>

        <div className="relative">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="-ml-4 flex touch-pan-y">
              {TESTIMONIALS.map((t, index) => (
                <div
                  key={t.id}
                  className="min-w-0 shrink-0 grow-0 basis-[85%] pl-4 sm:basis-1/2 lg:basis-1/3"
                >
                  <div className="h-full py-1">
                    <button
                      type="button"
                      onClick={() => setSelectedIndex(index)}
                      className="group relative block w-full aspect-[4/5] overflow-hidden rounded-2xl shadow-lg border border-border/60"
                    >
                      <img
                        src={t.imageUrl}
                        alt={t.name}
                        loading="lazy"
                        className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                        <h3 className="text-white font-bold text-sm text-left truncate line-clamp-1">{t.name}</h3>
                        <p className="text-white/80 text-xs text-left">{t.caption}</p>
                      </div>
                      <div className="absolute top-3 right-3 h-8 w-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <Expand className="w-4 h-4 text-white" />
                      </div>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Desktop side arrows */}
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

          {/* Mobile arrows + dots */}
          <div className="mt-6 flex items-center justify-center gap-4">
            <div className="md:hidden">
              <ArrowButton direction="prev" onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
            </div>
            <CarouselDots scrollSnaps={scrollSnaps} selectedIndex={dotIndex} onDotButtonClick={onDotButtonClick} />
            <div className="md:hidden">
              <ArrowButton direction="next" onClick={onNextButtonClick} disabled={nextBtnDisabled} />
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 md:p-8"
            onClick={() => setSelectedIndex(null)}
          >
            <button
              type="button"
              onClick={() => setSelectedIndex(null)}
              aria-label="Close"
              className="absolute top-4 right-4 md:top-6 md:right-6 z-10 h-11 w-11 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedIndex((prev) => (prev === null ? null : (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length));
              }}
              aria-label="Previous testimonial"
              className="absolute left-2 md:left-6 z-10 h-11 w-11 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedIndex((prev) => (prev === null ? null : (prev + 1) % TESTIMONIALS.length));
              }}
              aria-label="Next testimonial"
              className="absolute right-2 md:right-6 z-10 h-11 w-11 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            <motion.div
              key={selectedIndex}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
              className="max-w-4xl max-h-[85vh] w-full flex flex-col items-center"
            >
              <img
                src={TESTIMONIALS[selectedIndex].imageUrl}
                alt={TESTIMONIALS[selectedIndex].name}
                className="max-h-[75vh] w-auto max-w-full object-contain rounded-lg shadow-2xl"
              />
              <div className="mt-4 text-center">
                <h3 className="text-white font-bold text-lg">{TESTIMONIALS[selectedIndex].name}</h3>
                <p className="text-white/70 text-sm mt-1">{TESTIMONIALS[selectedIndex].caption}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
