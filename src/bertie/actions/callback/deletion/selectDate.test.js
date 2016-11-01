import expect from 'unexpected';
import moment from 'moment-timezone';
import selectDate from './selectDate';
import { User, LogEvent } from '../../../../models';

describe('bertie callback action deletion#selectDate', () => {
  let user;
  const createdAt = moment.utc('2015-12-24 10:24');

  beforeEach(async () => {
    user = await User.create({ telegramId: 1234567890 });
    await LogEvent.create({ user: user.id, createdAt, category: 'sugar', unit: 'sugarMmol', value: 6.66, originalUnit: 'sugarMg', originalValue: 120 });
  });

  describe('with data available', () => {
    it('returns navigation buttons with a select button included', async () => {
      const { buttons } = await selectDate(createdAt.unix(), user);

      expect(buttons, 'to be ok');
      expect(JSON.parse(buttons[1][0].callback_data).s, 'to equal', 'selVal');
    });

    it('returns a message which lists data', async () => {
      const { message } = await selectDate(createdAt.unix(), user);

      expect(message[0], 'to equal', 'deletion.selectDate.data');
      expect(message[1].values, 'to be ok');
      expect(message[1].date, 'to be ok');
    });
  });

  describe('with no data available', () => {
    it('returns navigation buttons without a select button', async () => {
      const { buttons } = await selectDate(moment.utc(), user);

      const buttonSubtypes = buttons.reduce((p, c) => p.concat(c), []).map(b => JSON.parse(b.callback_data).s);

      expect(buttonSubtypes, 'to contain', 'selDate');
      expect(buttonSubtypes, 'not to contain', 'selVal');
    });

    it('returns a message saying that no data is found', async () => {
      const { message } = await selectDate(moment.utc(), user);

      expect(message[0], 'to equal', 'deletion.selectDate.noData');
    });
  });
});
