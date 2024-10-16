import m from "mithril";
import PacientesUCI from "./pacientesUci";
import FecthUci from "./fecthUci";
import TurnosUci from "./turnosUci";

class Hemodialisis {
    id = null;
    nro = null;
    fechaHoraTurno = null;
    hemo = null;
    am = null;
    pm = null;
    hs = null;
    observacion = null;
    editar = null;
    seccion = 'Hemodialisis';
    constructor() {
        this.id = this.id;
        this.nro = this.nro;
        this.fechaHoraTurno = this.fechaHoraTurno;
        this.hemo = this.hemo;
        this.am = this.am;
        this.pm = this.pm;
        this.hs = this.hs;
        this.observacion = this.observacion;
        this.editar = this.editar;
        this.seccion = this.seccion;
    }
}


class HemodialisisUci {
    static registros = [];
    static nuevoRegistro = null;
    static show = false;
    static validarRegistro() {

    }
    static iniciarRegistro() {
        HemodialisisUci.nuevoRegistro = new Hemodialisis();
    }
    static agregarRegistro() {
        if (HemodialisisUci.registros.length == 0) {
            HemodialisisUci.nuevoRegistro.nro = 1;
            HemodialisisUci.registros.push(HemodialisisUci.nuevoRegistro);
        } else {
            HemodialisisUci.nuevoRegistro.nro = (HemodialisisUci.registros[HemodialisisUci.registros.length - 1].nro + 1);
            HemodialisisUci.registros.push(HemodialisisUci.nuevoRegistro);
        }
        FecthUci.registrarSeccion(HemodialisisUci.nuevoRegistro);

    }
    static verRegistro(registro) {
        registro.editar = true;
        HemodialisisUci.nuevoRegistro = registro;
        console.log(HemodialisisUci.nuevoRegistro)
    }

    static editarRegistro() {
        HemodialisisUci.nuevoRegistro.editar = null;
        HemodialisisUci.registros.map((_v, _i) => {
            if (_v.nro == HemodialisisUci.nuevoRegistro.nro) {
                HemodialisisUci.registros[_i] = HemodialisisUci.nuevoRegistro;
            }
        });

    }
    static eliminarRegistro(obj) {

        HemodialisisUci.registros = PacientesUCI.extractSeccion(Array.from(document.getElementById('sec_Hemodialisis').options));

        let hash = {};
        let res = [];
        let _arr = [];
        let result = [];
        let resultId = [];

        HemodialisisUci.registros.map((_v, _i) => {
            if (_v.nro !== obj.nro) {
                res.push(_v);
            }
        });

        result = res.sort((a, b) => b.nro - a.nro);

        resultId = result.filter(o => hash[o.id] ? false : hash[o.id] = true);
        // Ordenar desc
        _arr = resultId.sort((a, b) => a.nro - b.nro);

        HemodialisisUci.registros = _arr;

    }
    static filterRegistros() {

        let result = [];
        let resultId = [];
        let _arr = [];
        let hash = {};

        result = HemodialisisUci.registros.sort((a, b) => b.nro - a.nro);
        // Quitar duplicados
        resultId = result.filter(o => hash[o.id] ? false : hash[o.id] = true);
        // Ordenar desc
        _arr = resultId.sort((a, b) => a.nro - b.nro);

        HemodialisisUci.registros = _arr;

    }

    static getRegistros() {
        return HemodialisisUci.registros;
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
                    title: "Cateter Central o Hemodialisis:",
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
                        return full.hemo;
                    },

