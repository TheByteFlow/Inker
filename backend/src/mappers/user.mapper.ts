import { IUserModel } from "@/models/implementation/user.model";
import { omitFields, toPlainObject } from "@/utils";

export const userDataMapper = (userData: IUserModel) => {
  const plainUserData = toPlainObject(userData);
  return omitFields(plainUserData,['password','__v'])
};
