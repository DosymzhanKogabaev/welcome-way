import jwt from '@tsndr/cloudflare-worker-jwt';
import { IRequest } from 'itty-router';
import { JwtPayload } from '@/worker/apps/auth/types/jwt';

// ====================
// Публичные функции
// ====================

export default async function auth(
  request: IRequest,
  _env: Env,
  _ctx: ExecutionContext
): Promise<Response | void> {
  const urlPathname = new URL(request.url).pathname;
  if (urlPathname.includes('private')) {
    const token = getJwt(request);
    if (!token) {
      return new Response('No authorization token provided', { status: 401 });
    }
  } else {
    return new Response('Invalid url structure', { status: 401 });
  }
}

export async function verifyJwt(
  token: string,
  env: Env
): Promise<Response | JwtPayload> {
  const isValid = await jwt.verify(token, env.JWT_SECRET_TOKEN);
  if (!isValid) {
    return new Response('Invalid JWT signature', { status: 401 });
  }

  const decoded = jwt.decode(token);
  if (!decoded) {
    return new Response('Invalid JWT format', { status: 401 });
  }

  const payload = decoded.payload as JwtPayload;
  if (!payload || !payload?.user_id || !payload?.exp) {
    return new Response('Invalid token payload', { status: 401 });
  }
  if (!checkTokenExpired(payload)) {
    return new Response('Token expired', { status: 401 });
  }

  return payload;
}

// ====================
// Приватные функции
// ====================

function checkTokenExpired(payload: JwtPayload): boolean {
  const now = Math.floor(Date.now() / 1000);
  if (payload.exp && payload.exp > now) {
    return true;
  }

  return false;
}

// function getToken(request: Request): string | null {
//   const authHeader = request.headers.get('Authorization');

//   if (!authHeader || !authHeader.startsWith('Token ')) {
//     return null;
//   }

//   return authHeader.split(' ')[1].trim();
// }

function getJwt(request: Request): string | null {
  const authHeader = request.headers.get('Authorization');
  if (!authHeader || !authHeader.startsWith('JWT ')) {
    return null;
  }

  return authHeader.split(' ')[1].trim();
}
