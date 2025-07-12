import { postSchema } from '@/worker/db/schema/post';

export type Post = typeof postSchema.$inferSelect;

export interface CreatePostRequest {
  type: PostType;
  text: string;
}

export interface CreatePostResponse {
  id: number;
  author_id: number;
  type: string;
  text: string;
  created_at: number;
  updated_at: number;
}

export interface UpdatePostRequest {
  type?: PostType;
  text?: string;
}

export interface UpdatePostResponse {
  id: number;
  type: string;
  text: string;
  created_at: number;
  updated_at: number;
}

export interface PostInfo {
  id: number;
  author_id: number;
  type: PostType;
  text: string;
  created_at: number;
  updated_at: number;
}

export interface UserPostsResponse {
  posts: Array<{
    id: number;
    user_id: number;
    type: string;
    text: string;
    created_at: number;
    updated_at: number;
  }>;
  total: number;
}

export type PostType = 'need' | 'offer' | 'question';
