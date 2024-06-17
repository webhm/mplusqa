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
    static loaderSecciones = false;
    static dataTurnos = null;
    static dataSecciones = [];

    static setTurnos(dataTurnos) {

        dataTurnos.map((_v) => {
            TurnosUci.setTurno({
                fechaHoraTurno: _v.FECHA,
                usuarioTurno: _v.USUARIO,
                numeroHistoriaClinica: _v.NHC,
                numeroAtencion: _v.ATENCION,
                numeroTurno: parseInt(_v.PK_TURNO),
                paciente: 'PACIENTE PRUEBA MV',
                especialidad: 'MEDICINA INTERNA',
                statusHora: _v.STATUS_HORA,
                status: parseInt(_v.STATUS),
                gestion: 0,
            });
            TurnosUci.turnos.push(TurnosUci.nuevoTurno);
        });

        return TurnosUci.turnos;

    }

    static setTurnosAbiertos(dataTurnos) {

        dataTurnos.map((_v) => {
            TurnosUci.setTurno({
                fechaHoraTurno: _v.FECHA,
                usuarioTurno: _v.USUARIO,
                numeroHistoriaClinica: _v.NHC,
                numeroAtencion: _v.ATENCION,
                numeroTurno: parseInt(_v.PK_TURNO),
                paciente: 'PACIENTE PRUEBA MV',
                especialidad: 'MEDICINA INTERNA',
                statusHora: _v.STATUS_HORA,
                status: 4,
                gestion: 0,
            });
            TurnosUci.turnos.push(TurnosUci.nuevoTurno);
        });

        return TurnosUci.turnos;

    }

    static registrarTurno() {

        let _url = '';
        if (window.location.hostname == 'testmplus.hospitalmetropolitano.org') {
            _url = 'https://api.hospitalmetropolitano.org/v2/metroplus/uci/trn';
        } else {
            _url = 'https://api.hospitalmetropolitano.org/v2/metroplus/uci';
        }

        return m.request({
            method: "POST",
            url: _url + "/registrar-turno",
            body: {
                numeroHistoriaClinica: TurnosUci.nuevoTurno.numeroHistoriaClinica,
                numeroAtencion: TurnosUci.nuevoTurno.numeroAtencion,
                numeroTurno: TurnosUci.nuevoTurno.numeroTurno,
                usuarioTurno: TurnosUci.nuevoTurno.usuarioTurno,
                fechaHoraTurno: TurnosUci.nuevoTurno.fechaHoraTurno,
                status: 1
            },
            headers: {
                "Content-Type": "application/json; charset=utf-8"
            }
        }).then(function(res) {

        }).catch(function(e) {

        });

    }

    static registrarAllSeccion(_dataAllSeccion) {

        let _url = '';
        if (window.location.hostname == 'testmplus.hospitalmetropolitano.org') {
            _url = 'https://api.hospitalmetropolitano.org/v2/metroplus/uci/trn';
        } else {
            _url = 'https://api.hospitalmetropolitano.org/v2/metroplus/uci';
        }

        return m.request({
            method: "POST",
            url: _url + "/registrar-allseccion",
            body: {
                numeroAtencion: PacientesUCI.numeroAtencion,
                numeroTurno: PacientesUCI.numeroTurno,
                usuarioTurno: PacientesUCI.usuarioTurno,
                fechaHoraTurno: PacientesUCI.fechaHoraTurno,
                numeroHistoriaClinica: PacientesUCI.numeroHistoriaClinica,
                dataSeccion: _dataAllSeccion
            },
            headers: {
                "Content-Type": "application/json; charset=utf-8"
            }
        }).then(function(res) {

        }).catch(function(e) {

        });

    }

    static registrarSeccion(_dataSeccion) {

        let _url = '';
        if (window.location.hostname == 'testmplus.hospitalmetropolitano.org') {
            _url = 'https://api.hospitalmetropolitano.org/v2/metroplus/uci/trn';
        } else {
            _url = 'https://api.hospitalmetropolitano.org/v2/metroplus/uci';
        }

        return m.request({
            method: "POST",
            url: _url + "/registrar-seccion",
            body: {
                numeroAtencion: PacientesUCI.numeroAtencion,
                numeroTurno: PacientesUCI.numeroTurno,
                usuarioTurno: PacientesUCI.usuarioTurno,
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

    static eliminarSeccion(_dataSeccion) {

        let _url = '';
        if (window.location.hostname == 'testmplus.hospitalmetropolitano.org') {
            _url = 'https://api.hospitalmetropolitano.org/v2/metroplus/uci/trn';
        } else {
            _url = 'https://api.hospitalmetropolitano.org/v2/metroplus/uci';
        }

        return m.request({
            method: "POST",
            url: _url + "/eliminar-seccion",
            body: {
                numeroAtencion: PacientesUCI.numeroAtencion,
                numeroTurno: _dataSeccion.numeroTurno,
                nro: _dataSeccion.nro,
                seccion: _dataSeccion.seccion,
                fecha: _dataSeccion.fechaHoraTurno,

            },
            headers: {
                "Content-Type": "application/json; charset=utf-8"
            }
        }).then(function(res) {

        }).catch(function(e) {

        });

    }

    static actualizarHoraAtencion() {

        let _url = '';
        if (window.location.hostname == 'testmplus.hospitalmetropolitano.org') {
            _url = 'https://api.hospitalmetropolitano.org/v2/metroplus/uci/trn';
        } else {
            _url = 'https://api.hospitalmetropolitano.org/v2/metroplus/uci';
        }

        return m.request({
            method: "POST",
            url: _url + "/actualizar-atencion",
            body: {
                numeroAtencion: PacientesUCI.numeroAtencion,
                numeroTurno: PacientesUCI.numeroTurno,
                fechaHoraTurno: PacientesUCI.fechaHoraTurno,
                nuevaFechaHoraTurno: TurnosUci.nuevoTurno.fechaTurno + ' ' + TurnosUci.nuevoTurno.horaTurno,

            },
            headers: {
                "Content-Type": "application/json; charset=utf-8"
            }
        }).then(function(res) {
            window.location.reload();
        }).catch(function(e) {

        });

    }

    static actualizarSeccion(_dataSeccion) {

        let _url = '';
        if (window.location.hostname == 'testmplus.hospitalmetropolitano.org') {
            _url = 'https://api.hospitalmetropolitano.org/v2/metroplus/uci/trn';
        } else {
            _url = 'https://api.hospitalmetropolitano.org/v2/metroplus/uci';
        }

        return m.request({
            method: "POST",
            url: _url + "/actualizar-seccion",
            body: {
                numeroAtencion: PacientesUCI.numeroAtencion,
                numeroTurno: PacientesUCI.numeroTurno,
                usuarioTurno: PacientesUCI.usuarioTurno,
                idSeccion: _dataSeccion.id,
                dataSeccion: _dataSeccion
            },
            headers: {
                "Content-Type": "application/json; charset=utf-8"
            }
        }).then(function(res) {
            // El resultado

        }).catch(function(e) {

        });

    }

    static cerrarTurno(oData) {

        let _url = '';
        if (window.location.hostname == 'testmplus.hospitalmetropolitano.org') {
            _url = 'https://api.hospitalmetropolitano.org/v2/metroplus/uci/trn';
        } else {
            _url = 'https://api.hospitalmetropolitano.org/v2/metroplus/uci';
        }

        return m.request({
            method: "POST",
            url: _url + "/cerrar-turno",
            body: {
                numeroHistoriaClinica: oData.numeroHistoriaClinica,
                numeroAtencion: oData.numeroAtencion,
                numeroTurno: oData.numeroTurno,
                fechaHoraTurno: oData.fechaHoraTurno,
                status: 2
            },
            headers: {
                "Content-Type": "application/json; charset=utf-8"
            }
        }).then(function(res) {

            window.location.reload();

        }).catch(function(e) {

        });


    }

    static reAbrirTurno(oData) {

        let _url = '';
        if (window.location.hostname == 'testmplus.hospitalmetropolitano.org') {
            _url = 'https://api.hospitalmetropolitano.org/v2/metroplus/uci/trn';
        } else {
            _url = 'https://api.hospitalmetropolitano.org/v2/metroplus/uci';
        }

        return m.request({
            method: "POST",
            url: _url + "/reabrir-turno",
            body: {
                numeroHistoriaClinica: oData.numeroHistoriaClinica,
                numeroAtencion: oData.numeroAtencion,
                numeroTurno: oData.numeroTurno,
                fechaHoraTurno: oData.fechaHoraTurno,
                status: 1
            },
            headers: {
                "Content-Type": "application/json; charset=utf-8"
            }
        }).then(function(res) {

            window.location.reload();

        }).catch(function(e) {

        });


    }

    static asumirTurno(oData, usuarioTurno, comentario) {

        let _url = '';
        if (window.location.hostname == 'testmplus.hospitalmetropolitano.org') {
            _url = 'https://api.hospitalmetropolitano.org/v2/metroplus/uci/trn';
        } else {
            _url = 'https://api.hospitalmetropolitano.org/v2/metroplus/uci';
        }

        return m.request({
            method: "POST",
            url: _url + "/asumir-turno",
            body: {
                numeroHistoriaClinica: oData.numeroHistoriaClinica,
                numeroAtencion: oData.numeroAtencion,
                numeroTurno: oData.numeroTurno,
                fechaHoraTurno: oData.fechaHoraTurno,
                usuarioTurno: usuarioTurno,
                status: 1,
                comentario: comentario
            },
            headers: {
                "Content-Type": "application/json; charset=utf-8"
            }
        }).then(function(res) {

            window.location.reload();

        }).catch(function(e) {

        });


    }

    static cancelarTurno(oData, usuarioTurno, comentario) {

        let _url = '';
        if (window.location.hostname == 'testmplus.hospitalmetropolitano.org') {
            _url = 'https://api.hospitalmetropolitano.org/v2/metroplus/uci/trn';
        } else {
            _url = 'https://api.hospitalmetropolitano.org/v2/metroplus/uci';
        }

        return m.request({
            method: "POST",
            url: _url + "/cancelar-turno",
            body: {
                numeroHistoriaClinica: oData.numeroHistoriaClinica,
                numeroAtencion: oData.numeroAtencion,
                numeroTurno: oData.numeroTurno,
                fechaHoraTurno: oData.fechaHoraTurno,
                usuarioTurno: usuarioTurno,
                status: 1,
                comentario: comentario
            },
            headers: {
                "Content-Type": "application/json; charset=utf-8"
            }
        }).then(function(res) {

            window.location.reload();

        }).catch(function(e) {

        });


    }

    static validarAtencion() {

        let _url = '';
        if (window.location.hostname == 'testmplus.hospitalmetropolitano.org') {
            _url = 'https://api.hospitalmetropolitano.org/v2/metroplus/uci/trn';
        } else {
            _url = 'https://api.hospitalmetropolitano.org/v2/metroplus/uci';
        }

        return m.request({
            method: "GET",
            url: _url + "/turnos-abiertos",
            params: {
                numeroHistoriaClinica: PacientesUCI.numeroHistoriaClinica,
                numeroAtencion: PacientesUCI.numeroAtencion,
            },
            headers: {
                "Content-Type": "application/json; charset=utf-8"
            }
        }).then(function(res) {
            if (res.status) {

                TurnosUci.turnos = [];
                PacientesUCI.numeroHistoriaClinica = res.data.numeroHistoriaClinica;
                PacientesUCI.numeroAtencion = res.data.numeroAtencion;
                PacientesUCI.numeroTurno = res.data.numeroTurno;

                m.route.set("/uci/pacientes/", {
                    numeroHistoriaClinica: res.data.numeroHistoriaClinica,
                    numeroAtencion: res.data.numeroAtencion,
                    usuario: PacientesUCI.usuarioTurno,
                    numeroTurno: res.data.numeroTurno
                });



                // Existe turnos abiertos
                let turnosAbiertos = res.data.dataTurnos.filter(v => moment(v.FECHA, 'DD-MM-YYYY HH:mm').format('DD-MM-YYYY') != moment().format('DD-MM-YYYY') && v.STATUS == 1)

                if (turnosAbiertos.length > 0) {
                    FecthUci.loaderSecciones = true;
                    TurnosUci.turnos = FecthUci.setTurnosAbiertos(turnosAbiertos);
                    PacientesUCI.vReloadTable('table-turnos', TurnosUci.getTurnos());
                    setTimeout(() => {
                        $.alert('Existen turnos abiertos. Por favor cierre los turnos para continuar.');
                    }, 500);



                } else {

                    // Filter Turnos de Hoy
                    let turnosHoy = res.data.dataTurnos.filter(v => moment(v.FECHA, 'DD-MM-YYYY HH:mm').format('DD-MM-YYYY') == moment().format('DD-MM-YYYY'))

                    if (turnosHoy.length > 0) {
                        TurnosUci.turnos = FecthUci.setTurnos(turnosHoy);
                        PacientesUCI.vReloadTable('table-turnos', TurnosUci.getTurnos());
                    }

                    FecthUci.loadSecciones();
                }




            }

        }).catch(function(e) {

        });


    }

    static validarTipoAtencion() {

        let _url = '';
        if (window.location.hostname == 'testmplus.hospitalmetropolitano.org') {
            _url = 'https://api.hospitalmetropolitano.org/v2/metroplus/uci/trn';
        } else {
            _url = 'https://api.hospitalmetropolitano.org/v2/metroplus/uci';
        }

        return m.request({
            method: "POST",
            url: _url + "/validar-atencion",
            body: {
                numeroAtencion: PacientesUCI.numeroAtencion,
            },
            headers: {
                "Content-Type": "application/json; charset=utf-8"
            }
        }).then(function(res) {

            if (res.status) {
                PacientesUCI.tipoAtencion = res.data.ATENCION;
            }


        }).catch(function(e) {

        });


    }

    static loadSecciones() {

        FecthUci.loaderSecciones = false;

        let _url = '';
        if (window.location.hostname == 'testmplus.hospitalmetropolitano.org') {
            _url = 'https://api.hospitalmetropolitano.org/v2/metroplus/uci/trn';
        } else {
            _url = 'https://api.hospitalmetropolitano.org/v2/metroplus/uci';
        }

        return m.request({
            method: "GET",
            url: _url + "/detalle-all-secciones",
            params: {
                numeroAtencion: PacientesUCI.numeroAtencion,
            },
            headers: {
                "Content-Type": "application/json; charset=utf-8"
            }
        }).then(function(res) {

            FecthUci.loaderSecciones = true;
            // Filter Secciones de Hoy
            // let seccionesHoy = res.data.filter(v => moment(v.FECHA, 'DD-MM-YYYY HH:mm').format('DD-MM-YYYY') == moment().format('DD-MM-YYYY') && v.SECCION != 'PrescripcionesUci')
            let seccionesHoy = res.data.filter(v => moment(v.FECHA, 'DD-MM-YYYY HH:mm').format('DD-MM-YYYY') == moment().format('DD-MM-YYYY'))
            console.log('seccionesHoy', seccionesHoy)

            /*

            if (moment(moment(), 'DD-MM-YYYY HH:mm').unix() > moment(moment(), 'DD-MM-YYYY 12:00').unix()) {
                // Filter prescripciones 
                let prescripcionesUci = res.data.filter(v => v.SECCION == 'PrescripcionesUci')
                console.log('prescripcionesUci', prescripcionesUci)
                FecthUci.dataSecciones = seccionesHoy.concat(prescripcionesUci);
                // FecthUci.dataSecciones = seccionesHoy;
            } else {
                FecthUci.dataSecciones = seccionesHoy
            }

            */

            let prescripcionesUci = res.data.filter(v => v.SECCION == 'PrescripcionesUci')
            console.log('prescripcionesUci', prescripcionesUci)
            FecthUci.dataSecciones = seccionesHoy.concat(prescripcionesUci);



        }).catch(function(e) {

        });
    }



}

export default FecthUci;