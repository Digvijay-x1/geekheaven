import { axiosInstance } from "./axios";

export const signup = async (signupData) => {
    const response = await axiosInstance.post("/auth/register", signupData);
    return response.data;
}

export const login = async (loginData) => {
    const response = await axiosInstance.post("/auth/login", loginData);
    return response.data;
}

export const getUserData = async () => {
    const response = await axiosInstance.get("/auth/me");
    return response.data;
}

