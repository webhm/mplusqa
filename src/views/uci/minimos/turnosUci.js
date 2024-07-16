import m from "mithril";
import App from "../../../models/App";
import Loader from "../../utils/loader";
import Errors from "../../utils/errors";
import Table from "../../utils/table";
import FecthUci from "./fecthUci";
import PacientesUCI from "./pacientesUci";

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
    statusHora = null;
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
        this.statusHora = this.statusHora;
        this.gestion = this.gestion;
    }
    abrirTurno() {
        if (this.status == 0) {
            this.status = 1;
        }
    }
    reAbrirTurno() {
        if (this.status == 2) {
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
class TurnosUci {

    static turnos = [];
    static nuevoTurno = null;

    static setTurno(t) {
        TurnosUci.nuevoTurno = new Turno();
        TurnosUci.nuevoTurno.numeroHistoriaClinica = t.numeroHistoriaClinica;
        TurnosUci.nuevoTurno.numeroAtencion = t.numeroAtencion;
        TurnosUci.nuevoTurno.numeroTurno = t.numeroTurno;
        TurnosUci.nuevoTurno.paciente = t.paciente;
        TurnosUci.nuevoTurno.statusHora = t.statusHora;
        TurnosUci.nuevoTurno.especialidad = t.especialidad;
        TurnosUci.nuevoTurno.fechaHoraTurno = t.fechaHoraTurno;
        TurnosUci.nuevoTurno.fechaTurno = t.fechaHoraTurno.split(' ')[0];
        TurnosUci.nuevoTurno.horaTurno = t.fechaHoraTurno.split(' ')[1];
        TurnosUci.nuevoTurno.usuarioTurno = t.usuarioTurno;
        TurnosUci.nuevoTurno.status = t.status;
        TurnosUci.nuevoTurno.gestion = 0;
    }

    static iniciarTurno() {

        TurnosUci.validarInicioTurno();
        TurnosUci.nuevoTurno = new Turno();
        TurnosUci.nuevoTurno.numeroHistoriaClinica = PacientesUCI.numeroHistoriaClinica;
        TurnosUci.nuevoTurno.numeroAtencion = PacientesUCI.numeroAtencion;
        TurnosUci.nuevoTurno.numeroTurno = PacientesUCI.numeroTurno;
        TurnosUci.nuevoTurno.statusHora = 1;
        TurnosUci.nuevoTurno.fechaTurno = moment().format('DD-MM-YYYY');
        TurnosUci.nuevoTurno.horaTurno = moment().format('HH:mm');
        TurnosUci.nuevoTurno.fechaHoraTurno = TurnosUci.nuevoTurno.fechaTurno + ' ' + TurnosUci.nuevoTurno.horaTurno;
        TurnosUci.nuevoTurno.usuarioTurno = PacientesUCI.usuarioTurno;
        FecthUci.registrarTurno();
        TurnosUci.nuevoTurno.abrirTurno();
        TurnosUci.turnos.push(TurnosUci.nuevoTurno);



    }

    static validarInicioTurno() {





        for (let index = 0; index < TurnosUci.turnos.length; index++) {
            let element = TurnosUci.turnos[index];
            if (element.status == 1) {
                $.alert("Ya existe un turno abierto");
                throw "Ya existe un turno abierto";
            }
            if (element.numeroTurno == PacientesUCI.numeroTurno && moment(element.fechaHoraTurno, 'DD-MM-YYYY HH:mm').format('DD-MM-YYYY') == moment().format('DD-MM-YYYY')) {
                $.alert({
                    title: "Error:",
                    content: "Ya existe un turno generado. Espere la hora del siguiente turno para generar nuevos registros.",
                    onClose: function() {
                        window.location.reload();
                    }
                });

                throw "Ya existe un turno generado. Espere la hora del siguiente turno para generar nuevos registros.";
            }
        }
    }

    static getTurnos() {
        return TurnosUci.turnos;
    }
}

export default TurnosUci;