import m from "mithril";
import App from "../../../models/App";
import Sidebar from "./sidebar";
import Loader from "../../utils/loader";
import HeaderCalendar from "../../layout/headerCalendar";
import Errors from "../../utils/errors";
import Cita from "./cita";
import EventosCalendario from "./eventosCalendar";
import { ProximasCitas, ProximosEventos, CitasAnteriores, BuscadorItems, BuscadorPacientes } from "./widgets";
import WebRTCConnection from "../../../models/P2PMessage";


class RouteCal {

    static setRoute(param, id) {

        if (id == 'idCalendar') {
            m.route.set("/endoscopia/agendas/calendario/", {
                idCalendar: encodeURIComponent(param),
            });
        }

    }

}

class SelectMedicos {

    static idFilter = null;
    static medicos = [];
    static calendarios = [];

    static selectInit() {
        $("#agendas").select2({
                templateSelection: function(data, container) {
                    container[0].style["font-size"] = "10px";
                    container[0].style["padding-left"] = "5px";
                    container[0].children[0].remove();
                    // container[0].style.backgroundColor = Calendario.setColor(data.id);
                    return data.text;
                },
                placeholder: "Seleccione...",
                searchInputPlaceholder: "Buscar",
                allowClear: true

            })
            .on("change", function(e) {

                Calendario.warning = null;
                let medicos = $(this).val();
                let salas = $('#agendasPtes').val();
                if (medicos.length == 0 && salas.length == 0) {
                    $("#calendar").fullCalendar("removeEvents");
                    Calendario.reloadCitasSidebar();
                    Calendario.warning = "No se han aplicado filtros para la búsqueda.";
                    m.route.set("/endoscopia/agendas/calendario");
                } else {
                    Calendario.setFilterRouteMedicos(medicos);
                }

            });
    }

    oninit(_data) {

        SelectMedicos.idFilter = _data.attrs.idFilter;
        SelectMedicos.calendarios = _data.attrs.calendarios;
        SelectMedicos.calendarios.map((_v) => {
            if (_v.TIPO == 2) {
                SelectMedicos.medicos.push(_v);
            }
        });

        SelectMedicos.medicos.push({
            TIPO: 2,
            IDCALENDAR: '-1',
            CALENDAR: 'TODOS LOS MÉDICOS'
        });



    }

    view() {

        let _agendasMedicos = [];

        SelectMedicos.medicos.map(function(_v, _i, _contentData) {

            if (SelectMedicos.idFilter !== null && SelectMedicos.idFilter.indexOf(',') > 0) {
                let _agendas = SelectMedicos.idFilter.split(',');
                if (_agendas.includes(_v.IDCALENDAR)) {
                    _agendasMedicos.push(_v.IDCALENDAR);
                }
            }

        });

        return m("select.tx-5.form-control.select2-limit[multiple='multiple'][id='agendas']", {
            oncreate: (el) => {
                setTimeout(() => {
                    SelectMedicos.selectInit();
                }, 50);
            }
        }, [
            SelectMedicos.medicos.map(function(_v, _i, _contentData) {


                if (SelectMedicos.idFilter !== null && SelectMedicos.idFilter.indexOf(',') > 0) {

                    let _agendas = SelectMedicos.idFilter.split(',');

                    return [
                        m("option.tx-10[value='" + _v.IDCALENDAR + "']", {
                            oncreate: (el) => {
                                if ((_agendasMedicos.length + 1) == SelectMedicos.medicos.length && _v.IDCALENDAR == '-1') {
                                    el.dom.selected = true;
                                }

                                if ((_agendasMedicos.length + 1) != SelectMedicos.medicos.length && _v.IDCALENDAR !== '-1') {
                                    if (_agendas.includes(_v.IDCALENDAR)) {
                                        el.dom.selected = true;
                                    }
                                }
                            }
                        }, _v.CALENDAR),
                    ];

                } else if (SelectMedicos.idFilter !== null && SelectMedicos.idFilter.indexOf(',') < 0) {

                    return [
                        m("option.tx-10[value='" + _v.IDCALENDAR + "']", {
                            oncreate: (el) => {
                                if (SelectMedicos.idFilter == _v.IDCALENDAR) {
                                    el.dom.selected = true;
                                }
                            }
                        }, _v.CALENDAR),
                    ];

                } else {

                    return [
                        m("option.tx-10[value='" + _v.IDCALENDAR + "']", _v.CALENDAR),
                    ];

                }

            }),
        ]);

    }
}

class SelectPacientes {

    static idFilter = null;
    static salas = [];
    static calendarios = [];

    static selectInit() {
        $("#agendasPtes").select2({
                templateSelection: function(data, container) {
                    container[0].style["font-size"] = "10px";
                    container[0].style["padding-left"] = "5px";
                    container[0].children[0].remove();
                    // container[0].style.backgroundColor = Calendario.setColor(data.id);
                    return data.text;
                },
                placeholder: "Seleccione...",
                searchInputPlaceholder: "Buscar",
                allowClear: true

            })
            .on("change", function(e) {

                Calendario.warning = null;

                let salas = $(this).val();
                let medicos = $('#agendas').val();

                if (medicos.length == 0 && salas.length == 0) {
                    $("#calendar").fullCalendar("removeEvents");
                    Calendario.reloadCitasSidebar();
                    Calendario.warning = "No se han aplicado filtros para la búsqueda.";
                    m.route.set("/endoscopia/agendas/calendario");
                } else {
                    Calendario.setFilterRouteSalas(salas);
                }


            });
    }

    oninit(_data) {

        SelectPacientes.idFilter = _data.attrs.idFilter;
        SelectPacientes.calendarios = _data.attrs.calendarios;
        SelectPacientes.calendarios.map((_v) => {
            if (_v.TIPO == 1) {
                SelectPacientes.salas.push(_v);
            }
        });


        SelectPacientes.salas.push({
            TIPO: 1,
            IDCALENDAR: '-1',
            CALENDAR: 'TODOS LOS SALAS'
        });

    }

    view() {

        let _agendasSalas = [];

        SelectPacientes.salas.map(function(_v, _i, _contentData) {

            if (SelectPacientes.idFilter !== null && SelectPacientes.idFilter.indexOf(',') > 0) {
                let _agendas = SelectPacientes.idFilter.split(',');
                if (_agendas.includes(_v.IDCALENDAR)) {
                    _agendasSalas.push(_v.IDCALENDAR);
                }
            }

        });

        return m("select.tx-5.form-control.select2-limit[multiple='multiple'][id='agendasPtes']", {
            oncreate: (el) => {
                setTimeout(() => {
                    SelectPacientes.selectInit();
                }, 50);
            }
        }, [
            SelectPacientes.salas.map(function(_v, _i, _contentData) {



                if (SelectPacientes.idFilter !== null && SelectPacientes.idFilter.indexOf(',') > 0) {
                    let _agendas = SelectPacientes.idFilter.split(',');
                    return [
                        m("option.tx-10[value='" + _v.IDCALENDAR + "']", {
                            oncreate: (el) => {
                                if ((_agendasSalas.length + 1) == SelectPacientes.salas.length && _v.IDCALENDAR == '-1') {
                                    el.dom.selected = true;
                                } else if ((_agendasSalas.length + 1) != SelectPacientes.salas.length && _v.IDCALENDAR !== '-1') {
                                    if (_agendas.includes(_v.IDCALENDAR)) {
                                        // el.dom.selected = true;
                                    }
                                }
                            }
                        }, _v.CALENDAR),
                    ];

                } else if (SelectPacientes.idFilter !== null && SelectPacientes.idFilter.indexOf(',') < 0) {

                    return [
                        m("option.tx-10[value='" + _v.IDCALENDAR + "']", {
                            oncreate: (el) => {
                                if (SelectPacientes.idFilter == _v.IDCALENDAR) {
                                    el.dom.selected = true;
                                }
                            }
                        }, _v.CALENDAR),
                    ];

                } else {
                    return [
                        m("option.tx-10[value='" + _v.IDCALENDAR + "']", _v.CALENDAR),
                    ];
                }

            }),
        ]);

    }
}


class BadgeAgendas {

    onupdate() {
        m.redraw();
    }

    view() {
        return [
            m("label.tx-uppercase.tx-sans.tx-11.tx-medium.tx-spacing-1.tx-color-03.mg-0", "SALA(S)/RECURSO(S):"),
            m('p.mg-0.pd-0', [
                Calendario.calendarios.map((_v, _i) => {
                    if (_v.TIPO == 1) {
                        if (Calendario.idCalendar !== null) {
                            let _agendas = Calendario.idCalendar.split(',');
                            if (_agendas.includes(_v.IDCALENDAR)) {
                                return m("span.badge.badge-primary.mg-r-2", _v.CALENDAR);
                            }
                        }
                    }
                }),
            ]),
            m("label.tx-uppercase.tx-sans.tx-11.tx-medium.tx-spacing-1.tx-color-03.mg-0", "MÉDICO(S)/PRESTADORE(S):"),
            m('p.mg-0.pd-0', [
                Calendario.calendarios.map((_v, _i) => {
                    if (_v.TIPO == 2) {
                        if (Calendario.idCalendar !== null) {
                            let _agendas = Calendario.idCalendar.split(',');
                            if (_agendas.includes(_v.IDCALENDAR)) {
                                return m("span.badge.badge-primary.mg-r-2", _v.CALENDAR);
                            }
                        }
                    }
                })
            ])


        ];

    }
}

class BadgeAgendasCita {

    view() {
        if (Cita.data !== null && Cita.data.calendarios !== undefined) {
            return [
                m("label.tx-uppercase.tx-sans.tx-11.tx-medium.tx-spacing-1.tx-color-03.mg-0", "SALA(S)/RECURSO(S):"),
                m('p.mg-0.pd-0', [
                    Object.keys(Cita.data.calendarios).map((_i) => {
                        if (Cita.data.calendarios[_i].TIPO == 1) {
                            return m("span.badge.badge-primary.mg-r-2", Cita.data.calendarios[_i].CALENDAR);
                        }
                    }),
                ]),
                m("label.tx-uppercase.tx-sans.tx-11.tx-medium.tx-spacing-1.tx-color-03.mg-0", "MÉDICO(S)/PRESTADORE(S):"),
                m('p.mg-0.pd-0', [
                    Object.keys(Cita.data.calendarios).map((_i) => {
                        if (Cita.data.calendarios[_i].TIPO == 2) {
                            return m("span.badge.badge-primary.mg-r-2", Cita.data.calendarios[_i].CALENDAR);
                        }
                    }),
                ])

            ];
        }

    }
}


class FetchCalendario {
    static events = null;
    static peerId = null;
    static fetch() {

        OnlineCalendar.status = "";

        // crea un canal de eventos con el nombre "test" y una función que imprime los eventos recibidos
        FetchCalendario.channel = new WebRTCConnection((id) => {
            FetchCalendario.peerId = id + "_" + App.userName;
            EventosCalendario.getStatus(FetchCalendario.peerId);
        });

        Calendario.setLoader();
        return m.request({
            method: "GET",
            url: "https://api.hospitalmetropolitano.org/v2/date/citas/agendadas",
            params: {
                idCalendar: Calendario.idCalendar
            },
            headers: {
                "Content-Type": "application/json; charset=utf-8"
            }
        }).then(function(res) {
            Calendario.setLoader();
            Calendario.citas = {
                status: res.status,
                data: res.citasAgendadas,
                colorsCalendar: res.colorsCalendar
            };
            Calendario.setSidebar();
            Calendario.setCalendar();
            setTimeout(() => {
                if (FetchCalendario.peerId == null) {
                    OnlineCalendar.status = "Offline";
                } else {
                    OnlineCalendar.status = "Online";
                }
                m.redraw();

            }, 5000);
        }).catch(function(e) {
            Calendario.setLoader();
            Calendario.citas = {
                status: null,
                message: e
            };
        });
    }



