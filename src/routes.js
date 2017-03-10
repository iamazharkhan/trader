import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './components/App/index';
import Main from './components/Main/index';
import Profile from './containers/Profile/index';
import Login from './components/Login/index';
import Trades from './components/Trades/index';
import ItemPage from './components/ItemPage/index';
import MyItems from './components/MyItems/index';
import ErrorPage from './components/ErrorPage/index';
import CheckAuth from './utils/checkAuth';

import { getInitialState } from './actions/commonActions';

export default function AllRoutes(dispatch) {


  const requireAuthAndLoad = (nextState, replace, cb) => {
    // CheckAuth take two function as parameter
    // one for authorized req
    // other for unauthorized req
    // If user is authorized then load initial state
    CheckAuth(
      () => {
        if (nextState.location.pathname === '/profile') {
          getInitialState(cb, 'profile')(dispatch);
        } else {
          cb();
        }
      },
      () => {
        replace({
          pathname: '/login',
          state: { nextPathname: nextState.location.pathname }
        });
        cb();
      }
    );
  };

  const requireNoAuth = (nextState, replace, cb) => {
    // CheckAuth take two function as parameter
    // one for authorized req
    // other for unauthorized req

    // If user is already authorized then
    // send him back to home(/)
    // else let him goto login page
    CheckAuth(
      () => {
        replace({
          pathname: '/',
          state: { nextPathname: nextState.location.pathname }
        });
        cb();
      },
      () => {
        cb();
      },
    );
  };

  return (
    <Route path="/" component={App}>
      <IndexRoute component={Main} />
      <Route path="item/:id" component={ItemPage} />
      <Route path="profile" component={Profile} onEnter={requireAuthAndLoad} />
      <Route path="login" component={Login} onEnter={requireNoAuth} />
      <Route path="trades" component={Trades} onEnter={requireAuthAndLoad} />
      <Route path="myItems" component={MyItems} onEnter={requireAuthAndLoad} />
      <Route path="*" component={ErrorPage} />
    </Route>
  );
}
