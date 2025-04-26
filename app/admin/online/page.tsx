'use client';

import React, { useState, useEffect } from 'react';
import EstablishmentProfileForm from '@/components/admin/online/EstablishmentProfileForm';
import EstablishmentProfilePreview from '@/components/admin/online/EstablishmentProfilePreview';
import { toast } from 'sonner';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEstablishments } from '@/hooks/useEstablishments';
import { useEstablishmentProfile } from '@/hooks/useEstablishmentProfile';
import {
  establishmentProfileSchema,
  EstablishmentProfileFormValues,
} from '@/schemas/establishment.schema';
import { UpdateEstablishmentProfileDto } from '@/types/api/types.gen';

export default function OnlineProfilePage() {
  const [showEditor, setShowEditor] = useState(false);

  const { selectedEstablishment, isLoading: isLoadingEstablishment } = useEstablishments();
  const { isLoading: isUpdatingProfile, updateEstablishmentProfile } = useEstablishmentProfile({
    onSuccess: () => {
      toast.success('Perfil atualizado', {
        description: 'O perfil do estabelecimento foi atualizado com sucesso.',
      });
      setShowEditor(false);
    },
    onError: error => {
      console.error('Error updating establishment profile:', error);
      toast.error('Erro', {
        description: 'Ocorreu um erro ao atualizar o perfil.',
      });
    },
  });

  const methods = useForm<EstablishmentProfileFormValues>({
    resolver: zodResolver(establishmentProfileSchema),
  });

  useEffect(() => {
    console.log('selectedEstablishment', selectedEstablishment);
    if (selectedEstablishment) {
      methods.reset({
        name: selectedEstablishment.name || '',
        description: selectedEstablishment.description || '',
        primary_color: selectedEstablishment.primary_color || '#e67e22',
        price_range: selectedEstablishment.price_range || '',
        phone_country_code: selectedEstablishment.phone_country_code || '+33',
        phone_number: selectedEstablishment.phone_number || '',
        certifications: selectedEstablishment.certifications || [],
        opening_days: selectedEstablishment.opening_days || [],
        social_media_links: selectedEstablishment.social_media_links,
        delivery_links: selectedEstablishment.delivery_links,
        pictures: Array.from({ length: 3 }, (_, i) => {
          const existingPicture = selectedEstablishment.pictures.find(p => p.position === i);
          return {
            position: i,
            file: existingPicture ? existingPicture.signedUrl : undefined,
          };
        }),
      });
    }
  }, [selectedEstablishment, methods]);

  const handleSubmit = async (data: EstablishmentProfileFormValues) => {
    if (!selectedEstablishment) return;
    console.log('pictures', data.pictures);
    await updateEstablishmentProfile(selectedEstablishment.id, data);
  };

  if ((isLoadingEstablishment || !selectedEstablishment) && showEditor) {
    return <div className="flex justify-center items-center h-96">Carregando...</div>;
  }

  if (showEditor && selectedEstablishment) {
    return (
      <FormProvider {...methods}>
        <div className="py-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center mb-8">
              <h1 className="text-3xl font-bold text-gray-900">Editar Perfil Online</h1>
              <button
                onClick={() => setShowEditor(false)}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
              >
                Cancelar
              </button>
            </div>
            <p className="mt-2 text-sm text-gray-500 mb-8">
              Edite as informações do seu estabelecimento e veja uma prévia de como ficará o perfil
              online.
            </p>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-white shadow rounded-lg p-6">
                <h2 className="text-xl font-medium text-gray-900 mb-6">Informações do Perfil</h2>
                <EstablishmentProfileForm onSubmit={handleSubmit} isLoading={isUpdatingProfile} />
              </div>

              <div className="bg-white shadow rounded-lg p-6">
                <h2 className="text-xl font-medium text-gray-900 mb-6">Prévia do Perfil</h2>
                <div className="flex justify-center">
                  <div className="w-full max-w-[375px]">
                    <EstablishmentProfilePreview
                      address={selectedEstablishment.address}
                      establishment={selectedEstablishment}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </FormProvider>
    );
  }

  // Loading state
  if (isLoadingEstablishment) {
    return <div className="flex justify-center items-center h-96">Carregando...</div>;
  }

  // Error state if no establishment is selected
  if (!selectedEstablishment) {
    return (
      <div className="py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-xl font-semibold text-gray-900">
              Nenhum estabelecimento selecionado
            </h2>
            <p className="mt-2 text-sm text-gray-500">
              Selecione um estabelecimento no menu lateral para gerenciar seu perfil online.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900">Profile Online</h1>

        {/* Profile statistics */}
        <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <dl>
                <dt className="text-sm font-medium text-gray-500 truncate">Visites (ce mois)</dt>
                <dd className="mt-1 text-3xl font-semibold text-gray-900">1,285</dd>
              </dl>
            </div>
          </div>
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <dl>
                <dt className="text-sm font-medium text-gray-500 truncate">Réservations</dt>
                <dd className="mt-1 text-3xl font-semibold text-gray-900">24</dd>
              </dl>
            </div>
          </div>
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <dl>
                <dt className="text-sm font-medium text-gray-500 truncate">Clics sur le menu</dt>
                <dd className="mt-1 text-3xl font-semibold text-gray-900">358</dd>
              </dl>
            </div>
          </div>
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <dl>
                <dt className="text-sm font-medium text-gray-500 truncate">Complétion du profil</dt>
                <dd className="mt-1 text-3xl font-semibold text-gray-900">75%</dd>
              </dl>
            </div>
          </div>
        </div>

        {/* Preview and edit button */}
        <div className="mt-10">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-medium text-gray-900">Aperçu de votre profil en ligne</h2>
            <button
              onClick={() => setShowEditor(true)}
              className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90"
            >
              Éditer le profil
            </button>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <div className="flex items-center mb-6">
                    {selectedEstablishment.logo_s3_key ? (
                      <img
                        src={`/api/images/${selectedEstablishment.logo_s3_key}`}
                        alt={selectedEstablishment.name}
                        className="w-20 h-20 rounded-full object-cover"
                      />
                    ) : (
                      <div
                        className="w-20 h-20 rounded-full flex items-center justify-center text-white text-xl font-bold"
                        style={{
                          backgroundColor: selectedEstablishment.primary_color || '#e67e22',
                        }}
                      >
                        {selectedEstablishment.name?.charAt(0) || '?'}
                      </div>
                    )}
                    <div className="ml-4">
                      <h3 className="text-xl font-bold text-gray-900">
                        {selectedEstablishment.name}
                      </h3>
                      <p className="text-sm text-gray-500">{selectedEstablishment.address}</p>
                    </div>
                  </div>

                  <div className="mt-6">
                    <h4 className="text-lg font-medium text-gray-900 mb-2">Description</h4>
                    <p className="text-gray-600">
                      {selectedEstablishment.description || 'Aucune description disponible.'}
                    </p>
                  </div>

                  <div className="mt-6">
                    <h4 className="text-lg font-medium text-gray-900 mb-2">Informations</h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-500">Prix</p>
                        <p className="text-gray-900">
                          {selectedEstablishment.price_range || 'Non défini'}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Téléphone</p>
                        <p className="text-gray-900">
                          {selectedEstablishment.phone_country_code}{' '}
                          {selectedEstablishment.phone_number || 'Non défini'}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="bg-gray-100 rounded-lg p-4 h-80 flex items-center justify-center">
                    <p className="text-gray-500 text-center">
                      Prévisualisation mobile de votre profil.
                      <br />
                      Cliquez sur « Éditer le profil » pour voir une prévisualisation en direct.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
