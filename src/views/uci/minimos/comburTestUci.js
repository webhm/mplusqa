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
    seccion = 'ComburTest';
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

class ComburTestNeo {

    static registros = [];
    static nuevoRegistro = null;
    static show = false;
    static showOtros = false;

    static validarRegistro() {

    }

    static iniciarRegistro() {
        ComburTestNeo.nuevoRegistro = new Valoracion();
    }

    static agregarRegistro() {
        if (ComburTestNeo.registros.length == 0) {
            ComburTestNeo.nuevoRegistro.nro = 1;
            ComburTestNeo.registros.push(ComburTestNeo.nuevoRegistro);
        } else {
            ComburTestNeo.nuevoRegistro.nro = (ComburTestNeo.registros[ComburTestNeo.registros.length - 1].nro + 1);
            ComburTestNeo.registros.push(ComburTestNeo.nuevoRegistro);
        }
    }

    static verRegistro(registro) {
        registro.editar = true;
        ComburTestNeo.nuevoRegistro = registro;
    }

    static editarRegistro() {
        ComburTestNeo.nuevoRegistro.editar = null;
        ComburTestNeo.registros.map((_v, _i) => {
            if (_v.nro == ComburTestNeo.nuevoRegistro.nro) {
                ComburTestNeo.registros[_i] = ComburTestNeo.nuevoRegistro;
            }
        });

    }

    static eliminarRegistro(obj) {

        let res = [];
        ComburTestNeo.registros.map((_v, _i) => {
            if (_v.nro !== obj.nro) {
                res.push(_v);
            }
        });

        ComburTestNeo.registros = res;

    }

