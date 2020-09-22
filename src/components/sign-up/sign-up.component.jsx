import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import FormInput from '../generic/form-input/form-input.component';
import CustomButton from '../generic/custom-button/custom-button.component';

import { emailSignUpStart } from '../../redux/user/user.actions';
import {selectSignUpError } from '../../redux/user/user.selectors';

import './sign-up.styles.scss';

class SignUp extends React.Component {
  constructor() {
    super();
    this.state = {
      displayName: '',
      email: '',
      password: '',
      confirmPassword: ''
    };
  }

  handleSubmit = async event => {
    event.preventDefault();
    const { emailSignUpStart } = this.props;
    const { displayName, email, password, confirmPassword } = this.state;

    if (password !== confirmPassword) {
      alert("passwords don't match");
      return;
    }
    emailSignUpStart({
      email,
      password,
      displayName
    });
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  render() {
    const { displayName, email, password, confirmPassword } = this.state;
    const { signUpError } = this.props;

    return (
      <div className='sign-up'>
        <h2 className='title'>I do not have an account</h2>
        <span>Sign up with your email and password</span>
        <form className='sign-up-form' onSubmit={this.handleSubmit}>
          <FormInput
            type='text'
            name='displayName'
            value={displayName}
            onChange={this.handleChange}
            label='Display Name'
            autoComplete='displayName'
            required
          />
          <FormInput
            type='email'
            name='email'
            value={email}
            autoComplete='new-email'
            onChange={this.handleChange}
            label='Email'
            required
          />
          <FormInput
            type='password'
            name='password'
            value={password}
            autoComplete='new-password'
            onChange={this.handleChange}
            label='Password'
            required
          />
          <FormInput
            type='password'
            name='confirmPassword'
            autoComplete='new-password-confirm'
            value={confirmPassword}
            onChange={this.handleChange}
            label='Confirm password'
            required
          />
          <span
            style={{ color: 'red', display: 'flex', paddingBottom: '25px' }}
          >
            {signUpError}
          </span>
          <CustomButton type='submit'> SIGN UP </CustomButton>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  emailSignUpStart: userCredentials =>
    dispatch(emailSignUpStart(userCredentials))
});

const mapStateToProps = createStructuredSelector({
  signUpError: selectSignUpError
});
export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
