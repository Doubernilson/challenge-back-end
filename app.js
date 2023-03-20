const express = require('express');
const mysql = require('mysql');

// Configuração da API
const app = express();
app.use(express.json()); // A API receberá os dados em JSON
const porta = 3000;

// Conexão com o Banco de Dados
// Alterar para a conexão local, contanto que a database usada aqui (sistema_escolar) seja criada lá
const conexao = {
	host: 'localhost',
	user: 'root',
	password: '',
	database: 'sistema_escolar'
}

const db = mysql.createConnection(conexao);
db.connect();

// Cadastrar turmas -> Podem ser cadastradas mais de uma por vez
app.post('/cadastrar/turmas', (req, res) => {
	req.body.forEach((obj) => {
		db.query(`
	INSERT INTO turmas(serie, sala, nome_da_turma, curso)
	VALUES ("${obj.serie}", "${obj.sala}", "${obj.nome_da_turma}", "${obj.curso}")
	`, (err, result) => {
			if (err) throw err;
			console.log(result);
		})
	})
	res.send("Turma(s) adicionada(s)!");
});

// Cadastrar disciplinas -> Podem ser cadastradas mais de uma por vez
app.post('/cadastrar/disciplinas', (req, res) => {
	req.body.forEach((obj) => {
		db.query(`
	INSERT INTO disciplinas(nome_da_disciplina)
	VALUES ("${obj.nome_da_disciplina}")
	`, (err, result) => {
			if (err) throw err;
			console.log(result);
		})
	})
	res.send('Disciplina(s) Adicionada(s)!');
});

// Cadastrar pessoas -> Podem ser adicionadas mais de uma por vez
// Para que alunos e professores sejam cadastrados, precisam primeiro ser cadastrados na tabela "pessoas"
app.post('/cadastrar/pessoas', (req, res) => {
	req.body.forEach((obj) => {
		db.query(`
	INSERT INTO pessoas(nome, sobrenome, sexo, data_de_nascimento, codigo, email)
	VALUES ("${obj.nome}", "${obj.sobrenome}", "${obj.sexo}", "${obj.data_de_nascimento}", "${obj.codigo}", "${obj.email}")
	`, (err, result) => {
			if (err) throw err;
			console.log(result);
		})
	})
	res.send('Pessoa(s) Adicionada(s)!');
});

// Cadastrar alunos -> Podem ser cadastrados mais de um por vez
// Se a turma já foi definida, cadastra o aluno atrelado à turma, senão, só adiciona o aluno à db
// Para que alunos e professores sejam cadastrados, precisam primeiro ser cadastrados na tabela "pessoas"
app.post('/cadastrar/alunos', (req, res) => {
	req.body.forEach((obj) => {
		if (!obj.nome_da_turma) {
			db.query(`
	INSERT INTO alunos(codigo)
	VALUES ("${obj.codigo}")
	`, (err, result) => {
				if (err) throw err;
				console.log(result);
			})
		}
		else {
			db.query(`
	INSERT INTO alunos(codigo, nome_da_turma)
	VALUES ("${obj.codigo}", "${obj.nome_da_turma}")
	`, (err, result) => {
				if (err) throw err;
				console.log(result);
			})
		}
	})
	res.send('Aluno(s) Adicionado(s)!');
});

// Atrelar alunos às turmas (pelo código) -> Podem ser atrelados mais de um por vez
app.post('/atrelar/alunos', (req, res) => {
	req.body.forEach((obj) => {
		db.query(`
		UPDATE alunos
		SET nome_da_turma = "${obj.nome_da_turma}"
		WHERE codigo = "${obj.codigo}"
		`, (err, result) => {
			if (err) throw err;
			console.log(result);
		})
	})
	res.send('Aluno(s) Adicionado(s) à(s) Turma(s)!');
});

