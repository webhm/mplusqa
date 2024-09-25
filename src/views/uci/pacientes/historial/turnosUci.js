import m from "mithril";
import FecthUci from "./fecthUci";
import PacientesUCIHistorial from "./pacientesUci";

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
    asume = null;
    cancela = null;
    status = 0; // [1 => Turno Abierto, 2 Turno Cerrado]
    gestion = 0;
    constructor() {
        this.numeroHistoriaClinica = this.numeroHistoriaClinica;
        this.numeroAtencion = this.numeroAtencion;
        this.numeroTurno = this.numeroTurno;
        this.fechaTurno = this.fechaTurno;
        this.usuarioTurno = this.usuarioTurno;
        this.paciente = this.paciente;
        this.especialidad = this.especialidad;
        this.asume = this.asume;
        this.cancela = this.cancela;
        this.status = this.status;
        this.gestion = this.gestion;
    }
    abrirTurno() {
        if (this.status == 0) {
            this.status = 1;
        }
    }
    cerrarTurno() {
        this.gestion = 2;
        this.status = 2;
    }
    iniciarGestion() {
        if (this.gestion == 0) {
            this.gestion = 1;
        }
    }

}

// Abtrae de turnos
class TurnosUciHistorial {

    static turnos = [];
    static nuevoTurno = null;

    static setTurno(t) {
        TurnosUciHistorial.nuevoTurno = new Turno();
        TurnosUciHistorial.nuevoTurno.numeroHistoriaClinica = t.numeroHistoriaClinica;
        TurnosUciHistorial.nuevoTurno.numeroAtencion = t.numeroAtencion;
        TurnosUciHistorial.nuevoTurno.numeroTurno = t.numeroTurno;
        TurnosUciHistorial.nuevoTurno.paciente = t.paciente;
        TurnosUciHistorial.nuevoTurno.especialidad = t.especialidad;
        TurnosUciHistorial.nuevoTurno.fechaHoraTurno = t.fechaHoraTurno;
        TurnosUciHistorial.nuevoTurno.fechaTurno = t.fechaHoraTurno.split(' ')[0];
        TurnosUciHistorial.nuevoTurno.horaTurno = t.fechaHoraTurno.split(' ')[1];
        TurnosUciHistorial.nuevoTurno.usuarioTurno = t.usuarioTurno;
        TurnosUciHistorial.nuevoTurno.asume = t.asume;
        TurnosUciHistorial.nuevoTurno.cancela = t.cancela;
        TurnosUciHistorial.nuevoTurno.status = t.status;
        TurnosUciHistorial.nuevoTurno.gestion = 0;
    }

    static iniciarTurno() {
        TurnosUciHistorial.validarInicioTurno();
        TurnosUciHistorial.nuevoTurno = new Turno();
        TurnosUciHistorial.nuevoTurno.numeroHistoriaClinica = PacientesUCIHistorial.numeroHistoriaClinica;
        TurnosUciHistorial.nuevoTurno.numeroAtencion = PacientesUCIHistorial.numeroAtencion;
        TurnosUciHistorial.nuevoTurno.numeroTurno = PacientesUCIHistorial.numeroTurno;
        TurnosUciHistorial.nuevoTurno.fechaTurno = moment().format('DD-MM-YYYY');
        TurnosUciHistorial.nuevoTurno.horaTurno = moment().format('HH:mm');
        TurnosUciHistorial.nuevoTurno.fechaHoraTurno = TurnosUciHistorial.nuevoTurno.fechaTurno + ' ' + TurnosUciHistorial.nuevoTurno.horaTurno;
        TurnosUciHistorial.nuevoTurno.usuarioTurno = PacientesUCIHistorial.usuarioTurno;
        FecthUci.registrarTurno();
        TurnosUciHistorial.nuevoTurno.abrirTurno();
        TurnosUciHistorial.turnos.push(TurnosUciHistorial.nuevoTurno);
    }

    static validarInicioTurno() {
        for (let index = 0; index < TurnosUciHistorial.turnos.length; index++) {
            let element = TurnosUciHistorial.turnos[index];
            if (element.status == 1) {
                alert("Ya existe un turno abierto");
                throw "Ya existe un turno abierto";
            }
            if (element.numeroTurno == PacientesUCIHistorial.numeroTurno && moment(element.fechaHoraTurno, 'DD-MM-YYYY HH:mm').format('DD-MM-YYYY') == moment().format('DD-MM-YYYY')) {
                alert("Ya existe un turno generado. Espere la hora del siguiente turno para generar nuevos registros. ");
                window.location.reload();
                throw "Ya existe un turno generado. Espere la hora del siguiente turno para generar nuevos registros.";
            }
        }
    }

    static getTurnos() {
        return TurnosUciHistorial.turnos;
    }
}

export default TurnosUciHistorial;