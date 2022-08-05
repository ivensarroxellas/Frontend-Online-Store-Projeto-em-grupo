import React, { Component } from 'react';
import PropTypes from 'prop-types';

class MainScreen extends Component {
  render() {
    const { nameEntered, onInputChange } = this.props;
    return (
      <div>
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
      </div>

    );
  }
}

MainScreen.propTypes = {
  nameEntered: PropTypes.string.isRequired,
  onInputChange: PropTypes.func.isRequired,
};

export default MainScreen;
