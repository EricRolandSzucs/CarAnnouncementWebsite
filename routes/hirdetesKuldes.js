import { Router } from 'express';

// felépítünk egy moduláris routert
const router = Router();

// announcement toltes file rendereles + user combobox
router.use('/', async (request, res) => {
  try {
    res.render('hirdetes_toltes', { errors: '', username: request.session.username, role: request.session.role });
  } catch (err) {
    res.status(500).render('error', { message: err });
  }
});

export default router;
