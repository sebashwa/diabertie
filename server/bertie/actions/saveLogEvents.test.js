import expect from 'unexpected';
import saveLogEvents from './saveLogEvents';
import { User, LogEvent } from '../../models';

describe('bertie action #storeLogEvents', () => {
  const userId = 123456;

  beforeEach(async () => {
    await User.create({
      email:      'user@savesLogEvents',
      timezone:   'Europe/Berlin',
      telegramId: userId
    });
  });

  const detections = {
    values: {
      sugar:   [{ value: 120, category: 'sugar', type: 'sugarMmol', subType: 'sugarMg', factor: 0.0555 }],
      therapy: [{ value: 4, category: 'therapy', type: 'bolusInsulin', subType: 'humalog', factor: null }],
      food:    [{ value: 2, category: 'food', type: 'carbs', subType: 'be', factor: 12 }]
    },
    date: { year: 2014, month: 2, date: 21 },
    time: { hour: 16, minute: 20 }
  };

  afterEach(async () => {
    await LogEvent.find({}).remove();
    await User.find({}).remove();
  });

  it('saves events to the database', async () => {
    await saveLogEvents(detections, userId);

    const eventModels = await LogEvent.find({}, null, { sort: 'category' });
    const events = eventModels.map(m => m.toObject());

    expect(events, 'to satisfy', [
      { category: 'food', originalUnit: 'be', unit: 'carbs', originalValue: 2, value: 24 },
      { category: 'sugar', originalUnit: 'sugarMg', unit: 'sugarMmol', originalValue: 120, value: 6.659999847412109 },
      { category: 'therapy', originalUnit: 'humalog', unit: 'bolusInsulin', originalValue: 4 , value: 4 }
    ]);

  });

  it(`takes the user's timezone into account for created at`, async () => {
    await saveLogEvents(detections, userId);
    const eventModel = await LogEvent.findOne();
    const createdAt = eventModel.toObject().createdAt;

    expect(createdAt.getMonth(), 'to equal', 2);
    expect(createdAt.getFullYear(), 'to equal', 2014);
    expect(createdAt.getDate(), 'to equal', 21);
    expect(createdAt.getUTCHours(), 'to equal', 15);
    expect(createdAt.getMinutes(), 'to equal', 20);
  });

  it('assigns the User to the events', async () => {
    await saveLogEvents(detections, userId);

    const event = await LogEvent.findOne({ value: 24 }).populate('user');

    expect(event.user.email, 'to equal', 'user@savesLogEvents');
  });

  it('returns a message after saving the data', async () => {
    const reply = await saveLogEvents(detections, userId);
    expect(reply, 'to contain', 'saved your data');
  });
});
