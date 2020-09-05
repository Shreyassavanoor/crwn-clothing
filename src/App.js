import React from 'react';
import { Switch, Route } from 'react-router-dom';

import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import Header from './components/header/header.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import './App.scss';

function App() {
  return (
    <div>
      <Header></Header>
      <Switch>
        <Route exact path="/signin" component={SignInAndSignUpPage}></Route>
        <Route exact path="/" component={HomePage}></Route>
        <Route exact path="/shop" component={ShopPage}></Route> 
      </Switch>
    </div>
  );
}

export default App;
