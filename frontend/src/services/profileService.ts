import { axiosInstance } from "@/config/axios";
import { AxiosError } from "axios";
import { toast } from "sonner";



interface UpdateProfileData {
    name: string;
    bio: string;
    resume: string;
    socials: {
        platform: string, 
        url: string
    }[] 
}

interface ProfileData extends UpdateProfileData {
    _id: string; 
    userName: string; 
    email: string; 
    status: "Active" | "Inactive" | "Pending"; 
    role: "User" | "Admin";
    profilePicture: string;
    dateOfBirth: string; 
    createdAt: string; 
    updatedAt: string; 
  }



export const AuthService = {
  updateProfileService: async (data: UpdateProfileData): Promise<{ status: number; message: string, updatedFields: string[]}> => {
    try {
      const response = await axiosInstance.put<{ status: number; message: string, updatedFields: string[]}> ("/api/profile/update", data);
      return response.data;
    } catch (error: unknown) {
      const err = error as AxiosError<{ error: string }>;
      toast.error(err.response?.data?.error || "Profile update failed. Please try again.");
      throw new Error(err.response?.data?.error || "Profile update failed.");
    }
  },

  profileDetailsService: async (): Promise<{ status: number; data: ProfileData }> => {
    try {
      const response = await axiosInstance.get<{ status: number; data: ProfileData }> ("api/profile");
      return response.data;
    } catch (error: unknown) {
      const err = error as AxiosError<{ error: string }>;
      toast.error(err.response?.data?.error || "Profile details fetching failed. Please try again.");
      throw new Error(err.response?.data?.error || "Profile details fetching failed.");
    }
  },

  changeEmailService: async (data: {oldEmail: string; newEmail: string;}): Promise<{ status: number; message: string }> => {
    try {
      const response = await axiosInstance.patch<{ status: number; message: string }> ("api/profile/change-email", data);
      return response.data;
    } catch (error: unknown) {
      const err = error as AxiosError<{ error: string }>;
      toast.error(err.response?.data?.error || "Attempt to change email failed. Please try again.");
      throw new Error(err.response?.data?.error || "Attempt to change email failed.");
    }
  },

  
  changeUsernameService: async (data: {oldUserName: string; newUserName: string;}): Promise<{ status: number; message: string }> => {
    try {
      const response = await axiosInstance.patch<{ status: number; message: string }> ("api/profile/change-username", data);
      return response.data;
    } catch (error: unknown) {
      const err = error as AxiosError<{ error: string }>;
      toast.error(err.response?.data?.error || "Attempt to change username failed. Please try again.");
      throw new Error(err.response?.data?.error || "Attempt to change username failed.");
    }
  },

  changePasswordService: async (data: {userId: string, oldPassword: string; newPassword: string;}): Promise<{ status: number; message: string }> => {
    try {
      const response = await axiosInstance.patch<{ status: number; message: string }> ("api/profile/change-password", data);
      return response.data;
    } catch (error: unknown) {
      const err = error as AxiosError<{ error: string }>;
      toast.error(err.response?.data?.error || "Attempt to change password failed. Please try again.");
      throw new Error(err.response?.data?.error || "Attempt to change password failed.");
    }
  },

  changeProfilePictureService: async (data: {userId: string, file: File}): Promise<{ status: number; message: string }> => {
    try {
      const response = await axiosInstance.patch<{ status: number; message: string }> ("api/profile/change-profile-picture", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        }
      });
      return response.data;
    } catch (error: unknown) {
      const err = error as AxiosError<{ error: string }>;
      toast.error(err.response?.data?.error || "Attempt to change profile picture failed. Please try again.");
      throw new Error(err.response?.data?.error || "Attempt to change profile picture failed.");
    }
  }
}