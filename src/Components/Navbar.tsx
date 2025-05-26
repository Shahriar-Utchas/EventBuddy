"use client";

import React, { useState } from "react";
import Link from "next/link";
import { LogOut, Menu, X } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useUser } from "@/app/context/userContext";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, setUser } = useUser();
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    setIsMenuOpen(false);
    router.push("/");
  };

  const dashboardLink =
    user?.role === "admin" ? "/admin_dashboard" : "/user_dashboard";

  const hideAuthButtons = pathname === "/signin" || pathname === "/signup";

  return (
    <nav className="bg-white shadow-sm px-6 py-4">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        <Link href="/">
          <div className="flex items-center gap-2 cursor-pointer">
            <img src="/images/logo.png" alt="logo" className="w-8 h-8 sm:w-10 sm:h-10 object-contain" />
            <span className="text-xl sm:text-2xl font-semibold text-gray-800 whitespace-nowrap">
              Event buddy.
            </span>
          </div>
        </Link>

        <div className="hidden md:flex items-center gap-4">
          {user ? (
            <>
              <Link href={dashboardLink}>
                <span className="text-gray-800 font-medium underline hover:text-violet-700 transition">
                  Welcome, {user.name}
                </span>
              </Link>
              <button
                onClick={handleLogout}
                className="flex items-center gap-1 px-3 py-1.5 text-white font-medium rounded-md bg-red-500 hover:bg-red-600 transition"
              >
                <LogOut size={16} />
                Logout
              </button>
            </>
          ) : (
            !hideAuthButtons && (
              <>
                <Link href="/signin">
                  <button className="px-4 py-2 text-white font-semibold rounded-md bg-gradient-to-b from-purple-400 via-indigo-500 to-indigo-500 shadow-md hover:brightness-110">
                    Sign in
                  </button>
                </Link>
                <Link href="/signup">
                  <button className="px-4 py-2 text-white font-semibold rounded-md bg-gradient-to-b from-purple-400 via-indigo-500 to-indigo-500 shadow-md hover:brightness-110">
                    Sign up
                  </button>
                </Link>
              </>
            )
          )}
        </div>

        <button
          className="md:hidden p-2 rounded-md text-gray-700 hover:bg-gray-200 transition"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {isMenuOpen && (
        <div className="md:hidden mt-4 flex flex-col gap-3 px-2">
          {user ? (
            <>
              <Link href={dashboardLink} onClick={() => setIsMenuOpen(false)}>
                <span className="text-gray-800 font-medium underline hover:text-violet-700 transition px-4">
                  Welcome, {user.name}
                </span>
              </Link>
              <button
                onClick={handleLogout}
                className="w-full flex items-center justify-center gap-1 px-4 py-2 text-white font-semibold rounded-md bg-red-500 hover:bg-red-600 transition"
              >
                <LogOut size={16} />
                Logout
              </button>
            </>
          ) : (
            !hideAuthButtons && (
              <>
                <Link href="/signin" onClick={() => setIsMenuOpen(false)}>
                  <button className="w-full px-4 py-2 text-white font-semibold rounded-md bg-gradient-to-b from-purple-400 via-indigo-500 to-indigo-500 shadow-md hover:brightness-110">
                    Sign in
                  </button>
                </Link>
                <Link href="/signup" onClick={() => setIsMenuOpen(false)}>
                  <button className="w-full px-4 py-2 text-white font-semibold rounded-md bg-gradient-to-b from-purple-400 via-indigo-500 to-indigo-500 shadow-md hover:brightness-110">
                    Sign up
                  </button>
                </Link>
              </>
            )
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
