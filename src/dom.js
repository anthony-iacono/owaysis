const dom = {

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
        <p>
      </article>
      `;
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
  }
}

export default dom;
