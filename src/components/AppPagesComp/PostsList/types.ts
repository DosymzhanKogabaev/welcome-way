// src/components/AppPagesComp/PostsList/types.ts
export interface Post {
  id: number; 
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
  type: 'need' | 'offer' | 'question';
  text: string;
  location: string;
}
