import m from "mithril";
import App from "../../../models/App";
import Loader from "../../utils/loader";
import Errors from "../../utils/errors";
import TurnosUci from "./turnosUci";
import PacientesUCI from "./pacientesUci";

class FecthUci {

    static numeroHistoriaClinica = null;
    static numeroAtencion = null;
    static numeroTurno = null;
    static status = null;
    static fecha = null;
    static usuario = null;
    static dataTurnos = null;
    static dataSecciones = null;

    static setTurnos(dataTurnos) {

        dataTurnos.map((_v) => {
            TurnosUci.setTurno({
                fechaTurno: moment().format('DD-MM-YYYY HH:mm'),
                usuarioTurno: 'MCHANG',
                paciente: 'PACIENTE PRUEBA MV',
                especialidad: 'MEDICINA INTERNA',
                status: parseInt(_v.STATUS),
                gestion: 0,
            });
            TurnosUci.turnos.push(TurnosUci.nuevoTurno);
        });

        return TurnosUci.turnos;

    }

    static registrarTurno() {

        return m.request({
            method: "POST",
            url: "https://api.hospitalmetropolitano.org/v2/metroplus/uci/registrar-turno",
            body: {
                numeroHistoriaClinica: PacientesUCI.numeroHistoriaClinica,
                numeroAtencion: PacientesUCI.numeroAtencion,
                numeroTurno: PacientesUCI.numeroTurno,
                status: 1
            },
            headers: {
                "Content-Type": "application/json; charset=utf-8"
            }
        }).then(function(res) {

        }).catch(function(e) {

        });

    }

    static registrarSeccion(_dataSeccion) {

        return m.request({
            method: "POST",
            url: "https://api.hospitalmetropolitano.org/v2/metroplus/uci/registrar-seccion",
            body: {
                numeroAtencion: PacientesUCI.numeroAtencion,
                numeroTurno: PacientesUCI.numeroTurno,
                idSeccion: _dataSeccion.id,
                dataSeccion: _dataSeccion
            },
            headers: {
                "Content-Type": "application/json; charset=utf-8"
            }
        }).then(function(res) {

        }).catch(function(e) {

        });

    }

    static eliminarRegistro(_dataSeccion) {

        return m.request({
            method: "POST",
            url: "https://api.hospitalmetropolitano.org/v2/metroplus/uci/eliminar-seccion",
            body: {
                numeroAtencion: PacientesUCI.numeroAtencion,
                numeroTurno: PacientesUCI.numeroTurno,
                nro: _dataSeccion.nro,
            },
            headers: {
                "Content-Type": "application/json; charset=utf-8"
            }
        }).then(function(res) {

        }).catch(function(e) {

        });

    }

    static actualizarRegistro(_dataSeccion) {

        return m.request({
            method: "POST",
            url: "https://api.hospitalmetropolitano.org/v2/metroplus/uci/actualizar-seccion",
            body: {
                numeroAtencion: PacientesUCI.numeroAtencion,
                numeroTurno: PacientesUCI.numeroTurno,
                idSeccion: _dataSeccion.id,
                dataSeccion: _dataSeccion
            },
            headers: {
                "Content-Type": "application/json; charset=utf-8"
            }
        }).then(function(res) {

        }).catch(function(e) {

        });

    }

    static cerrarTurno() {

        return m.request({
            method: "POST",
            url: "https://api.hospitalmetropolitano.org/v2/metroplus/uci/cerrar-turno",
            body: {
                numeroHistoriaClinica: PacientesUCI.numeroHistoriaClinica,
                numeroAtencion: PacientesUCI.numeroAtencion,
                numeroTurno: PacientesUCI.numeroTurno,
                status: 2
            },
            headers: {
                "Content-Type": "application/json; charset=utf-8"
            }
        }).then(function(res) {

        }).catch(function(e) {

        });


    }

    static validarAtencion() {

        return m.request({
            method: "GET",
            url: "https://api.hospitalmetropolitano.org/v2/metroplus/uci/turnos-abiertos",
            params: {
                numeroHistoriaClinica: PacientesUCI.numeroHistoriaClinica,
                numeroAtencion: PacientesUCI.numeroAtencion,
            },
            headers: {
                "Content-Type": "application/json; charset=utf-8"
            }
        }).then(function(res) {
            if (res.status) {

                PacientesUCI.numeroHistoriaClinica = res.data.numeroHistoriaClinica;
                PacientesUCI.numeroAtencion = res.data.numeroAtencion;
                PacientesUCI.numeroTurno = res.data.numeroTurno;

                m.route.set("/uci/pacientes/", {
                    numeroHistoriaClinica: res.data.numeroHistoriaClinica,
                    numeroAtencion: res.data.numeroAtencion,
                    numeroTurno: res.data.numeroTurno
                });
                if (res.data.dataTurnos.length > 0) {
                    TurnosUci.turnos = FecthUci.setTurnos(res.data.dataTurnos);
                    PacientesUCI.vReloadTable('table-turnos', TurnosUci.getTurnos());
                }
                FecthUci.loadSecciones();

            }

        }).catch(function(e) {

        });


    }

    static loadSecciones() {
        return m.request({
            method: "GET",
            url: "https://api.hospitalmetropolitano.org/v2/metroplus/uci/detalle-all-secciones",
            params: {
                numeroAtencion: PacientesUCI.numeroAtencion,
            },
            headers: {
                "Content-Type": "application/json; charset=utf-8"
            }
        }).then(function(res) {

            FecthUci.dataSecciones = res.data;

            console.log(res)

        }).catch(function(e) {

        });
    }



}

export default FecthUci;