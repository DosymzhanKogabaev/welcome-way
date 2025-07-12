import React, { useState } from 'react';
import styles from './AskingForHelp.module.css';
import '../../index.css';
import { AppHeader } from '../../components/AppPagesComp/AppHeader/AppHeader';
import {
  PostsList,
  Post,
} from '../../components/AppPagesComp/PostsList/PostsList';
import { CreatePostModal } from '../../components/AppPagesComp/CreatePostModal/CreatePostModal';

const initialPosts: Post[] = [
  {
    id: 1,
    user: 'Anna (UA)',
    type: 'Need',
    text: 'Looking for a translator for documents in Berlin.',
    time: '2 min ago',
  },
  {
    id: 2,
    user: 'Anna (UA)',
    type: 'Need',
    text: 'Looking for a translator for documents in Berlin.',
    time: '4 min ago',
  },
  {
    id: 3,
    user: 'Anna (UA)',
    type: 'Need',
    text: 'Looking for a translator for documents in Berlin.',
    time: '7 min ago',
  },
  {
    id: 4,
    user: 'Mohammed (SY)',
    type: 'Offer',
    text: 'Can help with finding housing in Hamburg.',
    time: '10 min ago',
  },
  {
    id: 5,
    user: 'Julia (DE)',
    type: 'Question',
    text: 'Where do I register my child for school in Munich?',
    time: '20 min ago',
  },
];

export const AskingForHelp: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [sort, setSort] = useState('latest');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [posts, setPosts] = useState(initialPosts);

  const filteredPosts = posts.filter(post =>
    sort === 'latest'
      ? true
      : sort === 'need'
      ? post.type === 'Need'
      : sort === 'offer'
      ? post.type === 'Offer'
      : post.type === 'Question'
  );

  const handleCreatePost = (newPost: Omit<Post, 'id' | 'time' | 'user'>) => {
    const mockUser = 'Anna (UA)';
    const newId = posts.length + 1;
    setPosts(prev => [
      ...prev,
      {
        id: newId,
        user: mockUser,
        type: newPost.type,
        text: newPost.text,
        time: 'Just now',
      },
    ]);
    setIsModalOpen(false);
  };

  return (
    <div className={styles.page}>
      <AppHeader menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <div className={styles.sortingBar}>
        <label htmlFor="sort" className={styles.sortLabel}>
          Sort by:
        </label>
        <select
          id="sort"
          value={sort}
          onChange={e => setSort(e.target.value)}
          className={styles.sortSelect}
        >
          <option value="latest">Latest</option>
          <option value="need">Needs</option>
          <option value="offer">Offers</option>
          <option value="question">Questions</option>
        </select>
      </div>
      <main className={styles.postsSection}>
        <button
          className={styles.createPostBtn}
          onClick={() => setIsModalOpen(true)}
          aria-label="Create new post"
        >
          + Create Post
        </button>
        <PostsList posts={filteredPosts} />
        {isModalOpen && (
          <CreatePostModal
            onClose={() => setIsModalOpen(false)}
            onSave={handleCreatePost}
          />
        )}
      </main>
    </div>
  );
};
