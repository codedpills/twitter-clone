import {
  SIGN_UP_SUCCESS,
  SIGN_UP_FAILURE,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT_SUCCESS,
  LOGOUT_FAILURE,
} from '../types';

export const login = (values) => {
  return (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();
    firebase
      .auth()
      .signInWithEmailAndPassword(values.email, values.password)
      .then(() => {
        dispatch({
          type: LOGIN_SUCCESS,
        });
      })
      .catch((err) => {
        dispatch({
          type: LOGIN_FAILURE,
          payload: err.message,
        });
      });
  };
};

export const signUp = (values) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firebase = getFirebase();
    const firestore = getFirestore();

    firebase
      .auth()
      .createUserWithEmailAndPassword(values.email, values.password)
      .then((res) => {
        console.log(res);
        return firestore.collection(`users`).doc(res.user.uid).set({
          name: values.name,
        });
      })
      .then(() => {
        dispatch({ type: SIGN_UP_SUCCESS });
      })
      .catch((err) => {
        dispatch({ type: SIGN_UP_FAILURE, payload: err.message });
      });
  };
};

export const signOut = () => {
  return (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();
    firebase
      .auth()
      .signOut()
      .then(() => {
        dispatch({ type: LOGOUT_SUCCESS });
      })
      .catch((err) => {
        dispatch({ type: LOGOUT_FAILURE, payload: err.message });
      });
  };
};
