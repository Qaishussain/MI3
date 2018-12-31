-- phpMyAdmin SQL Dump
-- version 4.7.7
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Gegenereerd op: 31 dec 2018 om 16:51
-- Serverversie: 10.1.31-MariaDB
-- PHP-versie: 7.0.26

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `id7578167_ohotel`
--

-- --------------------------------------------------------

--
-- Tabelstructuur voor tabel `contact`
--

CREATE TABLE `contact` (
  `Contact_ID` int(11) NOT NULL,
  `Naam` varchar(250) COLLATE utf8_unicode_ci NOT NULL,
  `email` varchar(250) COLLATE utf8_unicode_ci NOT NULL,
  `gsmnummer` text COLLATE utf8_unicode_ci NOT NULL,
  `Message` longtext COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Tabelstructuur voor tabel `kamers`
--

CREATE TABLE `kamers` (
  `kamers_id` int(11) NOT NULL,
  `id_soort` int(11) NOT NULL,
  `beschikbaar` varchar(3) NOT NULL DEFAULT 'Ja'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Gegevens worden geëxporteerd voor tabel `kamers`
--

INSERT INTO `kamers` (`kamers_id`, `id_soort`, `beschikbaar`) VALUES
(1, 1, 'Ja'),
(2, 2, 'Ja'),
(3, 1, 'nee'),
(4, 1, 'nee'),
(5, 2, 'nee'),
(6, 2, 'Ja'),
(7, 3, 'Ja'),
(8, 3, 'Ja'),
(9, 3, 'Ja'),
(10, 3, 'Ja'),
(11, 2, 'Ja'),
(12, 2, 'Ja'),
(13, 2, 'Ja'),
(14, 2, 'nee');

-- --------------------------------------------------------

--
-- Tabelstructuur voor tabel `klanten`
--

CREATE TABLE `klanten` (
  `klant_id` int(11) NOT NULL,
  `naam` varchar(300) NOT NULL,
  `voornaam` varchar(100) NOT NULL,
  `geslacht` varchar(30) NOT NULL,
  `geboortedatum` date NOT NULL,
  `adres` varchar(300) NOT NULL,
  `gemeente` varchar(300) NOT NULL,
  `postcode` varchar(300) NOT NULL,
  `telefoonnummer` int(11) NOT NULL,
  `email` varchar(30) NOT NULL,
  `password` varchar(300) NOT NULL,
  `userlevel` varchar(30) NOT NULL DEFAULT 'Klant',
  `status` varchar(100) NOT NULL DEFAULT 'active'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Gegevens worden geëxporteerd voor tabel `klanten`
--

INSERT INTO `klanten` (`klant_id`, `naam`, `voornaam`, `geslacht`, `geboortedatum`, `adres`, `gemeente`, `postcode`, `telefoonnummer`, `email`, `password`, `userlevel`, `status`) VALUES
(27, 'Toulni', 'Imane', 'Female', '1996-11-01', 'Arenbergstraat', 'Brussel', '1000', 499002222, 'im@gmail.com', '444bcb3a3fcf8389296c49467f27e1d6', 'klant', 'active'),
(46, 'Irain', 'Emane', 'Female', '2014-04-30', 'Brusselaan 208', 'SPL', '1600', 489324763, 'emane.irain@outlook.com', '56d593b70f8b6a7bf1e93d3761846a6c', 'klant', 'active'),
(47, 'Sagar', 'Arman', 'Male', '2014-04-30', 'Arenbergstraat', 'Brussel', '1140', 493641111, 'hallo.qais@gmail.com', '60a530b9462ed9159b92c552e49ab569', 'klant', 'active'),
(49, 'Irain', 'Emane', 'Female', '2014-04-30', 'Brusselbaan 208', 'Vlaanderen', '1600', 489324763, 'emaneirain2110@gmail.com', '749ab9c1c29bb4ab357de501020c08cb', 'klant', 'active'),
(50, 'Hussain', 'Qais', 'Male', '2014-04-30', 'Edouard stuckens 40', 'Evere', '1140', 493970050, 'ohotel007@gmail.com', '2c5285e8769c8e0754d30bb4bb44f95c', 'admin', 'active'),
(51, 'n', 'imane', 'Female', '1998-05-13', 'EDTS', 'bx', '1020', 485698789, 'imane_toulni@hotmail.fr', 'def0c7d0ee14435e86e05c87b3172593', 'klant', 'active'),
(52, 'Van Ransbeeck', 'Dries', 'Male', '2014-04-30', 'Driesstraat', 'Wemmel', '1780', 478913946, 'dries.van.ransbeeck@hotmail.co', '9885724135fa26026ff81a66103ebd6d', 'klant', 'active');

-- --------------------------------------------------------

--
-- Tabelstructuur voor tabel `reservatie`
--

CREATE TABLE `reservatie` (
  `reservatie_id` int(11) NOT NULL,
  `klant_id` int(11) NOT NULL,
  `kamer_id` int(11) NOT NULL,
  `aankomst_datum` date NOT NULL,
  `Vertrek_datum` date NOT NULL,
  `Statuut` varchar(30) NOT NULL,
  `tebetalen` varchar(250) NOT NULL,
  `betalingOk` varchar(3) NOT NULL DEFAULT 'No'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Gegevens worden geëxporteerd voor tabel `reservatie`
--

INSERT INTO `reservatie` (`reservatie_id`, `klant_id`, `kamer_id`, `aankomst_datum`, `Vertrek_datum`, `Statuut`, `tebetalen`, `betalingOk`) VALUES
(20, 49, 6, '2019-02-20', '2019-02-21', 'Cancelled', '60', 'No'),
(21, 27, 1, '2018-12-21', '2018-12-22', 'Cancelled', '50', 'No'),
(22, 27, 1, '2018-12-21', '2018-12-22', 'Cancelled', '50', 'No'),
(23, 51, 13, '2018-12-19', '2018-12-28', 'Cancelled', '540', 'No'),
(24, 27, 2, '2018-12-19', '2018-12-21', 'Cancelled', '120', 'No');

-- --------------------------------------------------------

--
-- Tabelstructuur voor tabel `soort_kamer`
--

CREATE TABLE `soort_kamer` (
  `soort_id` int(11) NOT NULL,
  `soort_kamer` varchar(300) NOT NULL,
  `beschrijving` longtext NOT NULL,
  `personen` text NOT NULL,
  `prijs` varchar(250) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Gegevens worden geëxporteerd voor tabel `soort_kamer`
--

INSERT INTO `soort_kamer` (`soort_id`, `soort_kamer`, `beschrijving`, `personen`, `prijs`) VALUES
(1, 'Classic Double Room', 'The classic double room has a size of 34m² / 365ft². The rooms has both a shower and a bathroom. There’s also free wifi, free toiletries, a coffee machine and tea making facilities, and there’s access to the spa and lounge.', '2', '50'),
(2, 'Deluxe Room', 'The deluxe room has a size of 34m² / 365ft². The rooms has a shower in the bathroom as well as free toiletries. There’s also free wifi. ', '2', '60'),
(3, 'Superior Room', 'The superior room has a size of 34m² / 365ft². It includes a bath in the bathroom. People that book this room will get free wifi, free toiletries as well as a free coffee machine and tea making facilities. ', '2 + 1 baby', '100');

--
-- Indexen voor geëxporteerde tabellen
--

--
-- Indexen voor tabel `contact`
--
ALTER TABLE `contact`
  ADD PRIMARY KEY (`Contact_ID`);

--
-- Indexen voor tabel `kamers`
--
ALTER TABLE `kamers`
  ADD PRIMARY KEY (`kamers_id`),
  ADD KEY `id_soort` (`id_soort`);

--
-- Indexen voor tabel `klanten`
--
ALTER TABLE `klanten`
  ADD PRIMARY KEY (`klant_id`);

--
-- Indexen voor tabel `reservatie`
--
ALTER TABLE `reservatie`
  ADD PRIMARY KEY (`reservatie_id`,`klant_id`,`kamer_id`),
  ADD KEY `klant_id` (`klant_id`),
  ADD KEY `kamer_id` (`kamer_id`);

--
-- Indexen voor tabel `soort_kamer`
--
ALTER TABLE `soort_kamer`
  ADD PRIMARY KEY (`soort_id`);

--
-- AUTO_INCREMENT voor geëxporteerde tabellen
--

--
-- AUTO_INCREMENT voor een tabel `contact`
--
ALTER TABLE `contact`
  MODIFY `Contact_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT voor een tabel `kamers`
--
ALTER TABLE `kamers`
  MODIFY `kamers_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT voor een tabel `klanten`
--
ALTER TABLE `klanten`
  MODIFY `klant_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=53;

--
-- AUTO_INCREMENT voor een tabel `reservatie`
--
ALTER TABLE `reservatie`
  MODIFY `reservatie_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT voor een tabel `soort_kamer`
--
ALTER TABLE `soort_kamer`
  MODIFY `soort_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Beperkingen voor geëxporteerde tabellen
--

--
-- Beperkingen voor tabel `kamers`
--
ALTER TABLE `kamers`
  ADD CONSTRAINT `kamers_ibfk_1` FOREIGN KEY (`id_soort`) REFERENCES `soort_kamer` (`soort_id`);

--
-- Beperkingen voor tabel `reservatie`
--
ALTER TABLE `reservatie`
  ADD CONSTRAINT `reservatie_ibfk_1` FOREIGN KEY (`klant_id`) REFERENCES `klanten` (`klant_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `reservatie_ibfk_2` FOREIGN KEY (`kamer_id`) REFERENCES `kamers` (`kamers_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
