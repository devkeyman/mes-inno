"use client";

import { Sidebar } from "./sidebar";
import { TopBar } from "./top-bar";

interface MainLayoutProps {
  children: React.ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex flex-1 flex-col">
        <TopBar />
        <div className="flex-1 overflow-auto">{children}</div>
      </div>
    </div>
  );
}
