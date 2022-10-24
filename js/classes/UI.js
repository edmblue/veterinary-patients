import { listaCursos } from '../selectores.js';
import { borrarItem, editarItem } from '../funciones.js';

export class UI {
  mostrarMensaje(mensaje, tipo) {
    const divMensaje = document.createElement('div');
    divMensaje.classList.add('text-center', 'alert', 'd-block', 'col-12');
    const mensajeNotificacion = document.createElement('p');
    mensajeNotificacion.textContent = mensaje;
    mensajeNotificacion.classList.add('p-3', 'text-white', 'font-weight-bold');

    if (tipo == 'error') {
      mensajeNotificacion.classList.remove('alert-success');
      mensajeNotificacion.classList.add('alert-danger');
    } else {
      mensajeNotificacion.classList.remove('alert-danger');
      mensajeNotificacion.classList.add('alert-success');
    }

    divMensaje.appendChild(mensajeNotificacion);

    contenido.insertBefore(divMensaje, contenido.firstChild);
    setTimeout(() => divMensaje.remove(), 3000);
  }

  mostrarCitasHTML({ citas }) {
    this.limpiarHTML();

    citas.forEach((citaItem) => {
      const { nombre, propietario, telefono, fecha, hora, sintomas, id } =
        citaItem;

      const rowCita = document.createElement('li');
      rowCita.classList.add('cita', 'p-3');
      rowCita.dataset.id = id;
      rowCita.innerHTML = `
          <h2 class="card-title font-weight-bolder">${nombre}</h2>
          <p class="card-title font-weight-bolder">Propietario: ${propietario}</p>
          <p class="card-title font-weight-bolder">Telefono: ${telefono}</p>
          <p class="card-title font-weight-bolder">Fecha: ${fecha}</p>
          <p class="card-title font-weight-bolder">Hora: ${hora}</p>
          <p class="card-title font-weight-bolder">Sintomas: ${sintomas}</p>
          `;

      const borrarBtn = document.createElement('button');
      borrarBtn.classList.add('btn', 'btn-danger');
      borrarBtn.textContent = 'Borrar';
      borrarBtn.onclick = () => borrarItem(id);
      rowCita.appendChild(borrarBtn);

      const editarBtn = document.createElement('button');
      editarBtn.classList.add('btn', 'btn-info', 'ml-3');
      editarBtn.textContent = 'Editar';
      editarBtn.onclick = () => editarItem(citaItem);
      rowCita.appendChild(editarBtn);

      listaCursos.appendChild(rowCita);
    });

    sincronizarDatos();
  }

  limpiarHTML() {
    while (listaCursos.firstChild) {
      listaCursos.removeChild(listaCursos.firstChild);
    }
  }
}

export default UI;
