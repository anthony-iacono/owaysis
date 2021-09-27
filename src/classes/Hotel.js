class Hotel {
  constructor(customers, rooms, bookings) {
    this.customers = customers;
    this.rooms = rooms;
    this.bookings = bookings;
    this.availableRooms;
    this.availableTypes;
    this.selectedTags;
    this.filteredRooms;
  }

  getAvailableRooms(selectedDate) {
    const unavailableRoomNums = [];
    this.bookings.forEach(booking => {
      const bookingDate = booking.date.replace(/\//g, '-');
      if (bookingDate === selectedDate && !unavailableRoomNums.includes(booking.roomNumber)) {
        unavailableRoomNums.push(booking.roomNumber);
      }
    });
    this.availableRooms = this.rooms.filter(room => {
      return !unavailableRoomNums.includes(room.number);
    })
  }

  getAvailableTypes() {
    this.availableTypes = this.availableRooms.reduce((acc, room) => {
      if (!acc.includes(room.roomType)) {
        acc.push(room.roomType);
      }

      return acc;
    }, []);
    console.log(this.availableTypes);
  }

  getFilteredRooms() {
    this.filteredRooms = this.availableRooms.filter(availableRoom => {
      return this.selectedTags.includes(availableRoom.roomType);
    })
  }
}

export default Hotel;
