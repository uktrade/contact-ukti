'use strict';

var globule = require('globule');
var path = require('path');
var findPath = path.resolve(__dirname, '..', 'pages', '**', '*.js');
var pages = globule.find(findPath);
var pageMap = {};

for (var i = 0; i < pages.length; i++) {
  var pagePath = path.resolve(pages[i]);
  var page = require(pagePath);

  pageMap[page.name] = page.class;
}

module.exports = pageMap;
