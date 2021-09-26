import User from './User';

class Customer extends User {
  constructor(username, id, name) {
    super(username)
    this.id = id;
    this.name = name;
  }
}

export default Customer;
