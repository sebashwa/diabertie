import expect from 'unexpected';
import { connectBot } from './actions';
import User from '../models/User';

import mongoose from 'mongoose';
mongoose.connect('mongodb://localhost:27017/diabertie_test', (err) => { if (err) throw err; } );

describe('telegram actions', () => {
  describe('#connectBot', () => {
    const presentToken = 'PRESENT';

    beforeEach(() => {
      return User.create({
        email:         'present@user',
        telegramId:    null,
        telegramToken: presentToken
      });
    });

    afterEach(() => User.find({}).remove());

    it('updates the telegramId on the user', () => {
      return connectBot(presentToken, { id: 1234 }).then(() => {
        const user = User.findOne({ telegramToken: presentToken });
        return expect(user, 'when fulfilled', 'to have property',
          'telegramId', 1234);
      });
    });

    it('returns a "not found" text if no user is found', () => {
      const result = connectBot('NOT_PRESENT', { id: 10000 });

      return expect(result, 'when fulfilled', 'to contain',
        'I was not able to find a user');
    });

    it('informs the user when already connected with the same account', () => {
      const presentId = 99181;

      return User.findOneAndUpdate({ telegramToken: presentToken }, { telegramId: presentId }).then(() => {
        const result = connectBot(presentToken, { id: presentId });

        return expect(result, 'when fulfilled', 'to contain',
          'present@user seems to be connected already');
      });
    });

    it('informs the user when already connected with another account', () => {
      const alreadyConnectedId = 16661;
      const alreadyConnectedUserProps = {
        email:      'already@connected',
        telegramId: alreadyConnectedId
      };

      return User.create(alreadyConnectedUserProps).then(() => {
        const result = connectBot(presentToken, { id: alreadyConnectedId });

        return expect(result, 'when fulfilled', 'to contain',
          'already connected with the account already@connected');
      });
    });
  });
});
