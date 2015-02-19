var fs = require('fs');
var screenshot = require('nw-shot');
var es = require('event-stream');
var line = require('line-stream');
var PDF = require('pdfkit');
var doc = new PDF({size:'A4',layout:'landscape'});

function changeSlideMacro() { location.hash = '#N'; }

module.exports = function (url, slides) {
  slides = slides || 1;

  var im = {width: 1024-211};
  var count = 0;
  var inject = ';( ' + changeSlideMacro + ')();';

  inject = Array.apply(null, {length:slides+1})
    .map(Function.prototype.call, Number).slice(1)
    .map(function(n) { return inject.replace('N', n); })

  screenshot({
    url : url || 'http://localhost:2000/',
    width : 1024 * 1.5,
    height : 682 * 1.5,
    eval: inject,
    delay: 0.2,
    encoding: 'base64'
  })
  .pipe(line())
  .pipe(es.through(function(buffer) {
    count += 1;
    doc.image(buffer, 14.5, 22, im);
    if (count < slides) doc.addPage()
  }, function end() {
    this.emit('end');
    doc.end()
  }));

  return doc;

}




