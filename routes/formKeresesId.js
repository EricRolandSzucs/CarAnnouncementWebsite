import { Router } from 'express';
import { body, validationResult } from 'express-validator';
import * as dbh from '../db/hirdetes.js';
import * as dbk from '../db/kep.js';

// felépítünk egy moduláris routert
const router = Router();

// adat validalas
router.post(
  '/',
  body('idSearch').notEmpty().withMessage('idSearch field is mandatory.').custom((field) => /^[0-9]+$/.test(field))
    .withMessage('Wrong format for field idSearch. idSearch can contain only numbers.'),
  (request, response, next) =>  {
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
      return response.status(400).render('error', { message: JSON.stringify(errors.array(), null, ' ') });
    }
    return next();
  },
);

// adat validalas - id letezese
router.post('/', async (request, res, next) => {
  try {
    const [id] = await dbh.idCheck(request);
    if (id.length === 0) {
      return res.status(500).render('error', { message: 'Id does not exist' });
    }
    return next();
  } catch (err) {
    return res.status(500).render('error', { message: err });
  }
});

// id szerint hirdetes keresese - POST
router.post('/', async (request, res) => {
  try {
    const [[userId]] = await dbh.findAnnouncementUserWithId(request.body.idSearch);
    const [[hirdetes]] = await dbh.findAnnouncementWithId(request.body.idSearch);
    const [kepek] = await dbk.getAnnouncementKepek(request.body.idSearch);
    if (request.session.user !== undefined && (userId.user_id === request.session.user || request.session.role === 'admin')) {
      res.render('idhirdetes', {
        hirdetes, kepek, username: request.session.username, role: request.session.role,
      });
    } else {
      res.render('idhirdetes_guest', {
        hirdetes, kepek, username: request.session.username, role: request.session.role,
      });
    }
  } catch (err) {
    res.status(500).render('error', { message: err });
  }
});

// id szerint hirdetes keresese - GET
router.get('/', async (request, res) => {
  try {
    const [[userId]] = await dbh.findAnnouncementUserWithId(request.query.idSearch);
    const [[hirdetes]] = await dbh.findAnnouncementWithId(request.query.idSearch);
    const [kepek] = await dbk.getAnnouncementKepek(request.query.idSearch);
    if (request.session.user !== undefined && (userId.user_id === request.session.user || request.session.role === 'admin')) {
      res.render('idhirdetes', {
        hirdetes, kepek, username: request.session.username, role: request.session.role,
      });
    } else {
      res.render('idhirdetes_guest', {
        hirdetes, kepek, username: request.session.username, role: request.session.role,
      });
    }
  } catch (err) {
    res.status(500).render('error', { message: err });
  }
});

export default router;
