// src/redux/slices/posts/postsSlice.ts

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import ApiClient from '@/src/api/ApiClient';
import {
  Post,
  PostPayload,
} from '@/src/components/AppPagesComp/PostsList/types';

export const fetchPosts = createAsyncThunk<Post[], void>(
  'posts/fetchPosts',
  async () => {
    const response = await ApiClient.get<{ posts: Post[] }, void>('posts/');
    return response.posts;
  }
);

export const createPost = createAsyncThunk<Post, PostPayload>(
  'posts/createPost',
  async (payload: PostPayload) => {
    const data = await ApiClient.post<Post, PostPayload>('posts/', {
      body: payload,
    });
    return data;
  }
);

export const updatePost = createAsyncThunk<
  Post,
  { id: string; data: Partial<PostPayload> }
>('posts/updatePost', async ({ id, data }) => {
  const updated = await ApiClient.put<Post, Partial<PostPayload>>(
    `posts/${id}/`,
    {
      body: data,
    }
  );
  return updated;
});

export const deletePost = createAsyncThunk<string, string>(
  'posts/deletePost',
  async (id: string) => {
    await ApiClient.delete<void, void>(`posts/${id}/`);
    return id;
  }
);

const postsSlice = createSlice({
  name: 'posts',
  initialState: {
    items: [] as Post[],
    loading: false,
    error: null as string | null,
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchPosts.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loading = false;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch posts';
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.items.unshift(action.payload);
      })
      .addCase(updatePost.fulfilled, (state, action) => {
        const index = state.items.findIndex(
          post => post.id === action.payload.id
        );
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        state.items = state.items.filter(post => post.id !== action.payload);
      });
  },
});

export default postsSlice.reducer;
