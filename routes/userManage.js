import { Router } from 'express';
import * as dbf from '../db/felhasznalo.js';

// felépítünk egy moduláris routert
const router = Router();

router.get('/', async (request, response) => {
  try {
    const [users] = await dbf.findAllUsers();
    response.render('users', { users, username: request.session.username, role: request.session.role });
  } catch (err) {
    response.status(500).render('error', { message: err });
  }
});

export default router;
