import { IUserModel } from "@/models/implementation/user.model";
import { toPlainObject } from "@/utils/mapper.helper";

export const userDataMapper = (userData: IUserModel) => {
  const plainUserData = toPlainObject(userData);
  const { password, ...safeUserData } = plainUserData;
  return safeUserData;
};
