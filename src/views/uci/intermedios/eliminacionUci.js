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
    timestamp = null;
    hora = null;
    editar = null;
    tipoBit = 'UCIINTER';
    seccion = 'EliminacionUci';
    constructor() {
        this.id = this.id;
        this.nro = this.nro;
        this.fechaHoraTurno = this.fechaHoraTurno;
        this.tipo = this.tipo;
        this.valor = this.valor;
        this.timestamp = this.timestamp;
        this.hora = this.hora;
        this.editar = this.editar;
        this.tipoBit = this.tipoBit;
        this.seccion = this.seccion;
    }
}

class EliminacionUciNeo {

    static registros = [];
    static nuevoRegistro = null;
    static show = false;
    static showOtros = false;

    static validarRegistro() {

    }

    static iniciarRegistro() {
        EliminacionUciNeo.nuevoRegistro = new Valoracion();
    }

    static agregarRegistro() {
        if (EliminacionUciNeo.registros.length == 0) {
            EliminacionUciNeo.nuevoRegistro.nro = 1;
            EliminacionUciNeo.registros.push(EliminacionUciNeo.nuevoRegistro);
        } else {
            EliminacionUciNeo.nuevoRegistro.nro = (EliminacionUciNeo.registros[EliminacionUciNeo.registros.length - 1].nro + 1);
            EliminacionUciNeo.registros.push(EliminacionUciNeo.nuevoRegistro);
        }
    }

    static verRegistro(registro) {
        registro.editar = true;
        EliminacionUciNeo.nuevoRegistro = registro;
    }

    static editarRegistro() {
        EliminacionUciNeo.nuevoRegistro.editar = null;
        EliminacionUciNeo.registros.map((_v, _i) => {
            if (_v.nro == EliminacionUciNeo.nuevoRegistro.nro) {
                EliminacionUciNeo.registros[_i] = EliminacionUciNeo.nuevoRegistro;
            }
        });

    }

    static eliminarRegistro(obj) {

        let res = [];
        EliminacionUciNeo.registros.map((_v, _i) => {
            if (_v.nro !== obj.nro) {
                res.push(_v);
            }
        });

        EliminacionUciNeo.registros = res;

    }

