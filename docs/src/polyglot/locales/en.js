/* eslint-disable key-spacing */

export default {
  howTo: {
    quickjump: {
      logValues: 'Log values',
      reviewValues: 'Review values',
      deleteValue: 'Delete a value',
      addNote: 'Manage notes',
    },
    intro: {
      telegramUsage: `This is the Diabertie how to.
        Diabertie uses the awesome`,
      getTelegram: `functionality. So to use Diabertie you have to get Telegram, which is available for all
        platforms commonly used nowadays.
        After installing Telegram, just search for a contact named`,
      botName: '@diabertiebot',
      rest: 'and start writing him your diabetes values.'
    },
    usage: {
      headline: 'Usage',
      text: `This guide is here to help you get started using Diabertie for your daily
        diabetes logging.`
    },
    units: {
      be:           'BE',
      carbUnit:     'KHE',
      carbs:        'carbs',
      basisInsulin: 'Basal',
      lantus:       'Lantus',
      pumpRate:     'Pump base rate',
      bolusInsulin: 'Bolus',
      humalog:      'Humalog',
      tablets:      'Tablet',
      pills:        'Pill',
      sugarMg:      'mg/dL',
      sugarMmol:    'mmol/L'
    },
    logValues: {
      headline: 'Log values',
      intro: `To log values, usually all you have to do is write Diabertie a one line
         text message. Let's get started with an example:`,
      example: `You just measured your sugar level, ate something and injected the appropriate
        insulin dose. This is all you have to write to Diabertie to save your actions:`,
      command1: '5.5 mmol 24 carbs 4 hum',
      explanation: `Diabertie detects that you measure your sugar level in mmol/l,
        your food in grams carbonhydrate and that you use Humalog as your insulin.
        Besides those units, Diabertie understands much more. Here is a list with
        all the abbreviations that you can use, if you want to log values
        in the various units:`,
      contact: 'If you miss any units in this table, please contact me and I will add them as soon as possible.',
      changeTime: `Of course it is also possible to change the time and date of your logging.
        In the example above, you could have logged those values some hours later and add a timestamp:`,
      command2: '10:00 5.5 mmol 24 carbs 4 hum',
      changeDate: 'Or even days later and add a date:',
      command3: '21.05. 10:00 5.5 mmol 24 carbs 4 hum',
      thatsAll: 'And that is all you need to know, to log values using Diabertie.'
    },
    reviewValues: {
      headline: 'Review values',
      intro: 'To get an overview of the values that you have logged so far, just send',
      command: '/diary',
      navigate: 'to Diabertie. This way you get your values presented together with a neat interface to browse through them.',
    },
    deleteValue: {
      headline: 'Delete a value',
      intro: 'You can delete a logged value by typing',
      command: '/deletion',
      selectDate: 'You have to select a date which you would like to delete a value from. The interface is very similar to the one in the diary, except for the big \'Select\' button.',
      selectValue: 'After selecting a date, the values are numbered and you can choose, which one you want to delete.'
    },
    notes: {
      headline: 'Manage notes',
      intro: 'Notes can be helpful to log your daily mood or sports activities and the likes. You can add and delete notes by writing',
      command: '/notes',
      selectDate: 'Select a date which you want to add a note for or delete a note from. Then click on the action you want to perform. All your added notes show up in the diary!',
    },
    thatsAll: `This is all you can do with Diabertie so far. If you have any suggestions on how to improve or just want to give me
      feedback (bad or good), please feel free to contact me.`
  },
  landing: {
    teaser: {
      heading: 'Meet Diabertie',
      sub:     'Your personal diabetes chatbot'
    },
    logValues: {
      heading: 'Log values',
      text: 'It\'s as easy as writing a text message'
    },
    getReminders: {
      heading: 'Get reminders',
      text: 'Get daily reminders to stay in your diabetes routine'
    },
    addNotes: {
      heading: 'Add notes',
      text: 'Keep track of your sports activity or unusual events'
    }
  },
  privacyPolicy: {
    heading: 'Privacy Policy',
    intro: 'Your privacy is critically important to me. With respect to Diabertie I have a few fundamental principles:',
    listing: {
      1: 'I don’t ask you for personal information unless I truly need it. (I can’t stand services that ask you for things like your gender or income level for no apparent reason.)',
      2: 'I don’t share your personal information with anyone except to comply with the law or to protect my rights.',
      3: 'I don’t store personal information on my servers unless required.'
    },
    afterListing: 'If you have questions about deleting or correcting your personal data please contact me. Below is my privacy policy which incorporates these goals:',
    collectingNonPersonally: `Like most web service operators, Diabertie collects non-personally-identifying information of the sort that
      web browsers and servers typically make available, such as the browser type, language preference, referring site,
      and the date and time of each visitor request. Diabertie’s purpose in collecting non-personally identifying
      information is to better understand how Diabertie’s users interact with the service. From time to time, Diabertie may
      release non-personally-identifying information in the aggregate, e.g., by publishing a report on trends in the usage of
      its service.`,
    collectingPersonally: `Diabertie also collects potentially personally-identifying information like your timezone.
      This is only for the purpose to make sure that Diabertie’s service works as advertised.`,
    aggregating: {
      heading: 'Aggregated Statistics',
      text: `Diabertie may collect statistics about the behavior of users of the bot.
        For instance, Diabertie may monitor the user flows to identify the most useful features of the chatbot.
        Diabertie may provide this information to others.
        However, Diabertie does not disclose personally-identifying information other than as described below.`
    },
    protection: {
      heading: 'Protection of Certain Personally-Identifying Information',
      text: `Diabertie discloses potentially personally-identifying and personally-identifying information only to those
        of its contractors and affiliated organizations that (i) need to know that information in order to process it on Diabertie’s behalf or to provide services available at Diabertie’s service, and 
        (ii) that have agreed not to disclose it to others. Some of those contractors and affiliated organizations may be
        located outside of your home country; by using Diabertie’s service, you consent to the transfer of such information
        to them.  Diabertie will not rent or sell potentially personally-identifying and personally-identifying information to anyone.
        Other than to its contractors and affiliated organizations, as described above, Diabertie discloses potentially
        personally-identifying and personally-identifying information only in response to a subpoena, court order or other
        governmental request, or when Diabertie believes in good faith that disclosure is reasonably necessary to protect
        the property or rights of Diabertie, third parties or the public at large.
        If you send me a request (for example via email), I reserve the right to publish it in order to help me clarify or
        respond to your request or to help me support other users.
        Diabertie takes all measures reasonably necessary to protect against the unauthorized access, use, alteration or
        destruction of potentially personally-identifying and personally-identifying information.`
    },
    businessTransfers: {
      heading: 'Business Transfers',
      text: `If Diabertie, or substantially all of its assets, were acquired, or in the unlikely event that Diabertie goes out
        of business or enters bankruptcy, user information would be one of the assets that is transferred or acquired by
        a third party. You acknowledge that such transfers may occur, and that any acquirer of Diabertie may continue to
        use your personal information as set forth in this policy.`
    },
    changes: {
      heading: 'Privacy Policy Changes',
      text: `Although most changes are likely to be minor, Diabertie may change its Privacy Policy from time to time, and in
        Diabertie’s sole discretion. Diabertie encourages visitors to frequently check this page for any changes to its
        Privacy Policy. Your continued use of Diabertie’s service after any change in this Privacy Policy will constitute
        your acceptance of such change.`
    },
  }
};
