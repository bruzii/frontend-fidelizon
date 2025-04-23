import { configureStore, combineReducers } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import adminAuthReducer from './slices/adminAuthSlice';
import clientAuthReducer from './slices/clientAuthSlice';
import establishmentsReducer from './slices/establishmentsSlice';

const rootReducer = combineReducers({
  auth: authReducer,
  adminAuth: adminAuthReducer,
  clientAuth: clientAuthReducer,
  establishments: establishmentsReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;

const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
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
