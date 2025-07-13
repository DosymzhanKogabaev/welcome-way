import { NextFunction } from '../middlewareComposer';

const CDN_PREFIX = '/cdn/';

export const cdnMiddleware = async (
  request: Request,
  env: Env,
  ctx: ExecutionContext,
  next: NextFunction
) => {
  const { pathname } = new URL(request.url);

  if (!pathname.startsWith(CDN_PREFIX)) {
    // не cdn‑роут → передаём дальше
    return next(request, env, ctx);
  }

  const key = decodeURIComponent(pathname.substring(CDN_PREFIX.length));

  // простая защита от ../../
  if (key.includes('..')) {
    return new Response('Bad object key', { status: 400 });
  }

  // поддержка Range
  const rangeHeader = request.headers.get('Range') ?? undefined;
  const object = await env.AVATARS_BUCKET.get(key, { range: rangeHeader });

  if (!object) {
    return new Response('File not found', { status: 404 });
  }

  // ETag/If‑None‑Match
  const etag = object.httpEtag || object.etag;
  if (etag && request.headers.get('If-None-Match') === etag) {
    return new Response(null, { status: 304, headers: { ETag: etag } });
  }

  const headers = new Headers({
    'Content-Type': object.httpMetadata?.contentType || inferFromKey(key),
    'Cache-Control': 'public, max-age=86400, immutable',
    ETag: etag,
    'Content-Length': object.size?.toString() ?? '',
    'Content-Disposition': 'inline',
    'Access-Control-Allow-Origin': '*',
  });

  // HEAD – только заголовки
  if (request.method === 'HEAD') {
    return new Response(null, { headers });
  }

  return new Response(object.body, { headers });
};

const inferFromKey = (key: string) => {
  if (key.endsWith('.png')) {
    return 'image/png';
  }
  if (key.endsWith('.jpg') || key.endsWith('.jpeg')) {
    return 'image/jpeg';
  }
  if (key.endsWith('.gif')) {
    return 'image/gif';
  }
  if (key.endsWith('.svg')) {
    return 'image/svg+xml';
  }
  return 'application/octet-stream';
};
