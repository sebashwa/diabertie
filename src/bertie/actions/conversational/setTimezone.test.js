import expect from 'unexpected';
import setTimezone from './setTimezone';
import { User, Reminder } from '../../../models';

import * as nodeFetch from '../../lib/fetch';
import sinon from 'sinon';


sinon.stub(nodeFetch, 'fetch', () => {
  return new Promise((res) => {
    const json = () => {
      return {
        results:    [ { geometry: { location: { lat: 'SOME_LAT', lng: 'SOME_LNG' } } } ],
        timeZoneId: 'Europe/Berlin'
      };
    };

    res({ json });
  });
});

describe('conversational action #setTimezone', () => {
  let user;
  beforeEach(async () => user = await User.create({ telegramId: 123456789, timezone: 'etc_utc' }));

  it('sets the timezone on user', async () => {
    await setTimezone('berlin', user);
    const { timezone } = await User.findById(user.id);

    expect(timezone, 'to equal', 'Europe/Berlin');
  });

  it('deletes latestDetectedData on user', async () => {
    await setTimezone('berlin', user);
    const { _doc } = await User.findById(user.id);

    expect(_doc.latestDetectedData, 'to equal', { data: null, detectedAt: null });
  });

  it('updates all reminders to the new timezone', async () => {
    const reminder = await Reminder.create({ user: user.id, atMinute: 1200 });

    await setTimezone('berlin', user);

    const { atMinute } = await Reminder.findById(reminder.id);
    expect(atMinute, 'to equal', 1080);
  });
});
