import React from 'react';
import PropTypes from 'prop-types';
import { Provider, observer } from 'mobx-react';
import { HashRouter as Router, Route } from 'react-router-dom';
import Home from './home';

const propTypes = {
  store: PropTypes.object.isRequired,
};
const Routers = props => (
  <Router>
    <Provider store={props.store}>
      <div>
        <Route exact path="/" component={Home} />
      </div>
    </Provider>
  </Router>
);
Routers.propTypes = propTypes;

export default observer(Routers);
