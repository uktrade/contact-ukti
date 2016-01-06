var _ = require('lodash');
var S = require('string');
var forms = require('forms');

var fieldIterator = require('./fieldIterator');
var formSteps = require('./formSteps');
var mailer = require('./mailer');

module.exports = {

  handleRequest: function(req, res) {
    var stepIndex = _.findIndex(formSteps, 'name', req.params.step);

    // if step doesn't exist, redirect
    if (stepIndex === -1) {
      return res.redirect('/enquire');
    }

    var currentStep = formSteps[stepIndex];
    var heading = currentStep.heading || S(currentStep.name).humanize().s;
    var form = forms.create(currentStep.fields, { validatePastFirstError: true });

    // set session data if it doesn't exist
    if (!req.session.hasOwnProperty('formData')) {
      req.session.formData = {};
    }

    var data = {
      method: 'POST',
      heading: heading,
      prevStep: stepIndex !== 0 ? formSteps[stepIndex-1].name : false,
      lastStep: stepIndex === formSteps.length-1,
    };

    form.handle(req, {
      success: function (form) {
        req.session.formData[heading] = form.data;

        if (!data.lastStep) {
          return res.redirect('/enquire/' + formSteps[stepIndex+1].name);
        }

        mailer.sendEnquiry(req.session.formData).then(function (info) {
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
        if (req.session.formData.hasOwnProperty(heading)) {
          form = form.bind(req.session.formData[heading]);
        }
        data.form = form.toHTML(fieldIterator);
        res.render('enquiry-form', data);
      }
    });
  }

};
