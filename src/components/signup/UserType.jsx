import React from "react";
import ValidationErrorMsg from "./ValidationErrorMsg";

export default function UserType({
  signUpFormData,
  setSignUpFormData,
  validationErrors,
}) {
  const handleUserTypeChange = (e) => {
    setSignUpFormData((prev) => ({
      ...prev,
      userType: e.target.value,
    }));
  };

  return (
    <div>
      {validationErrors.userType && (
        <ValidationErrorMsg message={validationErrors.userType} />
      )}
      <label
        className="block text-gray-700 text-sm font-bold mb-2"
        htmlFor="userType"
      >
        Select Your Roll
      </label>

      <select
        name="userType"
        id="userType"
        onChange={handleUserTypeChange}
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        value={signUpFormData.userType}
      >
        <option value=""> - Select - </option>
        <option value="admin">Admin</option>
        <option value="teamMember">Team Member</option>
      </select>
    </div>
  );
}
