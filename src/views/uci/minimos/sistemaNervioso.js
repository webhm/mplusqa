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
    editar = null;
    tipoBit = 'UCIMINIMOS';
    seccion = 'SistemaNerviosoUci';
    constructor() {
        this.id = this.id;
        this.nro = this.nro;
        this.fechaHoraTurno = this.fechaHoraTurno;
        this.tipo = this.tipo;
        this.valor = this.valor;
        this.timestamp = this.timestamp;
        this.editar = this.editar;
        this.tipoBit = this.tipoBit;
        this.seccion = this.seccion;
    }
}

class SistemaNervioso {

    static registros = [];
    static nuevoRegistro = null;
    static show = false;
    static showOtros = false;

    static validarRegistro() {

    }

    static iniciarRegistro() {
        SistemaNervioso.nuevoRegistro = new Valoracion();
    }

    static agregarRegistro() {
        if (SistemaNervioso.registros.length == 0) {
            SistemaNervioso.nuevoRegistro.nro = 1;
            SistemaNervioso.registros.push(SistemaNervioso.nuevoRegistro);
        } else {
            SistemaNervioso.nuevoRegistro.nro = (SistemaNervioso.registros[SistemaNervioso.registros.length - 1].nro + 1);
            SistemaNervioso.registros.push(SistemaNervioso.nuevoRegistro);
        }
    }

    static verRegistro(registro) {
        registro.editar = true;
        SistemaNervioso.nuevoRegistro = registro;
    }

    static editarRegistro() {
        SistemaNervioso.nuevoRegistro.editar = null;
        SistemaNervioso.registros.map((_v, _i) => {
            if (_v.nro == SistemaNervioso.nuevoRegistro.nro) {
                SistemaNervioso.registros[_i] = SistemaNervioso.nuevoRegistro;
            }
        });

    }

    static eliminarRegistro(obj) {

        let res = [];
        SistemaNervioso.registros.map((_v, _i) => {
            if (_v.nro !== obj.nro) {
                res.push(_v);
            }
        });

        SistemaNervioso.registros = res;

    }

