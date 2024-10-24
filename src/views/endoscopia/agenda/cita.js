import m from "mithril";

// Cita
class Cita {
    static track = null;
    static buscarPacientes = false;
    static buscarMedicos = false;
    static buscarItems = false;
    static loader = false;
    static data = null;
    static error = null;
    static success = null;

    static verCita(calEvent) {
        Cita.data = null;
        Cita.data = {};
        Cita.data.id = calEvent.id;
        Cita.data.tipo = calEvent.tipo;
        Cita.data.backgroundColor = calEvent.backgroundColor;
        Cita.data.borderColor = calEvent.borderColor;
        Cita.data.calendarios = calEvent.calendarios;
        Cita.data.editable = calEvent.editable;
        Cita.data.email = calEvent.email;
        Cita.data.estudio = calEvent.estudio;
        Cita.data.fecha_nacimiento = calEvent.fecha_nacimiento;
        Cita.data.prestador = calEvent.prestador;
        Cita.data.cd_prestador = calEvent.cd_prestador;
        Cita.data.hashCita = calEvent.hashCita;
        Cita.data.idCalendar = calEvent.idCalendar;
        Cita.data.id_estudio = calEvent.id_estudio;
        Cita.data.comentarios = calEvent.comentarios;
        Cita.data.nhc = calEvent.nhc;
        Cita.data.paciente = calEvent.paciente;
        Cita.data.sexo = calEvent.sexo;
        Cita.data.telefono = calEvent.telefono;
        Cita.data.title = calEvent.title;
        Cita.data.start = moment(calEvent.inicio, "DD/MM/YYYY HH:mm").format("dddd, DD-MM-YYYY HH:mm");
        Cita.data.end = moment(calEvent.fin, "DD/MM/YYYY HH:mm").format("dddd, DD-MM-YYYY HH:mm");
        Cita.data.inicio = calEvent.inicio;
        Cita.data.fin = calEvent.fin;
        console.log(Cita.data)
        let nacimiento = moment(Cita.data.fecha_nacimiento, "DD/MM/YYYY");
        let hoy = moment();
        Cita.data.anios = hoy.diff(nacimiento, "years");
        $('[data-toggle="tooltip"]').tooltip("hide");
        let modal = $("#modalCalendarEvent");
        modal.modal("show");
        modal.on('hidden.bs.modal', function () {
            Cita.data = null;
        });
        m.redraw();
    }

    static verEvento(calEvent) {
        Cita.data = null;
        Cita.data = {};
        Cita.data.id = calEvent.id;
        Cita.data.tipo = calEvent.tipo;
        Cita.data.backgroundColor = calEvent.backgroundColor;
        Cita.data.borderColor = calEvent.borderColor;
        Cita.data.calendarios = calEvent.calendarios;
        Cita.data.idCalendar = calEvent.idCalendar;
        Cita.data.editable = calEvent.editable;
        Cita.data.start = moment(calEvent.inicio, "DD/MM/YYYY HH:mm").format("dddd, DD-MM-YYYY HH:mm");
        Cita.data.end = moment(calEvent.fin, "DD/MM/YYYY HH:mm").format("dddd, DD-MM-YYYY HH:mm");
        Cita.data.inicio = calEvent.inicio;
        Cita.data.fin = calEvent.fin;
        Cita.data.title = calEvent.title;
        $('[data-toggle="tooltip"]').tooltip("hide");
        let modal = $("#modalCalendarEvent");
        modal.modal("show");
        modal.on('hidden.bs.modal', function () {
            Cita.data = null;
        });
        m.redraw();
    }

