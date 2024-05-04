import React from "react";
import InputField from "../ui/InputField";
import ValidationErrorMsg from "./ValidationErrorMsg";

export default function FirstName({ setSignUpFormData, validationErrors }) {
  const handleFirstNameChange = (e) => {
    setSignUpFormData((prev) => ({
      ...prev,
      firstName: e.target.value,
    }));
  };

  return (
    <div>
      {validationErrors.firstName && (
        <ValidationErrorMsg message={validationErrors.firstName} />
      )}
      <InputField
        label="First Name"
        placeholder="Enter your first name"
        onChange={handleFirstNameChange}
      />
    </div>
  );
}
