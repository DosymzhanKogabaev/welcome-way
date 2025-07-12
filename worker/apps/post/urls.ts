import { RouterOpenApiType } from '@/worker/types';
import { RegisterAppRoutes } from '../types';
import {
  PublicGetAllPostsAPI,
  PublicGetPostByIdAPI,
  PublicGetUserPostsAPI,
} from './api/public';
import {
  PrivateCreatePostAPI,
  PrivateUpdatePostAPI,
  PrivateDeletePostAPI,
} from './api/private';
import auth from '@/worker/middlewares/jwtAuth';

export const registerPostRoutes: RegisterAppRoutes = (
  router: RouterOpenApiType,
  urlPrefix = null
) => {
  // Public routes
  router.get(`${urlPrefix}/public/posts`, PublicGetAllPostsAPI);
  router.get(`${urlPrefix}/public/posts/:id`, PublicGetPostByIdAPI);
  router.get(`${urlPrefix}/users/:id/posts`, PublicGetUserPostsAPI);

  // Private routes (require authentication)
  router.post(
    `${urlPrefix}/private/create-post`,
    auth,
    PrivateCreatePostAPI as any
  );
  router.put(
    `${urlPrefix}/private/posts/:id`,
    auth,
    PrivateUpdatePostAPI as any
  );
  router.delete(
    `${urlPrefix}/private/posts/:id`,
    auth,
    PrivateDeletePostAPI as any
  );
};
