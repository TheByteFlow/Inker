import { IUserRepository } from "../../repositories/interface/IUserRepository";
import { IAuthService } from "../interface/IAuthService";
import generateOtp from "../../utils/generate-otp.util";
import { sendOtpEmail } from "../../utils/send-email.util";
import { redisClient } from "../../configs/redis.config";
import { hashPassword, comparePassword } from "../../utils/bcrypt.util";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../../utils/jwt.util";
import { createHttpError } from "@/utils/http-error.util";
import { HttpStatus } from "@/constants/status.constant";
import { HttpResponse } from "@/constants/response-message.constant";
import { generateUniqueUsername } from "@/utils/generate-uniq-username";
import { IUser } from "shared/types";
import { IUserModel } from "@/models/implementation/user.model";
import { log } from "console";

//!   Implementation for Auth Service
export class AuthService implements IAuthService {
  constructor(private _userRepository: IUserRepository) {}

  async signup(user: IUser): Promise<string> {
    const userExist = await this._userRepository.findByEmail(user.email);
    
    if (userExist) {
      throw createHttpError(HttpStatus.CONFLICT, HttpResponse.USER_EXIST);
    }

    user.password = await hashPassword(user.password as string);

    const otp = generateOtp();

    await sendOtpEmail(user.email, otp);

    const response = await redisClient.setEx(
      user.email,
      300,
      JSON.stringify({
        ...user,
        otp,
      })
    );

    if (!response) {
      throw createHttpError(
        HttpStatus.INTERNAL_SERVER_ERROR,
        HttpResponse.SERVER_ERROR
      );
    }

    return user.email;
  }

  async signin(
    identifier: string,
    password: string
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const user = await this._userRepository.findOneWithUsernameOrEmail(identifier);

    if (!user) {
      throw createHttpError(HttpStatus.NOT_FOUND, HttpResponse.USER_NOT_FOUND);
    }

    const isMatch = await comparePassword(password, user.password as string);

    if (!isMatch) {
      throw createHttpError(
        HttpStatus.UNAUTHORIZED,
        HttpResponse.PASSWORD_INCORRECT
      );
    }

    const payload = { id: user._id, role: user.role, email: user.email };

    const accessToken = generateAccessToken(payload);
    const refreshToken = generateRefreshToken(payload);

    return { accessToken, refreshToken };
  }

  async verifyOtp(
    otp: string,
    email: string
  ): Promise<{ status: number; message: string }> {
    //get the stored data from redis
    const storedDataString = await redisClient.get(email);
    if (!storedDataString) {
      throw createHttpError(HttpStatus.NOT_FOUND, HttpResponse.OTP_NOT_FOUND);
    }
    
    //parsed from string to object
    const storedData = JSON.parse(storedDataString);
    
    //validated the otp
    if (storedData.otp !== otp)
      throw createHttpError(HttpStatus.BAD_REQUEST, HttpResponse.OTP_INCORRECT);

    //get unique username
    const uniqUsername = await generateUniqueUsername(storedData.name)
    
    //construct a user object
    const user  = {
      username: uniqUsername,
      name: storedData.name,
      email: storedData.email,
      password: storedData.password,
    };

    //user creation
    const createdUser = await this._userRepository.create(user as IUserModel);
    
    if (!createdUser)
      throw createHttpError(
        HttpStatus.CONFLICT,
        HttpResponse.USER_CREATION_FAILED
      );

    //delete the data from redis
    await redisClient.del(email);

    return {
      status: HttpStatus.OK,
      message: HttpResponse.USER_CREATION_SUCCESS,
    };
  }
}
