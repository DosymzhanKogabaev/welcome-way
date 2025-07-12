import React, { useState } from 'react';
import styles from './AskingForHelp.module.css';
import '../../index.css';
import { AppHeader } from '../../components/AppPagesComp/AppHeader/AppHeader';
import {
  PostsList,
  Post,
} from '../../components/AppPagesComp/PostsList/PostsList';
import { CreatePostModal } from '../../components/AppPagesComp/CreatePostModal/CreatePostModal';
import { SortingPanel } from '../../components/AppPagesComp/SortingPanel/SortingPanel';

// Mock posts data (replace with API in a real app)
const initialPosts: Post[] = [
  {
    id: 1,
    user: 'Anna (UA)',
    type: 'Need',
    text: 'Looking for a translator for documents in Berlin.',
    time: '2 min ago',
    created_at: '2025-07-12T17:29:00Z',
    location: 'Berlin',
  },
  {
    id: 2,
    user: 'Mohammed (SY)',
    type: 'Offer',
    text: 'Can help with finding housing in Hamburg.',
    time: '10 min ago',
    created_at: '2025-07-12T17:21:00Z',
    location: 'Hamburg',
  },
  {
    id: 3,
    user: 'Julia (DE)',
    type: 'Question',
    text: 'Where do I register my child for school in Munich?',
    time: '20 min ago',
    created_at: '2025-07-12T17:11:00Z',
    location: 'Munich',
  },
];

export const AskingForHelp: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [sort, setSort] = useState('latest');
  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [posts, setPosts] = useState(initialPosts);

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

  const handleCreatePost = (newPost: Omit<Post, 'id' | 'time' | 'user'>) => {
    const mockUser = 'Anna (UA)';
    const newId = posts.length + 1;
    setPosts(prev => [
      {
        id: newId,
        user: mockUser,
        type: newPost.type,
        text: newPost.text,
        time: 'Just now',
        created_at: newPost.created_at,
        location: newPost.location,
      },
      ...prev,
    ]);
    setIsModalOpen(false);
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
        <PostsList posts={filteredPosts} />
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
