import { signUp, signIn } from '../api/users';

const defaultState = {
  // isAuthenticated: sessionStorage.getItem('auth') ? true : false,
  authFailed: false,
  location: '/'
}

const authentication = (state = defaultState, { type, payload }) => {
  if (payload) {
  }
  switch (type) {
    case signIn.SUCCESS:
    case signUp.SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        authFailed: false,
        location: '/dashboard'
      };
    case signIn.FAIL:
    case signUp.FAIL:
      return {
        ...state,
        authFailed: true
      };
    default:
      return state;
  }
}

export default authentication;
