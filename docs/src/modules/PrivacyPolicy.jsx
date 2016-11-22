import React, { Component } from 'react';
import styles from './PrivacyPolicy.css';
import polyglot from '../polyglot';

class PrivacyPolicy extends Component {
  render() {
    const p = polyglot();

    return (
      <div className={styles.root} >
        <h1>{p.t('privacyPolicy.heading')}</h1>

        <p>{p.t('privacyPolicy.intro')}</p>

        <ul>
          <li>{p.t('privacyPolicy.listing.1')}</li>
          <li>{p.t('privacyPolicy.listing.2')}</li>
          <li>{p.t('privacyPolicy.listing.3')}</li>
        </ul>

        <p>{p.t('privacyPolicy.afterListing')}</p>
        <p>{p.t('privacyPolicy.collectingNonPersonally')}</p>
        <p>{p.t('privacyPolicy.collectingPersonally')}</p>

        <h2>{p.t('privacyPolicy.aggregating.heading')}</h2>
        <p>{p.t('privacyPolicy.aggregating.text')}</p>

        <h2>{p.t('privacyPolicy.protection.heading')}</h2>
        <p>{p.t('privacyPolicy.protection.text')}</p>

        <h2>{p.t('privacyPolicy.businessTransfers.heading')}</h2>
        <p>{p.t('privacyPolicy.businessTransfers.text')}</p>

        <h2>{p.t('privacyPolicy.changes.heading')}</h2>
        <p>{p.t('privacyPolicy.changes.text')}</p>
      </div>
    );
  }
}

export default PrivacyPolicy;
