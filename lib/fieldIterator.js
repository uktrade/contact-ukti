var _ = require('lodash');
var tag = require('../node_modules/forms/lib/tag');

module.exports = function (name, field, options) {
  var opt = options || {};
  var wrappedContent = [];
  var wrapperClasses = field.cssClasses || [];
  var errorClass = field.error ? ' error' : '';
  var errorHTML = opt.hideError || !field.error ? '' : tag('span', {
    classes: ['error-message']
  }, field.error);

  if (field.widget.type === 'hidden') {
    return field.widget.toHTML(name);
  }

  if (field.widget.type === 'multipleCheckbox' || field.widget.type === 'multipleRadio') {
    var fieldsetAttrs = { classes: [] };
    if (opt.fieldsetClasses) {
      fieldsetAttrs.classes = fieldsetAttrs.classes.concat(opt.fieldsetClasses);
    }
    var legendAttrs = { classes: [] };
    if (opt.legendClasses) {
      legendAttrs.classes = legendAttrs.classes.concat(opt.legendClasses);
    }

    var choicesHTML = [];
    Object.keys(field.choices).forEach(function(key) {
      var choiceLabel = field.choices[key];
      var choiceVal = key;

      var inputHTML = tag('input', {
        type: field.widget.type === 'multipleCheckbox' ? 'checkbox' : 'radio',
        value: choiceVal,
        name: field.name,
        checked: Array.isArray(field.value) ? field.value.indexOf(choiceVal) !== -1 : field.value === choiceVal,
      });
      var labelHTML = tag('label', {
        classes: ['block-label']
      }, inputHTML + choiceLabel);

      choicesHTML.push(labelHTML);
    });

    var fieldset = tag('fieldset', fieldsetAttrs, [
      tag('legend', legendAttrs, field.labelText(name)),
      errorHTML,
      choicesHTML.join(''),
    ].join(''));
    wrappedContent.push(fieldset);
  } else {
    var label = tag('label', {
      classes: ['form-label'],
      for: field.id || 'id_' + name
    }, (field.label || field.labelText(name)) + errorHTML);

    if (!Array.isArray(field.widget.classes)) {
      field.widget.classes = [];
    }
    if (field.widget.classes.indexOf('form-control') === -1) {
      field.widget.classes.push('form-control');
    }

    var fieldHTMLs = [label, field.widget.toHTML(name, field)];

    wrappedContent = wrappedContent.concat(fieldHTMLs);
  }

  var tagAttrs = {
    classes: wrapperClasses.concat(['form-group', errorClass])
  };

  _.each(field.dataAttrs, function(v, k) {
    tagAttrs['data-' + k] = v;
  });

  return tag('div', tagAttrs, wrappedContent.join(''));
};
