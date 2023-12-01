"use client";

import React from "react";
import { LucideIcon } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

interface SidebarItemProps {
  label: string;
  path: string;
  icon: LucideIcon;
}

const SidebarItem = ({ label, icon: Icon, path }: SidebarItemProps) => {
  const router = useRouter();
  const pathname = usePathname();

  const isActive =
    (pathname === "/" && path === "/") ||
    pathname === path ||
    pathname?.startsWith(`${path}/`);

  const onclickHandler = () => {
    router.push(path);
  };

  return (
    <button
      onClick={onclickHandler}
      className={cn(
        "flex item-center  pl-6 gap-x-2 text-sm font-[500] cursor-pointer hover:bg-slate-300/20 hover:text-slate-600  transition-all w-full h-12",
        isActive
          ? "bg-sky-200/20 text-sky-400 "
          : "bg-slate-100/20 text-slate-600 "
      )}
    >
      <div className="flex items-center gap-x-2 py-4">
        <Icon
          size={22}
          className={cn("text-slate-500", isActive && "text-sky-700")}
        />
        {label}
      </div>
      <div
        className={cn(
          "border-2 ml-auto transition-all opacity-0 h-full border-sky-700",
          isActive && "opacity-100"
        )}
      />
    </button>
  );
};

export default SidebarItem;
