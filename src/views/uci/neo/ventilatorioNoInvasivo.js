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
    tipoBit = 'UCINEO';
    seccion = 'Oxigenacion';
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

class VentilatorioNoInvasivo {

    static registros = [];
    static nuevoRegistro = null;
    static show = false;
    static showOtros = false;

    static validarRegistro() {

    }

    static iniciarRegistro() {
        VentilatorioNoInvasivo.nuevoRegistro = new Valoracion();
    }

    static agregarRegistro() {
        if (VentilatorioNoInvasivo.registros.length == 0) {
            VentilatorioNoInvasivo.nuevoRegistro.nro = 1;
            VentilatorioNoInvasivo.registros.push(VentilatorioNoInvasivo.nuevoRegistro);
        } else {
            VentilatorioNoInvasivo.nuevoRegistro.nro = (VentilatorioNoInvasivo.registros[VentilatorioNoInvasivo.registros.length - 1].nro + 1);
            VentilatorioNoInvasivo.registros.push(VentilatorioNoInvasivo.nuevoRegistro);
        }
    }

    static verRegistro(registro) {
        registro.editar = true;
        VentilatorioNoInvasivo.nuevoRegistro = registro;
    }

    static editarRegistro() {
        VentilatorioNoInvasivo.nuevoRegistro.editar = null;
        VentilatorioNoInvasivo.registros.map((_v, _i) => {
            if (_v.nro == VentilatorioNoInvasivo.nuevoRegistro.nro) {
                VentilatorioNoInvasivo.registros[_i] = VentilatorioNoInvasivo.nuevoRegistro;
            }
        });

    }

    static eliminarRegistro(obj) {

        let res = [];
        VentilatorioNoInvasivo.registros.map((_v, _i) => {
            if (_v.nro !== obj.nro) {
                res.push(_v);
            }
        });

        VentilatorioNoInvasivo.registros = res;

    }

