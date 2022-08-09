import React from 'react';
import PropTypes from 'prop-types';

class Checkout extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      fullname: '',
      email: '',
      cpf: '',
      telefone: '',
      cep: '',
      endereco: '',
      paymentMethod: '',
      isValid: true,
    };
  }

  readList = () => JSON.parse(localStorage.getItem('cartList'));

  cleanCart = () => localStorage.clear()

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState(() => ({ [name]: value }));
  };

  handleChangePayment = (event) => {
    this.setState({ paymentMethod: event.target.value });
  }

  handleCheckoutClick = (event) => {
    const { history } = this.props;
    event.preventDefault();
    const { fullname, email, cpf, telefone, cep, endereco, paymentMethod } = this.state;
    if (fullname.length > 0
      && email.length > 0
      && cpf.length > 0
      && telefone.length > 0
      && cep.length > 0
      && endereco.length > 0
      && paymentMethod.length > 0) {
      history.push('/');
      this.cleanCart();
    } else {
      this.setState({ isValid: false });
    }
  }

  render() {
    const { fullname, email, cpf, telefone, cep,
      endereco, isValid, paymentMethod } = this.state;

    return (
      <div>
        <ul>
          { this.readList().map((product) => (
            <li key={ product.prodId }>{ product.prodTitle }</li>
          )) }
        </ul>
        { isValid === false ? <p data-testid="error-msg">Campos inválidos</p> : '' }
        <form>
          <label htmlFor="checkout-fullname">
            <input
              data-testid="checkout-fullname"
              type="text"
              placeholder="Nome Completo"
              name="fullname"
              value={ fullname }
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="checkout-email">
            <input
              data-testid="checkout-email"
              type="email"
              placeholder="Email"
              name="email"
              value={ email }
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="checkout-cpf">
            <input
              data-testid="checkout-cpf"
              type="text"
              placeholder="CPF"
              name="cpf"
              value={ cpf }
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="checkout-phone">
            <input
              data-testid="checkout-phone"
              type="tel"
              placeholder="Telefone"
              name="telefone"
              value={ telefone }
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="checkout-cep">
            <input
              data-testid="checkout-cep"
              type="text"
              placeholder="CEP"
              name="cep"
              value={ cep }
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="checkout-address">
            <input
              data-testid="checkout-address"
              type="text"
              placeholder="Endereço"
              name="endereco"
              value={ endereco }
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="ticket-payment">
            <input
              data-testid="ticket-payment"
              type="radio"
              checked={ paymentMethod === 'ticket' }
              onChange={ this.handleChangePayment }
              value="ticket"
            />
            {' '}
            Boleto
            <input
              data-testid="visa-payment"
              type="radio"
              checked={ paymentMethod === 'visa' }
              onChange={ this.handleChangePayment }
              value="visa"
            />
            {' '}
            Visa
            <input
              data-testid="master-payment"
              type="radio"
              checked={ paymentMethod === 'master' }
              onChange={ this.handleChangePayment }
              value="master"
            />
            {' '}
            MasterCard
            <input
              data-testid="elo-payment"
              type="radio"
              checked={ paymentMethod === 'elo' }
              onChange={ this.handleChangePayment }
              value="elo"
            />
            {' '}
            Elo
          </label>
          <button
            data-testid="checkout-btn"
            type="submit"
            onClick={ this.handleCheckoutClick }
          >
            Comprar
          </button>
        </form>
      </div>
    );
  }
}

Checkout.propTypes = {
  history: PropTypes.shape({ push: PropTypes.func }),
}.isRequired;

export default Checkout;
