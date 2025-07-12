import React from 'react';
import styles from './PostsList.module.css';

export type Post = {
  id: number;
  user: string;
  type: 'Need' | 'Offer' | 'Question';
  text: string;
  time: string;
};

export const PostsList: React.FC<{ posts: Post[] }> = ({ posts }) => (
  <ul className={styles.postsList}>
    {posts.map(post => (
      <li key={post.id} className={styles.postCard}>
        <div className={styles.postHeader}>
          <span className={styles.postUser}>{post.user}</span>
          <span className={styles.postType}>{post.type}</span>
          <span className={styles.postTime}>{post.time}</span>
        </div>
        <div className={styles.postText}>{post.text}</div>
      </li>
    ))}
  </ul>
);
