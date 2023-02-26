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

  return response.json();
}

async function formSubmit(event) {
  document.getElementById('offer_modal').style.display = 'none';

  event.preventDefault();

  const form = event.currentTarget;

  const url = form.action;

  try {
    const formData = new FormData(form);

    await formJson({ url, formData });
  } catch (error) {
    console.error(error);
  }
}

function showOfferModal() {
  document.getElementById('offer_modal').style.display = 'block';
  document.getElementById('offerId').value = document.getElementById('hirdetes_ar').value;

  document.getElementById('button_no').addEventListener('click', () =>  {
    document.getElementById('offer_modal').style.display = 'none';
  }, { once: true });

  document.getElementById('button_close').addEventListener('click', () =>  {
    document.getElementById('offer_modal').style.display = 'none';
  }, { once: true });

  document.getElementById('offer_form').addEventListener('submit', formSubmit);
}

function handlers() {
  document.getElementById('offer_button').addEventListener('click', () =>  {
    showOfferModal();
  });
}

window.onload = handlers;
