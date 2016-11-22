import expect from 'unexpected';
import overview from './overview';

describe('bertie callback action reminders#overview', () => {
  const userStub = { locale: 'en' };
  it('returns an explanation text on the two kinds of reminders', async () => {
    const { message } = await overview({}, userStub);

    expect(message, 'to equal', ['reminders.overview']);
  });

  it('returns buttons to manage daily reminders and log reminders', async () => {
    const { buttons } = await overview({}, userStub);
    const buttonsCallbackData = buttons.map(b => JSON.parse(b[0].callback_data));

    expect(buttons.length, 'to equal', 2);
    expect(buttonsCallbackData, 'to satisfy', [
        { t: 'reminders', s: 'mngLog' },
        { t: 'reminders', s: 'mngDaily' }
    ]);
  });
});
