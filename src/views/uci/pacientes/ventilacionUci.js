import m from "mithril";
import App from "../../../models/App";
import Loader from "../../utils/loader";
import Errors from "../../utils/errors";
import PacientesUCI from "./pacientesUci";
import TurnosUci from "./turnosUci";
import FecthUci from "./fecthUci";

class Ventilacion {
    id = null;
    nro = null;
    fechaHoraTurno = null;
    ventilacion = null;
    am = null;
    pm = null;
    hs = null;
    observacion = null;
    editar = null;
    seccion = 'Ventilacion';
    constructor() {
        this.id = this.id;
        this.nro = this.nro;
        this.ventilacion = this.ventilacion;
        this.fechaHoraTurno = this.fechaHoraTurno;
        this.am = this.am;
        this.pm = this.pm;
        this.hs = this.hs;
        this.observacion = this.observacion;
        this.editar = this.editar;
        this.seccion = this.seccion;
    }
}


class VentilacionUci {
    static registros = [];
    static nuevoRegistro = null;
    static show = false;
    static validarRegistro() {

    }
    static iniciarRegistro() {
        VentilacionUci.nuevoRegistro = new Ventilacion();
    }
    static agregarRegistro() {
        if (VentilacionUci.registros.length == 0) {
            VentilacionUci.nuevoRegistro.nro = 1;
            VentilacionUci.registros.push(VentilacionUci.nuevoRegistro);
        } else {
            VentilacionUci.nuevoRegistro.nro = (VentilacionUci.registros[VentilacionUci.registros.length - 1].nro + 1);
            VentilacionUci.registros.push(VentilacionUci.nuevoRegistro);
        }
    }
    static verRegistro(registro) {
        registro.editar = true;
        VentilacionUci.nuevoRegistro = registro;
        console.log(VentilacionUci.nuevoRegistro)
    }
    static editarRegistro() {
        VentilacionUci.nuevoRegistro.editar = null;
        VentilacionUci.registros.map((_v, _i) => {
            if (_v.nro == VentilacionUci.nuevoRegistro.nro) {
                VentilacionUci.registros[_i] = VentilacionUci.nuevoRegistro;
            }
        });

    }
    static eliminarRegistro(obj) {

        VentilacionUci.registros = PacientesUCI.extractSeccion(Array.from(document.getElementById('sec_Ventilacion').options));

        let hash = {};
        let res = [];
        let _arr = [];
        let result = [];
        let resultId = [];

        VentilacionUci.registros.map((_v, _i) => {
            if (_v.nro !== obj.nro) {
                res.push(_v);
            }
        });

        result = res.sort((a, b) => b.nro - a.nro);

        resultId = result.filter(o => hash[o.id] ? false : hash[o.id] = true);
        // Ordenar desc
        _arr = resultId.sort((a, b) => a.nro - b.nro);

        VentilacionUci.registros = _arr;

    }
    static filterRegistros() {

        let result = [];
        let resultId = [];
        let _arr = [];
        let hash = {};

        result = VentilacionUci.registros.sort((a, b) => b.nro - a.nro);
        // Quitar duplicados
        resultId = result.filter(o => hash[o.id] ? false : hash[o.id] = true);
        // Ordenar desc
        _arr = resultId.sort((a, b) => a.nro - b.nro);

        VentilacionUci.registros = _arr;

    }
    static getRegistros() {
        return VentilacionUci.registros;
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
            order: [
                [0, 'desc']
            ],
            columns: [{
                    title: "Turno: ",
                },
                {
                    title: "Order Nro : ",
                },
                {
                    title: "Turno: ",
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
                    mRender: function(data, type, full) {
                        return full.fechaHoraTurno;
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
                                                class: (PacientesUCI.fechaHoraTurno == oData.fechaHoraTurno ? 'bg-warning' : 'bg-light')
                                            },
                                            (oData.numeroTurno == 1 ? 'AM' + ': ' + moment(oData.fechaHoraTurno, 'DD-MM-YYYY HH:mm').format('DD/MM/YYYY HH:mm') : ''),
                                            (oData.numeroTurno == 2 ? 'PM' + ': ' + moment(oData.fechaHoraTurno, 'DD-MM-YYYY HH:mm').format('DD/MM/YYYY HH:mm') : ''),
                                            (oData.numeroTurno == 3 ? 'HS' + ': ' + moment(oData.fechaHoraTurno, 'DD-MM-YYYY HH:mm').format('DD/MM/YYYY HH:mm') : ''),
                                        ),
                                    ])

                                ]
                            }
                        });
                    },
                    width: '15%',
                    visible: true,
                    aTargets: [2],
                    orderable: false,

                },
                {
                    mRender: function(data, type, full) {
                        return full.ventilacion;
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
                                    m('div.pd-10', {
                                        class: (oData.editar == true ? 'd-none' : ''),
                                        ondblclick: (e) => {
                                            VentilacionUci.nuevoRegistro = null
                                            VentilacionUci.verRegistro(oData);
                                        },
                                    }, (oData.am !== null ? oData.am : m.trust('<div class="text-center pd-l-0 pd-r-0"><hr style="border-color:#001737;"/></div>'))),
                                    (VentilacionUci.nuevoRegistro !== null ? [
                                        m("input", {
                                            id: "am" + VentilacionUci.nuevoRegistro.id,
                                            class: "form-control tx-semibold tx-14 " + (oData.editar == true ? '' : 'd-none'),
                                            type: "text",
                                            placeholder: "...",
                                            ondblclick: (e) => {
                                                oData.editar = null;
                                                VentilacionUci.nuevoRegistro = null
                                            },
                                            oninput: (e) => {
                                                if (PacientesUCI.numeroTurno == 1) {
                                                    VentilacionUci.nuevoRegistro.am = (e.target.value.length !== 0 ? e.target.value : null);
                                                } else {
                                                    e.preventDefault();
                                                }
                                            },
                                            value: (VentilacionUci.nuevoRegistro.am !== null ? VentilacionUci.nuevoRegistro.am : '')
                                        })
                                    ] : [])

                                ]
                            }
                        });
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
                                    m('div.pd-10', {
                                        class: (oData.editar == true ? 'd-none' : ''),
                                        ondblclick: (e) => {
                                            VentilacionUci.nuevoRegistro = null
                                            VentilacionUci.verRegistro(oData);
                                        },
                                    }, (oData.pm !== null ? oData.pm : m.trust('<div class="text-center pd-l-0 pd-r-0"><hr style="border-color:#001737;"/></div>'))),
                                    (VentilacionUci.nuevoRegistro !== null ? [
                                        m("input", {
                                            id: "pm" + VentilacionUci.nuevoRegistro.id,
                                            class: "form-control tx-semibold tx-14 " + (oData.editar == true ? '' : 'd-none'),
                                            type: "text",
                                            placeholder: "...",
                                            ondblclick: (e) => {
                                                oData.editar = null;
                                                VentilacionUci.nuevoRegistro = null
                                            },
                                            oninput: (e) => {
                                                if (PacientesUCI.numeroTurno == 2) {
                                                    VentilacionUci.nuevoRegistro.pm = (e.target.value.length !== 0 ? e.target.value : null);
                                                } else {
                                                    e.preventDefault();
                                                }
                                            },
                                            value: (VentilacionUci.nuevoRegistro.pm !== null ? VentilacionUci.nuevoRegistro.pm : '')
                                        })
                                    ] : [])

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
                                    m('div.pd-10', {
                                        class: (oData.editar == true ? 'd-none' : ''),
                                        ondblclick: (e) => {
                                            VentilacionUci.nuevoRegistro = null
                                            VentilacionUci.verRegistro(oData);
                                        },
                                    }, (oData.hs !== null ? oData.hs : m.trust('<div class="text-center pd-l-0 pd-r-0"><hr style="border-color:#001737;"/></div>'))),
                                    (VentilacionUci.nuevoRegistro !== null ? [
                                        m("input", {
                                            id: "hs" + VentilacionUci.nuevoRegistro.id,
                                            class: "form-control tx-semibold tx-14 " + (oData.editar == true ? '' : 'd-none'),
                                            type: "text",
                                            placeholder: "...",
                                            ondblclick: (e) => {
                                                oData.editar = null;
                                                VentilacionUci.nuevoRegistro = null
                                            },
                                            oninput: (e) => {
                                                if (PacientesUCI.numeroTurno == 3) {
                                                    VentilacionUci.nuevoRegistro.hs = (e.target.value.length !== 0 ? e.target.value : null);
                                                } else {
                                                    e.preventDefault();
                                                }
                                            },
                                            value: (VentilacionUci.nuevoRegistro.hs !== null ? VentilacionUci.nuevoRegistro.hs : '')

                                        })
                                    ] : [])

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
                                    m('div.pd-10', {
                                        class: (oData.editar == true ? 'd-none' : ''),
                                        ondblclick: (e) => {
                                            VentilacionUci.nuevoRegistro = null
                                            VentilacionUci.verRegistro(oData);
                                        },
                                    }, (oData.observacion !== null ? oData.observacion : m.trust('<div class="text-center pd-l-0 pd-r-0"><hr style="border-color:#001737;"/></div>'))),
                                    (VentilacionUci.nuevoRegistro !== null ? [
                                        m("input", {
                                            id: "observacion" + VentilacionUci.nuevoRegistro.id,
                                            class: "form-control tx-semibold tx-14 " + (oData.editar == true ? '' : 'd-none'),
                                            type: "text",
                                            placeholder: "...",
                                            onkeypress: (e) => {
                                                if (e.keyCode == 13) {

                                                    VentilacionUci.nuevoRegistro.numeroTurno = PacientesUCI.numeroTurno;
                                                    VentilacionUci.nuevoRegistro.fechaHoraTurno = PacientesUCI.fechaHoraTurno;
                                                    console.log(99, VentilacionUci.nuevoRegistro)

                                                    // throw 'AA';
                                                    if (VentilacionUci.nuevoRegistro.editar == null) {
                                                        VentilacionUci.agregarRegistro();
                                                        FecthUci.registrarSeccion(VentilacionUci.nuevoRegistro);
                                                        VentilacionUci.nuevoRegistro = null;
                                                        VentilacionUci.filterRegistros();
                                                        PacientesUCI.vReloadTable('table-ventilacion', VentilacionUci.getRegistros());
                                                    } else {
                                                        VentilacionUci.editarRegistro();
                                                        FecthUci.actualizarSeccion(VentilacionUci.nuevoRegistro);
                                                        VentilacionUci.nuevoRegistro = null;
                                                        VentilacionUci.filterRegistros();
                                                        PacientesUCI.vReloadTable('table-ventilacion', VentilacionUci.getRegistros());

                                                    }


                                                }
                                            },
                                            ondblclick: (e) => {
                                                oData.editar = null;
                                                VentilacionUci.nuevoRegistro = null
                                            },
                                            oninput: (e) => {
                                                VentilacionUci.nuevoRegistro.observacion = (e.target.value.length !== 0 ? e.target.value : null);
                                            },
                                            value: (VentilacionUci.nuevoRegistro.observacion !== null ? VentilacionUci.nuevoRegistro.observacion : '')

                                        })
                                    ] : [])

                                ]
                            }
                        });
                    },
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
                                        m("button.btn.btn-xs.btn-success.d-none[type='button']", {
                                                //class: (oData.editar ? 'd-none' : ''),
                                                disabled: (TurnosUci.nuevoTurno !== null && TurnosUci.nuevoTurno.gestion == 1 ? (PacientesUCI.fechaHoraTurno != oData.fechaHoraTurno ? 'disabled' : '') : 'disabled'),
                                                onclick: () => {
                                                    VentilacionUci.nuevoRegistro = null
                                                    VentilacionUci.verRegistro(oData);
                                                },
                                            },
                                            'Editar',
                                        ),
                                        m("button.btn.btn-xs.btn-block.btn-danger[type='button']", {
                                                class: (oData.editar ? '' : 'd-none'),
                                                disabled: (PacientesUCI.fechaHoraTurno != oData.fechaHoraTurno ? 'disabled' : ''),

                                                onclick: () => {
                                                    oData.editar = null;
                                                    VentilacionUci.nuevoRegistro = null;
                                                },
                                            },
                                            'Cancelar Edición',
                                        ),
                                        m("button.btn.btn-xs.btn-dark[type='button']", {
                                                class: (PacientesUCI.fechaHoraTurno != oData.fechaHoraTurno ? '' : 'd-none'),
                                                onclick: () => {
                                                    VentilacionUci.iniciarRegistro();
                                                    VentilacionUci.nuevoRegistro.id = oData.id;
                                                    VentilacionUci.nuevoRegistro.ventilacion = oData.ventilacion;
                                                    if (PacientesUCI.numeroTurno != 1) {
                                                        VentilacionUci.nuevoRegistro.am = oData.am;
                                                        VentilacionUci.nuevoRegistro.pm = oData.pm;
                                                        VentilacionUci.nuevoRegistro.hs = oData.hs;
                                                        VentilacionUci.nuevoRegistro.observacion = oData.observacion;
                                                    }
                                                    VentilacionUci.nuevoRegistro.numeroTurno = PacientesUCI.numeroTurno;
                                                    VentilacionUci.nuevoRegistro.fechaHoraTurno = PacientesUCI.fechaHoraTurno;

                                                },
                                            },
                                            'Copiar',
                                        ),

                                    ])

                                ]
                            }
                        });
                    },
                    width: '5%',
                    visible: true,
                    aTargets: [8],
                    orderable: true,

                }


            ],
            fnRowCallback: function(nRow, aData, iDisplayIndex, iDisplayIndexFull) {

            },
        };
    }

    view() {
        return [
            m("thead.bd.bd-2", {
                    style: { "border-color": "#5173a1" },
                },

                m("tr.tx-uppercase", {
                    style: { "background-color": "#CCCCFF" },
                    onclick: () => {
                        VentilacionUci.show = !VentilacionUci.show;
                    }

                }, [
                    m("th.tx-semibold[scope='col'][colspan='12']",
                        "MANEJO DE VENTILACIÓN"
                    ),

                ])
            ),
            m("tbody.bd.bd-2", {
                style: { "border-color": "#5173a1" },
                class: (VentilacionUci.show ? '' : 'd-none')
            }, [

                m("tr.bd.bd-2.tx-uppercase.d-none", {
                    style: { "background-color": "rgb(238, 249, 200)", "border-color": "#5173a1" },
                    class: (TurnosUci.nuevoTurno !== null && TurnosUci.nuevoTurno.gestion == 1 ? '' : 'd-none'),
                }, [
                    m("th[scope='col'][colspan='3']",
                        "MANEJO DE VENTILACIÓN: "
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
                m("tr.bd.bd-2.d-none", {
                    style: { "border-color": "#5173a1" },
                    class: (TurnosUci.nuevoTurno !== null && TurnosUci.nuevoTurno.gestion == 1 ? '' : 'd-none'),
                }, [
                    m("td.tx-14.tx-normal.d-none[colspan='3']",
                        (VentilacionUci.nuevoRegistro !== null ? [
                            m('div.d-flex', [
                                m("input", {
                                    class: "form-control tx-semibold tx-14",
                                    type: "text",
                                    placeholder: "...",
                                    disabled: true,
                                    value: VentilacionUci.nuevoRegistro.ventilacion,
                                })

                            ]),
                        ] : [])
                    ),
                    m("td.tx-14.tx-normal.d-none[colspan='3']",
                        m('select.tx-semibold', {
                            id: 'sec_Ventilacion',
                            disabled: true,
                            onchange: (e) => {
                                let _id = e.target.options[e.target.selectedIndex].id;
                                let _value = e.target.options[e.target.selectedIndex].value;
                                VentilacionUci.iniciarRegistro();
                                VentilacionUci.nuevoRegistro.id = _id;
                                VentilacionUci.nuevoRegistro.ventilacion = _value;
                            },
                            class: "custom-select",
                            value: (VentilacionUci.nuevoRegistro !== null ? VentilacionUci.nuevoRegistro.cateter : 0),
                        }, m("option[value='0']", 'Seleccione...'), [{
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
                            },

                        ].map(x =>
                            m('option[id="' + x.id + '"]', x.label)
                        ))
                    ),
                    m("td.tx-14.tx-normal.d-none[colspan='3']",
                        (VentilacionUci.nuevoRegistro !== null ? [
                            m('div.d-flex', [
                                m("input", {
                                    id: "_am" + VentilacionUci.nuevoRegistro.id,
                                    class: "form-control tx-semibold tx-14",
                                    type: "text",
                                    placeholder: "...",
                                    oninput: (e) => {
                                        if (PacientesUCI.numeroTurno == 1) {
                                            VentilacionUci.nuevoRegistro.am = (e.target.value.length !== 0 ? e.target.value : null);
                                        } else {
                                            e.target.value = '';
                                        }
                                    },
                                    value: VentilacionUci.nuevoRegistro.am
                                })

                            ]),
                        ] : [])
                    ),
                    m("td.tx-14.tx-normal.d-none[colspan='3']",
                        (VentilacionUci.nuevoRegistro !== null ? [
                            m('div.d-flex', [
                                m("input", {
                                    id: "_pm" + VentilacionUci.nuevoRegistro.id,
                                    class: "form-control tx-semibold tx-14",
                                    type: "text",
                                    placeholder: "...",
                                    oninput: (e) => {
                                        if (PacientesUCI.numeroTurno == 2) {
                                            VentilacionUci.nuevoRegistro.pm = (e.target.value.length !== 0 ? e.target.value : null);
                                        } else {
                                            e.target.value = '';
                                        }
                                    },
                                    value: VentilacionUci.nuevoRegistro.pm
                                })

                            ]),
                        ] : [])
                    ),

                    m("td.tx-14.tx-normal.d-none[colspan='3']",
                        (VentilacionUci.nuevoRegistro !== null ? [
                            m('div.d-flex', [
                                m("input", {
                                    id: "_hs" + VentilacionUci.nuevoRegistro.id,
                                    class: "form-control tx-semibold tx-14",
                                    type: "text",
                                    placeholder: "...",
                                    oninput: (e) => {
                                        if (PacientesUCI.numeroTurno == 3) {
                                            VentilacionUci.nuevoRegistro.hs = (e.target.value.length !== 0 ? e.target.value : null);
                                        } else {
                                            e.target.value = '';
                                        }
                                    },
                                    value: VentilacionUci.nuevoRegistro.hs
                                })

                            ]),
                        ] : [])
                    ),
                ]),
                m("tr.bd.bd-2.tx-uppercase.d-none", {
                    style: { "background-color": "rgb(238, 249, 200)", "border-color": "#5173a1" },
                    class: (TurnosUci.nuevoTurno !== null && TurnosUci.nuevoTurno.gestion == 1 ? '' : 'd-none'),
                }, [
                    m("th[scope='col'][colspan='12']",
                        "OBSERVACIÓN: "
                    ),
                ]),
                m("tr.bd.bd-2.d-none", {
                    style: { "border-color": "#5173a1" },
                    class: (TurnosUci.nuevoTurno !== null && TurnosUci.nuevoTurno.gestion == 1 ? '' : 'd-none'),
                }, [
                    m("td.tx-14.tx-normal[colspan='12']",
                        (VentilacionUci.nuevoRegistro !== null ? [
                            m("input", {
                                id: "_observacion" + VentilacionUci.nuevoRegistro.id,
                                class: "form-control tx-semibold tx-14",
                                type: "text",
                                placeholder: "...",
                                onkeypress: (e) => {
                                    if (e.keyCode == 13) {
                                        VentilacionUci.nuevoRegistro.numeroTurno = PacientesUCI.numeroTurno;
                                        VentilacionUci.nuevoRegistro.fechaHoraTurno = PacientesUCI.fechaHoraTurno;
                                        if (VentilacionUci.nuevoRegistro.editar == null) {
                                            VentilacionUci.agregarRegistro();
                                            FecthUci.registrarSeccion(VentilacionUci.nuevoRegistro);
                                            VentilacionUci.nuevoRegistro = null;
                                            VentilacionUci.filterRegistros();
                                            PacientesUCI.vReloadTable('table-ventilacion', VentilacionUci.getRegistros());
                                        } else {
                                            VentilacionUci.editarRegistro();
                                            FecthUci.actualizarSeccion(VentilacionUci.nuevoRegistro);
                                            VentilacionUci.nuevoRegistro = null;
                                            VentilacionUci.filterRegistros();
                                            PacientesUCI.vReloadTable('table-ventilacion', VentilacionUci.getRegistros());
                                        }
                                    }
                                },
                                oninput: (e) => {
                                    VentilacionUci.nuevoRegistro.observacion = (e.target.value.length !== 0 ? e.target.value : null);
                                },
                                value: VentilacionUci.nuevoRegistro.observacion,
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
                        (VentilacionUci.show != false ? [PacientesUCI.vTable('table-ventilacion', VentilacionUci.getRegistros(), VentilacionUci.arqTable())] : [])
                    ),
                ]),
            ]),
        ];
    }
}

export default VentilacionUci;