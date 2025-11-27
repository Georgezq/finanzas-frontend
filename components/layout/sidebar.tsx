"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { LayoutDashboard, Receipt, Tag, LogOut, Wallet } from "lucide-react";
import { APP_CONFIG } from "@/lib/config";

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Transacciones", href: "/transactions", icon: Receipt },
  { name: "Categorías", href: "/categories", icon: Tag },
];

export function Sidebar() {
  const pathname = usePathname();

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    cookieStore.delete("authToken");
    globalThis.location.href = "/login";
  };

  return (
    <div className="flex flex-col h-full bg-card border-r border-border">
      <div className="p-6 border-b border-border">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <Wallet className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="font-bold text-lg">{APP_CONFIG.name}</span>
        </div>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        {navigation.map((item) => {
          const isDashboard = pathname === "/dashboard";
          const route = isDashboard ? item.href : "/dashboard" + item.href;
          const isActive = pathname === route;
          return (
            <Link
              key={item.name}
              href={
                item.name === "Dashboard" ? item.href : "/dashboard" + item.href
              }
            >
              <Button
                variant={isActive ? "secondary" : "ghost"}
                className={cn(
                  "w-full justify-start gap-3 my-1",
                  isActive &&
                    "bg-primary text-primary-foreground hover:bg-primary/90"
                )}
              >
                <item.icon className="w-5 h-5" />
                {item.name}
              </Button>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-border">
        <Button
          variant="ghost"
          className="w-full justify-start gap-3 text-destructive hover:text-destructive hover:bg-destructive/10"
          onClick={handleLogout}
        >
          <LogOut className="w-5 h-5" />
          Cerrar sesión
        </Button>
      </div>
    </div>
  );
}
