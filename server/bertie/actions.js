import User from '../models/User';

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
