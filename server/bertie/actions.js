import User from '../models/User';
import knwl from './knwl';
import unitsBy from './knwl/units';

export const connectBot = (telegramToken, sender) => {
  const telegramId = sender.id;

  return User.find({ $or: [{ telegramToken },  { telegramId }] }).then((users) => {
    if (users.length == 0) {
      return 'Oops! I was not able to find a user. Please sign up at diabertie.com first and connect from there';
    } else if (users.length > 1) {
      const connectedUser = users.filter(u => !!u.telegramId)[0];
      return `Oops, you are already connected with the account ${connectedUser.email}`;
    } else if (!users[0].telegramId) {
      return users[0].update({ telegramId }).then(() => {
        return `Hey ${sender.first_name}, I connected you with your diabertie account ${users[0].email}. Glad to have you on board!`;
      });
    } else {
      return `Your account ${users[0].email} seems to be connected already`;
    }
  }).catch(err => { console.error(err); });
};

const previewTexts = (events) => events.map(e => `\`${e.value} ${e.type}\``).join(', ');

function validateEvents(events) {
  const { sugar, therapy, food } = events;
  const allEvents = [... sugar, ... therapy, ... food];
  const ambigousMatch = (type) => {
    return `Sorry, I can only handle one \`${type}\` value but found:\n\n${previewTexts(events[type])}`;
  };

  if (allEvents.length == 0) {
    return 'Sorry, I do not get you at all! To track values, please write something like:\n\n`190 mg 2 bolus 27 basal 12:30`';
  };

  if (sugar.length > 1) return ambigousMatch('sugar');
  if (food.length > 1) return ambigousMatch('food');

  return null;
}

export const detectValues = (msg) => {
  return new Promise((resolve) => {
    const parser = knwl(msg.text);
    const eventTypes = ['sugar', 'therapy', 'food'];
    const events = {};

    eventTypes.forEach((type) => events[type] = parser.get('bertieValues', unitsBy(type)));

    const error = validateEvents(events);
    if (error) return resolve(error);

    const eventStrings = eventTypes.filter(type => events[type].length > 0)
      .map((type) => `${previewTexts(events[type])}`).join('\n');

    return resolve(`Hey, I detected the following:\n\n${eventStrings}\n\nDo you want me to save that?`);
  });
};
