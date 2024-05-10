import m from "mithril";
import FecthUci from "./fecthUci";
import PacientesUCI from "./pacientesUci";
import TurnosUci from "./turnosUci";

class Prescripcion {
    id = null;
    nro = null;
    fechaHoraTurno = null;
    prescripcion = null;
    tipo = null;
    medico = null;
    hora = null;
    velocidad = null;
    unidad = null;
    velocidadHora = null;
    editar = null;
    seccion = 'PrescripcionUci';
    constructor() {
        this.id = this.id;
        this.nro = this.nro;
        this.fechaHoraTurno = this.fechaHoraTurno;
        this.prescripcion = this.prescripcion;
        this.tipo = this.tipo;
        this.medico = this.medico;
        this.hora = this.hora;
        this.velocidad = this.velocidad;
        this.unidad = this.unidad;
        this.velocidadHora = this.velocidadHora;
        this.editar = this.editar;
        this.seccion = this.seccion;
    }
}


class PrescripcionesUci {
    static registros = [];
    static nuevoRegistro = null;
    static show = false;
    static showOtros = false;

    static validarRegistro() {

    }
    static iniciarRegistro() {
        PrescripcionesUci.nuevoRegistro = new Prescripcion();
    }
    static agregarRegistro() {
        if (PrescripcionesUci.registros.length == 0) {
            PrescripcionesUci.nuevoRegistro.nro = 1;
            PrescripcionesUci.registros.push(PrescripcionesUci.nuevoRegistro);
        } else {
            PrescripcionesUci.nuevoRegistro.nro = (PrescripcionesUci.registros[PrescripcionesUci.registros.length - 1].nro + 1);
            PrescripcionesUci.registros.push(PrescripcionesUci.nuevoRegistro);
        }
    }
    static verRegistro(registro) {
        registro.editar = true;
        PrescripcionesUci.nuevoRegistro = registro;
    }
    static editarRegistro() {
        PrescripcionesUci.nuevoRegistro.editar = null;
        PrescripcionesUci.registros.map((_v, _i) => {
            if (_v.nro == PrescripcionesUci.nuevoRegistro.nro) {
                PrescripcionesUci.registros[_i] = PrescripcionesUci.nuevoRegistro;
            }
        });

    }
    static eliminarRegistro(obj) {

        let res = [];
        PrescripcionesUci.registros.map((_v, _i) => {

            if (_v.nro !== obj.nro) {
                res.push(_v);
            }

        });

        PrescripcionesUci.registros = res;

    }
    static getRegistros() {
        return PrescripcionesUci.registros;
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
                    title: "Order N°:",
                },
                {
                    title: "Order Turno:",
                },
                {
                    title: "Turno:",
                },
                {
                    title: "Tipo:",
                },
                {
                    title: "Prescripción:",
                },
                {
                    title: "Médico:",
                },

                {
                    title: "Hora:",
                },
                {
                    title: "Velocidad de Infusión:",
                },