// Cadastrar professores -> Podem ser cadastrados mais de um por vez
// Para que alunos e professores sejam cadastrados, precisam primeiro ser cadastrados na tabela "pessoas"
app.post('/cadastrar/professores', (req, res) => {
	req.body.forEach((obj) => {
		db.query(`
	INSERT INTO professores(codigo)
	VALUES ("${obj.codigo}")
	`, (err, result) => {
			if (err) throw err;
			console.log(result);
		})
	})
	res.send('Professor(es) Adicionado(s)!');
});

// Atrelar professores às disciplinas que eles vão lecionar
app.post('/atrelar/disciplinas-e-professores', (req, res) => {
	req.body.forEach((obj) => {
		db.query(`
	INSERT INTO disciplinas_e_professores(nome_da_disciplina, codigo)
	VALUES ("${obj.nome_da_disciplina}", "${obj.codigo}")
	`, (err, result) => {
			if (err) throw err;
			console.log(result);
		})
	})
	res.send('Professor(es) Atrelado(s) à(s) Respectiva(s) Disciplina(s)!');
});

// Atrelar professores às turmas que eles vão lecionar (e qual disciplina vão lecionar naquela turma)
app.post('/atrelar/disciplinas-e-turmas-e-professores', (req, res) => {
	req.body.forEach((obj) => {
		db.query(`
	INSERT INTO turmas_e_disciplinas(nome_da_turma, nome_da_disciplina, codigo)
	VALUES ("${obj.nome_da_turma}", "${obj.nome_da_disciplina}", "${obj.codigo}")
	`, (err, result) => {
			if (err) throw err;
			console.log(result);
		})
	})
	res.send('Professor(es) Atrelado(s) à(s) Respectiva(s) Turma(s)!');
});

// Consultar professores e disciplinas que eles lecionam (pelo código)
// Retorna apenas os professores ativos
// Caso o código não seja especificado, serão retornados todos os professores e disciplinas
app.get('/professores/:codigo?', (req, res) => {
	req.body.forEach((obj) => {
		if (!obj.codigo) {
			db.query(`
	SELECT professores.codigo, pessoas.nome, pessoas.sobrenome, pessoas.email, disciplinas_e_professores.nome_da_disciplina
	FROM ((disciplinas_e_professores
	INNER JOIN professores
	ON disciplinas_e_professores.codigo = professores.codigo)
	INNER JOIN pessoas
	ON professores.codigo = pessoas.codigo
	AND pessoas.removida = false
	)
	`, (erro, resultado) => {
				if (erro) throw erro;
				res.json(resultado);
				console.log(obj);
			});
		}
		else {
			db.query(`
	SELECT professores.codigo, pessoas.nome, pessoas.sobrenome, pessoas.email, disciplinas_e_professores.nome_da_disciplina
	FROM ((disciplinas_e_professores
	INNER JOIN professores
	ON disciplinas_e_professores.codigo = professores.codigo)
	INNER JOIN pessoas
	ON professores.codigo = pessoas.codigo
	AND professores.codigo = ${obj.codigo}
	AND pessoas.removida = false
	)
	`, (erro, resultado) => {
				if (erro) throw erro;
				res.json(resultado);
				console.log(obj);
			});
		}
	})

});

// Buscar alunos e suas turmas
// Caso não sejam especificados os alunos, retornará todos os alunos
// FILTRAR OS QUE NÃO FORAM REMOVIDOS
app.get('/alunos/:codigo?', (req, res) => {
	req.body.forEach((obj) => {
		if (!obj.codigo) {
			db.query(`
	SELECT alunos.codigo, pessoas.nome, pessoas.sobrenome, pessoas.email, alunos.nome_da_turma
	FROM (alunos
	INNER JOIN pessoas
	ON alunos.codigo = pessoas.codigo
	AND pessoas.removida = false
	)
	`, (erro, resultado) => {
				if (erro) throw erro;
				res.json(resultado);
				console.log(obj);
			});
		}
		else {
			db.query(`
		SELECT alunos.codigo, pessoas.nome, pessoas.sobrenome, pessoas.email, alunos.nome_da_turma
		FROM (alunos
		INNER JOIN pessoas
		ON alunos.codigo = pessoas.codigo
		AND alunos.codigo = ${obj.codigo}
		AND pessoas.removida = false
		)
		`, (erro, resultado) => {
				if (erro) throw erro;
				res.json(resultado);
				console.log(obj);
			});
		}
	})

});

