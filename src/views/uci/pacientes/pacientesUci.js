import m from "mithril";
import App from "../../../models/App";
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
import MarcapasosUci from "./marcapasos";
import FecthUci from "./fecthUci";


// Pacientes UCI
class PacientesUCI extends App {
    static pacientes = null;
    static dataPte = null;
    static numeroHistoriaClinica = null;
    static numeroAtencion = null;
    static numeroTurno = null;
    static fechaHoraTurno = null;
    static idFiltro = 1;
    static fechaHasta = null;
    static fechaDesde = null;
    constructor(_data) {
        super();
        App.setTitle("Pacientes U.C.I.");
        this.view = PacientesUCI.page;
        PacientesUCI.numeroHistoriaClinica = _data.attrs.numeroHistoriaClinica;
        PacientesUCI.numeroAtencion = _data.attrs.numeroAtencion;
        PacientesUCI.numeroTurno = (_data.attrs.numeroTurno !== undefined ? _data.attrs.numeroTurno : null);
        PacientesUCI.validarAtencion();

    }
    oncreate(_data) {

    }



    static validarAtencion() {

        FecthUci.validarAtencion();
    }

    static showSecciones() {
        CuidadosUci.show = true;
        CuidadosUci.registros = PacientesUCI.parseSeccion(Array.from(document.getElementById('sec_CuidadosGenerales').options));
        ViasUci.show = true;
        ViasUci.registros = PacientesUCI.parseSeccion(Array.from(document.getElementById('sec_Vias').options));
        AccesosUci.show = true;
        AccesosUci.registros = PacientesUCI.parseSeccion(Array.from(document.getElementById('sec_Accesos').options));
        CateterUci.show = true;
        CateterUci.registros = PacientesUCI.setSeccion(Array.from(document.getElementById('sec_Cateter').options));
        VentilcacionUci.show = true;
        HemodialisisUci.show = true;
        CultivosUci.show = true;
        CultivosUci.registros = PacientesUCI.parseSeccion(Array.from(document.getElementById('sec_Cultivos').options));
        CuidadosUci.show = true;
        MarcapasosUci.show = true;
    }


