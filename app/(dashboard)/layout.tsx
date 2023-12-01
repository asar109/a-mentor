import React from "react";
import Sidebar from "./_components/Sidebar";
import Navbar from "./_components/Navbar";

function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-full">
    <div className=" w-full md:pl-56 h-[80px]  fixed inset-y-0 z-50">
        <Navbar/>

    </div>
      <div className="hidden md:flex w-56 fixed z-50 flex-col inset-0 ">
        <Sidebar />
      </div>
      <main className="md:pl-56 ">{children}</main>
    </div>
  );
}

export default layout;
