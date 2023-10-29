import m from "mithril";

// Cita
class Cita {
    static track = null;
    static buscarPacientes = false;
    static buscarItems = false;
    static loader = false;
    static data = null;
    static error = null;
    static success = null;

    static verCita(calEvent) {
        Cita.data = {};
        Cita.data.tipo = calEvent.tipo;
        Cita.data.id = calEvent.id;
        Cita.data.hashCita = calEvent.id;
        Cita.data.idCalendar = calEvent.idCalendar;
        Cita.data.start = calEvent.start.format("dddd, DD-MM-YYYY HH:mm");
        Cita.data.end = calEvent.end.format("dddd, DD-MM-YYYY HH:mm");
        Cita.data.paciente = calEvent.title;
        Cita.data.estudio = calEvent.estudio;
        Cita.data.editable = calEvent.editable;
        Cita.data.comentarios = calEvent.comentarios;
        Cita.data.calendarios = calEvent.calendarios;
        Cita.data.pn_inicio = calEvent.pn_inicio;
        Cita.data.pn_fin = calEvent.pn_fin;
        Cita.data.sexType = calEvent.sexType;
        Cita.data.email = calEvent.email;
        Cita.data.pc_fecha_nacimiento = calEvent.pc_fecha_nacimiento;
        let nacimiento = moment(calEvent.pc_fecha_nacimiento);
        let hoy = moment();
        Cita.data.anios = hoy.diff(nacimiento, "years");
        if (Cita.data.tipo == 2) {
            Cita.data.evento = calEvent.title;
        }
        if (Cita.data.tipo == 3) {
            Cita.data.nota = calEvent.title;
        }


        $('[data-toggle="tooltip"]').tooltip("hide");
        let modal = $("#modalCalendarEvent");
        modal.modal("show");
        modal.find(".modal-header").css("backgroundColor", calEvent.borderColor ? calEvent.borderColor : calEvent.borderColor);
        m.redraw();
    }

    static verEvento(calEvent) {
        Cita.data = {};
        Cita.data.tipo = calEvent.tipo;
        Cita.data.id = calEvent.id;
        Cita.data.hashCita = calEvent.id;
        Cita.data.idCalendar = calEvent.idCalendar;
        Cita.data.start = calEvent.start.format("dddd, DD-MM-YYYY HH:mm");
        Cita.data.end = calEvent.end.format("dddd, DD-MM-YYYY HH:mm");
        Cita.data.comentarios = calEvent.description;
        Cita.data.calendarios = calEvent.calendarios;
        Cita.data.pn_inicio = calEvent.pn_inicio;
        Cita.data.pn_fin = calEvent.pn_fin;
        Cita.data.paciente = calEvent.title;
        Cita.data.editable = calEvent.editable;

        $('[data-toggle="tooltip"]').tooltip("hide");
        let modal = $("#modalCalendarEvent");
        modal.modal("show");
        modal.find(".modal-header").css("backgroundColor", calEvent.borderColor ? calEvent.borderColor : calEvent.borderColor);
        m.redraw();
    }

