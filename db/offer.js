import { connectionPool } from './db.js';

// Find offers that belong to a particular seller and have a particular state
export function findOfferState(id, state) {
  return connectionPool.query(`SELECT * FROM Offers
                               WHERE seller_id = ? AND offer_status = ?`, [id, state]);
}

// Find all offers made by a user
export function findBuyerOffers(id) {
  return connectionPool.query(`SELECT * FROM Offers
                               WHERE buyer_id = ?`, [id]);
}

// Select all the offers that have not been accepted, declined or ignored yet
export function newOffers(userId) {
  return connectionPool.query(`SELECT 1 FROM Offers
                                 WHERE seller_id = ? and seen = 0`, [userId]);
}

// Update the status of an offer with 'value'
export function updateOffer(id, value) {
  return connectionPool.query(`UPDATE Offers
                               SET offer_status = ?
                               WHERE offer_id = ?`, [value, id]);
}

// Insert a new offer in the Offers table
export function insertOffer(offer) {
  return connectionPool.query(`INSERT INTO Offers
                               VALUES (default, ?, ?, ?, ?, ?, 0, 0)`, [offer.body.offerAnn, offer.body.offerId, offer.body.offerDesc, offer.body.offerTo, offer.body.userName]);
}

// Delete a particular offer
export function deleteOffer(id) {
  return connectionPool.query(`DELETE FROM Offers
                               WHERE offer_id = ?`, [id]);
}

// Delete all offers for a particular announcement id
export function deleteAnnouncementOffers(id) {
  return connectionPool.query(`DELETE FROM Offers
                               WHERE announcement_id = ?`, [id]);
}
