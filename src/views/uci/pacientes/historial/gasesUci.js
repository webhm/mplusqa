import m from "mithril";
import PacientesUCI from "./pacientesUci";
import FecthUci from "./fecthUci";
import TurnosUci from "./turnosUci";

class Gas {
    id = null;
    nro = null;
    fechaHoraTurno = null;
    gas = null;
    fechaHora = null;
    fecha = null;
    hora = null;
    valores = null;
    editar = null;
    seccion = 'Gases';
    constructor() {
        this.id = this.id;
        this.nro = this.nro;
        this.fechaHoraTurno = this.fechaHoraTurno;
        this.gas = this.gas;
        this.fechaHora = this.fechaHora;
        this.fecha = this.fecha;
        this.hora = this.hora;
        this.valores = this.valores;
        this.editar = this.editar;
        this.seccion = this.seccion;
    }
}


class GasesUci {
    static registros = [];
    static nuevoRegistro = null;
    static show = false;
    static setFecha = null;
    static setHora = null;
    static setValores = null;
    static validarRegistro() {

    }
    static iniciarRegistro() {
        GasesUci.nuevoRegistro = new Gas();
    }
    static agregarRegistro() {
        if (GasesUci.registros.length == 0) {
            GasesUci.nuevoRegistro.nro = 1;
            GasesUci.registros.push(GasesUci.nuevoRegistro);
        } else {
            GasesUci.nuevoRegistro.nro = (GasesUci.registros[GasesUci.registros.length - 1].nro + 1);
            GasesUci.registros.push(GasesUci.nuevoRegistro);
        }
    }
    static verRegistro(registro) {
        registro.editar = true;
        GasesUci.nuevoRegistro = registro;
    }
    static editarRegistro() {
        GasesUci.nuevoRegistro.editar = null;
        GasesUci.registros.map((_v, _i) => {
            if (_v.nro == GasesUci.nuevoRegistro.nro) {
                GasesUci.registros[_i] = GasesUci.nuevoRegistro;
            }
        });

    }
    static eliminarRegistro(obj) {

        let res = [];
        GasesUci.registros.map((_v, _i) => {

            if (_v.nro !== obj.nro) {
                res.push(_v);
            }

        });

        GasesUci.registros = res;

    }
    static getRegistros() {
        return GasesUci.registros;
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
                    title: "Gases:",
                },
                {
                    title: "Fecha y Hora:",
                },
                {
                    title: "Valores:",
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
                        return full.gas;
                    },

