import { User, LogEvent } from '.';
import expect from 'unexpected';
import moment from 'moment-timezone';
import { Types } from 'mongoose';


describe('LogEvent', () => {
  describe('#groupInInterval', () => {
    let time;

    let logEventTimePlusSix,
        logEventTime,
        logEventTimePlusTwo,
        logEventDifferentDay,
        logEventDifferentUser;

    let user;

    beforeEach(async () => {
      user = await User.create({ email: 'true@user', timezone: 'Europe/Berlin' });
      time = moment.utc('02-05-2015 22:15', 'MM-DD-YYYY HH:mm').tz(user.timezone);

      logEventTime = await LogEvent.create({ createdAt: time, user: user.id});
      logEventTimePlusTwo = await LogEvent.create({ createdAt: time.clone().add(2, 'minutes'), user: user.id });
      logEventTimePlusSix = await LogEvent.create({ createdAt: time.clone().add(6, 'minutes'), user: user.id });

      logEventDifferentDay = await LogEvent.create({ createdAt: time.clone().add(-1, 'day'), user: user.id });
      const anotherUser = await User.create({ email: 'someone@else' });
      logEventDifferentUser = await LogEvent.create({ createdAt: time.clone(), user: anotherUser.id });
    });

    it('groups logEvents in the given interval', async () => {
      const aggregation = await LogEvent.groupInInterval(time, user, 15);

      expect(aggregation, 'to satisfy',
        [{ _id: { hour: 22, minute: 15 }, logEvents: Array }]
      );

      expect(aggregation[0].logEvents.map(e => e._id), 'to equal', [
        Types.ObjectId(logEventTime.id),
        Types.ObjectId(logEventTimePlusTwo.id),
        Types.ObjectId(logEventTimePlusSix.id),
      ]);
    });

    it('scopes the aggregation to the given user', async () => {
      const aggregation = await LogEvent.groupInInterval(time, user, 15);

      expect(aggregation[0].logEvents.map(e => e._id), 'not to contain',
        Types.ObjectId(logEventDifferentUser.id)
      );
    });

    it('scopes the aggregation to the given day', async () => {
      const aggregation = await LogEvent.groupInInterval(time, user, 15);

      expect(aggregation[0].logEvents.map(e => e._id), 'not to contain',
        Types.ObjectId(logEventDifferentDay.id)
      );
    });

    it('groups logEvents in intervals of 5 minutes per default', async () => {
      const aggregation = await LogEvent.groupInInterval(time, user);

      expect(aggregation, 'to satisfy', [
        { _id: { hour: 22, minute: 15 }, logEvents: Array },
        { _id: { hour: 22, minute: 20 }, logEvents: Array }
      ]);

      expect(aggregation[0].logEvents.map(e => e._id), 'to equal', [
        Types.ObjectId(logEventTime.id),
        Types.ObjectId(logEventTimePlusTwo.id)
      ]);

      expect(aggregation[1].logEvents.map(e => e._id), 'to equal', [
        Types.ObjectId(logEventTimePlusSix.id)
      ]);
    });
  });
});
