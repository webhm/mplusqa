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
    hora = null;
    editar = null;
    tipoBit = 'UCIINTER';
    seccion = 'TestScoreUci';
    constructor() {
        this.id = this.id;
        this.nro = this.nro;
        this.fechaHoraTurno = this.fechaHoraTurno;
        this.tipo = this.tipo;
        this.valor = this.valor;
        this.hora = this.hora;
        this.editar = this.editar;
        this.tipoBit = this.tipoBit;
        this.seccion = this.seccion;
    }
}

class TestScoreUciNeo {

    static registros = [];
    static nuevoRegistro = null;
    static show = false;
    static showOtros = false;

    static validarRegistro() {

    }

    static iniciarRegistro() {
        TestScoreUciNeo.nuevoRegistro = new Valoracion();
    }

    static agregarRegistro() {
        if (TestScoreUciNeo.registros.length == 0) {
            TestScoreUciNeo.nuevoRegistro.nro = 1;
            TestScoreUciNeo.registros.push(TestScoreUciNeo.nuevoRegistro);
        } else {
            TestScoreUciNeo.nuevoRegistro.nro = (TestScoreUciNeo.registros[TestScoreUciNeo.registros.length - 1].nro + 1);
            TestScoreUciNeo.registros.push(TestScoreUciNeo.nuevoRegistro);
        }
    }

    static verRegistro(registro) {
        registro.editar = true;
        TestScoreUciNeo.nuevoRegistro = registro;
    }

    static editarRegistro() {
        TestScoreUciNeo.nuevoRegistro.editar = null;
        TestScoreUciNeo.registros.map((_v, _i) => {
            if (_v.nro == TestScoreUciNeo.nuevoRegistro.nro) {
                TestScoreUciNeo.registros[_i] = TestScoreUciNeo.nuevoRegistro;
            }
        });

    }

    static eliminarRegistro(obj) {

        let res = [];
        TestScoreUciNeo.registros.map((_v, _i) => {
            if (_v.nro !== obj.nro) {
                res.push(_v);
            }
        });

        TestScoreUciNeo.registros = res;

    }

