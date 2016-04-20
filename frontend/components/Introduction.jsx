import React, { PropTypes } from 'react';

function Introduction ({ user, botName, p }) {
  return (
    <a href={ `http://telegram.me/${botName}?start=${user.get('telegramToken')}` } target="_blank">
      { p.t('Introduction.connect') }
    </a>
  );
};

Introduction.propTypes = {
  user:    PropTypes.object.isRequired,
  botName: PropTypes.string.isRequired,
  p:       PropTypes.object.isRequired
};

export default Introduction;
