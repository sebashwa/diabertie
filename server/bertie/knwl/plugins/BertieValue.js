export default function BertieValue(knwlInstance) {
  this.calls = function() {
    const units = arguments[0][1];
    const words = knwlInstance.words.get('linkWords');
    let results = [];

    words.forEach((word, position) => {
      const nextWord = words[position + 1];
      const numberRegExp = new RegExp(/\d+.*,*\d*/);

      if (!numberRegExp.test(word)) return;

      units.forEach((unit) => {
        const { tokens, category, type } = unit;
        if (tokens.indexOf(nextWord) === -1) return;

        const value = parseFloat(word.replace(',','.'));

        return results.push({ value, category, type });
      });
    });

    return results;
  };
}