    static getRegistros() {
        return TestScoreUciNeo.registros;
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
                                                    TestScoreUciNeo.nuevoRegistro = null
                                                    TestScoreUciNeo.verRegistro(oData);
                                                },
                                            },
                                            'Editar',
                                        ),
                                        m("button.btn.btn-xs.btn-block.btn-outline-danger[type='button']", {
                                                class: (oData.editar ? '' : 'd-none'),
                                                disabled: (PacientesUCI.fechaHoraTurno != oData.fechaHoraTurno ? 'disabled' : ''),

                                                onclick: () => {
                                                    oData.editar = null;
                                                    TestScoreUciNeo.nuevoRegistro = null;
                                                },
                                            },
                                            'Cancelar Edición',
                                        ),
                                        m("button.btn.btn-xs.btn-danger[type='button']", {
                                                class: (oData.editar ? 'd-none' : ''),
                                                disabled: (TurnosUci.nuevoTurno !== null && TurnosUci.nuevoTurno.gestion == 1 ? (PacientesUCI.fechaHoraTurno != oData.fechaHoraTurno ? 'disabled' : '') : 'disabled'),
                                                onclick: () => {
                                                    if (confirm("¿Esta Ud seguro de eliminar este registro?") == true) {
                                                        TestScoreUciNeo.eliminarRegistro(oData);
                                                        FecthUci.eliminarSeccion(oData);
                                                        TestScoreUciNeo.nuevoRegistro = null;
                                                        PacientesUCI.vReloadTable('table-testscore', TestScoreUciNeo.getRegistros());
                                                    }
                                                },
                                            },
                                            'Eliminar',
                                        ),
                                        m("button.btn.btn-xs.btn-dark[type='button']", {
                                                class: (PacientesUCI.fechaHoraTurno != oData.fechaHoraTurno ? '' : 'd-none'),
                                                onclick: () => {
                                                    TestScoreUciNeo.iniciarRegistro();
                                                    TestScoreUciNeo.nuevoRegistro.id = oData.id;
                                                    TestScoreUciNeo.nuevoRegistro.tipo = oData.tipo;
                                                    TestScoreUciNeo.nuevoRegistro.valor = oData.valor;
                                                    TestScoreUciNeo.nuevoRegistro.numeroTurno = PacientesUCI.numeroTurno;
                                                    TestScoreUciNeo.nuevoRegistro.fechaHoraTurno = PacientesUCI.fechaHoraTurno;

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
        let table = document.getElementById('table-testscore');
        // clear first
        if (table != null) {
            $('#table-testscore').DataTable().clear().destroy();

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
                        if (TestScoreUciNeo.show) {
                            TestScoreUciNeo.destroyTable();
                        }
                        TestScoreUciNeo.show = !TestScoreUciNeo.show;
                    }
                }, [
                    m("th.tx-semibold[scope='col'][colspan='12']",
                        "TEST DE SCORE:"
                    ),

                ])
            ),
            m("tbody.bd.bd-2", {
                style: { "border-color": "#5173a1" },
                class: (TestScoreUciNeo.show ? '' : 'd-none')
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
                                            if (TestScoreUciNeo.nuevoRegistro == null) {
                                                TestScoreUciNeo.iniciarRegistro();
                                            } else {
                                                TestScoreUciNeo.nuevoRegistro = null;
                                            }
                                        }
                                    },
                                    m("i.fas.fa-plus")
                                )
                            ),
                            (TestScoreUciNeo.nuevoRegistro !== null ? [

                                m('select.tx-semibold', {
                                    id: 'sec_TipoTestScore',
                                    onchange: (e) => {
                                        let _id = e.target.options[e.target.selectedIndex].id;
                                        let _value = e.target.options[e.target.selectedIndex].value;
                                        if (TestScoreUciNeo.nuevoRegistro == null) {
                                            TestScoreUciNeo.nuevoRegistro.id = _id;
                                            TestScoreUciNeo.nuevoRegistro.tipo = _value;
                                        } else {
                                            TestScoreUciNeo.nuevoRegistro.id = _id;
                                            TestScoreUciNeo.nuevoRegistro.tipo = _value;
                                        }


                                    },
                                    class: "custom-select",
                                    value: (TestScoreUciNeo.nuevoRegistro !== null ? TestScoreUciNeo.nuevoRegistro.tipo : 0),
                                }, m("option[value='0']", 'Seleccione...'), [{
                                        id: "QuejidoEspiratorio",
                                        label: "Quejido Espiratorio"
                                    },
                                    {
                                        id: "Cianosis",
                                        label: "Cianosis"
                                    },
                                    {
                                        id: "EntradaAire",
                                        label: "Entrada de Aire"
                                    },
                                    {
                                        id: "Retracciones",
                                        label: "Retracciones"
                                    },
                                ].map(x =>
                                    m('option[id="' + x.id + '"]', x.label)
                                ))
                            ] : [])
                        ])
                    ),
                    m("td.tx-normal[colspan='3']",
                        (TestScoreUciNeo.nuevoRegistro !== null ? [
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
                                        TestScoreUciNeo.setHora = (e.target.value.length !== 0 ? e.target.value : null);
                                        TestScoreUciNeo.nuevoRegistro.hora = (e.target.value.length !== 0 ? e.target.value : null);

                                    }, 50);
                                },

                            }),
                        ] : [])
                    ),
                    m("td.tx-normal[colspan='3']",
                        (TestScoreUciNeo.nuevoRegistro !== null ? [
                            m('select.tx-semibold', {
                                id: 'valorTestScore',
                                onchange: (e) => {
                                    let _id = e.target.options[e.target.selectedIndex].id;
                                    let _value = e.target.options[e.target.selectedIndex].value;
                                    TestScoreUciNeo.nuevoRegistro.valor = _value;
                                },
                                onkeypress: (e) => {
                                    if (e.keyCode == 13) {
                                        TestScoreUciNeo.nuevoRegistro.numeroTurno = PacientesUCI.numeroTurno;
                                        TestScoreUciNeo.nuevoRegistro.fechaHoraTurno = PacientesUCI.fechaHoraTurno;
                                        if (TestScoreUciNeo.nuevoRegistro.editar == null) {
                                            TestScoreUciNeo.agregarRegistro();
                                            TestScoreUciNeo.nuevoRegistro.id = TestScoreUciNeo.nuevoRegistro.nro + 'TestScoreUci';
                                            FecthUci.registrarSeccion(TestScoreUciNeo.nuevoRegistro);
                                            TestScoreUciNeo.nuevoRegistro = null;
                                            PacientesUCI.vReloadTable('table-testscore', TestScoreUciNeo.getRegistros());
                                        } else {
                                            TestScoreUciNeo.editarRegistro();
                                            FecthUci.actualizarSeccion(TestScoreUciNeo.nuevoRegistro);
                                            TestScoreUciNeo.nuevoRegistro = null;
                                            PacientesUCI.vReloadTable('table-testscore', TestScoreUciNeo.getRegistros());
                                        }
                                    }
                                },
                                class: "custom-select",
                                value: (TestScoreUciNeo.nuevoRegistro !== null ? TestScoreUciNeo.nuevoRegistro.valor : 0),
                            }, m("option[value='0']", 'Seleccione...'), [{
                                    id: "1",
                                    label: "Audible con Fonendoscopio (1)"
                                },
                                {
                                    id: "2",
                                    label: "Audible a Distancia (2)"
                                },
                                {
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
                        (TestScoreUciNeo.show != false ? [PacientesUCI.vTable('table-testscore', TestScoreUciNeo.getRegistros(), TestScoreUciNeo.arqTable())] : [])
                    ),
                ]),
                m('br')
            ]),
        ];
    }


}

export default TestScoreUciNeo;