    static verUpdate(calEvent) {

        if (calEvent.tipo == 1) {
            Cita.data.tipo = calEvent.tipo;
            Cita.data.id = calEvent.id;
            Cita.data.hashCita = calEvent.id;
            Cita.data.idCalendar = calEvent.idCalendar;
            Cita.data.start = calEvent.start.format("dddd, DD-MM-YYYY HH:mm");
            Cita.data.end = calEvent.end.format("dddd, DD-MM-YYYY HH:mm");
            Cita.data.paciente = calEvent.title;
            Cita.data.estudio = calEvent.estudio;
            Cita.data.editable = calEvent.editable;
            Cita.data.comentarios = calEvent.comentarios;
            Cita.data.calendarios = calEvent.calendarios;
            Cita.data.pn_inicio = calEvent.pn_inicio;
            Cita.data.pn_fin = calEvent.pn_fin;
            Cita.data.sexType = calEvent.sexType;
            Cita.data.email = calEvent.email;
            Cita.data.pc_email = calEvent.pc_email;
            Cita.data.pc_fecha_nacimiento = calEvent.pc_fecha_nacimiento;
            let nacimiento = moment(calEvent.pc_fecha_nacimiento);
            let hoy = moment();
            Cita.data.anios = hoy.diff(nacimiento, "years");
            Cita.data.newHashCita = calEvent.start.format("YYYY-MM-DD HH:mm") + "." + calEvent.end.format("YYYY-MM-DD HH:mm");

        } else {
            Cita.data.tipo = calEvent.tipo;
            Cita.data.id = calEvent.id;
            Cita.data.hashCita = calEvent.id;
            Cita.data.idCalendar = calEvent.idCalendar;
            Cita.data.start = calEvent.start.format("dddd, DD-MM-YYYY HH:mm");
            Cita.data.end = calEvent.end.format("dddd, DD-MM-YYYY HH:mm");
            Cita.data.comentarios = calEvent.description;
            Cita.data.calendarios = calEvent.calendarios;
            Cita.data.paciente = calEvent.title;
            Cita.data.editable = calEvent.editable;
            Cita.data.newHashCita = calEvent.start.format("YYYY-MM-DD HH:mm") + "." + calEvent.end.format("YYYY-MM-DD HH:mm");

            if (Cita.data.tipo == 2) {
                Cita.data.evento = calEvent.title;
            }
            if (Cita.data.tipo == 3) {
                Cita.data.nota = calEvent.title;
            }
        }



        $('[data-toggle="tooltip"]').tooltip("hide");
        let modal = $("#modalUpdateEvent");
        modal.modal("show");
        modal.find(".modal-header").css("backgroundColor", calEvent.borderColor ? calEvent.borderColor : calEvent.borderColor);
        m.redraw();
    }

    static validarCita() {

        let fecha = moment(Cita.data.inicio, "DD/MM/YYYY HH:mm").format("YYYY-MM-DD HH:mm");
        if (moment(fecha).unix() < moment().unix()) {
            $("#modalCreateEvent").animate({
                scrollTop: 0
            }, "slow");
            Cita.error = "No se puede agendar una cita en fecha y hora anterior.";
            m.redraw();
            throw Cita.error;
        }

        if (Cita.data.id_estudio == undefined) {
            $("#modalCreateEvent").animate({
                scrollTop: 0
            }, "slow");
            Cita.error = "No existe datos de estudio.";
            m.redraw();
            throw Cita.error;
        }


        if (Cita.data.paciente == undefined) {
            $("#modalCreateEvent").animate({
                scrollTop: 0
            }, "slow");
            Cita.error = "No existe datos de paciente.";
            m.redraw();
            throw Cita.error;
        }

    }

    static crearCita(startDate, endDate) {
        $('[data-toggle="tooltip"]').tooltip("hide");
        $("#modalCreateEvent").modal("show");
        Cita.buscarPacientes = false;
        Cita.buscarItems = false;
        Cita.error = null;
        Cita.data = null;
        Cita.data = {};
        Cita.data.tipo = 1;
        Cita.data.comentarios = "";
        Cita.data.hashCita = startDate.format("YYYY-MM-DD HH:mm") + "." + endDate.format("YYYY-MM-DD HH:mm");
        Cita.data.start = startDate.format("dddd, DD-MM-YYYY HH:mm");
        Cita.data.end = endDate.format("dddd, DD-MM-YYYY HH:mm");
        Cita.data.inicio = startDate.format("DD/MM/YYYY HH:mm");
        Cita.data.fin = endDate.format("DD/MM/YYYY HH:mm");
        m.redraw();
    }

