import * as models from './models';
import mongoose from 'mongoose';


before(async () => {
  mongoose.Promise = global.Promise;
  await mongoose.connect('mongodb://localhost:27017/diabertie_test', (err) => { if (err) throw err; } );
  await Promise.all(
    Object.keys(models).map(m => models[m].find({}).remove())
  );
});

afterEach(async () =>
  Promise.all(
    Object.keys(models).map(m => models[m].find({}).remove())
  )
);
