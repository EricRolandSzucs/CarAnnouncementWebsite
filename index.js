import express from 'express';
import { join } from 'path';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import autoToltes from './routes/autoToltes.js';
import kepToltes from './routes/kepToltes.js';
import formKereses from './routes/formKereses.js';
import hirdetesDisplay from './routes/hirdetesDisplay.js';
import formKeresesId from './routes/formKeresesId.js';
import hirdetesKuldes from './routes/hirdetesKuldes.js';
import hirdetesTorles from './routes/hirdetesTorles.js';
import userManage from './routes/userManage.js';
import sendOffer from './routes/sendOffer.js';
import offerDisplay from './routes/offerDisplay.js';
import login from './auth/login.js';
import logout from './auth/logout.js';
import registration from './auth/registration.js';
import loggedIn from './auth/middleware/user.js';
import isAdmin from './auth/middleware/admin.js';
import apiRouter from './api/router.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(session({
  secret: '142e6ecf42884f03',
  resave: false,
  saveUninitialized: true,
}));

app.use(morgan('tiny'));
app.use('/api', apiRouter);
const staticdir = join(process.cwd(), 'static');
app.use(express.static(staticdir));
app.use(express.static(join(process.cwd(), 'uploads')));
app.use(cookieParser());

app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.set('views', join(process.cwd(), 'views'));

app.use('/login_display', (request, response) => {
  response.render('login', { username: request.session.username, role: request.session.role });
});
app.use('/registration_display', (request, response) => {
  response.render('registration', { username: request.session.username, role: request.session.role });
});

app.use('/hirdetes_id_display', (request, response) => {
  response.render('hirdetes_kereses_id', { username: request.session.username, role: request.session.role });
});

app.use('/user_login', login);
app.use('/user_logout', logout);
app.use('/user_registration', registration);

app.use('/', hirdetesDisplay);
app.use('/search_form', formKereses);
app.use('/search_form_id', formKeresesId);

app.use(loggedIn);

app.use('/delete_post', hirdetesTorles);
app.use('/post_form', hirdetesKuldes);
app.use('/submit_form', autoToltes);
app.use('/upload_file', kepToltes);
app.use('/send_offer', sendOffer);
app.use('/offers_display', offerDisplay);

app.use(isAdmin);

app.use('/user_manage', userManage);

app.listen(PORT, () => {
  console.log(`Server is listening on port: ${PORT}`);
});