    static crearEvento() {
        Cita.buscarPacientes = false;
        Cita.buscarItems = false;
        let _data;
        _data = Cita.data;
        Cita.data = null;
        Cita.data = {};
        Cita.data.tipo = 2;
        Cita.data.start = _data.start;
        Cita.data.end = _data.end;
        Cita.data.inicio = _data.inicio;
        Cita.data.fin = _data.fin;
        Cita.data.hashCita = moment(_data.inicio, 'DD/MM/YYYY HH:mm').format("YYYY-MM-DD HH:mm") + "." + moment(_data.end, 'DD/MM/YYYY HH:mm').format("YYYY-MM-DD HH:mm");
        m.redraw();
    }

    static crearNota() {
        Cita.buscarPacientes = false;
        Cita.buscarItems = false;
        let _data;
        _data = Cita.data;
        Cita.data = null;
        Cita.data = {};
        Cita.data.tipo = 3;
        Cita.data.start = _data.start;
        Cita.data.end = _data.end;
        Cita.data.inicio = _data.inicio;
        Cita.data.fin = _data.fin;
        Cita.data.hashCita = moment(_data.inicio, 'DD/MM/YYYY HH:mm').format("YYYY-MM-DD HH:mm") + "." + moment(_data.end, 'DD/MM/YYYY HH:mm').format("YYYY-MM-DD HH:mm");
        m.redraw();
    }

    static reagendarHttp() {
        console.log(33, Cita.data)

        Cita.data.error = undefined;

        if (Cita.data.tipo == 1) {
            if (Cita.data.email != document.getElementById('correoCitaUpdate').value) {
                Cita.data.email = document.getElementById('correoCitaUpdate').value;
            }
        }

        Calendario.validarAgendamiento();
        Cita.loader = true;
        Cita.data.calendarios = Calendario.calendarios;

        m.request({
            method: "POST",
            url: "https://api.hospitalmetropolitano.org/v2/date/citas/upcall",
            body: Cita.data,
            headers: {
                "Content-Type": "application/json; charset=utf-8"
            }
        }).then(function(res) {
            Cita.loader = false;
            if (res.status) {
                Cita.reAgendarCita();
            } else {
                $("#modalUpdateEvent").animate({
                    scrollTop: 0
                }, "slow");
                Cita.data.error = res.message;
                throw res.message;
            }
        }).catch(function(e) {
            $("#modalUpdateEvent").animate({
                scrollTop: 0
            }, "slow");
            Cita.data.error = e;
            throw e;
        });
    }

    static cancelarHttp() {
        Cita.data.error = undefined;
        Cita.loader = true;
        Cita.data.idCalendar = Calendario.idCalendar;
        Cita.data.calendarios = Calendario.calendarios;

        m.request({
            method: "POST",
            url: "https://api.hospitalmetropolitano.org/v2/date/citas/delcall",
            body: Cita.data,
            headers: {
                "Content-Type": "application/json; charset=utf-8"
            }
        }).then(function(res) {
            Cita.loader = false;
            if (res.status) {
                Cita.cancelarCita();
            } else {
                $("#modalCreateEvent").animate({
                    scrollTop: 0
                }, "slow");
                Cita.data.error = res.message;
                throw res.message;
            }
        }).catch(function(e) {
            $("#modalCreateEvent").animate({
                scrollTop: 0
            }, "slow");
            Cita.data.error = e;
            throw e;
        });
    }

    static agendarCitaHttp() {






        if (Cita.data.email != document.getElementById('correoCreaCita').value) {
            Cita.data.email = document.getElementById('correoCreaCita').value;
        }

        throw "jj";

        Cita.loader = true;
        Cita.data.idCalendar = Calendario.idCalendar;
        Cita.data.calendarios = Calendario.calendarios;

        m.request({
            method: "POST",
            url: "https://api.hospitalmetropolitano.org/v2/date/citas/call",
            body: Cita.data,
            headers: {
                "Content-Type": "application/json; charset=utf-8"
            }
        }).then(function(res) {
            Cita.loader = false;
            if (res.status) {
                Cita.agendarCita();
            } else {
                $("#modalCreateEvent").animate({
                    scrollTop: 0
                }, "slow");
                Cita.data.error = res.message;
                throw res.message;
            }
        }).catch(function(e) {
            $("#modalCreateEvent").animate({
                scrollTop: 0
            }, "slow");
            Cita.data.error = e;
            throw e;
        });
    }

