import { decode } from '@tsndr/cloudflare-worker-jwt';
import { JwtPayload } from '@/shared/types/jwt';

export const decodeAccessToken = (token: string) => {
  const decodedToken = decode(token) as unknown as JwtPayload;
  const userId = decodedToken.user_id;

  return Number(userId);
};
