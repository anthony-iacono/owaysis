// CSS Imports /////////////////////////////////////////////////////////////////

import './css/base.scss';
import './images/turing-logo.png'

// Variable Imports ////////////////////////////////////////////////////////////

import dom from './dom';
import api from './api';

// Class Imports ///////////////////////////////////////////////////////////////

import Customer from './classes/Customer';
import Hotel from './classes/Hotel';

// Global Variables ////////////////////////////////////////////////////////////

let hotel;
let user;

// Selectors ///////////////////////////////////////////////////////////////////

const availableRoomsSection = dom.select('.js-available-rooms-section');
const currentSection = dom.select('.js-current-bookings');
const customerDashboard = dom.select('.js-customer-dashboard');
const defaultDate = dom.select('input[type="date"]');
const dateSelector = dom.select('.js-date-selector');
const heading = dom.select('.js-heading');
const loginErrorMessage = dom.select('.js-login-error-message');
const loginForm = dom.select('.js-login-form');
const loginPage = dom.select('.js-login-page');
const passwordField = dom.select('.js-password-field');
const pastSection = dom.select('.js-past-bookings');
const tagsSection = dom.select('.js-tags-section');
const totalSpent = dom.select('.js-total-spent');
const usernameField = dom.select('.js-username-field');

// On Load /////////////////////////////////////////////////////////////////////

const loadData = () => {
  Promise.all([api.getAllCustomers(), api.getAllRooms(), api.getAllBookings()])
    .then(data => {
      hotel = new Hotel(data[0], data[1], data[2]);
    });
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
  const dateLocal = new Date(dateUTC.getTime() - dateUTC.getTimezoneOffset() * 60 * 1000);
  return dateLocal.toISOString().slice(0, 10);
}

const setMaxDate = () => {
  const nextYear = parseInt(getTodaysDate().substring(0, 4)) + 1;
  const maxDate = nextYear + getTodaysDate().slice(4);
  dateSelector.setAttribute('max', maxDate);
}

const goToCustomerDashboard = () => {
  // dom.clearDashboard();
  user.getCustomerData(hotel.bookings, hotel.rooms);
  dom.show(customerDashboard);
  dom.hide(loginPage);
  heading.innerText = 'Customer Dashboard';
  dom.fillTotalSpent(user, totalSpent);
  defaultDate.value = getTodaysDate();
  dateSelector.setAttribute('min', getTodaysDate());
  setMaxDate();
  hotel.getAvailableRooms(dateSelector.value);
  dom.fillAvailableRooms(hotel.availableRooms, availableRoomsSection);
  hotel.getAvailableTypes();
  dom.fillAvailableTypes(hotel.availableTypes, tagsSection);
  dom.fillBookings(user, hotel.rooms, currentSection, pastSection);
}

const displayAvailableRooms = () => {
  hotel.getAvailableRooms(dateSelector.value);
  hotel.getFilteredRooms();
  dom.fillAvailableRooms(hotel.filteredRooms, availableRoomsSection);
}

// const updateDashboard() {
//
// }

const displayBookingConfirmation = () => {
  if (window.confirm('Make this booking?')) {
    const date = dateSelector.value.replace(/-/g, '\/');
    const roomNumber = parseInt(event.target.parentNode.id);
    api.addBooking(user.id, date, roomNumber)
      .then(() => {
        console.log(user);
        goToCustomerDashboard();
      });
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
    return dom.fillAvailableRooms(hotel.availableRooms, availableRoomsSection);
  }

  dom.fillAvailableRooms(hotel.filteredRooms, availableRoomsSection);
}

dateSelector.addEventListener('change', displayAvailableRooms);

loginForm.addEventListener('submit', logIn);

tagsSection.addEventListener('change', displayFilteredRooms);

availableRoomsSection.addEventListener('click', displayBookingConfirmation);
