"use client";

import { BarChart, Compass, Layout, List, LucideIcon } from "lucide-react";
import SidebarItem from "./SidebarItem";
import { usePathname } from "next/navigation";

interface RouteType {
  label: string;
  path: string;
  icon: LucideIcon;
}

const guestRoutes: RouteType[] = [
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

const teacherRoutes: RouteType[] = [
  {
    icon: List,
    label: "Courses",
    path: "/teacher/courses",
  },
  {
    icon: BarChart,
    label: "Analytics",
    path: "/teacher/analytics",
  },
];

function SidebarRoutes() {

  const pathname= usePathname();

  const isTeacher = pathname.includes("/teacher");

  const routes = isTeacher ? teacherRoutes : guestRoutes;

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
