// Temp file to use a file name and generate HTML data for marshuang.json

const fs = require('fs'),
    PDFParser = require("pdf2json");
let marshuangJSON = require('../app/data/marshuang.json');

fs.readdir('../pdf', (err, files) => {
    let count = 0;
    console.log(`Found ${files.length} pdfs`);
    setInterval(() => {
        if (count < files.length) {

            console.log(files[count]);

            const fileMappedToJSON = {
            	style: `style${(count % 6) + 1}`,
            	imagePath: `images/${89 + count + 1}.jpg`,
            	pdfPath: `pdf/${encodeURI(files[count])}`,
            	title: files[count].split('｜')[2],
            	body: files[count].replace('.pdf', '')
            };

            console.log(fileMappedToJSON);

            marshuangJSON = [ fileMappedToJSON, ...marshuangJSON ];

            count += 1;

        } else {
            console.log('no more...');
            var outputFilename = '../app/data/marshuangUpdated.json';

            fs.writeFile(outputFilename, JSON.stringify(marshuangJSON), function(err) {
                if(err) {
                  console.log(err);
                } else {
                  console.log("JSON saved to " + outputFilename);
                }
            })
        }
    }, 2000)
});
