import { createSlice } from "@reduxjs/toolkit";

export const STATUSES = {
  IDLE: "idle",
  LOADING: "loading",
};

const commonSlice = createSlice({
  name: "common",
  initialState: {
    theme: "light",
    showLoginModal: false,
    showSignupModal: false,
  },
  reducers: {
    changeTheme(state) {
      state.theme =
        ["dark", "light"].filter((e) => e != state.theme).at(0) || state.theme;
    },
    toggleSignupModal(state) {
      state.showSignupModal = !state.showSignupModal;
    },
    toggleLoginModal(state) {
      state.showLoginModal = !state.showLoginModal;
    },
  },
});

export const { changeTheme, toggleLoginModal, toggleSignupModal } =
  commonSlice.actions;
export default commonSlice.reducer;
