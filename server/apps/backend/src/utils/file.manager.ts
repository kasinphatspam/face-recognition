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

export function readCSV<T>(filePath: string): Promise<T[]> {
  return new Promise((resolve, reject) => {
    const results = [];

    fs.createReadStream(filePath)
      .pipe(csv())
      .on('data', (data) => {
        results.push(data);
      })
      .on('end', () => {
        resolve(results);
      })
      .on('error', (error) => {
        reject(error);
      });
  });
}
