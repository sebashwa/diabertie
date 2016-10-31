export default {
  help:   'Write something like this to log your values:\n\n`190 mg 2 bolus 27 basal 12:30`\n\nYou can get an overview of the available commands, if you start typing */*\n\nFor a detailed guide please visit diabertie.com',
  onText: {
    notUnderstood: 'Oh sorry, I didn\'t get that..'
  },
  generalErrors: {
    userNotFound: 'Oh! I was not able to find a user. Please enter /start',
    superWrong:   'Oops, sorry! Something went completely wrong.. Please try again later'
  },
  bertieStart: {
    success:   'Hey %{name}, glad to have you on board! Start logging values by writing something like:\n\n`7 mmol 2 bolus 27 basal 12:30`\n\nFor a detailed guide please visit diabertie.com',
    readyToGo: 'Hey %{name}, we already know each other! Please go ahead and log your values. Just write something like:\n\n`190 mg 2 bolus 27 basal 12:30`\n\nFor a detailed guide please visit diabertie.com'
  },
  detectLogEvents: {
    errors: {
      notFound: 'Sorry, I didn\'t get that! Write something like this to log values:\n\n`190 mg 2 bolus 27 basal 12:30`'
    },
    warnings: {
      ambiguousSugar:  '❗️\n\nOh, that\'s strange.. I found more than one sugar value:\n\n%{icon} %{valueTexts}',
      dateWithoutTime: '❗️\n\nOh, that\'s strange.. I found a date (%{date}) without a time provided. That means I would use the current time when saving.'
    },
    saveConfirmation: '%{data}\n\nDo you want me to save that?'
  },
  deletion: {
    select:     'Select',
    success:    '%{original}\n\n✅ Deleted *%{selectedValue})* %{value}',
    abort:      '%{original}\n\n❌ Nothing deleted',
    oldData:    '%{original}\n\n❌ Nothing deleted, this is an old request',
    selectDate: {
      noData: 'Please select a *date*:\n\n🗓 %{date}\n\nNo data available ... 😥\n\n',
      data:   'Please select a *date*:\n\n🗓 %{date}\n\n%{values}'
    },
    selectValue: 'Please select a *value*: 🗓 %{date}\n\n%{values}'
  },
  navigateDiary: {
    noData: '🗓 %{date}\n\nNo data available ... 😥\n\n',
    data:   '🗓 %{date}\n\n%{values}'
  },
  saveLogEvents: {
    yes:     'Yes',
    no:      'No',
    success: '%{original}\n\n✅ Saved',
    abort:   '%{original}\n\n❌ Not saved',
    oldData: '%{original}\n\n❌ Not saved, this is an old request'
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
