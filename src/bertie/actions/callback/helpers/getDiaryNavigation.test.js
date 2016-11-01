import expect from 'unexpected';
import moment from 'moment-timezone';
import { getDiaryNavigation } from '.';
import { User } from '../../../../models';

describe('bertie action #getDiaryNavigation', () => {
  let user;

  beforeEach(async () => {
    user = await User.create({
      telegramId: 1234567890,
      timezone:   'Europe/Berlin',
    });

    return user;
  });

  it('returns a back button if requested date is current day', () => {
    const today = moment.utc().tz(user.timezone);
    const { buttons } = getDiaryNavigation('navigateDiary', today);

    expect(buttons.length, 'to equal', 1);
    expect(buttons[0].text, 'to equal', '<<');
  });

  it('returns a back, forward and today button if requested date is not current day', () => {
    const today = moment.utc().tz(user.timezone);
    const yesterday = today.clone().subtract(1, 'days');

    const { buttons } = getDiaryNavigation('navigateDiary', yesterday);

    expect(buttons.length, 'to equal', 3);
    expect(buttons.map((b) => b.text), 'to equal', ['<<', '>>', 'today']);
  });
});
