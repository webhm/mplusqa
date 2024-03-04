import m from "mithril";
import FecthUci from "./fecthUci";
import PacientesUCI from "./pacientesUci";
import TurnosUci from "./turnosUci";

class Via {
    id = null;
    nro = null;
    fechaHoraTurno = null;
    via = null;
    ubicacion = null;
    tipo = null;
    inicio = null;
    retiro = null;
    curacion = null;
    condicion = null;
    observacion = null;
    editar = null;
    seccion = 'Vias';
    constructor() {
        this.id = this.id;
        this.nro = this.nro;
        this.fechaHoraTurno = this.fechaHoraTurno;
        this.via = this.via;
        this.ubicacion = this.ubicacion;
        this.tipo = this.tipo;
        this.inicio = this.inicio;
        this.retiro = this.retiro;
        this.curacion = this.curacion;
        this.condicion = this.condicion;
        this.observacion = this.observacion;
        this.editar = this.editar;
        this.seccion = this.seccion;
    }
}


class ViasUci {

    static registros = [];
    static nuevoRegistro = null;
    static show = false;

    static validarRegistro() {

    }

    static iniciarRegistro() {
        ViasUci.nuevoRegistro = new Via();
    }

    static agregarRegistro() {
        if (ViasUci.registros.length == 0) {
            ViasUci.nuevoRegistro.nro = 1;
            ViasUci.registros.push(ViasUci.nuevoRegistro);
        } else {
            ViasUci.nuevoRegistro.nro = (ViasUci.registros[ViasUci.registros.length - 1].nro + 1);
            ViasUci.registros.push(ViasUci.nuevoRegistro);
        }
    }

    static verRegistro(registro) {
        registro.editar = true;
        ViasUci.nuevoRegistro = registro;
    }

    static editarRegistro() {
        ViasUci.nuevoRegistro.editar = null;
        ViasUci.registros.map((_v, _i) => {
            if (_v.nro == ViasUci.nuevoRegistro.nro) {
                ViasUci.registros[_i] = ViasUci.nuevoRegistro;
            }
        });

    }

    static eliminarRegistro(obj) {

        let res = [];
        ViasUci.registros.map((_v, _i) => {
            if (_v.nro !== obj.nro) {
                res.push(_v);
            }
        });

        ViasUci.registros = res;

    }

    static getRegistros() {
        return ViasUci.registros;
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
                    title: "Via:",
                },
                {
                    title: "Ubicación:",
                },
                {
                    title: "Tipo:",
                },

                {
                    title: "Inicio:",
                },
                {
                    title: "Retiro:",
                },

                {
                    title: "Cambio:",
                },
                {
                    title: "Curación:",
                },
                {
                    title: "Condición:",
                },
                {
                    title: "Observación:",
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
                        return (full.via != null ? full.via : '<div class="text-center pd-l-0 pd-r-0"><hr style="border-color:#001737;"/></div>');
                    },

