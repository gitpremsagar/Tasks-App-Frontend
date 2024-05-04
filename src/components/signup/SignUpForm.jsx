"use client";
import React, { useEffect, useState } from "react";
import Email from "./Email";
import FirstName from "./FirstName";
import LastName from "./LastName";
import Password from "./Password";
import ConfirmPassword from "./ConfirmPassword";
import UserType from "./UserType";
import Button from "../ui/Button";

const SignUpForm = () => {
  const [signUpFormData, setSignUpFormData] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    confirmPassword: "",
    userType: "",
  });

  const [validationErrors, setValidationErrors] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    confirmPassword: "",
    userType: "",
  });

  const validateSignUpFormData = () => {
    const errors = {
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      confirmPassword: "",
      userType: "",
    };

    if (!signUpFormData.email) {
      errors.email = "Email is required";
    }

    if (!signUpFormData.password) {
      errors.password = "Password is required";
    }

    if (signUpFormData.password.length < 6) {
      errors.password = "Password must be at least 6 characters long";
    }

    if (!signUpFormData.firstName) {
      errors.firstName = "First Name is required";
    }

    if (!signUpFormData.lastName) {
      errors.lastName = "Last Name is required";
    }

    if (!signUpFormData.confirmPassword) {
      errors.confirmPassword = "Confirm Password is required";
    }

    if (!signUpFormData.userType) {
      errors.userType = "User Type is required";
    }

    if (signUpFormData.password !== signUpFormData.confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
    }

    setValidationErrors(errors);

    const isValid = Object.values(errors).every((error) => error === "");

    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateSignUpFormData()) {
      console.log("Validation failed");
      return;
    }

    setIsPosting(true);
    setTimeout(() => {
      console.log(signUpFormData);
      setIsPosting(false);
    }, 5000);
  };

  useEffect(() => {
    console.log(signUpFormData);
  }, [signUpFormData]);

  const [isPosting, setIsPosting] = useState(false);
  const [error, setError] = useState("");

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-80 border border-gray-500 shadow-lg rounded-lg mx-auto p-8"
    >
      <Email
        setSignUpFormData={setSignUpFormData}
        validationErrors={validationErrors}
      />
      <FirstName
        setSignUpFormData={setSignUpFormData}
        validationErrors={validationErrors}
      />
      <LastName
        setSignUpFormData={setSignUpFormData}
        validationErrors={validationErrors}
      />
      <Password
        setSignUpFormData={setSignUpFormData}
        validationErrors={validationErrors}
      />
      <ConfirmPassword
        setSignUpFormData={setSignUpFormData}
        validationErrors={validationErrors}
      />
      <UserType
        setSignUpFormData={setSignUpFormData}
        validationErrors={validationErrors}
      />
      <br />
      <Button type="submit" disabled={isPosting}>
        Sign Up
      </Button>
    </form>
  );
};

export default SignUpForm;
