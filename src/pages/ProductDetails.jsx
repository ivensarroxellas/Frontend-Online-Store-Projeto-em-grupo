import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Rating from '../Components/Rating';
import { getByProductId } from '../services/api';
import CardDetails from '../Components/CardDetails';

class ProductDetails extends Component {
  constructor() {
    super();

    this.state = {
      productDetail: {},
      email: '',
      rating: ['1', '2', '3', '4', '5'],
      chosenRate: undefined,
      comment: '',
      evaluations: [],
      invalidField: false,
      isDisabled: true,
    };
  }

  async componentDidMount() {
    const { match: { params: { id } } } = this.props;
    const productDetail = await getByProductId(id);
    const evaluations = this.getEvaluations();
    this.setState({ productDetail });

    if (evaluations !== null) {
      this.setState({ evaluations: this.getEvaluations() });
    }
  }

  setEvaluations = (list) => {
    const { match: { params: { id } } } = this.props;
    localStorage.setItem(id, JSON.stringify(list));
  }

  getEvaluations = () => {
    const { match: { params: { id } } } = this.props;
    return JSON.parse(localStorage.getItem(id));
  }

  validateForm = () => {
    const { email, chosenRate } = this.state;

    const regEx = /^[a-zA-Z0-9.-_]+@[a-z]+\.[a-z]{3,}$/igm;

    if (regEx.test(email) && chosenRate !== undefined) {
      this.setState({ isDisabled: false, invalidField: false });
    } else {
      this.setState({ isDisabled: true, invalidField: true });
    }
  }

  handleChange = (event) => {
    const { name, value } = event.target;

    this.setState({ [name]: value }, () => {
      this.validateForm();
    });
  }

  handleRateButton = (event) => {
    event.preventDefault();
    const { value } = event.target;

    this.setState({ chosenRate: value }, () => {
      this.validateForm();
    });
  }

  handleEvaluationSubmit = (event) => {
    event.preventDefault();

    const { email, chosenRate, comment } = this.state;

    const newEvaluation = {
      userEmail: email,
      rate: chosenRate,
      userComment: comment,
    };

    this.setState((prevState) => ({
      evaluations: [...prevState.evaluations, newEvaluation],
      email: '',
      chosenRate: undefined,
      comment: '',
      isDisabled: true,
    }));

    this.setState((prevState) => this.setEvaluations(prevState.evaluations));
  }

  render() {
    const {
      productDetail,
      email,
      rating,
      comment,
      evaluations,
      invalidField,
      isDisabled,
    } = this.state;
    
    return (
      <div>
        <CardDetails
          key={ productDetail.id }
          id={ productDetail.id }
          title={ productDetail.title }
          image={ productDetail.thumbnail }
          price={ productDetail.price }
          onClick={ this.redirectToCart }
        />
        <form>
          <label htmlFor="inputEmail">
            Email
            <input
              data-testid="product-detail-email"
              type="email"
              id="inputEmail"
              name="email"
              value={ email }
              onChange={ this.handleChange }
            />
          </label>
          {rating.map((rate) => (
            <Rating
              value={ rate }
              onRateClick={ this.handleRateButton }
              key={ rate }
            />
          ))}
          <label htmlFor="commentInput">
            Comente sua opinião sobre o produto
            <textarea
              data-testid="product-detail-evaluation"
              id="commentInput"
              name="comment"
              value={ comment }
              onChange={ this.handleChange }
            />
          </label>
          <button
            data-testid="submit-review-btn"
            type="submit"
            disabled={ isDisabled }
            onClick={ this.handleEvaluationSubmit }
          >
            Enviar avaliação
          </button>
          {invalidField && <p data-testid="error-msg">Campos inválidos</p>}
          {evaluations.map((evaluation) => (
            <section key={ Math.random() }>
              <div data-testid="review-card-email">{ evaluation.userEmail }</div>
              <div data-testid="review-card-rating">{ evaluation.rate }</div>
              <div data-testid="review-card-evaluation">{ evaluation.userComment }</div>
            </section>
          ))}
        </form>
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
