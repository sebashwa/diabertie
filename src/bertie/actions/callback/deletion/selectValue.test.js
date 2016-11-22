import expect from 'unexpected';
import moment from 'moment-timezone';
import selectValue from './selectValue';
import { User, LogEvent } from '../../../../models';

describe('bertie callback action deletion#selectValue', () => {
  let user;
  const createdAt = moment.utc('2015-12-24 10:24');

  const createLogEvents = async (number) => {
    return Promise.all([... Array(number).keys()].map(async () => {
      const logEvent = await LogEvent.create({ user: user.id, createdAt, category: 'sugar', unit: 'sugarMmol', value: 6.66, originalUnit: 'sugarMg', originalValue: 120 });
      return logEvent._doc._id;
    }));
  };

  beforeEach(async () => user = await User.create({ telegramId: 1234567890 }));

  describe('with less than 8 log events', () => {
    beforeEach(async () => await createLogEvents(5));

    it('generates buttons for each available logEvent', async () => {
      const { buttons } = await selectValue(createdAt.unix(), user);
      const buttonSubtypes = buttons[0].map(b => JSON.parse(b.callback_data).s);

      expect(buttons[0], 'to be ok');
      expect(buttons[0].length, 'to be', 5);
      expect(buttonSubtypes, 'to equal', ['delVal','delVal','delVal','delVal','delVal']);
    });
  });

  describe('with more than 8 log events', () => {
    beforeEach(async () => await createLogEvents(17));

    it('splits the buttons to several rows (because telegram only allows 8 buttons per row)', async () => {
      const { buttons } = await selectValue(createdAt.unix(), user);

      expect(buttons[0], 'to be ok');
      expect(buttons[1], 'to be ok');
      expect(buttons[2], 'to be ok');
      expect(buttons[0].length, 'to be', 8);
      expect(buttons[1].length, 'to be', 8);
      expect(buttons[2].length, 'to be', 1);
    });
  });

});
