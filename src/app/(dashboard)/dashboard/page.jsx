"use client";
import { useSelector } from "react-redux";
import { selectToken } from "@/redux/tokenSlice";

const Dashboard = () => {
  const token = useSelector(selectToken);
  console.log("token from Redux store = ", token);
  return (
    <>
      <h2 className="text-3xl font-bold text-center m-10 ">
        Welcome to Task Manager Dashboard!
      </h2>
    </>
  );
};

export default Dashboard;
