import m from "mithril";
import App from "../../../models/App";
import Loader from "../../utils/loader";
import Errors from "../../utils/errors";
import PacientesUCI from "./pacientesUci";
import FecthUci from "./fecthUci";
import TurnosUci from "./turnosUci";

class Marcapaso {
    id = null;
    nro = null;
    fechaHoraTurno = null;
    hora = null;
    am = null;
    pm = null;
    hs = null;
    observacion = null;
    editar = null;
    seccion = 'Marcapasos';
    constructor() {
        this.id = this.id;
        this.nro = this.nro;
        this.fechaHoraTurno = this.fechaHoraTurno;
        this.hora = this.hora;
        this.am = this.am;
        this.pm = this.pm;
        this.hs = this.hs;
        this.observacion = this.observacion;
        this.editar = this.editar;
        this.seccion = this.seccion;
    }
}


class MarcapasosUci {
    static allRegistros = [];
    static registros = [];
    static nuevoRegistro = null;
    static show = false;
    static validarRegistro() {

    }
    static iniciarRegistro() {
        MarcapasosUci.nuevoRegistro = new Marcapaso();
    }
    static agregarRegistro() {
        // Agrega registro
        if (MarcapasosUci.allRegistros.length == 0) {
            MarcapasosUci.nuevoRegistro.nro = 1;
            MarcapasosUci.allRegistros.push(MarcapasosUci.nuevoRegistro);
        } else {
            MarcapasosUci.nuevoRegistro.nro = (MarcapasosUci.allRegistros[MarcapasosUci.allRegistros.length - 1].nro + 1);
            MarcapasosUci.allRegistros.push(MarcapasosUci.nuevoRegistro);
        }

    }
    static verRegistro(registro) {
        registro.editar = true;
        MarcapasosUci.nuevoRegistro = registro;
        console.log(MarcapasosUci.nuevoRegistro)
    }
    static editarRegistro() {
        MarcapasosUci.nuevoRegistro.editar = null;
        MarcapasosUci.allRegistros.map((_v, _i) => {
            if (_v.nro == MarcapasosUci.nuevoRegistro.nro) {
                MarcapasosUci.allRegistros[_i] = MarcapasosUci.nuevoRegistro;
            }
        });

    }
    static eliminarRegistro(obj) {

        MarcapasosUci.registros = PacientesUCI.extractSeccion(Array.from(document.getElementById('sec_Marcapasos').options));

        let hash = {};
        let res = [];
        let _arr = [];
        let result = [];
        let resultId = [];

        MarcapasosUci.registros.map((_v, _i) => {
            if (_v.nro !== obj.nro) {
                res.push(_v);
            }
        });

        result = res.sort((a, b) => b.nro - a.nro);

        resultId = result.filter(o => hash[o.id] ? false : hash[o.id] = true);
        // Ordenar desc
        _arr = resultId.sort((a, b) => a.nro - b.nro);

        MarcapasosUci.registros = _arr;

    }

    static copyAllRegistros() {

        let re = [];
        let res = [];
        let result = [];
        let resultNro = [];
        let hash = {};

        re = MarcapasosUci.allRegistros;

        result = re.sort((a, b) => b.nro - a.nro);
        // Quitar duplicados
        resultNro = result.filter(o => hash[o.id] ? false : hash[o.id] = true).sort((a, b) => a.nro - b.nro);

        resultNro.map((_v, _i) => {
            MarcapasosUci.iniciarRegistro();
            MarcapasosUci.nuevoRegistro.id = _v.id;
            MarcapasosUci.nuevoRegistro.hora = _v.hora;
            if (PacientesUCI.numeroTurno != 1) {
                MarcapasosUci.nuevoRegistro.observacion = _v.observacion;
                MarcapasosUci.nuevoRegistro.am = _v.am;
                MarcapasosUci.nuevoRegistro.pm = _v.pm;
                MarcapasosUci.nuevoRegistro.hs = _v.hs;
            }
            MarcapasosUci.nuevoRegistro.numeroTurno = PacientesUCI.numeroTurno;
            MarcapasosUci.nuevoRegistro.fechaHoraTurno = PacientesUCI.fechaHoraTurno;
            res.push(MarcapasosUci.nuevoRegistro);
            MarcapasosUci.nuevoRegistro = null;
        });


        MarcapasosUci.allRegistros.push.apply(MarcapasosUci.allRegistros, res);
        // Asignar Nro

        MarcapasosUci.allRegistros.map((_v, _i) => {
            if (_v.nro == null) {
                MarcapasosUci.allRegistros[_i].nro = (_i + 1);
                if (_v.id == res.id) {
                    res.nro = MarcapasosUci.allRegistros[_i].nro;
                }
            }
        });


        console.log(7788, res)

        MarcapasosUci.filterRegistros();
        PacientesUCI.vReloadTable('table-marcapasos', MarcapasosUci.getRegistros());
        FecthUci.registrarAllSeccion(res);



    }

