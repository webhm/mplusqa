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
                                    m("button.btn.btn-xs.btn-primary.tx-semibold[type='button']", {
                                        onclick: () => {
                                            TurnosUci.iniciarTurno();
                                            PacientesUCI.vReloadTable('table-turnos', TurnosUci.getTurnos().reverse());
                                        }
                                    }, "Registar Nuevo Turno")
                                ),

                            ]),

                            m("tr", [
                                m("td[colspan='12']", [
                                    PacientesUCI.vTable('table-turnos', TurnosUci.getTurnos(), PacientesUCI.arqTableTurnos())
                                ])
                            ])

                        ]),
                        // Cuidados Generales
                        m("thead.bd.bd-2", {
                                style: { "border-color": "#5173a1" }
                            },

                            m("tr.tx-uppercase", {
                                style: { "background-color": "#CCCCFF" },

                                class: (CuidadosUci.show ? '' : 'd-none')
                            }, [
                                m("th.tx-semibold[scope='col'][colspan='12']",
                                    "CUIDADOS GENERALES: "
                                ),


                            ])

                        ),
                        m("tbody.bd.bd-2", {
                            style: { "border-color": "#5173a1" },
                            class: (CuidadosUci.show ? '' : 'd-none')
                        }, [
                            m("tr.bd.bd-2.tx-uppercase", {
                                style: { "background-color": "rgb(238, 249, 200)", "border-color": "#5173a1" }
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
                            m("tr.bd.bd-2", {
                                style: { "border-color": "#5173a1" }
                            }, [

                                m("td.tx-14.tx-normal[colspan='3']",
                                    m('select.tx-semibold', {
                                        id: 'sec_CuidadosGenerales',
                                        onchange: (e) => {
                                            let _id = e.target.options[e.target.selectedIndex].id;
                                            let _value = e.target.options[e.target.selectedIndex].value;
                                            if (CuidadosUci.nuevoRegistro == null) {
                                                CuidadosUci.iniciarRegistro();
                                                CuidadosUci.nuevoRegistro.id = _id;
                                                CuidadosUci.nuevoRegistro.cuidado = _value;
                                            } else {
                                                CuidadosUci.nuevoRegistro.id = _id;
                                                CuidadosUci.nuevoRegistro.cuidado = _value;
                                            }
                                        },
                                        class: "custom-select"
                                    }, m('option', 'Seleccione...'), [{
                                            id: "CambiosPosicion",
                                            label: "CAMBIOS DE POSICIÓN"
                                        }, {
                                            id: "CuidadosPiel",
                                            label: "CUIDADOS DE PIEL"
                                        }, {
                                            id: "HigieneOral",
                                            label: "HIGIENE ORAL"
                                        }, {
                                            id: "TerapiaRespiratoria",
                                            label: "TERAPIA RESPIRATORIA"
                                        }, {
                                            id: "AspiracionSecrreciones",
                                            label: "ASPIRACIÓN DE SECRECIONES"
                                        }, {
                                            id: "ControlDrenajes",
                                            label: "CONTROL DE DRENAJES"
                                        }, {
                                            id: "ControlSangrado",
                                            label: "CONTROL DE SANGRADO"
                                        }, {
                                            id: "ControlNeurologico",
                                            label: "CONTROL NEUROLÓGICO"
                                        }, {
                                            id: "EsquemaInsulima",
                                            label: "ESQUEMA DE INSULINA"
                                        },
                                        {
                                            id: "Posicion",
                                            label: "POSICIÓN"
                                        },
                                        {
                                            id: "Asilamiento",
                                            label: "AISLAMIENTO"
                                        },
                                        {
                                            id: "ControlTemperaturaMediosFisicos",
                                            label: "CONTROL DE TEMPERATURA POR MEDIOS FÍSICOS"
                                        },
                                        {
                                            id: "ControlMarcapasos",
                                            label: "CONTROL DE MARCAPASOS"
                                        },
                                        {
                                            id: "ControlPresionVenosaCentral",
                                            label: "CONTROL DE PRESION VENOSA CENTRAL"
                                        },
                                        {
                                            id: "RehabilitacionMotora",
                                            label: "REHABILITACIÓN MOTORA"
                                        },
                                        {
                                            id: "EnemaEvacuante",
                                            label: "ENEMA EVACUANTE"
                                        },
                                        {
                                            id: "ControlPulsosDistales",
                                            label: "CONTROL DE PULSOS DISTALES"
                                        }
                                    ].map(x =>
                                        m('option[id="' + x.id + '"]', x.label)
                                    ))
                                ),
                                m("td.tx-14.tx-normal[colspan='3']",
                                    (CuidadosUci.nuevoRegistro !== null ? [
                                        m("input", {
                                            id: "frecuencia" + CuidadosUci.nuevoRegistro.id,
                                            class: "form-control tx-semibold tx-14",
                                            type: "text",
                                            placeholder: "...",
                                            oninput: (e) => {
                                                CuidadosUci.nuevoRegistro.frecuencia = e.target.value;
                                            },
                                            value: CuidadosUci.nuevoRegistro.frecuencia
                                        })
                                    ] : [])
                                ),
                                m("td.tx-14.tx-normal[colspan='2']",
                                    (CuidadosUci.nuevoRegistro !== null ? [
                                        m("input", {
                                            id: "am" + CuidadosUci.nuevoRegistro.id,
                                            class: "form-control tx-semibold tx-14",
                                            type: "text",
                                            placeholder: "...",
                                            oninput: (e) => {
                                                CuidadosUci.nuevoRegistro.am = e.target.value;
                                            },
                                            value: CuidadosUci.nuevoRegistro.am
                                        })
                                    ] : [])
                                ),
                                m("td.tx-14.tx-normal[colspan='2']",
                                    (CuidadosUci.nuevoRegistro !== null ? [
                                        m("input", {
                                            id: "pm" + CuidadosUci.nuevoRegistro.id,
                                            class: "form-control tx-semibold tx-14",
                                            type: "text",
                                            placeholder: "...",
                                            oninput: (e) => {
                                                CuidadosUci.nuevoRegistro.pm = e.target.value;
                                            },
                                            value: CuidadosUci.nuevoRegistro.pm
                                        })
                                    ] : [])
                                ),

                                m("td.tx-14.tx-normal[colspan='2']",
                                    (CuidadosUci.nuevoRegistro !== null ? [
                                        m("input", {
                                            id: "hs" + CuidadosUci.nuevoRegistro.id,
                                            class: "form-control tx-semibold tx-14",
                                            type: "text",
                                            placeholder: "...",
                                            onkeypress: (e) => {
                                                if (e.keyCode == 13) {
                                                    CuidadosUci.nuevoRegistro.numeroTurno = PacientesUCI.numeroTurno;
                                                    if (CuidadosUci.nuevoRegistro.editar == null) {
                                                        CuidadosUci.agregarRegistro();
                                                        FecthUci.registrarSeccion(CuidadosUci.nuevoRegistro);
                                                        CuidadosUci.nuevoRegistro = null;
                                                        PacientesUCI.vReloadTable('table-cuidados', CuidadosUci.getRegistros());
                                                    } else {
                                                        CuidadosUci.editarRegistro();
                                                        FecthUci.actualizarSeccion(CuidadosUci.nuevoRegistro);
                                                        CuidadosUci.nuevoRegistro = null;
                                                        PacientesUCI.vReloadTable('table-cuidados', CuidadosUci.getRegistros());
                                                    }


                                                }
                                            },
                                            oninput: (e) => {
                                                CuidadosUci.nuevoRegistro.hs = e.target.value;
                                            },
                                            value: CuidadosUci.nuevoRegistro.hs
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
                                    (CuidadosUci.show != false ? [PacientesUCI.vTable('table-cuidados', CuidadosUci.getRegistros(), PacientesUCI.arqTableCuidados())] : [])
                                ),
                            ]),

                        ]),
                        // Vias
                        m("thead.bd.bd-2", {
                                style: { "border-color": "#5173a1" },
                            },

                            m("tr.tx-uppercase", {

                                style: { "background-color": "#CCCCFF" },
                                class: (ViasUci.show ? '' : 'd-none')
                            }, [
                                m("th.tx-semibold[scope='col'][colspan='12']",
                                    "VIAS:"
                                ),

                            ])
                        ),
                        m("tbody.bd.bd-2", {
                            style: { "border-color": "#5173a1" },
                            class: (ViasUci.show ? '' : 'd-none')
                        }, [

                            m("tr.bd.bd-2.tx-uppercase", {
                                style: { "background-color": "rgb(238, 249, 200)", "border-color": "#5173a1" }
                            }, [
                                m("th[scope='col'][colspan='4']",
                                    "VÍA: "
                                ),
                                m("th[scope='col'][colspan='4']",
                                    "UBICACIÓN: "
                                ),
                                m("th[scope='col'][colspan='4']",
                                    "TIPO: "
                                )

                            ]),
                            m("tr.bd.bd-2", {

                                style: { "border-color": "#5173a1" }
                            }, [
                                m("td.tx-14.tx-normal.wd-40p[colspan='4']",
                                    m('select.tx-semibold', {
                                        id: 'sec_Vias',
                                        onchange: (e) => {
                                            let _id = e.target.options[e.target.selectedIndex].id;
                                            let _value = e.target.options[e.target.selectedIndex].value;
                                            if (ViasUci.nuevoRegistro == null) {
                                                ViasUci.iniciarRegistro();
                                                ViasUci.nuevoRegistro.id = _id;
                                                ViasUci.nuevoRegistro.via = _value;
                                            } else {
                                                ViasUci.nuevoRegistro.id = _id;
                                                ViasUci.nuevoRegistro.via = _value;
                                            }
                                        },
                                        class: "custom-select",
                                        value: (ViasUci.nuevoRegistro !== null ? ViasUci.nuevoRegistro.via : 0),
                                    }, m("option[value='0']", 'Seleccione...'), [{
                                        id: "ViaPeriferica",
                                        label: "VIA PERIFERICA"
                                    }, {
                                        id: "CateterSubclavio",
                                        label: "CATETER SUBCLAVIO"
                                    }, {
                                        id: "CateterYugular",
                                        label: "CATETER YUGULAR"
                                    }, {
                                        id: "CateterFemoral",
                                        label: "CATETER FEMORAL"
                                    }, {
                                        id: "CateterCentralInsercionPeriferica",
                                        label: "CATETER CENTRAL DE INSERCION PERIFERICA"
                                    }, {
                                        id: "CateterHemodialisis",
                                        label: "CATETER DE HEMODIALISIS"
                                    }, {
                                        id: "CateterImplantableSubcutaneo",
                                        label: "CATETER IMPLANTABLE SUBCUTANEO"
                                    }, {
                                        id: "LineaArterial",
                                        label: "LINEA ARTERIAL"
                                    }].map(x =>
                                        m('option[id="' + x.id + '"]', x.label)
                                    ))

                                ),
                                m("td.tx-10.tx-normal.wd-40p[colspan='4']",
                                    (ViasUci.nuevoRegistro !== null ? [
                                        m("input", {
                                            id: "ubicacion" + ViasUci.nuevoRegistro.id,
                                            class: "form-control tx-semibold tx-14",
                                            type: "text",
                                            placeholder: "...",
                                            oninput: (e) => {
                                                ViasUci.nuevoRegistro.ubicacion = e.target.value;
                                            },
                                            value: ViasUci.nuevoRegistro.ubicacion
                                        })
                                    ] : [])


                                ),
                                m("td.tx-14.tx-normal.wd-40p[colspan='4']",
                                    (ViasUci.nuevoRegistro !== null ? [
                                        m("input", {
                                            id: "tipo" + ViasUci.nuevoRegistro.id,
                                            class: "form-control tx-semibold tx-14",
                                            type: "text",
                                            placeholder: "...",
                                            oninput: (e) => {
                                                ViasUci.nuevoRegistro.tipo = e.target.value;
                                            },
                                            value: ViasUci.nuevoRegistro.tipo
                                        })
                                    ] : [])
                                ),

                            ]),
                            m("tr.bd.bd-2.tx-uppercase", {

                                style: { "background-color": "rgb(238, 249, 200)", "border-color": "#5173a1" }
                            }, [

                                m("th[scope='col'][colspan='3']",
                                    "INICIO: "
                                ),
                                m("th[scope='col'][colspan='3']",
                                    "RETIRO: "
                                ),
                                m("th[scope='col'][colspan='3']",
                                    "CAMBIO: "
                                ),
                                m("th[scope='col'][colspan='3']",
                                    "CURACIÓN: "
                                ),


                            ]),

                            m("tr.bd.bd-2", { style: { "border-color": "#5173a1" } }, [
                                m("td.tx-14.tx-normal.wd-30p[colspan='3']",
                                    (ViasUci.nuevoRegistro !== null ? [
                                        m('div', [
                                            m("input.form-control[type='text'][placeholder='DD/MM/YYYY]", {
                                                id: "ifecha" + ViasUci.nuevoRegistro.id,
                                                oncreate: (el) => {
                                                    if (ViasUci.nuevoRegistro.inicio !== undefined) {
                                                        el.dom.value = ViasUci.nuevoRegistro.inicio;
                                                    }
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
                                        ]),
                                    ] : [])
                                ),
                                m("td.tx-14.tx-normal.wd-30p[colspan='3']",

                                    (ViasUci.nuevoRegistro !== null ? [
                                        m('div', [
                                            m("input.form-control[type='text'][placeholder='DD/MM/YYYY]", {
                                                id: "rfecha" + ViasUci.nuevoRegistro.id,
                                                oncreate: (el) => {
                                                    if (ViasUci.nuevoRegistro.retiro !== undefined) {
                                                        el.dom.value = ViasUci.nuevoRegistro.retiro;
                                                    }
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
                                        ])


                                    ] : [])


                                ),
                                m("td.tx-14.tx-normal.wd-30p[colspan='3']",

                                    (ViasUci.nuevoRegistro !== null ? [
                                        m('div', [
                                            m("input.form-control[type='text'][placeholder='DD/MM/YYYY]", {
                                                id: "cfecha" + ViasUci.nuevoRegistro.id,
                                                oncreate: (el) => {
                                                    if (ViasUci.nuevoRegistro.cambio !== undefined) {
                                                        el.dom.value = ViasUci.nuevoRegistro.cambio;
                                                    }
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

                                        ])
                                    ] : [

                                    ])



                                ),
                                m("td.tx-14.tx-normal.wd-30p[colspan='3']",

                                    (ViasUci.nuevoRegistro !== null ? [
                                        m('div', [
                                            m("input.form-control[type='text'][placeholder='DD/MM/YYYY]", {
                                                id: "cufecha" + ViasUci.nuevoRegistro.id,
                                                oncreate: (el) => {
                                                    if (ViasUci.nuevoRegistro.curacion !== undefined) {
                                                        el.dom.value = ViasUci.nuevoRegistro.curacion_fecha;
                                                    }
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

                                        ])
                                    ] : [])


                                ),

                            ]),
                            m("tr.bd.bd-2.tx-uppercase", {

                                style: { "background-color": "rgb(238, 249, 200)", "border-color": "#5173a1" }
                            }, [


                                m("th[scope='col'][colspan='4']",
                                    "CONDICIÓN: "
                                ),
                                m("th[scope='col'][colspan='8']",
                                    "OBSERVACIÓN: "
                                ),

                            ]),
                            m('tr.bd.bd-2', {
                                style: { "border-color": "#5173a1" }

                            }, [
                                m("td.tx-14.tx-normal.wd-40p[colspan='4']",
                                    (ViasUci.nuevoRegistro !== null ? [
                                        m('select.tx-semibold', {
                                            id: "condicion" + ViasUci.nuevoRegistro.id,
                                            oncreate: (el) => {
                                                if (ViasUci.nuevoRegistro.condicion !== undefined) {
                                                    el.dom.value = ViasUci.nuevoRegistro.condicion;
                                                }
                                            },
                                            onchange: (e) => {
                                                let _value = e.target.options[e.target.selectedIndex].value;
                                                ViasUci.nuevoRegistro.condicion = _value;
                                            },
                                            class: "custom-select",
                                        }, m('option', 'Seleccione...'), [
                                            'VIA PERIFERICA PERMEABLE Y EN BUENAS CONDICIONES',
                                            'CATETER PERMEABLE',
                                            'EN BUENAS CONDICIONES',
                                            'SIN SIGNOS DE INFECCION'
                                        ].map(x =>
                                            m('option', x)
                                        ))
                                    ] : [])


                                ),
                                m("td.tx-14.tx-normal.wd-80p[colspan='8']",
                                    (ViasUci.nuevoRegistro !== null ? [
                                        m("input", {
                                            id: "observacion" + ViasUci.nuevoRegistro.id,
                                            class: "form-control tx-semibold tx-14",
                                            type: "text",
                                            placeholder: "...",
                                            onkeypress: (e) => {
                                                if (e.keyCode == 13) {
                                                    ViasUci.nuevoRegistro.numeroTurno = PacientesUCI.numeroTurno;
                                                    if (ViasUci.nuevoRegistro.editar == null) {
                                                        ViasUci.agregarRegistro();
                                                        FecthUci.registrarSeccion(ViasUci.nuevoRegistro);
                                                        ViasUci.nuevoRegistro = null;
                                                        PacientesUCI.vReloadTable('table-vias', ViasUci.getRegistros());
                                                    } else {
                                                        ViasUci.editarRegistro();
                                                        FecthUci.actualizarSeccion(ViasUci.nuevoRegistro);
                                                        ViasUci.nuevoRegistro = null;
                                                        PacientesUCI.vReloadTable('table-vias', ViasUci.getRegistros());
                                                    }
                                                }
                                            },
                                            oninput: (e) => {
                                                ViasUci.nuevoRegistro.observacion = e.target.value;
                                            },
                                            value: ViasUci.nuevoRegistro.observacion
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
                                    (ViasUci.show != false ? [PacientesUCI.vTable('table-vias', ViasUci.getRegistros(), PacientesUCI.arqTableVias())] : [])
                                ),
                            ]),
                        ]),
                        //Accesos
                        m("thead.bd.bd-2", {
                                style: { "border-color": "#5173a1" }
                            },

                            m("tr.tx-uppercase", {

                                style: { "background-color": "#CCCCFF" },
                                class: (AccesosUci.show ? '' : 'd-none')

                            }, [
                                m("th.tx-semibold[scope='col'][colspan='12']",
                                    "ACCESOS:"
                                ),

                            ])
                        ),
                        m("tbody.bd.bd-2", {
                            style: { "border-color": "#5173a1" },
                            class: (AccesosUci.show ? '' : 'd-none')
                        }, [

                            m("tr.bd.bd-2.tx-uppercase", {
                                style: { "background-color": "rgb(238, 249, 200)", "border-color": "#5173a1" }
                            }, [
                                m("th[scope='col'][colspan='4']",
                                    "ACCESO: "
                                ),
                                m("th[scope='col'][colspan='4']",
                                    "UBICACIÓN: "
                                ),
                                m("th[scope='col'][colspan='4']",
                                    "TIPO: "
                                )

                            ]),
                            m("tr.bd.bd-2", {
                                style: { "border-color": "#5173a1" },
                            }, [
                                m("td.tx-14.tx-normal[colspan='4']",
                                    m('select.tx-semibold', {
                                        id: 'sec_Accesos',
                                        onchange: (e) => {
                                            let _id = e.target.options[e.target.selectedIndex].id;
                                            let _value = e.target.options[e.target.selectedIndex].value;
                                            if (AccesosUci.nuevoRegistro == null) {
                                                AccesosUci.iniciarRegistro();
                                                AccesosUci.nuevoRegistro.id = _id;
                                                AccesosUci.nuevoRegistro.acceso = _value;
                                            } else {
                                                AccesosUci.nuevoRegistro.id = _id;
                                                AccesosUci.nuevoRegistro.acceso = _value;
                                            }
                                        },
                                        class: "custom-select"
                                    }, m('option', 'Seleccione...'), [{
                                            id: "CateterIntracraneal",
                                            label: "CATETER INTRACRANEAL"
                                        }, {
                                            id: "AccesoIntraOseo",
                                            label: "ACCESO INTRA-OSEO"
                                        }, {
                                            id: "TuboTraqueal",
                                            label: "TUBO TRAQUEAL"
                                        }, {
                                            id: "TuboToracico",
                                            label: "TUBO TORACICO"
                                        }, {
                                            id: "Traqueotomo",
                                            label: "TRAQUEOTOMO"
                                        }, {
                                            id: "SondaNasogastrica",
                                            label: "SONDA NASOGASTRICA"
                                        }, {
                                            id: "SondaOrogastrica",
                                            label: "SONDA OROGASTRICA"
                                        }, {
                                            id: "SondaVesical",
                                            label: "SONDA VESICAL"
                                        },
                                        {
                                            id: "Gastrotomia",
                                            label: "GASTROSTOMIA"
                                        },
                                        {
                                            id: "Yeyuyostomia",
                                            label: "YEYUYOSTOMIA"
                                        },
                                        {
                                            id: "ManguerasVentilador",
                                            label: "MANGUERAS DE VENTILADOR"
                                        },
                                        {
                                            id: "EquiposNutricionEnteral",
                                            label: "EQUIPOS DE NUTRICION ENTERAL"
                                        },
                                        {
                                            id: "EquiposNutricionParenteral",
                                            label: "EQUIPOS DE NUTRICION PARENTERAL"
                                        },
                                        {
                                            id: "Microgoteros",
                                            label: "MICROGOTEROS"
                                        },
                                        {
                                            id: "EquipoVenoclisis",
                                            label: "EQUIPO DE VENOCLISIS"
                                        }
                                    ].map(x =>
                                        m('option[id="' + x.id + '"]', x.label)
                                    ))
                                ),
                                m("td.tx-10.tx-normal[colspan='4']",
                                    (AccesosUci.nuevoRegistro !== null ? [
                                        m('select.tx-semibold', {
                                            id: "ubicacion" + AccesosUci.nuevoRegistro.id,
                                            oncreate: (el) => {
                                                if (AccesosUci.nuevoRegistro.ubicacion != undefined) {
                                                    el.dom.value = AccesosUci.nuevoRegistro.ubicacion;
                                                }
                                            },
                                            onchange: (e) => {
                                                let _value = e.target.options[e.target.selectedIndex].value;
                                                AccesosUci.nuevoRegistro.ubicacion = _value;
                                            },
                                            class: "custom-select"
                                        }, m('option', 'Seleccione...'), ['SUBDURAL', 'INTRAPARENQUIMATOSO', 'TIBIAL', 'NASO-TRAQUEAL', 'ORO-TRAQUEAL', 'SUBMAXILAR',
                                            'TORAX DERECHO', 'TORAX IZQUIERDO', 'PLEURAL', 'MEDIASTINAL', 'TRAQUEA', 'FOSA NASAL DERECHA', 'FOSA NASAL IZQUIERDA', 'OROGASTRICA', 'SONDA FOLEY', 'EPIGASTRIO', 'YEYUNO', 'NO APLICA'
                                        ].map(x =>
                                            m('option', x)
                                        ))
                                    ] : [])


                                ),
                                m("td.tx-14.tx-normal[colspan='4']",
                                    (AccesosUci.nuevoRegistro !== null ? [
                                        m("input", {
                                            id: "tipo" + AccesosUci.nuevoRegistro.id,
                                            class: "form-control tx-semibold tx-14",
                                            type: "text",
                                            placeholder: "...",
                                            oninput: (e) => {
                                                AccesosUci.nuevoRegistro.tipo = e.target.value;
                                            },
                                            value: AccesosUci.nuevoRegistro.tipo
                                        })
                                    ] : [])
                                ),

                            ]),
                            m("tr.tx-uppercase", {
                                style: { "background-color": "rgb(238, 249, 200)" }
                            }, [

                                m("th[scope='col'][colspan='3']",
                                    "INICIO: "
                                ),
                                m("th[scope='col'][colspan='3']",
                                    "RETIRO: "
                                ),
                                m("th[scope='col'][colspan='3']",
                                    "CAMBIO: "
                                ),
                                m("th[scope='col'][colspan='3']",
                                    "CURACIÓN: "
                                ),


                            ]),

                            m("tr", [


                                m("td.tx-14.tx-normal[colspan='3']",
                                    (AccesosUci.nuevoRegistro !== null ? [
                                        m('div.d-flex', [
                                            m("input.form-control[type='text'][placeholder='DD/MM/YYYY]", {
                                                id: "ifecha" + AccesosUci.nuevoRegistro.id,
                                                oncreate: (el) => {
                                                    if (AccesosUci.nuevoRegistro.inicio != undefined) {
                                                        el.dom.value = AccesosUci.nuevoRegistro.inicio;
                                                    }
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
                                            })
                                        ]),
                                    ] : [])
                                ),
                                m("td.tx-14.tx-normal[colspan='3']",
                                    (AccesosUci.nuevoRegistro !== null ? [
                                        m('div.d-flex', [
                                            m("input.form-control[type='text'][placeholder='DD/MM/YYYY]", {
                                                id: "rfecha" + AccesosUci.nuevoRegistro.id,
                                                oncreate: (el) => {
                                                    if (AccesosUci.nuevoRegistro.retiro != undefined) {
                                                        el.dom.value = AccesosUci.nuevoRegistro.retiro;
                                                    }
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
                                            })

                                        ])


                                    ] : [])


                                ),
                                m("td.tx-14.tx-normal[colspan='3']",

                                    (AccesosUci.nuevoRegistro !== null ? [
                                        m('div.d-flex', [
                                            m("input.form-control[type='text'][placeholder='DD/MM/YYYY]", {
                                                id: "cfecha" + AccesosUci.nuevoRegistro.id,
                                                oncreate: (el) => {
                                                    if (AccesosUci.nuevoRegistro.cambio != undefined) {
                                                        el.dom.value = AccesosUci.nuevoRegistro.cambio;
                                                    }
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
                                            })

                                        ])
                                    ] : [

                                    ])



                                ),
                                m("td.tx-14.tx-normal[colspan='3']",

                                    (AccesosUci.nuevoRegistro !== null ? [
                                        m('div.d-flex', [
                                            m("input.form-control[type='text'][placeholder='DD/MM/YYYY]", {
                                                id: "cufecha" + AccesosUci.nuevoRegistro.id,
                                                oncreate: (el) => {
                                                    if (AccesosUci.nuevoRegistro.curacion != undefined) {
                                                        el.dom.value = AccesosUci.nuevoRegistro.curacion;
                                                    }
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
                                        ])
                                    ] : [])


                                ),

                            ]),
                            m("tr.tx-uppercase", {
                                style: { "background-color": "rgb(238, 249, 200)" }
                            }, [


                                m("th[scope='col'][colspan='6']",
                                    "CONDICIÓN: "
                                ),
                                m("th[scope='col'][colspan='6']",
                                    "OBSERVACIÓN: "
                                ),

                            ]),
                            m('tr', [
                                m("td.tx-14.tx-normal[colspan='6']",
                                    (AccesosUci.nuevoRegistro !== null ? [

                                        m("input", {
                                            id: "condicion" + AccesosUci.nuevoRegistro.id,
                                            class: "form-control tx-semibold tx-14",
                                            type: "text",
                                            placeholder: "...",
                                            value: AccesosUci.nuevoRegistro.condicion,
                                            oninput: (e) => {
                                                AccesosUci.nuevoRegistro.condicion = e.target.value;
                                            },
                                        })
                                    ] : [])


                                ),
                                m("td.tx-14.tx-normal[colspan='6']",
                                    (AccesosUci.nuevoRegistro !== null ? [
                                        m("input", {
                                            id: "observacion" + AccesosUci.nuevoRegistro.id,
                                            class: "form-control tx-semibold tx-14",
                                            type: "text",
                                            placeholder: "...",
                                            value: AccesosUci.nuevoRegistro.observacion,
                                            onkeypress: (e) => {
                                                if (e.keyCode == 13) {
                                                    AccesosUci.nuevoRegistro.numeroTurno = PacientesUCI.numeroTurno;
                                                    if (AccesosUci.nuevoRegistro.editar == null) {
                                                        AccesosUci.agregarRegistro();
                                                        FecthUci.registrarSeccion(AccesosUci.nuevoRegistro);
                                                        PacientesUCI.vReloadTable('table-accesos', AccesosUci.getRegistros());
                                                        AccesosUci.nuevoRegistro = null;
                                                    } else {
                                                        AccesosUci.editarRegistro();
                                                        FecthUci.actualizarSeccion(AccesosUci.nuevoRegistro);
                                                        PacientesUCI.vReloadTable('table-accesos', AccesosUci.getRegistros());
                                                        AccesosUci.nuevoRegistro = null;
                                                    }
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
                                    (AccesosUci.show != false ? [PacientesUCI.vTable('table-accesos', AccesosUci.getRegistros(), PacientesUCI.arqTableAccesos())] : [])
                                ),
                            ]),
                        ]),
                        // Cateter
                        m("thead.d-none",

                            m("tr.tx-uppercase", {

                                style: { "background-color": "#CCCCFF" },
                                class: (CateterUci.show ? '' : 'd-none')

                            }, [
                                m("th.tx-semibold[scope='col'][colspan='12']",
                                    "CATETER URINARIO:"
                                ),

                            ])
                        ),
                        m("tbody.d-none", {
                            class: (CateterUci.show ? '' : 'd-none')
                        }, [



                            m("tr.tx-uppercase", {
                                style: { "background-color": "rgb(238, 249, 200)" }
                            }, [
                                m("th[scope='col'][colspan='3']",
                                    "CATETER: "
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
                                        id: 'sec_Cateter',
                                        onchange: (e) => {
                                            let _id = e.target.options[e.target.selectedIndex].id;
                                            let _value = e.target.options[e.target.selectedIndex].value;
                                            if (CateterUci.nuevoRegistro == null) {
                                                CateterUci.iniciarRegistro();
                                                CateterUci.nuevoRegistro.id = _id;
                                                CateterUci.nuevoRegistro.cateter = _value;
                                            } else {
                                                CateterUci.nuevoRegistro.id = _id;
                                                CateterUci.nuevoRegistro.cateter = _value;
                                            }
                                        },
                                        class: "custom-select",
                                        value: (CateterUci.nuevoRegistro !== null ? CateterUci.nuevoRegistro.via : 0),
                                    }, m('option', 'Seleccione...'), [{
                                            id: "RecoletcorVejiga",
                                            label: "RECOLECTOR MAS ABAJO QUE VEJIGA"
                                        }, {
                                            id: "RecolectorNoTocaPiso",
                                            label: "RECOLECTOR NO TOCA PISO"
                                        }, {
                                            id: "OrinaRecolector",
                                            label: "ORINA HASTA 50% EN RECOLECTOR"
                                        },
                                        {
                                            id: "SondaFijadaMuslo",
                                            label: "SONDA FIJADA EN MUSLO"
                                        },
                                        {
                                            id: "RegistroAseoGenital",
                                            label: "REGISTRO DE ASEO GENITAL"
                                        },
                                        {
                                            id: "RegistroDiasCateter",
                                            label: "REGISTRO N° DE DIAS DE CATETER"
                                        }
                                    ].map(x =>
                                        m('option[id="' + x.id + '"]', x.label)
                                    ))
                                ),
                                m("td.tx-14.tx-normal[colspan='3']",
                                    (CateterUci.nuevoRegistro !== null ? [
                                        m('div.d-flex', [
                                            m("input", {
                                                id: "am" + CateterUci.nuevoRegistro.id,
                                                class: "form-control tx-semibold tx-14",
                                                type: "text",
                                                placeholder: "...",
                                                oninput: (e) => {
                                                    CateterUci.nuevoRegistro.am = e.target.value;
                                                },
                                            })

                                        ]),
                                    ] : [])
                                ),
                                m("td.tx-14.tx-normal[colspan='3']",
                                    (CateterUci.nuevoRegistro !== null ? [
                                        m('div.d-flex', [
                                            m("input", {
                                                id: "pm" + CateterUci.nuevoRegistro.id,
                                                class: "form-control tx-semibold tx-14",
                                                type: "text",
                                                placeholder: "...",
                                                oninput: (e) => {
                                                    CateterUci.nuevoRegistro.pm = e.target.value;
                                                },
                                            })

                                        ]),
                                    ] : [])
                                ),

                                m("td.tx-14.tx-normal[colspan='3']",
                                    (CateterUci.nuevoRegistro !== null ? [
                                        m('div.d-flex', [
                                            m("input", {
                                                id: "hs" + CateterUci.nuevoRegistro.id,
                                                class: "form-control tx-semibold tx-14",
                                                type: "text",
                                                placeholder: "...",
                                                oninput: (e) => {
                                                    CateterUci.nuevoRegistro.hs = e.target.value;
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
                                    (CateterUci.nuevoRegistro !== null ? [
                                        m("input", {
                                            id: "observacion" + CateterUci.nuevoRegistro.id,
                                            class: "form-control tx-semibold tx-14",
                                            type: "text",
                                            placeholder: "...",

                                            onkeypress: (e) => {
                                                if (e.keyCode == 13) {
                                                    CateterUci.nuevoRegistro.numeroTurno = PacientesUCI.numeroTurno;
                                                    if (CateterUci.nuevoRegistro.editar == null) {
                                                        CateterUci.agregarRegistro();
                                                        PacientesUCI.vReloadTable('table-cateter', CateterUci.getRegistros());
                                                        CateterUci.nuevoRegistro = null;
                                                    } else {
                                                        CateterUci.editarRegistro();
                                                        PacientesUCI.vReloadTable('table-cateter', CateterUci.getRegistros());
                                                        CateterUci.nuevoRegistro = null;
                                                    }
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
                                    (CateterUci.show != false ? [PacientesUCI.vTable('table-cateter', CateterUci.getRegistros(), PacientesUCI.arqTableCateter())] : [])

                                ),
                            ]),
                        ]),
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
                        m("thead.bd.bd-2", {
                                style: { "border-color": "#5173a1" }
                            },

                            m("tr.tx-uppercase", {

                                style: { "background-color": "#CCCCFF" },
                                class: (CultivosUci.show ? '' : 'd-none')

                            }, [
                                m("th.tx-semibold[scope='col'][colspan='12']",
                                    "CULTIVOS:"
                                ),

                            ])
                        ),
                        m("tbody.bd.bd-2", {
                            style: { "border-color": "#5173a1" },
                            class: (CultivosUci.show ? '' : 'd-none')
                        }, [



                            m("tr.tx-uppercase", {
                                style: { "background-color": "rgb(238, 249, 200)" }
                            }, [
                                m("th[scope='col'][colspan='4']",
                                    "MUESTRA: "
                                ),
                                m("th[scope='col'][colspan='4']",
                                    "FECHA DE ENVÍO: "
                                ),
                                m("th[scope='col'][colspan='4']",
                                    "RESULTADO DE GERMEN AISLADO: "
                                ),

                            ]),
                            m("tr", [

                                m("td.tx-14.tx-normal[colspan='4']",
                                    m('select.tx-semibold', {
                                        id: 'sec_Cultivos',
                                        onchange: (e) => {
                                            let _id = e.target.options[e.target.selectedIndex].id;
                                            let _value = e.target.options[e.target.selectedIndex].value;
                                            if (CultivosUci.nuevoRegistro == null) {
                                                CultivosUci.iniciarRegistro();
                                                CultivosUci.nuevoRegistro.id = _id;
                                                CultivosUci.nuevoRegistro.muestra = _value;
                                            } else {
                                                CultivosUci.nuevoRegistro.id = _id;
                                                CultivosUci.nuevoRegistro.muestra = _value;
                                            }
                                        },
                                        class: "custom-select"
                                    }, m('option', 'Seleccione...'), [{
                                            id: "Sangre",
                                            label: "SANGRE"
                                        }, {
                                            id: "Orina",
                                            label: "ORINA"
                                        },
                                        {
                                            id: "CateterUrinario",
                                            label: "CATETER URINARIO"
                                        },
                                        {
                                            id: "SecrecionTraqueal",
                                            label: "SECRECION TRAQUEAL"
                                        },
                                        {
                                            id: "SecrecionHerida",
                                            label: "SECRECION HERIDA"
                                        },
                                        {
                                            id: "LiquidoCefaloRraquedeo",
                                            label: "LIQUIDO CEFALORRAQUIDEO"
                                        },
                                        {
                                            id: "Otros",
                                            label: "OTROS"
                                        }
                                    ].map(x =>
                                        m('option[id="' + x.id + '"]', x.label)
                                    ))
                                ),
                                m("td.tx-14.tx-normal[colspan='4']",
                                    (CultivosUci.nuevoRegistro !== null ? [
                                        m('div.d-flex', [
                                            m("input.form-control[type='text'][placeholder='DD/MM/YYYY]", {
                                                id: "cultivoEnvio" + CultivosUci.nuevoRegistro.id,
                                                oncreate: (el) => {
                                                    if (CultivosUci.nuevoRegistro.envio != undefined) {
                                                        el.dom.value = CultivosUci.nuevoRegistro.envio;
                                                    }
                                                    setTimeout(() => {
                                                        new Cleave("#cultivoEnvio" + CultivosUci.nuevoRegistro.id, {
                                                            date: true,
                                                            datePattern: ["d", "m", "Y"]
                                                        });
                                                    }, 50);
                                                },
                                                oninput: (e) => {
                                                    setTimeout(() => {
                                                        CultivosUci.nuevoRegistro.envio = e.target.value;
                                                    }, 50);
                                                },
                                            })
                                        ])
                                    ] : [])
                                ),
                                m("td.tx-14.tx-normal[colspan='4']",
                                    (CultivosUci.nuevoRegistro !== null ? [
                                        m('div.d-flex', [
                                            m("input", {
                                                id: "resultado" + CultivosUci.nuevoRegistro.id,
                                                class: "form-control tx-semibold tx-14",
                                                type: "text",
                                                placeholder: "...",
                                                onkeypress: (e) => {
                                                    if (e.keyCode == 13) {
                                                        CultivosUci.nuevoRegistro.numeroTurno = PacientesUCI.numeroTurno;
                                                        if (CultivosUci.nuevoRegistro.editar == null) {
                                                            CultivosUci.agregarRegistro();
                                                            FecthUci.registrarSeccion(CultivosUci.nuevoRegistro);
                                                            CultivosUci.nuevoRegistro = null;
                                                            PacientesUCI.vReloadTable('table-cultivos', CultivosUci.getRegistros());
                                                        } else {
                                                            CultivosUci.editarRegistro();
                                                            FecthUci.actualizarSeccion(CultivosUci.nuevoRegistro);
                                                            CultivosUci.nuevoRegistro = null;
                                                            PacientesUCI.vReloadTable('table-cuidados', CultivosUci.getRegistros());
                                                        }


                                                    }
                                                },
                                                oninput: (e) => {
                                                    CultivosUci.nuevoRegistro.resultado = e.target.value;
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
                                    (CultivosUci.show != false ? [PacientesUCI.vTable('table-cultivos', CultivosUci.getRegistros(), PacientesUCI.arqTableCultivos())] : [])
                                ),
                            ]),
                        ]),
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
        options.map((option) => {
            FecthUci.dataSecciones.filter((obj) => {
                let _obj = JSON.parse(obj.DATASECCION);
                if (_obj.id === option.id) {
                    res.push(_obj);
                }
            });
        });
        return res;
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
                    visible: false,
                    aTargets: [3],
                    orderable: true,
                },
                {
                    mRender: function(data, type, full) {
                        return full.especialidad;
                    },
                    visible: false,
                    aTargets: [4],
                    orderable: true,


                },
                {
                    fnCreatedCell: function(nTd, sData, oData, iRow, iCol) {

                        console.log(oData)
                        return m.mount(nTd, {
                            view: () => {
                                return [
                                    m('div.text-center', [
                                        m("button.btn-xs.btn-block[type='button']", {

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
                                                disabled: (oData.status == 1 && FecthUci.dataSecciones !== null ? '' : 'disabled'),
                                                onclick: () => {
                                                    oData.iniciarGestion();
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
                    visible: true,
                    aTargets: [7],
                    orderable: true,

                }


            ],
            fnRowCallback: function(nRow, aData, iDisplayIndex, iDisplayIndexFull) {

            },
        };
    }

    static arqTableCuidados() {
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
                [0, 'desc'],
                [1, 'desc']
            ],
            columns: [{
                    title: "Order Turno°:",

                }, {
                    title: "Order N°:",
                }, {
                    title: "Turno N°:",
                },
                {
                    title: "Cuidado:",
                },
                {
                    title: "Frecuencia:",
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
                    title: "Opciones:",
                },


            ],
            aoColumnDefs: [{
                    mRender: function(data, type, full) {
                        return full.numeroTurno;
                    },
                    visible: false,
                    aTargets: [0],
                    orderable: true,
                },
                {
                    mRender: function(data, type, full) {
                        return full.nro;
                    },
                    visible: false,
                    aTargets: [1],
                    orderable: true,

                },
                {

                    fnCreatedCell: function(nTd, sData, oData, iRow, iCol) {

                        return m.mount(nTd, {
                            view: () => {
                                return [
                                    m('div.text-center.pd-5', [
                                        m("button.btn-xs.btn-block.tx-semibold[type='button']", {
                                                class: (PacientesUCI.numeroTurno != oData.numeroTurno ? 'bg-light' : 'bg-warning')
                                            },
                                            oData.numeroTurno
                                        ),

                                    ])

                                ]
                            }
                        });
                    },
                    width: '6%',
                    visible: true,
                    aTargets: [2],
                    orderable: true,

                },
                {
                    mRender: function(data, type, full) {
                        return full.cuidado;
                    },
                    width: '19%',
                    visible: true,
                    aTargets: [3],
                    orderable: true,

                },
                {
                    mRender: function(data, type, full) {
                        return full.frecuencia;
                    },
                    width: '10%',
                    visible: true,
                    aTargets: [4],
                    orderable: true,

                },
                {
                    mRender: function(data, type, full) {
                        return full.am;
                    },
                    width: '10%',
                    visible: true,
                    aTargets: [5],
                    orderable: true,
                },
                {
                    mRender: function(data, type, full) {
                        return full.pm;
                    },
                    width: '10%',
                    visible: true,
                    aTargets: [6],
                    orderable: true,
                },
                {
                    mRender: function(data, type, full) {
                        return full.hs;
                    },
                    width: '10%',
                    visible: true,
                    aTargets: [7],
                    orderable: true,
                },

                {
                    fnCreatedCell: function(nTd, sData, oData, iRow, iCol) {
                        return m.mount(nTd, {
                            view: () => {
                                return [
                                    m("div.btn-block.btn-group.wd-100p.pd-5", [
                                        m("button.btn.btn-xs.btn-success[type='button']", {
                                                class: (oData.editar ? 'd-none' : ''),
                                                disabled: (PacientesUCI.numeroTurno != oData.numeroTurno ? 'disabled' : ''),
                                                onclick: () => {
                                                    CuidadosUci.nuevoRegistro = null
                                                    CuidadosUci.verRegistro(oData);
                                                },
                                            },
                                            'Editar',
                                        ),
                                        m("button.btn.btn-xs.btn-block.btn-outline-danger[type='button']", {
                                                class: (oData.editar ? '' : 'd-none'),
                                                disabled: (PacientesUCI.numeroTurno != oData.numeroTurno ? 'disabled' : ''),

                                                onclick: () => {
                                                    oData.editar = null;
                                                    CuidadosUci.nuevoRegistro = null;
                                                },
                                            },
                                            'Cancelar Edición',
                                        ),
                                        m("button.btn.btn-xs.btn-danger[type='button']", {
                                                class: (oData.editar ? 'd-none' : ''),
                                                disabled: (PacientesUCI.numeroTurno != oData.numeroTurno ? 'disabled' : ''),

                                                onclick: () => {

                                                    if (confirm("¿Esta Ud seguro de eliminar este registro?") == true) {
                                                        CuidadosUci.eliminarRegistro(oData);
                                                        FecthUci.eliminarSeccion(oData);
                                                        CuidadosUci.nuevoRegistro = null;
                                                        PacientesUCI.vReloadTable('table-cuidados', CuidadosUci.getRegistros());
                                                    }




                                                },
                                            },
                                            'Eliminar',
                                        ),
                                    ])

                                ]
                            }
                        });
                    },
                    width: '10%',
                    visible: true,
                    aTargets: [8],
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
                [0, 'desc'],
                [1, 'desc']
            ],
            columns: [{
                    title: "order Turno:",
                },
                {
                    title: "order N°:",
                },
                {
                    title: "Turno:",
                },
                {
                    title: "N°:",
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
                    mRender: function(data, type, full) {
                        return full.numeroTurno;
                    },
                    visible: false,
                    aTargets: [0],
                    orderable: true,
                },
                {
                    mRender: function(data, type, full) {
                        return full.nro;
                    },
                    visible: false,
                    aTargets: [1],
                    orderable: true,

                },
                {
                    fnCreatedCell: function(nTd, sData, oData, iRow, iCol) {
                        return m.mount(nTd, {
                            view: () => {
                                return [
                                    m('div.text-center.pd-5', [
                                        m("button.btn-xs.btn-block.tx-semibold[type='button']", {
                                                class: (PacientesUCI.numeroTurno != oData.numeroTurno ? 'bg-light' : 'bg-warning')
                                            },
                                            oData.numeroTurno
                                        ),

                                    ])

                                ]
                            }
                        });
                    },
                    width: '6%',
                    visible: true,
                    aTargets: [2],
                    orderable: false,

                },
                {
                    mRender: function(data, type, full) {
                        return full.nro;
                    },

                    visible: false,
                    aTargets: [3],
                    orderable: false,

                },

                {
                    mRender: function(data, type, full) {
                        return full.via;
                    },

                    visible: true,
                    aTargets: [4],
                    orderable: true,

                },
                {
                    mRender: function(data, type, full) {
                        return full.ubicacion;
                    },
                    visible: true,
                    aTargets: [5],
                    orderable: true,

                },
                {
                    mRender: function(data, type, full) {
                        return full.tipo;
                    },
                    visible: true,
                    aTargets: [6],
                    orderable: true,
                },
                {
                    mRender: function(data, type, full) {
                        return full.inicio;
                    },
                    visible: true,
                    aTargets: [7],
                    orderable: true,


                },
                {
                    mRender: function(data, type, full) {
                        return full.retiro;
                    },
                    visible: true,
                    aTargets: [8],
                    orderable: true,


                },
                {
                    mRender: function(data, type, full) {
                        return full.cambio;
                    },
                    visible: true,
                    aTargets: [9],
                    orderable: true,


                },
                {
                    mRender: function(data, type, full) {
                        return full.curacion;
                    },
                    visible: true,
                    aTargets: [10],
                    orderable: true,


                },
                {
                    mRender: function(data, type, full) {
                        return full.condicion;
                    },
                    visible: true,
                    aTargets: [11],
                    orderable: true,


                },
                {
                    mRender: function(data, type, full) {
                        return full.observacion;
                    },
                    visible: true,
                    aTargets: [12],
                    orderable: true,


                },
                {
                    fnCreatedCell: function(nTd, sData, oData, iRow, iCol) {
                        return m.mount(nTd, {
                            view: () => {
                                return [
                                    m("div.btn-block.btn-group.wd-100p.pd-5", [
                                        m("button.btn.btn-xs.btn-success[type='button']", {
                                                class: (oData.editar ? 'd-none' : ''),
                                                disabled: (PacientesUCI.numeroTurno != oData.numeroTurno ? 'disabled' : ''),
                                                onclick: () => {
                                                    ViasUci.nuevoRegistro = null
                                                    ViasUci.verRegistro(oData);
                                                },
                                            },
                                            'Editar',
                                        ),
                                        m("button.btn.btn-xs.btn-block.btn-outline-danger[type='button']", {
                                                class: (oData.editar ? '' : 'd-none'),
                                                disabled: (PacientesUCI.numeroTurno != oData.numeroTurno ? 'disabled' : ''),

                                                onclick: () => {
                                                    oData.editar = null;
                                                    ViasUci.nuevoRegistro = null;
                                                },
                                            },
                                            'Cancelar Edición',
                                        ),
                                        m("button.btn.btn-xs.btn-danger[type='button']", {
                                                class: (oData.editar ? 'd-none' : ''),
                                                disabled: (PacientesUCI.numeroTurno != oData.numeroTurno ? 'disabled' : ''),
                                                onclick: () => {
                                                    if (confirm("¿Esta Ud seguro de eliminar este registro?") == true) {
                                                        ViasUci.eliminarRegistro(oData);
                                                        FecthUci.eliminarSeccion(oData);
                                                        ViasUci.nuevoRegistro = null;
                                                        PacientesUCI.vReloadTable('table-vias', ViasUci.getRegistros());
                                                    }
                                                },
                                            },
                                            'Eliminar',
                                        ),
                                    ])

                                ]
                            }
                        });
                    },
                    width: '10%',
                    visible: true,
                    aTargets: [13],
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
                [0, 'desc'],
                [1, 'desc']
            ],
            columns: [{
                    title: "Order N°:",
                },
                {
                    title: "Order Turno:",
                },
                {
                    title: "Turno N° : ",
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
                    mRender: function(data, type, full) {
                        return full.numeroTurno;
                    },
                    visible: false,
                    aTargets: [0],
                    orderable: true,
                },
                {
                    mRender: function(data, type, full) {
                        return full.nro;
                    },

                    visible: false,
                    aTargets: [1],
                    orderable: true,

                },
                {
                    fnCreatedCell: function(nTd, sData, oData, iRow, iCol) {
                        return m.mount(nTd, {
                            view: () => {
                                return [
                                    m('div.text-center.pd-5', [
                                        m("button.btn-xs.btn-block.tx-semibold[type='button']", {
                                                class: (PacientesUCI.numeroTurno != oData.numeroTurno ? 'bg-light' : 'bg-warning')
                                            },
                                            oData.numeroTurno
                                        ),

                                    ])

                                ]
                            }
                        });
                    },
                    width: '6%',
                    visible: true,
                    aTargets: [2],
                    orderable: true,

                },
                {
                    mRender: function(data, type, full) {
                        return full.acceso;
                    },

                    visible: true,
                    aTargets: [3],
                    orderable: true,

                },
                {
                    mRender: function(data, type, full) {
                        return full.ubicacion;
                    },
                    visible: true,
                    aTargets: [4],
                    orderable: true,

                },
                {
                    mRender: function(data, type, full) {
                        return full.tipo;
                    },
                    visible: true,
                    aTargets: [5],
                    orderable: true,
                },
                {
                    mRender: function(data, type, full) {
                        return full.inicio;
                    },
                    visible: true,
                    aTargets: [6],
                    orderable: true,


                },
                {
                    mRender: function(data, type, full) {
                        return full.retiro;
                    },
                    visible: true,
                    aTargets: [7],
                    orderable: true,


                },
                {
                    mRender: function(data, type, full) {
                        return full.cambio;
                    },
                    visible: true,
                    aTargets: [8],
                    orderable: true,


                },
                {
                    mRender: function(data, type, full) {
                        return full.curacion;
                    },
                    visible: true,
                    aTargets: [9],
                    orderable: true,


                },
                {
                    mRender: function(data, type, full) {
                        return full.condicion;
                    },
                    visible: true,
                    aTargets: [10],
                    orderable: true,


                },
                {
                    mRender: function(data, type, full) {
                        return full.observacion;
                    },
                    visible: true,
                    aTargets: [11],
                    orderable: true,


                },
                {
                    fnCreatedCell: function(nTd, sData, oData, iRow, iCol) {
                        return m.mount(nTd, {
                            view: () => {
                                return [
                                    m("div.btn-block.btn-group.wd-100p.pd-5", [
                                        m("button.btn.btn-xs.btn-success[type='button']", {
                                                class: (oData.editar ? 'd-none' : ''),
                                                disabled: (PacientesUCI.numeroTurno != oData.numeroTurno ? 'disabled' : ''),
                                                onclick: () => {
                                                    AccesosUci.nuevoRegistro = null
                                                    AccesosUci.verRegistro(oData);
                                                },
                                            },
                                            'Editar',
                                        ),
                                        m("button.btn.btn-xs.btn-block.btn-outline-danger[type='button']", {
                                                class: (oData.editar ? '' : 'd-none'),
                                                disabled: (PacientesUCI.numeroTurno != oData.numeroTurno ? 'disabled' : ''),

                                                onclick: () => {
                                                    oData.editar = null;
                                                    AccesosUci.nuevoRegistro = null;
                                                },
                                            },
                                            'Cancelar Edición',
                                        ),
                                        m("button.btn.btn-xs.btn-danger[type='button']", {
                                                class: (oData.editar ? 'd-none' : ''),
                                                disabled: (PacientesUCI.numeroTurno != oData.numeroTurno ? 'disabled' : ''),

                                                onclick: () => {

                                                    if (confirm("¿Esta Ud seguro de eliminar este registro?") == true) {
                                                        AccesosUci.eliminarRegistro(oData);
                                                        FecthUci.eliminarSeccion(oData);
                                                        AccesosUci.nuevoRegistro = null;
                                                        PacientesUCI.vReloadTable('table-accesos', AccesosUci.getRegistros());
                                                    }




                                                },
                                            },
                                            'Eliminar',
                                        ),
                                    ])

                                ]
                            }
                        });
                    },
                    width: '10%',
                    visible: true,
                    aTargets: [12],
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
                [0, 'desc'],
                [1, 'desc']
            ],
            columns: [{
                    title: "N° : ",
                },
                {
                    title: "Cateter:",
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
                    mRender: function(data, type, full) {
                        return full.numeroTurno;
                    },
                    visible: false,
                    aTargets: [0],
                    orderable: true,
                },
                {
                    mRender: function(data, type, full) {
                        return full.nro;
                    },
                    visible: false,
                    aTargets: [1],
                    orderable: true,
                },
                {
                    mRender: function(data, type, full) {
                        return full.cateter;
                    },

                    visible: true,
                    aTargets: [2],
                    orderable: true,

                },
                {
                    mRender: function(data, type, full) {
                        return full.am;
                    },
                    visible: true,
                    aTargets: [3],
                    orderable: true,

                },
                {
                    mRender: function(data, type, full) {
                        return full.pm;
                    },
                    visible: true,
                    aTargets: [4],
                    orderable: true,


                },
                {
                    mRender: function(data, type, full) {
                        return full.hs;
                    },
                    visible: true,
                    aTargets: [5],
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
                [0, 'desc'],
                [1, 'desc']
            ],
            columns: [{
                    title: "Order Turno: ",
                },
                {
                    title: "Order N°: ",
                },
                {
                    title: "Turno N°: ",
                },
                {
                    title: "Muestra:",
                },
                {
                    title: "Fecha de Envío:",
                },
                {
                    title: "Resultado de Germen Aislado:",
                },
                {
                    title: "Opciones:",
                }
            ],
            aoColumnDefs: [{
                    mRender: function(data, type, full) {
                        return full.numeroTurno;
                    },
                    visible: false,
                    aTargets: [0],
                    orderable: true,
                },
                {
                    mRender: function(data, type, full) {
                        return full.nro;
                    },
                    visible: false,
                    aTargets: [1],
                    orderable: true,
                },
                {
                    fnCreatedCell: function(nTd, sData, oData, iRow, iCol) {
                        return m.mount(nTd, {
                            view: () => {
                                return [
                                    m('div.text-center.pd-5', [
                                        m("button.btn-xs.btn-block.tx-semibold[type='button']", {
                                                class: (PacientesUCI.numeroTurno != oData.numeroTurno ? 'bg-light' : 'bg-warning')
                                            },
                                            oData.numeroTurno
                                        ),

                                    ])

                                ]
                            }
                        });
                    },
                    width: '6%',
                    visible: true,
                    aTargets: [2],
                    orderable: false,

                },
                {
                    mRender: function(data, type, full) {
                        return full.muestra;
                    },

                    visible: true,
                    aTargets: [3],
                    orderable: true,

                },
                {
                    mRender: function(data, type, full) {
                        return full.envio;
                    },
                    visible: true,
                    aTargets: [4],
                    orderable: true,

                },
                {
                    mRender: function(data, type, full) {
                        return full.resultado;
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
                                    m("div.btn-block.btn-group.wd-100p.pd-5", [
                                        m("button.btn.btn-xs.btn-success[type='button']", {
                                                class: (oData.editar ? 'd-none' : ''),
                                                disabled: (PacientesUCI.numeroTurno != oData.numeroTurno ? 'disabled' : ''),
                                                onclick: () => {
                                                    CultivosUci.nuevoRegistro = null
                                                    CultivosUci.verRegistro(oData);
                                                },
                                            },
                                            'Editar',
                                        ),
                                        m("button.btn.btn-xs.btn-block.btn-outline-danger[type='button']", {
                                                class: (oData.editar ? '' : 'd-none'),
                                                disabled: (PacientesUCI.numeroTurno != oData.numeroTurno ? 'disabled' : ''),

                                                onclick: () => {
                                                    oData.editar = null;
                                                    CultivosUci.nuevoRegistro = null;
                                                },
                                            },
                                            'Cancelar Edición',
                                        ),
                                        m("button.btn.btn-xs.btn-danger[type='button']", {
                                                class: (oData.editar ? 'd-none' : ''),
                                                disabled: (PacientesUCI.numeroTurno != oData.numeroTurno ? 'disabled' : ''),

                                                onclick: () => {

                                                    if (confirm("¿Esta Ud seguro de eliminar este registro?") == true) {
                                                        CultivosUci.eliminarRegistro(oData);
                                                        FecthUci.eliminarSeccion(oData);
                                                        CultivosUci.nuevoRegistro = null;
                                                        PacientesUCI.vReloadTable('table-cultivos', CultivosUci.getRegistros());
                                                    }




                                                },
                                            },
                                            'Eliminar',
                                        ),
                                    ])

                                ]
                            }
                        });
                    },
                    width: '10%',
                    visible: true,
                    aTargets: [6],
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