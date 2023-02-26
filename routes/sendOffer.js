import { Router } from 'express';
import bodyParser from 'body-parser';
import * as dbo from '../db/offer.js';

// felépítünk egy moduláris routert
const router = Router();

router.use(bodyParser.json());
// hirdetes szuras az adatbazisba, majd osszes hirdetes kiirasa
router.post('/', async (request, response) => {
  try {
    request.body.userName = request.session.user;
    await dbo.insertOffer(request);
  } catch (err) {
    response.render('error', { message: err });
  }
});

export default router;
