function correctCheck2() {
  let errorUzenet = '';
  let hiba = false;
  if (!document.getElementById('hirdetesId').validity.valid) {
    errorUzenet = `${errorUzenet} Az Id egy 0-nal nagyobb szam.<br />`;
    hiba = true;
  }
  if (!document.getElementById('hirdetesId').validity.value === '') {
    errorUzenet = `${errorUzenet} Az Id mezo kotelezo.<br />`;
    hiba = true;
  }
  if (document.getElementById('myfile').value === '') {
    errorUzenet = `${errorUzenet} File toltese kotelezo.<br />`;
    hiba = true;
  }
  if (hiba) {
    document.getElementById('hibak2').innerHTML = `${errorUzenet}<br />`;
    document.getElementById('sub2').disabled = true;
    return false;
  }

  document.getElementById('hibak2').innerText = '';
  document.getElementById('sub2').disabled = false;
  return true;
}

async function deleteKep(id) {
  try {
    const result = await fetch(`/api/picture/${id}`, {
      method: 'DELETE',
    });
    if (result.status === 204) {
      document.getElementById(`div_${id}`).remove();
    } else {
      const error = await result.text();
      document.getElementById('info-modal-text').innerText = error;
      document.getElementById('modal-title-text').innerText = 'Errorr';
    }
    document.getElementById('info_modal').style.display = 'block';

    document.getElementById('info_close').addEventListener('click', () =>  {
      document.getElementById('info_modal').style.display = 'none';
    }, { once: true });
    document.getElementById('info_yes').addEventListener('click', () =>  {
      document.getElementById('info_modal').style.display = 'none';
    }, { once: true });
  } catch (error) {
    document.getElementById('info_modal').style.display = 'block';

    document.getElementById('info-modal-text').innerText = error;
    document.getElementById('modal-title-text').innerText = 'Errorrf';

    document.getElementById('info_close').addEventListener('click', () =>  {
      document.getElementById('info_modal').style.display = 'none';
    }, { once: true });
    document.getElementById('info_yes').addEventListener('click', () =>  {
      document.getElementById('info_modal').style.display = 'none';
    }, { once: true });
  }
}
async function showModal(id) {
  document.getElementById('torles_modal').style.display = 'block';

  const yes = document.getElementById('button_yes');

  document.getElementById('button_no').addEventListener('click', () =>  {
    document.getElementById('torles_modal').style.display = 'none';
    yes.replaceWith(yes.cloneNode(true));
  }, { once: true });

  document.getElementById('button_close').addEventListener('click', () =>  {
    document.getElementById('torles_modal').style.display = 'none';
    yes.replaceWith(yes.cloneNode(true));
  }, { once: true });

  document.getElementById('button_yes').addEventListener('click', () =>  {
    document.getElementById('torles_modal').style.display = 'none';
    deleteKep(id);
  }, { once: true });
}

function handlers() {
  document.getElementById('butto').addEventListener('mouseenter', correctCheck2);
  document.getElementById('hirdetesId').addEventListener('blur', correctCheck2);
  document.getElementById('myfile').addEventListener('change', correctCheck2);
  const buttons = document.querySelectorAll('.kep_delete');
  buttons.forEach((button) => button.addEventListener('click', () =>  {
    showModal(parseInt(button.value, 10));
  }));
}

window.onload = handlers;
