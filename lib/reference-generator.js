'use strict';

var rs = require('randomstring');

module.exports = {
  generate: function generateReference() {
    // exclude B8G6I1l0OQDS5Z2
    return [
      rs.generate({length: 2, charset: 'ACEFHJKMNPRTUVWXY3479'}),
      rs.generate({length: 4, charset: '123456789'}),
      rs.generate({length: 4, charset: '123456789'})
    ].join('-');
  }
};
