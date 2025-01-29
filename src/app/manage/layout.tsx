// app/care-provider/layout.tsx
"use client";
import { JSX, ReactNode } from 'react';

import MiniDrawer from '@/app/components/MainLayout';
import { useRouter } from 'next/navigation';
import LoopIcon from "@mui/icons-material/Loop";
import PeopleIcon from '@mui/icons-material/People';
import ExploreIcon from '@mui/icons-material/Explore';
import ReceiptIcon from '@mui/icons-material/Receipt';
import SettingsIcon from '@mui/icons-material/Settings';

export interface MenuItem {
  text: string;
  icon: JSX.Element;
  link: string;
}

const menuItems: MenuItem[] = [
  { text: "Dashboard", icon: <ExploreIcon />, link: "/manage" },
  { text: "Invoices", icon: <ReceiptIcon />, link: "/manage/invoices" },
  { text: "Vendors", icon: <PeopleIcon />, link: "/manage/vendors" },
  { text: "Setting", icon: <SettingsIcon />, link: "/manage/setting" },
];

const CareProviderLayout = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const handleMenuItemClick = (link: string) => {
    router.push(link);
  };

  return (
    <MiniDrawer
      menuItems={menuItems}
      content={children}
      onMenuItemClick={handleMenuItemClick}
      padding={0}
    />
  );
};

export default CareProviderLayout;
