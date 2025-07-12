import React, { useState } from 'react';
import styles from './AskingForHelp.module.css';
import '../../index.css';
import { AppHeader } from '../../components/AppPagesComp/AppHeader/AppHeader';
import {
  PostsList,
  Post,
} from '../../components/AppPagesComp/PostsList/PostsList';

const posts: Post[] = [
  {
    id: 1,
    user: 'Anna (UA)',
    type: 'Need',
    text: 'Looking for a translator for documents in Berlin.',
    time: '2 min ago',
  },
  {
    id: 2,
    user: 'Mohammed (SY)',
    type: 'Offer',
    text: 'Can help with finding housing in Hamburg.',
    time: '10 min ago',
  },
  {
    id: 3,
    user: 'Julia (DE)',
    type: 'Question',
    text: 'Where do I register my child for school in Munich?',
    time: '20 min ago',
  },
];

export const AskingForHelp: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [sort, setSort] = useState('latest');

  const filteredPosts = posts.filter(post =>
    sort === 'latest'
      ? true
      : sort === 'need'
      ? post.type === 'Need'
      : sort === 'offer'
      ? post.type === 'Offer'
      : post.type === 'Question'
  );

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
        <button className={styles.createPostBtn}>+ Create Post</button>
        <PostsList posts={filteredPosts} />
      </main>
    </div>
  );
};
