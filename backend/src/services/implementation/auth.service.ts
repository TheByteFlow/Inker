import { IUserRepository } from "../../repositories/interface/IUserRepository";
import { IAuthService } from "../interface/IAuthService";
import { createHttpError } from "@/utils/http-error.util";
import { HttpStatus } from "@/constants/status.constant";
import { HttpResponse } from "@/constants/response-message.constant";
import { IUserModel } from "@/models/implementation/user.model";
import { generateNanoId } from "@/utils/generate-nanoid";
import { JwtPayload } from "jsonwebtoken";
import {
  comparePassword,
  generateAccessToken,
  generateOTP,
  generateRefreshToken,
  hashPassword,
  sendOtpEmail,
  sendResetPasswordEmail,
  generateUniqueUsername,
  verifyRefreshToken
} from "@/utils";
import { redisClient } from "@/configs";
import { IUser } from "shared/types";


//!   Implementation for Auth Service
export class AuthService implements IAuthService {
  constructor(private readonly _userRepository: IUserRepository) { }

  async signup(
    user: IUser
  ): Promise<string> {
    const userExist = await this._userRepository.findByEmail(user.email);

    if (userExist) {
      throw createHttpError(HttpStatus.CONFLICT, HttpResponse.USER_EXIST);
    }


    const otp = generateOTP();

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
      throw createHttpError(HttpStatus.INTERNAL_SERVER_ERROR, HttpResponse.SERVER_ERROR);
    }

    return user.email
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
      throw createHttpError(HttpStatus.UNAUTHORIZED, HttpResponse.PASSWORD_INCORRECT);
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
    const storedDataString = await redisClient.get(email);
    if (!storedDataString) {
      throw createHttpError(HttpStatus.NOT_FOUND, HttpResponse.OTP_NOT_FOUND);
    }

    const storedData = JSON.parse(storedDataString);

    if (storedData.otp !== otp) throw createHttpError(HttpStatus.BAD_REQUEST, HttpResponse.OTP_INCORRECT);

    const uniqUsername = await generateUniqueUsername(storedData.name)

    const user = {
      username: uniqUsername,
      name: storedData.name,
      email: storedData.email,
      password: storedData.password,
    };

    const createdUser = await this._userRepository.create(user as IUserModel);

    if (!createdUser) throw createHttpError(HttpStatus.CONFLICT, HttpResponse.USER_CREATION_FAILED);

    await redisClient.del(email);

    return {
      status: HttpStatus.OK,
      message: HttpResponse.USER_CREATION_SUCCESS,
    };
  }


  async verifyForgotPassword(
    email: string
  ): Promise<{ status: number; message: string }> {
    const isExist = await this._userRepository.findByEmail(email);

    if (!isExist) {
      throw createHttpError(HttpStatus.NOT_FOUND, HttpResponse.USER_NOT_FOUND);
    }
    const token = generateNanoId();

    const storeOnReddis = await redisClient.setEx(token, 300, isExist.email);

    if (!storeOnReddis) {
      throw createHttpError(HttpStatus.INTERNAL_SERVER_ERROR, HttpResponse.SERVER_ERROR);
    }
    await sendResetPasswordEmail(isExist.email, token);

    return {
      status: HttpStatus.OK,
      message: HttpResponse.RESET_PASS_LINK,
    };
  }


  async getResetPassword(
    token: string,
    password: string
  ): Promise<{ status: number; message: string }> {
    const getEmail = await redisClient.get(token);
    if (!getEmail) {
      throw createHttpError(HttpStatus.NOT_FOUND, HttpResponse.TOKEN_EXPIRED);
    }

    const hashedPassword = await hashPassword(password);

    const updateUser = await this._userRepository.updatePassword(getEmail, hashedPassword);
    if (!updateUser) {
      throw createHttpError(HttpStatus.INTERNAL_SERVER_ERROR, HttpResponse.SERVER_ERROR);
    }

    await redisClient.del(token);

    return {
      status: HttpStatus.OK,
      message: HttpResponse.PASSWORD_CHANGE_SUCCESS,
    };
  }


  async refreshAccessToken(
    token: string
  ): Promise<string> {

    if (!token) {
      throw createHttpError(HttpStatus.NOT_FOUND, HttpResponse.NO_TOKEN);
    }

    const decoded = verifyRefreshToken(token) as JwtPayload;
    if (!decoded) {
      throw createHttpError(HttpStatus.NO_CONTENT, HttpResponse.TOKEN_EXPIRED);
    }

    const payload = { id: decoded.id, role: decoded.role, email: decoded.email };

    const accessToken = generateAccessToken(payload);

    return accessToken;
  }


}
