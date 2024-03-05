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
                gestion: 0,
            });
            TurnosUciHistorial.turnos.push(TurnosUciHistorial.nuevoTurno);
        });

        return TurnosUciHistorial.turnos;

    }

    static registrarTurno() {

        return m.request({
            method: "POST",
            url: "https://api.hospitalmetropolitano.org/v2/metroplus/uci/registrar-turno",
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
        }).then(function(res) {

        }).catch(function(e) {

        });

    }

    static registrarAllSeccion(_dataAllSeccion) {

        return m.request({
            method: "POST",
            url: "https://api.hospitalmetropolitano.org/v2/metroplus/uci/registrar-allseccion",
            body: {
                numeroAtencion: PacientesUCIHistorial.numeroAtencion,
                numeroTurno: PacientesUCIHistorial.numeroTurno,
                fechaHoraTurno: PacientesUCIHistorial.fechaHoraTurno,
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

        return m.request({
            method: "POST",
            url: "https://api.hospitalmetropolitano.org/v2/metroplus/uci/registrar-seccion",
            body: {
                numeroAtencion: PacientesUCIHistorial.numeroAtencion,
                numeroTurno: PacientesUCIHistorial.numeroTurno,
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

        return m.request({
            method: "POST",
            url: "https://api.hospitalmetropolitano.org/v2/metroplus/uci/eliminar-seccion",
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
        }).then(function(res) {

        }).catch(function(e) {

        });

    }

    static actualizarHoraAtencion() {

        return m.request({
            method: "POST",
            url: "https://api.hospitalmetropolitano.org/v2/metroplus/uci/actualizar-atencion",
            body: {
                numeroAtencion: PacientesUCIHistorial.numeroAtencion,
                numeroTurno: PacientesUCIHistorial.numeroTurno,
                fechaHoraTurno: PacientesUCIHistorial.fechaHoraTurno,
                nuevaFechaHoraTurno: TurnosUciHistorial.nuevoTurno.fechaTurno + ' ' + TurnosUciHistorial.nuevoTurno.horaTurno,

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

        return m.request({
            method: "POST",
            url: "https://api.hospitalmetropolitano.org/v2/metroplus/uci/actualizar-seccion",
            body: {
                numeroAtencion: PacientesUCIHistorial.numeroAtencion,
                numeroTurno: PacientesUCIHistorial.numeroTurno,
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

    static cerrarTurno() {

        return m.request({
            method: "POST",
            url: "https://api.hospitalmetropolitano.org/v2/metroplus/uci/cerrar-turno",
            body: {
                numeroHistoriaClinica: PacientesUCIHistorial.numeroHistoriaClinica,
                numeroAtencion: PacientesUCIHistorial.numeroAtencion,
                numeroTurno: PacientesUCIHistorial.numeroTurno,
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

    static validarAtencion() {

        return m.request({
            method: "GET",
            url: "https://api.hospitalmetropolitano.org/v2/metroplus/uci/turnos-abiertos",
            params: {
                numeroHistoriaClinica: PacientesUCIHistorial.numeroHistoriaClinica,
                numeroAtencion: PacientesUCIHistorial.numeroAtencion,
            },
            headers: {
                "Content-Type": "application/json; charset=utf-8"
            }
        }).then(function(res) {
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

        }).catch(function(e) {

        });


    }

    static validarAtencionHistorial() {

        return m.request({
            method: "GET",
            url: "https://api.hospitalmetropolitano.org/v2/metroplus/uci/turnos-abiertos",
            params: {
                numeroHistoriaClinica: PacientesUCIHistorial.numeroHistoriaClinica,
                numeroAtencion: PacientesUCIHistorial.numeroAtencion,
            },
            headers: {
                "Content-Type": "application/json; charset=utf-8"
            }
        }).then(function(res) {
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

                if (res.data.dataTurnos.length > 0) {
                    TurnosUciHistorial.turnos = FecthUci.setTurnos(res.data.dataTurnos);
                    //PacientesUCIHistorial.vReloadTable('table-turnos', TurnosUciHistorial.getTurnos());
                }

                //  FecthUci.loadSeccionesHistorial();

            }

        }).catch(function(e) {

        });


    }

    static loadSecciones() {
        return m.request({
            method: "GET",
            url: "https://api.hospitalmetropolitano.org/v2/metroplus/uci/detalle-all-secciones",
            params: {
                numeroAtencion: PacientesUCIHistorial.numeroAtencion,
            },
            headers: {
                "Content-Type": "application/json; charset=utf-8"
            }
        }).then(function(res) {

            FecthUci.dataHistorial = res.data;

            console.log(res)

        }).catch(function(e) {

        });
    }

    static loadSeccionesHistorial(fechaBusqueda) {

        PacientesUCIHistorial.resetSecs();

        return m.request({
            method: "GET",
            url: "https://api.hospitalmetropolitano.org/v2/metroplus/uci/detalle-all-secciones",
            params: {
                numeroAtencion: PacientesUCIHistorial.numeroAtencion,
                fechaBusqueda: fechaBusqueda,
            },
            headers: {
                "Content-Type": "application/json; charset=utf-8"
            }
        }).then(function(res) {

            if (res.data.length == 0) {
                alert('No existe información en la fecha ingresada.');
            } else {
                FecthUci.dataHistorial = res.data;
                PacientesUCIHistorial.loadSecs();

                console.log(res)
            }



        }).catch(function(e) {

        });
    }



}

export default FecthUci;