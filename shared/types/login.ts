export type LoginUserRequest = {
  email: string;
  password: string;
};

export type LoginUserResponse = {
  access_token: string;
  refresh_token: string;
};
