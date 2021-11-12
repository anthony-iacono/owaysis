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
    let totalSpent = this.bookings.reduce((total, booking) => {
      const matchingRoom = allRooms.find(room => {
        return room.number === booking.roomNumber;
      });
      total += matchingRoom.costPerNight;
      return total;
    }, 0);
    totalSpent = (Math.round(totalSpent * 100) / 100).toFixed(2);
    const dollars = parseFloat(totalSpent.split('.')[0]).toLocaleString();
    const cents = totalSpent.split('.')[1];
    this.totalSpent = `${dollars}.${cents}`;
  }
}

export default Customer;
