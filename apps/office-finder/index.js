'use strict';

var path = require('path');
var router = require('express').Router();
var analytics = require('../../lib/analytics');
var regionFinder = require('../../lib/region-finder');
var hof = require('hof');
var validators = hof.wizard.Controller.validators;
var i18n = hof.i18n;
var mixins = hof.mixins;
var logger = require('../../lib/logger');

var locali18n = i18n({
  path: path.resolve(__dirname, './translations/__lng__/__ns__.json')
});

router.use(mixins({}, {
  translate: locali18n.translate.bind(locali18n)
}));

router.post('/:postcode?', function postHandler(req, res) {
  if (req.body.postcode) {
    return analytics.event({
      category: 'Postcode',
      action: 'search'
    }, function analyticsCB() {
      res.redirect(req.baseUrl + '/' + req.body.postcode);
    });
  }
  res.redirect(req.baseUrl);
});

router.param('postcode', function postcodeParam(req, res, next, postcode) {
  var errors = req.errorlist || [];

  if (!validators.postcode(postcode)) {
    errors.push({key: 'postcode', message: locali18n.translate('validation.postcode.invalid')});
    req.errorlist = errors;

    return analytics.event({
      category: 'Postcode',
      action: 'invalid format',
      label: postcode
    }, function analyticsCB() {
      next();
    });
  }

  regionFinder
    .getByPostcode(postcode)
    .then(function success(result) {
      req.region = result;
      next();
    }, function fail(e) {
      logger.debug('failed to get match with postcode', e.message);
      if (e && e.message === 'Invalid region') {
        errors.push({key: 'region', message: locali18n.translate('validation.region.invalid')});
      } else {
        errors.push({key: 'postcode', message: locali18n.translate('validation.postcode.not-exist')});
      }
      req.errorlist = errors;

      analytics.event({
        category: 'Postcode',
        action: 'not found',
        label: postcode
      }, function analyticsCB() {
        next();
      });
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
