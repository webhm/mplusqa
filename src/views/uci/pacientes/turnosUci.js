import m from "mithril";
import App from "../../../models/App";
import Loader from "../../utils/loader";
import Errors from "../../utils/errors";
import Table from "../../utils/table";
import FecthUci from "./fecthUci";
import PacientesUCI from "./pacientesUci";

class Turno {
    fechaTurno = null;
    usuarioTurno = null;
    paciente = null;
    especialidad = null;
    status = 0; // [1 => Turno Abierto, 2 Turno Cerrado]
    gestion = 0;
    constructor() {
        this.fechaTurno = this.fechaTurno;
        this.usuarioTurno = this.usuarioTurno;
        this.paciente = this.paciente;
        this.especialidad = this.especialidad;
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
class TurnosUci {
    static turnos = [];
    static nuevoTurno = null;

    static setTurno(t) {
        TurnosUci.nuevoTurno = new Turno();
        TurnosUci.nuevoTurno.fechaTurno = moment().format('DD-MM-YYYY HH:mm');
        TurnosUci.nuevoTurno.usuarioTurno = 'MCHANG';
        TurnosUci.nuevoTurno.paciente = 'PRUEBA PRUEBA PRODUCCION';
        TurnosUci.nuevoTurno.especialidad = 'MEDICINA INTERNA';
        TurnosUci.nuevoTurno.status = t.status;
        TurnosUci.nuevoTurno.gestion = 0;
    }

    static iniciarTurno() {
        TurnosUci.validarInicioTurno();
        FecthUci.registrarTurno();
        TurnosUci.nuevoTurno = new Turno();
        TurnosUci.nuevoTurno.fechaTurno = moment().format('DD-MM-YYYY HH:mm');
        TurnosUci.nuevoTurno.usuarioTurno = 'MCHANG';
        TurnosUci.nuevoTurno.paciente = 'PRUEBA PRUEBA PRODUCCION';
        TurnosUci.nuevoTurno.especialidad = 'MEDICINA INTERNA';
        TurnosUci.nuevoTurno.abrirTurno();
        TurnosUci.turnos.push(TurnosUci.nuevoTurno);
    }
    static validarInicioTurno() {
        for (let index = 0; index < TurnosUci.turnos.length; index++) {
            let element = TurnosUci.turnos[index];
            if (element.status == 1) {
                alert("Ya existe un turno abierto");
                throw "Ya existe un turno abierto";
            }
        }
    }
    static getTurnos() {
        return TurnosUci.turnos;
    }
}

export default TurnosUci;