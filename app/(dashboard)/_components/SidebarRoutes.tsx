'use client';

import React from "react";
import { Layout, Compass, LucideIcon } from "lucide-react";




const guestRoutes = [
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
    <div className="flex mt-4 flex-col h-full">
      {routes.map((route) => {
        return (
          <div key={route.path}>
            <h1>Hello</h1>

          </div>
        );
      })}
    </div>
  );
}

export default SidebarRoutes;
