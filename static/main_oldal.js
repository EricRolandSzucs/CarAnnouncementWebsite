// gets more information about the announcements on the front page
async function getAnnouncementDetails(id) {
  const model = document.getElementById(`model_${id}`);
  const distance = document.getElementById(`distance_${id}`);
  const year = document.getElementById(`year_${id}`);
  const power = document.getElementById(`power_${id}`);
  const ar = document.getElementById(`ar_${id}`);
  const uzem = document.getElementById(`uzemanyag_${id}`);
  const datum = document.getElementById(`datum_${id}`);

  const extra = document.getElementById(`extra_${id}`);
  if (extra.value === 'true') {
    uzem.innerText = '';
    model.innerText = '';
    distance.innerText = '';
    year.innerText = '';
    power.innerText = '';
    ar.innerText = '';
    datum.innerText = '';
    document.getElementById(`extra_${id}`).value = 'false';
  } else {
    try {
      const result = await fetch(`/api/announcement/${id}`, {
        method: 'GET',
      });
      const announcement = await result.json();
      model.innerText = `Model: ${announcement.model}`;
      distance.innerText = `Distance: ${announcement.distance}`;
      year.innerText = `Year: ${announcement.year}`;
      power.innerText = `Power: ${announcement.power}`;
      ar.innerText = `Price: ${announcement.ar}`;
      uzem.innerText = `Fuel: ${announcement.uzemanyag}`;
      datum.innerText = `Date: ${announcement.datum}`;
      document.getElementById(`extra_${id}`).value = 'true';
    } catch (error) {
      console.log(error);
    }
  }
}

async function formJson({ url, formData }) {
  const data = Object.fromEntries(formData.entries());
  const dataString = JSON.stringify(data);

  const opciok = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: dataString,
  };

  const response = await fetch(url, opciok);

  const result = await response.text();
  const row = document.getElementById('div_minipage');
  const parentToRow = row.parentElement;

  row.remove();
  parentToRow.innerHTML = result;

  const buttons = document.querySelectorAll('.button_extra');
  buttons.forEach((button) => button.addEventListener('click', () =>  {
    getAnnouncementDetails(parseInt(button.value, 10));
  }));
}

async function formSubmit(event) {
  event.preventDefault();

  const form = event.currentTarget;

  const url = form.action;

  try {
    const formData = new FormData(form);

    await formJson({ url, formData });

    document.getElementById('div_minipage').scrollIntoView({ behavior: 'smooth', block: 'center' });
  } catch (error) {
    console.error(error);
  }
}

function handlers() {
  const buttons = document.querySelectorAll('.button_extra');
  buttons.forEach((button) => button.addEventListener('click', () =>  {
    getAnnouncementDetails(parseInt(button.value, 10));
  }));

  document.getElementById('search_form').addEventListener('submit', formSubmit);
}

window.onload = handlers;
