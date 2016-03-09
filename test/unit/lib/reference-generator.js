'use strict';

var referenceGenerator = require('../../../lib/reference-generator');

describe('Reference generator', function() {

  describe('.generate()', function() {

    it('should return a valid reference number', function() {
      var reference = referenceGenerator.generate();

      reference.should.have.length(12);
      reference.should.match(/^[ACEFHJKMNPRTUVWXY3479]{2}-[123456789]{4}-[123456789]{4}$/g);
    });

  });

});
