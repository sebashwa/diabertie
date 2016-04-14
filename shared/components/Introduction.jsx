import React, { PropTypes } from 'react';

function Introduction ({ user, botName }) {
  return (
    <a href={ `http://telegram.me/${botName}?start=${user.get('telegramToken')}` } target="_blank">Connect</a>
  );
};

Introduction.propTypes = {
  user:    PropTypes.object.isRequired,
  botName: PropTypes.string.isRequired
};

export default Introduction;
