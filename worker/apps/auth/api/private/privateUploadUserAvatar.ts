import { OpenAPIRoute } from 'chanfana';
import { z } from 'zod';
import { IRequest } from 'itty-router';
import { nanoid } from 'nanoid';
import { updateUserAvatar } from '../../services/user';
import { handleError } from '@/worker/apps/common/handleError';

const UploadAvatarResponseSchema = z.object({
  success: z.boolean(),
  avatar_url: z.string(),
});

export class PrivateUploadUserAvatarAPI extends OpenAPIRoute {
  schema = {
    tags: ['Authentication'],
    summary: 'Upload user avatar',
    description:
      'Upload a user avatar image. Supports image files up to 1MB. The image is stored in Cloudflare R2 and served via Cloudflare Images.',
    security: [{ BearerAuth: [] }],
    requestBody: {
      content: {
        'multipart/form-data': {
          schema: {
            type: 'object',
            properties: {
              file: {
                type: 'string',
                format: 'binary',
                description:
                  'Avatar image file (max 1MB, supported formats: PNG, JPG, JPEG, GIF, WebP)',
              },
            },
            required: ['file'],
          },
        },
      },
    },
    responses: {
      '200': {
        description: 'Avatar uploaded successfully',
        content: {
          'application/json': {
            schema: UploadAvatarResponseSchema,
          },
        },
      },
      '400': {
        description: 'Bad Request - Invalid content type or missing file',
      },
      '401': {
        description: 'Unauthorized - Invalid or missing token',
      },
      '405': {
        description: 'Method Not Allowed - Only POST method is supported',
      },
      '413': {
        description: 'Payload Too Large - File size exceeds 1MB limit',
      },
    },
  } as any;

  async handle(request: IRequest, env: Env, _ctx: ExecutionContext) {
    try {
      // Get authenticated user ID from request context
      const userId = Number(request.user?.user_id);
      if (!userId) {
        return new Response(
          JSON.stringify({ error: 'Authentication required' }),
          {
            status: 401,
            headers: { 'Content-Type': 'application/json' },
          }
        );
      }

      // Validate content type
      const contentType = request.headers.get('content-type') || '';
      if (!contentType.startsWith('multipart/form-data')) {
        return new Response(
          JSON.stringify({
            error: 'Expected multipart/form-data content type',
          }),
          {
            status: 400,
            headers: { 'Content-Type': 'application/json' },
          }
        );
      }

      // Parse form data
      const form = await request.formData();
      const file = form.get('file') as File | null;

      if (!file) {
        return new Response(JSON.stringify({ error: 'No file provided' }), {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        });
      }

      // Validate file size (max 1MB)
      if (file.size > 1_000_000) {
        return new Response(
          JSON.stringify({ error: 'File size exceeds 1MB limit' }),
          {
            status: 413,
            headers: { 'Content-Type': 'application/json' },
          }
        );
      }

      // Validate file type
      const allowedTypes = [
        'image/png',
        'image/jpeg',
        'image/jpg',
        'image/gif',
        'image/webp',
      ];
      if (!allowedTypes.includes(file.type)) {
        return new Response(
          JSON.stringify({
            error:
              'Invalid file type. Supported formats: PNG, JPG, JPEG, GIF, WebP',
          }),
          {
            status: 400,
            headers: { 'Content-Type': 'application/json' },
          }
        );
      }

      // Generate unique filename
      const ext = file.type.split('/')[1] || 'png';
      const filename = nanoid() + '.' + ext;

      // Upload to Cloudflare R2
      await env.AVATARS_BUCKET.put(filename, await file.arrayBuffer(), {
        httpMetadata: { contentType: file.type },
      });

      // Generate public URL via Cloudflare Images
      const publicUrl = `https://welcome-may.dkogabayev.workers.dev/cdn/${filename}`;

      // Update user avatar URL in database
      await updateUserAvatar(env, userId, publicUrl);

      const response = {
        success: true,
        avatar_url: publicUrl,
      };

      return Response.json(response, { status: 200 });
    } catch (error) {
      console.error('Upload avatar error:', error);
      return handleError(error);
    }
  }
}
