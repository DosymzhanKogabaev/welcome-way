import { OpenAPIRoute } from 'chanfana';
import { z } from 'zod';
import { IRequest } from 'itty-router';
import { getPostByIdWithUserInfo } from '../../services/post';
import { handleError } from '@/worker/apps/common/handleError';

const PostResponseSchema = z.object({
  id: z.number(),
  type: z.string(),
  text: z.string(),
  created_at: z.number(),
  user_full_name: z.string(),
});

export class PublicGetPostByIdAPI extends OpenAPIRoute {
  schema = {
    tags: ['Posts'],
    summary: 'Get a single post by ID',
    parameters: [
      {
        name: 'id',
        in: 'path',
        description: 'Post ID',
        required: true,
        schema: {
          type: 'string',
          pattern: '^\\d+$',
        },
      },
    ],
    responses: {
      '200': {
        description: 'Post found successfully',
        content: {
          'application/json': {
            schema: PostResponseSchema,
          },
        },
      },
      '400': {
        description: 'Bad Request - Invalid post ID',
      },
      '404': {
        description: 'Post not found',
        content: {
          'application/json': {
            schema: z.object({
              error: z.string(),
            }),
          },
        },
      },
    },
  } as any;

  async handle(request: IRequest, env: Env, _ctx: ExecutionContext) {
    try {
      const url = new URL(request.url);
      const pathSegments = url.pathname.split('/');
      const idParam = pathSegments[pathSegments.length - 1];

      const postId = parseInt(idParam);

      if (isNaN(postId) || postId < 1) {
        return new Response(
          JSON.stringify({
            error: 'Invalid post ID. Must be a positive integer.',
          }),
          {
            status: 400,
            headers: { 'Content-Type': 'application/json' },
          }
        );
      }

      const post = await getPostByIdWithUserInfo(env, postId);

      if (!post) {
        return new Response(JSON.stringify({ error: 'Post not found' }), {
          status: 404,
          headers: { 'Content-Type': 'application/json' },
        });
      }

      const response = {
        id: post.id,
        type: post.type,
        text: post.text,
        created_at: post.created_at,
        user_full_name: post.user_full_name,
      };

      return Response.json(response, { status: 200 });
    } catch (error) {
      return handleError(error);
    }
  }
}
