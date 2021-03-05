-- phpMyAdmin SQL Dump
-- version 4.9.5
-- https://www.phpmyadmin.net/
--
-- Värd: localhost:3306
-- Tid vid skapande: 05 mars 2021 kl 17:15
-- Serverversion: 5.7.24
-- PHP-version: 7.4.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Databas: `sottogott`
--

-- --------------------------------------------------------

--
-- Tabellstruktur `cart`
--

CREATE TABLE `cart` (
  `userId` int(9) NOT NULL,
  `productId` int(9) DEFAULT NULL,
  `quantity` int(9) NOT NULL,
  `offerName` varchar(250) DEFAULT NULL,
  `cartId` int(9) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Tabellstruktur `category`
--

CREATE TABLE `category` (
  `categoryId` int(9) NOT NULL,
  `name` varchar(250) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumpning av Data i tabell `category`
--

INSERT INTO `category` (`categoryId`, `name`) VALUES
(1, 'Godis'),
(2, 'Läsk'),
(3, 'Snacks'),
(4, 'Choklad');

-- --------------------------------------------------------

--
-- Tabellstruktur `newsletter`
--

CREATE TABLE `newsletter` (
  `newsId` int(9) NOT NULL,
  `userId` int(11) DEFAULT NULL,
  `email` varchar(250) DEFAULT NULL,
  `name` varchar(250) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Tabellstruktur `offer`
--

CREATE TABLE `offer` (
  `offerName` varchar(250) NOT NULL,
  `discount` int(9) NOT NULL,
  `productId` int(9) NOT NULL,
  `quantity` int(9) NOT NULL,
  `price` int(9) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumpning av Data i tabell `offer`
--

INSERT INTO `offer` (`offerName`, `discount`, `productId`, `quantity`, `price`) VALUES
('Gamer kit', 10, 32, 2, NULL),
('Gamer kit', 10, 37, 1, NULL),
('Gamer kit', 10, 39, 1, NULL),
('Gamer kit', 10, 41, 2, NULL),
('Hemmakväll', 10, 1, 1, NULL),
('Hemmakväll', 10, 13, 1, NULL),
('Hemmakväll', 10, 31, 2, NULL),
('Hemmakväll', 10, 32, 2, NULL),
('Hemmakväll', 10, 37, 1, NULL),
('Hemmakväll', 10, 39, 1, NULL),
('Monsterpaket', 10, 1, 2, NULL),
('Monsterpaket', 10, 13, 2, NULL),
('Monsterpaket', 10, 31, 2, NULL),
('Monsterpaket', 10, 32, 2, NULL),
('Monsterpaket', 10, 37, 2, NULL),
('Monsterpaket', 10, 38, 2, NULL),
('Ostig vanlij dröm', 10, 39, 2, NULL),
('Törstig', 10, 31, 2, NULL),
('Törstig', 10, 32, 2, NULL),
('Törstig', 10, 41, 2, NULL),
('Törstig', 10, 43, 2, NULL),
('Törstig', 10, 44, 2, NULL);

-- --------------------------------------------------------

--
-- Tabellstruktur `orderdetails`
--

CREATE TABLE `orderdetails` (
  `productId` int(9) DEFAULT NULL,
  `orderId` int(9) NOT NULL,
  `quantity` int(9) NOT NULL,
  `unitPrice` int(9) NOT NULL,
  `offerName` varchar(250) DEFAULT NULL,
  `id` int(9) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Tabellstruktur `orders`
--

CREATE TABLE `orders` (
  `orderId` int(9) NOT NULL,
  `userId` int(9) NOT NULL,
  `orderDate` varchar(250) NOT NULL,
  `shipped` tinyint(1) DEFAULT NULL,
  `shippingId` int(9) NOT NULL,
  `pending` int(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Tabellstruktur `product`
--

CREATE TABLE `product` (
  `productId` int(9) NOT NULL,
  `productName` varchar(250) NOT NULL,
  `price` decimal(9,0) NOT NULL,
  `description` text NOT NULL,
  `unitsInStock` int(9) DEFAULT NULL,
  `categoryId` int(9) NOT NULL,
  `img` varchar(400) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumpning av Data i tabell `product`
--

INSERT INTO `product` (`productId`, `productName`, `price`, `description`, `unitsInStock`, `categoryId`, `img`) VALUES
(1, 'Bubs Hallon/Lakrits Skalle 90g', '10', 'Glukos-fruktossirap, socker, majsstärkelse, vatten, salmiak, lakrits, surhetsreglerande medel (äppelsyra, natriumcitrat), aromämnen, färgämnen (svart morotskoncentrat , E153), salt, kokosolja, ytbehandlingsmedel (karnaubavax).', 172, 1, '../../assets/products/hallonlakrits.png'),
(13, 'Cloetta Ahlgrens Bilar Travel Bag 400g', '50', 'glukossirap, socker, stärkelse, gelatin, invertsockersirap, syra (e270), kokosolja, aromer, ytbehandlingsmedel (karnaubavax), färgämnen (e141, e120).', 162, 1, '../../assets/products/ahlgrens.png'),
(31, 'Trocadero', '10', 'läskedryck', 159, 1, '../../assets/products/trocadero.png'),
(32, 'Coca Cola', '10', 'supergott', 62, 2, '../../assets/products/coca_cola.png'),
(37, 'Olw grill chips 175g', '20', 'Ingredienser:\nPotatis, solrosolja, kryddblandning (lök, MALTODEXTRIN, salt, druvsocker, jästextrakt, naturlig arom)\n', 76, 3, '../../assets/products/1614611388grillchips.png'),
(38, 'Bjäre chips varsamt saltade 200g', '25', 'Ingredienser:\r\nPotatis, rapsolja, salt, socker, mjölksocker, lök, jästextrakt, surhetsreglerande medel (mjölksyra) vitlök, persilja, arom, kryddextrakt (lök).\r\n\r\n\r\n\r\n', 90, 3, '../../assets/products/1614611515bjarechips.png'),
(39, 'Mais balls cheese 125g ', '18', 'Ingredienser:\nsemoule de maïs 67,5%, huile végétale (palme, tournesol), sel, maltodextrine, dextrose, exhausteur de gout: E621, E627, E631; lait en poudre écrémé, lactosérum en poudre, fromage en poudre 0,3%\n', 54, 3, '../../assets/products/1614611546maisballs.png'),
(40, 'Estrella salted popcorn 65g', '25', 'ngredienser:\nMajskärnor, solrosolja, vegetabilisk olja, salt. Salt 3,5 %.\n', 96, 3, '../../assets/products/1614611576popcorn.png'),
(41, 'Nocco focus 4 legend soda', '25', 'Ingredients:\r\ncarbonated water, caffeine, green tea extract, vitamins (niacin, vitamin B6, folic acid, biotin, vitamin D, vitamin B12), acidity regulator (citric acid), aroma, sweetener (sucralose)´\r\n\r\n', 100, 2, '../../assets/products/1614700347nocco.png'),
(42, 'Guarana antarctica', '20', 'Ingredients:\nCarbonated water, sugar, acidity regulators: citric acid, guarana extract, preservatives (E211, E202), colorant: sugar color (E150d), natural flavors, ascorbic acid.\n', 100, 2, '../../assets/products/1614700368guarana.png'),
(43, 'Pepsi twist', '20', 'Ingredients:\nCarbonated water, sugar, dye (E150d), flavor, acid (phosphoric acid, citric acid), acidity regulator (sodium citrate), preservative (sodium benzoate), caffeine aroma\n', 100, 2, '../../assets/products/1614700388pepsitwist.png'),
(44, 'Dr Pepper Vanilla Float', '20', 'Ingredients:\nCarbonated water, high fructose corn syrup, dye (E150d), preservatives (E211), acidity regulators (E330, E338), flavorings, caffeine (11mg / 100ml), acidity regulators (E339)\n', 100, 2, '../../assets/products/1614700405drpepvanfloat.png'),
(45, 'Tyrkisk Peber', '30', 'Innehåll\nSocker, glukossirap, ammoniumklorid (salmiak), lakritsextrakt, salt, aromer, vegetabilisk olja (ryps), färgämne (E153).\n', 100, 1, '../../assets/products/1614700440tyrkiskpeber.png'),
(46, 'Toms Pingvin Saltpastiller 270g', '20', 'ngredienser: modificeret majsstivelse/modifierad majsstärkelse, sukker/socker, ammoniumklorid 8%, oksegelatine/storfe-/nötgelatin, rålakrids 4%, fortykningsmiddel/förtjockningmedel (arabisk gummi), salt, aromaer/aromämnen, vegetabilsk olie/olje/olja (palme, palmekerne/-kjerne/palmkärna, kokos), overfladebehandlingsmiddel/ytbehandlingsmedel (carnaubavoks/-vax).', 100, 1, '../../assets/products/1614700469tomspingvin.png'),
(47, 'Marabou MjölkChoklad', '16', 'Producerad i Sverige', 100, 4, '../../assets/products/1614700493choklad.png'),
(48, 'Marabou daim dubbel', '8', 'INGREDIENSER\nSocker, palmolja/palmeolie, kakaosmör*, kakaomassa*, MANDEL (3%), vassle-/valle-/mysepulver (MJÖLK/MÆLK/MELK), SKUMMJÖLKSPULVER, SMÖRFETT/SMØROLIE/MELKEFETT, vassle-/valle-/myseprodukt (MJÖLK), sockrad kondenserad SKUMMJÖLK, salt, emulgeringsmedel/emulgator (SOJALECITIN), aromer\n', 100, 4, '../../assets/products/1614700506daim.png'),
(49, 'Snickers 3-pack', '19', 'Ingredienser:\nsocker/sukker, glukossirap/glukosesirup,\nJORDNÖTTER/JORDNØDDER/PEANØTTER,\nSKUMMJÖLKSPULVER/SKUMMETMÆLKSPULVER/MELKEPULVER av SKUMMET MELK, kakaosmör/kakaosmør, kakaomassa/masse,LAKTOS, solrosolja/solsikkeolie, MJÖLK-/MÆLKE-/MELKEFETT,vassle-/valle-/myse-pulver (av MJÖLK/MÆLK/MELK ), palmfett, salt,emulgeringsmedel / emulgator \n', 100, 4, '../../assets/products/1614700553Snickers.png'),
(50, 'Twix 3-pack', '19', 'Ingredienser:\nsocker/sukker, glukossirap/glukosesirup, VETEMJÖL/HVEDEMEL/HVETEMEL, palmfett, kakaosmör/kakaosmør, SKUMMJÖLKSPULVER/SKUMMETMÆLKSPULVER/MELKEPULVER av SKUMMET MELK, kakaomassa/masse, MJÖLK-/MÆLKE-/MELKEFETT, LAKTOS, vassle-/valle-/myse-pulver (av MJÖLK/MÆLK/MELK), emulgatorer / emulgeringsmedel (SOJA-/SOYALECITIN, E442), salt, fettreducerat / fedtfattigt kakaopulver, jäsningsmedel / hævemiddel (E500), naturlig vaniljekstrakt. (Kan innehålla: HASSEL-NÖT/-NØD/-NØTT, MANDEL, KORN/BYG, HAVRE). Mindst 25% kakaotørstof.\n', 98, 4, '../../assets/products/1614700577twix.png');

-- --------------------------------------------------------

--
-- Tabellstruktur `shipping`
--

CREATE TABLE `shipping` (
  `shippingId` int(9) NOT NULL,
  `companyName` varchar(250) NOT NULL,
  `shippingPrice` int(9) NOT NULL,
  `description` varchar(250) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumpning av Data i tabell `shipping`
--

INSERT INTO `shipping` (`shippingId`, `companyName`, `shippingPrice`, `description`) VALUES
(1, 'PostNord', 49, 'Levereras inom 3-5 dagar till din brevlåda eller närmaste utlämningsställe '),
(2, 'Upphämtning', 0, 'Du hämtar din vara hos oss inom 24h'),
(3, 'Hemleverans', 99, 'Vi leverar din beställning direkt hem till dig inom 40 min');

-- --------------------------------------------------------

--
-- Tabellstruktur `user`
--

CREATE TABLE `user` (
  `userId` int(9) NOT NULL,
  `name` varchar(250) NOT NULL,
  `userName` varchar(250) NOT NULL,
  `password` varchar(250) NOT NULL,
  `email` varchar(250) NOT NULL,
  `address` varchar(250) NOT NULL,
  `zipCode` int(9) NOT NULL,
  `phoneNr` int(9) NOT NULL,
  `isAdmin` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumpning av Data i tabell `user`
--

INSERT INTO `user` (`userId`, `name`, `userName`, `password`, `email`, `address`, `zipCode`, `phoneNr`, `isAdmin`) VALUES
(1, 'Admin', 'Admin', '$2y$10$6zwIlCEnNEy4fS19iEKsn.omugnlX6tEKoFwY3efcEgK1XEjppUHi', 'Admin@Admin.se', 'Admin', 1111, 1111, 1),
(6, '123', '123', '$2y$10$QrUpv2KLPE3Q4ujNbF69duuecnrFtl7qmxfoDwNAl8BvwZoo.MCtG', '123', '123', 123, 123, 0);

--
-- Index för dumpade tabeller
--

--
-- Index för tabell `cart`
--
ALTER TABLE `cart`
  ADD PRIMARY KEY (`cartId`),
  ADD UNIQUE KEY `userId_2` (`userId`,`productId`) USING BTREE,
  ADD UNIQUE KEY `userId_3` (`userId`,`offerName`),
  ADD KEY `userID` (`userId`),
  ADD KEY `productID` (`productId`),
  ADD KEY `offerName` (`offerName`) USING BTREE;

--
-- Index för tabell `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`categoryId`);

--
-- Index för tabell `newsletter`
--
ALTER TABLE `newsletter`
  ADD PRIMARY KEY (`newsId`),
  ADD KEY `userID` (`userId`);

--
-- Index för tabell `offer`
--
ALTER TABLE `offer`
  ADD PRIMARY KEY (`offerName`,`productId`),
  ADD KEY `productId` (`productId`);

--
-- Index för tabell `orderdetails`
--
ALTER TABLE `orderdetails`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `productId_2` (`productId`,`orderId`),
  ADD UNIQUE KEY `orderId_2` (`orderId`,`offerName`),
  ADD KEY `productID` (`productId`),
  ADD KEY `orderID` (`orderId`),
  ADD KEY `offerName` (`offerName`);

--
-- Index för tabell `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`orderId`),
  ADD KEY `userID` (`userId`),
  ADD KEY `shippingId` (`shippingId`) USING BTREE;

--
-- Index för tabell `product`
--
ALTER TABLE `product`
  ADD PRIMARY KEY (`productId`),
  ADD KEY `categoryID` (`categoryId`);

--
-- Index för tabell `shipping`
--
ALTER TABLE `shipping`
  ADD PRIMARY KEY (`shippingId`);

--
-- Index för tabell `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`userId`);

--
-- AUTO_INCREMENT för dumpade tabeller
--

--
-- AUTO_INCREMENT för tabell `cart`
--
ALTER TABLE `cart`
  MODIFY `cartId` int(9) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=423;

--
-- AUTO_INCREMENT för tabell `category`
--
ALTER TABLE `category`
  MODIFY `categoryId` int(9) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT för tabell `newsletter`
--
ALTER TABLE `newsletter`
  MODIFY `newsId` int(9) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT för tabell `orderdetails`
--
ALTER TABLE `orderdetails`
  MODIFY `id` int(9) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=203;

--
-- AUTO_INCREMENT för tabell `orders`
--
ALTER TABLE `orders`
  MODIFY `orderId` int(9) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=154;

--
-- AUTO_INCREMENT för tabell `product`
--
ALTER TABLE `product`
  MODIFY `productId` int(9) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=51;

--
-- AUTO_INCREMENT för tabell `shipping`
--
ALTER TABLE `shipping`
  MODIFY `shippingId` int(9) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT för tabell `user`
--
ALTER TABLE `user`
  MODIFY `userId` int(9) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- Restriktioner för dumpade tabeller
--

--
-- Restriktioner för tabell `cart`
--
ALTER TABLE `cart`
  ADD CONSTRAINT `cart_ibfk_1` FOREIGN KEY (`productId`) REFERENCES `product` (`productId`),
  ADD CONSTRAINT `cart_ibfk_2` FOREIGN KEY (`userId`) REFERENCES `user` (`userId`),
  ADD CONSTRAINT `cart_ibfk_3` FOREIGN KEY (`offerName`) REFERENCES `offer` (`offerName`);

--
-- Restriktioner för tabell `newsletter`
--
ALTER TABLE `newsletter`
  ADD CONSTRAINT `newsletter_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `user` (`userId`);

--
-- Restriktioner för tabell `offer`
--
ALTER TABLE `offer`
  ADD CONSTRAINT `offer_ibfk_1` FOREIGN KEY (`productId`) REFERENCES `product` (`productId`);

--
-- Restriktioner för tabell `orderdetails`
--
ALTER TABLE `orderdetails`
  ADD CONSTRAINT `orderdetails_ibfk_1` FOREIGN KEY (`orderId`) REFERENCES `orders` (`orderId`),
  ADD CONSTRAINT `orderdetails_ibfk_2` FOREIGN KEY (`productId`) REFERENCES `product` (`productId`),
  ADD CONSTRAINT `orderdetails_ibfk_3` FOREIGN KEY (`offerName`) REFERENCES `offer` (`offerName`);

--
-- Restriktioner för tabell `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `user` (`userId`),
  ADD CONSTRAINT `orders_ibfk_2` FOREIGN KEY (`shippingId`) REFERENCES `shipping` (`shippingId`);

--
-- Restriktioner för tabell `product`
--
ALTER TABLE `product`
  ADD CONSTRAINT `product_ibfk_1` FOREIGN KEY (`categoryId`) REFERENCES `category` (`categoryId`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
