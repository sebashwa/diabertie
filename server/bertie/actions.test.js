import expect from 'unexpected';
import { connectBot, detectValues } from './actions';
import User from '../models/User';

import mongoose from 'mongoose';
mongoose.connect('mongodb://localhost:27017/diabertie_test', (err) => { if (err) throw err; } );

describe('telegram actions', () => {
  describe('#connectBot', () => {
    const presentToken = 'PRESENT';

    beforeEach(() => (
      User.create({
        email:         'present@user',
        telegramId:    null,
        telegramToken: presentToken
      })
    ));

    afterEach(() => User.find({}).remove());

    it('updates the telegramId on the user', async () => {
      await connectBot(presentToken, { id: 1234 });

      const user = User.findOne({ telegramToken: presentToken });
      return expect(user, 'when fulfilled', 'to have property', 'telegramId', 1234);
    });

    it('returns a "not found" text if no user is found', async () => {
      const result = await connectBot('NOT_PRESENT', { id: 10000 });

      expect(result, 'to contain', 'I was not able to find a user');
    });

    it('informs the user when already connected with the same account', async () => {
      const presentId = 99181;
      await User.findOneAndUpdate({ telegramToken: presentToken }, { telegramId: presentId });

      const result = await connectBot(presentToken, { id: presentId });

      expect(result, 'to contain', '`present@user` is already connected');
    });

    it('informs the user when already connected with another account', async () => {
      const alreadyConnectedId = 16661;
      const alreadyConnectedUserProps = {
        email:      'already@connected',
        telegramId: alreadyConnectedId
      };

      await User.create(alreadyConnectedUserProps);
      const result = await connectBot(presentToken, { id: alreadyConnectedId });

      expect(result, 'to contain', 'already connected with the account `already@connected`');
    });
  });

  describe('#detectValues', () => {
    it('extracts data from the given string', async () => {
      const { data } = await detectValues('120 mg 2 be 4 hum 27 lantus');

      expect(data, 'to equal', {
        sugar: [
          { value: 120, category: 'sugar', type: 'sugarMmol', subType: 'sugarMg', factor: 0.0555 }
        ],
        therapy: [
          { value: 4, category: 'therapy', type: 'bolusInsulin', subType: 'humalog', factor: null},
          { value: 27, category: 'therapy', type: 'basisInsulin', subType: 'lantus', factor: null}
        ],
        food: [{ value: 2, category: 'food', type: 'carbs', subType: 'be', factor: 12 }]
      });
    });

    it('generates a message from the detections', async () => {
      const { messages } = await detectValues('120 mg 2 be 4 hum 27 lantus');

      expect(messages[0], 'to equal', '`120 sugarMg`\n`2 be`\n`4 humalog`, `27 lantus`');
    });

    it('generates a confirmation message', async () => {
      const { messages } = await detectValues('120 mg 2 be 4 hum 27 lantus');

      expect(messages[1], 'to contain', 'save that?');
    });

    it('returns an error when delivering a message with no detectable values', async () => {
      const { errors } = await detectValues('bertie does not understand');

      expect(errors[0], 'to contain', 'Sorry, I didn\'t get that');
    });

    it('returns a warning when delivering two sugar values', async () => {
      const { warnings } = await detectValues('120 mg 7 mmol');

      expect(warnings[0], 'to contain', 'I found more than one `sugar` value');
    });
  });

  describe('#storeEvents', () => {
    context('when parent type is not given', () => {
      xit('uses the detection type on stored events', () => {

      });
    });
  });
});
