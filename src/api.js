const api = {
  getAllCustomers() {
    fetch('http://localhost:3001/api/v1/customers')
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        return response.json();
      })
      .then(allCustomers => console.log(allCustomers))
      .catch(error => console.error(error));
  },

  getCustomer(id) {
    fetch(`http://localhost:3001/api/v1/customers/${id}`)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        return response.json();
      })
      .then(customer => console.log(customer))
      .catch(error => console.error(error));
  },

  getAllRooms() {
    fetch('http://localhost:3001/api/v1/rooms')
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        return response.json();
      })
      .then(allRooms => console.log(allRooms))
      .catch(error => console.error(error));
  },

  getAllBookings() {
    fetch('http://localhost:3001/api/v1/bookings')
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        return response.json();
      })
      .then(allBookings => console.log(allBookings))
      .catch(error => console.error(error));
  },

  addBooking(userID, date, roomNumber) {
    return fetch('http://localhost:3001/api/v1/bookings', {
      method: 'POST',
      body: JSON.stringify({
        userID: userID,
        date: date,
        roomNumber: 4
      }),
      headers: { 'Content-Type': 'application/json' }
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        return response.json();
      })
      .then(newBooking => {
        console.log(newBooking);
        return newBooking;
      })
      .catch(error => console.error(error));
  },

  deleteBooking(id) {
    fetch(`http://localhost:3001/api/v1/bookings/${id}`, {
      method: 'DELETE',
      headears: { 'Content-Type': 'application/json' }
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        return response.json();
      })
      .then(deletedBooking => console.log(deletedBooking))
      .catch(error => console.error(error));
  }
}

export default api;
