-- az alábbi sor törli az adatbázist ha nem létezik
-- DROP DATABASE IF EXISTS Auto;

-- készít egy adatbázist
CREATE DATABASE IF NOT EXISTS Auto;

-- készít egy felhasználót, aki minden műveletet végrehajthat ezen adatbázisban
USE Auto;
CREATE USER 'user'@'localhost' IDENTIFIED BY 'godbless123!';
GRANT ALL PRIVILEGES ON Auto.* TO 'user'@'localhost';