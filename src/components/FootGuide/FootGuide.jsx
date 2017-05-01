import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './FootGuide.scss';

const cx = classNames.bind(styles);

const propTypes = {
  geohash: PropTypes.string.isRequired,
};

class FootGuide extends Component { // eslint-disable-line
  static contextTypes = {
    router: PropTypes.object,
  }
  render() {
    const { geohash } = this.props;
    const path = this.context.router.route.match.path;
    return (
      <section className={cx('foot_guide')}>
        <Link to={{ path: '/msite', query: { geohash } }} className={cx('guide_item')}>
          <svg className={cx('icon_style')}>
            <use xlinkHref={path === '/msite' ? '#msiteActive' : '#msite'} />
          </svg>
          <span>外卖</span>
        </Link>
        <Link to={`/search/${geohash}`} className={cx('guide_item')}>
          <svg className={cx('icon_style')}>
            <use xlinkHref={path === '/search' ? '#findActive' : '#find'} />
          </svg>
          <span>搜索</span>
        </Link>
        <Link to="/order" className={cx('guide_item')}>
          <svg className={cx('icon_style')}>
            <use xlinkHref={path === '/order' ? '#orderActive' : '#order'} />
          </svg>
          <span>订单</span>
        </Link>
        <Link to="/profile" className={cx('guide_item')}>
          <svg className={cx('icon_style')}>
            <use xlinkHref={path === '/profile' ? '#profileActive' : '#profile'} />
          </svg>
          <span>我的</span>
        </Link>
      </section>
    );
  }
}
FootGuide.propTypes = propTypes;

export default FootGuide;
