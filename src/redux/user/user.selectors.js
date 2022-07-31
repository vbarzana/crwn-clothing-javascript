import { createSelector } from 'reselect';

const selectUser = state => state.user;

export const selectCurrentUser = createSelector(
  [selectUser],
  user => user.currentUser
);

export const selectSignUpError = createSelector([selectUser], user =>
  user.signUpError ? user.signUpError.toString() : null
);

export const selectError = createSelector([selectUser], user =>
  user.error ? user.error.toString() : null
);
