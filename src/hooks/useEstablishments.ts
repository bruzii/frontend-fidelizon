import { useEffect, useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '@/src/store/hooks';
import {
  fetchEstablishments,
  setSelectedEstablishment,
  resetEstablishments,
  initializeFromStorage,
  selectEstablishments,
  selectSelectedEstablishment,
  selectSelectedEstablishmentId,
  selectIsLoading,
  selectError,
} from '@/src/store/slices/establishmentsSlice';
import { clientApi } from '../lib/api-client';

/**
 * Hook personnalisé pour accéder et gérer les établissements via Redux
 * Offre une API simple et intuitive pour les composants React
 */
export const useEstablishments = () => {
  const dispatch = useAppDispatch();

  // Sélectionner les données du store
  const establishments = useAppSelector(selectEstablishments);
  const selectedEstablishment = useAppSelector(selectSelectedEstablishment);
  const selectedEstablishmentId = useAppSelector(selectSelectedEstablishmentId);
  const isLoading = useAppSelector(selectIsLoading);
  const error = useAppSelector(selectError);

  // Initialiser depuis localStorage au montage du composant
  useEffect(() => {
    dispatch(initializeFromStorage());
  }, [dispatch]);

  // Charger les établissements
  const loadEstablishments = useCallback(
    (force = false) => {
      if (clientApi) {
        dispatch(fetchEstablishments({ force, clientApi }));
      }
    },
    [dispatch, clientApi]
  );

  // Charger les établissements au montage du composant
  useEffect(() => {
    loadEstablishments();

    // Rafraîchir les données toutes les 5 minutes
    const intervalId = setInterval(
      () => {
        loadEstablishments();
      },
      5 * 60 * 1000
    );

    return () => clearInterval(intervalId);
  }, [loadEstablishments]);

  // Changer l'établissement sélectionné
  const selectEstablishment = useCallback(
    (id: string) => {
      dispatch(setSelectedEstablishment(id));
    },
    [dispatch]
  );

  // Réinitialiser les données
  const clearEstablishments = useCallback(() => {
    dispatch(resetEstablishments());
  }, [dispatch]);

  return {
    // Données
    establishments,
    selectedEstablishment,
    selectedEstablishmentId,
    isLoading,
    error,

    // Actions
    setSelectedEstablishment: selectEstablishment,
    fetchEstablishments: loadEstablishments,
    resetEstablishments: clearEstablishments,
  };
};
