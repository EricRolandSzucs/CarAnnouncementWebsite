import { Router } from 'express';

const router = Router();

router.use('/', (req, res, next) => {
  if (req.session.role === 'admin') {
    next();
  } else {
    res.render('login', { username: req.session.username, role: req.session.role });
  }
});

export default router;
