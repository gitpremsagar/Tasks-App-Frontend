"use client";
import React, { useState } from "react";
import Button from "../ui/Button";
import InputField from "../ui/InputField";
import axios from "axios";
import { USERS_ENDPOINT } from "@/configs/constants";
import ValidationErrorMsg from "../signup/ValidationErrorMsg";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { setToken } from "@/redux/tokenSlice";
import { useRouter } from "next/navigation";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoginError, setIsLoginError] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoginError(false);

    if (email === "" || password === "") {
      alert("Email and password are required");
      return;
    }

    try {
      const response = await axios.post(`${USERS_ENDPOINT}/login`, {
        email,
        password,
      });

      console.log("Login response:", response.data);

      // Save token to cookies
      Cookies.set("token", response.data.token, { expires: 1 }); //cookie will be deleted after 1 day

      // Save token to Redux store
      dispatch(setToken(response.data.token));

      // redirect to dashboard
      router.push("/dashboard");
    } catch (error) {
      console.error("Login error:", error);
      if (error.response.status === 401) {
        setIsLoginError(true);
      } else {
        alert("An error occurred. Please try again later.");
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-80 border border-gray-500 shadow-lg rounded-lg mx-auto p-8"
    >
      {isLoginError && (
        <ValidationErrorMsg message="Invalid email or password" />
      )}
      <InputField
        label="Email"
        type="email"
        value={email}
        onChange={handleEmailChange}
      />

      <InputField
        label="Password"
        type="password"
        value={password}
        onChange={handlePasswordChange}
      />

      <Button type="submit">Login</Button>
    </form>
  );
};

export default LoginForm;
