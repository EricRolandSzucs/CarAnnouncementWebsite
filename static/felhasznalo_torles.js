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

// Deletes a specific user
async function deleteRow(id) {
  try {
    const result = await fetch(`/api/user/delete/${id}`, {
      method: 'DELETE',
    });
    if (result.status === 204) {
      document.getElementById(`tr_${id}`).remove();
      modalHandler('User succesfully deleted.', 'Confirmation');
    } else {
      const error = await result.text();
      modalHandler(error, 'Error');
    }
  } catch (error) {
    modalHandler(error, 'Error');
  }
}

// Displays the modal that confirms the deletion choice
async function showModal(id) {
  document.getElementById('torles_modal').style.display = 'block';

  document.getElementById('info-modal-text').innerText = 'Are you sure you wanna delete the selected user?';
  const yes = document.getElementById('button_yes');

  document.getElementById('button_no').addEventListener('click', () =>  {
    document.getElementById('torles_modal').style.display = 'none';
    yes.replaceWith(yes.cloneNode(true));
  }, { once: true });

  document.getElementById('button_close').addEventListener('click', () =>  {
    document.getElementById('torles_modal').style.display = 'none';
    yes.replaceWith(yes.cloneNode(true));
  }, { once: true });

  yes.addEventListener('click', () =>  {
    document.getElementById('torles_modal').style.display = 'none';
    deleteRow(id);
  }, { once: true });
}

// Displays all the users that match the search
async function displaySearch(search) {
  try {
    const resu = await fetch(`/api/user/search/${search}`, {
      method: 'GET',
    });

    const result = await resu.text();
    const row = document.getElementById('deleteTable');
    const parentToRow = row.parentElement;
    const buttons = document.querySelectorAll('.buttonsDel');

    buttons.forEach((button) => button.removeEventListener('click', () =>  {
      showModal(parseInt(button.value, 10));
    }));

    row.remove();
    parentToRow.innerHTML = result;
    const buttonsDel = document.querySelectorAll('.buttonsDel');
    buttonsDel.forEach((button) => button.addEventListener('click', () =>  {
      showModal(parseInt(button.value, 10));
    }));
  } catch (error) {
    console.log(error);
  }
}

function handlers() {
  const buttonsDel = document.querySelectorAll('.buttonsDel');
  buttonsDel.forEach((button) => button.addEventListener('click', () =>  {
    showModal(parseInt(button.value, 10));
  }));
  document.getElementById('search_button').addEventListener('click', () =>  {
    displaySearch(document.getElementById('search_input').value);
  });
}

window.onload = handlers;
