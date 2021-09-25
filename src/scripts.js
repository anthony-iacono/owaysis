import './css/base.scss';

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/turing-logo.png'

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
