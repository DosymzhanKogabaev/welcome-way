import { handleError } from '@/worker/apps/common/handleError';
import { OpenAPIRoute } from 'chanfana';
import { z } from 'zod';
import { IRequest } from 'itty-router';
import { getAllPosts } from '@/worker/apps/post/services/post';

const RESPONSE_SCHEMA = z.object({
  posts: z.array(
    z.object({
      id: z.number(),
      type: z.string(),
      text: z.string(),
      created_at: z.number(),
      user_full_name: z.string(),
    })
  ),
  total: z.number(),
});

export class PublicGetAllPostsAPI extends OpenAPIRoute {
  schema = {
    tags: ['Posts'],
    summary: 'Get all posts',
    description: 'Fetch a list of posts with optional filtering and pagination',
    parameters: [
      {
        name: 'type',
        in: 'query',
        description: 'Filter by post type (Need, Offer, Question)',
        required: false,
        schema: {
          type: 'string',
          enum: ['need', 'offer', 'question'],
        },
      },
      {
        name: 'user_id',
        in: 'query',
        description: 'Filter by user ID',
        required: false,
        schema: {
          type: 'string',
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
        description: 'Posts retrieved successfully',
        content: {
          'application/json': {
            schema: RESPONSE_SCHEMA,
          },
        },
      },
      '400': {
        description: 'Bad Request - Invalid query parameters',
      },
    },
  } as any;

  async handle(request: IRequest, env: Env, _ctx: ExecutionContext) {
    try {
      // Parse query parameters
      const url = new URL(request.url);
      const typeParam = url.searchParams.get('type');
      const userIdParam = url.searchParams.get('user_id');
      const pageParam = url.searchParams.get('page');
      const limitParam = url.searchParams.get('limit');

      // Validate and parse parameters
      let page = 1;
      let limit = 50;
      let user_id: number | undefined;

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

      // Validate user_id parameter
      if (userIdParam) {
        const parsedUserId = parseInt(userIdParam, 10);
        if (isNaN(parsedUserId) || parsedUserId < 1) {
          return new Response(
            JSON.stringify({
              error: 'Invalid user_id parameter. Must be a positive integer.',
            }),
            { status: 400, headers: { 'Content-Type': 'application/json' } }
          );
        }
        user_id = parsedUserId;
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
        user_id,
        page,
        limit,
      };

      const { posts, total } = await getAllPosts(env, filters);

      // Format response according to documentation
      const response = {
        posts: posts.map(post => ({
          id: post.id,
          type: post.type,
          text: post.text,
          created_at: post.created_at,
          user_full_name: post.user_full_name,
        })),
        total,
      };

      return Response.json(response);
    } catch (error) {
      return handleError(error);
    }
  }
}
