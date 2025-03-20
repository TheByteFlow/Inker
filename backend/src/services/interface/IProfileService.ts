import { IUserModel } from "@/models/implementation/user.model";

export interface IProfileService {

    getProfile(username: string): Promise<IUserModel>;

    usernameUpdate(id: string, username: string): Promise<string | undefined>;

    updateProfile(id: string, updateData: Partial<IUserModel>): Promise<IUserModel>;

    updateEmail(id: string, email: string): Promise<IUserModel>;

    updateProfilePicture(userId: string, file: Express.Multer.File): Promise<void>;

}
