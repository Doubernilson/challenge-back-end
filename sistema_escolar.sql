-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Tempo de geração: 19-Mar-2023 às 21:56
-- Versão do servidor: 10.4.24-MariaDB
-- versão do PHP: 8.1.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `sistema_escolar`
--

-- --------------------------------------------------------

--
-- Estrutura da tabela `alunos`
--

CREATE TABLE `alunos` (
  `codigo` int(11) NOT NULL,
  `nome_da_turma` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Extraindo dados da tabela `alunos`
--

INSERT INTO `alunos` (`codigo`, `nome_da_turma`) VALUES
(20230001, '1A'),
(20230002, '6C');

-- --------------------------------------------------------

--
-- Estrutura da tabela `disciplinas`
--

CREATE TABLE `disciplinas` (
  `id` int(11) NOT NULL,
  `nome_da_disciplina` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Extraindo dados da tabela `disciplinas`
--

INSERT INTO `disciplinas` (`id`, `nome_da_disciplina`) VALUES
(3, 'Geografia'),
(4, 'História'),
(6, 'História'),
(5, 'Inglês'),
(7, 'Inglês'),
(1, 'Matemática'),
(2, 'Português');

-- --------------------------------------------------------

--
-- Estrutura da tabela `disciplinas_e_professores`
--

CREATE TABLE `disciplinas_e_professores` (
  `id` int(11) NOT NULL,
  `nome_da_disciplina` varchar(255) NOT NULL,
  `codigo` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Extraindo dados da tabela `disciplinas_e_professores`
--

INSERT INTO `disciplinas_e_professores` (`id`, `nome_da_disciplina`, `codigo`) VALUES
(1, 'Matemática', 2000123),
(2, 'Português', 2000123),
(3, 'Geografia', 2000456);

-- --------------------------------------------------------

--
-- Estrutura da tabela `pessoas`
--

CREATE TABLE `pessoas` (
  `id` int(11) NOT NULL,
  `nome` varchar(255) DEFAULT NULL,
  `sobrenome` varchar(255) DEFAULT NULL,
  `sexo` char(1) DEFAULT NULL,
  `data_de_nascimento` date DEFAULT NULL,
  `codigo` int(11) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `removida` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Extraindo dados da tabela `pessoas`
--

INSERT INTO `pessoas` (`id`, `nome`, `sobrenome`, `sexo`, `data_de_nascimento`, `codigo`, `email`, `removida`) VALUES
(1, 'João', 'Souza', 'M', '2001-01-01', 20230001, 'joao.souza@exemplo.com', 0),
(2, 'Sérgio', 'Santos', 'M', '1980-03-04', 2000123, 'sergio.santos@exemplo.com', 0),
(3, 'Carlos', 'Pereira', 'M', '1965-09-09', 2000456, 'carlos.pereira@exemplo.com', 0),
(4, 'Ana', 'Carolina', 'F', '2004-06-02', 20230002, 'ana.carolina@exemplo.com', 0);

-- --------------------------------------------------------

--
-- Estrutura da tabela `professores`
--

CREATE TABLE `professores` (
  `codigo` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Extraindo dados da tabela `professores`
--

INSERT INTO `professores` (`codigo`) VALUES
(2000123),
(2000456);

-- --------------------------------------------------------

--
-- Estrutura da tabela `turmas`
--

CREATE TABLE `turmas` (
  `id` int(11) NOT NULL,
  `serie` int(11) DEFAULT NULL,
  `sala` varchar(255) DEFAULT NULL,
  `nome_da_turma` varchar(255) DEFAULT NULL,
  `curso` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Extraindo dados da tabela `turmas`
--

INSERT INTO `turmas` (`id`, `serie`, `sala`, `nome_da_turma`, `curso`) VALUES
(1, 1, 'A', '1A', 'Ensino Médio'),
(2, 1, 'B', '1B', 'Ensino Médio'),
(34, 6, 'B', '6B', 'Ensino Fundamental'),
(35, 6, 'C', '6C', 'Ensino Fundamental'),
(36, 6, 'D', '6D', 'Ensino Fundamental'),
(37, 2, 'A', '2A', 'Ensino Médio'),
(38, 2, 'A', '2A', 'Ensino Médio');

-- --------------------------------------------------------

--
-- Estrutura da tabela `turmas_e_disciplinas`
--

CREATE TABLE `turmas_e_disciplinas` (
  `id` int(11) NOT NULL,
  `nome_da_turma` varchar(255) NOT NULL,
  `nome_da_disciplina` varchar(255) NOT NULL,
  `codigo` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Extraindo dados da tabela `turmas_e_disciplinas`
--

INSERT INTO `turmas_e_disciplinas` (`id`, `nome_da_turma`, `nome_da_disciplina`, `codigo`) VALUES
(1, '1A', 'Matemática', 2000123),
(2, '6C', 'Geografia', 2000456);

--
-- Índices para tabelas despejadas
--

--
-- Índices para tabela `alunos`
--
ALTER TABLE `alunos`
  ADD PRIMARY KEY (`codigo`),
  ADD KEY `nome_da_turma` (`nome_da_turma`);

--
-- Índices para tabela `disciplinas`
--
ALTER TABLE `disciplinas`
  ADD PRIMARY KEY (`id`),
  ADD KEY `nome_da_disciplina` (`nome_da_disciplina`);

--
-- Índices para tabela `disciplinas_e_professores`
--
ALTER TABLE `disciplinas_e_professores`
  ADD PRIMARY KEY (`id`),
  ADD KEY `nome_da_disciplina` (`nome_da_disciplina`),
  ADD KEY `codigo` (`codigo`);

--
-- Índices para tabela `pessoas`
--
ALTER TABLE `pessoas`
  ADD PRIMARY KEY (`id`),
  ADD KEY `codigo` (`codigo`);

--
-- Índices para tabela `professores`
--
ALTER TABLE `professores`
  ADD PRIMARY KEY (`codigo`);

--
-- Índices para tabela `turmas`
--
ALTER TABLE `turmas`
  ADD PRIMARY KEY (`id`),
  ADD KEY `nome_da_turma` (`nome_da_turma`);

--
-- Índices para tabela `turmas_e_disciplinas`
--
ALTER TABLE `turmas_e_disciplinas`
  ADD PRIMARY KEY (`id`),
  ADD KEY `nome_da_turma` (`nome_da_turma`),
  ADD KEY `nome_da_disciplina` (`nome_da_disciplina`),
  ADD KEY `codigo` (`codigo`);

--
-- AUTO_INCREMENT de tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `disciplinas`
--
ALTER TABLE `disciplinas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de tabela `disciplinas_e_professores`
--
ALTER TABLE `disciplinas_e_professores`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de tabela `pessoas`
--
ALTER TABLE `pessoas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT de tabela `turmas`
--
ALTER TABLE `turmas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=39;

--
-- AUTO_INCREMENT de tabela `turmas_e_disciplinas`
--
ALTER TABLE `turmas_e_disciplinas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Restrições para despejos de tabelas
--

--
-- Limitadores para a tabela `alunos`
--
ALTER TABLE `alunos`
  ADD CONSTRAINT `alunos_ibfk_1` FOREIGN KEY (`codigo`) REFERENCES `pessoas` (`codigo`),
  ADD CONSTRAINT `alunos_ibfk_2` FOREIGN KEY (`nome_da_turma`) REFERENCES `turmas` (`nome_da_turma`);

--
-- Limitadores para a tabela `disciplinas_e_professores`
--
ALTER TABLE `disciplinas_e_professores`
  ADD CONSTRAINT `disciplinas_e_professores_ibfk_1` FOREIGN KEY (`nome_da_disciplina`) REFERENCES `disciplinas` (`nome_da_disciplina`),
  ADD CONSTRAINT `disciplinas_e_professores_ibfk_2` FOREIGN KEY (`codigo`) REFERENCES `professores` (`codigo`);

--
-- Limitadores para a tabela `professores`
--
ALTER TABLE `professores`
  ADD CONSTRAINT `professores_ibfk_1` FOREIGN KEY (`codigo`) REFERENCES `pessoas` (`codigo`);

--
-- Limitadores para a tabela `turmas_e_disciplinas`
--
ALTER TABLE `turmas_e_disciplinas`
  ADD CONSTRAINT `turmas_e_disciplinas_ibfk_1` FOREIGN KEY (`nome_da_turma`) REFERENCES `turmas` (`nome_da_turma`),
  ADD CONSTRAINT `turmas_e_disciplinas_ibfk_2` FOREIGN KEY (`nome_da_disciplina`) REFERENCES `disciplinas_e_professores` (`nome_da_disciplina`),
  ADD CONSTRAINT `turmas_e_disciplinas_ibfk_3` FOREIGN KEY (`codigo`) REFERENCES `disciplinas_e_professores` (`codigo`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
