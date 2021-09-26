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
    this.bookings = bookings.filter(booking => {
      rooms.filter(room => {
        if (!this.rooms.includes(room)) {
          this.rooms.push(room);
        }

        return room.number === booking.roomNumber
      });
      return booking.userID === this.id
    });
    this.totalSpent = this.bookings.reduce((total, booking) => {
      const matchingRoom = this.rooms.find(room => {
        return room.number === booking.roomNumber;
      });
      total += matchingRoom.costPerNight;
      return total;
    }, 0);
  }
}

export default Customer;
