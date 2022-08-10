import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import CardList from '../Components/CardList';
import Category from '../Components/Category';
import * as api from '../services/api';

class MainScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchResult: undefined,
      nameEntered: '',
      ready: false,
      products: [],
    };
  }

  handleClicktoCart = (event) => {
    event.preventDefault();
    this.setState({
      ready: true,
    });
  }

  handleChange = (event) => {
    const { name, value } = event.target;

    this.setState(() => ({ [name]: value }));
  };

  handleSubmitSearch = async (event) => {
    event.preventDefault();

    const { nameEntered } = this.state;
    const apiObj = await api.getByQuery(nameEntered);
    const { results } = apiObj;

    this.setState({ products: results });
  }

  handleGetByCategory = async (categoryId) => {
    const category = await api.getByCategory(categoryId);
    return category;
  }

  handleClick = async ({ target }) => {
    const categoryItems = await this.handleGetByCategory(target.id);
    this.setState({
      searchResult: categoryItems.results,
    });
  }

  render() {
    const { ready, nameEntered, products, searchResult } = this.state;
    const { clicked } = this.props;

    return (
      <div>
        { ready && <Redirect push to="/cart" />}
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
            onClick={ this.handleSubmitSearch }
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
                    {`R$: ${product.price}`}
                    {product.shipping.free_shipping === true
                      && <p data-testid="free-shipping">Frete Grátis</p>}
                    <h3>
                      <Link
                        to={ `/product/${product.id}` }
                        data-testid="product-detail-link"
                      >
                        Product Details
                      </Link>
                    </h3>
                    <section>
                      <button
                        data-testid="product-add-to-cart"
                        type="button"
                        onClick={ () => clicked(product) }
                      >
                        Adicionar ao Carrinho
                      </button>
                    </section>
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
        <aside>
          <Category onClick={ this.handleClick } />
          <div>
            {
              searchResult !== undefined && searchResult
                .map((element) => (<CardList
                  key={ element.id }
                  id={ element.id }
                  title={ element.title }
                  image={ element.thumbnail }
                  price={ element.price }
                  availableQuantity={ element.available_quantity }
                  freeShipping={ element.shipping.free_shipping }
                  onClick={ this.handleCartItem }
                />
                ))
            }
          </div>
        </aside>
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
  onClick: PropTypes.func,
}.isRequired;

export default MainScreen;
