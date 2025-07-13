// src/redux/slices/posts/postsSlice.ts

import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import ApiClient from '@/src/api/ApiClient';
import {
  Post,
  PostPayload,
} from '@/src/components/AppPagesComp/PostsList/types';

export const fetchPosts = createAsyncThunk<Post[], void>(
  'posts/fetchPosts',
  async () => {
    const response = await ApiClient.get<{ posts: Post[] }, void>(
      'api/public/posts'
    );
    return response.posts;
  }
);

export const createPost = createAsyncThunk<Post, PostPayload>(
  'posts/createPost',
  async (payload: PostPayload) => {
    // console.log(payload);
    const data = await ApiClient.post<Post, PostPayload>(
      'api/private/create-post/',
      {
        body: payload,
      }
    );
    return data;
  }
);

export const updatePost = createAsyncThunk<
  Post,
  { id: number; data: Partial<PostPayload> }
>('posts/updatePost', async ({ id, data }) => {
  const updated = await ApiClient.put<Post, Partial<PostPayload>>(
    `api/private/posts/${id}`,
    {
      body: data,
    }
  );
  // console.log(updated);
  return updated;
});

export const deletePost = createAsyncThunk<number, number>(
  'posts/deletePost',
  async (id: number) => {
    await ApiClient.delete<void, void>(`api/private/posts/${id}`);
    return id;
  }
);

interface PostsState {
  items: Post[];
  loading: boolean;
  error: string | null;
}

const initialState: PostsState = {
  items: [],
  loading: false,
  error: null,
};

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchPosts.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPosts.fulfilled, (state, action: PayloadAction<Post[]>) => {
        state.items = action.payload;
        state.loading = false;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch posts';
      })
      .addCase(createPost.fulfilled, (state, action: PayloadAction<Post>) => {
        if (!state.items) state.items = [];
        state.items.unshift(action.payload);
      })
      .addCase(updatePost.fulfilled, (state, action: PayloadAction<Post>) => {
        const index = state.items.findIndex(
          post => post.id === action.payload.id
        );
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })
      .addCase(deletePost.fulfilled, (state, action: PayloadAction<number>) => {
        state.items = state.items.filter(post => post.id !== action.payload);
      });
  },
});

export default postsSlice.reducer;
