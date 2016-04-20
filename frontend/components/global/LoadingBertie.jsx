import React from 'react';
import loadingBertieStyle from './ModalCenter.style';

export default () => {
  return (
    <div className="loading-bertie" style={ loadingBertieStyle() }>
      LOADING...
    </div>
  );
};
