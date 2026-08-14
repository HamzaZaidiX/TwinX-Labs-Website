import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { PROMOTIONS } from '@/data/promotions';

/**
 * PromoPopup — a promotional modal shown every time the site loads.
 *
 * Behavior:
 * - Opens automatically shortly after the page loads (no localStorage/sessionStorage,
 *   so it reappears on every fresh page load, by design).
 * - Clicking the dark backdrop does NOT close it — only the explicit close (X)
 *   button or the Escape key closes it, so the user must consciously dismiss it.
 * - Carousel of promotions (image, description, button text, button link) —
 *   all content driven by the PROMOTIONS array in data/promotions.ts.
 */
export function PromoPopup() {
  const [isOpen, setIsOpen] = useState(false);

  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: 'start' },
    [Autoplay({ delay: 4500, stopOnInteraction: false, stopOnMouseEnter: true })]
  );

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const onDotClick = useCallback((index: number) => emblaApi?.scrollTo(index), [emblaApi]);
  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    setScrollSnaps(emblaApi.scrollSnapList());
    onSelect();
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
  }, [emblaApi, onSelect]);

  // Open the popup shortly after the page loads
  useEffect(() => {
    const timer = setTimeout(() => setIsOpen(true), 800);
    return () => clearTimeout(timer);
  }, []);

  // Escape key closes it; lock background scroll while open
  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKey);
    };
  }, [isOpen]);

  if (PROMOTIONS.length === 0) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[200] flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
          // Intentionally no onClick here — clicking the backdrop does not close the popup.
        >
          <motion.div
            initial={{ scale: 0.92, opacity: 0, y: 12 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.92, opacity: 0, y: 12 }}
            transition={{ type: 'spring', stiffness: 300, damping: 26 }}
            className="relative w-full max-w-md rounded-3xl overflow-hidden bg-card shadow-2xl border border-border/60"
          >
            {/* Close button */}
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              aria-label="Close promotion"
              className="absolute top-3 right-3 z-20 h-9 w-9 flex items-center justify-center rounded-full bg-black/40 hover:bg-black/60 text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Carousel */}
            <div className="overflow-hidden" ref={emblaRef}>
              <div className="flex">
                {PROMOTIONS.map((promo) => (
                  <div key={promo.id} className="min-w-0 shrink-0 grow-0 basis-full">
                    <div className="relative w-full max-h-[70vh] overflow-hidden bg-muted flex items-center justify-center">
  <img
    src={promo.imageUrl}
    alt={promo.description}
    className="w-full h-auto max-h-[70vh] object-contain"
  />
</div>

                    <div className="p-6 flex flex-col items-center text-center gap-4">
                      {/* <p className="text-sm text-foreground leading-relaxed line-clamp-1">{promo.description}</p> */}
                      <a
                        href={promo.buttonLink}
                        target={promo.buttonLink.startsWith('http') ? '_blank' : undefined}
                        rel={promo.buttonLink.startsWith('http') ? 'noopener noreferrer' : undefined}
                        onClick={() => setIsOpen(false)}
                        className="w-full inline-flex items-center justify-center h-11 px-6 rounded-full font-semibold text-white bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:opacity-90 transition-opacity shadow-lg shadow-purple-500/25"
                      >
                        {promo.buttonText}
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Arrows — only show if more than one promotion */}
            {PROMOTIONS.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={scrollPrev}
                  aria-label="Previous promotion"
                  className="absolute left-2 top-[36%] -translate-y-1/2 z-20 h-9 w-9 flex items-center justify-center rounded-full bg-white/80 hover:bg-white text-foreground shadow-md transition-colors"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  type="button"
                  onClick={scrollNext}
                  aria-label="Next promotion"
                  className="absolute right-2 top-[36%] -translate-y-1/2 z-20 h-9 w-9 flex items-center justify-center rounded-full bg-white/80 hover:bg-white text-foreground shadow-md transition-colors"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>

                {/* Dots */}
                <div className="flex items-center justify-center gap-2 pb-5">
                  {scrollSnaps.map((_, index) => (
                    <button
                      key={index}
                      type="button"
                      aria-label={`Go to promotion ${index + 1}`}
                      onClick={() => onDotClick(index)}
                      className={`h-2 rounded-full transition-all duration-300 ${
                        index === selectedIndex
                          ? 'w-6 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500'
                          : 'w-2 bg-border hover:bg-muted-foreground/40'
                      }`}
                    />
                  ))}
                </div>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
