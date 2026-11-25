CREATE TABLE tipo_conta (
	tipo_conta_id SERIAL PRIMARY KEY,
	nome VARCHAR(100) NOT NULL
);

CREATE TABLE tipo_organizacao (
	tipo_organizacao_id SERIAL PRIMARY KEY,
	nome VARCHAR(50) NOT NULL UNIQUE
);

CREATE TABLE conta (
	conta_id SERIAL PRIMARY KEY,
	tipo_conta_id INT NOT NULL REFERENCES tipo_conta(tipo_conta_id),
	email VARCHAR(255) NOT NULL UNIQUE,
	senha VARCHAR(255) NOT NULL,
	criado_em TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE usuario (
	user_id SERIAL PRIMARY KEY,
	conta_id INT NOT NULL UNIQUE REFERENCES conta(conta_id),
	nome VARCHAR(100) NOT NULL
);

CREATE TABLE organizacao (
	organizacao_id SERIAL PRIMARY KEY,
	conta_id INT NOT NULL UNIQUE REFERENCES conta(conta_id),
	tipo_organizacao_id INT NOT NULL UNIQUE REFERENCES tipo_organizacao(tipo_organizacao_id),
	nome VARCHAR(100) NOT NULL,
	cnpj VARCHAR(20) NOT NULL UNIQUE,
	telefone VARCHAR(20) NOT NULL,
	email_contato VARCHAR(255),
	endereco VARCHAR(255) NOT NULL,
	latitude DECIMAL(9,6) NOT NULL,
	longitude DECIMAL(9,6) NOT NULL,
	desc_servicos TEXT NOT NULL,
	ativo BOOLEAN NOT NULL DEFAULT true
);

CREATE TABLE contato_emergencia (
	contato_id SERIAL PRIMARY KEY,
	user_idd INT NOT NULL REFERENCES conta(conta_id),
	nome VARCHAR(100) NOT NULL,
	telefone VARCHAR(20) NOT NULL,
	relacao VARCHAR(100),
	prioridade INT,
	ativo BOOLEAN NOT NULL DEFAULT true
);

/*-------- seção INSERTS --------*/

INSERT INTO tipo_conta (nome) VALUES ('Usuário');
INSERT INTO tipo_conta (nome) VALUES ('Organização');
