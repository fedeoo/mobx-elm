import React from 'react';
import PropTypes from 'prop-types';
import { Provider, observer } from 'mobx-react';
import { HashRouter as Router, Route, Redirect } from 'react-router-dom';
import Home from './home';
import City from './city';

const propTypes = {
  store: PropTypes.object.isRequired,
};
const Routers = props => (
  <Router>
    <Provider store={props.store}>
      <div>
        <Route exact path="/" render={() => (<Redirect to="/home" />)} />
        <Route path="/home" component={Home} />
        <Route path="/city/:cityid" component={City} />
      </div>
    </Provider>
  </Router>
);
Routers.propTypes = propTypes;

export default observer(Routers);
