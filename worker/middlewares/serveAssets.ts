import { NextFunction } from '../middlewareComposer';

export async function serveAssetsMiddleware(
  request: Request,
  env: Env,
  ctx: ExecutionContext,
  next: NextFunction
) {
  const response = await next(request, env, ctx);
  if (!response) {
    const cachebableContent = [
      'image/',
      'font/',
      'video/',
      'audio/',
      'application/javascript',
      'text/css',
    ];
    const asstsResponse = await env.ASSETS.fetch(request);
    const setCache = new Response(asstsResponse.body, asstsResponse);
    const contentType = asstsResponse.headers.get('content-type');
    const isCacheable =
      contentType && cachebableContent.some(type => contentType.includes(type));

    if (isCacheable) {
      setCache.headers.set('cache-control', 'public, max-age=31536000');
    }

    return setCache;
  }

  return response;
}
