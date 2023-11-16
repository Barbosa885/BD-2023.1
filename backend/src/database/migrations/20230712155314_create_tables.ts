import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.raw(`
  -- Tabela de Departamento
CREATE TABLE "departamento" (
    "id" SERIAL PRIMARY KEY,
    "nome" varchar(255) NOT NULL
);

-- Tabela de Professor
CREATE TABLE "professor" (
    "id" SERIAL PRIMARY KEY,
    "nome" varchar(255) NOT NULL,
    "id_departamento" INTEGER NOT NULL,
    FOREIGN KEY ("id_departamento") REFERENCES "departamento" ("id")
);

-- Tabela de Estudante
CREATE TABLE "estudante" (
    "id" SERIAL PRIMARY KEY,
    "nome" varchar(255) NOT NULL,
    "email" varchar(255) NOT NULL,
    "matricula" varchar(255) NOT NULL,
    "curso" varchar(255) NOT NULL,
    "senha" varchar(255) NOT NULL,
    "admin" boolean NOT NULL DEFAULT false
);

-- Tabela de Disciplina
CREATE TABLE "disciplina" (
    "id" varchar(255) PRIMARY KEY, 
    "nome" varchar(255) NOT NULL,
    "id_departamento" INTEGER NOT NULL,
    FOREIGN KEY ("id_departamento") REFERENCES "departamento" ("id")
);

-- Tabela de Turma
CREATE TABLE "turma" (
    "id" SERIAL PRIMARY KEY,
    "id_disciplina" varchar(255) NOT NULL,
    "id_professor" INTEGER NOT NULL,
    FOREIGN KEY ("id_disciplina") REFERENCES "disciplina" ("id"),
    FOREIGN KEY ("id_professor") REFERENCES "professor" ("id")
);

-- Tabela de Avaliação
CREATE TABLE "avaliacao" (
    "id" SERIAL PRIMARY KEY,
    "id_estudante" INTEGER NOT NULL,
    "id_turma" INTEGER NOT NULL,
    "comentario" varchar(255) NOT NULL,
    "nota" INTEGER NOT NULL,
    FOREIGN KEY ("id_estudante") REFERENCES "estudante" ("id"),
    FOREIGN KEY ("id_turma") REFERENCES "turma" ("id")
);

-- Tabela de Denúncia
CREATE TABLE "denuncia" (
    "id" SERIAL PRIMARY KEY,
    "id_estudante" INTEGER NOT NULL,
    "id_avaliacao" INTEGER NOT NULL,
    "motivo" varchar(255) NOT NULL,
    FOREIGN KEY ("id_estudante") REFERENCES "estudante" ("id"),
    FOREIGN KEY ("id_avaliacao") REFERENCES "avaliacao" ("id")
);

  `);
}

export async function down(knex: Knex): Promise<void> {
  await knex.raw(`
    DROP TABLE IF EXISTS "departamento" CASCADE;
    DROP TABLE IF EXISTS "estudante" CASCADE;
    DROP TABLE IF EXISTS "professor" CASCADE;
    DROP TABLE IF EXISTS "disciplina" CASCADE;
    DROP TABLE IF EXISTS "turma" CASCADE;
    DROP TABLE IF EXISTS "avaliacao" CASCADE;
    DROP TABLE IF EXISTS "denuncia" CASCADE;
  `);
}
