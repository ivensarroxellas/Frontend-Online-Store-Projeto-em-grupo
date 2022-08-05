import React, { Component } from 'react';
import * as api from '../services/api';

class MainScreen extends Component {
  state = {
    nameEntered: '',
    products: [],
  };

  handleChange = (event) => {
    const { name, value } = event.target;

    this.setState(() => ({ [name]: value }));
  };

  handleSubmit = async (event) => {
    event.preventDefault();

    const { nameEntered } = this.state;
    const apiObj = await api.getProductsFromCategoryAndQuery(nameEntered);
    const { results } = apiObj;

    this.setState({ products: results });
  }

  render() {
    const { nameEntered, products } = this.state;

    return (
      <div>
        <section>Seja bem-vindo, por favor insira no campo de busca o que deseja</section>
        <form>
          <label htmlFor="Name">
            Nome
            <input
              data-testid="query-input"
              id="Name"
              name="nameEntered"
              type="text"
              placeholder="Digite algum termo de pesquisa ou escolha uma categoria."
              value={ nameEntered }
              onChange={ this.handleChange }
            />
          </label>
          <button
            data-testid="query-button"
            type="submit"
            onClick={ this.handleSubmit }
          >
            Pesquisar
          </button>
          {products.length === 0 ? <p>Nenhum produto foi encontrado</p>
            : (
              <ul>
                {products.map((product) => (
                  <li
                    data-testid="product"
                    key={ product.id }
                  >
                    {product.title}
                    <img src={ product.thumbnail } alt="Product Thumbnail" />
                    {product.price}
                  </li>
                ))}
              </ul>
            )}
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

export default MainScreen;
