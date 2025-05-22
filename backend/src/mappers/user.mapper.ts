import { IUserModel } from "@/models/implementation/user.model";
import { toPlainObject } from "@/utils/mapper.util";

export const userDataMapper = (userData: IUserModel) => {
  const plainUserData = toPlainObject(userData);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { password : _ , ...safeUserData } = plainUserData;
  return safeUserData;
};