    static setUpdate(calEvent) {
        Cita.error = null;
        Cita.data = null;
        Cita.data = {};
        if (calEvent.tipo == 1) {
            Cita.data.id = calEvent.id;
            Cita.data.tipo = calEvent.tipo;
            Cita.data.backgroundColor = calEvent.backgroundColor;
            Cita.data.borderColor = calEvent.borderColor;
            Cita.data.calendarios = calEvent.calendarios;
            Cita.data.editable = calEvent.editable;
            Cita.data.email = calEvent.email;
            Cita.data.estudio = calEvent.estudio;
            Cita.data.fecha_nacimiento = calEvent.fecha_nacimiento;
            Cita.data.prestador = calEvent.prestador;
            Cita.data.cd_prestador = calEvent.cd_prestador;
            Cita.data.hashCita = calEvent.hashCita;
            Cita.data.idCalendar = calEvent.idCalendar;
            Cita.data.id_estudio = calEvent.id_estudio;
            Cita.data.comentarios = calEvent.comentarios;
            Cita.data.nhc = calEvent.nhc;
            Cita.data.paciente = calEvent.paciente;
            Cita.data.sexo = calEvent.sexo;
            Cita.data.telefono = calEvent.telefono;
            Cita.data.title = calEvent.title;
            Cita.data.hashCita = calEvent.hashCita;
            Cita.data.start = calEvent.start.format("dddd, DD-MM-YYYY HH:mm");
            Cita.data.end = calEvent.end.format("dddd, DD-MM-YYYY HH:mm");
            Cita.data.inicio = calEvent.start.format("DD/MM/YYYY HH:mm");
            Cita.data.fin = calEvent.end.format("DD/MM/YYYY HH:mm");
            Cita.data.newHashCita = calEvent.start.format("YYYY-MM-DD HH:mm") + "." + calEvent.end.format("YYYY-MM-DD HH:mm");
            let nacimiento = moment(Cita.data.fecha_nacimiento, "DD/MM/YYYY");
            let hoy = moment();
            Cita.data.anios = hoy.diff(nacimiento, "years");
        } else {
            Cita.data.id = calEvent.id;
            Cita.data.tipo = calEvent.tipo;
            Cita.data.backgroundColor = calEvent.backgroundColor;
            Cita.data.borderColor = calEvent.borderColor;
            Cita.data.calendarios = calEvent.calendarios;
            Cita.data.idCalendar = calEvent.idCalendar;
            Cita.data.editable = calEvent.editable;
            Cita.data.comentarios = calEvent.comentarios;
            Cita.data.start = calEvent.start.format("dddd, DD-MM-YYYY HH:mm");
            Cita.data.end = calEvent.end.format("dddd, DD-MM-YYYY HH:mm");
            Cita.data.inicio = calEvent.start.format("DD/MM/YYYY HH:mm");
            Cita.data.fin = calEvent.end.format("DD/MM/YYYY HH:mm");
            Cita.data.title = calEvent.title;
            Cita.data.newHashCita = calEvent.start.format("YYYY-MM-DD HH:mm") + "." + calEvent.end.format("YYYY-MM-DD HH:mm");
        }
    }

    static verUpdate(calEvent) {
        Cita.error = null;
        Cita.data = null;
        Cita.data = {};
        Cita.data.track = 'update';
        if (calEvent.tipo == 1) {
            Cita.data.id = calEvent.id;
            Cita.data.tipo = calEvent.tipo;
            Cita.data.backgroundColor = calEvent.backgroundColor;
            Cita.data.borderColor = calEvent.borderColor;
            Cita.data.calendarios = calEvent.calendarios;
            Cita.data.editable = calEvent.editable;
            Cita.data.email = calEvent.email;
            Cita.data.estudio = calEvent.estudio;
            Cita.data.fecha_nacimiento = calEvent.fecha_nacimiento;
            Cita.data.prestador = calEvent.prestador;
            Cita.data.cd_prestador = calEvent.cd_prestador;
            Cita.data.hashCita = calEvent.hashCita;
            Cita.data.idCalendar = calEvent.idCalendar;
            Cita.data.id_estudio = calEvent.id_estudio;
            Cita.data.comentarios = calEvent.comentarios;
            Cita.data.nhc = calEvent.nhc;
            Cita.data.paciente = calEvent.paciente;
            Cita.data.sexo = calEvent.sexo;
            Cita.data.telefono = calEvent.telefono;
            Cita.data.title = calEvent.title;
            Cita.data.hashCita = calEvent.hashCita;
            Cita.data.start = calEvent.start.format("dddd, DD-MM-YYYY HH:mm");
            Cita.data.end = calEvent.end.format("dddd, DD-MM-YYYY HH:mm");
            Cita.data.inicio = calEvent.start.format("DD/MM/YYYY HH:mm");
            Cita.data.fin = calEvent.end.format("DD/MM/YYYY HH:mm");
            Cita.data.newHashCita = calEvent.start.format("YYYY-MM-DD HH:mm") + "." + calEvent.end.format("YYYY-MM-DD HH:mm");
            let nacimiento = moment(Cita.data.fecha_nacimiento, "DD/MM/YYYY");
            let hoy = moment();
            Cita.data.anios = hoy.diff(nacimiento, "years");
        } else {
            Cita.data.id = calEvent.id;
            Cita.data.tipo = calEvent.tipo;
            Cita.data.backgroundColor = calEvent.backgroundColor;
            Cita.data.borderColor = calEvent.borderColor;
            Cita.data.calendarios = calEvent.calendarios;
            Cita.data.idCalendar = calEvent.idCalendar;
            Cita.data.editable = calEvent.editable;
            Cita.data.comentarios = calEvent.comentarios;
            Cita.data.start = calEvent.start.format("dddd, DD-MM-YYYY HH:mm");
            Cita.data.end = calEvent.end.format("dddd, DD-MM-YYYY HH:mm");
            Cita.data.inicio = calEvent.start.format("DD/MM/YYYY HH:mm");
            Cita.data.fin = calEvent.end.format("DD/MM/YYYY HH:mm");
            Cita.data.title = calEvent.title;
            Cita.data.newHashCita = calEvent.start.format("YYYY-MM-DD HH:mm") + "." + calEvent.end.format("YYYY-MM-DD HH:mm");
        }

        $('[data-toggle="tooltip"]').tooltip("hide");
        let modal = $("#modalUpdateEvent");
        modal.modal("show");
        modal.on('hidden.bs.modal', function () {
            Cita.data = null;
        });
        m.redraw();
    }

