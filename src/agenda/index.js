import Agenda from 'agenda';
import sendDailyReminders from './sendDailyReminders';

const agenda = new Agenda({ db: { address: process.env.MONGO_DB_URL } });

export default () => {
  agenda.define('send daily reminders', sendDailyReminders);

  agenda.on('ready', () => {
    agenda.every('5 seconds', 'send daily reminders');
    agenda.start();
  });
};

function graceful() {
  agenda.stop(function() {
    process.exit(0);
  });
}

process.on('SIGTERM', graceful);
process.on('SIGINT' , graceful);
