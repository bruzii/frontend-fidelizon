import { setupAuthInterceptors } from './auth.interceptor';

// Fonction pour initialiser tous les intercepteurs
export const initializeInterceptors = (): void => {
  // Initialiser l'intercepteur d'authentification
  setupAuthInterceptors();

  // Ici, vous pouvez ajouter d'autres intercepteurs si nécessaire
  // comme par exemple pour la journalisation, la localisation, etc.
};

export default initializeInterceptors;
