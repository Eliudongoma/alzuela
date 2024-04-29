import { useContext, useEffect, useState } from "react";
import { UserContext } from "../contexts";
import { LoginDetails } from "../pages/SignInPage";
import { authApi } from "../services";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { UserInfo } from "firebase/auth";
import { PROBLEM_CODE } from "apisauce";
import User from "../components/interfaces/UserLogin";

interface LoginResponse {
  success: boolean;
  message: string;
}

interface Response {
  ok: boolean;
  data: unknown;
  problem: PROBLEM_CODE | null;
}

const useUsers = () => {
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("currentUser");
    if (storedUser) setCurrentUser(JSON.parse(storedUser));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const login = async (info: LoginDetails) => {
    const response = await authApi.login(info);
    manageData(response);
  };

  async function manageData(response: Response) {
    const data = (await response.data) as LoginResponse;
    if (!data?.success) return setError(data.message);

    if (response.ok) {
      setCurrentUser(response.data as User);
      localStorage.setItem("currentUser", JSON.stringify(response.data));
      toast.success("Login Successful");
      // window.location.href = '/'
      navigate("/");
    }
  }

  const googleLogin = async (info: UserInfo) => {
    const response = await authApi.googleLogin(info);
    manageData(response);
  };

  const logout = () => {
    localStorage.removeItem("currentUser");
    authApi.logout();
  };
  return { error, currentUser, login, googleLogin, logout };
};

export default useUsers;
