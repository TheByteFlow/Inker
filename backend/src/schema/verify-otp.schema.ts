import { HttpResponse } from "@/constants/response-message.constant";
import { z } from "zod";

const verifyOtpSchema = z
  .object({
    email: z.string().email(HttpResponse.INVALID_EMAIL),
    otp: z
      .string()
      .min(6, "OTP must be 6 digits long")
      .max(6, "OTP must be 6 digits long")
      .regex(/^\d+$/, "OTP must contain only numbers")  
  })
  .strict();

export default verifyOtpSchema;
