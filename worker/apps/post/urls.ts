import { RouterOpenApiType } from '@/worker/types';
import { RegisterAppRoutes } from '../types';
import { PublicGetAllPostsAPI, PublicGetPostByIdAPI } from './api/public';
import { PrivateCreatePostAPI } from './api/private';
import auth from '@/worker/middlewares/jwtAuth';

export const registerPostRoutes: RegisterAppRoutes = (
  router: RouterOpenApiType,
  urlPrefix = null
) => {
  router.get(`${urlPrefix}/public/posts`, PublicGetAllPostsAPI);
  router.get(`${urlPrefix}/public/posts/:id`, PublicGetPostByIdAPI);
  router.post(
    `${urlPrefix}/private/create-post`,
    auth,
    PrivateCreatePostAPI as any
  );
};