                    visible: true,
                    aTargets: [4],
                    orderable: true,

                },
                {
                    mRender: function(data, type, full) {
                        return (full.ubicacion != null ? full.ubicacion : '<div class="text-center pd-l-0 pd-r-0"><hr style="border-color:#001737;"/></div>');
                    },
                    visible: true,
                    aTargets: [5],
                    orderable: true,

                },
                {
                    mRender: function(data, type, full) {
                        return (full.tipo != null ? full.tipo : '<div class="text-center pd-l-0 pd-r-0"><hr style="border-color:#001737;"/></div>');
                    },
                    visible: true,
                    aTargets: [6],
                    orderable: true,
                },
                {
                    mRender: function(data, type, full) {
                        return (full.inicio != null ? full.inicio : '<div class="text-center pd-l-0 pd-r-0"><hr style="border-color:#001737;"/></div>');
                    },
                    visible: true,
                    aTargets: [7],
                    orderable: true,


                },
                {
                    mRender: function(data, type, full) {
                        return (full.retiro != null ? full.retiro : '<div class="text-center pd-l-0 pd-r-0"><hr style="border-color:#001737;"/></div>');
                    },
                    visible: true,
                    aTargets: [8],
                    orderable: true,


                },
                {
                    mRender: function(data, type, full) {
                        return (full.cambio != null ? full.cambio : '<div class="text-center pd-l-0 pd-r-0"><hr style="border-color:#001737;"/></div>');
                    },
                    visible: true,
                    aTargets: [9],
                    orderable: true,


                },
                {
                    mRender: function(data, type, full) {
                        return (full.curacion != null ? full.curacion : '<div class="text-center pd-l-0 pd-r-0"><hr style="border-color:#001737;"/></div>');
                    },
                    visible: true,
                    aTargets: [10],
                    orderable: true,


                },
                {
                    mRender: function(data, type, full) {
                        return (full.condicion != null ? full.condicion : '<div class="text-center pd-l-0 pd-r-0"><hr style="border-color:#001737;"/></div>');
                    },
                    visible: true,
                    aTargets: [11],
                    orderable: true,


                },
                {
                    mRender: function(data, type, full) {
                        return (full.observacion != null ? full.observacion : '<div class="text-center pd-l-0 pd-r-0"><hr style="border-color:#001737;"/></div>');
                    },
                    visible: true,
                    aTargets: [12],
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
                                                    ViasUci.nuevoRegistro = null
                                                    ViasUci.verRegistro(oData);
                                                },
                                            },
                                            'Editar',
                                        ),
                                        m("button.btn.btn-xs.btn-block.btn-outline-danger[type='button']", {
                                                class: (oData.editar ? '' : 'd-none'),
                                                disabled: (PacientesUCI.fechaHoraTurno != oData.fechaHoraTurno ? 'disabled' : ''),

                                                onclick: () => {
                                                    oData.editar = null;
                                                    ViasUci.nuevoRegistro = null;
                                                },
                                            },
                                            'Cancelar Edición',
                                        ),
                                        m("button.btn.btn-xs.btn-danger[type='button']", {
                                                class: (oData.editar ? 'd-none' : ''),
                                                disabled: (TurnosUci.nuevoTurno !== null && TurnosUci.nuevoTurno.gestion == 1 ? (PacientesUCI.fechaHoraTurno != oData.fechaHoraTurno ? 'disabled' : '') : 'disabled'),
                                                onclick: () => {
                                                    if (confirm("¿Esta Ud seguro de eliminar este registro?") == true) {
                                                        ViasUci.eliminarRegistro(oData);
                                                        FecthUci.eliminarSeccion(oData);
                                                        ViasUci.nuevoRegistro = null;
                                                        PacientesUCI.vReloadTable('table-vias', ViasUci.getRegistros());
                                                    }
                                                },
                                            },
                                            'Eliminar',
                                        ),
                                        m("button.btn.btn-xs.btn-dark[type='button']", {
                                                class: (PacientesUCI.fechaHoraTurno != oData.fechaHoraTurno ? '' : 'd-none'),
                                                onclick: () => {
                                                    ViasUci.iniciarRegistro();
                                                    ViasUci.nuevoRegistro.id = oData.id;
                                                    ViasUci.nuevoRegistro.via = oData.via;
                                                    ViasUci.nuevoRegistro.ubicacion = oData.ubicacion;
                                                    ViasUci.nuevoRegistro.tipo = oData.tipo;
                                                    ViasUci.nuevoRegistro.inicio = oData.inicio;
                                                    ViasUci.nuevoRegistro.retiro = oData.retiro;
                                                    ViasUci.nuevoRegistro.curacion = oData.curacion;
                                                    ViasUci.nuevoRegistro.condicion = oData.condicion;
                                                    ViasUci.nuevoRegistro.observacion = oData.observacion;
                                                    ViasUci.nuevoRegistro.numeroTurno = PacientesUCI.numeroTurno;
                                                    ViasUci.nuevoRegistro.fechaHoraTurno = PacientesUCI.fechaHoraTurno;

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
                    aTargets: [13],
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
                    style: { "border-color": "#5173a1" },
                },

                m("tr.tx-uppercase", {

                    style: { "background-color": "#CCCCFF" },
                    class: (ViasUci.show ? '' : 'd-none')
                }, [
                    m("th.tx-semibold[scope='col'][colspan='12']",
                        "VIAS:"
                    ),

                ])
            ),
            m("tbody.bd.bd-2", {
                style: { "border-color": "#5173a1" },
                class: (ViasUci.show ? '' : 'd-none')
            }, [

                m("tr.bd.bd-2.tx-uppercase", {
                    style: { "background-color": "rgb(238, 249, 200)", "border-color": "#5173a1" },
                    class: (TurnosUci.nuevoTurno !== null && TurnosUci.nuevoTurno.gestion == 1 ? '' : 'd-none'),
                }, [
                    m("th[scope='col'][colspan='4']",
                        "VÍA: "
                    ),
                    m("th[scope='col'][colspan='4']",
                        "UBICACIÓN: "
                    ),
                    m("th[scope='col'][colspan='4']",
                        "TIPO: "
                    )

                ]),
                m("tr.bd.bd-2", {
                    style: { "border-color": "#5173a1" },
                    class: (TurnosUci.nuevoTurno !== null && TurnosUci.nuevoTurno.gestion == 1 ? '' : 'd-none'),

                }, [
                    m("td.tx-14.tx-normal.wd-40p[colspan='4']",
                        m('select.tx-semibold', {
                            id: 'sec_Vias',
                            onchange: (e) => {
                                let _id = e.target.options[e.target.selectedIndex].id;
                                let _value = e.target.options[e.target.selectedIndex].value;
                                if (ViasUci.nuevoRegistro == null) {
                                    ViasUci.iniciarRegistro();
                                    ViasUci.nuevoRegistro.id = _id;
                                    ViasUci.nuevoRegistro.via = _value;
                                } else {
                                    ViasUci.nuevoRegistro.id = _id;
                                    ViasUci.nuevoRegistro.via = _value;
                                }
                            },
                            class: "custom-select",
                            value: (ViasUci.nuevoRegistro !== null ? ViasUci.nuevoRegistro.via : 0),
                        }, m("option[value='0']", 'Seleccione...'), [{
                            id: "ViaPeriferica",
                            label: "VIA PERIFERICA"
                        }, {
                            id: "CateterSubclavio",
                            label: "CATETER SUBCLAVIO"
                        }, {
                            id: "CateterYugular",
                            label: "CATETER YUGULAR"
                        }, {
                            id: "CateterFemoral",
                            label: "CATETER FEMORAL"
                        }, {
                            id: "CateterCentralInsercionPeriferica",
                            label: "CATETER CENTRAL DE INSERCION PERIFERICA"
                        }, {
                            id: "CateterHemodialisis",
                            label: "CATETER DE HEMODIALISIS"
                        }, {
                            id: "CateterImplantableSubcutaneo",
                            label: "CATETER IMPLANTABLE SUBCUTANEO"
                        }, {
                            id: "LineaArterial",
                            label: "LINEA ARTERIAL"
                        }].map(x =>
                            m('option[id="' + x.id + '"]', x.label)
                        ))

                    ),
                    m("td.tx-10.tx-normal.wd-40p[colspan='4']",
                        (ViasUci.nuevoRegistro !== null ? [
                            m("input", {
                                id: "ubicacion" + ViasUci.nuevoRegistro.id,
                                class: "form-control tx-semibold tx-14",
                                type: "text",
                                placeholder: "...",
                                oninput: (e) => {
                                    ViasUci.nuevoRegistro.ubicacion = (e.target.value.length !== 0 ? e.target.value : null);
                                },
                                value: ViasUci.nuevoRegistro.ubicacion
                            })
                        ] : [])


                    ),
                    m("td.tx-14.tx-normal.wd-40p[colspan='4']",
                        (ViasUci.nuevoRegistro !== null ? [
                            m("input", {
                                id: "tipo" + ViasUci.nuevoRegistro.id,
                                class: "form-control tx-semibold tx-14",
                                type: "text",
                                placeholder: "...",
                                oninput: (e) => {
                                    ViasUci.nuevoRegistro.tipo = (e.target.value.length !== 0 ? e.target.value : null);
                                },
                                value: ViasUci.nuevoRegistro.tipo
                            })
                        ] : [])
                    ),

                ]),
                m("tr.bd.bd-2.tx-uppercase", {
                    style: { "background-color": "rgb(238, 249, 200)", "border-color": "#5173a1" },
                    class: (TurnosUci.nuevoTurno !== null && TurnosUci.nuevoTurno.gestion == 1 ? '' : 'd-none'),

                }, [

                    m("th[scope='col'][colspan='3']",
                        "INICIO: "
                    ),
                    m("th[scope='col'][colspan='3']",
                        "RETIRO: "
                    ),
                    m("th[scope='col'][colspan='3']",
                        "CAMBIO: "
                    ),
                    m("th[scope='col'][colspan='3']",
                        "CURACIÓN: "
                    ),

                ]),
                m("tr.bd.bd-2", {
                    style: { "border-color": "#5173a1" },
                    class: (TurnosUci.nuevoTurno !== null && TurnosUci.nuevoTurno.gestion == 1 ? '' : 'd-none'),

                }, [
                    m("td.tx-14.tx-normal.wd-30p[colspan='3']",
                        (ViasUci.nuevoRegistro !== null ? [
                            m('div', [
                                m("input.form-control[type='text'][placeholder='DD/MM/YYYY]", {
                                    id: "ifecha" + ViasUci.nuevoRegistro.id,
                                    oncreate: (el) => {
                                        if (ViasUci.nuevoRegistro.inicio !== undefined) {
                                            el.dom.value = ViasUci.nuevoRegistro.inicio;
                                        }
                                        setTimeout(() => {
                                            new Cleave("#ifecha" + ViasUci.nuevoRegistro.id, {
                                                date: true,
                                                datePattern: ["d", "m", "Y"]
                                            });
                                        }, 50);
                                    },
                                    oninput: (e) => {
                                        setTimeout(() => {
                                            ViasUci.nuevoRegistro.inicio = e.target.value;
                                        }, 50);
                                    },
                                }),
                            ]),
                        ] : [])
                    ),
                    m("td.tx-14.tx-normal.wd-30p[colspan='3']",

                        (ViasUci.nuevoRegistro !== null ? [
                            m('div', [
                                m("input.form-control[type='text'][placeholder='DD/MM/YYYY]", {
                                    id: "rfecha" + ViasUci.nuevoRegistro.id,
                                    oncreate: (el) => {
                                        if (ViasUci.nuevoRegistro.retiro !== undefined) {
                                            el.dom.value = ViasUci.nuevoRegistro.retiro;
                                        }
                                        setTimeout(() => {
                                            new Cleave("#rfecha" + ViasUci.nuevoRegistro.id, {
                                                date: true,
                                                datePattern: ["d", "m", "Y"]
                                            });
                                        }, 50);
                                    },
                                    oninput: (e) => {
                                        setTimeout(() => {
                                            ViasUci.nuevoRegistro.retiro = e.target.value;
                                        }, 50);
                                    },
                                }),
                            ])


                        ] : [])


                    ),
                    m("td.tx-14.tx-normal.wd-30p[colspan='3']",

                        (ViasUci.nuevoRegistro !== null ? [
                            m('div', [
                                m("input.form-control[type='text'][placeholder='DD/MM/YYYY]", {
                                    id: "cfecha" + ViasUci.nuevoRegistro.id,
                                    oncreate: (el) => {
                                        if (ViasUci.nuevoRegistro.cambio !== undefined) {
                                            el.dom.value = ViasUci.nuevoRegistro.cambio;
                                        }
                                        setTimeout(() => {
                                            new Cleave("#cfecha" + ViasUci.nuevoRegistro.id, {
                                                date: true,
                                                datePattern: ["d", "m", "Y"]
                                            });
                                        }, 50);
                                    },
                                    oninput: (e) => {
                                        setTimeout(() => {
                                            ViasUci.nuevoRegistro.cambio = e.target.value;
                                        }, 50);
                                    },
                                }),

                            ])
                        ] : [

                        ])



                    ),
                    m("td.tx-14.tx-normal.wd-30p[colspan='3']",

                        (ViasUci.nuevoRegistro !== null ? [
                            m('div', [
                                m("input.form-control[type='text'][placeholder='DD/MM/YYYY]", {
                                    id: "cufecha" + ViasUci.nuevoRegistro.id,
                                    oncreate: (el) => {
                                        if (ViasUci.nuevoRegistro.curacion !== undefined) {
                                            el.dom.value = ViasUci.nuevoRegistro.curacion_fecha;
                                        }
                                        setTimeout(() => {
                                            new Cleave("#cufecha" + ViasUci.nuevoRegistro.id, {
                                                date: true,
                                                datePattern: ["d", "m", "Y"]
                                            });
                                        }, 50);
                                    },
                                    oninput: (e) => {
                                        setTimeout(() => {
                                            ViasUci.nuevoRegistro.curacion = e.target.value;
                                        }, 50);
                                    },
                                }),

                            ])
                        ] : [])


                    ),

                ]),
                m("tr.bd.bd-2.tx-uppercase", {
                    style: { "background-color": "rgb(238, 249, 200)", "border-color": "#5173a1" },
                    class: (TurnosUci.nuevoTurno !== null && TurnosUci.nuevoTurno.gestion == 1 ? '' : 'd-none'),

                }, [
                    m("th[scope='col'][colspan='3']",
                        "CONDICIÓN: "
                    ),
                    m("th[scope='col'][colspan='9']",
                        "OBSERVACIÓN / TRAE: "
                    ),
                ]),
                m('tr.bd.bd-2', {
                    style: { "border-color": "#5173a1" },
                    class: (TurnosUci.nuevoTurno !== null && TurnosUci.nuevoTurno.gestion == 1 ? '' : 'd-none'),

                }, [
                    m("td.tx-14.tx-normal.wd-30p[colspan='3']",
                        (ViasUci.nuevoRegistro !== null ? [
                            m('select.tx-semibold', {
                                id: "condicion" + ViasUci.nuevoRegistro.id,
                                oncreate: (el) => {
                                    if (ViasUci.nuevoRegistro.condicion !== undefined) {
                                        el.dom.value = ViasUci.nuevoRegistro.condicion;
                                    }
                                },
                                onchange: (e) => {
                                    let _value = e.target.options[e.target.selectedIndex].value;
                                    ViasUci.nuevoRegistro.condicion = _value;
                                },
                                class: "custom-select",
                            }, m('option', 'Seleccione...'), [
                                'VIA PERIFERICA PERMEABLE Y EN BUENAS CONDICIONES',
                                'CATETER PERMEABLE',
                                'EN BUENAS CONDICIONES',
                                'SIN SIGNOS DE INFECCION'
                            ].map(x =>
                                m('option', x)
                            ))
                        ] : [])


                    ),
                    m("td.tx-14.tx-normal.wd-90p[colspan='9']",
                        (ViasUci.nuevoRegistro !== null ? [
                            m("input", {
                                id: "observacion" + ViasUci.nuevoRegistro.id,
                                class: "form-control tx-semibold tx-14",
                                type: "text",
                                placeholder: "...",
                                onkeypress: (e) => {
                                    if (e.keyCode == 13) {
                                        ViasUci.nuevoRegistro.numeroTurno = PacientesUCI.numeroTurno;
                                        ViasUci.nuevoRegistro.fechaHoraTurno = PacientesUCI.fechaHoraTurno;
                                        if (ViasUci.nuevoRegistro.editar == null) {
                                            ViasUci.agregarRegistro();
                                            FecthUci.registrarSeccion(ViasUci.nuevoRegistro);
                                            ViasUci.nuevoRegistro = null;
                                            PacientesUCI.vReloadTable('table-vias', ViasUci.getRegistros());
                                        } else {
                                            ViasUci.editarRegistro();
                                            FecthUci.actualizarSeccion(ViasUci.nuevoRegistro);
                                            ViasUci.nuevoRegistro = null;
                                            PacientesUCI.vReloadTable('table-vias', ViasUci.getRegistros());
                                        }
                                    }
                                },
                                oninput: (e) => {
                                    ViasUci.nuevoRegistro.observacion = (e.target.value.length !== 0 ? e.target.value : null);
                                },
                                value: ViasUci.nuevoRegistro.observacion
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
                        (ViasUci.show != false ? [PacientesUCI.vTable('table-vias', ViasUci.getRegistros(), ViasUci.arqTable())] : [])
                    ),
                ]),
                m('br')
            ]),
        ];
    }


}

export default ViasUci;