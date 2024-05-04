import React from "react";
import InputField from "../ui/InputField";
import ValidationErrorMsg from "./ValidationErrorMsg";

export default function ConfirmPassword({
  setSignUpFormData,
  validationErrors,
}) {
  const handleConfirmPasswordChange = (e) => {
    setSignUpFormData((prev) => ({
      ...prev,
      confirmPassword: e.target.value,
    }));
  };

  return (
    <div>
      {validationErrors.confirmPassword && (
        <ValidationErrorMsg message={validationErrors.confirmPassword} />
      )}
      <InputField
        label="Confirm Password"
        placeholder="Re-enter password"
        onChange={handleConfirmPasswordChange}
        type={"password"}
      />
    </div>
  );
}
