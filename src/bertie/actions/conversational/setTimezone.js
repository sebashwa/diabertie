import { fetch } from '../../lib/fetch';
import moment from 'moment-timezone';
import { Reminder } from '../../../models';

function urlParams(params) {
  const paramsString = Object.keys(params).map((k) => `${k}=${params[k]}`).join('&');
  return `?${paramsString}`;
};

async function updateRemindersTimezone(reminders, oldTimezone, newTimezone) {
  await Promise.all(reminders.map((r) => {
      const hours = Math.floor(r.atMinute / 60);
      const minutes = r.atMinute - hours * 60;
      const oldTime = moment.tz({ hours, minutes }, 'etc_utc').tz(oldTimezone);

      const newTime = moment.tz({ hours: oldTime.hours(), minutes: oldTime.minutes() }, newTimezone).tz('etc_utc');
      const atMinute = newTime.hours() * 60 + newTime.minutes();

      return Reminder.findByIdAndUpdate(r._id, { atMinute });
  }));
}

export default async (address, user) => {
  try {
    const { FETCH_LOCATION_URL, FETCH_TIMEZONE_URL } = process.env;

    const locationParams = urlParams({ address, sensor: false });
    const { results } = await fetch(FETCH_LOCATION_URL + locationParams).then(r => r.json());
    if (!results || !results.length) { return { message: ['setTimezone.noLocation'] }; }

    const { lat, lng } = results[0].geometry.location;

    const timezoneParams = urlParams({ location: `${lat},${lng}`, timestamp: moment().unix(), sensor: false });
    const { timeZoneId } = await fetch(FETCH_TIMEZONE_URL + timezoneParams).then(r => r.json());
    if (!timeZoneId) { return { message: ['setTimezone.noTimezone'] }; }

    const reminders = await Reminder.find({ user: user.id });
    await updateRemindersTimezone(reminders, user.timezone, timeZoneId);

    await user.update({ timezone: timeZoneId, latestDetectedData: { data: null, detectedAt: null } });

    return { message: ['setTimezone.success', { timeZoneId }] };
  } catch (e) {
    return { message: ['generalErrors.superWrong'] };
  }
};
