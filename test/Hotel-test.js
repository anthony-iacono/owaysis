import Hotel from '../src/classes/Hotel';
import sample from '../src/data/sample';
import chai from 'chai';
const expect = chai.expect;

describe('Hotel', function() {
  let hotel;

  beforeEach(function() {
    hotel = new Hotel(sample.customers, sample.rooms, sample.bookings);
    hotel.getAvailableRooms('2020-04-22');
    hotel.getAvailableTypes();
    hotel.addSelectedType('residential suite');
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

  it('should add a selected type', function() {
    hotel.addSelectedType('residential suite');

    expect(hotel.selectedTypes[0]).to.equal('residential suite');
  })

  it('should get the available rooms for a given date', function() {
    expect(hotel.availableRooms[0].number).to.equal(1)
  })

  it('should get available room types', function() {
    hotel.getAvailableTypes();

    expect(hotel.types[0] === 'residential suite');
  })

  it('should get available rooms filtered by type', function() {
    hotel.getFilteredRooms();

    expect(hotel.filteredRooms[0].roomType).to.equal('residential suite');
  })

  it('should remove a selected type', function() {
    hotel.removeSelectedType('residential suite');

    expect(hotel.selectedTypes.length).to.equal(0);
  })
});
