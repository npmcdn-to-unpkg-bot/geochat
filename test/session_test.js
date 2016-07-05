require("blanket")({ /* optional options */ });
var chai = require('chai');
var expect = require('chai').expect;
var should = require('chai').should();

describe('Basic TDD', function() {
  describe('TDD TEST', function () {
    it('10 should be 10', function () {
      expect(10).to.be.equal(10);
    });
    it('basic number check', function () {
      expect(10).to.be.a('Number');
    });
  });
});
