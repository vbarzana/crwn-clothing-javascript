import React, { useEffect } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import './App.css';

import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import CheckoutPage from './pages/checkout/checkout-component';
import PaymentSuccess from './pages/payment-success/payment-success.component';

import Header from './components/header/header.component';

import { selectCurrentUser } from './redux/user/user.selectors';
import { checkUserSession } from './redux/user/user.actions';

import { setHidden } from './redux/cart/cart.actions';
import { selectCartHidden } from './redux/cart/cart.selectors';
import { selectCollectionsForPreview } from './redux/shop/shop.selectors';

const App = ({ checkUserSession, currentUser, setHidden, hidden }) => {
  useEffect(() => {
    checkUserSession();
  }, [checkUserSession]);

  const handleAppClick = () => {
    if (!hidden) {
      setHidden();
    }
  };

  return (
    <div onClick={handleAppClick}>
      <Header />
      <Switch>
        <Route exact path='/' component={HomePage} />
        <Route path='/shop' component={ShopPage} />
        <Route exact path='/checkout' component={CheckoutPage} />
        <Route exact path='/success' component={PaymentSuccess} />
        <Route
          exact
          path='/signin'
          render={() =>
            currentUser ? <Redirect to='/' /> : <SignInAndSignUpPage />
          }
        />
      </Switch>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  hidden: selectCartHidden,
  collectionsArray: selectCollectionsForPreview
});

const mapDispatchToProps = dispatch => ({
  setHidden: cart => dispatch(setHidden(cart)),
  checkUserSession: () => dispatch(checkUserSession())
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
