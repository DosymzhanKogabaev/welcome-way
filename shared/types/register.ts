export type RegisterUserRequest = {
  email: string;
  password: string;
  full_name: string;
  language: string;
};

export type RegisterUserResponse = {
  id: number;
  email: string;
};
