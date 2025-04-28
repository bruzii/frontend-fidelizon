'use client';

import React, { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { FormTextField } from '@/components/forms/form-text-field';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import {
  CheckCircle2,
  Clock,
  Facebook,
  Globe,
  ImageIcon,
  Instagram,
  Loader2,
  Upload,
} from 'lucide-react';
import Image from 'next/image';
import { EstablishmentProfileFormValues } from '@/src/schemas/establishment.schema';
import { Input } from '@/components/ui/input';
import { PhoneInputField } from '@/components/forms/phone-input-field';
import { getFileUrlFromFileOrUrl } from '@/utils/file';
import { useEstablishmentPictures } from '@/hooks/useEstablishmentPictures';
import { useEstablishmentHours } from '@/hooks/useEstablishmentHours';
import { useEstablishmentCertifications } from '@/hooks/useEstablishmentCertifications';
import { useEstablishmentLogo } from '@/hooks/useEstablishmentLogo';

type Props = {
  onSubmit: (data: EstablishmentProfileFormValues) => void;
  isLoading: boolean;
};

export default function EstablishmentProfileForm({ onSubmit, isLoading }: Props) {
  const [activeTab, setActiveTab] = useState('general');

  const form = useFormContext<EstablishmentProfileFormValues>();
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = form;

  const { fileInputRefs, initializePictures, handleFileChange, removePicture, handleClickUpload } =
    useEstablishmentPictures(form);

  const { daysOfWeek, addOpeningHour, removeOpeningHour, toggleDayOpen } =
    useEstablishmentHours(form);

  const { certificationOptions, toggleCertification } = useEstablishmentCertifications(form);

  const { logoInputRef, logo, handleLogoChange, handleLogoUploadClick, removeLogo } =
    useEstablishmentLogo(form);

  const formValues = watch();

  // Initialize picture slots if they don't exist
  useEffect(() => {
    initializePictures();
  }, []);

  const onSubmitHandler = (data: EstablishmentProfileFormValues) => {
    onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmitHandler)}>
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-4 w-full bg-gray-100 mb-6">
          <TabsTrigger value="photos">Fotos</TabsTrigger>
          <TabsTrigger value="general">Geral</TabsTrigger>
          <TabsTrigger value="hours">Horários</TabsTrigger>
          <TabsTrigger value="social">Links</TabsTrigger>
        </TabsList>

        <TabsContent value="photos" className="space-y-6">
          <div className="space-y-4">
            <h3 className="font-medium">Logo do Estabelecimento</h3>
            <p className="text-sm text-gray-500">
              Adicione um logo para o seu estabelecimento. Este logo será exibido no perfil.
            </p>

            <div className="flex items-center justify-center">
              <div className="relative">
                {logo ? (
                  <>
                    <div className="relative w-32 h-32 rounded-full overflow-hidden">
                      <Image
                        src={getFileUrlFromFileOrUrl(logo)}
                        alt="Logo do estabelecimento"
                        width={128}
                        height={128}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <button
                      type="button"
                      className="absolute top-[-10px] right-[-10px] bg-black bg-opacity-50 text-white rounded-full w-6 h-6 flex items-center justify-center"
                      onClick={removeLogo}
                    >
                      ×
                    </button>
                  </>
                ) : (
                  <div
                    onClick={handleLogoUploadClick}
                    className="w-32 h-32 rounded-full border-2 border-dashed flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50"
                  >
                    <Upload className="h-8 w-8 text-gray-400 mb-2" />
                    <span className="text-sm text-gray-500">Adicionar logo</span>
                  </div>
                )}
                <input
                  type="file"
                  ref={logoInputRef}
                  className="hidden"
                  accept="image/jpeg,image/png,image/webp"
                  onChange={handleLogoChange}
                />
              </div>
            </div>

            <h3 className="font-medium">Fotos do Estabelecimento</h3>
            <p className="text-sm text-gray-500">
              Upload até 3 fotos para o seu perfil. Estas fotos serão exibidas em um carrossel.
            </p>

            <div className="grid grid-cols-3 gap-4">
              {(watch('pictures') || []).map(picture => (
                <div
                  key={picture.position}
                  className="relative aspect-square border rounded-md overflow-hidden"
                >
                  {picture.file ? (
                    <>
                      <div className="w-full h-full">
                        <Image
                          src={getFileUrlFromFileOrUrl(picture.file)}
                          alt={`Preview ${picture.position + 1}`}
                          width={100}
                          height={100}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <button
                        type="button"
                        className="absolute top-1 right-1 bg-black bg-opacity-50 text-white rounded-full w-6 h-6 flex items-center justify-center"
                        onClick={() => removePicture(picture.position)}
                      >
                        ×
                      </button>
                    </>
                  ) : (
                    <div
                      className="aspect-square border-2 border-dashed rounded-md flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50"
                      onClick={() => handleClickUpload(picture.position)}
                    >
                      <ImageIcon className="h-8 w-8 text-gray-400 mb-2" />
                      <span className="text-sm text-gray-500">Adicionar foto</span>
                    </div>
                  )}
                  <input
                    type="file"
                    ref={el => {
                      if (el) fileInputRefs.current[picture.position] = el;
                    }}
                    className="hidden"
                    accept="image/jpeg,image/png,image/webp"
                    onChange={e => handleFileChange(picture.position, e)}
                  />
                </div>
              ))}
            </div>

            <div className="text-sm text-gray-500 mt-2">
              <p>
                Dica: Use imagens de alta qualidade com proporção 16:9 para melhores resultados.
              </p>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="general" className="space-y-6">
          <FormTextField name="name" label="Nome" placeholder="Nome do estabelecimento" />
          <FormTextField
            name="description"
            label="Descrição"
            placeholder="Descrição do estabelecimento"
            maxLength={35}
          />
          {errors.description && (
            <p className="text-sm text-red-500">{errors.description.message}</p>
          )}

          {/* Primary Color */}
          <div className="space-y-2">
            <Label htmlFor="primary_color">Cor Primária</Label>
            <div className="flex gap-3 items-center">
              <Input
                id="primary_color"
                type="color"
                className="w-16 h-10 p-1"
                {...register('primary_color')}
              />
              <Input
                type="text"
                value={watch('primary_color')}
                onChange={e => setValue('primary_color', e.target.value)}
                placeholder="#000000"
              />
            </div>
            {errors.primary_color && (
              <p className="text-sm text-red-500">{errors.primary_color.message}</p>
            )}
          </div>

          {/* Price Range */}
          <div className="space-y-2">
            <FormTextField name="price_range" label="Faixa de Preço" placeholder="Ex: 5-10" />
          </div>

          {/* Phone */}
          <div className="space-y-2">
            <PhoneInputField
              name="phone"
              label="Telefone"
              required
              defaultCountry="br"
              phoneNumberFieldName="phone_number"
              countryCodeFieldName="phone_country_code"
            />
          </div>

          {/* Certifications */}
          <div className="space-y-3">
            <Label>Certificações e Dietas</Label>
            <div className="grid grid-cols-2 gap-3">
              {certificationOptions.map(cert => (
                <div
                  key={cert.value}
                  onClick={() => toggleCertification(cert.value)}
                  className={`p-3 border rounded-lg flex items-center gap-2 cursor-pointer ${
                    watch('certifications')?.includes(cert.value)
                      ? 'border-primary bg-primary/10'
                      : 'border-gray-200'
                  }`}
                >
                  {watch('certifications')?.includes(cert.value) && (
                    <CheckCircle2 className="w-5 h-5 text-primary" />
                  )}
                  <span>{cert.label}</span>
                </div>
              ))}
            </div>
            {errors.certifications && (
              <p className="text-sm text-red-500">{errors.certifications.message}</p>
            )}
          </div>
        </TabsContent>

        <TabsContent value="hours" className="space-y-6">
          <Card>
            <CardContent className="p-0">
              {daysOfWeek.map((day, dayIndex) => {
                // Get the current day's data
                const dayData = formValues.opening_days?.[dayIndex];
                if (!dayData) return null;

                return (
                  <div key={day.value} className="py-4 border-b last:border-0">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Switch
                          checked={dayData.is_open}
                          onCheckedChange={checked => toggleDayOpen(dayIndex, checked)}
                        />
                        <Label className="font-medium">{day.label}</Label>
                      </div>

                      {dayData.is_open && (
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => addOpeningHour(dayIndex)}
                        >
                          + Horário
                        </Button>
                      )}
                    </div>

                    {dayData.is_open && dayData.opening_hours && (
                      <div className="space-y-3 pl-8">
                        {dayData.opening_hours.map((_, hourIndex) => (
                          <div key={hourIndex} className="flex items-center gap-3">
                            <Clock className="text-gray-400 w-4 h-4" />
                            <div className="grid grid-cols-2 gap-2 flex-1">
                              <Input
                                type="time"
                                {...register(
                                  `opening_days.${dayIndex}.opening_hours.${hourIndex}.start_time`
                                )}
                              />
                              <Input
                                type="time"
                                {...register(
                                  `opening_days.${dayIndex}.opening_hours.${hourIndex}.end_time`
                                )}
                              />
                            </div>
                            {dayData.opening_hours.length > 1 && (
                              <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                onClick={() => removeOpeningHour(dayIndex, hourIndex)}
                                className="text-red-500 h-8 w-8 p-0"
                              >
                                ×
                              </Button>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </CardContent>
          </Card>
          {errors.opening_days && (
            <p className="text-sm text-red-500">{errors.opening_days.message}</p>
          )}
        </TabsContent>

        <TabsContent value="social" className="space-y-6">
          {/* Social Media */}
          <div className="space-y-4">
            <h3 className="font-medium">Redes Sociais</h3>

            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Facebook className="text-blue-600 w-5 h-5" />
                <div className="flex-1">
                  <FormTextField name="social_media_links.facebook" label="Facebook" />
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Instagram className="text-pink-600 w-5 h-5" />
                <div className="flex-1">
                  <FormTextField name="social_media_links.instagram" label="Instagram" />
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="text-black w-5 h-5 flex items-center justify-center">
                  <span className="text-xs font-bold">TT</span>
                </div>
                <div className="flex-1">
                  <FormTextField name="social_media_links.tiktok" label="TikTok" />
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Globe className="text-green-600 w-5 h-5" />
                <div className="flex-1">
                  <FormTextField name="social_media_links.website" label="Website" />
                </div>
              </div>
            </div>
            {errors.social_media_links && (
              <p className="text-sm text-red-500">{errors.social_media_links.message}</p>
            )}
          </div>

          {/* Delivery Links */}
          <div className="space-y-4">
            <h3 className="font-medium">Links de Delivery</h3>

            <div className="space-y-3">
              <FormTextField name="delivery_links.ifood" label="iFood" />
              <FormTextField name="delivery_links.uber_eats" label="Uber Eats" />
              <FormTextField name="delivery_links.rappi" label="Rappi" />
            </div>
            {errors.delivery_links && (
              <p className="text-sm text-red-500">{errors.delivery_links.message}</p>
            )}
          </div>
        </TabsContent>
      </Tabs>

      <div className="mt-8">
        <Button type="submit" disabled={isLoading} className="w-full">
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Salvando...
            </>
          ) : (
            'Salvar Alterações'
          )}
        </Button>
      </div>
    </form>
  );
}
