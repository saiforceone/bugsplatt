import {Types} from 'mongoose';

export interface IComment {
  associatedIssue: Types.ObjectId;
  createdBy: Types.ObjectId;
  content: string;
}