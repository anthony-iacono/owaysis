import Customer from '../src/classes/Customer';
import sample from '../src/data/sample';
import chai from 'chai';
const expect = chai.expect;

describe('Customer', function() {
  let customer;

  beforeEach(function() {
    customer = new Customer(sample.customer.id);
    customer.getBookings(sample.bookings);
    customer.getTotalSpent(sample.rooms);
  })

  it('should be a function', function() {
    expect(Customer).to.be.a('function');
  });

  it('should be an instance of Customer', function() {
    expect(customer).to.be.an.instanceof(Customer);
  });

  it('should store an id', function() {
    console.log(customer.bookings);
    expect(customer.id).to.equal(9);
  });

  it('should get all customer\'s bookings', function() {
    expect(customer.bookings[0].id).to.equal('5fwrgu4i7k55hl6sz');
  })

  it('should get the total the customer has spent on bookings', function() {
    expect(customer.totalSpent).to.equal('294.56');
  })
});
