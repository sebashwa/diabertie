export default function BertieTime(knwlInstance) {
  this.calls = function() {
    const words = knwlInstance.words.get('linkWords');
    let results = [];

    words.forEach((word, position) => {
      const nextWord = words[position + 1];
      const timeRegExp = new RegExp(/(\d+):(\d+)/);
      const timeMatch = timeRegExp.exec(word);

      if (!timeMatch) return;

      let value = timeMatch[0];
      let hours = parseInt(timeMatch[1]);
      const minutes = parseInt(timeMatch[2]);

      if (['pm', 'am'].indexOf(nextWord) != -1) {
        if (nextWord === 'pm') { hours = hours + 12; }
        value += ` ${nextWord}`;
      }

      return results.push({ value, hours, minutes });
    });

    return results;
  };
}
