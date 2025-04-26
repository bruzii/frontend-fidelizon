'use client';

import React, { useState, useEffect } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Image from 'next/image';
import { ImageIcon } from 'lucide-react';

export type CarouselImage = {
  position: number;
  file?: File | string;
};

interface ImageCarouselProps {
  images: CarouselImage[];
  height?: string | number;
  getImageUrl: (file: File | string) => string;
  className?: string;
  placeholderClassName?: string;
  imageClassName?: string;
  indicatorClassName?: string;
}

export function ImageCarousel({
  images,
  height = '12rem',
  getImageUrl,
  className = '',
  placeholderClassName = '',
  imageClassName = '',
  indicatorClassName = '',
}: ImageCarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel();
  const [currentSlide, setCurrentSlide] = useState(0);

  // Set up Embla Carousel event listeners
  useEffect(() => {
    if (!emblaApi) return;

    const onSelect = () => {
      setCurrentSlide(emblaApi.selectedScrollSnap());
    };

    emblaApi.on('select', onSelect);

    // Initial call to set the current slide
    onSelect();

    return () => {
      emblaApi.off('select', onSelect);
    };
  }, [emblaApi]);

  // Sort images by position
  const sortedImages = [...images].sort((a, b) => a.position - b.position);

  return (
    <div className={`w-full relative ${className}`}>
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex" style={{ height }}>
          {sortedImages.map(image => (
            <div
              key={image.position}
              className="flex-[0_0_100%] flex justify-center items-center min-w-0 relative"
              style={{ height }}
            >
              {image.file ? (
                <div className="relative h-full w-[90%]">
                  <Image
                    src={getImageUrl(image.file)}
                    alt={`Image ${image.position + 1}`}
                    fill
                    priority={image.position === 0}
                    className={`object-cover rounded-lg ${imageClassName}`}
                  />
                </div>
              ) : (
                <div
                  className={`h-full w-[90%] object-cover rounded-lg border-dashed border-2 border-gray-300 flex items-center justify-center ${placeholderClassName}`}
                >
                  <ImageIcon className="text-gray-400" size={78} />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Carousel indicators */}
      <div className="flex w-full justify-center gap-3 mt-2">
        {sortedImages.map((_, index) => (
          <button
            key={index}
            type="button"
            onClick={() => emblaApi?.scrollTo(index)}
            className={`w-2 h-2 rounded-full border transition-colors ${
              currentSlide === index ? 'bg-black' : 'bg-white/50'
            } ${indicatorClassName}`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