                    visible: true,
                    aTargets: [3],
                    orderable: true,

                },
                {
                    mRender: function(data, type, full) {
                        return (full.fechaHora != null ? full.fechaHora : '<div class="text-center pd-l-0 pd-r-0"><hr style="border-color:#001737;"/></div>');
                    },
                    visible: true,
                    aTargets: [4],
                    orderable: true,

                },
                {
                    mRender: function(data, type, full) {
                        return (full.valores != null ? full.valores : '<div class="text-center pd-l-0 pd-r-0"><hr style="border-color:#001737;"/></div>');
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
                                                disabled: (TurnosUci.nuevoTurno !== null && TurnosUci.nuevoTurno.gestion == 1 ? (PacientesUCI.fechaHoraTurno != oData.fechaHoraTurno ? 'disabled' : '') : 'disabled'),
                                                onclick: () => {
                                                    GasesUci.nuevoRegistro = null
                                                    GasesUci.verRegistro(oData);
                                                },
                                            },
                                            'Editar',
                                        ),
                                        m("button.btn.btn-xs.btn-block.btn-outline-danger[type='button']", {
                                                class: (oData.editar ? '' : 'd-none'),
                                                disabled: (PacientesUCI.fechaHoraTurno != oData.fechaHoraTurno ? 'disabled' : ''),

                                                onclick: () => {
                                                    oData.editar = null;
                                                    GasesUci.nuevoRegistro = null;
                                                },
                                            },
                                            'Cancelar Edición',
                                        ),
                                        m("button.btn.btn-xs.btn-danger[type='button']", {
                                                class: (oData.editar ? 'd-none' : ''),
                                                disabled: (TurnosUci.nuevoTurno !== null && TurnosUci.nuevoTurno.gestion == 1 ? (PacientesUCI.fechaHoraTurno != oData.fechaHoraTurno ? 'disabled' : '') : 'disabled'),

                                                onclick: () => {

                                                    if (confirm("¿Esta Ud seguro de eliminar este registro?") == true) {
                                                        GasesUci.eliminarRegistro(oData);
                                                        FecthUci.eliminarSeccion(oData);
                                                        GasesUci.nuevoRegistro = null;
                                                        PacientesUCI.vReloadTable('table-gases', GasesUci.getRegistros());
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

    view() {
        return [
            m("thead.bd.bd-2", {
                    style: { "border-color": "#5173a1" }
                },

                m("tr.tx-uppercase", {

                    style: { "background-color": "#CCCCFF" },
                    class: (GasesUci.show ? '' : 'd-none')

                }, [
                    m("th.tx-semibold[scope='col'][colspan='12']",
                        "GASOMETRIAS / HORAS:"
                    ),

                ])
            ),
            m("tbody.bd.bd-2", {
                style: { "border-color": "#5173a1" },
                class: (GasesUci.show ? '' : 'd-none')
            }, [



                m("tr.bd.bd-2.tx-uppercase", {
                    style: { "background-color": "rgb(238, 249, 200)", "border-color": "#5173a1" },
                    class: (TurnosUci.nuevoTurno !== null && TurnosUci.nuevoTurno.gestion == 1 ? '' : 'd-none'),

                }, [
                    m("th[scope='col'][colspan='4']",
                        "GASOMETRIAS:"
                    ),
                    m("th[scope='col'][colspan='4']",
                        "FECHA Y HORA:"
                    ),
                    m("th[scope='col'][colspan='4']",
                        "VALORES:"
                    ),

                ]),
                m("tr.bd.bd-2", {
                    style: { "border-color": "#5173a1" },
                    class: (TurnosUci.nuevoTurno !== null && TurnosUci.nuevoTurno.gestion == 1 ? '' : 'd-none'),

                }, [

                    m("td.tx-14.tx-normal[colspan='4']",
                        m('select.tx-semibold', {
                            id: 'sec_Gases',
                            onchange: (e) => {
                                let _id = e.target.options[e.target.selectedIndex].id;
                                let _value = e.target.options[e.target.selectedIndex].value;
                                if (GasesUci.nuevoRegistro == null) {
                                    GasesUci.iniciarRegistro();
                                    GasesUci.nuevoRegistro.id = _id;
                                    GasesUci.nuevoRegistro.gas = _value;
                                } else {
                                    GasesUci.nuevoRegistro.id = _id;
                                    GasesUci.nuevoRegistro.gas = _value;
                                }
                            },
                            class: "custom-select",
                            value: (GasesUci.nuevoRegistro !== null ? GasesUci.nuevoRegistro.gas : 0),

                        }, m("option[value='0']", 'Seleccione...'), [{
                                id: "PH",
                                label: "PH"
                            },
                            {
                                id: "PaCO2",
                                label: "PaCO2"
                            },
                            {
                                id: "PaO2",
                                label: "PaO2"
                            },
                            {
                                id: "HCO3",
                                label: "HCO3"
                            },
                            {
                                id: "TC02",
                                label: "TC02"
                            },
                            {
                                id: "ExcesoBase",
                                label: "EXCESO DE BASE"
                            },
                            {
                                id: "FiO2",
                                label: "FiO2 %"
                            },
                            {
                                id: "PaO2FiO2",
                                label: "PaO2 / FiO2"
                            },
                            {
                                id: "SaO2",
                                label: "SaO2"
                            },
                            {
                                id: "Lactato",
                                label: "LACTATO"
                            },
                            {
                                id: "Na",
                                label: "Na"
                            },
                            {
                                id: "K",
                                label: "K"
                            }
                        ].map(x =>
                            m('option[id="' + x.id + '"]', x.label)
                        ))
                    ),
                    m("td.tx-14.tx-normal.wd-40p[colspan='4']",
                        (GasesUci.nuevoRegistro !== null ? [
                            m('div.d-flex', [
                                m("input.form-control[type='text'][placeholder='DD/MM/YYYY']", {
                                    id: "gasesFecha" + GasesUci.nuevoRegistro.id,
                                    oncreate: (el) => {
                                        if (GasesUci.nuevoRegistro.fecha != undefined) {
                                            el.dom.value = GasesUci.nuevoRegistro.fecha;
                                        }
                                        if (GasesUci.setFecha != undefined) {
                                            el.dom.value = GasesUci.setFecha;
                                        }
                                        setTimeout(() => {
                                            new Cleave("#gasesFecha" + GasesUci.nuevoRegistro.id, {
                                                date: true,
                                                datePattern: ["d", "m", "Y"]
                                            });
                                        }, 50);
                                    },
                                    oninput: (e) => {
                                        setTimeout(() => {
                                            GasesUci.setFecha = e.target.value;
                                            GasesUci.nuevoRegistro.fecha = e.target.value;
                                        }, 50);
                                    },
                                }),
                                m("input.form-control[type='text'][placeholder='HH:mm']", {
                                    id: "gasesHora" + GasesUci.nuevoRegistro.id,
                                    oncreate: (el) => {
                                        if (GasesUci.nuevoRegistro.hora != undefined) {
                                            el.dom.value = GasesUci.nuevoRegistro.hora;
                                        }
                                        if (GasesUci.setHora != undefined) {
                                            el.dom.value = GasesUci.setHora;
                                        }
                                        setTimeout(() => {
                                            new Cleave("#gasesHora" + GasesUci.nuevoRegistro.id, {
                                                time: true,
                                                timePattern: ['h', 'm']
                                            });
                                        }, 50);
                                    },
                                    oninput: (e) => {
                                        setTimeout(() => {
                                            GasesUci.setHora = e.target.value;
                                            GasesUci.nuevoRegistro.hora = e.target.value;
                                            GasesUci.nuevoRegistro.fechaHora = GasesUci.nuevoRegistro.fecha + ' ' + GasesUci.nuevoRegistro.hora;
                                        }, 50);
                                    },
                                }),
                            ]),

                        ] : [])
                    ),
                    m("td.tx-14.tx-normal.wd-40p[colspan='4']",
                        (GasesUci.nuevoRegistro !== null ? [
                            m('div.d-flex', [
                                m("input", {
                                    id: "valores" + GasesUci.nuevoRegistro.id,
                                    class: "form-control tx-semibold tx-14",
                                    type: "text",
                                    placeholder: "...",
                                    oncreate: (el) => {
                                        if (GasesUci.setValores != undefined) {
                                            el.dom.value = GasesUci.setValores;
                                        }
                                    },
                                    onkeypress: (e) => {
                                        if (e.keyCode == 13) {
                                            GasesUci.nuevoRegistro.numeroTurno = PacientesUCI.numeroTurno;
                                            GasesUci.nuevoRegistro.fechaHoraTurno = PacientesUCI.fechaHoraTurno;
                                            if (GasesUci.nuevoRegistro.editar == null) {
                                                GasesUci.agregarRegistro();
                                                FecthUci.registrarSeccion(GasesUci.nuevoRegistro);
                                                PacientesUCI.vReloadTable('table-gases', GasesUci.getRegistros());
                                                GasesUci.nuevoRegistro = null;
                                            } else {
                                                GasesUci.editarRegistro();
                                                FecthUci.actualizarSeccion(GasesUci.nuevoRegistro);
                                                PacientesUCI.vReloadTable('table-gases', GasesUci.getRegistros());
                                                GasesUci.nuevoRegistro = null;
                                            }
                                            // Para las cosas de las cosas que no se peude ver

                                        }
                                    },
                                    oninput: (e) => {
                                        GasesUci.setValores = (e.target.value.length !== 0 ? e.target.value : null);
                                        GasesUci.nuevoRegistro.valores = (e.target.value.length !== 0 ? e.target.value : null);
                                    },
                                    value: GasesUci.nuevoRegistro.valores
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
                        (GasesUci.show != false ? [PacientesUCI.vTable('table-gases', GasesUci.getRegistros(), GasesUci.arqTable())] : [])
                    ),
                ]),
            ]),
        ]
    }
}

export default GasesUci;