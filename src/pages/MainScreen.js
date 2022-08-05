import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

class MainScreen extends Component {
  state = {
    ready: false,
  }

  handleClicktoCart = (event) => {
    // Em vez de usar o History, usamos o redirect na linha 23 condicionada ao estado de um objeto.
    event.preventDefault();
    this.setState({
      ready: true,
    });
  }

  render() {
    const { nameEntered, onInputChange } = this.props;
    const { ready } = this.state;
    return (
      <div>
        { ready && <Redirect push to="/cart" />}
        <section>Seja bem-vindo, por favor insira no campo de busca o que deseja</section>
        <form>

          <label htmlFor="Name">
            Nome
            <input
              id="Name"
              name="nameEntered"
              type="text"
              placeholder="Digite algum termo de pesquisa ou escolha uma categoria."
              value={ nameEntered }
              onChange={ onInputChange }
            />
          </label>
          {nameEntered.length < 1
          && (
            <h1
              data-testid="home-initial-message"
            >
              Digite algum termo de pesquisa ou escolha uma categoria.
            </h1>)}
        </form>
        <button
          type="submit"
          data-testid="shopping-cart-button"
          onClick={ this.handleClicktoCart }
        >
          Carrinho de Compras
        </button>

      </div>

    );
  }
}

MainScreen.propTypes = {
  nameEntered: PropTypes.string.isRequired,
  onInputChange: PropTypes.func.isRequired,
};

export default MainScreen;
