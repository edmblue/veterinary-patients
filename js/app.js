// Variables

const formulario = document.querySelector('#nueva-cita');
const listaCursos = document.querySelector('.lista-citas');
let editar = false;

const citaObjetoGlobal = {
  nombre: '',
  propietario: '',
  telefono: '',
  fecha: '',
  hora: '',
  sintomas: '',
  id: '',
};

// clases

class Citas {
  constructor() {
    this.citas = [];
  }

  agregarCita(citaAAgregar) {
    this.citas = [...this.citas, citaAAgregar];
  }

  borrarCita(idABorrar) {
    this.citas = this.citas.filter((citaItem) => citaItem.id !== idABorrar);
  }

  actualizarCitas(citaAActualizar) {
    this.citas = this.citas.map((citasItem) =>
      citasItem.id == citaAActualizar.id ? citaAActualizar : citasItem
    );
  }
}

class UI {
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

//instancias

const ui = new UI();
const administradorCita = new Citas();

// eventListeners

callEventListeners();

function callEventListeners() {
  document.addEventListener('DOMContentLoaded', () => {
    const citasObtenidas = JSON.parse(localStorage.getItem('citas')) || [];
    administradorCita.citas = citasObtenidas;
    ui.mostrarCitasHTML(administradorCita);
  });
  formulario.addEventListener('submit', agregarCita);
  formulario.addEventListener('input', rellenarCita);
}

//Funciones

function rellenarCita(e) {
  if (e.target.id === 'mascota') {
    citaObjetoGlobal.nombre = e.target.value;
  }
  if (e.target.id === 'propietario') {
    citaObjetoGlobal.propietario = e.target.value;
  }
  if (e.target.id === 'telefono') {
    citaObjetoGlobal.telefono = e.target.value;
  }
  if (e.target.id === 'fecha') {
    citaObjetoGlobal.fecha = e.target.value;
  }
  if (e.target.id === 'hora') {
    citaObjetoGlobal.hora = e.target.value;
  }
  if (e.target.id === 'sintomas') {
    citaObjetoGlobal.sintomas = e.target.value;
  }
}

function agregarCita(e) {
  e.preventDefault();

  const { nombre, propietario, telefono, fecha, hora, sintomas } =
    citaObjetoGlobal;

  if (
    nombre === '' ||
    propietario === '' ||
    telefono === '' ||
    fecha === '' ||
    hora === '' ||
    sintomas === ''
  ) {
    ui.mostrarMensaje('Los campos no pueden estar vacios', 'error');
    return;
  }

  if (editar) {
    administradorCita.actualizarCitas({ ...citaObjetoGlobal });

    ui.mostrarMensaje('¡Cita actualizada con exito!');

    document.querySelector('button[type="submit"]').innerHTML = 'Crear Cita';

    editar = false;
  } else {
    citaObjetoGlobal.id = Date.now();

    ui.mostrarMensaje('Cita agregada correctamente');

    administradorCita.agregarCita({ ...citaObjetoGlobal });
  }

  ui.mostrarCitasHTML(administradorCita);

  formulario.reset();

  limpiarObjeto();
}

function limpiarObjeto() {
  for (let propiedad in citaObjetoGlobal) {
    citaObjetoGlobal[propiedad] = '';
  }
}

function borrarItem(id) {
  administradorCita.borrarCita(id);
  ui.mostrarCitasHTML(administradorCita);
}

function editarItem(citaAEditar) {
  editar = true;

  const { nombre, propietario, telefono, fecha, hora, sintomas, id } =
    citaAEditar;

  citaObjetoGlobal.nombre = nombre;
  citaObjetoGlobal.propietario = propietario;
  citaObjetoGlobal.telefono = telefono;
  citaObjetoGlobal.fecha = fecha;
  citaObjetoGlobal.hora = hora;
  citaObjetoGlobal.sintomas = sintomas;
  citaObjetoGlobal.id = id;

  document.querySelector('#mascota').value = nombre;
  document.querySelector('#propietario').value = propietario;
  document.querySelector('#telefono').value = telefono;
  document.querySelector('#fecha').value = fecha;
  document.querySelector('#hora').value = hora;
  document.querySelector('#sintomas').value = sintomas;

  document.querySelector('button[type="submit"]').innerHTML = 'Guardar Cambios';
}

function sincronizarDatos() {
  let citasString = JSON.stringify(administradorCita.citas);
  localStorage.setItem('citas', citasString);
}

