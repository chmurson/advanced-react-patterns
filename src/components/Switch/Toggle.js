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
    return <Component toggle={toggleContext} {...props} />;
  }

  withToggleWrapper.contextTypes = childContextTypes;

  withToggleWrapper.displayName = `withToggleWrapper(${Component.displayName ||
    Component.name})`;

  return withToggleWrapper;
}

const ToggleOn = ({ toggle: { on }, children }) => (on ? children : null);

const ToggleOff = ({ toggle: { on }, children }) => (!on ? children : null);

/* eslint-disable react/prop-types */

const ToggleButton = ({ toggle: { on, onToggle }, ...props }) => (
  <Switch on={on} onSwitch={onToggle} {...props} />
);

/* eslint-enable */

export class Toggle extends React.Component {
  static On = withToggle(ToggleOn);
  static Off = withToggle(ToggleOff);
  static Button = withToggle(ToggleButton);
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
