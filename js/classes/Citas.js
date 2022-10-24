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

export default Citas;
