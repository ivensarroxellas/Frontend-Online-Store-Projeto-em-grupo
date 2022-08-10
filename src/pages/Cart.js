import React from 'react';
import { Link } from 'react-router-dom';
import CartList from '../Components/CartList';

class Cart extends React.Component {
  readList = () => JSON.parse(localStorage.getItem('cartList'));

  saveList = (list) => localStorage
    .setItem('cartList', JSON.stringify(list));

  render() {
    if (!JSON.parse(localStorage.getItem('cartList'))) {
      localStorage.setItem('cartList', JSON.stringify([]));
    }
    const cartList = this.readList();
    return (
      <div className="shopping-card">
        {
          cartList.length === 0
            ? (
              <div
                data-testid="shopping-cart-empty-message"
              >
                Seu carrinho está vazio
              </div>)
            : cartList.map((prod) => (
              <CartList
                key={ prod.prodId }
                title={ prod.prodTitle }
                image={ prod.prodImage }
                price={ prod.prodPrice }
                id={ prod.prodId }
                qtd={ prod.prodQTD }
              />
            ))
        }
        <Link to="/checkout" data-testid="checkout-products">Ir para o Checkout</Link>
      </div>
    );
  }
}
export default Cart;
