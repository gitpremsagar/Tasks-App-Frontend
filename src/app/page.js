"use client";
import { useSelector, useDispatch } from "react-redux";
import { selectToken, setToken } from "@/redux/tokenSlice";
import { verifyAndDecodeToken } from "@/services/authService";
import { setUser, selectUser } from "@/redux/userSlice";
import Link from "next/link";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import Button from "@/components/ui/Button";
import ProjectsSection from "@/components/homepage/projects/ProjectsSection";
import TasksSection from "@/components/homepage/tasks/TasksSction";

export default function Home() {
  const dispatch = useDispatch();
  const token = useSelector(selectToken);

  const [isLoadingUserDetails, setIsLoadingUserDetails] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const user = useSelector(selectUser);

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
    } else {
      // dispatch(setToken(null));
      setIsLoadingUserDetails(false);
    }
  }, [dispatch]);

  // verify token and set user details in state
  useEffect(() => {
    if (token) {
      setIsLoadingUserDetails(true);
      verifyAndDecodeToken(token).then((decodeToken) => {
        if (decodeToken === "unauthorized") {
          alert("Unauthorized access!");
          dispatch(setToken(null));
          Cookies.remove("token");
        }

        if (decodeToken === "error") {
          alert("An error occurred!");
        }

        setIsLoadingUserDetails(false);

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

  return (
    <main className="min-h-screen">
      {isLoadingUserDetails ? (
        <div className="text-center mt-10 font-bold text-3xl">Loading...</div>
      ) : isLoggedIn ? (
        <div className="m-10">
          <ProjectsSection />
          <TasksSection />
        </div>
      ) : (
        <div className="text-center mt-10">
          <h1 className="text-3xl font-bold">Welcome to Task Manager</h1>
          <p className="mt-5">Please login to continue</p>
          <Link href={"/login"}>
            <div className="m-10">
              <Button>Login</Button>
            </div>
          </Link>
        </div>
      )}
    </main>
  );
}
