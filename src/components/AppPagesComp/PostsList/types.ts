// types.ts
export interface Post {
  id: string;
  user: string;
  type: string;
  location: string;
  time: string;
  text: string;
  created_at: string;
}

export interface PostPayload {
  user: string;
  type: string;
  location: string;
  time: string;
  text: string;
}

export interface PostCreatePayload {
  type: PostPayload['type'];
  text: string;
  location: string;
}
