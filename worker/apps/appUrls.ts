import { registerAuthRoutes } from './auth/urls';
import { registerPostRoutes } from './post/urls';
import { RegisterAppRoutes } from './types';

export const registerAppRoutes: RegisterAppRoutes = (
  router,
  urlPrefix = null
) => {
  registerAuthRoutes(router, urlPrefix);
  registerPostRoutes(router, urlPrefix);
};
