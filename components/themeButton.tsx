"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export default function ThemeButton() {
  const { theme, setTheme } = useTheme()

  return (
    <button
      onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
    >
      {theme === "light" ?
        (
          <Moon size={32} />
        ) : (
          <Sun size={32} />
        )
      }
    </button>
  )
}
