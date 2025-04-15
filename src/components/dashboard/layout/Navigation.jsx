"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const Navigation = ({ closeMenu }) => {
  const pathname = usePathname();
  const NAVIGATION_ITEMS = [
    {
      url: "/tasks",
      title: "Tasks",
      key: "tasks",
    },
  ];
  return (
    <nav className="grid items-start text-sm font-medium gap-y-1">
      {NAVIGATION_ITEMS.map((item, index) => {
        const isSelected = item.url === pathname;
        return (
          <div
            key={index}
            className={`border-l-4 border-transparent ${isSelected
              ? "border-white"
              : "hover:border-link hover:bg-[#2C3338]"
              }`}
          >
            <Link
              href={item.url}
              className={`flex items-center text-sm gap-3 px-2 py-4 md:py-2 transition-all ${isSelected ? " bg-link text-white" : "text-white font-normal "
                }`}
              onClick={closeMenu}
            >
              {item.icon}
              {item.title}
            </Link>
          </div>
        );
      })}
    </nav>
  );
};

export default Navigation;
