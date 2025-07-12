import { OpenAPIRoute } from 'chanfana';
import { z } from 'zod';
import { IRequest } from 'itty-router';
import { getUserPosts } from '../../services/post';
import { handleError } from '@/worker/apps/common/handleError';

const RESPONSE_SCHEMA = z.object({
  posts: z.array(
    z.object({
      id: z.number(),
      user_id: z.number(),
      type: z.string(),
      text: z.string(),
      created_at: z.number(),
      updated_at: z.number(),
    })
  ),
  total: z.number(),
});

export class PublicGetUserPostsAPI extends OpenAPIRoute {
  schema = {
    tags: ['Posts'],
    summary: 'Get all posts by a specific user',
    description:
      'Fetch all posts by a specific user with optional filtering and pagination',
    parameters: [
      {
        name: 'id',
        in: 'path',
        description: 'User ID',
        required: true,
        schema: {
          type: 'string',
          pattern: '^\\d+$',
        },
      },
      {
        name: 'type',
        in: 'query',
        description: 'Filter by post type',
        required: false,
        schema: {
          type: 'string',
          enum: ['need', 'offer', 'question'],
        },
      },
      {
        name: 'page',
        in: 'query',
        description: 'Pagination page number (default: 1)',
        required: false,
        schema: {
          type: 'integer',
          minimum: 1,
          default: 1,
        },
      },
      {
        name: 'limit',
        in: 'query',
        description: 'Number of posts per page (default: 50, max: 100)',
        required: false,
        schema: {
          type: 'integer',
          minimum: 1,
          maximum: 100,
          default: 50,
        },
      },
    ],
    responses: {
      '200': {
        description: 'User posts retrieved successfully',
        content: {
          'application/json': {
            schema: RESPONSE_SCHEMA,
          },
        },
      },
      '400': {
        description: 'Bad Request - Invalid query parameters or user ID',
      },
      '404': {
        description: "Not Found - User ID doesn't exist",
      },
    },
  } as any;

  async handle(request: IRequest, env: Env, _ctx: ExecutionContext) {
    try {
      // Get user ID from URL
      const url = new URL(request.url);
      const pathSegments = url.pathname.split('/');
      const userIdParam = pathSegments[pathSegments.indexOf('users') + 1];
      const userId = parseInt(userIdParam);

      if (isNaN(userId) || userId < 1) {
        return new Response(
          JSON.stringify({
            error: 'Invalid user ID. Must be a positive integer.',
          }),
          {
            status: 400,
            headers: { 'Content-Type': 'application/json' },
          }
        );
      }

      // Parse query parameters
      const typeParam = url.searchParams.get('type');
      const pageParam = url.searchParams.get('page');
      const limitParam = url.searchParams.get('limit');

      // Validate and parse parameters
      let page = 1;
      let limit = 50;

      // Validate page parameter
      if (pageParam) {
        const parsedPage = parseInt(pageParam, 10);
        if (isNaN(parsedPage) || parsedPage < 1) {
          return new Response(
            JSON.stringify({
              error: 'Invalid page parameter. Must be a positive integer.',
            }),
            { status: 400, headers: { 'Content-Type': 'application/json' } }
          );
        }
        page = parsedPage;
      }

      // Validate limit parameter
      if (limitParam) {
        const parsedLimit = parseInt(limitParam, 10);
        if (isNaN(parsedLimit) || parsedLimit < 1 || parsedLimit > 100) {
          return new Response(
            JSON.stringify({
              error: 'Invalid limit parameter. Must be between 1 and 100.',
            }),
            { status: 400, headers: { 'Content-Type': 'application/json' } }
          );
        }
        limit = parsedLimit;
      }

      // Validate type parameter
      if (
        typeParam &&
        !['need', 'offer', 'question'].includes(typeParam.toLowerCase())
      ) {
        return new Response(
          JSON.stringify({
            error:
              "Invalid type parameter. Must be 'need', 'offer', or 'question'.",
          }),
          { status: 400, headers: { 'Content-Type': 'application/json' } }
        );
      }

      // Get posts from database with filters
      const filters = {
        type: typeParam?.toLowerCase(),
        page,
        limit,
      };

      const { posts, total } = await getUserPosts(env, userId, filters);

      // Format response according to specification
      const response = {
        posts: posts.map(post => ({
          id: post.id,
          user_id: post.user_id,
          type: post.type,
          text: post.text,
          created_at: post.created_at.getTime(),
          updated_at: post.updated_at.getTime(),
        })),
        total,
      };

      return Response.json(response);
    } catch (error) {
      return handleError(error);
    }
  }
}
