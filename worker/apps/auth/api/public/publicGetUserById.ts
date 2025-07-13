import { OpenAPIRoute } from 'chanfana';
import { z } from 'zod';
import { IRequest } from 'itty-router';
import { handleError } from '@/worker/apps/common/handleError';
import { getUserById } from '@/worker/apps/auth/services/user';
import { UserNotFoundException } from '../../exceptions/user';
import { PublicUserInfo } from '@/shared/types/user';

// Response schema for public user info (excluding sensitive data)
const PUBLIC_USER_INFO_SCHEMA = z.object({
  id: z.number(),
  full_name: z.string(),
  avatar_url: z.string().nullable(),
  language: z.string(),
  country: z.string().nullable(),
  region: z.string().nullable(),
  user_type: z.string(),
  can_offer_help: z.boolean(),
  help_categories: z.string().nullable(),
  reputation_score: z.number(),
  verified: z.boolean(),
  created_at: z.number(),
  email: z.string(),
}) satisfies z.ZodType<PublicUserInfo>;

export class PublicGetUserByIdAPI extends OpenAPIRoute {
  schema = {
    tags: ['Authentication'],
    summary: 'Get public user information by ID',
    description:
      'Retrieves public user information by user ID without requiring authentication',
    parameters: [
      {
        name: 'id',
        in: 'path',
        description: 'User ID',
        required: true,
        schema: {
          type: 'integer',
          format: 'int64',
        },
      },
    ],
    responses: {
      '200': {
        description: 'User information retrieved successfully',
        content: {
          'application/json': {
            schema: PUBLIC_USER_INFO_SCHEMA,
          },
        },
      },
      '404': {
        description: 'User not found',
      },
      '400': {
        description: 'Invalid user ID',
      },
    },
  } as any;

  async handle(request: IRequest, env: Env, _ctx: ExecutionContext) {
    try {
      const userId = Number(request.params?.id);

      if (isNaN(userId) || userId <= 0) {
        return new Response(JSON.stringify({ error: 'Invalid user ID' }), {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        });
      }

      const user = await getUserById(env, userId);

      if (!user) {
        throw new UserNotFoundException();
      }

      // Return only public user information
      const publicUserInfo: PublicUserInfo = {
        id: user.id,
        full_name: user.full_name,
        avatar_url: user.avatar_url,
        language: user.language,
        country: user.country,
        region: user.region,
        user_type: user.user_type,
        can_offer_help: !!user.can_offer_help,
        help_categories: user.help_categories,
        reputation_score: user.reputation_score || 0,
        verified: !!user.verified,
        created_at: user.created_at.getTime(),
        email: user.email,
      };

      return Response.json(publicUserInfo);
    } catch (error) {
      return handleError(error);
    }
  }
}
