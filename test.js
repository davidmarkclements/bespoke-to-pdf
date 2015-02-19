var PDF = require('pdfkit');
var doc = new PDF;


doc.pipe(require('fs').createWriteStream('./out.pdf'))

doc.text('meow')
doc.end();
