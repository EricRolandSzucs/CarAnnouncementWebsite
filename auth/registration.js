import { Router } from 'express';
import { body, validationResult } from 'express-validator';
import crypto from 'crypto';
import { promisify } from 'util';
import * as db from '../db/hirdetes.js';
import * as dbf from '../db/felhasznalo.js';

// felépítünk egy moduláris routert
const router = Router();

const pbkdf2 = promisify(crypto.pbkdf2);

const hashSize = 32,
  saltSize = 16,
  hashAlgorithm = 'sha512',
  iterations = 1000;

// adat validalas
router.post(
  '/',
  body('regEmail').notEmpty().withMessage('Email field is mandatory.').custom((field) => /^\S+@\S+$/.test(field))
    .withMessage('Wrong format for field Email. Please enter a valid email address.'),
  body('regUser').notEmpty().withMessage('User field is mandatory.').custom((field) => /^[A-za-z0-9]{4,24}$/.test(field))
    .withMessage('Wrong format for field User. Please enter a valid user address.'),
  body('password').custom((field) => /^.{12,}$/.test(field))
    .withMessage('Wrong format for field Password. Password is too short, please enter at least 12 characters.'),
  (request, response, next) =>  {
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
      return response.status(400).render('error', { message: JSON.stringify(errors.array(), null, ' ') });
    }
    return next();
  },
);

router.post('/', async (req, res, next) => {
  const { password } = req.body;
  const salt = crypto.randomBytes(saltSize);
  const hash = await pbkdf2(password, salt, iterations, hashSize, hashAlgorithm);
  const hashWithSalt = Buffer.concat([hash, salt]).toString('hex');
  // a konkatenált hash-t és sót tárolnánk adatbázisban
  try {
    await dbf.insertUser(req.body.regUser, hashWithSalt, req.body.regEmail, req.body.regPhone);
    next();
  } catch (err) {
    res.render('error', { message: err });
  }
});

// parametereknek megfelelo hirdetesek keresese
router.post('/', async (request, res) => {
  try {
    const [hirdetesek] = await db.findAllAnnouncements();
    res.render('hirdetes', { hirdetesek, username: request.session.username, role: request.session.role });
  } catch (err) {
    res.status(500).render('error', { message: err });
  }
});

export default router;
