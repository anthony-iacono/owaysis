class Hotel {
  constructor(customers, rooms, bookings) {
    this.customers = customers;
    this.rooms = rooms;
    this.bookings = bookings;
  }

  getRoomsByDate(selectedDate) {
    const bookingsOnDate = this.bookings.filter(booking => {
      const bookingDate = booking.date.replace(/\//g, '-');
      return bookingDate === selectedDate;
    });
    const unavailableRooms = this.rooms.filter(room => {

    });
  }
}

export default Hotel;
