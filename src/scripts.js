// Imports /////////////////////////////////////////////////////////////////////

import './css/base.scss';
import './images/turing-logo.png'

import dom from './dom';
import api from './api';

import Customer from './classes/Customer';
import Hotel from './classes/Hotel';

// Variables ///////////////////////////////////////////////////////////////////

const roomsSection = document.querySelector('.js-rooms-section');
const currentSection = document.querySelector('.js-current-bookings');
const customerDashboard = document.querySelector('.js-customer-dashboard');
const defaultDate = document.querySelector('input[type="date"]');
const dateSelector = document.querySelector('.js-date-selector');
const heading = document.querySelector('.js-heading');
const loginErrorMessage = document.querySelector('.js-login-error-message');
const loginForm = document.querySelector('.js-login-form');
const loginPage = document.querySelector('.js-login-page');
const passwordField = document.querySelector('.js-password-field');
const pastSection = document.querySelector('.js-past-bookings');
const typesSection = document.querySelector('.js-tags-section');
const totalSpentBox = document.querySelector('.js-total-spent');
const usernameField = document.querySelector('.js-username-field');

let hotel;
let user;

// On Load /////////////////////////////////////////////////////////////////////

const loadData = () => {
  return Promise.all([api.getAllCustomers(), api.getAllRooms(), api.getAllBookings()])
    .then(data => hotel = new Hotel(data[0], data[1], data[2]));
}

window.onload = loadData();

// Functions ///////////////////////////////////////////////////////////////////

const logIn = () => {
  event.preventDefault();
  // const username = usernameField.value;
  // const passwordIsValid = passwordField.value === 'overlook2021';
  const username = 'customer2';
  const passwordIsValid = true;
  const userID = parseInt(username.slice(8));
  const customer = hotel.customers.find(customer => customer.id === userID)
  if (customer && passwordIsValid) {
    user = new Customer(username, customer.id, customer.name)
    goToCustomerDashboard();
  } else if (username === 'manager' && passwordIsValid) {
    user = new Manager(username);
  } else {
    loginErrorMessage.innerText = 'Sorry, the username or password you entered is not recognized. Please try again.'
  }
}

const getTodaysDate = () => {
  const dateUTC = new Date();
  const dateLocal = convertToLocal(dateUTC);
  return dateLocal.toISOString().slice(0, 10);
}

const convertToLocal = (date) => {
 return new Date(date.getTime() - date.getTimezoneOffset() * 60 * 1000);
}

const setDate = () => {
  const nextYear = parseInt(getTodaysDate().substring(0, 4)) + 1;
  defaultDate.value = getTodaysDate();
  dateSelector.setAttribute('min', getTodaysDate());
  dateSelector.setAttribute('max', nextYear + getTodaysDate().slice(4));
}

const goToCustomerDashboard = () => {
  user.getCustomerData(hotel.bookings, hotel.rooms);
  dom.show(customerDashboard);
  dom.hide(loginPage);
  heading.innerText = 'Customer Dashboard';
  dom.fillTotalSpent(user, totalSpentBox);
  setDate();
  hotel.getAvailableRooms(dateSelector.value);
  if (!hotel.availableRooms.length) {
    dom.displayApology(roomsSection);
  } else {
    dom.fillRooms(hotel.availableRooms, roomsSection);
  }
  
  hotel.getAvailableTypes();
  dom.fillTypes(hotel.types, typesSection);
  dom.fillBookings(user, hotel.rooms, dateSelector.value, currentSection, pastSection);
}

const displayRooms = () => {
  hotel.getAvailableRooms(dateSelector.value);
  hotel.getFilteredRooms();
  if (!hotel.availableRooms.length) {
    return dom.displayApology(roomsSection);
  }

  dom.fillRooms(hotel.filteredRooms, roomsSection);
}

const displayBookingConfirmation = () => {
  if (window.confirm('Make this booking?')) {
    const date = dateSelector.value.replace(/-/g, '\/');
    const roomNumber = parseInt(event.target.parentNode.id);
    api.addBooking(user.id, date, roomNumber)
      .then(() => loadData())
      .then(() => goToCustomerDashboard());
  }
}

const displayFilteredRooms = () => {
  const checkbox = event.target;
  if (checkbox.checked) {
    hotel.addType(checkbox.value);
  } else if (!checkbox.checked) {
    hotel.removeType(checkbox.value);
  }
  hotel.getFilteredRooms();
  if (!hotel.filteredRooms.length) {
    return dom.fillRooms(hotel.availableRooms, roomsSection);
  }

  dom.fillRooms(hotel.filteredRooms, roomsSection);
}

dateSelector.addEventListener('change', displayRooms);

loginForm.addEventListener('submit', logIn);

typesSection.addEventListener('change', displayFilteredRooms);

roomsSection.addEventListener('click', displayBookingConfirmation);
