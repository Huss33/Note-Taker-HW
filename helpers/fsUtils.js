const fs = require('fs');
const util = require('util');

const readDataFile = util.promisify(fs.readFile);

const writeInFile = (destination, content) =>
    fs.writeFile(destination, JSON.stringify(content, null, 4), (err) =>
        err ? console.error(err) : console.info(`\nData written to ${destination}`));

const readCopyAppend = (content, file) => {
    fs.readFile(file, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
        } else {
            const jParseData = JSON.parse(data);
            jParseData.push(content);
            writeInFile(file, jParseData);
        }
    });
};

// const deleteDataFile = (content, file) => {
//     fs.readFile(file, 'utf8', (err, data) => {
//         if (err) {
//             console.error(err);
//         } else {
//             const jParseData = JSON.parse(data);
//             jParseData.pop(content);
//             writeInFile(file, jParseData);
//         }
//     })
// } 

module.exports = {readDataFile, writeInFile, readCopyAppend, };
