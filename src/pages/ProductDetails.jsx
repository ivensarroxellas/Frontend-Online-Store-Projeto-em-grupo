import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { getByProductId } from '../services/api';

class ProductDetails extends Component {
  constructor() {
    super();

    this.state = {
      productDetail: {},
      ready: false,
    };
  }

  async componentDidMount() {
    const { match: { params: { id } } } = this.props;
    const productDetail = await getByProductId(id);
    console.log(productDetail);
    this.setState({ productDetail });
  }

  redirectToCart = () => {
    this.setState({ ready: true });
  };

  render() {
    const {
      productDetail,
      ready,
    } = this.state;
    const { clicked } = this.props;
    return (
      <div>
        <p data-testid="product-detail-name">{productDetail.title}</p>
        <img
          src={ productDetail.thumbnail }
          alt={ productDetail.title }
          data-testid="product-detail-image"
        />
        <p data-testid="product-detail-price">{productDetail.price}</p>
        <section>
          <Link to="/cart" data-testid="shopping-cart-button" />
        </section>
        <button
          data-testid="product-detail-add-to-cart"
          type="button"
          onClick={ () => clicked(productDetail) }
        >
          Adicionar ao Carrinho
        </button>
        <button
          type="button"
          data-testid="shopping-cart-button"
          onClick={ this.redirectToCart }
        >
          Ir para o carrinho
        </button>
        {ready && <Redirect to="/cart" />}
      </div>
    );
  }
}

ProductDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  clicked: PropTypes.func.isRequired,
};

export default ProductDetails;
