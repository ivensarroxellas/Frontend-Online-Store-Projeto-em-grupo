import React, { Component } from 'react';

class CountCartItens extends Component {
  constructor(props) {
    super(props);

    this.state = {
      countCartItens: 0,
    };
  }

  componentDidMount() {
    this.countCart();
  }

  readList = () => JSON.parse(localStorage.getItem('cartList'));

  countCart = () => {
    if (!JSON.parse(localStorage.getItem('cartList'))) {
      localStorage.setItem('cartList', JSON.stringify([]));
    }
    const localList = this.readList();
    if (localList.length === 0) {
      this.setState(({
        countCartItens: 0,
      }));
    } else {
      let cartCount = 0;
      localList.forEach((element) => {
        cartCount += element.prodQTD;
      });
      this.setState(({
        countCartItens: cartCount,
      }));
    }
  }

  render() {
    const { countCartItens } = this.state;
    this.countCart();
    return (
      <span data-testid="shopping-cart-size">
        { countCartItens }
      </span>
    );
  }
}

export default CountCartItens;
