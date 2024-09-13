import m from "mithril";
import App from "../../../models/App";
import Loader from "../../utils/loader";
import Errors from "../../utils/errors";
import PacientesUCI from "./pacientesUci";
import FecthUci from "./fecthUci";
import TurnosUci from "./turnosUci";

class Oxi {
    id = null;
    nro = null;
    fechaHoraTurno = null;
    oxi = null;
    am = null;
    pm = null;
    hs = null;
    observacion = null;
    editar = null;
    seccion = 'Oxigenacion';
    constructor() {
        this.id = this.id;
        this.nro = this.nro;
        this.fechaHoraTurno = this.fechaHoraTurno;
        this.oxi = this.oxi;
        this.am = this.am;
        this.pm = this.pm;
        this.hs = this.hs;
        this.observacion = this.observacion;
        this.editar = this.editar;
        this.seccion = this.seccion;
    }
}


class OxigenacionUci {
    static allRegistros = [];
    static registros = [];
    static nuevoRegistro = null;
    static show = false;
    static validarRegistro() {

    }
    static iniciarRegistro() {
        OxigenacionUci.nuevoRegistro = new Oxi();
    }
    static agregarRegistro() {
        if (OxigenacionUci.registros.length == 0) {
            OxigenacionUci.nuevoRegistro.nro = 1;
            OxigenacionUci.registros.push(OxigenacionUci.nuevoRegistro);
        } else {
            OxigenacionUci.nuevoRegistro.nro = (OxigenacionUci.registros[OxigenacionUci.registros.length - 1].nro + 1);
            OxigenacionUci.registros.push(OxigenacionUci.nuevoRegistro);
        }

    }
    static verRegistro(registro) {
        registro.editar = true;
        OxigenacionUci.nuevoRegistro = registro;
        console.log(OxigenacionUci.nuevoRegistro)
    }
    static editarRegistro() {
        OxigenacionUci.nuevoRegistro.editar = null;
        OxigenacionUci.registros.map((_v, _i) => {
            if (_v.nro == OxigenacionUci.nuevoRegistro.nro) {
                OxigenacionUci.registros[_i] = OxigenacionUci.nuevoRegistro;
            }
        });

    }
    static eliminarRegistro(obj) {

        OxigenacionUci.registros = PacientesUCI.extractSeccion(Array.from(document.getElementById('sec_Oxigenacion').options));

        let hash = {};
        let res = [];
        let _arr = [];
        let result = [];
        let resultId = [];

        OxigenacionUci.registros.map((_v, _i) => {
            if (_v.nro !== obj.nro) {
                res.push(_v);
            }
        });

        result = res.sort((a, b) => b.nro - a.nro);

        resultId = result.filter(o => hash[o.id] ? false : hash[o.id] = true);
        // Ordenar desc
        _arr = resultId.sort((a, b) => a.nro - b.nro);

        OxigenacionUci.registros = _arr;

    }

    static filterRegistros() {

        let result = [];
        let resultId = [];
        let _arr = [];
        let hash = {};

        result = OxigenacionUci.allRegistros.sort((a, b) => b.nro - a.nro);
        // Quitar duplicados
        resultId = result.filter(o => hash[o.id] ? false : hash[o.id] = true);
        // Ordenar desc
        _arr = resultId.sort((a, b) => a.nro - b.nro);

        OxigenacionUci.registros = _arr;

    }

    static copyAllRegistros() {

        let re = [];
        let res = [];
        let result = [];
        let resultNro = [];
        let hash = {};

        re = OxigenacionUci.allRegistros;

        result = re.sort((a, b) => b.nro - a.nro);
        // Quitar duplicados
        resultNro = result.filter(o => hash[o.id] ? false : hash[o.id] = true).sort((a, b) => a.nro - b.nro);

        resultNro.map((_v, _i) => {
            OxigenacionUci.iniciarRegistro();
            OxigenacionUci.nuevoRegistro.id = _v.id;
            OxigenacionUci.nuevoRegistro.oxi = _v.oxi;
            if (PacientesUCI.numeroTurno != 1) {
                OxigenacionUci.nuevoRegistro.observacion = _v.observacion;
                OxigenacionUci.nuevoRegistro.am = _v.am;
                OxigenacionUci.nuevoRegistro.pm = _v.pm;
                OxigenacionUci.nuevoRegistro.hs = _v.hs;
            }
            OxigenacionUci.nuevoRegistro.numeroTurno = PacientesUCI.numeroTurno;
            OxigenacionUci.nuevoRegistro.fechaHoraTurno = PacientesUCI.fechaHoraTurno;
            res.push(OxigenacionUci.nuevoRegistro);
            OxigenacionUci.nuevoRegistro = null;
        });


        OxigenacionUci.allRegistros.push.apply(OxigenacionUci.allRegistros, res);
        // Asignar Nro

        OxigenacionUci.allRegistros.map((_v, _i) => {
            if (_v.nro == null) {
                OxigenacionUci.allRegistros[_i].nro = (_i + 1);
                if (_v.id == res.id) {
                    res.nro = OxigenacionUci.allRegistros[_i].nro;
                }
            }
        });


        console.log(7788, res)

        OxigenacionUci.filterRegistros();
        PacientesUCI.vReloadTable('table-oxigenacion', OxigenacionUci.getRegistros());
        FecthUci.registrarAllSeccion(res);

    }

