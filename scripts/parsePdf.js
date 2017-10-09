// This script is for scraping text off pdfs for rawText.json, to be used for search
// Note that when rawText.json grows too large. Search should be moved to services like ElasticSearch (TODO)

const fs = require('fs'),
    PDFParser = require("pdf2json");

    fs.readdir('../pdf', (err, files) => {
        let count = 0;
        console.log(`Found ${files.length + 1} pdfs`);
        setInterval(() => {
            if (count < files.length) {
                let pdfParser = new PDFParser();

                pdfParser.on("pdfParser_dataError", errData => console.error(errData.parserError) );
                pdfParser.on("pdfParser_dataReady", pdfData => {
                        let totalText = '';
                        pdfData.formImage.Pages.forEach(e => {
                            e.Texts.forEach(t => {
                                totalText += decodeURI(t.R[0].T);
                            });
                        });
                        const oldRawText = require('../app/data/rawText.json');

                        const parsedData = { rawText: totalText };

                        oldRawText.push(parsedData);
                    fs.writeFile('../app/data/rawText.json', JSON.stringify(oldRawText));
                    console.log('done ');
                });
                console.log(files[count]);
                pdfParser.loadPDF('../pdf/' + files[count]);
                count += 1;
            } else {
                console.log('no more...')
            }
        }, 3000)
    })
