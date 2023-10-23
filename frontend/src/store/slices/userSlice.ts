import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "store/index";
import { User } from "types/user";

export interface AuthState {
  user?: User;
  accessToken: string;
  isAuth: boolean;
}

interface PayloadUser {
  user: User;
  accessToken: string;
}

const initialState: AuthState = {
  user: undefined,
  accessToken: "",
  isAuth: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<PayloadUser>) => {
      state.user = action.payload.user;
      state.accessToken = action.payload.accessToken;
      state.isAuth = true;
    },
    setToken: (state, action: PayloadAction<string>) => {
      state.accessToken = action.payload;
      state.isAuth = true;
    },
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.isAuth = true;
    },
    logout: (state) => {
      state.user = undefined;
      state.accessToken = "";
      state.isAuth = false;
    },
  },
});

export const { login, logout, setToken, setUser } = userSlice.actions;

const selectUser = (state: RootState) => state.user;
export default userSlice;