    static getRegistros() {
        return OxigenacionUci.registros;
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
                title: "Oxigenación:",
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
                    return full.oxi;
                },

                visible: true,
                aTargets: [3],
                orderable: true,

            },
            {
                fnCreatedCell: function (nTd, sData, oData, iRow, iCol) {
                    return m.mount(nTd, {
                        view: () => {
                            return [
                                m('div.pd-10', {
                                    class: (oData.editar == true ? 'd-none' : ''),
                                    ondblclick: (e) => {
                                        OxigenacionUci.nuevoRegistro = null
                                        OxigenacionUci.verRegistro(oData);
                                    },
                                }, (oData.am !== null ? oData.am : m.trust('<div class="text-center pd-l-0 pd-r-0"><hr style="border-color:#001737;"/></div>'))),
                                (OxigenacionUci.nuevoRegistro !== null ? [
                                    m("input", {
                                        id: "am" + OxigenacionUci.nuevoRegistro.id,
                                        class: "form-control tx-semibold tx-14 " + (oData.editar == true ? '' : 'd-none'),
                                        type: "text",
                                        placeholder: "...",
                                        ondblclick: (e) => {
                                            oData.editar = null;
                                            OxigenacionUci.nuevoRegistro = null
                                        },
                                        onkeypress: (e) => {
                                            if (e.keyCode == 13) {

                                                OxigenacionUci.nuevoRegistro.numeroTurno = PacientesUCI.numeroTurno;
                                                OxigenacionUci.nuevoRegistro.fechaHoraTurno = PacientesUCI.fechaHoraTurno;
                                                console.log(99, OxigenacionUci.nuevoRegistro)

                                                // throw 'AA';
                                                if (OxigenacionUci.nuevoRegistro.editar == null) {
                                                    OxigenacionUci.agregarRegistro();
                                                    FecthUci.registrarSeccion(OxigenacionUci.nuevoRegistro);
                                                    OxigenacionUci.nuevoRegistro = null;
                                                    OxigenacionUci.filterRegistros();
                                                    PacientesUCI.vReloadTable('table-oxigenacion', OxigenacionUci.getRegistros());
                                                } else {
                                                    OxigenacionUci.editarRegistro();
                                                    FecthUci.actualizarSeccion(OxigenacionUci.nuevoRegistro);
                                                    OxigenacionUci.nuevoRegistro = null;
                                                    OxigenacionUci.filterRegistros();
                                                    PacientesUCI.vReloadTable('table-oxigenacion', OxigenacionUci.getRegistros());

                                                }


                                            }
                                        },
                                        oninput: (e) => {
                                            if (PacientesUCI.numeroTurno == 1) {
                                                OxigenacionUci.nuevoRegistro.am = (e.target.value.length !== 0 ? e.target.value : null);
                                            } else {
                                                e.preventDefault();
                                            }
                                        },
                                        value: (OxigenacionUci.nuevoRegistro.am !== null ? OxigenacionUci.nuevoRegistro.am : '')
                                    })
                                ] : [])

                            ]
                        }
                    });
                },
                visible: true,
                aTargets: [4],
                orderable: true,

            },
            {
                fnCreatedCell: function (nTd, sData, oData, iRow, iCol) {
                    return m.mount(nTd, {
                        view: () => {
                            return [
                                m('div.pd-10', {
                                    class: (oData.editar == true ? 'd-none' : ''),
                                    ondblclick: (e) => {
                                        OxigenacionUci.nuevoRegistro = null
                                        OxigenacionUci.verRegistro(oData);
                                    },
                                }, (oData.pm !== null ? oData.pm : m.trust('<div class="text-center pd-l-0 pd-r-0"><hr style="border-color:#001737;"/></div>'))),
                                (OxigenacionUci.nuevoRegistro !== null ? [
                                    m("input", {
                                        id: "pm" + OxigenacionUci.nuevoRegistro.id,
                                        class: "form-control tx-semibold tx-14 " + (oData.editar == true ? '' : 'd-none'),
                                        type: "text",
                                        placeholder: "...",
                                        ondblclick: (e) => {
                                            oData.editar = null;
                                            OxigenacionUci.nuevoRegistro = null
                                        },
                                        onkeypress: (e) => {
                                            if (e.keyCode == 13) {

                                                OxigenacionUci.nuevoRegistro.numeroTurno = PacientesUCI.numeroTurno;
                                                OxigenacionUci.nuevoRegistro.fechaHoraTurno = PacientesUCI.fechaHoraTurno;
                                                console.log(99, OxigenacionUci.nuevoRegistro)

                                                // throw 'AA';
                                                if (OxigenacionUci.nuevoRegistro.editar == null) {
                                                    OxigenacionUci.agregarRegistro();
                                                    FecthUci.registrarSeccion(OxigenacionUci.nuevoRegistro);
                                                    OxigenacionUci.nuevoRegistro = null;
                                                    OxigenacionUci.filterRegistros();
                                                    PacientesUCI.vReloadTable('table-oxigenacion', OxigenacionUci.getRegistros());
                                                } else {
                                                    OxigenacionUci.editarRegistro();
                                                    FecthUci.actualizarSeccion(OxigenacionUci.nuevoRegistro);
                                                    OxigenacionUci.nuevoRegistro = null;
                                                    OxigenacionUci.filterRegistros();
                                                    PacientesUCI.vReloadTable('table-oxigenacion', OxigenacionUci.getRegistros());

                                                }


                                            }
                                        },
                                        oninput: (e) => {
                                            if (PacientesUCI.numeroTurno == 2) {
                                                OxigenacionUci.nuevoRegistro.pm = (e.target.value.length !== 0 ? e.target.value : null);
                                            } else {
                                                e.preventDefault();
                                            }
                                        },
                                        value: (OxigenacionUci.nuevoRegistro.pm !== null ? OxigenacionUci.nuevoRegistro.pm : '')
                                    })
                                ] : [])

                            ]
                        }
                    });
                },
                visible: true,
                aTargets: [5],
                orderable: true,
            },
            {
                fnCreatedCell: function (nTd, sData, oData, iRow, iCol) {
                    return m.mount(nTd, {
                        view: () => {
                            return [
                                m('div.pd-10', {
                                    class: (oData.editar == true ? 'd-none' : ''),
                                    ondblclick: (e) => {
                                        OxigenacionUci.nuevoRegistro = null
                                        OxigenacionUci.verRegistro(oData);
                                    },
                                }, (oData.hs !== null ? oData.hs : m.trust('<div class="text-center pd-l-0 pd-r-0"><hr style="border-color:#001737;"/></div>'))),
                                (OxigenacionUci.nuevoRegistro !== null ? [
                                    m("input", {
                                        id: "hs" + OxigenacionUci.nuevoRegistro.id,
                                        class: "form-control tx-semibold tx-14 " + (oData.editar == true ? '' : 'd-none'),
                                        type: "text",
                                        placeholder: "...",
                                        ondblclick: (e) => {
                                            oData.editar = null;
                                            OxigenacionUci.nuevoRegistro = null
                                        },
                                        onkeypress: (e) => {
                                            if (e.keyCode == 13) {

                                                OxigenacionUci.nuevoRegistro.numeroTurno = PacientesUCI.numeroTurno;
                                                OxigenacionUci.nuevoRegistro.fechaHoraTurno = PacientesUCI.fechaHoraTurno;
                                                console.log(99, OxigenacionUci.nuevoRegistro)

                                                // throw 'AA';
                                                if (OxigenacionUci.nuevoRegistro.editar == null) {
                                                    OxigenacionUci.agregarRegistro();
                                                    FecthUci.registrarSeccion(OxigenacionUci.nuevoRegistro);
                                                    OxigenacionUci.nuevoRegistro = null;
                                                    OxigenacionUci.filterRegistros();
                                                    PacientesUCI.vReloadTable('table-oxigenacion', OxigenacionUci.getRegistros());
                                                } else {
                                                    OxigenacionUci.editarRegistro();
                                                    FecthUci.actualizarSeccion(OxigenacionUci.nuevoRegistro);
                                                    OxigenacionUci.nuevoRegistro = null;
                                                    OxigenacionUci.filterRegistros();
                                                    PacientesUCI.vReloadTable('table-oxigenacion', OxigenacionUci.getRegistros());

                                                }


                                            }
                                        },

                                        oninput: (e) => {
                                            if (PacientesUCI.numeroTurno == 3) {
                                                OxigenacionUci.nuevoRegistro.hs = (e.target.value.length !== 0 ? e.target.value : null);
                                            } else {
                                                e.preventDefault();
                                            }
                                        },
                                        value: (OxigenacionUci.nuevoRegistro.hs !== null ? OxigenacionUci.nuevoRegistro.hs : '')

                                    })
                                ] : [])

                            ]
                        }
                    });
                },
                visible: true,
                aTargets: [6],
                orderable: true,


            },
            {
                fnCreatedCell: function (nTd, sData, oData, iRow, iCol) {
                    return m.mount(nTd, {
                        view: () => {
                            return [
                                m('div.pd-10', {
                                    class: (oData.editar == true ? 'd-none' : ''),
                                    ondblclick: (e) => {
                                        OxigenacionUci.nuevoRegistro = null
                                        OxigenacionUci.verRegistro(oData);
                                    },
                                }, (oData.observacion !== null ? oData.observacion : m.trust('<div class="text-center pd-l-0 pd-r-0"><hr style="border-color:#001737;"/></div>'))),
                                (OxigenacionUci.nuevoRegistro !== null ? [
                                    m("input", {
                                        id: "observacion" + OxigenacionUci.nuevoRegistro.id,
                                        class: "form-control tx-semibold tx-14 " + (oData.editar == true ? '' : 'd-none'),
                                        type: "text",
                                        placeholder: "...",
                                        onkeypress: (e) => {
                                            if (e.keyCode == 13) {

                                                OxigenacionUci.nuevoRegistro.numeroTurno = PacientesUCI.numeroTurno;
                                                OxigenacionUci.nuevoRegistro.fechaHoraTurno = PacientesUCI.fechaHoraTurno;
                                                console.log(99, OxigenacionUci.nuevoRegistro)

                                                // throw 'AA';
                                                if (OxigenacionUci.nuevoRegistro.editar == null) {
                                                    OxigenacionUci.agregarRegistro();
                                                    FecthUci.registrarSeccion(OxigenacionUci.nuevoRegistro);
                                                    OxigenacionUci.nuevoRegistro = null;
                                                    OxigenacionUci.filterRegistros();
                                                    PacientesUCI.vReloadTable('table-oxigenacion', OxigenacionUci.getRegistros());
                                                } else {
                                                    OxigenacionUci.editarRegistro();
                                                    FecthUci.actualizarSeccion(OxigenacionUci.nuevoRegistro);
                                                    OxigenacionUci.nuevoRegistro = null;
                                                    OxigenacionUci.filterRegistros();
                                                    PacientesUCI.vReloadTable('table-oxigenacion', OxigenacionUci.getRegistros());

                                                }


                                            }
                                        },
                                        ondblclick: (e) => {
                                            oData.editar = null;
                                            OxigenacionUci.nuevoRegistro = null
                                        },
                                        oninput: (e) => {
                                            OxigenacionUci.nuevoRegistro.observacion = (e.target.value.length !== 0 ? e.target.value : null);
                                        },
                                        value: (OxigenacionUci.nuevoRegistro.observacion !== null ? OxigenacionUci.nuevoRegistro.observacion : '')

                                    })
                                ] : [])

                            ]
                        }
                    });
                },
                visible: true,
                aTargets: [7],
                orderable: true,


            },
            {
                fnCreatedCell: function (nTd, sData, oData, iRow, iCol) {
                    return m.mount(nTd, {
                        view: () => {
                            return [
                                m("div.btn-block.btn-group.wd-100p.pd-5", [
                                    m("button.btn.btn-xs.btn-success.d-none[type='button']", {
                                        class: (oData.editar ? 'd-none' : ''),
                                        disabled: (TurnosUci.nuevoTurno !== null && TurnosUci.nuevoTurno.gestion == 1 ? (PacientesUCI.fechaHoraTurno != oData.fechaHoraTurno ? 'disabled' : '') : 'disabled'),
                                        onclick: () => {
                                            OxigenacionUci.nuevoRegistro = null
                                            OxigenacionUci.verRegistro(oData);
                                        },
                                    },
                                        'Editar',
                                    ),
                                    m("button.btn.btn-xs.btn-block.btn-danger[type='button']", {
                                        class: (oData.editar ? '' : 'd-none'),
                                        disabled: (PacientesUCI.fechaHoraTurno != oData.fechaHoraTurno ? 'disabled' : ''),

                                        onclick: () => {
                                            oData.editar = null;
                                            OxigenacionUci.nuevoRegistro = null;
                                        },
                                    },
                                        'Cancelar Edición',
                                    ),
                                    m("button.btn.btn-xs.btn-dark[type='button']", {
                                        class: (PacientesUCI.fechaHoraTurno != oData.fechaHoraTurno && oData.id == 'AireAmbiente' ? '' : 'd-none'),
                                        onclick: () => {
                                            OxigenacionUci.copyAllRegistros();

                                        },
                                    },
                                        'Copiar',
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
            fnRowCallback: function (nRow, aData, iDisplayIndex, iDisplayIndexFull) {

            },
        };
    }

    static destroyTable() {
        let table = document.getElementById('table-oxigenacion');
        // clear first
        if (table != null) {
            $('#table-oxigenacion').DataTable().clear().destroy();
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
                        if (OxigenacionUci.show) {
                            OxigenacionUci.destroyTable();
                        }
                        OxigenacionUci.show = !OxigenacionUci.show;
                    }

                }, [
                    m("th.tx-semibold[scope='col'][colspan='12']",
                        "OXIGENACIÓN"
                    ),

                ])
            ),
            m("tbody.bd.bd-2", {
                style: { "border-color": "#5173a1" },
                class: (OxigenacionUci.show ? '' : 'd-none')
            }, [
                m("tr.bd.bd-2.tx-uppercase.d-none", {
                    style: { "background-color": "rgb(238, 249, 200)", "border-color": "#5173a1" },
                    class: (TurnosUci.nuevoTurno !== null && TurnosUci.nuevoTurno.gestion == 1 ? '' : 'd-none'),
                }, [
                    m("th[scope='col'][colspan='3']",
                        "Oxigenación:"
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
                m("tr.bd.bd-2.d-none", {
                    style: { "border-color": "#5173a1" },
                    class: (TurnosUci.nuevoTurno !== null && TurnosUci.nuevoTurno.gestion == 1 ? '' : 'd-none'),
                }, [
                    m("td.tx-14.tx-normal.d-none[colspan='3']",
                        (OxigenacionUci.nuevoRegistro !== null ? [
                            m('div.d-flex', [
                                m("input", {
                                    class: "form-control tx-semibold tx-14",
                                    type: "text",
                                    placeholder: "...",
                                    disabled: true,
                                    value: OxigenacionUci.nuevoRegistro.oxi,
                                })

                            ]),
                        ] : [])
                    ),
                    m("td.tx-14.tx-normal.d-none[colspan='3']",
                        m('select.tx-semibold', {
                            id: 'sec_Oxigenacion',
                            disabled: true,
                            onchange: (e) => {
                                let _id = e.target.options[e.target.selectedIndex].id;
                                let _value = e.target.options[e.target.selectedIndex].value;
                                OxigenacionUci.iniciarRegistro();
                                OxigenacionUci.nuevoRegistro.id = _id;
                                OxigenacionUci.nuevoRegistro.oxi = _value;
                            },
                            class: "custom-select",
                            value: (OxigenacionUci.nuevoRegistro !== null ? OxigenacionUci.nuevoRegistro.oxi : 0),
                        }, m("option[value='0']", 'Seleccione...'), [{
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
                    ),
                    m("td.tx-14.tx-normal.d-none[colspan='3']",
                        (OxigenacionUci.nuevoRegistro !== null ? [
                            m('div.d-flex', [
                                m("input", {
                                    id: "_am" + OxigenacionUci.nuevoRegistro.id,
                                    class: "form-control tx-semibold tx-14",
                                    type: "text",
                                    placeholder: "...",
                                    oninput: (e) => {
                                        if (PacientesUCI.numeroTurno == 1) {
                                            OxigenacionUci.nuevoRegistro.am = (e.target.value.length !== 0 ? e.target.value : null);
                                        } else {
                                            e.target.value = '';
                                        }
                                    },
                                    value: OxigenacionUci.nuevoRegistro.am

                                })

                            ]),
                        ] : [])
                    ),
                    m("td.tx-14.tx-normal.d-none[colspan='3']",
                        (OxigenacionUci.nuevoRegistro !== null ? [
                            m('div.d-flex', [
                                m("input", {
                                    id: "_pm" + OxigenacionUci.nuevoRegistro.id,
                                    class: "form-control tx-semibold tx-14",
                                    type: "text",
                                    placeholder: "...",
                                    oninput: (e) => {
                                        if (PacientesUCI.numeroTurno == 2) {
                                            OxigenacionUci.nuevoRegistro.pm = (e.target.value.length !== 0 ? e.target.value : null);
                                        } else {
                                            e.target.value = '';
                                        }
                                    },
                                    value: OxigenacionUci.nuevoRegistro.pm

                                })

                            ]),
                        ] : [])
                    ),

                    m("td.tx-14.tx-normal.d-none[colspan='3']",
                        (OxigenacionUci.nuevoRegistro !== null ? [
                            m('div.d-flex', [
                                m("input", {
                                    id: "_hs" + OxigenacionUci.nuevoRegistro.id,
                                    class: "form-control tx-semibold tx-14",
                                    type: "text",
                                    placeholder: "...",
                                    oninput: (e) => {
                                        if (PacientesUCI.numeroTurno == 3) {
                                            OxigenacionUci.nuevoRegistro.hs = (e.target.value.length !== 0 ? e.target.value : null);
                                        } else {
                                            e.target.value = '';
                                        }
                                    },
                                    value: OxigenacionUci.nuevoRegistro.hs

                                })

                            ]),
                        ] : [])
                    ),
                ]),
                m("tr.bd.bd-2.tx-uppercase.d-none", {
                    style: { "background-color": "rgb(238, 249, 200)", "border-color": "#5173a1" },
                    class: (TurnosUci.nuevoTurno !== null && TurnosUci.nuevoTurno.gestion == 1 ? '' : 'd-none'),
                }, [
                    m("th[scope='col'][colspan='12']",
                        "OBSERVACIÓN: "
                    ),


                ]),
                m("tr.bd.bd-2.d-none", {
                    style: { "border-color": "#5173a1" },
                    class: (TurnosUci.nuevoTurno !== null && TurnosUci.nuevoTurno.gestion == 1 ? '' : 'd-none'),
                }, [
                    m("td.tx-14.tx-normal.d-none[colspan='12']",
                        (OxigenacionUci.nuevoRegistro !== null ? [
                            m("input", {
                                id: "_observacion" + OxigenacionUci.nuevoRegistro.id,
                                class: "form-control tx-semibold tx-14",
                                type: "text",
                                placeholder: "...",

                                onkeypress: (e) => {
                                    if (e.keyCode == 13) {
                                        OxigenacionUci.nuevoRegistro.numeroTurno = PacientesUCI.numeroTurno;
                                        OxigenacionUci.nuevoRegistro.fechaHoraTurno = PacientesUCI.fechaHoraTurno;
                                        if (OxigenacionUci.nuevoRegistro.editar == null) {
                                            OxigenacionUci.agregarRegistro();
                                            FecthUci.registrarSeccion(OxigenacionUci.nuevoRegistro);
                                            OxigenacionUci.nuevoRegistro = null;
                                            OxigenacionUci.filterRegistros();
                                            PacientesUCI.vReloadTable('table-oxigenacion', OxigenacionUci.getRegistros());
                                        } else {
                                            OxigenacionUci.editarRegistro();
                                            FecthUci.actualizarSeccion(OxigenacionUci.nuevoRegistro);
                                            OxigenacionUci.nuevoRegistro = null;
                                            OxigenacionUci.filterRegistros();
                                            PacientesUCI.vReloadTable('table-oxigenacion', OxigenacionUci.getRegistros());
                                        }
                                    }
                                },
                                oninput: (e) => {
                                    OxigenacionUci.nuevoRegistro.observacion = (e.target.value.length !== 0 ? e.target.value : null);
                                },
                                value: OxigenacionUci.nuevoRegistro.observacion

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
                        (OxigenacionUci.show != false ? [PacientesUCI.vTable('table-oxigenacion', OxigenacionUci.getRegistros(), OxigenacionUci.arqTable())] : [])
                    ),
                ]),
            ]),
        ]

    }
}

export default OxigenacionUci;