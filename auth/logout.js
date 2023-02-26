import { Router } from 'express';
import session from 'express-session';

// felépítünk egy moduláris routert
const router = Router();

router.get('/', (req, res, next) => {
  req.session.destroy(async (err) => {
    if (err) {
      res.status(500).render('error', { message: `Session reset error: ${err.message}` });
    } else {
      next();
    }
  });
});

router.use(session({
  secret: '142e6ecf42884f03',
  resave: false,
  saveUninitialized: true,
}));

router.get('/', async (req, res) => {
  try {
    res.render('login', { username: req.session.username, role: req.session.role });
  } catch (error) {
    res.status(500).render('error', { message: error });
  }
});

export default router;
