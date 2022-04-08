import {Types} from 'mongoose';

export interface IProject {
  associatedTeam: Types.ObjectId;
  projectName: string;
  description: string;
  projectType: string;  
  endDate: Date;
  colorCode?: string;
  tags: Array<string>;
}