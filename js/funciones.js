import Citas from './classes/Citas.js';
import UI from './classes/UI.js';
//instancias

const ui = new UI();
const administradorCita = new Citas();

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

//Funciones

export function rellenarCita(e) {
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

export function agregarCita(e) {
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

export function limpiarObjeto() {
  for (let propiedad in citaObjetoGlobal) {
    citaObjetoGlobal[propiedad] = '';
  }
}

export function borrarItem(id) {
  administradorCita.borrarCita(id);
  ui.mostrarCitasHTML(administradorCita);
}

export function editarItem(citaAEditar) {
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

export function sincronizarDatos() {
  let citasString = JSON.stringify(administradorCita.citas);
  localStorage.setItem('citas', citasString);
}
