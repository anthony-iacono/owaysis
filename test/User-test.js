import User from '../src/classes/User';
import sample from '../src/data/sample';
import chai from 'chai';
const expect = chai.expect;

describe('User', function() {
  let customerUser;
  let managerUser;

  beforeEach(function() {
    customerUser = new User(sample.customer.name)
    managerUser = new User(sample.manager);
  });

  it('should be a function', function() {
    expect(User).to.be.a('function');
  });

  it('should be an instance of User', function() {
    expect(customerUser).to.be.an.instanceof(User);
    expect(managerUser).to.be.an.instanceof(User);
  });

  it('should store a name', function() {
    expect(customerUser.name).to.equal('Leatha Ullrich');
    expect(managerUser.name).to.equal('Manager');
  });
});
