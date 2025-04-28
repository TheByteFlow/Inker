import {Request, Response, NextFunction} from "express";
import {verifyAccessToken} from "@/utils/jwt.util";
import {HttpResponse} from "@/constants/response-message.constant";
import {HttpStatus} from "@/constants/status.constant";
import {createHttpError} from "@/utils/http-error.util";

export default function (
    userLevel: "user" | "admin" | "moderator"
): (req: Request, res: Response, next: NextFunction) => void {
    return (req: Request, _res: Response, next: NextFunction): void => {
        const authHeader = req.headers.authorization;

        console.log("Authorization Header:", authHeader);

        if (!authHeader || !authHeader.startsWith("Bearer")) {
            throw createHttpError(HttpStatus.UNAUTHORIZED, HttpResponse.NO_TOKEN)
        }

        const token = authHeader.split(" ")[1];
        if (!token) {
            throw createHttpError(HttpStatus.UNAUTHORIZED, HttpResponse.NO_TOKEN)
        }

        const payload = verifyAccessToken(token) as {
            id: string;
            email: string;
            role: "user" | "admin" | "moderator";
        };

        if (!payload) {
            console.log("Invalid token payload");
            throw createHttpError(HttpStatus.UNAUTHORIZED, HttpResponse.TOKEN_EXPIRED)
        }

        if (payload.role !== userLevel) {
            throw createHttpError(HttpStatus.UNAUTHORIZED, HttpResponse.UNAUTHORIZED)
        }

        req.user = {
            id: payload.id,
            email: payload.email,
            role: payload.role,
        }

        console.log("User payload:", req.user);

        req.headers["x-user-payload"] = JSON.stringify(payload);
        next();
    };
}
