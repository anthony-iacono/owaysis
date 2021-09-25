import './css/base.scss';

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/turing-logo.png'

import select from './select';
import dom from './dom';
import api from './api';

import Customer from './classes/Customer';
import Hotel from './classes/Hotel';

const top = {};

window.onload = () => {
  Promise.all([api.getAllCustomers(), api.getAllRooms(), api.getAllBookings()])
    .then(data => {
      top.hotel = new Hotel(data[0], data[1], data[2]);
    })
}

const logIn = () => {
  event.preventDefault();
  const username = select.usernameField().value;
  const userID = select.usernameField().value.slice(9);
  const customer = top.hotel.customers.find(customer => customer.id === userID)
  if (customer) {
    top.user = new Customer(username, customer.id, customer.name)
  } else if (username === 'manager') {
    top.user = new Manager(username);
  } else {
    select.loginErrorMessage().innerText = 'Sorry, the username or password you entered is not recognized. Please try again.'
  }
}

select.loginForm().addEventListener('submit', logIn);
