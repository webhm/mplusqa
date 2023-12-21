import m from "mithril";
import App from "../../../models/App";
import HeaderPrivate from "../../layout/headerPrivate";
import Sidebar from "../sidebarUci";
import Loader from "../../utils/loader";
import Errors from "../../utils/errors";
import TableUCI from "../../utils/tableUci";
import ApiHTTP from "../../../models/ApiHTTP";
import TurnosUci from "./turnosUci";
import ViasUci from "./viasUci";
import AccesosUci from "./accesosUci";
import CateterUci from "./catetarUci";
import VentilcacionUci from "./ventilacionUci";
import HemodialisisUci from "./hemodialisis";
import CultivosUci from "./cultivosUci";
import CuidadosUci from "./cuidados";


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
                                onclick: () => {
                                    CuidadosUci.show = !CuidadosUci.show;
                                },
                                class: (TurnosUci.nuevoTurno !== null && TurnosUci.nuevoTurno.gestion == 1 ? '' : 'd-none')
                            }, [
                                m("th.tx-semibold[scope='col'][colspan='12']",
                                    "CUIDADOS GENERALES: "
                                ),

                            ])
                        ),

                        m("tbody", {
                            class: (CuidadosUci.show ? '' : 'd-none')

                        }, [
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
                        // Vias
                        m("thead",

                            m("tr.tx-uppercase", {
                                onclick: () => {
                                    ViasUci.show = !ViasUci.show;
                                },
                                style: { "background-color": "#CCCCFF" },
                                class: (TurnosUci.nuevoTurno !== null && TurnosUci.nuevoTurno.gestion == 1 ? '' : 'd-none')

                            }, [
                                m("th.tx-semibold[scope='col'][colspan='12']",
                                    "VIAS:"
                                ),

                            ])
                        ),
                        m('thead', {
                            class: (ViasUci.show ? '' : 'd-none')
                        }, [

                            m("tr.tx-uppercase", {
                                style: { "background-color": "#eaeff5" }
                            }, [
                                m("th[colspan='6']",
                                    "VIA: "
                                ),
                                m("th[colspan='6']",
                                    ""
                                ),


                            ]),

                        ]),
                        m("tbody", {
                            class: (ViasUci.show ? '' : 'd-none')
                        }, [

                            m('tr', [
                                m("td.tx-14.tx-normal[colspan='4']",
                                    m('select.tx-semibold', {
                                        onchange: (e) => {
                                            let _id = e.target.options[e.target.selectedIndex].id;
                                            let _value = e.target.options[e.target.selectedIndex].value;
                                            ViasUci.iniciarRegistro();
                                            ViasUci.nuevoRegistro.id = _id;
                                            ViasUci.nuevoRegistro.via = _value;
                                        },
                                        class: "custom-select"
                                    }, m('option', 'Seleccione...'), [{
                                        id: "ViaPeriferica",
                                        label: "VIA PERIFERICA"
                                    }, {
                                        id: "CateterYugular",
                                        label: "CATETER YUGULAR"
                                    }].map(x =>
                                        m('option[id="' + x.id + '"]', x.label)
                                    ))
                                ),
                                m("td[colspan='8']"),
                            ]),

                        ]),
                        m("tbody", {
                            class: (ViasUci.show ? '' : 'd-none')
                        }, [



                            m("tr.tx-uppercase", {
                                style: { "background-color": "#eaeff5" }
                            }, [

                                m("th[scope='col'][colspan='2']",
                                    "UBICACIÓN: "
                                ),
                                m("th[scope='col'][colspan='2']",
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
                                m("th[scope='col'][colspan='3']",
                                    "OBSERVACIÓN: "
                                ),

                            ]),
                            m("tr", [

                                m("td.tx-10.tx-normal[colspan='2']",
                                    (ViasUci.nuevoRegistro !== null ? [
                                        m('select.tx-semibold', {
                                            id: "ubicacion" + ViasUci.nuevoRegistro.id,
                                            onchange: (e) => {
                                                let _value = e.target.options[e.target.selectedIndex].value;
                                                ViasUci.nuevoRegistro.ubicacion = _value;
                                                console.log(ViasUci.nuevoRegistro)
                                            },
                                            class: "custom-select"
                                        }, m('option', 'Seleccione...'), ['IZQUIERDA', 'DERECHA'].map(x =>
                                            m('option', x)
                                        ))
                                    ] : [])


                                ),
                                m("td.tx-14.tx-normal[colspan='2']",
                                    (ViasUci.nuevoRegistro !== null ? [
                                        m("input", {
                                            id: "tipo" + ViasUci.nuevoRegistro.id,
                                            class: "form-control tx-semibold tx-14",
                                            type: "text",
                                            placeholder: "...",
                                            oninput: (e) => {
                                                ViasUci.nuevoRegistro.tipo = e.target.value;
                                            }
                                        })
                                    ] : [])
                                ),
                                m("td.tx-14.tx-normal[colspan='1']",
                                    (ViasUci.nuevoRegistro !== null ? [
                                        m('div.d-flex', [
                                            m("input.form-control[type='text'][placeholder='DD/MM/YYYY]", {
                                                id: "ifecha" + ViasUci.nuevoRegistro.id,
                                                oncreate: (el) => {
                                                    setTimeout(() => {
                                                        new Cleave("#ifecha" + ViasUci.nuevoRegistro.id, {
                                                            date: true,
                                                            datePattern: ["d", "m", "Y"]
                                                        });
                                                    }, 50);
                                                },
                                                oninput: (e) => {
                                                    setTimeout(() => {
                                                        ViasUci.nuevoRegistro.inicio = e.target.value;
                                                    }, 50);
                                                },
                                            }),
                                            m("input.form-control[type='text'][placeholder='hh:mm']", {
                                                id: "ihora" + ViasUci.nuevoRegistro.id,
                                                oncreate: (el) => {
                                                    setTimeout(() => {
                                                        new Cleave("#ihora" + ViasUci.nuevoRegistro.id, {
                                                            time: true,
                                                            timePattern: ["h", "m"]
                                                        });
                                                    }, 50);
                                                },
                                                oninput: (e) => {
                                                    setTimeout(() => {
                                                        ViasUci.nuevoRegistro.inicio = e.target.value;
                                                    }, 50);
                                                },
                                            })
                                        ]),
                                    ] : [])
                                ),
                                m("td.tx-14.tx-normal[colspan='1']",

                                    (ViasUci.nuevoRegistro !== null ? [
                                        m('div.d-flex', [
                                            m("input.form-control[type='text'][placeholder='DD/MM/YYYY]", {
                                                id: "rfecha" + ViasUci.nuevoRegistro.id,
                                                oncreate: (el) => {
                                                    setTimeout(() => {
                                                        new Cleave("#rfecha" + ViasUci.nuevoRegistro.id, {
                                                            date: true,
                                                            datePattern: ["d", "m", "Y"]
                                                        });
                                                    }, 50);
                                                },
                                                oninput: (e) => {
                                                    setTimeout(() => {
                                                        ViasUci.nuevoRegistro.retiro = e.target.value;
                                                    }, 50);
                                                },
                                            }),
                                            m("input.form-control[type='text'][placeholder='hh:mm']", {
                                                id: "rHora" + ViasUci.nuevoRegistro.id,
                                                oncreate: (el) => {
                                                    setTimeout(() => {
                                                        new Cleave("#rHora" + ViasUci.nuevoRegistro.id, {
                                                            time: true,
                                                            timePattern: ["h", "m"]
                                                        });
                                                    }, 50);
                                                }
                                            })
                                        ])


                                    ] : [])


                                ),
                                m("td.tx-14.tx-normal[colspan='1']",

                                    (ViasUci.nuevoRegistro !== null ? [
                                        m('div.d-flex', [
                                            m("input.form-control[type='text'][placeholder='DD/MM/YYYY]", {
                                                id: "cfecha" + ViasUci.nuevoRegistro.id,
                                                oncreate: (el) => {
                                                    setTimeout(() => {
                                                        new Cleave("#cfecha" + ViasUci.nuevoRegistro.id, {
                                                            date: true,
                                                            datePattern: ["d", "m", "Y"]
                                                        });
                                                    }, 50);
                                                },
                                                oninput: (e) => {
                                                    setTimeout(() => {
                                                        ViasUci.nuevoRegistro.cambio = e.target.value;
                                                    }, 50);
                                                },
                                            }),
                                            m("input.form-control[type='text'][placeholder='hh:mm']", {
                                                id: "chora" + ViasUci.nuevoRegistro.id,
                                                oncreate: (el) => {
                                                    setTimeout(() => {
                                                        new Cleave("#chora" + ViasUci.nuevoRegistro.id, {
                                                            time: true,
                                                            timePattern: ["h", "m"]
                                                        });
                                                    }, 50);
                                                }
                                            })
                                        ])
                                    ] : [

                                    ])



                                ),
                                m("td.tx-14.tx-normal[colspan='1']",

                                    (ViasUci.nuevoRegistro !== null ? [
                                        m('div.d-flex', [
                                            m("input.form-control[type='text'][placeholder='DD/MM/YYYY]", {
                                                id: "cufecha" + ViasUci.nuevoRegistro.id,
                                                oncreate: (el) => {
                                                    setTimeout(() => {
                                                        new Cleave("#cufecha" + ViasUci.nuevoRegistro.id, {
                                                            date: true,
                                                            datePattern: ["d", "m", "Y"]
                                                        });
                                                    }, 50);
                                                },
                                                oninput: (e) => {
                                                    setTimeout(() => {
                                                        ViasUci.nuevoRegistro.curacion = e.target.value;
                                                    }, 50);
                                                },
                                            }),
                                            m("input.form-control[type='text'][placeholder='hh:mm']", {
                                                id: "cuhora" + ViasUci.nuevoRegistro.id,
                                                oncreate: (el) => {
                                                    setTimeout(() => {
                                                        new Cleave("#cuhora" + ViasUci.nuevoRegistro.id, {
                                                            time: true,
                                                            timePattern: ["h", "m"]
                                                        });
                                                    }, 50);
                                                }
                                            })
                                        ])
                                    ] : [])


                                ),
                                m("td.tx-14.tx-normal[colspan='2']",
                                    (ViasUci.nuevoRegistro !== null ? [
                                        m('select.tx-semibold', {
                                            id: "condicion" + ViasUci.nuevoRegistro.id,
                                            onchange: (e) => {
                                                let _value = e.target.options[e.target.selectedIndex].value;
                                                ViasUci.nuevoRegistro.condicion = _value;
                                            },
                                            class: "custom-select"
                                        }, m('option', 'Seleccione...'), ['VIA PERIFERICA PERMEABLE Y EN BUENAS CONDICIONES'].map(x =>
                                            m('option', x)
                                        ))
                                    ] : [])


                                ),
                                m("td.tx-14.tx-normal[colspan='2']",
                                    (ViasUci.nuevoRegistro !== null ? [
                                        m("input", {
                                            id: "observacion" + ViasUci.nuevoRegistro.id,
                                            class: "form-control tx-semibold tx-14",
                                            type: "text",
                                            placeholder: "...",

                                            onkeypress: (e) => {
                                                if (e.keyCode == 13) {
                                                    ViasUci.agregarRegistro();
                                                    PacientesUCI.vReloadTable('table-vias', ViasUci.getRegistros());
                                                    ViasUci.nuevoRegistro = null;
                                                }
                                            },
                                            oninput: (e) => {
                                                ViasUci.nuevoRegistro.observacion = e.target.value;
                                            },
                                        })
                                    ] : [])
                                ),
                            ]),
                            m("tr.tx-uppercase", {
                                style: { "background-color": "#eaeff5" }
                            }, [
                                m("th[scope='col'][colspan='12']",
                                    "Registros: "
                                ),
                            ]),
                            m("tr.tx-uppercase.mg-t-20", [
                                m("td[colspan='12']",
                                    PacientesUCI.vTableVias('table-vias', ViasUci.getRegistros(), PacientesUCI.arqTableVias())
                                ),
                            ]),
                        ]),
                        //Accesos
                        m("thead",

                            m("tr.tx-uppercase", {
                                onclick: () => {
                                    AccesosUci.show = !AccesosUci.show;
                                },
                                style: { "background-color": "#CCCCFF" },
                                class: (TurnosUci.nuevoTurno !== null && TurnosUci.nuevoTurno.gestion == 1 ? '' : 'd-none')

                            }, [
                                m("th.tx-semibold[scope='col'][colspan='12']",
                                    "ACCESOS:"
                                ),

                            ])
                        ),
                        m('thead', {
                            class: (AccesosUci.show ? '' : 'd-none')
                        }, [

                            m("tr.tx-uppercase", {
                                style: { "background-color": "#eaeff5" }
                            }, [
                                m("th[colspan='6']",
                                    "ACCESO: "
                                ),
                                m("th[colspan='6']",
                                    ""
                                ),


                            ]),

                        ]),
                        m("tbody", {
                            class: (AccesosUci.show ? '' : 'd-none')
                        }, [

                            m('tr', [
                                m("td.tx-14.tx-normal[colspan='4']",
                                    m('select.tx-semibold', {
                                        onchange: (e) => {
                                            let _id = e.target.options[e.target.selectedIndex].id;
                                            let _value = e.target.options[e.target.selectedIndex].value;
                                            AccesosUci.iniciarRegistro();
                                            AccesosUci.nuevoRegistro.id = _id;
                                            AccesosUci.nuevoRegistro.acceso = _value;
                                        },
                                        class: "custom-select"
                                    }, m('option', 'Seleccione...'), [{
                                        id: "CateterIntracreneal",
                                        label: "CATETER INTRACRANEAL"
                                    }, {
                                        id: "AccesoIntraOseo",
                                        label: "ACCESO INTRA-OSEO"
                                    }].map(x =>
                                        m('option[id="' + x.id + '"]', x.label)
                                    ))
                                ),
                                m("td[colspan='8']"),
                            ]),

                        ]),
                        m("tbody", {
                            class: (AccesosUci.show ? '' : 'd-none')
                        }, [



                            m("tr.tx-uppercase", {
                                style: { "background-color": "#eaeff5" }
                            }, [

                                m("th[scope='col'][colspan='2']",
                                    "UBICACIÓN: "
                                ),
                                m("th[scope='col'][colspan='2']",
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
                                m("th[scope='col'][colspan='3']",
                                    "OBSERVACIÓN: "
                                ),

                            ]),
                            m("tr", [

                                m("td.tx-10.tx-normal[colspan='2']",
                                    (AccesosUci.nuevoRegistro !== null ? [
                                        m('select.tx-semibold', {
                                            id: "ubicacion" + AccesosUci.nuevoRegistro.id,
                                            onchange: (e) => {
                                                let _value = e.target.options[e.target.selectedIndex].value;
                                                AccesosUci.nuevoRegistro.ubicacion = _value;
                                                console.log(AccesosUci.nuevoRegistro)
                                            },
                                            class: "custom-select"
                                        }, m('option', 'Seleccione...'), ['SUBDURAL', 'TIBIAL'].map(x =>
                                            m('option', x)
                                        ))
                                    ] : [])


                                ),
                                m("td.tx-14.tx-normal[colspan='2']",
                                    (AccesosUci.nuevoRegistro !== null ? [
                                        m("input", {
                                            id: "tipo" + AccesosUci.nuevoRegistro.id,
                                            class: "form-control tx-semibold tx-14",
                                            type: "text",
                                            placeholder: "...",
                                            oninput: (e) => {
                                                AccesosUci.nuevoRegistro.tipo = e.target.value;
                                            }
                                        })
                                    ] : [])
                                ),
                                m("td.tx-14.tx-normal[colspan='1']",
                                    (AccesosUci.nuevoRegistro !== null ? [
                                        m('div.d-flex', [
                                            m("input.form-control[type='text'][placeholder='DD/MM/YYYY]", {
                                                id: "ifecha" + AccesosUci.nuevoRegistro.id,
                                                oncreate: (el) => {
                                                    setTimeout(() => {
                                                        new Cleave("#ifecha" + AccesosUci.nuevoRegistro.id, {
                                                            date: true,
                                                            datePattern: ["d", "m", "Y"]
                                                        });
                                                    }, 50);
                                                },
                                                oninput: (e) => {
                                                    setTimeout(() => {
                                                        AccesosUci.nuevoRegistro.inicio = e.target.value;
                                                    }, 50);
                                                },
                                            }),
                                            m("input.form-control[type='text'][placeholder='hh:mm']", {
                                                id: "ihora" + AccesosUci.nuevoRegistro.id,
                                                oncreate: (el) => {
                                                    setTimeout(() => {
                                                        new Cleave("#ihora" + AccesosUci.nuevoRegistro.id, {
                                                            time: true,
                                                            timePattern: ["h", "m"]
                                                        });
                                                    }, 50);
                                                },
                                                oninput: (e) => {
                                                    setTimeout(() => {
                                                        AccesosUci.nuevoRegistro.inicio = e.target.value;
                                                    }, 50);
                                                },
                                            })
                                        ]),
                                    ] : [])
                                ),
                                m("td.tx-14.tx-normal[colspan='1']",

                                    (AccesosUci.nuevoRegistro !== null ? [
                                        m('div.d-flex', [
                                            m("input.form-control[type='text'][placeholder='DD/MM/YYYY]", {
                                                id: "rfecha" + AccesosUci.nuevoRegistro.id,
                                                oncreate: (el) => {
                                                    setTimeout(() => {
                                                        new Cleave("#rfecha" + AccesosUci.nuevoRegistro.id, {
                                                            date: true,
                                                            datePattern: ["d", "m", "Y"]
                                                        });
                                                    }, 50);
                                                },
                                                oninput: (e) => {
                                                    setTimeout(() => {
                                                        AccesosUci.nuevoRegistro.retiro = e.target.value;
                                                    }, 50);
                                                },
                                            }),
                                            m("input.form-control[type='text'][placeholder='hh:mm']", {
                                                id: "rHora" + AccesosUci.nuevoRegistro.id,
                                                oncreate: (el) => {
                                                    setTimeout(() => {
                                                        new Cleave("#rHora" + AccesosUci.nuevoRegistro.id, {
                                                            time: true,
                                                            timePattern: ["h", "m"]
                                                        });
                                                    }, 50);
                                                }
                                            })
                                        ])


                                    ] : [])


                                ),
                                m("td.tx-14.tx-normal[colspan='1']",

                                    (AccesosUci.nuevoRegistro !== null ? [
                                        m('div.d-flex', [
                                            m("input.form-control[type='text'][placeholder='DD/MM/YYYY]", {
                                                id: "cfecha" + AccesosUci.nuevoRegistro.id,
                                                oncreate: (el) => {
                                                    setTimeout(() => {
                                                        new Cleave("#cfecha" + AccesosUci.nuevoRegistro.id, {
                                                            date: true,
                                                            datePattern: ["d", "m", "Y"]
                                                        });
                                                    }, 50);
                                                },
                                                oninput: (e) => {
                                                    setTimeout(() => {
                                                        AccesosUci.nuevoRegistro.cambio = e.target.value;
                                                    }, 50);
                                                },
                                            }),
                                            m("input.form-control[type='text'][placeholder='hh:mm']", {
                                                id: "chora" + AccesosUci.nuevoRegistro.id,
                                                oncreate: (el) => {
                                                    setTimeout(() => {
                                                        new Cleave("#chora" + AccesosUci.nuevoRegistro.id, {
                                                            time: true,
                                                            timePattern: ["h", "m"]
                                                        });
                                                    }, 50);
                                                }
                                            })
                                        ])
                                    ] : [

                                    ])



                                ),
                                m("td.tx-14.tx-normal[colspan='1']",

                                    (AccesosUci.nuevoRegistro !== null ? [
                                        m('div.d-flex', [
                                            m("input.form-control[type='text'][placeholder='DD/MM/YYYY]", {
                                                id: "cufecha" + AccesosUci.nuevoRegistro.id,
                                                oncreate: (el) => {
                                                    setTimeout(() => {
                                                        new Cleave("#cufecha" + AccesosUci.nuevoRegistro.id, {
                                                            date: true,
                                                            datePattern: ["d", "m", "Y"]
                                                        });
                                                    }, 50);
                                                },
                                                oninput: (e) => {
                                                    setTimeout(() => {
                                                        AccesosUci.nuevoRegistro.curacion = e.target.value;
                                                    }, 50);
                                                },
                                            }),
                                            m("input.form-control[type='text'][placeholder='hh:mm']", {
                                                id: "cuhora" + AccesosUci.nuevoRegistro.id,
                                                oncreate: (el) => {
                                                    setTimeout(() => {
                                                        new Cleave("#cuhora" + AccesosUci.nuevoRegistro.id, {
                                                            time: true,
                                                            timePattern: ["h", "m"]
                                                        });
                                                    }, 50);
                                                }
                                            })
                                        ])
                                    ] : [])


                                ),
                                m("td.tx-14.tx-normal[colspan='2']",
                                    (AccesosUci.nuevoRegistro !== null ? [
                                        m("input", {
                                            id: "condicion" + AccesosUci.nuevoRegistro.id,
                                            class: "form-control tx-semibold tx-14",
                                            type: "text",
                                            placeholder: "...",
                                            oninput: (e) => {
                                                AccesosUci.nuevoRegistro.condicion = e.target.value;
                                            },
                                        })
                                    ] : [])


                                ),
                                m("td.tx-14.tx-normal[colspan='2']",
                                    (AccesosUci.nuevoRegistro !== null ? [
                                        m("input", {
                                            id: "observacion" + AccesosUci.nuevoRegistro.id,
                                            class: "form-control tx-semibold tx-14",
                                            type: "text",
                                            placeholder: "...",

                                            onkeypress: (e) => {
                                                if (e.keyCode == 13) {
                                                    AccesosUci.agregarRegistro();
                                                    console.log(AccesosUci.getRegistros())
                                                    PacientesUCI.vReloadTable('table-accesos', AccesosUci.getRegistros());
                                                    AccesosUci.nuevoRegistro = null;
                                                }
                                            },
                                            oninput: (e) => {
                                                AccesosUci.nuevoRegistro.observacion = e.target.value;
                                            },
                                        })
                                    ] : [])
                                ),
                            ]),
                            m("tr.tx-uppercase", {
                                style: { "background-color": "#eaeff5" }
                            }, [
                                m("th[scope='col'][colspan='12']",
                                    "Registros: "
                                ),
                            ]),
                            m("tr.tx-uppercase.mg-t-20", [
                                m("td[colspan='12']",
                                    PacientesUCI.vTableAccesos('table-accesos', AccesosUci.getRegistros(), PacientesUCI.arqTableAccesos())
                                ),
                            ]),
                        ]),
                        // Cateter
                        m("thead",

                            m("tr.tx-uppercase", {
                                onclick: () => {
                                    CateterUci.show = !CateterUci.show;
                                },
                                style: { "background-color": "#CCCCFF" },
                                class: (TurnosUci.nuevoTurno !== null && TurnosUci.nuevoTurno.gestion == 1 ? '' : 'd-none')

                            }, [
                                m("th.tx-semibold[scope='col'][colspan='12']",
                                    "CATETER URINARIO:"
                                ),

                            ])
                        ),
                        m('thead', {
                            class: (CateterUci.show ? '' : 'd-none')
                        }, [

                            m("tr.tx-uppercase", {
                                style: { "background-color": "#eaeff5" }
                            }, [
                                m("th[colspan='6']",
                                    "Cateter: "
                                ),
                                m("th[colspan='6']",
                                    ""
                                ),


                            ]),

                        ]),
                        m("tbody", {
                            class: (CateterUci.show ? '' : 'd-none')
                        }, [

                            m('tr', [
                                m("td.tx-14.tx-normal[colspan='4']",
                                    m('select.tx-semibold', {
                                        onchange: (e) => {
                                            let _id = e.target.options[e.target.selectedIndex].id;
                                            let _value = e.target.options[e.target.selectedIndex].value;
                                            CateterUci.iniciarRegistro();
                                            CateterUci.nuevoRegistro.id = _id;
                                            CateterUci.nuevoRegistro.cateter = _value;
                                        },
                                        class: "custom-select"
                                    }, m('option', 'Seleccione...'), [{
                                        id: "RecoletcorVejiga",
                                        label: "RECOLECTOR MAS ABAJO QUE VEJIGA"
                                    }, {
                                        id: "RecolectorNoTocaPiso",
                                        label: "RECOLECTOR NO TOCA PISO"
                                    }].map(x =>
                                        m('option[id="' + x.id + '"]', x.label)
                                    ))
                                ),
                                m("td[colspan='8']"),
                            ]),

                        ]),
                        m("tbody", {
                            class: (CateterUci.show ? '' : 'd-none')
                        }, [



                            m("tr.tx-uppercase", {
                                style: { "background-color": "#eaeff5" }
                            }, [

                                m("th[scope='col'][colspan='4']",
                                    "FECHA Y HORA: "
                                ),
                                m("th[scope='col'][colspan='4']",
                                    "SI/NO: "
                                ),
                                m("th[scope='col'][colspan='4']",
                                    "OBSERVACIÓN: "
                                ),

                            ]),
                            m("tr", [

                                m("td.tx-14.tx-normal[colspan='4']",
                                    (CateterUci.nuevoRegistro !== null ? [
                                        m('div.d-flex', [
                                            m("input.form-control[type='text'][placeholder='DD/MM/YYYY]", {
                                                id: "ifecha" + CateterUci.nuevoRegistro.id,
                                                oncreate: (el) => {
                                                    setTimeout(() => {
                                                        new Cleave("#ifecha" + CateterUci.nuevoRegistro.id, {
                                                            date: true,
                                                            datePattern: ["d", "m", "Y"]
                                                        });
                                                    }, 50);
                                                },
                                                oninput: (e) => {
                                                    setTimeout(() => {
                                                        CateterUci.nuevoRegistro.inicio = e.target.value;
                                                    }, 50);
                                                },
                                            }),
                                            m("input.form-control[type='text'][placeholder='hh:mm']", {
                                                id: "ihora" + CateterUci.nuevoRegistro.id,
                                                oncreate: (el) => {
                                                    setTimeout(() => {
                                                        new Cleave("#ihora" + CateterUci.nuevoRegistro.id, {
                                                            time: true,
                                                            timePattern: ["h", "m"]
                                                        });
                                                    }, 50);
                                                },
                                                oninput: (e) => {
                                                    setTimeout(() => {
                                                        CateterUci.nuevoRegistro.inicio = e.target.value;
                                                    }, 50);
                                                },
                                            })
                                        ]),
                                    ] : [])
                                ),

                                m("td.tx-14.tx-normal[colspan='4']",
                                    (CateterUci.nuevoRegistro !== null ? [
                                        m('select.tx-semibold', {
                                            id: "condicion" + CateterUci.nuevoRegistro.id,
                                            onchange: (e) => {
                                                let _value = e.target.options[e.target.selectedIndex].value;
                                                CateterUci.nuevoRegistro.condicion = _value;
                                            },
                                            class: "custom-select"
                                        }, m('option', 'Seleccione...'), ['SI', 'NO'].map(x =>
                                            m('option', x)
                                        ))
                                    ] : [])


                                ),
                                m("td.tx-14.tx-normal[colspan='4']",
                                    (CateterUci.nuevoRegistro !== null ? [
                                        m("input", {
                                            id: "observacion" + CateterUci.nuevoRegistro.id,
                                            class: "form-control tx-semibold tx-14",
                                            type: "text",
                                            placeholder: "...",

                                            onkeypress: (e) => {
                                                if (e.keyCode == 13) {
                                                    CateterUci.agregarRegistro();
                                                    console.log(CateterUci.getRegistros())
                                                    PacientesUCI.vReloadTable('table-cateter', CateterUci.getRegistros());
                                                    CateterUci.nuevoRegistro = null;
                                                }
                                            },
                                            oninput: (e) => {
                                                CateterUci.nuevoRegistro.observacion = e.target.value;
                                            },
                                        })
                                    ] : [])
                                ),
                            ]),
                            m("tr.tx-uppercase", {
                                style: { "background-color": "#eaeff5" }
                            }, [
                                m("th[scope='col'][colspan='12']",
                                    "Registros: "
                                ),
                            ]),
                            m("tr.tx-uppercase.mg-t-20", [
                                m("td[colspan='12']",
                                    PacientesUCI.vTableAccesos('table-cateter', CateterUci.getRegistros(), PacientesUCI.arqTableCateter())
                                ),
                            ]),
                        ]),
                        // Manejo de Ventilzacion
                        m("thead",

                            m("tr.tx-uppercase", {
                                onclick: () => {
                                    VentilcacionUci.show = !VentilcacionUci.show;
                                },
                                style: { "background-color": "#CCCCFF" },
                                class: (TurnosUci.nuevoTurno !== null && TurnosUci.nuevoTurno.gestion == 1 ? '' : 'd-none')

                            }, [
                                m("th.tx-semibold[scope='col'][colspan='12']",
                                    "MANEJO DE VENTILACION:"
                                ),

                            ])
                        ),
                        m('thead', {
                            class: (VentilcacionUci.show ? '' : 'd-none')
                        }, [

                            m("tr.tx-uppercase", {
                                style: { "background-color": "#eaeff5" }
                            }, [
                                m("th[colspan='6']",
                                    "Manejo de Ventilación: "
                                ),
                                m("th[colspan='6']",
                                    ""
                                ),


                            ]),

                        ]),
                        m("tbody", {
                            class: (VentilcacionUci.show ? '' : 'd-none')
                        }, [

                            m('tr', [
                                m("td.tx-14.tx-normal[colspan='4']",
                                    m('select.tx-semibold', {
                                        onchange: (e) => {
                                            let _id = e.target.options[e.target.selectedIndex].id;
                                            let _value = e.target.options[e.target.selectedIndex].value;
                                            VentilcacionUci.iniciarRegistro();
                                            VentilcacionUci.nuevoRegistro.id = _id;
                                            VentilcacionUci.nuevoRegistro.ventilacion = _value;
                                        },
                                        class: "custom-select"
                                    }, m('option', 'Seleccione...'), [{
                                        id: "ViaPeriferica",
                                        label: "VIA PERIFERICA"
                                    }, {
                                        id: "CateterYugular",
                                        label: "CATETER YUGULAR"
                                    }].map(x =>
                                        m('option[id="' + x.id + '"]', x.label)
                                    ))
                                ),
                                m("td[colspan='8']"),
                            ]),

                        ]),
                        m("tbody", {
                            class: (VentilcacionUci.show ? '' : 'd-none')
                        }, [



                            m("tr.tx-uppercase", {
                                style: { "background-color": "#eaeff5" }
                            }, [

                                m("th[scope='col'][colspan='2']",
                                    "UBICACIÓN: "
                                ),
                                m("th[scope='col'][colspan='2']",
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
                                m("th[scope='col'][colspan='3']",
                                    "OBSERVACIÓN: "
                                ),

                            ]),
                            m("tr", [

                                m("td.tx-10.tx-normal[colspan='2']",
                                    (VentilcacionUci.nuevoRegistro !== null ? [
                                        m('select.tx-semibold', {
                                            id: "ubicacion" + VentilcacionUci.nuevoRegistro.id,
                                            onchange: (e) => {
                                                let _value = e.target.options[e.target.selectedIndex].value;
                                                VentilcacionUci.nuevoRegistro.ubicacion = _value;
                                                console.log(VentilcacionUci.nuevoRegistro)
                                            },
                                            class: "custom-select"
                                        }, m('option', 'Seleccione...'), ['IZQUIERDA', 'DERECHA'].map(x =>
                                            m('option', x)
                                        ))
                                    ] : [])


                                ),
                                m("td.tx-14.tx-normal[colspan='2']",
                                    (VentilcacionUci.nuevoRegistro !== null ? [
                                        m("input", {
                                            id: "tipo" + VentilcacionUci.nuevoRegistro.id,
                                            class: "form-control tx-semibold tx-14",
                                            type: "text",
                                            placeholder: "...",
                                            oninput: (e) => {
                                                VentilcacionUci.nuevoRegistro.tipo = e.target.value;
                                            }
                                        })
                                    ] : [])
                                ),
                                m("td.tx-14.tx-normal[colspan='1']",
                                    (VentilcacionUci.nuevoRegistro !== null ? [
                                        m('div.d-flex', [
                                            m("input.form-control[type='text'][placeholder='DD/MM/YYYY]", {
                                                id: "ifecha" + VentilcacionUci.nuevoRegistro.id,
                                                oncreate: (el) => {
                                                    setTimeout(() => {
                                                        new Cleave("#ifecha" + VentilcacionUci.nuevoRegistro.id, {
                                                            date: true,
                                                            datePattern: ["d", "m", "Y"]
                                                        });
                                                    }, 50);
                                                },
                                                oninput: (e) => {
                                                    setTimeout(() => {
                                                        VentilcacionUci.nuevoRegistro.inicio = e.target.value;
                                                    }, 50);
                                                },
                                            }),
                                            m("input.form-control[type='text'][placeholder='hh:mm']", {
                                                id: "ihora" + VentilcacionUci.nuevoRegistro.id,
                                                oncreate: (el) => {
                                                    setTimeout(() => {
                                                        new Cleave("#ihora" + VentilcacionUci.nuevoRegistro.id, {
                                                            time: true,
                                                            timePattern: ["h", "m"]
                                                        });
                                                    }, 50);
                                                },
                                                oninput: (e) => {
                                                    setTimeout(() => {
                                                        VentilcacionUci.nuevoRegistro.inicio = e.target.value;
                                                    }, 50);
                                                },
                                            })
                                        ]),
                                    ] : [])
                                ),
                                m("td.tx-14.tx-normal[colspan='1']",

                                    (VentilcacionUci.nuevoRegistro !== null ? [
                                        m('div.d-flex', [
                                            m("input.form-control[type='text'][placeholder='DD/MM/YYYY]", {
                                                id: "rfecha" + VentilcacionUci.nuevoRegistro.id,
                                                oncreate: (el) => {
                                                    setTimeout(() => {
                                                        new Cleave("#rfecha" + VentilcacionUci.nuevoRegistro.id, {
                                                            date: true,
                                                            datePattern: ["d", "m", "Y"]
                                                        });
                                                    }, 50);
                                                },
                                                oninput: (e) => {
                                                    setTimeout(() => {
                                                        VentilcacionUci.nuevoRegistro.retiro = e.target.value;
                                                    }, 50);
                                                },
                                            }),
                                            m("input.form-control[type='text'][placeholder='hh:mm']", {
                                                id: "rHora" + VentilcacionUci.nuevoRegistro.id,
                                                oncreate: (el) => {
                                                    setTimeout(() => {
                                                        new Cleave("#rHora" + VentilcacionUci.nuevoRegistro.id, {
                                                            time: true,
                                                            timePattern: ["h", "m"]
                                                        });
                                                    }, 50);
                                                }
                                            })
                                        ])


                                    ] : [])


                                ),
                                m("td.tx-14.tx-normal[colspan='1']",

                                    (VentilcacionUci.nuevoRegistro !== null ? [
                                        m('div.d-flex', [
                                            m("input.form-control[type='text'][placeholder='DD/MM/YYYY]", {
                                                id: "cfecha" + VentilcacionUci.nuevoRegistro.id,
                                                oncreate: (el) => {
                                                    setTimeout(() => {
                                                        new Cleave("#cfecha" + VentilcacionUci.nuevoRegistro.id, {
                                                            date: true,
                                                            datePattern: ["d", "m", "Y"]
                                                        });
                                                    }, 50);
                                                },
                                                oninput: (e) => {
                                                    setTimeout(() => {
                                                        VentilcacionUci.nuevoRegistro.cambio = e.target.value;
                                                    }, 50);
                                                },
                                            }),
                                            m("input.form-control[type='text'][placeholder='hh:mm']", {
                                                id: "chora" + VentilcacionUci.nuevoRegistro.id,
                                                oncreate: (el) => {
                                                    setTimeout(() => {
                                                        new Cleave("#chora" + VentilcacionUci.nuevoRegistro.id, {
                                                            time: true,
                                                            timePattern: ["h", "m"]
                                                        });
                                                    }, 50);
                                                }
                                            })
                                        ])
                                    ] : [

                                    ])



                                ),
                                m("td.tx-14.tx-normal[colspan='1']",

                                    (VentilcacionUci.nuevoRegistro !== null ? [
                                        m('div.d-flex', [
                                            m("input.form-control[type='text'][placeholder='DD/MM/YYYY]", {
                                                id: "cufecha" + VentilcacionUci.nuevoRegistro.id,
                                                oncreate: (el) => {
                                                    setTimeout(() => {
                                                        new Cleave("#cufecha" + VentilcacionUci.nuevoRegistro.id, {
                                                            date: true,
                                                            datePattern: ["d", "m", "Y"]
                                                        });
                                                    }, 50);
                                                },
                                                oninput: (e) => {
                                                    setTimeout(() => {
                                                        VentilcacionUci.nuevoRegistro.curacion = e.target.value;
                                                    }, 50);
                                                },
                                            }),
                                            m("input.form-control[type='text'][placeholder='hh:mm']", {
                                                id: "cuhora" + VentilcacionUci.nuevoRegistro.id,
                                                oncreate: (el) => {
                                                    setTimeout(() => {
                                                        new Cleave("#cuhora" + VentilcacionUci.nuevoRegistro.id, {
                                                            time: true,
                                                            timePattern: ["h", "m"]
                                                        });
                                                    }, 50);
                                                }
                                            })
                                        ])
                                    ] : [])


                                ),
                                m("td.tx-14.tx-normal[colspan='2']",
                                    (VentilcacionUci.nuevoRegistro !== null ? [
                                        m('select.tx-semibold', {
                                            id: "condicion" + VentilcacionUci.nuevoRegistro.id,
                                            onchange: (e) => {
                                                let _value = e.target.options[e.target.selectedIndex].value;
                                                VentilcacionUci.nuevoRegistro.condicion = _value;
                                            },
                                            class: "custom-select"
                                        }, m('option', 'Seleccione...'), ['VIA PERIFERICA PERMEABLE Y EN BUENAS CONDICIONES'].map(x =>
                                            m('option', x)
                                        ))
                                    ] : [])


                                ),
                                m("td.tx-14.tx-normal[colspan='2']",
                                    (VentilcacionUci.nuevoRegistro !== null ? [
                                        m("input", {
                                            id: "observacion" + VentilcacionUci.nuevoRegistro.id,
                                            class: "form-control tx-semibold tx-14",
                                            type: "text",
                                            placeholder: "...",

                                            onkeypress: (e) => {
                                                if (e.keyCode == 13) {
                                                    VentilcacionUci.agregarRegistro();
                                                    console.log(VentilcacionUci.getRegistros())
                                                    PacientesUCI.vReloadTable('table-ventilacion', VentilcacionUci.getRegistros());
                                                    VentilcacionUci.nuevoRegistro = null;
                                                }
                                            },
                                            oninput: (e) => {
                                                VentilcacionUci.nuevoRegistro.observacion = e.target.value;
                                            },
                                        })
                                    ] : [])
                                ),
                            ]),
                            m("tr.tx-uppercase", {
                                style: { "background-color": "#eaeff5" }
                            }, [
                                m("th[scope='col'][colspan='12']",
                                    "Registros: "
                                ),
                            ]),
                            m("tr.tx-uppercase.mg-t-20", [
                                m("td[colspan='12']",
                                    PacientesUCI.vTableAccesos('table-ventilacion', VentilcacionUci.getRegistros(), PacientesUCI.arqTableVentilacion())
                                ),
                            ]),
                        ]),
                        // Hemodialisis
                        m("thead",

                            m("tr.tx-uppercase", {
                                onclick: () => {
                                    HemodialisisUci.show = !HemodialisisUci.show;
                                },
                                style: { "background-color": "#CCCCFF" },
                                class: (TurnosUci.nuevoTurno !== null && TurnosUci.nuevoTurno.gestion == 1 ? '' : 'd-none')

                            }, [
                                m("th.tx-semibold[scope='col'][colspan='12']",
                                    "CATETER VIA CENTRAL O HEMODIALISIS:"
                                ),

                            ])
                        ),
                        m('thead', {
                            class: (HemodialisisUci.show ? '' : 'd-none')
                        }, [

                            m("tr.tx-uppercase", {
                                style: { "background-color": "#eaeff5" }
                            }, [
                                m("th[colspan='6']",
                                    "CATETER VIA CENTRAL O HEMODIALISIS:"
                                ),
                                m("th[colspan='6']",
                                    ""
                                ),


                            ]),

                        ]),
                        m("tbody", {
                            class: (HemodialisisUci.show ? '' : 'd-none')
                        }, [

                            m('tr', [
                                m("td.tx-14.tx-normal[colspan='4']",
                                    m('select.tx-semibold', {
                                        onchange: (e) => {
                                            let _id = e.target.options[e.target.selectedIndex].id;
                                            let _value = e.target.options[e.target.selectedIndex].value;
                                            HemodialisisUci.iniciarRegistro();
                                            HemodialisisUci.nuevoRegistro.id = _id;
                                            HemodialisisUci.nuevoRegistro.hemo = _value;
                                        },
                                        class: "custom-select"
                                    }, m('option', 'Seleccione...'), [{
                                        id: "ViaPeriferica",
                                        label: "VIA PERIFERICA"
                                    }, {
                                        id: "CateterYugular",
                                        label: "CATETER YUGULAR"
                                    }].map(x =>
                                        m('option[id="' + x.id + '"]', x.label)
                                    ))
                                ),
                                m("td[colspan='8']"),
                            ]),

                        ]),
                        m("tbody", {
                            class: (HemodialisisUci.show ? '' : 'd-none')
                        }, [



                            m("tr.tx-uppercase", {
                                style: { "background-color": "#eaeff5" }
                            }, [

                                m("th[scope='col'][colspan='2']",
                                    "UBICACIÓN: "
                                ),
                                m("th[scope='col'][colspan='2']",
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
                                m("th[scope='col'][colspan='3']",
                                    "OBSERVACIÓN: "
                                ),

                            ]),
                            m("tr", [

                                m("td.tx-10.tx-normal[colspan='2']",
                                    (HemodialisisUci.nuevoRegistro !== null ? [
                                        m('select.tx-semibold', {
                                            id: "ubicacion" + HemodialisisUci.nuevoRegistro.id,
                                            onchange: (e) => {
                                                let _value = e.target.options[e.target.selectedIndex].value;
                                                HemodialisisUci.nuevoRegistro.ubicacion = _value;
                                                console.log(HemodialisisUci.nuevoRegistro)
                                            },
                                            class: "custom-select"
                                        }, m('option', 'Seleccione...'), ['IZQUIERDA', 'DERECHA'].map(x =>
                                            m('option', x)
                                        ))
                                    ] : [])


                                ),
                                m("td.tx-14.tx-normal[colspan='2']",
                                    (HemodialisisUci.nuevoRegistro !== null ? [
                                        m("input", {
                                            id: "tipo" + HemodialisisUci.nuevoRegistro.id,
                                            class: "form-control tx-semibold tx-14",
                                            type: "text",
                                            placeholder: "...",
                                            oninput: (e) => {
                                                HemodialisisUci.nuevoRegistro.tipo = e.target.value;
                                            }
                                        })
                                    ] : [])
                                ),
                                m("td.tx-14.tx-normal[colspan='1']",
                                    (HemodialisisUci.nuevoRegistro !== null ? [
                                        m('div.d-flex', [
                                            m("input.form-control[type='text'][placeholder='DD/MM/YYYY]", {
                                                id: "ifecha" + HemodialisisUci.nuevoRegistro.id,
                                                oncreate: (el) => {
                                                    setTimeout(() => {
                                                        new Cleave("#ifecha" + HemodialisisUci.nuevoRegistro.id, {
                                                            date: true,
                                                            datePattern: ["d", "m", "Y"]
                                                        });
                                                    }, 50);
                                                },
                                                oninput: (e) => {
                                                    setTimeout(() => {
                                                        HemodialisisUci.nuevoRegistro.inicio = e.target.value;
                                                    }, 50);
                                                },
                                            }),
                                            m("input.form-control[type='text'][placeholder='hh:mm']", {
                                                id: "ihora" + HemodialisisUci.nuevoRegistro.id,
                                                oncreate: (el) => {
                                                    setTimeout(() => {
                                                        new Cleave("#ihora" + HemodialisisUci.nuevoRegistro.id, {
                                                            time: true,
                                                            timePattern: ["h", "m"]
                                                        });
                                                    }, 50);
                                                },
                                                oninput: (e) => {
                                                    setTimeout(() => {
                                                        HemodialisisUci.nuevoRegistro.inicio = e.target.value;
                                                    }, 50);
                                                },
                                            })
                                        ]),
                                    ] : [])
                                ),
                                m("td.tx-14.tx-normal[colspan='1']",

                                    (HemodialisisUci.nuevoRegistro !== null ? [
                                        m('div.d-flex', [
                                            m("input.form-control[type='text'][placeholder='DD/MM/YYYY]", {
                                                id: "rfecha" + HemodialisisUci.nuevoRegistro.id,
                                                oncreate: (el) => {
                                                    setTimeout(() => {
                                                        new Cleave("#rfecha" + HemodialisisUci.nuevoRegistro.id, {
                                                            date: true,
                                                            datePattern: ["d", "m", "Y"]
                                                        });
                                                    }, 50);
                                                },
                                                oninput: (e) => {
                                                    setTimeout(() => {
                                                        HemodialisisUci.nuevoRegistro.retiro = e.target.value;
                                                    }, 50);
                                                },
                                            }),
                                            m("input.form-control[type='text'][placeholder='hh:mm']", {
                                                id: "rHora" + HemodialisisUci.nuevoRegistro.id,
                                                oncreate: (el) => {
                                                    setTimeout(() => {
                                                        new Cleave("#rHora" + HemodialisisUci.nuevoRegistro.id, {
                                                            time: true,
                                                            timePattern: ["h", "m"]
                                                        });
                                                    }, 50);
                                                }
                                            })
                                        ])


                                    ] : [])


                                ),
                                m("td.tx-14.tx-normal[colspan='1']",

                                    (HemodialisisUci.nuevoRegistro !== null ? [
                                        m('div.d-flex', [
                                            m("input.form-control[type='text'][placeholder='DD/MM/YYYY]", {
                                                id: "cfecha" + HemodialisisUci.nuevoRegistro.id,
                                                oncreate: (el) => {
                                                    setTimeout(() => {
                                                        new Cleave("#cfecha" + HemodialisisUci.nuevoRegistro.id, {
                                                            date: true,
                                                            datePattern: ["d", "m", "Y"]
                                                        });
                                                    }, 50);
                                                },
                                                oninput: (e) => {
                                                    setTimeout(() => {
                                                        HemodialisisUci.nuevoRegistro.cambio = e.target.value;
                                                    }, 50);
                                                },
                                            }),
                                            m("input.form-control[type='text'][placeholder='hh:mm']", {
                                                id: "chora" + HemodialisisUci.nuevoRegistro.id,
                                                oncreate: (el) => {
                                                    setTimeout(() => {
                                                        new Cleave("#chora" + HemodialisisUci.nuevoRegistro.id, {
                                                            time: true,
                                                            timePattern: ["h", "m"]
                                                        });
                                                    }, 50);
                                                }
                                            })
                                        ])
                                    ] : [

                                    ])



                                ),
                                m("td.tx-14.tx-normal[colspan='1']",

                                    (HemodialisisUci.nuevoRegistro !== null ? [
                                        m('div.d-flex', [
                                            m("input.form-control[type='text'][placeholder='DD/MM/YYYY]", {
                                                id: "cufecha" + HemodialisisUci.nuevoRegistro.id,
                                                oncreate: (el) => {
                                                    setTimeout(() => {
                                                        new Cleave("#cufecha" + HemodialisisUci.nuevoRegistro.id, {
                                                            date: true,
                                                            datePattern: ["d", "m", "Y"]
                                                        });
                                                    }, 50);
                                                },
                                                oninput: (e) => {
                                                    setTimeout(() => {
                                                        HemodialisisUci.nuevoRegistro.curacion = e.target.value;
                                                    }, 50);
                                                },
                                            }),
                                            m("input.form-control[type='text'][placeholder='hh:mm']", {
                                                id: "cuhora" + HemodialisisUci.nuevoRegistro.id,
                                                oncreate: (el) => {
                                                    setTimeout(() => {
                                                        new Cleave("#cuhora" + HemodialisisUci.nuevoRegistro.id, {
                                                            time: true,
                                                            timePattern: ["h", "m"]
                                                        });
                                                    }, 50);
                                                }
                                            })
                                        ])
                                    ] : [])


                                ),
                                m("td.tx-14.tx-normal[colspan='2']",
                                    (HemodialisisUci.nuevoRegistro !== null ? [
                                        m('select.tx-semibold', {
                                            id: "condicion" + HemodialisisUci.nuevoRegistro.id,
                                            onchange: (e) => {
                                                let _value = e.target.options[e.target.selectedIndex].value;
                                                HemodialisisUci.nuevoRegistro.condicion = _value;
                                            },
                                            class: "custom-select"
                                        }, m('option', 'Seleccione...'), ['VIA PERIFERICA PERMEABLE Y EN BUENAS CONDICIONES'].map(x =>
                                            m('option', x)
                                        ))
                                    ] : [])


                                ),
                                m("td.tx-14.tx-normal[colspan='2']",
                                    (HemodialisisUci.nuevoRegistro !== null ? [
                                        m("input", {
                                            id: "observacion" + HemodialisisUci.nuevoRegistro.id,
                                            class: "form-control tx-semibold tx-14",
                                            type: "text",
                                            placeholder: "...",

                                            onkeypress: (e) => {
                                                if (e.keyCode == 13) {
                                                    HemodialisisUci.agregarRegistro();
                                                    console.log(HemodialisisUci.getRegistros())
                                                    PacientesUCI.vReloadTable('table-hemodialisis', HemodialisisUci.getRegistros());
                                                    HemodialisisUci.nuevoRegistro = null;
                                                }
                                            },
                                            oninput: (e) => {
                                                HemodialisisUci.nuevoRegistro.observacion = e.target.value;
                                            },
                                        })
                                    ] : [])
                                ),
                            ]),
                            m("tr.tx-uppercase", {
                                style: { "background-color": "#eaeff5" }
                            }, [
                                m("th[scope='col'][colspan='12']",
                                    "Registros: "
                                ),
                            ]),
                            m("tr.tx-uppercase.mg-t-20", [
                                m("td[colspan='12']",
                                    PacientesUCI.vTableAccesos('table-hemodialisis', HemodialisisUci.getRegistros(), PacientesUCI.arqTableHemodialisis())
                                ),
                            ]),
                        ]),

                        //Cultivos
                        m("thead",

                            m("tr.tx-uppercase", {
                                onclick: () => {
                                    CultivosUci.show = !CultivosUci.show;
                                },
                                style: { "background-color": "#CCCCFF" },
                                class: (TurnosUci.nuevoTurno !== null && TurnosUci.nuevoTurno.gestion == 1 ? '' : 'd-none')

                            }, [
                                m("th.tx-semibold[scope='col'][colspan='12']",
                                    "CULTIVOS:"
                                ),

                            ])
                        ),
                        m('thead', {
                            class: (CultivosUci.show ? '' : 'd-none')
                        }, [

                            m("tr.tx-uppercase", {
                                style: { "background-color": "#eaeff5" }
                            }, [
                                m("th[colspan='6']",
                                    "CULTIVOS:"
                                ),
                                m("th[colspan='6']",
                                    ""
                                ),


                            ]),

                        ]),
                        m("tbody", {
                            class: (CultivosUci.show ? '' : 'd-none')
                        }, [

                            m('tr', [
                                m("td.tx-14.tx-normal[colspan='4']",
                                    m('select.tx-semibold', {
                                        onchange: (e) => {
                                            let _id = e.target.options[e.target.selectedIndex].id;
                                            let _value = e.target.options[e.target.selectedIndex].value;
                                            CultivosUci.iniciarRegistro();
                                            CultivosUci.nuevoRegistro.id = _id;
                                            CultivosUci.nuevoRegistro.cultivo = _value;
                                        },
                                        class: "custom-select"
                                    }, m('option', 'Seleccione...'), [{
                                        id: "ViaPeriferica",
                                        label: "VIA PERIFERICA"
                                    }, {
                                        id: "CateterYugular",
                                        label: "CATETER YUGULAR"
                                    }].map(x =>
                                        m('option[id="' + x.id + '"]', x.label)
                                    ))
                                ),
                                m("td[colspan='8']"),
                            ]),

                        ]),
                        m("tbody", {
                            class: (CultivosUci.show ? '' : 'd-none')
                        }, [



                            m("tr.tx-uppercase", {
                                style: { "background-color": "#eaeff5" }
                            }, [

                                m("th[scope='col'][colspan='2']",
                                    "UBICACIÓN: "
                                ),
                                m("th[scope='col'][colspan='2']",
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
                                m("th[scope='col'][colspan='3']",
                                    "OBSERVACIÓN: "
                                ),

                            ]),
                            m("tr", [

                                m("td.tx-10.tx-normal[colspan='2']",
                                    (CultivosUci.nuevoRegistro !== null ? [
                                        m('select.tx-semibold', {
                                            id: "ubicacion" + CultivosUci.nuevoRegistro.id,
                                            onchange: (e) => {
                                                let _value = e.target.options[e.target.selectedIndex].value;
                                                CultivosUci.nuevoRegistro.ubicacion = _value;
                                                console.log(CultivosUci.nuevoRegistro)
                                            },
                                            class: "custom-select"
                                        }, m('option', 'Seleccione...'), ['IZQUIERDA', 'DERECHA'].map(x =>
                                            m('option', x)
                                        ))
                                    ] : [])


                                ),
                                m("td.tx-14.tx-normal[colspan='2']",
                                    (CultivosUci.nuevoRegistro !== null ? [
                                        m("input", {
                                            id: "tipo" + CultivosUci.nuevoRegistro.id,
                                            class: "form-control tx-semibold tx-14",
                                            type: "text",
                                            placeholder: "...",
                                            oninput: (e) => {
                                                CultivosUci.nuevoRegistro.tipo = e.target.value;
                                            }
                                        })
                                    ] : [])
                                ),
                                m("td.tx-14.tx-normal[colspan='1']",
                                    (CultivosUci.nuevoRegistro !== null ? [
                                        m('div.d-flex', [
                                            m("input.form-control[type='text'][placeholder='DD/MM/YYYY]", {
                                                id: "ifecha" + CultivosUci.nuevoRegistro.id,
                                                oncreate: (el) => {
                                                    setTimeout(() => {
                                                        new Cleave("#ifecha" + CultivosUci.nuevoRegistro.id, {
                                                            date: true,
                                                            datePattern: ["d", "m", "Y"]
                                                        });
                                                    }, 50);
                                                },
                                                oninput: (e) => {
                                                    setTimeout(() => {
                                                        CultivosUci.nuevoRegistro.inicio = e.target.value;
                                                    }, 50);
                                                },
                                            }),
                                            m("input.form-control[type='text'][placeholder='hh:mm']", {
                                                id: "ihora" + CultivosUci.nuevoRegistro.id,
                                                oncreate: (el) => {
                                                    setTimeout(() => {
                                                        new Cleave("#ihora" + CultivosUci.nuevoRegistro.id, {
                                                            time: true,
                                                            timePattern: ["h", "m"]
                                                        });
                                                    }, 50);
                                                },
                                                oninput: (e) => {
                                                    setTimeout(() => {
                                                        CultivosUci.nuevoRegistro.inicio = e.target.value;
                                                    }, 50);
                                                },
                                            })
                                        ]),
                                    ] : [])
                                ),
                                m("td.tx-14.tx-normal[colspan='1']",

                                    (CultivosUci.nuevoRegistro !== null ? [
                                        m('div.d-flex', [
                                            m("input.form-control[type='text'][placeholder='DD/MM/YYYY]", {
                                                id: "rfecha" + CultivosUci.nuevoRegistro.id,
                                                oncreate: (el) => {
                                                    setTimeout(() => {
                                                        new Cleave("#rfecha" + CultivosUci.nuevoRegistro.id, {
                                                            date: true,
                                                            datePattern: ["d", "m", "Y"]
                                                        });
                                                    }, 50);
                                                },
                                                oninput: (e) => {
                                                    setTimeout(() => {
                                                        CultivosUci.nuevoRegistro.retiro = e.target.value;
                                                    }, 50);
                                                },
                                            }),
                                            m("input.form-control[type='text'][placeholder='hh:mm']", {
                                                id: "rHora" + CultivosUci.nuevoRegistro.id,
                                                oncreate: (el) => {
                                                    setTimeout(() => {
                                                        new Cleave("#rHora" + CultivosUci.nuevoRegistro.id, {
                                                            time: true,
                                                            timePattern: ["h", "m"]
                                                        });
                                                    }, 50);
                                                }
                                            })
                                        ])


                                    ] : [])


                                ),
                                m("td.tx-14.tx-normal[colspan='1']",

                                    (CultivosUci.nuevoRegistro !== null ? [
                                        m('div.d-flex', [
                                            m("input.form-control[type='text'][placeholder='DD/MM/YYYY]", {
                                                id: "cfecha" + CultivosUci.nuevoRegistro.id,
                                                oncreate: (el) => {
                                                    setTimeout(() => {
                                                        new Cleave("#cfecha" + CultivosUci.nuevoRegistro.id, {
                                                            date: true,
                                                            datePattern: ["d", "m", "Y"]
                                                        });
                                                    }, 50);
                                                },
                                                oninput: (e) => {
                                                    setTimeout(() => {
                                                        CultivosUci.nuevoRegistro.cambio = e.target.value;
                                                    }, 50);
                                                },
                                            }),
                                            m("input.form-control[type='text'][placeholder='hh:mm']", {
                                                id: "chora" + CultivosUci.nuevoRegistro.id,
                                                oncreate: (el) => {
                                                    setTimeout(() => {
                                                        new Cleave("#chora" + CultivosUci.nuevoRegistro.id, {
                                                            time: true,
                                                            timePattern: ["h", "m"]
                                                        });
                                                    }, 50);
                                                }
                                            })
                                        ])
                                    ] : [

                                    ])



                                ),
                                m("td.tx-14.tx-normal[colspan='1']",

                                    (CultivosUci.nuevoRegistro !== null ? [
                                        m('div.d-flex', [
                                            m("input.form-control[type='text'][placeholder='DD/MM/YYYY]", {
                                                id: "cufecha" + CultivosUci.nuevoRegistro.id,
                                                oncreate: (el) => {
                                                    setTimeout(() => {
                                                        new Cleave("#cufecha" + CultivosUci.nuevoRegistro.id, {
                                                            date: true,
                                                            datePattern: ["d", "m", "Y"]
                                                        });
                                                    }, 50);
                                                },
                                                oninput: (e) => {
                                                    setTimeout(() => {
                                                        CultivosUci.nuevoRegistro.curacion = e.target.value;
                                                    }, 50);
                                                },
                                            }),
                                            m("input.form-control[type='text'][placeholder='hh:mm']", {
                                                id: "cuhora" + CultivosUci.nuevoRegistro.id,
                                                oncreate: (el) => {
                                                    setTimeout(() => {
                                                        new Cleave("#cuhora" + CultivosUci.nuevoRegistro.id, {
                                                            time: true,
                                                            timePattern: ["h", "m"]
                                                        });
                                                    }, 50);
                                                }
                                            })
                                        ])
                                    ] : [])


                                ),
                                m("td.tx-14.tx-normal[colspan='2']",
                                    (CultivosUci.nuevoRegistro !== null ? [
                                        m('select.tx-semibold', {
                                            id: "condicion" + CultivosUci.nuevoRegistro.id,
                                            onchange: (e) => {
                                                let _value = e.target.options[e.target.selectedIndex].value;
                                                CultivosUci.nuevoRegistro.condicion = _value;
                                            },
                                            class: "custom-select"
                                        }, m('option', 'Seleccione...'), ['VIA PERIFERICA PERMEABLE Y EN BUENAS CONDICIONES'].map(x =>
                                            m('option', x)
                                        ))
                                    ] : [])


                                ),
                                m("td.tx-14.tx-normal[colspan='2']",
                                    (CultivosUci.nuevoRegistro !== null ? [
                                        m("input", {
                                            id: "observacion" + CultivosUci.nuevoRegistro.id,
                                            class: "form-control tx-semibold tx-14",
                                            type: "text",
                                            placeholder: "...",

                                            onkeypress: (e) => {
                                                if (e.keyCode == 13) {
                                                    CultivosUci.agregarRegistro();
                                                    console.log(CultivosUci.getRegistros())
                                                    PacientesUCI.vReloadTable('table-cultivos', CultivosUci.getRegistros());
                                                    CultivosUci.nuevoRegistro = null;
                                                }
                                            },
                                            oninput: (e) => {
                                                CultivosUci.nuevoRegistro.observacion = e.target.value;
                                            },
                                        })
                                    ] : [])
                                ),
                            ]),
                            m("tr.tx-uppercase", {
                                style: { "background-color": "#eaeff5" }
                            }, [
                                m("th[scope='col'][colspan='12']",
                                    "Registros: "
                                ),
                            ]),
                            m("tr.tx-uppercase.mg-t-20", [
                                m("td[colspan='12']",
                                    PacientesUCI.vTableAccesos('table-cultivos', CultivosUci.getRegistros(), PacientesUCI.arqTableCultivos())
                                ),
                            ]),
                        ]),

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

    static arqTableVias() {
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
                    title: "Via:",
                },
                {
                    title: "Ubicación:",
                },
                {
                    title: "Tipo:",
                },

                {
                    title: "Inicio:",
                },
                {
                    title: "Retiro:",
                },

                {
                    title: "Cambio:",
                },
                {
                    title: "Curación:",
                },
                {
                    title: "Condición:",
                },
                {
                    title: "Observación:",
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
                        return full.via;
                    },

                    visible: true,
                    aTargets: [1],
                    orderable: true,

                },
                {
                    mRender: function(data, type, full) {
                        return full.ubicacion;
                    },
                    visible: true,
                    aTargets: [2],
                    orderable: true,

                },
                {
                    mRender: function(data, type, full) {
                        return full.tipo;
                    },
                    visible: true,
                    aTargets: [3],
                    orderable: true,
                },
                {
                    mRender: function(data, type, full) {
                        return full.inicio;
                    },
                    visible: true,
                    aTargets: [4],
                    orderable: true,


                },
                {
                    mRender: function(data, type, full) {
                        return full.retiro;
                    },
                    visible: true,
                    aTargets: [5],
                    orderable: true,


                },
                {
                    mRender: function(data, type, full) {
                        return full.cambio;
                    },
                    visible: true,
                    aTargets: [6],
                    orderable: true,


                },
                {
                    mRender: function(data, type, full) {
                        return full.curacion;
                    },
                    visible: true,
                    aTargets: [7],
                    orderable: true,


                },
                {
                    mRender: function(data, type, full) {
                        return full.condicion;
                    },
                    visible: true,
                    aTargets: [8],
                    orderable: true,


                },
                {
                    mRender: function(data, type, full) {
                        return full.observacion;
                    },
                    visible: true,
                    aTargets: [9],
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

                                                },
                                            },
                                            'Eliminar',
                                        ),

                                    ])

                                ]
                            }
                        });
                    },
                    visible: true,
                    aTargets: [10],
                    orderable: true,

                }


            ],
            fnRowCallback: function(nRow, aData, iDisplayIndex, iDisplayIndexFull) {

            },
        };
    }

    static arqTableAccesos() {
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
                    title: "Acceso:",
                },
                {
                    title: "Ubicación:",
                },
                {
                    title: "Tipo:",
                },

                {
                    title: "Inicio:",
                },
                {
                    title: "Retiro:",
                },

                {
                    title: "Cambio:",
                },
                {
                    title: "Curación:",
                },
                {
                    title: "Condición:",
                },
                {
                    title: "Observación:",
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
                        return full.acceso;
                    },

                    visible: true,
                    aTargets: [1],
                    orderable: true,

                },
                {
                    mRender: function(data, type, full) {
                        return full.ubicacion;
                    },
                    visible: true,
                    aTargets: [2],
                    orderable: true,

                },
                {
                    mRender: function(data, type, full) {
                        return full.tipo;
                    },
                    visible: true,
                    aTargets: [3],
                    orderable: true,
                },
                {
                    mRender: function(data, type, full) {
                        return full.inicio;
                    },
                    visible: true,
                    aTargets: [4],
                    orderable: true,


                },
                {
                    mRender: function(data, type, full) {
                        return full.retiro;
                    },
                    visible: true,
                    aTargets: [5],
                    orderable: true,


                },
                {
                    mRender: function(data, type, full) {
                        return full.cambio;
                    },
                    visible: true,
                    aTargets: [6],
                    orderable: true,


                },
                {
                    mRender: function(data, type, full) {
                        return full.curacion;
                    },
                    visible: true,
                    aTargets: [7],
                    orderable: true,


                },
                {
                    mRender: function(data, type, full) {
                        return full.condicion;
                    },
                    visible: true,
                    aTargets: [8],
                    orderable: true,


                },
                {
                    mRender: function(data, type, full) {
                        return full.observacion;
                    },
                    visible: true,
                    aTargets: [9],
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

                                                },
                                            },
                                            'Eliminar',
                                        ),

                                    ])

                                ]
                            }
                        });
                    },
                    visible: true,
                    aTargets: [10],
                    orderable: true,

                }


            ],
            fnRowCallback: function(nRow, aData, iDisplayIndex, iDisplayIndexFull) {

            },
        };
    }

    static arqTableCateter() {
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
                    title: "Cateter:",
                },
                {
                    title: "Fecha y Hora:",
                },
                {
                    title: "Si/No:",
                },

                {
                    title: "Observación:",
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
                        return full.cateter;
                    },

                    visible: true,
                    aTargets: [1],
                    orderable: true,

                },
                {
                    mRender: function(data, type, full) {
                        return full.inicio;
                    },
                    visible: true,
                    aTargets: [2],
                    orderable: true,

                },
                {
                    mRender: function(data, type, full) {
                        return full.condicion;
                    },
                    visible: true,
                    aTargets: [3],
                    orderable: true,


                },
                {
                    mRender: function(data, type, full) {
                        return full.observacion;
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

                                        m("button.btn.btn-xs.btn-block.btn-danger[type='button']", {
                                                onclick: () => {

                                                },
                                            },
                                            'Eliminar',
                                        ),

                                    ])

                                ]
                            }
                        });
                    },
                    visible: true,
                    aTargets: [5],
                    orderable: true,

                }


            ],
            fnRowCallback: function(nRow, aData, iDisplayIndex, iDisplayIndexFull) {

            },
        };
    }

    static arqTableVentilacion() {
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
                    title: "Ventilación:",
                },
                {
                    title: "Ubicación:",
                },
                {
                    title: "Tipo:",
                },

                {
                    title: "Inicio:",
                },
                {
                    title: "Retiro:",
                },

                {
                    title: "Cambio:",
                },
                {
                    title: "Curación:",
                },
                {
                    title: "Condición:",
                },
                {
                    title: "Observación:",
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
                        return full.ventilacion;
                    },

                    visible: true,
                    aTargets: [1],
                    orderable: true,

                },
                {
                    mRender: function(data, type, full) {
                        return full.ubicacion;
                    },
                    visible: true,
                    aTargets: [2],
                    orderable: true,

                },
                {
                    mRender: function(data, type, full) {
                        return full.tipo;
                    },
                    visible: true,
                    aTargets: [3],
                    orderable: true,
                },
                {
                    mRender: function(data, type, full) {
                        return full.inicio;
                    },
                    visible: true,
                    aTargets: [4],
                    orderable: true,


                },
                {
                    mRender: function(data, type, full) {
                        return full.retiro;
                    },
                    visible: true,
                    aTargets: [5],
                    orderable: true,


                },
                {
                    mRender: function(data, type, full) {
                        return full.cambio;
                    },
                    visible: true,
                    aTargets: [6],
                    orderable: true,


                },
                {
                    mRender: function(data, type, full) {
                        return full.curacion;
                    },
                    visible: true,
                    aTargets: [7],
                    orderable: true,


                },
                {
                    mRender: function(data, type, full) {
                        return full.condicion;
                    },
                    visible: true,
                    aTargets: [8],
                    orderable: true,


                },
                {
                    mRender: function(data, type, full) {
                        return full.observacion;
                    },
                    visible: true,
                    aTargets: [9],
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

                                                },
                                            },
                                            'Eliminar',
                                        ),

                                    ])

                                ]
                            }
                        });
                    },
                    visible: true,
                    aTargets: [10],
                    orderable: true,

                }


            ],
            fnRowCallback: function(nRow, aData, iDisplayIndex, iDisplayIndexFull) {

            },
        };
    }

    static arqTableHemodialisis() {
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
                    title: "Item:",
                },
                {
                    title: "Ubicación:",
                },
                {
                    title: "Tipo:",
                },

                {
                    title: "Inicio:",
                },
                {
                    title: "Retiro:",
                },

                {
                    title: "Cambio:",
                },
                {
                    title: "Curación:",
                },
                {
                    title: "Condición:",
                },
                {
                    title: "Observación:",
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
                        return full.hemo;
                    },

                    visible: true,
                    aTargets: [1],
                    orderable: true,

                },
                {
                    mRender: function(data, type, full) {
                        return full.ubicacion;
                    },
                    visible: true,
                    aTargets: [2],
                    orderable: true,

                },
                {
                    mRender: function(data, type, full) {
                        return full.tipo;
                    },
                    visible: true,
                    aTargets: [3],
                    orderable: true,
                },
                {
                    mRender: function(data, type, full) {
                        return full.inicio;
                    },
                    visible: true,
                    aTargets: [4],
                    orderable: true,


                },
                {
                    mRender: function(data, type, full) {
                        return full.retiro;
                    },
                    visible: true,
                    aTargets: [5],
                    orderable: true,


                },
                {
                    mRender: function(data, type, full) {
                        return full.cambio;
                    },
                    visible: true,
                    aTargets: [6],
                    orderable: true,


                },
                {
                    mRender: function(data, type, full) {
                        return full.curacion;
                    },
                    visible: true,
                    aTargets: [7],
                    orderable: true,


                },
                {
                    mRender: function(data, type, full) {
                        return full.condicion;
                    },
                    visible: true,
                    aTargets: [8],
                    orderable: true,


                },
                {
                    mRender: function(data, type, full) {
                        return full.observacion;
                    },
                    visible: true,
                    aTargets: [9],
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

                                                },
                                            },
                                            'Eliminar',
                                        ),

                                    ])

                                ]
                            }
                        });
                    },
                    visible: true,
                    aTargets: [10],
                    orderable: true,

                }


            ],
            fnRowCallback: function(nRow, aData, iDisplayIndex, iDisplayIndexFull) {

            },
        };
    }

    static arqTableCultivos() {
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
                    title: "Cultivo:",
                },
                {
                    title: "Ubicación:",
                },
                {
                    title: "Tipo:",
                },

                {
                    title: "Inicio:",
                },
                {
                    title: "Retiro:",
                },

                {
                    title: "Cambio:",
                },
                {
                    title: "Curación:",
                },
                {
                    title: "Condición:",
                },
                {
                    title: "Observación:",
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
                        return full.cultivo;
                    },

                    visible: true,
                    aTargets: [1],
                    orderable: true,

                },
                {
                    mRender: function(data, type, full) {
                        return full.ubicacion;
                    },
                    visible: true,
                    aTargets: [2],
                    orderable: true,

                },
                {
                    mRender: function(data, type, full) {
                        return full.tipo;
                    },
                    visible: true,
                    aTargets: [3],
                    orderable: true,
                },
                {
                    mRender: function(data, type, full) {
                        return full.inicio;
                    },
                    visible: true,
                    aTargets: [4],
                    orderable: true,


                },
                {
                    mRender: function(data, type, full) {
                        return full.retiro;
                    },
                    visible: true,
                    aTargets: [5],
                    orderable: true,


                },
                {
                    mRender: function(data, type, full) {
                        return full.cambio;
                    },
                    visible: true,
                    aTargets: [6],
                    orderable: true,


                },
                {
                    mRender: function(data, type, full) {
                        return full.curacion;
                    },
                    visible: true,
                    aTargets: [7],
                    orderable: true,


                },
                {
                    mRender: function(data, type, full) {
                        return full.condicion;
                    },
                    visible: true,
                    aTargets: [8],
                    orderable: true,


                },
                {
                    mRender: function(data, type, full) {
                        return full.observacion;
                    },
                    visible: true,
                    aTargets: [9],
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

                                                },
                                            },
                                            'Eliminar',
                                        ),

                                    ])

                                ]
                            }
                        });
                    },
                    visible: true,
                    aTargets: [10],
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

    static vTableVias(idTable, dataTable, arqTable) {
        return [
            m(TableUCI, { idTable: idTable, dataTable: dataTable, arqTable: arqTable })
        ]
    }

    static vTableAccesos(idTable, dataTable, arqTable) {
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