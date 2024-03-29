import { Schema, model } from 'mongoose';

import { IUserProfile } from '../interfaces/UserProfile.interface';

const userProfileSchema = new Schema<IUserProfile>({
  accountId: {required: true, trim: true, type: String,},
  providerName: {default: 'auth0', trim: true, type: String},
  firstName: {required: true, trim: true, type: String,},
  lastName: {required: true, trim: true, type: String,},
  emailAddress: {required: true, trim: true, type: String}, // TODO: add validation for email addresses
  profilePicture: {type: String},
}, {
  timestamps: true
});

export default model<IUserProfile>('UserProfile', userProfileSchema);
