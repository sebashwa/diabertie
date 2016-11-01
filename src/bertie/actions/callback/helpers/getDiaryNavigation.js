import { btnFactory, timeline } from '../../helpers';

export default (type, date) => {
  const tl = timeline(date);

  const buttons = [btnFactory[type].back(tl.unix.prevDay)];

  if (tl.str.today != date.format('YYYY-MM-DD')) {
    buttons.push(
      btnFactory[type].forward(tl.unix.nextDay),
      btnFactory[type].today(tl.unix.today)
    );
  }

  return { buttons };
};
