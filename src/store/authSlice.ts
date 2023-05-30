import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import cookie from "js-cookie";
import { BASE_URL } from "../utils";

export const STATUSES = {
  IDLE: "idle",
  LOADING: "loading",
};
export const ALERTS = {
  NULL: null,
  VALUE: (type: string, msg: string) => Object({ type, msg }),
};

// Thunks
export const validateAuthSession: any = createAsyncThunk(
  "auth/session",
  async (_, { rejectWithValue }) => {
    try {
      const token = cookie.get("authToken");
      const res = await axios({
        url: `${BASE_URL}/v1/user/session`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = res.data;
      return data;
    } catch (err: any) {
      return rejectWithValue(err.response.data.message);
    }
  }
);
export const login: any = createAsyncThunk(
  "auth/login",
  async (
    payload: { username: string; email: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const res = await axios({
        url: `${BASE_URL}/v1/user/login`,
        method: "POST",
        data: payload,
      });
      const data = res.data;
      // console.log("hey-Login_API_response", data);
      return data;
    } catch (err: any) {
      return rejectWithValue(err.response.data.message);
    }
  }
);
export const signup: any = createAsyncThunk(
  "auth/signup",
  async (
    payload: { username: string; email: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const res = await axios({
        url: `${BASE_URL}/v1/user/signup`,
        method: "POST",
        data: payload,
      });
      const data = res.data;
      // console.log("hey-Signup_API_response", data);
      return data;
    } catch (err: any) {
      return rejectWithValue(err.response.data.message);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isAuthenticated: false,
    userInfo: null,
    status: STATUSES.IDLE,
    AuthAlert: ALERTS.NULL,
  },
  reducers: {
    removeAuth(state) {
      state.isAuthenticated = false;
      state.userInfo = null;
      cookie.remove("authToken");
      state.AuthAlert = ALERTS.VALUE("info", "Logged Out Successfully");
    },
    resetAuthAlert(state) {
      state.AuthAlert = ALERTS.NULL;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(validateAuthSession.pending, (state, _) => {
      state.status = STATUSES.LOADING;
    });
    builder.addCase(validateAuthSession.fulfilled, (state, action) => {
      state.status = STATUSES.IDLE;
      // console.log("C-session", action.payload);
      state.isAuthenticated = true;
      state.userInfo = action.payload.data;
    });
    builder.addCase(validateAuthSession.rejected, (state, action) => {
      state.status = STATUSES.IDLE;
      // console.log("hey1", action.payload);
      state.AuthAlert = ALERTS.VALUE("error", action.payload);
      cookie.remove("authToken");
    });
    builder.addCase(login.pending, (state, _) => {
      state.status = STATUSES.LOADING;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.status = STATUSES.IDLE;
      // console.log("hey1", action.payload);
      state.isAuthenticated = true;
      state.userInfo = action.payload.data;
      cookie.set("authToken", action.payload.token);
      state.AuthAlert = ALERTS.VALUE("success", action.payload.message);
    });
    builder.addCase(login.rejected, (state, action) => {
      // console.log("C-Login-Reject", action.payload);
      state.status = STATUSES.IDLE;
      state.AuthAlert = ALERTS.VALUE("error", action.payload);
    });
    builder.addCase(signup.pending, (state, _) => {
      state.status = STATUSES.LOADING;
    });
    builder.addCase(signup.fulfilled, (state, action) => {
      state.status = STATUSES.IDLE;
      // console.log("hey1", action.payload);
      state.isAuthenticated = true;
      state.userInfo = action.payload.data;
      cookie.set("authToken", action.payload.token);
      state.AuthAlert = ALERTS.VALUE("success", action.payload.message);
    });
    builder.addCase(signup.rejected, (state, action) => {
      // console.log("hey1", action.payload);
      state.status = STATUSES.IDLE;
      state.AuthAlert = ALERTS.VALUE("error", action.payload);
    });
  },
});

export const { removeAuth, resetAuthAlert } = authSlice.actions;
export default authSlice.reducer;
