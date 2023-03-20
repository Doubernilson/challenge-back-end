// Script para realizar algumas chamadas à API
const axios = require('axios').default;

//POST  /cadastrar/turmas
axios({
	method: 'post',
	url: "http://localhost:3000/cadastrar/turmas",
	data: [
		{
			serie: 2,
			sala: "A",
			nome_da_turma: "2A",
			curso: "Ensino Médio"
		}
	]
})
	.then((res) => {
		console.log(res);
	})

//POST  /cadastrar/disciplinas
axios({
	method: 'post',
	url: "http://localhost:3000/cadastrar/disciplinas",
	data: [
		{
			nome_da_disciplina: "História"
		},
		{
			nome_da_disciplina: "Inglês"
		},
	]
})
	.then((res) => {
		console.log(res);
	})

//POST /cadastrar/pessoas
axios({
	method: 'post',
	url: "http://localhost:3000/cadastrar/pessoas",
	data: [
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
})
	.then((res) => {
		console.log(res);
	})

//POST  /cadastrar/alunos
axios({
	method: 'post',
	url: "http://localhost:3000/cadastrar/alunos",
	data: [
		{
			codigo: 20230003,
			nome_da_turma: "2A"
		},
		// {
		// 	codigo: 20230004,
		// 	nome_da_turma: null
		// },
		// {
		// 	codigo: 20230005
		// }
	]
})
	.then((res) => {
		console.log(res);
	})

//POST  /atrelar/alunos
axios({
	method: 'post',
	url: "http://localhost:3000/atrelar/alunos",
	data: [
		{
			codigo: 20230003,
			nome_da_turma: "2A"
		}
	]
})
	.then((res) => {
		console.log(res);
	})

//POST  /cadastrar/professores
axios({
	method: 'post',
	url: "http://localhost:3000/cadastrar/professores",
	data: [
		{
			codigo: 2000789,
		}
	]
})
	.then((res) => {
		console.log(res);
	})

//POST  /atrelar/disciplinas-e-professores
axios({
	method: 'post',
	url: "http://localhost:3000/atrelar/disciplinas-e-professores",
	data: [
		{
			nome_da_disciplina: "História",
			codigo: 2000789
		}
	]
})
	.then((res) => {
		console.log(res);
	})

//POST  /atrelar/disciplinas-e-turmas-e-professores
axios({
	method: 'post',
	url: "http://localhost:3000/atrelar/disciplinas-e-turmas-e-professores",
	data: [
		{
			nome_da_turma: "2A",
			nome_da_disciplina: "História",
			codigo: 2000789
		}
	]
})
	.then((res) => {
		console.log(res);
	})

//GET  /professores/:codigo?
axios({
	method: 'get',
	url: "http://localhost:3000/professores",
	data: [
		{
			codigo: 2000789
		}
	]
})
	.then((res) => {
		console.log(res);
	})

//GET  /alunos/:codigo?
axios({
	method: 'get',
	url: "http://localhost:3000/alunos",
	data: [
		{
			codigo: 20230003
		}
	]
})
	.then((res) => {
		console.log(res);
	})

//GET  /disciplinas-e-turmas-e-professores/:nome_da_turma?
axios({
	method: 'get',
	url: "http://localhost:3000/disciplinas-e-turmas-e-professores",
	data: [
		{
			nome_da_turma: "2A"
		}
	]
})
	.then((res) => {
		console.log(res);
	})

//GET  /disciplinas/:nome_da_disciplina?
axios({
	method: 'get',
	url: "http://localhost:3000/disciplinas",
	data: [
		{
			nome_da_disciplina: "História"
		}
	]
})
	.then((res) => {
		console.log(res);
	})

//DELETE  /remover-individuos
axios({
	method: 'delete',
	url: "http://localhost:3000/remover-individuos",
	data: [
		{
			codigo: 20230003
		},
		{
			codigo: 2000789
		}
	]
})
	.then((res) => {
		console.log(res);
	})
