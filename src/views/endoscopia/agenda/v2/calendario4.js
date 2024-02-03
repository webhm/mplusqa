import m from "mithril";
import App from "../../../../models/App";
import FetchCalendario from "./fetchCalendario";
import Loader from "../../../utils/loader";
import HeaderCalendar from "../../../layout/headerCalendar";
import TableCalendarios from "./tableCalendarios";
import RouteCal from "./routeCal";
import { SelectMedicos, ProximasCitas, CitasAnteriores } from "./widgets";

class Calendario extends App {

    static loader = false;
    static error = null;
    static warning = null;
    static idCalendar = null;
    static idFilter = null;
    static idSala = null;
    static idMedico = null;
    static calendarios = [];
    static citas = [];

    constructor() {
        super();
        if (App.isAuthenticated() && App.hasProfile("PERFIL_AG_GEST_ENDOSCOPIA")) {
            App.setTitle("Agenda Centralizada Endoscopía");
            this.view = Calendario.page;
        }
    }

    oninit(_data) {

        if (_data.attrs.idCalendar !== undefined) {
            Calendario.idFilter = decodeURIComponent(_data.attrs.idCalendar);
            RouteCal.setRoute(Calendario.idFilter, 'idCalendar');
            Calendario.fetchPerfil();
        } else {
            Calendario.fetchPerfil();
        }

    }



    oncreate() {
        document.body.classList.add("app-calendar");
    }

    static vHeader() {
        return m(HeaderCalendar, { userName: App.userName });
    }

    static setFilterRouteMedicos(medicos) {

        let resSalas = [];
        let res = [];

        if (Calendario.idFilter == null) {
            Calendario.idFilter = medicos[0];
            RouteCal.setRoute(Calendario.idFilter, 'idCalendar');
        } else {
            if (Calendario.idFilter.indexOf(',') > 0) {
                let _agendas = Calendario.idFilter.split(',');
                Calendario.calendarios.map((_v) => {
                    if (_v.TIPO == 1 && _agendas.includes(_v.IDCALENDAR)) {
                        resSalas.push(_v.IDCALENDAR);
                    }
                });

                res = resSalas.concat(medicos);
                console.log(3, res)
                Calendario.idFilter = res.join(',');
                RouteCal.setRoute(Calendario.idFilter, 'idCalendar');
            } else {
                Calendario.calendarios.map((_v) => {
                    if (_v.TIPO == 1 && Calendario.idFilter == _v.IDCALENDAR) {
                        resSalas.push(_v.IDCALENDAR);
                    }
                });
                res = resSalas.concat(medicos);
                console.log(4, res)
                Calendario.idFilter = res.join(',');
                RouteCal.setRoute(Calendario.idFilter, 'idCalendar');
            }
        }


        setTimeout(() => {
            Calendario.fetchCitas();
            Calendario.reloadAllCalendars();
        }, 100);




    }

    static setFilterRouteSalas(salas) {

        let resMedicos = [];
        let res = [];

        if (Calendario.idFilter == null) {
            Calendario.idFilter = salas[0];
            RouteCal.setRoute(Calendario.idFilter, 'idCalendar');
        } else {
            if (Calendario.idFilter.indexOf(',') > 0) {
                let _agendas = Calendario.idFilter.split(',');
                Calendario.calendarios.map((_v) => {
                    if (_v.TIPO == 2 && _agendas.includes(_v.IDCALENDAR)) {
                        resMedicos.push(_v.IDCALENDAR);
                    }
                });

                res = resMedicos.concat(salas);
                console.log(3, res)
                Calendario.idFilter = res.join(',');
                RouteCal.setRoute(Calendario.idFilter, 'idCalendar');
            } else {
                Calendario.calendarios.map((_v) => {
                    if (_v.TIPO == 2 && Calendario.idFilter == _v.IDCALENDAR) {
                        resMedicos.push(_v.IDCALENDAR);
                    }
                });
                res = resMedicos.concat(salas);
                console.log(4, res)
                Calendario.idFilter = res.join(',');
                RouteCal.setRoute(Calendario.idFilter, 'idCalendar');
            }

        }

        setTimeout(() => {
            Calendario.fetchCitas();
            Calendario.reloadAllCalendars();
        }, 100);



    }

