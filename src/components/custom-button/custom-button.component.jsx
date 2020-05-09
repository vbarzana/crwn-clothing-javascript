import React from 'react';
import './custom-button.styles.scss';

const CustomButton = ({ additionalClassName, children, isGoogleSignIn,inverted, ...otherProps }) => (
  <button
    className={`${additionalClassName} ${inverted ? 'inverted' : ''} ${isGoogleSignIn ? 'google-sign-in' : ''} custom-button`}
    {...otherProps}
  >
    {children}
  </button>
);

export default CustomButton;
