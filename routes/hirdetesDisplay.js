import { Router } from 'express';
import * as db from '../db/hirdetes.js';

// felépítünk egy moduláris routert
const router = Router();

// osszes announcement kiirasa
router.get('/', async (req, res) => {
  try {
    const [rows] = await db.findAllAnnouncements();
    res.render('hirdetes', { hirdetesek: rows, username: req.session.username, role: req.session.role });
  } catch (err) {
    res.status(500).render('error', { message: err });
  }
});

export default router;
