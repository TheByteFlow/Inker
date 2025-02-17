import { model, Schema } from "mongoose";
import { IUser } from "../interface/IUser";

//!  Implementaion for User Schema
const userSchema = new Schema<IUser>(
  {
    username: {
      type: String,
      required: true,
      unique: true
    },
    name: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
    },
    status: {
      type: String,
      enum: ["active", "blocked"],
      default: "active",
    },
    role: {
      type: String,
      enum: ["user", "moderator"],
      default: "user",
    },
    bio: {
      type: String,
    },
    profile_picture: {
      type: String,
    },
    social_links: [
      {
        type: {
          type: String,
        },
        url: {
          type: String,
        },
      },
    ],
    resume: {
      type: String,
    },
    date_of_birth: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);


const User = model<IUser>('User', userSchema)
export default User