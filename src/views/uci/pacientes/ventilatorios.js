import m from "mithril";
import App from "../../../models/App";
import Loader from "../../utils/loader";
import Errors from "../../utils/errors";
import PacientesUCI from "./pacientesUci";
import TurnosUci from "./turnosUci";
import FecthUci from "./fecthUci";

class Ventilatorio {
    id = null;
    nro = null;
    fechaHoraTurno = null;
    ventilatorio = null;
    condicion = null;
    hora = null;
    editar = null;
    seccion = 'Ventilatorios';
    constructor() {
        this.id = this.id;
        this.nro = this.nro;
        this.fechaHoraTurno = this.fechaHoraTurno;
        this.ventilatorio = this.ventilatorio;
        this.condicion = this.condicion;
        this.hora = this.hora;
        this.editar = this.editar;
        this.seccion = this.seccion;
    }
}


class VentilatoriosUci {
    static registros = [];
    static nuevoRegistro = null;
    static show = false;
    static validarRegistro() {

    }
    static iniciarRegistro() {
        VentilatoriosUci.nuevoRegistro = new Ventilatorio();
    }
    static agregarRegistro() {
        if (VentilatoriosUci.registros.length == 0) {
            VentilatoriosUci.nuevoRegistro.nro = 1;
            VentilatoriosUci.registros.push(VentilatoriosUci.nuevoRegistro);
        } else {
            VentilatoriosUci.nuevoRegistro.nro = (VentilatoriosUci.registros[VentilatoriosUci.registros.length - 1].nro + 1);
            VentilatoriosUci.registros.push(VentilatoriosUci.nuevoRegistro);
        }
    }
    static verRegistro(registro) {
        registro.editar = true;
        VentilatoriosUci.nuevoRegistro = registro;
        console.log(VentilatoriosUci.nuevoRegistro)
    }
    static editarRegistro() {
        VentilatoriosUci.nuevoRegistro.editar = null;
        VentilatoriosUci.registros.map((_v, _i) => {
            if (_v.nro == VentilatoriosUci.nuevoRegistro.nro) {
                VentilatoriosUci.registros[_i] = VentilatoriosUci.nuevoRegistro;
            }
        });

    }
    static eliminarRegistro(obj) {
        let res = [];
        VentilatoriosUci.registros.map((_v, _i) => {

            if (_v.nro !== obj.nro) {
                res.push(_v);
            }
        });
        VentilatoriosUci.registros = res;
    }
    static getRegistros() {
        return VentilatoriosUci.registros;
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
                [0, 'desc'],
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
                        return full.ventilatorio;
                    },

