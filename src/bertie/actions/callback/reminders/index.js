import manageLog from './manageLog';
import manageDaily from './manageDaily';
import addDaily from './addDaily';
import delDaily from './delDaily';
import listDailyForDeletion from './listDailyForDeletion';
import overview from './overview';

export default {
  mngLog:     manageLog,
  mngDaily:   manageDaily,
  listForDel: listDailyForDeletion,
  addDaily,
  delDaily,
  overview
};
