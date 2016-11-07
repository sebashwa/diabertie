import mongoose, { Schema } from 'mongoose';

const ReminderSchema = new Schema({
  atMinute:       { type: Number },
  type:           { type: String },
  text:           { type: String },
  lastExecutedAt: { type: Date },
  createdAt:      { type: Date, default: Date.now },
  user:           { type: Schema.Types.ObjectId, ref: 'User' },
});

export default mongoose.model('Reminder', ReminderSchema);
