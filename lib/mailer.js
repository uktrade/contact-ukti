var q = require('q');
var nodemailer = require('nodemailer');
var htmlToText = require('nodemailer-html-to-text').htmlToText;
var jadeCompiler = require('../lib/jadeCompiler');
var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
}, {
  from: process.env.FROM_ADDR
});

transporter.use('compile', htmlToText());

module.exports = {

  sendEnquiry: function (formData) {
    var deferred = q.defer();

    jadeCompiler.compile('emails/inward-enquiry', { fields: formData }, function (error, html) {
      if (error) {
        deferred.reject(error);
      } else {
        var mailOpts = {
          to: process.env.TO_ADDR,
          subject: 'Inward investment enquiry',
          html: html
        };

        deferred.resolve(transporter.sendMail(mailOpts));
      }
    });

    return deferred.promise;
  }

};
