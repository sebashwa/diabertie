import expect from 'unexpected';
import { connectBot, detectValues, saveEvents } from './actions';
import { User, Event } from '../models';

import mongoose from 'mongoose';
mongoose.connect('mongodb://localhost:27017/diabertie_test', (err) => { if (err) throw err; } );

describe('telegram actions', () => {
  describe('#connectBot', () => {
    const userToken = 'PRESENT';

    beforeEach(() => (
      User.create({
        email:         'present@user',
        telegramId:    null,
        telegramToken: userToken
      })
    ));

    afterEach(() => User.find({}).remove());

    it('updates the telegramId on the user', async () => {
      await connectBot(userToken, { id: 1234 });

      const user = User.findOne({ telegramToken: userToken });
      return expect(user, 'when fulfilled', 'to have property', 'telegramId', 1234);
    });

    it('returns a "not found" text if no user is found', async () => {
      const result = await connectBot('NOT_PRESENT', { id: 10000 });

      expect(result, 'to contain', 'I was not able to find a user');
    });

    it('informs the user when already connected with the same account', async () => {
      const presentId = 99181;
      await User.findOneAndUpdate({ telegramToken: userToken }, { telegramId: presentId });

      const result = await connectBot(userToken, { id: presentId });

      expect(result, 'to contain', '`present@user` is already connected');
    });

    it('informs the user when already connected with another account', async () => {
      const alreadyConnectedId = 16661;
      const alreadyConnectedUserProps = {
        email:      'already@connected',
        telegramId: alreadyConnectedId
      };

      await User.create(alreadyConnectedUserProps);
      const result = await connectBot(userToken, { id: alreadyConnectedId });

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
    const userId = 123456;

    beforeEach(async () => {
      await User.create({ email: 'user@savesEvents', telegramId: userId });
    });

    const detections = {
      sugar:   [{ value: 120, category: 'sugar', type: 'sugarMmol', subType: 'sugarMg', factor: 0.0555 }],
      therapy: [{ value: 4, category: 'therapy', type: 'bolusInsulin', subType: 'humalog', factor: null }],
      food:    [{ value: 2, category: 'food', type: 'carbs', subType: 'be', factor: 12 }]
    };

    afterEach(async () => {
      await Event.find({}).remove();
      await User.find({}).remove();
    });

    it('saves events to the database', async () => {
      await saveEvents(detections, userId);

      const eventModels = await Event.find({}, null, { sort: 'category' });
      const events = eventModels.map(m => m.toObject());

      expect(events, 'to satisfy', [
        { category: 'food', originalUnit: 'be', unit: 'carbs', originalValue: 2, value: 24 },
        { category: 'sugar', originalUnit: 'sugarMg', unit: 'sugarMmol', originalValue: 120, value: 6.659999847412109 },
        { category: 'therapy', originalUnit: 'humalog', unit: 'bolusInsulin', originalValue: 4 , value: 4 }
      ]);
    });

    it('assigns the User to the events', async () => {
      await saveEvents(detections, userId);

      const event = await Event.findOne({ value: 24 }).populate('user');

      expect(event.user.email, 'to equal', 'user@savesEvents');
    });

    it('returns a message after saving the data', async () => {
      const reply = await saveEvents(detections, userId);
      expect(reply, 'to contain', 'saved your data');
    });
  });
});
