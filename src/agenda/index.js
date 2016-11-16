import Agenda from 'agenda';
import sendDailyReminders from './sendDailyReminders';
import sendLogReminders from './sendLogReminders';

const agenda = new Agenda({ db: { address: process.env.MONGO_DB_URL } });

export default () => {
  agenda.define('send daily reminders', sendDailyReminders);
  agenda.define('send log reminders', sendLogReminders);

  agenda.on('ready', () => {
    agenda.every('3 minutes', 'send log reminders');
    agenda.every('3 minutes', 'send daily reminders');
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
