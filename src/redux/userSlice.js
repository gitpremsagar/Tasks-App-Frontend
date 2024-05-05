import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userId: null,
  email: null,
  firstName: null,
  lastName: null,
  userType: null,
  // add other user properties here
};

const userSlice = createSlice({
  name: "user", // corrected from firstName to name
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.userId = action.payload.userId;
      state.email = action.payload.email;
      state.firstName = action.payload.firstName;
      state.lastName = action.payload.lastName;
      state.userType = action.payload.userType;
      // set other user properties here
    },
    clearUser: () => initialState,
  },
});

export const { setUser, clearUser } = userSlice.actions;

export const selectUser = (state) => state.user;

export default userSlice.reducer;
