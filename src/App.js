import React, { useEffect, lazy, suspense, Suspense } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import Header from "./components/header/header.component";
import Spinner from "./components/spinner/spinner.component";
import {
  auth,
  createUserProfileDocument,
  addCollectionAndDocuments,
} from "./firebase/firebase.utils";
import { selectCurrentUser } from "./redux/user/user.selector";
import "./App.scss";

import { setCurrentUser } from "./redux/user/user.actions";

const HomePage = lazy(() => import("./pages/homepage/homepage.component"));
const ShopPage = lazy(() => import("./pages/shop/shop.component"));
const SignInAndSignUpPage = lazy(() =>
  import("./pages/sign-in-and-sign-up/sign-in-and-sign-up.component")
);
const CheckoutPage = lazy(() => import("./pages/checkout/checkout.component"));

let unsubscribeFromAuth = null;
function App(props) {
  const { currentUser, setCurrentUser } = props;

  useEffect(() => {
    createUser();
    return () => {
      unsubscribeFromAuth();
    };
  }, []);

  const createUser = () => {
    unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot((snapShot) => {
          setCurrentUser({
            id: snapShot.id,
            ...snapShot.data(),
          });
        });
      } else {
        setCurrentUser(null);
      }
    });
  };

  return (
    <div>
      <Header></Header>
      <Switch>
        <Suspense fallback={<Spinner></Spinner>}>
          <Route
            exact
            path="/signin"
            render={() =>
              currentUser ? (
                <Redirect to="/"></Redirect>
              ) : (
                <SignInAndSignUpPage></SignInAndSignUpPage>
              )
            }
          ></Route>
          <Route exact path="/" component={HomePage}></Route>
          <Route path="/shop" component={ShopPage}></Route>
          <Route exact path="/checkout" component={CheckoutPage}></Route>
        </Suspense>
      </Switch>
    </div>
  );
}

const stateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
});

const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: (user) => dispatch(setCurrentUser(user)),
});

export default connect(stateToProps, mapDispatchToProps)(App);
