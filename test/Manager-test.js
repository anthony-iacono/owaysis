import Manager from '../src/classes/Manager';
import sample from '../src/data/sample';
import chai from 'chai';
const expect = chai.expect;

describe('Manager', function() {
  let manager;

  beforeEach(function() {
    manager = new Manager(sample.manager);
  })

  it('should be a function', function() {
    expect(Manager).to.be.a('function');
  });

  it('should be an instance of Manager', function() {
    expect(manager).to.be.an.instanceof(Manager);
  });

  it('should store a name', function() {
    expect(manager.name).to.equal('Manager');
  });
});
