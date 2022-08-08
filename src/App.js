import React from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import MainScreen from './pages/MainScreen';
import Cart from './pages/Cart';
import './App.css';
import ProductDetails from './pages/ProductDetails';

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
          <Route exact path="/product/:id" component={ ProductDetails } />
          <Route
            exact
            path="/"
            render={ () => (<MainScreen clicked={ this.sendToCart } />) }
          />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
