import {Types} from 'mongoose';
import { IBase } from './Base.interface';

export interface IReaction extends IBase {
  associatedComment: Types.ObjectId;
  createdBy: Types.ObjectId;
  emoji: string;
}