                {
                    title: "Unidad:",
                },
                {
                    title: "Velocidad de Cambio:",
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
                    orderable: true,

                },
                {
                    mRender: function(data, type, full) {
                        return full.tipo;

                    },
                    visible: true,
                    aTargets: [3],
                    orderable: true,

                },
                {
                    mRender: function(data, type, full) {
                        return (full.prescripcion != null ? full.prescripcion : '<div class="text-center pd-l-0 pd-r-0"><hr style="border-color:#001737;"/></div>');
                    },
                    visible: true,
                    aTargets: [4],
                    orderable: true,

                },
                {
                    mRender: function(data, type, full) {
                        return (full.medico != null ? full.medico : '<div class="text-center pd-l-0 pd-r-0"><hr style="border-color:#001737;"/></div>');
                    },
                    visible: true,
                    aTargets: [5],
                    orderable: true,
                },
                {
                    mRender: function(data, type, full) {


                        return (full.hora != null ? full.hora : '<div class="text-center pd-l-0 pd-r-0"><hr style="border-color:#001737;"/></div>');
                    },
                    visible: true,
                    aTargets: [6],
                    orderable: true,


                },
                {
                    mRender: function(data, type, full) {

                        return (full.unidad != null ? full.unidad : '<div class="text-center pd-l-0 pd-r-0"><hr style="border-color:#001737;"/></div>');
                    },
                    visible: true,
                    aTargets: [7],
                    orderable: true,


                },
                {
                    mRender: function(data, type, full) {
                        return (full.velocidad != null ? full.velocidad : '<div class="text-center pd-l-0 pd-r-0"><hr style="border-color:#001737;"/></div>');
                    },
                    visible: true,
                    aTargets: [8],
                    orderable: true,


                },
                {
                    mRender: function(data, type, full) {
                        return (full.velocidadHora != null ? full.velocidadHora : '<div class="text-center pd-l-0 pd-r-0"><hr style="border-color:#001737;"/></div>');
                    },
                    visible: true,
                    aTargets: [9],
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
                                                    PrescripcionesUci.nuevoRegistro = null
                                                    PrescripcionesUci.verRegistro(oData);
                                                },
                                            },
                                            'Editar',
                                        ),
                                        m("button.btn.btn-xs.btn-block.btn-outline-danger[type='button']", {
                                                class: (oData.editar ? '' : 'd-none'),
                                                disabled: (PacientesUCI.fechaHoraTurno != oData.fechaHoraTurno ? 'disabled' : ''),

                                                onclick: () => {
                                                    oData.editar = null;
                                                    PrescripcionesUci.nuevoRegistro = null;
                                                },
                                            },
                                            'Cancelar Edición',
                                        ),
                                        m("button.btn.btn-xs.btn-danger[type='button']", {
                                                class: (oData.editar ? 'd-none' : ''),
                                                disabled: (TurnosUci.nuevoTurno !== null && TurnosUci.nuevoTurno.gestion == 1 ? (PacientesUCI.fechaHoraTurno != oData.fechaHoraTurno ? 'disabled' : '') : 'disabled'),

                                                onclick: () => {

                                                    if (confirm("¿Esta Ud seguro de eliminar este registro?") == true) {
                                                        PrescripcionesUci.eliminarRegistro(oData);
                                                        FecthUci.eliminarSeccion(oData);
                                                        PrescripcionesUci.nuevoRegistro = null;
                                                        PacientesUCI.vReloadTable('table-prescripciones', PrescripcionesUci.getRegistros());
                                                    }




                                                },
                                            },
                                            'Eliminar',
                                        ),
                                        m("button.btn.btn-xs.btn-dark[type='button']", {
                                                class: (PacientesUCI.fechaHoraTurno != oData.fechaHoraTurno ? '' : 'd-none'),
                                                onclick: () => {
                                                    PrescripcionesUci.iniciarRegistro();
                                                    PrescripcionesUci.nuevoRegistro.id = oData.id;
                                                    PrescripcionesUci.nuevoRegistro.tipo = oData.tipo;
                                                    PrescripcionesUci.nuevoRegistro.prescripcion = oData.prescripcion;
                                                    PrescripcionesUci.nuevoRegistro.hora = oData.hora;
                                                    PrescripcionesUci.nuevoRegistro.unidad = oData.unidad;
                                                    PrescripcionesUci.nuevoRegistro.numeroTurno = PacientesUCI.numeroTurno;
                                                    PrescripcionesUci.nuevoRegistro.fechaHoraTurno = PacientesUCI.fechaHoraTurno;

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
                    aTargets: [10],
                    orderable: true,

                }


            ],
            fnRowCallback: function(nRow, aData, iDisplayIndex, iDisplayIndexFull) {

            },
        };
    }

    static destroyTable() {
        let table = document.getElementById('table-prescripciones');
        // clear first
        if (table != null) {
            $('#table-prescripciones').DataTable().clear().destroy();

        }
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
                        if (PrescripcionesUci.show) {
                            PrescripcionesUci.destroyTable();
                        }
                        PrescripcionesUci.show = !PrescripcionesUci.show;
                    }

                }, [
                    m("th.tx-semibold[scope='col'][colspan='12']",
                        "PRESCRIPCIONES"
                    ),

                ])
            ),
            m("tbody.bd.bd-2", {
                style: { "border-color": "#5173a1" },
                class: (PrescripcionesUci.show ? '' : 'd-none')
            }, [

                m("tr.bd.bd-2.tx-uppercase", {
                    style: { "background-color": "rgb(238, 249, 200)", "border-color": "#5173a1" },
                    class: (TurnosUci.nuevoTurno !== null && TurnosUci.nuevoTurno.gestion == 1 ? '' : 'd-none'),

                }, [
                    m("th[scope='col'][colspan='4']",
                        "TIPO DE PRESCRIPCIÓN: "
                    ),
                    m("th[scope='col'][colspan='4']",
                        "PRESCRIPCIÓN: "
                    ),
                    m("th[scope='col'][colspan='4']",
                        "MÉDICO: "
                    )

                ]),
                m("tr.bd.bd-2", {
                    style: { "border-color": "#5173a1" },
                    class: (TurnosUci.nuevoTurno !== null && TurnosUci.nuevoTurno.gestion == 1 ? '' : 'd-none'),

                }, [
                    m("td.tx-14.tx-normal.wd-40p[colspan='4']",
                        m('select.tx-semibold', {
                            id: 'sec_PrescripcionesUci',
                            onchange: (e) => {
                                let _id = e.target.options[e.target.selectedIndex].id;
                                let _value = e.target.options[e.target.selectedIndex].value;
                                if (PrescripcionesUci.nuevoRegistro == null) {
                                    PrescripcionesUci.iniciarRegistro();
                                    PrescripcionesUci.nuevoRegistro.id = _id;
                                    PrescripcionesUci.nuevoRegistro.tipo = _value;
                                } else {
                                    PrescripcionesUci.nuevoRegistro.id = _id;
                                    PrescripcionesUci.nuevoRegistro.tipo = _value;
                                }
                            },
                            class: "custom-select",
                            value: (PrescripcionesUci.nuevoRegistro !== null ? PrescripcionesUci.nuevoRegistro.tipo : 0),
                        }, m("option[value='0']", 'Seleccione...'), [{
                            id: "Medicacion",
                            label: "MEDICACIÓN"
                        }, {
                            id: "TerapiaRespiratoria",
                            label: "TERAPIA RESPIRATORIA"
                        }, ].map(x =>
                            m('option[id="' + x.id + '"]', x.label)
                        ))
                    ),


                    m("td.tx-14.tx-normal.wd-40p[colspan='4']",
                        (PrescripcionesUci.nuevoRegistro !== null ? [
                            m("input", {
                                id: "prescripcion" + PrescripcionesUci.nuevoRegistro.id,
                                class: "form-control tx-semibold tx-14",
                                type: "text",
                                placeholder: "...",
                                oninput: (e) => {
                                    PrescripcionesUci.nuevoRegistro.prescripcion = (e.target.value.length !== 0 ? e.target.value : null);
                                },
                                value: PrescripcionesUci.nuevoRegistro.prescripcion
                            })
                        ] : [])
                    ),
                    m("td.tx-14.tx-normal.wd-40p[colspan='4']",
                        (PrescripcionesUci.nuevoRegistro !== null ? [
                            m("input", {
                                id: "medico" + PrescripcionesUci.nuevoRegistro.id,
                                class: "form-control tx-semibold tx-14",
                                type: "text",
                                placeholder: "...",
                                oninput: (e) => {
                                    PrescripcionesUci.nuevoRegistro.medico = (e.target.value.length !== 0 ? e.target.value : null);
                                },
                                value: PrescripcionesUci.nuevoRegistro.medico
                            })
                        ] : [])
                    ),

                ]),
                m("tr.bd.bd-2.tx-uppercase", {
                    style: { "background-color": "rgb(238, 249, 200)", "border-color": "#5173a1" },
                    class: (TurnosUci.nuevoTurno !== null && TurnosUci.nuevoTurno.gestion == 1 ? '' : 'd-none'),

                }, [

                    m("th[scope='col'][colspan='6']",
                        "HORA: "
                    ),
                    m("th[scope='col'][colspan='6']",
                        "VELOCIDAD INFUSIÓN: "
                    ),




                ]),
                m("tr.bd.bd-2", {
                    style: { "border-color": "#5173a1" },
                    class: (TurnosUci.nuevoTurno !== null && TurnosUci.nuevoTurno.gestion == 1 ? '' : 'd-none'),
                }, [


                    m("td.tx-14.tx-normal.wd-40p[colspan='6']",
                        (PrescripcionesUci.nuevoRegistro !== null ? [
                            m('div.d-flex', [
                                m("input.form-control[type='text'][placeholder='HH:mm']", {
                                    id: "horaPres" + PrescripcionesUci.nuevoRegistro.id,
                                    oncreate: (el) => {
                                        if (PrescripcionesUci.nuevoRegistro.hora != undefined) {
                                            el.dom.value = PrescripcionesUci.nuevoRegistro.hora;
                                        }
                                        setTimeout(() => {
                                            new Cleave("#horaPres" + PrescripcionesUci.nuevoRegistro.id, {
                                                time: true,
                                                timePattern: ['h', 'm']
                                            });


                                        }, 50);
                                    },
                                    oninput: (e) => {
                                        setTimeout(() => {
                                            PrescripcionesUci.nuevoRegistro.hora = e.target.value;
                                        }, 50);
                                    },
                                })
                            ]),
                        ] : [])
                    ),

                    m("td.tx-14.tx-normal.wd-40p[colspan='6']",
                        (PrescripcionesUci.nuevoRegistro !== null ? [

                            m("input", {
                                id: "velocidad" + PrescripcionesUci.nuevoRegistro.id,
                                class: "form-control tx-semibold tx-14",
                                type: "text",
                                placeholder: "...",
                                value: PrescripcionesUci.nuevoRegistro.velocidad,
                                oninput: (e) => {
                                    PrescripcionesUci.nuevoRegistro.velocidad = (e.target.value.length !== 0 ? e.target.value : null);
                                },
                            })
                        ] : [])


                    ),






                ]),
                m("tr.bd.bd-2.tx-uppercase", {
                    style: { "background-color": "rgb(238, 249, 200)", "border-color": "#5173a1" },
                    class: (TurnosUci.nuevoTurno !== null && TurnosUci.nuevoTurno.gestion == 1 ? '' : 'd-none'),

                }, [


                    m("th[scope='col'][colspan='6']",
                        "UNIDAD: "
                    ),
                    m("th[scope='col'][colspan='6']",
                        "VELOCIDAD CAMBIO: "
                    ),

                ]),
                m('tr.bd.bd-2', {
                    style: { "border-color": "#5173a1" },
                    class: (TurnosUci.nuevoTurno !== null && TurnosUci.nuevoTurno.gestion == 1 ? '' : 'd-none'),
                }, [
                    m("td.tx-14.tx-normal.wd-60p[colspan='6']",
                        (PrescripcionesUci.nuevoRegistro !== null ? [

                            m("input", {
                                id: "unidad" + PrescripcionesUci.nuevoRegistro.id,
                                class: "form-control tx-semibold tx-14",
                                type: "text",
                                placeholder: "...",
                                value: PrescripcionesUci.nuevoRegistro.unidad,
                                oninput: (e) => {
                                    PrescripcionesUci.nuevoRegistro.unidad = (e.target.value.length !== 0 ? e.target.value : null);
                                },
                            })
                        ] : [])


                    ),
                    m("td.tx-14.tx-normal.wd-60p[colspan='6']",
                        (PrescripcionesUci.nuevoRegistro !== null ? [
                            m("input", {
                                id: "velocidadHora" + PrescripcionesUci.nuevoRegistro.id,
                                class: "form-control tx-semibold tx-14",
                                type: "text",
                                placeholder: "...",
                                value: PrescripcionesUci.nuevoRegistro.velocidadHora,
                                onkeypress: (e) => {
                                    if (e.keyCode == 13) {
                                        PrescripcionesUci.nuevoRegistro.numeroTurno = PacientesUCI.numeroTurno;
                                        PrescripcionesUci.nuevoRegistro.fechaHoraTurno = PacientesUCI.fechaHoraTurno;
                                        if (PrescripcionesUci.nuevoRegistro.editar == null) {
                                            PrescripcionesUci.agregarRegistro();
                                            FecthUci.registrarSeccion(PrescripcionesUci.nuevoRegistro);
                                            PacientesUCI.vReloadTable('table-prescripciones', PrescripcionesUci.getRegistros());
                                            PrescripcionesUci.nuevoRegistro = null;
                                        } else {
                                            PrescripcionesUci.editarRegistro();
                                            FecthUci.actualizarSeccion(PrescripcionesUci.nuevoRegistro);
                                            PacientesUCI.vReloadTable('table-prescripciones', PrescripcionesUci.getRegistros());
                                            PrescripcionesUci.nuevoRegistro = null;
                                        }
                                    }
                                },
                                oninput: (e) => {
                                    PrescripcionesUci.nuevoRegistro.velocidadHora = (e.target.value.length !== 0 ? e.target.value : null);
                                },
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
                        (PrescripcionesUci.show != false ? [PacientesUCI.vTable('table-prescripciones', PrescripcionesUci.getRegistros(), PrescripcionesUci.arqTable())] : [])
                    ),
                ]),
            ]),
        ]
    }
}

export default PrescripcionesUci;