    static getRegistros() {
        return SistemaNervioso.registros;
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
                                                    SistemaNervioso.nuevoRegistro = null
                                                    SistemaNervioso.verRegistro(oData);
                                                },
                                            },
                                            'Editar',
                                        ),
                                        m("button.btn.btn-xs.btn-block.btn-outline-danger[type='button']", {
                                                class: (oData.editar ? '' : 'd-none'),
                                                disabled: (PacientesUCI.fechaHoraTurno != oData.fechaHoraTurno ? 'disabled' : ''),

                                                onclick: () => {
                                                    oData.editar = null;
                                                    SistemaNervioso.nuevoRegistro = null;
                                                },
                                            },
                                            'Cancelar Edición',
                                        ),
                                        m("button.btn.btn-xs.btn-danger[type='button']", {
                                                class: (oData.editar ? 'd-none' : ''),
                                                disabled: (TurnosUci.nuevoTurno !== null && TurnosUci.nuevoTurno.gestion == 1 ? (PacientesUCI.fechaHoraTurno != oData.fechaHoraTurno ? 'disabled' : '') : 'disabled'),
                                                onclick: () => {
                                                    if (confirm("¿Esta Ud seguro de eliminar este registro?") == true) {
                                                        SistemaNervioso.eliminarRegistro(oData);
                                                        FecthUci.eliminarSeccion(oData);
                                                        SistemaNervioso.nuevoRegistro = null;
                                                        PacientesUCI.vReloadTable('table-sistemanervioso', SistemaNervioso.getRegistros());
                                                    }
                                                },
                                            },
                                            'Eliminar',
                                        ),
                                        m("button.btn.btn-xs.btn-dark[type='button']", {
                                                class: (PacientesUCI.fechaHoraTurno != oData.fechaHoraTurno ? '' : 'd-none'),
                                                onclick: () => {
                                                    SistemaNervioso.iniciarRegistro();
                                                    SistemaNervioso.nuevoRegistro.id = oData.id;
                                                    SistemaNervioso.nuevoRegistro.tipo = oData.tipo;
                                                    SistemaNervioso.nuevoRegistro.valor = oData.valor;
                                                    SistemaNervioso.nuevoRegistro.numeroTurno = PacientesUCI.numeroTurno;
                                                    SistemaNervioso.nuevoRegistro.fechaHoraTurno = PacientesUCI.fechaHoraTurno;

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
        let table = document.getElementById('table-sistemanervioso');
        // clear first
        if (table != null) {
            $('#table-sistemanervioso').DataTable().clear().destroy();

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
                        if (SistemaNervioso.show) {
                            SistemaNervioso.destroyTable();
                        }
                        SistemaNervioso.show = !SistemaNervioso.show;
                    }
                }, [
                    m("th.tx-semibold[scope='col'][colspan='12']",
                        "SISTEMA NERVIOSO:"
                    ),

                ])
            ),
            m("tbody.bd.bd-2", {
                style: { "border-color": "#5173a1" },
                class: (SistemaNervioso.show ? '' : 'd-none')
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
                                            if (SistemaNervioso.nuevoRegistro == null) {
                                                SistemaNervioso.iniciarRegistro();
                                            } else {
                                                SistemaNervioso.nuevoRegistro = null;
                                            }
                                        }
                                    },
                                    m("i.fas.fa-plus")
                                )
                            ),
                            (SistemaNervioso.nuevoRegistro !== null ? [

                                m('select.tx-semibold', {
                                    id: 'sec_TipoSistemaNervioso',
                                    onchange: (e) => {
                                        let _id = e.target.options[e.target.selectedIndex].id;
                                        let _value = e.target.options[e.target.selectedIndex].value;
                                        if (SistemaNervioso.nuevoRegistro == null) {
                                            SistemaNervioso.nuevoRegistro.id = _id;
                                            SistemaNervioso.nuevoRegistro.tipo = _value;
                                        } else {
                                            SistemaNervioso.nuevoRegistro.id = _id;
                                            SistemaNervioso.nuevoRegistro.tipo = _value;
                                        }


                                    },
                                    class: "custom-select",
                                    value: (SistemaNervioso.nuevoRegistro !== null ? SistemaNervioso.nuevoRegistro.tipo : 0),
                                }, m("option[value='0']", 'Seleccione...'), [{
                                        id: "Activo",
                                        label: "Activo"
                                    },
                                    {
                                        id: "Hipotonico",
                                        label: "Hipotónico"
                                    },
                                    {
                                        id: "Hipertonico",
                                        label: "Hipertónico"
                                    },
                                    {
                                        id: "Temblores",
                                        label: "Temblores"
                                    }
                                ].map(x =>
                                    m('option[id="' + x.id + '"]', x.label)
                                ))
                            ] : [])
                        ])
                    ),
                    m("td.tx-normal[colspan='3']",
                        (SistemaNervioso.nuevoRegistro !== null ? [
                            m("input[type='text'][placeholder='HH:mm']", {
                                id: 'horaValorSistemaNervioso',
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
                                        SistemaNervioso.setHora = (e.target.value.length !== 0 ? e.target.value : null);
                                        SistemaNervioso.nuevoRegistro.hora = (e.target.value.length !== 0 ? e.target.value : null);

                                    }, 50);
                                },

                            }),
                        ] : [])
                    ),
                    m("td.tx-normal[colspan='3']",
                        (SistemaNervioso.nuevoRegistro !== null ? [
                            m('select.tx-semibold', {
                                id: 'valorSistemaNervioso',
                                onchange: (e) => {
                                    let _id = e.target.options[e.target.selectedIndex].id;
                                    let _value = e.target.options[e.target.selectedIndex].value;
                                    SistemaNervioso.nuevoRegistro.valor = _value;
                                },
                                onkeypress: (e) => {
                                    if (e.keyCode == 13) {
                                        SistemaNervioso.nuevoRegistro.numeroTurno = PacientesUCI.numeroTurno;
                                        SistemaNervioso.nuevoRegistro.fechaHoraTurno = PacientesUCI.fechaHoraTurno;
                                        SistemaNervioso.nuevoRegistro.timestamp = moment().format('DD-MM-YYYY') + ' ' + SistemaNervioso.nuevoRegistro.hora;
                                        if (SistemaNervioso.nuevoRegistro.editar == null) {
                                            SistemaNervioso.agregarRegistro();
                                            SistemaNervioso.nuevoRegistro.id = SistemaNervioso.nuevoRegistro.nro + 'SistemaNervioso';
                                            FecthUci.registrarSeccion(SistemaNervioso.nuevoRegistro);
                                            SistemaNervioso.nuevoRegistro = null;
                                            PacientesUCI.vReloadTable('table-sistemanervioso', SistemaNervioso.getRegistros());
                                        } else {
                                            SistemaNervioso.editarRegistro();
                                            FecthUci.actualizarSeccion(SistemaNervioso.nuevoRegistro);
                                            SistemaNervioso.nuevoRegistro = null;
                                            PacientesUCI.vReloadTable('table-sistemanervioso', SistemaNervioso.getRegistros());
                                        }
                                    }
                                },
                                class: "custom-select",
                                value: (SistemaNervioso.nuevoRegistro !== null ? SistemaNervioso.nuevoRegistro.valor : 0),
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
                        (SistemaNervioso.show != false ? [PacientesUCI.vTable('table-sistemanervioso', SistemaNervioso.getRegistros(), SistemaNervioso.arqTable())] : [])
                    ),
                ]),
                m('br')
            ]),
        ];
    }


}

export default SistemaNervioso;