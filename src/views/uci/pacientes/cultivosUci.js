import m from "mithril";
import App from "../../../models/App";
import Loader from "../../utils/loader";
import Errors from "../../utils/errors";
import PacientesUCI from "./pacientesUci";
import FecthUci from "./fecthUci";
import TurnosUci from "./turnosUci";

class Cultivo {
    id = null;
    nro = null;
    fechaHoraTurno = null;
    muestra = null;
    envio = null;
    envio_fecha = null;
    envio_hora = null;
    resultado_fecha = null;
    resultado = null;
    observacion = null;
    editar = null;
    seccion = 'Cultivos';
    constructor() {
        this.id = this.id;
        this.nro = this.nro;
        this.fechaHoraTurno = this.fechaHoraTurno;
        this.muestra = this.muestra;
        this.envio = this.envio;
        this.envio_fecha = this.envio_fecha;
        this.envio_hora = this.envio_hora;
        this.resultado_fecha = this.resultado_fecha;
        this.resultado = this.resultado;
        this.observacion = this.observacion;
        this.editar = this.editar;
        this.seccion = this.seccion;
    }
}


class CultivosUci {
    static registros = [];
    static nuevoRegistro = null;
    static show = false;
    static showOtros = false;
    static validarRegistro() {

    }
    static iniciarRegistro() {
        CultivosUci.nuevoRegistro = new Cultivo();
    }
    static agregarRegistro() {
        if (CultivosUci.registros.length == 0) {
            CultivosUci.nuevoRegistro.nro = 1;
            CultivosUci.registros.push(CultivosUci.nuevoRegistro);
        } else {
            CultivosUci.nuevoRegistro.nro = (CultivosUci.registros[CultivosUci.registros.length - 1].nro + 1);
            CultivosUci.registros.push(CultivosUci.nuevoRegistro);
        }
    }
    static verRegistro(registro) {
        registro.editar = true;
        CultivosUci.nuevoRegistro = registro;
    }
    static editarRegistro() {
        CultivosUci.nuevoRegistro.editar = null;
        CultivosUci.registros.map((_v, _i) => {
            if (_v.nro == CultivosUci.nuevoRegistro.nro) {
                CultivosUci.registros[_i] = CultivosUci.nuevoRegistro;
            }
        });

    }
    static eliminarRegistro(obj) {

        let res = [];
        CultivosUci.registros.map((_v, _i) => {

            if (_v.nro !== obj.nro) {
                res.push(_v);
            }

        });

        CultivosUci.registros = res;

    }
    static getRegistros() {
        return CultivosUci.registros;
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
                [1, 'desc']
            ],
            columns: [{
                    title: "Order Turno: ",
                },
                {
                    title: "Order N°: ",
                },
                {
                    title: "Turno: ",
                },
                {
                    title: "Muestra:",
                },
                {
                    title: "Fecha y Hora Envío:",
                },
                {
                    title: "Fecha y Hora Resultado:",
                },
                {
                    title: "Resultado de Germen Aislado:",
                },
                {
                    title: "Observaciones:",
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
                        return (full.id == 'Otros' ? full.otros : full.muestra);
                    },

                    visible: true,
                    aTargets: [3],
                    orderable: true,

                },
                {
                    mRender: function(data, type, full) {
                        return (full.envio != null ? full.envio : '<div class="text-center pd-l-0 pd-r-0"><hr style="border-color:#001737;"/></div>');
                    },
                    visible: true,
                    aTargets: [4],
                    orderable: true,

                },
                {
                    mRender: function(data, type, full) {
                        return (full.resultado_fecha != null ? full.resultado_fecha : '<div class="text-center pd-l-0 pd-r-0"><hr style="border-color:#001737;"/></div>');
                    },
                    visible: true,
                    aTargets: [5],
                    orderable: true,

                },
                {
                    mRender: function(data, type, full) {
                        return (full.resultado != null ? full.resultado : '<div class="text-center pd-l-0 pd-r-0"><hr style="border-color:#001737;"/></div>');
                    },
                    visible: true,
                    aTargets: [6],
                    orderable: true,
                },
                {
                    mRender: function(data, type, full) {
                        return (full.observacion != null ? full.observacion : '<div class="text-center pd-l-0 pd-r-0"><hr style="border-color:#001737;"/></div>');
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
                                        m("button.btn.btn-xs.btn-success[type='button']", {
                                                class: (oData.editar ? 'd-none' : ''),
                                                disabled: (TurnosUci.nuevoTurno !== null && TurnosUci.nuevoTurno.gestion == 1 ? (PacientesUCI.fechaHoraTurno != oData.fechaHoraTurno ? 'disabled' : '') : 'disabled'),
                                                onclick: () => {
                                                    if (oData.id == 'Otros') {
                                                        CultivosUci.showOtros = true;
                                                    } else {
                                                        CultivosUci.showOtros = false;
                                                    }
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
                                                disabled: (TurnosUci.nuevoTurno !== null && TurnosUci.nuevoTurno.gestion == 1 ? (PacientesUCI.fechaHoraTurno != oData.fechaHoraTurno ? 'disabled' : '') : 'disabled'),

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



                m("tr.bd.bd-2.tx-uppercase", {
                    style: { "background-color": "rgb(238, 249, 200)", "border-color": "#5173a1" },
                    class: (TurnosUci.nuevoTurno !== null && TurnosUci.nuevoTurno.gestion == 1 ? '' : 'd-none'),

                }, [
                    m("th[scope='col'][colspan='3']",
                        "MUESTRA: "
                    ),
                    m("th[scope='col'][colspan='3']",
                        "FECHA Y HORA DE ENVÍO: "
                    ),
                    m("th[scope='col'][colspan='3']",
                        "FECHA Y HORA DE RESULTADO: "
                    ),
                    m("th[scope='col'][colspan='3']",
                        "RESULTADO DE GERMEN AISLADO: "
                    ),

                ]),
                m("tr.bd.bd-2", {
                    style: { "border-color": "#5173a1" },

                    class: (TurnosUci.nuevoTurno !== null && TurnosUci.nuevoTurno.gestion == 1 ? '' : 'd-none'),

                }, [

                    m("td.tx-14.tx-normal[colspan='1']",
                        m('select.tx-semibold', {
                            id: 'sec_Cultivos',
                            onchange: (e) => {
                                let _id = e.target.options[e.target.selectedIndex].id;
                                let _value = e.target.options[e.target.selectedIndex].value;
                                if (CultivosUci.nuevoRegistro == null) {
                                    CultivosUci.iniciarRegistro();
                                    CultivosUci.nuevoRegistro.id = _id;
                                    CultivosUci.nuevoRegistro.muestra = _value;
                                    if (CultivosUci.nuevoRegistro.id == 'Otros') {
                                        CultivosUci.showOtros = true;
                                    }
                                    if (CultivosUci.nuevoRegistro.id !== 'Otros') {
                                        CultivosUci.showOtros = false;
                                    }
                                } else {
                                    CultivosUci.nuevoRegistro.id = _id;
                                    CultivosUci.nuevoRegistro.muestra = _value;
                                    if (CultivosUci.nuevoRegistro.id == 'Otros') {
                                        CultivosUci.showOtros = true;
                                    }
                                    if (CultivosUci.nuevoRegistro.id !== 'Otros') {
                                        CultivosUci.showOtros = false;
                                    }
                                }
                            },
                            class: "custom-select",
                            value: (CultivosUci.nuevoRegistro !== null ? CultivosUci.nuevoRegistro.muestra : 0),

                        }, m("option[value='0']", 'Seleccione...'), [{
                                id: "HemocultivoViaCentral",
                                label: "HEMOCULTIVO VIA CENTRAL"
                            },
                            {
                                id: "HemocultivoViaPeriferica",
                                label: "HEMOCULTIVO VIA PERIFERICA"
                            },
                            {
                                id: "HemocultivoLineaArterial",
                                label: "HEMOCULTIVO LINEA ARTERIAL"
                            },

                            {
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
                    m("td.tx-14.tx-normal[colspan='2']", {
                            class: (CultivosUci.showOtros == false ? 'd-none' : '')
                        }, [
                            m('div.d-flex', [
                                (CultivosUci.nuevoRegistro !== null ? [
                                    m("input", {
                                        id: "otrosMuestra" + CultivosUci.nuevoRegistro.id,
                                        class: "form-control tx-semibold tx-14",
                                        type: "text",
                                        placeholder: "Otros",
                                        value: CultivosUci.nuevoRegistro.otros,
                                        oninput: (e) => {
                                            CultivosUci.nuevoRegistro.otros = (e.target.value.length !== 0 ? e.target.value : null);
                                        },
                                    })
                                ] : [])


                            ]),
                        ]

                    ),
                    m("td.tx-14.tx-normal[colspan='3']",
                        (CultivosUci.nuevoRegistro !== null ? [
                            m('div.d-flex', [
                                m("input.form-control[type='text'][placeholder='DD/MM/YYYY']", {
                                    id: "cultivoEnvio" + CultivosUci.nuevoRegistro.id,
                                    oncreate: (el) => {
                                        if (CultivosUci.nuevoRegistro.envio_fecha != undefined) {
                                            el.dom.value = CultivosUci.nuevoRegistro.envio_fecha;
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
                                            CultivosUci.nuevoRegistro.envio_fecha = e.target.value;
                                        }, 50);
                                    },
                                }),
                                m("input.form-control[type='text'][placeholder='HH:mm']", {
                                    id: "cultivoEnvioHora" + CultivosUci.nuevoRegistro.id,
                                    oncreate: (el) => {
                                        if (CultivosUci.nuevoRegistro.envio_hora != undefined) {
                                            el.dom.value = CultivosUci.nuevoRegistro.envio_hora;
                                        }
                                        setTimeout(() => {
                                            new Cleave("#cultivoEnvioHora" + CultivosUci.nuevoRegistro.id, {
                                                time: true,
                                                timePattern: ['h', 'm']
                                            });
                                        }, 50);
                                    },
                                    oninput: (e) => {
                                        setTimeout(() => {
                                            CultivosUci.nuevoRegistro.envio_hora = e.target.value;
                                            CultivosUci.nuevoRegistro.envio = CultivosUci.nuevoRegistro.envio_fecha + ' ' + CultivosUci.nuevoRegistro.envio_hora;
                                        }, 50);
                                    },
                                }),
                            ]),

                        ] : [])
                    ),
                    m("td.tx-14.tx-normal[colspan='3']",
                        (CultivosUci.nuevoRegistro !== null ? [
                            m('div.d-flex', [
                                m("input.form-control[type='text'][placeholder='DD/MM/YYYY']", {
                                    id: "cultivoResultado" + CultivosUci.nuevoRegistro.id,
                                    oncreate: (el) => {
                                        if (CultivosUci.nuevoRegistro.fecha_resultado != undefined) {
                                            el.dom.value = CultivosUci.nuevoRegistro.fecha_resultado;
                                        }
                                        setTimeout(() => {
                                            new Cleave("#cultivoResultado" + CultivosUci.nuevoRegistro.id, {
                                                date: true,
                                                datePattern: ["d", "m", "Y"]
                                            });
                                        }, 50);
                                    },
                                    oninput: (e) => {
                                        setTimeout(() => {
                                            CultivosUci.nuevoRegistro.fecha_resultado = (e.target.value.length !== 0 ? e.target.value : null);
                                        }, 50);
                                    },
                                }),
                                m("input.form-control[type='text'][placeholder='HH:mm']", {
                                    id: "cultivoResultadoHora" + CultivosUci.nuevoRegistro.id,
                                    oncreate: (el) => {
                                        if (CultivosUci.nuevoRegistro.hora_resultado != undefined) {
                                            el.dom.value = CultivosUci.nuevoRegistro.hora_resultado;
                                        }
                                        setTimeout(() => {
                                            new Cleave("#cultivoResultadoHora" + CultivosUci.nuevoRegistro.id, {
                                                time: true,
                                                timePattern: ['h', 'm']
                                            });
                                        }, 50);
                                    },
                                    oninput: (e) => {
                                        setTimeout(() => {
                                            CultivosUci.nuevoRegistro.hora_resultado = (e.target.value.length !== 0 ? e.target.value : null);
                                            CultivosUci.nuevoRegistro.resultado_fecha = CultivosUci.nuevoRegistro.fecha_resultado + ' ' + CultivosUci.nuevoRegistro.hora_resultado;
                                        }, 50);
                                    },
                                }),
                            ]),

                        ] : [])
                    ),
                    m("td.tx-14.tx-normal[colspan='3']",
                        (CultivosUci.nuevoRegistro !== null ? [
                            m('div.d-flex', [
                                m("input", {
                                    id: "resultado" + CultivosUci.nuevoRegistro.id,
                                    class: "form-control tx-semibold tx-14",
                                    type: "text",
                                    placeholder: "...",
                                    oninput: (e) => {
                                        CultivosUci.nuevoRegistro.resultado = (e.target.value.length !== 0 ? e.target.value : null);
                                    },
                                    value: CultivosUci.nuevoRegistro.resultado
                                })

                            ]),
                        ] : [])
                    ),
                ]),
                m("tr.bd.bd-2", {
                    style: { "border-color": "#5173a1" },
                    class: (TurnosUci.nuevoTurno !== null && TurnosUci.nuevoTurno.gestion == 1 ? '' : 'd-none'),
                }, [
                    m("td.tx-14.tx-normal[colspan='12']",
                        (CultivosUci.nuevoRegistro !== null ? [
                            m("input", {
                                id: "observacion" + CultivosUci.nuevoRegistro.id,
                                class: "form-control tx-semibold tx-14",
                                type: "text",
                                placeholder: "...",
                                onkeypress: (e) => {
                                    if (e.keyCode == 13) {
                                        CultivosUci.nuevoRegistro.numeroTurno = PacientesUCI.numeroTurno;
                                        CultivosUci.nuevoRegistro.fechaHoraTurno = PacientesUCI.fechaHoraTurno;
                                        if (CultivosUci.nuevoRegistro.editar == null) {
                                            CultivosUci.agregarRegistro();
                                            FecthUci.registrarSeccion(CultivosUci.nuevoRegistro);
                                            PacientesUCI.vReloadTable('table-cultivos', CultivosUci.getRegistros());
                                            CultivosUci.nuevoRegistro = null;

                                        } else {
                                            CultivosUci.editarRegistro();
                                            FecthUci.actualizarSeccion(CultivosUci.nuevoRegistro);
                                            PacientesUCI.vReloadTable('table-cultivos', CultivosUci.getRegistros());
                                            CultivosUci.nuevoRegistro = null;

                                        }


                                    }
                                },
                                oninput: (e) => {
                                    CultivosUci.nuevoRegistro.observacion = (e.target.value.length !== 0 ? e.target.value : null);
                                },
                                value: CultivosUci.nuevoRegistro.observacion

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
                        (CultivosUci.show != false ? [PacientesUCI.vTable('table-cultivos', CultivosUci.getRegistros(), CultivosUci.arqTable())] : [])
                    ),
                ]),
            ]),
        ]
    }
}

export default CultivosUci;