    static reloadFetchAgenda() {
        try {
            setTimeout(() => {
                return m.request({
                    method: "GET",
                    url: "https://api.hospitalmetropolitano.org/v2/date/citas/agendadas",
                    params: {
                        idCalendar: Calendario.idCalendar,
                        searchPaciente: Calendario.searchPaciente
                    },
                    headers: {
                        "Content-Type": "application/json; charset=utf-8"
                    }
                }).then(function(res) {
                    if (res.status) {

                        Calendario.citas = {
                            status: res.status,
                            data: res.citasAgendadas,
                            colorsCalendar: res.colorsCalendar
                        };
                        Calendario.reloadCalendar();
                        Calendario.reloadCitasSidebar();

                    } else {
                        Calendario.setLoader();
                        Calendario.citas = {
                            status: res.status,
                            message: res.message

                        };
                    }

                }).catch(function(e) {
                    Calendario.setLoader();
                    Calendario.citas = {
                        status: null,
                        message: e
                    };
                });
            }, 50);
        } catch (error) {
            Calendario.setLoader();
            Calendario.citas = {
                status: null,
                message: error
            };
        }



    }

    static fetchPerfilAgenda() {
        try {
            Calendario.setLoader();
            return m.request({
                method: "POST",
                url: "https://api.hospitalmetropolitano.org/v2/date/citas/perfil",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": localStorage.userToken
                }
            }).then(function(res) {
                if (res.status) {

                    let _calendars = res.data.calendarios.sort(function(a, b) {
                        if (a.CALENDAR < b.CALENDAR) {
                            return -1;
                        }
                        if (a.CALENDAR > b.CALENDAR) {
                            return 1;
                        }
                        return 0;
                    });

                    Calendario.calendarios = _calendars;

                    if (Calendario.idCalendar == null) {
                        Calendario.idCalendar = res.data.agendas;
                    }
                    m.route.set("/endoscopia/agendas/calendario/", {
                        idCalendar: encodeURIComponent(Calendario.idCalendar)
                    });
                    FetchCalendario.fetch();
                } else {
                    Calendario.setLoader();
                    Calendario.citas = {
                        status: res.status,
                        message: res.message

                    };
                }
            }).catch(function(e) {
                Calendario.setLoader();
                Calendario.citas = {
                    status: null,
                    message: e
                };
            });
        } catch (error) {
            Calendario.setLoader();
            Calendario.citas = {
                status: null,
                message: error
            };
        }
    }

}

class OnlineCalendar {
    static status = "";
    view() {
        if (OnlineCalendar.status == 'Online') {
            return [
                m("span.badge.badge-primary.tx-8", {
                        title: "Su Calendario exta sincronizado."
                    },
                    OnlineCalendar.status
                )
            ];
        } else if (OnlineCalendar.status == 'Offline') {
            return [
                m("span.badge.badge-light.tx-8", {
                        title: "Su Calendario no esta sincronizado."
                    },
                    OnlineCalendar.status
                )
            ];
        } else {
            return [
                m("span.badge.badge-light.tx-8",
                    OnlineCalendar.status
                )
            ];
        }

    }
}


// Calendario
class Calendario extends App {

    static loader = false;
    static error = null;
    static warning = null;
    static success = null;
    static cita = null;
    static citas = null;
    static idCalendar = null;
    static calendarios = [];
    static typeAlert = null;
    static messageAlert = null;
    static searchPaciente = null;
    static scroll = null;
    static calendar = null;

    constructor() {
        super();
        if (App.isAuthenticated() && App.hasProfile("PERFIL_AG_GEST_ENDOSCOPIA")) {
            App.setTitle("Agenda Centralizada Endoscopía");
            this.view = Calendario.page;
        }
    }

    static setLoader() {
        Calendario.loader = !Calendario.loader;
    }

    static vHeader() {
        return m(HeaderCalendar, { userName: App.userName });
    }

    static setFilterRouteMedicos(medicos) {

        let resSalas = [];
        let res = [];


        if (medicos[0] == '-1') {

            let resMedicos = [];

            if (Calendario.idCalendar.indexOf(',') > 0) {
                let _agendas = Calendario.idCalendar.split(',');
                Calendario.calendarios.map((_v) => {
                    if (_v.TIPO == 1 && _agendas.includes(_v.IDCALENDAR)) {
                        resSalas.push(_v.IDCALENDAR);
                    }
                });

            } else {
                Calendario.calendarios.map((_v) => {
                    if (_v.TIPO == 1 && Calendario.idCalendar == _v.IDCALENDAR) {
                        resSalas.push(_v.IDCALENDAR);
                    }
                });
            }

            Calendario.calendarios.map((_v) => {

                if (_v.TIPO == 2) {
                    resMedicos.push(_v.IDCALENDAR);
                }
            });

            res = resSalas.concat(resMedicos);
            console.log(4, res)
            Calendario.idCalendar = res.join(',');
            RouteCal.setRoute(Calendario.idCalendar, 'idCalendar');
        } else {

            let filterMedicos = medicos.filter(item => item != '-1');

            $("#agendas").val(filterMedicos).trigger("change.select2");

            if (Calendario.idCalendar.indexOf(',') > 0) {
                let _agendas = Calendario.idCalendar.split(',');
                Calendario.calendarios.map((_v) => {
                    if (_v.TIPO == 1 && _agendas.includes(_v.IDCALENDAR)) {
                        resSalas.push(_v.IDCALENDAR);
                    }
                });

                res = resSalas.concat(filterMedicos);
                console.log(3, res)
                Calendario.idCalendar = res.join(',');
                RouteCal.setRoute(Calendario.idCalendar, 'idCalendar');
            } else {
                Calendario.calendarios.map((_v) => {
                    if (_v.TIPO == 1 && Calendario.idCalendar == _v.IDCALENDAR) {
                        resSalas.push(_v.IDCALENDAR);
                    }
                });
                res = resSalas.concat(filterMedicos);
                console.log(4, res)
                Calendario.idCalendar = res.join(',');
                RouteCal.setRoute(Calendario.idCalendar, 'idCalendar');
            }
        }



        setTimeout(() => {
            Calendario.reloadFetchAgenda();
        }, 50);




    }

    static setFilterRouteSalas(salas) {

        let resMedicos = [];
        let res = [];

        if (salas[0] == '-1') {

            let resSalas = [];

            if (Calendario.idCalendar.indexOf(',') > 0) {
                let _agendas = Calendario.idCalendar.split(',');
                Calendario.calendarios.map((_v) => {
                    if (_v.TIPO == 2 && _agendas.includes(_v.IDCALENDAR)) {
                        resMedicos.push(_v.IDCALENDAR);
                    }
                });

            } else {
                Calendario.calendarios.map((_v) => {
                    if (_v.TIPO == 2 && Calendario.idCalendar == _v.IDCALENDAR) {
                        resMedicos.push(_v.IDCALENDAR);
                    }
                });
            }

            Calendario.calendarios.map((_v) => {

                if (_v.TIPO == 1) {
                    resSalas.push(_v.IDCALENDAR);
                }
            });

            res = resMedicos.concat(resSalas);
            console.log(4, res)
            Calendario.idCalendar = res.join(',');
            RouteCal.setRoute(Calendario.idCalendar, 'idCalendar');
        } else {

            let filterSalas = salas.filter(item => item != '-1');
            $("#agendasPtes").val(filterSalas).trigger("change.select2");

            if (Calendario.idCalendar.indexOf(',') > 0) {
                let _agendas = Calendario.idCalendar.split(',');
                Calendario.calendarios.map((_v) => {
                    if (_v.TIPO == 2 && _agendas.includes(_v.IDCALENDAR)) {
                        resMedicos.push(_v.IDCALENDAR);
                    }
                });

                res = resMedicos.concat(filterSalas);
                console.log(3, res)
                Calendario.idCalendar = res.join(',');
                RouteCal.setRoute(Calendario.idCalendar, 'idCalendar');
            } else {
                Calendario.calendarios.map((_v) => {
                    if (_v.TIPO == 2 && Calendario.idCalendar == _v.IDCALENDAR) {
                        resMedicos.push(_v.IDCALENDAR);
                    }
                });
                res = resMedicos.concat(filterSalas);
                console.log(4, res)
                Calendario.idCalendar = res.join(',');
                RouteCal.setRoute(Calendario.idCalendar, 'idCalendar');
            }

        }



        setTimeout(() => {
            Calendario.reloadFetchAgenda();
        }, 50);



    }

    static reloadFetchAgenda() {

        FetchCalendario.reloadFetchAgenda();
    }


    static setSidebar() {

        $("#calendarInline").datepicker({
            showOtherMonths: true,
            selectOtherMonths: true,
            dateFormat: "yy-mm-dd",
            onSelect: function(dateText, inst) {
                $("#calendar").fullCalendar("gotoDate", dateText);

            },
            beforeShowDay: function(date) { // add leading zero to single digit date
                var day = date.getDate();
                console.log(day);

                if (day < 10) {
                    return [true, "zero  tx-danger "];
                } else {
                    return [true, " tx-danger"];
                }
            }
        });


        $("#calendarSidebarShow").on("click", function(e) {
            e.preventDefault();
            $("body").toggleClass("calendar-sidebar-show");

            $(this).addClass("d-none");
            $("#mainMenuOpen").removeClass("d-none");
        });

        $(document).on("click touchstart", function(e) {
            e.stopPropagation();

            // closing of sidebar menu when clicking outside of it
            if (!$(e.target).closest(".burger-menu").length) {
                var sb = $(e.target).closest(".calendar-sidebar").length;
                if (!sb) {
                    $("body").removeClass("calendar-sidebar-show");
                    $("#mainMenuOpen").addClass("d-none");
                    $("#calendarSidebarShow").removeClass("d-none");
                }
            }
        });


        // Scroll to bottom on div.
        let element = document.getElementById("calendarSidebarBody");
        element.scrollTop = element.scrollHeight - element.clientHeight;

        if (Calendario.scroll == null) {
            Calendario.scroll = new PerfectScrollbar('#calendarSidebarBody', { suppressScrollX: true })
        }

    }

