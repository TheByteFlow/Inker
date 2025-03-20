import { IUserRepository } from "../interface/IUserRepository";
import User, { IUserModel } from "../../models/implementation/user.model";
import { BaseRepository } from "../base.repository";
import { Types } from "mongoose";
import { toObjectId } from "@/utils";

export class UserRepository extends BaseRepository<IUserModel> implements IUserRepository {
  constructor() {
    super(User);
  }
  async createUser(user: IUserModel): Promise<IUserModel> {
    try {
      return await this.create(user);
    } catch (error) {
      console.error(error);
      throw new Error("Error creating user");
    }
  }

  async findByEmail(email: string): Promise<IUserModel | null> {
    try {
      return await this.findOne({ email });
    } catch (error) {
      console.error(error);
      throw new Error("Error finding user by email");
    }
  }

  async findByUsername(username: string): Promise<IUserModel | null> {
    try {
      return await this.findOne({ username });
    } catch (error) {
      console.error(error);
      throw new Error("Error while finding user by email");
    }
  }

  async findUserById(id: string): Promise<IUserModel | null> {
    try {
      return await this.findById(new Types.ObjectId(id));
    } catch (error) {
      console.error(error);
      throw new Error("Error while finding user by Id");
    }
  }

  async findOneWithUsernameOrEmail(value: string): Promise<IUserModel | null> {
    try {
      return await this.findByUsernameOrEmail(value);
    } catch (error) {
      console.error(error);
      throw new Error("errror while finding user by email,username");
    }
  }

  async updatePassword(email: string, hashedPassword: string): Promise<IUserModel | null> {
    try {
      return await this.model.findOneAndUpdate({ email: email }, { $set: { password: hashedPassword } }, { new: true });
    } catch (error) {
      console.error(error);
      throw new Error("errror while updating the password");
    }
  }

  async updateUsername(id: string, username: string): Promise<IUserModel | null> {
    try {
      return await this.model.findByIdAndUpdate(id, { $set: { username: username } })
    } catch (error) {
      console.log(error)
      throw new Error("error while updating username")
    }
  }

  async updateUserProfile(id: string, updateData: Partial<IUserModel>): Promise<IUserModel | null> {
    try {
      return await this.model.findByIdAndUpdate(id,
        { $set: { ...updateData } },
        { new: true, upsert: true, runValidators: true })
    } catch (error) {
      console.log(error)
      throw new Error("error while updating username")
    }
  }

  async updateEmail(id: string, email: string): Promise<IUserModel | null> {
    try {
      return await this.findByIdAndUpdate(toObjectId(id), { $set: { email } })
    } catch (error) {
      console.log(error)
      throw new Error("error while updating email")
    }
  }

  async updateProfilePicture(id: string, profilePicture: string): Promise<void> {
      try{
        await this.findByIdAndUpdate(toObjectId(id), { $set: { profilePicture }})
      }catch (error) {
        console.log(error)
        throw new Error("error while updating profile picture")
      }
  }
}
