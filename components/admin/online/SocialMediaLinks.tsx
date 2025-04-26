'use client';

import React from 'react';
import { Facebook, Globe, Instagram } from 'lucide-react';

interface SocialMediaLinksProps {
  facebook?: string | null;
  instagram?: string | null;
  tiktok?: string | null;
  website?: string | null;
  className?: string;
}

export function SocialMediaLinks({
  facebook,
  instagram,
  tiktok,
  website,
  className = '',
}: SocialMediaLinksProps) {
  if (!facebook && !instagram && !tiktok && !website) {
    return null;
  }

  return (
    <div className={`flex gap-3 ${className}`}>
      {facebook && (
        <a
          href={facebook}
          target="_blank"
          className="w-11 h-11 rounded-full flex items-center justify-center bg-blue-600 text-white"
        >
          <Facebook size={28} />
        </a>
      )}

      {instagram && (
        <a
          href={instagram}
          target="_blank"
          className="w-11 h-11 rounded-full flex items-center justify-center bg-gradient-to-r from-purple-500 to-pink-500 text-white"
        >
          <Instagram size={28} />
        </a>
      )}

      {tiktok && (
        <a
          href={tiktok}
          target="_blank"
          className="w-11 h-11 rounded-full flex items-center justify-center bg-black text-white"
        >
          <span className="text-xs">TikTok</span>
        </a>
      )}

      {website && (
        <a
          href={website}
          target="_blank"
          className="w-11 h-11 rounded-full flex items-center justify-center bg-green-600 text-white"
        >
          <Globe size={28} />
        </a>
      )}
    </div>
  );
}
