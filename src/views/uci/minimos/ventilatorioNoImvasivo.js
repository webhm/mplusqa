import m from "mithril";
import FecthUci from "./fecthUci";
import PacientesUCI from "./pacientesUci";
import TurnosUci from "./turnosUci";

class Valoracion {
    id = null;
    nro = null;
    fechaHoraTurno = null;
    tipo = null;
    valor = null;
    editar = null;
    tipoBit = 'UCIMINIMOS';
    seccion = 'VentilatorioNoImvasivo';
    constructor() {
        this.id = this.id;
        this.nro = this.nro;
        this.fechaHoraTurno = this.fechaHoraTurno;
        this.tipo = this.tipo;
        this.valor = this.valor;
        this.editar = this.editar;
        this.tipoBit = this.tipoBit;
        this.seccion = this.seccion;
    }
}

class VentilatorioNoImvasivo {

    static registros = [];
    static nuevoRegistro = null;
    static show = false;
    static showOtros = false;

    static validarRegistro() {

    }

    static iniciarRegistro() {
        VentilatorioNoImvasivo.nuevoRegistro = new Valoracion();
    }

    static agregarRegistro() {
        if (VentilatorioNoImvasivo.registros.length == 0) {
            VentilatorioNoImvasivo.nuevoRegistro.nro = 1;
            VentilatorioNoImvasivo.registros.push(VentilatorioNoImvasivo.nuevoRegistro);
        } else {
            VentilatorioNoImvasivo.nuevoRegistro.nro = (VentilatorioNoImvasivo.registros[VentilatorioNoImvasivo.registros.length - 1].nro + 1);
            VentilatorioNoImvasivo.registros.push(VentilatorioNoImvasivo.nuevoRegistro);
        }
    }

    static verRegistro(registro) {
        registro.editar = true;
        VentilatorioNoImvasivo.nuevoRegistro = registro;
    }

    static editarRegistro() {
        VentilatorioNoImvasivo.nuevoRegistro.editar = null;
        VentilatorioNoImvasivo.registros.map((_v, _i) => {
            if (_v.nro == VentilatorioNoImvasivo.nuevoRegistro.nro) {
                VentilatorioNoImvasivo.registros[_i] = VentilatorioNoImvasivo.nuevoRegistro;
            }
        });

    }

    static eliminarRegistro(obj) {

        let res = [];
        VentilatorioNoImvasivo.registros.map((_v, _i) => {
            if (_v.nro !== obj.nro) {
                res.push(_v);
            }
        });

        VentilatorioNoImvasivo.registros = res;

    }

    static getRegistros() {
        return VentilatorioNoImvasivo.registros;
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
                    title: "Tipo:",
                },
                {
                    title: "Hora:",
                },
                {
                    title: "Valor:",
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
                        return full.nro;
                    },

