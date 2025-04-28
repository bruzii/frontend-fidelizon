import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Interface pour l'utilisateur client
export interface ClientUser {
  id: string;
  email: string;
  name: string;
  role: string;
}

// Interface pour l'état d'authentification client
export interface ClientAuthState {
  isAuthenticated: boolean;
  user: ClientUser | null;
  accessToken: string | null;
}

// État initial
const initialState: ClientAuthState = {
  isAuthenticated: false,
  user: null,
  accessToken: null,
};

// Création du slice pour l'authentification client
const clientAuthSlice = createSlice({
  name: 'clientAuth',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<{ user: ClientUser; accessToken: string }>) => {
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.accessToken = action.payload.accessToken;
    },

    logout: state => {
      state.isAuthenticated = false;
      state.user = null;
      state.accessToken = null;
    },

    updateUser: (state, action: PayloadAction<Partial<ClientUser>>) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
      }
    },

    updateAccessToken: (state, action: PayloadAction<string>) => {
      state.accessToken = action.payload;
    },
  },
});

export const { login, logout, updateUser, updateAccessToken } = clientAuthSlice.actions;

export default clientAuthSlice.reducer;