    static setCalendar() { // Initialize fullCalendar

        setTimeout(() => {

            $("#calendar").fullCalendar({
                height: "parent",
                header: {
                    left: "prev,next today",
                    center: "title",
                    right: "month,agendaWeek,agendaDay,listWeek"
                },
                navLinks: true,
                selectable: true,
                defaultDate: moment().format("YYYY-MM-DD"),
                selectLongPressDelay: 100,
                nowIndicator: true,
                editable: false,
                defaultView: "agendaWeek",
                minTime: "07:00:00",
                maxTime: "23:40:00",
                slotDuration: "00:30:00",
                slotLabelInterval: 30,
                slotLabelFormat: "HH:mma",
                slotMinutes: 30,
                timeFormat: "HH:mma",
                views: {
                    agenda: {
                        columnHeaderHtml: function(mom) {
                            return ("<span>" + mom.format("ddd") + "</span>" + "<span>" + mom.format("DD") + "</span>");
                        }
                    },
                    day: {
                        columnHeader: false
                    },
                    listMonth: {
                        listDayFormat: "ddd DD",
                        listDayAltFormat: false
                    },
                    listWeek: {
                        listDayFormat: "ddd DD",
                        listDayAltFormat: false
                    },
                    agendaThreeDay: {
                        type: "agenda",
                        duration: {
                            days: 3
                        },
                        titleFormat: "MMMM YYYY"
                    }
                },
                eventSources: [Calendario.citas.data],
                eventAfterAllRender: function(view) {
                    if (view.name === "listMonth" || view.name === "listWeek") {
                        var dates = view.el.find(".fc-list-heading-main");
                        dates.each(function() {
                            var text = $(this).text().split(" ");
                            var now = moment().format("DD");

                            $(this).html(text[0] + "<span>" + text[1] + "</span>");
                            if (now === text[1]) {
                                $(this).addClass("now");
                            }
                        });


                    }

                    if (Cita.data == null) {
                        if ($("#calendar .fc-event").length > 0) {
                            var op = 999999;
                            $("#calendar .fc-content-col").each(function(index) {
                                if ($(this).find('.fc-event:first').length > 0) {
                                    var ot = $(this).find('.fc-event:first').position().top;
                                    if (ot < op) {
                                        op = ot;
                                    }
                                }
                            });
                            if (op < 999999) {
                                $("#calendar .fc-scroller").animate({
                                    scrollTop: op
                                }, 800);
                            }
                        }
                    }



                    $('[data-toggle="tooltip"]').tooltip({
                        template: '<div class=" tooltip tooltip-dark " role="tooltip">' + '<div class= "arrow" ></div>' + '<div class="tooltip-inner"></div>' + "</div > "
                    });


                },
                eventRender: function(event, element) {
                    /*
                                                      if (event.description) {
                                                      element.find('.fc-list-item-title').append('<span class="fc-desc">' + event.description + '</span>');
                                                      element.find('.fc-content').append('<span class="fc-desc">' + event.description + '</span>');
                                                  }
                                                  */


                    let nacimiento = moment(event.fecha_nacimiento, "DD/MM/YYYY");
                    let hoy = moment();
                    let anios = hoy.diff(nacimiento, "years");
                    let eBorderColor = event.borderColor ? event.borderColor : event.borderColor;
                    let _calendarios = "";

                    if (event.calendarios !== undefined && Object.keys(event.calendarios).length !== 0) {
                        for (let i = 0; i < Object.keys(event.calendarios).length; i++) {
                            let key = Object.keys(event.calendarios)[i];
                            _calendarios += i + 1 + ".- " + event.calendarios[key].CALENDAR + " <br> ";
                        }
                    }

                    element.find(".fc-title").parent().attr("data-toggle", "tooltip");
                    element.find(".fc-title").parent().attr("data-html", "true");
                    element.find(".fc-title").parent().attr("data-placement", "left");

                    if (event.tipo == 1) {
                        element.find(".fc-title").parent().attr("title", "<div class='wd-50px text-left'>" + (event.userEdit !== undefined ? event.userEdit + ' esta modificando esta cita.' : 'Cita Médica: ') + "</div> <br> <div class='wd-50px text-left'>Paciente:</div> <div class='wd-50px text-left'>" + event.paciente + "  </div> <div class='wd-50px text-left'>" + anios + " Años - " + (
                            event.sexo == "M" ? "Masculino" : "Femenino"
                        ) + "  </div> <br> <div class='wd-50px text-left'>Fecha Y Hora:</div> <div class='wd-50px text-right text-capitalize'>" + moment(event.inicio, "DD/MM/YYYY HH:mm").format("HH:mm") + " - " + moment(event.fin, "DD/MM/YYYY HH:mm").format("HH:mm") + " <br> " + moment(event.fin, "DD/MM/YYYY HH:mm").format("dddd, DD/MM/YYYY") + "  </div> <br>  " + "<div class='wd-50px text-left'>Agendas:</div> <div class='wd-50px text-left'>" + _calendarios + "</div>  ");
                    }

                    if (event.tipo == 2) {
                        element.find(".fc-title").parent().attr("title", "<div class='wd-50px text-left'>" + event.title + "  </div> <br>" + "<div class='wd-50px text-left'>Agendas:</div> <div class='wd-50px text-left'>" + _calendarios + "</div>  ");
                    }

                    if (event.tipo == 3) {
                        element.find(".fc-title").parent().parent().css("width", "35%");
                        element.find(".fc-title").parent().attr("title", "<div class='wd-50px text-left'>" + event.title + "  </div> " + "<br> <div class='wd-50px text-left'>Fecha Y Hora:</div> <div class='wd-50px text-right text-capitalize'>" + moment(event.inicio, "DD/MM/YYYY HH:mm").format("HH:mm") + " - " + moment(event.fin, "DD/MM/YYYY HH:mm").format("HH:mm") + " <br> " + moment(event.fin, "DD/MM/YYYY HH:mm").format("dddd, DD/MM/YYYY") + "  </div> <br> " + "<div class='wd-50px text-left'>Agendas:</div> <div class='wd-50px text-left'>" + _calendarios + "</div>  ");
                    }

                    if (event.editable) {
                        element.find(".fc-content").css({ "background-color": "#dc3545", color: "#fff" });
                        element.find(".fc-title").css({ "background-color": "#dc3545", color: "#fff", "font-size": "10px" });
                    } else {
                        element.find(".fc-title").css({ "font-size": "10px" });
                        element.find(".fc-list-item-time").css({ color: eBorderColor, borderColor: eBorderColor });
                        element.find(".fc-list-item-title").css({ borderColor: eBorderColor });
                        element.css("borderLeftColor", eBorderColor);
                    }
                },
                eventDrop: function(calEvent) {
                    if (calEvent.editable) {
                        if (calEvent.userEdit !== undefined && calEvent.userEdit == App.userName) {
                            setTimeout(() => {
                                Cita.setUpdate(calEvent);
                            }, 50);
                        } else {
                            Calendario.reloadCalendar();
                        }
                    }


                },

                eventResize: function(calEvent) {
                    if (calEvent.editable) {
                        if (calEvent.userEdit !== undefined && calEvent.userEdit == App.userName) {
                            setTimeout(() => {
                                Cita.setUpdate(calEvent);
                            }, 50);
                        } else {
                            Calendario.reloadCalendar();
                        }
                    }
                },
                viewSkeletonRender: function(info) {
                    info.view.calendar.scrollToTime((new Date()) - calendar.state.dateProfile.renderRange.start);
                }
            });


            $(".select2-modal").select2({ minimumResultsForSearch: Infinity, dropdownCssClass: "select2-dropdown-modal" });


            Calendario.calendar = $("#calendar").fullCalendar("getCalendar");

            // Display calendar event modal
            Calendario.calendar.on("eventClick", function(calEvent, jsEvent, view) {

                if (calEvent.tipo == 1 && !calEvent.editable) {
                    Cita.verCita(calEvent);
                }

                if (calEvent.tipo == 1 && calEvent.editable) {
                    if (calEvent.userEdit !== undefined && calEvent.userEdit == App.userName) {
                        setTimeout(() => {
                            Cita.verUpdate(calEvent);
                        }, 50);
                    }


                }

                if (calEvent.tipo > 1 && !calEvent.editable) {
                    Cita.verEvento(calEvent);
                }



            });




            // change view to week when in tablet
            if (window.matchMedia("(min-width: 576px)").matches) {
                try {
                    // Calendario.calendar.changeView("agendaWeek");
                    Calendario.calendar.changeView("agendaWeek");
                } catch (error) {
                    setTimeout(() => {
                        window.location.reload();
                    }, 1000);
                }
            }

            // change view to month when in desktop
            if (window.matchMedia("(min-width: 992px)").matches) {
                try {
                    // Calendario.calendar.changeView("agendaWeek");
                    Calendario.calendar.changeView("agendaWeek");
                } catch (error) {
                    setTimeout(() => {
                        window.location.reload();
                    }, 1000);
                }
            }



            // display current date
            // let dateNow = Calendario.calendar.getDate();
            Calendario.calendar.option("select", function(startDate, endDate) {

                if (Calendario.idCalendar !== null) {
                    let fecha = moment(startDate).format("DD/MM/YYYY HH:mm");
                    if (moment(fecha, "DD/MM/YYYY HH:mm").unix() > moment().unix()) {
                        Cita.crearCita(startDate, endDate);
                    }
                }

            });




        }, 50);



    }


    static setItem(params) {
        Cita.error = null;
        let fecha1 = moment(Cita.data.inicio, "DD/MM/YYYY HH:mm");
        let _duracion = moment(params.DURACION, "HH:mm").minutes();
        let _suma = fecha1.add(_duracion, "minutes");
        Cita.data.end = moment(_suma).format("dddd, DD-MM-YYYY HH:mm");
        Cita.data.fin = moment(_suma).format("DD/MM/YYYY HH:mm");
        Cita.data.estudio = params.DS_ITEM_AGENDAMENTO;
        Cita.data.id_estudio = params.CD_ITEM_AGENDAMENTO;
        Cita.data.hashCita = moment(Cita.data.inicio, "DD/MM/YYYY HH:mm").format("YYYY-MM-DD HH:mm") + "." + moment(Cita.data.fin, "DD/MM/YYYY HH:mm").format("YYYY-MM-DD HH:mm");
        Cita.buscarItems = !Cita.buscarItems;
    }

    static setPaciente(params) {

        Cita.error = null;
        Cita.data.nhc = params.CD_PACIENTE;
        Cita.data.paciente = params.NM_PACIENTE;
        Cita.data.telefono = "0998785402";
        Cita.data.sexo = params.TP_SEXO;
        Cita.data.fecha_nacimiento = moment(params.DT_NASCIMENTO, "DD-MM-YYYY").format("DD/MM/YYYY");
        Cita.data.email = params.EMAIL;
        Cita.buscarPacientes = !Cita.buscarPacientes;
        Cita.data.sinDatos = false;

        let elt = $("#correoCreaCita");
        elt.tagsinput('removeAll');

        if (Cita.data.email !== undefined) {
            elt.tagsinput("add", Cita.data.email);
        }

    }

    static sendEvent() {
        EventosCalendario.getStatus(FetchCalendario.peerId).then((_data) => {
            FetchCalendario.channel.sendAll(_data.usersCalendar, App.userName);
        });
    }

