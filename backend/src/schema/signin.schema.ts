import { HttpResponse } from "@/constants/response-message.constant";
import { z } from "zod";

const signinSchema = z
  .object({
    email: z.string().email(HttpResponse.INVALID_EMAIL).optional(),
    username: z
      .string()
      .min(3, "Username must be at least 3 characters long")
      .optional(),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters long")
      .regex(/[a-z]/, "Password must contain at least one lowercase letter")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[0-9]/, "Password must contain at least one digit")
      .regex(
        /[^a-zA-Z0-9]/,
        "Password must contain at least one special character"
      ),
  })
  .strict()
  .refine((data) => data.email || data.username, {
    message: "Either email or username is required",
    path: ["email"], 
  });

export default signinSchema;
