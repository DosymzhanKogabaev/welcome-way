import auth from '@/worker/middlewares/jwtAuth';
import { RouterOpenApiType } from '../../types';
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
  router.get(`${urlPrefix}/auth/test`, PublicTestApi);
  router.post(`${urlPrefix}/auth/register`, PrivateRegisterAPI);
  router.post(`${urlPrefix}/auth/login`, PrivateLoginAPI);
  router.post(`${urlPrefix}/auth/refresh`, PrivateRefreshAPI);

  // Private routes with JWT auth
  router.get(
    `${urlPrefix}/private/auth/me/:user_id`,
    auth,
    PrivateGetUserInfoAPI as any
  );
};
