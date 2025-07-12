import React from 'react';
import styles from './SortingPanel.module.css';

interface SortingPanelProps {
  sort: string;
  setSort: (sort: string) => void;
  search: string;
  setSearch: (search: string) => void;
}

export const SortingPanel: React.FC<SortingPanelProps> = ({
  sort,
  setSort,
  search,
  setSearch,
}) => {
  return (
    <div className={styles.sortingBar}>
      <div className={styles.sortGroup}>
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
          <option value="location">Location</option>
        </select>
      </div>
      <input
        type="text"
        placeholder="Search posts..."
        value={search}
        onChange={e => setSearch(e.target.value)}
        className={styles.searchInput}
        aria-label="Search posts"
      />
    </div>
  );
};