    static getRegistros() {
        return EliminacionUciNeo.registros;
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
                        return (full.hora != null ? full.hora : '<div class="text-center pd-l-0 pd-r-0"><hr style="border-color:#001737;"/></div>');
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
                                                    EliminacionUciNeo.nuevoRegistro = null
                                                    EliminacionUciNeo.verRegistro(oData);
                                                },
                                            },
                                            'Editar',
                                        ),
                                        m("button.btn.btn-xs.btn-block.btn-outline-danger[type='button']", {
                                                class: (oData.editar ? '' : 'd-none'),
                                                disabled: (PacientesUCI.fechaHoraTurno != oData.fechaHoraTurno ? 'disabled' : ''),

                                                onclick: () => {
                                                    oData.editar = null;
                                                    EliminacionUciNeo.nuevoRegistro = null;
                                                },
                                            },
                                            'Cancelar Edición',
                                        ),
                                        m("button.btn.btn-xs.btn-danger[type='button']", {
                                                class: (oData.editar ? 'd-none' : ''),
                                                disabled: (TurnosUci.nuevoTurno !== null && TurnosUci.nuevoTurno.gestion == 1 ? (PacientesUCI.fechaHoraTurno != oData.fechaHoraTurno ? 'disabled' : '') : 'disabled'),
                                                onclick: () => {
                                                    if (confirm("¿Esta Ud seguro de eliminar este registro?") == true) {
                                                        EliminacionUciNeo.eliminarRegistro(oData);
                                                        FecthUci.eliminarSeccion(oData);
                                                        EliminacionUciNeo.nuevoRegistro = null;
                                                        PacientesUCI.vReloadTable('table-eliminacion', EliminacionUciNeo.getRegistros());
                                                    }
                                                },
                                            },
                                            'Eliminar',
                                        ),
                                        m("button.btn.btn-xs.btn-dark[type='button']", {
                                                class: (PacientesUCI.fechaHoraTurno != oData.fechaHoraTurno ? '' : 'd-none'),
                                                onclick: () => {
                                                    EliminacionUciNeo.iniciarRegistro();
                                                    EliminacionUciNeo.nuevoRegistro.id = oData.id;
                                                    EliminacionUciNeo.nuevoRegistro.tipo = oData.tipo;
                                                    EliminacionUciNeo.nuevoRegistro.valor = oData.valor;
                                                    EliminacionUciNeo.nuevoRegistro.numeroTurno = PacientesUCI.numeroTurno;
                                                    EliminacionUciNeo.nuevoRegistro.fechaHoraTurno = PacientesUCI.fechaHoraTurno;

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
        let table = document.getElementById('table-eliminacion');
        // clear first
        if (table != null) {
            $('#table-eliminacion').DataTable().clear().destroy();

        }
    }

    static validarRegistroUnicoPorTurno(tipo) {
        EliminacionUciNeo.registros.map((_v, _i) => {
            if (_v.tipo == tipo && _v.hora == EliminacionUciNeo.nuevoRegistro.hora && _v.numeroTurno == PacientesUCI.numeroTurno) {
                throw 'error';
            }
        });
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
                        if (EliminacionUciNeo.show) {
                            EliminacionUciNeo.destroyTable();
                        }
                        EliminacionUciNeo.show = !EliminacionUciNeo.show;
                    }
                }, [
                    m("th.tx-semibold[scope='col'][colspan='12']",
                        "ELIMINACIÓN:"
                    ),

                ])
            ),
            m("tbody.bd.bd-2", {
                style: { "border-color": "#5173a1" },
                class: (EliminacionUciNeo.show ? '' : 'd-none')
            }, [

                m("tr.bd.bd-2.tx-uppercase", {
                    style: { "background-color": "rgb(238, 249, 200)", "border-color": "#5173a1" },
                    class: (TurnosUci.nuevoTurno !== null && TurnosUci.nuevoTurno.gestion == 1 ? '' : 'd-none'),
                }, [
                    m("th[scope='col'][colspan='4']",
                        "TIPO: "
                    ),
                    m("th[scope='col'][colspan='4']",
                        "HORA: "
                    ),
                    m("th[scope='col'][colspan='4']",
                        "VALOR: "
                    )
                ]),
                m("tr.bd.bd-2", {
                    style: { "border-color": "#5173a1" },
                    class: (TurnosUci.nuevoTurno !== null && TurnosUci.nuevoTurno.gestion == 1 ? '' : 'd-none'),

                }, [

                    m("td.tx-normal[colspan='4']",
                        m("div.input-group", [
                            m("div.input-group-append",
                                m("button.btn.btn-xs.btn-light[type='button']", {
                                        title: "Nuevo",
                                        onclick: () => {
                                            if (EliminacionUciNeo.nuevoRegistro == null) {
                                                EliminacionUciNeo.iniciarRegistro();
                                            } else {
                                                EliminacionUciNeo.nuevoRegistro = null;
                                            }
                                        }
                                    },
                                    m("i.fas.fa-plus")
                                )
                            ),
                            (EliminacionUciNeo.nuevoRegistro !== null ? [

                                m('select.tx-semibold', {
                                    id: 'sec_TipoEliminacion',
                                    onchange: (e) => {
                                        let _id = e.target.options[e.target.selectedIndex].id;
                                        let _value = e.target.options[e.target.selectedIndex].value;
                                        if (EliminacionUciNeo.nuevoRegistro == null) {
                                            EliminacionUciNeo.nuevoRegistro.id = _id;
                                            EliminacionUciNeo.nuevoRegistro.tipo = _value;
                                        } else {
                                            EliminacionUciNeo.nuevoRegistro.id = _id;
                                            EliminacionUciNeo.nuevoRegistro.tipo = _value;
                                        }


                                    },
                                    class: "custom-select",
                                    value: (EliminacionUciNeo.nuevoRegistro !== null ? EliminacionUciNeo.nuevoRegistro.tipo : 0),
                                }, [{
                                        id: "Deposicion",
                                        label: "Deposición"
                                    },
                                    {
                                        id: "Vomito",
                                        label: "Vómito"
                                    },
                                    {
                                        id: "Reflujo",
                                        label: "Reflujo"
                                    }
                                ].map(x =>
                                    m('option[id="' + x.id + '"]', x.label)
                                ))
                            ] : [])
                        ])
                    ),
                    m("td.tx-normal[colspan='4']",
                        (EliminacionUciNeo.nuevoRegistro !== null ? [
                            m("input[type='text'][placeholder='HH:mm']", {
                                id: 'horaValorEliminacionUciNeo',
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
                                        try {
                                            EliminacionUciNeo.setHora = (e.target.value.length !== 0 ? e.target.value : null);
                                            EliminacionUciNeo.nuevoRegistro.hora = (e.target.value.length !== 0 ? e.target.value : null);
                                            EliminacionUciNeo.validarRegistroUnicoPorTurno(EliminacionUciNeo.nuevoRegistro.tipo);
                                        } catch (error) {
                                            EliminacionUciNeo.nuevoRegistro = null;
                                            $.alert('No es posible ingresar este valor. Ya existe este registro.');
                                        }
                                    }, 50);
                                },

                            }),
                        ] : [])
                    ),
                    m("td.tx-normal[colspan='4']",
                        (EliminacionUciNeo.nuevoRegistro !== null ? [
                            m('select.tx-semibold', {
                                id: 'valorEliminacion',
                                onchange: (e) => {
                                    let _id = e.target.options[e.target.selectedIndex].id;
                                    let _value = e.target.options[e.target.selectedIndex].value;
                                    EliminacionUciNeo.nuevoRegistro.valor = _value;
                                },
                                onkeypress: (e) => {
                                    if (e.keyCode == 13) {
                                        EliminacionUciNeo.nuevoRegistro.numeroTurno = PacientesUCI.numeroTurno;
                                        EliminacionUciNeo.nuevoRegistro.fechaHoraTurno = PacientesUCI.fechaHoraTurno;
                                        EliminacionUciNeo.nuevoRegistro.timestamp = moment().format('DD-MM-YYYY') + ' ' + EliminacionUciNeo.nuevoRegistro.hora;

                                        if (EliminacionUciNeo.nuevoRegistro.editar == null) {
                                            EliminacionUciNeo.agregarRegistro();
                                            EliminacionUciNeo.nuevoRegistro.id = EliminacionUciNeo.nuevoRegistro.nro + 'Eliminacion';
                                            FecthUci.registrarSeccion(EliminacionUciNeo.nuevoRegistro);
                                            EliminacionUciNeo.nuevoRegistro = null;
                                            PacientesUCI.vReloadTable('table-eliminacion', EliminacionUciNeo.getRegistros());
                                        } else {
                                            EliminacionUciNeo.editarRegistro();
                                            FecthUci.actualizarSeccion(EliminacionUciNeo.nuevoRegistro);
                                            EliminacionUciNeo.nuevoRegistro = null;
                                            PacientesUCI.vReloadTable('table-eliminacion', EliminacionUciNeo.getRegistros());
                                        }
                                    }
                                },
                                class: "custom-select",
                                value: (EliminacionUciNeo.nuevoRegistro !== null ? EliminacionUciNeo.nuevoRegistro.valor : 0),
                            }, [{
                                    id: "X",
                                    label: "Sí (X)"
                                },
                                {
                                    id: "-",
                                    label: "No (-)"
                                },
                                {
                                    id: "+",
                                    label: "Poco (+)"
                                },
                                {
                                    id: "++",
                                    label: "Mucho (++)"
                                },
                                {
                                    id: "+++",
                                    label: "Poco (+++)"
                                },
                                {
                                    id: "++++",
                                    label: "Mucho (++++)"
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
                        (EliminacionUciNeo.show != false ? [PacientesUCI.vTable('table-eliminacion', EliminacionUciNeo.getRegistros(), EliminacionUciNeo.arqTable())] : [])
                    ),
                ]),
                m('br')
            ]),
        ];
    }


}

export default EliminacionUciNeo;