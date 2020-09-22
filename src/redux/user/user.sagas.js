import { takeLatest, put, all, call } from 'redux-saga/effects';

import UserActionTypes from './user.types';

import {
  signInSuccess,
  signInFailure,
  signOutFailure,
  signOutSuccess
} from './user.actions';

import {
  auth,
  getCurrentUser,
  googleProvider,
  createUserProfileDocument
} from '../../firebase/firebase.utils';

export function* getSnapshotFromUserAuth(userAuth) {
  const userRef = yield call(createUserProfileDocument, userAuth);
  const userSnapshot = yield userRef.get();
  yield put(signInSuccess({ id: userSnapshot.id, ...userSnapshot.data() }));
}

// Google Sign In
export function* signInWithGoogle() {
  try {
    const { user } = yield auth.signInWithPopup(googleProvider);
    yield getSnapshotFromUserAuth(user);
  } catch (error) {
    yield put(signInFailure(error));
  }
}

export function* onGoogleSignInStart() {
  yield takeLatest(UserActionTypes.GOOGLE_SIGN_IN_START, signInWithGoogle);
}

// Email sign in
export function* signInWithEmail({ payload: { email, password } }) {
  try {
    const { user } = yield auth.signInWithEmailAndPassword(email, password);
    yield getSnapshotFromUserAuth(user);
  } catch (error) {
    yield put(signInFailure(error));
  }
}

export function* onEmailSignInStart() {
  yield takeLatest(UserActionTypes.EMAIL_SIGN_IN_START, signInWithEmail);
}

// isAuthenticated
export function* isUserAuthenticated() {
  try {
    const userAuth = yield getCurrentUser();
    if (!userAuth) return;
    yield getSnapshotFromUserAuth(userAuth);
  } catch (error) {
    yield put(signInFailure(error));
  }
}

export function* onCheckUserSession() {
  yield takeLatest(UserActionTypes.CHECK_USER_SESSION, isUserAuthenticated);
}

// Sign out
export function* doSignOut() {
  try {
    yield auth.signOut();
    yield put(signOutSuccess());
  } catch (error) {
    yield put(signOutFailure(error));
  }
}

export function* onSignOutStart() {
  yield takeLatest(UserActionTypes.SIGN_OUT_START, doSignOut);
}

export function* userSagas() {
  yield all([
    call(onGoogleSignInStart),
    call(onEmailSignInStart),
    call(onCheckUserSession),
    call(onSignOutStart)
  ]);
}
