import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import CityState from './CityState';
import City from './City';

const propTypes = {
  match: PropTypes.object.isRequired,
};

@observer
class CityContainer extends Component {
  constructor() {
    super();
    this.store = new CityState();
  }
  componentDidMount() {
    const match = this.props.match;
    this.store.mounted(match.params.cityid);
  }
  render() {
    return <City store={this.store} />;
  }
}
CityContainer.propTypes = propTypes;

export default CityContainer;
