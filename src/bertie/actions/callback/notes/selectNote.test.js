import expect from 'unexpected';
import moment from 'moment-timezone';
import selectNote from './selectNote';
import { User, Note } from '../../../../models';

describe('bertie callback action notes#selectNote', () => {
  let user;
  const forDate = moment.utc('2015-12-24 10:24');

  const createNotes = async (number) => {
    return Promise.all([... Array(number).keys()].map(async (_, i) => {
      const note = await Note.create({ user: user.id, forDate, text: `foobar ${i}` });
      return note._doc._id;
    }));
  };

  beforeEach(async () => {
    user = await User.create({ telegramId: 1234567890 }); 
    await createNotes(1);
  });

  it('returns a message which lists notes', async () => {
    const { message } = await selectNote(forDate.unix(), user);

    expect(message[0], 'to equal', 'notes.selectNote');
    expect(message[1].notes, 'to be ok');
  });

  describe('with less than 8 notes', () => {
    beforeEach(async () => { await createNotes(5); });

    it('returns numbered buttons in one row to select the note for deletion', async () => {
      const { buttons } = await selectNote(forDate.unix(), user);

      const texts = buttons[0].map((b) => b.text);

      expect(buttons, 'to be ok');
      expect(texts, 'to equal', ['1)', '2)', '3)', '4)', '5)', '6)']);
    });
  });

  describe('with more than 8 notes', () => {
    beforeEach(async () => { await createNotes(10); });

    it('returns numbered buttons in several rows to select the note for deletion', async () => {
      const { buttons } = await selectNote(forDate.unix(), user);

      const firstRowTexts = buttons[0].map((b) => b.text);
      const secondRowTexts = buttons[1].map((b) => b.text);

      expect(buttons, 'to be ok');
      expect(firstRowTexts, 'to equal', ['1)', '2)', '3)','4)', '5)', '6)', '7)', '8)']);
      expect(secondRowTexts, 'to equal', ['9)', '10)', '11)']);
    });
  });
});
