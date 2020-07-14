import styled, { css } from 'styled-components';

const mainColor = 'grey';
const subColor = 'black';

const shrinkedLabel = css`
  top: -14px;
  font-size: 12px;
  color: ${mainColor};
`;

const passwordStyles = css`
  letter-spacing: 0.3em;
`;

const getPasswordStyles = props => {
  return props.type === 'password' ? passwordStyles : null;
};

const getShrinkedStyles = props => {
  return props.value.length ? shrinkedLabel : null;
};

export const FormInputContainer = styled.input`
  background: none;
  background-color: white;
  color: ${subColor};
  font-size: 16px;
  padding: 10px 10px 10px 5px;
  display: block;
  width: 100%;
  border: none;
  border-radius: 0;
  border-bottom: 1px solid ${subColor};
  margin: 25px 0;

  &:focus {
    outline: none;
  }

  &:focus ~ .form-input-label {
    ${shrinkedLabel}
  }

  &:-internal-autofill-selected ~ .form-input-label {
    ${shrinkedLabel}
  }
  ${getPasswordStyles}
`;

export const GroupContainer = styled.div`
  position: relative;
  margin: 45px 0;
`;

export const LabelContainer = styled.label`
  color: ${subColor};
  font-size: 16px;
  font-weight: normal;
  position: absolute;
  pointer-events: none;
  left: 5px;
  top: 10px;
  transition: 300ms ease all;

  ${getShrinkedStyles}
`;
