import React from "react";
import InputField from "../ui/InputField";
import ValidationErrorMsg from "./ValidationErrorMsg";

export default function Password({ setSignUpFormData, validationErrors }) {
  const handlePasswordChange = (e) => {
    setSignUpFormData((prev) => ({
      ...prev,
      password: e.target.value,
    }));
  };

  return (
    <div>
      {validationErrors.password && (
        <ValidationErrorMsg message={validationErrors.password} />
      )}
      <InputField
        label="New Password"
        placeholder="Enter new password"
        onChange={handlePasswordChange}
        type={"password"}
      />
    </div>
  );
}
