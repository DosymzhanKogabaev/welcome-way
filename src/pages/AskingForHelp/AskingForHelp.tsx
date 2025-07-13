import React, { useEffect, useState } from 'react';
import styles from './AskingForHelp.module.css';
import '../../index.css';
import { AppHeader } from '../../components/AppPagesComp/AppHeader/AppHeader';
import { PostsList } from '../../components/AppPagesComp/PostsList/PostsList';
import {
  PostCreatePayload,
  PostPayload,
} from '../../components/AppPagesComp/PostsList/types';
import { CreatePostModal } from '../../components/AppPagesComp/CreatePostModal/CreatePostModal';
import { SortingPanel } from '../../components/AppPagesComp/SortingPanel/SortingPanel';
import { useAppDispatch, useAppSelector } from '@/src/redux/hooks';
import {
  fetchPosts,
  createPost,
  updatePost,
  deletePost,
} from '@/src/redux/slices/posts/postsSlice';

export const AskingForHelp: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [sort, setSort] = useState('latest');
  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const dispatch = useAppDispatch();
  const {
    items: posts = [],
    loading,
    error,
  } = useAppSelector(
    state => state.posts ?? { items: [], loading: false, error: null }
  );

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  const filteredPosts = posts
    .filter(
      post =>
        post.text.toLowerCase().includes(search.toLowerCase()) &&
        (sort === 'latest'
          ? true
          : sort === 'need'
          ? post.type === 'Need'
          : sort === 'offer'
          ? post.type === 'Offer'
          : sort === 'question'
          ? post.type === 'Question'
          : sort === 'location'
          ? true
          : false)
    )
    .sort((a, b) => {
      if (sort === 'location') {
        return a.location.localeCompare(b.location);
      }
      return (
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      );
    });

  const handleCreatePost = async (newPost: PostCreatePayload) => {
    const fullPost: PostPayload = {
      ...newPost,
      user: 'currentUserId',
      time: new Date().toISOString(),
    };
    await dispatch(createPost(fullPost));
    setIsModalOpen(false);
  };

  const handleUpdatePost = async (
    id: number,
    updates: Partial<PostPayload>
  ) => {
    console.log(id, updates);
    await dispatch(updatePost({ id, data: updates }));
  };

  const handleDeletePost = async (id: number) => {
    console.log(typeof id, id);
    await dispatch(deletePost(id));
  };

  return (
    <div className={styles.page}>
      <AppHeader menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <SortingPanel
        sort={sort}
        setSort={setSort}
        search={search}
        setSearch={setSearch}
      />
      <main className={styles.postsSection}>
        {loading && <div>Loading...</div>}
        {error && <div className={styles.error}>{error}</div>}
        <PostsList
          posts={filteredPosts}
          onEdit={handleUpdatePost}
          onDelete={handleDeletePost}
        />
        {isModalOpen && (
          <CreatePostModal
            onClose={() => setIsModalOpen(false)}
            onSave={handleCreatePost}
          />
        )}
        <button
          className={styles.createPostBtn}
          onClick={() => setIsModalOpen(true)}
          aria-label="Create new post"
        >
          + Create Post
        </button>
      </main>
    </div>
  );
};
