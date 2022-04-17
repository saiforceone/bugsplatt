import {Document} from 'mongoose';
export interface IBase extends Document {
  __t?: string,
}