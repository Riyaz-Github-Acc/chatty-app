import { axiosInstance } from "../lib/axios"
import type { LoginUserProps, SignupUserProps } from "../types/auth.type";

export const checkAuth = async () => {
    const res = await axiosInstance.get('/auth/me');
    return res.data;
}

export const signup = async (userDetails: SignupUserProps) => {
    const res = await axiosInstance.post('/auth/signup', { ...userDetails })
    return res.data;
}

export const login = async (userDetails: LoginUserProps) => {
    const res = await axiosInstance.post('/auth/login', { ...userDetails })
    return res.data;
}

export const logout = async () => {
    const res = await axiosInstance.post('/auth/logout')
    return res.data;
}

export const updateProfilePic = async (profilePic: string) => {
    const res = await axiosInstance.patch('/auth/profile-pic', { profilePic })
    return res.data;
}