import React from 'react';
import PropTyps from 'prop-types';
import { Switch } from './Switch';

const TOGGLE_CONTEXT = '__toggle__';
const childContextTypes = {
  [TOGGLE_CONTEXT]: PropTyps.object.isRequired
};

function ToggleOn({ children }, context) {
  return context[TOGGLE_CONTEXT].on ? children : null;
}

ToggleOn.contextTypes = childContextTypes;

function ToggleOff({ children }, context) {
  return !context[TOGGLE_CONTEXT].on ? children : null;
}

ToggleOff.contextTypes = childContextTypes;

/* eslint-disable react/prop-types */

function ToggleButton(props, context) {
  return (
    <Switch
      on={context[TOGGLE_CONTEXT].on}
      onSwitch={context[TOGGLE_CONTEXT].onToggle}
      {...props}
    />
  );
}

ToggleButton.contextTypes = childContextTypes;

const withToggle = function(Component) {
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
};

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
