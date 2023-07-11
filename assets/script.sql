-- Exported from QuickDBD: https://www.quickdatabasediagrams.com/
-- Link to schema: https://app.quickdatabasediagrams.com/#/d/Z2zmsO
-- NOTE! If you have used non-SQL datatypes in your design, you will have to change these here.


CREATE TABLE "Estudante" (
    "Matricula" int   NOT NULL,
    "Nome" varchar   NOT NULL,
    "Email" varchar   NOT NULL,
    "Curso" varchar   NOT NULL,
    "Senha" varchar   NOT NULL,
    CONSTRAINT "pk_Estudante" PRIMARY KEY (
        "Matricula"
     )
);

CREATE TABLE "Professor" (
    "Matricula" int   NOT NULL,
    "Nome" varchar   NOT NULL,
    "Departamento" varchar   NOT NULL,
    CONSTRAINT "pk_Professor" PRIMARY KEY (
        "Matricula"
     ),
    CONSTRAINT "uc_Professor_Nome" UNIQUE (
        "Nome"
    )
);

CREATE TABLE "Disciplina" (
    "ID" int   NOT NULL,
    "Nome" varchar   NOT NULL,
    "ID_Departamento" int   NOT NULL,
    CONSTRAINT "pk_Disciplina" PRIMARY KEY (
        "ID"
     ),
    CONSTRAINT "uc_Disciplina_Nome" UNIQUE (
        "Nome"
    )
);

CREATE TABLE "Turma" (
    "ID" int   NOT NULL,
    "ID_Disciplina" int   NOT NULL,
    "Matricula_Professor" int   NOT NULL,
    CONSTRAINT "pk_Turma" PRIMARY KEY (
        "ID"
     )
);

CREATE TABLE "Departamento" (
    "ID" int   NOT NULL,
    "Nome" string   NOT NULL,
    CONSTRAINT "pk_Departamento" PRIMARY KEY (
        "ID"
     ),
    CONSTRAINT "uc_Departamento_Nome" UNIQUE (
        "Nome"
    )
);

CREATE TABLE "Avaliacao" (
    "ID" int   NOT NULL,
    "Matricula_Estudante" int   NOT NULL,
    "ID_Turma" int   NOT NULL,
    "Nota" float   NOT NULL,
    CONSTRAINT "pk_Avaliacao" PRIMARY KEY (
        "ID"
     )
);

CREATE TABLE "Denuncia" (
    "ID" int   NOT NULL,
    "Matricula_Estudante" int   NOT NULL,
    "ID_Avaliacao" int   NOT NULL,
    "Motivo" varchar   NOT NULL,
    CONSTRAINT "pk_Denuncia" PRIMARY KEY (
        "ID"
     )
);

ALTER TABLE "Disciplina" ADD CONSTRAINT "fk_Disciplina_ID_Departamento" FOREIGN KEY("ID_Departamento")
REFERENCES "Departamento" ("ID");

ALTER TABLE "Turma" ADD CONSTRAINT "fk_Turma_ID_Disciplina" FOREIGN KEY("ID_Disciplina")
REFERENCES "Disciplina" ("ID");

ALTER TABLE "Turma" ADD CONSTRAINT "fk_Turma_Matricula_Professor" FOREIGN KEY("Matricula_Professor")
REFERENCES "Professor" ("Matricula");

ALTER TABLE "Avaliacao" ADD CONSTRAINT "fk_Avaliacao_Matricula_Estudante" FOREIGN KEY("Matricula_Estudante")
REFERENCES "Estudante" ("Matricula");

ALTER TABLE "Avaliacao" ADD CONSTRAINT "fk_Avaliacao_ID_Turma" FOREIGN KEY("ID_Turma")
REFERENCES "Turma" ("ID");

ALTER TABLE "Denuncia" ADD CONSTRAINT "fk_Denuncia_Matricula_Estudante" FOREIGN KEY("Matricula_Estudante")
REFERENCES "Estudante" ("Matricula");

ALTER TABLE "Denuncia" ADD CONSTRAINT "fk_Denuncia_ID_Avaliacao" FOREIGN KEY("ID_Avaliacao")
REFERENCES "Avaliacao" ("ID");

