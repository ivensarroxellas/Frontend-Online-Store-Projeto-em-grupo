import React from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import MainScreen from './pages/MainScreen';
import './App.css';

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
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
