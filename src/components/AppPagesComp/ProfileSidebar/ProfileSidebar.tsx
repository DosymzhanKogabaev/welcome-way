import React from 'react';
import styles from './ProfileSidebar.module.css';
import { LuUsers } from "react-icons/lu";
import { IoPersonCircleOutline, IoSettingsOutline } from "react-icons/io5";
import { AiOutlineQuestionCircle } from "react-icons/ai";
import { VscHistory } from "react-icons/vsc"
import { PiSignOutBold } from "react-icons/pi";
import { MdOutlineGroups } from "react-icons/md";

interface SidebarItem {
  label: string;
  icon: React.ReactNode;
  onClick?: () => void;
}

export const ProfileSidebar: React.FC = () => {
  const sidebarItems: SidebarItem[] = [
    { label: 'Profile', icon: <IoPersonCircleOutline /> },
    { label: 'Friends', icon: <LuUsers /> },
    { label: 'Groups', icon: <MdOutlineGroups /> },
    { label: 'History', icon: <VscHistory /> },
    { label: 'Settings', icon: <IoSettingsOutline /> },
    { label: 'Help', icon: <AiOutlineQuestionCircle /> },
    {
      label: 'Sign Out',
      icon: <PiSignOutBold />,
      onClick: () => {
        console.log('Signing out...');
      },
    },
  ];

  return (
    <aside className={styles.sidebar}>
      <ul className={styles.sidebarList}>
        {sidebarItems.map(item => (
          <li
            key={item.label}
            className={styles.sidebarItem}
            onClick={item.onClick}
            style={{ cursor: item.onClick ? 'pointer' : 'default' }}
          >
            <span className={styles.icon}>{item.icon}</span>
            <span className={styles.label}>{item.label}</span>
          </li>
        ))}
      </ul>
    </aside>
  );
};
