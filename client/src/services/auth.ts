import client from "./client";
import { LoginDetails } from "../pages/SignInPage";
import { UserInfo } from "firebase/auth";

const tokenKey = import.meta.env.JWT_SECRET;

const getJwt = () => localStorage.getItem(tokenKey);

const loginWithJwt = (jwt: string) => localStorage.setItem(tokenKey, jwt);

const login = async (info: LoginDetails,) => {
  const { data, ok, problem } = await client.post("/auth/signin", info);
  if (ok) loginWithJwt(data as string);

  return { data, ok, problem };
};
const googleLogin = async (info: UserInfo) => {
  const { data, ok, problem } = await client.post("/auth/google", info);
  if (ok) loginWithJwt(data as string);

  return { data, ok, problem };
}

const logout = async () => {
  const {ok, data, problem } = await client.post('/user/signout');
  if(ok) localStorage.removeItem(tokenKey);

  return { data, ok, problem}
}

export default {
  getJwt,
  login,
  loginWithJwt,
  logout,
  googleLogin,
};
