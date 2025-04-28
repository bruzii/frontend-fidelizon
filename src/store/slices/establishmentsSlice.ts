import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { EstablishmentResponseDto } from '@/src/types/api/types.gen';
import { establishmentControllerGetEstablishments } from '@/src/types/api/sdk.gen';
import type { RootState } from '@/src/store';

// Type de notre state
interface EstablishmentsState {
  establishments: EstablishmentResponseDto[];
  selectedEstablishmentId: string | null;
  isLoading: boolean;
  error: string | null;
  lastFetched: number | null;
}

// État initial
const initialState: EstablishmentsState = {
  establishments: [],
  selectedEstablishmentId: null,
  isLoading: false,
  error: null,
  lastFetched: null,
};

// Temps de rafraîchissement des données (en ms)
const REFRESH_INTERVAL = 5 * 60 * 1000; // 5 minutes

// Action asynchrone pour charger les établissements
export const fetchEstablishments = createAsyncThunk<
  EstablishmentResponseDto[],
  { force?: boolean; clientApi: any } | undefined,
  { state: RootState }
>('establishments/fetchEstablishments', async (options, { getState }) => {
  const { force = false, clientApi } = options || {};

  if (!clientApi) {
    throw new Error('Client API is required');
  }

  const { lastFetched, establishments } = getState().establishments;

  // Vérifier si on doit rafraîchir les données
  const now = Date.now();
  const shouldRefresh = force || !lastFetched || now - lastFetched > REFRESH_INTERVAL;

  // Si les données sont récentes et qu'on ne force pas le rafraîchissement, ne rien faire
  if (!shouldRefresh && establishments.length > 0) {
    return establishments;
  }

  // Faire l'appel API
  const response = await establishmentControllerGetEstablishments({
    client: clientApi,
  });

  if (!response.data) {
    throw new Error('Failed to fetch establishments');
  }

  return response.data;
});

// Créer le slice
const establishmentsSlice = createSlice({
  name: 'establishments',
  initialState,
  reducers: {
    setSelectedEstablishment: (state, action: PayloadAction<string>) => {
      state.selectedEstablishmentId = action.payload;

      // Sauvegarder la sélection dans localStorage pour persistance
      if (typeof window !== 'undefined') {
        localStorage.setItem('selectedEstablishmentId', action.payload);
      }
    },
    resetEstablishments: state => {
      state.establishments = [];
      state.lastFetched = null;
      state.error = null;

      // Effacer la sélection précédente
      if (typeof window !== 'undefined') {
        localStorage.removeItem('selectedEstablishmentId');
      }
    },
    // Action pour initialiser l'état depuis localStorage au démarrage
    initializeFromStorage: state => {
      if (typeof window !== 'undefined') {
        const savedId = localStorage.getItem('selectedEstablishmentId');
        if (savedId) {
          state.selectedEstablishmentId = savedId;
        }
      }
    },
  },
  extraReducers: builder => {
    builder
      // Gestion de l'état de chargement
      .addCase(fetchEstablishments.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      // Gestion du succès
      .addCase(fetchEstablishments.fulfilled, (state, action) => {
        state.establishments = action.payload;
        state.lastFetched = Date.now();
        state.isLoading = false;

        // Sélectionner le premier établissement par défaut si aucun n'est déjà sélectionné
        if (action.payload.length > 0 && !state.selectedEstablishmentId) {
          state.selectedEstablishmentId = action.payload[0].id;

          // Sauvegarder la sélection dans localStorage
          if (typeof window !== 'undefined') {
            localStorage.setItem('selectedEstablishmentId', action.payload[0].id);
          }
        }
      })
      // Gestion des erreurs
      .addCase(fetchEstablishments.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Une erreur est survenue';
      });
  },
});

// Exporter les actions
export const { setSelectedEstablishment, resetEstablishments, initializeFromStorage } =
  establishmentsSlice.actions;

// Sélecteurs
export const selectEstablishments = (state: RootState) => state.establishments.establishments;
export const selectSelectedEstablishmentId = (state: RootState) =>
  state.establishments.selectedEstablishmentId;
export const selectIsLoading = (state: RootState) => state.establishments.isLoading;
export const selectError = (state: RootState) => state.establishments.error;

// Sélecteur pour obtenir l'établissement sélectionné
export const selectSelectedEstablishment = (state: RootState) => {
  const { establishments, selectedEstablishmentId } = state.establishments;

  return selectedEstablishmentId
    ? establishments.find(e => e.id === selectedEstablishmentId) || null
    : establishments[0] || null;
};

export default establishmentsSlice.reducer;
