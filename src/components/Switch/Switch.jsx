import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.scss';

/* eslint-disable react/prefer-stateless-function */
export class Switch extends React.Component {
  static propTypes = {
    on: PropTypes.bool.isRequired,
    onSwitch: PropTypes.func
  };

  static defaultProps = {
    onSwitch: () => null
  };

  render() {
    /* eslint-disable jsx-a11y/label-has-for */
    return (
      <button className={styles.buttonS} onClick={this.props.onSwitch}>
        {this.props.on ? 'on' : 'off'}
      </button>
    );
    /* eslint-enable jsx-a11y/label-has-for */
  }
}
