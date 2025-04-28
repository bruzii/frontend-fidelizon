// components/forms/international-phone-input.tsx
import React, { forwardRef, useMemo } from 'react';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { defaultCountries, CountryIso2, usePhoneInput } from 'react-international-phone';
import 'react-international-phone/style.css';
import { Control, Controller, FieldPath, FieldValues } from 'react-hook-form';

export interface InternationalPhoneInputProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> {
  value?: string;
  onChange?: (value: string) => void;
  id?: string;
  defaultCountry?: CountryIso2;
  error?: boolean;
  disabled?: boolean;
  className?: string;
  name?: TName;
  control?: Control<TFieldValues>;
}

interface Country {
  name: string;
  iso2: string;
  dialCode: string;
}

export const InternationalPhoneInput = forwardRef<HTMLInputElement, InternationalPhoneInputProps>(
  (
    { value, onChange, defaultCountry = 'br', error, disabled, className, id, name, control },
    ref
  ) => {
    // If react-hook-form is used, use Controller
    if (name && control) {
      return (
        <Controller
          name={name}
          control={control}
          render={({ field, fieldState }) => (
            <InternationalPhoneInputBase
              id={id}
              value={field.value}
              onChange={field.onChange}
              defaultCountry={defaultCountry}
              error={!!fieldState.error || error}
              disabled={disabled}
              className={className}
              ref={field.ref}
            />
          )}
        />
      );
    }

    // Otherwise, use the base component
    return (
      <InternationalPhoneInputBase
        id={id}
        value={value || ''}
        onChange={onChange || (() => {})}
        defaultCountry={defaultCountry}
        error={error}
        disabled={disabled}
        className={className}
        ref={ref}
      />
    );
  }
);

const InternationalPhoneInputBase = forwardRef<
  HTMLInputElement,
  Omit<InternationalPhoneInputProps, 'name' | 'control'> & {
    value: string;
    onChange: (value: string) => void;
  }
>(({ value, onChange, defaultCountry = 'br', error, disabled, className, id }, ref) => {
  const { phone, inputValue, country, setCountry, inputRef, handlePhoneValueChange } =
    usePhoneInput({
      defaultCountry,
      value,
      onChange: data => onChange(data.inputValue),
    });

  const countries = useMemo<Country[]>(() => {
    return defaultCountries.map(c => ({
      name: c[0],
      iso2: c[1],
      dialCode: c[2],
    }));
  }, []);

  const selectedCountry = useMemo<Country>(() => {
    const countryCode =
      typeof country === 'string'
        ? country
        : country && typeof country === 'object' && 'iso2' in country
          ? country.iso2
          : String(country);

    const found = countries.find(c => c.iso2.toLowerCase() === countryCode.toLowerCase());
    return found || countries.find(c => c.iso2.toLowerCase() === 'br') || countries[0];
  }, [country, countries]);

  return (
    <div className="flex">
      <div className="flex-shrink-0 mr-2 w-[85px]">
        <Select
          disabled={disabled}
          value={selectedCountry.iso2}
          onValueChange={value => {
            setCountry(value as CountryIso2);
          }}
        >
          <SelectTrigger className={cn('border', error ? 'border-destructive' : 'border-input')}>
            <SelectValue>
              <span className="flex items-center">
                <span className="text-2xl">{getFlagEmoji(selectedCountry.iso2)}</span>
              </span>
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            {countries.map(country => (
              <SelectItem key={country.iso2} value={country.iso2}>
                <span className="flex items-center">
                  <span className="mr-2">{getFlagEmoji(country.iso2)}</span>
                  <span className="text-sm">
                    {country.name} (+{country.dialCode})
                  </span>
                </span>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="flex-grow">
        <Input
          id={id}
          ref={inputRef}
          value={inputValue}
          onChange={handlePhoneValueChange}
          disabled={disabled}
          className={cn(error ? 'border-destructive' : 'border-input', className)}
          placeholder="(00) 00000-0000"
        />
      </div>
    </div>
  );
});

function getFlagEmoji(countryCode: string): string {
  if (!countryCode) return '';
  const codePoints = countryCode
    .toUpperCase()
    .split('')
    .map(char => 127397 + char.charCodeAt(0));
  return String.fromCodePoint(...codePoints);
}

InternationalPhoneInput.displayName = 'InternationalPhoneInput';
InternationalPhoneInputBase.displayName = 'InternationalPhoneInputBase';
