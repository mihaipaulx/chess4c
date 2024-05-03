import fs from 'fs';
import split from 'split';
import { ZSTDDecompress } from 'simple-zstd';

const inputPath = 'puzzles.csv.zst';
const outputPath = 'puzzles.csv';

let rowCount = 0;
let maxRowCount = 1000

fs.createReadStream(inputPath)
  .pipe(ZSTDDecompress())
  .pipe(split()) // Split incoming data into lines
  .on('data', (line) => {
    // Increment the row counter
    rowCount++;

    // If row counter reaches maxRowCount, end the algorithm, + 1 is added since first row has headers
    if (rowCount > maxRowCount + 1) {
      console.log('Reached row limit, stopping...');
      process.exit(); // End the process
    }

    // Print the row and its counter
    console.log(`Row ${rowCount}: ${line}`);

    // Write the line to the output file
    fs.appendFileSync(outputPath, line + '\n');
  })
  .on('error', (err) => {
    console.error(err);
  })
  .on('finish', () => {
    console.log('Copy Complete!');
  });