import { initDbConnect } from '@/worker/db';
import { postSchema } from '@/worker/db/schema/post';
import { userSchema } from '@/worker/db/schema/user';
import { eq, desc, and, sql } from 'drizzle-orm';
import { PostServiceParams } from '../types/post';
import {
  PostCreationFailedException,
  PostNotFoundException,
} from '../exceptions/post';
import { Post } from '@/shared/types/post';

export async function createPost(
  env: Env,
  params: PostServiceParams
): Promise<Post> {
  const db = initDbConnect(env);
  try {
    if (!['need', 'offer', 'question'].includes(params.type)) {
      throw new PostCreationFailedException(
        'Invalid post type. Must be "need", "offer", or "question"'
      );
    }
    const [post] = await db
      .insert(postSchema)
      .values({
        author_id: params.authorId,
        type: params.type,
        text: params.text,
      })
      .returning();

    if (!post) {
      throw new PostCreationFailedException();
    }

    return post;
  } catch (error) {
    console.error('Failed to create post:', error);
    throw new PostCreationFailedException();
  }
}

export async function getPostById(env: Env, postId: number) {
  const db = initDbConnect(env);
  try {
    const [post] = await db
      .select()
      .from(postSchema)
      .where(eq(postSchema.id, postId))
      .limit(1);

    return post || null;
  } catch (error) {
    console.error('Failed to get post by ID:', error);
    return null;
  }
}

export async function getPostByIdWithUserInfo(env: Env, postId: number) {
  const db = initDbConnect(env);
  try {
    const [post] = await db
      .select({
        id: postSchema.id,
        type: postSchema.type,
        text: postSchema.text,
        created_at: postSchema.created_at,
        user_full_name: userSchema.full_name,
      })
      .from(postSchema)
      .innerJoin(userSchema, eq(postSchema.author_id, userSchema.id))
      .where(eq(postSchema.id, postId))
      .limit(1);

    return post || null;
  } catch (error) {
    console.error('Failed to get post by ID with user info:', error);
    return null;
  }
}

export async function getPostsByAuthor(env: Env, authorId: number) {
  const db = initDbConnect(env);
  try {
    const posts = await db
      .select()
      .from(postSchema)
      .where(eq(postSchema.author_id, authorId))
      .orderBy(desc(postSchema.created_at));

    return posts;
  } catch (error) {
    console.error('Failed to get posts by author:', error);
    return [];
  }
}

export async function getAllPosts(
  env: Env,
  filters: {
    type?: string;
    user_id?: number;
    page?: number;
    limit?: number;
  } = {}
) {
  const db = initDbConnect(env);
  try {
    const { type, user_id, page = 1, limit = 50 } = filters;
    const offset = (page - 1) * limit;

    // Build conditions array
    const conditions = [];

    if (type && ['need', 'offer', 'question'].includes(type.toLowerCase())) {
      conditions.push(eq(postSchema.type, type.toLowerCase()));
    }

    if (user_id && !isNaN(user_id)) {
      conditions.push(eq(postSchema.author_id, user_id));
    }

    // Build the main query
    const baseQuery = db
      .select({
        id: postSchema.id,
        type: postSchema.type,
        text: postSchema.text,
        created_at: postSchema.created_at,
        user_full_name: userSchema.full_name,
      })
      .from(postSchema)
      .innerJoin(userSchema, eq(postSchema.author_id, userSchema.id));

    // Apply where conditions and execute query
    const posts =
      conditions.length > 0
        ? await baseQuery
            .where(conditions.length === 1 ? conditions[0] : and(...conditions))
            .orderBy(desc(postSchema.created_at))
            .limit(limit)
            .offset(offset)
        : await baseQuery
            .orderBy(desc(postSchema.created_at))
            .limit(limit)
            .offset(offset);

    // Get total count for pagination
    const countBaseQuery = db
      .select({ count: sql<number>`count(*)` })
      .from(postSchema);

    const totalResult =
      conditions.length > 0
        ? await countBaseQuery.where(
            conditions.length === 1 ? conditions[0] : and(...conditions)
          )
        : await countBaseQuery;

    const total = totalResult[0]?.count || 0;

    return { posts, total };
  } catch (error) {
    console.error('Failed to get all posts:', error);
    return { posts: [], total: 0 };
  }
}

export async function updatePost(
  env: Env,
  postId: number,
  authorId: number,
  updates: Partial<{ type: string; text: string }>
) {
  const db = initDbConnect(env);
  try {
    // First check if post exists and belongs to the author
    const [existingPost] = await db
      .select()
      .from(postSchema)
      .where(eq(postSchema.id, postId))
      .limit(1);

    if (!existingPost) {
      throw new PostNotFoundException();
    }

    if (existingPost.author_id !== authorId) {
      throw new Error('Unauthorized to update this post');
    }

    const [updatedPost] = await db
      .update(postSchema)
      .set({
        ...updates,
        updated_at: new Date(),
      })
      .where(eq(postSchema.id, postId))
      .returning();

    return updatedPost;
  } catch (error) {
    console.error('Failed to update post:', error);
    throw error;
  }
}

export async function deletePost(env: Env, postId: number, authorId: number) {
  const db = initDbConnect(env);
  try {
    // First check if post exists and belongs to the author
    const [existingPost] = await db
      .select()
      .from(postSchema)
      .where(eq(postSchema.id, postId))
      .limit(1);

    if (!existingPost) {
      throw new PostNotFoundException();
    }

    if (existingPost.author_id !== authorId) {
      throw new Error('Unauthorized to delete this post');
    }

    await db.delete(postSchema).where(eq(postSchema.id, postId));

    return true;
  } catch (error) {
    console.error('Failed to delete post:', error);
    throw error;
  }
}

export async function getUserPosts(
  env: Env,
  userId: number,
  filters: {
    type?: string;
    page?: number;
    limit?: number;
  } = {}
) {
  const db = initDbConnect(env);
  try {
    const { type, page = 1, limit = 50 } = filters;
    const offset = (page - 1) * limit;

    // Build conditions array
    const conditions = [eq(postSchema.author_id, userId)];

    if (type && ['need', 'offer', 'question'].includes(type.toLowerCase())) {
      conditions.push(eq(postSchema.type, type.toLowerCase()));
    }

    // Build the main query
    const baseQuery = db
      .select({
        id: postSchema.id,
        user_id: postSchema.author_id,
        type: postSchema.type,
        text: postSchema.text,
        created_at: postSchema.created_at,
        updated_at: postSchema.updated_at,
      })
      .from(postSchema);

    // Apply where conditions and execute query
    const posts = await baseQuery
      .where(conditions.length === 1 ? conditions[0] : and(...conditions))
      .orderBy(desc(postSchema.created_at))
      .limit(limit)
      .offset(offset);

    // Get total count for pagination
    const countBaseQuery = db
      .select({ count: sql<number>`count(*)` })
      .from(postSchema);

    const totalResult = await countBaseQuery.where(
      conditions.length === 1 ? conditions[0] : and(...conditions)
    );

    const total = totalResult[0]?.count || 0;

    return { posts, total };
  } catch (error) {
    console.error('Failed to get user posts:', error);
    return { posts: [], total: 0 };
  }
}
