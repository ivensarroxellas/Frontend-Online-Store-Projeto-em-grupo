import React from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import MainScreen from './pages/MainScreen';
import Cart from './pages/Cart';
import './App.css';
import ProductDetails from './pages/ProductDetails';

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/cart" component={ Cart } />
          <Route exact path="/product/:id" component={ ProductDetails } />
          <Route
            exact
            path="/"
            render={ () => (<MainScreen />) }
          />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
