import { IUser } from "../../models/interface/IUser";
import { IUserRepository } from "../../repositories/interface/IUserRepository";
import { IAuthService } from "../interface/IAuthService";
import { hashPassword } from "../../utils/hashPassword";
import generateOtp from "../../utils/generateOtp";
import { sendOtpEmail } from "../../utils/sendEmail";
import { redisClient } from "../../configs/redis.config";
import bcrypt from 'bcrypt';
import { generateAccessToken, generateRefreshToken } from '../../utils/jwt';


//!   Implementation for Auth Service
export class AuthService implements IAuthService {
    constructor(private _userRepository: IUserRepository){}

    async signup(user: IUser): Promise<string> {
        const userExist = await this._userRepository.findByEmail(user.email)

        if(userExist){
            throw new Error("User already exist")
        }

        user.password = await hashPassword(user.password as string)

        const otp = generateOtp()

        await sendOtpEmail(user.email, otp)

        const response = await redisClient.setEx(
            user.email,
            300,
            JSON.stringify({
                ...user,
                otp
            })
          );

          if (!response) {
            throw new Error("Internal server error");
          }

        return user.email
    }

    async signin(email: string, password: string): Promise<{ accessToken: string, refreshToken: string }> {

        const user = await this._userRepository.findByEmail(email);

        if(!user){
            throw new Error("User not found");
        }

        const isMatch = await bcrypt.compare(password, user.password as string);

        if(!isMatch){
            throw new Error("Incorrect password");
        }

        const payload = { id: user._id, email: user.email };

        const accessToken = generateAccessToken(payload);
        const refreshToken = generateRefreshToken(payload);

        return { accessToken, refreshToken };
    }
}