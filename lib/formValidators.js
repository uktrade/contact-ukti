var S = require('string');
var util = require('util');

var forms = require('forms');
var validators = forms.validators;

var format = function format(message) {
    if (arguments.length < 2 || message.lastIndexOf('%s') >= 0) {
        return util.format.apply(null, [message].concat(Array.prototype.slice.call(arguments, 1)));
    } else {
        return message;
    }
};

var formatFieldName = function formatFieldName(field) {
    var defaultFieldName = 'This field';

    // in regular use, labelText is a defined function, but it's not when running tests.
    if (typeof field.labelText === 'function') {
        return field.name ? field.labelText(field.name) : defaultFieldName;
    } else {
        return field.name || defaultFieldName;
    }
};

validators.requiresFieldIfFieldEquals = function (alternateField, alternateValue, message) {
  var msg = message || '%s is required.';
  var validator = function (form, field, callback) {
    var alternateMatch = (form.fields[alternateField].data || '') === alternateValue;
    var fieldBlank = (field.data || '').length === 0;
    if (alternateMatch && fieldBlank) {
      // callback(msg);
      callback(format(msg, formatFieldName(field)));
    } else {
      callback();
    }
  };
  validator.forceValidation = true;
  return validator;
};

module.exports = validators;
