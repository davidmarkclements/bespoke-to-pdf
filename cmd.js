#!/usr/bin/env node
var d2p = require('./index.js');
var argv = require('minimist')(process.argv.slice(2));
var url = argv._.filter(isNaN)[0];
var slides = +~~(argv._.filter(isFinite)[0]);
var path = require('path');

argv.slide = Object.keys(argv).map(function(k) {
  var m = k.match(/slide-([a-zA-Z]+)/)
  return m && m[1];
}).filter(Boolean).reduce(function (o, k) {
  o[k] = argv['slide-' + k];
  delete  argv['slide-' + k];
  try { o[k] = JSON.parse(o[k]); } catch (e) { }
  return o;
}, {});


if (argv.app) {
  argv.app = path.resolve(process.cwd(), argv.app)
}

d2p(url, slides, argv).pipe(process.stdout);