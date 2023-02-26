import { Router } from 'express';
import fs, { existsSync, mkdirSync } from 'fs';
import { join } from 'path';
import eformidable from 'express-formidable';
import mimeTypes from 'mime-types';
import * as dbk from '../db/kep.js';
import * as dbh from '../db/hirdetes.js';

let filename;
// felépítünk egy moduláris routert
const router = Router();

const uploadDir = join(process.cwd(), 'uploads');

// feltöltési mappa elkészítése
if (!existsSync(uploadDir)) {
  mkdirSync(uploadDir);
}

// function regi kep torlesere
function deleteFile(fileHandler) {
  fs.unlink(fileHandler.path, (err) => {
    if (err) {
      console.error(err);
    } else {
      console.log('File removed:', fileHandler.path);
    }
  });
}

router.use(eformidable({ uploadDir }));

// hirdetesId form adatot validalja
router.post('/', (request, response, next) => {
  const { hirdetesId } = request.fields;

  if (!/^[0-9]+$/.test(hirdetesId)) {
    deleteFile(request.files.myfile);
    return response.status(400).render('error', { message: 'Wrong format for field Id. Id can contain only numbers and is bigger than 0.' });
  }
  return next();
});

// feltoltott kep validalasa
router.post('/', (request, response, next) => {
  const file = request.files.myfile;

  try {
    fs.existsSync(file.path);
    const mimeType = mimeTypes.lookup(file.name) || 'text/plain';
    // letezik es megfelelo tipusu (kep)
    if (mimeType === 'image/jpeg' || mimeType === 'image/png') {
      console.log(`  ${file.name} exists, content-type=${mimeType}`);
      return next();
      // letezik es nem megfelelo tipusu (nem kep)
    }
    deleteFile(file);
    return response.status(400).render('error', { message: `Wrong file type (${mimeType}). File can only be jpg/png type.` });

  // nem letezik
  } catch (err) {
    return response.status(404).render('error', { message: err });
  }
});

// renaming es filename megalapitas
router.post('/', (request, response, next) => {
  const fileHandler = request.files.myfile;
  const oldpath = fileHandler.path;
  const newpath = `${oldpath}.jpg`;
  fs.rename(oldpath, newpath, (err) => {
    if (err) {
      console.error(err);
    }
  });
  filename = `${oldpath.replace(/^.*[\\/]/, '')}.jpg`;
  next();
});

router.use('/', async (request, res) => {
  try {
    await dbk.insertKep(filename, request.fields.hirdetesId);
    const [[userId]] = await dbh.findAnnouncementUserWithId(request.fields.hirdetesId);
    const [[hirdetes]] = await dbh.findAnnouncementWithId(request.fields.hirdetesId);
    const [kepek] = await dbk.getAnnouncementKepek(request.fields.hirdetesId);
    if (request.session.user !== undefined && userId.user_id === request.session.user) {
      res.status(200).render('idhirdetes', {
        hirdetes, kepek, username: request.session.username, role: request.session.role,
      });
    } else {
      res.status(200).render('idhirdetes_guest', {
        hirdetes, kepek, username: request.session.username, role: request.session.role,
      });
    }
  } catch (err) {
    res.status(400).render('error', { message: err });
  }
});

export default router;
