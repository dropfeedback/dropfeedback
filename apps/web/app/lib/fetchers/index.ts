import { axiosInstance } from "~/lib/axios";

const me = async (cookie?: string) => {
  const { data } = await axiosInstance.get("/auth/me", {
    headers: {
      Cookie: cookie,
    },
  });
  
  return data;
};

const signup = async (payload: { email: string; password: string }) => {
  const { data } = await axiosInstance.post("/auth/local/signup", payload);
  return data;
};

const signin = async (payload: { email: string; password: string }) => {
  const { data } = await axiosInstance.post("/auth/local/signin", payload);
  return data;
};

const logout = async () => {
  const { data } = await axiosInstance.post("/auth/logout");
  return data;
};

const refreshToken = async () => {
  const { data } = await axiosInstance.post("/auth/refresh");
  return data;
};

const googleLogin = async (payload: { idToken: string }) => {
  const { data } = await axiosInstance.post("/auth/google/login", payload);
  return data;
};



export const fetchers = {
  me,
  signup,
  signin,
  logout,
  refreshToken,
  googleLogin,
};
