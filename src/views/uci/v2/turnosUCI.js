class Turno {

    numeroHistoriaClinica = null;
    numeroAtencion = null;
    numeroTurno = null;
    fechaTurno = null;
    horaTurno = null;
    fechaHoraTurno = null;
    usuarioTurno = null;
    paciente = null;
    especialidad = null;
    statusHora = 0; // [0 => Hora sin modificar, 2 Hora modificada]
    status = 0; // [1 => Turno Abierto, 2 Turno Cerrado]
    gestion = 0;

    constructor() {

    }


}


class TurnosUCI {

    turnos = []; // Lista de Turnos

    constructor() {
        this.turnos = this.turnos;
    }


}

export default TurnosUCI;