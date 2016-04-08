import mongoose, { Schema } from 'mongoose';
import passportLocalMongoose from 'passport-local-mongoose';

const UserSchema = new Schema({
  telegramToken: String,
  telegramId:    { type: Number, default: null },
  createdAt:     { type: Date, default: Date.now },
  timezone:      { type: String, default: 'etc_utc' }
});

UserSchema.method('toJSON', function() {
  var user = this.toObject();
  delete user.salt;
  delete user.hash;
  delete user.__v;
  return user;
});

UserSchema.plugin(passportLocalMongoose, { usernameField: 'email' });

export default mongoose.model('User', UserSchema);
