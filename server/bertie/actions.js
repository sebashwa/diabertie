import { User, Event } from '../models';
import knwl from './knwl';
import moment from 'moment-timezone';
import unitsBy from './knwl/units';

export const connectBot = async (telegramToken, sender) => {
  const telegramId = sender.id;

  try {
    const users = await User.find({ $or: [{ telegramToken }, { telegramId }] });

    if (!users.length) {
      return 'Oops! I was not able to find a user. Please sign up at diabertie.com first and connect from there';
    } else if (users.length > 1) {
      const connectedUser = users.filter(u => !!u.telegramId)[0];
      return `Sorry, you are already connected with the account \`${connectedUser.email}\``;
    } else if (!users[0].telegramId) {
      await users[0].update({ telegramId });
      return `Hey ${sender.first_name}, I connected you with your diabertie account \`${users[0].email}\` Glad to have you on board!`;
    } else {
      return `Your account \`${users[0].email}\` is already connected. Just go ahead and log some values!`;
    }
  } catch (e) {
    console.log(e);
    return 'Oops, sorry! Something went completely wrong.. Please try again later';
  }
};

const previewTexts = (events) => events.map(e => `\`${e.value} ${e.subType || e.type}\``).join(', ');

function validateDetections({ sugar, therapy, food }) {
  const all = [... sugar, ... therapy, ... food];
  const errors = [];
  const warnings = [];

  if (all.length == 0) { errors.push('Sorry, I didn\'t get that! To track values, please write something like:\n\n`190 mg 2 bolus 27 basal 12:30`'); };
  if (sugar.length > 1) { warnings.push(`Oops, that's strange.. I found more than one \`sugar\` value:\n\n${previewTexts(sugar)}`); }

  return { errors, warnings };
}

export const bertieDetect = (text) => {
  return new Promise((resolve) => {
    const parser = knwl(text);
    const types = ['sugar', 'food', 'therapy'];

    const detectedValues = types.reduce((prev, type) => {
      prev[type] = parser.get('bertieValues', unitsBy(type));
      return prev;
    }, {});
    const detectedDate = parser.get('bertieDates')[0];
    const detectedTime = parser.get('bertieTimes')[0];

    const { errors, warnings } = validateDetections(detectedValues);
    if (errors.length) return resolve({ errors });

    const detectionsMsg = types.filter(type => !!detectedValues[type].length)
      .map((type) => `${previewTexts(detectedValues[type])}`)
      .join('\n');

    const messages = [detectionsMsg, `Do you want me to save that? (y/n)`];
    const data = { values: detectedValues, time: detectedTime, date: detectedDate };

    return resolve({ data, messages, warnings });
  });
};

export const saveEvents = async (detections, telegramId) => {
  const { date, time, values } = detections;
  const allValues = [].concat(... Object.values(values));

  try {
    const user = await User.findOne({ telegramId });
    const createdAt = moment.utc().tz(user.timezone);
    const setTimestampValues = (values, type) => {
      values.forEach((v) => createdAt.set(v, type[v]));
    };

    if(date) { setTimestampValues(['year', 'month', 'date'], date); }
    if(time) { setTimestampValues(['hour', 'minute'], time); }

    const events = allValues.map((detection) => {
      const { category, type, subType, value, factor } = detection;
      const normalizedValue = factor ? Math.fround(value * factor) : value;

      return {
        category,
        createdAt,
        user:          user._id,
        unit:          type,
        value:         normalizedValue,
        originalUnit:  subType || type,
        originalValue: value,
      };
    });

    await Event.insertMany(events);
    return 'Cool, I saved your data';
  } catch (e) {
    console.log(e);
    return 'Oops, sorry! Something went completely wrong.. Please try again later';
  }
};
