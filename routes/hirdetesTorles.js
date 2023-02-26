import { Router } from 'express';
import * as dbh from '../db/hirdetes.js';
import * as dbk from '../db/kep.js';
import * as dbo from '../db/offer.js';

// felépítünk egy moduláris routert
const router = Router();

router.get('/', async (request, response) => {
  try {
    await dbo.deleteAnnouncementOffers(request.query.id);
    await dbk.deleteAnnouncementPictures(request.query.id);
    await dbh.deleteAnnouncementById(request.query.id);
    const [rows] = await dbh.findAllAnnouncements();
    response.render('hirdetes', { hirdetesek: rows, username: request.session.username, role: request.session.role });
  } catch (err) {
    response.status(500).render('error', { message: err });
  }
});

export default router;
