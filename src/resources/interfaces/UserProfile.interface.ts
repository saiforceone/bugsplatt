import { IBase } from "./Base.interface";

export interface IUserProfile extends IBase {
  _id: string;
  createdAt: Date;
  accountId: string;
  providerName: string;
  firstName: string;
  lastName: string;
  emailAddres: string;
  profilePicture?: string;
}
