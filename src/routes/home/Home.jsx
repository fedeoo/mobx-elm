import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import classNames from 'classnames/bind';
import HeadTop from 'components/HeadTop';
import styles from './Home.scss';

const cx = classNames.bind(styles);

const propTypes = {
  guessCityid: PropTypes.number.isRequired,
  guessCity: PropTypes.string.isRequired,
  hotcity: PropTypes.object.isRequired,
  sortgroupcity: PropTypes.object.isRequired,
};

const reload = () => {
  window.location.reload();
};

@observer
class Home extends Component {
  renderSortGroupCity() {
    const sortgroupcity = this.props.sortgroupcity;
    const lis = [];
    _.mapKeys(sortgroupcity, (value, key) => {
      lis.push((
        <li key={key} className={cx('letter_classify_li')}>
          <h4 className={cx('city_title')}>{key}</h4>
          <ul className={cx('groupcity_name_container', 'citylistul', 'clear')}>
            {
              value.map(item => (
                <li key={item.id}>
                  <Link to={`/city/${item.id}`} className={cx('ellipsis')}>{item.name}</Link>
                </li>
              ))
            }
          </ul>
        </li>
      ));
    });
    return (
      <section className={cx('group_city_container')}>
        <ul className={cx('letter_classify')}>{lis}</ul>
      </section>
    );
  }
  render() {
    const { guessCityid, guessCity, hotcity } = this.props;
    const logo = (<span className={cx('head_logo')} onClick={reload}>ele.me</span>);
    return (
      <div>
        <HeadTop left={logo} signinUp />
        <nav className={cx('city_nav')}>
          <div className={cx('city_tip')}>
            <span>当前定位城市：</span>
            <span>定位不准时，请在城市列表中选择</span>
          </div>
          <Link to={`/city/${guessCityid}`} className={cx('guess_city')}>
            <span>{guessCity}</span>
            <svg className={cx('arrow_right')}>
              <use xlinkHref="#arrow-right" />
            </svg>
          </Link>
        </nav>
        <section id="hot_city_container">
          <h4 className={cx('city_title')}>热门城市</h4>
          <ul className={cx('citylistul', 'clear')}>
            {
              hotcity.map(item => (
                <li key={item.id}>
                  <Link to={`/city/${item.id}`}>{item.name}</Link>
                </li>
              ))
            }
          </ul>
        </section>
        {this.renderSortGroupCity()}
      </div>
    );
  }
}

Home.propTypes = propTypes;

export default Home;
