import React from 'react';
import './RoadmapPage.module.css';
import '../../index.css';
import { AppHeader } from '@/src/components/AppPagesComp/AppHeader/AppHeader';

export const RoadMapPage: React.FC = () => {
  const [menuOpen, setMenuOpen] = React.useState(false);
  return (
    <div className="">
      <AppHeader menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <main></main>
    </div>
  );
};
