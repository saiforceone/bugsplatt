import {Types} from "mongoose";
import { IBase } from "./Base.interface";

export interface IReportedProblem extends IBase {
  createdBy: Types.ObjectId;
  content: string;
  problemType: string;
  problemStatus: string;
}