    static vMain() {
        return [
            m("div.calendar-wrapper", [
                m("div.calendar-sidebar", [
                    m("div.calendar-sidebar-header", [
                        m("i[data-feather='search']"), m("div.search-form", [
                            m("input.form-control[type='search'][placeholder='Buscar por NHC o Apellidos y Nombres'][title='Buscar por NHC o Apellidos y Nombres']", {
                                onkeypress: (e) => {
                                    if (Calendario.searchPaciente.length !== 0) {
                                        if (e.keyCode == 13) {
                                            m.route.set("/endoscopia/agendas/calendario/", {
                                                idCalendar: encodeURIComponent(Calendario.idCalendar),
                                                searchPaciente: encodeURIComponent(Calendario.searchPaciente)
                                            });
                                            Calendario.reloadFetchAgenda();
                                        }
                                    } else {
                                        m.route.set("/endoscopia/agendas/calendario/", {
                                            idCalendar: encodeURIComponent(Calendario.idCalendar)
                                        });
                                        Calendario.reloadFetchAgenda();
                                    }
                                },
                                oninput: (e) => {
                                    Calendario.searchPaciente = e.target.value;
                                    if (Calendario.searchPaciente.length == 0) {
                                        m.route.set("/endoscopia/agendas/calendario/", {
                                            idCalendar: encodeURIComponent(Calendario.idCalendar)
                                        });
                                        Calendario.reloadFetchAgenda();
                                    }
                                }
                            }),
                        ]),
                        m("a.btn btn-sm btn-primary btn-icon calendar-add", {
                            onclick: (e) => {
                                e.preventDefault();

                                Cita.crearCita(moment(moment().format("YYYY-MM-DD HH:00:00")), moment(moment().format("YYYY-MM-DD HH:10:00")));



                            }
                        }, [
                            m("div[data-toggle='tooltip']", [m("i.tx-white[data-feather='plus']"), ]),
                        ]),
                    ]),
                    m("div.calendar-sidebar-body.ht-auto.pos-relative[id='calendarSidebarBody']", [
                        m("div.calendar-inline", m("div[id='calendarInline']")),
                        m("div.pd-t-0.pd-l-20.pd-r-20", [
                            m("label.tx-uppercase.tx-sans.tx-10.tx-medium.tx-spacing-1.tx-color-03.mg-b-5", {

                            }, ["Status: ", m(OnlineCalendar)]),

                        ]),
                        m("div.pd-t-0.pd-l-20.pd-r-20", [
                            m("label.tx-uppercase.tx-sans.tx-10.tx-medium.tx-spacing-1.tx-color-03.mg-b-5", {

                            }, "Médicos/Prestadores: "),

                            m("div.schedule-group.mg-b-5",
                                (Calendario.calendarios.length !== 0 ? [
                                    m(SelectMedicos, {
                                        idFilter: Calendario.idCalendar,
                                        calendarios: Calendario.calendarios
                                    })
                                ] : [
                                    m(Loader)
                                ])

                            )

                        ]),

                        m("div.pd-t-0.pd-l-20.pd-r-20", [
                            m("label.tx-uppercase.tx-sans.tx-10.tx-medium.tx-spacing-1.tx-color-03.mg-b-5", {

                            }, "Salas/Recursos: "),

                            m("div.schedule-group",
                                (Calendario.calendarios.length !== 0 ? [
                                    m(SelectPacientes, {
                                        idFilter: Calendario.idCalendar,
                                        calendarios: Calendario.calendarios
                                    })
                                ] : [
                                    m(Loader)
                                ])
                            )

                        ]),
                        m("div.pd-t-20.pd-l-20.pd-r-20", [
                            m("label.tx-uppercase.tx-sans.tx-10.tx-medium.tx-spacing-1.tx-color-03.mg-b-15", "Próximas Citas:"),
                            m("div.schedule-group.mg-b-5",
                                (Calendario.citas !== null && Calendario.citas.status ? [
                                    m(ProximasCitas, {
                                        citas: Calendario.citas.data,
                                    })
                                ] : [
                                    m(Loader)
                                ])
                            ),
                        ]),

                        m("div.pd-t-5.pd-l-20.pd-r-20", [
                            m("label.tx-uppercase.tx-sans.tx-10.tx-medium.tx-spacing-1.tx-color-03.mg-b-15", "Citas Anteriores:"),
                            m("div.schedule-group.mg-b-5",
                                (Calendario.citas !== null && Calendario.citas.status ? [
                                    m(CitasAnteriores, {
                                        citas: Calendario.citas.data,
                                    })
                                ] : [
                                    m(Loader)
                                ])
                            ),

                        ]),
                        m("div.pd-t-5.pd-l-20.pd-r-20", [
                            m("label.tx-uppercase.tx-sans.tx-10.tx-medium.tx-spacing-1.tx-color-03.mg-b-15", "Próximos Eventos/Bloqueos:"),
                            m("div.schedule-group.mg-b-5",
                                (Calendario.citas !== null && Calendario.citas.status ? [
                                    m(ProximosEventos, {
                                        citas: Calendario.citas.data,
                                    })
                                ] : [
                                    m(Loader)
                                ])
                            ),
                            m('br')
                        ]),

                    ]),
                ]),

                m("div.calendar-content", [Calendario.loader && Calendario.citas !== null && Calendario.citas.status && Calendario.citas.data.length !== 0 ? [
                    m("div.pd-20.mg-b-0", {
                        class: Calendario.error != null ? "" : "d-none"
                    }, [
                        m(".alert.alert-danger.fade.show.mg-b-0[role='alert']", [
                            m("strong", m("i.fas.fa-exclamation-triangle.mg-r-2"), "Error: "),
                            Calendario.error,
                            m("button.close[type='button'][aria-label='Close']", {
                                onclick: () => {
                                    Calendario.error = null;
                                }
                            }, m("span[aria-hidden='true']", "×")),
                        ]),
                    ]),
                    m("div.pd-20.mg-b-0", {
                        class: Calendario.warning != null ? "" : "d-none"
                    }, [
                        m(".alert.alert-warning.fade.show.mg-b-0[role='alert']", [
                            Calendario.warning,
                            m("button.close[type='button'][aria-label='Close']", {
                                onclick: () => {
                                    Calendario.warning = null;
                                }
                            }, m("span[aria-hidden='true']", "×")),
                        ]),
                    ]),
                    m("div.pd-20", {
                        class: Calendario.success != null ? "" : "d-none"
                    }, [
                        m(".alert.alert-success.fade.show.mg-b-0[role='alert']", [
                            m("strong", m("i.fas.fa-check-circle.mg-r-2"), "Anuncio: "),
                            Calendario.success,
                            m("button.close[type='button'][aria-label='Close']", {
                                onclick: () => {
                                    Calendario.success = null;
                                }
                            }, m("span[aria-hidden='true']", "×")),
                        ]),
                    ]),

                    m("div.calendar-content-body[id='calendar']"),
                ] : !Calendario.loader && Calendario.citas !== null && (!Calendario.citas.status || Calendario.citas.status == null) ? [
                    m("div.pd-20", [
                        m(Errors, {
                            type: !Calendario.citas.status ? 1 : 0,
                            error: Calendario.citas
                        }),
                    ]),
                ] : [m("div.pd-20", [m(Loader)])], ]),
            ]),

            m(".modal.calendar-modal-create[id='modalCreateEvent'][role='dialog'][aria-hidden='true']", m(".modal-dialog.modal-dialog-centered.modal-xl[role='document']", m("div.modal-content", [
                m("div.modal-header.tx-white.mg-0", {
                    style: {
                        "background-color": "rgb(50, 90, 152)"
                    }
                }, [
                    m(".d-inline.tx-semibold.tx-18.tx-white.mg-0", "Nueva Cita"),
                    m("nav.nav.nav-modal-event", [
                        m(".tx-14.d-inline.mg-0.tx-white", "Agenda Centralizada MV v1.0"),
                    ]),
                ]),
                m("div.modal-body.pd-20.pd-sm-30", [
                    m("div.mg-t-10.pd-10.wd-100p", {
                        class: Cita.loader ? "" : "d-none"
                    }, m("div.placeholder-paragraph", [m("div.line"), m("div.line")])),

                    m("div", {
                        class: Cita.loader ? "d-none" : ""
                    }, [
                        m("div.col-12.pd-0", {
                            class: Cita.error != null ? "" : "d-none"
                        }, [
                            m(".alert.alert-danger.fade.show[role='alert']", [
                                m("strong", m("i.fas.fa-exclamation-triangle.mg-r-2"), "Error: "),
                                Cita.error,
                                m("button.close[type='button'][aria-label='Close']", {
                                    onclick: () => {
                                        Cita.error = null;
                                    }
                                }, m("span[aria-hidden='true']", "×")),
                            ]),
                        ]),

                        m("div.form-group", m("label.tx-semibold.tx-uppercase.tx-sans.tx-11.tx-medium.tx-spacing-1", "Tipo:"), m("div.input-group", [
                            m("div.custom-control.custom-radio", [
                                m("input.custom-control-input[type='radio'][id='tipoCita1'][name='tipoCita']", {
                                    onclick: (e) => {
                                        if (Cita.data !== null) {
                                            Cita.crearCita(moment(moment(Cita.data.start, 'dddd, DD-MM-YYYY HH:mm')), moment(moment(Cita.data.end, 'dddd, DD-MM-YYYY HH:mm')));
                                        } else {
                                            Cita.crearCita(moment(moment().format("YYYY-MM-DD 07:00:00")), moment(moment().format("YYYY-MM-DD 07:10:00")));
                                        }

                                    },
                                    checked: (Cita.data !== null && Cita.data.tipo == 1 ? true : false)

                                }),
                                m("label.custom-control-label[for='tipoCita1']", "Cita Médica"),
                            ]),
                            m("div.custom-control.custom-radio.mg-l-20", [
                                m("input.custom-control-input[type='radio'][id='tipoCita2'][name='tipoCita']", {
                                    onclick: (e) => {

                                        Cita.crearEvento();
                                    },
                                    checked: (Cita.data !== null && Cita.data.tipo == 2 ? true : false)


                                }),
                                m("label.custom-control-label[for='tipoCita2']", "Evento"),
                            ]),
                            m("div.custom-control.custom-radio.mg-l-20", [
                                m("input.custom-control-input[type='radio'][id='tipoCita3'][name='tipoCita']", {
                                    onclick: (e) => {
                                        Cita.crearNota();
                                    },
                                    checked: (Cita.data !== null && Cita.data.tipo == 3 ? true : false)


                                }),
                                m("label.custom-control-label[for='tipoCita3']", "Nota"),
                            ]),
                        ])),
                        m("div", {
                            class: !Cita.buscarPacientes ? "d-none" : ""
                        }, [
                            m("label.tx-semibold.tx-uppercase.tx-sans.tx-11.tx-medium.tx-spacing-1", "Buscar Pacientes:"),
                            m("div.form-group", m("form", {
                                onsubmit: (e) => {
                                    e.preventDefault();
                                    if (BuscadorPacientes.searchField.length !== 0) {
                                        BuscadorPacientes.fetchSearch();
                                        Cita.buscarPacientes = true;

                                    } else {
                                        $("#modalCreateEvent").animate({
                                            scrollTop: 0
                                        }, "slow");
                                        Cita.error = "Ingrese Apellidos y Nombres para continuar.";
                                        Cita.buscarPacientes = true;

                                    }
                                }
                            }, [
                                m("div.input-group", [
                                    m("input.form-control[type='text'][placeholder='Apellidos y Nombres']", {
                                        oninput: (e) => {
                                            Cita.error = null;
                                            BuscadorPacientes.searchField = e.target.value;
                                        }
                                    }),
                                    m("div.input-group-append",
                                        m("button.btn.btn-light[type='button']", {
                                            onclick: (e) => {
                                                if (BuscadorPacientes.searchField.length !== 0) {
                                                    BuscadorPacientes.fetchSearch();
                                                    Cita.buscarPacientes = true;

                                                } else {
                                                    $("#modalCreateEvent").animate({
                                                        scrollTop: 0
                                                    }, "slow");
                                                    Cita.error = "Ingrese Apellidos y Nombres para continuar.";
                                                    Cita.buscarPacientes = true;

                                                }
                                            }
                                        }, "Buscar"), m("button.btn.btn-light[type='button']", {
                                            title: "Cerrar",
                                            onclick: (e) => {
                                                Cita.error = null;
                                                Cita.buscarPacientes = !Cita.buscarPacientes;
                                            }
                                        }, m("i.fas.fa-times-circle"))),
                                ]),
                            ]), m("div.row", [m("div.col-12", m(BuscadorPacientes))])),
                        ]),

                        m("div", {
                            class: !Cita.buscarItems ? "d-none" : ""
                        }, [
                            m("label.tx-semibold.tx-uppercase.tx-sans.tx-11.tx-medium.tx-spacing-1", "Buscar Items:"),
                            m("div.form-group", m("form", {
                                onsubmit: (e) => {
                                    e.preventDefault();
                                    if (BuscadorItems.searchField.length !== 0) {
                                        BuscadorItems.fetchSearch();
                                        Cita.buscarItems = true;
                                    } else {
                                        $("#modalCreateEvent").animate({
                                            scrollTop: 0
                                        }, "slow");
                                        Cita.error = "Ingrese algún valor para continuar.";
                                        Cita.buscarItems = true;
                                    }
                                }
                            }, [
                                m("div.input-group", [
                                    m("input.form-control[type='text'][placeholder='Buscar Items']", {
                                        oninput: (e) => {
                                            Cita.error = null;
                                            BuscadorItems.searchField = e.target.value;
                                        }
                                    }),
                                    m("div.input-group-append", m("button.btn.btn-light[type='button']", {
                                        onclick: (e) => {
                                            if (BuscadorItems.searchField.length !== 0) {
                                                BuscadorItems.fetchSearch();
                                                Cita.buscarItems = true;
                                            } else {
                                                $("#modalCreateEvent").animate({
                                                    scrollTop: 0
                                                }, "slow");
                                                Cita.error = "Ingrese algún valor para continuar.";
                                                Cita.buscarItems = true;
                                            }
                                        }
                                    }, "Buscar"), m("button.btn.btn-light[type='button']", {
                                        title: "Cerrar",
                                        onclick: (e) => {
                                            Cita.error = null;
                                            Cita.buscarItems = !Cita.buscarItems;
                                        }
                                    }, m("i.fas.fa-times-circle"))),
                                ]),
                            ]), m("div.row", [m("div.col-12", m(BuscadorItems))])),
                        ]),

                        (Cita.data !== null && Cita.data.tipo == 1 ? [


                            m("div", {
                                class: Cita.buscarPacientes || Cita.buscarItems ? "d-none" : ""
                            }, [

                                m("div.row", [
                                    m("div.col-12", [
                                        m("label.tx-uppercase.tx-sans.tx-11.tx-medium.tx-spacing-1.tx-color-03.mg-0", "Agenda(s):"),
                                        m("p", [

                                            m(BadgeAgendas)

                                        ]),
                                    ]),
                                ]),

                                m("div.form-group.d-none", m("label.tx-semibold.tx-uppercase.tx-sans.tx-11.tx-medium.tx-spacing-1", "Agendas:")),
                                (Cita.data.tipo == 1 && Cita.data.estudio !== undefined) ? [
                                    m("div.form-group", [
                                        m("div.row.row-xs", [
                                            m("div.col-6", m("label.tx-semibold.tx-uppercase.tx-sans.tx-11.tx-medium.tx-spacing-1", "Fecha y Hora de Inicio:"), m("input.form-control.text-capitalize[id='eventStartDate'][type='text'][disabled='disabled']", { value: Cita.data.start })),
                                            m("div.col-6", m("label.tx-semibold.tx-uppercase.tx-sans.tx-11.tx-medium.tx-spacing-1", "Fecha y Hora de Fin"), m("input.form-control.text-capitalize[type='text'][id='eventEndDate'][disabled='disabled']", { value: Cita.data.end })),
                                        ]),
                                    ]),
                                ] : [],


                                m("div.form-group", m("label.tx-semibold.tx-uppercase.tx-sans.tx-11.tx-medium.tx-spacing-1", "Estudio:"), m("div.input-group", [
                                    m("input.form-control[type='text'][placeholder='Items/Estudio']", {
                                        class: Cita.data.id_estudio !== undefined ? "" : "d-none",
                                        value: Cita.data.id_estudio !== undefined ? Cita.data.id_estudio + " - " + Cita.data.estudio : "",
                                        oninput: (e) => {
                                            e.preventDefault();
                                        },
                                        disabled: Cita.data.id_estudio !== undefined ? "disabled" : ""
                                    }),
                                    m("div.input-group-append", m("button.btn.btn-primary[type='button']", {
                                        onclick: (e) => {
                                            Cita.error = null;
                                            Cita.buscarItems = !Cita.buscarItems;
                                        }
                                    }, [m("i.fas.fa-search.mg-r-2"), " Buscar Estudios"])),
                                ])),


                                m("div.form-group", m("label.tx-semibold.tx-uppercase.tx-sans.tx-11.tx-medium.tx-spacing-1", "Paciente: "),

                                    m("div.input-group", {
                                        class: Cita.data.sinDatos ? "d-none" : ""
                                    }, [
                                        m("input.form-control[type='text'][placeholder='Numero de Historia Clínica'][autofocus]", {
                                            class: Cita.data.paciente !== undefined ? "" : "d-none",
                                            value: Cita.data.paciente !== undefined ? (Cita.data.nhc !== undefined ? Cita.data.nhc + " - " : '') + Cita.data.paciente : "",
                                            oninput: (e) => {
                                                e.preventDefault();
                                            },
                                            disabled: Cita.data.paciente !== undefined ? "disabled" : ""
                                        }),
                                        m("div.input-group-append",
                                            m("button.btn.btn-primary[type='button']", {
                                                onclick: (e) => {
                                                    Cita.error = null;
                                                    Cita.data.sinDatos = false;
                                                    Cita.buscarPacientes = !Cita.buscarPacientes;
                                                }
                                            }, [
                                                m("i.fas.fa-search.mg-r-2"), " Buscar Pacientes ",
                                            ]),
                                            m("button.btn.btn-light[type='button']", {
                                                class: (Cita.data.paciente !== undefined ? 'd-none' : ''),
                                                onclick: () => {
                                                    Cita.error = null;
                                                    Cita.data.sinDatos = true;
                                                }
                                            }, [
                                                m("i.fas.fa-edit.mg-r-2"), "Agendar Sin Historia Clínica",
                                            ])


                                        ),


                                    ]),


                                    m("div.input-group", {
                                        class: Cita.data.sinDatos ? "" : "d-none"
                                    }, [
                                        m("div.col-12.mg-b-10", [
                                            m("label.tx-semibold.tx-uppercase.tx-sans.tx-11.tx-medium.tx-spacing-1", "Apellidos y Nombres del Paciente:"),
                                            m("div.input-group", [
                                                m("input.form-control[type='text'][placeholder='Apellidos y Nombres del Paciente'][autofocus]", {
                                                    oninput: (e) => {
                                                        Cita.data.paciente = e.target.value;
                                                    }
                                                }),
                                                m("div.input-group-append", m("button.btn.btn-light[type='button']", {
                                                    title: "Cerrar",
                                                    onclick: (e) => {
                                                        Cita.error = null;
                                                        Cita.data.sinDatos = false;

                                                        // Set Filter valores
                                                        delete Cita.data.paciente;
                                                        delete Cita.data.fecha_nacimiento;
                                                        delete Cita.data.sexo;
                                                        delete Cita.data.telefono;
                                                        delete Cita.data.email;

                                                        console.log(Cita.data)


                                                    }
                                                }, m("i.fas.fa-times-circle"))),
                                            ]),
                                        ]),
                                    ]),
                                    m("div.input-group", {
                                        class: Cita.data.sinDatos ? "" : "d-none"
                                    }, [
                                        m("div.col-12.mg-b-10", [
                                            m("label.tx-semibold.tx-uppercase.tx-sans.tx-11.tx-medium.tx-spacing-1", "Fecha de Nacimiento:"),
                                            m("input.form-control[type='text'][id='dateBirth'][placeholder='DD/MM/YYYY']", {
                                                oninput: (e) => {
                                                    setTimeout(() => {
                                                        Cita.data.fecha_nacimiento = e.target.value;


                                                    }, 50);
                                                },
                                                oncreate: (e) => {
                                                    setTimeout(() => {
                                                        new Cleave("#dateBirth", {
                                                            date: true,
                                                            datePattern: ["d", "m", "Y"]
                                                        });
                                                    }, 50);
                                                }
                                            }),
                                        ]),
                                    ]),
                                    m("div.input-group", {
                                        class: Cita.data.sinDatos ? "" : "d-none"
                                    }, [
                                        m("div.col-12.mg-b-10", [
                                            m("label.tx-semibold.tx-uppercase.tx-sans.tx-11.tx-medium.tx-spacing-1", "Sexo:"),
                                            m("select.tx-semibold", {
                                                onchange: (e) => {
                                                    Cita.data.sexo = e.target.value;
                                                },
                                                class: "custom-select"
                                            }, m("option", "Seleccione..."), m('option[value="M"]', "Masculino"), m('option[value="F"]', "Femenino")),
                                        ]),
                                    ]),
                                    m("div.input-group", {
                                        class: Cita.data.sinDatos ? "" : "d-none"
                                    }, [
                                        m("div.col-12.mg-b-10", [
                                            m("label.tx-semibold.tx-uppercase.tx-sans.tx-11.tx-medium.tx-spacing-1", "Correo electrónico:"),
                                            m("input.form-control[type='text'][placeholder='Correo electrónico'][autofocus]", {
                                                oninput: (e) => {
                                                    Cita.data.email = e.target.value;
                                                }
                                            }),
                                        ]),
                                    ]),
                                    m("div.input-group", {
                                        class: Cita.data.sinDatos ? "" : "d-none"
                                    }, [
                                        m("div.col-12.mg-b-10", [
                                            m("label.tx-semibold.tx-uppercase.tx-sans.tx-11.tx-medium.tx-spacing-1", "Celular:"),
                                            m("input.form-control[type='text'][placeholder='Celular'][autofocus]", {
                                                oninput: (e) => {
                                                    Cita.data.telefono = e.target.value;
                                                }
                                            }),

                                        ]),
                                    ])
                                ),
                                m("div.form-group", [
                                    m("ul.nav.nav-tabs[id='myTab'][role='tablist']", [
                                        m("li.nav-item", m("a.nav-link.active[id='home-tab'][data-toggle='tab'][href='#home'][role='tab'][aria-controls='home'][aria-selected='true']", "Comentarios")),
                                        m("li.nav-item", {
                                            class: Cita.data.sinDatos == false && Cita.data.email !== undefined ? "" : "d-none"
                                        }, m("a.nav-link[id='profile-tab'][data-toggle='tab'][href='#profile'][role='tab'][aria-controls='profile'][aria-selected='false']", "Notificación al Correo")),
                                    ]),
                                    m(".tab-content.bd.bd-gray-300.bd-t-0.pd-20[id='myTabContent']", [
                                        m(".tab-pane.fade.show.active[id='home'][role='tabpanel'][aria-labelledby='home-tab']", [
                                            m("div.form-group", [
                                                m("label.tx-semibold.tx-uppercase.tx-sans.tx-11.tx-medium.tx-spacing-1", "Comentarios: "),
                                                m("textarea.form-control[rows='2'][placeholder='Comentarios']", {
                                                    oninput: (e) => {
                                                        Cita.data.comentarios = e.target.value;
                                                    }
                                                }),
                                            ]),
                                        ]),
                                        m(".tab-pane.fade[id='profile'][role='tabpanel'][aria-labelledby='profile-tab']", {
                                            class: Cita.data.sinDatos == false && Cita.data.email !== undefined ? "" : "d-none"
                                        }, [
                                            Cita.data.sinDatos == false && Cita.data.email !== undefined ? [
                                                m("div.form-group", m("label.tx-semibold.tx-uppercase.tx-sans.tx-11.tx-medium.tx-spacing-1", "Correo electrónico: ", m("br"), m("span.tx-light.tx-5", "*Se enviará una notificación de correo a la(s) siguiente(s) direccione(s).")), m("div", m("input.form-control[id='correoCreaCita'][type='text'][data-role='tagsinput']", {
                                                    oncreate: (el) => {
                                                        if (Cita.data.sinDatos == false && Cita.data.email !== undefined) {
                                                            let elt = $("#correoCreaCita");
                                                            elt.tagsinput({ allowDuplicates: true });
                                                            elt.on("itemAdded", function(event) {
                                                                if (Calendario.validarCorreo(event.item)) {
                                                                    console.log("item added : " + event.item);
                                                                } else {
                                                                    alert('El correo electrónico ingresado no es válido.');
                                                                    elt.tagsinput('remove', event.item);
                                                                }
                                                            });
                                                            if (Cita.data.email !== undefined) {
                                                                elt.tagsinput("add", Cita.data.email);
                                                            }
                                                        }
                                                    }
                                                }))),
                                            ] : [],
                                        ]),
                                    ]),
                                ]),
                            ]),
                        ] : Cita.data !== null && Cita.data.tipo == 2 ? [
                            m("div.form-group", [
                                m("div.row", [
                                    m("div.col-12", [
                                        m("label.tx-uppercase.tx-sans.tx-11.tx-medium.tx-spacing-1.tx-color-03", "Agenda(s):"),
                                        m("p", [
                                            m(BadgeAgendas)
                                        ]),
                                    ]),
                                ]),
                                m("div.row.row-xs", [
                                    m("div.col-3", m("label.tx-semibold.tx-uppercase.tx-sans.tx-11.tx-medium.tx-spacing-1", "Fecha de Inicio:"), m("input.form-control[id='eventStartDate'][type='text'][placeholder='DD/MM/YYYY']", {

                                        oncreate: (el) => {
                                            el.dom.value = moment(Cita.data.inicio, "DD/MM/YYYY HH:mm").format("DD/MM/YYYY");

                                            setTimeout(() => {
                                                new Cleave("#eventStartDate", {
                                                    date: true,
                                                    datePattern: ["d", "m", "Y"]
                                                });
                                            }, 50);
                                        },
                                        oninput: (e) => {

                                            setTimeout(() => {
                                                console.log(33, moment(Cita.data.inicio, "DD/MM/YYYY HH:mm").format("HH:mm"))
                                                Cita.data.inicio = e.target.value + " " + moment(Cita.data.inicio, "DD/MM/YYYY HH:mm").format("HH:mm");
                                                Cita.data.start = moment(Cita.data.inicio, "DD/MM/YYYY HH:mm").format("dddd, DD-MM-YYYY HH:mm");
                                            }, 50);


                                        },
                                    })),
                                    m("div.col-3", m("label.tx-semibold.tx-uppercase.tx-sans.tx-11.tx-medium.tx-spacing-1", "Hora de Inicio:"), m("input.form-control[id='eventStartHourDate'][type='text'][placeholder='hh:mm']", {
                                        oninput: (e) => {
                                            setTimeout(() => {
                                                Cita.data.inicio = moment(Cita.data.inicio, "DD/MM/YYYY HH:mm").format("DD/MM/YYYY") + " " + e.target.value;
                                                Cita.data.start = moment(Cita.data.inicio, "DD/MM/YYYY HH:mm").format("dddd, DD-MM-YYYY HH:mm");
                                            }, 50);

                                        },
                                        oncreate: (el) => {
                                            el.dom.value = moment(Cita.data.inicio, "DD/MM/YYYY HH:mm").format("HH:mm");

                                            setTimeout(() => {
                                                new Cleave("#eventStartHourDate", {
                                                    time: true,
                                                    timePattern: ["h", "m"]
                                                });
                                            }, 50);
                                        }
                                    })),
                                    m("div.col-3", m("label.tx-semibold.tx-uppercase.tx-sans.tx-11.tx-medium.tx-spacing-1", "Fecha de Fin"), m("input.form-control[id='eventEndDate'][type='text'][placeholder='DD/MM/YYYY']", {
                                        oncreate: (el) => {
                                            el.dom.value = moment(Cita.data.fin, "DD/MM/YYYY HH:mm").format("DD/MM/YYYY");


                                            setTimeout(() => {
                                                new Cleave("#eventEndDate", {
                                                    date: true,
                                                    datePattern: ["d", "m", "Y"]
                                                });
                                            }, 50);
                                        },
                                        oninput: (e) => {

                                            setTimeout(() => {
                                                Cita.data.fin = e.target.value + " " + moment(Cita.data.fin, "DD/MM/YYYY HH:mm").format("HH:mm");
                                                Cita.data.end = moment(Cita.data.fin, "DD/MM/YYYY HH:mm").format("dddd, DD-MM-YYYY HH:mm");
                                            }, 50);

                                        }
                                    })),
                                    m("div.col-3", m("label.tx-semibold.tx-uppercase.tx-sans.tx-11.tx-medium.tx-spacing-1", "Hora de Fin"), m("input.form-control[id='eventEndHourDate'][type='text'][placeholder='hh:mm']", {
                                        oninput: (e) => {
                                            setTimeout(() => {
                                                Cita.data.fin = moment(Cita.data.fin, "DD/MM/YYYY HH:mm").format("DD/MM/YYYY") + " " + e.target.value;
                                                Cita.data.end = moment(Cita.data.fin, "DD/MM/YYYY HH:mm").format("dddd, DD-MM-YYYY HH:mm");
                                            }, 50);
                                        },
                                        oncreate: (el) => {
                                            el.dom.value = moment(Cita.data.fin, "DD/MM/YYYY HH:mm").format("HH:mm");
                                            setTimeout(() => {
                                                new Cleave("#eventEndHourDate", {
                                                    time: true,
                                                    timePattern: ["h", "m"]
                                                });
                                            }, 50);
                                        }
                                    })),
                                ]),
                            ]),
                            m("div.form-group", m("label.tx-semibold.tx-uppercase.tx-sans.tx-11.tx-medium.tx-spacing-1", "Nombre Evento:"), m("div.input-group", [
                                m("input.form-control[type='text'][placeholder='Nombre Evento']", {
                                    oninput: (e) => {
                                        Cita.data.evento = e.target.value;
                                    }
                                }),
                            ]))
                        ] : Cita.data !== null && Cita.data.tipo == 3 ? [
                            m("div.form-group", [
                                m("div.row", [
                                    m("div.col-12", [
                                        m("label.tx-uppercase.tx-sans.tx-11.tx-medium.tx-spacing-1.tx-color-03", "Agenda(s):"),
                                        m("p", [

                                            m(BadgeAgendas)

                                        ]),
                                    ]),
                                ]),
                                m("div.row.row-xs", [
                                    m("div.col-3", m("label.tx-semibold.tx-uppercase.tx-sans.tx-11.tx-medium.tx-spacing-1", "Fecha de Inicio:"),
                                        m("input.form-control[id='eventStartDate'][type='text'][placeholder='DD/MM/YYYY']", {

                                            oncreate: (el) => {
                                                el.dom.value = moment(Cita.data.inicio, "DD/MM/YYYY HH:mm").format("DD/MM/YYYY");

                                                setTimeout(() => {
                                                    new Cleave("#eventStartDate", {
                                                        date: true,
                                                        datePattern: ["d", "m", "Y"]
                                                    });
                                                }, 50);
                                            },
                                            oninput: (e) => {

                                                setTimeout(() => {
                                                    console.log(33, moment(Cita.data.inicio, "DD/MM/YYYY HH:mm").format("HH:mm"))
                                                    Cita.data.inicio = e.target.value + " " + moment(Cita.data.inicio, "DD/MM/YYYY HH:mm").format("HH:mm");
                                                    Cita.data.start = moment(Cita.data.inicio, "DD/MM/YYYY HH:mm").format("dddd, DD-MM-YYYY HH:mm");
                                                }, 50);


                                            },
                                        })),
                                    m("div.col-3", m("label.tx-semibold.tx-uppercase.tx-sans.tx-11.tx-medium.tx-spacing-1", "Hora de Inicio:"), m("input.form-control[id='eventStartHourDate'][type='text'][placeholder='hh:mm']", {
                                        oninput: (e) => {
                                            setTimeout(() => {
                                                Cita.data.inicio = moment(Cita.data.inicio, "DD/MM/YYYY HH:mm").format("DD/MM/YYYY") + " " + e.target.value;
                                                Cita.data.start = moment(Cita.data.inicio, "DD/MM/YYYY HH:mm").format("dddd, DD-MM-YYYY HH:mm");
                                            }, 50);

                                        },
                                        oncreate: (el) => {
                                            el.dom.value = moment(Cita.data.inicio, "DD/MM/YYYY HH:mm").format("HH:mm");

                                            setTimeout(() => {
                                                new Cleave("#eventStartHourDate", {
                                                    time: true,
                                                    timePattern: ["h", "m"]
                                                });
                                            }, 50);
                                        }
                                    })),
                                    m("div.col-3", m("label.tx-semibold.tx-uppercase.tx-sans.tx-11.tx-medium.tx-spacing-1", "Fecha de Fin"), m("input.form-control[id='eventEndDate'][type='text'][placeholder='DD/MM/YYYY']", {
                                        oncreate: (el) => {
                                            el.dom.value = moment(Cita.data.fin, "DD/MM/YYYY HH:mm").format("DD/MM/YYYY");


                                            setTimeout(() => {
                                                new Cleave("#eventEndDate", {
                                                    date: true,
                                                    datePattern: ["d", "m", "Y"]
                                                });
                                            }, 50);
                                        },
                                        oninput: (e) => {

                                            setTimeout(() => {
                                                Cita.data.fin = e.target.value + " " + moment(Cita.data.fin, "DD/MM/YYYY HH:mm").format("HH:mm");
                                                Cita.data.end = moment(Cita.data.fin, "DD/MM/YYYY HH:mm").format("dddd, DD-MM-YYYY HH:mm");
                                            }, 50);

                                        }
                                    })),
                                    m("div.col-3", m("label.tx-semibold.tx-uppercase.tx-sans.tx-11.tx-medium.tx-spacing-1", "Hora de Fin"), m("input.form-control[id='eventEndHourDate'][type='text'][placeholder='hh:mm']", {
                                        oninput: (e) => {
                                            setTimeout(() => {
                                                Cita.data.fin = moment(Cita.data.fin, "DD/MM/YYYY HH:mm").format("DD/MM/YYYY") + " " + e.target.value;
                                                Cita.data.end = moment(Cita.data.fin, "DD/MM/YYYY HH:mm").format("dddd, DD-MM-YYYY HH:mm");
                                            }, 50);
                                        },
                                        oncreate: (el) => {
                                            el.dom.value = moment(Cita.data.fin, "DD/MM/YYYY HH:mm").format("HH:mm");
                                            setTimeout(() => {
                                                new Cleave("#eventEndHourDate", {
                                                    time: true,
                                                    timePattern: ["h", "m"]
                                                });
                                            }, 50);
                                        }
                                    })),
                                ]),
                            ]),
                            m("div.form-group", m("label.tx-semibold.tx-uppercase.tx-sans.tx-11.tx-medium.tx-spacing-1", "Nota:"), m("div.input-group", [
                                m("input.form-control[type='text'][placeholder='Nota']", {
                                    value: Cita.data.nota !== undefined ? Cita.data.nota : "",
                                    oninput: (e) => {
                                        Cita.data.nota = e.target.value;
                                    }
                                }),
                            ])),
                        ] : [])



                    ]),


                ]),
                m("div.modal-footer",

                    {
                        class: Cita.loader ? "d-none" : ""
                    }, [
                        m("button.btn.btn-primary.mg-r-5", {
                            onclick: () => {
                                m.redraw();
                                Calendario.validarAgendamiento('Agendar');

                            }
                        }, "Agendar"),
                        m("a.btn.btn-secondary[href=''][data-dismiss='modal']", "Cerrar"),
                    ]),
            ]))),
            m(".modal.calendar-modal-event[id='modalCalendarEvent'][role='dialog'][aria-hidden='true']", m(".modal-dialog.modal-dialog-centered.modal-xl[role='document']", m("div.modal-content", [
                (Cita.data !== null ? [m("div.modal-header", {
                        style: {
                            "backgroundColor": Cita.data.borderColor ? Cita.data.borderColor : Cita.data.borderColor
                        }
                    }, [
                        m("h6.event-title", (Cita.data.tipo !== 1 ? Cita.data.title : Cita.data.paciente)),
                        m("nav.nav.nav-modal-event", [
                            m(".tx-14.d-inline.mg-0.tx-white", "Agenda Centralizada MV v1.0"),
                        ]),
                    ]),
                    m("div.modal-body", [
                        m("div.mg-t-10.pd-10.wd-100p", {
                            class: Cita.loader ? "" : "d-none"
                        }, m("div.placeholder-paragraph", [m("div.line"), m("div.line")])),
                        m('div', {
                            class: Cita.loader ? "d-none" : ""
                        }, [

                            m("div.row", [
                                m("div.col-12", [
                                    m("label.tx-uppercase.tx-sans.tx-11.tx-medium.tx-spacing-1.tx-color-03.mg-0", "Agenda(s):"),
                                    m("p", [
                                        m(BadgeAgendasCita)
                                    ]),
                                ]),
                            ]),
                            m("div.row", [
                                m("div.col-sm-6", [
                                    m("label.tx-uppercase.tx-sans.tx-11.tx-medium.tx-spacing-1.tx-color-03", "Fecha y Hora de Inicio:"),
                                    m("p.event-start-date.text-capitalize", Cita.data.start),
                                ]),
                                m("div.col-sm-6", [
                                    m("label.tx-uppercase.tx-sans.tx-11.tx-medium.tx-spacing-1.tx-color-03", "Fecha y Hora de Fin:"),
                                    m("p.event-end-date.text-capitalize", Cita.data.end),
                                ]),
                            ]),
                            (Cita.data.tipo == 1 ? [

                                m("div.row.mg-b-50", [
                                    m("div.col-6", [
                                        m("label.tx-uppercase.tx-sans.tx-11.tx-medium.tx-spacing-1.tx-color-03", "Paciente:"),
                                        m("p.mg-b-0", [Cita.data.paciente]),
                                        m("p", [
                                            Cita.data.anios + " Años - " + (
                                                Cita.data.sexo == "M" ? "Masculino" : "Femenino"
                                            ),
                                        ]),
                                    ]),
                                    m("div.col-6", [
                                        m("label.tx-uppercase.tx-sans.tx-11.tx-medium.tx-spacing-1.tx-color-03", "Correo(s) electrónico(s):"),
                                        m("p.mg-b-0", [Cita.data.email]),
                                    ]),
                                    m("div.col-6", [
                                        m("label.tx-uppercase.tx-sans.tx-11.tx-medium.tx-spacing-1.tx-color-03", "Estudio:"),
                                        m("p", [Cita.data.estudio]),
                                    ]),
                                    m("div.col-6", [
                                        m("label.tx-uppercase.tx-sans.tx-11.tx-medium.tx-spacing-1.tx-color-03", "Comentarios:"),
                                        m("p", [
                                            Cita.data.comentarios !== undefined && Cita.data.comentarios.length > 0 ? Cita.data.comentarios : "N/D",
                                        ]),
                                    ]),
                                ])
                            ] : [
                                m("div.row.mg-b-50", [
                                    m("div.col-6", [
                                        m("label.tx-uppercase.tx-sans.tx-11.tx-medium.tx-spacing-1.tx-color-03", "Evento/Nota:"),
                                        m("p.mg-b-0", Cita.data.title),

                                    ])

                                ])
                            ])
                        ]),
                        m("hr"),
                        m("div.text-right",

                            {
                                class: Cita.loader ? "d-none" : ""
                            }, [
                                (moment(Cita.data.inicio, 'DD/MM/YYYY HH:mm').unix() > moment().unix() ? [(Cita.data.tipo == 1 ? [

                                    !Cita.data.editable ? [
                                        m("button.btn.btn-xs.btn-primary.mg-r-5[data-dismiss='modal']", {
                                            onclick: () => {
                                                Cita.trackReAgendar(Calendario);
                                            }
                                        }, "Reagendar"),
                                    ] : [
                                        m("button.btn.btn-xs.btn-secondary.mg-r-5[data-dismiss='modal']", {
                                            onclick: () => {
                                                Cita.trackCancelReAgendar(Calendario);
                                            }
                                        }, "Cancelar Reagendamiento"),
                                    ],

                                    m("button.btn.btn-xs.btn-danger.mg-r-5", {

                                        onclick: () => {
                                            Cita.error = null;
                                            $.confirm({
                                                title: 'Cancelar',
                                                content: '¿Esta Ud. seguro de realizar este cancelación?',
                                                buttons: {
                                                    confirm: {
                                                        text: 'Confirmar',
                                                        action: function() {
                                                            m.redraw();
                                                            Cita.cancelarHttp(Calendario);
                                                        }
                                                    },
                                                    cancel: {
                                                        btnClass: "btn-danger op-8",
                                                        text: 'Cancelar',
                                                    }

                                                }
                                            });




                                        }
                                    }, "Cancelar"),

                                ] : [
                                    m("button.btn.btn-xs.btn-danger.mg-r-5", {
                                        onclick: () => {
                                            Cita.error = null;
                                            $.confirm({
                                                title: 'Cancelar',
                                                content: '¿Esta Ud. seguro de realizar este cancelación?',
                                                buttons: {
                                                    confirm: {
                                                        text: 'Confirmar',
                                                        action: function() {
                                                            m.redraw();
                                                            Cita.cancelarHttp(Calendario);


                                                        }
                                                    },
                                                    cancel: {
                                                        btnClass: "btn-danger op-8",
                                                        text: 'Cancelar'


                                                    }

                                                }
                                            });

                                        }
                                    }, "Cancelar"),

                                ])] : []),
                                m("a.btn.btn-xs.btn-secondary.pd-x-20[href=''][data-dismiss='modal']", "Cerrar"),
                            ]),
                    ])
                ] : [])




            ]))),
            m(".modal.calendar-modal-create[id='modalUpdateEvent'][role='dialog'][aria-hidden='true']", m(".modal-dialog.modal-dialog-centered.modal-xl[role='document']", m("div.modal-content", [

                (Cita.data !== null ? [m("div.modal-header.tx-white.bg-primary", [
                        m("h5.event-title.tx-white", "Reagendar Cita"),
                        m("nav.nav.nav-modal-event", [
                            m(".tx-14.d-inline.mg-0.tx-white", "Agenda Centralizada MV v1.0"),
                        ]),
                    ]),
                    m("div.modal-body.pd-20.pd-sm-30", [
                        m("div.mg-t-10.pd-10.wd-100p", {
                            class: Cita.loader ? "" : "d-none"
                        }, m("div.placeholder-paragraph", [m("div.line"), m("div.line")])),

                        m("div", {
                            class: Cita.loader ? "d-none" : ""
                        }, [
                            m("div.col-12.pd-0", {
                                class: Cita.error != null ? "" : "d-none"
                            }, [
                                m(".alert.alert-danger.fade.show[role='alert']", [
                                    m("strong", m("i.fas.fa-exclamation-triangle.mg-r-2"), "Error: "),
                                    Cita.error,
                                    m("button.close[type='button'][aria-label='Close']", {
                                        onclick: () => {
                                            Cita.error = null;
                                        }
                                    }, m("span[aria-hidden='true']", "×")),
                                ]),
                            ]),
                            (Cita.data.tipo == 1 ? [

                                m("div", {
                                    class: Cita.buscarPacientes || Cita.buscarItems ? "d-none" : ""
                                }, [
                                    m("div.row", [
                                        m("div.col-12", [
                                            m("label.tx-uppercase.tx-sans.tx-11.tx-medium.tx-spacing-1.tx-color-03", "Agenda(s):"),
                                            m("p", [

                                                m(BadgeAgendasCita)

                                            ]),
                                        ]),
                                    ]),
                                    m("div.form-group", [
                                        m("div.row.row-xs", [
                                            m("div.col-6", m("label.tx-semibold.tx-uppercase.tx-sans.tx-11.tx-medium.tx-spacing-1", "Fecha y Hora de Inicio:"), m("input.form-control.text-capitalize[id='eventStartDate'][type='text'][disabled='disabled']", { value: Cita.data.start })),
                                            m("div.col-6", m("label.tx-semibold.tx-uppercase.tx-sans.tx-11.tx-medium.tx-spacing-1", "Fecha y Hora de Fin"), m("input.form-control.text-capitalize[type='text'][disabled='disabled']", { value: Cita.data.end })),
                                        ]),
                                    ]),
                                    m("div.form-group", m("label.tx-semibold.tx-uppercase.tx-sans.tx-11.tx-medium.tx-spacing-1", "Estudio:"), m("div.input-group", [
                                        m("input.form-control[type='text'][placeholder='Items/Estudio']", {
                                            value: Cita.data.id_estudio !== undefined ? Cita.data.id_estudio + " - " + Cita.data.estudio : "",
                                            oninput: (e) => {
                                                e.preventDefault();
                                            },
                                            disabled: Cita.data.id_estudio !== undefined ? "disabled" : ""
                                        }),
                                    ])),
                                    m("div.form-group", m("label.tx-semibold.tx-uppercase.tx-sans.tx-11.tx-medium.tx-spacing-1", "Paciente:"), m("div.input-group", [
                                        m("input.form-control[type='text'][placeholder='Numero de Historia Clínica'][autofocus]", {
                                            value: Cita.data.paciente !== undefined ? (Cita.data.nhc !== undefined ? Cita.data.nhc + " - " : '') + Cita.data.paciente : "",
                                            oninput: (e) => {
                                                e.preventDefault();
                                            },
                                            disabled: Cita.data.paciente !== undefined ? "disabled" : ""
                                        }),

                                    ])),

                                    m("div.form-group", m("ul.nav.nav-tabs[id='myTab'][role='tablist']", [
                                        m("li.nav-item", m("a.nav-link.active[id='homeUpdate-tab'][data-toggle='tab'][href='#homeUpdate'][role='tab'][aria-controls='homeUpdate'][aria-selected='true']", "Comentarios")),
                                        m("li.nav-item", {
                                            class: Cita.data.tipo == 1 && Cita.data.email !== undefined ? "" : "d-none"
                                        }, m("a.nav-link[id='profile-tab'][data-toggle='tab'][href='#profileUpdate'][role='tab'][aria-controls='profileUpdate'][aria-selected='false']", "Notificación al Correo")),
                                    ]), m(".tab-content.bd.bd-gray-300.bd-t-0.pd-20[id='myTabContent']", [
                                        m(".tab-pane.fade.show.active[id='homeUpdate'][role='tabpanel'][aria-labelledby='homeUpdate-tab']", [
                                            m("div.form-group", [
                                                m("label.tx-semibold.tx-uppercase.tx-sans.tx-11.tx-medium.tx-spacing-1", "Comentarios: "),
                                                m("textarea.form-control[rows='2'][placeholder='Comentarios']", {
                                                    oncreate: (el) => {
                                                        el.dom.value = (Cita.data.comentarios.length !== 0 ? Cita.data.comentarios : '')
                                                    },
                                                    oninput: (e) => {
                                                        Cita.data.comentarios = e.target.value;
                                                    }
                                                }),
                                            ]),
                                        ]),
                                        m(".tab-pane.fade[id='profileUpdate'][role='tabpanel'][aria-labelledby='profileUpdate-tab']", {
                                            class: Cita.data.tipo == 1 && Cita.data.email !== undefined ? "" : "d-none"
                                        }, [
                                            Cita.data.tipo == 1 && Cita.data.email !== undefined ? [
                                                m("div.form-group", m("label.tx-semibold.tx-uppercase.tx-sans.tx-11.tx-medium.tx-spacing-1", "Correo electrónico: ", m("br"), m("span.tx-light.tx-5", "*Se enviará una notificación de correo a la(s) siguiente(s) direccione(s).")), m("div", m("input.form-control[id='correoCitaUpdate'][type='text'][data-role='tagsinput']", {
                                                    oncreate: () => {

                                                        if (Cita.data.track == 'update' && Cita.data.email !== undefined) {

                                                            let elt = $("#correoCitaUpdate");
                                                            elt.tagsinput({ allowDuplicates: true });
                                                            elt.on("itemAdded", function(event) {
                                                                if (Calendario.validarCorreo(event.item)) {
                                                                    console.log("item added : " + event.item);
                                                                } else {
                                                                    alert('El correo electrónico ingresado no es válido.');
                                                                    elt.tagsinput('remove', event.item);
                                                                }
                                                            });

                                                            if (Cita.data.email !== undefined) {
                                                                elt.tagsinput("add", Cita.data.email);
                                                            }
                                                        }


                                                    }
                                                }))),
                                            ] : [],
                                        ])
                                    ]))
                                ])
                            ] : Cita.data.tipo == 2 ? [
                                m("div.form-group", [
                                    m("div.row.row-xs", [
                                        m("div.col-6", m("label.tx-semibold.tx-uppercase.tx-sans.tx-11.tx-medium.tx-spacing-1", "Fecha y Hora de Inicio:"), m("input.form-control.text-capitalize[id='eventStartDate'][type='text'][disabled='disabled']", { value: Cita.data.start })),
                                        m("div.col-6", m("label.tx-semibold.tx-uppercase.tx-sans.tx-11.tx-medium.tx-spacing-1", "Fecha y Hora de Fin"), m("input.form-control.text-capitalize[type='text'][disabled='disabled']", { value: Cita.data.end })),
                                    ]),
                                ]),
                                m("div.form-group", m("label.tx-semibold.tx-uppercase.tx-sans.tx-11.tx-medium.tx-spacing-1", "Nombre Evento:"), m("div.input-group", [
                                    m("input.form-control[type='text'][placeholder='Nombre Evento']", {
                                        value: Cita.data.title !== undefined ? Cita.data.title : "",
                                        oninput: (e) => {
                                            Cita.data.evento = e.target.value;
                                        }
                                    })
                                ])),

                            ] : Cita.data.tipo == 3 ? [
                                m("div.form-group", m("label.tx-semibold.tx-uppercase.tx-sans.tx-11.tx-medium.tx-spacing-1", "Nota:"), m("div.input-group", [
                                    m("input.form-control[type='text'][placeholder='Nota']", {
                                        value: Cita.data.title !== undefined ? Cita.data.title : "",
                                        oninput: (e) => {
                                            Cita.data.nota = e.target.value;
                                        }
                                    })
                                ]))
                            ] : [])



                        ]),
                    ]),
                    m("div.modal-footer", {
                        class: Cita.loader ? "d-none" : ""
                    }, [

                        m("button.btn.btn-xs.btn-primary.mg-r-5", {
                            onclick: () => {
                                Cita.error = null;

                                $.confirm({
                                    title: 'Reagendar',
                                    content: '¿Esta Ud. seguro de realizar este reagendamiento?',
                                    buttons: {
                                        confirm: {
                                            text: 'Confirmar',
                                            action: function() {
                                                m.redraw();
                                                Calendario.validarAgendamiento('Reagendar');

                                            }
                                        },
                                        cancel: {
                                            btnClass: "btn-danger op-8",
                                            text: 'Cancelar',

                                        }

                                    }
                                });



                            }
                        }, "Reagendar"),
                        m("button.btn.btn-xs.btn-outline-danger.mg-r-5[data-dismiss='modal']", {
                            onclick: () => {
                                Cita.trackCancelReAgendar(Calendario);
                            }
                        }, "Cancelar Reagendamiento"),

                        m("a.btn.btn-xs.btn-secondary[href=''][data-dismiss='modal']", "Cerrar"),
                    ])
                ] : [])



            ]))),

        ];
    }

