import { Router } from 'express';
import bodyParser from 'body-parser';
import * as db from '../db/hirdetes.js';

// felépítünk egy moduláris routert
const router = Router();

router.use(bodyParser.json());

function announcementSorting(ann, order) {
  return function komp(a, b) {
    if (a[ann] > b[ann]) {
      return 1 * order;
    } if (a[ann] < b[ann]) {
      return -1 * order;
    }
    return 0;
  };
}

function distanceCheck(request) {
  if (request.body.distanceMin === '') { request.body.distanceMin = -1; }
  if (request.body.distanceMax === '') { request.body.distanceMax = 1000000000; }
}

function yearCheck(request) {
  if (request.body.yearMin === '') { request.body.yearMin = -1; }
  if (request.body.yearMax === '') { request.body.yearMax = 1000000000; }
}

function powerCheck(request) {
  if (request.body.powerMin === '') { request.body.powerMin = -1; }
  if (request.body.powerMax === '') { request.body.powerMax = 1000000000; }
}

function arCheck(request) {
  if (request.body.arMin === '') { request.body.arMin = -1; }
  if (request.body.arMax === '') { request.body.arMax = 1000000000; }
}

function markaCheck(request) {
  if (request.body.markaSearch === '') { request.body.markaSearch = '%'; }
}

function modelCheck(request) {
  if (request.body.modelSearch === '') { request.body.modelSearch = '%'; }
}

function fuelCheck(request) {
  if (request.body.fuelSearch === '') { request.body.fuelSearch = '%'; }
}

function varosCheck(request) {
  if (request.body.varosSearch === '') { request.body.varosSearch = '%'; }
}
// parametereknek megfelelo hirdetesek keresese
router.post('/', async (request, res) => {
  try {
    distanceCheck(request);
    yearCheck(request);
    powerCheck(request);
    arCheck(request);
    markaCheck(request);
    modelCheck(request);
    fuelCheck(request);
    varosCheck(request);
    const [hirdetesek] = await db.findAnnouncements(request);
    let order;
    if (request.body.filter_order === 'asc') {
      order = 1;
    } else {
      order = -1;
    }
    hirdetesek.sort(announcementSorting(request.body.filter_search, order));
    res.render('minipage', { hirdetesek });
  } catch (err) {
    res.status(500).render('error', { message: err });
  }
});

export default router;
