import Hotel from '../src/classes/Hotel';
import sample from '../src/data/sample';
import chai from 'chai';
const expect = chai.expect;

describe('Hotel', function() {
  let hotel;

  beforeEach(function() {
    hotel = new Hotel(sample.customers, sample.rooms, sample.bookings);
  })

  it('should be a function', function() {
    expect(Hotel).to.be.a('function');
  });

  it('should be an instance of Hotel', function() {
    expect(hotel).to.be.an.instanceof(Hotel);
  });

  it('should store all customers', function() {
    expect(hotel.customers).to.equal(sample.customers);
  });

  it('should store all rooms', function() {
    expect(hotel.rooms).to.equal(sample.rooms);
  });

  it('should store all bookings', function() {
    expect(hotel.bookings).to.equal(sample.bookings);
  });
});
