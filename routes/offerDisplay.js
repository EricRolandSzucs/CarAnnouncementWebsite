import { Router } from 'express';
import * as dbo from '../db/offer.js';

// felépítünk egy moduláris routert
const router = Router();

router.get('/', async (request, response) => {
  try {
    const [offers] = await dbo.findOfferState(request.session.user, 0);
    const [offersA] = await dbo.findOfferState(request.session.user, 1);
    const [offersY] = await dbo.findBuyerOffers(request.session.user);
    response.render('offers', {
      offers, offersA, offersY, username: request.session.username, role: request.session.role,
    });
  } catch (err) {
    response.status(500).render('error', { message: err });
  }
});

export default router;
