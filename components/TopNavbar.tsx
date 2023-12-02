"use client";
import { UserButton } from "@clerk/nextjs";
import React from "react";
import { usePathname, useRouter } from "next/navigation";
import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

function TopNavbar() {
  const pathname = usePathname();
  const router = useRouter();

  const isTeacherPage = pathname?.startsWith("/teacher");
  const isPlayerPage = pathname?.startsWith("/chapter");

  return (
    <div className="flex gap-x-2 ml-auto">
      {isPlayerPage || isTeacherPage ? (
        <>
          <Link href="/">
            <Button variant="ghost" size="sm">
              <LogOut className="text-slate-600 mr-1" size={24} />
              Exit
            </Button>
          </Link>
        </>
      ) : (
        <>
          <Link href="/teacher/courses">
            <Button variant="ghost" size="sm">
              Teacher Mode
            </Button>
          </Link>
        </>
      )}

      <UserButton afterSignOutUrl="/" />
    </div>
  );
}

export default TopNavbar;
