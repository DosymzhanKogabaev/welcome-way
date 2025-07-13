import React from 'react';
import styles from './ProfileSidebar.module.css';
import { LuUsers } from "react-icons/lu";
import { IoPersonCircleOutline, IoSettingsOutline } from "react-icons/io5";
import { AiOutlineQuestionCircle } from "react-icons/ai";
import { VscHistory } from "react-icons/vsc"
import { PiSignOutBold } from "react-icons/pi";
import { MdOutlineGroups } from "react-icons/md";
import { logout } from '../../../redux/slices/auth/authSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

interface SidebarItem {
  label: string;
  icon: React.ReactNode;
  onClick?: () => void;
}

export const ProfileSidebar: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
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
      onClick: async () => {
        await dispatch(logout());
        navigate('/signin');
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
