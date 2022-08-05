import React from 'react';
import { Route, Switch } from 'react-router-dom';
import MainScreen from './pages/MainScreen';
import './App.css';

class App extends React.Component {
  state = {
    nameEntered: '',
  };

  handleChange = (event) => {
    this.setState(() => ({ [event.target.name]: event.target.value }),
      this.handledButton);
  };

  render() {
    const { nameEntered } = this.state;
    return (
      <>
        <p>olá</p>
        <Switch>
          <Route
            exact
            path="/"
            render={ () => (<MainScreen
              nameEntered={ nameEntered }
              onInputChange={ this.handleChange }
            />) }
          />
        </Switch>
      </>
    );
  }
}

export default App;