// Buscar as disciplinas de uma turma (e o professor que administra naquela turma)
app.get('/disciplinas-e-turmas-e-professores/:nome_da_turma?', (req, res) => {
	req.body.forEach((obj) => {
		if (!obj.nome_da_turma) {
			db.query(`
		SELECT turmas_e_disciplinas.nome_da_turma, turmas_e_disciplinas.nome_da_disciplina, turmas_e_disciplinas.codigo, pessoas.codigo, pessoas.nome, pessoas.sobrenome, pessoas.email
		FROM (turmas_e_disciplinas
		INNER JOIN pessoas
		ON turmas_e_disciplinas.codigo = pessoas.codigo
		AND pessoas.removida = false
		)
		`, (erro, resultado) => {
				if (erro) throw erro;
				res.json(resultado);
				console.log(obj);
			});
		}
		else {
			db.query(`
		SELECT turmas_e_disciplinas.nome_da_turma, turmas_e_disciplinas.nome_da_disciplina, turmas_e_disciplinas.codigo, pessoas.codigo, pessoas.nome, pessoas.sobrenome, pessoas.email
		FROM (turmas_e_disciplinas
		INNER JOIN pessoas
		ON turmas_e_disciplinas.codigo = pessoas.codigo
		AND turmas_e_disciplinas.nome_da_turma = "${obj.nome_da_turma}"
		AND pessoas.removida = false
		)
		`, (erro, resultado) => {
				if (erro) throw erro;
				res.json(resultado);
				console.log(obj);
			});
		}
	})
});

// Buscar os professores de cada disciplina.
// Caso não sejam especificadas as disciplinas, retornará todas
app.get('/disciplinas/:nome_da_disciplina?', (req, res) => {
	req.body.forEach((obj) => {
		if (!obj.nome_da_disciplina) {
			db.query(`
		SELECT disciplinas_e_professores.nome_da_disciplina, disciplinas_e_professores.codigo, pessoas.codigo, pessoas.nome, pessoas.sobrenome, pessoas.email
		FROM (disciplinas_e_professores
		INNER JOIN pessoas
		ON disciplinas_e_professores.codigo = pessoas.codigo
		AND pessoas.removida = false
		)
		`, (erro, resultado) => {
				if (erro) throw erro;
				res.json(resultado);
				console.log(obj);
			});
		}
		else {
			db.query(`
			SELECT disciplinas_e_professores.nome_da_disciplina, disciplinas_e_professores.codigo, pessoas.codigo, pessoas.nome, pessoas.sobrenome, pessoas.email
			FROM (disciplinas_e_professores
			INNER JOIN pessoas
			ON disciplinas_e_professores.codigo = pessoas.codigo
			AND disciplinas_e_professores.nome_da_disciplina = "${obj.nome_da_disciplina}"
			AND pessoas.removida = false
			)
		`, (erro, resultado) => {
				if (erro) throw erro;
				res.json(resultado);
				console.log(obj);
			});
		}
	})
});

// Remover alunos e professores (pelo código) - Usa soft delete! (muda o atributo booleano "removida" das pessoas para "true")
app.delete('/remover-individuos', (req, res) => {
	req.body.forEach((obj) => {
		db.query(`
	UPDATE pessoas
	SET removida = true
	WHERE codigo = "${obj.codigo}"
	`, (err, result) => {
			if (err) throw err;
			console.log(result);

		})
	})
	res.send('Indivíduo(s) Removido(s)!');
});

// Iniciando a API
app.listen(porta, () => {
	console.log(`API iniciada na porta ${porta}`);
})
