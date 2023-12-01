"use client";

import { Compass, Layout, LucideIcon } from "lucide-react";
import SidebarItem from "./SidebarItem";

interface GuestRouteType {
  label: string;
  path: string;
  icon: LucideIcon;
}

const guestRoutes: GuestRouteType[] = [
  {
    label: "Home",
    path: "/",
    icon: Layout,
  },
  {
    label: "Browse",
    path: "/search",
    icon: Compass,
  },
];

function SidebarRoutes() {
  const routes = guestRoutes;

  return (
    <div className="flex flex-col h-full">
      {routes.map((route) => {
        return (
          <SidebarItem
            key={route.path}
            icon={route.icon}
            label={route.label}
            path={route.path}
          />
        );
      })}
    </div>
  );
}

export default SidebarRoutes;
