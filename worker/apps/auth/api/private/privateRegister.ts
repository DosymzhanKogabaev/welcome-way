import { handleError } from '@/worker/apps/common/handleError';
import { OpenAPIRoute } from 'chanfana';
import { z } from 'zod';
import { IRequest } from 'itty-router';

import { createUser, getUserByEmail } from '@/worker/apps/auth/services/user';
import {
  RegisterUserRequest,
  RegisterUserResponse,
} from '@/shared/types/register';
import { UserAlreadyExistsException } from '@/worker/apps/auth/exceptions/user';

const REQUEST_BODY_SCHEMA = z.object({
  email: z.string(),
  password: z.string(),
  full_name: z.string(),
  language: z.string(),
}) satisfies z.ZodType<RegisterUserRequest>;

const RESPONSE_SCHEMA = z.object({
  id: z.number(),
  email: z.string(),
}) satisfies z.ZodType<RegisterUserResponse>;

export class PrivateRegisterAPI extends OpenAPIRoute {
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

  async handle(request: IRequest, env: Env, _ctx: ExecutionContext) {
    try {
      const data = await this.getValidatedData<typeof this.schema>();
      const userData = { ...(data.body as unknown as RegisterUserRequest) };

      // Extract geographic data from Cloudflare Workers request
      const cfData = (request as any).cf;

      // Log the full cf object for debugging
      console.log('Full Cloudflare data:', JSON.stringify(cfData, null, 2));

      const geographicData = {
        country: cfData?.country || null,
        region: cfData?.region || null,
        coordinates_lat: cfData?.latitude ? parseFloat(cfData.latitude) : null,
        coordinates_lng: cfData?.longitude
          ? parseFloat(cfData.longitude)
          : null,
      };

      console.log('Geographic data extracted:', geographicData);

      let user = await getUserByEmail(env, userData.email);
      if (user) {
        throw new UserAlreadyExistsException();
      } else if (!user) {
        user = await createUser(env, userData, geographicData);
        console.log('User created with geographic data:', {
          id: user.id,
          email: user.email,
          country: user.country,
          region: user.region,
          coordinates_lat: user.coordinates_lat,
          coordinates_lng: user.coordinates_lng,
        });
      }
      return Response.json({
        id: user.id,
        email: user.email,
      });
    } catch (error) {
      console.error('Register API error:', error);
      return handleError(error);
    }
  }
}