    static vMainProfile() {
        return [
            m("div.content.content-components", {
                    style: { "margin-right": "0px", "margin-left": "0px", "margin-top": "0px" }
                },
                m("div.container.mg-l-0.mg-r-0", {
                    style: { "max-width": "100%" }
                }, [
                    m("table.table.table-bordered.table-sm.tx-14", [
                        m("thead.bd.bd-2", {
                                style: { "border-color": "#5173a1" }
                            },

                            m("tr.tx-uppercase", {
                                style: { "background-color": "#CCCCFF", }
                            }, [
                                m("th[scope='col'][colspan='12']",
                                    "Registro de Turnos:"
                                ),

                            ])
                        ),
                        m('tbody.bd.bd-2', {
                            style: { "border-color": "#5173a1" }
                        }, [

                            m("tr.bd.bd-2.text-right", {
                                style: { "border-color": "#5173a1" }
                            }, [
                                m("td[colspan='6']", ),
                                m("td[colspan='6']",
                                    m("button.btn.btn-xs.btn-primary.tx-semibold.tx-14.mg-r-2[type='button']", {
                                        onclick: () => {
                                            TurnosUci.iniciarTurno();
                                            PacientesUCI.vReloadTable('table-turnos', TurnosUci.getTurnos());
                                        }
                                    }, "Registrar Nuevo Turno"),
                                    (FecthUci.dataSecciones.length > 0 ? [
                                        m("button.btn.btn-xs.btn-secondary.tx-semibold.tx-14[type='button']", {
                                            onclick: () => {
                                                PacientesUCI.showSecciones();
                                            }
                                        }, "Ver Historial")
                                    ] : [])
                                ),

                            ]),
                            m("tr", [
                                m("td[colspan='12']", [
                                    PacientesUCI.vTable('table-turnos', TurnosUci.getTurnos(), PacientesUCI.arqTableTurnos())
                                ])
                            ]),
                            m('br')

                        ]),
                        //Cuidados Generales
                        m(CuidadosUci),
                        //Vias
                        m(ViasUci),
                        //Accesos
                        m(AccesosUci),
                        //Cateter
                        m(CateterUci),
                        // Manejo de Ventilzacion
                        m("thead.d-none",

                            m("tr.tx-uppercase", {

                                style: { "background-color": "#CCCCFF" },
                                class: (TurnosUci.nuevoTurno !== null && TurnosUci.nuevoTurno.gestion == 1 ? '' : 'd-none')

                            }, [
                                m("th.tx-semibold[scope='col'][colspan='12']",
                                    "MANEJO DE VENTILIZACIÓN:"
                                ),

                            ])
                        ),
                        m("tbody.d-none ", {
                            class: (VentilcacionUci.show ? '' : 'd-none')
                        }, [



                            m("tr.tx-uppercase", {
                                style: { "background-color": "rgb(238, 249, 200)" }
                            }, [
                                m("th[scope='col'][colspan='3']",
                                    "MANEJO DE VENTILIZACIÓN: "
                                ),
                                m("th[scope='col'][colspan='3']",
                                    "AM: "
                                ),
                                m("th[scope='col'][colspan='3']",
                                    "PM: "
                                ),
                                m("th[scope='col'][colspan='3']",
                                    "HS: "
                                ),

                            ]),
                            m("tr", [

                                m("td.tx-14.tx-normal[colspan='3']",
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
                                            id: "PosicionSemifowler",
                                            label: "POSICION SEMIFOWLER"
                                        }, {
                                            id: "BolsaReanimacion",
                                            label: "BOLSA DE REANIMACION"
                                        },
                                        {
                                            id: "CorrugadoSinVaporCondesado",
                                            label: "CORRUGADO SIN VAPOR CONDENSADO"
                                        },
                                        {
                                            id: "FiltroFinalRespiratorio",
                                            label: "USO DE FILTRO FINAL RESPIRATORIO"
                                        },
                                        {
                                            id: "RegistroRotacionTetHoras",
                                            label: "REGISTRO DE ROTACION DE TET CADA 12 HORAS"
                                        },
                                        {
                                            id: "RegistroCambioCircuito",
                                            label: "REGISTRO DE CAMBIO DE CIRCUITO"
                                        },
                                        {
                                            id: "CambioFiltroHoras",
                                            label: "CAMBIO DE FILTRO CADA 12 HORAS"
                                        },
                                        {
                                            id: "RegistroDiasEnfermeria",
                                            label: "REGISTRO DIAS VM HOJA DE ENFERMERIA"
                                        }
                                    ].map(x =>
                                        m('option[id="' + x.id + '"]', x.label)
                                    ))
                                ),
                                m("td.tx-14.tx-normal[colspan='3']",
                                    (VentilcacionUci.nuevoRegistro !== null ? [
                                        m('div.d-flex', [
                                            m("input", {
                                                id: "am" + VentilcacionUci.nuevoRegistro.id,
                                                class: "form-control tx-semibold tx-14",
                                                type: "text",
                                                placeholder: "...",
                                                oninput: (e) => {
                                                    VentilcacionUci.nuevoRegistro.am = e.target.value;
                                                },
                                            })

                                        ]),
                                    ] : [])
                                ),
                                m("td.tx-14.tx-normal[colspan='3']",
                                    (VentilcacionUci.nuevoRegistro !== null ? [
                                        m('div.d-flex', [
                                            m("input", {
                                                id: "pm" + VentilcacionUci.nuevoRegistro.id,
                                                class: "form-control tx-semibold tx-14",
                                                type: "text",
                                                placeholder: "...",
                                                oninput: (e) => {
                                                    VentilcacionUci.nuevoRegistro.pm = e.target.value;
                                                },
                                            })

                                        ]),
                                    ] : [])
                                ),

                                m("td.tx-14.tx-normal[colspan='3']",
                                    (VentilcacionUci.nuevoRegistro !== null ? [
                                        m('div.d-flex', [
                                            m("input", {
                                                id: "hs" + VentilcacionUci.nuevoRegistro.id,
                                                class: "form-control tx-semibold tx-14",
                                                type: "text",
                                                placeholder: "...",
                                                oninput: (e) => {
                                                    VentilcacionUci.nuevoRegistro.hs = e.target.value;
                                                },
                                            })

                                        ]),
                                    ] : [])
                                ),
                            ]),
                            m("tr.tx-uppercase", {
                                style: { "background-color": "rgb(238, 249, 200)" }
                            }, [
                                m("th[scope='col'][colspan='12']",
                                    "OBSERVACIÓN: "
                                ),


                            ]),
                            m('tr', [
                                m("td.tx-14.tx-normal[colspan='12']",
                                    (VentilcacionUci.nuevoRegistro !== null ? [
                                        m("input", {
                                            id: "observacion" + VentilcacionUci.nuevoRegistro.id,
                                            class: "form-control tx-semibold tx-14",
                                            type: "text",
                                            placeholder: "...",

                                            onkeypress: (e) => {
                                                if (e.keyCode == 13) {
                                                    VentilcacionUci.agregarRegistro();
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
                                    PacientesUCI.vTable('table-ventilacion', VentilcacionUci.getRegistros(), PacientesUCI.arqTableVentilacion())
                                ),
                            ]),
                        ]),
                        // Hemodialisis
                        m("thead.d-none",

                            m("tr.tx-uppercase", {

                                style: { "background-color": "#CCCCFF" },
                                class: (TurnosUci.nuevoTurno !== null && TurnosUci.nuevoTurno.gestion == 1 ? '' : 'd-none')

                            }, [
                                m("th.tx-semibold[scope='col'][colspan='12']",
                                    "CATETER VIA CENTRAL O HEMODIALISIS:"
                                ),

                            ])
                        ),
                        m("tbody.d-none", {
                            class: (HemodialisisUci.show ? '' : 'd-none')
                        }, [



                            m("tr.tx-uppercase", {
                                style: { "background-color": "rgb(238, 249, 200)" }
                            }, [
                                m("th[scope='col'][colspan='3']",
                                    "CATETER VIA CENTRAL O HEMODIALISIS: "
                                ),
                                m("th[scope='col'][colspan='3']",
                                    "AM: "
                                ),
                                m("th[scope='col'][colspan='3']",
                                    "PM: "
                                ),
                                m("th[scope='col'][colspan='3']",
                                    "HS: "
                                ),

                            ]),
                            m("tr", [

                                m("td.tx-14.tx-normal[colspan='3']",
                                    m('select.tx-semibold', {
                                        onchange: (e) => {
                                            let _id = e.target.options[e.target.selectedIndex].id;
                                            let _value = e.target.options[e.target.selectedIndex].value;
                                            HemodialisisUci.iniciarRegistro();
                                            HemodialisisUci.nuevoRegistro.id = _id;
                                            HemodialisisUci.nuevoRegistro.ventilacion = _value;
                                        },
                                        class: "custom-select"
                                    }, m('option', 'Seleccione...'), [{
                                            id: "ParcheLimpioSeco",
                                            label: "PARCHE LIMPIO Y SECO"
                                        }, {
                                            id: "FechaCuracionParche",
                                            label: "FECHA DE CURACION SOBRE PARCHE"
                                        },
                                        {
                                            id: "TodosAccesosTapados",
                                            label: "TODOS LOS ACCESOS TAPADOS"
                                        },
                                        {
                                            id: "RegistroNumerosDias",
                                            label: "REGISTRO DE NUMEROS DE DIAS"
                                        },
                                        {
                                            id: "RegistroCambioEquipo",
                                            label: "REGISTRO DE CAMBIO DE EQUIPO"
                                        }
                                    ].map(x =>
                                        m('option[id="' + x.id + '"]', x.label)
                                    ))
                                ),
                                m("td.tx-14.tx-normal[colspan='3']",
                                    (HemodialisisUci.nuevoRegistro !== null ? [
                                        m('div.d-flex', [
                                            m("input", {
                                                id: "am" + HemodialisisUci.nuevoRegistro.id,
                                                class: "form-control tx-semibold tx-14",
                                                type: "text",
                                                placeholder: "...",
                                                oninput: (e) => {
                                                    HemodialisisUci.nuevoRegistro.am = e.target.value;
                                                },
                                            })

                                        ]),
                                    ] : [])
                                ),
                                m("td.tx-14.tx-normal[colspan='3']",
                                    (HemodialisisUci.nuevoRegistro !== null ? [
                                        m('div.d-flex', [
                                            m("input", {
                                                id: "pm" + HemodialisisUci.nuevoRegistro.id,
                                                class: "form-control tx-semibold tx-14",
                                                type: "text",
                                                placeholder: "...",
                                                oninput: (e) => {
                                                    HemodialisisUci.nuevoRegistro.pm = e.target.value;
                                                },
                                            })

                                        ]),
                                    ] : [])
                                ),

                                m("td.tx-14.tx-normal[colspan='3']",
                                    (HemodialisisUci.nuevoRegistro !== null ? [
                                        m('div.d-flex', [
                                            m("input", {
                                                id: "hs" + HemodialisisUci.nuevoRegistro.id,
                                                class: "form-control tx-semibold tx-14",
                                                type: "text",
                                                placeholder: "...",
                                                oninput: (e) => {
                                                    HemodialisisUci.nuevoRegistro.hs = e.target.value;
                                                },
                                            })

                                        ]),
                                    ] : [])
                                ),
                            ]),
                            m("tr.tx-uppercase", {
                                style: { "background-color": "rgb(238, 249, 200)" }
                            }, [
                                m("th[scope='col'][colspan='12']",
                                    "OBSERVACIÓN: "
                                ),


                            ]),
                            m('tr', [
                                m("td.tx-14.tx-normal[colspan='12']",
                                    (HemodialisisUci.nuevoRegistro !== null ? [
                                        m("input", {
                                            id: "observacion" + HemodialisisUci.nuevoRegistro.id,
                                            class: "form-control tx-semibold tx-14",
                                            type: "text",
                                            placeholder: "...",

                                            onkeypress: (e) => {
                                                if (e.keyCode == 13) {
                                                    HemodialisisUci.agregarRegistro();
                                                    PacientesUCI.vReloadTable('table-hemodialisis', VentilcacionUci.getRegistros());
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
                                    PacientesUCI.vTable('table-hemodialisis', HemodialisisUci.getRegistros(), PacientesUCI.arqTableHemodialisis())
                                ),
                            ]),
                        ]),
                        //Cultivos
                        m(CultivosUci),
                        // Marcapasos
                        m("thead.d-none",

                            m("tr.tx-uppercase", {

                                style: { "background-color": "#CCCCFF" },

                            }, [
                                m("th.tx-semibold[scope='col'][colspan='12']",
                                    "MARCAPASOS:"
                                ),

                            ])
                        ),
                        m("tbody.d-none", {
                            class: (MarcapasosUci.show ? '' : 'd-none')
                        }, [



                            m("tr.tx-uppercase", {
                                style: { "background-color": "rgb(238, 249, 200)" }
                            }, [
                                m("th[scope='col'][colspan='3']",
                                    "HORA:"
                                ),
                                m("th[scope='col'][colspan='3']",
                                    "AM: "
                                ),
                                m("th[scope='col'][colspan='3']",
                                    "PM: "
                                ),
                                m("th[scope='col'][colspan='3']",
                                    "HS: "
                                ),

                            ]),
                            m("tr", [

                                m("td.tx-14.tx-normal[colspan='3']",
                                    m('select.tx-semibold', {
                                        onchange: (e) => {
                                            let _id = e.target.options[e.target.selectedIndex].id;
                                            let _value = e.target.options[e.target.selectedIndex].value;
                                            MarcapasosUci.iniciarRegistro();
                                            MarcapasosUci.nuevoRegistro.id = _id;
                                            MarcapasosUci.nuevoRegistro.hora = _value;
                                        },
                                        class: "custom-select"
                                    }, m('option', 'Seleccione...'), [{
                                            id: "Frecuencia",
                                            label: "Frecuencia"
                                        }, {
                                            id: "Unipolar",
                                            label: "UNIPOLAR"
                                        },
                                        {
                                            id: "Bipolar",
                                            label: "BIPOLAR"
                                        },
                                        {
                                            id: "Miliamperios",
                                            label: "MILIAMPERIOS"
                                        },
                                        {
                                            id: "Milivoltios",
                                            label: "MILIVOLTIOS"
                                        },
                                        {
                                            id: "Sensibilidad",
                                            label: "SENSIBILIDAD"
                                        }
                                    ].map(x =>
                                        m('option[id="' + x.id + '"]', x.label)
                                    ))
                                ),
                                m("td.tx-14.tx-normal[colspan='3']",
                                    (MarcapasosUci.nuevoRegistro !== null ? [
                                        m('div.d-flex', [
                                            m("input", {
                                                id: "am" + MarcapasosUci.nuevoRegistro.id,
                                                class: "form-control tx-semibold tx-14",
                                                type: "text",
                                                placeholder: "...",
                                                oninput: (e) => {
                                                    MarcapasosUci.nuevoRegistro.am = e.target.value;
                                                },
                                            })

                                        ]),
                                    ] : [])
                                ),
                                m("td.tx-14.tx-normal[colspan='3']",
                                    (MarcapasosUci.nuevoRegistro !== null ? [
                                        m('div.d-flex', [
                                            m("input", {
                                                id: "pm" + MarcapasosUci.nuevoRegistro.id,
                                                class: "form-control tx-semibold tx-14",
                                                type: "text",
                                                placeholder: "...",
                                                oninput: (e) => {
                                                    MarcapasosUci.nuevoRegistro.pm = e.target.value;
                                                },
                                            })

                                        ]),
                                    ] : [])
                                ),

                                m("td.tx-14.tx-normal[colspan='3']",
                                    (MarcapasosUci.nuevoRegistro !== null ? [
                                        m('div.d-flex', [
                                            m("input", {
                                                id: "hs" + MarcapasosUci.nuevoRegistro.id,
                                                class: "form-control tx-semibold tx-14",
                                                type: "text",
                                                placeholder: "...",
                                                oninput: (e) => {
                                                    MarcapasosUci.nuevoRegistro.hs = e.target.value;
                                                },
                                            })

                                        ]),
                                    ] : [])
                                ),
                            ]),
                            m("tr.tx-uppercase", {
                                style: { "background-color": "rgb(238, 249, 200)" }
                            }, [
                                m("th[scope='col'][colspan='12']",
                                    "OBSERVACIÓN: "
                                ),


                            ]),
                            m('tr', [
                                m("td.tx-14.tx-normal[colspan='12']",
                                    (MarcapasosUci.nuevoRegistro !== null ? [
                                        m("input", {
                                            id: "observacion" + MarcapasosUci.nuevoRegistro.id,
                                            class: "form-control tx-semibold tx-14",
                                            type: "text",
                                            placeholder: "...",

                                            onkeypress: (e) => {
                                                if (e.keyCode == 13) {
                                                    MarcapasosUci.agregarRegistro();
                                                    PacientesUCI.vReloadTable('table-marcapasos', MarcapasosUci.getRegistros());
                                                    MarcapasosUci.nuevoRegistro = null;
                                                }
                                            },
                                            oninput: (e) => {
                                                MarcapasosUci.nuevoRegistro.observacion = e.target.value;
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
                                    PacientesUCI.vTable('table-marcapasos', MarcapasosUci.getRegistros(), PacientesUCI.arqTableMarcapasos())
                                ),
                            ]),
                        ]),
                        // Ventilatorios
                        m("thead.d-none",

                            m("tr.tx-uppercase", {

                                style: { "background-color": "#CCCCFF" },

                            }, [
                                m("th.tx-semibold[scope='col'][colspan='12']",
                                    "MODOS VENTILATORIOS / VARIABLES"
                                ),

                            ])
                        ),
                        m("tbody.d-none", {
                            class: (VentilcacionUci.show ? '' : 'd-none')
                        }, [



                            m("tr.tx-uppercase", {
                                style: { "background-color": "rgb(238, 249, 200)" }
                            }, [
                                m("th[scope='col'][colspan='4']",
                                    "VENTILATORIOS/VARIABLES:"
                                ),
                                m("th[scope='col'][colspan='4']",
                                    "CONDICIÓN: "
                                ),
                                m("th[scope='col'][colspan='4']",
                                    "HORA: "
                                ),


                            ]),
                            m("tr", [

                                m("td.tx-14.tx-normal[colspan='4']",
                                    m('select.tx-semibold', {
                                        onchange: (e) => {
                                            let _id = e.target.options[e.target.selectedIndex].id;
                                            let _value = e.target.options[e.target.selectedIndex].value;
                                            VentilcacionUci.iniciarRegistro();
                                            VentilcacionUci.nuevoRegistro.id = _id;
                                            VentilcacionUci.nuevoRegistro.ventilatorio = _value;
                                        },
                                        class: "custom-select"
                                    }, m('option', 'Seleccione...'), [{
                                            id: "ModoVentilatorio",
                                            label: "MODO VENTILARIO"
                                        }, {
                                            id: "PresionInspiratoria",
                                            label: "PRESION INSPIRATORIA"
                                        }, {
                                            id: "VolumenCorriente",
                                            label: "VOLUMEN CORRIENTE"
                                        }, {
                                            id: "VolumenCorrientePack",
                                            label: "VOLUMEN CORRIENTE PACK"
                                        },
                                        {
                                            id: "PresionSoporte",
                                            label: "PRESION SOPORTE"
                                        },
                                        {
                                            id: "PEEP",
                                            label: "PEEP"
                                        },
                                        {
                                            id: "FVR",
                                            label: "FVR"
                                        },
                                        {
                                            id: "FRPT",
                                            label: "FRPT"
                                        },
                                        {
                                            id: "FIO2",
                                            label: "FIO2"
                                        },
                                        {
                                            id: "PAFI",
                                            label: "PAFI"
                                        },
                                        {
                                            id: "RelacionIE",
                                            label: "RELACION I:E"
                                        },
                                        {
                                            id: "TInspiracion",
                                            label: "T. INSPIRACION"
                                        },
                                        {
                                            id: "PresionPico",
                                            label: "PRESION PICO"
                                        },
                                        {
                                            id: "PresionMedia",
                                            label: "PRESION MEDIA"
                                        },
                                        {
                                            id: "Compliance",
                                            label: "COMPLIANCE"
                                        },
                                        {
                                            id: "ResistenciaPulmonar",
                                            label: "RESISTENCIA PULMONAR"
                                        },
                                        {
                                            id: "Hercios",
                                            label: "HERCIOS"
                                        },
                                        {
                                            id: "PresionMediaVia",
                                            label: "PRESION MEDIA VIA"
                                        },
                                        {
                                            id: "Flujo",
                                            label: "FLUJO"
                                        },
                                        {
                                            id: "Amplitud",
                                            label: "AMPLITUD"
                                        },
                                        {
                                            id: "DO2",
                                            label: "DO2"
                                        },
                                        {
                                            id: "DCO2",
                                            label: "DCO2"
                                        },
                                        {
                                            id: "VolumenAltaHere",
                                            label: "VOLUMEN ALTA HERE"
                                        },
                                        {
                                            id: "FijacionTet",
                                            label: "FIJACION TET"
                                        }
                                    ].map(x =>
                                        m('option[id="' + x.id + '"]', x.label)
                                    ))
                                ),
                                m("td.tx-14.tx-normal[colspan='4']",
                                    (VentilcacionUci.nuevoRegistro !== null ? [
                                        m('div.d-flex', [
                                            m("input", {
                                                id: "condicion" + VentilcacionUci.nuevoRegistro.id,
                                                class: "form-control tx-semibold tx-14",
                                                type: "text",
                                                placeholder: "...",
                                                oninput: (e) => {
                                                    VentilcacionUci.nuevoRegistro.condicion = e.target.value;
                                                },
                                            })

                                        ]),
                                    ] : [])
                                ),
                                m("td.tx-14.tx-normal[colspan='4']",
                                    (VentilcacionUci.nuevoRegistro !== null ? [
                                        m('div.d-flex', [
                                            m("input", {
                                                id: "hora" + VentilcacionUci.nuevoRegistro.id,
                                                class: "form-control tx-semibold tx-14",
                                                type: "text",
                                                placeholder: "...",
                                                oninput: (e) => {
                                                    VentilcacionUci.nuevoRegistro.hora = e.target.value;
                                                },
                                            })

                                        ]),
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
                                    PacientesUCI.vTable('table-ventilatorios', VentilcacionUci.getRegistros(), PacientesUCI.arqTableVentilatorios())
                                ),
                            ]),
                        ]),

                    ])
                ])
            ),
        ];
    }
    static vMenu() {
        return m(Sidebar, { page: 'uci/pacientes' });
    }

    static parseSeccion(options) {
        let res = [];
        let result = [];
        let _arr = [];
        let hash = {};

        // console.log(33, FecthUci.dataSecciones)

        options.map((option) => {
            FecthUci.dataSecciones.filter((obj) => {
                let _obj = JSON.parse(obj.DATASECCION);
                if (_obj.id === option.id) {
                    res.push(_obj);
                }
            });
        });

        // Quitar duplicados
        result = res.filter(o => hash[o.nro] ? false : hash[o.nro] = true);
        // console.log(33, result);

        // Ordenar desc
        _arr = result.sort((a, b) => a.nro - b.nro);
        // console.log(22, _arr)
        return _arr;
    }

    static setSeccion(options) {
        let res = [];
        let result = [];
        let _arr = [];
        let hash = {};

        console.log(33, options)

        options.map((option) => {
            if (option.value != 0) {
                CateterUci.iniciarRegistro();
                CateterUci.nuevoRegistro.id = option.id;
                CateterUci.nuevoRegistro.cateter = option.value;
                CateterUci.nuevoRegistro.numeroTurno = PacientesUCI.numeroTurno;
                CateterUci.nuevoRegistro.fechaHoraTurno = PacientesUCI.fechaHoraTurno;
                CateterUci.agregarRegistro();
                res.push(CateterUci.nuevoRegistro);
                CateterUci.nuevoRegistro = null;
            }

        });

        // Quitar duplicados
        result = res.filter(o => hash[o.nro] ? false : hash[o.nro] = true);
        // console.log(33, result);


        // Ordenar desc
        _arr = result.sort((a, b) => a.nro - b.nro);
        // console.log(22, _arr)

        _arr.map((_v, _i) => {
            FecthUci.dataSecciones.filter((obj) => {
                let _obj = JSON.parse(obj.DATASECCION);
                if (_obj.id === _v.id) {
                    _arr[_i] = _obj;
                }
            });
        });

        return _arr;
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
                [0, 'Asc']
            ],
            columns: [{
                    title: "N° : ",
                },
                {
                    title: "Fecha Turno:",
                },
                {
                    title: "Hora Turno:",
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
                    title: "Gestionar:",
                },
                {
                    title: "Cerrar:",
                }
            ],
            aoColumnDefs: [{
                    mRender: function(data, type, full) {
                        return full.numeroTurno;
                    },

                    visible: true,
                    aTargets: [0],
                    orderable: false,
                },
                {

                    fnCreatedCell: function(nTd, sData, oData, iRow, iCol) {
                        return m.mount(nTd, {
                            view: () => {
                                return [
                                    m("input.form-control.tx-13.tx-semibold[type='text'][placeholder='DD/MM/YYYY]", {
                                        id: 'fechaTurno',
                                        disabled: true,
                                        oncreate: (el) => {
                                            if (oData.fechaTurno !== undefined) {
                                                el.dom.value = moment(oData.fechaTurno, 'DD-MM-YYYY').format('DD/MM/YYYY');
                                            }
                                            setTimeout(() => {
                                                new Cleave("#fechaTurno", {
                                                    date: true,
                                                    datePattern: ["d", "m", "Y"]
                                                });
                                            }, 50);
                                        },
                                    }),
                                ]
                            }
                        });
                    },
                    width: '20%',
                    visible: true,
                    aTargets: [1],
                    orderable: false,

                },
                {
                    fnCreatedCell: function(nTd, sData, oData, iRow, iCol) {

                        let _d = true;
                        return m.mount(nTd, {
                            view: () => {
                                return [

                                    m("div.input-group", [
                                        m("input.form-control.tx-13.tx-semibold[type='text'][placeholder='HH:mm]", {
                                            id: 'horaTurno',
                                            disabled: _d,
                                            oncreate: (el) => {
                                                if (oData.horaTurno !== undefined) {
                                                    el.dom.value = oData.horaTurno;
                                                }
                                                setTimeout(() => {
                                                    new Cleave("#horaTurno", {
                                                        time: true,
                                                        timePattern: ['h', 'm']
                                                    });
                                                }, 50);
                                            },
                                            oninput: (e) => {
                                                setTimeout(() => {
                                                    oData.horaTurno = e.target.value;
                                                    TurnosUci.nuevoTurno.horaTurno = e.target.value;
                                                }, 50);
                                            },
                                            onkeypress: (e) => {
                                                if (e.keyCode == 13) {
                                                    _d = true;
                                                    PacientesUCI.fechaHoraTurno = oData.fechaTurno + ' ' + oData.horaTurno;
                                                    FecthUci.actualizarHoraAtencion();
                                                    PacientesUCI.vReloadTable('table-turnos', TurnosUci.getTurnos());
                                                }
                                            },
                                        }),
                                        m("div.input-group-append", {
                                                class: (oData.status == 1 ? '' : 'd-none')
                                            },
                                            m("button.btn.btn-xs.btn-light[type='button']", {
                                                    title: "Editar Hora",
                                                    onclick: () => {
                                                        _d = !_d;
                                                    }
                                                },
                                                m("i.fas.fa-edit")
                                            )
                                        )
                                    ])

                                ]
                            }
                        });
                    },
                    width: '20%',
                    visible: true,
                    aTargets: [2],
                    orderable: false,

                },
                {

                    fnCreatedCell: function(nTd, sData, oData, iRow, iCol) {
                        return m.mount(nTd, {
                            view: () => {
                                return [
                                    m("input.form-control.tx-13.tx-semibold[type='text']", {
                                        disabled: 'disabled',
                                        oncreate: (el) => {
                                            if (oData.usuarioTurno !== undefined) {
                                                el.dom.value = oData.usuarioTurno;
                                            }
                                        },
                                    }),
                                ]
                            }
                        });
                    },
                    width: '20%',
                    visible: true,
                    aTargets: [3],
                    orderable: false,

                },
                {
                    mRender: function(data, type, full) {
                        return full.paciente;
                    },
                    visible: false,
                    aTargets: [4],
                    orderable: false,
                },
                {
                    mRender: function(data, type, full) {
                        return full.especialidad;
                    },
                    visible: false,
                    aTargets: [5],
                    orderable: false,


                },
                {
                    fnCreatedCell: function(nTd, sData, oData, iRow, iCol) {

                        return m.mount(nTd, {
                            view: () => {
                                return [
                                    m('div.text-center', [
                                        m("button.btn-xs.btn-block.tx-13[type='button']", {
                                                class: (oData.status == 1 ? 'bg-warning' : 'bg-success'),
                                            },
                                            (oData.status == 1 ? 'Turno Abierto' : ''),
                                            (oData.status == 2 ? 'Turno Cerado' : ''),
                                        ),

                                    ])

                                ]
                            }
                        });
                    },
                    width: '10%',
                    visible: true,
                    aTargets: [6],
                    orderable: false,
                },
                {
                    fnCreatedCell: function(nTd, sData, oData, iRow, iCol) {
                        return m.mount(nTd, {
                            view: () => {
                                return [
                                    m('div.text-center', [
                                        m("button.btn.btn-xs.btn-block.btn-success.tx-13[type='button']", {
                                                disabled: (oData.status == 1 && FecthUci.dataSecciones !== null ? '' : 'disabled'),
                                                onclick: () => {
                                                    TurnosUci.nuevoTurno = oData;
                                                    oData.iniciarGestion();
                                                    PacientesUCI.fechaHoraTurno = oData.fechaTurno + ' ' + oData.horaTurno;
                                                    PacientesUCI.showSecciones();
                                                },
                                            },
                                            'Gestionar',
                                        ),


                                    ])

                                ]
                            }
                        });
                    },
                    width: '10%',
                    visible: true,
                    aTargets: [7],
                    orderable: false,

                },
                {
                    fnCreatedCell: function(nTd, sData, oData, iRow, iCol) {
                        return m.mount(nTd, {
                            view: () => {
                                return [
                                    m('div.text-center', [
                                        m("button.btn.btn-xs.btn-block.btn-danger.tx-13[type='button']", {
                                                disabled: (oData.status == 1 && FecthUci.dataSecciones !== null ? '' : 'disabled'),

                                                onclick: () => {
                                                    oData.cerrarTurno();
                                                    FecthUci.cerrarTurno();
                                                },
                                            },
                                            'Cerrar',
                                        ),

                                    ])

                                ]
                            }
                        });
                    },
                    width: '10%',
                    visible: true,
                    aTargets: [8],
                    orderable: false,

                }


            ],
            fnRowCallback: function(nRow, aData, iDisplayIndex, iDisplayIndexFull) {

            },
        };
    }






    static arqTableMarcapasos() {
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
                    title: "Hora:",
                },
                {
                    title: "AM:",
                },
                {
                    title: "PM:",
                },
                {
                    title: "HS:",
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
                        return full.hora;
                    },

                    visible: true,
                    aTargets: [1],
                    orderable: true,

                },
                {
                    mRender: function(data, type, full) {
                        return full.am;
                    },
                    visible: true,
                    aTargets: [2],
                    orderable: true,

                },
                {
                    mRender: function(data, type, full) {
                        return full.pm;
                    },
                    visible: true,
                    aTargets: [3],
                    orderable: true,


                },
                {
                    mRender: function(data, type, full) {
                        return full.hs;
                    },
                    visible: true,
                    aTargets: [4],
                    orderable: true,


                },
                {
                    mRender: function(data, type, full) {
                        return full.observacion;
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
                    aTargets: [6],
                    orderable: true,

                }


            ],
            fnRowCallback: function(nRow, aData, iDisplayIndex, iDisplayIndexFull) {

            },
        };
    }

    static arqTableVentilatorios() {
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
                    title: "Ventilatorio:",
                },
                {
                    title: "Condición:",
                },
                {
                    title: "Hora:",
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
                        return full.ventilatorio;
                    },

                    visible: true,
                    aTargets: [1],
                    orderable: true,

                },
                {
                    mRender: function(data, type, full) {
                        return full.condicion;
                    },
                    visible: true,
                    aTargets: [2],
                    orderable: true,

                },
                {
                    mRender: function(data, type, full) {
                        return full.hora;
                    },
                    visible: true,
                    aTargets: [3],
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
                    aTargets: [4],
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
                    title: "AM:",
                },
                {
                    title: "PM:",
                },

                {
                    title: "HS:",
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
                        return full.am;
                    },
                    visible: true,
                    aTargets: [2],
                    orderable: true,

                },
                {
                    mRender: function(data, type, full) {
                        return full.pm;
                    },
                    visible: true,
                    aTargets: [3],
                    orderable: true,
                },
                {
                    mRender: function(data, type, full) {
                        return full.hs;
                    },
                    visible: true,
                    aTargets: [4],
                    orderable: true,


                },
                {
                    mRender: function(data, type, full) {
                        return full.observacion;
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
                    aTargets: [7],
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
                    title: "Ventilación:",
                },
                {
                    title: "AM:",
                },
                {
                    title: "PM:",
                },

                {
                    title: "HS:",
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
                        return full.am;
                    },
                    visible: true,
                    aTargets: [2],
                    orderable: true,

                },
                {
                    mRender: function(data, type, full) {
                        return full.pm;
                    },
                    visible: true,
                    aTargets: [3],
                    orderable: true,
                },
                {
                    mRender: function(data, type, full) {
                        return full.hs;
                    },
                    visible: true,
                    aTargets: [4],
                    orderable: true,


                },
                {
                    mRender: function(data, type, full) {
                        return full.observacion;
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


    static vTable(idTable, dataTable, arqTable) {
        return [
            m(TableUCI, { idTable: idTable, dataTable: dataTable, arqTable: arqTable })
        ]
    }

    static page() {
        return [
            PacientesUCI.vMainProfile()
        ];
    }
}


export default PacientesUCI;