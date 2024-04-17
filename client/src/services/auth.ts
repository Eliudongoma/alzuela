import client from "./client";
import { UserInfo } from "../pages/SignInPage";

const tokenKey = "token";

const getJwt = () => localStorage.getItem(tokenKey);

const loginWithJwt = (jwt: string) => localStorage.setItem(tokenKey, jwt);

const login = async (info: UserInfo) => {
  const { data, ok, problem } = await client.post("/auth/signin", info);
  if (ok) loginWithJwt(data as string);

  return { data, ok, problem };
};

const logout = () => localStorage.removeItem(tokenKey);

export default {
  getJwt,
  login,
  loginWithJwt,
  logout,
};