    static filterRegistros() {

        let result = [];
        let resultId = [];
        let _arr = [];
        let hash = {};

        result = MarcapasosUci.allRegistros.sort((a, b) => b.nro - a.nro);
        // Quitar duplicados
        resultId = result.filter(o => hash[o.id] ? false : hash[o.id] = true);
        // Ordenar desc
        _arr = resultId.sort((a, b) => a.nro - b.nro);

        MarcapasosUci.registros = _arr;

    }

    static getRegistros() {
        return MarcapasosUci.registros;
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
                title: "Hora:",
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
                    return full.hora;
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
                                        MarcapasosUci.nuevoRegistro = null
                                        MarcapasosUci.verRegistro(oData);
                                    },
                                }, (oData.am !== null ? oData.am : m.trust('<div class="text-center pd-l-0 pd-r-0"><hr style="border-color:#001737;"/></div>'))),
                                (MarcapasosUci.nuevoRegistro !== null ? [
                                    m("input", {
                                        id: "am" + MarcapasosUci.nuevoRegistro.id,
                                        class: "form-control tx-semibold tx-14 " + (oData.editar == true ? '' : 'd-none'),
                                        type: "text",
                                        placeholder: "...",
                                        ondblclick: (e) => {
                                            oData.editar = null;
                                            MarcapasosUci.nuevoRegistro = null
                                        },
                                        onkeypress: (e) => {
                                            if (e.keyCode == 13) {

                                                MarcapasosUci.nuevoRegistro.numeroTurno = PacientesUCI.numeroTurno;
                                                MarcapasosUci.nuevoRegistro.fechaHoraTurno = PacientesUCI.fechaHoraTurno;
                                                console.log(99, MarcapasosUci.nuevoRegistro)

                                                // throw 'AA';
                                                if (MarcapasosUci.nuevoRegistro.editar == null) {
                                                    MarcapasosUci.agregarRegistro();
                                                    FecthUci.registrarSeccion(MarcapasosUci.nuevoRegistro);
                                                    MarcapasosUci.nuevoRegistro = null;
                                                    MarcapasosUci.filterRegistros();
                                                } else {
                                                    MarcapasosUci.editarRegistro();
                                                    FecthUci.actualizarSeccion(MarcapasosUci.nuevoRegistro);
                                                    MarcapasosUci.nuevoRegistro = null;
                                                    MarcapasosUci.filterRegistros();

                                                }


                                            }
                                        },
                                        oninput: (e) => {
                                            if (PacientesUCI.numeroTurno == 1) {
                                                MarcapasosUci.nuevoRegistro.am = (e.target.value.length !== 0 ? e.target.value : null);
                                            } else {
                                                e.preventDefault();
                                            }
                                        },
                                        value: (MarcapasosUci.nuevoRegistro.am !== null ? MarcapasosUci.nuevoRegistro.am : '')
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
                                        MarcapasosUci.nuevoRegistro = null
                                        MarcapasosUci.verRegistro(oData);
                                    },
                                }, (oData.pm !== null ? oData.pm : m.trust('<div class="text-center pd-l-0 pd-r-0"><hr style="border-color:#001737;"/></div>'))),
                                (MarcapasosUci.nuevoRegistro !== null ? [
                                    m("input", {
                                        id: "pm" + MarcapasosUci.nuevoRegistro.id,
                                        class: "form-control tx-semibold tx-14 " + (oData.editar == true ? '' : 'd-none'),
                                        type: "text",
                                        placeholder: "...",
                                        ondblclick: (e) => {
                                            oData.editar = null;
                                            MarcapasosUci.nuevoRegistro = null
                                        },
                                        onkeypress: (e) => {
                                            if (e.keyCode == 13) {

                                                MarcapasosUci.nuevoRegistro.numeroTurno = PacientesUCI.numeroTurno;
                                                MarcapasosUci.nuevoRegistro.fechaHoraTurno = PacientesUCI.fechaHoraTurno;
                                                console.log(99, MarcapasosUci.nuevoRegistro)

                                                // throw 'AA';
                                                if (MarcapasosUci.nuevoRegistro.editar == null) {
                                                    MarcapasosUci.agregarRegistro();
                                                    FecthUci.registrarSeccion(MarcapasosUci.nuevoRegistro);
                                                    MarcapasosUci.nuevoRegistro = null;
                                                    MarcapasosUci.filterRegistros();
                                                } else {
                                                    MarcapasosUci.editarRegistro();
                                                    FecthUci.actualizarSeccion(MarcapasosUci.nuevoRegistro);
                                                    MarcapasosUci.nuevoRegistro = null;
                                                    MarcapasosUci.filterRegistros();

                                                }


                                            }
                                        },
                                        oninput: (e) => {
                                            if (PacientesUCI.numeroTurno == 2) {
                                                MarcapasosUci.nuevoRegistro.pm = (e.target.value.length !== 0 ? e.target.value : null);
                                            } else {
                                                e.preventDefault();
                                            }
                                        },
                                        value: (MarcapasosUci.nuevoRegistro.pm !== null ? MarcapasosUci.nuevoRegistro.pm : '')
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
                                        MarcapasosUci.nuevoRegistro = null
                                        MarcapasosUci.verRegistro(oData);
                                    },
                                }, (oData.hs !== null ? oData.hs : m.trust('<div class="text-center pd-l-0 pd-r-0"><hr style="border-color:#001737;"/></div>'))),
                                (MarcapasosUci.nuevoRegistro !== null ? [
                                    m("input", {
                                        id: "hs" + MarcapasosUci.nuevoRegistro.id,
                                        class: "form-control tx-semibold tx-14 " + (oData.editar == true ? '' : 'd-none'),
                                        type: "text",
                                        placeholder: "...",
                                        ondblclick: (e) => {
                                            oData.editar = null;
                                            MarcapasosUci.nuevoRegistro = null
                                        },
                                        onkeypress: (e) => {
                                            if (e.keyCode == 13) {

                                                MarcapasosUci.nuevoRegistro.numeroTurno = PacientesUCI.numeroTurno;
                                                MarcapasosUci.nuevoRegistro.fechaHoraTurno = PacientesUCI.fechaHoraTurno;
                                                console.log(99, MarcapasosUci.nuevoRegistro)

                                                // throw 'AA';
                                                if (MarcapasosUci.nuevoRegistro.editar == null) {
                                                    MarcapasosUci.agregarRegistro();
                                                    FecthUci.registrarSeccion(MarcapasosUci.nuevoRegistro);
                                                    MarcapasosUci.nuevoRegistro = null;
                                                    MarcapasosUci.filterRegistros();
                                                } else {
                                                    MarcapasosUci.editarRegistro();
                                                    FecthUci.actualizarSeccion(MarcapasosUci.nuevoRegistro);
                                                    MarcapasosUci.nuevoRegistro = null;
                                                    MarcapasosUci.filterRegistros();

                                                }


                                            }
                                        },
                                        oninput: (e) => {
                                            if (PacientesUCI.numeroTurno == 3) {
                                                MarcapasosUci.nuevoRegistro.hs = (e.target.value.length !== 0 ? e.target.value : null);
                                            } else {
                                                e.preventDefault();
                                            }
                                        },
                                        value: (MarcapasosUci.nuevoRegistro.hs !== null ? MarcapasosUci.nuevoRegistro.hs : '')

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
                                        MarcapasosUci.nuevoRegistro = null
                                        MarcapasosUci.verRegistro(oData);
                                    },
                                }, (oData.observacion !== null ? oData.observacion : m.trust('<div class="text-center pd-l-0 pd-r-0"><hr style="border-color:#001737;"/></div>'))),
                                (MarcapasosUci.nuevoRegistro !== null ? [
                                    m("input", {
                                        id: "observacion" + MarcapasosUci.nuevoRegistro.id,
                                        class: "form-control tx-semibold tx-14 " + (oData.editar == true ? '' : 'd-none'),
                                        type: "text",
                                        placeholder: "...",
                                        onkeypress: (e) => {
                                            if (e.keyCode == 13) {

                                                MarcapasosUci.nuevoRegistro.numeroTurno = PacientesUCI.numeroTurno;
                                                MarcapasosUci.nuevoRegistro.fechaHoraTurno = PacientesUCI.fechaHoraTurno;
                                                console.log(99, MarcapasosUci.nuevoRegistro)

                                                // throw 'AA';
                                                if (MarcapasosUci.nuevoRegistro.editar == null) {
                                                    MarcapasosUci.agregarRegistro();
                                                    FecthUci.registrarSeccion(MarcapasosUci.nuevoRegistro);
                                                    MarcapasosUci.nuevoRegistro = null;
                                                    MarcapasosUci.filterRegistros();
                                                } else {
                                                    MarcapasosUci.editarRegistro();
                                                    FecthUci.actualizarSeccion(MarcapasosUci.nuevoRegistro);
                                                    MarcapasosUci.nuevoRegistro = null;
                                                    MarcapasosUci.filterRegistros();

                                                }


                                            }
                                        },
                                        ondblclick: (e) => {
                                            oData.editar = null;
                                            MarcapasosUci.nuevoRegistro = null
                                        },
                                        oninput: (e) => {
                                            MarcapasosUci.nuevoRegistro.observacion = (e.target.value.length !== 0 ? e.target.value : null);
                                        },
                                        value: (MarcapasosUci.nuevoRegistro.observacion !== null ? MarcapasosUci.nuevoRegistro.observacion : '')

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
                                        // class: (oData.editar ? 'd-none' : ''),
                                        disabled: (TurnosUci.nuevoTurno !== null && TurnosUci.nuevoTurno.gestion == 1 ? (PacientesUCI.numeroTurno != oData.numeroTurno ? 'disabled' : '') : 'disabled'),
                                        onclick: () => {
                                            MarcapasosUci.nuevoRegistro = null
                                            MarcapasosUci.verRegistro(oData);
                                        },
                                    },
                                        'Editar',
                                    ),
                                    m("button.btn.btn-xs.btn-block.btn-danger[type='button']", {
                                        class: (oData.editar ? '' : 'd-none'),
                                        disabled: (PacientesUCI.numeroTurno != oData.numeroTurno ? 'disabled' : ''),

                                        onclick: () => {
                                            oData.editar = null;
                                            MarcapasosUci.nuevoRegistro = null;
                                        },
                                    },
                                        'Cancelar Edición',
                                    ),
                                    m("button.btn.btn-xs.btn-dark[type='button']", {
                                        class: (PacientesUCI.fechaHoraTurno != oData.fechaHoraTurno && oData.id == 'Frecuencia' ? '' : 'd-none'),
                                        onclick: () => {
                                            MarcapasosUci.copyAllRegistros();

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
        let table = document.getElementById('table-marcapasos');
        // clear first
        if (table != null) {
            $('#table-marcapasos').DataTable().clear().destroy();
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
                       
                        MarcapasosUci.show = !MarcapasosUci.show;
                    }


                }, [
                    m("th.tx-semibold[scope='col'][colspan='12']",
                        "MARCAPASOS"
                    ),

                ])
            ),
            m("tbody.bd.bd-2", {
                style: { "border-color": "#5173a1" },
                class: (MarcapasosUci.show ? '' : 'd-none')
            }, [
                m("tr.bd.bd-2.tx-uppercase.d-none", {
                    style: { "background-color": "rgb(238, 249, 200)", "border-color": "#5173a1" },
                    class: (TurnosUci.nuevoTurno !== null && TurnosUci.nuevoTurno.gestion == 1 ? '' : 'd-none'),
                }, [
                    m("th[scope='col'][colspan='3']",
                        "HORA:"
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
                        (MarcapasosUci.nuevoRegistro !== null ? [
                            m('div.d-flex', [
                                m("input", {
                                    class: "form-control tx-semibold tx-14",
                                    type: "text",
                                    placeholder: "...",
                                    disabled: true,
                                    value: MarcapasosUci.nuevoRegistro.hora,
                                })

                            ]),
                        ] : [])
                    ),
                    m("td.tx-14.tx-normal.d-none[colspan='3']",
                        m('select.tx-semibold', {
                            id: 'sec_Marcapasos',
                            disabled: true,
                            onchange: (e) => {
                                let _id = e.target.options[e.target.selectedIndex].id;
                                let _value = e.target.options[e.target.selectedIndex].value;
                                MarcapasosUci.iniciarRegistro();
                                MarcapasosUci.nuevoRegistro.id = _id;
                                MarcapasosUci.nuevoRegistro.hora = _value;
                            },
                            class: "custom-select",
                            value: (MarcapasosUci.nuevoRegistro !== null ? MarcapasosUci.nuevoRegistro.hora : 0),
                        }, m("option[value='0']", 'Seleccione...'), [{
                            id: "Frecuencia",
                            label: "Frecuencia"
                        }, {
                            id: "Unipolar",
                            label: "UNIPOLAR"
                        },
                        {
                            id: "Bipolar",
                            label: "BIPOLAR"
                        },
                        {
                            id: "Miliamperios",
                            label: "MILIAMPERIOS"
                        },
                        {
                            id: "Milivoltios",
                            label: "MILIVOLTIOS"
                        },
                        {
                            id: "Sensibilidad",
                            label: "SENSIBILIDAD"
                        }
                        ].map(x =>
                            m('option[id="' + x.id + '"]', x.label)
                        ))
                    ),
                    m("td.tx-14.tx-normal.d-none[colspan='3']",
                        (MarcapasosUci.nuevoRegistro !== null ? [
                            m('div.d-flex', [
                                m("input", {
                                    id: "_am" + MarcapasosUci.nuevoRegistro.id,
                                    class: "form-control tx-semibold tx-14",
                                    type: "text",
                                    placeholder: "...",
                                    oninput: (e) => {
                                        if (PacientesUCI.numeroTurno == 1) {
                                            MarcapasosUci.nuevoRegistro.am = (e.target.value.length !== 0 ? e.target.value : null);
                                        } else {
                                            e.target.value = '';
                                        }
                                    },
                                    value: MarcapasosUci.nuevoRegistro.am

                                })

                            ]),
                        ] : [])
                    ),
                    m("td.tx-14.tx-normal.d-none[colspan='3']",
                        (MarcapasosUci.nuevoRegistro !== null ? [
                            m('div.d-flex', [
                                m("input", {
                                    id: "_pm" + MarcapasosUci.nuevoRegistro.id,
                                    class: "form-control tx-semibold tx-14",
                                    type: "text",
                                    placeholder: "...",
                                    oninput: (e) => {
                                        if (PacientesUCI.numeroTurno == 2) {
                                            MarcapasosUci.nuevoRegistro.pm = (e.target.value.length !== 0 ? e.target.value : null);
                                        } else {
                                            e.target.value = '';
                                        }
                                    },
                                    value: MarcapasosUci.nuevoRegistro.pm

                                })

                            ]),
                        ] : [])
                    ),

                    m("td.tx-14.tx-normal.d-none[colspan='3']",
                        (MarcapasosUci.nuevoRegistro !== null ? [
                            m('div.d-flex', [
                                m("input", {
                                    id: "_hs" + MarcapasosUci.nuevoRegistro.id,
                                    class: "form-control tx-semibold tx-14",
                                    type: "text",
                                    placeholder: "...",
                                    oninput: (e) => {
                                        if (PacientesUCI.numeroTurno == 3) {
                                            MarcapasosUci.nuevoRegistro.hs = (e.target.value.length !== 0 ? e.target.value : null);
                                        } else {
                                            e.target.value = '';
                                        }
                                    },
                                    value: MarcapasosUci.nuevoRegistro.hs

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
                    m("td.tx-14.tx-normal[colspan='12']",
                        (MarcapasosUci.nuevoRegistro !== null ? [
                            m("input", {
                                id: "_observacion" + MarcapasosUci.nuevoRegistro.id,
                                class: "form-control tx-semibold tx-14",
                                type: "text",
                                placeholder: "...",

                                onkeypress: (e) => {
                                    if (e.keyCode == 13) {
                                        MarcapasosUci.nuevoRegistro.numeroTurno = PacientesUCI.numeroTurno;
                                        MarcapasosUci.nuevoRegistro.fechaHoraTurno = PacientesUCI.fechaHoraTurno;
                                        if (MarcapasosUci.nuevoRegistro.editar == null) {
                                            MarcapasosUci.agregarRegistro();
                                            FecthUci.registrarSeccion(MarcapasosUci.nuevoRegistro);
                                            MarcapasosUci.nuevoRegistro = null;
                                            MarcapasosUci.filterRegistros();
                                            PacientesUCI.vReloadTable('table-marcapasos', MarcapasosUci.getRegistros());
                                        } else {
                                            MarcapasosUci.editarRegistro();
                                            FecthUci.actualizarSeccion(MarcapasosUci.nuevoRegistro);
                                            MarcapasosUci.nuevoRegistro = null;
                                            MarcapasosUci.filterRegistros();
                                            PacientesUCI.vReloadTable('table-marcapasos', MarcapasosUci.getRegistros());
                                        }
                                    }
                                },
                                oninput: (e) => {
                                    MarcapasosUci.nuevoRegistro.observacion = (e.target.value.length !== 0 ? e.target.value : null);
                                },
                                value: MarcapasosUci.nuevoRegistro.observacion

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
                        {
                            class: (MarcapasosUci.show ? '' : 'd-none'),
                        },
                        (MarcapasosUci.registros.length != 0 ? [PacientesUCI.vTable('table-marcapasos', MarcapasosUci.getRegistros(), MarcapasosUci.arqTable())] : [])
                    ),
                ]),
            ]),
        ]

    }
}

export default MarcapasosUci;