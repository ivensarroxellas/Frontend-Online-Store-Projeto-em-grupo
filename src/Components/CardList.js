import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class CardList extends React.Component {
  constructor(props) {
    super(props);
    const { title, image, price, id, availableQuantity } = this.props;

    this.state = {
      cartList: {
        prodTitle: title,
        prodPrice: price,
        prodId: id,
        prodImage: image,
        prodQTD: 1,
        aQuantity: availableQuantity,
      },
    };
  }

  readList = () => JSON.parse(localStorage.getItem('cartList'));

  saveList = (list) => localStorage
    .setItem('cartList', JSON.stringify(list));

  removeItem = (target) => {
    const localList = this.readList();
    this.saveList(localList.filter((item) => item.prodId !== target));
  }

  handleCart = () => {
    const { cartList } = this.state;
    const { title, image, price, id, availableQuantity, cCItens } = this.props;
    if (!JSON.parse(localStorage.getItem('cartList'))) {
      localStorage.setItem('cartList', JSON.stringify([]));
    }
    const localList = this.readList();
    if (localList.length === 0) {
      this.saveList([...localList, cartList]);
    }
    localList.forEach((element) => {
      if (cartList.prodId === element.prodId) {
        this.setState((previous) => ({
          cartList: {
            ...cartList,
            prodQTD: previous.cartList.prodQTD + 1,
          },
        }));
      } else {
        this.setState(() => ({
          cartList: {
            ...cartList,
            prodTitle: title,
            prodPrice: price,
            prodId: id,
            prodImage: image,
            prodQTD: 1,
            aQuantity: availableQuantity,
          },
        }));
        this.saveList([...localList, cartList]);
      }
    });
    cCItens();
  };

  handleCards = () => {
    const { title, image, price, id, freeShipping } = this.props;
    return (
      <div>
        <Link to={ `/product/${id}` }>
          <section data-testid="product-detail-link">
            <div
              data-testid="product"
              id={ id }
            >

              <p>{title}</p>
              <img src={ image } alt={ title } />
              <p>
                R$
                {' '}
                { price }
              </p>
              {freeShipping === true && <p data-testid="free-shipping">Frete Grátis</p>}
            </div>
          </section>
        </Link>
        <button
          data-testid="product-add-to-cart"
          type="button"
          onClick={ this.handleCart }
        >
          Adicionar ao Carrinho
        </button>
      </div>
    );
  }

  render() {
    return (
      <>{ this.handleCards() }</>
    );
  }
}

CardList.propTypes = {
  title: PropTypes.string,
  image: PropTypes.string,
  price: PropTypes.number,
  availableQuantity: PropTypes.number,
}.isRequired;

export default CardList;
