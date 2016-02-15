'use strict';
var path = require('path');
var hof = require('hof');
var i18n = hof.i18n({
  path: path.resolve(__dirname, '../apps/common/translations/__lng__/__ns__.json')
});

module.exports = function pageNotFoundHandler(req, res) {
  var content = {
    title: i18n.translate('errors.not-found.title'),
    message: i18n.translate('errors.not-found.message')
  };

  res.status(404);

  // respond with html page
  if (req.accepts('html')) {
    res.render('error', {
      content: content,
      startLink: ''
    });
    return;
  }

  // respond with json
  if (req.accepts('json')) {
    res.send({
      error: content.title,
      content: content
    });
    return;
  }

  // default to plain-text. send()
  res.type('txt').send(content.title);
};
