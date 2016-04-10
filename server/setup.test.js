import mongoose from 'mongoose';
mongoose.connect('mongodb://localhost:27017/diabertie_test', (err) => { if (err) throw err; } );
