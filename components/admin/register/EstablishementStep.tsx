// components/admin/register/EstablishmentStep.tsx
import React, { useState, useEffect, useRef } from 'react';
import { useFormContext, useFieldArray, FieldErrors } from 'react-hook-form';
import {
  Info,
  Search,
  Plus,
  Store,
  ChevronLeft,
  ChevronRight,
  Trash2,
  Loader2,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

import { cn } from '@/lib/utils';
import { partnerControllerAutocomplete } from '@/types/api';
import { FormTextField } from '@/components/forms/form-text-field';

// Types
interface PredictionDto {
  place_id: string;
  description: string;
  structured_formatting: {
    main_text: string;
    secondary_text: string;
  };
}

interface EstablishmentFields {
  name: string;
  address: string;
  city: string;
  neighborhood?: string;
  cep: string;
  google_place_id?: string;
}

const EstablishmentStep: React.FC = () => {
  const {
    register,
    watch,
    control,
    setValue,
    getValues,
    formState: { errors },
    trigger,
  } = useFormContext();

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'establishments',
  });

  const [activeTab, setActiveTab] = useState('0');
  const networkName = watch('network_name');
  const [predictions, setPredictions] = useState<PredictionDto[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [openPopover, setOpenPopover] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const searchEstablishments = async (query: string) => {
    if (query.trim().length < 3) {
      setPredictions([]);
      return;
    }

    setIsLoading(true);
    try {
      const response = await partnerControllerAutocomplete({
        query: {
          address: query,
        },
      });

      setPredictions(response.data?.predictions || []);
    } catch (error) {
      console.error('Error fetching address predictions:', error);
      setPredictions([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchTerm) {
        searchEstablishments(searchTerm);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  const addEstablishment = () => {
    append({
      name: '',
      address: '',
      city: '',
      cep: '',
      google_place_id: '',
    });

    const newIndex = fields.length.toString();
    setActiveTab(newIndex);
  };

  const validateCurrentEstablishment = async () => {
    const fieldsToValidate = [
      `establishments.${activeTab}.name`,
      `establishments.${activeTab}.address`,
      `establishments.${activeTab}.city`,
      `establishments.${activeTab}.cep`,
    ];

    return await trigger(fieldsToValidate as any);
  };

  const handleSelectAddress = (prediction: PredictionDto, index: number) => {
    const { structured_formatting, place_id } = prediction;
    const addressParts = structured_formatting.secondary_text.split('- ');

    let city = '';
    let neighborhood = '';

    if (addressParts.length > 1) {
      const locationParts = addressParts[1].split(', ');
      if (locationParts.length > 1) {
        [neighborhood, city] = locationParts;
      } else if (locationParts.length === 1) {
        city = locationParts[0];
      }
    }

    setValue(`establishments.${index}.name`, structured_formatting.main_text);
    setValue(`establishments.${index}.address`, addressParts[0] || '');
    if (neighborhood) setValue(`establishments.${index}.neighborhood`, neighborhood);
    if (city) setValue(`establishments.${index}.city`, city);
    setValue(`establishments.${index}.google_place_id`, place_id);

    setOpenPopover(false);
    setActiveIndex(null);
    setSearchTerm('');
  };

  const getFieldError = (index: number, field: keyof EstablishmentFields) => {
    const fieldErrors = errors?.establishments as Record<string, any> | undefined;
    return fieldErrors?.[index]?.[field];
  };

  return (
    <div className="bg-white p-6 rounded-md shadow-sm max-w-3xl mx-auto">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">Estabelecimentos</h2>
        <p className="text-gray-600">Adicione informações dos seus estabelecimentos</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <div className="flex items-center justify-between mb-4">
          <div className="flex space-x-1 overflow-x-auto pb-2">
            <TabsList>
              {fields.map((_, index) => (
                <TabsTrigger
                  key={index}
                  value={index.toString()}
                  className={cn(
                    'data-[state=active]:bg-black data-[state=active]:text-white',
                    'px-3 py-1 rounded-md'
                  )}
                >
                  <Store className="w-4 h-4 mr-2" />
                  {index + 1}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={addEstablishment}
            className="flex items-center"
          >
            <Plus className="w-4 h-4 mr-1" />
            Adicionar
          </Button>
        </div>

        {fields.map((field, index) => (
          <TabsContent key={field.id} value={index.toString()} className="mt-0">
            <Card>
              <CardHeader className="pb-3">
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle className="flex items-center">
                      {watch(`establishments.${index}.name`) || `Estabelecimento ${index + 1}`}
                      {index > 0 && (
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            remove(index);
                            setActiveTab(
                              Math.min(parseInt(activeTab), fields.length - 2).toString()
                            );
                          }}
                          className="ml-2 text-red-500 hover:text-red-700"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      )}
                    </CardTitle>
                    <CardDescription>Preencha as informações deste local</CardDescription>
                  </div>

                  <div className="flex space-x-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      disabled={parseInt(activeTab) === 0}
                      onClick={() => setActiveTab((parseInt(activeTab) - 1).toString())}
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      disabled={parseInt(activeTab) === fields.length - 1}
                      onClick={() => setActiveTab((parseInt(activeTab) + 1).toString())}
                    >
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-6">
                <div>
                  <label
                    htmlFor={`establishments.${index}.name`}
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Nome do ponto de venda*
                  </label>
                  <div className="relative">
                    <Input
                      id={`establishments.${index}.name`}
                      placeholder={
                        networkName ? `${networkName} -` : 'Digite para buscar estabelecimentos'
                      }
                      className={cn(
                        'pl-10',
                        getFieldError(index, 'name') ? 'border-red-500' : 'border-gray-300'
                      )}
                      {...register(`establishments.${index}.name`, {
                        required: 'Este campo é obrigatório',
                        onChange: e => {
                          const value = e.target.value;
                          if (index === activeIndex) {
                            setSearchTerm(value);
                            if (value.length >= 3 && !openPopover) {
                              setOpenPopover(true);
                            } else if (value.length < 3 && openPopover) {
                              setOpenPopover(false);
                            }
                          }
                        },
                      })}
                      onFocus={() => {
                        setActiveIndex(index);
                        const value = getValues(`establishments.${index}.name`);
                        setSearchTerm(value || '');
                        if (value && value.length >= 3) {
                          setOpenPopover(true);
                        }
                      }}
                      onBlur={e => {
                        // Délai pour permettre de cliquer sur un résultat avant de fermer
                        setTimeout(() => {
                          // Vérifier si le focus est sur un élément de résultat
                          const relatedTarget = e.relatedTarget as HTMLElement;
                          const isResult = relatedTarget?.classList.contains('result-item');

                          if (!isResult) {
                            setOpenPopover(false);
                          }
                        }, 150);
                      }}
                    />
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <Search className="h-4 w-4 text-gray-400" />
                    </div>

                    {activeIndex === index && openPopover && (
                      <div className="absolute z-10 w-full bg-white border border-gray-200 rounded-md shadow-lg mt-1">
                        <div className="max-h-60 overflow-y-auto">
                          {isLoading ? (
                            <div className="flex items-center justify-center p-4">
                              <Loader2 className="h-6 w-6 text-gray-400 animate-spin" />
                              <span className="ml-2">Pesquisando...</span>
                            </div>
                          ) : predictions.length === 0 ? (
                            <div className="p-4 text-sm text-gray-500">
                              {searchTerm.trim().length < 3
                                ? 'Digite pelo menos 3 caracteres para pesquisar'
                                : 'Nenhum resultado encontrado'}
                            </div>
                          ) : (
                            <div>
                              <div className="p-2 text-xs text-gray-500 font-semibold border-b">
                                Resultados
                              </div>
                              <ul>
                                {predictions.map(prediction => (
                                  <li
                                    key={prediction.place_id}
                                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer result-item"
                                    onClick={e => {
                                      e.preventDefault();
                                      e.stopPropagation();
                                      handleSelectAddress(prediction, index);
                                    }}
                                  >
                                    <div className="font-medium">
                                      {prediction.structured_formatting.main_text}
                                    </div>
                                    <div className="text-sm text-gray-500">
                                      {prediction.structured_formatting.secondary_text}
                                    </div>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                  {getFieldError(index, 'name') && (
                    <p className="mt-1 text-sm text-red-600">
                      {String(getFieldError(index, 'name')?.message || '')}
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <FormTextField
                      name={`establishments.${index}.address`}
                      label="Endereço"
                      required
                    />
                  </div>
                  <div>
                    <FormTextField
                      name={`establishments.${index}.neighborhood`}
                      label="Bairro"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <FormTextField name={`establishments.${index}.city`} label="Cidade" required />
                  </div>

                  <div>
                    <FormTextField name={`establishments.${index}.cep`} label="CEP" required />
                  </div>
                </div>

                <div>
                  <FormTextField
                    name={`establishments.${index}.google_place_id`}
                    label="Google Place ID"
                  />
                </div>
              </CardContent>

              {index < fields.length - 1 && (
                <CardFooter className="flex justify-end pt-6">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() =>
                      validateCurrentEstablishment().then(isValid => {
                        if (isValid) {
                          setActiveTab((parseInt(activeTab) + 1).toString());
                        }
                      })
                    }
                  >
                    Próximo
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardFooter>
              )}
            </Card>
          </TabsContent>
        ))}

        <div className="flex justify-center mt-6">
          <p className="text-sm text-gray-500 flex items-center">
            <Info className="w-4 h-4 mr-2 text-gray-400" />
            Você deve ter pelo menos um estabelecimento
          </p>
        </div>
      </Tabs>
    </div>
  );
};

export default EstablishmentStep;
