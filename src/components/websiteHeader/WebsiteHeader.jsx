"use client";
import React from "react";
import NavLink from "./NavLink";
import Link from "next/link";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { selectToken, setToken } from "@/redux/tokenSlice";
import { verifyAndDecodeToken } from "@/services/authService";
import { setUser, selectUser } from "@/redux/userSlice";
import { useDispatch } from "react-redux";

const WebsiteHeader = () => {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const token = useSelector(selectToken);

  //  if user is logged in, set isLoggedIn to true
  useEffect(() => {
    if (user.userId) {
      setIsLoggedIn(true);
    }
  }, [user]);

  // fetch token from cookie and set it in redux store
  useEffect(() => {
    const tokenFromCookie = Cookies.get("token");
    if (tokenFromCookie) {
      // console.log("token from cookie = ", tokenFromCookie);
      dispatch(setToken(tokenFromCookie));
    }
  }, [dispatch]);

  // verify token and set user details in state
  useEffect(() => {
    if (token) {
      verifyAndDecodeToken(token).then((decodeToken) => {
        if (decodeToken === "unauthorized") {
          alert("Unauthorized access!");
          dispatch(setToken(null));
          Cookies.remove("token");
        }

        if (decodeToken === "error") {
          alert("An error occurred!");
        }

        // set user details in redux store
        dispatch(
          setUser({
            userId: decodeToken.userId,
            email: decodeToken.email,
            firstName: decodeToken.firstName,
            lastName: decodeToken.lastName,
            userType: decodeToken.userType,
          })
        );
      });
    }
  }, [token]);

  const [isLoggedIn, setIsLoggedIn] = useState(false);

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
