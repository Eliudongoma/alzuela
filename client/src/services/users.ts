import { toast } from "react-toastify";

import { SignUpInfo } from "../pages/SignUpPage";
import authApi from "./auth";
import client, { DataError } from "./client";

export const signupEndpoint = "/auth/signup";
export const endpoint = "/auth";

const register = (info: SignUpInfo) => client.post(signupEndpoint, info);

const getUser = (userId: string) => client.get(`${endpoint}/${userId}`);

const getUsers = () => client.get(`${endpoint}`);

const updateUserInfo = (userInfo: object) => client.patch(endpoint, userInfo);

const resetToken = async () => {
  const res = await client.get(`${endpoint}/token`);
  if (!res.ok)
    return toast.error(
      (res.data as DataError).error ||
        "Something went wrong. Sorry, You need to need sign out and then in manually"
    );

  authApi.loginWithJwt(res.data as string);
  window.location.href = window.location.href || "/";
};

export default {
  getUser,
  getUsers,
  register,
  resetToken,
  updateUserInfo,
};
