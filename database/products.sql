-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 22-09-2023 a las 02:56:01
-- Versión del servidor: 10.4.28-MariaDB
-- Versión de PHP: 8.0.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `e-commerce`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `products`
--

CREATE TABLE `products` (
  `id_product` bigint(254) NOT NULL,
  `brand` varchar(100) NOT NULL DEFAULT '',
  `model` varchar(100) NOT NULL DEFAULT '',
  `quantity` int(100) NOT NULL DEFAULT 1,
  `price` int(100) NOT NULL DEFAULT 100000,
  `accesories` text NOT NULL,
  `image` varchar(100) NOT NULL DEFAULT ''
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `products`
--

INSERT INTO `products` (`id_product`, `brand`, `model`, `quantity`, `price`, `accesories`, `image`) VALUES
(29, 'Sony', 'Playstation', 10, 100000, '2 Joystick + 3 juegos', '29.webp'),
(30, 'Sony', 'Playstation 3', 6, 100000, '3 Joysticks + 4 juegos', '30.webp'),
(31, 'Sony', 'Playstation 4', 15, 100000, '2 Joystick + 5 Juegos', '31.webp'),
(32, 'Sony', 'Playstation 5', 20, 100000, '4 Joystick + 6 juegos', '32.webp'),
(33, 'Microsoft', 'Xbox 360', 10, 100000, '2 Joystick + 3 juegos', '33.jpg'),
(35, 'Consola Retro', 'Game Stick Lite', 10, 50000, '2 Joystick + 10000 juegos', 'consola35.jpg'),
(36, 'Nintendo', 'Nintendo Switch', 10, 80000, 'Juego Portátil', '36.JPG'),
(37, 'Sega', 'Genesis 3', 10, 10000, '2 Joystick + 900 juegos', '37.webp'),
(38, 'Microsoft', 'Xbox Series X 1TB Black', 10, 100000, '1 Joystick + 2 juegos', '38.webp');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id_product`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `products`
--
ALTER TABLE `products`
  MODIFY `id_product` bigint(254) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=39;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
