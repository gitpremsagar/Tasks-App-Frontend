"use client";
import React from "react";
import NavLink from "./NavLink";
import Link from "next/link";
import { useSelector } from "react-redux";
import { selectUser } from "@/redux/userSlice";
import { useState, useEffect } from "react";

const WebsiteHeader = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const user = useSelector(selectUser);

  //  if user is logged in, set isLoggedIn to true
  useEffect(() => {
    if (user.userId) {
      setIsLoggedIn(true);
    }
  }, [user]);

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
                {isLoggedIn ? (
                  <>
                    <span className="text-gray-300  py-2 rounded-md text-sm font-medium cursor-default">{`Welcome ${user.firstName}`}</span>
                    <NavLink href="/logout" className="text-white">
                      Logout
                    </NavLink>
                  </>
                ) : (
                  <NavLink href="/login" className="text-white">
                    Login
                  </NavLink>
                )}
                {isLoggedIn ? null : (
                  <NavLink href="/signup" className="text-white">
                    Sign Up
                  </NavLink>
                )}
                {/* <NavLink href="/dashboard">Dashboard</NavLink> */}
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default WebsiteHeader;
