-- phpMyAdmin SQL Dump
-- version 4.9.0.1
-- https://www.phpmyadmin.net/
--
-- Host: mysql265.hosting.combell.com:3306
-- Gegenereerd op: 19 dec 2019 om 10:39
-- Serverversie: 5.7.28-31
-- PHP-versie: 7.1.25-1+0~20181207224605.11+jessie~1.gbpf65b84

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `ID276017_cinematjes`
--

-- --------------------------------------------------------

--
-- Tabelstructuur voor tabel `CinemaEvent`
--

CREATE TABLE `CinemaEvent` (
  `id` int(11) NOT NULL,
  `fase` int(50) NOT NULL,
  `startSuggesties` datetime DEFAULT NULL,
  `endSuggesties` datetime DEFAULT NULL,
  `startStemming` datetime DEFAULT NULL,
  `endStemming` datetime DEFAULT NULL,
  `filmAvond` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Gegevens worden geëxporteerd voor tabel `CinemaEvent`
--

INSERT INTO `CinemaEvent` (`id`, `fase`, `startSuggesties`, `endSuggesties`, `startStemming`, `endStemming`, `filmAvond`) VALUES
(1, 1, '2019-12-17 10:00:00', '2019-12-22 10:00:00', '2019-12-24 10:00:00', '2019-12-29 10:00:00', '2020-01-05 10:00:00');

-- --------------------------------------------------------

--
-- Tabelstructuur voor tabel `DrinkSuggestions`
--

CREATE TABLE `DrinkSuggestions` (
  `id` int(11) NOT NULL,
  `psid` bigint(255) NOT NULL,
  `title` varchar(50) NOT NULL,
  `beschrijving` varchar(200) NOT NULL,
  `link` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Gegevens worden geëxporteerd voor tabel `DrinkSuggestions`
--

INSERT INTO `DrinkSuggestions` (`id`, `psid`, `title`, `beschrijving`, `link`) VALUES
(4, 2712971215434776, 'Bier', 'Liefst Cara!', 'https://www.youtube.com/watch?v=OblA0-e1zMs'),
(7, 2712971215434776, 'Gluweihn', 'Warme wijn', '');

-- --------------------------------------------------------

--
-- Tabelstructuur voor tabel `MovieStemming`
--

CREATE TABLE `MovieStemming` (
  `id` int(255) NOT NULL,
  `psid` bigint(20) NOT NULL,
  `movieId` int(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Gegevens worden geëxporteerd voor tabel `MovieStemming`
--

INSERT INTO `MovieStemming` (`id`, `psid`, `movieId`) VALUES
(52, 2712971215434776, 8321),
(53, 111, 8321),
(54, 123, 562),
(58, 444, 10147);

-- --------------------------------------------------------

--
-- Tabelstructuur voor tabel `MovieSuggestions`
--

CREATE TABLE `MovieSuggestions` (
  `id` int(11) NOT NULL,
  `psid` bigint(255) NOT NULL,
  `movieId` int(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Gegevens worden geëxporteerd voor tabel `MovieSuggestions`
--

INSERT INTO `MovieSuggestions` (`id`, `psid`, `movieId`) VALUES
(15, 111, 771),
(16, 111, 8321),
(17, 111, 5255),
(26, 2712971215434776, 562),
(27, 2712971215434776, 10147),
(28, 123, 927),
(29, 222, 360920),
(30, 333, 17979),
(31, 444, 10719),
(32, 555, 5255);

-- --------------------------------------------------------

--
-- Tabelstructuur voor tabel `Participants`
--

CREATE TABLE `Participants` (
  `id` int(11) NOT NULL,
  `psid` bigint(255) NOT NULL,
  `firstName` varchar(255) NOT NULL,
  `lastName` varchar(255) NOT NULL,
  `fase` int(50) NOT NULL,
  `vrijwilliger` tinyint(1) NOT NULL,
  `checked` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Gegevens worden geëxporteerd voor tabel `Participants`
--

INSERT INTO `Participants` (`id`, `psid`, `firstName`, `lastName`, `fase`, `vrijwilliger`, `checked`) VALUES
(7, 2712971215434776, 'Jasper', 'Vermeesch', 2, 0, 1),
(8, 111, 'Rik', 'Tavenier', 2, 1, 0),
(9, 123, 'Freddy', 'Melkvis', 2, 0, 0),
(10, 222, 'Linda', 'Prima', 1, 1, 1),
(11, 333, 'Erik', 'Bewind', 1, 0, 0),
(12, 444, 'Maarten', 'Aprilenaar', 2, 0, 0),
(13, 555, 'Mohammed', 'Falard', 1, 0, 0),
(14, 666, 'Christine', 'Venood', 0, 1, 0);

-- --------------------------------------------------------

--
-- Tabelstructuur voor tabel `SelectionMovies`
--

CREATE TABLE `SelectionMovies` (
  `id` int(11) NOT NULL,
  `movieId` int(255) NOT NULL,
  `title` varchar(255) NOT NULL,
  `vote_average` float NOT NULL,
  `release_date` date NOT NULL,
  `overview` text NOT NULL,
  `poster_path` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Gegevens worden geëxporteerd voor tabel `SelectionMovies`
--

INSERT INTO `SelectionMovies` (`id`, `movieId`, `title`, `vote_average`, `release_date`, `overview`, `poster_path`) VALUES
(34, 562, 'Die Hard', 7.7, '1988-07-15', 'NYPD cop John McClane\'s plan to reconcile with his estranged wife is thrown for a serious loop when, minutes after he arrives at her office, the entire building is overtaken by a group of terrorists. With little help from the LAPD, wisecracking McClane sets out to single-handedly rescue the hostages and bring the bad guys down.', '/mc7MubOLcIw3MDvnuQFrO9psfCa.jpg'),
(35, 10147, 'Bad Santa', 6.5, '2003-11-26', 'A miserable conman and his partner pose as Santa and his Little Helper to rob department stores on Christmas Eve. But they run into problems when the conman befriends a troubled kid, and the security boss discovers the plot.', '/103KNOz11U4iojwW6F1rOKKZIDp.jpg'),
(36, 8321, 'In Bruges', 7.5, '2008-02-08', 'Ray and Ken, two hit men, are in Bruges, Belgium, waiting for their next mission. While they are there they have time to think and discuss their previous assignment. When the mission is revealed to Ken, it is not what he expected.', '/kBABboeLU2HsKWSG7DwiF9saHl5.jpg');

-- --------------------------------------------------------

--
-- Tabelstructuur voor tabel `SnackSuggestions`
--

CREATE TABLE `SnackSuggestions` (
  `id` int(11) NOT NULL,
  `psid` bigint(255) NOT NULL,
  `title` varchar(50) NOT NULL,
  `beschrijving` varchar(200) NOT NULL,
  `link` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Indexen voor geëxporteerde tabellen
--

--
-- Indexen voor tabel `CinemaEvent`
--
ALTER TABLE `CinemaEvent`
  ADD PRIMARY KEY (`id`);

--
-- Indexen voor tabel `DrinkSuggestions`
--
ALTER TABLE `DrinkSuggestions`
  ADD PRIMARY KEY (`id`);

--
-- Indexen voor tabel `MovieStemming`
--
ALTER TABLE `MovieStemming`
  ADD PRIMARY KEY (`id`);

--
-- Indexen voor tabel `MovieSuggestions`
--
ALTER TABLE `MovieSuggestions`
  ADD PRIMARY KEY (`id`);

--
-- Indexen voor tabel `Participants`
--
ALTER TABLE `Participants`
  ADD PRIMARY KEY (`id`);

--
-- Indexen voor tabel `SelectionMovies`
--
ALTER TABLE `SelectionMovies`
  ADD PRIMARY KEY (`id`);

--
-- Indexen voor tabel `SnackSuggestions`
--
ALTER TABLE `SnackSuggestions`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT voor geëxporteerde tabellen
--

--
-- AUTO_INCREMENT voor een tabel `CinemaEvent`
--
ALTER TABLE `CinemaEvent`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT voor een tabel `DrinkSuggestions`
--
ALTER TABLE `DrinkSuggestions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT voor een tabel `MovieStemming`
--
ALTER TABLE `MovieStemming`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=65;

--
-- AUTO_INCREMENT voor een tabel `MovieSuggestions`
--
ALTER TABLE `MovieSuggestions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;

--
-- AUTO_INCREMENT voor een tabel `Participants`
--
ALTER TABLE `Participants`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT voor een tabel `SelectionMovies`
--
ALTER TABLE `SelectionMovies`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=37;

--
-- AUTO_INCREMENT voor een tabel `SnackSuggestions`
--
ALTER TABLE `SnackSuggestions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
