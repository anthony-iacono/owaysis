import Customer from '../src/classes/Customer';
import sample from '../src/data/sample';
import chai from 'chai';
const expect = chai.expect;

describe('Customer', function() {
  let customer;

  beforeEach(function() {
    customer = new Customer(sample.customer.id);
  })

  it('should be a function', function() {
    expect(Customer).to.be.a('function');
  });

  it('should be an instance of Customer', function() {
    expect(customer).to.be.an.instanceof(Customer);
  });

  it('should store an id', function() {
    expect(customer.id).to.equal(1);
  });

  
});
