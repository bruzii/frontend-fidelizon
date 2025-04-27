'use client';

import React from 'react';
import { Badge } from '@/components/ui/badge';
import { MapPin, Phone, Star, Truck, Globe } from 'lucide-react';
import { useFormContext } from 'react-hook-form';
import { EstablishmentProfileFormValues } from '@/schemas/establishment.schema';
import { EstablishmentResponseDto } from '@/types/api';
import { getFileUrlFromFileOrUrl } from '@/utils/file';
import { ImageCarousel } from '@/components/image-carousel';
import { useEstablishmentHours } from '@/hooks/useEstablishmentHours';
import { certificationLabels } from '@/hooks/useEstablishmentCertifications';
import { SocialMediaLinks } from './SocialMediaLinks';
import { OpeningStatus } from './OpeningStatus';
import Image from 'next/image';

interface EstablishmentProfilePreviewProps {
  address?: string;
  establishment?: EstablishmentResponseDto;
}

export default function EstablishmentProfilePreview({
  address,
  establishment,
}: EstablishmentProfilePreviewProps) {
  const form = useFormContext<EstablishmentProfileFormValues>();
  const { watch } = form;
  const { formatOpeningHours } = useEstablishmentHours(form);

  const openingStatus = formatOpeningHours();
  const formValues = watch();
  const pictures = watch('pictures') || [];
  const logo = watch('logo');

  const { primary_color, name, description, price_range, certifications, social_media_links } =
    formValues;

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
      <ImageCarousel images={pictures} getImageUrl={getFileUrlFromFileOrUrl} height="12rem" />

      {/* Restaurant Info */}
      <div className="p-4">
        <div className="flex items-start gap-3 mb-3">
          {/* Logo */}
          {logo && (
            <div className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0 border-2 border-white shadow-md">
              <Image
                src={getFileUrlFromFileOrUrl(logo)}
                alt="Logo"
                width={64}
                height={64}
                className="w-full h-full object-cover"
              />
            </div>
          )}
          <div className="flex-1">
            <h2 className="text-xl font-bold mb-1">{name || 'XIU - Street-food'}</h2>
            <p className="text-sm text-gray-600">{address || '48 Rue Monge, 75005 Paris'}</p>
          </div>
        </div>

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
        <OpeningStatus isOpen={openingStatus.isCurrentlyOpen} message={openingStatus.message} />
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
        <div className="p-4 border-b">
          <SocialMediaLinks
            facebook={social_media_links.facebook}
            instagram={social_media_links.instagram}
            tiktok={social_media_links.tiktok}
            website={social_media_links.website}
          />
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
