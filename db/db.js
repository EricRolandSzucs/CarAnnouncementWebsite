import mysql2 from 'mysql2/promise.js';

// CONNECTION
// Connection to mysql
export const connectionPool = mysql2.createPool({
  host: '127.0.0.1', port: 3306, user: 'user', password: 'godbless123!', database: 'Auto', connectionLimit: 5,
});

// TABLE CREATION
// Creating table Felhasznalo
export function createTableFelhasznalo() {
  return connectionPool.query(`CREATE TABLE IF NOT EXISTS Felhasznalo 
                               (user_id INT PRIMARY KEY AUTO_INCREMENT,
                                username VARCHAR(64),
                                password VARCHAR(256),
                                phone VARCHAR(64),
                                email VARCHAR(100),
                                role VARCHAR(64))
                                `);
}

// Creating table Hirdetes
export function createTableHirdetes() {
  return connectionPool.query(`CREATE TABLE IF NOT EXISTS Hirdetes 
                               (id INT PRIMARY KEY AUTO_INCREMENT,
                                title VARCHAR(100),
                                marka VARCHAR(64),
                                model VARCHAR(100),
                                distance INT,
                                year INT,
                                power INT,
                                uzemanyag VARCHAR(100),
                                varos VARCHAR(64),
                                ar INT,
                                datum TIMESTAMP,
                                user_id INT,
                                FOREIGN KEY (user_id) REFERENCES Felhasznalo(user_id))`);
}

// Creating table Kep
export function createTableKep() {
  return connectionPool.query(`CREATE TABLE IF NOT EXISTS Kep 
                               (kep_id INT PRIMARY KEY AUTO_INCREMENT,
                                announcement_id INT,
                                kep_name VARCHAR(256),
                                FOREIGN KEY (announcement_id) REFERENCES Hirdetes(id))`);
}

// Creating table Offers
export function createTableOffers() {
  return connectionPool.query(`CREATE TABLE IF NOT EXISTS Offers 
                               (offer_id INT PRIMARY KEY AUTO_INCREMENT,
                                announcement_id INT,
                                amount INT,
                                message VARCHAR(5000),
                                seller_id INT,
                                buyer_id INT,
                                buyer_ignored BOOLEAN,
                                offer_status INT,
                                FOREIGN KEY (announcement_id) REFERENCES Hirdetes(id),
                                FOREIGN KEY (seller_id) REFERENCES Felhasznalo(user_id),
                                FOREIGN KEY (buyer_id) REFERENCES Felhasznalo(user_id))`);
}

createTableFelhasznalo();
createTableHirdetes();
createTableKep();
createTableOffers();
