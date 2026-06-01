-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 11-05-2026 a las 06:03:24
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
-- Estructura de tabla para la tabla `cita`
--

CREATE TABLE `cita` (
  `id_cita` int(11) NOT NULL,
  `id_paciente` int(11) DEFAULT NULL,
  `id_medico` int(11) DEFAULT NULL,
  `fecha` date NOT NULL,
  `hora` time NOT NULL,
  `estado` enum('pendiente','confirmada','cancelada','completada') DEFAULT 'pendiente',
  `motivo` varchar(200) DEFAULT NULL,
  `recordatorio_enviado` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `especialista`
--

CREATE TABLE `especialista` (
  `id_especialista` int(11) NOT NULL,
  `nombre_especialidad` varchar(100) NOT NULL,
  `descripcion` varchar(200) DEFAULT NULL,
  `estado` enum('activo','inactivo') DEFAULT 'activo'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `especialista`
--

INSERT INTO `especialista` (`id_especialista`, `nombre_especialidad`, `descripcion`, `estado`) VALUES
(1, 'Medicina General', 'Atención medica integral a pacientes de todas las edades', 'activo'),
(2, 'Medicina General', 'Atención medica integral a pacientes de todas las edades', 'activo'),
(3, 'Optometria', 'Evaluación, diagnóstico y cuidado de la salud visual', 'activo'),
(4, 'Odontología', 'Diagnóstico, tratamiento y cuidado de la salud oral', 'activo'),
(5, 'Dermatología ', 'Diagnóstico y tratamiento de enfermedades de la piel, cabello y uñas', 'activo'),
(6, 'Pediatría', 'Diagnóstico y tratamiento de enfermedades en niños y adolescentes', 'activo'),
(7, 'Ginecología', 'Diagnóstico y tratamiento de enfermedades del sistema reproductor femenino\r\n', 'activo');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `historia_clinica`
--

CREATE TABLE `historia_clinica` (
  `id_historia` int(11) NOT NULL,
  `id_paciente` int(11) DEFAULT NULL,
  `id_medico` int(11) DEFAULT NULL,
  `fecha` date DEFAULT NULL,
  `diagnostico` text DEFAULT NULL,
  `tratamiento` text DEFAULT NULL,
  `observaciones` text DEFAULT NULL,
  `estado` enum('activo','inactivo') DEFAULT 'activo'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `historia_clinica`
--

INSERT INTO `historia_clinica` (`id_historia`, `id_paciente`, `id_medico`, `fecha`, `diagnostico`, `tratamiento`, `observaciones`, `estado`) VALUES
(1, 1, NULL, '2026-02-23', 'Migraña cronica confirmada. Se evalua condicion medica del paciente.', 'Manejo de Aspirina 2 cada ocho horas y reposo absoluto.', 'Se remite con medico especialista para descartar otras lesiones.', 'activo'),
(2, 2, 1, '2026-02-23', 'golpe fuerte en rodilla izquierda. Posible ruptura de meniscos.', 'se le formula medicamento para el dolor \"Ibuprofeno 400\" una capsula cada 8 horas.\r\ny un ungüento a base de mariguana para  desinflamar la zona afectada.', 'se remite al paciente con el área de diagnostico, con cita para el especialista ', 'activo'),
(3, 12, 4, '2026-02-23', 'revisión y limpieza de su dentadura. ', 'lavar sus dientes tres veces al día, utilizar hilio dental y enjuague bucal.', 'Revisión en seis meses.', 'activo'),
(4, 3, 4, '2026-02-23', 'cambio de amalgamas, de muelas traseras  izquierdas y derechas.', 'cambio de dos amalgamas izquierdas y una amalgama derecha, y limpieza bucal.', 'revisión y cambie de las amalgamas restantes en 30 días', 'activo'),
(5, 8, 3, '2026-02-23', 'lagrimeo contante en ojo derecho, irritación por objeto desconocido en el parpado.', 'Extracción y limpieza del objeto de origen metálico en parpado.', 'Cubrir ojo derecho, y protegerlo de la luz  solar, aplicar gotas a base de manzanilla para desinflar su ojito.  revisión en una semana', 'activo'),
(6, 6, 3, '2026-02-23', 'revisión y cambio de formula medica ocular.', 'examen de optometría para verificar valores visuales, ojo izquierdo 15/20, ojo derecho, 10/20.', 'aumentó de astigmatismo en ojo derecho y aumento de formula en dicho ojo.\r\n revisión en 6 meses', 'activo'),
(7, 1, NULL, '2024-05-20', 'Riñitis alergica estacional', 'Ceterizina 10mg cada 24 horas', 'Paciente refiere mejoria con el tratamiento previo', 'activo'),
(8, 1, 1, '2023-10-26', 'Paciente con sintomas de fatiga - ACTUALIZADO', 'Descanso por 48 horas y analgesicos', 'Se agrega recomendacion de dieta ligera.', 'activo'),
(9, 1, 1, '2025-05-30', 'Infeccion respiratoria aguda', 'Amoxicilina 500mg cada 8 horas por 7 dias, y cita con especialista', 'Se recomienda control en una semana', 'activo'),
(10, 1, 1, '2024-02-15', 'Riñitis alergica severa', 'Antihistaminicos cad 12 horas por 5 dias', 'Paciente presenta mejoria tras la primera dosis', 'activo'),
(11, 1, 1, '2025-02-15', 'Dolor Articular severo', 'Ibuprofeno 400mg cad 8 horas por 7 dias', 'Pedir valoracion con especialista', 'activo'),
(12, 1, 1, '2024-05-20', 'El paciente presenta cuadro febril leve.', 'Reposo por 3 dias y mucha hidratacion.', 'Se recomienda control en 48 horas.', 'activo'),
(13, 1, 1, '2024-05-28', 'Gripe comun con congestion leve', 'Reposo e hidratacion constante por 3 dias', 'Se recomienda control si la fiebre persiste', 'activo');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `horario`
--

CREATE TABLE `horario` (
  `id_horario` int(11) NOT NULL,
  `id_medico` int(11) DEFAULT NULL,
  `dia` enum('lunes','martes','miercoles','jueves','viernes','sabado','domingo') DEFAULT NULL,
  `hora_inicio` time NOT NULL,
  `hora_fin` time NOT NULL,
  `estado` enum('activo','inactivo') DEFAULT 'activo'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `horario`
--

INSERT INTO `horario` (`id_horario`, `id_medico`, `dia`, `hora_inicio`, `hora_fin`, `estado`) VALUES
(1, 1, 'lunes', '08:00:00', '08:40:00', 'activo'),
(2, NULL, 'lunes', '09:00:00', '09:40:00', 'inactivo'),
(4, 1, 'lunes', '11:00:00', '11:40:00', 'activo'),
(5, 2, 'lunes', '13:00:00', '13:40:00', 'activo'),
(6, 2, 'lunes', '14:00:00', '14:40:00', 'activo'),
(7, 2, 'lunes', '15:00:00', '15:40:00', 'activo'),
(8, 2, 'lunes', '16:00:00', '16:40:00', 'activo'),
(9, 2, 'lunes', '17:00:00', '17:40:00', 'activo'),
(10, 2, 'lunes', '17:45:00', '18:30:00', 'activo'),
(11, 3, 'lunes', '08:00:00', '08:40:00', 'activo'),
(12, 3, 'lunes', '09:00:00', '09:40:00', 'activo'),
(13, 3, 'lunes', '10:00:00', '10:40:00', 'activo'),
(14, 3, 'lunes', '11:00:00', '11:40:00', 'activo'),
(15, 3, 'lunes', '13:00:00', '13:40:00', 'activo'),
(16, 3, 'lunes', '14:00:00', '14:40:00', 'activo'),
(17, 3, 'lunes', '14:00:00', '14:40:00', 'activo'),
(18, 3, 'lunes', '15:00:00', '15:40:00', 'activo'),
(19, 3, 'lunes', '16:00:00', '16:40:00', 'activo'),
(20, 3, 'lunes', '17:00:00', '17:40:00', 'activo'),
(21, 4, 'lunes', '08:00:00', '08:40:00', 'activo'),
(22, 4, 'lunes', '09:00:00', '09:40:00', 'activo'),
(23, 4, 'lunes', '10:00:00', '10:40:00', 'activo'),
(24, 4, 'lunes', '11:00:00', '11:40:00', 'activo'),
(25, 4, 'lunes', '13:00:00', '13:40:00', 'activo'),
(26, 4, 'lunes', '14:00:00', '14:40:00', 'activo'),
(27, 4, 'lunes', '15:00:00', '15:40:00', 'activo'),
(28, 4, 'lunes', '16:00:00', '16:40:00', 'activo'),
(29, 4, 'lunes', '17:00:00', '17:40:00', 'activo'),
(30, NULL, 'lunes', '08:00:00', '12:00:00', 'activo');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `medico`
--

CREATE TABLE `medico` (
  `id_medico` int(11) NOT NULL,
  `id_usuario` int(11) DEFAULT NULL,
  `id_especialista` int(11) DEFAULT NULL,
  `tarjeta_profesional` varchar(50) DEFAULT NULL,
  `experiencia_clinica` int(11) DEFAULT NULL,
  `estado` enum('activo','inactivo') DEFAULT 'activo'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `medico`
--

INSERT INTO `medico` (`id_medico`, `id_usuario`, `id_especialista`, `tarjeta_profesional`, `experiencia_clinica`, `estado`) VALUES
(1, 13, 1, 'MG-NUEVA-2024', 21, 'activo'),
(2, 14, 2, '10000987456', 15, 'activo'),
(3, 15, 3, '1000654123', 8, 'activo'),
(4, 16, 4, '1000321321', 15, 'activo'),
(5, 17, 5, '10000987789', 12, 'activo'),
(6, 18, 6, '10000357951', 15, 'activo'),
(7, 19, 7, '10002159864', 10, 'activo');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `paciente`
--

CREATE TABLE `paciente` (
  `id_paciente` int(11) NOT NULL,
  `id_usuario` int(11) DEFAULT NULL,
  `tipo_sangre` enum('A+','A-','B+','B-','AB+','AB-','O+','O-') DEFAULT NULL,
  `sexo` enum('masculino','femenino','otro') DEFAULT NULL,
  `fecha_nacimiento` date DEFAULT NULL,
  `telefono` varchar(15) DEFAULT NULL,
  `direccion` varchar(100) DEFAULT NULL,
  `estado` enum('activo','inactivo') DEFAULT 'activo'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `paciente`
--

INSERT INTO `paciente` (`id_paciente`, `id_usuario`, `tipo_sangre`, `sexo`, `fecha_nacimiento`, `telefono`, `direccion`, `estado`) VALUES
(1, 1, 'O+', 'masculino', '1972-11-15', '3257894560', 'calle 35 su # 12-18', 'activo'),
(2, 2, 'O+', 'masculino', '1985-05-10', '3012589878', 'Carrera 12Este # 165-22', 'activo'),
(3, 3, 'B-', 'femenino', '1969-11-30', '3216589789', 'calle 53 sur # 29-15', 'activo'),
(4, 4, 'A+', 'masculino', '1994-10-08', '3134119988', 'calle 63A sur # 72-81', 'activo'),
(5, 5, 'A+', 'femenino', '1972-05-01', '3236547890', 'calle 63A sur #72-81', 'activo'),
(6, 6, 'A-', 'masculino', '1975-04-28', '3112365213', 'carrera 72 # 63A-84 sur', 'activo'),
(7, 7, 'A+', 'masculino', '1988-12-24', '3017899874', 'Carrera 73 # 64A-22 sur', 'activo'),
(8, 8, 'A-', 'masculino', '1994-08-17', '3507896510', 'Diagonal 63 SUR # 74-00', 'activo'),
(9, 9, 'O-', 'masculino', '1999-08-30', '3125987410', 'Calle 64 Sur # 74a-85', 'activo'),
(10, 10, 'O+', 'femenino', '2000-07-22', '3152312654', 'Carrera 75A # 65-17 sur', 'activo'),
(11, 11, 'O-', 'femenino', '1970-06-15', '3236542319', ' Carrera 75A # 65A 52 Sur', 'activo'),
(12, 12, 'O+', 'femenino', '1989-02-28', '3002316547', 'Calle 63A sur # 72A-84', 'activo'),
(40, 15, 'O+', '', '1995-10-25', '3009632587', 'Avenida Principal #123', 'activo'),
(41, 18, 'O+', '', '1995-10-25', '2220000001', 'Avenida Principal #123', 'activo');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--

CREATE TABLE `usuario` (
  `id_usuario` int(11) NOT NULL,
  `tipo_usuario` enum('admin','paciente','medico') NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `apellido` varchar(50) NOT NULL,
  `tipo_de_documento` enum('Cedula de Ciudadanía', 'Tarjeta de Identidad', 'Cedula de Extranjería', 'Registro Civil', 'Pasaporte') NOT NULL,
  `documento` varchar(20) NOT NULL,
  `correo` varchar(100) NOT NULL,
  `password` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuario`
--

INSERT INTO `usuario` (`id_usuario`, `tipo_usuario`, `nombre`, `apellido`, `tipo_de_documento`, `documento`, `correo`, `password`) VALUES
(1, 'medico', 'Juan Jose', 'Gomez', '12345678', 'juan@correo.com', 'perico123'),
(2, 'paciente', 'Jhonn Armando ', 'Caceres Rojas', '79865123', 'caceresrojasj@gmail.com', 'perico2'),
(3, 'paciente', 'Nataly Maria', 'Álvarez Nuñez', '52312654', 'natalyalvarezn@gmail.com', 'cacatua1'),
(4, 'paciente', 'Steven Alberto', 'Zapata Carvajal', '79898877', 'zapatacarvajals@gmail.com', 'prerico3'),
(5, 'paciente', 'Carmen Rosa', 'Petro Wilches', '51465321', 'petropresidentec@gmail.com', 'cacatua2'),
(6, 'paciente', 'Julio Manuel', 'Villamil Sotelo', '79032145', 'villamiljuliom@gmail.com', 'jaguar1'),
(7, 'paciente', 'Samuel Maria', 'Moreno Rojas', '1024654987', 'smariar@gmail.com', 'jaguar2'),
(8, 'paciente', 'Daniel Felipe', 'Caca Mora', '1024012365', 'cocamorad@gmail.com', 'perico4'),
(9, 'paciente', 'Esteban Andres', 'Sanchez Ariel', '1024987789', 'sanchezaa@gmail.com', 'jaguar3'),
(10, 'paciente', 'Andrea Viviana', 'Bolaños Lopez', '52987456', 'bolañoslopeza@gmail.com', 'cacatua3'),
(11, 'paciente', 'Jenny Lorena', 'Smith lopez', '52303001', 'jennysmithl@gmail.com', 'cacatua4'),
(12, 'paciente', 'Maria Daniela', 'Gonzáles Gonzales ', '52909818', 'gonzalesmariag@gmail.com', 'cacatua4'),
(13, 'medico', 'Juan de Jesus', 'Perez Almanza', '79335226', 'almanzaperezj@gmail.com', 'elefante1'),
(14, 'medico', 'Camilo Andres', 'Rubiano Garces', '79101515', 'rubianocamiloa@gmail.com', 'elefante2'),
(15, 'medico', 'Maria Alejandra ', 'Bohorquez Pineda', '1001332211', 'bohorquezpinedam@gmail.com', 'aguila1J'),
(16, 'medico', 'Judy Marcela ', 'Angarita Perez', '52003501', 'angaritaperezj@gmail.com', 'piraña1'),
(17, 'medico', 'Estefany Malacara', 'Ramos Perez', '1001908087', 'ramospreze@gmail.com', 'granero10'),
(18, 'medico', 'j Steven Malacara', 'Garzon Morales', '1024687788', 'garzonmoralezjs@gmail.com', 'gatico1'),
(19, 'medico', 'Daylyn Marleny', 'Rojas Huertas', '52998801', 'rojasmarlenyd@gmail.com', 'girafa1'),
(71, 'paciente', 'Candy', 'Maruja', '3002136548', 'pepitas1000', 'ladrar'),
(72, 'paciente', 'Gatita Linda', 'Gata', '3110000111', 'croquetas100%', 'galletas'),
(73, 'paciente', 'Steven', 'Gamez', '3205563214', 'malhumor2233', 'rabietas'),
(74, 'paciente', 'henry', 'villamil', '3124671542', 'henryvillamil331@gmail.com', '3332121'),
(77, 'paciente', 'pepito', 'perez', '3002136549', 'diente321', '2135'),
(78, 'paciente', 'juanito', 'Casa', '3002223311', 'pintopuertas123', 'brochagorda'),
(79, 'paciente', 'Jaimito Azulito', 'Collazos', '1001236548', 'prueba01de01', 'sena');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `cita`
--
ALTER TABLE `cita`
  ADD PRIMARY KEY (`id_cita`),
  ADD KEY `id_paciente` (`id_paciente`),
  ADD KEY `id_medico` (`id_medico`);

--
-- Indices de la tabla `especialista`
--
ALTER TABLE `especialista`
  ADD PRIMARY KEY (`id_especialista`);

--
-- Indices de la tabla `historia_clinica`
--
ALTER TABLE `historia_clinica`
  ADD PRIMARY KEY (`id_historia`),
  ADD KEY `id_paciente` (`id_paciente`),
  ADD KEY `id_medico` (`id_medico`);

--
-- Indices de la tabla `horario`
--
ALTER TABLE `horario`
  ADD PRIMARY KEY (`id_horario`),
  ADD KEY `id_medico` (`id_medico`);

--
-- Indices de la tabla `medico`
--
ALTER TABLE `medico`
  ADD PRIMARY KEY (`id_medico`),
  ADD UNIQUE KEY `id_usuario` (`id_usuario`),
  ADD KEY `id_especialista` (`id_especialista`);

--
-- Indices de la tabla `paciente`
--
ALTER TABLE `paciente`
  ADD PRIMARY KEY (`id_paciente`),
  ADD UNIQUE KEY `id_usuario` (`id_usuario`);

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
-- AUTO_INCREMENT de la tabla `cita`
--
ALTER TABLE `cita`
  MODIFY `id_cita` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;

--
-- AUTO_INCREMENT de la tabla `especialista`
--
ALTER TABLE `especialista`
  MODIFY `id_especialista` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT de la tabla `historia_clinica`
--
ALTER TABLE `historia_clinica`
  MODIFY `id_historia` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT de la tabla `horario`
--
ALTER TABLE `horario`
  MODIFY `id_horario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=36;

--
-- AUTO_INCREMENT de la tabla `medico`
--
ALTER TABLE `medico`
  MODIFY `id_medico` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;

--
-- AUTO_INCREMENT de la tabla `paciente`
--
ALTER TABLE `paciente`
  MODIFY `id_paciente` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=51;

--
-- AUTO_INCREMENT de la tabla `usuario`
--
ALTER TABLE `usuario`
  MODIFY `id_usuario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=81;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `cita`
--
ALTER TABLE `cita`
  ADD CONSTRAINT `cita_ibfk_1` FOREIGN KEY (`id_paciente`) REFERENCES `paciente` (`id_paciente`),
  ADD CONSTRAINT `cita_ibfk_2` FOREIGN KEY (`id_medico`) REFERENCES `medico` (`id_medico`);

--
-- Filtros para la tabla `historia_clinica`
--
ALTER TABLE `historia_clinica`
  ADD CONSTRAINT `historia_clinica_ibfk_1` FOREIGN KEY (`id_paciente`) REFERENCES `paciente` (`id_paciente`),
  ADD CONSTRAINT `historia_clinica_ibfk_2` FOREIGN KEY (`id_medico`) REFERENCES `medico` (`id_medico`);

--
-- Filtros para la tabla `horario`
--
ALTER TABLE `horario`
  ADD CONSTRAINT `horario_ibfk_1` FOREIGN KEY (`id_medico`) REFERENCES `medico` (`id_medico`);

--
-- Filtros para la tabla `medico`
--
ALTER TABLE `medico`
  ADD CONSTRAINT `medico_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id_usuario`),
  ADD CONSTRAINT `medico_ibfk_2` FOREIGN KEY (`id_especialista`) REFERENCES `especialista` (`id_especialista`);

--
-- Filtros para la tabla `paciente`
--
ALTER TABLE `paciente`
  ADD CONSTRAINT `paciente_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id_usuario`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
