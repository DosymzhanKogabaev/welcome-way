import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import styles from './ProfilePage.module.css';
import { AppHeader } from '../../components/AppPagesComp/AppHeader/AppHeader';
import {
  PostsList
} from '../../components/AppPagesComp/PostsList/PostsList';
import  { Post } from '../../components/AppPagesComp/PostsList/types';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import {
  getUserInfo,
  uploadUserAvatar,
  setError,
} from '../../redux/slices/auth/authSlice';
import ApiClient from '../../api/ApiClient';
import { ProfileSidebar } from '../../components/AppPagesComp/ProfileSidebar/ProfileSidebar';
import { FaPlus } from 'react-icons/fa';
import { FaArrowRight } from 'react-icons/fa6';
import { SlLocationPin } from "react-icons/sl";
import { HiOutlineLanguage } from "react-icons/hi2"
import { GoMail } from "react-icons/go";
import { RiEdit2Line } from "react-icons/ri";

interface UserPost {
  id: number;
  user_id: number;
  type: string;
  text: string;
  created_at: number;
  updated_at: number;
}

interface UserPostsResponse {
  posts: UserPost[];
  total: number;
}

export const ProfilePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const { user, isLoading: authLoading } = useAppSelector(state => state.auth);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.full_name || '',
    bio: '', // Note: bio field doesn't exist in user schema yet
  });
  const [userPosts, setUserPosts] = useState<Post[]>([]);
  const [postsLoading, setPostsLoading] = useState(false);
  const [uploadingAvatar, setUploadingAvatar] = useState(false);
  const uploadError = useAppSelector(state => state.auth.error);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Fetch user info if not available
  useEffect(() => {
    if (!user && !authLoading) {
      dispatch(getUserInfo());
    }
  }, [dispatch, user, authLoading]);

  // Update form data when user data changes
  useEffect(() => {
    if (user) {
      setFormData({
        name: user.full_name,
        bio: '',
      });
    }
  }, [user]);

  // Fetch user posts
  useEffect(() => {
    const fetchUserPosts = async () => {
      if (!user) return;

      setPostsLoading(true);
      try {
        const targetUserId = id ? parseInt(id) : user.id;
        const response = await ApiClient.get<UserPostsResponse, any>(
          `api/public/users/${targetUserId}/posts`,
          {},
          false, // No auth needed for public endpoint
          false
        );

        // Convert API posts to component Post format
        const convertedPosts: Post[] = response.posts.map(post => ({
          id: post.id,
          user: user.full_name, // Using current user's name for now
          type: (post.type.charAt(0).toUpperCase() + post.type.slice(1)) as
            | 'Need'
            | 'Offer'
            | 'Question',
          text: post.text,
          time: formatTimeAgo(post.created_at),
          created_at: new Date(post.created_at * 1000).toISOString(),
          location: user.region || user.country || 'Unknown',
        }));

        setUserPosts(convertedPosts);
      } catch (error) {
        console.error('Failed to fetch user posts:', error);
        setUserPosts([]);
      } finally {
        setPostsLoading(false);
      }
    };

    fetchUserPosts();
  }, [user, id]);

  const formatTimeAgo = (timestamp: number): string => {
    const now = Date.now() / 1000;
    const diff = now - timestamp;

    if (diff < 60) return 'Just now';
    if (diff < 3600) return `${Math.floor(diff / 60)} min ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)} hours ago`;
    return `${Math.floor(diff / 86400)} days ago`;
  };

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement user profile update API call
    console.log('Saving profile:', formData);
    handleCloseModal();
  };

  const handleAvatarClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file size (max 1MB)
    if (file.size > 1_000_000) {
      dispatch(setError('File size exceeds 1MB limit'));
      return;
    }

    // Validate file type
    const allowedTypes = [
      'image/png',
      'image/jpeg',
      'image/jpg',
      'image/gif',
      'image/webp',
    ];
    if (!allowedTypes.includes(file.type)) {
      dispatch(
        setError(
          'Invalid file type. Supported formats: PNG, JPG, JPEG, GIF, WebP'
        )
      );
      return;
    }

    setUploadingAvatar(true);

    try {
      const formData = new FormData();
      formData.append('file', file);

      await dispatch(uploadUserAvatar(file));
    } catch (error) {
      console.error('Avatar upload failed:', error);
      dispatch(setError('Failed to upload avatar. Please try again.'));
    } finally {
      setUploadingAvatar(false);
    }
  };

  if (authLoading || !user) {
    return (
      <div className={styles.page}>
        <AppHeader menuOpen={false} setMenuOpen={() => {}} />
        <main className={styles.profileSection}>
          <div className={styles.loading}>Loading...</div>
        </main>
      </div>
    );
  }

  const isOwnProfile = !id || parseInt(id) === user.id;

  return (
    <div className={styles.page}>
      <AppHeader menuOpen={false} setMenuOpen={() => {}} />
      <main className={styles.profileSection}>
        <div className={styles.profileHeader}>
          <div className={styles.profileHeaderWrapper}>
            <div className={styles.profileBackgroundAccent}></div>
            <div className={styles.profileHeaderContent}>
              <div className={styles.profileMainInfo}>
                <div
                  className={styles.avatar}
                  onClick={isOwnProfile ? handleAvatarClick : undefined}
                  style={{ cursor: isOwnProfile ? 'pointer' : 'default' }}
                >
                  {uploadingAvatar && (
                    <div className={styles.avatarLoading}>Uploading...</div>
                  )}
                  {user.avatar_url ? (
                    <img
                      src={user.avatar_url}
                      alt={`${user.full_name}'s avatar`}
                    />
                  ) : (
                    <span className={styles.avatarPlaceholder}>
                      {user.full_name.charAt(0).toUpperCase()}
                    </span>
                  )}
                  {isOwnProfile && (
                    <div className={styles.avatarOverlay}>
                      <span>Change Avatar</span>
                    </div>
                  )}
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  style={{ display: 'none' }}
                />
                <h1 className={styles.userName}>{user.full_name}</h1>
                <h3 className={styles.userSubName}>@usernamehere</h3>
                <p className={styles.profileDescription}>
                  This is a short profile description about the user. You can edit it
                  soon!
                </p>
                <p className={styles.userStats}>
                  Reputation: {user.reputation_score} •
                  {user.verified ? ' Verified' : ' Not verified'}
                </p>
                {uploadError && (
                  <div className={styles.errorMessage}>{uploadError}</div>
                )}
              </div>
              <div className={styles.profileDetailsContainer}>
                <div className={styles.changeActionWrapper}>
                  <div
                  className={styles.changeAction}
                  onClick={handleOpenModal}
                  role="button"
                  tabIndex={0}
                  aria-label="Edit profile"
                >
                  <RiEdit2Line className={styles.changeIcon} />
                </div></div>
                <ul className={styles.profileDetailsList}>
                  <li className={styles.profileDetailsItem}>
                    <span className={styles.profileDetailsIcon}>
                      <SlLocationPin />
                    </span>
                    <span>
                      {user.country && user.region
                        ? `${user.region}, ${user.country}`
                        : user.country || 'Location not set'}
                    </span>
                  </li>
                  <li className={styles.profileDetailsItem}>
                    <span className={styles.profileDetailsIcon}>
                      <HiOutlineLanguage />
                    </span>
                    <span>English, Ukrainian</span>
                  </li>
                  <li className={styles.profileDetailsItem}>
                    <span className={styles.profileDetailsIcon}>
                      <GoMail />
                    </span>
                    <span>jhonsona@gmail.com</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.profileContentWrapper}>
          <section className={styles.postsSection}>
            <ProfileSidebar />
          </section>
          <section className={styles.postsSection}>
            <div className={styles.postsHeader}>
              <h2 className={styles.postsTitle}>
                {isOwnProfile ? 'Recent Posts' : `${user.full_name}'s Posts`}
              </h2>
              <div className={styles.postsActions}>
                <button
                  className={styles.actionButton}
                  onClick={() => (window.location.href = '/asking-for-help')}
                >
                  Create Post
                  <FaPlus className={styles.icon} />
                </button>
                <button
                  className={styles.actionButton}
                  onClick={() => (window.location.href = '/asking-for-help')}
                >
                  All Posts
                  <FaArrowRight className={styles.icon} />
                </button>
              </div>
            </div>
            {postsLoading ? (
              <div className={styles.loading}>Loading posts...</div>
            ) : userPosts.length > 0 ? (
              <PostsList posts={userPosts} />
            ) : (
              <div className={styles.noPosts}>
                {isOwnProfile
                  ? "You haven't posted anything yet."
                  : 'No posts yet.'}
              </div>
            )}
          </section>
        </div>
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
                  Bio (Coming Soon)
                </label>
                <textarea
                  id="bio"
                  name="bio"
                  value={formData.bio}
                  onChange={handleInputChange}
                  className={styles.formTextArea}
                  rows={4}
                  disabled
                  placeholder="Bio field will be available soon"
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
