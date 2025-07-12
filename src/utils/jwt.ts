import { decode } from '@tsndr/cloudflare-worker-jwt';
import { DecodedToken } from '@/shared/types/jwt';

export const decodeAccessToken = (token: string) => {
  const decodedToken = decode(token) as DecodedToken;
  const userId = decodedToken.payload?.user_id;

  return Number(userId);
};
