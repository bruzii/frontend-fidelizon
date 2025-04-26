'use client';

import React, { useState, useEffect } from 'react';
import { Badge } from '@/components/ui/badge';
import { Clock, MapPin, Phone, Star, Truck, Globe, Instagram, Facebook, Image } from 'lucide-react';
import { useFormContext } from 'react-hook-form';
import { EstablishmentProfileFormValues } from '@/schemas/establishment.schema';
import useEmblaCarousel from 'embla-carousel-react';
import { EstablishmentResponseDto } from '@/types/api';

interface EstablishmentProfilePreviewProps {
  address?: string;
  establishment?: EstablishmentResponseDto;
}

export default function EstablishmentProfilePreview({
  address,
  establishment,
}: EstablishmentProfilePreviewProps) {
  // Initialize Embla Carousel with proper options
  const [emblaRef, emblaApi] = useEmblaCarousel();
  const [currentSlide, setCurrentSlide] = useState(0);

  // Use form context to access form values directly
  const { watch } = useFormContext<EstablishmentProfileFormValues>();

  // Observer toutes les valeurs du formulaire
  const formValues = watch();
  const pictures = watch('pictures') || [];

  const {
    primary_color,
    name,
    description,
    price_range,
    certifications,
    social_media_links,
    opening_days,
  } = formValues;

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

  // Helper function to display opening status text
  const formatOpeningHours = () => {
    const closedToday = {
      isCurrentlyOpen: false,
      message: 'Fechado hoje',
    };
    if (!opening_days) return closedToday;

    const today = new Date().getDay();
    const todayInfo = opening_days.find(day => day.day === today);

    if (!todayInfo || !todayInfo.is_open) return closedToday;

    const now = new Date();
    const currentHour = now.getHours();
    const currentMinutes = now.getMinutes();
    const currentTimeString = `${currentHour.toString().padStart(2, '0')}:${currentMinutes.toString().padStart(2, '0')}`;

    let nextOpeningTime = '';

    for (const hours of todayInfo.opening_hours) {
      if (currentTimeString >= hours.start_time && currentTimeString <= hours.end_time) {
        return {
          isCurrentlyOpen: true,
          message: 'Aberto agora',
        };
      }

      if (currentTimeString < hours.start_time) {
        nextOpeningTime = hours.start_time;
        break;
      }
    }

    if (nextOpeningTime) {
      return {
        isCurrentlyOpen: false,
        message: `Fechado : abre às ${nextOpeningTime}`,
      };
    } else {
      return closedToday;
    }
  };

  // Dictionary for certification labels in Portuguese
  const certificationLabels: Record<string, string> = {
    vegetarian: 'Vegetariano',
    vegan: 'Vegano',
    gluten_free: 'Sem Glúten',
    lactose_free: 'Sem Lactose',
    kosher: 'Kosher',
    halal: 'Halal',
    bio: 'Bio/Orgânico',
  };

  return (
    <div
      className="border rounded-lg bg-modules-beige-light overflow-hidden flex flex-col mobile-preview"
      style={{ maxWidth: '375px', margin: '0 auto' }}
    >
      {/* Phone Status Bar */}
      <div className="bg-black text-white p-2 flex justify-between items-center text-xs">
        <span>{new Date().toLocaleTimeString()}</span>
        <div className="flex items-center gap-1">
          <div className="h-2 w-2 rounded-full bg-white"></div>
          <div className="h-2 w-2 rounded-full bg-white"></div>
          <div className="h-2 w-2 rounded-full bg-white"></div>
          <div className="h-2 w-2 rounded-full bg-white"></div>
        </div>
      </div>

      {/* Header with Language */}
      <div className="p-2 flex justify-end">
        <div className="flex items-center gap-1 text-xs">
          <div className="w-4 h-3 bg-green-600 relative overflow-hidden inline-block rounded-sm">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-3 h-3 bg-red-600 rounded-full transform translate-x-1/4"></div>
            </div>
          </div>
          <span>Português</span>
        </div>
      </div>

      {/* Image Carousel */}
      <div className="w-full relative">
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex h-48">
            {[1, 2, 3].map((photo, index) => (
              <div
                key={index}
                className="flex-[0_0_100%] flex justify-center items-center min-w-0 relative h-48"
              >
                {establishment?.pictures[index]?.signedUrl ||
                pictures[index]?.file instanceof File ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={
                      pictures[index]?.file instanceof File
                        ? URL.createObjectURL(pictures[index]?.file as File)
                        : establishment?.pictures[index]?.signedUrl
                    }
                    alt={`Establishment photo ${index + 1}`}
                    className="h-full w-[90%] object-cover rounded-lg"
                  />
                ) : (
                  <div className="h-full w-[90%] object-cover rounded-lg border-dashed border-2 border-gray-300 flex items-center justify-center">
                    <Image className="text-gray-400" size={78} />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Custom Carousel indicators */}
        <div className="flex w-full justify-center gap-3 mt-2">
          {[1, 2, 3].map((_, index) => (
            <button
              key={index}
              type="button"
              onClick={() => emblaApi?.scrollTo(index)}
              className={`w-2 h-2 rounded-full border transition-colors ${
                currentSlide === index ? 'bg-black' : 'bg-white/50'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Restaurant Info */}
      <div className="p-4">
        <h2 className="text-xl font-bold mb-1">{name || 'XIU - Street-food'}</h2>
        <p className="text-sm text-gray-600 mb-2">{address || '48 Rue Monge, 75005 Paris'}</p>
        <div className="flex items-center gap-3 mb-2">
          <div className="flex items-center">
            <div className="p-1 rounded-md" style={{ backgroundColor: primary_color }}>
              <Star className="w-4 h-4 text-white" />
            </div>
            <span className="ml-1 font-semibold">4.8</span>
          </div>

          <div className="flex items-center gap-1 border px-2 py-0.5 rounded-md text-gray-700">
            <span className="text-xs">{price_range || '5-10'} R$</span>
          </div>
        </div>

        <p className="text-sm text-gray-600 mb-3">{description || 'Comida de rua vietnamita'}</p>

        {/* Status */}
        <div
          className="py-2 px-3 rounded-md flex items-center justify-between"
          style={{
            backgroundColor: formatOpeningHours().isCurrentlyOpen ? '#5bb053' : '#888888',
            color: 'white',
          }}
        >
          <div className="flex items-center">
            <Clock className="w-4 h-4 mr-2" />
            <span>{formatOpeningHours().message}</span>
          </div>
          <div className="transform rotate-90">›</div>
        </div>
      </div>

      {/* Links */}
      <div className="p-4 border-b ">
        <h3 className="text-lg font-semibold mb-3">Links</h3>
        <div className="grid grid-cols-2 gap-3 ">
          <div className=" bg-white border rounded-lg p-3 flex flex-col items-center justify-center">
            <Truck className="mb-1 w-5 h-5" />
            <span className="text-sm">Entregas</span>
          </div>
          <div className=" bg-white border rounded-lg p-3 flex flex-col items-center justify-center">
            <Globe className="mb-1 w-5 h-5" />
            <span className="text-sm">Redes</span>
          </div>
          <div className=" bg-white border rounded-lg p-3 flex flex-col items-center justify-center">
            <Phone className="mb-1 w-5 h-5" />
            <span className="text-sm">Telefone</span>
          </div>
          <div className=" bg-white border rounded-lg p-3 flex flex-col items-center justify-center text-gray-300">
            <div className="mb-1 w-5 h-5">🛍️</div>
            <span className="text-sm">Click & Collect</span>
          </div>
        </div>
      </div>

      {/* Dietas */}
      {certifications && certifications.length > 0 && (
        <div className="p-4 border-b ">
          <h3 className="text-lg font-semibold mb-3">Dietas</h3>
          <div className="flex flex-wrap gap-2 ">
            {certifications.map((cert: string) => (
              <Badge key={cert} variant="outline" className="py-1 px-3 bg-white">
                {certificationLabels[cert] || cert}
              </Badge>
            ))}
          </div>
        </div>
      )}

      {/* Localização */}
      <div className="p-4 border-b ">
        <h3 className="text-lg font-semibold mb-3">Localização</h3>
        <div className="bg-gray-200 h-48 rounded-lg relative">
          <div className="absolute inset-0 flex items-center justify-center">
            <MapPin size={24} />
          </div>
          <div className="absolute top-2 left-2 bg-white rounded-md flex">
            <button className="py-1 px-3 text-sm border-r">Plan</button>
            <button className="py-1 px-3 text-sm">Satellite</button>
          </div>
          <div className="absolute bottom-0 left-0 right-0">
            <button className="w-full py-3 flex items-center justify-center gap-2 bg-black text-white rounded-b-lg">
              <MapPin size={18} />
              <span>Obter Direções</span>
            </button>
          </div>
        </div>
      </div>

      {/* Social Media Links */}
      {social_media_links && (
        <div className="p-4 flex gap-3 border-b ">
          {social_media_links.facebook && (
            <a
              href={social_media_links.facebook}
              target="_blank"
              className="w-11 h-11 rounded-full flex items-center justify-center bg-blue-600 text-white"
            >
              <Facebook size={28} />
            </a>
          )}

          {social_media_links.instagram && (
            <a
              href={social_media_links.instagram}
              target="_blank"
              className="w-11 h-11 rounded-full flex items-center justify-center bg-gradient-to-r from-purple-500 to-pink-500 text-white"
            >
              <Instagram size={28} />
            </a>
          )}

          {social_media_links.tiktok && (
            <a
              href={social_media_links.tiktok}
              target="_blank"
              className="w-11 h-11 rounded-full flex items-center justify-center bg-black text-white"
            >
              <span className="text-xs">TikTok</span>
            </a>
          )}

          {social_media_links.website && (
            <a
              href={social_media_links.website}
              target="_blank"
              className="w-11 h-11 rounded-full flex items-center justify-center bg-green-600 text-white"
            >
              <Globe size={28} />
            </a>
          )}
        </div>
      )}

      {/* Style Tag for custom CSS */}
      <style jsx>{`
        .mobile-preview {
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
          max-height: 700px;
          overflow-y: auto;
        }
      `}</style>
    </div>
  );
}
