import { connectionPool } from './db.js';

// Get the name of the picture that corresponds with kepId
export function getKep(kepId) {
  return connectionPool.query(`SELECT kep_name 
                               FROM Kep
                               WHERE kep_id = ?`, [kepId]);
}

// Get all the pictures associated with an announcement
export function getAnnouncementKepek(announcementId) {
  return connectionPool.query(`SELECT kep_id, kep_name 
                               FROM Kep
                               WHERE announcement_id = ?;`, [announcementId]);
}

// Insert new picture into Kep table
export function insertKep(filename, hirdetesId) {
  return connectionPool.query(`INSERT INTO Kep
                               VALUES (default,?, ?)`, [hirdetesId, filename]);
}

// Update picture in Kep table (in case user uploads another picture )
export function updateKep(filename, kepId) {
  return connectionPool.query(`UPDATE Kep
                               SET
                                  kep_name = ?
                               WHERE
                                  kep_id = ?;`, [filename, kepId]);
}

// Delete a picture with a certain Id
export function deleteKepId(kepId) {
  return connectionPool.query(`DELETE FROM Kep
                               WHERE kep_id = ?;`, [kepId]);
}

// Delete all pictures for an announcement
export function deleteAnnouncementPictures(id) {
  return connectionPool.query(`DELETE FROM Kep
                               WHERE announcement_id = ?;`, [id]);
}
