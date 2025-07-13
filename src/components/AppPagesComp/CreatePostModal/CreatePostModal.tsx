// src/components/AppPagesComp/CreatePostModal/CreatePostModal.tsx

import React, { useState } from 'react';
import styles from './CreatePostModal.module.css';
import { PostCreatePayload } from '../PostsList/types';

interface CreatePostModalProps {
  onClose: () => void;
  onSave: (post: PostCreatePayload) => void;
}

export const CreatePostModal: React.FC<CreatePostModalProps> = ({
  onClose,
  onSave,
}) => {
  const [formData, setFormData] = useState<PostCreatePayload>({
    type: 'need',
    text: '',
    location: 'Berlin',
  });

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLSelectElement | HTMLTextAreaElement | HTMLInputElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.text.trim() || !formData.location.trim()) return;
    onSave(formData);
  };

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div
        className={styles.modal}
        role="dialog"
        aria-labelledby="create-post-title"
        aria-modal="true"
        onClick={e => e.stopPropagation()}
      >
        <h2 id="create-post-title" className={styles.modalTitle}>
          Create Post
        </h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="type" className={styles.formLabel}>
            Post Type
          </label>
          <select
            id="type"
            name="type"
            value={formData.type}
            onChange={handleInputChange}
            className={styles.formSelect}
          >
            <option value="need">Need</option>
            <option value="offer">Offer</option>
            <option value="question">Question</option>
          </select>
          <label htmlFor="location" className={styles.formLabel}>
            Location
          </label>
          <input
            id="location"
            name="location"
            type="text"
            value={formData.location}
            onChange={handleInputChange}
            className={styles.formSelect}
            required
          />
          <label htmlFor="text" className={styles.formLabel}>
            Description
          </label>
          <textarea
            id="text"
            name="text"
            value={formData.text}
            onChange={handleInputChange}
            className={styles.formTextArea}
            rows={4}
            required
          />
          <div className={styles.modalActions}>
            <button
              type="button"
              className={styles.cancelBtn}
              onClick={onClose}
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
  );
};
