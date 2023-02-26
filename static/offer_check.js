// creates event handlers for the modal, sets the body and title of the modal
function modalHandler(message, title) {
  document.getElementById('info_modal').style.display = 'block';

  document.getElementById('info-modal-text').innerText = message;
  document.getElementById('modal-title-text').innerText = title;

  document.getElementById('info_close').addEventListener('click', () =>  {
    document.getElementById('info_modal').style.display = 'none';
  }, { once: true });
  document.getElementById('info_yes').addEventListener('click', () =>  {
    document.getElementById('info_modal').style.display = 'none';
  }, { once: true });
}

// ignores the selected offer
async function ignoreOffer(id, deletable) {
  try {
    const result = await fetch(`/api/offer/ignore/${id}`, {
      method: 'DELETE',
    });
    if (result.status === 204) {
      document.getElementById(deletable).remove();
      modalHandler('Offer succesfully ignored.', 'Confirmation');
    } else {
      const error = await result.text();
      modalHandler(error, 'Error');
    }
  } catch (error) {
    modalHandler(error, 'Error');
  }
}

// declines the selected offer
async function declineOffer(id) {
  try {
    const result = await fetch(`/api/offer/decline/${id}`, {
      method: 'PUT',
    });
    if (result.status === 204) {
      const deletable = `tr_${id}`;
      document.getElementById(deletable).remove();
      modalHandler('Offer succesfully declined.', 'Confirmation');
    } else {
      const error = await result.text();
      modalHandler(error, 'Error');
    }
  } catch (error) {
    modalHandler(error, 'Error');
  }
}

// accepts the selected offer
async function acceptOffer(id) {
  try {
    const result = await fetch(`/api/offer/accept/${id}`, {
      method: 'PUT',
    });
    if (result.status === 204) {
      const deletable = `tr_${id}`;
      document.getElementById(deletable).remove();
      modalHandler('Offer succesfully accepted.', 'Confirmation');
    } else {
      const error = await result.text();
      modalHandler(error, 'Error');
    }
  } catch (error) {
    modalHandler(error, 'Error');
  }
}

// displays contact information for a buyer
async function showContactModal(id) {
  try {
    const result = await fetch(`/api/user/details/${id}`, {
      method: 'GET',
    });
    const details = await result.json();
    const contact = `Username: ${details.username}
                     Email: ${details.email}
                     Phone: ${details.phone}`;
    modalHandler(contact, 'Contact information');
  } catch (error) {
    modalHandler(error, 'Error');
  }
}

function handlers() {
  // the ignore buttons for the accepted offers
  const btAIgnore = document.querySelectorAll('.buttonsAIgnore');
  btAIgnore.forEach((button) => button.addEventListener('click', () =>  {
    ignoreOffer(button.value, `trA_${button.value}`);
  }));

  // the ignore buttons for the pending offers
  const btIgnore = document.querySelectorAll('.buttonsIgnore');
  btIgnore.forEach((button) => button.addEventListener('click', () =>  {
    ignoreOffer(button.value, `tr_${button.value}`);
  }));

  // the decline buttons for the pending offers
  const btDecline = document.querySelectorAll('.buttonsDecline');
  btDecline.forEach((button) => button.addEventListener('click', () =>  {
    declineOffer(button.value);
  }));

  // the accept buttons for the pending offers
  const btAccept = document.querySelectorAll('.buttonsAccept');
  btAccept.forEach((button) => button.addEventListener('click', () =>  {
    acceptOffer(button.value);
  }));

  // the contact buttons for all offers
  const btContact = document.querySelectorAll('.buttonsAContact');
  btContact.forEach((button) => button.addEventListener('click', () =>  {
    showContactModal(button.value);
  }));
}

window.onload = handlers;
