var jsdom = require("jsdom");
var fs = require('fs');

jsdom.env({
    file: '../index.html',
    done: function (err, window) {
        global.window = window;
        global.document = window.document;
        // now you can work on parsing HTML as you normally would in a browser
        // e.g. this will work  
        scrape();
    }
});
const extractPath = (pathString) => {
	const splitted = pathString.split('/');
	const length = splitted.length;
	return [splitted[length - 2], splitted[length - 1]].join('/');
}

function scrape() {
    var anchors = document.getElementsByTagName('article');
    // console.log(anchors[500].href)
    var arr = [].slice.call(anchors);
    var mapped = arr.map(a => ({
    	style: a.className,
    	imagePath: extractPath(a.children[0].children[0].src),
    	pdfPath: extractPath(a.children[1].href),
    	title: a.children[1].children[0].innerHTML,
    	body: a.children[1].children[1].children[0].innerHTML
    }));

    var outputFilename = '../app/data/marshuang.json';
        
    fs.writeFile(outputFilename, JSON.stringify(mapped), function(err) {
        if(err) {
          console.log(err);
        } else {
          console.log("JSON saved to " + outputFilename);
        }
    })
}
