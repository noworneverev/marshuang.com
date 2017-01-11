const fs = require('fs'),
    PDFParser = require("pdf2json");

    fs.readdir('../pdf', (err, files) => {
        let count = 0;
        setInterval(() => {
            if (count < 1) {
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