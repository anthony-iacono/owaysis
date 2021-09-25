// CSS Imports /////////////////////////////////////////////////////////////////

import './css/base.scss';
import './images/turing-logo.png'

// Variable Imports ////////////////////////////////////////////////////////////

import dom from './dom';
import api from './api';

// Class Imports ///////////////////////////////////////////////////////////////

import Customer from './classes/Customer';
import Hotel from './classes/Hotel';

// Selectors ///////////////////////////////////////////////////////////////////

const customerDashboard = dom.select('.js-customer');
const header = dom.select('.js-header');
const loginErrorMessage = dom.select('.js-login-error-message');
const loginForm = dom.select('.js-login-form');
const loginSubmitBtn = dom.select('.js-login-submit-btn');
const passwordField = dom.select('.js-password-field');
const usernameField = dom.select('.js-username-field');

const top = {};

// On Load Functions ///////////////////////////////////////////////////////////

window.onload = () => {
  Promise.all([api.getAllCustomers(), api.getAllRooms(), api.getAllBookings(), api.addBooking(5, 234123, 5)])
    .then(data => {
      top.hotel = new Hotel(data[0], data[1], data[2]);
      console.log(data[3]);
    })
}

// Functions ///////////////////////////////////////////////////////////////////

const logIn = () => {
  event.preventDefault();
  select.loginErrorMessage().innerText = '';
  const username = usernameField.value;
  const userID = parseInt(username.slice(8));
  const customer = top.hotel.customers.find(customer => customer.id === userID)
  if (customer) {
    top.user = new Customer(username, customer.id, customer.name)
  } else if (username === 'manager') {
    top.user = new Manager(username);
  } else {
    loginErrorMessage.innerText = 'Sorry, the username or password you entered is not recognized. Please try again.'
  }
}

select.loginForm().addEventListener('submit', logIn);
