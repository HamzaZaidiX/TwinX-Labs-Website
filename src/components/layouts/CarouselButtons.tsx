'use client';

import { useCallback, useEffect, useState } from 'react';
import type { EmblaCarouselType } from 'embla-carousel';
import { ChevronLeft, ChevronRight } from 'lucide-react';

type UseButtonType = {
  selectedIndex: number;
  scrollSnaps: number[];
  prevBtnDisabled: boolean;
  nextBtnDisabled: boolean;
  onPrevButtonClick: () => void;
  onNextButtonClick: () => void;
  onDotButtonClick: (index: number) => void;
};

/**
 * Shared hook that wires up prev/next + dot navigation state for an Embla instance.
 */
export function useCarouselButtons(emblaApi: EmblaCarouselType | undefined): UseButtonType {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);
  const [prevBtnDisabled, setPrevBtnDisabled] = useState(true);
  const [nextBtnDisabled, setNextBtnDisabled] = useState(true);

  const onPrevButtonClick = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const onNextButtonClick = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);
  const onDotButtonClick = useCallback((index: number) => emblaApi?.scrollTo(index), [emblaApi]);

  const onInit = useCallback((api: EmblaCarouselType) => {
    setScrollSnaps(api.scrollSnapList());
  }, []);

  const onSelect = useCallback((api: EmblaCarouselType) => {
    setSelectedIndex(api.selectedScrollSnap());
    setPrevBtnDisabled(!api.canScrollPrev());
    setNextBtnDisabled(!api.canScrollNext());
  }, []);

  useEffect(() => {
    if (!emblaApi) return;
    onInit(emblaApi);
    onSelect(emblaApi);
    emblaApi.on('reInit', onInit).on('reInit', onSelect).on('select', onSelect);
  }, [emblaApi, onInit, onSelect]);

  return {
    selectedIndex,
    scrollSnaps,
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
    onDotButtonClick,
  };
}

interface ArrowButtonProps {
  disabled: boolean;
  onClick: () => void;
  direction: 'prev' | 'next';
}

export function ArrowButton({ disabled, onClick, direction }: ArrowButtonProps) {
  const Icon = direction === 'prev' ? ChevronLeft : ChevronRight;
  return (
    <button
      type="button"
      aria-label={direction === 'prev' ? 'Previous course' : 'Next course'}
      onClick={onClick}
      disabled={disabled}
      className="flex h-11 w-11 items-center justify-center rounded-full border border-border/60 bg-white/90 text-foreground shadow-md backdrop-blur transition-all hover:scale-105 hover:bg-white disabled:cursor-not-allowed disabled:opacity-30 dark:bg-slate-800/90"
    >
      <Icon className="h-5 w-5" />
    </button>
  );
}

interface DotsProps {
  scrollSnaps: number[];
  selectedIndex: number;
  onDotButtonClick: (index: number) => void;
}

export function CarouselDots({ scrollSnaps, selectedIndex, onDotButtonClick }: DotsProps) {
  return (
    <div className="flex items-center justify-center gap-2">
      {scrollSnaps.map((_, index) => (
        <button
          key={index}
          type="button"
          aria-label={`Go to slide ${index + 1}`}
          onClick={() => onDotButtonClick(index)}
          className={`h-2.5 rounded-full transition-all duration-300 ${
            index === selectedIndex
              ? 'w-7 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500'
              : 'w-2.5 bg-border hover:bg-muted-foreground/40'
          }`}
        />
      ))}
    </div>
  );
}