    static getRegistros() {
        return ComburTestNeo.registros;
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
                title: "Cantidad:",
            },
            {
                title: "Opciones:",
            }
            ],
            aoColumnDefs: [{
                mRender: function (data, type, full) {
                    return full.fechaHoraTurno;
                },
                visible: false,
                aTargets: [0],
                orderable: true,
            },
            {
                mRender: function (data, type, full) {
                    return full.nro;
                },
                visible: false,
                aTargets: [1],
                orderable: true,

            },
            {
                fnCreatedCell: function (nTd, sData, oData, iRow, iCol) {
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
                mRender: function (data, type, full) {
                    return full.nro;
                },

                visible: false,
                aTargets: [3],
                orderable: false,

            },

            {
                mRender: function (data, type, full) {
                    return full.tipo != null ? full.tipo : '<div class="text-center pd-l-0 pd-r-0"><hr style="border-color:#001737;"/></div>';
                },

                visible: true,
                aTargets: [4],
                orderable: true,

            },
            {
                mRender: function (data, type, full) {
                    return full.hora != null ? full.hora : '<div class="text-center pd-l-0 pd-r-0"><hr style="border-color:#001737;"/></div>';
                },

                visible: true,
                aTargets: [5],
                orderable: true,

            },
            {
                mRender: function (data, type, full) {
                    return (full.valor != null ? full.valor : '<div class="text-center pd-l-0 pd-r-0"><hr style="border-color:#001737;"/></div>');
                },
                visible: true,
                aTargets: [6],
                orderable: true,

            },
            {
                mRender: function (data, type, full) {
                    return (full.cantidad != null ? full.cantidad : '<div class="text-center pd-l-0 pd-r-0"><hr style="border-color:#001737;"/></div>');
                },
                visible: false,
                aTargets: [7],
                orderable: true,

            },

            {
                fnCreatedCell: function (nTd, sData, oData, iRow, iCol) {
                    return m.mount(nTd, {
                        view: () => {
                            return [
                                m("div.btn-block.btn-group.wd-100p.pd-5", [
                                    m("button.btn.btn-xs.btn-success[type='button']", {
                                        class: (oData.editar ? 'd-none' : ''),
                                        disabled: (TurnosUci.nuevoTurno !== null && TurnosUci.nuevoTurno.gestion == 1 ? (PacientesUCI.fechaHoraTurno != oData.fechaHoraTurno ? 'disabled' : '') : 'disabled'),
                                        onclick: () => {
                                            ComburTestNeo.nuevoRegistro = null
                                            ComburTestNeo.verRegistro(oData);
                                        },
                                    },
                                        'Editar',
                                    ),
                                    m("button.btn.btn-xs.btn-block.btn-outline-danger[type='button']", {
                                        class: (oData.editar ? '' : 'd-none'),
                                        disabled: (PacientesUCI.fechaHoraTurno != oData.fechaHoraTurno ? 'disabled' : ''),

                                        onclick: () => {
                                            oData.editar = null;
                                            ComburTestNeo.nuevoRegistro = null;
                                        },
                                    },
                                        'Cancelar Edición',
                                    ),
                                    m("button.btn.btn-xs.btn-danger[type='button']", {
                                        class: (oData.editar ? 'd-none' : ''),
                                        disabled: (TurnosUci.nuevoTurno !== null && TurnosUci.nuevoTurno.gestion == 1 ? (PacientesUCI.fechaHoraTurno != oData.fechaHoraTurno ? 'disabled' : '') : 'disabled'),
                                        onclick: () => {
                                            if (confirm("¿Esta Ud seguro de eliminar este registro?") == true) {
                                                ComburTestNeo.eliminarRegistro(oData);
                                                FecthUci.eliminarSeccion(oData);
                                                ComburTestNeo.nuevoRegistro = null;
                                                PacientesUCI.vReloadTable('table-ComburTestNeo', ComburTestNeo.getRegistros());
                                            }
                                        },
                                    },
                                        'Eliminar',
                                    ),
                                    m("button.btn.btn-xs.btn-dark[type='button']", {
                                        class: (PacientesUCI.fechaHoraTurno != oData.fechaHoraTurno ? '' : 'd-none'),
                                        onclick: () => {
                                            ComburTestNeo.iniciarRegistro();
                                            ComburTestNeo.nuevoRegistro.id = oData.id;
                                            ComburTestNeo.nuevoRegistro.tipo = oData.tipo;
                                            ComburTestNeo.nuevoRegistro.valor = oData.valor;
                                            ComburTestNeo.nuevoRegistro.hora = oData.hora;
                                            ComburTestNeo.nuevoRegistro.numeroTurno = PacientesUCI.numeroTurno;
                                            ComburTestNeo.nuevoRegistro.fechaHoraTurno = PacientesUCI.fechaHoraTurno;

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
                aTargets: [8],
                orderable: true,

            }
            ],
            fnRowCallback: function (nRow, aData, iDisplayIndex, iDisplayIndexFull) {

            },
        };
    }


    static validarRegistroUnicoPorTurno(tipo) {
        ComburTestNeo.registros.map((_v, _i) => {
            if (_v.tipo == tipo && _v.hora == ComburTestNeo.nuevoRegistro.hora && _v.numeroTurno == PacientesUCI.numeroTurno) {
                throw 'error';
            }
        });
    }

    static destroyTable() {
        let table = document.getElementById('table-ComburTestNeo');
        // clear first
        if (table != null) {
            $('#table-ComburTestNeo').DataTable().clear().destroy();

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
                        if (ComburTestNeo.show) {
                            ComburTestNeo.destroyTable();
                        }
                        ComburTestNeo.show = !ComburTestNeo.show;
                    }
                }, [
                    m("th.tx-semibold[scope='col'][colspan='12']",
                        "TEST DE ORINA:"
                    ),

                ])
            ),
            m("tbody.bd.bd-2", {
                style: { "border-color": "#5173a1" },
                class: (ComburTestNeo.show ? '' : 'd-none')
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
                    ),
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
                                        if (ComburTestNeo.nuevoRegistro == null) {
                                            ComburTestNeo.iniciarRegistro();
                                        } else {
                                            ComburTestNeo.nuevoRegistro = null;
                                        }
                                    }
                                },
                                    m("i.fas.fa-plus")
                                )
                            ),
                            (ComburTestNeo.nuevoRegistro !== null ? [

                                m('select.tx-semibold', {
                                    id: 'sec_ComburTestNeo',
                                    onchange: (e) => {
                                        let _id = e.target.options[e.target.selectedIndex].id;
                                        let _value = e.target.options[e.target.selectedIndex].value;
                                        if (ComburTestNeo.nuevoRegistro == null) {
                                            ComburTestNeo.nuevoRegistro.id = _id;
                                            ComburTestNeo.nuevoRegistro.tipo = _value;
                                        } else {
                                            ComburTestNeo.nuevoRegistro.id = _id;
                                            ComburTestNeo.nuevoRegistro.tipo = _value;
                                        }
                                    },
                                    class: "custom-select",
                                    value: (ComburTestNeo.nuevoRegistro !== null ? ComburTestNeo.nuevoRegistro.tipo : 0),
                                }, [{
                                    id: "Ph",
                                    label: "PH"
                                }, {
                                    id: "Proteinas",
                                    label: "PROTEINAS"
                                },
                                {
                                    id: "Densidad",
                                    label: "DENSIDAD"
                                },
                                {
                                    id: "Glucosa",
                                    label: "GLUCOSA"
                                },
                                {
                                    id: "Sangre",
                                    label: "SANGRE"
                                },
                                {
                                    id: "Cetonas",
                                    label: "CETONAS"
                                },
                                {
                                    id: "Leucocitos",
                                    label: "LEUCOCITOS"
                                },
                                {
                                    id: "Nitritos",
                                    label: "NITRITOS"
                                },
                                {
                                    id: "Urobilinogeno",
                                    label: "UROBILINOGENO"
                                },
                                {
                                    id: "Bilirrubinas",
                                    label: "BILIRRUBINAS"
                                },
                                {
                                    id: "Hemoglobina",
                                    label: "HEMOGLOBINA"
                                },
                                ].map(x =>
                                    m('option[id="' + x.id + '"]', x.label)
                                ))
                            ] : [])
                        ])
                    ),
                    m("td.tx-normal[colspan='4']",
                        (ComburTestNeo.nuevoRegistro !== null ? [
                            m("input[type='text'][placeholder='HH:mm']", {
                                id: 'horaValorComburTestNeo',
                                class: 'form-control',
                                oncreate: (el) => {

                                    if (ComburTestNeo.nuevoRegistro.hora !== null) {
                                        el.dom.value = ComburTestNeo.nuevoRegistro.hora;
                                    }

                                    

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
                                            //GasesUci.nuevoRegistro.hora = moment(PacientesUCI.fechaHoraTurno, 'DD-MM-YYYY HH:mm').format('DD-MM-YYYY') + ' ' + e.target.value;
                                            ComburTestNeo.setHora = (e.target.value.length !== 0 ? e.target.value : null);
                                            ComburTestNeo.nuevoRegistro.hora = (e.target.value.length !== 0 ? e.target.value : null);
                                            if (ComburTestNeo.nuevoRegistro.editar != true) {
                                                ComburTestNeo.validarRegistroUnicoPorTurno(ComburTestNeo.nuevoRegistro.tipo);
                                            }

                                        } catch (error) {
                                            ComburTestNeo.nuevoRegistro = null;
                                            $.alert('No es posible ingresar este valor. Ya existe este registro.');
                                        }
                                    }, 50);
                                },

                            }),
                        ] : [])
                    ),
                    m("td.tx-normal[colspan='4']",
                        (ComburTestNeo.nuevoRegistro !== null ? [
                            m("input[type='text'][placeholder='Cantidad']", {
                                id: 'cantidadValorComburTestNeo',
                                class: 'form-control',
                                oncreate: (el) => {
                                    if (ComburTestNeo.nuevoRegistro.valor !== null) {
                                        el.dom.value = ComburTestNeo.nuevoRegistro.valor;
                                    } 
                                },
                                oninput: (e) => {
                                    setTimeout(() => {
                                        ComburTestNeo.nuevoRegistro.valor = (e.target.value.length !== 0 ? e.target.value : null);

                                    }, 50);
                                },
                                onkeypress: (e) => {
                                    if (e.keyCode == 13) {
                                        ComburTestNeo.nuevoRegistro.numeroTurno = PacientesUCI.numeroTurno;
                                        ComburTestNeo.nuevoRegistro.fechaHoraTurno = PacientesUCI.fechaHoraTurno;
                                        ComburTestNeo.nuevoRegistro.timestamp = moment(PacientesUCI.fechaHoraTurno, 'DD-MM-YYYY HH:mm').format('DD-MM-YYYY') + ' ' + ComburTestNeo.nuevoRegistro.hora;

                                        if (ComburTestNeo.nuevoRegistro.tipo == null || ComburTestNeo.nuevoRegistro.tipo.length == 0) {
                                            $.alert('El campo Tipo o Valor no puede ser vacio.');
                                        } else if (moment(ComburTestNeo.nuevoRegistro.timestamp, "DD-MM-YYYY HH:mm", true).isValid() == false) {
                                            $.alert(ComburTestNeo.nuevoRegistro.timestamp + ' El valor de Hora no tiene el formato HH:mm necesario.');
                                        } else if (ComburTestNeo.nuevoRegistro.valor == null || ComburTestNeo.nuevoRegistro.valor.length == 0) {
                                            $.alert('El campo Tipo o Valor no puede ser vacio.');
                                        } else {
                                            if (ComburTestNeo.nuevoRegistro.editar == null) {
                                                ComburTestNeo.agregarRegistro();
                                                FecthUci.registrarSeccion(ComburTestNeo.nuevoRegistro);
                                                ComburTestNeo.nuevoRegistro = null;
                                                PacientesUCI.vReloadTable('table-ComburTestNeo', ComburTestNeo.getRegistros());
                                            } else {
                                                ComburTestNeo.editarRegistro();
                                                FecthUci.actualizarSeccion(ComburTestNeo.nuevoRegistro);
                                                ComburTestNeo.nuevoRegistro = null;
                                                PacientesUCI.vReloadTable('table-ComburTestNeo', ComburTestNeo.getRegistros());
                                            }
                                        }
                                    }
                                },
                            }),
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
                        (ComburTestNeo.show != false ? [PacientesUCI.vTable('table-ComburTestNeo', ComburTestNeo.getRegistros(), ComburTestNeo.arqTable())] : [])
                    ),
                ]),
                m('br')
            ]),
        ];
    }


}

export default ComburTestNeo;