import User from './User';

class Customer extends User {
  constructor(username, id, name) {
    super(username)
    this.id = id;
    this.name = name;
    this.totalSpent;
    this.bookings;
    this.rooms = [];
  }

  getTotalSpent(bookings, rooms) {
    this.getBookings(bookings, rooms);
    this.totalSpent = this.bookings.reduce((total, booking) => {
      const matchingRoom = this.rooms.find(room => {
        return room.number === booking.roomNumber;
      });
      total += matchingRoom.costPerNight;
      return total;
    }, 0).toFixed(2);
  }

  getBookings(bookings, rooms) {
    this.bookings = bookings.filter(booking => {
      this.getRooms(booking, rooms);
      return booking.userID === this.id
    });
  }

  getRooms(booking, rooms) {
    rooms.filter(room => {
      if (!this.rooms.includes(room)) {
        this.rooms.push(room);
      }

      return room.number === booking.roomNumber
    });
  }
}

export default Customer;
