var router = require('express').Router();
var formSteps = require('../lib/formSteps');
var formHandler = require('../lib/formHandler');

/* form page. */
router.get('/', function(req, res) {
  res.redirect('/enquire/' + formSteps[0].name);
});

router.get('/complete', function(req, res, next) {
  res.render('enquiry-success');
});

router.all('/:step', formHandler.handleRequest);

module.exports = router;
