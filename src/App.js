import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import './App.css';

import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import CheckoutPage from './pages/checkout/checkout-component';

import Header from './components/header/header.component';

import { selectCurrentUser } from './redux/user/user.selectors';
import { checkUserSession } from './redux/user/user.actions';

import { setHidden } from './redux/cart/cart.actions';
import { selectCartHidden } from './redux/cart/cart.selectors';
import { CartIconContainer } from './components/cart/cart-icon/cart-icon.styles';
import { CartDropDownContainer } from './components/cart/cart-dropdown/cart-dropdown.styles';

import { selectCollectionsForPreview } from './redux/shop/shop.selectors';

class App extends React.Component {
  unsubscribeFromAuth = null;
  handleAppClick = event => {
    const cartRef = document.querySelector(CartIconContainer);
    const cartDropDownRef = document.querySelector(CartDropDownContainer);

    const { setHidden, hidden } = this.props;
    if (
      !hidden &&
      (!event.target.className ||
        event.target.className.toString().indexOf('add-to-cart') < 0) &&
      cartRef &&
      !cartRef.contains(event.target) &&
      cartDropDownRef &&
      !cartDropDownRef.contains(event.target)
    ) {
      setHidden();
    }
  };

  componentDidMount() {
    document.body.addEventListener('click', this.handleAppClick);
    const { checkUserSession } = this.props;
    checkUserSession();
  }

  componentWillUnmount() {
    document.body.removeEventListener('click', this.handleAppClick);
  }

  render() {
    return (
      <div>
        <Header />
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route path='/shop' component={ShopPage} />
          <Route exact path='/checkout' component={CheckoutPage} />
          <Route
            exact
            path='/signin'
            render={() =>
              this.props.currentUser ? (
                <Redirect to='/' />
              ) : (
                <SignInAndSignUpPage />
              )
            }
          />
        </Switch>
      </div>
    );
  }
}

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
