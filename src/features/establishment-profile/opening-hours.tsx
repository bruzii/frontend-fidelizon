'use client';

import React from 'react';

interface OpeningDay {
  day: string;
  isOpen: boolean;
  openTime?: string;
  closeTime?: string;
}

export interface OpeningHoursProps {
  openingDays: OpeningDay[];
  className?: string;
}

export function OpeningHours({ openingDays, className = '' }: OpeningHoursProps) {
  const daysOfWeek = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'];

  // Sort days by standard week order
  const sortedDays = [...openingDays].sort((a, b) => {
    return daysOfWeek.indexOf(a.day) - daysOfWeek.indexOf(b.day);
  });

  return (
    <div className={`opening-hours ${className}`}>
      <h4 className="font-medium text-gray-900 mb-2">Horaires d&apos;ouverture</h4>
      <ul className="space-y-1">
        {sortedDays.map(day => (
          <li key={day.day} className="flex justify-between">
            <span className="text-gray-600">{day.day}</span>
            <span className="text-gray-900">
              {day.isOpen ? `${day.openTime || '00:00'} - ${day.closeTime || '00:00'}` : 'Fermé'}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
