class User {
  constructor(username) {
    this.username = username;
  }

  getTotalSpent(bookings, rooms) {
    this.totalSpent = bookings.filter(booking => booking.userID === this.id)
      .reduce((total, booking) => {
        const room = rooms.find(room => room.number === booking.roomNumber);
        total += room.costPerNight;
        return total;
        console.log(total)
      }, 0);
  }

  addBooking(userID, date, roomNumber) {

  }

  getCurrentBookings(userID) {

  }

  getPastBookings(userID) {

  }
}

export default User;
