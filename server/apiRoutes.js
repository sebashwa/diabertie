import app from './api';
import passport from 'passport';
import jwt from 'jsonwebtoken';
import { Router } from 'express';
import { Event, User } from './models';
import moment from 'moment-timezone';

const router = Router();

router.post('/signup', (req, res) => {
  const { email, password, timezone } = req.body;
  const jwtoken = jwt.sign({ sub: email }, app.get('jwtSignature'), { expiresIn: '7d' });
  const telegramToken = Buffer(jwtoken, 'binary').toString('base64').slice(-65, -1);

  const user = new User({ email, telegramToken, timezone });

  User.register(user, password, (err, user) => {
    if (err) {
      console.error(err);
      res.status(409);
      res.json({ name: err.name });
    } else {
      res.cookie('jwtoken', jwtoken);
      res.json(user);
    }
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

router.get('/events/:datum', passport.authenticate('jwt', { session: false }), async (req, res) => {
  const { params, user } = req;
  const datum = moment(params.datum, 'MM-DD-YYYY').tz(user.timezone);

  const events = await Event.find({
    $and: [
      { createdAt: { $gte: datum.startOf('day').toISOString() } },
      { createdAt: { $lte: datum.endOf('day').toISOString() } },
    ],
    user: user.id
  });

  res.json(events);
});

export default router;
