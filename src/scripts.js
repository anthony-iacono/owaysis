// CSS Imports /////////////////////////////////////////////////////////////////

import './css/base.scss';
import './images/turing-logo.png'

// Variable Imports ////////////////////////////////////////////////////////////

import dom from './dom';
import api from './api';

// Class Imports ///////////////////////////////////////////////////////////////

import Customer from './classes/Customer';
import Hotel from './classes/Hotel';

// Global Variable /////////////////////////////////////////////////////////////

const top = {};

// Selectors ///////////////////////////////////////////////////////////////////

top.currentSection = dom.select('.js-current-bookings');
top.customerDashboard = dom.select('.js-customer-dashboard');
top.header = dom.select('.js-header');
top.loginErrorMessage = dom.select('.js-login-error-message');
top.loginForm = dom.select('.js-login-form');
top.loginPage = dom.select('.js-login-page');
top.passwordField = dom.select('.js-password-field');
top.pastSection = dom.select('.js-past-bookings');
top.totalSpent = dom.select('.js-total-spent');
top.usernameField = dom.select('.js-username-field');

// On Load /////////////////////////////////////////////////////////////////////

window.onload = () => {
  Promise.all([api.getAllCustomers(), api.getAllRooms(), api.getAllBookings()])
    .then(data => top.hotel = new Hotel(data[0], data[1], data[2]));
}

// Functions ///////////////////////////////////////////////////////////////////

const logIn = () => {
  event.preventDefault();
  top.loginErrorMessage.innerText = '';
  // const username = top.usernameField.value;
  // const passwordIsValid = top.passwordField.value === 'overlook2021';
  const username = 'customer2';
  const passwordIsValid = true;
  const userID = parseInt(username.slice(8));
  const customer = top.hotel.customers.find(customer => customer.id === userID)
  if (customer && passwordIsValid) {
    top.user = new Customer(username, customer.id, customer.name)
    goToCustomerDashboard();
  } else if (username === 'manager' && passwordIsValid) {
    top.user = new Manager(username);
  } else {
    top.loginErrorMessage.innerText = 'Sorry, the username or password you entered is not recognized. Please try again.'
  }
}

const goToCustomerDashboard = () => {
  dom.show(top.customerDashboard);
  dom.hide(top.loginPage);
  displayTotalSpent();
  displayBookings();
}

const displayTotalSpent = () => {
  top.user.getTotalSpent(top.hotel.bookings, top.hotel.rooms);
  dom.fillTotalSpent(top.user, top.totalSpent);
}

const displayBookings = () => {
  dom.fillBookings(top.user, top.hotel.rooms, top.currentSection, top.pastSection);
}

top.loginForm.addEventListener('submit', logIn);
