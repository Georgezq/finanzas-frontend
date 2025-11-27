import type React from "react";
import { Sidebar } from "@/components/layout/sidebar";
import { MobileNav } from "@/components/layout/mobile-nav";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-screen flex overflow-hidden">
      <aside className="hidden md:flex w-64 shrink-0">
        <Sidebar />
      </aside>
      <main className="flex-1 overflow-y-auto pb-16 md:pb-0">
        <div className="container max-w-7xl mx-auto p-6">{children}</div>
      </main>
      <MobileNav />
    </div>
  );
}
