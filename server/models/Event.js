import mongoose, { Schema } from 'mongoose';

const EventSchema = new Schema({
  category:      String,
  unit:          String,
  value:         Number,
  originalUnit:  String,
  originalValue: Number,
  user:          { type: Schema.Types.ObjectId, ref: 'User' },
  createdAt:     { type: Date, default: Date.now },
});

export default mongoose.model('Event', EventSchema);
