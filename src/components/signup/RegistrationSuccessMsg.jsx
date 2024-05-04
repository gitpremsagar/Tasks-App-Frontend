import Link from "next/link";
import React from "react";
import Button from "../ui/Button";

export default function RegistrationSuccessMsg() {
  return (
    <div className="max-w-72 mx-auto border border-green-500 rounded-lg shadow-lg p-10">
      <h2 className="text-3xl font-bold text-center mb-10">
        Registration Successful!
      </h2>
      <Link href="/login">
        <Button>Go to Login</Button>
      </Link>
    </div>
  );
}