                    visible: true,
                    aTargets: [3],
                    orderable: true,

                },
                {
                    mRender: function(data, type, full) {
                        return (full.condicion != null ? full.condicion : '<div class="text-center pd-l-0 pd-r-0"><hr style="border-color:#001737;"/></div>');
                    },
                    visible: true,
                    aTargets: [4],
                    orderable: true,

                },
                {
                    mRender: function(data, type, full) {
                        return (full.hora != null ? full.hora : '<div class="text-center pd-l-0 pd-r-0"><hr style="border-color:#001737;"/></div>');
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
                                                disabled: (TurnosUci.nuevoTurno !== null && TurnosUci.nuevoTurno.gestion == 1 ? (PacientesUCI.numeroTurno != oData.numeroTurno ? 'disabled' : '') : 'disabled'),
                                                onclick: () => {
                                                    VentilatoriosUci.nuevoRegistro = null
                                                    VentilatoriosUci.verRegistro(oData);
                                                },
                                            },
                                            'Editar',
                                        ),
                                        m("button.btn.btn-xs.btn-block.btn-outline-danger[type='button']", {
                                                class: (oData.editar ? '' : 'd-none'),
                                                disabled: (PacientesUCI.numeroTurno != oData.numeroTurno ? 'disabled' : ''),

                                                onclick: () => {
                                                    oData.editar = null;
                                                    VentilatoriosUci.nuevoRegistro = null;
                                                },
                                            },
                                            'Cancelar Edición',
                                        ),

                                    ])

                                ]
                            }
                        });
                    },
                    width: '5%',
                    visible: true,
                    aTargets: [6],
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
                    class: (VentilatoriosUci.show ? '' : 'd-none')


                }, [
                    m("th.tx-semibold[scope='col'][colspan='12']",
                        "MODOS VENTILATORIOS / VARIABLES"
                    ),

                ])
            ),
            m("tbody.bd.bd-2", {
                style: { "border-color": "#5173a1" },
                class: (VentilatoriosUci.show ? '' : 'd-none')
            }, [



                m("tr.bd.bd-2.tx-uppercase", {
                    style: { "background-color": "rgb(238, 249, 200)", "border-color": "#5173a1" },
                    class: (TurnosUci.nuevoTurno !== null && TurnosUci.nuevoTurno.gestion == 1 ? '' : 'd-none'),
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
                m("tr.bd.bd-2", {
                    style: { "border-color": "#5173a1" },
                    class: (TurnosUci.nuevoTurno !== null && TurnosUci.nuevoTurno.gestion == 1 ? '' : 'd-none'),
                }, [
                    m("td.tx-14.tx-normal[colspan='3']",
                        (VentilatoriosUci.nuevoRegistro !== null ? [
                            m('div.d-flex', [
                                m("input", {
                                    class: "form-control tx-semibold tx-14",
                                    type: "text",
                                    placeholder: "...",
                                    disabled: true,
                                    value: VentilatoriosUci.nuevoRegistro.ventilatorio,
                                })

                            ]),
                        ] : [])
                    ),
                    m("td.tx-14.tx-normal.d-none[colspan='4']",
                        m('select.tx-semibold', {
                            id: 'sec_Ventilatorios',
                            disabled: true,
                            onchange: (e) => {
                                let _id = e.target.options[e.target.selectedIndex].id;
                                let _value = e.target.options[e.target.selectedIndex].value;
                                VentilatoriosUci.iniciarRegistro();
                                VentilatoriosUci.nuevoRegistro.id = _id;
                                VentilatoriosUci.nuevoRegistro.ventilatorio = _value;
                            },
                            class: "custom-select",
                            value: (VentilatoriosUci.nuevoRegistro !== null ? VentilatoriosUci.nuevoRegistro.ventilatorio : 0),
                        }, m("option[value='0']", 'Seleccione...'), [{
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
                        (VentilatoriosUci.nuevoRegistro !== null ? [
                            m('div.d-flex', [
                                m("input", {
                                    id: "condicion" + VentilatoriosUci.nuevoRegistro.id,
                                    class: "form-control tx-semibold tx-14",
                                    type: "text",
                                    placeholder: "...",
                                    oninput: (e) => {
                                        VentilatoriosUci.nuevoRegistro.condicion = e.target.value;
                                    },
                                    value: VentilatoriosUci.nuevoRegistro.condicion
                                })

                            ]),
                        ] : [])
                    ),
                    m("td.tx-14.tx-normal[colspan='4']",
                        (VentilatoriosUci.nuevoRegistro !== null ? [
                            m('div.d-flex', [
                                m("input", {
                                    id: "hora" + VentilatoriosUci.nuevoRegistro.id,
                                    class: "form-control tx-semibold tx-14",
                                    type: "text",
                                    placeholder: "...",
                                    oninput: (e) => {
                                        VentilatoriosUci.nuevoRegistro.hora = e.target.value;
                                    },
                                    onkeypress: (e) => {
                                        if (e.keyCode == 13) {
                                            VentilatoriosUci.nuevoRegistro.numeroTurno = PacientesUCI.numeroTurno;
                                            VentilatoriosUci.nuevoRegistro.fechaHoraTurno = PacientesUCI.fechaHoraTurno;
                                            if (VentilatoriosUci.nuevoRegistro.editar == null) {
                                                VentilatoriosUci.agregarRegistro();
                                                FecthUci.registrarSeccion(VentilatoriosUci.nuevoRegistro);
                                                PacientesUCI.vReloadTable('table-ventilatorios', VentilatoriosUci.getRegistros());
                                                VentilatoriosUci.nuevoRegistro = null;
                                            } else {
                                                VentilatoriosUci.editarRegistro();
                                                FecthUci.actualizarSeccion(VentilatoriosUci.nuevoRegistro);
                                                PacientesUCI.vReloadTable('table-ventilatorios', VentilatoriosUci.getRegistros());
                                                VentilatoriosUci.nuevoRegistro = null;
                                            }
                                        }
                                    },
                                    value: VentilatoriosUci.nuevoRegistro.hora

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
                        (VentilatoriosUci.show != false ? [PacientesUCI.vTable('table-ventilatorios', VentilatoriosUci.getRegistros(), VentilatoriosUci.arqTable())] : [])
                    ),
                ]),
            ]),
        ]
    }
}

export default VentilatoriosUci;