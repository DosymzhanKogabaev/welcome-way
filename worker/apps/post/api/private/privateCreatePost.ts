import { handleError } from '@/worker/apps/common/handleError';
import { OpenAPIRoute } from 'chanfana';
import { z } from 'zod';
import { IRequest } from 'itty-router';
import { createPost } from '@/worker/apps/post/services/post';
import { CreatePostRequest, CreatePostResponse } from '@/shared/types/post';

const REQUEST_BODY_SCHEMA = z.object({
  type: z.enum(['need', 'offer', 'question'], {
    errorMap: () => ({
      message: "Post type must be 'need', 'offer', or 'question'",
    }),
  }),
  text: z
    .string()
    .min(1, 'Post text is required')
    .max(5000, 'Post text must not exceed 5000 characters'),
}) satisfies z.ZodType<CreatePostRequest>;

const RESPONSE_SCHEMA = z.object({
  id: z.number(),
  author_id: z.number(),
  type: z.string(),
  text: z.string(),
  created_at: z.number(),
  updated_at: z.number(),
}) satisfies z.ZodType<CreatePostResponse>;

export class PrivateCreatePostAPI extends OpenAPIRoute {
  schema = {
    tags: ['Posts'],
    summary: 'Create a new post',
    description: 'Create a new post by an authenticated user',
    security: [{ BearerAuth: [] }],
    request: {
      body: {
        content: {
          'application/json': {
            schema: REQUEST_BODY_SCHEMA,
          },
        },
      },
    },
    responses: {
      '201': {
        description: 'Post created successfully',
        content: {
          'application/json': {
            schema: RESPONSE_SCHEMA,
          },
        },
      },
      '401': {
        description: 'Unauthorized - Invalid or missing token',
      },
      '400': {
        description: 'Bad request - Invalid input data',
      },
    },
  } as any;

  async handle(request: IRequest, env: Env, _ctx: ExecutionContext) {
    try {
      // Get user info from JWT middleware (should be set by auth middleware)
      const userId = request.user?.user_id;

      if (!userId) {
        return new Response(
          JSON.stringify({ error: 'User not authenticated' }),
          { status: 401, headers: { 'Content-Type': 'application/json' } }
        );
      }

      // Get and validate request data
      const data = await this.getValidatedData<typeof this.schema>();
      const postData = { ...(data.body as unknown as CreatePostRequest) };

      // Create the post
      const post = await createPost(env, {
        authorId: userId,
        type: postData.type,
        text: postData.text,
      });

      // Return the created post
      const response: CreatePostResponse = {
        id: post.id,
        author_id: post.author_id,
        type: post.type,
        text: post.text,
        created_at: post.created_at.getTime(),
        updated_at: post.updated_at.getTime(),
      };

      return Response.json(response, { status: 201 });
    } catch (error) {
      return handleError(error);
    }
  }
}
