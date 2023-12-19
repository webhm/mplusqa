import m from "mithril";
import App from "../../../models/App";
import HeaderPrivate from "../../layout/headerPrivate";
import Sidebar from "../sidebarUci";
import Loader from "../../utils/loader";
import Errors from "../../utils/errors";
import TableUCI from "../../utils/tableUci";
import { Stopwatch } from "../../utils/stopWatch";
import ApiHTTP from "../../../models/ApiHTTP";
import TurnosUci from "./turnosUci";


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
    oncreate(_data) {}

    static vHeader() {
        return m(HeaderPrivate, { userName: App.userName });
    }

    static vMainProfile() {
        return [
            m("div.content.content-components", {
                    style: { "margin-right": "0px", "margin-left": "0px" }
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
                                    "Registro de Turnos:"
                                ),

                            ])
                        ),
                        m('tbody', [

                            m("tr.text-right", [
                                m("td[colspan='6']", ),
                                m("td[colspan='6']",
                                    m("button.btn.btn-xs.btn-primary[type='button']", {
                                        onclick: () => {
                                            TurnosUci.iniciarTurno();
                                            PacientesUCI.vReloadTable('table-turnos', TurnosUci.getTurnos());
                                        }
                                    }, "Registar Turno")
                                ),

                            ]),

                            m("tr", [
                                m("td[colspan='12']", [
                                    PacientesUCI.vTableTurnos('table-turnos', TurnosUci.getTurnos(), PacientesUCI.arqTableTurnos())
                                ])
                            ])

                        ]),


                        m("thead",

                            m("tr.tx-uppercase", {
                                style: { "background-color": "#CCCCFF" },
                                class: (TurnosUci.nuevoTurno !== null && TurnosUci.nuevoTurno.gestion == 1 ? '' : 'd-none')
                            }, [
                                m("th.tx-semibold[scope='col'][colspan='12']",
                                    "CUIDADOS GENERALES: "
                                ),

                            ])
                        ),

                        m("tbody.d-none", [
                            m("tr.tx-uppercase", {
                                style: { "background-color": "#eaeff5" }
                            }, [
                                m("th[scope='col'][colspan='3']",
                                    "CUIDADOS: "
                                ),
                                m("th[scope='col'][colspan='3']",
                                    "FRECUENCIA: "
                                ),
                                m("th[scope='col'][colspan='2']",
                                    "AM: "
                                ),
                                m("th[scope='col'][colspan='2']",
                                    "PM: "
                                ),
                                m("th[scope='col'][colspan='2']",
                                    "HS: "
                                ),

                            ]),
                            m("tr", [

                                m("td.tx-14.tx-normal[colspan='3']",
                                    m("label.tx-semibold",
                                        "POSICION: "
                                    )
                                ),
                                m("td.tx-14.tx-normal[colspan='3']",
                                    m("input", {
                                        class: "form-control tx-semibold tx-14",
                                        type: "text",
                                        placeholder: "..."


                                    })
                                ),
                                m("td.tx-14.tx-normal[colspan='2']",
                                    m('select.tx-semibold', {
                                        onchange: (e) => {},
                                        class: "custom-select"
                                    }, m('option', 'Seleccione...'), ['SI', 'NO', 'NO APLICA'].map(x =>
                                        m('option', x)
                                    ))
                                ),
                                m("td.tx-14.tx-normal[colspan='2']",
                                    m('select.tx-semibold', {
                                        onchange: (e) => {},
                                        class: "custom-select"
                                    }, m('option', 'Seleccione...'), ['SI', 'NO', 'NO APLICA'].map(x =>
                                        m('option', x)
                                    ))
                                ),
                                m("td.tx-14.tx-normal[colspan='2']",
                                    m('select.tx-semibold', {
                                        onchange: (e) => {},
                                        class: "custom-select"
                                    }, m('option', 'Seleccione...'), ['SI', 'NO', 'NO APLICA'].map(x =>
                                        m('option', x)
                                    ))
                                ),


                            ]),
                            m("tr", [

                                m("td.tx-14.tx-normal[colspan='3']",
                                    m("label.tx-semibold",
                                        "AISLAMIENTO"
                                    )
                                ),
                                m("td.tx-14.tx-normal[colspan='3']",
                                    m('select.tx-semibold', {
                                        onchange: (e) => {},
                                        class: "custom-select"
                                    }, m('option', 'Seleccione...'), ['AISLAMIENTO DE CONTANTO', 'AISLAMIENTO POR GOTITAS', 'AISLAMIENTO RESPIRATORIO', 'AISLAMIENTO PROTECTOR', 'NINGUNO'].map(x =>
                                        m('option', x)
                                    ))
                                ),
                                m("td.tx-14.tx-normal[colspan='2']",
                                    m('select.tx-semibold', {
                                        onchange: (e) => {},
                                        class: "custom-select"
                                    }, m('option', 'Seleccione...'), ['SI', 'NO', 'NO APLICA'].map(x =>
                                        m('option', x)
                                    ))
                                ),
                                m("td.tx-14.tx-normal[colspan='2']",
                                    m('select.tx-semibold', {
                                        onchange: (e) => {},
                                        class: "custom-select"
                                    }, m('option', 'Seleccione...'), ['SI', 'NO', 'NO APLICA'].map(x =>
                                        m('option', x)
                                    ))
                                ),
                                m("td.tx-14.tx-normal[colspan='2']",
                                    m('select.tx-semibold', {
                                        onchange: (e) => {},
                                        class: "custom-select"
                                    }, m('option', 'Seleccione...'), ['SI', 'NO', 'NO APLICA'].map(x =>
                                        m('option', x)
                                    ))
                                ),

                            ]),
                            m("tr", [

                                m("td.tx-14.tx-normal[colspan='3']",
                                    m("label.tx-semibold",
                                        "CAMBIOS DE POSICIÓN"
                                    )
                                ),
                                m("td.tx-14.tx-normal[colspan='3']",
                                    m("input", {
                                        class: "form-control tx-semibold tx-14",
                                        type: "text",
                                        placeholder: "..."


                                    })
                                ),
                                m("td.tx-14.tx-normal[colspan='2']",
                                    m('select.tx-semibold', {
                                        onchange: (e) => {},
                                        class: "custom-select"
                                    }, m('option', 'Seleccione...'), ['SI', 'NO', 'NO APLICA'].map(x =>
                                        m('option', x)
                                    ))
                                ),
                                m("td.tx-14.tx-normal[colspan='2']",
                                    m('select.tx-semibold', {
                                        onchange: (e) => {},
                                        class: "custom-select"
                                    }, m('option', 'Seleccione...'), ['SI', 'NO', 'NO APLICA'].map(x =>
                                        m('option', x)
                                    ))
                                ),
                                m("td.tx-14.tx-normal[colspan='2']",
                                    m('select.tx-semibold', {
                                        onchange: (e) => {},
                                        class: "custom-select"
                                    }, m('option', 'Seleccione...'), ['SI', 'NO', 'NO APLICA'].map(x =>
                                        m('option', x)
                                    ))
                                ),

                            ]),
                            m("tr", [

                                m("td.tx-14.tx-normal[colspan='3']",
                                    m("label.tx-semibold",
                                        "CUIDADOS DE PIEL"
                                    )
                                ),
                                m("td.tx-14.tx-normal[colspan='3']",
                                    m("input", {
                                        class: "form-control tx-semibold tx-14",
                                        type: "text",
                                        placeholder: "..."


                                    })
                                ),
                                m("td.tx-14.tx-normal[colspan='2']",
                                    m('select.tx-semibold', {
                                        onchange: (e) => {},
                                        class: "custom-select"
                                    }, m('option', 'Seleccione...'), ['SI', 'NO', 'NO APLICA'].map(x =>
                                        m('option', x)
                                    ))
                                ),
                                m("td.tx-14.tx-normal[colspan='2']",
                                    m('select.tx-semibold', {
                                        onchange: (e) => {},
                                        class: "custom-select"
                                    }, m('option', 'Seleccione...'), ['SI', 'NO', 'NO APLICA'].map(x =>
                                        m('option', x)
                                    ))
                                ),
                                m("td.tx-14.tx-normal[colspan='2']",
                                    m('select.tx-semibold', {
                                        onchange: (e) => {},
                                        class: "custom-select"
                                    }, m('option', 'Seleccione...'), ['SI', 'NO', 'NO APLICA'].map(x =>
                                        m('option', x)
                                    ))
                                ),

                            ]),
                            m("tr", [

                                m("td.tx-14.tx-normal[colspan='3']",
                                    m("label.tx-semibold",
                                        "HIGIENE ORAL"
                                    )
                                ),
                                m("td.tx-14.tx-normal[colspan='3']",
                                    m("input", {
                                        class: "form-control tx-semibold tx-14",
                                        type: "text",
                                        placeholder: "..."


                                    })
                                ),
                                m("td.tx-14.tx-normal[colspan='2']",
                                    m('select.tx-semibold', {
                                        onchange: (e) => {},
                                        class: "custom-select"
                                    }, m('option', 'Seleccione...'), ['SI', 'NO', 'NO APLICA'].map(x =>
                                        m('option', x)
                                    ))
                                ),
                                m("td.tx-14.tx-normal[colspan='2']",
                                    m('select.tx-semibold', {
                                        onchange: (e) => {},
                                        class: "custom-select"
                                    }, m('option', 'Seleccione...'), ['SI', 'NO', 'NO APLICA'].map(x =>
                                        m('option', x)
                                    ))
                                ),
                                m("td.tx-14.tx-normal[colspan='2']",
                                    m('select.tx-semibold', {
                                        onchange: (e) => {},
                                        class: "custom-select"
                                    }, m('option', 'Seleccione...'), ['SI', 'NO', 'NO APLICA'].map(x =>
                                        m('option', x)
                                    ))
                                ),

                            ]),
                            m("tr", [

                                m("td.tx-14.tx-normal[colspan='3']",
                                    m("label.tx-semibold",
                                        "TERAPIA RESPIRATORIA"
                                    )
                                ),
                                m("td.tx-14.tx-normal[colspan='3']",
                                    m("input", {
                                        class: "form-control tx-semibold tx-14",
                                        type: "text",
                                        placeholder: "..."


                                    })
                                ),
                                m("td.tx-14.tx-normal[colspan='2']",
                                    m('select.tx-semibold', {
                                        onchange: (e) => {},
                                        class: "custom-select"
                                    }, m('option', 'Seleccione...'), ['SI', 'NO', 'NO APLICA'].map(x =>
                                        m('option', x)
                                    ))
                                ),
                                m("td.tx-14.tx-normal[colspan='2']",
                                    m('select.tx-semibold', {
                                        onchange: (e) => {},
                                        class: "custom-select"
                                    }, m('option', 'Seleccione...'), ['SI', 'NO', 'NO APLICA'].map(x =>
                                        m('option', x)
                                    ))
                                ),
                                m("td.tx-14.tx-normal[colspan='2']",
                                    m('select.tx-semibold', {
                                        onchange: (e) => {},
                                        class: "custom-select"
                                    }, m('option', 'Seleccione...'), ['SI', 'NO', 'NO APLICA'].map(x =>
                                        m('option', x)
                                    ))
                                ),


                            ]),
                            m("tr", [

                                m("td.tx-14.tx-normal[colspan='3']",
                                    m("label.tx-semibold",
                                        "ASPIRACIÓN DE SECRECIONES "
                                    )
                                ),
                                m("td.tx-14.tx-normal[colspan='3']",
                                    m("input", {
                                        class: "form-control tx-semibold tx-14",
                                        type: "text",
                                        placeholder: "..."


                                    })
                                ),
                                m("td.tx-14.tx-normal[colspan='2']",
                                    m('select.tx-semibold', {
                                        onchange: (e) => {},
                                        class: "custom-select"
                                    }, m('option', 'Seleccione...'), ['SI', 'NO', 'NO APLICA'].map(x =>
                                        m('option', x)
                                    ))
                                ),
                                m("td.tx-14.tx-normal[colspan='2']",
                                    m('select.tx-semibold', {
                                        onchange: (e) => {},
                                        class: "custom-select"
                                    }, m('option', 'Seleccione...'), ['SI', 'NO', 'NO APLICA'].map(x =>
                                        m('option', x)
                                    ))
                                ),
                                m("td.tx-14.tx-normal[colspan='2']",
                                    m('select.tx-semibold', {
                                        onchange: (e) => {},
                                        class: "custom-select"
                                    }, m('option', 'Seleccione...'), ['SI', 'NO', 'NO APLICA'].map(x =>
                                        m('option', x)
                                    ))
                                ),


                            ]),
                            m("tr", [

                                m("td.tx-14.tx-normal[colspan='3']",
                                    m("label.tx-semibold",
                                        "CONTROL DE TEMPERATURA POR MEDIOS FÍSICOS"
                                    )
                                ),
                                m("td.tx-14.tx-normal[colspan='3']",
                                    m("input", {
                                        class: "form-control tx-semibold tx-14",
                                        type: "text",
                                        placeholder: "..."


                                    })
                                ),
                                m("td.tx-14.tx-normal[colspan='2']",
                                    m('select.tx-semibold', {
                                        onchange: (e) => {},
                                        class: "custom-select"
                                    }, m('option', 'Seleccione...'), ['SI', 'NO', 'NO APLICA'].map(x =>
                                        m('option', x)
                                    ))
                                ),
                                m("td.tx-14.tx-normal[colspan='2']",
                                    m('select.tx-semibold', {
                                        onchange: (e) => {},
                                        class: "custom-select"
                                    }, m('option', 'Seleccione...'), ['SI', 'NO', 'NO APLICA'].map(x =>
                                        m('option', x)
                                    ))
                                ),
                                m("td.tx-14.tx-normal[colspan='2']",
                                    m('select.tx-semibold', {
                                        onchange: (e) => {},
                                        class: "custom-select"
                                    }, m('option', 'Seleccione...'), ['SI', 'NO', 'NO APLICA'].map(x =>
                                        m('option', x)
                                    ))
                                ),


                            ]),
                            m("tr", [

                                m("td.tx-14.tx-normal[colspan='3']",
                                    m("label.tx-semibold",
                                        "CONTROL DE MARCAPASOS"
                                    )
                                ),
                                m("td.tx-14.tx-normal[colspan='3']",
                                    m("input", {
                                        class: "form-control tx-semibold tx-14",
                                        type: "text",
                                        placeholder: "..."


                                    })
                                ),
                                m("td.tx-14.tx-normal[colspan='2']",
                                    m('select.tx-semibold', {
                                        onchange: (e) => {},
                                        class: "custom-select"
                                    }, m('option', 'Seleccione...'), ['SI', 'NO', 'NO APLICA'].map(x =>
                                        m('option', x)
                                    ))
                                ),
                                m("td.tx-14.tx-normal[colspan='2']",
                                    m('select.tx-semibold', {
                                        onchange: (e) => {},
                                        class: "custom-select"
                                    }, m('option', 'Seleccione...'), ['SI', 'NO', 'NO APLICA'].map(x =>
                                        m('option', x)
                                    ))
                                ),
                                m("td.tx-14.tx-normal[colspan='2']",
                                    m('select.tx-semibold', {
                                        onchange: (e) => {},
                                        class: "custom-select"
                                    }, m('option', 'Seleccione...'), ['SI', 'NO', 'NO APLICA'].map(x =>
                                        m('option', x)
                                    ))
                                ),


                            ]),
                            m("tr", [

                                m("td.tx-14.tx-normal[colspan='3']",
                                    m("label.tx-semibold",
                                        "CONTROL DE DRENAJES"
                                    )
                                ),
                                m("td.tx-14.tx-normal[colspan='3']",
                                    m("input", {
                                        class: "form-control tx-semibold tx-14",
                                        type: "text",
                                        placeholder: "..."


                                    })
                                ),
                                m("td.tx-14.tx-normal[colspan='2']",
                                    m('select.tx-semibold', {
                                        onchange: (e) => {},
                                        class: "custom-select"
                                    }, m('option', 'Seleccione...'), ['SI', 'NO', 'NO APLICA'].map(x =>
                                        m('option', x)
                                    ))
                                ),
                                m("td.tx-14.tx-normal[colspan='2']",
                                    m('select.tx-semibold', {
                                        onchange: (e) => {},
                                        class: "custom-select"
                                    }, m('option', 'Seleccione...'), ['SI', 'NO', 'NO APLICA'].map(x =>
                                        m('option', x)
                                    ))
                                ),
                                m("td.tx-14.tx-normal[colspan='2']",
                                    m('select.tx-semibold', {
                                        onchange: (e) => {},
                                        class: "custom-select"
                                    }, m('option', 'Seleccione...'), ['SI', 'NO', 'NO APLICA'].map(x =>
                                        m('option', x)
                                    ))
                                ),


                            ]),
                            m("tr", [

                                m("td.tx-14.tx-normal[colspan='3']",
                                    m("label.tx-semibold",
                                        "CONTROL DE SANGRADO "
                                    )
                                ),
                                m("td.tx-14.tx-normal[colspan='3']",
                                    m("input", {
                                        class: "form-control tx-semibold tx-14",
                                        type: "text",
                                        placeholder: "..."


                                    })
                                ),
                                m("td.tx-14.tx-normal[colspan='2']",
                                    m('select.tx-semibold', {
                                        onchange: (e) => {},
                                        class: "custom-select"
                                    }, m('option', 'Seleccione...'), ['SI', 'NO', 'NO APLICA'].map(x =>
                                        m('option', x)
                                    ))
                                ),
                                m("td.tx-14.tx-normal[colspan='2']",
                                    m('select.tx-semibold', {
                                        onchange: (e) => {},
                                        class: "custom-select"
                                    }, m('option', 'Seleccione...'), ['SI', 'NO', 'NO APLICA'].map(x =>
                                        m('option', x)
                                    ))
                                ),
                                m("td.tx-14.tx-normal[colspan='2']",
                                    m('select.tx-semibold', {
                                        onchange: (e) => {},
                                        class: "custom-select"
                                    }, m('option', 'Seleccione...'), ['SI', 'NO', 'NO APLICA'].map(x =>
                                        m('option', x)
                                    ))
                                ),


                            ]),
                            m("tr", [

                                m("td.tx-14.tx-normal[colspan='3']",
                                    m("label.tx-semibold",
                                        "CONTROL NEUROLÓGICO"
                                    )
                                ),
                                m("td.tx-14.tx-normal[colspan='3']",
                                    m("input", {
                                        class: "form-control tx-semibold tx-14",
                                        type: "text",
                                        placeholder: "..."


                                    })
                                ),
                                m("td.tx-14.tx-normal[colspan='2']",
                                    m('select.tx-semibold', {
                                        onchange: (e) => {},
                                        class: "custom-select"
                                    }, m('option', 'Seleccione...'), ['SI', 'NO', 'NO APLICA'].map(x =>
                                        m('option', x)
                                    ))
                                ),
                                m("td.tx-14.tx-normal[colspan='2']",
                                    m('select.tx-semibold', {
                                        onchange: (e) => {},
                                        class: "custom-select"
                                    }, m('option', 'Seleccione...'), ['SI', 'NO', 'NO APLICA'].map(x =>
                                        m('option', x)
                                    ))
                                ),
                                m("td.tx-14.tx-normal[colspan='2']",
                                    m('select.tx-semibold', {
                                        onchange: (e) => {},
                                        class: "custom-select"
                                    }, m('option', 'Seleccione...'), ['SI', 'NO', 'NO APLICA'].map(x =>
                                        m('option', x)
                                    ))
                                ),


                            ]),
                            m("tr", [

                                m("td.tx-14.tx-normal[colspan='3']",
                                    m("label.tx-semibold",
                                        "CONTROL DE PRESION VENOSA CENTRAL "
                                    )
                                ),
                                m("td.tx-14.tx-normal[colspan='3']",
                                    m("input", {
                                        class: "form-control tx-semibold tx-14",
                                        type: "text",
                                        placeholder: "..."


                                    })
                                ),
                                m("td.tx-14.tx-normal[colspan='2']",
                                    m('select.tx-semibold', {
                                        onchange: (e) => {},
                                        class: "custom-select"
                                    }, m('option', 'Seleccione...'), ['SI', 'NO', 'NO APLICA'].map(x =>
                                        m('option', x)
                                    ))
                                ),
                                m("td.tx-14.tx-normal[colspan='2']",
                                    m('select.tx-semibold', {
                                        onchange: (e) => {},
                                        class: "custom-select"
                                    }, m('option', 'Seleccione...'), ['SI', 'NO', 'NO APLICA'].map(x =>
                                        m('option', x)
                                    ))
                                ),
                                m("td.tx-14.tx-normal[colspan='2']",
                                    m('select.tx-semibold', {
                                        onchange: (e) => {},
                                        class: "custom-select"
                                    }, m('option', 'Seleccione...'), ['SI', 'NO', 'NO APLICA'].map(x =>
                                        m('option', x)
                                    ))
                                ),


                            ]),
                            m("tr", [

                                m("td.tx-14.tx-normal[colspan='3']",
                                    m("label.tx-semibold",
                                        "ESQUEMA DE INSULINA  "
                                    )
                                ),
                                m("td.tx-14.tx-normal[colspan='3']",
                                    m("input", {
                                        class: "form-control tx-semibold tx-14",
                                        type: "text",
                                        placeholder: "..."


                                    })
                                ),
                                m("td.tx-14.tx-normal[colspan='2']",
                                    m('select.tx-semibold', {
                                        onchange: (e) => {},
                                        class: "custom-select"
                                    }, m('option', 'Seleccione...'), ['SI', 'NO', 'NO APLICA'].map(x =>
                                        m('option', x)
                                    ))
                                ),
                                m("td.tx-14.tx-normal[colspan='2']",
                                    m('select.tx-semibold', {
                                        onchange: (e) => {},
                                        class: "custom-select"
                                    }, m('option', 'Seleccione...'), ['SI', 'NO', 'NO APLICA'].map(x =>
                                        m('option', x)
                                    ))
                                ),
                                m("td.tx-14.tx-normal[colspan='2']",
                                    m('select.tx-semibold', {
                                        onchange: (e) => {},
                                        class: "custom-select"
                                    }, m('option', 'Seleccione...'), ['SI', 'NO', 'NO APLICA'].map(x =>
                                        m('option', x)
                                    ))
                                ),


                            ]),
                            m("tr", [

                                m("td.tx-14.tx-normal[colspan='3']",
                                    m("label.tx-semibold",
                                        "REHABILITACIÓN MOTORA  "
                                    )
                                ),
                                m("td.tx-14.tx-normal[colspan='3']",
                                    m("input", {
                                        class: "form-control tx-semibold tx-14",
                                        type: "text",
                                        placeholder: "..."


                                    })
                                ),
                                m("td.tx-14.tx-normal[colspan='2']",
                                    m('select.tx-semibold', {
                                        onchange: (e) => {},
                                        class: "custom-select"
                                    }, m('option', 'Seleccione...'), ['SI', 'NO', 'NO APLICA'].map(x =>
                                        m('option', x)
                                    ))
                                ),
                                m("td.tx-14.tx-normal[colspan='2']",
                                    m('select.tx-semibold', {
                                        onchange: (e) => {},
                                        class: "custom-select"
                                    }, m('option', 'Seleccione...'), ['SI', 'NO', 'NO APLICA'].map(x =>
                                        m('option', x)
                                    ))
                                ),
                                m("td.tx-14.tx-normal[colspan='2']",
                                    m('select.tx-semibold', {
                                        onchange: (e) => {},
                                        class: "custom-select"
                                    }, m('option', 'Seleccione...'), ['SI', 'NO', 'NO APLICA'].map(x =>
                                        m('option', x)
                                    ))
                                ),


                            ]),
                            m("tr", [

                                m("td.tx-14.tx-normal[colspan='3']",
                                    m("label.tx-semibold",
                                        "CONTROL DE PULSOS DISTALES  "
                                    )
                                ),
                                m("td.tx-14.tx-normal[colspan='3']",
                                    m("input", {
                                        class: "form-control tx-semibold tx-14",
                                        type: "text",
                                        placeholder: "..."


                                    })
                                ),
                                m("td.tx-14.tx-normal[colspan='2']",
                                    m('select.tx-semibold', {
                                        onchange: (e) => {},
                                        class: "custom-select"
                                    }, m('option', 'Seleccione...'), ['SI', 'NO', 'NO APLICA'].map(x =>
                                        m('option', x)
                                    ))
                                ),
                                m("td.tx-14.tx-normal[colspan='2']",
                                    m('select.tx-semibold', {
                                        onchange: (e) => {},
                                        class: "custom-select"
                                    }, m('option', 'Seleccione...'), ['SI', 'NO', 'NO APLICA'].map(x =>
                                        m('option', x)
                                    ))
                                ),
                                m("td.tx-14.tx-normal[colspan='2']",
                                    m('select.tx-semibold', {
                                        onchange: (e) => {},
                                        class: "custom-select"
                                    }, m('option', 'Seleccione...'), ['SI', 'NO', 'NO APLICA'].map(x =>
                                        m('option', x)
                                    ))
                                ),


                            ]),
                        ]),

                        m("thead",

                            m("tr.tx-uppercase", {
                                style: { "background-color": "#CCCCFF" },
                                class: (TurnosUci.nuevoTurno !== null && TurnosUci.nuevoTurno.gestion == 1 ? '' : 'd-none')

                            }, [
                                m("th.tx-semibold[scope='col'][colspan='12']",
                                    "VIAS:"
                                ),

                            ])
                        ),
                        m("tbody.d-none", [
                            m("tr.tx-uppercase", {
                                style: { "background-color": "#eaeff5" }
                            }, [
                                m("th[scope='col'][colspan='3']",
                                    "VIAS: "
                                ),
                                m("th[scope='col'][colspan='1']",
                                    "UBICACIÓN: "
                                ),
                                m("th[scope='col'][colspan='1']",
                                    "TIPO: "
                                ),
                                m("th[scope='col'][colspan='1']",
                                    "INICIO: "
                                ),
                                m("th[scope='col'][colspan='1']",
                                    "RETIRO: "
                                ),
                                m("th[scope='col'][colspan='1']",
                                    "CAMBIO: "
                                ),
                                m("th[scope='col'][colspan='1']",
                                    "CURACION: "
                                ),
                                m("th[scope='col'][colspan='1']",
                                    "CONDICIÓN: "
                                ),
                                m("th[scope='col'][colspan='2']",
                                    "OBSERVACIÓN: "
                                ),

                            ]),
                            m("tr", [

                                m("td.tx-14.tx-normal[colspan='3']",
                                    m("label.tx-semibold",
                                        "VIA PERIFERICA"
                                    )
                                ),
                                m("td.tx-10.tx-normal[colspan='1']",
                                    m('select.tx-semibold', {
                                        onchange: (e) => {},
                                        class: "custom-select"
                                    }, m('option', 'Seleccione...'), ['IZQUIERDA', 'DERECHA'].map(x =>
                                        m('option', x)
                                    ))
                                ),
                                m("td.tx-14.tx-normal[colspan='1']",
                                    m("input", {
                                        class: "form-control tx-semibold tx-14",
                                        type: "text",
                                        placeholder: "..."


                                    })
                                ),
                                m("td.tx-14.tx-normal[colspan='1']",
                                    m('div.d-flex', [
                                        m("input.form-control[id='ifechaViaPeriferica'][type='text'][placeholder='DD/MM/YYYY]", {
                                            oncreate: (el) => {
                                                setTimeout(() => {
                                                    new Cleave("#ifechaViaPeriferica", {
                                                        date: true,
                                                        datePattern: ["d", "m", "Y"]
                                                    });
                                                }, 50);
                                            }
                                        }),
                                        m("input.form-control[id='ihoraViaPeriferica'][type='text'][placeholder='hh:mm']", {
                                            oncreate: (el) => {
                                                setTimeout(() => {
                                                    new Cleave("#ihoraViaPeriferica", {
                                                        time: true,
                                                        timePattern: ["h", "m"]
                                                    });
                                                }, 50);
                                            }
                                        })
                                    ]),

                                ),

                                m("td.tx-14.tx-normal[colspan='1']",
                                    m('div.d-flex', [
                                        m("input.form-control[id='rfechaViaPeriferica'][type='text'][placeholder='DD/MM/YYYY]", {
                                            oncreate: (el) => {
                                                setTimeout(() => {
                                                    new Cleave("#rfechaViaPeriferica", {
                                                        date: true,
                                                        datePattern: ["d", "m", "Y"]
                                                    });
                                                }, 50);
                                            }
                                        }),
                                        m("input.form-control[id='rhoraViaPeriferica'][type='text'][placeholder='hh:mm']", {
                                            oncreate: (el) => {
                                                setTimeout(() => {
                                                    new Cleave("#rhoraViaPeriferica", {
                                                        time: true,
                                                        timePattern: ["h", "m"]
                                                    });
                                                }, 50);
                                            }
                                        })
                                    ])

                                ),
                                m("td.tx-14.tx-normal[colspan='1']",
                                    m('div.d-flex', [
                                        m("input.form-control[id='cfechaViaPeriferica'][type='text'][placeholder='DD/MM/YYYY]", {
                                            oncreate: (el) => {
                                                setTimeout(() => {
                                                    new Cleave("#cfechaViaPeriferica", {
                                                        date: true,
                                                        datePattern: ["d", "m", "Y"]
                                                    });
                                                }, 50);
                                            }
                                        }),
                                        m("input.form-control[id='choraViaPeriferica'][type='text'][placeholder='hh:mm']", {
                                            oncreate: (el) => {
                                                setTimeout(() => {
                                                    new Cleave("#choraViaPeriferica", {
                                                        time: true,
                                                        timePattern: ["h", "m"]
                                                    });
                                                }, 50);
                                            }
                                        })
                                    ])

                                ),
                                m("td.tx-14.tx-normal[colspan='1']",
                                    m('div.d-flex', [
                                        m("input.form-control[id='cufechaViaPeriferica'][type='text'][placeholder='DD/MM/YYYY]", {
                                            oncreate: (el) => {
                                                setTimeout(() => {
                                                    new Cleave("#cufechaViaPeriferica", {
                                                        date: true,
                                                        datePattern: ["d", "m", "Y"]
                                                    });
                                                }, 50);
                                            }
                                        }),
                                        m("input.form-control[id='cuhoraViaPeriferica'][type='text'][placeholder='hh:mm']", {
                                            oncreate: (el) => {
                                                setTimeout(() => {
                                                    new Cleave("#cuhoraViaPeriferica", {
                                                        time: true,
                                                        timePattern: ["h", "m"]
                                                    });
                                                }, 50);
                                            }
                                        })
                                    ])

                                ),
                                m("td.tx-14.tx-normal[colspan='1']",
                                    m('select.tx-semibold', {
                                        onchange: (e) => {},
                                        class: "custom-select"
                                    }, m('option', 'Seleccione...'), ['VIA PERIFERICA PERMEABLE Y EN BUENAS CONDICIONES'].map(x =>
                                        m('option', x)
                                    ))
                                ),

                                m("td.tx-14.tx-normal[colspan='1']",
                                    m("input", {
                                        class: "form-control tx-semibold tx-14",
                                        type: "text",
                                        placeholder: "..."
                                    })
                                ),


                            ]),
                            m("tr", [

                                m("td.tx-14.tx-normal[colspan='3']",
                                    m("label.tx-semibold",
                                        "CATETER YUGULAR"
                                    )
                                ),
                                m("td.tx-14.tx-normal[colspan='1']",
                                    m('select.tx-semibold', {
                                        onchange: (e) => {},
                                        class: "custom-select"
                                    }, m('option', 'Seleccione...'), ['IZQUIERDA', 'DERECHA'].map(x =>
                                        m('option', x)
                                    ))
                                ),
                                m("td.tx-14.tx-normal[colspan='1']",
                                    m("input", {
                                        class: "form-control tx-semibold tx-14",
                                        type: "text",
                                        placeholder: "..."


                                    })
                                ),
                                m("td.tx-14.tx-normal[colspan='1']",
                                    m('div.d-flex', [
                                        m("input.form-control[id='ifechaCateterYugular'][type='text'][placeholder='DD/MM/YYYY]", {
                                            oncreate: (el) => {
                                                setTimeout(() => {
                                                    new Cleave("#ifechaCateterYugular", {
                                                        date: true,
                                                        datePattern: ["d", "m", "Y"]
                                                    });
                                                }, 50);
                                            }
                                        }),
                                        m("input.form-control[id='ihoraCateterYugular'][type='text'][placeholder='hh:mm']", {
                                            oncreate: (el) => {
                                                setTimeout(() => {
                                                    new Cleave("#ihoraCateterYugular", {
                                                        time: true,
                                                        timePattern: ["h", "m"]
                                                    });
                                                }, 50);
                                            }
                                        })
                                    ]),

                                ),

                                m("td.tx-14.tx-normal[colspan='1']",
                                    m('div.d-flex', [
                                        m("input.form-control[id='rfechaCateterYugular'][type='text'][placeholder='DD/MM/YYYY]", {
                                            oncreate: (el) => {
                                                setTimeout(() => {
                                                    new Cleave("#rfechaCateterYugular", {
                                                        date: true,
                                                        datePattern: ["d", "m", "Y"]
                                                    });
                                                }, 50);
                                            }
                                        }),
                                        m("input.form-control[id='rhoraCateterYugular'][type='text'][placeholder='hh:mm']", {
                                            oncreate: (el) => {
                                                setTimeout(() => {
                                                    new Cleave("#rhoraCateterYugular", {
                                                        time: true,
                                                        timePattern: ["h", "m"]
                                                    });
                                                }, 50);
                                            }
                                        })
                                    ])

                                ),
                                m("td.tx-14.tx-normal[colspan='1']",
                                    m('div.d-flex', [
                                        m("input.form-control[id='cfechaCateterYugular'][type='text'][placeholder='DD/MM/YYYY]", {
                                            oncreate: (el) => {
                                                setTimeout(() => {
                                                    new Cleave("#cfechaCateterYugular", {
                                                        date: true,
                                                        datePattern: ["d", "m", "Y"]
                                                    });
                                                }, 50);
                                            }
                                        }),
                                        m("input.form-control[id='choraCateterYugular'][type='text'][placeholder='hh:mm']", {
                                            oncreate: (el) => {
                                                setTimeout(() => {
                                                    new Cleave("#choraCateterYugular", {
                                                        time: true,
                                                        timePattern: ["h", "m"]
                                                    });
                                                }, 50);
                                            }
                                        })
                                    ])

                                ),
                                m("td.tx-14.tx-normal[colspan='1']",
                                    m('div.d-flex', [
                                        m("input.form-control[id='cufechaViaPeriferica'][type='text'][placeholder='DD/MM/YYYY]", {
                                            oncreate: (el) => {
                                                setTimeout(() => {
                                                    new Cleave("#cufechaCateterYugular", {
                                                        date: true,
                                                        datePattern: ["d", "m", "Y"]
                                                    });
                                                }, 50);
                                            }
                                        }),
                                        m("input.form-control[id='cuhoraCateterYugular'][type='text'][placeholder='hh:mm']", {
                                            oncreate: (el) => {
                                                setTimeout(() => {
                                                    new Cleave("#cuhoraCateterYugular", {
                                                        time: true,
                                                        timePattern: ["h", "m"]
                                                    });
                                                }, 50);
                                            }
                                        })
                                    ])

                                ),
                                m("td.tx-14.tx-normal[colspan='1']",
                                    m('select.tx-semibold', {
                                        onchange: (e) => {},
                                        class: "custom-select"
                                    }, m('option', 'Seleccione...'), ['VIA PERIFERICA PERMEABLE Y EN BUENAS CONDICIONES'].map(x =>
                                        m('option', x)
                                    ))
                                ),

                                m("td.tx-14.tx-normal[colspan='1']",
                                    m("input", {
                                        class: "form-control tx-semibold tx-14",
                                        type: "text",
                                        placeholder: "..."
                                    })
                                ),


                            ]),
                            m("tr", [

                                m("td.tx-14.tx-normal[colspan='3']",
                                    m("label.tx-semibold",
                                        "CATETER SUBCLAVIO"
                                    )
                                ),
                                m("td.tx-14.tx-normal[colspan='1']",
                                    m('select.tx-semibold', {
                                        onchange: (e) => {},
                                        class: "custom-select"
                                    }, m('option', 'Seleccione...'), ['IZQUIERDA', 'DERECHA'].map(x =>
                                        m('option', x)
                                    ))
                                ),
                                m("td.tx-14.tx-normal[colspan='1']",
                                    m("input", {
                                        class: "form-control tx-semibold tx-14",
                                        type: "text",
                                        placeholder: "..."


                                    })
                                ),
                                m("td.tx-14.tx-normal[colspan='1']",
                                    m('div.d-flex', [
                                        m("input.form-control[id='ifechaCateterSubclavio'][type='text'][placeholder='DD/MM/YYYY]", {
                                            oncreate: (el) => {
                                                setTimeout(() => {
                                                    new Cleave("#ifechaCateterSubclavio", {
                                                        date: true,
                                                        datePattern: ["d", "m", "Y"]
                                                    });
                                                }, 50);
                                            }
                                        }),
                                        m("input.form-control[id='ihoraCateterSubclavio'][type='text'][placeholder='hh:mm']", {
                                            oncreate: (el) => {
                                                setTimeout(() => {
                                                    new Cleave("#ihoraCateterSubclavio", {
                                                        time: true,
                                                        timePattern: ["h", "m"]
                                                    });
                                                }, 50);
                                            }
                                        })
                                    ]),

                                ),

                                m("td.tx-14.tx-normal[colspan='1']",
                                    m('div.d-flex', [
                                        m("input.form-control[id='rfechaCateterSubclavio'][type='text'][placeholder='DD/MM/YYYY]", {
                                            oncreate: (el) => {
                                                setTimeout(() => {
                                                    new Cleave("#rfechaCateterSubclavio", {
                                                        date: true,
                                                        datePattern: ["d", "m", "Y"]
                                                    });
                                                }, 50);
                                            }
                                        }),
                                        m("input.form-control[id='rhoraCateterSubclavio'][type='text'][placeholder='hh:mm']", {
                                            oncreate: (el) => {
                                                setTimeout(() => {
                                                    new Cleave("#rhoraCateterSubclavio", {
                                                        time: true,
                                                        timePattern: ["h", "m"]
                                                    });
                                                }, 50);
                                            }
                                        })
                                    ])

                                ),
                                m("td.tx-14.tx-normal[colspan='1']",
                                    m('div.d-flex', [
                                        m("input.form-control[id='cfechaCateterSubclavio'][type='text'][placeholder='DD/MM/YYYY]", {
                                            oncreate: (el) => {
                                                setTimeout(() => {
                                                    new Cleave("#cfechaCateterSubclavio", {
                                                        date: true,
                                                        datePattern: ["d", "m", "Y"]
                                                    });
                                                }, 50);
                                            }
                                        }),
                                        m("input.form-control[id='choraCateterSubclavio'][type='text'][placeholder='hh:mm']", {
                                            oncreate: (el) => {
                                                setTimeout(() => {
                                                    new Cleave("#choraCateterSubclavio", {
                                                        time: true,
                                                        timePattern: ["h", "m"]
                                                    });
                                                }, 50);
                                            }
                                        })
                                    ])

                                ),
                                m("td.tx-14.tx-normal[colspan='1']",
                                    m('div.d-flex', [
                                        m("input.form-control[id='cufechaCateterSubclavio'][type='text'][placeholder='DD/MM/YYYY]", {
                                            oncreate: (el) => {
                                                setTimeout(() => {
                                                    new Cleave("#cufechaCateterSubclavio", {
                                                        date: true,
                                                        datePattern: ["d", "m", "Y"]
                                                    });
                                                }, 50);
                                            }
                                        }),
                                        m("input.form-control[id='cuhoraCateterSubclavio'][type='text'][placeholder='hh:mm']", {
                                            oncreate: (el) => {
                                                setTimeout(() => {
                                                    new Cleave("#cuhoraCateterSubclavio", {
                                                        time: true,
                                                        timePattern: ["h", "m"]
                                                    });
                                                }, 50);
                                            }
                                        })
                                    ])

                                ),
                                m("td.tx-14.tx-normal[colspan='1']",
                                    m('select.tx-semibold', {
                                        onchange: (e) => {},
                                        class: "custom-select"
                                    }, m('option', 'Seleccione...'), ['VIA PERIFERICA PERMEABLE Y EN BUENAS CONDICIONES'].map(x =>
                                        m('option', x)
                                    ))
                                ),

                                m("td.tx-14.tx-normal[colspan='1']",
                                    m("input", {
                                        class: "form-control tx-semibold tx-14",
                                        type: "text",
                                        placeholder: "..."
                                    })
                                ),

                            ]),

                            m("tr", [

                                m("td.tx-14.tx-normal[colspan='3']",
                                    m("label.tx-semibold",
                                        "CATETER FEMORAL"
                                    )
                                ),
                                m("td.tx-14.tx-normal[colspan='1']",
                                    m('select.tx-semibold', {
                                        onchange: (e) => {},
                                        class: "custom-select"
                                    }, m('option', 'Seleccione...'), ['IZQUIERDA', 'DERECHA'].map(x =>
                                        m('option', x)
                                    ))
                                ),
                                m("td.tx-14.tx-normal[colspan='1']",
                                    m("input", {
                                        class: "form-control tx-semibold tx-14",
                                        type: "text",
                                        placeholder: "..."


                                    })
                                ),
                                m("td.tx-14.tx-normal[colspan='1']",
                                    m('div.d-flex', [
                                        m("input.form-control[id='ifechaCateterFemoral'][type='text'][placeholder='DD/MM/YYYY]", {
                                            oncreate: (el) => {
                                                setTimeout(() => {
                                                    new Cleave("#ifechaCateterFemoral", {
                                                        date: true,
                                                        datePattern: ["d", "m", "Y"]
                                                    });
                                                }, 50);
                                            }
                                        }),
                                        m("input.form-control[id='ihoraCateterFemoral'][type='text'][placeholder='hh:mm']", {
                                            oncreate: (el) => {
                                                setTimeout(() => {
                                                    new Cleave("#ihoraCateterFemoral", {
                                                        time: true,
                                                        timePattern: ["h", "m"]
                                                    });
                                                }, 50);
                                            }
                                        })
                                    ]),

                                ),

                                m("td.tx-14.tx-normal[colspan='1']",
                                    m('div.d-flex', [
                                        m("input.form-control[id='rfechaCateterFemoral'][type='text'][placeholder='DD/MM/YYYY]", {
                                            oncreate: (el) => {
                                                setTimeout(() => {
                                                    new Cleave("#rfechaCateterFemoral", {
                                                        date: true,
                                                        datePattern: ["d", "m", "Y"]
                                                    });
                                                }, 50);
                                            }
                                        }),
                                        m("input.form-control[id='rhoraCateterFemoral'][type='text'][placeholder='hh:mm']", {
                                            oncreate: (el) => {
                                                setTimeout(() => {
                                                    new Cleave("#rhoraCateterFemoral", {
                                                        time: true,
                                                        timePattern: ["h", "m"]
                                                    });
                                                }, 50);
                                            }
                                        })
                                    ])

                                ),
                                m("td.tx-14.tx-normal[colspan='1']",
                                    m('div.d-flex', [
                                        m("input.form-control[id='cfechaCateterFemoral'][type='text'][placeholder='DD/MM/YYYY]", {
                                            oncreate: (el) => {
                                                setTimeout(() => {
                                                    new Cleave("#cfechaCateterFemoral", {
                                                        date: true,
                                                        datePattern: ["d", "m", "Y"]
                                                    });
                                                }, 50);
                                            }
                                        }),
                                        m("input.form-control[id='choraCateterFemoral'][type='text'][placeholder='hh:mm']", {
                                            oncreate: (el) => {
                                                setTimeout(() => {
                                                    new Cleave("#choraCateterFemoral", {
                                                        time: true,
                                                        timePattern: ["h", "m"]
                                                    });
                                                }, 50);
                                            }
                                        })
                                    ])

                                ),
                                m("td.tx-14.tx-normal[colspan='1']",
                                    m('div.d-flex', [
                                        m("input.form-control[id='cufechaCateterFemoral'][type='text'][placeholder='DD/MM/YYYY]", {
                                            oncreate: (el) => {
                                                setTimeout(() => {
                                                    new Cleave("#cufechaCateterFemoral", {
                                                        date: true,
                                                        datePattern: ["d", "m", "Y"]
                                                    });
                                                }, 50);
                                            }
                                        }),
                                        m("input.form-control[id='cuhoraCateterFemoral'][type='text'][placeholder='hh:mm']", {
                                            oncreate: (el) => {
                                                setTimeout(() => {
                                                    new Cleave("#cuhoraCateterFemoral", {
                                                        time: true,
                                                        timePattern: ["h", "m"]
                                                    });
                                                }, 50);
                                            }
                                        })
                                    ])

                                ),
                                m("td.tx-14.tx-normal[colspan='1']",
                                    m('select.tx-semibold', {
                                        onchange: (e) => {},
                                        class: "custom-select"
                                    }, m('option', 'Seleccione...'), ['VIA PERIFERICA PERMEABLE Y EN BUENAS CONDICIONES'].map(x =>
                                        m('option', x)
                                    ))
                                ),

                                m("td.tx-14.tx-normal[colspan='1']",
                                    m("input", {
                                        class: "form-control tx-semibold tx-14",
                                        type: "text",
                                        placeholder: "..."
                                    })
                                ),

                            ]),
                            m("tr", [

                                m("td.tx-14.tx-normal[colspan='3']",
                                    m("label.tx-semibold",
                                        "CATETER CENTRAL DE INSERCION PERIFERICA"
                                    )
                                ),
                                m("td.tx-14.tx-normal[colspan='1']",
                                    m('select.tx-semibold', {
                                        onchange: (e) => {},
                                        class: "custom-select"
                                    }, m('option', 'Seleccione...'), ['IZQUIERDA', 'DERECHA'].map(x =>
                                        m('option', x)
                                    ))
                                ),
                                m("td.tx-14.tx-normal[colspan='1']",
                                    m("input", {
                                        class: "form-control tx-semibold tx-14",
                                        type: "text",
                                        placeholder: "..."


                                    })
                                ),
                                m("td.tx-14.tx-normal[colspan='1']",
                                    m('div.d-flex', [
                                        m("input.form-control[id='ifechaCateterCentralInsercionPerfiferica'][type='text'][placeholder='DD/MM/YYYY]", {
                                            oncreate: (el) => {
                                                setTimeout(() => {
                                                    new Cleave("#ifechaCateterCentralInsercionPerfiferica", {
                                                        date: true,
                                                        datePattern: ["d", "m", "Y"]
                                                    });
                                                }, 50);
                                            }
                                        }),
                                        m("input.form-control[id='ihoraCateterCentralInsercionPerfiferica'][type='text'][placeholder='hh:mm']", {
                                            oncreate: (el) => {
                                                setTimeout(() => {
                                                    new Cleave("#ihoraCateterCentralInsercionPerfiferica", {
                                                        time: true,
                                                        timePattern: ["h", "m"]
                                                    });
                                                }, 50);
                                            }
                                        })
                                    ]),

                                ),

                                m("td.tx-14.tx-normal[colspan='1']",
                                    m('div.d-flex', [
                                        m("input.form-control[id='rfechaCateterCentralInsercionPerfiferica'][type='text'][placeholder='DD/MM/YYYY]", {
                                            oncreate: (el) => {
                                                setTimeout(() => {
                                                    new Cleave("#rfechaCateterCentralInsercionPerfiferica", {
                                                        date: true,
                                                        datePattern: ["d", "m", "Y"]
                                                    });
                                                }, 50);
                                            }
                                        }),
                                        m("input.form-control[id='rhoraCateterCentralInsercionPerfiferica'][type='text'][placeholder='hh:mm']", {
                                            oncreate: (el) => {
                                                setTimeout(() => {
                                                    new Cleave("#rhoraCateterCentralInsercionPerfiferica", {
                                                        time: true,
                                                        timePattern: ["h", "m"]
                                                    });
                                                }, 50);
                                            }
                                        })
                                    ])

                                ),
                                m("td.tx-14.tx-normal[colspan='1']",
                                    m('div.d-flex', [
                                        m("input.form-control[id='cfechaCateterCentralInsercionPerfiferica'][type='text'][placeholder='DD/MM/YYYY]", {
                                            oncreate: (el) => {
                                                setTimeout(() => {
                                                    new Cleave("#cfechaCateterCentralInsercionPerfiferica", {
                                                        date: true,
                                                        datePattern: ["d", "m", "Y"]
                                                    });
                                                }, 50);
                                            }
                                        }),
                                        m("input.form-control[id='choraCateterCentralInsercionPerfiferica'][type='text'][placeholder='hh:mm']", {
                                            oncreate: (el) => {
                                                setTimeout(() => {
                                                    new Cleave("#choraCateterCentralInsercionPerfiferica", {
                                                        time: true,
                                                        timePattern: ["h", "m"]
                                                    });
                                                }, 50);
                                            }
                                        })
                                    ])

                                ),
                                m("td.tx-14.tx-normal[colspan='1']",
                                    m('div.d-flex', [
                                        m("input.form-control[id='cufechaCateterCentralInsercionPerfiferica'][type='text'][placeholder='DD/MM/YYYY]", {
                                            oncreate: (el) => {
                                                setTimeout(() => {
                                                    new Cleave("#cufechaCateterCentralInsercionPerfiferica", {
                                                        date: true,
                                                        datePattern: ["d", "m", "Y"]
                                                    });
                                                }, 50);
                                            }
                                        }),
                                        m("input.form-control[id='cuhoraCateterCentralInsercionPerfiferica'][type='text'][placeholder='hh:mm']", {
                                            oncreate: (el) => {
                                                setTimeout(() => {
                                                    new Cleave("#cuhoraViaPeriferica", {
                                                        time: true,
                                                        timePattern: ["h", "m"]
                                                    });
                                                }, 50);
                                            }
                                        })
                                    ])

                                ),
                                m("td.tx-14.tx-normal[colspan='1']",
                                    m('select.tx-semibold', {
                                        onchange: (e) => {},
                                        class: "custom-select"
                                    }, m('option', 'Seleccione...'), ['VIA PERIFERICA PERMEABLE Y EN BUENAS CONDICIONES'].map(x =>
                                        m('option', x)
                                    ))
                                ),

                                m("td.tx-14.tx-normal[colspan='1']",
                                    m("input", {
                                        class: "form-control tx-semibold tx-14",
                                        type: "text",
                                        placeholder: "..."
                                    })
                                ),


                            ]),
                            m("tr", [

                                m("td.tx-14.tx-normal[colspan='3']",
                                    m("label.tx-semibold",
                                        "CATETER DE HEMODIALISIS"
                                    )
                                ),
                                m("td.tx-14.tx-normal[colspan='1']",
                                    m('select.tx-semibold', {
                                        onchange: (e) => {},
                                        class: "custom-select"
                                    }, m('option', 'Seleccione...'), ['IZQUIERDA', 'DERECHA'].map(x =>
                                        m('option', x)
                                    ))
                                ),
                                m("td.tx-14.tx-normal[colspan='1']",
                                    m("input", {
                                        class: "form-control tx-semibold tx-14",
                                        type: "text",
                                        placeholder: "..."


                                    })
                                ),
                                m("td.tx-14.tx-normal[colspan='1']",
                                    m('div.d-flex', [
                                        m("input.form-control[id='ifechaCateterHemodialisis'][type='text'][placeholder='DD/MM/YYYY]", {
                                            oncreate: (el) => {
                                                setTimeout(() => {
                                                    new Cleave("#ifechaCateterHemodialisis", {
                                                        date: true,
                                                        datePattern: ["d", "m", "Y"]
                                                    });
                                                }, 50);
                                            }
                                        }),
                                        m("input.form-control[id='ihoraCateterHemodialisis'][type='text'][placeholder='hh:mm']", {
                                            oncreate: (el) => {
                                                setTimeout(() => {
                                                    new Cleave("#ihoraCateterHemodialisis", {
                                                        time: true,
                                                        timePattern: ["h", "m"]
                                                    });
                                                }, 50);
                                            }
                                        })
                                    ]),

                                ),

                                m("td.tx-14.tx-normal[colspan='1']",
                                    m('div.d-flex', [
                                        m("input.form-control[id='rfechaCateterHemodialisis'][type='text'][placeholder='DD/MM/YYYY]", {
                                            oncreate: (el) => {
                                                setTimeout(() => {
                                                    new Cleave("#rfechaCateterHemodialisis", {
                                                        date: true,
                                                        datePattern: ["d", "m", "Y"]
                                                    });
                                                }, 50);
                                            }
                                        }),
                                        m("input.form-control[id='rhoraCateterHemodialisis'][type='text'][placeholder='hh:mm']", {
                                            oncreate: (el) => {
                                                setTimeout(() => {
                                                    new Cleave("#rhoraCateterHemodialisis", {
                                                        time: true,
                                                        timePattern: ["h", "m"]
                                                    });
                                                }, 50);
                                            }
                                        })
                                    ])

                                ),
                                m("td.tx-14.tx-normal[colspan='1']",
                                    m('div.d-flex', [
                                        m("input.form-control[id='cfechaCateterHemodialisis'][type='text'][placeholder='DD/MM/YYYY]", {
                                            oncreate: (el) => {
                                                setTimeout(() => {
                                                    new Cleave("#cfechaCateterHemodialisis", {
                                                        date: true,
                                                        datePattern: ["d", "m", "Y"]
                                                    });
                                                }, 50);
                                            }
                                        }),
                                        m("input.form-control[id='choraCateterHemodialisis'][type='text'][placeholder='hh:mm']", {
                                            oncreate: (el) => {
                                                setTimeout(() => {
                                                    new Cleave("#choraCateterHemodialisis", {
                                                        time: true,
                                                        timePattern: ["h", "m"]
                                                    });
                                                }, 50);
                                            }
                                        })
                                    ])

                                ),
                                m("td.tx-14.tx-normal[colspan='1']",
                                    m('div.d-flex', [
                                        m("input.form-control[id='cufechaCateterHemodialisis'][type='text'][placeholder='DD/MM/YYYY]", {
                                            oncreate: (el) => {
                                                setTimeout(() => {
                                                    new Cleave("#cufechaCateterHemodialisis", {
                                                        date: true,
                                                        datePattern: ["d", "m", "Y"]
                                                    });
                                                }, 50);
                                            }
                                        }),
                                        m("input.form-control[id='cuhoraCateterHemodialisis'][type='text'][placeholder='hh:mm']", {
                                            oncreate: (el) => {
                                                setTimeout(() => {
                                                    new Cleave("#cuhoraCateterHemodialisis", {
                                                        time: true,
                                                        timePattern: ["h", "m"]
                                                    });
                                                }, 50);
                                            }
                                        })
                                    ])

                                ),
                                m("td.tx-14.tx-normal[colspan='1']",
                                    m('select.tx-semibold', {
                                        onchange: (e) => {},
                                        class: "custom-select"
                                    }, m('option', 'Seleccione...'), ['VIA PERIFERICA PERMEABLE Y EN BUENAS CONDICIONES'].map(x =>
                                        m('option', x)
                                    ))
                                ),

                                m("td.tx-14.tx-normal[colspan='1']",
                                    m("input", {
                                        class: "form-control tx-semibold tx-14",
                                        type: "text",
                                        placeholder: "..."
                                    })
                                ),


                            ]),
                            m("tr", [

                                m("td.tx-14.tx-normal[colspan='3']",
                                    m("label.tx-semibold",
                                        "CATETER IMPLANTABLE SUBCUTANEO"
                                    )
                                ),
                                m("td.tx-14.tx-normal[colspan='1']",
                                    m('select.tx-semibold', {
                                        onchange: (e) => {},
                                        class: "custom-select"
                                    }, m('option', 'Seleccione...'), ['IZQUIERDA', 'DERECHA'].map(x =>
                                        m('option', x)
                                    ))
                                ),
                                m("td.tx-14.tx-normal[colspan='1']",
                                    m("input", {
                                        class: "form-control tx-semibold tx-14",
                                        type: "text",
                                        placeholder: "..."


                                    })
                                ),
                                m("td.tx-14.tx-normal[colspan='1']",
                                    m('div.d-flex', [
                                        m("input.form-control[id='ifechaCateterImplantable'][type='text'][placeholder='DD/MM/YYYY]", {
                                            oncreate: (el) => {
                                                setTimeout(() => {
                                                    new Cleave("#ifechaCateterImplantable", {
                                                        date: true,
                                                        datePattern: ["d", "m", "Y"]
                                                    });
                                                }, 50);
                                            }
                                        }),
                                        m("input.form-control[id='ihoraCateterImplantable'][type='text'][placeholder='hh:mm']", {
                                            oncreate: (el) => {
                                                setTimeout(() => {
                                                    new Cleave("#ihoraCateterImplantable", {
                                                        time: true,
                                                        timePattern: ["h", "m"]
                                                    });
                                                }, 50);
                                            }
                                        })
                                    ]),

                                ),

                                m("td.tx-14.tx-normal[colspan='1']",
                                    m('div.d-flex', [
                                        m("input.form-control[id='rfechaCateterImplantable'][type='text'][placeholder='DD/MM/YYYY]", {
                                            oncreate: (el) => {
                                                setTimeout(() => {
                                                    new Cleave("#rfechaCateterImplantable", {
                                                        date: true,
                                                        datePattern: ["d", "m", "Y"]
                                                    });
                                                }, 50);
                                            }
                                        }),
                                        m("input.form-control[id='rhoraCateterImplantable'][type='text'][placeholder='hh:mm']", {
                                            oncreate: (el) => {
                                                setTimeout(() => {
                                                    new Cleave("#rhoraCateterImplantable", {
                                                        time: true,
                                                        timePattern: ["h", "m"]
                                                    });
                                                }, 50);
                                            }
                                        })
                                    ])

                                ),
                                m("td.tx-14.tx-normal[colspan='1']",
                                    m('div.d-flex', [
                                        m("input.form-control[id='cfechaCateterImplantable'][type='text'][placeholder='DD/MM/YYYY]", {
                                            oncreate: (el) => {
                                                setTimeout(() => {
                                                    new Cleave("#cfechaCateterImplantable", {
                                                        date: true,
                                                        datePattern: ["d", "m", "Y"]
                                                    });
                                                }, 50);
                                            }
                                        }),
                                        m("input.form-control[id='choraCateterImplantable'][type='text'][placeholder='hh:mm']", {
                                            oncreate: (el) => {
                                                setTimeout(() => {
                                                    new Cleave("#choraCateterImplantable", {
                                                        time: true,
                                                        timePattern: ["h", "m"]
                                                    });
                                                }, 50);
                                            }
                                        })
                                    ])

                                ),
                                m("td.tx-14.tx-normal[colspan='1']",
                                    m('div.d-flex', [
                                        m("input.form-control[id='cufechaCateterImplantable'][type='text'][placeholder='DD/MM/YYYY]", {
                                            oncreate: (el) => {
                                                setTimeout(() => {
                                                    new Cleave("#cufechaCateterImplantable", {
                                                        date: true,
                                                        datePattern: ["d", "m", "Y"]
                                                    });
                                                }, 50);
                                            }
                                        }),
                                        m("input.form-control[id='cuhoraCateterImplantable'][type='text'][placeholder='hh:mm']", {
                                            oncreate: (el) => {
                                                setTimeout(() => {
                                                    new Cleave("#cuhoraCateterImplantable", {
                                                        time: true,
                                                        timePattern: ["h", "m"]
                                                    });
                                                }, 50);
                                            }
                                        })
                                    ])

                                ),
                                m("td.tx-14.tx-normal[colspan='1']",
                                    m('select.tx-semibold', {
                                        onchange: (e) => {},
                                        class: "custom-select"
                                    }, m('option', 'Seleccione...'), ['VIA PERIFERICA PERMEABLE Y EN BUENAS CONDICIONES'].map(x =>
                                        m('option', x)
                                    ))
                                ),

                                m("td.tx-14.tx-normal[colspan='1']",
                                    m("input", {
                                        class: "form-control tx-semibold tx-14",
                                        type: "text",
                                        placeholder: "..."
                                    })
                                ),

                            ]),
                            m("tr", [

                                m("td.tx-14.tx-normal[colspan='3']",
                                    m("label.tx-semibold",
                                        "LINEA ARTERIAL"
                                    )
                                ),
                                m("td.tx-14.tx-normal[colspan='1']",
                                    m('select.tx-semibold', {
                                        onchange: (e) => {},
                                        class: "custom-select"
                                    }, m('option', 'Seleccione...'), ['IZQUIERDA', 'DERECHA'].map(x =>
                                        m('option', x)
                                    ))
                                ),
                                m("td.tx-14.tx-normal[colspan='1']",
                                    m("input", {
                                        class: "form-control tx-semibold tx-14",
                                        type: "text",
                                        placeholder: "..."


                                    })
                                ),
                                m("td.tx-14.tx-normal[colspan='1']",
                                    m('div.d-flex', [
                                        m("input.form-control[id='ifechaLineaArterial'][type='text'][placeholder='DD/MM/YYYY]", {
                                            oncreate: (el) => {
                                                setTimeout(() => {
                                                    new Cleave("#ifechaLineaArterial", {
                                                        date: true,
                                                        datePattern: ["d", "m", "Y"]
                                                    });
                                                }, 50);
                                            }
                                        }),
                                        m("input.form-control[id='ihoraLineaArterial'][type='text'][placeholder='hh:mm']", {
                                            oncreate: (el) => {
                                                setTimeout(() => {
                                                    new Cleave("#ihoraLineaArterial", {
                                                        time: true,
                                                        timePattern: ["h", "m"]
                                                    });
                                                }, 50);
                                            }
                                        })
                                    ]),

                                ),

                                m("td.tx-14.tx-normal[colspan='1']",
                                    m('div.d-flex', [
                                        m("input.form-control[id='rfechaLineaArterial'][type='text'][placeholder='DD/MM/YYYY]", {
                                            oncreate: (el) => {
                                                setTimeout(() => {
                                                    new Cleave("#rfechaLineaArterial", {
                                                        date: true,
                                                        datePattern: ["d", "m", "Y"]
                                                    });
                                                }, 50);
                                            }
                                        }),
                                        m("input.form-control[id='rhoraLineaArterial'][type='text'][placeholder='hh:mm']", {
                                            oncreate: (el) => {
                                                setTimeout(() => {
                                                    new Cleave("#rhoraLineaArterial", {
                                                        time: true,
                                                        timePattern: ["h", "m"]
                                                    });
                                                }, 50);
                                            }
                                        })
                                    ])

                                ),
                                m("td.tx-14.tx-normal[colspan='1']",
                                    m('div.d-flex', [
                                        m("input.form-control[id='cfechaLineaArterial'][type='text'][placeholder='DD/MM/YYYY]", {
                                            oncreate: (el) => {
                                                setTimeout(() => {
                                                    new Cleave("#cfechaLineaArterial", {
                                                        date: true,
                                                        datePattern: ["d", "m", "Y"]
                                                    });
                                                }, 50);
                                            }
                                        }),
                                        m("input.form-control[id='choraLineaArterial'][type='text'][placeholder='hh:mm']", {
                                            oncreate: (el) => {
                                                setTimeout(() => {
                                                    new Cleave("#choraLineaArterial", {
                                                        time: true,
                                                        timePattern: ["h", "m"]
                                                    });
                                                }, 50);
                                            }
                                        })
                                    ])

                                ),
                                m("td.tx-14.tx-normal[colspan='1']",
                                    m('div.d-flex', [
                                        m("input.form-control[id='cufechaLineaArterial'][type='text'][placeholder='DD/MM/YYYY]", {
                                            oncreate: (el) => {
                                                setTimeout(() => {
                                                    new Cleave("#cufechaLineaArterial", {
                                                        date: true,
                                                        datePattern: ["d", "m", "Y"]
                                                    });
                                                }, 50);
                                            }
                                        }),
                                        m("input.form-control[id='cuhoraLineaArterial'][type='text'][placeholder='hh:mm']", {
                                            oncreate: (el) => {
                                                setTimeout(() => {
                                                    new Cleave("#cuhoraLineaArterial", {
                                                        time: true,
                                                        timePattern: ["h", "m"]
                                                    });
                                                }, 50);
                                            }
                                        })
                                    ])

                                ),
                                m("td.tx-14.tx-normal[colspan='1']",
                                    m('select.tx-semibold', {
                                        onchange: (e) => {},
                                        class: "custom-select"
                                    }, m('option', 'Seleccione...'), ['VIA PERIFERICA PERMEABLE Y EN BUENAS CONDICIONES'].map(x =>
                                        m('option', x)
                                    ))
                                ),

                                m("td.tx-14.tx-normal[colspan='1']",
                                    m("input", {
                                        class: "form-control tx-semibold tx-14",
                                        type: "text",
                                        placeholder: "..."
                                    })
                                ),

                            ]),



                        ]),
                        m("thead",

                            m("tr.tx-uppercase", {
                                style: { "background-color": "#CCCCFF" },
                                class: (TurnosUci.nuevoTurno !== null && TurnosUci.nuevoTurno.gestion == 1 ? '' : 'd-none')

                            }, [
                                m("th.tx-semibold[scope='col'][colspan='12']",
                                    "ACCESOS:"
                                ),

                            ])
                        ),
                        m("tbody.d-none", [
                            m("tr.tx-uppercase", {
                                style: { "background-color": "#eaeff5" }
                            }, [
                                m("th[scope='col'][colspan='3']",
                                    "ACCESOS: "
                                ),
                                m("th[scope='col'][colspan='1']",
                                    "UBICACIÓN: "
                                ),
                                m("th[scope='col'][colspan='1']",
                                    "TIPO: "
                                ),
                                m("th[scope='col'][colspan='1']",
                                    "INICIO: "
                                ),
                                m("th[scope='col'][colspan='1']",
                                    "RETIRO: "
                                ),
                                m("th[scope='col'][colspan='1']",
                                    "CAMBIO: "
                                ),
                                m("th[scope='col'][colspan='1']",
                                    "CURACION: "
                                ),
                                m("th[scope='col'][colspan='1']",
                                    "CONDICIÓN: "
                                ),
                                m("th[scope='col'][colspan='2']",
                                    "OBSERVACIÓN: "
                                ),

                            ]),
                            m("tr", [

                                m("td.tx-14.tx-normal[colspan='3']",
                                    m("label.tx-semibold",
                                        "CATETER INTRACRANEAL "
                                    )
                                ),
                                m("td.tx-10.tx-normal[colspan='1']",
                                    m('select.tx-semibold', {
                                        onchange: (e) => {},
                                        class: "custom-select"
                                    }, m('option', 'Seleccione...'), ['SUBDURAL', 'INTRAPARENQUIMATOSO'].map(x =>
                                        m('option', x)
                                    ))
                                ),
                                m("td.tx-14.tx-normal[colspan='1']",
                                    m("input", {
                                        class: "form-control tx-semibold tx-14",
                                        type: "text",
                                        placeholder: "..."


                                    })
                                ),
                                m("td.tx-14.tx-normal[colspan='1']",
                                    m('div.d-flex', [
                                        m("input.form-control[id='ifechaViaPeriferica'][type='text'][placeholder='DD/MM/YYYY]", {
                                            oncreate: (el) => {
                                                setTimeout(() => {
                                                    new Cleave("#ifechaViaPeriferica", {
                                                        date: true,
                                                        datePattern: ["d", "m", "Y"]
                                                    });
                                                }, 50);
                                            }
                                        }),
                                        m("input.form-control[id='ihoraViaPeriferica'][type='text'][placeholder='hh:mm']", {
                                            oncreate: (el) => {
                                                setTimeout(() => {
                                                    new Cleave("#ihoraViaPeriferica", {
                                                        time: true,
                                                        timePattern: ["h", "m"]
                                                    });
                                                }, 50);
                                            }
                                        })
                                    ]),

                                ),

                                m("td.tx-14.tx-normal[colspan='1']",
                                    m('div.d-flex', [
                                        m("input.form-control[id='rfechaViaPeriferica'][type='text'][placeholder='DD/MM/YYYY]", {
                                            oncreate: (el) => {
                                                setTimeout(() => {
                                                    new Cleave("#rfechaViaPeriferica", {
                                                        date: true,
                                                        datePattern: ["d", "m", "Y"]
                                                    });
                                                }, 50);
                                            }
                                        }),
                                        m("input.form-control[id='rhoraViaPeriferica'][type='text'][placeholder='hh:mm']", {
                                            oncreate: (el) => {
                                                setTimeout(() => {
                                                    new Cleave("#rhoraViaPeriferica", {
                                                        time: true,
                                                        timePattern: ["h", "m"]
                                                    });
                                                }, 50);
                                            }
                                        })
                                    ])

                                ),
                                m("td.tx-14.tx-normal[colspan='1']",
                                    m('div.d-flex', [
                                        m("input.form-control[id='cfechaViaPeriferica'][type='text'][placeholder='DD/MM/YYYY]", {
                                            oncreate: (el) => {
                                                setTimeout(() => {
                                                    new Cleave("#cfechaViaPeriferica", {
                                                        date: true,
                                                        datePattern: ["d", "m", "Y"]
                                                    });
                                                }, 50);
                                            }
                                        }),
                                        m("input.form-control[id='choraViaPeriferica'][type='text'][placeholder='hh:mm']", {
                                            oncreate: (el) => {
                                                setTimeout(() => {
                                                    new Cleave("#choraViaPeriferica", {
                                                        time: true,
                                                        timePattern: ["h", "m"]
                                                    });
                                                }, 50);
                                            }
                                        })
                                    ])

                                ),
                                m("td.tx-14.tx-normal[colspan='1']",
                                    m('div.d-flex', [
                                        m("input.form-control[id='cufechaViaPeriferica'][type='text'][placeholder='DD/MM/YYYY]", {
                                            oncreate: (el) => {
                                                setTimeout(() => {
                                                    new Cleave("#cufechaViaPeriferica", {
                                                        date: true,
                                                        datePattern: ["d", "m", "Y"]
                                                    });
                                                }, 50);
                                            }
                                        }),
                                        m("input.form-control[id='cuhoraViaPeriferica'][type='text'][placeholder='hh:mm']", {
                                            oncreate: (el) => {
                                                setTimeout(() => {
                                                    new Cleave("#cuhoraViaPeriferica", {
                                                        time: true,
                                                        timePattern: ["h", "m"]
                                                    });
                                                }, 50);
                                            }
                                        })
                                    ])

                                ),
                                m("td.tx-14.tx-normal[colspan='1']",
                                    m('select.tx-semibold', {
                                        onchange: (e) => {},
                                        class: "custom-select"
                                    }, m('option', 'Seleccione...'), ['VIA PERIFERICA PERMEABLE Y EN BUENAS CONDICIONES'].map(x =>
                                        m('option', x)
                                    ))
                                ),

                                m("td.tx-14.tx-normal[colspan='1']",
                                    m("input", {
                                        class: "form-control tx-semibold tx-14",
                                        type: "text",
                                        placeholder: "..."
                                    })
                                ),


                            ]),
                            m("tr", [

                                m("td.tx-14.tx-normal[colspan='3']",
                                    m("label.tx-semibold",
                                        "ACCESO INTRA-OSEO"
                                    )
                                ),
                                m("td.tx-14.tx-normal[colspan='1']",
                                    m('select.tx-semibold', {
                                        onchange: (e) => {},
                                        class: "custom-select"
                                    }, m('option', 'Seleccione...'), ['TIBIAL'].map(x =>
                                        m('option', x)
                                    ))
                                ),
                                m("td.tx-14.tx-normal[colspan='1']",
                                    m("input", {
                                        class: "form-control tx-semibold tx-14",
                                        type: "text",
                                        placeholder: "..."


                                    })
                                ),
                                m("td.tx-14.tx-normal[colspan='1']",
                                    m('div.d-flex', [
                                        m("input.form-control[id='ifechaCateterYugular'][type='text'][placeholder='DD/MM/YYYY]", {
                                            oncreate: (el) => {
                                                setTimeout(() => {
                                                    new Cleave("#ifechaCateterYugular", {
                                                        date: true,
                                                        datePattern: ["d", "m", "Y"]
                                                    });
                                                }, 50);
                                            }
                                        }),
                                        m("input.form-control[id='ihoraCateterYugular'][type='text'][placeholder='hh:mm']", {
                                            oncreate: (el) => {
                                                setTimeout(() => {
                                                    new Cleave("#ihoraCateterYugular", {
                                                        time: true,
                                                        timePattern: ["h", "m"]
                                                    });
                                                }, 50);
                                            }
                                        })
                                    ]),

                                ),

                                m("td.tx-14.tx-normal[colspan='1']",
                                    m('div.d-flex', [
                                        m("input.form-control[id='rfechaCateterYugular'][type='text'][placeholder='DD/MM/YYYY]", {
                                            oncreate: (el) => {
                                                setTimeout(() => {
                                                    new Cleave("#rfechaCateterYugular", {
                                                        date: true,
                                                        datePattern: ["d", "m", "Y"]
                                                    });
                                                }, 50);
                                            }
                                        }),
                                        m("input.form-control[id='rhoraCateterYugular'][type='text'][placeholder='hh:mm']", {
                                            oncreate: (el) => {
                                                setTimeout(() => {
                                                    new Cleave("#rhoraCateterYugular", {
                                                        time: true,
                                                        timePattern: ["h", "m"]
                                                    });
                                                }, 50);
                                            }
                                        })
                                    ])

                                ),
                                m("td.tx-14.tx-normal[colspan='1']",
                                    m('div.d-flex', [
                                        m("input.form-control[id='cfechaCateterYugular'][type='text'][placeholder='DD/MM/YYYY]", {
                                            oncreate: (el) => {
                                                setTimeout(() => {
                                                    new Cleave("#cfechaCateterYugular", {
                                                        date: true,
                                                        datePattern: ["d", "m", "Y"]
                                                    });
                                                }, 50);
                                            }
                                        }),
                                        m("input.form-control[id='choraCateterYugular'][type='text'][placeholder='hh:mm']", {
                                            oncreate: (el) => {
                                                setTimeout(() => {
                                                    new Cleave("#choraCateterYugular", {
                                                        time: true,
                                                        timePattern: ["h", "m"]
                                                    });
                                                }, 50);
                                            }
                                        })
                                    ])

                                ),
                                m("td.tx-14.tx-normal[colspan='1']",
                                    m('div.d-flex', [
                                        m("input.form-control[id='cufechaViaPeriferica'][type='text'][placeholder='DD/MM/YYYY]", {
                                            oncreate: (el) => {
                                                setTimeout(() => {
                                                    new Cleave("#cufechaCateterYugular", {
                                                        date: true,
                                                        datePattern: ["d", "m", "Y"]
                                                    });
                                                }, 50);
                                            }
                                        }),
                                        m("input.form-control[id='cuhoraCateterYugular'][type='text'][placeholder='hh:mm']", {
                                            oncreate: (el) => {
                                                setTimeout(() => {
                                                    new Cleave("#cuhoraCateterYugular", {
                                                        time: true,
                                                        timePattern: ["h", "m"]
                                                    });
                                                }, 50);
                                            }
                                        })
                                    ])

                                ),
                                m("td.tx-14.tx-normal[colspan='1']",
                                    m('select.tx-semibold', {
                                        onchange: (e) => {},
                                        class: "custom-select"
                                    }, m('option', 'Seleccione...'), ['VIA PERIFERICA PERMEABLE Y EN BUENAS CONDICIONES'].map(x =>
                                        m('option', x)
                                    ))
                                ),

                                m("td.tx-14.tx-normal[colspan='1']",
                                    m("input", {
                                        class: "form-control tx-semibold tx-14",
                                        type: "text",
                                        placeholder: "..."
                                    })
                                ),


                            ]),
                            m("tr", [

                                m("td.tx-14.tx-normal[colspan='3']",
                                    m("label.tx-semibold",
                                        "TUBO TRAQUEAL"
                                    )
                                ),
                                m("td.tx-14.tx-normal[colspan='1']",
                                    m('select.tx-semibold', {
                                        onchange: (e) => {},
                                        class: "custom-select"
                                    }, m('option', 'Seleccione...'), ['NASO-TRAQUEAL', 'ORO-TRAQUEAL', 'SUBMAXILAR'].map(x =>
                                        m('option', x)
                                    ))
                                ),
                                m("td.tx-14.tx-normal[colspan='1']",
                                    m("input", {
                                        class: "form-control tx-semibold tx-14",
                                        type: "text",
                                        placeholder: "..."


                                    })
                                ),
                                m("td.tx-14.tx-normal[colspan='1']",
                                    m('div.d-flex', [
                                        m("input.form-control[id='ifechaCateterSubclavio'][type='text'][placeholder='DD/MM/YYYY]", {
                                            oncreate: (el) => {
                                                setTimeout(() => {
                                                    new Cleave("#ifechaCateterSubclavio", {
                                                        date: true,
                                                        datePattern: ["d", "m", "Y"]
                                                    });
                                                }, 50);
                                            }
                                        }),
                                        m("input.form-control[id='ihoraCateterSubclavio'][type='text'][placeholder='hh:mm']", {
                                            oncreate: (el) => {
                                                setTimeout(() => {
                                                    new Cleave("#ihoraCateterSubclavio", {
                                                        time: true,
                                                        timePattern: ["h", "m"]
                                                    });
                                                }, 50);
                                            }
                                        })
                                    ]),

                                ),

                                m("td.tx-14.tx-normal[colspan='1']",
                                    m('div.d-flex', [
                                        m("input.form-control[id='rfechaCateterSubclavio'][type='text'][placeholder='DD/MM/YYYY]", {
                                            oncreate: (el) => {
                                                setTimeout(() => {
                                                    new Cleave("#rfechaCateterSubclavio", {
                                                        date: true,
                                                        datePattern: ["d", "m", "Y"]
                                                    });
                                                }, 50);
                                            }
                                        }),
                                        m("input.form-control[id='rhoraCateterSubclavio'][type='text'][placeholder='hh:mm']", {
                                            oncreate: (el) => {
                                                setTimeout(() => {
                                                    new Cleave("#rhoraCateterSubclavio", {
                                                        time: true,
                                                        timePattern: ["h", "m"]
                                                    });
                                                }, 50);
                                            }
                                        })
                                    ])

                                ),
                                m("td.tx-14.tx-normal[colspan='1']",
                                    m('div.d-flex', [
                                        m("input.form-control[id='cfechaCateterSubclavio'][type='text'][placeholder='DD/MM/YYYY]", {
                                            oncreate: (el) => {
                                                setTimeout(() => {
                                                    new Cleave("#cfechaCateterSubclavio", {
                                                        date: true,
                                                        datePattern: ["d", "m", "Y"]
                                                    });
                                                }, 50);
                                            }
                                        }),
                                        m("input.form-control[id='choraCateterSubclavio'][type='text'][placeholder='hh:mm']", {
                                            oncreate: (el) => {
                                                setTimeout(() => {
                                                    new Cleave("#choraCateterSubclavio", {
                                                        time: true,
                                                        timePattern: ["h", "m"]
                                                    });
                                                }, 50);
                                            }
                                        })
                                    ])

                                ),
                                m("td.tx-14.tx-normal[colspan='1']",
                                    m('div.d-flex', [
                                        m("input.form-control[id='cufechaCateterSubclavio'][type='text'][placeholder='DD/MM/YYYY]", {
                                            oncreate: (el) => {
                                                setTimeout(() => {
                                                    new Cleave("#cufechaCateterSubclavio", {
                                                        date: true,
                                                        datePattern: ["d", "m", "Y"]
                                                    });
                                                }, 50);
                                            }
                                        }),
                                        m("input.form-control[id='cuhoraCateterSubclavio'][type='text'][placeholder='hh:mm']", {
                                            oncreate: (el) => {
                                                setTimeout(() => {
                                                    new Cleave("#cuhoraCateterSubclavio", {
                                                        time: true,
                                                        timePattern: ["h", "m"]
                                                    });
                                                }, 50);
                                            }
                                        })
                                    ])

                                ),
                                m("td.tx-14.tx-normal[colspan='1']",
                                    m('select.tx-semibold', {
                                        onchange: (e) => {},
                                        class: "custom-select"
                                    }, m('option', 'Seleccione...'), ['VIA PERIFERICA PERMEABLE Y EN BUENAS CONDICIONES'].map(x =>
                                        m('option', x)
                                    ))
                                ),

                                m("td.tx-14.tx-normal[colspan='1']",
                                    m("input", {
                                        class: "form-control tx-semibold tx-14",
                                        type: "text",
                                        placeholder: "..."
                                    })
                                ),

                            ]),

                            m("tr", [

                                m("td.tx-14.tx-normal[colspan='3']",
                                    m("label.tx-semibold",
                                        "TUBO TORACICO"
                                    )
                                ),
                                m("td.tx-14.tx-normal[colspan='1']",
                                    m('select.tx-semibold', {
                                        onchange: (e) => {},
                                        class: "custom-select"
                                    }, m('option', 'Seleccione...'), ['TORAX DERECHO', 'TORAX IZQUIERDO', 'PLEURAL', 'MEDIASTINAL'].map(x =>
                                        m('option', x)
                                    ))
                                ),
                                m("td.tx-14.tx-normal[colspan='1']",
                                    m("input", {
                                        class: "form-control tx-semibold tx-14",
                                        type: "text",
                                        placeholder: "..."


                                    })
                                ),
                                m("td.tx-14.tx-normal[colspan='1']",
                                    m('div.d-flex', [
                                        m("input.form-control[id='ifechaCateterFemoral'][type='text'][placeholder='DD/MM/YYYY]", {
                                            oncreate: (el) => {
                                                setTimeout(() => {
                                                    new Cleave("#ifechaCateterFemoral", {
                                                        date: true,
                                                        datePattern: ["d", "m", "Y"]
                                                    });
                                                }, 50);
                                            }
                                        }),
                                        m("input.form-control[id='ihoraCateterFemoral'][type='text'][placeholder='hh:mm']", {
                                            oncreate: (el) => {
                                                setTimeout(() => {
                                                    new Cleave("#ihoraCateterFemoral", {
                                                        time: true,
                                                        timePattern: ["h", "m"]
                                                    });
                                                }, 50);
                                            }
                                        })
                                    ]),

                                ),

                                m("td.tx-14.tx-normal[colspan='1']",
                                    m('div.d-flex', [
                                        m("input.form-control[id='rfechaCateterFemoral'][type='text'][placeholder='DD/MM/YYYY]", {
                                            oncreate: (el) => {
                                                setTimeout(() => {
                                                    new Cleave("#rfechaCateterFemoral", {
                                                        date: true,
                                                        datePattern: ["d", "m", "Y"]
                                                    });
                                                }, 50);
                                            }
                                        }),
                                        m("input.form-control[id='rhoraCateterFemoral'][type='text'][placeholder='hh:mm']", {
                                            oncreate: (el) => {
                                                setTimeout(() => {
                                                    new Cleave("#rhoraCateterFemoral", {
                                                        time: true,
                                                        timePattern: ["h", "m"]
                                                    });
                                                }, 50);
                                            }
                                        })
                                    ])

                                ),
                                m("td.tx-14.tx-normal[colspan='1']",
                                    m('div.d-flex', [
                                        m("input.form-control[id='cfechaCateterFemoral'][type='text'][placeholder='DD/MM/YYYY]", {
                                            oncreate: (el) => {
                                                setTimeout(() => {
                                                    new Cleave("#cfechaCateterFemoral", {
                                                        date: true,
                                                        datePattern: ["d", "m", "Y"]
                                                    });
                                                }, 50);
                                            }
                                        }),
                                        m("input.form-control[id='choraCateterFemoral'][type='text'][placeholder='hh:mm']", {
                                            oncreate: (el) => {
                                                setTimeout(() => {
                                                    new Cleave("#choraCateterFemoral", {
                                                        time: true,
                                                        timePattern: ["h", "m"]
                                                    });
                                                }, 50);
                                            }
                                        })
                                    ])

                                ),
                                m("td.tx-14.tx-normal[colspan='1']",
                                    m('div.d-flex', [
                                        m("input.form-control[id='cufechaCateterFemoral'][type='text'][placeholder='DD/MM/YYYY]", {
                                            oncreate: (el) => {
                                                setTimeout(() => {
                                                    new Cleave("#cufechaCateterFemoral", {
                                                        date: true,
                                                        datePattern: ["d", "m", "Y"]
                                                    });
                                                }, 50);
                                            }
                                        }),
                                        m("input.form-control[id='cuhoraCateterFemoral'][type='text'][placeholder='hh:mm']", {
                                            oncreate: (el) => {
                                                setTimeout(() => {
                                                    new Cleave("#cuhoraCateterFemoral", {
                                                        time: true,
                                                        timePattern: ["h", "m"]
                                                    });
                                                }, 50);
                                            }
                                        })
                                    ])

                                ),
                                m("td.tx-14.tx-normal[colspan='1']",
                                    m('select.tx-semibold', {
                                        onchange: (e) => {},
                                        class: "custom-select"
                                    }, m('option', 'Seleccione...'), ['VIA PERIFERICA PERMEABLE Y EN BUENAS CONDICIONES'].map(x =>
                                        m('option', x)
                                    ))
                                ),

                                m("td.tx-14.tx-normal[colspan='1']",
                                    m("input", {
                                        class: "form-control tx-semibold tx-14",
                                        type: "text",
                                        placeholder: "..."
                                    })
                                ),

                            ]),
                            m("tr", [

                                m("td.tx-14.tx-normal[colspan='3']",
                                    m("label.tx-semibold",
                                        "TRAQUEOTOMO"
                                    )
                                ),
                                m("td.tx-14.tx-normal[colspan='1']",
                                    m('select.tx-semibold', {
                                        onchange: (e) => {},
                                        class: "custom-select"
                                    }, m('option', 'Seleccione...'), ['TRAQUEA'].map(x =>
                                        m('option', x)
                                    ))
                                ),
                                m("td.tx-14.tx-normal[colspan='1']",
                                    m("input", {
                                        class: "form-control tx-semibold tx-14",
                                        type: "text",
                                        placeholder: "..."


                                    })
                                ),
                                m("td.tx-14.tx-normal[colspan='1']",
                                    m('div.d-flex', [
                                        m("input.form-control[id='ifechaCateterCentralInsercionPerfiferica'][type='text'][placeholder='DD/MM/YYYY]", {
                                            oncreate: (el) => {
                                                setTimeout(() => {
                                                    new Cleave("#ifechaCateterCentralInsercionPerfiferica", {
                                                        date: true,
                                                        datePattern: ["d", "m", "Y"]
                                                    });
                                                }, 50);
                                            }
                                        }),
                                        m("input.form-control[id='ihoraCateterCentralInsercionPerfiferica'][type='text'][placeholder='hh:mm']", {
                                            oncreate: (el) => {
                                                setTimeout(() => {
                                                    new Cleave("#ihoraCateterCentralInsercionPerfiferica", {
                                                        time: true,
                                                        timePattern: ["h", "m"]
                                                    });
                                                }, 50);
                                            }
                                        })
                                    ]),

                                ),

                                m("td.tx-14.tx-normal[colspan='1']",
                                    m('div.d-flex', [
                                        m("input.form-control[id='rfechaCateterCentralInsercionPerfiferica'][type='text'][placeholder='DD/MM/YYYY]", {
                                            oncreate: (el) => {
                                                setTimeout(() => {
                                                    new Cleave("#rfechaCateterCentralInsercionPerfiferica", {
                                                        date: true,
                                                        datePattern: ["d", "m", "Y"]
                                                    });
                                                }, 50);
                                            }
                                        }),
                                        m("input.form-control[id='rhoraCateterCentralInsercionPerfiferica'][type='text'][placeholder='hh:mm']", {
                                            oncreate: (el) => {
                                                setTimeout(() => {
                                                    new Cleave("#rhoraCateterCentralInsercionPerfiferica", {
                                                        time: true,
                                                        timePattern: ["h", "m"]
                                                    });
                                                }, 50);
                                            }
                                        })
                                    ])

                                ),
                                m("td.tx-14.tx-normal[colspan='1']",
                                    m('div.d-flex', [
                                        m("input.form-control[id='cfechaCateterCentralInsercionPerfiferica'][type='text'][placeholder='DD/MM/YYYY]", {
                                            oncreate: (el) => {
                                                setTimeout(() => {
                                                    new Cleave("#cfechaCateterCentralInsercionPerfiferica", {
                                                        date: true,
                                                        datePattern: ["d", "m", "Y"]
                                                    });
                                                }, 50);
                                            }
                                        }),
                                        m("input.form-control[id='choraCateterCentralInsercionPerfiferica'][type='text'][placeholder='hh:mm']", {
                                            oncreate: (el) => {
                                                setTimeout(() => {
                                                    new Cleave("#choraCateterCentralInsercionPerfiferica", {
                                                        time: true,
                                                        timePattern: ["h", "m"]
                                                    });
                                                }, 50);
                                            }
                                        })
                                    ])

                                ),
                                m("td.tx-14.tx-normal[colspan='1']",
                                    m('div.d-flex', [
                                        m("input.form-control[id='cufechaCateterCentralInsercionPerfiferica'][type='text'][placeholder='DD/MM/YYYY]", {
                                            oncreate: (el) => {
                                                setTimeout(() => {
                                                    new Cleave("#cufechaCateterCentralInsercionPerfiferica", {
                                                        date: true,
                                                        datePattern: ["d", "m", "Y"]
                                                    });
                                                }, 50);
                                            }
                                        }),
                                        m("input.form-control[id='cuhoraCateterCentralInsercionPerfiferica'][type='text'][placeholder='hh:mm']", {
                                            oncreate: (el) => {
                                                setTimeout(() => {
                                                    new Cleave("#cuhoraViaPeriferica", {
                                                        time: true,
                                                        timePattern: ["h", "m"]
                                                    });
                                                }, 50);
                                            }
                                        })
                                    ])

                                ),
                                m("td.tx-14.tx-normal[colspan='1']",
                                    m('select.tx-semibold', {
                                        onchange: (e) => {},
                                        class: "custom-select"
                                    }, m('option', 'Seleccione...'), ['VIA PERIFERICA PERMEABLE Y EN BUENAS CONDICIONES'].map(x =>
                                        m('option', x)
                                    ))
                                ),

                                m("td.tx-14.tx-normal[colspan='1']",
                                    m("input", {
                                        class: "form-control tx-semibold tx-14",
                                        type: "text",
                                        placeholder: "..."
                                    })
                                ),


                            ]),
                            m("tr", [

                                m("td.tx-14.tx-normal[colspan='3']",
                                    m("label.tx-semibold",
                                        "SONDA NASOGASTRICA"
                                    )
                                ),
                                m("td.tx-14.tx-normal[colspan='1']",
                                    m('select.tx-semibold', {
                                        onchange: (e) => {},
                                        class: "custom-select"
                                    }, m('option', 'Seleccione...'), ['FOSA NASAL DERECHA', 'FOSA NASAL IZQUIERDA'].map(x =>
                                        m('option', x)
                                    ))
                                ),
                                m("td.tx-14.tx-normal[colspan='1']",
                                    m("input", {
                                        class: "form-control tx-semibold tx-14",
                                        type: "text",
                                        placeholder: "..."


                                    })
                                ),
                                m("td.tx-14.tx-normal[colspan='1']",
                                    m('div.d-flex', [
                                        m("input.form-control[id='ifechaCateterHemodialisis'][type='text'][placeholder='DD/MM/YYYY]", {
                                            oncreate: (el) => {
                                                setTimeout(() => {
                                                    new Cleave("#ifechaCateterHemodialisis", {
                                                        date: true,
                                                        datePattern: ["d", "m", "Y"]
                                                    });
                                                }, 50);
                                            }
                                        }),
                                        m("input.form-control[id='ihoraCateterHemodialisis'][type='text'][placeholder='hh:mm']", {
                                            oncreate: (el) => {
                                                setTimeout(() => {
                                                    new Cleave("#ihoraCateterHemodialisis", {
                                                        time: true,
                                                        timePattern: ["h", "m"]
                                                    });
                                                }, 50);
                                            }
                                        })
                                    ]),

                                ),

                                m("td.tx-14.tx-normal[colspan='1']",
                                    m('div.d-flex', [
                                        m("input.form-control[id='rfechaCateterHemodialisis'][type='text'][placeholder='DD/MM/YYYY]", {
                                            oncreate: (el) => {
                                                setTimeout(() => {
                                                    new Cleave("#rfechaCateterHemodialisis", {
                                                        date: true,
                                                        datePattern: ["d", "m", "Y"]
                                                    });
                                                }, 50);
                                            }
                                        }),
                                        m("input.form-control[id='rhoraCateterHemodialisis'][type='text'][placeholder='hh:mm']", {
                                            oncreate: (el) => {
                                                setTimeout(() => {
                                                    new Cleave("#rhoraCateterHemodialisis", {
                                                        time: true,
                                                        timePattern: ["h", "m"]
                                                    });
                                                }, 50);
                                            }
                                        })
                                    ])

                                ),
                                m("td.tx-14.tx-normal[colspan='1']",
                                    m('div.d-flex', [
                                        m("input.form-control[id='cfechaCateterHemodialisis'][type='text'][placeholder='DD/MM/YYYY]", {
                                            oncreate: (el) => {
                                                setTimeout(() => {
                                                    new Cleave("#cfechaCateterHemodialisis", {
                                                        date: true,
                                                        datePattern: ["d", "m", "Y"]
                                                    });
                                                }, 50);
                                            }
                                        }),
                                        m("input.form-control[id='choraCateterHemodialisis'][type='text'][placeholder='hh:mm']", {
                                            oncreate: (el) => {
                                                setTimeout(() => {
                                                    new Cleave("#choraCateterHemodialisis", {
                                                        time: true,
                                                        timePattern: ["h", "m"]
                                                    });
                                                }, 50);
                                            }
                                        })
                                    ])

                                ),
                                m("td.tx-14.tx-normal[colspan='1']",
                                    m('div.d-flex', [
                                        m("input.form-control[id='cufechaCateterHemodialisis'][type='text'][placeholder='DD/MM/YYYY]", {
                                            oncreate: (el) => {
                                                setTimeout(() => {
                                                    new Cleave("#cufechaCateterHemodialisis", {
                                                        date: true,
                                                        datePattern: ["d", "m", "Y"]
                                                    });
                                                }, 50);
                                            }
                                        }),
                                        m("input.form-control[id='cuhoraCateterHemodialisis'][type='text'][placeholder='hh:mm']", {
                                            oncreate: (el) => {
                                                setTimeout(() => {
                                                    new Cleave("#cuhoraCateterHemodialisis", {
                                                        time: true,
                                                        timePattern: ["h", "m"]
                                                    });
                                                }, 50);
                                            }
                                        })
                                    ])

                                ),
                                m("td.tx-14.tx-normal[colspan='1']",
                                    m('select.tx-semibold', {
                                        onchange: (e) => {},
                                        class: "custom-select"
                                    }, m('option', 'Seleccione...'), ['VIA PERIFERICA PERMEABLE Y EN BUENAS CONDICIONES'].map(x =>
                                        m('option', x)
                                    ))
                                ),

                                m("td.tx-14.tx-normal[colspan='1']",
                                    m("input", {
                                        class: "form-control tx-semibold tx-14",
                                        type: "text",
                                        placeholder: "..."
                                    })
                                ),


                            ]),
                            m("tr", [

                                m("td.tx-14.tx-normal[colspan='3']",
                                    m("label.tx-semibold",
                                        "SONDA OROGASTRICA"
                                    )
                                ),
                                m("td.tx-14.tx-normal[colspan='1']",
                                    m('select.tx-semibold', {
                                        onchange: (e) => {},
                                        class: "custom-select"
                                    }, m('option', 'Seleccione...'), ['OROGASTRICA'].map(x =>
                                        m('option', x)
                                    ))
                                ),
                                m("td.tx-14.tx-normal[colspan='1']",
                                    m("input", {
                                        class: "form-control tx-semibold tx-14",
                                        type: "text",
                                        placeholder: "..."


                                    })
                                ),
                                m("td.tx-14.tx-normal[colspan='1']",
                                    m('div.d-flex', [
                                        m("input.form-control[id='ifechaCateterImplantable'][type='text'][placeholder='DD/MM/YYYY]", {
                                            oncreate: (el) => {
                                                setTimeout(() => {
                                                    new Cleave("#ifechaCateterImplantable", {
                                                        date: true,
                                                        datePattern: ["d", "m", "Y"]
                                                    });
                                                }, 50);
                                            }
                                        }),
                                        m("input.form-control[id='ihoraCateterImplantable'][type='text'][placeholder='hh:mm']", {
                                            oncreate: (el) => {
                                                setTimeout(() => {
                                                    new Cleave("#ihoraCateterImplantable", {
                                                        time: true,
                                                        timePattern: ["h", "m"]
                                                    });
                                                }, 50);
                                            }
                                        })
                                    ]),

                                ),

                                m("td.tx-14.tx-normal[colspan='1']",
                                    m('div.d-flex', [
                                        m("input.form-control[id='rfechaCateterImplantable'][type='text'][placeholder='DD/MM/YYYY]", {
                                            oncreate: (el) => {
                                                setTimeout(() => {
                                                    new Cleave("#rfechaCateterImplantable", {
                                                        date: true,
                                                        datePattern: ["d", "m", "Y"]
                                                    });
                                                }, 50);
                                            }
                                        }),
                                        m("input.form-control[id='rhoraCateterImplantable'][type='text'][placeholder='hh:mm']", {
                                            oncreate: (el) => {
                                                setTimeout(() => {
                                                    new Cleave("#rhoraCateterImplantable", {
                                                        time: true,
                                                        timePattern: ["h", "m"]
                                                    });
                                                }, 50);
                                            }
                                        })
                                    ])

                                ),
                                m("td.tx-14.tx-normal[colspan='1']",
                                    m('div.d-flex', [
                                        m("input.form-control[id='cfechaCateterImplantable'][type='text'][placeholder='DD/MM/YYYY]", {
                                            oncreate: (el) => {
                                                setTimeout(() => {
                                                    new Cleave("#cfechaCateterImplantable", {
                                                        date: true,
                                                        datePattern: ["d", "m", "Y"]
                                                    });
                                                }, 50);
                                            }
                                        }),
                                        m("input.form-control[id='choraCateterImplantable'][type='text'][placeholder='hh:mm']", {
                                            oncreate: (el) => {
                                                setTimeout(() => {
                                                    new Cleave("#choraCateterImplantable", {
                                                        time: true,
                                                        timePattern: ["h", "m"]
                                                    });
                                                }, 50);
                                            }
                                        })
                                    ])

                                ),
                                m("td.tx-14.tx-normal[colspan='1']",
                                    m('div.d-flex', [
                                        m("input.form-control[id='cufechaCateterImplantable'][type='text'][placeholder='DD/MM/YYYY]", {
                                            oncreate: (el) => {
                                                setTimeout(() => {
                                                    new Cleave("#cufechaCateterImplantable", {
                                                        date: true,
                                                        datePattern: ["d", "m", "Y"]
                                                    });
                                                }, 50);
                                            }
                                        }),
                                        m("input.form-control[id='cuhoraCateterImplantable'][type='text'][placeholder='hh:mm']", {
                                            oncreate: (el) => {
                                                setTimeout(() => {
                                                    new Cleave("#cuhoraCateterImplantable", {
                                                        time: true,
                                                        timePattern: ["h", "m"]
                                                    });
                                                }, 50);
                                            }
                                        })
                                    ])

                                ),
                                m("td.tx-14.tx-normal[colspan='1']",
                                    m('select.tx-semibold', {
                                        onchange: (e) => {},
                                        class: "custom-select"
                                    }, m('option', 'Seleccione...'), ['VIA PERIFERICA PERMEABLE Y EN BUENAS CONDICIONES'].map(x =>
                                        m('option', x)
                                    ))
                                ),

                                m("td.tx-14.tx-normal[colspan='1']",
                                    m("input", {
                                        class: "form-control tx-semibold tx-14",
                                        type: "text",
                                        placeholder: "..."
                                    })
                                ),

                            ]),
                            m("tr", [

                                m("td.tx-14.tx-normal[colspan='3']",
                                    m("label.tx-semibold",
                                        "SONDA VESICAL"
                                    )
                                ),
                                m("td.tx-14.tx-normal[colspan='1']",
                                    m('select.tx-semibold', {
                                        onchange: (e) => {},
                                        class: "custom-select"
                                    }, m('option', 'Seleccione...'), ['SONDA FOLEY'].map(x =>
                                        m('option', x)
                                    ))
                                ),
                                m("td.tx-14.tx-normal[colspan='1']",
                                    m("input", {
                                        class: "form-control tx-semibold tx-14",
                                        type: "text",
                                        placeholder: "..."


                                    })
                                ),
                                m("td.tx-14.tx-normal[colspan='1']",
                                    m('div.d-flex', [
                                        m("input.form-control[id='ifechaLineaArterial'][type='text'][placeholder='DD/MM/YYYY]", {
                                            oncreate: (el) => {
                                                setTimeout(() => {
                                                    new Cleave("#ifechaLineaArterial", {
                                                        date: true,
                                                        datePattern: ["d", "m", "Y"]
                                                    });
                                                }, 50);
                                            }
                                        }),
                                        m("input.form-control[id='ihoraLineaArterial'][type='text'][placeholder='hh:mm']", {
                                            oncreate: (el) => {
                                                setTimeout(() => {
                                                    new Cleave("#ihoraLineaArterial", {
                                                        time: true,
                                                        timePattern: ["h", "m"]
                                                    });
                                                }, 50);
                                            }
                                        })
                                    ]),

                                ),

                                m("td.tx-14.tx-normal[colspan='1']",
                                    m('div.d-flex', [
                                        m("input.form-control[id='rfechaLineaArterial'][type='text'][placeholder='DD/MM/YYYY]", {
                                            oncreate: (el) => {
                                                setTimeout(() => {
                                                    new Cleave("#rfechaLineaArterial", {
                                                        date: true,
                                                        datePattern: ["d", "m", "Y"]
                                                    });
                                                }, 50);
                                            }
                                        }),
                                        m("input.form-control[id='rhoraLineaArterial'][type='text'][placeholder='hh:mm']", {
                                            oncreate: (el) => {
                                                setTimeout(() => {
                                                    new Cleave("#rhoraLineaArterial", {
                                                        time: true,
                                                        timePattern: ["h", "m"]
                                                    });
                                                }, 50);
                                            }
                                        })
                                    ])

                                ),
                                m("td.tx-14.tx-normal[colspan='1']",
                                    m('div.d-flex', [
                                        m("input.form-control[id='cfechaLineaArterial'][type='text'][placeholder='DD/MM/YYYY]", {
                                            oncreate: (el) => {
                                                setTimeout(() => {
                                                    new Cleave("#cfechaLineaArterial", {
                                                        date: true,
                                                        datePattern: ["d", "m", "Y"]
                                                    });
                                                }, 50);
                                            }
                                        }),
                                        m("input.form-control[id='choraLineaArterial'][type='text'][placeholder='hh:mm']", {
                                            oncreate: (el) => {
                                                setTimeout(() => {
                                                    new Cleave("#choraLineaArterial", {
                                                        time: true,
                                                        timePattern: ["h", "m"]
                                                    });
                                                }, 50);
                                            }
                                        })
                                    ])

                                ),
                                m("td.tx-14.tx-normal[colspan='1']",
                                    m('div.d-flex', [
                                        m("input.form-control[id='cufechaLineaArterial'][type='text'][placeholder='DD/MM/YYYY]", {
                                            oncreate: (el) => {
                                                setTimeout(() => {
                                                    new Cleave("#cufechaLineaArterial", {
                                                        date: true,
                                                        datePattern: ["d", "m", "Y"]
                                                    });
                                                }, 50);
                                            }
                                        }),
                                        m("input.form-control[id='cuhoraLineaArterial'][type='text'][placeholder='hh:mm']", {
                                            oncreate: (el) => {
                                                setTimeout(() => {
                                                    new Cleave("#cuhoraLineaArterial", {
                                                        time: true,
                                                        timePattern: ["h", "m"]
                                                    });
                                                }, 50);
                                            }
                                        })
                                    ])

                                ),
                                m("td.tx-14.tx-normal[colspan='1']",
                                    m('select.tx-semibold', {
                                        onchange: (e) => {},
                                        class: "custom-select"
                                    }, m('option', 'Seleccione...'), ['VIA PERIFERICA PERMEABLE Y EN BUENAS CONDICIONES'].map(x =>
                                        m('option', x)
                                    ))
                                ),

                                m("td.tx-14.tx-normal[colspan='1']",
                                    m("input", {
                                        class: "form-control tx-semibold tx-14",
                                        type: "text",
                                        placeholder: "..."
                                    })
                                ),

                            ]),
                            m("tr", [

                                m("td.tx-14.tx-normal[colspan='3']",
                                    m("label.tx-semibold",
                                        "GASTROSTOMIA"
                                    )
                                ),
                                m("td.tx-14.tx-normal[colspan='1']",
                                    m('select.tx-semibold', {
                                        onchange: (e) => {},
                                        class: "custom-select"
                                    }, m('option', 'Seleccione...'), ['EPIGASTRIO'].map(x =>
                                        m('option', x)
                                    ))
                                ),
                                m("td.tx-14.tx-normal[colspan='1']",
                                    m("input", {
                                        class: "form-control tx-semibold tx-14",
                                        type: "text",
                                        placeholder: "..."


                                    })
                                ),
                                m("td.tx-14.tx-normal[colspan='1']",
                                    m('div.d-flex', [
                                        m("input.form-control[id='ifechaLineaArterial'][type='text'][placeholder='DD/MM/YYYY]", {
                                            oncreate: (el) => {
                                                setTimeout(() => {
                                                    new Cleave("#ifechaLineaArterial", {
                                                        date: true,
                                                        datePattern: ["d", "m", "Y"]
                                                    });
                                                }, 50);
                                            }
                                        }),
                                        m("input.form-control[id='ihoraLineaArterial'][type='text'][placeholder='hh:mm']", {
                                            oncreate: (el) => {
                                                setTimeout(() => {
                                                    new Cleave("#ihoraLineaArterial", {
                                                        time: true,
                                                        timePattern: ["h", "m"]
                                                    });
                                                }, 50);
                                            }
                                        })
                                    ]),

                                ),

                                m("td.tx-14.tx-normal[colspan='1']",
                                    m('div.d-flex', [
                                        m("input.form-control[id='rfechaLineaArterial'][type='text'][placeholder='DD/MM/YYYY]", {
                                            oncreate: (el) => {
                                                setTimeout(() => {
                                                    new Cleave("#rfechaLineaArterial", {
                                                        date: true,
                                                        datePattern: ["d", "m", "Y"]
                                                    });
                                                }, 50);
                                            }
                                        }),
                                        m("input.form-control[id='rhoraLineaArterial'][type='text'][placeholder='hh:mm']", {
                                            oncreate: (el) => {
                                                setTimeout(() => {
                                                    new Cleave("#rhoraLineaArterial", {
                                                        time: true,
                                                        timePattern: ["h", "m"]
                                                    });
                                                }, 50);
                                            }
                                        })
                                    ])

                                ),
                                m("td.tx-14.tx-normal[colspan='1']",
                                    m('div.d-flex', [
                                        m("input.form-control[id='cfechaLineaArterial'][type='text'][placeholder='DD/MM/YYYY]", {
                                            oncreate: (el) => {
                                                setTimeout(() => {
                                                    new Cleave("#cfechaLineaArterial", {
                                                        date: true,
                                                        datePattern: ["d", "m", "Y"]
                                                    });
                                                }, 50);
                                            }
                                        }),
                                        m("input.form-control[id='choraLineaArterial'][type='text'][placeholder='hh:mm']", {
                                            oncreate: (el) => {
                                                setTimeout(() => {
                                                    new Cleave("#choraLineaArterial", {
                                                        time: true,
                                                        timePattern: ["h", "m"]
                                                    });
                                                }, 50);
                                            }
                                        })
                                    ])

                                ),
                                m("td.tx-14.tx-normal[colspan='1']",
                                    m('div.d-flex', [
                                        m("input.form-control[id='cufechaLineaArterial'][type='text'][placeholder='DD/MM/YYYY]", {
                                            oncreate: (el) => {
                                                setTimeout(() => {
                                                    new Cleave("#cufechaLineaArterial", {
                                                        date: true,
                                                        datePattern: ["d", "m", "Y"]
                                                    });
                                                }, 50);
                                            }
                                        }),
                                        m("input.form-control[id='cuhoraLineaArterial'][type='text'][placeholder='hh:mm']", {
                                            oncreate: (el) => {
                                                setTimeout(() => {
                                                    new Cleave("#cuhoraLineaArterial", {
                                                        time: true,
                                                        timePattern: ["h", "m"]
                                                    });
                                                }, 50);
                                            }
                                        })
                                    ])

                                ),
                                m("td.tx-14.tx-normal[colspan='1']",
                                    m('select.tx-semibold', {
                                        onchange: (e) => {},
                                        class: "custom-select"
                                    }, m('option', 'Seleccione...'), ['VIA PERIFERICA PERMEABLE Y EN BUENAS CONDICIONES'].map(x =>
                                        m('option', x)
                                    ))
                                ),

                                m("td.tx-14.tx-normal[colspan='1']",
                                    m("input", {
                                        class: "form-control tx-semibold tx-14",
                                        type: "text",
                                        placeholder: "..."
                                    })
                                ),

                            ]),
                            m("tr", [

                                m("td.tx-14.tx-normal[colspan='3']",
                                    m("label.tx-semibold",
                                        "YEYUYOSTOMIA"
                                    )
                                ),
                                m("td.tx-14.tx-normal[colspan='1']",
                                    m('select.tx-semibold', {
                                        onchange: (e) => {},
                                        class: "custom-select"
                                    }, m('option', 'Seleccione...'), ['YEYUNO'].map(x =>
                                        m('option', x)
                                    ))
                                ),
                                m("td.tx-14.tx-normal[colspan='1']",
                                    m("input", {
                                        class: "form-control tx-semibold tx-14",
                                        type: "text",
                                        placeholder: "..."


                                    })
                                ),
                                m("td.tx-14.tx-normal[colspan='1']",
                                    m('div.d-flex', [
                                        m("input.form-control[id='ifechaLineaArterial'][type='text'][placeholder='DD/MM/YYYY]", {
                                            oncreate: (el) => {
                                                setTimeout(() => {
                                                    new Cleave("#ifechaLineaArterial", {
                                                        date: true,
                                                        datePattern: ["d", "m", "Y"]
                                                    });
                                                }, 50);
                                            }
                                        }),
                                        m("input.form-control[id='ihoraLineaArterial'][type='text'][placeholder='hh:mm']", {
                                            oncreate: (el) => {
                                                setTimeout(() => {
                                                    new Cleave("#ihoraLineaArterial", {
                                                        time: true,
                                                        timePattern: ["h", "m"]
                                                    });
                                                }, 50);
                                            }
                                        })
                                    ]),

                                ),

                                m("td.tx-14.tx-normal[colspan='1']",
                                    m('div.d-flex', [
                                        m("input.form-control[id='rfechaLineaArterial'][type='text'][placeholder='DD/MM/YYYY]", {
                                            oncreate: (el) => {
                                                setTimeout(() => {
                                                    new Cleave("#rfechaLineaArterial", {
                                                        date: true,
                                                        datePattern: ["d", "m", "Y"]
                                                    });
                                                }, 50);
                                            }
                                        }),
                                        m("input.form-control[id='rhoraLineaArterial'][type='text'][placeholder='hh:mm']", {
                                            oncreate: (el) => {
                                                setTimeout(() => {
                                                    new Cleave("#rhoraLineaArterial", {
                                                        time: true,
                                                        timePattern: ["h", "m"]
                                                    });
                                                }, 50);
                                            }
                                        })
                                    ])

                                ),
                                m("td.tx-14.tx-normal[colspan='1']",
                                    m('div.d-flex', [
                                        m("input.form-control[id='cfechaLineaArterial'][type='text'][placeholder='DD/MM/YYYY]", {
                                            oncreate: (el) => {
                                                setTimeout(() => {
                                                    new Cleave("#cfechaLineaArterial", {
                                                        date: true,
                                                        datePattern: ["d", "m", "Y"]
                                                    });
                                                }, 50);
                                            }
                                        }),
                                        m("input.form-control[id='choraLineaArterial'][type='text'][placeholder='hh:mm']", {
                                            oncreate: (el) => {
                                                setTimeout(() => {
                                                    new Cleave("#choraLineaArterial", {
                                                        time: true,
                                                        timePattern: ["h", "m"]
                                                    });
                                                }, 50);
                                            }
                                        })
                                    ])

                                ),
                                m("td.tx-14.tx-normal[colspan='1']",
                                    m('div.d-flex', [
                                        m("input.form-control[id='cufechaLineaArterial'][type='text'][placeholder='DD/MM/YYYY]", {
                                            oncreate: (el) => {
                                                setTimeout(() => {
                                                    new Cleave("#cufechaLineaArterial", {
                                                        date: true,
                                                        datePattern: ["d", "m", "Y"]
                                                    });
                                                }, 50);
                                            }
                                        }),
                                        m("input.form-control[id='cuhoraLineaArterial'][type='text'][placeholder='hh:mm']", {
                                            oncreate: (el) => {
                                                setTimeout(() => {
                                                    new Cleave("#cuhoraLineaArterial", {
                                                        time: true,
                                                        timePattern: ["h", "m"]
                                                    });
                                                }, 50);
                                            }
                                        })
                                    ])

                                ),
                                m("td.tx-14.tx-normal[colspan='1']",
                                    m('select.tx-semibold', {
                                        onchange: (e) => {},
                                        class: "custom-select"
                                    }, m('option', 'Seleccione...'), ['VIA PERIFERICA PERMEABLE Y EN BUENAS CONDICIONES'].map(x =>
                                        m('option', x)
                                    ))
                                ),

                                m("td.tx-14.tx-normal[colspan='1']",
                                    m("input", {
                                        class: "form-control tx-semibold tx-14",
                                        type: "text",
                                        placeholder: "..."
                                    })
                                ),

                            ]),
                            m("tr", [

                                m("td.tx-14.tx-normal[colspan='3']",
                                    m("label.tx-semibold",
                                        "MANGUERAS DE VELTILADOR"
                                    )
                                ),
                                m("td.tx-14.tx-normal[colspan='1']",
                                    m('select.tx-semibold', {
                                        onchange: (e) => {},
                                        class: "custom-select"
                                    }, m('option', 'Seleccione...'), ['NO APLICA'].map(x =>
                                        m('option', x)
                                    ))
                                ),
                                m("td.tx-14.tx-normal[colspan='1']",
                                    m("input", {
                                        class: "form-control tx-semibold tx-14",
                                        type: "text",
                                        placeholder: "..."


                                    })
                                ),
                                m("td.tx-14.tx-normal[colspan='1']",
                                    m('div.d-flex', [
                                        m("input.form-control[id='ifechaLineaArterial'][type='text'][placeholder='DD/MM/YYYY]", {
                                            oncreate: (el) => {
                                                setTimeout(() => {
                                                    new Cleave("#ifechaLineaArterial", {
                                                        date: true,
                                                        datePattern: ["d", "m", "Y"]
                                                    });
                                                }, 50);
                                            }
                                        }),
                                        m("input.form-control[id='ihoraLineaArterial'][type='text'][placeholder='hh:mm']", {
                                            oncreate: (el) => {
                                                setTimeout(() => {
                                                    new Cleave("#ihoraLineaArterial", {
                                                        time: true,
                                                        timePattern: ["h", "m"]
                                                    });
                                                }, 50);
                                            }
                                        })
                                    ]),

                                ),

                                m("td.tx-14.tx-normal[colspan='1']",
                                    m('div.d-flex', [
                                        m("input.form-control[id='rfechaLineaArterial'][type='text'][placeholder='DD/MM/YYYY]", {
                                            oncreate: (el) => {
                                                setTimeout(() => {
                                                    new Cleave("#rfechaLineaArterial", {
                                                        date: true,
                                                        datePattern: ["d", "m", "Y"]
                                                    });
                                                }, 50);
                                            }
                                        }),
                                        m("input.form-control[id='rhoraLineaArterial'][type='text'][placeholder='hh:mm']", {
                                            oncreate: (el) => {
                                                setTimeout(() => {
                                                    new Cleave("#rhoraLineaArterial", {
                                                        time: true,
                                                        timePattern: ["h", "m"]
                                                    });
                                                }, 50);
                                            }
                                        })
                                    ])

                                ),
                                m("td.tx-14.tx-normal[colspan='1']",
                                    m('div.d-flex', [
                                        m("input.form-control[id='cfechaLineaArterial'][type='text'][placeholder='DD/MM/YYYY]", {
                                            oncreate: (el) => {
                                                setTimeout(() => {
                                                    new Cleave("#cfechaLineaArterial", {
                                                        date: true,
                                                        datePattern: ["d", "m", "Y"]
                                                    });
                                                }, 50);
                                            }
                                        }),
                                        m("input.form-control[id='choraLineaArterial'][type='text'][placeholder='hh:mm']", {
                                            oncreate: (el) => {
                                                setTimeout(() => {
                                                    new Cleave("#choraLineaArterial", {
                                                        time: true,
                                                        timePattern: ["h", "m"]
                                                    });
                                                }, 50);
                                            }
                                        })
                                    ])

                                ),
                                m("td.tx-14.tx-normal[colspan='1']",
                                    m('div.d-flex', [
                                        m("input.form-control[id='cufechaLineaArterial'][type='text'][placeholder='DD/MM/YYYY]", {
                                            oncreate: (el) => {
                                                setTimeout(() => {
                                                    new Cleave("#cufechaLineaArterial", {
                                                        date: true,
                                                        datePattern: ["d", "m", "Y"]
                                                    });
                                                }, 50);
                                            }
                                        }),
                                        m("input.form-control[id='cuhoraLineaArterial'][type='text'][placeholder='hh:mm']", {
                                            oncreate: (el) => {
                                                setTimeout(() => {
                                                    new Cleave("#cuhoraLineaArterial", {
                                                        time: true,
                                                        timePattern: ["h", "m"]
                                                    });
                                                }, 50);
                                            }
                                        })
                                    ])

                                ),
                                m("td.tx-14.tx-normal[colspan='1']",
                                    m('select.tx-semibold', {
                                        onchange: (e) => {},
                                        class: "custom-select"
                                    }, m('option', 'Seleccione...'), ['VIA PERIFERICA PERMEABLE Y EN BUENAS CONDICIONES'].map(x =>
                                        m('option', x)
                                    ))
                                ),

                                m("td.tx-14.tx-normal[colspan='1']",
                                    m("input", {
                                        class: "form-control tx-semibold tx-14",
                                        type: "text",
                                        placeholder: "..."
                                    })
                                ),

                            ]),
                            m("tr", [

                                m("td.tx-14.tx-normal[colspan='3']",
                                    m("label.tx-semibold",
                                        "EQUIPOS DE NUTRICION ENTERAL "
                                    )
                                ),
                                m("td.tx-14.tx-normal[colspan='1']",
                                    m('select.tx-semibold', {
                                        onchange: (e) => {},
                                        class: "custom-select"
                                    }, m('option', 'Seleccione...'), ['NO APLICA'].map(x =>
                                        m('option', x)
                                    ))
                                ),
                                m("td.tx-14.tx-normal[colspan='1']",
                                    m("input", {
                                        class: "form-control tx-semibold tx-14",
                                        type: "text",
                                        placeholder: "..."


                                    })
                                ),
                                m("td.tx-14.tx-normal[colspan='1']",
                                    m('div.d-flex', [
                                        m("input.form-control[id='ifechaLineaArterial'][type='text'][placeholder='DD/MM/YYYY]", {
                                            oncreate: (el) => {
                                                setTimeout(() => {
                                                    new Cleave("#ifechaLineaArterial", {
                                                        date: true,
                                                        datePattern: ["d", "m", "Y"]
                                                    });
                                                }, 50);
                                            }
                                        }),
                                        m("input.form-control[id='ihoraLineaArterial'][type='text'][placeholder='hh:mm']", {
                                            oncreate: (el) => {
                                                setTimeout(() => {
                                                    new Cleave("#ihoraLineaArterial", {
                                                        time: true,
                                                        timePattern: ["h", "m"]
                                                    });
                                                }, 50);
                                            }
                                        })
                                    ]),

                                ),

                                m("td.tx-14.tx-normal[colspan='1']",
                                    m('div.d-flex', [
                                        m("input.form-control[id='rfechaLineaArterial'][type='text'][placeholder='DD/MM/YYYY]", {
                                            oncreate: (el) => {
                                                setTimeout(() => {
                                                    new Cleave("#rfechaLineaArterial", {
                                                        date: true,
                                                        datePattern: ["d", "m", "Y"]
                                                    });
                                                }, 50);
                                            }
                                        }),
                                        m("input.form-control[id='rhoraLineaArterial'][type='text'][placeholder='hh:mm']", {
                                            oncreate: (el) => {
                                                setTimeout(() => {
                                                    new Cleave("#rhoraLineaArterial", {
                                                        time: true,
                                                        timePattern: ["h", "m"]
                                                    });
                                                }, 50);
                                            }
                                        })
                                    ])

                                ),
                                m("td.tx-14.tx-normal[colspan='1']",
                                    m('div.d-flex', [
                                        m("input.form-control[id='cfechaLineaArterial'][type='text'][placeholder='DD/MM/YYYY]", {
                                            oncreate: (el) => {
                                                setTimeout(() => {
                                                    new Cleave("#cfechaLineaArterial", {
                                                        date: true,
                                                        datePattern: ["d", "m", "Y"]
                                                    });
                                                }, 50);
                                            }
                                        }),
                                        m("input.form-control[id='choraLineaArterial'][type='text'][placeholder='hh:mm']", {
                                            oncreate: (el) => {
                                                setTimeout(() => {
                                                    new Cleave("#choraLineaArterial", {
                                                        time: true,
                                                        timePattern: ["h", "m"]
                                                    });
                                                }, 50);
                                            }
                                        })
                                    ])

                                ),
                                m("td.tx-14.tx-normal[colspan='1']",
                                    m('div.d-flex', [
                                        m("input.form-control[id='cufechaLineaArterial'][type='text'][placeholder='DD/MM/YYYY]", {
                                            oncreate: (el) => {
                                                setTimeout(() => {
                                                    new Cleave("#cufechaLineaArterial", {
                                                        date: true,
                                                        datePattern: ["d", "m", "Y"]
                                                    });
                                                }, 50);
                                            }
                                        }),
                                        m("input.form-control[id='cuhoraLineaArterial'][type='text'][placeholder='hh:mm']", {
                                            oncreate: (el) => {
                                                setTimeout(() => {
                                                    new Cleave("#cuhoraLineaArterial", {
                                                        time: true,
                                                        timePattern: ["h", "m"]
                                                    });
                                                }, 50);
                                            }
                                        })
                                    ])

                                ),
                                m("td.tx-14.tx-normal[colspan='1']",
                                    m('select.tx-semibold', {
                                        onchange: (e) => {},
                                        class: "custom-select"
                                    }, m('option', 'Seleccione...'), ['VIA PERIFERICA PERMEABLE Y EN BUENAS CONDICIONES'].map(x =>
                                        m('option', x)
                                    ))
                                ),

                                m("td.tx-14.tx-normal[colspan='1']",
                                    m("input", {
                                        class: "form-control tx-semibold tx-14",
                                        type: "text",
                                        placeholder: "..."
                                    })
                                ),

                            ]),
                            m("tr", [

                                m("td.tx-14.tx-normal[colspan='3']",
                                    m("label.tx-semibold",
                                        "EQUIPOS DE NUTRICION PARENTERAL "
                                    )
                                ),
                                m("td.tx-14.tx-normal[colspan='1']",
                                    m('select.tx-semibold', {
                                        onchange: (e) => {},
                                        class: "custom-select"
                                    }, m('option', 'Seleccione...'), ['NO APLICA'].map(x =>
                                        m('option', x)
                                    ))
                                ),
                                m("td.tx-14.tx-normal[colspan='1']",
                                    m("input", {
                                        class: "form-control tx-semibold tx-14",
                                        type: "text",
                                        placeholder: "..."


                                    })
                                ),
                                m("td.tx-14.tx-normal[colspan='1']",
                                    m('div.d-flex', [
                                        m("input.form-control[id='ifechaLineaArterial'][type='text'][placeholder='DD/MM/YYYY]", {
                                            oncreate: (el) => {
                                                setTimeout(() => {
                                                    new Cleave("#ifechaLineaArterial", {
                                                        date: true,
                                                        datePattern: ["d", "m", "Y"]
                                                    });
                                                }, 50);
                                            }
                                        }),
                                        m("input.form-control[id='ihoraLineaArterial'][type='text'][placeholder='hh:mm']", {
                                            oncreate: (el) => {
                                                setTimeout(() => {
                                                    new Cleave("#ihoraLineaArterial", {
                                                        time: true,
                                                        timePattern: ["h", "m"]
                                                    });
                                                }, 50);
                                            }
                                        })
                                    ]),

                                ),

                                m("td.tx-14.tx-normal[colspan='1']",
                                    m('div.d-flex', [
                                        m("input.form-control[id='rfechaLineaArterial'][type='text'][placeholder='DD/MM/YYYY]", {
                                            oncreate: (el) => {
                                                setTimeout(() => {
                                                    new Cleave("#rfechaLineaArterial", {
                                                        date: true,
                                                        datePattern: ["d", "m", "Y"]
                                                    });
                                                }, 50);
                                            }
                                        }),
                                        m("input.form-control[id='rhoraLineaArterial'][type='text'][placeholder='hh:mm']", {
                                            oncreate: (el) => {
                                                setTimeout(() => {
                                                    new Cleave("#rhoraLineaArterial", {
                                                        time: true,
                                                        timePattern: ["h", "m"]
                                                    });
                                                }, 50);
                                            }
                                        })
                                    ])

                                ),
                                m("td.tx-14.tx-normal[colspan='1']",
                                    m('div.d-flex', [
                                        m("input.form-control[id='cfechaLineaArterial'][type='text'][placeholder='DD/MM/YYYY]", {
                                            oncreate: (el) => {
                                                setTimeout(() => {
                                                    new Cleave("#cfechaLineaArterial", {
                                                        date: true,
                                                        datePattern: ["d", "m", "Y"]
                                                    });
                                                }, 50);
                                            }
                                        }),
                                        m("input.form-control[id='choraLineaArterial'][type='text'][placeholder='hh:mm']", {
                                            oncreate: (el) => {
                                                setTimeout(() => {
                                                    new Cleave("#choraLineaArterial", {
                                                        time: true,
                                                        timePattern: ["h", "m"]
                                                    });
                                                }, 50);
                                            }
                                        })
                                    ])

                                ),
                                m("td.tx-14.tx-normal[colspan='1']",
                                    m('div.d-flex', [
                                        m("input.form-control[id='cufechaLineaArterial'][type='text'][placeholder='DD/MM/YYYY]", {
                                            oncreate: (el) => {
                                                setTimeout(() => {
                                                    new Cleave("#cufechaLineaArterial", {
                                                        date: true,
                                                        datePattern: ["d", "m", "Y"]
                                                    });
                                                }, 50);
                                            }
                                        }),
                                        m("input.form-control[id='cuhoraLineaArterial'][type='text'][placeholder='hh:mm']", {
                                            oncreate: (el) => {
                                                setTimeout(() => {
                                                    new Cleave("#cuhoraLineaArterial", {
                                                        time: true,
                                                        timePattern: ["h", "m"]
                                                    });
                                                }, 50);
                                            }
                                        })
                                    ])

                                ),
                                m("td.tx-14.tx-normal[colspan='1']",
                                    m('select.tx-semibold', {
                                        onchange: (e) => {},
                                        class: "custom-select"
                                    }, m('option', 'Seleccione...'), ['VIA PERIFERICA PERMEABLE Y EN BUENAS CONDICIONES'].map(x =>
                                        m('option', x)
                                    ))
                                ),

                                m("td.tx-14.tx-normal[colspan='1']",
                                    m("input", {
                                        class: "form-control tx-semibold tx-14",
                                        type: "text",
                                        placeholder: "..."
                                    })
                                ),

                            ]),
                            m("tr", [

                                m("td.tx-14.tx-normal[colspan='3']",
                                    m("label.tx-semibold",
                                        "MICROGOTEROS"
                                    )
                                ),
                                m("td.tx-14.tx-normal[colspan='1']",
                                    m('select.tx-semibold', {
                                        onchange: (e) => {},
                                        class: "custom-select"
                                    }, m('option', 'Seleccione...'), ['NO APLICA'].map(x =>
                                        m('option', x)
                                    ))
                                ),
                                m("td.tx-14.tx-normal[colspan='1']",
                                    m("input", {
                                        class: "form-control tx-semibold tx-14",
                                        type: "text",
                                        placeholder: "..."


                                    })
                                ),
                                m("td.tx-14.tx-normal[colspan='1']",
                                    m('div.d-flex', [
                                        m("input.form-control[id='ifechaLineaArterial'][type='text'][placeholder='DD/MM/YYYY]", {
                                            oncreate: (el) => {
                                                setTimeout(() => {
                                                    new Cleave("#ifechaLineaArterial", {
                                                        date: true,
                                                        datePattern: ["d", "m", "Y"]
                                                    });
                                                }, 50);
                                            }
                                        }),
                                        m("input.form-control[id='ihoraLineaArterial'][type='text'][placeholder='hh:mm']", {
                                            oncreate: (el) => {
                                                setTimeout(() => {
                                                    new Cleave("#ihoraLineaArterial", {
                                                        time: true,
                                                        timePattern: ["h", "m"]
                                                    });
                                                }, 50);
                                            }
                                        })
                                    ]),

                                ),

                                m("td.tx-14.tx-normal[colspan='1']",
                                    m('div.d-flex', [
                                        m("input.form-control[id='rfechaLineaArterial'][type='text'][placeholder='DD/MM/YYYY]", {
                                            oncreate: (el) => {
                                                setTimeout(() => {
                                                    new Cleave("#rfechaLineaArterial", {
                                                        date: true,
                                                        datePattern: ["d", "m", "Y"]
                                                    });
                                                }, 50);
                                            }
                                        }),
                                        m("input.form-control[id='rhoraLineaArterial'][type='text'][placeholder='hh:mm']", {
                                            oncreate: (el) => {
                                                setTimeout(() => {
                                                    new Cleave("#rhoraLineaArterial", {
                                                        time: true,
                                                        timePattern: ["h", "m"]
                                                    });
                                                }, 50);
                                            }
                                        })
                                    ])

                                ),
                                m("td.tx-14.tx-normal[colspan='1']",
                                    m('div.d-flex', [
                                        m("input.form-control[id='cfechaLineaArterial'][type='text'][placeholder='DD/MM/YYYY]", {
                                            oncreate: (el) => {
                                                setTimeout(() => {
                                                    new Cleave("#cfechaLineaArterial", {
                                                        date: true,
                                                        datePattern: ["d", "m", "Y"]
                                                    });
                                                }, 50);
                                            }
                                        }),
                                        m("input.form-control[id='choraLineaArterial'][type='text'][placeholder='hh:mm']", {
                                            oncreate: (el) => {
                                                setTimeout(() => {
                                                    new Cleave("#choraLineaArterial", {
                                                        time: true,
                                                        timePattern: ["h", "m"]
                                                    });
                                                }, 50);
                                            }
                                        })
                                    ])

                                ),
                                m("td.tx-14.tx-normal[colspan='1']",
                                    m('div.d-flex', [
                                        m("input.form-control[id='cufechaLineaArterial'][type='text'][placeholder='DD/MM/YYYY]", {
                                            oncreate: (el) => {
                                                setTimeout(() => {
                                                    new Cleave("#cufechaLineaArterial", {
                                                        date: true,
                                                        datePattern: ["d", "m", "Y"]
                                                    });
                                                }, 50);
                                            }
                                        }),
                                        m("input.form-control[id='cuhoraLineaArterial'][type='text'][placeholder='hh:mm']", {
                                            oncreate: (el) => {
                                                setTimeout(() => {
                                                    new Cleave("#cuhoraLineaArterial", {
                                                        time: true,
                                                        timePattern: ["h", "m"]
                                                    });
                                                }, 50);
                                            }
                                        })
                                    ])

                                ),
                                m("td.tx-14.tx-normal[colspan='1']",
                                    m('select.tx-semibold', {
                                        onchange: (e) => {},
                                        class: "custom-select"
                                    }, m('option', 'Seleccione...'), ['VIA PERIFERICA PERMEABLE Y EN BUENAS CONDICIONES'].map(x =>
                                        m('option', x)
                                    ))
                                ),

                                m("td.tx-14.tx-normal[colspan='1']",
                                    m("input", {
                                        class: "form-control tx-semibold tx-14",
                                        type: "text",
                                        placeholder: "..."
                                    })
                                ),

                            ]),
                            m("tr", [

                                m("td.tx-14.tx-normal[colspan='3']",
                                    m("label.tx-semibold",
                                        "EQUIPO DE VENOCLISIS"
                                    )
                                ),
                                m("td.tx-14.tx-normal[colspan='1']",
                                    m('select.tx-semibold', {
                                        onchange: (e) => {},
                                        class: "custom-select"
                                    }, m('option', 'Seleccione...'), ['NO APLICA'].map(x =>
                                        m('option', x)
                                    ))
                                ),
                                m("td.tx-14.tx-normal[colspan='1']",
                                    m("input", {
                                        class: "form-control tx-semibold tx-14",
                                        type: "text",
                                        placeholder: "..."


                                    })
                                ),
                                m("td.tx-14.tx-normal[colspan='1']",
                                    m('div.d-flex', [
                                        m("input.form-control[id='ifechaLineaArterial'][type='text'][placeholder='DD/MM/YYYY]", {
                                            oncreate: (el) => {
                                                setTimeout(() => {
                                                    new Cleave("#ifechaLineaArterial", {
                                                        date: true,
                                                        datePattern: ["d", "m", "Y"]
                                                    });
                                                }, 50);
                                            }
                                        }),
                                        m("input.form-control[id='ihoraLineaArterial'][type='text'][placeholder='hh:mm']", {
                                            oncreate: (el) => {
                                                setTimeout(() => {
                                                    new Cleave("#ihoraLineaArterial", {
                                                        time: true,
                                                        timePattern: ["h", "m"]
                                                    });
                                                }, 50);
                                            }
                                        })
                                    ]),

                                ),

                                m("td.tx-14.tx-normal[colspan='1']",
                                    m('div.d-flex', [
                                        m("input.form-control[id='rfechaLineaArterial'][type='text'][placeholder='DD/MM/YYYY]", {
                                            oncreate: (el) => {
                                                setTimeout(() => {
                                                    new Cleave("#rfechaLineaArterial", {
                                                        date: true,
                                                        datePattern: ["d", "m", "Y"]
                                                    });
                                                }, 50);
                                            }
                                        }),
                                        m("input.form-control[id='rhoraLineaArterial'][type='text'][placeholder='hh:mm']", {
                                            oncreate: (el) => {
                                                setTimeout(() => {
                                                    new Cleave("#rhoraLineaArterial", {
                                                        time: true,
                                                        timePattern: ["h", "m"]
                                                    });
                                                }, 50);
                                            }
                                        })
                                    ])

                                ),
                                m("td.tx-14.tx-normal[colspan='1']",
                                    m('div.d-flex', [
                                        m("input.form-control[id='cfechaLineaArterial'][type='text'][placeholder='DD/MM/YYYY]", {
                                            oncreate: (el) => {
                                                setTimeout(() => {
                                                    new Cleave("#cfechaLineaArterial", {
                                                        date: true,
                                                        datePattern: ["d", "m", "Y"]
                                                    });
                                                }, 50);
                                            }
                                        }),
                                        m("input.form-control[id='choraLineaArterial'][type='text'][placeholder='hh:mm']", {
                                            oncreate: (el) => {
                                                setTimeout(() => {
                                                    new Cleave("#choraLineaArterial", {
                                                        time: true,
                                                        timePattern: ["h", "m"]
                                                    });
                                                }, 50);
                                            }
                                        })
                                    ])

                                ),
                                m("td.tx-14.tx-normal[colspan='1']",
                                    m('div.d-flex', [
                                        m("input.form-control[id='cufechaLineaArterial'][type='text'][placeholder='DD/MM/YYYY]", {
                                            oncreate: (el) => {
                                                setTimeout(() => {
                                                    new Cleave("#cufechaLineaArterial", {
                                                        date: true,
                                                        datePattern: ["d", "m", "Y"]
                                                    });
                                                }, 50);
                                            }
                                        }),
                                        m("input.form-control[id='cuhoraLineaArterial'][type='text'][placeholder='hh:mm']", {
                                            oncreate: (el) => {
                                                setTimeout(() => {
                                                    new Cleave("#cuhoraLineaArterial", {
                                                        time: true,
                                                        timePattern: ["h", "m"]
                                                    });
                                                }, 50);
                                            }
                                        })
                                    ])

                                ),
                                m("td.tx-14.tx-normal[colspan='1']",
                                    m('select.tx-semibold', {
                                        onchange: (e) => {},
                                        class: "custom-select"
                                    }, m('option', 'Seleccione...'), ['VIA PERIFERICA PERMEABLE Y EN BUENAS CONDICIONES'].map(x =>
                                        m('option', x)
                                    ))
                                ),

                                m("td.tx-14.tx-normal[colspan='1']",
                                    m("input", {
                                        class: "form-control tx-semibold tx-14",
                                        type: "text",
                                        placeholder: "..."
                                    })
                                ),

                            ]),



                        ]),
                        m("thead",

                            m("tr.tx-uppercase", {
                                style: { "background-color": "#CCCCFF" },
                                class: (TurnosUci.nuevoTurno !== null && TurnosUci.nuevoTurno.gestion == 1 ? '' : 'd-none')

                            }, [
                                m("th.tx-semibold[scope='col'][colspan='12']",
                                    "CATETER URINARIO:"
                                ),

                            ])
                        ),
                        m("thead",

                            m("tr.tx-uppercase", {
                                style: { "background-color": "#CCCCFF" },
                                class: (TurnosUci.nuevoTurno !== null && TurnosUci.nuevoTurno.gestion == 1 ? '' : 'd-none')

                            }, [
                                m("th.tx-semibold[scope='col'][colspan='12']",
                                    "MANEJO DE VENTILACION:"
                                ),

                            ])
                        ),
                        m("thead",

                            m("tr.tx-uppercase", {
                                style: { "background-color": "#CCCCFF" },
                                class: (TurnosUci.nuevoTurno !== null && TurnosUci.nuevoTurno.gestion == 1 ? '' : 'd-none')

                            }, [
                                m("th.tx-semibold[scope='col'][colspan='12']",
                                    "CATETER VIA CENTRAL O HEMODIALISIS:"
                                ),

                            ])
                        ),
                        m("thead",

                            m("tr.tx-uppercase", {
                                style: { "background-color": "#CCCCFF" },
                                class: (TurnosUci.nuevoTurno !== null && TurnosUci.nuevoTurno.gestion == 1 ? '' : 'd-none')

                            }, [
                                m("th.tx-semibold[scope='col'][colspan='12']",
                                    "CULTIVOS:"
                                ),

                            ])
                        ),
                        m("thead",

                            m("tr.tx-uppercase", {
                                style: { "background-color": "#CCCCFF" },
                                class: (TurnosUci.nuevoTurno !== null && TurnosUci.nuevoTurno.gestion == 1 ? '' : 'd-none')

                            }, [
                                m("th.tx-semibold[scope='col'][colspan='12']",
                                    "CULTIVOS:"
                                ),

                            ])
                        ),
                        m("thead",

                            m("tr.tx-uppercase", {
                                style: { "background-color": "#CCCCFF" },
                                class: (TurnosUci.nuevoTurno !== null && TurnosUci.nuevoTurno.gestion == 1 ? '' : 'd-none')

                            }, [
                                m("th.tx-semibold[scope='col'][colspan='12']",
                                    "MODOS VENTILATORIOS / VARIABLES:"
                                ),

                            ])
                        ),







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

    static arqTableTurnos() {
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
            order: [
                [0, 'desc']
            ],
            columns: [{
                    title: "N° : ",
                },
                {
                    title: "Fecha Turno:",
                },
                {
                    title: "Usuario Turno:",
                },
                {
                    title: "Paciente:",
                },

                {
                    title: "Especialidad:",
                },
                {
                    title: "Status:",
                },

                {
                    title: "Opciones:",
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
                    orderable: true,
                },
                {
                    mRender: function(data, type, full) {
                        return full.fechaTurno;
                    },

                    visible: true,
                    aTargets: [1],
                    orderable: true,

                },
                {
                    mRender: function(data, type, full) {
                        return full.usuarioTurno;
                    },
                    visible: true,
                    aTargets: [2],
                    orderable: true,

                },
                {
                    mRender: function(data, type, full) {
                        return full.paciente;
                    },
                    visible: true,
                    aTargets: [3],
                    orderable: true,
                },
                {
                    mRender: function(data, type, full) {
                        return full.especialidad;
                    },
                    visible: true,
                    aTargets: [4],
                    orderable: true,


                },
                {
                    fnCreatedCell: function(nTd, sData, oData, iRow, iCol) {
                        return m.mount(nTd, {
                            view: () => {
                                return [
                                    m('div.text-center', [
                                        m("button.btn-xs.btn-block[type='button']", {

                                                class: (oData.status == 1 ? 'bg-warning' : 'bg-success'),

                                            },
                                            (oData.status == 1 ? 'Turno Abierto' : 'Turno Cerado'),
                                        ),

                                    ])

                                ]
                            }
                        });
                    },
                    visible: true,
                    aTargets: [5],
                    orderable: true,
                },
                {
                    fnCreatedCell: function(nTd, sData, oData, iRow, iCol) {
                        return m.mount(nTd, {
                            view: () => {
                                return [
                                    m('div.text-center', [
                                        m("button.btn.btn-xs.btn-block.btn-success[type='button']", {
                                                onclick: () => {
                                                    oData.iniciarGestion();
                                                },
                                            },
                                            'Gestionar',
                                        ),


                                    ])

                                ]
                            }
                        });
                    },
                    visible: true,
                    aTargets: [6],
                    orderable: true,

                },
                {
                    fnCreatedCell: function(nTd, sData, oData, iRow, iCol) {
                        return m.mount(nTd, {
                            view: () => {
                                return [
                                    m('div.text-center', [

                                        m("button.btn.btn-xs.btn-block.btn-danger[type='button']", {
                                                onclick: () => {
                                                    oData.cerrarTurno();
                                                },
                                            },
                                            'Cerrar',
                                        ),

                                    ])

                                ]
                            }
                        });
                    },
                    visible: true,
                    aTargets: [7],
                    orderable: true,

                }


            ],
            fnRowCallback: function(nRow, aData, iDisplayIndex, iDisplayIndexFull) {

            },
        };
    }

    static vReloadTable(idTable, _data) {
        $('#' + idTable).DataTable().clear().rows.add(_data).draw();
    }

    static vTableTurnos(idTable, dataTable, arqTable) {
        return [
            m(TableUCI, { idTable: idTable, dataTable: dataTable, arqTable: arqTable })
        ]
    }
    static vTableUsuarios(idTable, dataTable, arqTable) {
        return [
            m(TableUCI, { idTable: idTable, dataTable: dataTable, arqTable: arqTable })
        ]
    }
    static page() {
        return [
            PacientesUCI.vHeader(),
            PacientesUCI.vMainProfile()
        ];
    }
}


export default PacientesUCI;