import m from "mithril";
import PacientesUCI from "./pacientesUci";
import FecthUci from "./fecthUci";
import TurnosUci from "./turnosUci";

class Cuidado {
    id = null;
    nro = null;
    numeroTurno = null;
    fechaHoraTurno = null;
    cuidado = null;
    frecuencia = null;
    am = null;
    pm = null;
    hs = null;
    editar = null;
    seccion = 'CuidadosGenerales';
    constructor() {
        this.id = this.id;
        this.nro = this.nro;
        this.numeroTurno = this.numeroTurno;
        this.fechaHoraTurno = this.fechaHoraTurno;
        this.cuidado = this.cuidado;
        this.frecuencia = this.frecuencia;
        this.am = this.pm;
        this.pm = this.pm;
        this.hs = this.hs;
        this.editar = this.editar;
        this.seccion = this.seccion;
    }
}


class CuidadosUci2 {

    static allRegistros = [];
    static registros = [];
    static nuevoRegistro = null;
    static show = false;

    static validarRegistro() {

    }

    static iniciarRegistro() {
        CuidadosUci2.nuevoRegistro = new Cuidado();
    }

    static agregarRegistro() {
        if (CuidadosUci2.allRegistros.length == 0) {
            CuidadosUci2.nuevoRegistro.nro = 1;
            CuidadosUci2.allRegistros.push(CuidadosUci2.nuevoRegistro);
        } else {
            CuidadosUci2.nuevoRegistro.nro = (CuidadosUci2.allRegistros[CuidadosUci2.allRegistros.length - 1].nro + 1);
            CuidadosUci2.allRegistros.push(CuidadosUci2.nuevoRegistro);
        }
    }

    static verRegistro(registro) {
        registro.editar = true;
        CuidadosUci2.nuevoRegistro = registro;
    }

    static editarRegistro() {
        CuidadosUci2.nuevoRegistro.editar = null;
        CuidadosUci2.allRegistros.map((_v, _i) => {
            if (_v.nro == CuidadosUci2.nuevoRegistro.nro) {
                CuidadosUci2.allRegistros[_i] = CuidadosUci2.nuevoRegistro;
            }
        });

    }

    static eliminarRegistro(obj) {

        CuidadosUci2.registros = PacientesUCI.extractSeccion(Array.from(document.getElementById('sec_CuidadosGenerales').options));

        let hash = {};
        let res = [];
        let _arr = [];
        let result = [];
        let resultId = [];

        CuidadosUci2.registros.map((_v, _i) => {
            if (_v.nro !== obj.nro) {
                res.push(_v);
            }
        });

        result = res.sort((a, b) => b.nro - a.nro);

        resultId = result.filter(o => hash[o.id] ? false : hash[o.id] = true);
        // Ordenar desc
        _arr = resultId.sort((a, b) => a.nro - b.nro);

        CuidadosUci2.registros = _arr;


    }

    static copyAllRegistros() {

        let re = [];
        let res = [];
        let result = [];
        let resultNro = [];
        let hash = {};


        re = CuidadosUci2.allRegistros;

        result = re.sort((a, b) => b.nro - a.nro);
        // Quitar duplicados
        resultNro = result.filter(o => hash[o.id] ? false : hash[o.id] = true).sort((a, b) => a.nro - b.nro);

        resultNro.map((_v, _i) => {
            CuidadosUci2.iniciarRegistro();
            CuidadosUci2.nuevoRegistro.id = _v.id;
            CuidadosUci2.nuevoRegistro.cuidado = _v.cuidado;
            if (PacientesUCI.numeroTurno != 1) {
                CuidadosUci2.nuevoRegistro.frecuencia = _v.frecuencia;
                CuidadosUci2.nuevoRegistro.am = _v.am;
                CuidadosUci2.nuevoRegistro.pm = _v.pm;
                CuidadosUci2.nuevoRegistro.hs = _v.hs;
            }
            CuidadosUci2.nuevoRegistro.numeroTurno = PacientesUCI.numeroTurno;
            CuidadosUci2.nuevoRegistro.fechaHoraTurno = PacientesUCI.fechaHoraTurno;
            res.push(CuidadosUci2.nuevoRegistro);
            CuidadosUci2.nuevoRegistro = null;
        });


        CuidadosUci2.allRegistros.push.apply(CuidadosUci2.allRegistros, res);
        // Asignar Nro

        CuidadosUci2.allRegistros.map((_v, _i) => {
            if (_v.nro == null) {
                CuidadosUci2.allRegistros[_i].nro = (_i + 1);
                if (_v.id == res.id) {
                    res.nro = CuidadosUci2.allRegistros[_i].nro;
                }

            }
        });

        CuidadosUci2.filterRegistros();
        FecthUci.registrarAllSeccion(res);
        PacientesUCI.vReloadTable('table-cuidados', CuidadosUci2.getRegistros());



    }

