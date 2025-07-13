// PostsList.tsx
import React from 'react';
import styles from './PostsList.module.css';
import { Post, PostPayload } from './types';
import { FiEdit3, FiTrash2 } from 'react-icons/fi';
import { useAppSelector } from '@/src/redux/hooks';

type PostsListProps = {
  posts: Post[];
  onEdit?: (id: number, updates: Partial<PostPayload>) => void;
  onDelete?: (id: number) => void;
};

export const PostsList: React.FC<PostsListProps> = ({
  posts,
  onEdit,
  onDelete,
}) => {
  const { user } = useAppSelector(state => state.auth);

  return (
    <ul className={styles.postsList}>
      {posts.map(post => (
        <li key={post.id} className={styles.postCard}>
          <div className={styles.postHeader}>
            <span className={styles.postUser}>{user?.full_name}</span>
            <span className={styles.postType}>{post.type}</span>
            <span
              className={styles.postLocation}
            >{`${user?.region}, ${user?.country}`}</span>
            <span className={styles.postTime}>
              {new Date(post.created_at).toLocaleString('en-GB', {
                day: '2-digit',
                month: 'short',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
              })}
            </span>
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
};
