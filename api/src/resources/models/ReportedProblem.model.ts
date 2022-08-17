import {model, Schema} from "mongoose";
import mongooseAutoPopulate from "mongoose-autopopulate";

import { IReportedProblem } from "../interfaces/ReportedProblem.interface";

const reportedProblemSchema = new Schema<IReportedProblem>({
  createdBy: {ref: 'UserProfile', type: Schema.Types.ObjectId, required: true, autopopulate: true},
  content: {type: String, trim: true, required: true},
  problemStatus: {type: String, trim: true, default: 'open', required: true},
  problemType: {type: String, trim: true, required: true},
}, {
  timestamps: true
});

reportedProblemSchema.plugin(mongooseAutoPopulate);

export default model<IReportedProblem>('ReportedProblem', reportedProblemSchema);
