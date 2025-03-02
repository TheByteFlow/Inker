import { axiosInstance } from "@/config/axios";
import { toast } from "sonner";
import { AxiosError } from "axios";

interface LoginData {
  email: string;
  password: string;
}

interface RegisterData extends LoginData {
  name: string;
}

interface OtpData {
  email: string;
  otp: string;
}

export const AuthService = {
  loginService: async (data: LoginData): Promise<{ status: number; message: string}> => {
    try {
      const response = await axiosInstance.post<{ status: number; message: string}> ("/api/auth/login", data);
      return response.data;
    } catch (error: unknown) {
      const err = error as AxiosError<{ error: string }>;
      toast.error(err.response?.data?.error || "Login failed. Please try again.");
      throw new Error(err.response?.data?.error || "Login failed.");
    }
  },

  registerService: async (data: RegisterData): Promise<{ status: number; message: string}>  => {
    try {
      const response = await axiosInstance.post<{ status: number; message: string}> ("/api/auth/register", data);
      return response.data;
    } catch (error: unknown) {
      const err = error as AxiosError<{ error: string }>;
      const errorMessage = err.response?.data?.error || "Registration failed. Please try again.";
      throw new Error(errorMessage);
    }
  },

  googleAuth: async (data: Omit<RegisterData, "password">): Promise<{ status: number; message: string}>  => {
    try {
      const response = await axiosInstance.post<{ status: number; message: string}> ("/api/auth/google-auth", data);
      return response.data;
    } catch (error: unknown) {
      const err = error as AxiosError<{ error: string }>;
      const errorMessage = err.response?.data?.error || "Google authentication failed. Please try again.";
      throw new Error(errorMessage);
    }
  },

  otpVerificationService: async (data: OtpData): Promise<{ status: number; message: string }> => {
    try {
      const response = await axiosInstance.post<{ status: number; message: string }>("/api/auth/otp", data);
      return response.data;
    } catch (error: unknown) {
      const err = error as AxiosError<{ error: string }>;
      const errorMessage = err.response?.data?.error || "OTP validation failed. Please try again.";
      throw new Error(errorMessage);
    }
  },
};
