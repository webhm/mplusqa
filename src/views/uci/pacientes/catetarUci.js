import m from "mithril";
import App from "../../../models/App";
import Loader from "../../utils/loader";
import Errors from "../../utils/errors";
import PacientesUCI from "./pacientesUci";
import FecthUci from "./fecthUci";
import TurnosUci from "./turnosUci";

class Cateter {
    id = null;
    nro = null;
    fechaHoraTurno = null;
    cateter = null;
    am = null;
    pm = null;
    hs = null;
    editar = null;
    observacion = null;
    seccion = 'Cateter';
    constructor() {
        this.id = this.id;
        this.nro = this.nro;
        this.fechaHoraTurno = this.fechaHoraTurno;
        this.cateter = this.cateter;
        this.am = this.am;
        this.pm = this.pm;
        this.hs = this.hs;
        this.editar = this.editar;
        this.observacion = this.observacion;
        this.seccion = this.seccion;

    }
}


class CateterUci {

    static registros = [];
    static nuevoRegistro = null;
    static show = false;

    static validarRegistro() {

    }
    static iniciarRegistro() {
        CateterUci.nuevoRegistro = new Cateter();
    }
    static agregarRegistro() {
        if (CateterUci.registros.length == 0) {
            CateterUci.nuevoRegistro.nro = 1;
            CateterUci.registros.push(CateterUci.nuevoRegistro);
        } else {
            CateterUci.nuevoRegistro.nro = (CateterUci.registros[CateterUci.registros.length - 1].nro + 1);
            CateterUci.registros.push(CateterUci.nuevoRegistro);
        }
    }
    static verRegistro(registro) {
        registro.editar = true;
        CateterUci.nuevoRegistro = registro;
        console.log(CateterUci.nuevoRegistro)
    }
    static editarRegistro() {
        CateterUci.nuevoRegistro.editar = null;
        CateterUci.registros.map((_v, _i) => {
            if (_v.nro == CateterUci.nuevoRegistro.nro) {
                CateterUci.registros[_i] = CateterUci.nuevoRegistro;
            }
        });

    }
    static eliminarRegistro(obj) {

        let res = [];
        CateterUci.registros.map((_v, _i) => {

            if (_v.nro !== obj.nro) {
                res.push(_v);
            }

        });

        CateterUci.registros = res;

    }
    static getRegistros() {
        return CateterUci.registros;
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
                [0, 'desc']
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
                    title: "Cateter:",
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
                {
                    title: "Opciones:",
                }
            ],
            aoColumnDefs: [{
                    mRender: function(data, type, full) {
                        return full.numeroTurno;
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
                                                class: (PacientesUCI.numeroTurno != oData.numeroTurno ? 'bg-light' : 'bg-warning')
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
                        return full.cateter;
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
                {
                    fnCreatedCell: function(nTd, sData, oData, iRow, iCol) {
                        return m.mount(nTd, {
                            view: () => {
                                return [
                                    m("div.btn-block.btn-group.wd-100p.pd-5", [
                                        m("button.btn.btn-xs.btn-success[type='button']", {
                                                class: (oData.editar ? 'd-none' : ''),
                                                disabled: (TurnosUci.nuevoTurno !== null && TurnosUci.nuevoTurno.gestion == 1 ? (PacientesUCI.numeroTurno != oData.numeroTurno ? 'disabled' : '') : 'disabled'),
                                                onclick: () => {
                                                    CateterUci.nuevoRegistro = null
                                                    CateterUci.verRegistro(oData);
                                                },
                                            },
                                            'Editar',
                                        ),
                                        m("button.btn.btn-xs.btn-block.btn-outline-danger[type='button']", {
                                                class: (oData.editar ? '' : 'd-none'),
                                                disabled: (PacientesUCI.numeroTurno != oData.numeroTurno ? 'disabled' : ''),

                                                onclick: () => {
                                                    oData.editar = null;
                                                    CateterUci.nuevoRegistro = null;
                                                },
                                            },
                                            'Cancelar Edición',
                                        ),

                                    ])

                                ]
                            }
                        });
                    },
                    width: '5%',
                    visible: true,
                    aTargets: [8],
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
                    class: (CateterUci.show ? '' : 'd-none')

                }, [
                    m("th.tx-semibold[scope='col'][colspan='12']",
                        "CATETER URINARIO:"
                    ),

                ])
            ),
            m("tbody.bd.bd-2", {
                style: { "border-color": "#5173a1" },
                class: (CateterUci.show ? '' : 'd-none')
            }, [



                m("tr.bd.bd-2.tx-uppercase", {
                    style: { "background-color": "rgb(238, 249, 200)", "border-color": "#5173a1" },
                    class: (TurnosUci.nuevoTurno !== null && TurnosUci.nuevoTurno.gestion == 1 ? '' : 'd-none'),
                }, [
                    m("th[scope='col'][colspan='3']",
                        "CATETER: "
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
                        (CateterUci.nuevoRegistro !== null ? [
                            m('div.d-flex', [
                                m("input", {
                                    class: "form-control tx-semibold tx-14",
                                    type: "text",
                                    placeholder: "...",
                                    disabled: true,
                                    value: CateterUci.nuevoRegistro.cateter,
                                })

                            ]),
                        ] : [])
                    ),
                    m("td.tx-14.tx-normal.d-none[colspan='3']",
                        m('select.tx-semibold', {
                            id: 'sec_Cateter',
                            disabled: true,
                            onchange: (e) => {
                                let _id = e.target.options[e.target.selectedIndex].id;
                                let _value = e.target.options[e.target.selectedIndex].value;
                            },
                            class: "custom-select",
                            value: (CateterUci.nuevoRegistro !== null ? CateterUci.nuevoRegistro.cateter : 0),
                        }, m("option[value='0']", 'Seleccione...'), [{
                                id: "RecoletcorVejiga",
                                label: "RECOLECTOR MAS ABAJO QUE VEJIGA"
                            }, {
                                id: "RecolectorNoTocaPiso",
                                label: "RECOLECTOR NO TOCA PISO"
                            }, {
                                id: "OrinaRecolector",
                                label: "ORINA HASTA 50% EN RECOLECTOR"
                            },
                            {
                                id: "SondaFijadaMuslo",
                                label: "SONDA FIJADA EN MUSLO"
                            },
                            {
                                id: "RegistroAseoGenital",
                                label: "REGISTRO DE ASEO GENITAL"
                            },
                            {
                                id: "RegistroDiasCateter",
                                label: "REGISTRO N° DE DIAS DE CATETER"
                            }
                        ].map(x =>
                            m('option[id="' + x.id + '"]', x.label)
                        ))
                    ),
                    m("td.tx-14.tx-normal[colspan='3']",
                        (CateterUci.nuevoRegistro !== null ? [
                            m('div.d-flex', [
                                m("input", {
                                    id: "am" + CateterUci.nuevoRegistro.id,
                                    class: "form-control tx-semibold tx-14",
                                    type: "text",
                                    placeholder: "...",
                                    oninput: (e) => {
                                        CateterUci.nuevoRegistro.am = e.target.value;
                                    },
                                    value: CateterUci.nuevoRegistro.am,

                                })

                            ]),
                        ] : [])
                    ),
                    m("td.tx-14.tx-normal[colspan='3']",
                        (CateterUci.nuevoRegistro !== null ? [
                            m('div.d-flex', [
                                m("input", {
                                    id: "pm" + CateterUci.nuevoRegistro.id,
                                    class: "form-control tx-semibold tx-14",
                                    type: "text",
                                    placeholder: "...",
                                    oninput: (e) => {
                                        CateterUci.nuevoRegistro.pm = e.target.value;
                                    },
                                    value: CateterUci.nuevoRegistro.pm,

                                })

                            ]),
                        ] : [])
                    ),

                    m("td.tx-14.tx-normal[colspan='3']",
                        (CateterUci.nuevoRegistro !== null ? [
                            m('div.d-flex', [
                                m("input", {
                                    id: "hs" + CateterUci.nuevoRegistro.id,
                                    class: "form-control tx-semibold tx-14",
                                    type: "text",
                                    placeholder: "...",
                                    oninput: (e) => {
                                        CateterUci.nuevoRegistro.hs = e.target.value;
                                    },
                                    value: CateterUci.nuevoRegistro.hs,

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
                m('tr.bd.bd-2', {
                    style: { "border-color": "#5173a1" },
                    class: (TurnosUci.nuevoTurno !== null && TurnosUci.nuevoTurno.gestion == 1 ? '' : 'd-none'),
                }, [
                    m("td.tx-14.tx-normal[colspan='12']",
                        (CateterUci.nuevoRegistro !== null ? [
                            m("input", {
                                id: "observacion" + CateterUci.nuevoRegistro.id,
                                class: "form-control tx-semibold tx-14",
                                type: "text",
                                placeholder: "...",

                                onkeypress: (e) => {
                                    if (e.keyCode == 13) {
                                        CateterUci.nuevoRegistro.numeroTurno = PacientesUCI.numeroTurno;
                                        CateterUci.nuevoRegistro.fechaHoraTurno = PacientesUCI.fechaHoraTurno;
                                        if (CateterUci.nuevoRegistro.editar == null) {
                                            CateterUci.agregarRegistro();
                                            FecthUci.registrarSeccion(CateterUci.nuevoRegistro);
                                            PacientesUCI.vReloadTable('table-cateter', CateterUci.getRegistros());
                                            CateterUci.nuevoRegistro = null;
                                        } else {
                                            CateterUci.editarRegistro();
                                            FecthUci.actualizarSeccion(CateterUci.nuevoRegistro);
                                            PacientesUCI.vReloadTable('table-cateter', CateterUci.getRegistros());
                                            CateterUci.nuevoRegistro = null;
                                        }
                                    }
                                },
                                oninput: (e) => {
                                    CateterUci.nuevoRegistro.observacion = e.target.value;
                                },
                                value: CateterUci.nuevoRegistro.observacion,
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
                        (CateterUci.show != false ? [PacientesUCI.vTable('table-cateter', CateterUci.getRegistros(), CateterUci.arqTable())] : [])

                    ),
                ]),
            ]),
        ]
    }
}

export default CateterUci;