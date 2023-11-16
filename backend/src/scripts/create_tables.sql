CREATE TABLE "departamento" (
    "id" int   NOT NULL,
    "nome" varchar(255)   NOT NULL,
    CONSTRAINT "pk_departamento" PRIMARY KEY (
        "id"
     ),
    CONSTRAINT "uc_departamento_nome" UNIQUE (
        "nome"
    )
);

CREATE TABLE "estudante" (
    "id" int   NOT NULL,
    "nome" varchar(255)   NOT NULL,
    "email" varchar(255)   NOT NULL,
    "curso" varchar(255)   NOT NULL,
    "admin" bool   NOT NULL,
    "senha" varchar(255)   NOT NULL,
    CONSTRAINT "pk_estudante" PRIMARY KEY (
        "id"
     )
);

CREATE TABLE "professor" (
    "id" int   NOT NULL,
    "nome" varchar(255)   NOT NULL,
    "id_departamento" int   NOT NULL,
    CONSTRAINT "pk_professor" PRIMARY KEY (
        "id"
     ),
    CONSTRAINT "uc_professor_nome" UNIQUE (
        "nome"
    )
);

CREATE TABLE "disciplina" (
    "id" int   NOT NULL,
    "nome" varchar(255)   NOT NULL,
    "id_departamento" int   NOT NULL,
    CONSTRAINT "pk_disciplina" PRIMARY KEY (
        "id"
     ),
    CONSTRAINT "uc_disciplina_nome" UNIQUE (
        "nome"
    )
);

CREATE TABLE "turma" (
    "id" int   NOT NULL,
    "id_disciplina" int   NOT NULL,
    "id_professor" int   NOT NULL,
    CONSTRAINT "pk_turma" PRIMARY KEY (
        "id"
     )
);

CREATE TABLE "avaliacao" (
    "id"  SERIAL  NOT NULL,
    "id_estudante" int   NOT NULL,
    "id_turma" int   NOT NULL,
    "comentario" string   NOT NULL,
    "nota" int   NOT NULL,
    CONSTRAINT "pk_avaliacao" PRIMARY KEY (
        "id"
     )
);

CREATE TABLE "denuncia" (
    "id"  SERIAL  NOT NULL,
    "id_estudante" int   NOT NULL,
    "id_avaliacao" int   NOT NULL,
    "motivo" varchar(255)   NOT NULL,
    CONSTRAINT "pk_denuncia" PRIMARY KEY (
        "id"
     )
);

ALTER TABLE "professor" ADD CONSTRAINT "fk_professor_id_departamento" FOREIGN KEY("id_departamento")
REFERENCES "disciplina" ("id");

ALTER TABLE "disciplina" ADD CONSTRAINT "fk_disciplina_id_departamento" FOREIGN KEY("id_departamento")
REFERENCES "departamento" ("id");

ALTER TABLE "turma" ADD CONSTRAINT "fk_turma_id_disciplina" FOREIGN KEY("id_disciplina")
REFERENCES "disciplina" ("id");

ALTER TABLE "turma" ADD CONSTRAINT "fk_turma_id_professor" FOREIGN KEY("id_professor")
REFERENCES "professor" ("id");

ALTER TABLE "avaliacao" ADD CONSTRAINT "fk_avaliacao_id_estudante" FOREIGN KEY("id_estudante")
REFERENCES "estudante" ("id");

ALTER TABLE "avaliacao" ADD CONSTRAINT "fk_avaliacao_id_turma" FOREIGN KEY("id_turma")
REFERENCES "turma" ("id");

ALTER TABLE "denuncia" ADD CONSTRAINT "fk_denuncia_id_estudante" FOREIGN KEY("id_estudante")
REFERENCES "estudante" ("id");

ALTER TABLE "denuncia" ADD CONSTRAINT "fk_denuncia_id_avaliacao" FOREIGN KEY("id_avaliacao")
REFERENCES "avaliacao" ("id");