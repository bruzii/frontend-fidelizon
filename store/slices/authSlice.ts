import { createSlice, PayloadAction } from '@reduxjs/toolkit';

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

// État initial
const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  accessToken: null,
};

// Création du slice
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // Reducer pour la connexion
    login: (state, action: PayloadAction<{ user: User; accessToken: string }>) => {
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.accessToken = action.payload.accessToken;
    },
    
    // Reducer pour la déconnexion
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.accessToken = null;
    },
    
    // Reducer pour la mise à jour des informations utilisateur
    updateUser: (state, action: PayloadAction<Partial<User>>) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
      }
    },
    
    // Reducer pour la mise à jour du token d'accès
    updateAccessToken: (state, action: PayloadAction<string>) => {
      state.accessToken = action.payload;
    },
  },
});

// Export des actions
export const { login, logout, updateUser, updateAccessToken } = authSlice.actions;

// Export du reducer
export default authSlice.reducer; 