class Customer {
  constructor(id, name) {
    this.id = id;
    this.name = name;
    this.totalSpent;
    this.bookings;
    this.rooms = [];
  }

  getBookings(allBookings, allRooms) {
    this.bookings = allBookings.filter(booking => {
      this.getRooms(booking, allRooms);
      return booking.userID === this.id;
    });
  }

  getRooms(booking, rooms) {
    rooms.forEach(room => {
      if (!this.rooms.includes(room)) {
        this.rooms.push(room);
      }
    });
  }

  getTotalSpent() {
    const totalSpent = this.bookings.reduce((total, booking) => {
      const matchingRoom = this.rooms.find(room => {
        return room.number === booking.roomNumber;
      });
      total += matchingRoom.costPerNight;
      return total;
    }, 0);
    this.totalSpent = Math.round(totalSpent * 100) / 100;
  }
}

export default Customer;
