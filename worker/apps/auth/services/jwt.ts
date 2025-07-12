import { JwtPayload, JwtTokens } from "@/worker/apps/auth/types/jwt";
import { User } from "@/shared/types/user";
import jwt from "@tsndr/cloudflare-worker-jwt";

export async function generateTokens(env: Env, user: User): Promise<JwtTokens> {
  const SECRET_TOKEN = env.JWT_SECRET_TOKEN;
  const currentTimestamp = Math.floor(Date.now() / 1000);
  const accessTokenExpiresIn = Number(env.ACCESS_TOKEN_EXPIRES_IN);
  const refreshTokenExpiresIn = Number(env.REFRESH_TOKEN_EXPIRES_IN);
  const accessExpiresIn = currentTimestamp + accessTokenExpiresIn;
  const refreshExpiresIn = currentTimestamp + refreshTokenExpiresIn;
  const payload = {
    id: user.id,
  };
  const accessPayload: JwtPayload = {
    ...payload,
    token_type: "access",
    jti: crypto.randomUUID(),
    exp: accessExpiresIn,
  };
  const refreshPayload: JwtPayload = {
    ...payload,
    token_type: "refresh",
    jti: crypto.randomUUID(),
    exp: refreshExpiresIn,
  };
  const accessToken = await jwt.sign(accessPayload, SECRET_TOKEN);

  const refreshToken = await jwt.sign(refreshPayload, SECRET_TOKEN);

  return { access_token: accessToken, refresh_token: refreshToken };
}