    static vMenu() {
        return m(Sidebar);
    }




    static _goToDate(fecha) {

        let formatFecha = moment(fecha, "DD/MM/YYYY HH:mm").format("YYYY-MM-DD");
        $("#calendar").fullCalendar("gotoDate", formatFecha);
    }


    static reloadCalendar() {
        $('[data-toggle="tooltip"]').tooltip("hide");
        $("#calendar").fullCalendar("removeEvents");
        $("#calendar").fullCalendar("addEventSource", Calendario.citas.data);
        $("#calendar").fullCalendar("rerenderEvents");
    }

    static reloadCitasSidebar() {
        CitasAnteriores.citas = [];
        CitasAnteriores.orderCitas(Calendario.citas.data);
        ProximasCitas.citas = [];
        ProximasCitas.orderCitas(Calendario.citas.data);
        ProximosEventos.citas = [];
        ProximosEventos.orderCitas(Calendario.citas.data);
    }


    static clearAlertCalendar() {
        setTimeout(() => {
            Calendario.warning = null;
            Calendario.error = null;
            Calendario.success = null;
            m.redraw();
        }, 1500);
    }

    static validarCorreo(emailField) {
        // Define our regular expression.
        let validEmail = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;

        // Using test we can check if the text match the pattern
        if (!validEmail.test(emailField)) {
            return false;
        } else {
            return true;
        }
    }

