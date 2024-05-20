import React from "react";
import InputField from "../ui/InputField";
import ValidationErrorMsg from "./ValidationErrorMsg";

export default function LastName({
  signUpFormData,
  setSignUpFormData,
  validationErrors,
}) {
  const handleLastNameChange = (e) => {
    setSignUpFormData((prev) => ({
      ...prev,
      lastName: e.target.value,
    }));
  };

  return (
    <div>
      {validationErrors.lastName && (
        <ValidationErrorMsg message={validationErrors.lastName} />
      )}
      <InputField
        label="Last Name"
        placeholder="Enter your Last Name"
        onChange={handleLastNameChange}
        value={signUpFormData.lastName}
      />
    </div>
  );
}
