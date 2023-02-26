import { Router } from 'express';
import { body, validationResult } from 'express-validator';
import * as dbh from '../db/hirdetes.js';

// felépítünk egy moduláris routert
const router = Router();

// adat validalas
router.post(
  '/',
  body('title').notEmpty().withMessage('Title field is mandatory.').custom((field) => /^[A-Z]{1}[ 0-9!,;:()a-zA-Z]+$/.test(field))
    .withMessage('Wrong format for field Title. Title can contain only letters, numbers and punctuation and starts with a capital letter.'),
  body('model').notEmpty().withMessage('Model field is mandatory.').custom((field) => /^[A-Z]{1}[A-Z0-9 a-z]+$/.test(field))
    .withMessage('Wrong format for field Model. Model can contain only letters and starts with a capital letter.'),
  body('distance').notEmpty().withMessage('Distance field is mandatory.').custom((field) => /^[0-9]*$/.test(field))
    .withMessage('Wrong format for field distance. Distance can contain only numbers and is bigger than 0.'),
  body('year').notEmpty().withMessage('Year field is mandatory.').custom((field) => /^[1-9]{1}[0-9]{3}$/.test(field))
    .withMessage('Wrong format for field year. Year is a 4 digit number.'),
  body('power').notEmpty().withMessage('Power field is mandatory.').custom((field) => /^[0-9]*$/.test(field))
    .withMessage('Wrong format for field power. Power can only contain numbers.'),
  body('marka').notEmpty().withMessage('Marka field is mandatory.').custom((field) => /^[A-Z]{1}[a-zA-Z]+$/.test(field))
    .withMessage('Wrong format for field Marka. Marka can contain only letters and starts with a capital letter.'),
  body('uzemanyag').notEmpty().withMessage('Fuel field is mandatory.').custom((field) => /^[A-Z]{1}[a-zA-Z]+$/.test(field))
    .withMessage('Wrong format for field Fuel. Fuel can contain only letters and starts with a capital letter.'),
  body('varos').notEmpty().withMessage('City field is mandatory.').custom((field) => /^[A-Z]{1}[a-z]+$/.test(field))
    .withMessage('Wrong format for field City. City can contain only letters and starts with a capital letter.'),
  body('ar').notEmpty().withMessage('Ar field is mandatory.').custom((field) => /^[1-9]{1}[0-9]*$/.test(field))
    .withMessage('Wrong format for field Ar. Ar can contain only numbers and is bigger than 0.'),
  async (request, response, next) =>  {
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
      response.render('hirdetes_toltes', { errors: JSON.stringify(errors.array(), null, ' '), username: request.session.username, role: request.session.role });
    } else {
      next();
    }
  },
);

// hirdetes szuras az adatbazisba, majd osszes hirdetes kiirasa
router.post('/', async (request, response) => {
  try {
    request.body.userName = request.session.user;
    await dbh.insertAnnouncement(request);
  } catch (err) {
    return response.render('hirdetes_toltes', { errors: err, username: request.session.username, role: request.session.role });
  }
  try {
    const [hirdetesek] = await dbh.findAllAnnouncements();
    return response.render('hirdetes', { hirdetesek, username: request.session.username, role: request.session.role });
  } catch (err) {
    return response.render('hirdetes_toltes', {
      errors: err, username: request.session.username, role: request.session.role,
    });
  }
});

export default router;
