const select = {
  loginSubmitBtn() {
    return document.querySelector('.js-login-submit-btn');
  },

  loginForm() {
    return document.querySelector('.js-login-form');
  },

  usernameField() {
    return document.querySelector('.js-username-field');
  },

  passwordField() {
    return document.querySelector('.js-password-field');
  },

  loginErrorMessage() {
    return document.querySelector('.js-login-error-message');
  }
}

export default select;
