import React, { Component } from 'react';

export default class Cart extends Component {
  state = {
    // carrinho de compras
    slot: [],
  }

  render() {
    const { slot } = this.state;
    return (
      <div>
        {slot.length === 0
          && (
            <h1 data-testid="shopping-cart-empty-message">
              Seu carrinho está vazio
            </h1>
          )}
      </div>
    );
  }
}
