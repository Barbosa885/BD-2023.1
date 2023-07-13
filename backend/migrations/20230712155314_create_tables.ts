import { Knex } from 'knex';

const createTables = `
CREATE TABLE IF NOT EXISTS "Estudante" (
    "ID" int SERIAL NOT NULL,
    "Nome" varchar(255)   NOT NULL,
    "Email" varchar(255)   NOT NULL,
    "Curso" varchar(255)   NOT NULL,
    "Senha" varchar(255)   NOT NULL,
    "Tipo" boolean   NOT NULL,
    CONSTRAINT "pk_Estudante" PRIMARY KEY (
        "ID"
     )
);

CREATE TABLE IF NOT EXISTS "Professor" (
    "ID" int   NOT NULL,
    "Nome" varchar(255)   NOT NULL,
    "Departamento" varchar(255)   NOT NULL,
    CONSTRAINT "pk_Professor" PRIMARY KEY (
        "ID"
     ),
    CONSTRAINT "uc_Professor_Nome" UNIQUE (
        "Nome"
    )
);

CREATE TABLE IF NOT EXISTS "Disciplina" (
    "ID" int   NOT NULL,
    "Nome" varchar(255)   NOT NULL,
    "ID_Departamento" int   NOT NULL,
    CONSTRAINT "pk_Disciplina" PRIMARY KEY (
        "ID"
     ),
    CONSTRAINT "uc_Disciplina_Nome" UNIQUE (
        "Nome"
    )
);

CREATE TABLE IF NOT EXISTS "Turma" (
    "ID" int   NOT NULL,
    "ID_Disciplina" int   NOT NULL,
    "ID_Professor" int   NOT NULL,
    CONSTRAINT "pk_Turma" PRIMARY KEY (
        "ID"
     )
);

CREATE TABLE IF NOT EXISTS "Departamento" (
    "ID" int   NOT NULL,
    "Nome" varchar(255)   NOT NULL,
    CONSTRAINT "pk_Departamento" PRIMARY KEY (
        "ID"
     ),
    CONSTRAINT "uc_Departamento_Nome" UNIQUE (
        "Nome"
    )
);

CREATE TABLE IF NOT EXISTS "Avaliacao" (
    "ID" int   NOT NULL,
    "ID_Estudante" int   NOT NULL,
    "ID_Turma" int   NOT NULL,
    "Nota" float   NOT NULL,
    CONSTRAINT "pk_Avaliacao" PRIMARY KEY (
        "ID"
     )
);

CREATE TABLE IF NOT EXISTS "Denuncia" (
    "ID" int   NOT NULL,
    "ID_Estudante" int   NOT NULL,
    "ID_Avaliacao" int   NOT NULL,
    "Motivo" varchar(255)   NOT NULL,
    CONSTRAINT "pk_Denuncia" PRIMARY KEY (
        "ID"
     )
);

ALTER TABLE "Disciplina" ADD CONSTRAINT "fk_Disciplina_ID_Departamento" FOREIGN KEY("ID_Departamento")
REFERENCES "Departamento" ("ID");

ALTER TABLE "Turma" ADD CONSTRAINT "fk_Turma_ID_Disciplina" FOREIGN KEY("ID_Disciplina")
REFERENCES "Disciplina" ("ID");

ALTER TABLE "Turma" ADD CONSTRAINT "fk_Turma_ID_Professor" FOREIGN KEY("ID_Professor")
REFERENCES "Professor" ("ID");

ALTER TABLE "Avaliacao" ADD CONSTRAINT "fk_Avaliacao_ID_Estudante" FOREIGN KEY("ID_Estudante")
REFERENCES "Estudante" ("ID");

ALTER TABLE "Avaliacao" ADD CONSTRAINT "fk_Avaliacao_ID_Turma" FOREIGN KEY("ID_Turma")
REFERENCES "Turma" ("ID");

ALTER TABLE "Denuncia" ADD CONSTRAINT "fk_Denuncia_ID_Estudante" FOREIGN KEY("ID_Estudante")
REFERENCES "Estudante" ("ID");

ALTER TABLE "Denuncia" ADD CONSTRAINT "fk_Denuncia_ID_Avaliacao" FOREIGN KEY("ID_Avaliacao")
REFERENCES "Avaliacao" ("ID");


`;

const rollbackTables = `
    DROP TABLE IF EXISTS Estudante;
    DROP TABLE IF EXISTS Professor;
    DROP TABLE IF EXISTS Disciplina;
    DROP TABLE IF EXISTS Turma;
    DROP TABLE IF EXISTS Departamento;
    DROP TABLE IF EXISTS Avaliacao;
    DROP TABLE IF EXISTS Denuncia;
`;

export async function up(knex: Knex): Promise<void> {
  await knex.raw(createTables);
}

export async function down(knex: Knex): Promise<void> {
  await knex.raw(rollbackTables);
}
