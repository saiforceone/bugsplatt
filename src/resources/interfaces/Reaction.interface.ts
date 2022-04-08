import {Types} from 'mongoose';

export interface IReaction {
  associatedIssue: Types.ObjectId;
  createdBy: Types.ObjectId;
  emoji: string;
}
