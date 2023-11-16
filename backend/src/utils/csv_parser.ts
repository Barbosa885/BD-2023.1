import * as fs from 'fs';
import * as csv from 'csv-parser';

// Create a csv to sql parser function
async function csvToSql(csvPath: string, tableName: string): Promise<string> {
  // Create a promise to be returned
  return new Promise((resolve, reject) => {
    // Create an array to store the insert statements
    const insertStatements: string[] = [];

    // Create a stream to read the csv file
    const stream = fs
      .createReadStream(csvPath)
      .pipe(csv({ separator: ',' }))
      .on('data', (data) => {
        // For each row, create an insert statement
        const insertStatement = `INSERT INTO "${tableName}" (${Object.keys(
          data,
        ).join(',')}) VALUES (${Object.values(data)
          .map((value) => `'${value}'`)
          .join(',')});`;
        // Push the insert statement to the array
        insertStatements.push(insertStatement);
      })
      .on('end', () => {
        // When the stream ends, resolve the promise with the joined insert statements
        resolve(insertStatements.join('\n'));
      })
      .on('error', (error) => {
        // If an error occurs, reject the promise
        reject(error);
      });
  });
}

export { csvToSql };
