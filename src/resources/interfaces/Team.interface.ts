import {Types} from 'mongoose';
import { IBase } from './Base.interface';

export interface ITeam extends IBase {
  managedBy: Types.ObjectId;
  teamName: string;
  teamMembers: Array<Types.ObjectId>;
  teamDescription: string;
  teamImage: string;
}
