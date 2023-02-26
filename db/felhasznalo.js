import { connectionPool } from './db.js';

// Find all users from the Users table
export function findAllUsers() {
  return connectionPool.query(`SELECT user_id, username, email 
                               FROM Felhasznalo
                               WHERE role = 'user'`);
}

// Find all users that follow a certain username pattern
export function findAllUsersLike(search) {
  return connectionPool.query(`SELECT user_id, username, email 
                               FROM Felhasznalo
                               WHERE role = 'user' AND username LIKE ?`, [`${search}%`]);
}

// Find a user's details by their email
export function findUserDetailsByEmail(email) {
  return connectionPool.query(`SELECT password, role, user_id, username FROM Felhasznalo
                                WHERE email = ?`, [email]);
}

// Find a user's details by their id
export function findUserDetailsById(id) {
  return connectionPool.query(`SELECT username, email, phone FROM Felhasznalo
                                WHERE user_id = ?`, [id]);
}

// Insert a new user in the Users table
export function insertUser(username, password, email, phone) {
  return connectionPool.query(`INSERT INTO Felhasznalo 
                               VALUES (default, ?, ?, ?, ?, 'user')`, [username, password, phone, email]);
}

// Delete a user from the Users table
export function deleteUser(id) {
  return connectionPool.query(`DELETE FROM felhasznalo
                               WHERE user_id = ? ;`, [id]);
}
