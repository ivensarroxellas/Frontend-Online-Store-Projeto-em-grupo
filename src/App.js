import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import Cart from './pages/Cart';
import MainScreen from './pages/MainScreen';
import ProductDetails from './pages/ProductDetails';
import Checkout from './pages/Checkout';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      productSelected: [],
    };
  }

  sendToCart = (product) => {
    const { productSelected } = this.state;
    const existingProduct = productSelected.find(({ product: { id } }) => (
      id === product.id));
    if (existingProduct === undefined) {
      const cartProduct = {
        product,
        quantity: 1,
      };
      this.setState({
        productSelected: [...productSelected, cartProduct],
      });
    } else {
      this.setState({
        productSelected: productSelected.map((item) => {
          if (item.product.id === product.id) {
            const newQuantity = item.quantity + 1;
            return { ...item, quantity: newQuantity };
          }
          return item;
        }),
      });
    }
  }

  render() {
    const { productSelected } = this.state;
    return (
      <BrowserRouter>
        <Switch>
          <Route
            exact
            path="/cart"
            render={ () => (<Cart productSelected={ productSelected } />) }
          />
          <Route
            exact
            path="/product/:id"
            render={ (props) => (<ProductDetails
              { ...props }
              clicked={ this.sendToCart }
            />) }
          />
          <Route
            exact
            path="/"
            render={ () => (<MainScreen clicked={ this.sendToCart } />) }
          />
          <Route
            exact
            path="/checkout"
            component={ Checkout }
          />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
