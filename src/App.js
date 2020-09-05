import React, { useEffect, useState } from 'react';
import { Switch, Route } from 'react-router-dom';

import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import Header from './components/header/header.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import { auth, createUserProfileDocument } from './firebase/firebase.utils';
import './App.scss';

let unsubscribeFromAuth = null;
function App() {

  const [ currentUser, setCurrentUser ] = useState(null);

  useEffect(() => {
    unsubscribeFromAuth =  auth.onAuthStateChanged(async userAuth => {
      if(userAuth) {
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot(snapShot => {
          setCurrentUser({
            id: snapShot.id,
            ...snapShot.data()
          });
        });
      } else {
        setCurrentUser(null);
      }
    });

    return () => {
      unsubscribeFromAuth();
    }

  }, []);

  return (
    <div>
      <Header currentUser={currentUser}></Header>
      <Switch>
        <Route exact path="/signin" component={SignInAndSignUpPage}></Route>
        <Route exact path="/" component={HomePage}></Route>
        <Route exact path="/shop" component={ShopPage}></Route> 
      </Switch>
    </div>
  );
}

export default App;
