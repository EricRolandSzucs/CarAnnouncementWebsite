function markaCheck(errorUzenet) {
  let uzenet = errorUzenet;
  if (!document.getElementById('marka').validity.valid) {
    uzenet = `${uzenet} A marka nagy betuvel kell kezdodjon es csak betuket tartalmazhat (min 2).<br />`;
  }
  return uzenet;
}

function varosCheck(errorUzenet) {
  let uzenet = errorUzenet;
  if (!document.getElementById('varos').validity.valid) {
    uzenet = `${uzenet} A varos nagy betuvel kell kezdodjon es csak betuket tartalmazhat (min 2).<br />`;
  }
  return uzenet;
}

function arCheck(errorUzenet) {
  let uzenet = errorUzenet;
  if (document.getElementById('ar').value === '') {
    uzenet = `${uzenet} Az ar mezo kitoltese szukseges.<br />`;
  } else if (document.getElementById('ar').value < 1) {
    uzenet = `${uzenet} Az ar nagyobb mint 0 es csak szamokat tartalmazhat.<br />`;
  }
  return uzenet;
}

function titleCheck(errorUzenet) {
  let uzenet = errorUzenet;
  if (!document.getElementById('title').validity.valid) {
    uzenet = `${uzenet} A title nagy betuvel kell kezdodjon es csak betuket, szamokat, es iras jeleket tartalmazhat (min 2).<br />`;
  }
  return uzenet;
}

function modelCheck(errorUzenet) {
  let uzenet = errorUzenet;
  if (!document.getElementById('model').validity.valid) {
    uzenet = `${uzenet} A model nagy betuvel kell kezdodjon es csak betuket es szamokat tartalmazhat (min 2).<br />`;
  }
  return uzenet;
}

function distanceCheck(errorUzenet) {
  let uzenet = errorUzenet;
  if (document.getElementById('distance').value === '') {
    uzenet = `${uzenet} A distance mezo kitoltese szukseges.<br />`;
  } else if (document.getElementById('distance').value < 1) {
    uzenet = `${uzenet} A distance nagyobb mint 0 es csak szamokat tartalmazhat.<br />`;
  }
  return uzenet;
}

function yearCheck(errorUzenet) {
  let uzenet = errorUzenet;
  if (document.getElementById('year').value === '') {
    uzenet = `${uzenet} A year mezo kitoltese szukseges.<br />`;
  } else if (document.getElementById('year').value < 1886 && document.getElementById('year').value > 2100) {
    uzenet = `${uzenet} A year 1886 es 2100 kozotti kell legyen.<br />`;
  }
  return uzenet;
}

function powerCheck(errorUzenet) {
  let uzenet = errorUzenet;
  if (document.getElementById('power').value === '') {
    uzenet = `${uzenet} A power mezo kitoltese szukseges.<br />`;
  } else if (document.getElementById('power').value < 1) {
    uzenet = `${uzenet} A power nagyobb mint 0 es csak szamokat tartalmazhat.<br />`;
  }
  return uzenet;
}

function fuelCheck(errorUzenet) {
  let uzenet = errorUzenet;
  if (!document.getElementById('uzemanyag').validity.valid) {
    uzenet = `${uzenet} Az uzemanyag nagy betuvel kell kezdodjon es csak betuket tartalmazhat (min 2).<br />`;
  }
  return uzenet;
}

function correctCheck() {
  let errorUzenet = '';

  errorUzenet = markaCheck(errorUzenet);

  errorUzenet = varosCheck(errorUzenet);

  errorUzenet = arCheck(errorUzenet);

  errorUzenet = titleCheck(errorUzenet);

  errorUzenet = modelCheck(errorUzenet);

  errorUzenet = distanceCheck(errorUzenet);

  errorUzenet = yearCheck(errorUzenet);

  errorUzenet = powerCheck(errorUzenet);

  errorUzenet = fuelCheck(errorUzenet);

  if (errorUzenet !== '') {
    document.getElementById('hibak').innerHTML = `${errorUzenet}<br />`;
    document.getElementById('sub').disabled = true;
    return false;
  }

  document.getElementById('hibak').innerText = '';
  document.getElementById('sub').disabled = false;
  return true;
}

function handlers() {
  document.getElementById('butt').addEventListener('mouseenter', correctCheck);
  document.getElementById('marka').addEventListener('blur', correctCheck);
  document.getElementById('varos').addEventListener('blur', correctCheck);
  document.getElementById('ar').addEventListener('blur', correctCheck);
  document.getElementById('title').addEventListener('blur', correctCheck);
  document.getElementById('model').addEventListener('blur', correctCheck);
  document.getElementById('distance').addEventListener('blur', correctCheck);
  document.getElementById('year').addEventListener('blur', correctCheck);
  document.getElementById('power').addEventListener('blur', correctCheck);
  document.getElementById('uzemanyag').addEventListener('blur', correctCheck);
}

window.onload = handlers;
