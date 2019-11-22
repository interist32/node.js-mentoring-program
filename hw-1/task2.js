import csv from 'csvtojson';
import * as path from 'path';

console.log(csv.csv);

const CSV_FILE_PATH = path.join(__dirname, './input.csv');
const TEXT_FILE_PATH = path.join(__dirname, './output.txt');

const readStream = require('fs').createReadStream(CSV_FILE_PATH);
const writeStream = require('fs').createWriteStream(TEXT_FILE_PATH);

readStream
    .pipe(csv({
            headers: ['book', 'author', 'amount', 'price'],
          }).on('error', (err) => console.log(err)))
    .pipe(writeStream);
