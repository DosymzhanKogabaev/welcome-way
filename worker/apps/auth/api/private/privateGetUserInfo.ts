import { handleError } from '@/worker/apps/common/handleError';
import { OpenAPIRoute } from 'chanfana';
import { z } from 'zod';
import { IRequest } from 'itty-router';
import { getUserById } from '@/worker/apps/auth/services/user';
import { UserInfo } from '@/shared/types/user';
import { UserNotFoundException } from '../../exceptions/user';

const RESPONSE_SCHEMA = z.object({
  id: z.number(),
  full_name: z.string(),
  email: z.string(),
  phone: z.string().nullable(),
  language: z.string(),
  country_of_origin: z.string().nullable(),
  current_location: z.string().nullable(),
  coordinates_lat: z.number().nullable(),
  coordinates_lng: z.number().nullable(),
  user_type: z.string(),
  can_offer_help: z.boolean(),
  help_categories: z.string().nullable(),
  reputation_score: z.number(),
  verified: z.boolean(),
  created_at: z.number(),
  updated_at: z.number(),
}) satisfies z.ZodType<UserInfo>;

export class PrivateGetUserInfoAPI extends OpenAPIRoute {
  schema = {
    response: {
      content: {
        'application/json': { schema: RESPONSE_SCHEMA },
      },
    },
  };

  async handle(request: IRequest, env: Env, _ctx: ExecutionContext) {
    try {
      const userId = Number(request.user?.user_id);
      const user = await getUserById(env, userId);

      if (!user) {
        throw new UserNotFoundException();
      }

      const userInfo: UserInfo = {
        id: user.id,
        full_name: user.full_name,
        email: user.email,
        phone: user.phone,
        language: user.language,
        country_of_origin: user.country_of_origin,
        current_location: user.current_location,
        coordinates_lat: user.coordinates_lat,
        coordinates_lng: user.coordinates_lng,
        user_type: user.user_type,
        can_offer_help: !!user.can_offer_help,
        help_categories: user.help_categories,
        reputation_score: user.reputation_score || 0,
        verified: !!user.verified,
        created_at: user.created_at.getTime(),
        updated_at: user.updated_at.getTime(),
      };

      return Response.json(userInfo);
    } catch (error) {
      return handleError(error);
    }
  }
}
