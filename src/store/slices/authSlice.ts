import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Clé pour le stockage local du token
const AUTH_TOKEN_KEY = 'fidelizon_auth_token';
const USER_DATA_KEY = 'fidelizon_user_data';

// Interface pour l'utilisateur
export interface User {
  id: string;
  email: string;
  name: string;
  role: string;
}

// Interface pour l'état d'authentification
export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  accessToken: string | null;
}

// Récupérer le token depuis le localStorage au démarrage
const getStoredToken = (): string | null => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem(AUTH_TOKEN_KEY);
  }
  return null;
};

// Récupérer les données utilisateur depuis le localStorage au démarrage
const getStoredUser = (): User | null => {
  if (typeof window !== 'undefined') {
    const userData = localStorage.getItem(USER_DATA_KEY);
    if (userData) {
      try {
        return JSON.parse(userData);
      } catch (e) {
        return null;
      }
    }
  }
  return null;
};

// État initial avec valeurs stockées
const initialState: AuthState = {
  isAuthenticated: !!getStoredToken(),
  user: getStoredUser(),
  accessToken: getStoredToken(),
};

// Création du slice
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<{ user: User; accessToken: string }>) => {
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.accessToken = action.payload.accessToken;

      // Stocker dans localStorage
      if (typeof window !== 'undefined') {
        localStorage.setItem(AUTH_TOKEN_KEY, action.payload.accessToken);
        localStorage.setItem(USER_DATA_KEY, JSON.stringify(action.payload.user));
      }
    },

    logout: state => {
      state.isAuthenticated = false;
      state.user = null;
      state.accessToken = null;

      // Supprimer du localStorage
      if (typeof window !== 'undefined') {
        localStorage.removeItem(AUTH_TOKEN_KEY);
        localStorage.removeItem(USER_DATA_KEY);
      }
    },

    updateUser: (state, action: PayloadAction<Partial<User>>) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };

        // Mettre à jour dans localStorage
        if (typeof window !== 'undefined') {
          localStorage.setItem(USER_DATA_KEY, JSON.stringify(state.user));
        }
      }
    },

    updateAccessToken: (state, action: PayloadAction<string>) => {
      state.accessToken = action.payload;

      // Mettre à jour dans localStorage
      if (typeof window !== 'undefined') {
        localStorage.setItem(AUTH_TOKEN_KEY, action.payload);
      }
    },
  },
});

export const { login, logout, updateUser, updateAccessToken } = authSlice.actions;

export default authSlice.reducer;
