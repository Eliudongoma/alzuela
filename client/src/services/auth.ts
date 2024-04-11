import client from "./client";

const tokenKey = "token";

const getJwt = () => localStorage.getItem(tokenKey);

const loginWithJwt = (jwt: string) => localStorage.setItem(tokenKey, jwt);

interface LoginInfo {
  password: string;
  username: string;
}

const login = async ({ username, password }: LoginInfo) => {
  const { data, ok, problem } = await client.post("/auth", {
    username: "@" + username,
    password,
  });

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
