import {Request, Response, NextFunction} from "express";
import {IAuthService} from "@/services/interface/IAuthService";
import {IAuthController} from "../interface/IAuthController";
import {HttpStatus} from "@/constants/status.constant";
import {HttpResponse} from "@/constants";
import {setCookie} from "@/utils/refresh-cookie.util";

export class AuthController implements IAuthController {
    constructor(private authService: IAuthService) {
    }

    async signup(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> {
        try {

            const user = await this.authService.signup(req.body);

            res.status(HttpStatus.OK).json({
                email: user,
            });
        } catch (err) {
            next(err);
        }
    }


    async signin(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> {
        try {
            const {email, username, password} = req.body;

            const tokens = await this.authService.signin(email || username, password);

            setCookie(res, tokens.refreshToken)

            res.status(HttpStatus.OK).json({token: tokens.accessToken});
        } catch (err) {
            next(err);
        }
    }

    async googleAuth(req: Request, res: Response, next: NextFunction) {
        try {
            const {id_token: token} = req.body;

            const {user, accessToken, refreshToken} = await this.authService.googleAuth(token);

            setCookie(res, refreshToken)

            console.log("google login success", user)

            res.status(HttpStatus.OK).json({
                message: HttpResponse.GOOGLE_LOGIN_SUCCESS,
                user,
                token: accessToken
            });
        } catch (err) {
            next(err);
        }
    }


    async verifyOtp(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> {
        try {
            const {otp, email} = req.body;
            const {user, accessToken, refreshToken} = await this.authService.verifyOtp(
                otp,
                email
            );
            setCookie(res, refreshToken)

            res.status(HttpStatus.CREATED).json({
                message: HttpResponse.USER_CREATION_SUCCESS,
                user,
                token: accessToken
            });
        } catch (err) {
            next(err);
        }
    }


    async forgotPassword(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> {
        try {
            const {email} = req.body;
            const verifyForgotPassword = await this.authService.verifyForgotPassword(email);
            res.status(HttpStatus.OK).json(verifyForgotPassword);

        } catch (error) {
            next(error)
        }
    }


    async resetPassword(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> {
        try {
            const {password, token} = req.body;
            const updateUserPassword = await this.authService.getResetPassword(token, password);
            res.status(HttpStatus.OK).json(updateUserPassword)

        } catch (error) {
            next(error)
        }
    }

    async logout(_req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            res.clearCookie('refreshToken', {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict'
            })
            res.status(HttpStatus.OK).json({message: HttpResponse.LOGOUT_SUCCESS});
        } catch (error) {
            next(error)
        }
    }


    async refreshAccessToken(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> {
        try {
            const {refreshToken} = req.cookies;

            console.log("Refreshinnnng token", refreshToken)

            const {
                accessToken,
                refreshToken: newRefreshToken
            } = await this.authService.refreshAccessToken(refreshToken);

            setCookie(res, newRefreshToken)

            res.status(HttpStatus.OK).json({token: accessToken});
        } catch (error) {
            next(error)
        }
    }

    async me(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const {id} = JSON.parse(req.headers["x-user-payload"] as string)
            const user = await this.authService.getUser(id)

            res.status(HttpStatus.OK).json(user)
        } catch (error) {
            next(error)
        }
    }
}
