import UserActionTypes from './user.types';

const INITIAL_STATE = {
  currentUser: null,
  error: null,
  signUpError: null
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UserActionTypes.SIGN_IN_SUCCESS:
      return {
        ...state,
        error: null,
        currentUser: action.payload
      };
    case UserActionTypes.SIGN_OUT_SUCCESS:
      return {
        ...state,
        error: null,
        currentUser: null
      };
    case UserActionTypes.SIGN_IN_FAILURE:
    case UserActionTypes.SIGN_OUT_FAILURE:
      return {
        ...state,
        error: action.payload
      };
    case UserActionTypes.SIGN_UP_FAILURE:
      return {
        ...state,
        signUpError: action.payload
      };
    default:
      return state;
  }
};

export default userReducer;
