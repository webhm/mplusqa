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
    seccion = 'HigieneUci';
    constructor() {
        this.id = this.id;
        this.nro = this.nro;
        this.fechaHoraTurno = this.fechaHoraTurno;
        this.tipo = this.tipo;
        this.valor = this.valor;
        this.editar = this.editar;
        this.seccion = this.seccion;
    }
}

class HigieneUci {

    static registros = [];
    static nuevoRegistro = null;
    static show = false;
    static showOtros = false;

    static validarRegistro() {

    }

    static iniciarRegistro() {
        HigieneUci.nuevoRegistro = new Valoracion();
    }

    static agregarRegistro() {
        if (HigieneUci.registros.length == 0) {
            HigieneUci.nuevoRegistro.nro = 1;
            HigieneUci.registros.push(HigieneUci.nuevoRegistro);
        } else {
            HigieneUci.nuevoRegistro.nro = (HigieneUci.registros[HigieneUci.registros.length - 1].nro + 1);
            HigieneUci.registros.push(HigieneUci.nuevoRegistro);
        }
    }

    static verRegistro(registro) {
        registro.editar = true;
        HigieneUci.nuevoRegistro = registro;
    }

    static editarRegistro() {
        HigieneUci.nuevoRegistro.editar = null;
        HigieneUci.registros.map((_v, _i) => {
            if (_v.nro == HigieneUci.nuevoRegistro.nro) {
                HigieneUci.registros[_i] = HigieneUci.nuevoRegistro;
            }
        });

    }

    static eliminarRegistro(obj) {

        let res = [];
        HigieneUci.registros.map((_v, _i) => {
            if (_v.nro !== obj.nro) {
                res.push(_v);
            }
        });

        HigieneUci.registros = res;

    }

