import mongoose, { Schema } from 'mongoose';

const UserSchema = new Schema({
  telegramId:         { type: Number, default: null },
  createdAt:          { type: Date, default: Date.now },
  timezone:           { type: String, default: 'etc_utc' },
  locale:             { type: String, default: 'en' },
  latestDetectedData: {
    detectedAt: { type: String, default: null },
    data:       { type: Object, default: null }
  }
});

export default mongoose.model('User', UserSchema);
