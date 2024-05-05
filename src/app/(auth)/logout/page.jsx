"use client";
import Cookies from "js-cookie";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const LogoutPage = () => {
  // remove token from cookie
  useEffect(() => {
    Cookies.remove("token");
    // redirect to home page with hard reload
    window.location.href = "/";
  }, []);

  return (
    <div className="p-20 min-h-screen">
      <h1 className="font-bold text-3xl text-center">Logging out...</h1>
    </div>
  );
};

export default LogoutPage;