    static validarCita() {

        let fecha = moment(Cita.data.inicio, "DD/MM/YYYY HH:mm").format("YYYY-MM-DD HH:mm");
        if (moment(fecha).unix() < moment().unix()) {
            $("#modalCreateEvent").animate({
                scrollTop: 0
            }, "slow");
            Cita.error = "No se puede agendar una cita o evento en fecha y hora anterior.";
            m.redraw();
            throw Cita.error;
        }

        if (moment(Cita.data.inicio, "DD/MM/YYYY HH:mm").unix() > moment(Cita.data.fin, "DD/MM/YYYY HH:mm").unix()) {
            $("#modalCreateEvent").animate({
                scrollTop: 0
            }, "slow");
            Cita.error = "No se puede agendar una cita o evento donde la fecha fin sea menor a la fecha inicio.";
            m.redraw();
            throw Cita.error;
        }

        if (Cita.data.sinDatos == undefined) {
            if (Cita.data.tipo == 1) {
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

        }

        if (Cita.data.tipo == 1 && Cita.data.sinDatos !== undefined && Cita.data.sinDatos == false) {

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


            if (Cita.data.email == undefined || Cita.data.email == '') {
                $("#modalCreateEvent").animate({
                    scrollTop: 0
                }, "slow");
                Cita.error = "No existe datos de Correo electrónico.";
                m.redraw();
                throw Cita.error;
            }

        }

        if (Cita.data.tipo == 1 && Cita.data.sinDatos !== undefined && Cita.data.sinDatos == true) {


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

            Cita.data.paciente = Cita.data.paciente.toUpperCase();

            if (Cita.data.fecha_nacimiento == undefined) {
                $("#modalCreateEvent").animate({
                    scrollTop: 0
                }, "slow");
                Cita.error = "No existe datos de fecha de nacimiento.";
                m.redraw();
                throw Cita.error;
            }

            if (moment(Cita.data.fecha_nacimiento, 'DD-MM-YYYY').isValid() !== true) {
                $("#modalCreateEvent").animate({
                    scrollTop: 0
                }, "slow");
                Cita.error = "La fecha ingresada no es válida.";
                m.redraw();
                throw Cita.error;
            }

            if (Cita.data.sexo == undefined) {
                $("#modalCreateEvent").animate({
                    scrollTop: 0
                }, "slow");
                Cita.error = "No existe datos de sexo.";
                m.redraw();
                throw Cita.error;
            }

            if (Cita.data.email == undefined) {
                $("#modalCreateEvent").animate({
                    scrollTop: 0
                }, "slow");
                Cita.error = "No existe datos de Correo electrónico.";
                m.redraw();
                throw Cita.error;
            }

            if (Cita.data.telefono == undefined) {
                $("#modalCreateEvent").animate({
                    scrollTop: 0
                }, "slow");
                Cita.error = "No existe datos de teléfono.";
                m.redraw();
                throw Cita.error;
            }



        }

        if (Cita.data.tipo == 2) {

            Cita.data.hashCita = moment(Cita.data.inicio, "DD/MM/YYYY HH:mm").format("YYYY-MM-DD HH:mm") + "." + moment(Cita.data.fin, "DD/MM/YYYY HH:mm").format("YYYY-MM-DD HH:mm");


            if (Cita.data.evento == undefined) {
                $("#modalCreateEvent").animate({
                    scrollTop: 0
                }, "slow");
                Cita.error = "No existe datos del evento.";
                m.redraw();
                throw Cita.error;
            }
        }

        if (Cita.data.tipo == 3) {

            Cita.data.hashCita = moment(Cita.data.inicio, "DD/MM/YYYY HH:mm").format("YYYY-MM-DD HH:mm") + "." + moment(Cita.data.fin, "DD/MM/YYYY HH:mm").format("YYYY-MM-DD HH:mm");


            if (Cita.data.nota == undefined) {
                $("#modalCreateEvent").animate({
                    scrollTop: 0
                }, "slow");
                Cita.error = "No existe datos de la nota.";
                m.redraw();
                throw Cita.error;
            }
        }


    }

    static crearCita(startDate, endDate) {
        $('[data-toggle="tooltip"]').tooltip("hide");
        $("#modalCreateEvent").modal("show");
        $("#modalCreateEvent").on('hidden.bs.modal', function () {
            Cita.data = null;
        });
        Cita.buscarPacientes = false;
        Cita.buscarMedicos = false;
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
        console.log(9999, Cita.data)
        m.redraw();
    }

    static crearEvento() {
        $('[data-toggle="tooltip"]').tooltip("hide");
        Cita.buscarPacientes = false;
        Cita.buscarMedicos = false;
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
        Cita.data.hashCita = moment(_data.inicio, 'DD/MM/YYYY HH:mm').format("YYYY-MM-DD HH:mm") + "." + moment(_data.fin, 'DD/MM/YYYY HH:mm').format("YYYY-MM-DD HH:mm");
        console.log(8888, Cita.data)
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

    static reagendarCitaHttp(Calendario) {
        Cita.loader = true;
        Cita.error = null;

        if (Cita.data.tipo == 1 && Cita.data.email != document.getElementById('correoCitaUpdate').value) {
            Cita.data.email = document.getElementById('correoCitaUpdate').value;
        }

        m.request({
            method: "POST",
            url: "https://apidate.hospitalmetropolitano.org/v1/date/citas/upcall-validate",
            body: Cita.data,
            headers: {
                "Content-Type": "application/json; charset=utf-8"
            }
        }).then(function (res) {
            Cita.loader = false;
            if (res.status) {
                Cita.reagendar(Calendario);
            } else {
                $("#modalUpdateEvent").animate({
                    scrollTop: 0
                }, "slow");
                Cita.error = res.message;
                throw res.message;
            }
        }).catch(function (e) {
            $("#modalUpdateEvent").animate({
                scrollTop: 0
            }, "slow");
            Cita.error = e;
            throw e;
        });
    }

    static reagendar(Calendario) {
        Cita.reAgendarCita(Calendario);
        Cita.agendarReagendarCitaHttp(Calendario);
        Cita.agendarCitaHttp(Calendario);
    }

    static copiarDatos(clave, objeto) {
        // Convertir el objeto a una cadena JSON
        const objetoJSON = JSON.stringify(objeto);
        // Almacenar la cadena JSON en el local storage con la clave proporcionada
        localStorage.setItem(clave, objetoJSON);

    }

    static getCitaCopy(clave = 'CitaReagenda') {
        // Obtener la cadena JSON almacenada en el local storage con la clave proporcionada
        const objetoJSON = localStorage.getItem(clave);
        // Convertir la cadena JSON de nuevo a un objeto JavaScript
        const objeto = JSON.parse(objetoJSON);
        return objeto;
    }

    static cancelarHttp_2(Calendario, cita) {
     
        m.request({
            method: "POST",
            url: "https://apidate.hospitalmetropolitano.org/v1/date/citas/delcall",
            body: cita,
            headers: {
                "Content-Type": "application/json; charset=utf-8"
            }
        }).then(function (res) {
           
            if (res.status) {
              
                Cita.cancelarCita_2(Calendario, cita);
            } else {
                $("#modalUpdateEvent").animate({
                    scrollTop: 0
                }, "slow");
                Cita.error = res.message;
                throw res.message;
            }
        }).catch(function (e) {
            $("#modalUpdateEvent").animate({
                scrollTop: 0
            }, "slow");
            Cita.error = e;
            throw e;
        });
    }

    static cancelarHttp(Calendario) {
        Cita.error = null;
        Cita.loader = true;

        m.request({
            method: "POST",
            url: "https://apidate.hospitalmetropolitano.org/v1/date/citas/delcall",
            body: Cita.data,
            headers: {
                "Content-Type": "application/json; charset=utf-8"
            }
        }).then(function (res) {
            Cita.loader = false;
            if (res.status) {
                Cita.cancelarCita(Calendario);
            } else {
                $("#modalCreateEvent").animate({
                    scrollTop: 0
                }, "slow");
                Cita.error = res.message;
                throw res.message;
            }
        }).catch(function (e) {
            $("#modalCreateEvent").animate({
                scrollTop: 0
            }, "slow");
            Cita.error = e;
            throw e;
        });
    }

    static validarCitaHttp(calendario) {

        Cita.error = null;

        if (Cita.data.tipo == 1 && Cita.data.sinDatos == false && Cita.data.email !== document.getElementById('correoCreaCita').value) {
            Cita.data.email = document.getElementById('correoCreaCita').value;
        }

        Cita.loader = true;
        Cita.data.idCalendar = calendario.idCalendar;
        Cita.data.calendarios = [];

        let _agendas = calendario.idCalendar.split(',');
        for (let i = 0; i < Object.keys(_agendas).length; i++) {
            for (let a = 0; a < Object.keys(calendario.calendarios).length; a++) {
                if (_agendas[i] == calendario.calendarios[a].IDCALENDAR) {
                    Cita.data.calendarios.push(calendario.calendarios[a]);
                }
            }
        }

        console.log(33, Cita.data.calendarios)

        if (Cita.data.tipo == 1) {

            m.request({
                method: "POST",
                url: "https://apidate.hospitalmetropolitano.org/v1/date/citas/call-validate",
                body: Cita.data,
                headers: {
                    "Content-Type": "application/json; charset=utf-8"
                }
            }).then(function (res) {
                Cita.loader = false;
                if (res.status) {
                    console.log(22, 'estoy por aqui');
                    Cita.agendarCitaHttp(calendario);
                    Cita.agendarCita(calendario);

                } else {
                    $("#modalCreateEvent").animate({
                        scrollTop: 0
                    }, "slow");
                    Cita.error = res.message;
                    throw res.message;
                }
            }).catch(function (e) {
                $("#modalCreateEvent").animate({
                    scrollTop: 0
                }, "slow");
                Cita.error = e;
                throw e;
            });

        } else {
            Cita.agendarCita(calendario);
        }



    }

    static validarCitaHttp_2(calendario) {

        Cita.error = null;
        Cita.loader = true;
        Cita.data.idCalendar = calendario.idCalendar;
        Cita.data.calendarios = [];

        let _agendas = calendario.idCalendar.split(',');
        for (let i = 0; i < Object.keys(_agendas).length; i++) {
            for (let a = 0; a < Object.keys(calendario.calendarios).length; a++) {
                if (_agendas[i] == calendario.calendarios[a].IDCALENDAR) {
                    Cita.data.calendarios.push(calendario.calendarios[a]);
                }
            }
        }

        if (Cita.data.tipo == 1) {

            m.request({
                method: "POST",
                url: "https://apidate.hospitalmetropolitano.org/v1/date/citas/call-validate",
                body: Cita.data,
                headers: {
                    "Content-Type": "application/json; charset=utf-8"
                }
            }).then(function (res) {
               
                if (res.status) {

                    // Eliminar Cita Anterior
                    let _purl = 0
                    if (localStorage.getItem('CitaReagenda') !== null) {
                        let _cita = Cita.getCitaCopy();
                        _purl = _cita.id;
                        Cita.cancelarHttp_2(calendario, _cita);
                    }

                    console.log(22, 'estoy por aqui');
                    Cita.agendarCitaHttp_2(calendario);
                  

                } else {
                    Cita.loader = false;
                    $("#modalUpdateEvent").animate({
                        scrollTop: 0
                    }, "slow");
                    Cita.error = res.message;
                    throw res.message;
                }
            }).catch(function (e) {
                Cita.loader = false;
                $("#modalUpdateEvent").animate({
                    scrollTop: 0
                }, "slow");
                Cita.error = e;
                throw e;
            });

        } else {
            Cita.agendarCita(calendario);
        }



    }

    static agendarCitaHttp(calendario) {

        Cita.error = null;

        if (Cita.data.tipo == 1 && Cita.data.sinDatos == false && Cita.data.email !== document.getElementById('correoCreaCita').value) {
            Cita.data.email = document.getElementById('correoCreaCita').value;
        }

        Cita.loader = true;
        Cita.data.idCalendar = calendario.idCalendar;
        Cita.data.calendarios = [];

        let _agendas = calendario.idCalendar.split(',');
        for (let i = 0; i < Object.keys(_agendas).length; i++) {
            for (let a = 0; a < Object.keys(calendario.calendarios).length; a++) {
                if (_agendas[i] == calendario.calendarios[a].IDCALENDAR) {
                    Cita.data.calendarios.push(calendario.calendarios[a]);
                }
            }
        }



        m.request({
            method: "POST",
            url: "https://apidate.hospitalmetropolitano.org/v1/date/citas/call",
            body: Cita.data,
            headers: {
                "Content-Type": "application/json; charset=utf-8"
            }
        }).then(function (res) {
            Cita.loader = false;
            if (res.status) {
                console.log(22, 'estoy por aqui');
                // Cita.agendarCita(calendario);
            } else {
                $("#modalCreateEvent").animate({
                    scrollTop: 0
                }, "slow");
                Cita.error = res.message;
                throw res.message;
            }
        }).catch(function (e) {
            $("#modalCreateEvent").animate({
                scrollTop: 0
            }, "slow");
            Cita.error = e;
            throw e;
        });
    }

    static agendarCitaHttp_2(calendario) {

        Cita.error = null;

        m.request({
            method: "POST",
            url: "https://apidate.hospitalmetropolitano.org/v1/date/citas/call",
            body: Cita.data,
            headers: {
                "Content-Type": "application/json; charset=utf-8"
            }
        }).then(function (res) {
            Cita.loader = false;
            if (res.status) {
                console.log(22, 'estoy por aqui');
                Cita.agendarCita_2(calendario);
            } else {
                $("#modalUpdateEvent").animate({
                    scrollTop: 0
                }, "slow");
                Cita.error = res.message;
                throw res.message;
            }
        }).catch(function (e) {
            $("#modalUpdateEvent").animate({
                scrollTop: 0
            }, "slow");
            Cita.error = e;
            throw e;
        });
    }

    static agendarReagendarCitaHttp(calendario) {

        Cita.loader = true;
        m.request({
            method: "POST",
            url: "https://apidate.hospitalmetropolitano.org/v1/date/citas/upcall",
            body: Cita.data,
            headers: {
                "Content-Type": "application/json; charset=utf-8"
            }
        }).then(function (res) {
            Cita.loader = false;
            if (res.status) {

                Cita.agendarCitaHttp(calendario);
            } else {
                $("#modalCreateEvent").animate({
                    scrollTop: 0
                }, "slow");
                Cita.error = res.message;
                throw res.message;
            }
        }).catch(function (e) {
            $("#modalCreateEvent").animate({
                scrollTop: 0
            }, "slow");
            Cita.error = e;
            throw e;
        });
    }

    static trackReAgendar(Calendario) {



        Cita.loader = true;
        m.request({
            method: "POST",
            url: "https://apidate.hospitalmetropolitano.org/v1/date/citas/reagendar",
            body: Cita.data,
            headers: {
                "Content-Type": "application/json; charset=utf-8",
                "Authorization": localStorage.userToken

            }
        }).then(function (res) {
            Cita.loader = false;
            if (res.status) {


                Calendario.sendEvent();
                Calendario.success = "Ahora puede reagendar este Cita.";
                Calendario.clearAlertCalendar();
                Calendario.reloadFetchAgenda();
            } else {
                Calendario.error = res.message;
            }
        }).catch(function (e) {
            Calendario.error = e;
        });
    }

    static trackCancelReAgendar(Calendario) {
        Cita.loader = true;

        m.request({
            method: "POST",
            url: "https://apidate.hospitalmetropolitano.org/v1/date/citas/reagendar/cancel",
            body: Cita.data,
            headers: {
                "Content-Type": "application/json; charset=utf-8",
                "Authorization": localStorage.userToken

            }
        }).then(function (res) {
            Cita.loader = false;
            if (res.status) {

                localStorage.removeItem('CitaReagenda');
                Calendario.sendEvent();
                Calendario.success = "El reagendamiento se canceló.";
                Calendario.clearAlertCalendar();
                Calendario.reloadFetchAgenda();
            } else {
                Calendario.error = res.message;
            }
        }).catch(function (e) {
            Calendario.error = e;
        });
    }

    static agendarCita(Calendario) {
        Cita.loader = true;

        m.request({
            method: "POST",
            url: "https://apidate.hospitalmetropolitano.org/v1/date/citas/nueva",
            body: Cita.data,
            headers: {
                "Content-Type": "application/json; charset=utf-8",
                "Authorization": localStorage.userToken

            }
        }).then(function (res) {
            Cita.loader = false;
            if (res.status) {
                Calendario.sendEvent();

                Calendario.success = res.message;
                Calendario.clearAlertCalendar();
                $("#modalCreateEvent").modal("hide");
                Calendario.reloadFetchAgenda();
            } else {
                Cita.error = res.message;
            }
        }).catch(function (e) {
            Cita.error = e;
        });
    }

    static agendarCita_2(Calendario) {
        Cita.loader = true;

        m.request({
            method: "POST",
            url: "https://apidate.hospitalmetropolitano.org/v1/date/citas/nueva",
            body: Cita.data,
            headers: {
                "Content-Type": "application/json; charset=utf-8",
                "Authorization": localStorage.userToken

            }
        }).then(function (res) {
            Cita.loader = false;
            if (res.status) {
                Calendario.sendEvent();

                Calendario.success = res.message;
                Calendario.clearAlertCalendar();
                $("#modalUpdateEvent").modal("hide");
                Calendario.reloadFetchAgenda();
            } else {
                Cita.error = res.message;
            }
        }).catch(function (e) {
            Cita.error = e;
        });
    }

    static reAgendarCita(Calendario) {
        Cita.loader = true;
        m.request({
            method: "POST",
            url: "https://apidate.hospitalmetropolitano.org/v1/date/citas/update",
            body: Cita.data,
            headers: {
                "Content-Type": "application/json; charset=utf-8",
                "Authorization": localStorage.userToken

            }
        }).then(function (res) {
            Cita.loader = false;
            if (res.status) {
                Calendario.sendEvent();
                Calendario.reloadFetchAgenda();

                Calendario.success = res.message;
                Calendario.clearAlertCalendar();
                $("#modalUpdateEvent").modal("hide");
            } else {
                Calendario.error = res.message;
            }
        }).catch(function (e) {
            Calendario.error = e;
        });
    }

    static cancelarCita(Calendario) {
        Cita.loader = true;

        m.request({
            method: "POST",
            url: "https://apidate.hospitalmetropolitano.org/v1/date/citas/delete",
            body: Cita.data,
            headers: {
                "Content-Type": "application/json; charset=utf-8",
                "Authorization": localStorage.userToken

            }
        }).then(function (res) {
            Cita.loader = false;

            if (res.status) {
                Calendario.sendEvent();
                Calendario.success = res.message;
                Calendario.clearAlertCalendar();
                $("#modalCalendarEvent").modal("hide");
                Calendario.reloadFetchAgenda();
            } else {
                Calendario.error = res.message;
            }
        }).catch(function (e) {
            Calendario.error = res.message;
        });
    }

    static cancelarCita_2(Calendario, cita) {

        m.request({
            method: "POST",
            url: "https://apidate.hospitalmetropolitano.org/v1/date/citas/delete",
            body: cita,
            headers: {
                "Content-Type": "application/json; charset=utf-8",
                "Authorization": localStorage.userToken

            }
        }).then(function (res) {
           

            if (res.status) {
                localStorage.removeItem('CitaReagenda');
            } else {
                Calendario.error = res.message;
            }
        }).catch(function (e) {
            Calendario.error = res.message;
        });
    }
}


export default Cita;