    static setSidebar() {

        $("#calendarInline").datepicker({
            showOtherMonths: true,
            selectOtherMonths: true,
            dateFormat: "yy-mm-dd",
            onSelect: function(dateText, inst) {
                TableCalendarios.calendarios.map((_v, _i) => {
                    $("#calendar" + _v.id).fullCalendar("gotoDate", dateText);
                });

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

        new PerfectScrollbar('#calendarSidebarBody', { suppressScrollX: true })

    }

    static filterCitas(idCalendar) {

        let resMedicos = [];
        let resSalas = [];
        let res = [];
        let indice = Calendario.idFilter.indexOf(',');

        if (indice >= 0) {
            let _agendas = Calendario.idFilter.split(',');
            Calendario.calendarios.map((_v) => {
                if (_v.TIPO == 2 && _agendas.includes(_v.IDCALENDAR)) {
                    resMedicos.push(_v.IDCALENDAR);
                }
                if (_v.TIPO == 1 && _agendas.includes(_v.IDCALENDAR)) {
                    resSalas.push(_v.IDCALENDAR);
                }
            });
        } else {
            Calendario.calendarios.map((_v) => {
                if (_v.TIPO == 2 && Calendario.idFilter == _v.IDCALENDAR) {
                    resMedicos.push(_v.IDCALENDAR);
                }
                if (_v.TIPO == 1 && Calendario.idFilter == _v.IDCALENDAR) {
                    resSalas.push(_v.IDCALENDAR);
                }
            });
        }

        if (resMedicos.length !== 0 && resSalas.length !== 0) {

            TableCalendarios.citas.events.map((_v) => {
                if (_v.idCalendar.indexOf(idCalendar) >= 0) {
                    resMedicos.map((_a) => {
                        if (_v.idCalendar.indexOf(_a) >= 0) {
                            res.push(_v);
                        } else {
                            _v.backgroundColor = '#e5e9f2';
                            _v.borderColor = '#cdd5e6';
                            res.push(_v);
                        }
                    });
                }
            });

        } else {
            TableCalendarios.citas.events.map((_v) => {
                if (_v.idCalendar.indexOf(idCalendar) >= 0) {
                    res.push(_v);
                }
            });
        }

        return res;
    }


    static reloadAllCalendars() {

        TableCalendarios.calendarios.map((_v) => {
            $('[data-toggle="tooltip"]').tooltip("hide");
            $("#calendar" + _v.id).fullCalendar("removeEvents");
            $("#calendar" + _v.id).fullCalendar("addEventSource", Calendario.filterCitas(_v.idFilter));
            $("#calendar" + _v.id).fullCalendar("rerenderEvents");
        });

    }


    static reloadCalendar(id, idFilter) {
        $('[data-toggle="tooltip"]').tooltip("hide");
        $("#calendar" + id).fullCalendar("removeEvents");
        $("#calendar" + id).fullCalendar("addEventSource", Calendario.filterCitas(idFilter));
        $("#calendar" + id).fullCalendar("rerenderEvents");

    }


    static vMain() {
        return [
            m("div.calendar-wrapper", [
                m("div.calendar-sidebar", [
                    m("div.calendar-sidebar-header", [
                        m("i[data-feather='search']"), m("div.search-form", [
                            m("input.form-control[type='search'][placeholder='Buscar por NHC o Apellidos y Nombres'][title='Buscar por NHC o Apellidos y Nombres']", {

                            }),
                        ]),
                        m("a.btn btn-sm btn-primary btn-icon calendar-add", {
                            onclick: (e) => {
                                e.preventDefault();
                            }
                        }, [
                            m("div[data-toggle='tooltip']", [m("i.tx-white[data-feather='plus']"), ]),
                        ]),
                    ]),
                    m("div.calendar-sidebar-body.ht-auto.pos-relative[id='calendarSidebarBody']", [
                        m("div.calendar-inline", m("div[id='calendarInline']")),
                        m("div.pd-t-0.pd-l-20.pd-r-20", [
                            m("label.tx-uppercase.tx-sans.tx-10.tx-medium.tx-spacing-1.tx-color-03", [
                                "Status Calendario: ",
                            ]),

                        ]),
                        m("div.pd-t-0.pd-l-20.pd-r-20", [
                            m("button.btn.btn-block.btn-light.mg-b-10[type='button']", {
                                    onclick: () => {
                                        TableCalendarios.agregarNuevoCal();
                                    }
                                },
                                m("i.fas.fa-plus.tx-12"),
                                " Agregar Salas"
                            ),

                        ]),

                        m("div.pd-t-0.pd-l-20.pd-r-20", [
                            m("label.tx-uppercase.tx-sans.tx-10.tx-medium.tx-spacing-1.tx-color-03", [
                                "Médicos: ",
                            ]),
                            m("div.schedule-group",
                                (Calendario.calendarios.length !== 0 ? [
                                    m(SelectMedicos, {
                                        idFilter: Calendario.idFilter,
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
                                (Calendario.citas.length !== 0 && Calendario.citas.status ? [
                                    m(ProximasCitas, {
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

                            ),
                        ]),
                        m("div.pd-t-5.pd-l-20.pd-r-20", [
                            m("label.tx-uppercase.tx-sans.tx-10.tx-medium.tx-spacing-1.tx-color-03.mg-b-15", "Citas Anteriores:"),
                            m("div.schedule-group.mg-b-5",
                                (Calendario.citas.length !== 0 && Calendario.citas.status ? [
                                    m(CitasAnteriores, {
                                        citas: Calendario.citas.data,
                                    })
                                ] : [
                                    m(Loader)
                                ])
                            ),
                        ])

                    ]),
                ]),

                m("div.calendar-content", [
                    (Calendario.error !== null ? [
                        m("div.pd-20.mg-b-0", [
                            m(".alert.alert-danger.fade.show.mg-b-0[role='alert']", [
                                m("strong", m("i.fas.fa-exclamation-triangle.mg-r-2"), "Error: "),
                                Calendario.error.message,
                                m("button.close[type='button'][aria-label='Close']", {
                                    onclick: () => {
                                        Calendario.error = null;
                                    }
                                }, m("span[aria-hidden='true']", "×")),
                            ]),
                        ])
                    ] : []),
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
                    (Calendario.loader ? [
                        m('div.pd-20', [
                            m(Loader)
                        ])
                    ] : [
                        m(TableCalendarios, {
                            idFilter: Calendario.idFilter,
                            calendarios: Calendario.calendarios,
                            citas: Calendario.citas.data
                        })
                    ])

                ]),
            ])
        ];
    }


    static fetchPerfil() {
        FetchCalendario.fetchPerfilAgenda(Calendario);
    }

    static fetchCitas() {
        FetchCalendario.fetchCitas(Calendario);
    }

    static setLoader() {
        Calendario.loader = !Calendario.loader;
    }

    static page() {
        return [
            Calendario.vHeader(),
            Calendario.vMain()
        ];
    }

}

class CalendarioEndo4 extends Calendario {
    constructor() {
        super();
    }
}

export default CalendarioEndo4;