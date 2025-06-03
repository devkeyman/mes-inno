"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export function TopBar() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="flex h-16 items-center justify-between border-b px-4">
      <div className="flex items-center gap-4">
        <h2 className="text-lg font-semibold">Smart Factory MES</h2>
      </div>
      <div className="flex items-center gap-4">
        <button
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="rounded-lg p-2 hover:bg-muted"
        >
          {theme === "dark" ? (
            <Sun className="h-5 w-5" />
          ) : (
            <Moon className="h-5 w-5" />
          )}
        </button>
      </div>
    </div>
  );
}
