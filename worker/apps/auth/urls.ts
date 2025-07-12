import auth from '@/worker/middlewares/jwtAuth';
import { RouterOpenApiType } from '@/worker/types';
import { RegisterAppRoutes } from '../types';
import {
  PrivateLoginAPI,
  PrivateRegisterAPI,
  PrivateGetUserInfoAPI,
} from './api/private';
import { PublicTestApi } from './api/public/testApi';
import { PrivateRefreshAPI } from './api/private/privateRefresh';

export const registerAuthRoutes: RegisterAppRoutes = (
  router: RouterOpenApiType,
  urlPrefix = null
) => {
  // Public routes
  router.get(`${urlPrefix}/public/auth/test`, PublicTestApi);

  // Private routes
  router.post(`${urlPrefix}/private/auth/register`, PrivateRegisterAPI);
  router.post(`${urlPrefix}/private/auth/login`, PrivateLoginAPI);
  router.post(`${urlPrefix}/private/auth/refresh`, PrivateRefreshAPI);

  // Private routes with JWT auth
  router.get(
    `${urlPrefix}/private/auth/me`,
    auth,
    PrivateGetUserInfoAPI as any
  );
};
