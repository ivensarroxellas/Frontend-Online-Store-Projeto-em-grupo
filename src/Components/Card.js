import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Card extends Component {
  render() {
    const { result, onClick } = this.props;
    const { title, thumbnail, price, id } = result;
    return (
      <div data-testid="product">
        <h3>
          <Link
            to={ `/product/${id}` }
            data-testid="product-detail-link"
          >
            { title }
          </Link>
        </h3>
        <img
          src={ thumbnail }
          alt={ title }
          data-testid="product-detail-link"
        />
        <span>
          R$:
          { price }
        </span>
        <section>
          <button
            data-testid="product-add-to-cart"
            type="button"
            onClick={ onClick }
          >
            Adicionar ao Carrinho
          </button>
        </section>
      </div>
    );
  }
}

Card.propTypes = {
  title: PropTypes.string,
  thumbnail: PropTypes.string,
  price: PropTypes.number,
  id: PropTypes.number,
  onClick: PropTypes.func,
}.isRequired;

export default Card;
