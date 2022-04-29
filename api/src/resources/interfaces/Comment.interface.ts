import {Types} from 'mongoose';
import {IBase} from './Base.interface';
export interface IComment extends IBase {
  associatedIssue: Types.ObjectId;
  createdBy: Types.ObjectId;
  content: string;
}