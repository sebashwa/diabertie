export default {
  help:          '*Log values*\nWrite something like this to log your values:\n\n`24 carbs 190 mg 4 bolus`\n\nThis means you want to save:\n\n- 🍏 24g carbonhydrates\n- 📈 a sugar level of 190 mg/dL\n- 💉 4 units of bolus Insulin\n\nThose are also the three available types of values.\nThe types are often shortened by the above emojis (for example in the /diary)\nYou can get a list of all available units and their shorthands by writing /shorthands\n\n*Notes*\nYou can also add notes by writing /notes. This is very useful to log for example sports activity or your daily mood\n\nFor a more detailed guide please visit diabertie.com',
  generalErrors: {
    userNotFound: 'Oh! I was not able to find a user for this conversation 😳\n\nPlease enter /start to get started',
    superWrong:   'Oops, sorry! Something went completely wrong.. 😳\n\nPlease try again'
  },
  bertieStart: {
    success:   'Hey %{name}, glad to have you on board! Start logging values by writing something like:\n\n`7 mmol 2 bolus 27 basal 12:30`\n\nFor more information type /help and for a detailed guide please visit diabertie.com\n\n*But wait!* ☝️\n\nThe first thing you want to do before logging values is to set your timezone. This way, the values you log have a correct time and date.\n\nJust write me the city where you\'re currently at (or any city in your timezone. I won\'t save it. All I save is your timezone)\nYou can always change your timezone by typig /timezone',
    readyToGo: 'Hey %{name}, we already know each other! Please go ahead and log your values. Just write something like:\n\n`190 mg 2 bolus 27 basal 12:30`\n\nFor more information type /help and for a detailed guide please visit diabertie.com'
  },
  detectLogEvents: {
    errors: {
      notFound: 'Sorry, I didn\'t get that! Write something like this to log values:\n\n`24 carbs 190 mg 4 bolus`\n\nThis means you want to save:\n\n- 🍏 24g carbonhydrates\n- 📈 a sugar level of 190 mg/dL\n- 💉 4 units of bolus Insulin\n\nThere are many /shorthands that I can understand.'
    },
    warnings: {
      ambiguousSugar:  '❗️\n\nOh, that\'s strange.. I found more than one sugar level:\n\n%{icon} %{valueTexts}',
      dateWithoutTime: '❗️\n\nOh, that\'s strange.. I found a date (%{date}) without a time provided. That means I would use the current time when saving.'
    },
    saveConfirmation: '%{data}\n\nDo you want me to save that?'
  },
  deletion: {
    deleteValue: {
      success: '%{original}\n\n✅ Deleted *%{selectedValue})* %{value}',
      abort:   '%{original}\n\n❌ Nothing deleted',
      oldData: '%{original}\n\n❌ Nothing deleted, this is an old request',
    },
    selectDate: {
      noData: 'Please select a *date*:\n\n🗓 %{date}\n\nNo values available ... 😥\n\n',
      data:   'Please select a *date*:\n\n🗓 %{date}\n\n%{values}',
    },
    selectValue: 'Please select a *value*:\n\n🗓 %{date}\n\n%{values}'
  },
  setTimezone: {
    askForChange:    '🌍🕕 Your set timezone is:\n\n`%{timezone}`\n\nDo you want to change it?',
    requestLocation: '🌍🕕 Your set timezone is:\n\n`%{timezone}`\n\nOk, send me where you\'re at .. Any city in your timezone should work!',
    notSet:          '🌍🕕 Your set timezone is:\n\n`%{timezone}`\n\n❌ Did not set a new timezone',
    noLocation:      'I wasn\'t able to find that location 😥 .. Please try again (maybe with a large city nearby)',
    noTimezone:      'I could not find a timezone for that city 😥 .. Please try again (maybe with a large city nearby)',
    success:         '✅ I changed your timezone to: `%{timeZoneId}`',
  },
  navigateDiary: {
    noData: '🗓 %{date}\n\nNo data available ... 😥',
    data:   '🗓 %{date}\n\n`%{notes}`%{logEvents}'
  },
  saveLogEvents: {
    success: '%{original}\n\n✅ Saved',
    abort:   '%{original}\n\n❌ Not saved',
    oldData: '%{original}\n\n❌ Not saved, this is an old request'
  },
  notes: {
    addNote:     'Add Note',
    delNote:     'Delete Note',
    added:       '✅ Added the note',
    requestNote: '🗓 %{date}\n\nOk, go ahead an write a new note',
    selectDate:  {
      data:   '🗓 %{date}\n\n`%{notes}`\n\n',
      noData: '🗓 %{date}\n\nNo notes available ... 😥\n\n'
    },
    selectNote: 'Please select a note for deletion:\n\n🗓 %{date}\n\n`%{notes}`\n\n',
    deleteNote: {
      success: '%{original}\n\n✅ Deleted note *%{number})*',
      abort:   '%{original}\n\n❌ Nothing deleted',
      oldData: '%{original}\n\n❌ Nothing deleted, this is an old request'
    }
  },
  reminders: {
    messages: {
      daily: {
        withText: {
          1: 'Hey, this is your daily reminder to `%{text}`! 🕐',
          2: 'It\'s time to `%{text}`! 💪',
          3: 'Hey, I want to remind you to `%{text}` 😊',
          4: 'Do you still have to `%{text}`❔',
          5: 'Don\'t forget to `%{text}` today! 🙀',
          6: 'Did you remember to `%{text}`? 🙃',
        },
        withoutText: {
          1: 'Hey this is your daily reminder 🕐',
          2: 'You told me to remind you now! Time to do your thing 🙃',
          3: 'It\'s time for your daily diabetes routine! 😊',
          4: 'Hey it\'s me with your daily reminder! 🕐',
        }
      },
      log: {
        noValues: {
          1: 'Hey, you didn\'t log any values at all today. Do you want to take some minutes to do so? 👍',
          2: 'Hey! No values in your diary today! 🙀 It won\'t take much time to log some values!',
          3: 'Hey, how about logging some values today? 😊',
        },
        1: 'You didn\'t log any values so far this %{daytime} 😔',
        2: 'Hey, would you mind logging some values for this %{daytime} 💪',
        3: 'This is your reminder to log values for this %{daytime} 🕐',
        4: 'It\'s time to log some values for this %{daytime}! ',
      },
    },
    icons: {
      morning:   '🏙',
      afternoon: '🌇',
      evening:   '🌆',
    },
    logReminders: {
      morning:   'morning reminder',
      afternoon: 'afternoon reminder',
      evening:   'evening reminder',
    },
    manageLog: {
      button:    'Manage Log Reminders',
      list:      '⏰ Your log reminders are:\n\n%{remindersList}',
      addButton: '%{icon} Add %{text}',
      delButton: '%{icon} Delete %{text}',
    },
    manageDaily: {
      button: 'Manage Daily Reminders',
      list:   '⏰ Your daily reminders are:\n\n%{remindersList}',
    },
    addDaily: {
      button:       'Add Daily Reminder',
      success:      '✅ Sucessfully added daily reminder\n\n%{hours}:%{minutes} %{description}',
      explanation:  '⏰ Add daily reminder\n\nPlease write the reminder time in the format `HH:MM`\nYou can add an explanation completing the sentence _"I\'d like to remind you to ..."_\n\n*Example*\nYou want to be reminded to take your medicine at 21:00. Just write\n\n`21:00 take your medicine`',
      regExFailure: 'Ooops, I did not understand that..\nPlease write something like\n\n`12:30 measure your sugar level`',
    },
    delDaily: {
      button:  'Delete Daily Reminder',
      success: '%{original}\n\n✅ Deleted *%{selectedValue})* %{value}',
      abort:   '%{original}\n\n❌ Nothing deleted',
      oldData: '%{original}\n\n❌ Nothing deleted, this is an old request',
      list:    '⏰ Delete a daily reminder by choosing a number\n\n%{remindersList}',
    },
    noReminders: '😶 No reminders',
    overview:    '⏰ There are two types of reminders\n\n*Log Reminders:* only sent if you forgot to log values\n*Daily Reminders:* helpful to remember medications, measuring sugar levels etc.',
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
  categories: {
    sugar:   'Sugar Level',
    food:    'Food',
    therapy: 'Medication'
  },
  subTypes: {
    be:           'Broteinheit',
    carbUnit:     'Carbohydrate Unit',
    carbs:        'Gram Carbohydrates',
    basisInsulin: 'Base Insulin',
    lantus:       'Lantus',
    pumpRate:     'Pump Rate',
    bolusInsulin: 'Bolus Insulin',
    humalog:      'Humalog',
    tablets:      'Tablets',
    pills:        'Pills',
    sugarMg:      'Sugar Level (mg/dL)',
    sugarMmol:    'Sugar Level (mmol/l)'
  },
  shorthandList: 'Here is a list of all the units and their shorthands that I can understand.\nUse them when you log your values, by writing me for example\n\n`24 carbs 190 mg 4 bolus`\n\n%{shorthandList}',
  icons:         {
    sugar:   '📈',
    therapy: '💉',
    food:    '🍏'
  },
  dateTime: {
    now:   'now',
    today: 'today'
  },
  generalWords: {
    back:   '◀ Back',
    yes:    'Yes',
    no:     'No',
    select: 'Select',
  },
};
