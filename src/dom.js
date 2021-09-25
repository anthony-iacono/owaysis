const dom = {
  show(...elements) {
    elements.forEach(element => element.classList.remove('hidden'));
  },

  hide(...elements) {
    elements.forEach(element => element.classList.add('hidden'));
  }
}

export default dom;
