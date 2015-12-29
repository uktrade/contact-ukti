var nodemailer = require('nodemailer');
var htmlToText = require('nodemailer-html-to-text').htmlToText;
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

  sendInwardEnquiry: function (opts) {
    var mailOpts = {
      to: process.env.TO_ADDR,
      subject: 'Inward investment enquiry',
      html: opts.html
    };

    return transporter.sendMail(mailOpts);
  }

};
