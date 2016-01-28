'use strict';

var $ = require('jquery');
var typeahead = require('typeahead.js-browserify');
var Bloodhound = require('typeahead.js-browserify').Bloodhound;

typeahead.loadjQueryPlugin();

$('.typeahead').each(function applyTypeahead() {
  var $el = $(this);
  var $parent = $el.parent();
  var attributes = $el.prop('attributes');
  var $input = $('<input/>');
  var selectedValue = $el.val();
  var typeaheadList = $el.find('option').map(function mapOptions() {
    /*eslint-disable */
    if (this.value === '') {
      // remove any empty values from typeahead
      return;
    }
    return this.value;
    /*eslint-enable */
  }).get();

  // remove the selectbox
  $el.remove();

  $.each(attributes, function applyAttributes() {
    $input.attr(this.name, this.value);
  });

  $input.removeClass('js-hidden');
  $input.addClass('form-control');
  $input.val(selectedValue);

  $parent.append($input);

  $input.typeahead({
    minLength: 1,
    hint: false,
    limit: 5
  }, {
    source: new Bloodhound({
      datumTokenizer: Bloodhound.tokenizers.whitespace,
      queryTokenizer: Bloodhound.tokenizers.whitespace,
      local: typeaheadList
    })
  });
});
