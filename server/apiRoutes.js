import app from './api';
import passport from 'passport';
import jwt from 'jsonwebtoken';
import { Router } from 'express';
import User from './models/User';

const router = Router();

router.post('/signup', (req, res) => {
  const { email, password, timezone } = req.body;
  const jwtoken = jwt.sign({ sub: email }, app.get('jwtSignature'), { expiresIn: '7d' });
  const telegramToken = Buffer(jwtoken, 'binary').toString('base64').slice(-65, -1);

  const user = new User({ email, telegramToken, timezone });

  User.register(user, password, (err, user) => {
    if (err) console.error(err);
    res.cookie('jwtoken', jwtoken);
    res.json(user);
  });
});

router.post('/logout', passport.authenticate('jwt', { session: false }), (req, res) => {
  res.cookie('jwtoken', null);
  res.sendStatus(200);
});

router.post('/login', passport.authenticate('local', { session: false }), (req, res) => {
  const token = jwt.sign({ sub: req.user.email }, app.get('jwtSignature'), { expiresIn: '7d' });

  res.cookie('jwtoken', token);
  res.json(req.user);
});

router.get('/users/current', passport.authenticate('jwt', { session: false }), (req, res) => {
  res.json(req.user);
});

export default router;
