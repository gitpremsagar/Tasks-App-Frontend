"use client";
import RegistrationSuccessMsg from "@/components/signup/RegistrationSuccessMsg";
import SignUpForm from "@/components/signup/SignUpForm";
import { useEffect, useState } from "react";

export default function Home() {
  const [isRegistered, setIsRegistered] = useState(false);

  return (
    <main className="p-20 min-h-screen">
      <h2 className="text-3xl font-bold text-center mb-10">Sign Up</h2>
      {isRegistered ? (
        <RegistrationSuccessMsg />
      ) : (
        <SignUpForm setIsRegistered={setIsRegistered} />
      )}
    </main>
  );
}
