export default {
  onText: {
    positiveTokens: 'yes,y,yep,yay,yo,please',
    negativeTokens: 'no,n,nein,nope,don\'t',
    negativeAnswer: 'Ok, I\'m not doing anything!',
    notUnderstood:  'Oh sorry, I didn\'t get that..'
  },
  generalErrors: {
    userNotFound: 'Oops! I was not able to find a user. Please sign up at diabertie.com first and connect from there',
    superWrong:   'Oops, sorry! Something went completely wrong.. Please try again later'
  },
  bertieStart: {
    success:   'Hey %{name}, glad to have you on board! To start logging values, just write something like:\n\n`7 mmol 2 bolus 27 basal 12:30`\n\nFor a comprehensive guide, please visit diabertie.com',
    readyToGo: 'Hey %{name}, we already know each other! Please go ahead and log your values. To do so, write something like:\n\n`190 mg 2 bolus 27 basal 12:30`\n\nFor a comprehensive guide, please visit diabertie.com'
  },
  bertieDetect: {
    errors: {
      notFound: 'Sorry, I didn\'t get that! To log values, please write something like:\n\n`190 mg 2 bolus 27 basal 12:30`'
    },
    warnings: {
      ambiguousSugar:  'Oh, that\'s strange.. I found more than one sugar value:\n\n%{icon} %{valueTexts}',
      dateWithoutTime: 'Oh, that\'s strange.. I found a date (`%{date}`) without time. That means I would use the current time when saving'
    },
    saveConfirmation: '%{data}\n\nDo you want me to save that?'
  },
  executeLatestChatAction: {
    nothingToDo: 'Sorry, I just don\'t know what to do'
  },
  latestChatActions: {
    saveLogEvents: {
      success: 'Cool, I saved your data'
    }
  },
  logEvents: {
    be:           '%{smart_count} BE |||| %{smart_count} BE',
    carbUnit:     '%{smart_count} KHE |||| %{smart_count} KHE',
    carbs:        '%{smart_count}g carbs |||| %{smart_count}g carbs',
    basisInsulin: '%{smart_count} Basal |||| %{smart_count} Basal',
    lantus:       '%{smart_count} Lantus |||| %{smart_count} Lantus',
    pumpRate:     '%{smart_count} Pump base rate |||| %{smart_count} Pump base rate',
    bolusInsulin: '%{smart_count} Bolus |||| %{smart_count} Bolus',
    humalog:      '%{smart_count} Humalog |||| %{smart_count} Humalog',
    tablets:      '%{smart_count} Tablet |||| %{smart_count} Tablets',
    pills:        '%{smart_count} Pill |||| %{smart_count} Pills',
    sugarMg:      '%{smart_count} mg/dL |||| %{smart_count} mg/dL',
    sugarMmol:    '%{smart_count} mmol/L |||| %{smart_count} mmol/L'
  },
  icons: {
    sugar:   '📈',
    therapy: '💉',
    food:    '🍏'
  },
  dateTime: {
    now:   'now',
    today: 'today'
  }
};
