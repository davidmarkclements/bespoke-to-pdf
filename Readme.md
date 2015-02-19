# bespoke-to-pdf

Generate a PDF file from your [bespoke][] presentation 

## Requirements

* Presentation must be using [bespoke-hash][]

## Usage

### Command line
```sh
$ npm -g install bespoke-to-pdf
$ bespoke-to-pdf http://localhost:2000 30 > ./out.pdf
```

#### Inputs

Simply provide the URL of the presentation, and the 
amount of slides in the presentation.

```sh
bespoke-to-pdf [presentation-url] [slide-count]
bespoke-to-pdf [slide-count] [presentation-url]
```

### Programmatic
```sh
$ npm install --save bespoke-to-pdf
```

```js
var toPdf = require('bespoke-to-pdf');
var fs = require('fs');
var pdfStream = toPdf('http://localhost:2000', 30);

pdfStream.pipe(fs.createWriteStream('./out.pdf'));
```

The `bespoke-to-pdf` module returns a function, which 
takes a presentation url and slide count and returns
a PDF stream. 

```js
toPdf(presentationUrl<String>, slideCount<Number>) => Stream
```

## How

`bespoke-to-pdf` uses a hidden [NW.js](http://nwjs.io/) browser
to load the presentation, then uses the [`Window.capturePage`](https://github.com/nwjs/nw.js/wiki/Window#windowcapturepagecallback--image_format-config_object-) to capture an image of the current slide, moving
through the slides by incrementing `location.hash`. Each
captured image is appended to a `PDFDocument` stream as provided
by [pdfkit](https://www.npmjs.com/package/pdfkit).

## License

[MIT License](http://en.wikipedia.org/wiki/MIT_License)

## Sponsorship

Sponsored by nearForm

[bespoke]: https://www.npmjs.com/package/bespoke
[bespoke-hash]: https://www.npmjs.com/package/bespoke-hash