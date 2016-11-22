import mongoose, { Schema } from 'mongoose';

const NoteSchema = new Schema({
  text:      { type: String },
  forDate:   { type: Date },
  createdAt: { type: Date, default: Date.now },
  timezone:  { type: String, default: 'etc_utc' },
  user:      { type: Schema.Types.ObjectId, ref: 'User' },
});

export default mongoose.model('Note', NoteSchema);
