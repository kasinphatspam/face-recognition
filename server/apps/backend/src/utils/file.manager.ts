import * as fs from 'fs';
import * as csv from 'csv-parser';

export function write(path: string, buffer: any) {
  fs.writeFileSync(path, buffer);
}

export function read(path: string) {
  fs.readFileSync(path, { encoding: 'utf8' });
}

export function remove(path: string) {
  if (fs.existsSync(path)) {
    fs.unlinkSync(path);
  }
}

export function readCSV(filePath: string) {
  const result = [];

  fs.createReadStream(filePath)
    .pipe(csv())
    .on('data', (data) => {
      result.push(data);
    })
    .on('end', () => {
      console.log(result);
    });

  return result;
}