                    visible: false,
                    aTargets: [3],
                    orderable: false,

                },

                {
                    mRender: function(data, type, full) {
                        return full.tipo != null ? full.tipo : '<div class="text-center pd-l-0 pd-r-0"><hr style="border-color:#001737;"/></div>';
                    },

                    visible: true,
                    aTargets: [4],
                    orderable: true,

                },
                {
                    mRender: function(data, type, full) {
                        return full.hora != null ? full.hora : '<div class="text-center pd-l-0 pd-r-0"><hr style="border-color:#001737;"/></div>';
                    },

                    visible: true,
                    aTargets: [5],
                    orderable: true,

                },
                {
                    mRender: function(data, type, full) {
                        return (full.valor != null ? full.valor : '<div class="text-center pd-l-0 pd-r-0"><hr style="border-color:#001737;"/></div>');
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
                                    m("div.btn-block.btn-group.wd-100p.pd-5", [
                                        m("button.btn.btn-xs.btn-success[type='button']", {
                                                class: (oData.editar ? 'd-none' : ''),
                                                disabled: (TurnosUci.nuevoTurno !== null && TurnosUci.nuevoTurno.gestion == 1 ? (PacientesUCI.fechaHoraTurno != oData.fechaHoraTurno ? 'disabled' : '') : 'disabled'),
                                                onclick: () => {
                                                    VentilatorioNoImvasivo.nuevoRegistro = null
                                                    VentilatorioNoImvasivo.verRegistro(oData);
                                                },
                                            },
                                            'Editar',
                                        ),
                                        m("button.btn.btn-xs.btn-block.btn-outline-danger[type='button']", {
                                                class: (oData.editar ? '' : 'd-none'),
                                                disabled: (PacientesUCI.fechaHoraTurno != oData.fechaHoraTurno ? 'disabled' : ''),

                                                onclick: () => {
                                                    oData.editar = null;
                                                    VentilatorioNoImvasivo.nuevoRegistro = null;
                                                },
                                            },
                                            'Cancelar Edición',
                                        ),
                                        m("button.btn.btn-xs.btn-danger[type='button']", {
                                                class: (oData.editar ? 'd-none' : ''),
                                                disabled: (TurnosUci.nuevoTurno !== null && TurnosUci.nuevoTurno.gestion == 1 ? (PacientesUCI.fechaHoraTurno != oData.fechaHoraTurno ? 'disabled' : '') : 'disabled'),
                                                onclick: () => {
                                                    if (confirm("¿Esta Ud seguro de eliminar este registro?") == true) {
                                                        VentilatorioNoImvasivo.eliminarRegistro(oData);
                                                        FecthUci.eliminarSeccion(oData);
                                                        VentilatorioNoImvasivo.nuevoRegistro = null;
                                                        PacientesUCI.vReloadTable('table-ventilatorioNoImvasivo', VentilatorioNoImvasivo.getRegistros());
                                                    }
                                                },
                                            },
                                            'Eliminar',
                                        ),
                                        m("button.btn.btn-xs.btn-dark[type='button']", {
                                                class: (PacientesUCI.fechaHoraTurno != oData.fechaHoraTurno ? '' : 'd-none'),
                                                onclick: () => {
                                                    VentilatorioNoImvasivo.iniciarRegistro();
                                                    VentilatorioNoImvasivo.nuevoRegistro.id = oData.id;
                                                    VentilatorioNoImvasivo.nuevoRegistro.tipo = oData.tipo;
                                                    VentilatorioNoImvasivo.nuevoRegistro.valor = oData.valor;
                                                    VentilatorioNoImvasivo.nuevoRegistro.numeroTurno = PacientesUCI.numeroTurno;
                                                    VentilatorioNoImvasivo.nuevoRegistro.fechaHoraTurno = PacientesUCI.fechaHoraTurno;

                                                },
                                            },
                                            'Copiar',
                                        ),
                                    ])

                                ]
                            }
                        });
                    },
                    width: '10%',
                    visible: true,
                    aTargets: [7],
                    orderable: true,

                }
            ],
            fnRowCallback: function(nRow, aData, iDisplayIndex, iDisplayIndexFull) {

            },
        };
    }

    static destroyTable() {
        let table = document.getElementById('table-ventilatorioNoImvasivo');
        // clear first
        if (table != null) {
            $('#table-higiene').DataTable().clear().destroy();

        }
    }

    view() {
        return [
            m("thead.bd.bd-2", {
                    style: { "border-color": "#5173a1" },
                    class: (TurnosUci.nuevoTurno !== null && TurnosUci.nuevoTurno.gestion == 1 ? '' : 'd-none'),

                },

                m("tr.tx-uppercase", {
                    // class: (PacientesUCI.tipoAtencion !== null && PacientesUCI.tipoAtencion == 'NEO' ? '' : 'd-none'),
                    style: { "background-color": "#CCCCFF" },
                    onclick: () => {
                        if (VentilatorioNoImvasivo.show) {
                            VentilatorioNoImvasivo.destroyTable();
                        }
                        VentilatorioNoImvasivo.show = !VentilatorioNoImvasivo.show;
                    }
                }, [
                    m("th.tx-semibold[scope='col'][colspan='12']",
                        "MODO VENTILATORIO NO IMVASIVO:"
                    ),

                ])
            ),
            m("tbody.bd.bd-2", {
                style: { "border-color": "#5173a1" },
                class: (VentilatorioNoImvasivo.show ? '' : 'd-none')
            }, [

                m("tr.bd.bd-2.tx-uppercase", {
                    style: { "background-color": "rgb(238, 249, 200)", "border-color": "#5173a1" },
                    class: (TurnosUci.nuevoTurno !== null && TurnosUci.nuevoTurno.gestion == 1 ? '' : 'd-none'),
                }, [
                    m("th[scope='col'][colspan='6']",
                        "TIPO: "
                    ),
                    m("th[scope='col'][colspan='6']",
                        "VALOR: "
                    )
                ]),
                m("tr.bd.bd-2", {
                    style: { "border-color": "#5173a1" },
                    class: (TurnosUci.nuevoTurno !== null && TurnosUci.nuevoTurno.gestion == 1 ? '' : 'd-none'),

                }, [

                    m("td.tx-normal[colspan='6']",
                        m("div.input-group", [
                            m("div.input-group-append",
                                m("button.btn.btn-xs.btn-light[type='button']", {
                                        title: "Nuevo",
                                        onclick: () => {
                                            if (VentilatorioNoImvasivo.nuevoRegistro == null) {
                                                VentilatorioNoImvasivo.iniciarRegistro();
                                            } else {
                                                VentilatorioNoImvasivo.nuevoRegistro = null;
                                            }
                                        }
                                    },
                                    m("i.fas.fa-plus")
                                )
                            ),
                            (VentilatorioNoImvasivo.nuevoRegistro !== null ? [

                                m('select.tx-semibold', {
                                    id: 'sec_VentilatorioNoImvasivo',
                                    onchange: (e) => {
                                        let _id = e.target.options[e.target.selectedIndex].id;
                                        let _value = e.target.options[e.target.selectedIndex].value;
                                        if (VentilatorioNoImvasivo.nuevoRegistro == null) {
                                            VentilatorioNoImvasivo.nuevoRegistro.id = _id;
                                            VentilatorioNoImvasivo.nuevoRegistro.tipo = _value;
                                        } else {
                                            VentilatorioNoImvasivo.nuevoRegistro.id = _id;
                                            VentilatorioNoImvasivo.nuevoRegistro.tipo = _value;
                                        }
                                    },
                                    class: "custom-select",
                                    value: (VentilatorioNoImvasivo.nuevoRegistro !== null ? VentilatorioNoImvasivo.nuevoRegistro.tipo : 0),
                                }, m("option[value='0']", 'Seleccione...'), [{
                                        id: "Oxihood",
                                        label: "OXIHOOD"
                                    }, {
                                        id: "CateterNasal",
                                        label: "CATETER NASAL"
                                    },

                                ].map(x =>
                                    m('option[id="' + x.id + '"]', x.label)
                                ))
                            ] : [])
                        ])
                    ),
                    m("td.tx-normal[colspan='3']",
                        (VentilatorioNoImvasivo.nuevoRegistro !== null ? [
                            m("input[type='text'][placeholder='HH:mm']", {
                                id: 'horaValor',
                                class: 'form-control',
                                oncreate: (el) => {

                                    setTimeout(() => {
                                        new Cleave("#" + el.dom.id, {
                                            time: true,
                                            timePattern: ['h', 'm']
                                        });
                                    }, 90);

                                },
                                oninput: (e) => {
                                    setTimeout(() => {
                                        //GasesUci.nuevoRegistro.hora = moment(PacientesUCI.fechaHoraTurno, 'DD-MM-YYYY HH:mm').format('DD-MM-YYYY') + ' ' + e.target.value;
                                        VentilatorioNoImvasivo.setHora = (e.target.value.length !== 0 ? e.target.value : null);
                                        VentilatorioNoImvasivo.nuevoRegistro.hora = (e.target.value.length !== 0 ? e.target.value : null);

                                    }, 50);
                                },

                            }),
                        ] : [])
                    ),
                    m("td.tx-normal[colspan='3']",
                        (VentilatorioNoImvasivo.nuevoRegistro !== null ? [
                            m('select.tx-semibold', {
                                id: 'valorHigiene',
                                onchange: (e) => {
                                    let _id = e.target.options[e.target.selectedIndex].id;
                                    let _value = e.target.options[e.target.selectedIndex].value;
                                    VentilatorioNoImvasivo.nuevoRegistro.valor = _value;
                                },
                                onkeypress: (e) => {
                                    if (e.keyCode == 13) {
                                        VentilatorioNoImvasivo.nuevoRegistro.numeroTurno = PacientesUCI.numeroTurno;
                                        VentilatorioNoImvasivo.nuevoRegistro.fechaHoraTurno = PacientesUCI.fechaHoraTurno;
                                        if (VentilatorioNoImvasivo.nuevoRegistro.editar == null) {
                                            VentilatorioNoImvasivo.agregarRegistro();
                                            VentilatorioNoImvasivo.nuevoRegistro.id = VentilatorioNoImvasivo.nuevoRegistro.nro + 'Higiene';
                                            FecthUci.registrarSeccion(VentilatorioNoImvasivo.nuevoRegistro);
                                            VentilatorioNoImvasivo.nuevoRegistro = null;
                                            PacientesUCI.vReloadTable('table-ventilatorioNoImvasivo', VentilatorioNoImvasivo.getRegistros());
                                        } else {
                                            VentilatorioNoImvasivo.editarRegistro();
                                            FecthUci.actualizarSeccion(VentilatorioNoImvasivo.nuevoRegistro);
                                            VentilatorioNoImvasivo.nuevoRegistro = null;
                                            PacientesUCI.vReloadTable('table-ventilatorioNoImvasivo', VentilatorioNoImvasivo.getRegistros());
                                        }
                                    }
                                },
                                class: "custom-select",
                                value: (VentilatorioNoImvasivo.nuevoRegistro !== null ? VentilatorioNoImvasivo.nuevoRegistro.valor : 0),
                            }, m("option[value='0']", 'Seleccione...'), [{
                                    id: "X",
                                    label: "Sí (X)"
                                },
                                {
                                    id: "-",
                                    label: "No (-)"
                                },
                            ].map(x =>
                                m('option[id="' + x.id + '"]', x.label)
                            ))
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
                        (VentilatorioNoImvasivo.show != false ? [PacientesUCI.vTable('table-ventilatorioNoImvasivo', VentilatorioNoImvasivo.getRegistros(), VentilatorioNoImvasivo.arqTable())] : [])
                    ),
                ]),
                m('br')
            ]),
        ];
    }


}

export default VentilatorioNoImvasivo;