                    visible: true,
                    aTargets: [3],
                    orderable: true,

                },
                {
                    mRender: function(data, type, full) {
                        return (full.am != null ? full.am : '<div class="text-center pd-l-0 pd-r-0"><hr style="border-color:#001737;"/></div>');
                    },
                    visible: true,
                    aTargets: [4],
                    orderable: true,

                },
                {
                    mRender: function(data, type, full) {
                        return (full.pm != null ? full.pm : '<div class="text-center pd-l-0 pd-r-0"><hr style="border-color:#001737;"/></div>');
                    },
                    visible: true,
                    aTargets: [5],
                    orderable: true,
                },
                {
                    mRender: function(data, type, full) {
                        return (full.hs != null ? full.hs : '<div class="text-center pd-l-0 pd-r-0"><hr style="border-color:#001737;"/></div>');
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


            ],
            fnRowCallback: function(nRow, aData, iDisplayIndex, iDisplayIndexFull) {

            },
        };
    }

    view() {
        return [
            m("thead.bd.bd-2", {
                    style: { "border-color": "#5173a1" },
                    class: (FecthUci.dataHistorial.length !== 0 ? '' : 'd-none'),

                },
                m("tr.tx-uppercase", {

                    style: { "background-color": "#CCCCFF" },
                    onclick: () => {
                        HemodialisisUci.show = !HemodialisisUci.show;
                    }

                }, [
                    m("th.tx-semibold[scope='col'][colspan='12']",
                        "CATETER VIA CENTRAL O HEMODIALISIS:"
                    ),

                ])
            ),
            m("tbody.bd.bd-2", {
                style: { "border-color": "#5173a1" },
                class: (HemodialisisUci.show ? '' : 'd-none')
            }, [

                m("tr.bd.bd-2.tx-uppercase", {
                    style: { "background-color": "rgb(238, 249, 200)", "border-color": "#5173a1" },
                    class: (TurnosUci.nuevoTurno !== null && TurnosUci.nuevoTurno.gestion == 1 ? '' : 'd-none'),
                }, [
                    m("th[scope='col'][colspan='3']",
                        "CATETER VIA CENTRAL O HEMODIALISIS: "
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
                m("tr.bd.bd-2", {
                    style: { "border-color": "#5173a1" },
                    class: (TurnosUci.nuevoTurno !== null && TurnosUci.nuevoTurno.gestion == 1 ? '' : 'd-none'),
                }, [
                    m("td.tx-14.tx-normal[colspan='3']",
                        (HemodialisisUci.nuevoRegistro !== null ? [
                            m('div.d-flex', [
                                m("input", {
                                    class: "form-control tx-semibold tx-14",
                                    type: "text",
                                    placeholder: "...",
                                    disabled: true,
                                    value: HemodialisisUci.nuevoRegistro.hemo,
                                })

                            ]),
                        ] : [])
                    ),
                    m("td.tx-14.tx-normal.d-none[colspan='3']",
                        m('select.tx-semibold', {
                            id: 'sec_Hemodialisis',
                            disabled: true,
                            onchange: (e) => {
                                let _id = e.target.options[e.target.selectedIndex].id;
                                let _value = e.target.options[e.target.selectedIndex].value;
                                HemodialisisUci.iniciarRegistro();
                                HemodialisisUci.nuevoRegistro.id = _id;
                                HemodialisisUci.nuevoRegistro.hemo = _value;
                            },
                            class: "custom-select",
                            value: (HemodialisisUci.nuevoRegistro !== null ? HemodialisisUci.nuevoRegistro.hemo : 0),
                        }, m("option[value='0']", 'Seleccione...'), [{
                                id: "ParcheLimpioSeco",
                                label: "PARCHE LIMPIO Y SECO"
                            }, {
                                id: "FechaCuracionParche",
                                label: "FECHA DE CURACION SOBRE PARCHE"
                            },
                            {
                                id: "TodosAccesosTapados",
                                label: "TODOS LOS ACCESOS TAPADOS"
                            },
                            {
                                id: "RegistroNumerosDias",
                                label: "REGISTRO DE NUMEROS DE DIAS"
                            },
                            {
                                id: "RegistroCambioEquipo",
                                label: "REGISTRO DE CAMBIO DE EQUIPO"
                            }
                        ].map(x =>
                            m('option[id="' + x.id + '"]', x.label)
                        ))
                    ),
                    m("td.tx-14.tx-normal[colspan='3']",
                        (HemodialisisUci.nuevoRegistro !== null ? [
                            m('div.d-flex', [
                                m("input", {
                                    id: "am" + HemodialisisUci.nuevoRegistro.id,
                                    class: "form-control tx-semibold tx-14",
                                    type: "text",
                                    placeholder: "...",
                                    oninput: (e) => {
                                        HemodialisisUci.nuevoRegistro.am = (e.target.value.length !== 0 ? e.target.value : null);
                                    },
                                    value: HemodialisisUci.nuevoRegistro.am

                                })

                            ]),
                        ] : [])
                    ),
                    m("td.tx-14.tx-normal[colspan='3']",
                        (HemodialisisUci.nuevoRegistro !== null ? [
                            m('div.d-flex', [
                                m("input", {
                                    id: "pm" + HemodialisisUci.nuevoRegistro.id,
                                    class: "form-control tx-semibold tx-14",
                                    type: "text",
                                    placeholder: "...",
                                    oninput: (e) => {
                                        HemodialisisUci.nuevoRegistro.pm = (e.target.value.length !== 0 ? e.target.value : null);
                                    },
                                    value: HemodialisisUci.nuevoRegistro.pm

                                })

                            ]),
                        ] : [])
                    ),

                    m("td.tx-14.tx-normal[colspan='3']",
                        (HemodialisisUci.nuevoRegistro !== null ? [
                            m('div.d-flex', [
                                m("input", {
                                    id: "hs" + HemodialisisUci.nuevoRegistro.id,
                                    class: "form-control tx-semibold tx-14",
                                    type: "text",
                                    placeholder: "...",
                                    oninput: (e) => {
                                        HemodialisisUci.nuevoRegistro.hs = (e.target.value.length !== 0 ? e.target.value : null);
                                    },
                                    value: HemodialisisUci.nuevoRegistro.hs

                                })

                            ]),
                        ] : [])
                    ),
                ]),
                m("tr.bd.bd-2.tx-uppercase", {
                    style: { "background-color": "rgb(238, 249, 200)", "border-color": "#5173a1" },
                    class: (TurnosUci.nuevoTurno !== null && TurnosUci.nuevoTurno.gestion == 1 ? '' : 'd-none'),
                }, [
                    m("th[scope='col'][colspan='12']",
                        "OBSERVACIÓN: "
                    ),


                ]),
                m("tr.bd.bd-2", {
                    style: { "border-color": "#5173a1" },
                    class: (TurnosUci.nuevoTurno !== null && TurnosUci.nuevoTurno.gestion == 1 ? '' : 'd-none'),
                }, [
                    m("td.tx-14.tx-normal[colspan='12']",
                        (HemodialisisUci.nuevoRegistro !== null ? [
                            m("input", {
                                id: "observacion" + HemodialisisUci.nuevoRegistro.id,
                                class: "form-control tx-semibold tx-14",
                                type: "text",
                                placeholder: "...",

                                onkeypress: (e) => {
                                    if (e.keyCode == 13) {
                                        HemodialisisUci.nuevoRegistro.numeroTurno = PacientesUCI.numeroTurno;
                                        HemodialisisUci.nuevoRegistro.fechaHoraTurno = PacientesUCI.fechaHoraTurno;
                                        if (HemodialisisUci.nuevoRegistro.editar == null) {
                                            HemodialisisUci.agregarRegistro();
                                            FecthUci.registrarSeccion(HemodialisisUci.nuevoRegistro);
                                            HemodialisisUci.nuevoRegistro = null;
                                            HemodialisisUci.filterRegistros();
                                            PacientesUCI.vReloadTable('table-hemodialisis', HemodialisisUci.getRegistros());
                                        } else {
                                            HemodialisisUci.editarRegistro();
                                            FecthUci.actualizarSeccion(HemodialisisUci.nuevoRegistro);
                                            HemodialisisUci.nuevoRegistro = null;
                                            HemodialisisUci.filterRegistros();
                                            PacientesUCI.vReloadTable('table-hemodialisis', HemodialisisUci.getRegistros());
                                        }
                                    }
                                },
                                oninput: (e) => {
                                    HemodialisisUci.nuevoRegistro.observacion = (e.target.value.length !== 0 ? e.target.value : null);
                                },
                                value: HemodialisisUci.nuevoRegistro.observacion
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
                        (HemodialisisUci.show != false ? [PacientesUCI.vTable('table-hemodialisis', HemodialisisUci.getRegistros(), HemodialisisUci.arqTable())] : [])

                    ),
                ]),
            ]),
        ]
    }
}

export default HemodialisisUci;