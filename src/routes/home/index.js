import React, { Component } from 'react';
import { observer } from 'mobx-react';
import Home from './Home';
import HomeState from './HomeState';

@observer
class HomeContainer extends Component {
  constructor() {
    super();
    this.store = new HomeState();
  }
  componentDidMount() {
    this.store.mounted();
  }
  render() {
    const { guessCityid, guessCity, hotcity, sortgroupcity } = this.store;
    const props = { guessCityid, guessCity, hotcity, sortgroupcity };
    return (<Home {...props} />);
  }
}
export default HomeContainer;
