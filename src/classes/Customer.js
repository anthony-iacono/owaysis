class Customer {
  constructor(id) {
    this.id = id;
    this.bookings;
    this.totalSpent;
  }

  getBookings(allBookings) {
    this.bookings = allBookings.filter(booking => booking.userID === this.id);
  }

  getTotalSpent(allRooms) {
    const totalSpent = this.bookings.reduce((total, booking) => {
      const matchingRoom = allRooms.find(room => {
        return room.number === booking.roomNumber;
      });
      total += matchingRoom.costPerNight;
      return total;
    }, 0);
    this.totalSpent = (Math.round(totalSpent * 100) / 100).toLocaleString();
  }
}

export default Customer;
