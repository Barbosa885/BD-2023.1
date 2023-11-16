import * as fs from 'fs';
import * as csvParser from 'csv-parser';

async function filtrarValores(): Promise<void> {
  const disciplinasSet = new Set<string>();

  // Ler o arquivo disciplina.csv e armazenar os valores da coluna "id" no Set
  fs.createReadStream('./src/database/data/disciplina.csv')
    .pipe(csvParser())
    .on('data', (row: any) => {
      disciplinasSet.add(row.id);
    })
    .on('end', () => {
      // Ler o arquivo turma.csv, filtrar as linhas com valores válidos e escrever em um novo arquivo
      const turmasCorrigidas: any[] = [];
      fs.createReadStream('./src/database/data/turma.csv')
        .pipe(csvParser())
        .on('data', (row: any) => {
          if (disciplinasSet.has(row.id_disciplina)) {
            turmasCorrigidas.push(row);
          }
        })
        .on('end', () => {
          // Escrever as linhas corrigidas em um novo arquivo turma_corrigida.csv
          const writeStream = fs.createWriteStream(
            './src/database/data/turma_corrigida.csv',
          );
          writeStream.write('id,id_disciplina,id_professor\n');
          turmasCorrigidas.forEach((row: any) => {
            writeStream.write(
              `${row.id},${row.id_disciplina},${row.id_professor}\n`,
            );
          });
          writeStream.end();
        });
    });
}

filtrarValores().catch((error) => {
  console.error('Ocorreu um erro:', error);
});

export { filtrarValores };
