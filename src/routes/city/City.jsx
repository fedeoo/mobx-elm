import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import queryString from 'query-string';
import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import HeadTop from 'components/HeadTop';
import styles from './City.scss';

const cx = classNames.bind(styles);

const propTypes = {
  store: PropTypes.object.isRequired,
};
@observer
class City extends Component {
  constructor() {
    super();
    this.state = {
      inputVaule: '',
    };
    this.postpois = this.postpois.bind(this);
    this.onChange = this.onChange.bind(this);
  }
  onChange(event) {
    this.setState({
      inputVaule: event.target.value,
    });
  }
  postpois() {
    this.props.store.postpois(this.state.inputVaule);
  }
  render() {
    const { placelist, saveHistory, historytitle, placeNone, cityname } = this.props.store;
    const inputVaule = this.state.inputVaule;
    const changeCity = (<Link to="/home" className={cx('change_city')}>切换城市</Link>);
    return (
      <div className={cx('city_container')}>
        <HeadTop headTitle={cityname} right={changeCity} />
        <div className={cx('city_form')}>
          <div>
            <input type="search" name="city" placeholder="输入学校、商务楼、地址" className={cx('city_input', 'input_style')} required value={inputVaule} onChange={this.onChange} />
          </div>
          <div>
            <input type="submit" name="submit" className={cx('city_submit', 'input_style')} onClick={this.postpois} value="提交" />
          </div>
        </div>
        {
          historytitle ? <header className={cx('pois_search_history')}>搜索历史</header> : null
        }
        <ul className={cx('getpois_ul')}>
          {
            placelist.map((item, index) => (
              <li key={item.name} onClick={() => { saveHistory(index, item.geohash); }}>
                <Link to={{ pathname: '/msite', search: queryString.stringify({ geohash: item.geohash }) }}>
                  <h4 className={cx('pois_name', 'ellipsis')}>{item.name}</h4>
                  <p className={cx('pois_address', 'ellipsis')}>{item.address}</p>
                </Link>
              </li>
            ))
          }
        </ul>
        {
          placeNone ? <div className={cx('search_none_place')}>很抱歉！无搜索结果</div> : null
        }
      </div>
    );
  }
}
City.propTypes = propTypes;

export default City;
