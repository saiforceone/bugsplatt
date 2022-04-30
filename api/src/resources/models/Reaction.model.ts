import {model, Schema} from 'mongoose';
import { IReaction } from '../interfaces/Reaction.interface';

const reactionSchema = new Schema<IReaction>({
  associatedComment: {ref: 'Comment', required: true, type: Schema.Types.ObjectId},
  createdBy: {ref: 'UserProfile', required: true, type: Schema.Types.ObjectId},
  emoji: {required: true, trim: true, type: String},
}, {
  timestamps: true,
});

export default model<IReaction>('Reaction', reactionSchema);
