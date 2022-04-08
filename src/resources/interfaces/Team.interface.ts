import {Types} from 'mongoose';

export interface ITeam {
  managedBy: Types.ObjectId;
  teamName: string;
  teamMembers: Array<Types.ObjectId>;
  teamDescription: string;
  teamImage: string;
}
