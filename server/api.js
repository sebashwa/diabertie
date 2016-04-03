import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import passport from 'passport';
import { Strategy as JwtStrategy } from 'passport-jwt';
import mongoose from 'mongoose';
import TelegramBot from 'node-telegram-bot-api';
import bearDiabertie from './telegram';

import apiRoutes from './apiRoutes';
import User from './models/User';

const app = express();


app.use(cookieParser());
app.use(cors({ origin: 'http://localhost:3000',  credentials: true }));
app.use(bodyParser.json());
app.use(passport.initialize());

app.set('jwtSignature', process.env.JWT_SIGNATURE);

passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

const cookieExtractor = (req) => {
  if (req && req.cookies) { return req.cookies.jwtoken; }
  return null;
};

const jwtStrategyOpts = {
  jwtFromRequest: cookieExtractor,
  secretOrKey:    app.get('jwtSignature')
};

passport.use(new JwtStrategy(jwtStrategyOpts, (jwt, done) => {
  User.findOne({ email: jwt.sub }, (err, user) => {
    if (err) { return done(err); }
    if (!user) { return done(null, false); }
    return done(null, user);
  });
}));

mongoose.connect(process.env.MONGO_DB_URL, (err) => {
  if (err) console.log('Could not connect to mongodb.');
});

app.use('/api', apiRoutes);

const bot = new TelegramBot(process.env.TELEGRAM_API_KEY, { polling: true });
bearDiabertie(bot);

export default app;
