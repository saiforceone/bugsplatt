import {Types} from 'mongoose';
import { IBase } from './Base.interface';

export interface IProject extends IBase {
  associatedTeam: Types.ObjectId;
  projectName: string;
  description: string;
  projectType: string;  
  endDate: Date;
  colorCode?: string;
  tags: Array<string>;
  createdBy: Types.ObjectId;
}