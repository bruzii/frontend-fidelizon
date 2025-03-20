import { configureStore, combineReducers } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';

// Créer le reducer root
const rootReducer = combineReducers({
  auth: authReducer,
  // Ajoutez d'autres reducers ici au besoin
});

// Type du state global
export type RootState = ReturnType<typeof rootReducer>;

// Type du dispatch
export type AppDispatch = typeof store.dispatch;

// Créer le store
const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignorer certaines actions non-sérialisables au besoin
        ignoredActions: [],
        ignoredPaths: [],
      },
    }),
  devTools: process.env.NODE_ENV !== 'production',
});

export default store; 