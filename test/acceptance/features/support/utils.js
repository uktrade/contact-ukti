'use strict';

var Q = require('q');
var steps = [
  'Topic',
  'Exported Before',
  'Personal Details',
  'Company Location',
  'Industry',
  'Company Details',
  'Enquiry',
  'Check Details',
  'Confirmation'
];

function getPage(pageName) {
  if (!browser.pages[pageName]) {
    var errStr = 'Could not find page named "' + pageName + '" in the PageObjectMap, did you remember to add it?';
    throw new Error(errStr);
  }
  return new browser.pages[pageName](browser);
}

function getPreviousPage(pageName) {
  var stepIndex = steps.indexOf(pageName);
  var prevPageName = steps[stepIndex - 1];

  if (!browser.pages[prevPageName]) {
    var errStr = 'Could not find page named "' + prevPageName + '" in the PageObjectMap, did you remember to add it?';
    throw new Error(errStr);
  }
  return new browser.pages[prevPageName](browser);
}

function completeSteps(pageName) {
  var deferred = Q.defer();
  var stepIndex = steps.indexOf(pageName);

  if (stepIndex > 0) {
    var prevStep = steps[stepIndex - 1];
    var page = getPage(prevStep);

    page
      .get()
      .then(page.complete)
      .then(deferred.resolve);
  } else {
    deferred.resolve();
  }

  return deferred.promise;
}

module.exports = {
  steps: steps,
  getPage: getPage,
  getPreviousPage: getPreviousPage,
  completeSteps: completeSteps
};
