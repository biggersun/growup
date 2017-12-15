import Polygon from '../src/polygon';

describe('ES6 Polygon', function() {
  let polygon = new Polygon(5, 4);

  it('should return 20 when calling calcArea', function() {
    assert.equal(20, polygon.calcArea());
  });

  it('1 + 1 = 2', function() {
    assert.equal(1 + 1, 2);
  });
});