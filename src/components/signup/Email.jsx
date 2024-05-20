import React from "react";
import InputField from "../ui/InputField";
import ValidationErrorMsg from "./ValidationErrorMsg";

export default function Email({
  signUpFormData,
  setSignUpFormData,
  validationErrors,
}) {
  const handleEmailChange = (e) => {
    console.log("Email changed");
    setSignUpFormData((prev) => ({
      ...prev,
      email: e.target.value,
    }));
  };

  return (
    <div>
      {validationErrors.email && (
        <ValidationErrorMsg message={validationErrors.email} />
      )}
      <InputField
        label="Email"
        placeholder="Enter your email"
        onChange={handleEmailChange}
        value={signUpFormData.email}
      />
    </div>
  );
}
