'use strict';

var path = require('path');
var router = require('express').Router();
var regionFinder = require('../../lib/region-finder');

router.post('/:postcode?', function postHandler(req, res) {
  if (req.body.postcode) {
    return res.redirect(req.baseUrl + '/' + req.body.postcode);
  }
  res.redirect(req.baseUrl);
});

router.param('postcode', function postcodeParam(req, res, next, postcode) {
  regionFinder
    .getByPostcode(postcode)
    .then(function success(result) {
      req.region = result;
      next();
    }, function fail() {
      var errors = req.errorlist || [];

      errors.push({key: 'postcode', message: 'Error message'});
      req.errorlist = errors;

      next();
    });
});

router.get('/:postcode?', function getHandler(req, res) {
  var template = path.resolve(__dirname, 'views', 'office-finder');
  var data = {
    postcode: req.params.postcode,
    errorLength: req.errorlist ? {single: true} : null,
    errorlist: req.errorlist,
    region: req.region,
    partials: res.locals.partials || {},
  };

  // set local partials
  data.partials['partials-office'] = path.resolve(__dirname, 'views', 'partials', 'office');

  regionFinder
    .getAll()
    .then(function success(result) {
      data.regions = result;
      res.render(template, data);
    });
});

module.exports = router;
