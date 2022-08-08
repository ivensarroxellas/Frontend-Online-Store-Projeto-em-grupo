import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getByProductId } from '../services/api';

class ProductDetails extends Component {
  constructor() {
    super();

    this.state = {
      productDetail: {},
    };
  }

  async componentDidMount() {
    const { match: { params: { id } } } = this.props;
    const productDetail = await getByProductId(id);
    this.setState({ productDetail });
  }

  render() {
    const { productDetail: { title, thumbnail, price } } = this.state;
    return (
      <div>
        <p data-testid="product-detail-name">{ title }</p>
        <img src={ thumbnail } alt={ title } data-testid="product-detail-image" />
        <p data-testid="product-detail-price">{ price }</p>
        <section>
          <Link to="/cart" data-testid="shopping-cart-button" />
        </section>
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
};

export default ProductDetails;
