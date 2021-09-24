const api = {
  getAllCustomers() {
    return fetch('http://localhost:3001/api/v1/customers')
      .then(catchHttpError(response))
      .then(data => {
        console.log(data);
        return data.customers;
      })
      .catch(error => console.error(error));
  },

  getCustomer(id) {
    return fetch(`http://localhost:3001/api/v1/customers/${id}`)
      .then(catchHttpError(response))
      .then(customer => customer)
      .catch(error => console.error(error));
  },

  getAllRooms() {
    return fetch('http://localhost:3001/api/v1/rooms')
      .then(catchHttpError(response))
      .then(data => data.rooms)
      .catch(error => console.error(error));
  },

  getAllBookings() {
    return fetch('http://localhost:3001/api/v1/bookings')
      .then(catchHttpError(response))
      .then(data => data.bookings)
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
      .then(catchHttpError(response))
      .then(data => {
        console.log(data.message);
        return data.newBooking;
      })
      .catch(error => console.error(error));
  },

  deleteBooking(id) {
    return fetch(`http://localhost:3001/api/v1/bookings/${id}`, {
      method: 'DELETE',
      headears: { 'Content-Type': 'application/json' }
    })
      .then(catchHttpError(response))
      .then(data => console.log(data.message))
      .catch(error => console.error(error));
  },

  catchHttpError(response) {
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
    }
  }
}

export default api;