    static validarAgendamiento(track) {


        if (track == 'Reagendar' && Cita.data.tipo == 1 && Cita.data.sinDatos == false && document.getElementById('correoCitaUpdate') != undefined && Cita.data.email != document.getElementById('correoCitaUpdate').value) {
            Cita.data.email = document.getElementById('correoCitaUpdate').value;
        }

        if (track == 'Agendar' && Cita.data.tipo == 1 && Cita.data.sinDatos == false && document.getElementById('correoCreaCita') != undefined && Cita.data.email != document.getElementById('correoCreaCita').value) {
            Cita.data.email = document.getElementById('correoCreaCita').value;
        }


        Cita.validarCita();

        Cita.buscarItems = false;
        Cita.buscarPacientes = false;

        let _track = false;
        let _timeInicio = "";
        let _timeFin = "";

        Calendario.citas.data.events.map((_val, _index) => {


            if (_val.tipo == 1 || _val.tipo == 2) {


                if (moment(Cita.data.fin, "DD/MM/YYYY HH:mm").unix() > moment(_val.inicio, "DD/MM/YYYY HH:mm").unix() && moment(_val.fin, "DD/MM/YYYY HH:mm").unix() > moment(Cita.data.fin, "DD/MM/YYYY HH:mm").unix()) {
                    _track = true;
                    _timeInicio = moment(_val.inicio, "DD/MM/YYYY HH:mm").format("dddd, DD-MM-YYYY HH:mm");
                    _timeFin = moment(_val.fin, "DD/MM/YYYY HH:mm").format("dddd, DD-MM-YYYY HH:mm");
                }

                if (moment(Cita.data.inicio, "DD/MM/YYYY HH:mm").unix() < moment(_val.fin, "DD/MM/YYYY HH:mm").unix() && moment(_val.inicio, "DD/MM/YYYY HH:mm").unix() < moment(Cita.data.inicio, "DD/MM/YYYY HH:mm").unix()) {
                    _track = true;
                    _timeInicio = moment(_val.inicio, "DD/MM/YYYY HH:mm").format("dddd, DD-MM-YYYY HH:mm");
                    _timeFin = moment(_val.fin, "DD/MM/YYYY HH:mm").format("dddd, DD-MM-YYYY HH:mm");
                }

                if (moment(Cita.data.inicio, "DD/MM/YYYY HH:mm").unix() == moment(_val.inicio, "DD/MM/YYYY HH:mm").unix() && moment(Cita.data.fin, "DD/MM/YYYY HH:mm").unix() == moment(_val.fin, "DD/MM/YYYY HH:mm").unix()) {
                    _track = true;
                    _timeInicio = moment(_val.inicio, "DD/MM/YYYY HH:mm").format("dddd, DD-MM-YYYY HH:mm");
                    _timeFin = moment(_val.fin, "DD/MM/YYYY HH:mm").format("dddd, DD-MM-YYYY HH:mm");
                }
            }


        });

        if (_track) {
            m.redraw();
            $("#modalCreateEvent").animate({
                scrollTop: 0
            }, "slow");
            $("#modalUpdateEvent").animate({
                scrollTop: 0
            }, "slow");
            Cita.error = "No se puede continuar. Ya existe una cita agendada desde: " + _timeInicio + " hasta: " + _timeFin;
            throw Cita.error;
        }

        if (track == 'Agendar') {
            Cita.agendarCitaHttp(Calendario);
        }

        if (track == 'Reagendar') {
            Cita.reagendarCitaHttp(Calendario);
        }


    }

    oninit(_data) {
        if (_data.attrs.searchPaciente !== undefined) {
            Calendario.searchPaciente = decodeURIComponent(_data.attrs.searchPaciente);
        }

        if (_data.attrs.idCalendar !== undefined) {
            Calendario.idCalendar = decodeURIComponent(_data.attrs.idCalendar);
            FetchCalendario.fetchPerfilAgenda();
        } else {
            FetchCalendario.fetchPerfilAgenda();
        }
    }

    oncreate() {
        document.body.classList.add("app-calendar");
    }


    static page() {
        return [Calendario.vHeader(), Calendario.vMain()];
    }
}

class CalendarioEndo2 extends Calendario {
    constructor() {
        super();
    }
}

export default CalendarioEndo2;