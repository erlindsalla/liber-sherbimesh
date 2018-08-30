import React, { Component } from 'react';
import SignUpComponent from './components/sign-up/SignUpComponent';
import {HashRouter,Route, Switch } from 'react-router-dom';
import LoginComponent from './components/login/LoginComponent';
import SherbimeInsertComponent from './components/sherbime/SherbimeInsertComponent';
import SherbimeShowComponent from './components/sherbime/SherbimeShowComponent'
import './animated.css';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
      <HashRouter>
        <Switch>
          <Route exact path="/" component={LoginComponent}/>
          <Route exact path="/login" component={LoginComponent} />
          <Route exact path="/register" component={SignUpComponent} />
          <Route exact path="/sherbime" component={SherbimeInsertComponent} />
          <Route exact path="/sherbim/:id" component={SherbimeShowComponent}  />
        </Switch>
      </HashRouter>
      </div>
    );
  }
}

export default App;
