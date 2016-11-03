import expect from 'unexpected';
import moment from 'moment-timezone';
import selectDate from './selectDate';
import { User, Note } from '../../../../models';

describe('bertie callback action notes#selectDate', () => {
  let user;
  const forDate = moment.utc('2015-12-24 10:24');

  beforeEach(async () => {
    user = await User.create({ telegramId: 1234567890 });
    await Note.create({ user: user.id, forDate, text: 'Today I feel very dizzy' });
  });

  describe('with note already available', () => {
    it('returns navigation buttons with an "Add Note" and a "Delete Note" button included', async () => {
      const { buttons } = await selectDate(forDate.unix(), user);

      expect(buttons, 'to be ok');
      expect(JSON.parse(buttons[1][0].callback_data).s, 'to equal', 'addNote');
      expect(JSON.parse(buttons[1][1].callback_data).s, 'to equal', 'selNote');
    });

    it('returns a message which lists notes', async () => {
      const { message } = await selectDate(forDate.unix(), user);

      expect(message[0], 'to equal', 'notes.selectDate.data');
      expect(message[1].notes, 'to be ok');
    });
  });

  describe('without a note already available', () => {
    it('does not render a "Delete Note" button', async () => {
      const { buttons } = await selectDate(moment().unix(), user);

      const buttonSubtypes = buttons.reduce((p, c) => p.concat(c), []).map(b => JSON.parse(b.callback_data).s);

      expect(buttonSubtypes, 'to contain', 'addNote');
      expect(buttonSubtypes, 'to contain', 'selDate');
      expect(buttonSubtypes, 'not to contain', 'selNote');
    });
  });
});
