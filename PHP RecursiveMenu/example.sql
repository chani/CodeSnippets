CREATE TABLE IF NOT EXISTS `catalogs` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `pid` bigint(20) NOT NULL,
  `name` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=6 ;

CREATE TABLE IF NOT EXISTS `products` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `pid` bigint(20) NOT NULL,
  `name` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=5 ;

INSERT INTO `catalogs` (`id`, `pid`, `name`) VALUES
(1, 0, 'Test 1'),
(2, 0, 'Test 2'),
(3, 1, 'Test 1.1'),
(4, 1, 'Test 1.2'),
(5, 2, 'Test 2.1');

INSERT INTO `products` (`id`, `pid`, `name`) VALUES
(1, 1, 'Product 1'),
(2, 1, 'Product 2'),
(3, 3, 'Product 3'),
(4, 3, 'Product 4');
