import { IUser } from "../../models/interface/IUser";



export interface IAuthService {
    signup(user: IUser): Promise<string>
    signin(email: string, passowrd: string): Promise<{accessToken: string, refreshToken: string}>
}