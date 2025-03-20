import {
    Request,
    Response,
    NextFunction
} from "express";

export interface IProfileController {
    getProfile(req: Request, res: Response, next: NextFunction): Promise<void>

    editUsername(req: Request, res: Response, next: NextFunction): Promise<void>

    updateProfile(req: Request, res: Response, next: NextFunction): Promise<void>

    updateEmail(req: Request, res: Response, next: NextFunction): Promise<void>

    changeProfilePicture(req: Request, res: Response, next: NextFunction): Promise<void>
}