    static getRegistros() {
        return HigieneUci.registros;
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
                        return (full.valor != null ? full.valor : '<div class="text-center pd-l-0 pd-r-0"><hr style="border-color:#001737;"/></div>');
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
                                                    HigieneUci.nuevoRegistro = null
                                                    HigieneUci.verRegistro(oData);
                                                },
                                            },
                                            'Editar',
                                        ),
                                        m("button.btn.btn-xs.btn-block.btn-outline-danger[type='button']", {
                                                class: (oData.editar ? '' : 'd-none'),
                                                disabled: (PacientesUCI.fechaHoraTurno != oData.fechaHoraTurno ? 'disabled' : ''),

                                                onclick: () => {
                                                    oData.editar = null;
                                                    HigieneUci.nuevoRegistro = null;
                                                },
                                            },
                                            'Cancelar Edición',
                                        ),
                                        m("button.btn.btn-xs.btn-danger[type='button']", {
                                                class: (oData.editar ? 'd-none' : ''),
                                                disabled: (TurnosUci.nuevoTurno !== null && TurnosUci.nuevoTurno.gestion == 1 ? (PacientesUCI.fechaHoraTurno != oData.fechaHoraTurno ? 'disabled' : '') : 'disabled'),
                                                onclick: () => {
                                                    if (confirm("¿Esta Ud seguro de eliminar este registro?") == true) {
                                                        HigieneUci.eliminarRegistro(oData);
                                                        FecthUci.eliminarSeccion(oData);
                                                        HigieneUci.nuevoRegistro = null;
                                                        PacientesUCI.vReloadTable('table-higiene', HigieneUci.getRegistros());
                                                    }
                                                },
                                            },
                                            'Eliminar',
                                        ),
                                        m("button.btn.btn-xs.btn-dark[type='button']", {
                                                class: (PacientesUCI.fechaHoraTurno != oData.fechaHoraTurno ? '' : 'd-none'),
                                                onclick: () => {
                                                    HigieneUci.iniciarRegistro();
                                                    HigieneUci.nuevoRegistro.id = oData.id;
                                                    HigieneUci.nuevoRegistro.tipo = oData.tipo;
                                                    HigieneUci.nuevoRegistro.valor = oData.valor;
                                                    HigieneUci.nuevoRegistro.numeroTurno = PacientesUCI.numeroTurno;
                                                    HigieneUci.nuevoRegistro.fechaHoraTurno = PacientesUCI.fechaHoraTurno;

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
                    aTargets: [6],
                    orderable: true,

                }


            ],
            fnRowCallback: function(nRow, aData, iDisplayIndex, iDisplayIndexFull) {

            },
        };
    }

    static destroyTable() {
        let table = document.getElementById('table-higiene');
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
                        if (HigieneUci.show) {
                            HigieneUci.destroyTable();
                        }
                        HigieneUci.show = !HigieneUci.show;
                    }
                }, [
                    m("th.tx-semibold[scope='col'][colspan='12']",
                        "HIGIENE:"
                    ),

                ])
            ),
            m("tbody.bd.bd-2", {
                style: { "border-color": "#5173a1" },
                class: (HigieneUci.show ? '' : 'd-none')
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
                                            if (HigieneUci.nuevoRegistro == null) {
                                                HigieneUci.iniciarRegistro();
                                            } else {
                                                HigieneUci.nuevoRegistro = null;
                                            }
                                        }
                                    },
                                    m("i.fas.fa-plus")
                                )
                            ),
                            (HigieneUci.nuevoRegistro !== null ? [

                                m('select.tx-semibold', {
                                    id: 'sec_TipoHigiene',
                                    onchange: (e) => {
                                        let _id = e.target.options[e.target.selectedIndex].id;
                                        let _value = e.target.options[e.target.selectedIndex].value;
                                        if (HigieneUci.nuevoRegistro == null) {
                                            HigieneUci.nuevoRegistro.id = _id;
                                            HigieneUci.nuevoRegistro.tipo = _value;
                                        } else {
                                            HigieneUci.nuevoRegistro.id = _id;
                                            HigieneUci.nuevoRegistro.tipo = _value;
                                        }
                                    },
                                    class: "custom-select",
                                    value: (HigieneUci.nuevoRegistro !== null ? HigieneUci.nuevoRegistro.tipo : 0),
                                }, m("option[value='0']", 'Seleccione...'), [{
                                        id: "General",
                                        label: "General"
                                    },
                                    {
                                        id: "Parcial",
                                        label: "Parcial"
                                    },
                                    {
                                        id: "Ombligo",
                                        label: "Ombligo"
                                    }
                                ].map(x =>
                                    m('option[id="' + x.id + '"]', x.label)
                                ))
                            ] : [])
                        ])
                    ),
                    m("td.tx-normal[colspan='6']",
                        (HigieneUci.nuevoRegistro !== null ? [
                            m('select.tx-semibold', {
                                id: 'valorHigiene',
                                onchange: (e) => {
                                    let _id = e.target.options[e.target.selectedIndex].id;
                                    let _value = e.target.options[e.target.selectedIndex].value;
                                    HigieneUci.nuevoRegistro.valor = _value;
                                },
                                onkeypress: (e) => {
                                    if (e.keyCode == 13) {
                                        HigieneUci.nuevoRegistro.numeroTurno = PacientesUCI.numeroTurno;
                                        HigieneUci.nuevoRegistro.fechaHoraTurno = PacientesUCI.fechaHoraTurno;
                                        if (HigieneUci.nuevoRegistro.editar == null) {
                                            HigieneUci.agregarRegistro();
                                            HigieneUci.nuevoRegistro.id = HigieneUci.nuevoRegistro.nro + 'Higiene';
                                            FecthUci.registrarSeccion(HigieneUci.nuevoRegistro);
                                            HigieneUci.nuevoRegistro = null;
                                            PacientesUCI.vReloadTable('table-higiene', HigieneUci.getRegistros());
                                        } else {
                                            HigieneUci.editarRegistro();
                                            FecthUci.actualizarSeccion(HigieneUci.nuevoRegistro);
                                            HigieneUci.nuevoRegistro = null;
                                            PacientesUCI.vReloadTable('table-higiene', HigieneUci.getRegistros());
                                        }
                                    }
                                },
                                class: "custom-select",
                                value: (HigieneUci.nuevoRegistro !== null ? HigieneUci.nuevoRegistro.valor : 0),
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
                        (HigieneUci.show != false ? [PacientesUCI.vTable('table-higiene', HigieneUci.getRegistros(), HigieneUci.arqTable())] : [])
                    ),
                ]),
                m('br')
            ]),
        ];
    }


}

export default HigieneUci;