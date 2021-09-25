const dom = {

  hide(...elements) {
    elements.forEach(element => element.classList.add('hidden'));
  },

  select(element) {
    return document.querySelector(element);
  },

  show(...elements) {
    elements.forEach(element => element.classList.remove('hidden'));
  },

  updateHeader(text) {
    select.header().innerText = `${text}`;
  }
}

export default dom;
