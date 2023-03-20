- Fiz a API utilizando o Express.js com conexão ao banco de dados MySQL / MariaDB.

- Para realizar os testes, criar o banco de dados "sistema_escolar"
utilizando o arquivo .sql localizado em anexo nessa pasta e alterar
a variável "conexão" localizada no início da API com os dados da conexão local.

- Implementei o soft delete, criando uma coluna "removida" na tabela "pessoas" e,
quando é realizada uma chamada à rota DELETE, ao invés dos alunos / professores 
serem excluídos do banco de dados, a chave booleana vira para "true" e eles
não aparecerão em futuras pesquisas nas rotas GET.

- Utilizei o Axios.js para fazer os testes e deixei salvas as requisições para 
facilitar testes futuros. Também utilizei o Supervisor para manter a API em execução.



## GUIA DE REFERÊNCIA PARA A API:



### POST  /cadastrar/turmas
Exemplo de req.data a enviar:
[
	{
		serie: 2,
		sala: "A",
		nome_da_turma: "2A",
		curso: "Ensino Médio"
	}
]



### POST  /cadastrar/disciplinas
Exemplo de req.data a enviar:
[
	{
		nome_da_disciplina: "História"
	},
	{
		nome_da_disciplina: "Inglês"
	},
]



### POST /cadastrar/pessoas
Exemplo de req.data a enviar:
[
	{
		nome: "Lucas", 
		sobrenome: "Souza Santos", 
		sexo: "M", 
		data_de_nascimento: "2001-06-01", 
		codigo: 20230003, 
		email: "lucas.santos@exemplo.com"
	},
	{
		nome: "Fábio",
		sobrenome: "Silva",
		sexo: "M",
		data_de_nascimento: "1981-08-08",
		codigo: 2000789,
		email: "fabio.silva@exemplo.com"
	}
]



### POST  /cadastrar/alunos
Exemplo de req.data a enviar:
[
	{
		codigo: 20230003,
		nome_da_turma: "2A"
	},
	{
		codigo: 20230004,
		nome_da_turma: null
	},
	{
		codigo: 20230005
	}
]



### POST  /atrelar/alunos
Exemplo de req.data a enviar:
[
	{
		codigo: 20230003,
		nome_da_turma: "2A"
	}
]



### POST  /cadastrar/professores
Exemplo de req.data a enviar:
[
	{
		codigo: 2000789,
	}
]



### POST  /atrelar/disciplinas-e-professores
Exemplo de req.data a enviar:
[
	{
		nome_da_disciplina: "História",
		codigo: 2000789
	}
]



### POST  /atrelar/disciplinas-e-turmas-e-professores
Exemplo de req.data a enviar:
[
	{
		nome_da_turma: "1A",
		nome_da_disciplina: "História",
		codigo: 2000789
	}
]



### GET  /professores/:codigo?
Exemplo de req.data a enviar:
[
	{}
]
ou
[
	{
		codigo: 2000789
	}
]



### GET  /alunos/:codigo?
Exemplo de req.data a enviar:
[
	{}
]
ou
[
	{
		codigo: 20230003
	}
]




### GET  /disciplinas-e-turmas-e-professores/:nome_da_turma?
Exemplo de req.data a enviar:
[
	{}
]
ou
[
	{
		nome_da_turma: "1A"
	}
]



### GET  /disciplinas/:nome_da_disciplina?
Exemplo de req.data a enviar:
[
	{}
]
ou
[
	{
		nome_da_disciplina: "História"
	}
]



### DELETE  /remover-individuos
Exemplo de req.data a enviar:
[
	{
		codigo: 20230003
	},
	{
		codigo: 2000789
	}
]
