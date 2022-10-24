import { agregarCita, rellenarCita } from '../funciones.js';
import { formulario } from '../selectores.js';

export class App {
  constructor() {
    this.initApp();
  }

  initApp() {
    document.addEventListener('DOMContentLoaded', () => {
      const citasObtenidas = JSON.parse(localStorage.getItem('citas')) || [];
      administradorCita.citas = citasObtenidas;
      ui.mostrarCitasHTML(administradorCita);
    });
    formulario.addEventListener('submit', agregarCita);
    formulario.addEventListener('input', rellenarCita);
  }
}
