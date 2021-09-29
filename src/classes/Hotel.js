class Hotel {
  constructor(customers, rooms, bookings) {
    this.customers = customers;
    this.rooms = rooms;
    this.bookings = bookings;
    this.availableRooms;
    this.types;
    this.selectedTypes = [];
    this.filteredRooms;
  }

  addSelectedType(type) {
    this.selectedTypes.push(type);
  }

  getAvailableRooms(selectedDate) {
    const unavailableRoomNumbers = this.bookings.reduce((acc, booking) => {
      const bookingDate = booking.date.replace(/\//g, '-');
      if (bookingDate === selectedDate) {
        acc.push(booking.roomNumber);
      }

      return acc;
    }, [])
    this.availableRooms = this.rooms.filter(room => {
      return !unavailableRoomNumbers.includes(room.number);
    })
  }

  getAvailableTypes() {
    this.types = this.availableRooms.reduce((acc, room) => {
      if (!acc.includes(room.roomType)) {
        acc.push(room.roomType);
      }

      return acc;
    }, []);
  }

  getFilteredRooms() {
    if (!this.selectedTypes.length) {
      return this.filteredRooms = this.availableRooms;
    }

    this.filteredRooms = this.availableRooms.filter(availableRoom => {
      return this.selectedTypes.includes(availableRoom.roomType);
    })
  }

  removeSelectedType(type) {
    this.selectedTypes = this.selectedTypes.filter(selectedType => {
      return selectedType !== type;
    })
  }
}

export default Hotel;
