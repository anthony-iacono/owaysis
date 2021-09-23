import './css/base.scss';

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/turing-logo.png'

import api from './api';

api.getAllCustomers();
api.getCustomer(1);
api.getAllRooms();
api.getAllBookings();
const newBooking = api.addBooking(1, '2021/10/01', 1);
const deleteBooking = newBooking.then(newBooking => {
  api.deleteBooking(newBooking.id);
});
