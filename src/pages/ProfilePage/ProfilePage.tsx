import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import styles from './ProfilePage.module.css';
import { AppHeader } from '../../components/AppPagesComp/AppHeader/AppHeader';
import {
  PostsList,
  Post,
} from '../../components/AppPagesComp/PostsList/PostsList';

const initialUserData = {
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
  const [user, setUser] = useState(initialUserData);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ name: user.name, bio: user.bio });

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setUser(prev => ({ ...prev, name: formData.name, bio: formData.bio }));
    handleCloseModal();
  };

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
          <button
            className={styles.editProfileBtn}
            onClick={handleOpenModal}
            aria-label="Edit profile"
          >
            Edit Profile
          </button>
        </div>
        <section className={styles.postsSection}>
          <h2 className={styles.postsTitle}>Recent Posts</h2>
          <PostsList posts={posts.filter(post => post.user === user.name)} />
        </section>

        {isModalOpen && (
          <div className={styles.modalOverlay} onClick={handleCloseModal}>
            <div
              className={styles.modal}
              role="dialog"
              aria-labelledby="edit-profile-title"
              aria-modal="true"
              onClick={e => e.stopPropagation()}
            >
              <h2 id="edit-profile-title" className={styles.modalTitle}>
                Edit Profile
              </h2>
              <form onSubmit={handleSave}>
                <label htmlFor="name" className={styles.formLabel}>
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleInputChange}
                  className={styles.formInput}
                  required
                />
                <label htmlFor="bio" className={styles.formLabel}>
                  Bio
                </label>
                <textarea
                  id="bio"
                  name="bio"
                  value={formData.bio}
                  onChange={handleInputChange}
                  className={styles.formTextArea}
                  rows={4}
                />
                <div className={styles.modalActions}>
                  <button
                    type="button"
                    className={styles.cancelBtn}
                    onClick={handleCloseModal}
                  >
                    Cancel
                  </button>
                  <button type="submit" className={styles.saveBtn}>
                    Save
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};
