// src/pages/ProfilePage/ProfilePage.tsx

import React from 'react';
import { useParams } from 'react-router-dom';
import styles from './ProfilePage.module.css';
import { AppHeader } from '../../components/AppPagesComp/AppHeader/AppHeader';
import {
  PostsList,
  Post,
} from '../../components/AppPagesComp/PostsList/PostsList';

const userData = {
  id: '1',
  name: 'Anna (UA)',
  bio: 'Helping newcomers settle in Berlin. Fluent in English and Ukrainian.',
  avatar: null,
};

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
    user: 'Anna (UA)',
    type: 'Offer',
    text: 'Can provide guidance on navigating public transport in Berlin.',
    time: '15 min ago',
  },
];

export const ProfilePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const user = userData;

  return (
    <div className={styles.page}>
      <AppHeader menuOpen={false} setMenuOpen={() => {}} />
      <main className={styles.profileSection}>
        <div className={styles.profileHeader}>
          <div className={styles.avatar}>
            {user.avatar ? (
              <img src={user.avatar} alt={`${user.name}'s avatar`} />
            ) : (
              <span className={styles.avatarPlaceholder}>{user.name[0]}</span>
            )}
          </div>
          <h1 className={styles.userName}>{user.name}</h1>
          <p className={styles.bio}>{user.bio}</p>
          <button className={styles.editProfileBtn}>Edit Profile</button>
        </div>
        <section className={styles.postsSection}>
          <h2 className={styles.postsTitle}>Recent Posts</h2>
          <PostsList posts={posts.filter(post => post.user === user.name)} />
        </section>
      </main>
    </div>
  );
};
