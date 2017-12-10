/* @flow */

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import type { Element } from 'react';
import { connect } from 'react-redux';
import type { Connector } from 'react-redux';
import Helmet from 'react-helmet';

import * as action from './action';
import type { Home as HomeType, Dispatch, Reducer } from '../../types';
import UserList from '../../components/UserList';
import styles from './styles.scss';

import { Toggle } from '../../components/Switch';

type Props = { home: HomeType, fetchUsersIfNeeded: () => void };

// Export this for unit testing more easily
export class Home extends PureComponent<Props> {
  componentDidMount() {
    this.props.fetchUsersIfNeeded();

    this.state = {};
  }

  renderUserList = (): Element<'p' | typeof UserList> => {
    const { home } = this.props;

    if (
      !home.readyStatus ||
      home.readyStatus === 'USERS_INVALID' ||
      home.readyStatus === 'USERS_REQUESTING'
    ) {
      return <p>Loading...</p>;
    }

    if (home.readyStatus === 'USERS_FAILURE') {
      return <p>Oops, Failed to load list!</p>;
    }

    return <UserList list={home.list} />;
  };

  render() {
    return (
      <div className={styles.Home}>
        <Helmet title="Home" />
        <Toggle onToggle={on => console.log('toggle', on)}>
          <Toggle.On>This button is on</Toggle.On>
          <div>
            <b>Click this button to toggle stuff</b>
            <Toggle.Button />
            <AnotherToggle />
          </div>
          <Toggle.Off>This button is off</Toggle.Off>
        </Toggle>
      </div>
    );
  }
}

function AnotherButton({ on, onToggle }) {
  const style = {
    borderRadius: 15,
    fontSize: 30,
    backgroundColor: 'red',
    borderColor: 'red'
  };
  return (
    <button style={style} onClick={onToggle}>
      {on ? 'I AM ON! :D' : 'I AM OFF :C'}
    </button>
  );
}

AnotherButton.propTypes = {
  on: PropTypes.bool.isRequired,
  onToggle: PropTypes.func.isRequired
};

const AnotherToggle = Toggle.withToggle(AnotherButton);

const connector: Connector<{}, Props> = connect(
  ({ home }: Reducer) => ({ home }),
  (dispatch: Dispatch) => ({
    fetchUsersIfNeeded: () => dispatch(action.fetchUsersIfNeeded())
  })
);

export default connector(Home);
