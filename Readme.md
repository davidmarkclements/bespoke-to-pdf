# bespoke-to-pdf

Generate a PDF file from your bespoke presentation 

## Requirements

* Presentation must be using [bespoke-hash][]
  * Unless using a custom app 

## Usage

### Command line
```sh
$ npm -g install bespoke-to-pdf
$ bespoke-to-pdf http://localhost:8080 30 > ./out.pdf
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
var pdfStream = toPdf('http://localhost:8080', 30);

pdfStream.pipe(fs.createWriteStream('./out.pdf'));
```

The `bespoke-to-pdf` module returns a function, which 
takes a presentation url and slide count and returns
a PDF stream. 

```js
toPdf(presentationUrl<String>, slideCount<Number>, opts<Object>) => Stream
```

## Options

The exported function can be passed a third options parameter to 
tweak positional, dimensional and time flow settings.

Listed values are defaults

```js
{

  width: 1024 * 1.5,  //width of browser instance
  height: 682 * 1.5,  //height of browser instance
  delay: 5000, // (milliseconds) delay from page load to first capture
  orientation: 'landscape', // PDF paper layout portrait or landscape 
  paperSize: 'A4',  // PDF paper size, accepts common US and GB sizes or an array tuple consisting of [width, height]
  app: undefined, //path to nw.js app, which is passed to nw-shot dependency
  slide: {
    left: 14.5, //left position of the slide in the PDF page
    top: 22, // top position of the slide in the PDF page
    width: 813, // width of the slide in the PDF page
    height: undefined, //height of the slide in the PDF page
    fit: undefined, // Array tuple consisting of [width, height]
                    // fit overrides width and height, causes image
                    // to fit into supplied bounds
    scale: 1, // scale image by amount
    delay: 1000 // delay between slides
  }
}
```

To pass top level options via the command line simply use their
names as flags, e.g.

```sh
$ bespoke-to-pdf --delay 1000 http://localhost:8080 30 > ./out.pdf
```

Access sub level options using a hyphen:

```sh
$ bespoke-to-pdf --slide-scale 2 http://localhost:8080 30 > ./out.pdf
```

Supply command line objects or arrays as JSON, 
make sure to quote it so spaces don't cause unintended parsing:

```sh
$ bespoke-to-pdf --slide-fit "[100, 100]" http://localhost:8080 30 > ./out.pdf
```

## Example

```sh
$ bespoke-to-pdf http://davidmarkclements.github.io/10-tips/ 71 > 10-tips.pdf
```

This will generate a PDF from a remote bespoke presentation, 
depending on connection and CPU speed the delay may have 
to be adjusted slightly. Locally hosted presentations that
don't use on-load fade-ins are perfectly suited to a lower
delay. 

## Getting a Visual

Set an environment variable `NWSHOT_SHOW` to `1` to unhide
the NW.js browser window taking snapshots.

```sh
$ NWSHOT_SHOW=1 bespoke-to-pdf http://localhost:8080 30 > ./out.pdf
```

## Running on a Server

NW.js requires an X server to run, currently there is no
headless offering. Until that happens see [this comment in
NW.js issue 769](https://github.com/nwjs/nw.js/issues/769#issuecomment-40787394) for a starting place to create a server environment that
will run NW.js without requiring a physical display.

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

[bespoke-hash]: https://www.npmjs.com/package/bespoke-hash