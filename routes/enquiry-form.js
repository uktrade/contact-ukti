var express = require('express');
var router = express.Router();

/* GET form page. */
router.get('/', function(req, res, next) {
  res.render('enquiry-form', { title: 'Contact UK Trade & Investment' });
});

module.exports = router;
