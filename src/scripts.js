import './css/base.scss';

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/turing-logo.png'

import dom from './dom';
import api from './api';

import Customer from './classes/Customer';
import Hotel from './classes/Hotel';

const top = {};

window.onload = () => {
  const customers = api.getAllCustomers();
  const rooms = api.getAllRooms();
  const bookings = api.getAllBookings();
  top.hotel = new Hotel(customers, rooms, bookings);
  console.log(top.hotel);
}


// How to use data returned from a fetch call:
// window.onload = getCustomer5;
// function getCustomer5() {
  //   const data = api.getCustomer(5)
  //     .then(data => {
    //       console.log(data);
    //       customerName.innerText = data.name;
    //   })
    // }
