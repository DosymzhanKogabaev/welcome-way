export type JwtPayload = {
  user_id: number;
  jti: string;
  token_type: 'access' | 'refresh';
  exp: number;
};

export type JwtTokens = {
  access_token: string;
  refresh_token: string;
};

export type DecodedToken = {
  header: {
    alg: string;
    typ: string;
  };
  payload: {
    exp: number;
    iat: number;
    jti: string;
    user_id: string;
    token_type: string;
  };
};
