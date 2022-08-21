import {model, Schema} from "mongoose";
import { IHelpContent } from "../interfaces/HelpContent.interface";

const HelpContentSchema = new Schema<IHelpContent>({
  title: {type: String, trim: true, required: true},
  content: {type: String, trim: true, required: true},
}, {
  timestamps: true
});

export default model<IHelpContent>('HelpContent', HelpContentSchema);
