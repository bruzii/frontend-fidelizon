import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Interface pour l'utilisateur administrateur
export interface AdminUser {
  id: string;
  email: string;
  name: string;
  role: string;
}

// Interface pour l'état d'authentification admin
export interface AdminAuthState {
  isAuthenticated: boolean;
  user: AdminUser | null;
  accessToken: string | null;
}

// État initial
const initialState: AdminAuthState = {
  isAuthenticated: false,
  user: null,
  accessToken: null,
};

// Création du slice pour l'authentification admin
const adminAuthSlice = createSlice({
  name: 'adminAuth',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<{ user: AdminUser; accessToken: string }>) => {
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.accessToken = action.payload.accessToken;
    },

    logout: state => {
      state.isAuthenticated = false;
      state.user = null;
      state.accessToken = null;
    },

    updateUser: (state, action: PayloadAction<Partial<AdminUser>>) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
      }
    },

    updateAccessToken: (state, action: PayloadAction<string>) => {
      state.accessToken = action.payload;
    },
  },
});

export const { login, logout, updateUser, updateAccessToken } = adminAuthSlice.actions;

export default adminAuthSlice.reducer;
