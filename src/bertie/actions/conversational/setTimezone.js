import fetch from 'node-fetch';
import moment from 'moment-timezone';

const urlParams = (params) => {
  const paramsString = Object.keys(params).map((k) => `${k}=${params[k]}`).join('&');
  return `?${paramsString}`;
};

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

    await user.update({ timezone: timeZoneId, latestDetectedData: { data: null, detectedAt: null } });

    return { message: ['setTimezone.success', { timeZoneId }] };
  } catch (e) {
    return { message: ['generalErrors.superWrong'] };
  }
};
