import { Knex } from 'knex';
import { csvToSql } from '../../utils/csv_parser';
import * as fs from 'fs';

export async function seed(knex: Knex): Promise<void> {
  await knex.raw(`
  -- Excluir registros da tabela "turma" que referenciam a tabela "disciplina"
DELETE FROM "turma" WHERE "id_disciplina" IN (SELECT "id" FROM "disciplina");

-- Excluir registros da tabela "avaliacao" que referenciam a tabela "turma"
DELETE FROM "avaliacao" WHERE "id_turma" IN (SELECT "id" FROM "turma");

-- Excluir registros da tabela "denuncia" que referenciam a tabela "avaliacao"
DELETE FROM "denuncia" WHERE "id_avaliacao" IN (SELECT "id" FROM "avaliacao");

-- Excluir registros da tabela "professor" que referenciam a tabela "departamento"
DELETE FROM "professor" WHERE "id_departamento" IN (SELECT "id" FROM "departamento");

-- Excluir registros da tabela "disciplina" que referenciam a tabela "departamento"
DELETE FROM "disciplina" WHERE "id_departamento" IN (SELECT "id" FROM "departamento");

-- Excluir registros da tabela "estudante"
DELETE FROM "estudante";

-- Excluir registros da tabela "departamento"
DELETE FROM "departamento";

  `);

  for (const tableName of [
    'departamento',
    'professor',
    'disciplina',
    'turma',
    'estudante',
    'avaliacao',
    'denuncia',
  ]) {
    const csvQuery = await csvToSql(
      `./src/database/data/${tableName}.csv`,
      tableName,
    );
    const filePath = `./src/scripts/${tableName}_insert.sql`;
    fs.writeFileSync(filePath, csvQuery);
    await knex.raw(csvQuery);
  }
}
