'use client';

import React from "react";
import { LucideIcon } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

interface SidebarItemProps {
  label: string;
  path: string;
  icon: LucideIcon;
}
const SidebarItem = ({ label, icon: Icon, path }: SidebarItemProps) => {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <Icon/>
  );
};

export default SidebarItem;
