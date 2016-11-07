import { btnFactory, timeline } from '../../helpers';
import moment from 'moment-timezone';

export default (type, date, user) => {
  const localDate = moment.tz(date, user.timezone);
  const tl = timeline(user, localDate);

  const buttons = [btnFactory[type].back(tl.unix.prevDay)];

  if (tl.str.today != date.format('YYYY-MM-DD')) {
    buttons.push(
      btnFactory[type].forward(tl.unix.nextDay),
      btnFactory[type].today(tl.unix.today)
    );
  }

  return { buttons };
};
