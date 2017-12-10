import React from 'react';
import PropTyps from 'prop-types';
import { Switch } from './Switch';

const TOGGLE_CONTEXT = '__toggle__';
const childContextTypes = {
  [TOGGLE_CONTEXT]: PropTyps.object.isRequired
};

function withToggle(Component) {
  function withToggleWrapper(props, context) {
    const toggleContext = context[TOGGLE_CONTEXT];
    return (
      <Component
        on={toggleContext.on}
        onToggle={toggleContext.onToggle}
        {...props}
      />
    );
  }

  withToggleWrapper.contextTypes = childContextTypes;

  return withToggleWrapper;
}

const ToggleOn = withToggle(({ on, children }) => (on ? children : null));

const ToggleOff = withToggle(({ on, children }) => (!on ? children : null));

/* eslint-disable react/prop-types */

const ToggleButton = withToggle(({ on, onToggle, ...props }) => (
  <Switch on={on} onSwitch={onToggle} {...props} />
));

/* eslint-enable */

export class Toggle extends React.Component {
  static On = ToggleOn;
  static Off = ToggleOff;
  static Button = ToggleButton;
  static withToggle = withToggle;

  static childContextTypes = childContextTypes;

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

  getChildContext() {
    return {
      [TOGGLE_CONTEXT]: {
        on: this.state.on,
        onToggle: this.onSwitch
      }
    };
  }

  onSwitch = () =>
    this.setState(
      prevState => ({ on: !prevState.on }),
      () => this.props.onToggle(this.state.on)
    );

  render() {
    return <div>{this.props.children}</div>;
  }
}
