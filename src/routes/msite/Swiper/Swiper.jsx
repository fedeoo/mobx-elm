import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import SwipeableViews from 'react-swipeable-views';
import classNames from 'classnames/bind';
import styles from './Swiper.scss';

const cx = classNames.bind(styles);

const propTypes = {
  foodTypes: PropTypes.array,
};
const defaultProps = {
  geohash: '',
  foodTypes: [],
};

const renderSlide = item => (
  item.map(foodItem => (
    <Link to={foodItem.toPath} key={foodItem.id} className={cx('link_to_food')}>
      <figure>
        <img src={foodItem.image_url} alt="" />
        <figcaption>{foodItem.title}</figcaption>
      </figure>
    </Link>
  ))
);

class Swiper extends Component {
  constructor() {
    super();
    this.state = {
      index: 0,
    };
    this.onChangeIndex = this.onChangeIndex.bind(this);
  }
  onChangeIndex(index) {
    this.setState({ index });
  }
  render() {
    const { foodTypes } = this.props;
    return (
      <div className={cx('swiper-container')}>
        <SwipeableViews className={cx('swiper-wrapper')} index={this.state.index} onChangeIndex={this.onChangeIndex}>
          {
            foodTypes.map((item, index) => (
              <div className={cx('swiper-slide', 'food_types_container')} key={index}>
                {renderSlide(item)}
              </div>
            ))
          }
        </SwipeableViews>
        <div className={cx('swiper-pagination', 'swiper-pagination-bullets')}>
          {
            foodTypes.map((item, index) => {
              const bulletClass = cx({
                'swiper-pagination-bullet': true,
                'swiper-pagination-bullet-active': index === this.state.index,
              });
              return (
                <span className={bulletClass} key={index} />
              );
            })
          }
        </div>
      </div>
    );
  }
}

Swiper.propTypes = propTypes;
Swiper.defaultProps = defaultProps;

export default Swiper;
