CREATE TABLE `prueba` (
  `cod` INT(11) NOT NULL,
  `nombre` VARCHAR(100) NOT NULL,
  `cedula` INT(11) NOT NULL,
  `descripcion` VARCHAR(200) NOT NULL
) ENGINE=MYISAM DEFAULT CHARSET=latin1;

INSERT INTO `prueba` (`cod`, `nombre`, `cedula`, `descripcion`) VALUES
(1, 'Juan Molina', 231456523, 'Es una descripacion de prueba 1'),
(2, 'Johnny Molina', 235687452, 'Es una descripacion de prueba 2'),
(3, 'John Molina', 123545212, 'Es una descripacion de prueba 3');

ALTER TABLE `prueba`
  ADD PRIMARY KEY (`cod`);

ALTER TABLE `prueba`
  MODIFY `cod` INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;