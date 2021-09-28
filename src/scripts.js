// Imports /////////////////////////////////////////////////////////////////////

import './css/base.scss';

import api from './api';
import dom from './dom';

import Customer from './classes/Customer';
import Hotel from './classes/Hotel';

// Variables ///////////////////////////////////////////////////////////////////

const currentSection = document.querySelector('.js-current-bookings');
const customerDashboard = document.querySelector('.js-customer-dashboard');
const dateSelector = document.querySelector('.js-date-selector');
const defaultDate = document.querySelector('input[type="date"]');
const heading = document.querySelector('.js-heading');
const loginError = document.querySelector('.js-login-error');
const loginForm = document.querySelector('.js-login-form');
const password = document.querySelector('.js-password');
const pastSection = document.querySelector('.js-past-bookings');
const roomsSection = document.querySelector('.js-rooms-section');
const totalSpentBox = document.querySelector('.js-total-spent');
const typesSection = document.querySelector('.js-types-section');
const username = document.querySelector('.js-username');

let hotel;
let user;

// On Load /////////////////////////////////////////////////////////////////////

const loadData = () => {
  return Promise.all([api.getAllCustomers(), api.getAllRooms(), api.getAllBookings()])
    .then(data => hotel = new Hotel(data[0], data[1], data[2]));
}

window.onload = loadData();

// Event Listeners /////////////////////////////////////////////////////////////

dateSelector.addEventListener('change', displayRooms);
loginForm.addEventListener('submit', logIn);
roomsSection.addEventListener('click', confirmBooking);
typesSection.addEventListener('change', displayFilteredRooms);

// Functions ///////////////////////////////////////////////////////////////////

function convertToLocal(date) {
 return new Date(date.getTime() - date.getTimezoneOffset() * 60 * 1000);
}

function confirmBooking() {
  if (window.confirm('Make this booking?')) {
    const date = dateSelector.value.replace(/-/g, '\/');
    const roomNumber = parseInt(event.target.parentNode.id);
    api.addBooking(user.id, date, roomNumber)
      .then(() => loadData())
      .then(() => displayCustomerDashboard());
  }
}

function displayCustomerDashboard() {
  user.getCustomerData(hotel.bookings, hotel.rooms);
  dom.show(customerDashboard, heading);
  dom.hide(loginForm);
  dom.fillHeading('Customer Dashboard', heading);
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

function displayFilteredRooms() {
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

function displayRooms() {
  hotel.getAvailableRooms(dateSelector.value);
  hotel.getFilteredRooms();
  if (!hotel.availableRooms.length) {
    return dom.displayApology(roomsSection);
  }

  dom.fillRooms(hotel.filteredRooms, roomsSection);
}

function getTodaysDate() {
  const dateUTC = new Date();
  const dateLocal = convertToLocal(dateUTC);
  return dateLocal.toISOString().slice(0, 10);
}

function logIn() {
  event.preventDefault();
  const usernameIsValid = username.value.slice(0, 8) === 'customer';
  const passwordIsValid = password.value === 'overlook2021';
  // const passwordIsValid = true;
  // const usernameIsValid = true;
  const userID = parseInt(username.value.slice(8));
  const customer = hotel.customers.find(customer => customer.id === userID)
  if (customer && usernameIsValid && passwordIsValid) {
    user = new Customer(username, customer.id, customer.name)
    return displayCustomerDashboard();
  }

  dom.show(loginError);
}

function setDate() {
  const nextYear = parseInt(getTodaysDate().substring(0, 4)) + 1;
  defaultDate.value = getTodaysDate();
  dateSelector.setAttribute('min', getTodaysDate());
  dateSelector.setAttribute('max', nextYear + getTodaysDate().slice(4));
}
