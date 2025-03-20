import { Request, Response, NextFunction } from "express";
import { IProfileController } from "../interface/IProfileController";
import { HttpStatus } from "@/constants/status.constant";
import { HttpResponse } from "@/constants/response-message.constant";
import { IProfileService } from "@/services/interface/IProfileService";

export class ProfileController implements IProfileController {
  constructor(private readonly _profileService: IProfileService) { }

  async getProfile(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { username } = req.params
      const profileDetails = await this._profileService.getProfile(username);
      res.status(HttpStatus.OK).json({ message: HttpResponse.RESOURCE_FOUND, profileDetails })
    } catch (err) {
      next(err);
    }
  }


  async editUsername(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { username } = req.body
      const { id } = JSON.parse(req.headers["x-user-payload"] as string)
      const updatedUsername = await this._profileService.usernameUpdate(id, username)
      res.status(HttpStatus.OK).json({ message: HttpResponse.USERNAME_CHANGED, username: updatedUsername })
    } catch (error) {
      next(error)
    }
  }


  async updateProfile(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { id } = JSON.parse(req.headers["x-user-payload"] as string)
      const updateData = req.body
      const updatedData = await this._profileService.updateProfile(id, updateData)

      res.status(HttpStatus.OK).json({ message: HttpResponse.RESOURCE_UPDATED, updatedData })
    } catch (error) {
      next(error)
    }
  }

  async updateEmail(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId } = req.params
      const { email } = req.body;
      const updatedEmail = await this._profileService.updateEmail(userId, email)

      res.status(HttpStatus.OK).json({ message: HttpResponse.RESOURCE_UPDATED, updatedEmail })
    } catch (error) {
      next(error)
    }
  }

  async changeProfilePicture(req: Request, res: Response, next: NextFunction) {
    try{
      const { userId } = req.body;
      const file = req.file as Express.Multer.File;

      await this._profileService.updateProfilePicture(userId, file);

      res.status(HttpStatus.OK).json({ message: HttpResponse.PROFILE_PICTURE_CHANGED});
    }catch(error) {
      next(error)
    }
  }

}
