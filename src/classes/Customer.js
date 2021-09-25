import User from './User';

class Customer extends User {
  constructor(username, id, name) {
    super(username)
    this.id = id;
    this.name = name;
  }

  getCustomerInfo(id, customers) {
    this.id = parseInt(id);
    console.log(customers)
    this.name = customers.find(customer => customer.id === this.id).name;
    console.log(this.id, this.name);
  }
}

export default Customer;
