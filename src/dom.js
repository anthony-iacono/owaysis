const dom = {

  displayApology(section) {
    section.innerHTML = `
      <p>Sorry, but there are no rooms available on this date. Please try another date.</p>
    `;
  },

  fillHeading(text, heading) {
    heading.innerText = `${text}`;
  },

  fillRooms(availableRooms, section) {
    section.innerHTML = '';
    availableRooms.forEach(availableRoom => {
      section.innerHTML += `
        <article class="room-card js-room-card" id='${availableRoom.number}'>
          <p>Type: ${availableRoom.roomType}</p>
          <p>Bidet: ${availableRoom.bidet}</p>
          <p>Bed Size: ${availableRoom.bedSize}</p>
          <p>No. of Beds: ${availableRoom.numBeds}</p>
          <p>Cost per Night: $${availableRoom.costPerNight}</p>
        </article>
      `
    })
  },

  fillBookings(user, rooms, selectedDate, currentSection, pastSection) {
    currentSection.innerHTML = '';
    pastSection.innerHTML = '';
    user.bookings.forEach(booking => {
      const room = user.rooms.find(room => room.number === booking.roomNumber);
      let section = pastSection;
      if (Date.parse(booking.date) >= Date.parse(selectedDate)) {
        section = currentSection;
      }

      section.innerHTML += `
      <article class="booking-card" id="${booking.id}">
        <p>BookingID: ${booking.id}</p>
        <p>Date: ${booking.date}</p>
        <p>Type: ${room.roomType}</p>
        <p>Bidet: ${room.bidet}</p>
        <p>Bed Size: ${room.bedSize}</p>
        <p>No. of Beds: ${room.numBeds}</p>
        <p>Cost per Night: $${room.costPerNight}</p>
      </article>
      `;
    })
  },

  fillTotalSpent(user, element) {
    element.innerText = `$${user.totalSpent}`;
  },

  fillTypes(availableTypes, section) {
    section.innerHTML = '';
    availableTypes.forEach(availableType => {
      section.innerHTML += `
      <label>
      <input type="checkbox" value="${availableType}"> ${availableType}
      </label>
      `
    })
  },

  hide(...elements) {
    elements.forEach(element => element.classList.add('hidden'));
  },

  show(...elements) {
    elements.forEach(element => element.classList.remove('hidden'));
  }
}

export default dom;
