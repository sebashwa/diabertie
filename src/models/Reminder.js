import mongoose, { Schema } from 'mongoose';
import moment from 'moment-timezone';

const ReminderSchema = new Schema({
  atMinute:       { type: Number },
  type:           { type: String }, // daily or log
  text:           { type: String, default: '' },
  lastExecutedAt: { type: Date },
  createdAt:      { type: Date, default: Date.now },
  user:           { type: Schema.Types.ObjectId, ref: 'User' },
});

ReminderSchema.static('addReminder', async function({ hour, minute }, type, text, user, lastExecuted) {
  const at = moment.tz({ hour, minute }, user.timezone).tz('etc_utc');
  const atMinute = at.hours() * 60 + at.minutes();
  const query = { type, user: user.id, text };

  const lastExecutedAt = lastExecuted ? lastExecuted : moment().tz(user.timezone).subtract(1, 'days');

  return await this.findOneAndUpdate(query, {...query, atMinute, lastExecutedAt }, { upsert: true });
});

export default mongoose.model('Reminder', ReminderSchema);
