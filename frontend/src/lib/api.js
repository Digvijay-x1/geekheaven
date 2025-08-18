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

export const logout = async () => {
    const response = await axiosInstance.post("/auth/logout");
    return response.data;
}

export const getContent = async () => {
    const response = await axiosInstance.get("/content");
    return response.data; 
}

export const updateBookmarks = async (questionId) => {
    // Adding error handling and ensuring questionId is valid
    if (!questionId) {
        throw new Error('Question ID is required');
    }
    
    try {
        // Updated the endpoint to match the backend route
        const response = await axiosInstance.post(`/user/bookmarks/${questionId}`);
        return response.data;
    } catch (error) {
        console.error('Error updating bookmark:', error);
        throw error;
    }
}

export const getBookmarks = async () => {
    const response = await axiosInstance.get("/user/bookmarks");
    return response.data ; 
}

export const updateProgress = async (questionId) => {
    // Adding error handling and ensuring questionId is valid
    if (!questionId) {
        throw new Error('Question ID is required');
    }

    try {
        // Updated the endpoint to match the backend route
        const response = await axiosInstance.post(`/user/progress/${questionId}`);
        return response.data;
    } catch (error) {
        console.error('Error updating progress:', error);
        throw error;
    }
}

export const getProgress = async () => {
    const response = await axiosInstance.get("/user/progress");
    return response.data;   
}

export const SuperContentSearch = async ({ queryKey }) => {
  const [_key, searchParams] = queryKey;  
  const response = await axiosInstance.get("/content/q", { params: searchParams });
  return response.data;
};
