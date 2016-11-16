import mongoose, { Schema } from 'mongoose';
import moment from 'moment-timezone';

const ReminderSchema = new Schema({
  atMinute:       { type: Number },
  type:           { type: String }, // daily or log
  text:           { type: String },
  lastExecutedAt: { type: Date },
  createdAt:      { type: Date, default: Date.now },
  user:           { type: Schema.Types.ObjectId, ref: 'User' },
});

ReminderSchema.static('addReminder', async function({ hour, minute }, type, text, user, lastExecutedAt) {
  const at = moment.tz({ hour, minute }, user.timezone).tz('etc_utc');
  const atMinute = at.hours() * 60 + at.minutes();
  const query = { type, user: user.id, text, lastExecutedAt };

  return await this.findOneAndUpdate(query, {...query, atMinute }, { upsert: true });
});

export default mongoose.model('Reminder', ReminderSchema);
