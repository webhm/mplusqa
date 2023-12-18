import m from "mithril";
import App from "../../../models/App";
import HeaderPrivate from "../../layout/headerPrivate";
import Sidebar from "../sidebarUci";
import Loader from "../../utils/loader";
import Errors from "../../utils/errors";
import Table from "../../utils/table";
import { Stopwatch } from "../../utils/stopWatch";
import ApiHTTP from "../../../models/ApiHTTP";
import qrcode from "qrcode";


// Pacientes UCI
class PacientesUCI extends App {
    static pacientes = null;
    static dataPte = null;
    static numeroHistoriaClinica = null;
    static idFiltro = 1;
    static fechaHasta = null;
    static fechaDesde = null;
    constructor(_data) {
        super();
        if (App.isAuthenticated() && App.hasProfile('PERFIL_UCI_METROPLUS')) {
            App.setTitle("Pacientes U.C.I.");
            this.view = PacientesUCI.page;
        }

    }
    oncreate(_data) {
        if (_data.attrs.idFiltro !== undefined) {
            PacientesUCI.idFiltro = _data.attrs.idFiltro;
            if (PacientesUCI.idFiltro == 2) {
                PacientesUCI.fechaHasta = moment().format('DD-MM-YYYY');
                PacientesUCI.fechaDesde = moment().subtract(1, 'd').format('DD-MM-YYYY');
                m.route.set('/uci/pacientes/', {
                    idFiltro: PacientesUCI.idFiltro,
                    fechaDesde: PacientesUCI.fechaDesde,
                    fechaHasta: PacientesUCI.fechaHasta
                })
            }
        }

        PacientesUCI.fetchData().then((_data) => {
            PacientesUCI.pacientes = _data;
        });
    }
    onupdate(_data) {

        // Para vista de idUSR
        if (_data.attrs.numeroHistoriaClinica !== undefined) {
            PacientesUCI.numeroHistoriaClinica = _data.attrs.numeroHistoriaClinica;
            m.redraw();
        } else {
            PacientesUCI.numeroHistoriaClinica = null;
            m.redraw();
        }



    }
    static vHeader() {
        return m(HeaderPrivate, { userName: App.userName });
    }
    static vMain() {
        return [
            m("div.content.content-components",
                m("div.container.mg-l-0.mg-r-0", {
                    style: { "max-width": "100%" }
                }, [
                    m("ol.breadcrumb.df-breadcrumbs", [
                        m("li.breadcrumb-item",
                            m(m.route.Link, { href: "/", }, [
                                "MetroPlus"
                            ]),
                        ),
                        m("li.breadcrumb-item",
                            m(m.route.Link, { href: "/uci", }, [
                                'U.C.I.'
                            ]),
                        ),
                        m("li.breadcrumb-item.active[aria-current='page']",
                            App.title
                        )
                    ]),
                    m("h1.df-title.mg-t-20.mg-b-20",
                        App.title + ":"
                    ),

                    m("div", [

                        (PacientesUCI.pacientes !== null && PacientesUCI.pacientes.status) ? [
                            m(".modal.calendar-modal-event[id='modalViewQR'][role='dialog'][aria-hidden='true']",
                                m(".modal-dialog.modal-dialog-centered.modal-sm[role='document']",
                                    m("div.modal-content", [
                                        m("div.modal-header.bg-primary", [
                                            m("h6.event-title.text-semibold", 'Pasaporte QR:'),
                                            m("nav.nav.nav-modal-event", [
                                                m("a.nav-link[href='#'][data-dismiss='modal']",
                                                    m("i[data-feather='x']")
                                                )
                                            ])
                                        ]),
                                        m("div.modal-body", [
                                            m("div.row.col-12", [
                                                m("label.tx-11.tx-medium.tx-spacing-1.tx-color-03",
                                                    "*Escanee con su teléfono para continuar."
                                                ),
                                                m("p.event-start-date.tx-center", [
                                                    m('canvas.qr.wd-100p')
                                                ])
                                            ]),
                                        ])
                                    ])
                                )
                            ),
                            m("div.table-content.col-12.pd-r-0.pd-l-0", [
                                m("div.d-flex.align-items-center.justify-content-between.mg-t-10", [
                                    m("h5.mg-b-0",
                                        "Todos los Pacientes:",
                                        m("span.badge.bg-litecoin.tx-white.tx-semibold.pd-l-10.pd-r-10.mg-l-5.tx-15", {
                                                oncreate: (el) => {
                                                    if (PacientesUCI.idFiltro == 1) {
                                                        el.dom.innerHTML = 'Admisiones de Hoy';
                                                    }
                                                    if (PacientesUCI.idFiltro == 2) {
                                                        el.dom.innerHTML = 'Admisiones Anteriores';
                                                    }
                                                },

                                            }

                                        )

                                    ),
                                    m("div.d-flex.tx-14", [
                                        m('.', {
                                            class: (PacientesUCI.idFiltro == 1 ? 'd-none' : 'd-flex')
                                        }, [
                                            m("div.link-03", {
                                                    title: "Desde"
                                                },
                                                m(".tx-10.pd-r-0", {
                                                    style: { "padding-top": "10px" }
                                                }, 'Desde:')
                                            ),
                                            m("div.link-03", {
                                                    style: { "cursor": "pointer" },
                                                    title: "Desde"
                                                },

                                                m("input.tx-light.pd-4[type='date'][id='desde']", {
                                                    oncreate: (el) => {
                                                        el.dom.value = (PacientesUCI.idFiltro !== 1 ? moment(moment(PacientesUCI.fechaDesde, 'DD-MM-YYYY')).format('YYYY-MM-DD') : '');
                                                    },
                                                    onchange: (el) => {
                                                        PacientesUCI.fechaDesde = moment(moment(el.target.value, 'YYYY-MM-DD')).format('DD-MM-YYYY');
                                                        m.route.set("/uci/pacientes?idFiltro=" + PacientesUCI.idFiltro + "&fechaDesde=" + PacientesUCI.fechaDesde + "&fechaHasta=" + PacientesUCI.fechaHasta);

                                                    },
                                                    style: {
                                                        "border": "transparent"
                                                    }
                                                })
                                            ),
                                            m("div.link-03", {
                                                    title: "Hasta"
                                                },
                                                m(".tx-10.pd-r-0", {
                                                    style: { "padding-top": "10px" }
                                                }, 'Hasta:')
                                            ),
                                            m("div.link-03", {
                                                    style: { "cursor": "pointer" },
                                                    title: "Hasta"
                                                },
                                                m("input.tx-light.pd-4[type='date'][id='hasta']", {
                                                    oncreate: (el) => {
                                                        el.dom.value = (PacientesUCI.idFiltro !== 1 ? moment(moment(PacientesUCI.fechaHasta, 'DD-MM-YYYY')).format('YYYY-MM-DD') : '');
                                                    },
                                                    onchange: (el) => {
                                                        PacientesUCI.fechaHasta = moment(moment(el.target.value, 'YYYY-MM-DD')).format('DD-MM-YYYY');
                                                        m.route.set("/uci/pacientes?idFiltro=" + PacientesUCI.idFiltro + "&fechaDesde=" + PacientesUCI.fechaDesde + "&fechaHasta=" + PacientesUCI.fechaHasta);
                                                    },
                                                    style: {
                                                        "border": "transparent"
                                                    }
                                                })
                                            )
                                        ]),
                                        m("div", {
                                            class: (PacientesUCI.idFiltro == 1 ? 'd-none' : '')
                                        }, [
                                            m("div.link-03.lh-0.mg-l-6", {
                                                    style: { "cursor": "pointer" },
                                                    title: "Buscar",
                                                    onclick: () => {
                                                        PacientesUCI.reloadData(2);
                                                        PacientesUCI.fetchData().then((_data) => {
                                                            PacientesUCI.pacientes = _data;
                                                        });
                                                    }
                                                },
                                                m("i.fas.fa-search.tx-18.pd-5")
                                            ),
                                        ]),
                                        m("div.dropdown.dropleft", [

                                            m("div.link-03.lh-0.mg-l-5[id='dropdownMenuButton'][data-toggle='dropdown'][aria-haspopup='true'][aria-expanded='false']", {
                                                    style: { "cursor": "pointer" },
                                                    title: "Filtrar"
                                                },
                                                m("i.fas.fa-filter.tx-18.pd-5")
                                            ),
                                            m(".dropdown-menu.tx-13[aria-labelledby='dropdownMenuButton']", [
                                                m("h6.dropdown-header.tx-uppercase.tx-12.tx-bold.tx-inverse",
                                                    "FILTROS:"
                                                ),
                                                m(m.route.Link, {
                                                    class: 'dropdown-item',
                                                    href: "/uci/pacientes/?idFiltro=1",
                                                    onclick: (e) => {
                                                        PacientesUCI.reloadData(1);
                                                        PacientesUCI.fetchData().then((_data) => {
                                                            PacientesUCI.pacientes = _data;
                                                        });
                                                    }
                                                }, [
                                                    "Admisiones de Hoy"
                                                ]),
                                                m(m.route.Link, {
                                                    class: 'dropdown-item',
                                                    href: "/uci/pacientes/",
                                                    params: {
                                                        idFiltro: 2,
                                                        fechaDesde: PacientesUCI.fechaDesde,
                                                        fechaHasta: PacientesUCI.fechaHasta
                                                    },
                                                    oncreate: () => {

                                                        if (PacientesUCI.idFiltro == 1) {
                                                            PacientesUCI.fechaHasta = moment().format('DD-MM-YYYY');
                                                            PacientesUCI.fechaDesde = moment().subtract(1, 'd').format('DD-MM-YYYY');
                                                        }

                                                    },
                                                    onclick: (e) => {
                                                        PacientesUCI.reloadData(2);
                                                        PacientesUCI.fetchData().then((_data) => {
                                                            PacientesUCI.pacientes = _data;
                                                        });
                                                    }
                                                }, [
                                                    "Admisiones Anteriores"
                                                ]),


                                            ])
                                        ])
                                    ])
                                ]),

                            ]),
                            PacientesUCI.vTableUsuarios('table-usr', PacientesUCI.pacientes.data, PacientesUCI.arqTable())
                        ] : (PacientesUCI.pacientes !== null && (!PacientesUCI.pacientes.status || PacientesUCI.pacientes.status == null)) ? [
                            m(Errors, { type: (!PacientesUCI.pacientes.status ? 1 : 0), error: PacientesUCI.pacientes })
                        ] : [
                            m(Loader)
                        ]
                    ]),



                ])
            ),
            m("div.section-nav", {
                class: (PacientesUCI.pacientes !== null ? '' : 'd-none')
            }, [
                m("label.nav-label",
                    PacientesUCI.title + ":"
                ),
                m("div.mg-t-10.bg-white", {

                    },

                    m("div.mg-t-10.bg-white",
                        m("div.card-header.pd-t-20.pd-b-0.bd-b-0", [
                            m("h6.lh-5.mg-b-5",
                                "N° de Resultados:"
                            ),

                        ]),
                        m("div.card-body.pd-0", [
                            m("div.pd-t-10.pd-b-0.pd-x-20.d-flex.align-items-baseline", [
                                m("h2.tx-normal.tx-rubik.mg-b-0.mg-r-5",
                                    (PacientesUCI.pacientes !== null ? PacientesUCI.pacientes.data.length : 0)
                                ),
                                m("div.tx-14", [
                                    m("divv.lh-0.tx-gray-300", 'Resultado(s)')
                                ])
                            ]),

                        ])
                    ),
                    m("div.pd-20", [
                        m(Stopwatch)
                    ])
                ),

            ])
        ];
    }
    static vMainProfile() {
        PacientesUCI.fetchProfile();
        return [
            m("div.content.content-components", {
                    style: { "margin-right": "0px" }
                },
                m("div.container.mg-l-0.mg-r-0", {
                    style: { "max-width": "100%" }
                }, [
                    m("ol.breadcrumb.df-breadcrumbs", [
                        m("li.breadcrumb-item",
                            m(m.route.Link, { href: "/", }, [
                                "MetroPlus"
                            ]),
                        ),
                        m("li.breadcrumb-item",
                            m(m.route.Link, { href: "/uci", }, [
                                'U.C.I.'
                            ]),
                        ),
                        m("li.breadcrumb-item.active[aria-current='page']",
                            PacientesUCI.title
                        )
                    ]),
                    (PacientesUCI.dataPte !== null ? [
                        m('div.table-responsive', [
                            m("table.table.table-bordered.table-sm.tx-14", [
                                m("thead",
                                    m("tr.tx-uppercase", {
                                        style: { "background-color": "#CCCCFF" }
                                    }, [
                                        m("th[scope='col'][colspan='12']",
                                            "BITÁCORA U.C.I. ADULTO:"
                                        ),

                                    ]),
                                    m("tr.tx-uppercase", {
                                        style: { "background-color": "#CCCCFF" }
                                    }, [
                                        m("th[scope='col'][colspan='12']",
                                            "A. DATOS DEL ESTABLECIMIENTO Y USUARIO / PACIENTE: "
                                        ),

                                    ])
                                ),
                                m("tbody", [
                                    m("tr.tx-12", [
                                        m("th.tx-semibold.text-center", {
                                                style: { "background-color": "#CCFFCC" }
                                            },
                                            "INSTITUCIÓN DEL SISTEMA"
                                        ),
                                        m("th.tx-semibold.text-center", {
                                                style: { "background-color": "#CCFFCC" }
                                            },
                                            "UNICÓDIGO"
                                        ),
                                        m("th.tx-semibold.text-center", {
                                                style: { "background-color": "#CCFFCC" }
                                            },
                                            "ESTABLECIMIENTO DE SALUD	"
                                        ),
                                        m("th.tx-semibold.text-center", {
                                                style: { "background-color": "#CCFFCC" }
                                            },
                                            "NÚMERO DE HISTORIA CLÍNICA ÚNICA	"
                                        ),
                                        m("th.tx-semibold.text-center", {
                                                style: { "background-color": "#CCFFCC" }
                                            },
                                            "NÚMERO DE ARCHIVO	"
                                        ),
                                        m("th.tx-semibold.text-center", {
                                                style: { "background-color": "#CCFFCC" }
                                            },
                                            "No. HOJA"
                                        ),


                                    ]),

                                    m("tr.tx-12", [
                                        m("th.text-center", {
                                                style: { "background-color": "#eaeff5" }
                                            },
                                            "Hospital Metropolitano"
                                        ),




                                    ]),
                                ]),

                                m("thead",

                                    m("tr.tx-uppercase", {
                                        style: { "background-color": "#CCCCFF" }
                                    }, [
                                        m("th[scope='col'][colspan='12']",
                                            "B.- ANTROPOMETRÍA:"
                                        ),

                                    ])
                                ),

                                m("tbody", [

                                    m("tr.mg-b-20", [
                                        m("th", {
                                                style: { "background-color": "#CCFFCC" }
                                            },
                                            "TALLA (cm)"
                                        ),
                                        m("td", {
                                                style: { "background-color": "#eaeff5" }
                                            },
                                            PacientesUCI.dataPte.FECHA_ADMISION
                                        ),
                                        m("th", {
                                                style: { "background-color": "#CCFFCC" }
                                            },
                                            "PESO REAL (kg)"
                                        ),
                                        m("td", {
                                                style: { "background-color": "#eaeff5" }

                                            },
                                            PacientesUCI.dataPte.FECHA_ADMISION,
                                        ),
                                        m("th", {
                                                style: { "background-color": "#CCFFCC" }
                                            },
                                            "IMC (m/kg2)"
                                        ),
                                        m("td", {
                                                style: { "background-color": "#eaeff5" }

                                            },
                                            PacientesUCI.dataPte.FECHA_ADMISION,
                                        ),

                                        m("th", {
                                                style: { "background-color": "#CCFFCC" }
                                            },
                                            "PESO IDEAL (kg)	"
                                        ),
                                        m("td", {
                                                style: { "background-color": "#eaeff5" }

                                            },
                                            PacientesUCI.dataPte.FECHA_ADMISION,
                                        ),
                                        m("th", {
                                                style: { "background-color": "#CCFFCC" }
                                            },
                                            "SUPERFICIE CORPORAL (m2)"
                                        ),
                                        m("td", {
                                                style: { "background-color": "#eaeff5" }

                                            },
                                            PacientesUCI.dataPte.FECHA_ADMISION,
                                        ),




                                    ]),

                                    m("tr.d-print-none", [

                                        m("td[colspan='10']",
                                            m(".tab-content.bd.bd-gray-300.bd-t-0[id='myTab']", [
                                                m(".tab-pane.fade[id='home'][role='tabpanel'][aria-labelledby='home-antropometria']", [
                                                    m("div.mg-0", [
                                                        m("span.badge.badge-light.wd-100p.tx-14",
                                                            " B.- ANTROPOMETRÍA ",
                                                        ),
                                                        m("hr.wd-100p.mg-t-5.mg-b-5"),

                                                        m("tr.mg-b-20", [
                                                            m("th[colspan='4']", {
                                                                    style: { "background-color": "#CCFFCC" }
                                                                },
                                                                "TALLA (cm)"
                                                            ),
                                                            m("td[colspan='4']", {
                                                                    style: { "background-color": "#eaeff5" }
                                                                },
                                                                PacientesUCI.dataPte.FECHA_ADMISION
                                                            ),
                                                            m("th[colspan='4']", {
                                                                    style: { "background-color": "#CCFFCC" }
                                                                },
                                                                "PESO REAL (kg)"
                                                            ),
                                                            m("td[colspan='4']", {
                                                                    style: { "background-color": "#eaeff5" }

                                                                },
                                                                PacientesUCI.dataPte.FECHA_ADMISION,
                                                            ),
                                                            m("th[colspan='4']", {
                                                                    style: { "background-color": "#CCFFCC" }
                                                                },
                                                                "IMC (m/kg2)"
                                                            ),
                                                            m("td[colspan='4']", {
                                                                    style: { "background-color": "#eaeff5" }

                                                                },
                                                                PacientesUCI.dataPte.FECHA_ADMISION,
                                                            ),

                                                            m("th[colspan='4']", {
                                                                    style: { "background-color": "#CCFFCC" }
                                                                },
                                                                "PESO IDEAL (kg)	"
                                                            ),
                                                            m("td[colspan='4']", {
                                                                    style: { "background-color": "#eaeff5" }

                                                                },
                                                                PacientesUCI.dataPte.FECHA_ADMISION,
                                                            ),
                                                            m("th[colspan='4']", {
                                                                    style: { "background-color": "#CCFFCC" }
                                                                },
                                                                "SUPERFICIE CORPORAL (m2)"
                                                            ),
                                                            m("td[colspan='4']", {
                                                                    style: { "background-color": "#eaeff5" }

                                                                },
                                                                PacientesUCI.dataPte.FECHA_ADMISION,
                                                            ),




                                                        ]),
                                                        m("hr.wd-100p.mg-t-5.mg-b-20"),

                                                    ]),



                                                ]),
                                                m(".tab-pane.fade[id='muestra'][role='tabpanel'][aria-labelledby='home-muestra']", [

                                                ]),

                                                m(".tab-pane.fade[id='recep'][role='tabpanel'][aria-labelledby='home-recep']", [

                                                ]),
                                                m(".tab-pane.fade[id='comment'][role='tabpanel'][aria-labelledby='home-comment']", [
                                                    m("p.mg-5", [
                                                        m("span.badge.badge-light.wd-100p.tx-14",
                                                            "Observaciones",
                                                        ),
                                                        m("textarea.form-control.mg-t-5[rows='5'][placeholder='Observaciones']", {
                                                            //oninput: function (e) { Observaciones.observaciones = e.target.value; },
                                                            // value: Observaciones.observaciones,
                                                        }),
                                                        m("div.mg-0.mg-t-5.text-right", [

                                                            m("button.btn.btn-xs.btn-primary.mg-l-2.tx-semibold[type='button']", {
                                                                onclick: function() {

                                                                },
                                                            }, [
                                                                m("i.fas.fa-paper-plane.mg-r-5", )
                                                            ], "Guardar"),


                                                        ]),
                                                        m("hr.wd-100p.mg-t-5.mg-b-5"),

                                                    ]),
                                                    m("p.mg-5", [
                                                        m("span.badge.badge-light.wd-100p.tx-14",
                                                            "Historial de Observaciones",
                                                        ),
                                                        m("table.table.table-sm[id='table-observaciones'][width='100%']")
                                                    ]),
                                                ]),

                                            ])
                                        ),


                                    ])


                                ]),

                                m("thead",

                                    m("tr.tx-uppercase", {
                                        style: { "background-color": "#CCCCFF" }
                                    }, [
                                        m("th[scope='col'][colspan='12']",
                                            "D.- VENTILACIÓN MECÁNICA:"
                                        ),

                                    ])
                                ),

                                m('tbody', [
                                    m("tr", [
                                        m("td", { "style": { "min-width": "50px" } },
                                            "No."
                                        ),

                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } },
                                            "HORAS "
                                        ),

                                        m("td", { "style": { "min-width": "50px" } },
                                            "8"
                                        ),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } },
                                            "9"
                                        ),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } },
                                            "10"
                                        ),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } },
                                            "11"
                                        ),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } },
                                            "12"
                                        ),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } },
                                            "13"
                                        ),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } },
                                            "14"
                                        ),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } },
                                            "15"
                                        ),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } },
                                            "16"
                                        ),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } },
                                            "17"
                                        ),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } },
                                            "18"
                                        ),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } },
                                            "19"
                                        ),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } },
                                            "20"
                                        ),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } },
                                            "21"
                                        ),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } },
                                            "22"
                                        ),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } },
                                            "23"
                                        ),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } },
                                            "24"
                                        ),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } },
                                            "1"
                                        ),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } },
                                            "2"
                                        ),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } },
                                            "3"
                                        ),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } },
                                            "4"
                                        ),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } },
                                            "5"
                                        ),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } },
                                            "6"
                                        ),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } },
                                            "7"
                                        ),
                                        m("td", { "style": { "min-width": "50px" } })
                                    ]),
                                    m("tr", [
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } },
                                            "PARÁMETROS"
                                        ),
                                        m("td", { "style": { "min-width": "50px" } }),



                                    ]),
                                    m("tr", [
                                        m("td", { "style": { "min-width": "50px" } },
                                            "1"
                                        ),
                                        m("td", { "style": { "min-width": "50px" } },
                                            "MODO VENTILATORIO"
                                        ),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),


                                    ]),
                                    m("tr", [
                                        m("td", { "style": { "min-width": "50px" } },
                                            "2"
                                        ),

                                        m("td", { "style": { "min-width": "50px" } },
                                            "PRESIÓN PICO"
                                        ),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),



                                    ]),
                                    m("tr", [
                                        m("td", { "style": { "min-width": "50px" } },
                                            "3"
                                        ),

                                        m("td", { "style": { "min-width": "50px" } },
                                            "PRESIÓN MEDIA"
                                        ),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),


                                    ]),
                                    m("tr", [
                                        m("td", { "style": { "min-width": "50px" } },
                                            "2"
                                        ),

                                        m("td", { "style": { "min-width": "50px" } },
                                            "PRESIÓN PICO"
                                        ),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                    ]),
                                    m("tr", [
                                        m("td", { "style": { "min-width": "50px" } },
                                            "4"
                                        ),

                                        m("td", { "style": { "min-width": "50px" } },
                                            "PEEP"
                                        ),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),


                                    ]),
                                    m("tr", [
                                        m("td", { "style": { "min-width": "50px" } },
                                            "2"
                                        ),

                                        m("td", { "style": { "min-width": "50px" } },
                                            "PRESIÓN PICO"
                                        ),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                    ]),
                                    m("tr", [
                                        m("td", { "style": { "min-width": "50px" } },
                                            "5"
                                        ),

                                        m("td", { "style": { "min-width": "50px" } },
                                            "AUTO PEEP"
                                        ),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),


                                    ]),
                                    m("tr", [
                                        m("td", { "style": { "min-width": "50px" } },
                                            "2"
                                        ),

                                        m("td", { "style": { "min-width": "50px" } },
                                            "PRESIÓN PICO"
                                        ),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                    ]),
                                    m("tr", [
                                        m("td", { "style": { "min-width": "50px" } },
                                            "6"
                                        ),

                                        m("td", { "style": { "min-width": "50px" } },
                                            "PRESIÓN SOPORTE"
                                        ),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),


                                    ]),
                                    m("tr", [
                                        m("td", { "style": { "min-width": "50px" } },
                                            "2"
                                        ),

                                        m("td", { "style": { "min-width": "50px" } },
                                            "PRESIÓN PICO"
                                        ),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                    ]),
                                    m("tr", [
                                        m("td", { "style": { "min-width": "50px" } },
                                            "7"
                                        ),

                                        m("td", { "style": { "min-width": "50px" } },
                                            "VOLUMEN TIDAL ESPIRADO MÁQUINA"
                                        ),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),


                                    ]),
                                    m("tr", [
                                        m("td", { "style": { "min-width": "50px" } },
                                            "2"
                                        ),

                                        m("td", { "style": { "min-width": "50px" } },
                                            "PRESIÓN PICO"
                                        ),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                    ]),
                                    m("tr", [
                                        m("td", { "style": { "min-width": "50px" } },
                                            "8"
                                        ),

                                        m("td", { "style": { "min-width": "50px" } },
                                            "VOLUMEN TIDAL ESPIRADO PACIENTE"
                                        ),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),


                                    ]),
                                    m("tr", [
                                        m("td", { "style": { "min-width": "50px" } },
                                            "2"
                                        ),

                                        m("td", { "style": { "min-width": "50px" } },
                                            "PRESIÓN PICO"
                                        ),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                    ]),
                                    m("tr", [
                                        m("td", { "style": { "min-width": "50px" } },
                                            "9"
                                        ),

                                        m("td", { "style": { "min-width": "50px" } },
                                            "VOLUMEN MINUTO ESPIRADO MÁQUINA"
                                        ),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),


                                    ]),
                                    m("tr", [
                                        m("td", { "style": { "min-width": "50px" } },
                                            "2"
                                        ),

                                        m("td", { "style": { "min-width": "50px" } },
                                            "PRESIÓN PICO"
                                        ),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                    ]),
                                    m("tr", [
                                        m("td", { "style": { "min-width": "50px" } },
                                            "10"
                                        ),

                                        m("td", { "style": { "min-width": "50px" } },
                                            "VOLUMEN MINUTO ESPIRADO PACIENTE"
                                        ),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),


                                    ]),
                                    m("tr", [
                                        m("td", { "style": { "min-width": "50px" } },
                                            "2"
                                        ),

                                        m("td", { "style": { "min-width": "50px" } },
                                            "PRESIÓN PICO"
                                        ),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                    ]),
                                    m("tr", [
                                        m("td", { "style": { "min-width": "50px" } },
                                            "11"
                                        ),
                                        m("td", { "style": { "min-width": "50px" } },
                                            "FRECUENCIA RESPIRATORIA MÁQUINA"
                                        ),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),


                                    ]),
                                    m("tr", [
                                        m("td", { "style": { "min-width": "50px" } },
                                            "2"
                                        ),

                                        m("td", { "style": { "min-width": "50px" } },
                                            "PRESIÓN PICO"
                                        ),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                    ]),
                                    m("tr", [
                                        m("td", { "style": { "min-width": "50px" } },
                                            "12"
                                        ),

                                        m("td", { "style": { "min-width": "50px" } },
                                            "FRECUENCIA RESPIRATORIA ESPONTÁNEA"
                                        ),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                    ]),
                                    m("tr", [
                                        m("td", { "style": { "min-width": "50px" } },
                                            "13"
                                        ),

                                        m("td", { "style": { "min-width": "50px" } },
                                            "COMPLIANCE ESTÁTICA"
                                        ),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                    ]),
                                    m("tr", [
                                        m("td", { "style": { "min-width": "50px" } },
                                            "14"
                                        ),

                                        m("td", { "style": { "min-width": "50px" } },
                                            "RESISTENCIA INSPIRATORIA"
                                        ),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                    ]),
                                    m("tr", [
                                        m("td", { "style": { "min-width": "50px" } },
                                            "15"
                                        ),

                                        m("td", { "style": { "min-width": "50px" } },
                                            "FiO2"
                                        ),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                    ]),
                                    m("tr", [
                                        m("td", { "style": { "min-width": "50px" } },
                                            "16"
                                        ),

                                        m("td", { "style": { "min-width": "50px" } },
                                            "ETCO2"
                                        ),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                    ]),
                                    m("tr", [
                                        m("td", { "style": { "min-width": "50px" } },
                                            "17"
                                        ),

                                        m("td", { "style": { "min-width": "50px" } },
                                            "VOLUMEN FUGAS"
                                        ),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                    ]),
                                    m("tr", [
                                        m("td", { "style": { "min-width": "50px" } },
                                            "18"
                                        ),

                                        m("td", { "style": { "min-width": "50px" } },
                                            "NIVEL TUBO OROTRAQUEAL"
                                        ),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                    ]),
                                    m("tr", [
                                        m("td", { "style": { "min-width": "50px" } },
                                            "19"
                                        ),

                                        m("td", { "style": { "min-width": "50px" } },
                                            "PRESIÓN DE BALÓN TUBO OROTRAQUEAL"
                                        ),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                    ]),
                                    m("tr", [
                                        m("td", { "style": { "min-width": "50px" } },
                                            "20"
                                        ),

                                        m("td", { "style": { "min-width": "50px" } },
                                            "RELACIÓN INSPIRACIÓN / ESPIRACIÓN"
                                        ),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                    ]),
                                    m("tr", [
                                        m("td", { "style": { "min-width": "50px" } },
                                            "21"
                                        ),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                    ]),
                                    m("tr", [
                                        m("td", { "style": { "min-width": "50px" } },
                                            "22"
                                        ),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                    ]),
                                    m("tr", [
                                        m("td", { "style": { "min-width": "50px" } },
                                            "23"
                                        ),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                    ]),
                                    m("tr", [
                                        m("td", { "style": { "min-width": "50px" } },
                                            "24"
                                        ),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                        m("td", { "style": { "min-width": "50px" } }),
                                    ])

                                ])

                            ])
                        ])
                    ] : [
                        m(Loader)
                    ])
                ])
            ),
        ];
    }
    static vMenu() {
        return m(Sidebar, { page: 'uci/pacientes' });
    }
    static reloadData(idFiltro) {
        PacientesUCI.pacientes = null;
        PacientesUCI.idFiltro = idFiltro;
    }
    static fetchProfile() {


        if (PacientesUCI.pacientes !== null && PacientesUCI.pacientes.status) {
            return PacientesUCI.pacientes.data.map(function(_val, _i, _contentData) {
                if (PacientesUCI.numeroHistoriaClinica == _val.HC) {
                    PacientesUCI.dataPte = _val;
                }
            })
        }


    }
    static fetchData() {

        let _queryString = '?idFiltro=' + PacientesUCI.idFiltro;

        if (PacientesUCI.idFiltro == 2 && PacientesUCI.fechaDesde !== null) {
            _queryString += '&fechaDesde=' + PacientesUCI.fechaDesde + '&fechaHasta=' + PacientesUCI.fechaHasta;
        }

        return m.request({
                method: "GET",
                url: ApiHTTP.apiUrl + "/v2/pasaportes/generados" + _queryString,
                headers: {
                    "Content-Type": "application/json; charset=utf-8",
                },
            })
            .then(function(result) {
                return result;
            })
            .catch(function(e) {
                return {
                    'status': null,
                    'message': e
                };
            });

    }
    static arqTable() {
        return {
            data: null,
            dom: 'ltp',
            language: {
                searchPlaceholder: "Buscar...",
                sSearch: "",
                lengthMenu: "Mostrar _MENU_ registros por página",
                sProcessing: "Procesando...",
                sZeroRecords: "Todavía no tienes resultados disponibles.",
                sEmptyTable: "Ningún dato disponible en esta tabla",
                sInfo: "Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros",
                sInfoEmpty: "Mostrando registros del 0 al 0 de un total de 0 registros",
                sInfoFiltered: "(filtrado de un total de _MAX_ registros)",
                sInfoPostFix: "",
                sUrl: "",
                sInfoThousands: ",",
                sLoadingRecords: "Cargando...",
                oPaginate: {
                    sFirst: "Primero",
                    sLast: "Último",
                    sNext: "Siguiente",
                    sPrevious: "Anterior",
                },
                oAria: {
                    sSortAscending: ": Activar para ordenar la columna de manera ascendente",
                    sSortDescending: ": Activar para ordenar la columna de manera descendente",
                },
            },
            cache: false,
            destroy: true,
            columns: [{
                    title: "N° : ",
                },
                {
                    title: "NHC:",
                },
                {
                    title: "Fecha de Admisión:",
                },
                {
                    title: "Paciente:",
                },

                {
                    title: "Especialidad:",
                },

                {
                    title: "Opciones:",
                }
            ],
            aoColumnDefs: [{
                    mRender: function(data, type, row, meta) {
                        return meta.row + meta.settings._iDisplayStart + 1;
                    },
                    visible: true,
                    aTargets: [0],
                    orderable: false,
                },
                {
                    mRender: function(data, type, full) {
                        return full.HC;
                    },
                    visible: true,
                    aTargets: [1],
                    orderable: true,

                },
                {
                    mRender: function(data, type, full) {
                        return full.FECHA_ADMISION;
                    },
                    visible: true,
                    aTargets: [2],
                    orderable: true,

                },
                {
                    mRender: function(data, type, full) {
                        return full.NOMBRE;

                    },
                    visible: true,
                    aTargets: [3],
                    orderable: true,
                    width: '40%'
                }, {
                    mRender: function(data, type, full) {
                        return full.ESPECIALIDAD;

                    },
                    visible: true,
                    aTargets: [4],
                    orderable: true,


                },
                {
                    mRender: function(data, type, full) {
                        return ''

                    },
                    visible: true,
                    aTargets: [5],
                    orderable: true,

                }


            ],
            fnRowCallback: function(nRow, aData, iDisplayIndex, iDisplayIndexFull) {

                m.mount(nRow, {
                    view: () => {
                        return [
                            m("td", [
                                (iDisplayIndexFull + 1)
                            ]),
                            m("td", [
                                aData.HC
                            ]),

                            m("td", [
                                aData.FECHA_ADMISION
                            ]),
                            m("td", [
                                aData.NOMBRE
                            ]),
                            m("td", [
                                aData.ESPECIALIDAD,

                            ]),


                            m("td", [

                                m('button.btn.btn-block.btn-secondary.tx-12', {
                                    style: { "background-color": "#185b98" },
                                    onclick: () => {

                                        m.route.set('/uci/pacientes/', {
                                            numeroHistoriaClinica: aData.HC
                                        })

                                    }

                                }, [
                                    " Ver Paciente "
                                ]),
                            ])






                        ];
                    },
                });



            },
        };
    }
    static vTableUsuarios(idTable, dataTable, arqTable) {
        return [
            m(Table, { idTable: idTable, dataTable: dataTable, arqTable: arqTable })
        ]
    }
    static page() {
        return [
            PacientesUCI.vHeader(),
            PacientesUCI.vMenu(),
            (PacientesUCI.numeroHistoriaClinica == null ? [
                PacientesUCI.vMain()
            ] : [
                PacientesUCI.vMainProfile()
            ])
        ];
    }
}


export default PacientesUCI;