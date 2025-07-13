import auth from '@/worker/middlewares/jwtAuth';
import { RouterOpenApiType } from '@/worker/types';
import { RegisterAppRoutes } from '../types';
import {
  PrivateLoginAPI,
  PrivateRegisterAPI,
  PrivateGetUserInfoAPI,
  PrivateRefreshAPI,
  PrivateUploadUserAvatarAPI
} from './api/private';
import { PublicTestApi } from './api/public/testApi';

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
  router.post(
    `${urlPrefix}/private/auth/upload-avatar`,
    auth,
    PrivateUploadUserAvatarAPI as any
  );
};
