import { handleError } from '@/worker/apps/common/handleError';
import { OpenAPIRoute } from 'chanfana';
import { z } from 'zod';

import { refreshAccessToken } from '@/worker/apps/auth/services/jwt';

const REQUEST_BODY_SCHEMA = z.object({
  refresh: z.string(),
});

const RESPONSE_SCHEMA = z.object({
  access: z.string(),
});

export class PrivateRefreshAPI extends OpenAPIRoute {
  schema = {
    request: {
      body: {
        content: {
          'application/json': {
            schema: REQUEST_BODY_SCHEMA,
          },
        },
      },
    },
    response: {
      '200': {
        content: {
          'application/json': {
            schema: RESPONSE_SCHEMA,
          },
        },
      },
    },
  } as any;

  async handle(_request: Request, env: Env, _ctx: ExecutionContext) {
    try {
      const data = await this.getValidatedData<typeof this.schema>();
      const { refresh } = data.body;
      const access_token = await refreshAccessToken(env, refresh);

      return Response.json({
        access_token: access_token,
      });
    } catch (error) {
      return handleError(error);
    }
  }
}
