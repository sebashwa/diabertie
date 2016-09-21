import moment from 'moment';

export default function (knwlInstance) {
  this.calls = () => {
    const words = knwlInstance.words.get('linkWords');
    let results = [];

    words.forEach((word, i) => {
      const dotFormat = /(\d+)\.(\d+)(\.(\d+))?(?!\w)/;
      const lineFormat = /(\d+)(\-|\/)(\d+)((\-|\/)(\d+))?/;
      const nextWord = words[i + 1];
      const nextWordNoWord = !(nextWord && /[A-Za-z]/.test(nextWord));
      let datum;

      if (dotFormat.test(word) && nextWordNoWord) { datum = moment(word, 'DD-MM-YYYY'); }
      else if (lineFormat.test(word)) { datum = moment(word, 'MM-DD-YYYY'); }

      if (!datum) return;

      const date = datum.get('date');
      const month = datum.get('month');
      const year = datum.get('year');

      return results.push({ value: `${date}.${month + 1}.${year}`, date, month, year });
    });

    return results;
  };
};
