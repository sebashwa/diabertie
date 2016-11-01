import moment from 'moment-timezone';

export default async ({ d }, user) => {
  const { timezone } = user;

  if (d) {
    try {
      const data = { type: 'setTimezone' };
      await user.update({ latestDetectedData: { data, detectedAt: moment().unix() } });
      return { message: ['setTimezone.requestLocation', { timezone }] };
    } catch (e) {
      return { message: ['generalErrors.superWrong'] };
    };
  } else {
    return { message: ['setTimezone.notSet', { timezone }] };
  }
};

