'use strict';

var jade = require('jade');

// @relativeTemplatePath is the path relative to the views directory, so include subDirectories if necessary
// @data is the data that will be injected into the template
exports.compile = function compileTemplate(relativeTemplatePath, data, next) {

  // actual path where the template lives on the file system, assumes the standard /views directory
  // output would be something like /var/www/my-website/views/email-template.jade
  var absoluteTemplatePath = relativeTemplatePath + '.jade';

  // get our compiled template by passing path and data to jade
  jade.renderFile(absoluteTemplatePath, data, function renderFile(err, compiledTemplate) {
    if (err) {
      // console.log(err);
      throw new Error('Problem compiling template(double check relative template path): ' + relativeTemplatePath);
    }
    next(null, compiledTemplate);
  });

};
