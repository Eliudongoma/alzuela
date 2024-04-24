import { UserInfo } from "firebase/auth";
import { jwtDecode } from "jwt-decode";

import { LoginDetails } from "../pages/SignInPage";
import client from "./client";
import User from "../components/interfaces/UserLogin";

const tokenKey = import.meta.env.JWT_SECRET;

const getJwt = () => localStorage.getItem(tokenKey);

const loginWithJwt = (jwt: string) => localStorage.setItem(tokenKey, jwt);

const login = async (info: LoginDetails) => {
  const { data, ok, problem } = await client.post("/auth", info);
  if (ok) loginWithJwt(data as string);

  return { data, ok, problem };
};

const googleLogin = async (info: UserInfo) => {
  const { data, ok, problem } = await client.post("/auth/google", info);
  if (ok) loginWithJwt(data as string);

  return { data, ok, problem };
};

const logout = async () => {
  const { ok, data, problem } = await client.post("/user/signout");
  if (ok) localStorage.removeItem(tokenKey);

  return { data, ok, problem };
};

const getCurrentUser = () => {
  try {
    const jwt = getJwt();
    if (jwt) {
      const user: User | null = jwtDecode(jwt);
      return user;
    }
  } catch (error) {
    return null;
  }
};

export default {
  getCurrentUser,
  getJwt,
  googleLogin,
  login,
  loginWithJwt,
  logout,
};