    static trackReAgendar() {
        console.log(Cita.data)

        Cita.loader = true;

        m.request({
            method: "POST",
            url: "https://api.hospitalmetropolitano.org/v2/date/citas/reagendar",
            body: Cita.data,
            headers: {
                "Content-Type": "application/json; charset=utf-8"
            }
        }).then(function(res) {
            Cita.loader = false;

            if (res.status) {
                FetchCalendario.reloadFetchAgenda();
                Calendario.success = "Ahora puede reagendar este Cita.";
                Calendario.clearAlertCalendar();
            } else {
                Calendario.error = res.message;
            }
        }).catch(function(e) {
            Calendario.error = e;
        });
    }

    static trackCancelReAgendar() {
        Cita.loader = true;

        m.request({
            method: "POST",
            url: "https://api.hospitalmetropolitano.org/v2/date/citas/reagendar/cancel",
            body: Cita.data,
            headers: {
                "Content-Type": "application/json; charset=utf-8"
            }
        }).then(function(res) {
            Cita.loader = false;
            if (res.status) {
                FetchCalendario.reloadFetchAgenda();
                Calendario.success = "El reagendamiento se canceló.";
                Calendario.clearAlertCalendar();
            } else {
                Calendario.error = res.message;
            }
        }).catch(function(e) {
            Calendario.error = e;
        });
    }

    static agendarCita() {
        Cita.loader = true;
        Cita.data.idCalendar = Calendario.idCalendar;
        Cita.data.calendarios = Calendario.calendarios;
        m.request({
            method: "POST",
            url: "https://api.hospitalmetropolitano.org/v2/date/citas/nueva",
            body: Cita.data,
            headers: {
                "Content-Type": "application/json; charset=utf-8"
            }
        }).then(function(res) {
            Cita.loader = false;
            if (res.status) {
                Calendario.success = res.message;
                Calendario.clearAlertCalendar();
                $("#modalCreateEvent").modal("hide");
                FetchCalendario.reloadFetchAgenda();
                Cita.data = {};
            } else {
                Calendario.error = res.message;
            }
        }).catch(function(e) {
            Calendario.error = e;
        });
    }

    static reAgendarCita() {
        Cita.loader = true;
        m.request({
            method: "POST",
            url: "https://api.hospitalmetropolitano.org/v2/date/citas/update",
            body: Cita.data,
            headers: {
                "Content-Type": "application/json; charset=utf-8"
            }
        }).then(function(res) {
            Cita.loader = false;
            if (res.status) {
                Calendario.success = res.message;
                Calendario.clearAlertCalendar();
                $("#modalUpdateEvent").modal("hide");
                FetchCalendario.reloadFetchAgenda();
            } else {
                Calendario.error = res.message;
            }
        }).catch(function(e) {
            Calendario.error = e;
        });
    }
    static cancelarCita() {
        Cita.loader = true;

        m.request({
            method: "POST",
            url: "https://api.hospitalmetropolitano.org/v2/date/citas/delete",
            body: Cita.data,
            headers: {
                "Content-Type": "application/json; charset=utf-8"
            }
        }).then(function(res) {
            Cita.loader = false;

            if (res.status) {
                Calendario.success = res.message;
                Calendario.clearAlertCalendar();
                $("#modalCalendarEvent").modal("hide");
                FetchCalendario.reloadFetchAgenda();
                Cita.data = {};
            } else {
                Calendario.error = res.message;
            }
        }).catch(function(e) {
            Calendario.error = res.message;
        });
    }
}


export default Cita;