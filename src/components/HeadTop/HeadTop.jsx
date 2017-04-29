/**
 *  不考虑 vue2-elm HeadTop 组织方式，重新设计 HeadTop 组件
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './HeadTop.scss';

const cx = classNames.bind(styles);

const goBack = () => {
  // TODO goBack
};

const propTypes = {
  left: PropTypes.any,
  right: PropTypes.any,
  headTitle: PropTypes.string,
  signinUp: PropTypes.bool,
  userInfo: PropTypes.object,
};
const defaultProps = {
  left: null,
  headTitle: '',
  right: null,
  signinUp: false,
  userInfo: null,
};
class HeadTop extends Component {
  renderLeft() {
    const { left } = this.props;
    if (left) {
      return left;
    }
    const polyline = {
      fill: 'none',
      stroke: 'rgb(255,255,255)',
      strokeWidth: 2,
    };
    return (
      <section className={cx('head_goback')} onClick={goBack}>
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" version="1.1">
          <polyline points="12,18 4,9 12,0" style={polyline} />
        </svg>
      </section>
    );
  }
  renderRight() {
    const { right, signinUp, userInfo } = this.props;
    if (right) {
      return right;
    }
    if (signinUp) {
      return (
        <Link to={userInfo ? '/profile' : '/login'} className={cx('head_login')}>
          {
            userInfo ? (
              <svg className={cx('user_avatar')}>
                <use xlinkHref="#user" />
              </svg>
            ) : (<span className={cx('login_span')}>登录|注册</span>)
          }
        </Link>
      );
    }
    return null;
  }
  render() {
    const { headTitle } = this.props;
    return (
      <header className={cx('head_top')}>
        {this.renderLeft()}
        <section className={cx('title_head', 'ellipsis')}>
          <span className={cx('title_text')}>{headTitle}</span>
        </section>
        {this.renderRight()}
      </header>
    );
  }
}

HeadTop.propTypes = propTypes;
HeadTop.defaultProps = defaultProps;

export default HeadTop;
