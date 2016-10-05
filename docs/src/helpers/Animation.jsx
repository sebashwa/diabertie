import React, { PropTypes, Component } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

class Animation extends Component {
  static propTypes = {
    children:     PropTypes.object.isRequired,
    appear:       PropTypes.string.isRequired,
    appearActive: PropTypes.string.isRequired,
    length:       PropTypes.number.isRequired,
    className:    PropTypes.string,
  };

  render() {
    const { appear, appearActive, className, length, children } = this.props;

    return (
      <ReactCSSTransitionGroup className={className} transitionName={{ appear, appearActive }}
        transitionAppear={true}
        transitionEnterTimeout={length}
        transitionLeaveTimeout={length}
        transitionAppearTimeout={length}>
        {children}
      </ReactCSSTransitionGroup>
    );
  }
}

export default Animation;
