import moment from 'moment';

export default function BertieTime(knwlInstance) {
  this.calls = function() {
    const words = knwlInstance.words.get('linkWords');
    let results = [];

    words.forEach((word) => {
      const dotFormat = /(\d+)\.(\d+)(\.(\d+))?/;
      const lineFormat = /(\d+)(\-|\/)(\d+)((\-|\/)(\d+))?/;
      let date;

      if (dotFormat.test(word)) { date = moment(word, 'DD-MM-YYYY'); }
      else if (lineFormat.test(word)) { date = moment(word, 'MM-DD-YYYY'); }

      if (!date) return;

      const day = date.get('date');
      const month = date.get('month');
      const year = date.get('year');

      return results.push({ value: `${day}.${month + 1}.${year}`, day, month, year });
    });

    return results;
  };
}
