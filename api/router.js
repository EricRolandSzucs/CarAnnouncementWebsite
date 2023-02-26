import express from 'express';
import * as dbk from '../db/kep.js';
import * as dbh from '../db/hirdetes.js';
import * as dbf from '../db/felhasznalo.js';
import * as dbo from '../db/offer.js';

const router = express.Router();

// Find announcement details based on a specific ID (main_oldal.js)
router.get('/announcement/:id', async (req, res) => {
  try {
    const [[announcement]] = await dbh.findAnnouncementWithId(req.params.id);
    res.set('Content-Type', 'application/json');
    res.send(JSON.stringify(announcement));
  } catch (err) {
    console.error(err);
    res.status(500);
    res.send('Error');
  }
});

// Deletes a picture based on a specific ID (kep_toltes_check.js)
router.delete('/picture/:id', async (req, res) => {
  try {
    await dbk.deleteKepId(req.params.id);
    res.status(204);
    res.send();
  } catch (err) {
    console.error(err);
    res.status(500);
    res.send(err);
  }
});

// Checks if there are any new offers for a user (nav_check.js (removed for now))
router.get('/offer/new/:user', async (req, res) => {
  try {
    const [result] = await dbo.newOffers(req.params.user);
    if (result.length !== 0) {
      res.status(200);
      res.send();
    } else {
      res.status(204);
      res.send();
    }
  } catch (err) {
    console.error(err);
    res.status(500);
    res.send(err);
  }
});

// Deletes the offer to show that it has been ignored (offer_check.js)
router.delete('/offer/ignore/:id', async (req, res) => {
  try {
    await dbo.deleteOffer(req.params.id);
    res.status(204);
    res.send();
  } catch (err) {
    console.error(err);
    res.status(500);
    res.send(err);
  }
});

// Updates the offer state to show that it has been declined (offer_check.js)
router.put('/offer/decline/:id', async (req, res) => {
  try {
    await dbo.updateOffer(req.params.id, 2);
    res.status(204);
    res.send();
  } catch (err) {
    console.error(err);
    res.status(500);
    res.send(err);
  }
});

// Updates the offer state to show that it has been accepted (offer_check.js)
router.put('/offer/accept/:id', async (req, res) => {
  try {
    await dbo.updateOffer(req.params.id, 1);
    res.status(204);
    res.send();
  } catch (err) {
    console.error(err);
    res.status(500);
    res.send(err);
  }
});

router.get('/user/search/', async (req, res) => {
  try {
    req.params.search = '';
    const [result] = await dbf.findAllUsersLike(req.params.search);
    res.render('userlist', { users: result });
  } catch (err) {
    console.error(err);
    res.status(500);
    res.send(err);
  }
});
// Finds all users that follow a certain pattern (felhasznalo_torles.js)
router.get('/user/search/:search', async (req, res) => {
  try {
    const [result] = await dbf.findAllUsersLike(req.params.search);
    res.render('userlist', { users: result });
  } catch (err) {
    console.error(err);
    res.status(500);
    res.send(err);
  }
});

// Selects all the details of a specific user. (offer_check.js)
router.get('/user/details/:id', async (req, res) => {
  try {
    const [[results]] = await dbf.findUserDetailsById(req.params.id);
    res.set('Content-Type', 'application/json');
    res.send(JSON.stringify(results));
  } catch (err) {
    console.error(err);
    res.status(500);
    res.send(err);
  }
});

// Deletes a user in the user list. (felhasznalo_torles.js)
router.delete('/user/delete/:id', async (req, res) => {
  try {
    await dbf.deleteUser(req.params.id);
    res.status(204);
    res.send();
  } catch (err) {
    console.error(err);
    res.status(500);
    res.send(err);
  }
});

export default router;
