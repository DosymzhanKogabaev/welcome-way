// PostsList.tsx
import React from 'react';
import styles from './PostsList.module.css';
import { Post, PostPayload } from './types';
import { FiEdit3, FiTrash2 } from 'react-icons/fi';

type PostsListProps = {
  posts: Post[];
  onEdit?: (id: number, updates: Partial<PostPayload>) => void;
  onDelete?: (id: number) => void;
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
              <FiEdit3 size={16} />
              Edit
            </button>
          )}
          {onDelete && (
            <button
              className={styles.deleteBtn}
              onClick={() => onDelete(post.id)}
            >
              <FiTrash2 size={16} />
              Delete
            </button>
          )}
        </div>
      </li>
    ))}
  </ul>
);
