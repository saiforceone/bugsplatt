import {Types} from 'mongoose';
import { IBase } from './Base.interface';

export interface IIssue extends IBase {
  createdBy: Types.ObjectId;
  associatedProject: Types.ObjectId;
  assignedTo: Types.ObjectId;
  expectedCloseDate?: Date;
  title: string;
  description: string;
  tags: Array<string>;
  watchedBy: Array<Types.ObjectId>;
  status: string;
  priority: string;
}