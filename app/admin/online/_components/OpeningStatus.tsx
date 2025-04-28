'use client';

import React from 'react';
import { Clock } from 'lucide-react';

interface OpeningStatusProps {
  isOpen: boolean;
  message: string;
  className?: string;
}

export function OpeningStatus({ isOpen, message, className = '' }: OpeningStatusProps) {
  return (
    <div
      className={`py-2 px-3 rounded-md flex items-center justify-between ${className}`}
      style={{
        backgroundColor: isOpen ? '#5bb053' : '#888888',
        color: 'white',
      }}
    >
      <div className="flex items-center">
        <Clock className="w-4 h-4 mr-2" />
        <span>{message}</span>
      </div>
      <div className="transform rotate-90">›</div>
    </div>
  );
}
