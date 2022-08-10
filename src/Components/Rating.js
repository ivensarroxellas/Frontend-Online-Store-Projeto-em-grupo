import React from 'react';
import PropTypes from 'prop-types';

class Rating extends React.Component {
  render() {
    const {
      value,
      onRateClick,
    } = this.props;

    return (
      <div>
        <button
          data-testid={ `${value}-rating` }
          type="submit"
          value={ value }
          onClick={ onRateClick }
        >
          { value }
        </button>
      </div>
    );
  }
}

Rating.propTypes = {
  value: PropTypes.string.isRequired,
  onRateClick: PropTypes.func.isRequired,
};

export default Rating;
