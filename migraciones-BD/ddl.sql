-- phpMyAdmin SQL Dump
-- version 4.7.4
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 22-07-2018 a las 23:11:19
-- Versión del servidor: 10.1.30-MariaDB
-- Versión de PHP: 7.2.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `institucion`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `prueba`
--

CREATE TABLE `prueba` (
  `cod` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `cedula` int(11) NOT NULL,
  `descripcion` varchar(200) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `prueba`
--

INSERT INTO `prueba` (`cod`, `nombre`, `cedula`, `descripcion`) VALUES
(1, 'Juan Molina', 231456523, 'Es una descripacion de prueba 1'),
(2, 'Johnny Molina', 235687452, 'Es una descripacion de prueba 2'),
(3, 'John Molina', 123545212, 'Es una descripacion de prueba 3');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `publicacion`
--

CREATE TABLE `publicacion` (
  `cpubliacion` int(11) NOT NULL,
  `cusuario` varchar(10) NOT NULL,
  `cdocumento` varchar(10) NOT NULL,
  `fecha_publicacion` date NOT NULL,
  `texto` varchar(300) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tdocumentos`
--

CREATE TABLE `tdocumentos` (
  `cdocumento` varchar(10) NOT NULL,
  `ctipodocumento` varchar(10) NOT NULL,
  `nombredocumento` varchar(100) NOT NULL,
  `activo` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tpersona`
--

CREATE TABLE `tpersona` (
  `per_id` varchar(10) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `fecha_nacimiento` date NOT NULL,
  `activo` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COMMENT='Tabla general de personas';

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ttipodocumento`
--

CREATE TABLE `ttipodocumento` (
  `ctipodocumento` varchar(10) NOT NULL,
  `Descripcion` varchar(50) NOT NULL,
  `activo` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tusuarios`
--

CREATE TABLE `tusuarios` (
  `user_id` varchar(10) NOT NULL,
  `per_id` varchar(10) NOT NULL,
  `alias` varchar(20) NOT NULL,
  `token` varchar(50) NOT NULL,
  `mail` varchar(30) NOT NULL,
  `password` varchar(50) NOT NULL,
  `activo` int(11) NOT NULL,
  `fmodificacion` date NOT NULL,
  `sesion` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tusuariosdocumentos`
--

CREATE TABLE `tusuariosdocumentos` (
  `cusuariodoc` varchar(10) NOT NULL,
  `cusuario` varchar(10) NOT NULL,
  `cdocumento` varchar(10) NOT NULL,
  `fecha_modificacion` date NOT NULL,
  `activo` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `prueba`
--
ALTER TABLE `prueba`
  ADD PRIMARY KEY (`cod`);

--
-- Indices de la tabla `tdocumentos`
--
ALTER TABLE `tdocumentos`
  ADD PRIMARY KEY (`cdocumento`);

--
-- Indices de la tabla `tpersona`
--
ALTER TABLE `tpersona`
  ADD PRIMARY KEY (`per_id`);

--
-- Indices de la tabla `ttipodocumento`
--
ALTER TABLE `ttipodocumento`
  ADD PRIMARY KEY (`ctipodocumento`);

--
-- Indices de la tabla `tusuarios`
--
ALTER TABLE `tusuarios`
  ADD PRIMARY KEY (`user_id`);

--
-- Indices de la tabla `tusuariosdocumentos`
--
ALTER TABLE `tusuariosdocumentos`
  ADD PRIMARY KEY (`cusuariodoc`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `prueba`
--
ALTER TABLE `prueba`
  MODIFY `cod` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
