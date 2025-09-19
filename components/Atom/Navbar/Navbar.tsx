/**
 * Atom Navbar
 *
 * Small bottom navigation bar used on mobile layouts.
 *
 * @author JX
 */
"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Icon28UserCircleOutline,
  Icon28CalendarOutline,
  Icon28BookOutline,
} from "@vkontakte/icons";

const navItems = [
  {
    label: "Diary",
    href: "/diary",
    icon: <Icon28BookOutline height={28} width={28} />,
  },
  {
    label: "Calendar",
    href: "/calendar",
    icon: <Icon28CalendarOutline height={28} width={28} />,
  },
  {
    label: "Profile",
    href: "/profile",
    icon: <Icon28UserCircleOutline height={28} width={28} />,
  },
];

export const Navbar = () => {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white dark:bg-black border-t border-default-200 flex justify-around items-center h-16 shadow-lg">
      {navItems.map((item) => {
        const isActive = pathname === item.href;

        return (
          <Link
            key={item.href}
            className={`flex flex-col items-center gap-1 text-xs transition-colors duration-200 ${
              isActive ? "text-primary" : "text-default-500 hover:text-primary"
            }`}
            href={item.href}
          >
            {item.icon}
            <span>{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
};
