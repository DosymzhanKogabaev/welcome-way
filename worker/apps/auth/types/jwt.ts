export type JwtPayload = {
  id: number;
  jti: string;
  token_type: "access" | "refresh";
  exp: number;
};

export type JwtTokens = {
  access_token: string;
  refresh_token: string;
};
