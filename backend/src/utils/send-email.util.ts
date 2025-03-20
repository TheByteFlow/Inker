
import { transporter } from "@/configs/mail.config";

import { env } from "../configs/env.config";

export const sendOtpEmail = async (email: string, otp: string) => {
  try {
    const mailOptions = {
      from: "",
      to: email,
      subject: "inker OTP Verificaiton",
      html: `
          <h1>OTP Verification</h1>
          <p>Your OTP is: ${otp}</p>
          <p>Use this OTP to verify your email. Do not share it with anyone.</p><br />
          <p>If you did not request this verification, you can ignore this email.</p>
          <p>~ Inker</p>
            `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("OTP mail send successfully", info.response);
  } catch (err) {
    console.error("Error sending verification email:", err);
    throw new Error("Error sending otp email");
  }
};

export const sendResetPasswordEmail = async (email: string, token: string) => {
  try {
    const resetPasswordUrl = `${env.RESET_PASS_URL}?token=${token}`;

    const mailOptions = {
      from: "",
      to: email,
      subject: "Reset Your Password - Inker",
      html: `
            
                <h1> Password Reset Request </h1>
                <p> You have requested to reset your password. Click the link below to proceed :  </p>
                <p> <a href="${resetPasswordUrl}" target="_blank" >Reset Password </a> </p>
                <p>If you did not request this, you can ignore this email.</p><br />
                <p>~ Inker</p>
            
            `
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Password reset email sent successfully", info.response);
  } catch (error) {
    console.error("Error sendResetPasswordEmail",error);
    throw new Error("Error sending reset pass email");
  }
};



