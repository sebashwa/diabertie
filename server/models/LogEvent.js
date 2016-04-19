import mongoose, { Schema } from 'mongoose';

const LogEventSchema = new Schema({
  category:      String,
  unit:          String,
  value:         Number,
  originalUnit:  String,
  originalValue: Number,
  user:          { type: Schema.Types.ObjectId, ref: 'User' },
  createdAt:     { type: Date, default: Date.now },
});

LogEventSchema.static('groupInInterval', async function(datum, user, interval=5, callback) {
  const start = datum.clone().tz(user.timezone).startOf('day');
  const end = datum.clone().tz(user.timezone).endOf('day');

  const $match = {
    createdAt: {
      $gt: start.toDate(),
      $lt: end.toDate()
    },
    user: mongoose.Types.ObjectId(user.id)
  };

  const $project = {
    day:    { $dayOfYear: '$createdAt' },
    hour:   { $hour: '$createdAt' },
    minute: { $minute: '$createdAt' },
    entry:  '$$ROOT'
  };

  const $group = {
    _id: {
      minute: {
        $subtract: [ '$minute', { $mod: ['$minute', interval]} ]
      },
      hour: '$hour'
    },
    logEvents: { '$push': '$entry' }
  };

  const $sort = { day: -1, hour: -1, minute: -1 };

  return await this.aggregate([
    { $match }, { $project }, { $sort }, { $group }
  ]).exec(callback);
});

export default mongoose.model('LogEvent', LogEventSchema);
