import m from "mithril";
import TurnosUciHistorial from "./turnosUci";
import PacientesUCIHistorial from "./pacientesUci";

class FecthUci {

    static numeroHistoriaClinica = null;
    static numeroAtencion = null;
    static numeroTurno = null;
    static status = null;
    static fecha = null;
    static usuario = null;
    static dataTurnos = null;
    static dataHistorial = [];

    static setTurnos(dataTurnos) {

        dataTurnos.map((_v) => {
            TurnosUciHistorial.setTurno({
                fechaHoraTurno: _v.FECHA,
                usuarioTurno: _v.USUARIO,
                numeroHistoriaClinica: _v.NHC,
                numeroAtencion: _v.ATENCION,
                numeroTurno: parseInt(_v.PK_TURNO),
                paciente: 'PACIENTE PRUEBA MV',
                especialidad: 'MEDICINA INTERNA',
                status: parseInt(_v.STATUS),
                asume: 'Usuario: '+  _v.USUARIO_ASUME + '<br/>Fecha:'+ _v.FECHA_ASUME+ '<br/>Comentario:'+ _v.COMENTARIO,
                cancela: 'Usuario: '+  _v.USUARIO_CANCELA + '<br/>Fecha:'+ _v.FECHA_CANCELA+ '<br/>Comentario:'+ _v.COMENTARIO_CANCELA,
                cancela: '',
                gestion: 0,
            });
            TurnosUciHistorial.turnos.push(TurnosUciHistorial.nuevoTurno);
        });

        return TurnosUciHistorial.turnos.sort((a, b) => a.numeroTurno - b.numeroTurno);

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
                numeroHistoriaClinica: TurnosUciHistorial.nuevoTurno.numeroHistoriaClinica,
                numeroAtencion: TurnosUciHistorial.nuevoTurno.numeroAtencion,
                numeroTurno: TurnosUciHistorial.nuevoTurno.numeroTurno,
                usuarioTurno: TurnosUciHistorial.nuevoTurno.usuarioTurno,
                fechaHoraTurno: TurnosUciHistorial.nuevoTurno.fechaHoraTurno,
                status: 1
            },
            headers: {
                "Content-Type": "application/json; charset=utf-8"
            }
        }).then(function (res) {

        }).catch(function (e) {

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
                numeroAtencion: PacientesUCIHistorial.numeroAtencion,
                numeroTurno: PacientesUCIHistorial.numeroTurno,
                fechaHoraTurno: PacientesUCIHistorial.fechaHoraTurno,
                dataSeccion: _dataAllSeccion
            },
            headers: {
                "Content-Type": "application/json; charset=utf-8"
            }
        }).then(function (res) {

        }).catch(function (e) {

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
                numeroAtencion: PacientesUCIHistorial.numeroAtencion,
                numeroTurno: PacientesUCIHistorial.numeroTurno,
                idSeccion: _dataSeccion.id,
                dataSeccion: _dataSeccion
            },
            headers: {
                "Content-Type": "application/json; charset=utf-8"
            }
        }).then(function (res) {

        }).catch(function (e) {

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
                numeroAtencion: PacientesUCIHistorial.numeroAtencion,
                numeroTurno: _dataSeccion.numeroTurno,
                nro: _dataSeccion.nro,
                seccion: _dataSeccion.seccion,
                fecha: _dataSeccion.fechaHoraTurno,

            },
            headers: {
                "Content-Type": "application/json; charset=utf-8"
            }
        }).then(function (res) {

        }).catch(function (e) {

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
                numeroAtencion: PacientesUCIHistorial.numeroAtencion,
                numeroTurno: PacientesUCIHistorial.numeroTurno,
                fechaHoraTurno: PacientesUCIHistorial.fechaHoraTurno,
                nuevaFechaHoraTurno: TurnosUciHistorial.nuevoTurno.fechaTurno + ' ' + TurnosUciHistorial.nuevoTurno.horaTurno,

            },
            headers: {
                "Content-Type": "application/json; charset=utf-8"
            }
        }).then(function (res) {
            window.location.reload();
        }).catch(function (e) {

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
                numeroAtencion: PacientesUCIHistorial.numeroAtencion,
                numeroTurno: PacientesUCIHistorial.numeroTurno,
                idSeccion: _dataSeccion.id,
                dataSeccion: _dataSeccion
            },
            headers: {
                "Content-Type": "application/json; charset=utf-8"
            }
        }).then(function (res) {
            // El resultado

        }).catch(function (e) {

        });

    }

    static cerrarTurno() {

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
                numeroHistoriaClinica: PacientesUCIHistorial.numeroHistoriaClinica,
                numeroAtencion: PacientesUCIHistorial.numeroAtencion,
                numeroTurno: PacientesUCIHistorial.numeroTurno,
                status: 2
            },
            headers: {
                "Content-Type": "application/json; charset=utf-8"
            }
        }).then(function (res) {

            window.location.reload();

        }).catch(function (e) {

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
                numeroHistoriaClinica: PacientesUCIHistorial.numeroHistoriaClinica,
                numeroAtencion: PacientesUCIHistorial.numeroAtencion,
            },
            headers: {
                "Content-Type": "application/json; charset=utf-8"
            }
        }).then(function (res) {
            if (res.status) {

                PacientesUCIHistorial.numeroHistoriaClinica = res.data.numeroHistoriaClinica;
                PacientesUCIHistorial.numeroAtencion = res.data.numeroAtencion;
                PacientesUCIHistorial.numeroTurno = res.data.numeroTurno;

                m.route.set("/uci/pacientes/", {
                    numeroHistoriaClinica: res.data.numeroHistoriaClinica,
                    numeroAtencion: res.data.numeroAtencion,
                    usuario: PacientesUCIHistorial.usuarioTurno,
                    numeroTurno: res.data.numeroTurno
                });

                if (res.data.dataTurnos.length > 0) {
                    TurnosUciHistorial.turnos = FecthUci.setTurnos(res.data.dataTurnos);
                    PacientesUCIHistorial.vReloadTable('table-turnos', TurnosUciHistorial.getTurnos());
                }

                FecthUci.loadSecciones();

            }

        }).catch(function (e) {

        });


    }

    static validarAtencionHistorial() {

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
                numeroHistoriaClinica: PacientesUCIHistorial.numeroHistoriaClinica,
                numeroAtencion: PacientesUCIHistorial.numeroAtencion,
            },
            headers: {
                "Content-Type": "application/json; charset=utf-8"
            }
        }).then(function (res) {
            if (res.status) {

                TurnosUciHistorial.turnos = [];
                PacientesUCIHistorial.numeroHistoriaClinica = res.data.numeroHistoriaClinica;
                PacientesUCIHistorial.numeroAtencion = res.data.numeroAtencion;
                PacientesUCIHistorial.numeroTurno = res.data.numeroTurno;

                m.route.set("/uci/pacientes/historial", {
                    numeroHistoriaClinica: res.data.numeroHistoriaClinica,
                    numeroAtencion: res.data.numeroAtencion,
                    usuario: PacientesUCIHistorial.usuarioTurno,
                    numeroTurno: res.data.numeroTurno
                });

                let turnos = res.data.dataTurnos.filter(v =>
                    moment(moment(v.FECHA, 'DD-MM-YYYY HH:mm').format('DD-MM-YYYY HH:mm'), 'DD-MM-YYYY HH:mm').unix() >= moment(PacientesUCIHistorial.fechaDesde + ' ' + PacientesUCIHistorial.horaDesde, 'DD-MM-YYYY HH:mm').unix()
                    && moment(moment(v.FECHA, 'DD-MM-YYYY HH:mm').format('DD-MM-YYYY HH:mm'), 'DD-MM-YYYY HH:mm').unix() <= moment(PacientesUCIHistorial.fechaHasta + ' ' + PacientesUCIHistorial.horaHasta, 'DD-MM-YYYY HH:mm').unix()
                    && v.TIPO_BIT == 'UCIADULTO');

                console.log(88, moment(PacientesUCIHistorial.fechaDesde + ' ' + PacientesUCIHistorial.horaDesde, 'DD-MM-YYYY HH:mm').format('DD-MM-YYYY HH:mm'))


                if (turnos.length > 0) {
                    TurnosUciHistorial.turnos = FecthUci.setTurnos(turnos);
                    PacientesUCIHistorial.vReloadTable('table-turnos', TurnosUciHistorial.getTurnos().sort((a, b) => a.numeroTurno - b.numeroTurno));
                }

                FecthUci.loadSeccionesHistorial(PacientesUCIHistorial.fechaDesde, PacientesUCIHistorial.horaHasta, PacientesUCIHistorial.fechaHasta, PacientesUCIHistorial.horaHasta);

            }

        }).catch(function (e) {

        });


    }

    static loadSecciones() {

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
                numeroAtencion: PacientesUCIHistorial.numeroAtencion,
            },
            headers: {
                "Content-Type": "application/json; charset=utf-8"
            }
        }).then(function (res) {

            FecthUci.dataHistorial = res.data;

            console.log(res)

        }).catch(function (e) {

        });
    }

    static loadSeccionesHistorial(fechaDesde, horaDesde, fechaHasta, horaHasta) {


        PacientesUCIHistorial.resetSecs();

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
                numeroAtencion: PacientesUCIHistorial.numeroAtencion,
                fechaBusqueda: fechaDesde,
            },
            headers: {
                "Content-Type": "application/json; charset=utf-8"
            }
        }).then(function (res) {

            if (res.data.length == 0) {
                $.alert('No existe información en la fecha ingresada.');
            } else {

                let seccionesHoy = res.data.filter(v =>
                    moment(moment(v.FECHA, 'DD-MM-YYYY HH:mm').format('DD-MM-YYYY HH:mm'), 'DD-MM-YYYY HH:mm').unix() >= moment(fechaDesde + ' ' + horaDesde, 'DD-MM-YYYY HH:mm').unix()
                    && moment(moment(v.FECHA, 'DD-MM-YYYY HH:mm').format('DD-MM-YYYY HH:mm'), 'DD-MM-YYYY HH:mm').unix() <= moment(fechaHasta + ' ' + horaHasta, 'DD-MM-YYYY HH:mm').unix()
                    && JSON.parse(v.DATASECCION).tipoBit == undefined);

                let _res = TurnosUciHistorial.turnos.map(turno =>
                    seccionesHoy.filter(seccion => (turno.fechaHoraTurno === seccion.FECHA) && (turno.fechaHoraTurno === seccion.FECHA))
                );

                let t = [];

                _res.map((_v, _i) => {
                    _v.map((a, b) => {
                        t.push(a);
                    });
                });

                FecthUci.dataHistorial = t;
                PacientesUCIHistorial.loadSecs();

            }



        }).catch(function (e) {

        });
    }



}

export default FecthUci;