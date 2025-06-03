"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Factory,
  Package,
  LineChart,
  Settings,
  Users,
} from "lucide-react";

const navigation = [
  { name: "대시보드", href: "/", icon: LayoutDashboard },
  { name: "생산관리", href: "/production", icon: Factory },
  { name: "자재관리", href: "/materials", icon: Package },
  { name: "품질관리", href: "/quality", icon: LineChart },
  { name: "설비관리", href: "/equipment", icon: Settings },
  { name: "사용자관리", href: "/users", icon: Users },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="flex w-64 flex-col border-r bg-background">
      <div className="flex h-16 items-center border-b px-4">
        <h1 className="text-lg font-semibold">Smart Factory MES</h1>
      </div>
      <nav className="flex-1 space-y-1 p-4">
        {navigation.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "hover:bg-muted"
              )}
            >
              <item.icon className="h-4 w-4" />
              {item.name}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
