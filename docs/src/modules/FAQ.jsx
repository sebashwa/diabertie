import React, { Component } from 'react';
import Link from './shared/Link';
import polyglot from '../polyglot';

class FAQ extends Component {
  render() {
    const p = polyglot();

    return (
      <div>
        <h1>{p.t('FAQ.heading')}</h1>

        <p>{p.t('FAQ.intro')}</p>

        <h2>{p.t('FAQ.behind.question')}</h2>
        <p>{p.t('FAQ.behind.text')}</p>

        <h2>{p.t('FAQ.whyChatbot.question')}</h2>
        <p>{p.t('FAQ.whyChatbot.text')}</p>

        <h2>{p.t('FAQ.replaceDoctor.question')}</h2>
        <p>{p.t('FAQ.replaceDoctor.text')}</p>

        <h2>{p.t('FAQ.dataPrivate.question')}</h2>
        <p>{p.t('FAQ.dataPrivate.text')}</p>

        <h2>{p.t('FAQ.addFeature.question')}</h2>
        <p>{p.t('FAQ.addFeature.text')}</p>

        <h2>{p.t('FAQ.helpOut.question')}</h2>
        <p>
          {p.t('FAQ.helpOut.beforeLink')}
          <Link href="https://www.github.com/sebashwa/diabertie" title="Github"/>
          {p.t('FAQ.helpOut.afterLink')}
        </p>
      </div>
    );
  }
}

export default FAQ;
