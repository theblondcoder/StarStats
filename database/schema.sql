-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Versión del servidor:         10.4.32-MariaDB - mariadb.org binary distribution
-- SO del servidor:              Win64
-- HeidiSQL Versión:             12.3.0.6589
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Volcando estructura de base de datos para star_stats
CREATE DATABASE IF NOT EXISTS `star_stats` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci */;
USE `star_stats`;

-- Volcando estructura para tabla star_stats.competiciones_tenis
CREATE TABLE IF NOT EXISTS `competiciones_tenis` (
  `id_competicion` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(400) NOT NULL,
  `categoria` enum('Grand Slam','Masters 1000','ATP 500','ATP 250','Internacional') DEFAULT NULL,
  PRIMARY KEY (`id_competicion`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Volcando datos para la tabla star_stats.competiciones_tenis: ~17 rows (aproximadamente)
INSERT INTO `competiciones_tenis` (`id_competicion`, `nombre`, `categoria`) VALUES
	(1, 'Abierto de Australia', 'Grand Slam'),
	(2, 'Torneo de Roland Garros', 'Grand Slam'),
	(3, 'Campeonato de Wimbledon', 'Grand Slam'),
	(4, 'Abierto de Estados Unidos', 'Grand Slam'),
	(5, 'Indian Wells Masters ', 'Masters 1000'),
	(6, 'Miami Open', 'Masters 1000'),
	(7, 'Monte-Carlo Masters', 'Masters 1000'),
	(8, 'Madrid Open', 'Masters 1000'),
	(9, 'Rome Masters', 'Masters 1000'),
	(10, 'Canada Masters', 'Masters 1000'),
	(11, 'Cincinnati Masters', 'Masters 1000'),
	(12, 'Shanghai Masters', 'Masters 1000'),
	(13, 'Rolex Paris Masters', 'Masters 1000'),
	(14, 'Hamburg', 'ATP 500'),
	(15, 'Rio de Janeiro', 'ATP 500'),
	(16, 'Copa Davis', 'Internacional'),
	(17, 'Juegos Olimpicos', 'Internacional'),
	(18, 'Barcelona Open', 'ATP 500');

-- Volcando estructura para tabla star_stats.deportistas_favoritos
CREATE TABLE IF NOT EXISTS `deportistas_favoritos` (
  `id_deportista` int(11) NOT NULL DEFAULT 0 COMMENT 'Esta columna nunca va a ser null porque absolutamente todos los deportistas de la BBDD estaran identificados con un id en una de las tablas\r\n',
  `id_user` varchar(100) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id_deportista`,`id_user`),
  KEY `FK_IDU_DF_USU` (`id_user`) USING BTREE,
  KEY `FK_IDD_DF_TD` (`id_deportista`) USING BTREE,
  CONSTRAINT `FK_IDD_DF_TD` FOREIGN KEY (`id_deportista`) REFERENCES `todos_deportistas` (`id_deportista`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_IDU_DF_USU` FOREIGN KEY (`id_user`) REFERENCES `usuario` (`nombre_user`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Volcando datos para la tabla star_stats.deportistas_favoritos: ~0 rows (aproximadamente)
INSERT INTO `deportistas_favoritos` (`id_deportista`, `id_user`) VALUES
	(1, 'demo_user');

-- Volcando estructura para tabla star_stats.deportistas_retirados
CREATE TABLE IF NOT EXISTS `deportistas_retirados` (
  `id_deportista` int(11) NOT NULL,
  `ciudad` varchar(200) NOT NULL COMMENT 'Los valores se deben obtener de una api de internet',
  `fecha_nacimiento` varchar(50) NOT NULL DEFAULT '',
  `altura` decimal(3,2) NOT NULL,
  `peso` decimal(5,2) NOT NULL,
  `extremidad_dominante` enum('Diestro','Zurdo','Ambidiestro') NOT NULL,
  `anio_debut` int(11) NOT NULL DEFAULT 0,
  `veces_n1` int(11) DEFAULT NULL,
  `anios_activos` int(11) DEFAULT NULL,
  PRIMARY KEY (`id_deportista`) USING BTREE,
  KEY `FK_IDD_DR_TD` (`id_deportista`) USING BTREE,
  CONSTRAINT `FK_IDD_DR_TD2` FOREIGN KEY (`id_deportista`) REFERENCES `todos_deportistas` (`id_deportista`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `CHK_extremidad_dominante` CHECK (`extremidad_dominante` in ('Diestro','Zurdo','Ambidiestro'))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Volcando datos para la tabla star_stats.deportistas_retirados: ~0 rows (aproximadamente)
INSERT INTO `deportistas_retirados` (`id_deportista`, `ciudad`, `fecha_nacimiento`, `altura`, `peso`, `extremidad_dominante`, `anio_debut`, `veces_n1`, `anios_activos`) VALUES
	(2, 'Murcia', '21 de agosto de 1985 ', 1.83, 84.00, 'Diestro', 2003, NULL, 16),
	(4, 'Basilea', '8 de agosto de 1981', 1.00, 85.00, 'Diestro', 1998, 5, 24);

-- Volcando estructura para tabla star_stats.estadisticas_jugadores
CREATE TABLE IF NOT EXISTS `estadisticas_jugadores` (
  `id_competicion` int(11) NOT NULL,
  `id_jugador` int(11) NOT NULL,
  `partidos_ganados` int(11) NOT NULL,
  `partidos_perdidos` int(11) NOT NULL,
  `partidos_jugados` int(11) GENERATED ALWAYS AS (`partidos_ganados` + `partidos_perdidos`) STORED,
  `veces_presentadas` int(10) NOT NULL,
  PRIMARY KEY (`id_competicion`,`id_jugador`) USING BTREE,
  KEY `FK_IDJ_ESJ_TD` (`id_jugador`) USING BTREE,
  KEY `FK_IDC_ESJ_CT` (`id_competicion`) USING BTREE,
  CONSTRAINT `FK_IDC_ESJ_CT` FOREIGN KEY (`id_competicion`) REFERENCES `competiciones_tenis` (`id_competicion`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_estadisticas_jugadores_todos_deportistas` FOREIGN KEY (`id_jugador`) REFERENCES `todos_deportistas` (`id_deportista`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Volcando datos para la tabla star_stats.estadisticas_jugadores: ~0 rows (aproximadamente)
INSERT INTO `estadisticas_jugadores` (`id_competicion`, `id_jugador`, `partidos_ganados`, `partidos_perdidos`, `veces_presentadas`) VALUES
	(1, 2, 15, 10, 11),
	(1, 4, 102, 15, 21);

-- Volcando estructura para tabla star_stats.resultados_anuales
CREATE TABLE IF NOT EXISTS `resultados_anuales` (
  `id` int(11) NOT NULL,
  `id_deportista` int(11) NOT NULL,
  `id_competicion` int(11) NOT NULL,
  `anio` int(5) NOT NULL DEFAULT 0,
  `resultado` varchar(30) NOT NULL,
  `mot_no_part` varchar(500) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_IDC_RA_CT` (`id_competicion`) USING BTREE,
  KEY `FK_IDJ_RA_TD` (`id_deportista`) USING BTREE,
  CONSTRAINT `FK_IDC_RA_CT` FOREIGN KEY (`id_competicion`) REFERENCES `competiciones_tenis` (`id_competicion`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_resultados_anuales_todos_deportistas` FOREIGN KEY (`id_deportista`) REFERENCES `todos_deportistas` (`id_deportista`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Volcando datos para la tabla star_stats.resultados_anuales: ~2 rows (aproximadamente)
INSERT INTO `resultados_anuales` (`id`, `id_deportista`, `id_competicion`, `anio`, `resultado`, `mot_no_part`) VALUES
	(1, 2, 1, 2005, '1r', NULL),
	(2, 4, 1, 2006, 'G', NULL);

-- Volcando estructura para tabla star_stats.todos_deportistas
CREATE TABLE IF NOT EXISTS `todos_deportistas` (
  `id_deportista` int(11) NOT NULL COMMENT 'También es clave ajena ',
  `nombres_api` varchar(100) NOT NULL,
  `nombre_depor` varchar(100) NOT NULL,
  `apellidos_depor` varchar(200) NOT NULL,
  `foto_perfil` varchar(300) DEFAULT NULL,
  `pais` varchar(200) DEFAULT NULL,
  `anio_retiro` int(11) DEFAULT NULL,
  `deporte` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id_deportista`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Volcando datos para la tabla star_stats.todos_deportistas: ~2 rows (aproximadamente)
INSERT INTO `todos_deportistas` (`id_deportista`, `nombres_api`, `nombre_depor`, `apellidos_depor`, `foto_perfil`, `pais`, `anio_retiro`, `deporte`) VALUES
	(1, 'Carlos_Alcaraz', 'Carlos', 'Alcaraz Garfia', '1.png', 'España', NULL, 'Tenis'),
	(2, 'Nicolás_Almagro', 'Nicolas', 'Almagro Sanchéz', '2.png', 'España', 2019, 'Tenis'),
	(3, 'Rafael_Nadal', 'Rafael', 'Nadal Parera', '3.png', 'España', NULL, 'Tenis'),
	(4, 'Roger_Federer', 'Roger', 'Federer', '4.png', 'Suiza', 2022, 'Tenis');

-- Volcando estructura para tabla star_stats.usuario
CREATE TABLE IF NOT EXISTS `usuario` (
  `nombre_user` varchar(100) NOT NULL,
  `nombre` varchar(200) NOT NULL,
  `apellidos` varchar(200) NOT NULL,
  `fecha_nacimiento` date NOT NULL,
  `pais` varchar(200) NOT NULL COMMENT 'Los valores se deben obtener de una api de internet',
  PRIMARY KEY (`nombre_user`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Volcando datos para la tabla star_stats.usuario: ~1 rows (aproximadamente)
INSERT INTO `usuario` (`nombre_user`, `nombre`, `apellidos`, `fecha_nacimiento`, `pais`) VALUES
	('demo_user', 'Demo', 'User', '2000-01-01', 'España');

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
