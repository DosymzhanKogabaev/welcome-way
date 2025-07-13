import React from 'react';
import styles from './PostsList.module.css';
import { Post, PostPayload } from './types';

type PostsListProps = {
  posts: Post[];
  onEdit?: (id: string, updates: Partial<PostPayload>) => void;
  onDelete?: (id: string) => void;
};

export const PostsList: React.FC<PostsListProps> = ({
  posts,
  onEdit,
  onDelete,
}) => (
  <ul className={styles.postsList}>
    {posts.map(post => (
      <li key={post.id} className={styles.postCard}>
        <div className={styles.postHeader}>
          <span className={styles.postUser}>{post.user}</span>
          <span className={styles.postType}>{post.type}</span>
          <span className={styles.postLocation}>{post.location}</span>
          <span className={styles.postTime}>{post.time}</span>
        </div>
        <div className={styles.postText}>{post.text}</div>

        <div className={styles.postActions}>
          {onEdit && (
            <button
              className={styles.editBtn}
              onClick={() =>
                onEdit(post.id, {
                  text: prompt('Edit post text:', post.text) || post.text,
                })
              }
            >
              Edit
            </button>
          )}
          {onDelete && (
            <button
              className={styles.deleteBtn}
              onClick={() => onDelete(post.id)}
            >
              Delete
            </button>
          )}
        </div>
      </li>
    ))}
  </ul>
);
