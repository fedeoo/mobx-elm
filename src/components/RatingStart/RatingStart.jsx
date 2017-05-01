import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './RatingStart.scss';

const cx = classNames.bind(styles);

const fiveLengthArray = [1, 2, 3, 4, 5];

const propTypes = {
  rating: PropTypes.number.isRequired,
};
const RatingStart = ({ rating }) => (
  <div className={cx('rating_container')}>
    <section className={cx('star_container')}>
      {
        fiveLengthArray.map((item, index) => (
          <svg className={cx('grey_fill')} key={index}>
            <use xlinkHref="#star" />
          </svg>
        ))
      }
    </section>
    <div style={{ width: `${(rating * 2) / 5}rem` }} className={cx('star_overflow')}>
      <section className={cx('star_container')}>
        {
          fiveLengthArray.map((item, index) => (
            <svg className={cx('orange_fill')} key={index}>
              <use xlinkHref="#star" />
            </svg>
          ))
        }
      </section>
    </div>
  </div>
);
RatingStart.propTypes = propTypes;

export default RatingStart;
