import { OpenAPIRoute } from 'chanfana';
import { z } from 'zod';
import { IRequest } from 'itty-router';
import { updatePost } from '../../services/post';
import { handleError } from '@/worker/apps/common/handleError';
import { PostNotFoundException } from '../../exceptions/post';

const UpdatePostRequestSchema = z.object({
  type: z.enum(['need', 'offer', 'question']).optional(),
  text: z.string().min(1).max(1000).optional(),
});

const UpdatePostResponseSchema = z.object({
  id: z.number(),
  type: z.string(),
  text: z.string(),
  created_at: z.number(),
  updated_at: z.number(),
});

export class PrivateUpdatePostAPI extends OpenAPIRoute {
  schema = {
    tags: ['Posts'],
    summary: 'Update a post',
    description: "Update a post's content. Only the post owner can update it.",
    security: [{ BearerAuth: [] }],
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
    requestBody: {
      content: {
        'application/json': {
          schema: UpdatePostRequestSchema,
        },
      },
    },
    responses: {
      '200': {
        description: 'Post updated successfully',
        content: {
          'application/json': {
            schema: UpdatePostResponseSchema,
          },
        },
      },
      '400': {
        description: 'Bad Request - Invalid fields',
      },
      '401': {
        description: 'Unauthorized - Invalid or missing token',
      },
      '403': {
        description: 'Forbidden - User lacks permission',
      },
      '404': {
        description: "Not Found - Post ID doesn't exist",
      },
    },
  } as any;

  async handle(request: IRequest, env: Env, _ctx: ExecutionContext) {
    try {
      // Get post ID from URL
      const postId = Number(request.params?.id);

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

      // Get authenticated user ID from request context
      const userId = request.user?.user_id;
      if (!userId) {
        return new Response(
          JSON.stringify({ error: 'Authentication required' }),
          {
            status: 401,
            headers: { 'Content-Type': 'application/json' },
          }
        );
      }

      // Parse and validate request body
      const body = await request.json();
      const validation = UpdatePostRequestSchema.safeParse(body);

      if (!validation.success) {
        return new Response(
          JSON.stringify({
            error: 'Invalid request body',
            details: validation.error.errors,
          }),
          {
            status: 400,
            headers: { 'Content-Type': 'application/json' },
          }
        );
      }

      const updates = validation.data;

      // Check if at least one field is provided
      if (!updates.type && !updates.text) {
        return new Response(
          JSON.stringify({
            error: 'At least one field (type or text) must be provided',
          }),
          {
            status: 400,
            headers: { 'Content-Type': 'application/json' },
          }
        );
      }

      // Update the post
      const updatedPost = await updatePost(env, postId, userId, updates);

      const response = {
        id: updatedPost.id,
        type: updatedPost.type,
        text: updatedPost.text,
        created_at: updatedPost.created_at.getTime(),
        updated_at: updatedPost.updated_at.getTime(),
      };

      return Response.json(response, { status: 200 });
    } catch (error) {
      if (error instanceof PostNotFoundException) {
        return new Response(JSON.stringify({ error: 'Post not found' }), {
          status: 404,
          headers: { 'Content-Type': 'application/json' },
        });
      }

      if (error instanceof Error && error.message.includes('Unauthorized')) {
        return new Response(
          JSON.stringify({
            error: 'You do not have permission to update this post',
          }),
          {
            status: 403,
            headers: { 'Content-Type': 'application/json' },
          }
        );
      }

      return handleError(error);
    }
  }
}
