const api = {
  const getAllCustomers = () => {
    fetch('http://localhost:3001/api/v1/customers') {
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status; ${response.status}`)
        }
        return response;
      })
    }
  }
}

export default api;
