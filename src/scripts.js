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

top.availableRoomsSection = dom.select('.js-available-rooms-section');
top.currentSection = dom.select('.js-current-bookings');
top.customerDashboard = dom.select('.js-customer-dashboard');
top.defaultDate = dom.select('input[type="date"]');
top.dateSelector = dom.select('.js-date-selector');
top.heading = dom.select('.js-heading');
top.loginErrorMessage = dom.select('.js-login-error-message');
top.loginForm = dom.select('.js-login-form');
top.loginPage = dom.select('.js-login-page');
top.passwordField = dom.select('.js-password-field');
top.pastSection = dom.select('.js-past-bookings');
top.tagsSection = dom.select('.js-tags-section');
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

const getTodaysDate = () => {
  const dateUTC = new Date();
  const dateLocal = new Date(dateUTC.getTime() - dateUTC.getTimezoneOffset() * 60 * 1000);
  return dateLocal.toISOString().slice(0, 10);
}

const setMaxDate = () => {
  const nextYear = parseInt(getTodaysDate().substring(0, 4)) + 1;
  const maxDate = nextYear + getTodaysDate().slice(4);
  top.dateSelector.setAttribute('max', maxDate);
}

const goToCustomerDashboard = () => {
  top.user.getCustomerData(top.hotel.bookings, top.hotel.rooms);
  dom.show(top.customerDashboard);
  dom.hide(top.loginPage);
  top.heading.innerText = 'Customer Dashboard';
  dom.fillTotalSpent(top.user, top.totalSpent);
  top.defaultDate.value = getTodaysDate();
  top.dateSelector.setAttribute('min', getTodaysDate());
  setMaxDate();
  top.hotel.getAvailableRooms(top.dateSelector.value);
  dom.fillAvailableRooms(top.hotel.availableRooms, top.availableRoomsSection);
  top.hotel.getAvailableTypes();
  dom.fillAvailableTypes(top.hotel.availableTypes, top.tagsSection);
  dom.fillBookings(top.user, top.hotel.rooms, top.currentSection, top.pastSection);
}

const displayAvailableRooms = () => {
  top.hotel.getAvailableRooms(top.dateSelector.value);
  dom.fillAvailableRooms(top.hotel.availableRooms, top.availableRoomsSection);
}

const displayFilteredRooms = () => {
  const checkbox = event.target;
  if (checkbox.checked) {
    top.hotel.addType(checkbox.value);
  } else if (!checkbox.checked) {
    console.log('unchecked!');
    top.hotel.removeType(checkbox.value);
  }
  top.hotel.getFilteredRooms();
  console.log(top.hotel.filteredRooms);
  dom.fillAvailableRooms(top.hotel.filteredRooms, top.availableRoomsSection);
}

top.dateSelector.addEventListener('change', displayAvailableRooms);

top.loginForm.addEventListener('submit', logIn);

top.tagsSection.addEventListener('change', displayFilteredRooms);
