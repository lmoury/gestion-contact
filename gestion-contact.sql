-- phpMyAdmin SQL Dump
-- version 4.6.4
-- https://www.phpmyadmin.net/
--
-- Client :  127.0.0.1
-- Généré le :  Jeu 04 Avril 2019 à 16:30
-- Version du serveur :  5.7.14
-- Version de PHP :  7.3.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données :  `gestion-contact`
--

-- --------------------------------------------------------

--
-- Structure de la table `contacts`
--

CREATE TABLE `contacts` (
  `id` int(11) NOT NULL,
  `nom` varchar(255) DEFAULT NULL,
  `prenom` varchar(250) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Contenu de la table `contacts`
--

INSERT INTO `contacts` (`id`, `nom`, `prenom`, `createdAt`, `updatedAt`) VALUES
(2, 'laurent', 'moury', '2019-03-20 00:00:00', '2019-04-03 20:27:35'),
(5, 'toto', 'titi', '2019-03-19 00:00:00', '2019-04-03 19:55:45'),
(48, 'titi', 'titi', '2019-03-19 00:00:00', '2019-04-03 19:58:11'),
(133, 'tata', 'titi', '2019-03-28 20:15:18', '2019-04-03 19:59:27'),
(139, 'jean', 'paul', '2019-03-28 20:22:16', '2019-04-03 20:27:58'),
(140, 'anne', 'marie', '2019-03-28 20:23:18', '2019-04-03 20:27:51'),
(322, 'amaury', 'meersman', '2019-04-03 20:21:16', '2019-04-03 20:27:27'),
(323, 'marie', 'elise', '2019-04-03 20:28:47', '2019-04-03 20:28:47');

-- --------------------------------------------------------

--
-- Structure de la table `numeros`
--

CREATE TABLE `numeros` (
  `id` int(11) NOT NULL,
  `numero` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `contactId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Contenu de la table `numeros`
--

INSERT INTO `numeros` (`id`, `numero`, `createdAt`, `updatedAt`, `contactId`) VALUES
(220, '0475678900', '2019-04-03 19:56:42', '2019-04-03 19:56:42', 5),
(221, '069876543', '2019-04-03 19:56:42', '2019-04-03 19:56:42', 5),
(222, '0478987654', '2019-04-03 19:58:11', '2019-04-03 19:58:11', 48),
(223, '+32476879865', '2019-04-03 19:59:27', '2019-04-03 19:59:27', 133),
(224, '+3256789543', '2019-04-03 19:59:27', '2019-04-03 19:59:27', 133),
(238, '0476453212', '2019-04-03 20:27:35', '2019-04-03 20:27:35', 2),
(239, '0470569876', '2019-04-03 20:27:35', '2019-04-03 20:27:35', 2),
(240, '056873421', '2019-04-03 20:27:35', '2019-04-03 20:27:35', 2),
(244, '0476543213', '2019-04-03 20:28:47', '2019-04-03 20:28:47', 323),
(245, '0470874932', '2019-04-03 20:28:47', '2019-04-03 20:28:47', 323),
(246, '056917465', '2019-04-03 20:28:47', '2019-04-03 20:28:47', 323),
(247, '056897632', '2019-04-03 20:48:39', '2019-04-03 20:48:39', 139),
(248, '0634568743', '2019-04-04 16:21:29', '2019-04-04 16:21:29', 140),
(249, '0470985678', '2019-04-04 16:21:47', '2019-04-04 16:21:47', 322),
(250, '+123122334534', '2019-04-04 16:21:47', '2019-04-04 16:21:47', 322);

-- --------------------------------------------------------

--
-- Structure de la table `sequelizemeta`
--

CREATE TABLE `sequelizemeta` (
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Contenu de la table `sequelizemeta`
--

INSERT INTO `sequelizemeta` (`name`) VALUES
('20190314120941-create-contact.js'),
('20190321182941-create-numero.js');

--
-- Index pour les tables exportées
--

--
-- Index pour la table `contacts`
--
ALTER TABLE `contacts`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `numeros`
--
ALTER TABLE `numeros`
  ADD PRIMARY KEY (`id`),
  ADD KEY `contactId` (`contactId`);

--
-- Index pour la table `sequelizemeta`
--
ALTER TABLE `sequelizemeta`
  ADD PRIMARY KEY (`name`),
  ADD UNIQUE KEY `name` (`name`);

--
-- AUTO_INCREMENT pour les tables exportées
--

--
-- AUTO_INCREMENT pour la table `contacts`
--
ALTER TABLE `contacts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=324;
--
-- AUTO_INCREMENT pour la table `numeros`
--
ALTER TABLE `numeros`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=251;
--
-- Contraintes pour les tables exportées
--

--
-- Contraintes pour la table `numeros`
--
ALTER TABLE `numeros`
  ADD CONSTRAINT `numeros_ibfk_1` FOREIGN KEY (`contactId`) REFERENCES `contacts` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `numeros_ibfk_2` FOREIGN KEY (`contactId`) REFERENCES `contacts` (`id`) ON DELETE CASCADE;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
