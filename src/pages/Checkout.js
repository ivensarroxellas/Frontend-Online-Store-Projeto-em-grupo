import React from 'react';

class Checkout extends React.Component {
  render() {
    return (
      <div>
        <form>
          <label htmlFor="checkout-fullname">
            <input data-testid="checkout-fullname" type="text" />
          </label>
          <label htmlFor="checkout-email">
            <input data-testid="checkout-email" type="email" />
          </label>
          <label htmlFor="checkout-cpf">
            <input data-testid="checkout-cpf" type="text" />
          </label>
          <label htmlFor="checkout-phone">
            <input data-testid="checkout-phone" type="tel" />
          </label>
          <label htmlFor="checkout-cep">
            <input data-testid="checkout-cep" type="text" />
          </label>
          <label htmlFor="checkout-address">
            <input data-testid="checkout-address" type="text" />
          </label>
          <label htmlFor="ticket-payment">
            <input data-testid="ticket-payment" type="radio" />
            {' '}
            Boleto
            <input data-testid="visa-payment" type="radio" />
            {' '}
            Visa
            <input data-testid="master-payment" type="radio" />
            {' '}
            MasterCard
            <input data-testid="elo-payment" type="radio" />
            {' '}
            Elo
          </label>
          <input data-testid="checkout-btn" type="button" />
        </form>
      </div>
    );
  }
}

export default Checkout;