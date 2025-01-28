// app/care-provider/layout.tsx
"use client";
import { JSX, ReactNode } from 'react';

import MiniDrawer from '@/app/components/MainLayout';
import { useRouter } from 'next/navigation';
import LoopIcon from "@mui/icons-material/Loop";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import ViewListIcon from "@mui/icons-material/ViewList";

export interface MenuItem {
  text: string;
  icon: JSX.Element;
  link: string;
}

const menuItems: MenuItem[] = [
  { text: "All Orders", icon: <ViewListIcon />, link: "/manage/setting" },
  { text: "Current Orders", icon: <LocalMallIcon />, link: "/manage/invoices" },
  { text: "Inventory", icon: <LoopIcon />, link: "/manage/vendors" },
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
