-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 11-05-2026 a las 22:08:32
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `agenda_salud`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--

CREATE TABLE `usuario` (
  `id_usuario` int(11) NOT NULL,
  `tipo_usuario` enum('admin','paciente','medico') NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `apellido` varchar(50) NOT NULL,
  `documento` varchar(20) NOT NULL,
  `correo` varchar(100) NOT NULL,
  `password` varchar(20) NOT NULL,
  `tipo_documento` enum('cedula_de_ciudadania','tarjeta_identidad','pasaporte','cedula_extranjeria','registro_civil') DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuario`
--

INSERT INTO `usuario` (`id_usuario`, `tipo_usuario`, `nombre`, `apellido`, `documento`, `correo`, `password`, `tipo_documento`) VALUES
(1, 'medico', 'Juan Jose', 'Gomez', '12345678', 'juan@correo.com', 'perico123', ''),
(2, 'paciente', 'Jhonn Armando ', 'Caceres Rojas', '79865123', 'caceresrojasj@gmail.com', 'perico2', ''),
(3, 'paciente', 'Nataly Maria', 'Álvarez Nuñez', '52312654', 'natalyalvarezn@gmail.com', 'cacatua1', ''),
(4, 'paciente', 'Steven Alberto', 'Zapata Carvajal', '79898877', 'zapatacarvajals@gmail.com', 'prerico3', ''),
(5, 'paciente', 'Carmen Rosa', 'Petro Wilches', '51465321', 'petropresidentec@gmail.com', 'cacatua2', ''),
(6, 'paciente', 'Julio Manuel', 'Villamil Sotelo', '79032145', 'villamiljuliom@gmail.com', 'jaguar1', ''),
(7, 'paciente', 'Samuel Maria', 'Moreno Rojas', '1024654987', 'smariar@gmail.com', 'jaguar2', ''),
(8, 'paciente', 'Daniel Felipe', 'Caca Mora', '1024012365', 'cocamorad@gmail.com', 'perico4', ''),
(9, 'paciente', 'Esteban Andres', 'Sanchez Ariel', '1024987789', 'sanchezaa@gmail.com', 'jaguar3', ''),
(10, 'paciente', 'Andrea Viviana', 'Bolaños Lopez', '52987456', 'bolañoslopeza@gmail.com', 'cacatua3', ''),
(11, 'paciente', 'Jenny Lorena', 'Smith lopez', '52303001', 'jennysmithl@gmail.com', 'cacatua4', ''),
(12, 'paciente', 'Maria Daniela', 'Gonzáles Gonzales ', '52909818', 'gonzalesmariag@gmail.com', 'cacatua4', ''),
(13, 'medico', 'Juan de Jesus', 'Perez Almanza', '79335226', 'almanzaperezj@gmail.com', 'elefante1', ''),
(14, 'medico', 'Camilo Andres', 'Rubiano Garces', '79101515', 'rubianocamiloa@gmail.com', 'elefante2', ''),
(15, 'medico', 'Maria Alejandra ', 'Bohorquez Pineda', '1001332211', 'bohorquezpinedam@gmail.com', 'aguila1J', ''),
(16, 'medico', 'Judy Marcela ', 'Angarita Perez', '52003501', 'angaritaperezj@gmail.com', 'piraña1', ''),
(17, 'medico', 'Estefany Malacara', 'Ramos Perez', '1001908087', 'ramospreze@gmail.com', 'granero10', ''),
(18, 'medico', 'j Steven Malacara', 'Garzon Morales', '1024687788', 'garzonmoralezjs@gmail.com', 'gatico1', ''),
(19, 'medico', 'Daylyn Marleny', 'Rojas Huertas', '52998801', 'rojasmarlenyd@gmail.com', 'girafa1', ''),
(71, 'paciente', 'Candy', 'Maruja', '3002136548', 'pepitas1000', 'ladrar', ''),
(72, 'paciente', 'Gatita Linda', 'Gata', '3110000111', 'croquetas100%', 'galletas', ''),
(73, 'paciente', 'Steven', 'Gamez', '3205563214', 'malhumor2233', 'rabietas', ''),
(74, 'paciente', 'henry', 'villamil', '3124671542', 'henryvillamil331@gmail.com', '3332121', ''),
(77, 'paciente', 'pepito', 'perez', '3002136549', 'diente321', '2135', ''),
(78, 'paciente', 'juanito', 'Casa', '3002223311', 'pintopuertas123', 'brochagorda', ''),
(79, 'paciente', 'Jaimito Azulito', 'Collazos', '1001236548', 'prueba01de01', 'sena', ''),
(85, 'paciente', 'maria', 'reyes', '84861894651', 'alejita@gmail.com', 'Aa123456*', ''),
(88, 'paciente', 'maria', 'reye', '8486184651', 'alejier@gmail.com', 'Aa123456*', ''),
(90, 'paciente', 'maria', 'fewaf', '11324588', 'alejta@gmail.com', 'Aa123456*', ''),
(93, 'paciente', 'rwafewqfwea', 'fwaffewafew', '11324588344242', 'aledajita@gmail.com', 'Aa1234567*', '');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`id_usuario`),
  ADD UNIQUE KEY `documento` (`documento`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `usuario`
--
ALTER TABLE `usuario`
  MODIFY `id_usuario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=94;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
