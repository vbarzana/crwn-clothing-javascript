import React from 'react';
import './App.css';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import CheckoutPage from './pages/checkout/checkout-component';
import Header from './components/header/header.component';
import { setCurrentUser } from './redux/user/user.actions';
import { setHidden } from './redux/cart/cart.actions';
import { selectCurrentUser } from './redux/user/user.selectors';
import { selectCartHidden } from './redux/cart/cart.selectors';
import { CartIconContainer } from './components/cart/cart-icon/cart-icon.styles';
import { CartDropDownContainer } from './components/cart/cart-dropdown/cart-dropdown.styles';

import { auth, createUserProfileDocument } from './firebase/firebase.utils';

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
    const { setCurrentUser, collectionsArray } = this.props;

    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        try {
          const userRef = await createUserProfileDocument(userAuth);

          userRef.onSnapshot(snapshot => {
            setCurrentUser({
              id: snapshot.id,
              ...snapshot.data()
            });
          });
        } catch (error) {
          console.error(error);
        }
      }
      setCurrentUser(userAuth);
    });
  }

  componentWillUnmount() {
    document.body.removeEventListener('click', this.handleAppClick);

    this.unsubscribeFromAuth();
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
  setCurrentUser: user => dispatch(setCurrentUser(user)),
  setHidden: cart => dispatch(setHidden(cart))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
