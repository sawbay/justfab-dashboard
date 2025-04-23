import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NavItem } from "@/types";

const navItems: NavItem[] = [
  { label: "Home", path: "/" },
  { label: "Collection", path: "/collection" },
  { label: "Store", path: "/store" },
  { label: "Earning", path: "/earning" },
  { label: "Lottery", path: "/lottery" },
  { label: "Prediction", path: "/prediction" },
];

const Sidebar = () => {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-orange-400 text-white"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          {isMobileMenuOpen ? (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          ) : (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          )}
        </svg>
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-40 h-screen transition-transform bg-white/90 backdrop-blur-sm border-r
          lg:translate-x-0 lg:w-64
          ${isMobileMenuOpen ? "w-64 translate-x-0" : "-translate-x-full"}
        `}
      >
        <div className="flex flex-col h-full px-4 py-8">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-orange-400">JustFAB</h1>
          </div>

          <nav className="flex-1">
            <ul className="space-y-2">
              {navItems.map((item) => (
                <li key={item.path}>
                  <Link
                    href={item.path}
                    className={`flex items-center px-4 py-2 rounded-lg transition-colors
                      ${
                        pathname === item.path
                          ? "bg-orange-100 text-orange-500"
                          : "text-gray-700 hover:bg-orange-50"
                      }
                    `}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="mt-auto">
            <div className="p-4 rounded-lg bg-orange-50">
              <p className="text-sm text-gray-600">Connected Wallet</p>
              <p className="text-orange-500 font-medium truncate">
                0x1234...5678
              </p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
