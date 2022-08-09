import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Cart extends Component {
  render() {
    const { productSelected } = this.props;
    return (
      <ul>
        {productSelected.length === 0
          ? <h1 data-testid="shopping-cart-empty-message"> Seu carrinho está vazio</h1>
          : productSelected.map((cartProduct) => (
            <li key={ cartProduct.product.category_id }>
              <h3 data-testid="shopping-cart-product-name">
                {
                  cartProduct.product.title
                }

              </h3>
              <span>
                R$
                {' '}
                { cartProduct.product.price }
              </span>
              <img
                src={ cartProduct.product.thumbnail }
                alt={ cartProduct.product.title }
              />
              <span data-testid="shopping-cart-product-quantity">
                Quantidade de produtos :
                {' '}
                {cartProduct.quantity}
              </span>
            </li>))}
      </ul>
    );
  }
}

Cart.propTypes = {
  productSelected: PropTypes.arrayOf(PropTypes.object).isRequired,
}.isRequired;

export default Cart;
