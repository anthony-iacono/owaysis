const dom = {

  fillAvailableRooms(availableRooms, section) {
    section.innerHTML = '';
    availableRooms.forEach(availableRoom => {
      section.innerHTML += `
        <article class="${availableRoom.number}">
          <p>Type: ${availableRoom.roomType}</p>
          <p>Bidet: ${availableRoom.bidet}</p>
          <p>Bed Size: ${availableRoom.bedSize}</p>
          <p>No. of Beds: ${availableRoom.numBeds}</p>
          <p>Cost per Night: $${availableRoom.costPerNight}</p>
        </article>
      `
    })
  },

  fillBookings(user, rooms, currentSection, pastSection) {
    user.bookings.forEach(booking => {
      const room = user.rooms.find(room => room.number === booking.roomNumber);
      let section = pastSection;
      if (Date.parse(booking.date) > Date.now()) {
        section = currentSection;
      }

      section.innerHTML += `
      <article id="${booking.id}">
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

  fillAvailableTypes(availableTypes, section) {
    section.innerHTML = '';
    availableTypes.forEach(availableType => {
      section.innerHTML += `
        <label>
        <input type="checkbox" value="${availableType}">${availableType}
        </label>
      `
    })
  },

  fillTotalSpent(user, element) {
    element.innerText = `$${user.totalSpent}`;
  },

  hide(...elements) {
    elements.forEach(element => element.classList.add('hidden'));
  },

  select(element) {
    return document.querySelector(element);
  },

  show(...elements) {
    elements.forEach(element => element.classList.remove('hidden'));
  },
}

export default dom;
