"use client";
import { useSelector, useDispatch } from "react-redux";
import { selectToken, setToken } from "@/redux/tokenSlice";

import Cookies from "js-cookie";
import { useEffect } from "react";

export default function Home() {
  const dispatch = useDispatch();
  const token = useSelector(selectToken);

  useEffect(() => {
    const tokenFromCookie = Cookies.get("token");
    if (tokenFromCookie) {
      // console.log("token from cookie = ", tokenFromCookie);
      dispatch(setToken(tokenFromCookie));
    }
  }, [dispatch]);

  // useEffect(() => {
  //   console.log("token from Redux store = ", token);
  // }, [token]);

  return (
    <main className="min-h-screen">
      <h2 className="text-3xl font-bold text-center m-10 ">
        Welcome to Task Manager!
      </h2>
    </main>
  );
}
