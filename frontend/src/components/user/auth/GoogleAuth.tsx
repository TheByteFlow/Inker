import React from "react";
import { GoogleLogin, CredentialResponse } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { AuthService } from "@/services/authServices";
import { toast } from "sonner";

interface DecodedUser {
  name: string;
  email: string;
  picture: string;
}

const GoogleAuth: React.FC = () => {
  const navigate = useNavigate();

  const handleSubmit = async (response: CredentialResponse) => {
    if (!response.credential) {
      toast.error("Google login failed. No credential received.");
      return;
    }

    const decodedUser: DecodedUser = jwtDecode<DecodedUser>(response.credential);

    try {
      await AuthService.googleAuth({ email: decodedUser.email, name: decodedUser.name });
      toast.success("Logged in successfully");
      navigate("/home");
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("An unexpected error occurred.");
      }
    }
  };

  return (
    <GoogleLogin
      onSuccess={handleSubmit}
      onError={() => toast.error("Google login failed")}
    />
  );
};

export default GoogleAuth;
