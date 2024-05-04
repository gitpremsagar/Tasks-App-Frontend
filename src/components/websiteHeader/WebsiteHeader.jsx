import React from "react";
import NavLink from "./NavLink";
import Link from "next/link";

const WebsiteHeader = () => {
  return (
    <header>
      <nav className="bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex-shrink-0">
              <Link href="/">
                <h1 className="text-white font-bold">Task Manager</h1>
              </Link>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <NavLink href="/login">Login</NavLink>
                <NavLink href="/signup">Sign Up</NavLink>
                <NavLink href="/dashboard">Dashboard</NavLink>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default WebsiteHeader;
