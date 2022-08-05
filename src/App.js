import React from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import MainScreen from './pages/MainScreen';
import Cart from './pages/Cart';
import './App.css';

class App extends React.Component {
  state = {
    nameEntered: '',
  };

  handleChange = (event) => {
    this.setState(() => ({ [event.target.name]: event.target.value }));
  };

  render() {
    const { nameEntered } = this.state;
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/cart" component={ Cart } />
          <Route
            exact
            path="/"
            render={ () => (<MainScreen
              nameEntered={ nameEntered }
              onInputChange={ this.handleChange }
            />) }
          />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
