import {Types} from 'mongoose';

export interface IIssue {
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