import m from "mithril";
import FecthUci from "./fecthUci";
import PacientesUCI from "./pacientesUci";
import TurnosUci from "./turnosUci";

class Acceso {
    id = null;
    nro = null;
    fechaHoraTurno = null;
    acceso = null;
    ubicacion = null;
    tipo = null;
    inicio = null;
    retiro = null;
    curacion = null;
    condicion = null;
    observacion = null;
    editar = null;
    seccion = 'Accesos';
    constructor() {
        this.id = this.id;
        this.nro = this.nro;
        this.fechaHoraTurno = this.fechaHoraTurno;
        this.acceso = this.acceso;
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


class AccesosUci {
    static registros = [];
    static nuevoRegistro = null;
    static show = false;
    static showOtros = false;

    static validarRegistro() {

    }
    static iniciarRegistro() {
        AccesosUci.nuevoRegistro = new Acceso();
    }
    static agregarRegistro() {
        if (AccesosUci.registros.length == 0) {
            AccesosUci.nuevoRegistro.nro = 1;
            AccesosUci.registros.push(AccesosUci.nuevoRegistro);
        } else {
            AccesosUci.nuevoRegistro.nro = (AccesosUci.registros[AccesosUci.registros.length - 1].nro + 1);
            AccesosUci.registros.push(AccesosUci.nuevoRegistro);
        }
    }
    static verRegistro(registro) {
        registro.editar = true;
        AccesosUci.nuevoRegistro = registro;
    }
    static editarRegistro() {
        AccesosUci.nuevoRegistro.editar = null;
        AccesosUci.registros.map((_v, _i) => {
            if (_v.nro == AccesosUci.nuevoRegistro.nro) {
                AccesosUci.registros[_i] = AccesosUci.nuevoRegistro;
            }
        });

    }
    static eliminarRegistro(obj) {

        let res = [];
        AccesosUci.registros.map((_v, _i) => {

            if (_v.nro !== obj.nro) {
                res.push(_v);
            }

        });

        AccesosUci.registros = res;

    }
    static getRegistros() {
        return AccesosUci.registros;
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
                    title: "Acceso:",
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
                    orderable: true,

                },
                {
                    mRender: function(data, type, full) {
                        return (full.id == 'Otros' ? full.otros : full.acceso);

                    },

                    visible: true,
                    aTargets: [3],
                    orderable: true,

                },
                {
                    mRender: function(data, type, full) {
                        return (full.ubicacion != null ? full.ubicacion : '<div class="text-center pd-l-0 pd-r-0"><hr style="border-color:#001737;"/></div>');
                    },
                    visible: true,
                    aTargets: [4],
                    orderable: true,

                },
                {
                    mRender: function(data, type, full) {
                        return (full.tipo != null ? full.tipo : '<div class="text-center pd-l-0 pd-r-0"><hr style="border-color:#001737;"/></div>');
                    },
                    visible: true,
                    aTargets: [5],
                    orderable: true,
                },
                {
                    mRender: function(data, type, full) {
                        return (full.inicio != null ? full.inicio : '<div class="text-center pd-l-0 pd-r-0"><hr style="border-color:#001737;"/></div>');
                    },
                    visible: true,
                    aTargets: [6],
                    orderable: true,


                },
                {
                    mRender: function(data, type, full) {
                        return (full.retiro != null ? full.retiro : '<div class="text-center pd-l-0 pd-r-0"><hr style="border-color:#001737;"/></div>');
                    },
                    visible: true,
                    aTargets: [7],
                    orderable: true,


                },
                {
                    mRender: function(data, type, full) {
                        return (full.cambio != null ? full.cambio : '<div class="text-center pd-l-0 pd-r-0"><hr style="border-color:#001737;"/></div>');
                    },
                    visible: true,
                    aTargets: [8],
                    orderable: true,


                },
                {
                    mRender: function(data, type, full) {
                        return (full.curacion != null ? full.curacion : '<div class="text-center pd-l-0 pd-r-0"><hr style="border-color:#001737;"/></div>');
                    },
                    visible: true,
                    aTargets: [9],
                    orderable: true,


                },
                {
                    mRender: function(data, type, full) {
                        return (full.condicion != null ? full.condicion : '<div class="text-center pd-l-0 pd-r-0"><hr style="border-color:#001737;"/></div>');
                    },
                    visible: true,
                    aTargets: [10],
                    orderable: true,


                },
                {
                    mRender: function(data, type, full) {
                        return (full.observacion != null ? full.observacion : '<div class="text-center pd-l-0 pd-r-0"><hr style="border-color:#001737;"/></div>');
                    },
                    visible: true,
                    aTargets: [11],
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
                                                    if (oData.id == 'Otros') {
                                                        AccesosUci.showOtros = true;
                                                    } else {
                                                        AccesosUci.showOtros = false;
                                                    }
                                                    AccesosUci.nuevoRegistro = null
                                                    AccesosUci.verRegistro(oData);
                                                },
                                            },
                                            'Editar',
                                        ),
                                        m("button.btn.btn-xs.btn-block.btn-outline-danger[type='button']", {
                                                class: (oData.editar ? '' : 'd-none'),
                                                disabled: (PacientesUCI.fechaHoraTurno != oData.fechaHoraTurno ? 'disabled' : ''),

                                                onclick: () => {
                                                    oData.editar = null;
                                                    AccesosUci.nuevoRegistro = null;
                                                },
                                            },
                                            'Cancelar Edición',
                                        ),
                                        m("button.btn.btn-xs.btn-danger[type='button']", {
                                                class: (oData.editar ? 'd-none' : ''),
                                                disabled: (TurnosUci.nuevoTurno !== null && TurnosUci.nuevoTurno.gestion == 1 ? (PacientesUCI.fechaHoraTurno != oData.fechaHoraTurno ? 'disabled' : '') : 'disabled'),

                                                onclick: () => {

                                                    if (confirm("¿Esta Ud seguro de eliminar este registro?") == true) {
                                                        AccesosUci.eliminarRegistro(oData);
                                                        FecthUci.eliminarSeccion(oData);
                                                        AccesosUci.nuevoRegistro = null;
                                                        PacientesUCI.vReloadTable('table-accesos', AccesosUci.getRegistros());
                                                    }




                                                },
                                            },
                                            'Eliminar',
                                        ),
                                        m("button.btn.btn-xs.btn-dark[type='button']", {
                                                class: (PacientesUCI.fechaHoraTurno != oData.fechaHoraTurno ? '' : 'd-none'),
                                                onclick: () => {
                                                    AccesosUci.iniciarRegistro();
                                                    AccesosUci.nuevoRegistro.id = oData.id;
                                                    AccesosUci.nuevoRegistro.acceso = oData.acceso;
                                                    AccesosUci.nuevoRegistro.ubicacion = oData.ubicacion;
                                                    AccesosUci.nuevoRegistro.tipo = oData.tipo;
                                                    AccesosUci.nuevoRegistro.inicio = oData.inicio;
                                                    AccesosUci.nuevoRegistro.retiro = oData.retiro;
                                                    AccesosUci.nuevoRegistro.curacion = oData.curacion;
                                                    AccesosUci.nuevoRegistro.condicion = oData.condicion;
                                                    AccesosUci.nuevoRegistro.observacion = oData.observacion;
                                                    AccesosUci.nuevoRegistro.numeroTurno = PacientesUCI.numeroTurno;
                                                    AccesosUci.nuevoRegistro.fechaHoraTurno = PacientesUCI.fechaHoraTurno;

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
                    aTargets: [12],
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
                    style: { "border-color": "#5173a1" }
                },

                m("tr.tx-uppercase", {

                    style: { "background-color": "#CCCCFF" },
                    onclick: () => {
                        AccesosUci.show = !AccesosUci.show;
                    }

                }, [
                    m("th.tx-semibold[scope='col'][colspan='12']",
                        "ACCESOS"
                    ),

                ])
            ),
            m("tbody.bd.bd-2", {
                style: { "border-color": "#5173a1" },
                class: (AccesosUci.show ? '' : 'd-none')
            }, [

                m("tr.bd.bd-2.tx-uppercase", {
                    style: { "background-color": "rgb(238, 249, 200)", "border-color": "#5173a1" },
                    class: (TurnosUci.nuevoTurno !== null && TurnosUci.nuevoTurno.gestion == 1 ? '' : 'd-none'),

                }, [
                    m("th[scope='col'][colspan='4']",
                        "ACCESO: "
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
                    m("td.tx-14.tx-normal.wd-40p[colspan='2']",
                        m('select.tx-semibold', {
                            id: 'sec_Accesos',
                            onchange: (e) => {
                                let _id = e.target.options[e.target.selectedIndex].id;
                                let _value = e.target.options[e.target.selectedIndex].value;
                                if (AccesosUci.nuevoRegistro == null) {
                                    AccesosUci.iniciarRegistro();
                                    AccesosUci.nuevoRegistro.id = _id;
                                    AccesosUci.nuevoRegistro.acceso = _value;
                                    if (AccesosUci.nuevoRegistro.id == 'Otros') {
                                        AccesosUci.showOtros = true;
                                    }
                                    if (AccesosUci.nuevoRegistro.id !== 'Otros') {
                                        AccesosUci.showOtros = false;
                                    }
                                } else {
                                    AccesosUci.nuevoRegistro.id = _id;
                                    AccesosUci.nuevoRegistro.acceso = _value;
                                    if (AccesosUci.nuevoRegistro.id == 'Otros') {
                                        AccesosUci.showOtros = true;
                                    }
                                    if (AccesosUci.nuevoRegistro.id !== 'Otros') {
                                        AccesosUci.showOtros = false;
                                    }
                                }
                            },
                            class: "custom-select",
                            value: (AccesosUci.nuevoRegistro !== null ? AccesosUci.nuevoRegistro.acceso : 0),
                        }, m("option[value='0']", 'Seleccione...'), [{
                                id: "CateterIntracraneal",
                                label: "CATETER INTRACRANEAL"
                            }, {
                                id: "AccesoIntraOseo",
                                label: "ACCESO INTRA-OSEO"
                            }, {
                                id: "TuboTraqueal",
                                label: "TUBO TRAQUEAL"
                            }, {
                                id: "TuboToracico",
                                label: "TUBO TORACICO"
                            }, {
                                id: "Traqueotomo",
                                label: "TRAQUEOTOMO"
                            }, {
                                id: "SondaNasogastrica",
                                label: "SONDA NASOGASTRICA"
                            }, {
                                id: "SondaOrogastrica",
                                label: "SONDA OROGASTRICA"
                            }, {
                                id: "SondaVesical",
                                label: "SONDA VESICAL"
                            },
                            {
                                id: "Gastrotomia",
                                label: "GASTROSTOMIA"
                            },
                            {
                                id: "Yeyuyostomia",
                                label: "YEYUYOSTOMIA"
                            },
                            {
                                id: "ManguerasVentilador",
                                label: "MANGUERAS DE VENTILADOR"
                            },
                            {
                                id: "EquiposNutricionEnteral",
                                label: "EQUIPOS DE NUTRICION ENTERAL"
                            },
                            {
                                id: "EquiposNutricionParenteral",
                                label: "EQUIPOS DE NUTRICION PARENTERAL"
                            },
                            {
                                id: "Microgoteros",
                                label: "MICROGOTEROS"
                            },
                            {
                                id: "EquipoVenoclisis",
                                label: "EQUIPO DE VENOCLISIS"
                            },
                            {
                                id: "Otros",
                                label: "OTROS"
                            }
                        ].map(x =>
                            m('option[id="' + x.id + '"]', x.label)
                        ))
                    ),
                    m("td.tx-14.tx-normal[colspan='2']", {
                        class: (AccesosUci.showOtros == false ? 'd-none' : '')
                    }, [
                        m('div.d-flex', [
                            (AccesosUci.nuevoRegistro !== null ? [
                                m("input", {
                                    id: "otrosAcceso" + AccesosUci.nuevoRegistro.id,
                                    class: "form-control tx-semibold tx-14",
                                    type: "text",
                                    placeholder: "Otros",
                                    value: AccesosUci.nuevoRegistro.otros,
                                    oninput: (e) => {
                                        AccesosUci.nuevoRegistro.otros = (e.target.value.length !== 0 ? e.target.value : null);
                                    },
                                })
                            ] : [])
                        ]),
                    ]),
                    m("td.tx-10.tx-normal.wd-40p[colspan='4']",
                        (AccesosUci.nuevoRegistro !== null ? [
                            m('select.tx-semibold', {
                                id: "ubicacion" + AccesosUci.nuevoRegistro.id,
                                oncreate: (el) => {
                                    if (AccesosUci.nuevoRegistro.ubicacion != undefined) {
                                        el.dom.value = AccesosUci.nuevoRegistro.ubicacion;
                                    }
                                },
                                onchange: (e) => {
                                    let _value = e.target.options[e.target.selectedIndex].value;
                                    AccesosUci.nuevoRegistro.ubicacion = _value;
                                },
                                class: "custom-select"
                            }, m('option', 'Seleccione...'), ['SUBDURAL', 'INTRAPARENQUIMATOSO', 'TIBIAL', 'NASO-TRAQUEAL', 'ORO-TRAQUEAL', 'SUBMAXILAR',
                                'TORAX DERECHO', 'TORAX IZQUIERDO', 'PLEURAL', 'MEDIASTINAL', 'TRAQUEA', 'FOSA NASAL DERECHA', 'FOSA NASAL IZQUIERDA', 'OROGASTRICA', 'EPIGASTRIO', 'YEYUNO', 'NO APLICA'
                            ].map(x =>
                                m('option', x)
                            ))
                        ] : [])


                    ),
                    m("td.tx-14.tx-normal.wd-40p[colspan='4']",
                        (AccesosUci.nuevoRegistro !== null ? [
                            m("input", {
                                id: "tipo" + AccesosUci.nuevoRegistro.id,
                                class: "form-control tx-semibold tx-14",
                                type: "text",
                                placeholder: "...",
                                oninput: (e) => {
                                    AccesosUci.nuevoRegistro.tipo = (e.target.value.length !== 0 ? e.target.value : null);
                                },
                                value: AccesosUci.nuevoRegistro.tipo
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
                        (AccesosUci.nuevoRegistro !== null ? [
                            m('div.d-flex', [
                                m("input.form-control[type='text'][placeholder='DD/MM/YYYY]", {
                                    id: "ifecha" + AccesosUci.nuevoRegistro.id,
                                    oncreate: (el) => {
                                        if (AccesosUci.nuevoRegistro.inicio != undefined) {
                                            el.dom.value = AccesosUci.nuevoRegistro.inicio;
                                        }
                                        setTimeout(() => {
                                            new Cleave("#ifecha" + AccesosUci.nuevoRegistro.id, {
                                                date: true,
                                                datePattern: ["d", "m", "Y"]
                                            });
                                        }, 50);
                                    },
                                    oninput: (e) => {
                                        setTimeout(() => {
                                            AccesosUci.nuevoRegistro.inicio = e.target.value;
                                        }, 50);
                                    },
                                })
                            ]),
                        ] : [])
                    ),
                    m("td.tx-14.tx-normal.wd-30p[colspan='3']",
                        (AccesosUci.nuevoRegistro !== null ? [
                            m('div.d-flex', [
                                m("input.form-control[type='text'][placeholder='DD/MM/YYYY]", {
                                    id: "rfecha" + AccesosUci.nuevoRegistro.id,
                                    oncreate: (el) => {
                                        if (AccesosUci.nuevoRegistro.retiro != undefined) {
                                            el.dom.value = AccesosUci.nuevoRegistro.retiro;
                                        }
                                        setTimeout(() => {
                                            new Cleave("#rfecha" + AccesosUci.nuevoRegistro.id, {
                                                date: true,
                                                datePattern: ["d", "m", "Y"]
                                            });
                                        }, 50);
                                    },
                                    oninput: (e) => {
                                        setTimeout(() => {
                                            AccesosUci.nuevoRegistro.retiro = e.target.value;
                                        }, 50);
                                    },
                                })

                            ])


                        ] : [])


                    ),
                    m("td.tx-14.tx-normal.wd-30p[colspan='3']",

                        (AccesosUci.nuevoRegistro !== null ? [
                            m('div.d-flex', [
                                m("input.form-control[type='text'][placeholder='DD/MM/YYYY]", {
                                    id: "cfecha" + AccesosUci.nuevoRegistro.id,
                                    oncreate: (el) => {
                                        if (AccesosUci.nuevoRegistro.cambio != undefined) {
                                            el.dom.value = AccesosUci.nuevoRegistro.cambio;
                                        }
                                        setTimeout(() => {
                                            new Cleave("#cfecha" + AccesosUci.nuevoRegistro.id, {
                                                date: true,
                                                datePattern: ["d", "m", "Y"]
                                            });
                                        }, 50);
                                    },
                                    oninput: (e) => {
                                        setTimeout(() => {
                                            AccesosUci.nuevoRegistro.cambio = e.target.value;
                                        }, 50);
                                    },
                                })

                            ])
                        ] : [

                        ])



                    ),
                    m("td.tx-14.tx-normal.wd-30p[colspan='3']",

                        (AccesosUci.nuevoRegistro !== null ? [
                            m('div.d-flex', [
                                m("input.form-control[type='text'][placeholder='DD/MM/YYYY]", {
                                    id: "cufecha" + AccesosUci.nuevoRegistro.id,
                                    oncreate: (el) => {
                                        if (AccesosUci.nuevoRegistro.curacion != undefined) {
                                            el.dom.value = AccesosUci.nuevoRegistro.curacion;
                                        }
                                        setTimeout(() => {
                                            new Cleave("#cufecha" + AccesosUci.nuevoRegistro.id, {
                                                date: true,
                                                datePattern: ["d", "m", "Y"]
                                            });
                                        }, 50);
                                    },
                                    oninput: (e) => {
                                        setTimeout(() => {
                                            AccesosUci.nuevoRegistro.curacion = e.target.value;
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


                    m("th[scope='col'][colspan='6']",
                        "CONDICIÓN: "
                    ),
                    m("th[scope='col'][colspan='6']",
                        "OBSERVACIÓN / TRAE: "
                    ),

                ]),
                m('tr.bd.bd-2', {
                    style: { "border-color": "#5173a1" },
                    class: (TurnosUci.nuevoTurno !== null && TurnosUci.nuevoTurno.gestion == 1 ? '' : 'd-none'),
                }, [
                    m("td.tx-14.tx-normal.wd-60p[colspan='6']",
                        (AccesosUci.nuevoRegistro !== null ? [

                            m("input", {
                                id: "condicion" + AccesosUci.nuevoRegistro.id,
                                class: "form-control tx-semibold tx-14",
                                type: "text",
                                placeholder: "...",
                                value: AccesosUci.nuevoRegistro.condicion,
                                oninput: (e) => {
                                    AccesosUci.nuevoRegistro.condicion = (e.target.value.length !== 0 ? e.target.value : null);
                                },
                            })
                        ] : [])


                    ),
                    m("td.tx-14.tx-normal.wd-60p[colspan='6']",
                        (AccesosUci.nuevoRegistro !== null ? [
                            m("input", {
                                id: "observacion" + AccesosUci.nuevoRegistro.id,
                                class: "form-control tx-semibold tx-14",
                                type: "text",
                                placeholder: "...",
                                value: AccesosUci.nuevoRegistro.observacion,
                                onkeypress: (e) => {
                                    if (e.keyCode == 13) {
                                        AccesosUci.nuevoRegistro.numeroTurno = PacientesUCI.numeroTurno;
                                        AccesosUci.nuevoRegistro.fechaHoraTurno = PacientesUCI.fechaHoraTurno;
                                        if (AccesosUci.nuevoRegistro.editar == null) {
                                            AccesosUci.agregarRegistro();
                                            FecthUci.registrarSeccion(AccesosUci.nuevoRegistro);
                                            PacientesUCI.vReloadTable('table-accesos', AccesosUci.getRegistros());
                                            AccesosUci.nuevoRegistro = null;
                                        } else {
                                            AccesosUci.editarRegistro();
                                            FecthUci.actualizarSeccion(AccesosUci.nuevoRegistro);
                                            PacientesUCI.vReloadTable('table-accesos', AccesosUci.getRegistros());
                                            AccesosUci.nuevoRegistro = null;
                                        }
                                    }
                                },
                                oninput: (e) => {
                                    AccesosUci.nuevoRegistro.observacion = (e.target.value.length !== 0 ? e.target.value : null);
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
                        (AccesosUci.show != false ? [PacientesUCI.vTable('table-accesos', AccesosUci.getRegistros(), AccesosUci.arqTable())] : [])
                    ),
                ]),
            ]),
        ]
    }
}

export default AccesosUci;