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
  hashAlgorithm = 'sha512',
  iterations = 1000;

// adat validalas
router.post(
  '/',
  body('formEmail').notEmpty().withMessage('Email field is mandatory.').custom((field) => /^\S+@\S+$/.test(field))
    .withMessage('Wrong format for field Email. Please enter a valid email address.'),
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
  try {
    const [[details]] = await dbf.findUserDetailsByEmail(req.body.formEmail);
    const hashWithSalt = details.password;
    const { role } = details;
    const user = details.user_id;
    const { password } = req.body;
    const { username } = details;
    // hexa string dekódolás és dekonkatenálás
    const expectedHash = hashWithSalt.substring(0, hashSize * 2),
      salt = Buffer.from(hashWithSalt.substring(hashSize * 2), 'hex');
    // újra-hash-elés
    const binaryHash = await pbkdf2(password, salt, iterations, hashSize, hashAlgorithm);
    // hexa stringgé alakítás
    const actualHash = binaryHash.toString('hex');

    if (expectedHash === actualHash) {
      req.session.username = username;
      req.session.role = role;
      req.session.user = user;
      next();
    } else {
      res.status(401).render('error', { message: 'Username/password combination incorrect.' });
    }
  } catch (err) {
    res.status(401).render('error', { message: 'User does not exist' });
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
