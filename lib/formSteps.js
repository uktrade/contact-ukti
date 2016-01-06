var forms = require('forms');
var fields = forms.fields;
var validators = forms.validators;
var widgets = forms.widgets;

var utils = require('./utils');
var countries = require('../data/countries');
var industries = require('../data/industries');

var steps = [
  {
    name: 'type',
    heading: 'Your enquiry',
    fields: {
      // required to make validation submit correctly
      // when form only contains radios/checkboxes
      hidden: fields.string({
        widget: widgets.hidden()
      }),
      'enquiry-type': fields.string({
        required: validators.required('is required'),
        label: 'What is your enquiry related to',
        widget: widgets.multipleRadio(),
        choices: {
          'Investment': 'Investment',
          'Export': 'Export',
        },
      }),
    },
  },
  {
    name: 'your-details',
    fields: {
      name: fields.string({
        label: 'Your full name',
        required: validators.required('is required'),
      }),
      'job-title': fields.string({
        required: true,
      }),
      'email-address': fields.email({
        required: validators.required('is required'),
      }),
      'telephone-number': fields.string({
        required: validators.required('is required'),
      }),
    },
  },
  {
    name: 'your-company-details',
    fields: {
      'company-name': fields.string({
        required: validators.required('is required'),
      }),
      'company-address': fields.string({
        required: validators.required('is required'),
        widget: widgets.textarea({ rows: 4 }),
      }),
      'company-country': fields.string({
        label: 'Which country is your company based in?',
        required: validators.required('is required'),
        widget: widgets.select({
          classes: ['js-autocomplete']
        }),
        choices: utils.mapOptions(countries, { insertBlank: true }),
      }),
      'company-industry': fields.string({
        label: 'Primary operating industry',
        required: validators.required('is required'),
        widget: widgets.select({
          classes: ['js-autocomplete']
        }),
        choices: utils.mapOptions(industries, { insertBlank: true })
      }),
      'annual-turnover': fields.string({
        label: 'Annual turnover (optional)',
      }),
      'number-of-employees': fields.string({
        label: 'Number of employees (optional)',
      }),
    },
  },
  {
    name: 'summary',
    fields: {
      'your-enquiry': fields.string({
        label: 'Provide a brief summary of your enquiry',
        required: validators.required('is required'),
        widget: widgets.textarea({ rows: 6 }),
      }),
    },
  },
  {
    name: 'source',
    fields: {
      // required to make validation submit correctly
      // when form only contains radios/checkboxes
      hidden: fields.string({
        widget: widgets.hidden()
      }),
      'how-you-heard-about-us': fields.string({
        required: validators.required('is required'),
        label: 'How did you hear about UK Trade & Investment?',
        widget: widgets.multipleRadio(),
        choices: {
          'Contact with UKTI staff member': 'Contact with UKTI staff member',
          'GOV.UK website': 'GOV.UK website',
          'Press article/advert': 'Press article/advert',
          'Intermediary (for example a trade association, chamber or bank)': 'Intermediary (for example a trade association, chamber or bank)',
          'Social Media': 'Social Media',
          'Personal reference': 'Personal reference',
          'Other': 'Other',
        },
      }),
    },
  },
  {
    name: 'contact-methods',
    fields: {
      // required to make validation submit correctly
      // when form only contains radios/checkboxes
      hidden: fields.string({
        widget: widgets.hidden()
      }),
      'data-protection': fields.array({
        required: validators.required('is required'),
        label: 'Would you be happy to be contacted again?',
        widget: widgets.multipleCheckbox(),
        choices: {
          'By UK Trade & Investment': 'By UK Trade & Investment',
          'By external UK Trade & Investment partners': 'By external UK Trade & Investment partners',
          'By overseas providers for UK Trade & Investment services': 'By overseas providers for UK Trade & Investment services',
        },
      }),
    },
  },
];

module.exports = steps;
