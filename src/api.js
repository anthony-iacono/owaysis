const api = {
  getAllCustomers() {
    fetch('http://localhost:3001/api/v1/customers')
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        return response.json();
      })
      .then(allCustomers => {
        console.log(allCustomers);
      });
  },

  getSingleCustomer(id) {
    fetch(`http://localhost:3001/api/v1/customers/${id}`)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        return response.json();
      })
      .then(singleCustomer => {
        console.log(singleCustomer);
      });
  }
}

export default api;
