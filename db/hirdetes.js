import { connectionPool } from './db.js';

// Find all announcements from the Hirdetes table
export function findAllAnnouncements() {
  return connectionPool.query('SELECT id, title, marka, model, distance, year, power, uzemanyag, varos, ar, datum FROM Hirdetes');
}

// Find an announcement with a specific id from the Hirdetes table
export function findAnnouncementWithId(id) {
  return connectionPool.query(`SELECT id, title, marka, model, distance, year, power, uzemanyag, varos, ar, datum, user_id FROM Hirdetes
                               WHERE id = ?`, [id]);
}

// Find a specific announcement according to search parameters (marka, varos, arMin, arMax)
export function findAnnouncements(hir) {
  return connectionPool.query(`SELECT * FROM (SELECT id, title, marka, model, distance, year, power, uzemanyag, varos, ar, datum FROM Hirdetes) AS t
                               WHERE marka LIKE ? AND model LIKE ? AND distance >= ? AND distance <=? AND year >= ? AND year <= ? AND power >= ? AND power <= ? AND uzemanyag LIKE ? AND varos LIKE ? AND ar >= ? AND ar <= ? ;`, [hir.body.markaSearch, hir.body.modelSearch, parseInt(hir.body.distanceMin, 10), parseInt(hir.body.distanceMax, 10), parseInt(hir.body.yearMin, 10), parseInt(hir.body.yearMax, 10), parseInt(hir.body.powerMin, 10), parseInt(hir.body.powerMax, 10), hir.body.fuelSearch, hir.body.varosSearch, parseInt(hir.body.arMin, 10), parseInt(hir.body.arMax, 10)]);
}

// Find the user that published a specific announcement
export function findAnnouncementUserWithId(id) {
  return connectionPool.query(`SELECT user_id FROM Hirdetes
                               WHERE id = ? ;`, [id]);
}
// Check if an Id exists
export function idCheck(request) {
  return connectionPool.query(`SELECT 1 FROM Hirdetes
                                 WHERE id = ?;`, [request.body.idSearch]);
}

// Insert new announcement into Hirdetes table
export function insertAnnouncement(hirdetes) {
  return connectionPool.query(`INSERT INTO Hirdetes (id, title, marka, model, distance, year, power, uzemanyag, varos, ar, datum, user_id)
                               VALUES (default, ?, ?, ?, ?, ?, ?, ?, ?, ?, now(), ?)`, [hirdetes.body.title, hirdetes.body.marka, hirdetes.body.model, hirdetes.body.distance, hirdetes.body.year, hirdetes.body.power, hirdetes.body.uzemanyag, hirdetes.body.varos, hirdetes.body.ar, hirdetes.body.userName]);
}

// Delet an announcement based on id
export function deleteAnnouncementById(id) {
  return connectionPool.query(`DELETE FROM Hirdetes
                               WHERE id = ?;`, [id]);
}
