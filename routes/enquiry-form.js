var router = require('express').Router();
var S = require('string');
var _ = require('lodash');

var mailer = require('../lib/mailer');
var fieldIterator = require('../lib/fieldIterator');
var complexForm = require('../lib/fields');

/* form page. */
router.all('/', function(req, res, next) {
  var data = {
    title: 'Contact UK Trade & Investment',
    enctype: '',
    method: 'POST',
  };

  complexForm.handle(req, {
    success: function (form) {
      var fields = {};
      _.each(form.fields, function (field) {
        var humanize = S(field.name).humanize().s;
        fields[humanize] = field.value;
      });

      mailer.sendEnquiry(fields).then(function (info) {
        res.redirect('/enquire/complete');
      }, function (error) {
        res.render('error', {
          message: 'Enquiry not sent',
          description: 'There was a problem sending your enquiry. Please try completing your enquiry again.',
        });
      });
    },
    error: function(form) {
      data.form = form.toHTML(fieldIterator);
      data.errors = _.filter(form.fields, function(key) {
        return key.error;
      });

      res.render('enquiry-form', data);
    },
    other: function (form) {
      data.form = form.toHTML(fieldIterator);
      res.render('enquiry-form', data);
    }
  });
});

router.get('/complete', function(req, res, next) {
  res.render('enquiry-success');
});

module.exports = router;