    static getRegistros() {
        return VentilatorioNoInvasivo.registros;
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
                                            VentilatorioNoInvasivo.nuevoRegistro = null
                                            VentilatorioNoInvasivo.verRegistro(oData);
                                        },
                                    },
                                        'Editar',
                                    ),
                                    m("button.btn.btn-xs.btn-block.btn-outline-danger[type='button']", {
                                        class: (oData.editar ? '' : 'd-none'),
                                        disabled: (PacientesUCI.fechaHoraTurno != oData.fechaHoraTurno ? 'disabled' : ''),

                                        onclick: () => {
                                            oData.editar = null;
                                            VentilatorioNoInvasivo.nuevoRegistro = null;
                                        },
                                    },
                                        'Cancelar Edición',
                                    ),
                                    m("button.btn.btn-xs.btn-danger[type='button']", {
                                        class: (oData.editar ? 'd-none' : ''),
                                        disabled: (TurnosUci.nuevoTurno !== null && TurnosUci.nuevoTurno.gestion == 1 ? (PacientesUCI.fechaHoraTurno != oData.fechaHoraTurno ? 'disabled' : '') : 'disabled'),
                                        onclick: () => {
                                            if (confirm("¿Esta Ud seguro de eliminar este registro?") == true) {
                                                VentilatorioNoInvasivo.eliminarRegistro(oData);
                                                FecthUci.eliminarSeccion(oData);
                                                VentilatorioNoInvasivo.nuevoRegistro = null;
                                                PacientesUCI.vReloadTable('table-VentilatorioNoInvasivo', VentilatorioNoInvasivo.getRegistros());
                                            }
                                        },
                                    },
                                        'Eliminar',
                                    ),
                                    m("button.btn.btn-xs.btn-dark[type='button']", {
                                        class: (PacientesUCI.fechaHoraTurno != oData.fechaHoraTurno ? '' : 'd-none'),
                                        onclick: () => {
                                            VentilatorioNoInvasivo.iniciarRegistro();
                                            VentilatorioNoInvasivo.nuevoRegistro.id = oData.id;
                                            VentilatorioNoInvasivo.nuevoRegistro.tipo = oData.tipo;
                                            VentilatorioNoInvasivo.nuevoRegistro.valor = oData.valor;
                                            VentilatorioNoInvasivo.nuevoRegistro.hora = oData.hora;
                                            VentilatorioNoInvasivo.nuevoRegistro.numeroTurno = PacientesUCI.numeroTurno;
                                            VentilatorioNoInvasivo.nuevoRegistro.fechaHoraTurno = PacientesUCI.fechaHoraTurno;

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

    static destroyTable() {
        let table = document.getElementById('table-VentilatorioNoInvasivo');
        // clear first
        if (table != null) {
            $('#table-VentilatorioNoInvasivo').DataTable().clear().destroy();

        }
    }

    static validarRegistroUnicoPorTurno(tipo) {
        VentilatorioNoInvasivo.registros.map((_v, _i) => {
            if (_v.tipo == tipo && _v.hora == VentilatorioNoInvasivo.nuevoRegistro.hora && _v.numeroTurno == PacientesUCI.numeroTurno) {
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
                    style: { "background-color": "#CCCCFF" },
                    onclick: () => {
                        if (VentilatorioNoInvasivo.show) {
                            VentilatorioNoInvasivo.destroyTable();
                        }
                        VentilatorioNoInvasivo.show = !VentilatorioNoInvasivo.show;
                    }
                }, [
                    m("th.tx-semibold[scope='col'][colspan='12']",
                        "OXIGENACIÓN:"
                    ),

                ])
            ),
            m("tbody.bd.bd-2", {
                style: { "border-color": "#5173a1" },
                class: (VentilatorioNoInvasivo.show ? '' : 'd-none')
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
                                        if (VentilatorioNoInvasivo.nuevoRegistro == null) {
                                            VentilatorioNoInvasivo.iniciarRegistro();
                                        } else {
                                            VentilatorioNoInvasivo.nuevoRegistro = null;
                                        }
                                    }
                                },
                                    m("i.fas.fa-plus")
                                )
                            ),
                            (VentilatorioNoInvasivo.nuevoRegistro !== null ? [

                                m('select.tx-semibold', {
                                    id: 'sec_VentilatorioNoInvasivo',
                                    onchange: (e) => {
                                        let _id = e.target.options[e.target.selectedIndex].id;
                                        let _value = e.target.options[e.target.selectedIndex].value;
                                        if (VentilatorioNoInvasivo.nuevoRegistro == null) {
                                            VentilatorioNoInvasivo.nuevoRegistro.id = _id;
                                            VentilatorioNoInvasivo.nuevoRegistro.tipo = _value;
                                        } else {
                                            VentilatorioNoInvasivo.nuevoRegistro.id = _id;
                                            VentilatorioNoInvasivo.nuevoRegistro.tipo = _value;
                                        }
                                    },
                                    class: "custom-select",
                                    value: (VentilatorioNoInvasivo.nuevoRegistro !== null ? VentilatorioNoInvasivo.nuevoRegistro.tipo : 0),
                                }, [{
                                    id: "AireAmbiente",
                                    label: "AIRE AMBIENTE"
                                }, {
                                    id: "CateterNasal",
                                    label: "CATETER NASAL"
                                },
                                {
                                    id: "Mascarilla",
                                    label: "MASCARILLA"
                                },
                                {
                                    id: "TuboenT",
                                    label: "TUBO EN T"
                                },
                                {
                                    id: "AltoFlujo",
                                    label: "ALTO FLUJO"
                                },

                                ].map(x =>
                                    m('option[id="' + x.id + '"]', x.label)
                                ))
                            ] : [])
                        ])
                    ),
                    m("td.tx-normal[colspan='4']",
                        (VentilatorioNoInvasivo.nuevoRegistro !== null ? [
                            m("input[type='text'][placeholder='HH:mm']", {
                                id: 'horaValorVentilatorioNoInvasivo',
                                class: 'form-control',
                                oncreate: (el) => {

                                    if (VentilatorioNoInvasivo.nuevoRegistro !== null && VentilatorioNoInvasivo.nuevoRegistro.hora !== null) {
                                        el.dom.value = VentilatorioNoInvasivo.nuevoRegistro.hora;
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
                                            VentilatorioNoInvasivo.setHora = (e.target.value.length !== 0 ? e.target.value : null);
                                            VentilatorioNoInvasivo.nuevoRegistro.hora = (e.target.value.length !== 0 ? e.target.value : null);
                                            VentilatorioNoInvasivo.validarRegistroUnicoPorTurno(VentilatorioNoInvasivo.nuevoRegistro.tipo);

                                        } catch (error) {
                                            VentilatorioNoInvasivo.nuevoRegistro = null;
                                            $.alert('No es posible ingresar este valor. Ya existe este registro.');
                                        }
                                    }, 50);

                                },

                            }),
                        ] : [])
                    ),
                    m("td.tx-normal[colspan='4']",
                        (VentilatorioNoInvasivo.nuevoRegistro !== null ? [
                            m("input[type='text'][placeholder='Valor']", {
                                id: 'cantidadValorVentilatorioNoInvasivo',
                                class: 'form-control',
                                oncreate: (el) => {
                                    if (VentilatorioNoInvasivo.nuevoRegistro !== null && VentilatorioNoInvasivo.nuevoRegistro.valor !== null) {
                                        el.dom.value = VentilatorioNoInvasivo.nuevoRegistro.valor;
                                    }
                                },
                                oninput: (e) => {
                                    setTimeout(() => {
                                        //GasesUci.nuevoRegistro.hora = moment(PacientesUCI.fechaHoraTurno, 'DD-MM-YYYY HH:mm').format('DD-MM-YYYY') + ' ' + e.target.value;
                                        VentilatorioNoInvasivo.nuevoRegistro.valor = (e.target.value.length !== 0 ? e.target.value : null);

                                    }, 50);
                                },
                                onkeypress: (e) => {
                                    if (e.keyCode == 13) {
                                        VentilatorioNoInvasivo.nuevoRegistro.numeroTurno = PacientesUCI.numeroTurno;
                                        VentilatorioNoInvasivo.nuevoRegistro.fechaHoraTurno = PacientesUCI.fechaHoraTurno;
                                        VentilatorioNoInvasivo.nuevoRegistro.timestamp = moment(PacientesUCI.fechaHoraTurno, 'DD-MM-YYYY HH:mm').format('DD-MM-YYYY') + ' ' + VentilatorioNoInvasivo.nuevoRegistro.hora;

                                        if (moment(VentilatorioNoInvasivo.nuevoRegistro.timestamp, "DD-MM-YYYY HH:mm", true).isValid() == false) {
                                            $.alert(VentilatorioNoInvasivo.nuevoRegistro.timestamp + ' El valor de Hora no tiene el formato HH:mm necesario.');
                                        } else if (VentilatorioNoInvasivo.nuevoRegistro.valor == null || VentilatorioNoInvasivo.nuevoRegistro.valor.length == 0) {
                                            $.alert('El campo Tipo o Valor no puede ser vacio.');
                                        } else {
                                            if (VentilatorioNoInvasivo.nuevoRegistro.editar == null) {
                                                VentilatorioNoInvasivo.agregarRegistro();
                                                FecthUci.registrarSeccion(VentilatorioNoInvasivo.nuevoRegistro);
                                                VentilatorioNoInvasivo.nuevoRegistro = null;
                                                PacientesUCI.vReloadTable('table-VentilatorioNoInvasivo', VentilatorioNoInvasivo.getRegistros());
                                            } else {
                                                VentilatorioNoInvasivo.editarRegistro();
                                                FecthUci.actualizarSeccion(VentilatorioNoInvasivo.nuevoRegistro);
                                                VentilatorioNoInvasivo.nuevoRegistro = null;
                                                PacientesUCI.vReloadTable('table-VentilatorioNoInvasivo', VentilatorioNoInvasivo.getRegistros());
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
                        (VentilatorioNoInvasivo.show != false ? [PacientesUCI.vTable('table-VentilatorioNoInvasivo', VentilatorioNoInvasivo.getRegistros(), VentilatorioNoInvasivo.arqTable())] : [])
                    ),
                ]),
                m('br')
            ]),
        ];
    }


}

export default VentilatorioNoInvasivo;