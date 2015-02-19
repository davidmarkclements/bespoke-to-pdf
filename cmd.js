#!/usr/bin/env node

var d2p = require('./index.js');
var argv = process.argv.slice(2);
var url = argv.filter(isNaN)[0];
var slides = +~~(argv.filter(isFinite)[0]);

d2p(url, slides).pipe(process.stdout);