import { UseFormReturn } from 'react-hook-form';
import { EstablishmentProfileFormValues } from '@/src/schemas/establishment.schema';

export const daysOfWeek = [
  { value: 0, label: 'Domingo' },
  { value: 1, label: 'Segunda' },
  { value: 2, label: 'Terça' },
  { value: 3, label: 'Quarta' },
  { value: 4, label: 'Quinta' },
  { value: 5, label: 'Sexta' },
  { value: 6, label: 'Sábado' },
];

export function useEstablishmentHours(form: UseFormReturn<EstablishmentProfileFormValues>) {
  const { watch, setValue } = form;

  const addOpeningHour = (dayIndex: number) => {
    const days = [...(watch('opening_days') || [])];
    if (days[dayIndex]) {
      days[dayIndex].opening_hours.push({ start_time: '09:00', end_time: '18:00' });
      setValue('opening_days', days);
    }
  };

  const removeOpeningHour = (dayIndex: number, hourIndex: number) => {
    const days = [...(watch('opening_days') || [])];
    if (days[dayIndex] && days[dayIndex].opening_hours[hourIndex]) {
      days[dayIndex].opening_hours.splice(hourIndex, 1);
      setValue('opening_days', days);
    }
  };

  const toggleDayOpen = (dayIndex: number, isOpen: boolean) => {
    const days = [...(watch('opening_days') || [])];
    if (days[dayIndex]) {
      days[dayIndex].is_open = isOpen;
      setValue(`opening_days.${dayIndex}.is_open`, isOpen);
    }
  };

  const formatOpeningHours = () => {
    const closedToday = {
      isCurrentlyOpen: false,
      message: 'Fechado hoje',
    };

    const opening_days = watch('opening_days');
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

  return {
    daysOfWeek,
    addOpeningHour,
    removeOpeningHour,
    toggleDayOpen,
    formatOpeningHours,
  };
}
