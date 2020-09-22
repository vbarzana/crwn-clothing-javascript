import React from 'react';
import './sign-in.styes.scss';
import FormInput from '../generic/form-input/form-input.component';
import CustomButton from '../generic/custom-button/custom-button.component';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { selectError } from '../../redux/user/user.selectors';

import {
  googleSignInStart,
  emailSignInStart
} from '../../redux/user/user.actions';

class SignIn extends React.Component {
  state = {
    email: '',
    password: ''
  };

  handleSubmit = async event => {
    event.preventDefault();
    const { emailSignInStart } = this.props;
    const { email, password } = this.state;

    emailSignInStart(email, password);
  };

  handleChange = event => {
    const { value, name } = event.target;
    this.setState({ [name]: value });
  };

  render() {
    const { googleSignInStart, error } = this.props;
    return (
      <div className='sign-in'>
        <h2>I already have an account</h2>
        <span>Sign in with your email and password</span>
        <form onSubmit={this.handleSubmit}>
          <FormInput
            name='email'
            type='email'
            value={this.state.email}
            autoComplete='email'
            label='Email'
            handleChange={this.handleChange}
            required
          />
          <FormInput
            name='password'
            type='password'
            label='Password'
            autoComplete='password'
            value={this.state.password}
            handleChange={this.handleChange}
            required
          />
          <span
            style={{ color: 'red', display: 'flex', paddingBottom: '25px' }}
          >
            {error}
          </span>
          <div className='buttons'>
            <CustomButton type='submit'>Sign In</CustomButton>
            <CustomButton
              type='button'
              onClick={googleSignInStart}
              isGoogleSignIn
            >
              Sign In With Google
            </CustomButton>
          </div>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  googleSignInStart: () => dispatch(googleSignInStart()),
  emailSignInStart: (email, password) =>
    dispatch(emailSignInStart({ email, password }))
});

const mapStateToProps = createStructuredSelector({
  error: selectError
});
export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
