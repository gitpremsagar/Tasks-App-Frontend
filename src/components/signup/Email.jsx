import React from "react";
import InputField from "../ui/InputField";
import ValidationErrorMsg from "./ValidationErrorMsg";

export default function Email({ setSignUpFormData, validationErrors }) {
  const handleEmailChange = (e) => {
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
      />
    </div>
  );
}
