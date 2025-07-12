import { PostType } from '@/shared/types/post';

export interface PostServiceParams {
  authorId: number;
  type: PostType;
  text: string;
}