    static filterRegistros() {

        let result = [];
        let resultId = [];
        let _arr = [];
        let hash = {};

        result = CuidadosUci2.allRegistros.sort((a, b) => b.nro - a.nro);
        // Quitar duplicados
        resultId = result.filter(o => hash[o.id] ? false : hash[o.id] = true);
        // Ordenar desc
        _arr = resultId.sort((a, b) => a.nro - b.nro);

        CuidadosUci2.registros = _arr;


    }

    static getRegistros() {
        return CuidadosUci2.registros;
    }

    static destroyTable() {
        let table = document.getElementById('table-cuidados');
        // clear first
        if (table != null) {
            $('#table-cuidados').DataTable().clear().destroy();

        }
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
            pageLength: 100,
            order: [
                [0, 'desc'],

            ],
            columns: [{
                title: "Order N°:",
            }, {
                title: "Turno:",
            },
            {
                title: "Turno:",
            },

            {
                title: "Cuidado:",
            },
            {
                title: "Frecuencia:",
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
                title: "Opciones:",
            },


            ],
            aoColumnDefs: [{
                mRender: function (data, type, full) {
                    return full.fechaHoraTurno;
                },
                visible: false,
                aTargets: [0],
                orderable: true,
            }, {
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
                width: '12%',
                visible: true,
                aTargets: [2],
                orderable: true,

            },
            {
                mRender: function (data, type, full) {
                    return full.cuidado;
                },
                width: '19%',
                visible: true,
                aTargets: [3],
                orderable: true,

            },
            {

                fnCreatedCell: function (nTd, sData, oData, iRow, iCol) {
                    return m.mount(nTd, {
                        view: () => {
                            return [
                                m('div.pd-5', {
                                    class: (oData.editar == true ? 'd-none' : ''),
                                    ondblclick: (e) => {
                                        CuidadosUci2.nuevoRegistro = null
                                        CuidadosUci2.verRegistro(oData);
                                    },
                                }, (oData.frecuencia !== null ? oData.frecuencia : m.trust('<div class="text-center pd-l-0 pd-r-0"><hr style="border-color:#001737;"/></div>'))),
                                (CuidadosUci2.nuevoRegistro !== null ? [
                                    m("input", {
                                        id: "frecuencia" + CuidadosUci2.nuevoRegistro.id,
                                        class: "form-control tx-semibold tx-14 " + (oData.editar == true ? '' : 'd-none'),
                                        type: "text",
                                        placeholder: "...",
                                        ondblclick: (e) => {
                                            oData.editar = null;
                                            CuidadosUci2.nuevoRegistro = null
                                        },
                                        oninput: (e) => {
                                            CuidadosUci2.nuevoRegistro.frecuencia = (e.target.value.length !== 0 ? e.target.value : null);
                                        },
                                        onkeypress: (e) => {
                                            if (e.keyCode == 13) {

                                                CuidadosUci2.nuevoRegistro.numeroTurno = PacientesUCI.numeroTurno;
                                                CuidadosUci2.nuevoRegistro.fechaHoraTurno = PacientesUCI.fechaHoraTurno;
                                                console.log(99, CuidadosUci2.nuevoRegistro)

                                                // throw 'AA';
                                                if (CuidadosUci2.nuevoRegistro.editar == null) {
                                                    CuidadosUci2.agregarRegistro();
                                                    FecthUci.registrarSeccion(CuidadosUci2.nuevoRegistro);
                                                    CuidadosUci2.nuevoRegistro = null;
                                                    CuidadosUci2.filterRegistros();
                                                } else {
                                                    CuidadosUci2.editarRegistro();
                                                    FecthUci.actualizarSeccion(CuidadosUci2.nuevoRegistro);
                                                    CuidadosUci2.nuevoRegistro = null;
                                                    CuidadosUci2.filterRegistros();
                                                }


                                            }
                                        },
                                        value: CuidadosUci2.nuevoRegistro.frecuencia
                                    })
                                ] : [])

                            ]
                        }
                    });
                },
                width: '10%',
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
                                        CuidadosUci2.nuevoRegistro = null
                                        CuidadosUci2.verRegistro(oData);
                                    },
                                }, (oData.am !== null ? oData.am : m.trust('<div class="text-center pd-l-0 pd-r-0"><hr style="border-color:#001737;"/></div>'))),
                                (CuidadosUci2.nuevoRegistro !== null ? [
                                    m("input", {
                                        id: "am" + CuidadosUci2.nuevoRegistro.id,
                                        class: "form-control tx-semibold tx-14 " + (oData.editar == true ? '' : 'd-none'),
                                        type: "text",
                                        placeholder: "...",
                                        ondblclick: (e) => {
                                            oData.editar = null;
                                            CuidadosUci2.nuevoRegistro = null
                                        },
                                        onkeypress: (e) => {
                                            if (e.keyCode == 13) {

                                                CuidadosUci2.nuevoRegistro.numeroTurno = PacientesUCI.numeroTurno;
                                                CuidadosUci2.nuevoRegistro.fechaHoraTurno = PacientesUCI.fechaHoraTurno;
                                                console.log(99, CuidadosUci2.nuevoRegistro)
                                                // throw 'AA';
                                                if (CuidadosUci2.nuevoRegistro.editar == null) {
                                                    CuidadosUci2.agregarRegistro();
                                                    FecthUci.registrarSeccion(CuidadosUci2.nuevoRegistro);
                                                    CuidadosUci2.nuevoRegistro = null;
                                                    CuidadosUci2.filterRegistros();
                                                } else {
                                                    CuidadosUci2.editarRegistro();
                                                    FecthUci.actualizarSeccion(CuidadosUci2.nuevoRegistro);
                                                    CuidadosUci2.nuevoRegistro = null;
                                                    CuidadosUci2.filterRegistros();

                                                }


                                            }
                                        },
                                        oninput: (e) => {
                                            if (PacientesUCI.numeroTurno == 1) {
                                                CuidadosUci2.nuevoRegistro.am = (e.target.value.length !== 0 ? e.target.value : null);
                                            } else {
                                                e.preventDefault();
                                            }
                                        },
                                        value: (CuidadosUci2.nuevoRegistro.am !== null ? CuidadosUci2.nuevoRegistro.am : '')
                                    })
                                ] : [])

                            ]
                        }
                    });
                },
                width: '10%',
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
                                        CuidadosUci2.nuevoRegistro = null
                                        CuidadosUci2.verRegistro(oData);
                                    },
                                }, (oData.pm !== null ? oData.pm : m.trust('<div class="text-center pd-l-0 pd-r-0"><hr style="border-color:#001737;"/></div>'))),
                                (CuidadosUci2.nuevoRegistro !== null ? [
                                    m("input", {
                                        id: "pm" + CuidadosUci2.nuevoRegistro.id,
                                        class: "form-control tx-semibold tx-14 " + (oData.editar == true ? '' : 'd-none'),
                                        type: "text",
                                        placeholder: "...",
                                        ondblclick: (e) => {
                                            oData.editar = null;
                                            CuidadosUci2.nuevoRegistro = null
                                        },
                                        onkeypress: (e) => {
                                            if (e.keyCode == 13) {

                                                CuidadosUci2.nuevoRegistro.numeroTurno = PacientesUCI.numeroTurno;
                                                CuidadosUci2.nuevoRegistro.fechaHoraTurno = PacientesUCI.fechaHoraTurno;
                                                console.log(99, CuidadosUci2.nuevoRegistro)

                                                // throw 'AA';
                                                if (CuidadosUci2.nuevoRegistro.editar == null) {
                                                    CuidadosUci2.agregarRegistro();
                                                    FecthUci.registrarSeccion(CuidadosUci2.nuevoRegistro);
                                                    CuidadosUci2.nuevoRegistro = null;
                                                    CuidadosUci2.filterRegistros();
                                                } else {
                                                    CuidadosUci2.editarRegistro();
                                                    FecthUci.actualizarSeccion(CuidadosUci2.nuevoRegistro);
                                                    CuidadosUci2.nuevoRegistro = null;
                                                    CuidadosUci2.filterRegistros();

                                                }


                                            }
                                        },
                                        oninput: (e) => {
                                            if (PacientesUCI.numeroTurno == 2) {
                                                CuidadosUci2.nuevoRegistro.pm = (e.target.value.length !== 0 ? e.target.value : null);
                                            } else {
                                                e.preventDefault();
                                            }
                                        },
                                        value: (CuidadosUci2.nuevoRegistro.pm !== null ? CuidadosUci2.nuevoRegistro.pm : '')
                                    })
                                ] : [])

                            ]
                        }
                    });
                },
                width: '10%',
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
                                        CuidadosUci2.nuevoRegistro = null
                                        CuidadosUci2.verRegistro(oData);
                                    },
                                }, (oData.hs !== null ? oData.hs : m.trust('<div class="text-center pd-l-0 pd-r-0"><hr style="border-color:#001737;"/></div>'))),
                                (CuidadosUci2.nuevoRegistro !== null ? [
                                    m("input", {
                                        id: "hs" + CuidadosUci2.nuevoRegistro.id,
                                        class: "form-control tx-semibold tx-14 " + (oData.editar == true ? '' : 'd-none'),
                                        type: "text",
                                        placeholder: "...",
                                        onkeypress: (e) => {
                                            if (e.keyCode == 13) {

                                                CuidadosUci2.nuevoRegistro.numeroTurno = PacientesUCI.numeroTurno;
                                                CuidadosUci2.nuevoRegistro.fechaHoraTurno = PacientesUCI.fechaHoraTurno;
                                                console.log(99, CuidadosUci2.nuevoRegistro)

                                                // throw 'AA';
                                                if (CuidadosUci2.nuevoRegistro.editar == null) {
                                                    CuidadosUci2.agregarRegistro();
                                                    FecthUci.registrarSeccion(CuidadosUci2.nuevoRegistro);
                                                    CuidadosUci2.nuevoRegistro = null;
                                                    CuidadosUci2.filterRegistros();
                                                    PacientesUCI.vReloadTable('table-cuidados', CuidadosUci2.getRegistros());
                                                } else {
                                                    CuidadosUci2.editarRegistro();
                                                    FecthUci.actualizarSeccion(CuidadosUci2.nuevoRegistro);
                                                    CuidadosUci2.nuevoRegistro = null;
                                                    CuidadosUci2.filterRegistros();
                                                    PacientesUCI.vReloadTable('table-cuidados', CuidadosUci2.getRegistros());

                                                }


                                            }
                                        },
                                        ondblclick: (e) => {
                                            oData.editar = null;
                                            CuidadosUci2.nuevoRegistro = null
                                        },
                                        oninput: (e) => {
                                            if (PacientesUCI.numeroTurno == 3) {
                                                CuidadosUci2.nuevoRegistro.hs = (e.target.value.length !== 0 ? e.target.value : null);
                                            } else {
                                                e.preventDefault();
                                            }
                                        },
                                        value: (CuidadosUci2.nuevoRegistro.hs !== null ? CuidadosUci2.nuevoRegistro.hs : '')

                                    })
                                ] : [])

                            ]
                        }
                    });
                },
                width: '10%',
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
                                    m("button.btn.btn-xs.btn-success[type='button']", {
                                        class: 'd-none',
                                        disabled: (TurnosUci.nuevoTurno !== null && TurnosUci.nuevoTurno.gestion == 1 ? (PacientesUCI.fechaHoraTurno != oData.fechaHoraTurno ? 'disabled' : '') : 'disabled'),
                                        onclick: () => {
                                            CuidadosUci2.nuevoRegistro = null
                                            CuidadosUci2.verRegistro(oData);
                                        },
                                    },
                                        'Editar',
                                    ),

                                    m("button.btn.btn-xs.btn-block.btn-danger[type='button']", {
                                        class: (oData.editar ? '' : 'd-none'),
                                        disabled: (PacientesUCI.fechaHoraTurno != oData.fechaHoraTurno ? 'disabled' : ''),

                                        onclick: () => {
                                            oData.editar = null;
                                            CuidadosUci2.nuevoRegistro = null;
                                        },
                                    },
                                        'Cancelar Edición',
                                    ),
                                    m("button.btn.btn-xs.btn-danger.d-none[type='button']", {
                                        //class: (oData.editar ? 'd-none' : ''),
                                        disabled: (TurnosUci.nuevoTurno !== null && TurnosUci.nuevoTurno.gestion == 1 ? (PacientesUCI.fechaHoraTurno != oData.fechaHoraTurno ? 'disabled' : '') : 'disabled'),

                                        onclick: () => {

                                            if (confirm("¿Esta Ud seguro de eliminar este registro?") == true) {
                                                CuidadosUci2.eliminarRegistro(oData);
                                                FecthUci.eliminarSeccion(oData);
                                                CuidadosUci2.nuevoRegistro = null;
                                                PacientesUCI.vReloadTable('table-cuidados', CuidadosUci2.getRegistros());

                                            }




                                        },
                                    },
                                        'Eliminar',
                                    ),
                                    m("button.btn.btn-xs.btn-dark[type='button']", {
                                        class: (PacientesUCI.fechaHoraTurno != oData.fechaHoraTurno && oData.id == 'Posicion' ? '' : 'd-none'),
                                        onclick: (el) => {

                                            el.target.classList.add('d-none');

                                            CuidadosUci2.copyAllRegistros();

                                            /*
                                            CuidadosUci2.iniciarRegistro();
                                            CuidadosUci2.nuevoRegistro.id = oData.id;
                                            CuidadosUci2.nuevoRegistro.cuidado = oData.cuidado;
                                            if (PacientesUCI.numeroTurno != 1) {
                                                CuidadosUci2.nuevoRegistro.frecuencia = oData.frecuencia;
                                                CuidadosUci2.nuevoRegistro.am = oData.am;
                                                CuidadosUci2.nuevoRegistro.pm = oData.pm;
                                                CuidadosUci2.nuevoRegistro.hs = oData.hs;
                                            }
                                            console.log(66, CuidadosUci2.nuevoRegistro)
                                            CuidadosUci2.nuevoRegistro.numeroTurno = PacientesUCI.numeroTurno;
                                            CuidadosUci2.nuevoRegistro.fechaHoraTurno = PacientesUCI.fechaHoraTurno;
                                            CuidadosUci2.agregarRegistro();
                                            FecthUci.registrarSeccion(CuidadosUci2.nuevoRegistro);
                                            CuidadosUci2.nuevoRegistro = null;
                                            CuidadosUci2.filterRegistros();
                                            PacientesUCI.vReloadTable('table-cuidados', CuidadosUci2.getRegistros());

                                            */
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

    view() {
        return [
            m("thead.bd.bd-2", {
                style: { "border-color": "#5173a1" },
                class: (TurnosUci.nuevoTurno !== null && TurnosUci.nuevoTurno.gestion == 1 ? '' : 'd-none'),

            },

                m("tr.tx-uppercase", {
                    style: { "background-color": "#CCCCFF" },
                    onclick: () => {
                        if (CuidadosUci2.show) {
                            CuidadosUci2.destroyTable();
                        }
                        CuidadosUci2.show = !CuidadosUci2.show;
                    }

                }, [
                    m("th.tx-semibold[scope='col'][colspan='12']",
                        "CUIDADOS GENERALES"
                    ),


                ]),


            ),
            m("tbody.bd.bd-2", {
                style: { "border-color": "#5173a1" },
                class: (CuidadosUci2.show ? '' : 'd-none'),

            }, [
                m("tr.bd.bd-2.tx-uppercase.d-none", {
                    class: (TurnosUci.nuevoTurno !== null && TurnosUci.nuevoTurno.gestion == 1 ? '' : 'd-none'),

                    style: { "background-color": "rgb(238, 249, 200)", "border-color": "#5173a1" }
                }, [
                    m("th[scope='col'][colspan='3']",
                        "CUIDADOS: "
                    ),
                    m("th[scope='col'][colspan='3']",
                        "FRECUENCIA: "
                    ),
                    m("th[scope='col'][colspan='2']",
                        "AM: "
                    ),
                    m("th[scope='col'][colspan='2']",
                        "PM: "
                    ),
                    m("th[scope='col'][colspan='2']",
                        "HS: "
                    ),

                ]),
                m("tr.bd.bd-2.d-none", {
                    style: { "border-color": "#5173a1" },
                    class: (TurnosUci.nuevoTurno !== null && TurnosUci.nuevoTurno.gestion == 1 ? '' : 'd-none')

                }, [
                    m("td.tx-14.tx-normal.d-none[colspan='3']",
                        (CuidadosUci2.nuevoRegistro !== null ? [
                            m('div.d-flex', [
                                m("input", {
                                    class: "form-control tx-semibold tx-14",
                                    type: "text",
                                    placeholder: "...",
                                    disabled: true,
                                    value: CuidadosUci2.nuevoRegistro.cuidado,
                                })

                            ]),
                        ] : [])
                    ),
                    m("td.tx-14.tx-normal.d-none[colspan='3']",
                        m('select.tx-semibold', {
                            id: 'sec_CuidadosGenerales',
                            onchange: (e) => {
                                let _id = e.target.options[e.target.selectedIndex].id;
                                let _value = e.target.options[e.target.selectedIndex].value;
                                if (CuidadosUci2.nuevoRegistro == null) {
                                    CuidadosUci2.iniciarRegistro();
                                    CuidadosUci2.nuevoRegistro.id = _id;
                                    CuidadosUci2.nuevoRegistro.cuidado = _value;
                                } else {
                                    CuidadosUci2.nuevoRegistro.id = _id;
                                    CuidadosUci2.nuevoRegistro.cuidado = _value;
                                }
                            },
                            class: "custom-select",
                            value: (CuidadosUci2.nuevoRegistro !== null ? CuidadosUci2.nuevoRegistro.cuidado : 0),
                        }, m("option[value='0']", 'Seleccione...'), [{
                            id: "Posicion",
                            label: "POSICIÓN"
                        },
                        {
                            id: "ReposoRelativo",
                            label: "REPOSO RELATIVO"
                        },
                        {
                            id: "Levantar",
                            label: "LEVANTAR"
                        },
                        {
                            id: "CuidadoOjos",
                            label: "CUIDADO DE OJOS"
                        },
                        {
                            id: "Aislamiento",
                            label: "AISLAMIENTO"
                        },
                        {
                            id: "CambiosPosicion",
                            label: "CAMBIOS DE POSICIÓN"
                        },
                        {
                            id: "Bano",
                            label: "BAÑO"
                        },
                        {
                            id: "CuidadosPiel",
                            label: "CUIDADOS DE PIEL"
                        },
                        {
                            id: "AseoPerianal",
                            label: "ASEO PERIANAL"
                        },
                        {
                            id: "HigieneOral",
                            label: "HIGIENE ORAL"
                        },
                        {
                            id: "TerapiaRespiratoria",
                            label: "TERAPIA RESPIRATORIA"
                        },
                        {
                            id: "CuidadosTuboTraqueal",
                            label: "CUIDADOS DE TUBO TRAQUEAL"
                        },
                        {
                            id: "ControlTemperaturaMediosFisicos",
                            label: "CONTROL FIEBRE MEDIOS FISICOS"
                        },
                        {
                            id: "ControlMarcapasos",
                            label: "CONTROL DE MARCAPASOS"
                        },
                        {
                            id: "ControlDrenajes",
                            label: "CONTROL DE DRENAJES"
                        },
                        {
                            id: "ControlSangrado",
                            label: "CONTROL DE SANGRADO"
                        },
                        {
                            id: "ControlNeurologico",
                            label: "CONTROL NEUROLÓGICO"
                        },
                        {
                            id: "ControlPresionVenosaCentral",
                            label: "CONTROL DE PRESION VENOSA CENTRAL"
                        },
                        {
                            id: "EsquemaInsulima",
                            label: "ESQUEMA DE INSULINA"
                        },
                        {
                            id: "RehabilitacionMotora",
                            label: "REHABILITACIÓN MOTORA"
                        },
                        {
                            id: "EnemaEvacuante",
                            label: "ENEMA EVACUANTE"
                        },
                        {
                            id: "RiesgoTromboembolismo",
                            label: "RIESGO DE TROMBOEMBOLISMO"
                        },
                        {
                            id: "VisitaFamiliar",
                            label: "VISITA FAMILIAR"
                        }
                        ].map(x =>
                            m('option[id="' + x.id + '"]', x.label)
                        ))
                    ),
                    m("td.tx-14.tx-normal.d-none[colspan='3']",
                        (CuidadosUci2.nuevoRegistro !== null ? [
                            m("input", {
                                id: "_frecuencia" + CuidadosUci2.nuevoRegistro.id,
                                class: "form-control tx-semibold tx-14",
                                type: "text",
                                placeholder: "...",
                                oninput: (e) => {
                                    CuidadosUci2.nuevoRegistro.frecuencia = (e.target.value.length !== 0 ? e.target.value : null);
                                },
                                value: CuidadosUci2.nuevoRegistro.frecuencia
                            })
                        ] : [])
                    ),
                    m("td.tx-14.tx-normal.d-none[colspan='2']",
                        (CuidadosUci2.nuevoRegistro !== null ? [
                            m("input", {
                                id: "_am" + CuidadosUci2.nuevoRegistro.id,
                                class: "form-control tx-semibold tx-14",
                                type: "text",
                                placeholder: "...",
                                oninput: (e) => {
                                    if (PacientesUCI.numeroTurno == 1) {
                                        CuidadosUci2.nuevoRegistro.am = (e.target.value.length !== 0 ? e.target.value : null);
                                    }
                                },
                                value: CuidadosUci2.nuevoRegistro.am
                            })
                        ] : [])
                    ),
                    m("td.tx-14.tx-normal.d-none[colspan='2']",
                        (CuidadosUci2.nuevoRegistro !== null ? [
                            m("input", {
                                id: "_pm" + CuidadosUci2.nuevoRegistro.id,
                                class: "form-control tx-semibold tx-14",
                                type: "text",
                                placeholder: "...",
                                oninput: (e) => {
                                    if (PacientesUCI.numeroTurno == 2) {
                                        CuidadosUci2.nuevoRegistro.pm = (e.target.value.length !== 0 ? e.target.value : null);
                                    } else {
                                        e.target.value = '';
                                    }
                                },
                                value: CuidadosUci2.nuevoRegistro.pm
                            })
                        ] : [])
                    ),
                    m("td.tx-14.tx-normal.d-none[colspan='2']",
                        (CuidadosUci2.nuevoRegistro !== null ? [
                            m("input", {
                                id: "_hs" + CuidadosUci2.nuevoRegistro.id,
                                class: "form-control tx-semibold tx-14",
                                type: "text",
                                placeholder: "...",
                                onkeypress: (e) => {
                                    if (e.keyCode == 13) {

                                        CuidadosUci2.nuevoRegistro.numeroTurno = PacientesUCI.numeroTurno;
                                        CuidadosUci2.nuevoRegistro.fechaHoraTurno = PacientesUCI.fechaHoraTurno;
                                        console.log(99, CuidadosUci2.nuevoRegistro)

                                        // throw 'AA';
                                        if (CuidadosUci2.nuevoRegistro.editar == null) {
                                            CuidadosUci2.agregarRegistro();
                                            FecthUci.registrarSeccion(CuidadosUci2.nuevoRegistro);
                                            CuidadosUci2.nuevoRegistro = null;
                                            CuidadosUci2.filterRegistros();
                                            PacientesUCI.vReloadTable('table-cuidados', CuidadosUci2.getRegistros());
                                        } else {
                                            CuidadosUci2.editarRegistro();
                                            FecthUci.actualizarSeccion(CuidadosUci2.nuevoRegistro);
                                            CuidadosUci2.nuevoRegistro = null;
                                            CuidadosUci2.filterRegistros();
                                            PacientesUCI.vReloadTable('table-cuidados', CuidadosUci2.getRegistros());

                                        }


                                    }
                                },
                                oninput: (e) => {
                                    if (PacientesUCI.numeroTurno == 3) {
                                        CuidadosUci2.nuevoRegistro.hs = (e.target.value.length !== 0 ? e.target.value : null);
                                    } else {
                                        e.target.value = '';
                                    }
                                },
                                value: CuidadosUci2.nuevoRegistro.hs
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
                        (CuidadosUci2.show != false ? [PacientesUCI.vTable('table-cuidados', CuidadosUci2.getRegistros(), CuidadosUci2.arqTable())] : [])
                    ),
                ]),
                m('br')

            ]),


        ]
    }

}

export default CuidadosUci2;