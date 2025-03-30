import React, { useState, useRef } from 'react';
import { useFormContext } from 'react-hook-form';
import { Info, Upload } from 'lucide-react';
import { usePreventRefresh } from '@/hooks/use-prevent-refresh';
import { Checkbox } from '@/components/ui/checkbox';
import { CheckedState } from '@radix-ui/react-checkbox';
import { FormTextField } from '@/components/forms/form-text-field';

const BrandInformationStep: React.FC = () => {
  const {
    register,
    watch,
    setValue,
    formState: { errors },
  } = useFormContext();
  const [noBrandName, setNoBrandName] = useState(watch('network_name') !== null ? false : true);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const brandColor = watch('brand_color');

  usePreventRefresh();

  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue('brand_color', e.target.value);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setValue('brand_logo', file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleClickUpload = () => {
    fileInputRef.current?.click();
  };
  console.log(watch('network_name'));

  return (
    <div className="bg-white p-6 rounded-md shadow-sm max-w-3xl mx-auto">
      <h2 className="text-2xl font-semibold mb-2">Informação da marca</h2>
      <p className="text-gray-600 mb-6">Preencha as informações da sua marca</p>

      <div className="space-y-8">
        <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
          <div className="flex items-start">
            <Info className="w-5 h-5 text-gray-700 mt-0.5 mr-2" />
            <div>
              <h3 className="font-medium text-gray-900">Importante</h3>
              <p className="text-sm text-gray-600 mt-1">
                O nome da sua marc será adicionado à frente do nome de cada um dos seus pontos de
                venda.
              </p>
            </div>
          </div>

          <div className="mt-4 p-3 bg-gray-100 rounded-md">
            <p className="font-medium">
              {noBrandName
                ? watch('establishment_name') || 'nome do estabelecimento'
                : `${watch('network_name') || 'Sua marca'} - nome do estabelecimento`}
            </p>
          </div>
        </div>

        <div>
          <FormTextField
            disabled={noBrandName}
            name="network_name"
            label="Nome da sua marca"
            required
          />

          <div className="flex items-center mt-2">
            <Checkbox
              id="no_brand_name"
              checked={noBrandName}
              onCheckedChange={(value: CheckedState) => {
                setNoBrandName(!!value);
                setValue('network_name', null);
              }}
            />
            <label htmlFor="no_brand_name" className="text-sm text-gray-600 ml-2">
              Eu nao preciso de nome de marca, eu prefiro deixar somente o nome do estabelecimento
            </label>
          </div>
          {errors.network_name && (
            <p className="mt-1 text-sm text-red-600">{errors.network_name.message as string}</p>
          )}
        </div>

        <div>
          <h3 className="text-lg font-medium mb-4">Identidade visual</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="brand_logo" className="block text-sm font-medium text-gray-700 mb-3">
                Logo da marca (opcional)
              </label>
              <input
                type="file"
                id="brand_logo"
                ref={fileInputRef}
                className="hidden"
                accept="image/jpeg,image/png,image/webp"
                onChange={handleFileChange}
              />
              <div
                onClick={handleClickUpload}
                className="border-2 border-dashed border-gray-300 rounded-md p-6 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50"
              >
                {logoPreview ? (
                  <img src={logoPreview} alt="Preview" className="max-h-32 mb-2" />
                ) : (
                  <>
                    <Upload className="w-10 h-10 text-gray-400 mb-2" />
                    <p className="text-sm text-center text-gray-600">
                      Clique para fazer upload
                      <br />
                      JPG, PNG, WEBP
                    </p>
                  </>
                )}
              </div>
            </div>

            <div>
              <label htmlFor="brand_color" className=" text-sm font-medium text-gray-700 mb-3">
                Cor principal (opcional)
              </label>
              <div className="flex items-center">
                <div
                  className="w-10 h-10 rounded-md mr-3 border border-gray-300"
                  style={{ backgroundColor: brandColor || '#000000' }}
                ></div>

                <input
                  type="color"
                  id="brand_color"
                  value={brandColor || '#000000'}
                  onChange={handleColorChange}
                  className="h1 w-1"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrandInformationStep;
