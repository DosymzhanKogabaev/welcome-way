// AskingForHelp.tsx
import React, { useEffect, useState } from 'react';
import styles from './AskingForHelp.module.css';
import { AppHeader } from '../../components/AppPagesComp/AppHeader/AppHeader';
import { PostsList } from '../../components/AppPagesComp/PostsList/PostsList';
import { SortingPanel } from '../../components/AppPagesComp/SortingPanel/SortingPanel';
import { CreatePostModal } from '../../components/AppPagesComp/CreatePostModal/CreatePostModal';
import { useAppDispatch, useAppSelector } from '@/src/redux/hooks';
import {
  fetchPosts,
  createPost,
  updatePost,
  deletePost,
} from '@/src/redux/slices/posts/postsSlice';
import {
  PostCreatePayload,
  PostPayload,
} from '../../components/AppPagesComp/PostsList/types';

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
    await dispatch(updatePost({ id, data: updates }));
  };

  const handleDeletePost = async (id: number) => {
    await dispatch(deletePost(id));
  };

  return (
    <div>
      <AppHeader menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <div className={styles.page}>
        <aside className={styles.sidebarLeft}>
          <section className={styles.checklist}>
            <h4>Integration Checklist</h4>
            <ul>
              <li>
                <input type="checkbox" checked /> Register Address
              </li>
              <li>
                <input type="checkbox" /> Apply for Tax ID
              </li>
              <li>
                <input type="checkbox" /> Find Health Insurance
              </li>
              <li>
                <input type="checkbox" /> Open Bank Account
              </li>
            </ul>
          </section>
          <section className={styles.stats}>
            <div>
              Unread Responses <span>14</span>
            </div>
            <div>
              Unread Posts <span>63</span>
            </div>
          </section>
          <nav className={styles.navList}>
            <ul>
              <li>Saved Posts</li>
              <li>Friends</li>
              <li>Groups</li>
              <li>History</li>
              <li>Settings</li>
            </ul>
          </nav>
        </aside>

        <main className={styles.mainContent}>
          <div className={styles.createPostInputBox}>
            <button
              className={styles.createPostBtnFull}
              onClick={() => setIsModalOpen(true)}
            >
              + Create Post
            </button>
          </div>

          <SortingPanel
            sort={sort}
            setSort={setSort}
            search={search}
            setSearch={setSearch}
          />

          {loading && <div className={styles.loading}>Loading...</div>}
          {error && <div className={styles.error}>{error}</div>}

          <PostsList
            posts={filteredPosts}
            onEdit={handleUpdatePost}
            onDelete={handleDeletePost}
          />

          {isModalOpen && (
            <CreatePostModal
              onSave={handleCreatePost}
              onClose={() => setIsModalOpen(false)}
            />
          )}
        </main>

        <aside className={styles.sidebarRight}>
          <h4>WelcomeWay News</h4>
          <ul className={styles.newsList}>
            <li>
              “Ukrainian Mother Finds Housing in 24 Hours Through WelcomeWay”
            </li>
            <li>
              “Local Volunteer Translates Legal Docs for 12 Newcomers This Week”
            </li>
            <li>
              “From Stranger to Friend: How Ana Helped 3 Families Settle In”
            </li>
            <li>
              “Free Health Clinic in Munich Welcomes Refugees Every Friday”
            </li>
            <li>“Berlin Teen Starts Tutoring Program for Afghan Kids”</li>
            <li>“100+ Acts of Help Shared in Just One Day”</li>
            <li>“Where to Find Free Meals This Week Across Hamburg”</li>
          </ul>
        </aside>
      </div>
    </div>
  );
};
