export interface IUserProfile {
  _id: string;
  createdAt: Date;
  accountId: string;
  providerName: string;
  firstName: string;
  lastName: string;
  emailAddres: string;
  profilePicture?: string;
}
