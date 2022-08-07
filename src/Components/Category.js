import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getCategories } from '../services/api';

class Category extends Component {
  constructor() {
    super();
    this.state = {
      categories: [],
    };
  }

  componentDidMount() {
    this.fetchCategories();
  }

  fetchCategories = async () => {
    const categories = await getCategories();
    this.setState({ categories });
  }

  render() {
    const { categories } = this.state;
    const { onClick } = this.props;
    return (
      <div>
        <h5>
          Lista de Categorias
        </h5>
        <div>
          {categories.map(({ id, name }) => (
            <button
              type="button"
              key={ id }
              data-testid="category"
              onClick={ onClick }
            >
              { name }
            </button>
          ))}
        </div>
      </div>
    );
  }
}

Category.propTypes = {
  onClick: PropTypes.func.isRequired,
}.isRequired;

export default Category;
