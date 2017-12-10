import React from 'react';
import PropTyps from 'prop-types';
import { Switch } from './Switch';

function ToggleOn({ on, children }) {
  return on ? children : null;
}

function ToggleOff({ on, children }) {
  return !on ? children : null;
}

/* eslint-disable react/prop-types */

function ToggleButton({ on, onToggle, ...props }) {
  return <Switch on={on} onSwitch={onToggle} {...props} />;
}

/* eslint-enable */

export class Toggle extends React.Component {
  static On = ToggleOn;
  static Off = ToggleOff;
  static Button = ToggleButton;

  static propTypes = {
    onToggle: PropTyps.func,
    children: PropTyps.node.isRequired
  };

  static defaultProps = {
    onToggle: () => null
  };

  constructor(props) {
    super(props);

    this.state = {
      on: false
    };
  }

  onSwitch = () =>
    this.setState(
      prevState => ({ on: !prevState.on }),
      () => this.props.onToggle(this.state.on)
    );

  render() {
    const children = React.Children.map(this.props.children, child =>
      React.cloneElement(child, {
        on: this.state.on,
        onToggle: this.onSwitch
      })
    );
    return <div>{children}</div>;
  }
}
