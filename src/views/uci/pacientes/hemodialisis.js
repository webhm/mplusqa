import m from "mithril";
import App from "../../../models/App";
import Loader from "../../utils/loader";
import Errors from "../../utils/errors";
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
    static allRegistros = [];
    static registros = [];
    static nuevoRegistro = null;
    static show = false;
    static editarAll = false;
    static loaderRows = false;

    static validarRegistro() {

    }
    static iniciarRegistro() {
        HemodialisisUci.nuevoRegistro = new Hemodialisis();
    }
    static agregarRegistro() {
        if (HemodialisisUci.allRegistros.length == 0) {
            HemodialisisUci.nuevoRegistro.nro = 1;
            HemodialisisUci.allRegistros.push(HemodialisisUci.nuevoRegistro);
        } else {
            HemodialisisUci.nuevoRegistro.nro = (HemodialisisUci.allRegistros[HemodialisisUci.allRegistros.length - 1].nro + 1);
            HemodialisisUci.allRegistros.push(HemodialisisUci.nuevoRegistro);
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
        HemodialisisUci.allRegistros.map((_v, _i) => {
            if (_v.nro == HemodialisisUci.nuevoRegistro.nro) {
                HemodialisisUci.allRegistros[_i] = HemodialisisUci.nuevoRegistro;
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

        result = HemodialisisUci.allRegistros.sort((a, b) => b.nro - a.nro);
        // Quitar duplicados
        resultId = result.filter(o => hash[o.id] ? false : hash[o.id] = true);
        // Ordenar desc
        _arr = resultId.sort((a, b) => a.nro - b.nro);

        HemodialisisUci.registros = _arr;

    }

    static copyAllRegistros() {

        let re = [];
        let res = [];
        let result = [];
        let resultNro = [];
        let hash = {};

        re = HemodialisisUci.allRegistros;

        result = re.sort((a, b) => b.nro - a.nro);

        console.log(99, re)
        // Quitar duplicados
        resultNro = result.filter(o => hash[o.id] ? false : hash[o.id] = true).sort((a, b) => a.nro - b.nro);

        resultNro.map((_v, _i) => {
            HemodialisisUci.iniciarRegistro();
            HemodialisisUci.nuevoRegistro.id = _v.id;
            HemodialisisUci.nuevoRegistro.hemo = _v.hemo;
            if (PacientesUCI.numeroTurno != 1) {
                HemodialisisUci.nuevoRegistro.observacion = _v.observacion;
                HemodialisisUci.nuevoRegistro.am = _v.am;
                HemodialisisUci.nuevoRegistro.pm = _v.pm;
                HemodialisisUci.nuevoRegistro.hs = _v.hs;
            }
            HemodialisisUci.nuevoRegistro.numeroTurno = PacientesUCI.numeroTurno;
            HemodialisisUci.nuevoRegistro.fechaHoraTurno = PacientesUCI.fechaHoraTurno;
            res.push(HemodialisisUci.nuevoRegistro);
            HemodialisisUci.nuevoRegistro = null;
        });


        HemodialisisUci.allRegistros.push.apply(HemodialisisUci.allRegistros, res);

        HemodialisisUci.allRegistros.map((_v, _i) => {
            if (_v.nro == null) {
                HemodialisisUci.allRegistros[_i].nro = (_i + 1);
                if (_v.id == res.id) {
                    res.nro = HemodialisisUci.allRegistros[_i].nro;
                }

            }
        });

    
        
        FecthUci.registrarAllSeccion(res).then(() => {
            setTimeout(() => {
                HemodialisisUci.filterRegistros();
                m.redraw();
                setTimeout(() => {
                    HemodialisisUci.loaderRows = false;
                    PacientesUCI.vReloadTable('table-hemodialisis', HemodialisisUci.getRegistros());
                    m.redraw();
                }, 100);
            }, 100);
        });



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
                                m("div.text-center.pd-5[tabindex='-1']", [
                                    m("button.btn-xs.btn-block.tx-semibold[type='button'][tabindex='-1']", {
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
                    return full.hemo;
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
                                    class: (oData.editar == true || HemodialisisUci.getRegistro(oData.id).editar == true ? 'd-none' : ''),
                                    ondblclick: (e) => {
                                        if (HemodialisisUci.editarAll == true) {
                                            $.alert('Ud esta editando toda la sección. Cancele esta operación para reintentar.')
                                        } else {
                                            HemodialisisUci.nuevoRegistro = null
                                            HemodialisisUci.verRegistro(oData);
                                        }
                                    },
                                }, (oData.am !== null ? oData.am : m.trust('<div class="text-center pd-l-0 pd-r-0"><hr style="border-color:#001737;"/></div>'))),
                                (HemodialisisUci.nuevoRegistro !== null || (HemodialisisUci.getRegistro(oData.id).editar == true) ? [
                                    m("input", {
                                        id: "am" + HemodialisisUci.getRegistro(oData.id).id,
                                        class: "form-control tx-semibold tx-14 " + (HemodialisisUci.getRegistro(oData.id).editar == true ? '' : 'd-none'),
                                        type: "text",
                                        placeholder: "...",
                                        ondblclick: (e) => {
                                            if (HemodialisisUci.editarAll == true) {
                                                $.alert('Ud esta editando toda la sección. Cancele esta operación para reintentar.')
                                            } else {
                                                oData.editar = null;
                                                HemodialisisUci.nuevoRegistro = null;
                                            }
                                        },
                                        onkeypress: (e) => {
                                            if (e.keyCode == 13) {

                                                if (HemodialisisUci.editarAll == true) {
                                                    $.alert('Ud esta editando toda la sección. Cancele esta operación para reintentar.')
                                                } else {
                                                    if (HemodialisisUci.nuevoRegistro.editar == null) {
                                                        HemodialisisUci.nuevoRegistro.numeroTurno = PacientesUCI.numeroTurno;
                                                        HemodialisisUci.nuevoRegistro.fechaHoraTurno = PacientesUCI.fechaHoraTurno;
                                                        HemodialisisUci.agregarRegistro();
                                                        FecthUci.registrarSeccion(HemodialisisUci.nuevoRegistro);
                                                        HemodialisisUci.nuevoRegistro = null;
                                                        HemodialisisUci.filterRegistros();
                                                    } else {
                                                        HemodialisisUci.editarRegistro();
                                                        FecthUci.actualizarSeccion(HemodialisisUci.nuevoRegistro);
                                                        HemodialisisUci.nuevoRegistro = null;
                                                        HemodialisisUci.filterRegistros();

                                                    }

                                                }

                                            }
                                        },
                                        oninput: (e) => {
                                            if (PacientesUCI.numeroTurno == 1) {
                                                HemodialisisUci.getRegistro(oData.id).am = (e.target.value.length !== 0 ? e.target.value : null);
                                            } else {
                                                e.preventDefault();
                                            }
                                        },
                                        oncreate: (el) => {
                                            if (PacientesUCI.numeroTurno == 1) {
                                                el.dom.disabled = false;
                                            } else {
                                                el.dom.disabled = true;
                                            }
                                        },
                                        value: (HemodialisisUci.getRegistro(oData.id).am !== null ? HemodialisisUci.getRegistro(oData.id).am : '')
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
                                    class: (oData.editar == true || HemodialisisUci.getRegistro(oData.id).editar == true ? 'd-none' : ''),
                                    ondblclick: (e) => {
                                        if (HemodialisisUci.editarAll == true) {
                                            $.alert('Ud esta editando toda la sección. Cancele esta operación para reintentar.')
                                        } else {
                                            HemodialisisUci.nuevoRegistro = null
                                            HemodialisisUci.verRegistro(oData);
                                        }
                                    },
                                }, (oData.pm !== null ? oData.pm : m.trust('<div class="text-center pd-l-0 pd-r-0"><hr style="border-color:#001737;"/></div>'))),
                                (HemodialisisUci.nuevoRegistro !== null || (HemodialisisUci.getRegistro(oData.id).editar == true) ? [
                                    m("input", {
                                        id: "pm" + HemodialisisUci.getRegistro(oData.id).id,
                                        class: "form-control tx-semibold tx-14 " + (HemodialisisUci.getRegistro(oData.id).editar == true ? '' : 'd-none'),
                                        type: "text",
                                        placeholder: "...",
                                        ondblclick: (e) => {
                                            if (HemodialisisUci.editarAll == true) {
                                                $.alert('Ud esta editando toda la sección. Cancele esta operación para reintentar.')
                                            } else {
                                                oData.editar = null;
                                                HemodialisisUci.nuevoRegistro = null;
                                            }
                                        },
                                        onkeypress: (e) => {
                                            if (e.keyCode == 13) {

                                                if (HemodialisisUci.editarAll == true) {
                                                    $.alert('Ud esta editando toda la sección. Cancele esta operación para reintentar.')
                                                } else {

                                                    if (HemodialisisUci.nuevoRegistro.editar == null) {
                                                        HemodialisisUci.nuevoRegistro.numeroTurno = PacientesUCI.numeroTurno;
                                                        HemodialisisUci.nuevoRegistro.fechaHoraTurno = PacientesUCI.fechaHoraTurno;
                                                        HemodialisisUci.agregarRegistro();
                                                        FecthUci.registrarSeccion(HemodialisisUci.nuevoRegistro);
                                                        HemodialisisUci.nuevoRegistro = null;
                                                        HemodialisisUci.filterRegistros();
                                                    } else {
                                                        HemodialisisUci.editarRegistro();
                                                        FecthUci.actualizarSeccion(HemodialisisUci.nuevoRegistro);
                                                        HemodialisisUci.nuevoRegistro = null;
                                                        HemodialisisUci.filterRegistros();

                                                    }

                                                }

                                            }
                                        },
                                        oninput: (e) => {
                                            if (PacientesUCI.numeroTurno == 2) {
                                                HemodialisisUci.getRegistro(oData.id).pm = (e.target.value.length !== 0 ? e.target.value : null);
                                            } else {
                                                e.preventDefault();
                                            }
                                        },
                                        oncreate: (el) => {
                                            if (PacientesUCI.numeroTurno == 2) {
                                                el.dom.disabled = false;
                                            } else {
                                                el.dom.disabled = true;
                                            }
                                        },
                                        value: (HemodialisisUci.getRegistro(oData.id).pm !== null ? HemodialisisUci.getRegistro(oData.id).pm : '')
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
                                    class: (oData.editar == true || HemodialisisUci.getRegistro(oData.id).editar == true ? 'd-none' : ''),
                                    ondblclick: (e) => {
                                        if (HemodialisisUci.editarAll == true) {
                                            $.alert('Ud esta editando toda la sección. Cancele esta operación para reintentar.')
                                        } else {
                                            HemodialisisUci.nuevoRegistro = null
                                            HemodialisisUci.verRegistro(oData);
                                        }
                                    },
                                }, (oData.hs !== null ? oData.hs : m.trust('<div class="text-center pd-l-0 pd-r-0"><hr style="border-color:#001737;"/></div>'))),
                                (HemodialisisUci.nuevoRegistro !== null || (HemodialisisUci.getRegistro(oData.id).editar == true) ? [
                                    m("input", {
                                        id: "hs" + HemodialisisUci.getRegistro(oData.id).id,
                                        class: "form-control tx-semibold tx-14 " + (HemodialisisUci.getRegistro(oData.id).editar == true ? '' : 'd-none'),
                                        type: "text",
                                        placeholder: "...",
                                        ondblclick: (e) => {
                                            if (HemodialisisUci.editarAll == true) {
                                                $.alert('Ud esta editando toda la sección. Cancele esta operación para reintentar.')
                                            } else {
                                                oData.editar = null;
                                                HemodialisisUci.nuevoRegistro = null;
                                            }
                                        },
                                        onkeypress: (e) => {
                                            if (e.keyCode == 13) {

                                                if (HemodialisisUci.editarAll == true) {
                                                    $.alert('Ud esta editando toda la sección. Cancele esta operación para reintentar.')
                                                } else {

                                                    if (HemodialisisUci.nuevoRegistro.editar == null) {
                                                        HemodialisisUci.nuevoRegistro.numeroTurno = PacientesUCI.numeroTurno;
                                                        HemodialisisUci.nuevoRegistro.fechaHoraTurno = PacientesUCI.fechaHoraTurno;
                                                        HemodialisisUci.agregarRegistro();
                                                        FecthUci.registrarSeccion(HemodialisisUci.nuevoRegistro);
                                                        HemodialisisUci.nuevoRegistro = null;
                                                        HemodialisisUci.filterRegistros();
                                                    } else {
                                                        HemodialisisUci.editarRegistro();
                                                        FecthUci.actualizarSeccion(HemodialisisUci.nuevoRegistro);
                                                        HemodialisisUci.nuevoRegistro = null;
                                                        HemodialisisUci.filterRegistros();

                                                    }

                                                }

                                            }
                                        },
                                        oninput: (e) => {
                                            if (PacientesUCI.numeroTurno == 3) {
                                                HemodialisisUci.getRegistro(oData.id).hs = (e.target.value.length !== 0 ? e.target.value : null);
                                            } else {
                                                e.preventDefault();
                                            }
                                        },
                                        oncreate: (el) => {
                                            if (PacientesUCI.numeroTurno == 3) {
                                                el.dom.disabled = false;
                                            } else {
                                                el.dom.disabled = true;
                                            }
                                        },
                                        value: (HemodialisisUci.getRegistro(oData.id).hs !== null ? HemodialisisUci.getRegistro(oData.id).hs : '')

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
                                    class: (oData.editar == true || HemodialisisUci.getRegistro(oData.id).editar == true ? 'd-none' : ''),
                                    ondblclick: (e) => {
                                        if (HemodialisisUci.editarAll == true) {
                                            $.alert('Ud esta editando toda la sección. Cancele esta operación para reintentar.')
                                        } else {
                                            HemodialisisUci.nuevoRegistro = null
                                            HemodialisisUci.verRegistro(oData);
                                        }
                                    },
                                }, (oData.observacion !== null ? oData.observacion : m.trust('<div class="text-center pd-l-0 pd-r-0"><hr style="border-color:#001737;"/></div>'))),
                                (HemodialisisUci.nuevoRegistro !== null || (HemodialisisUci.getRegistro(oData.id).editar == true) ? [
                                    m("input", {
                                        id: "observacion" + HemodialisisUci.getRegistro(oData.id).id,
                                        class: "form-control tx-semibold tx-14 " + (HemodialisisUci.getRegistro(oData.id).editar == true ? '' : 'd-none'),
                                        type: "text",
                                        placeholder: "...",
                                        onkeypress: (e) => {
                                            if (e.keyCode == 13) {
                                                if (HemodialisisUci.editarAll == true) {
                                                    $.alert('Ud esta editando toda la sección. Cancele esta operación para reintentar.')
                                                } else {

                                                    if (HemodialisisUci.nuevoRegistro.editar == null) {
                                                        HemodialisisUci.nuevoRegistro.numeroTurno = PacientesUCI.numeroTurno;
                                                        HemodialisisUci.nuevoRegistro.fechaHoraTurno = PacientesUCI.fechaHoraTurno;
                                                        HemodialisisUci.agregarRegistro();
                                                        FecthUci.registrarSeccion(HemodialisisUci.nuevoRegistro);
                                                        HemodialisisUci.nuevoRegistro = null;
                                                        HemodialisisUci.filterRegistros();
                                                    } else {
                                                        HemodialisisUci.editarRegistro();
                                                        FecthUci.actualizarSeccion(HemodialisisUci.nuevoRegistro);
                                                        HemodialisisUci.nuevoRegistro = null;
                                                        HemodialisisUci.filterRegistros();

                                                    }

                                                }
                                            }
                                        },
                                        ondblclick: (e) => {
                                            if (HemodialisisUci.editarAll == true) {
                                                $.alert('Ud esta editando toda la sección. Cancele esta operación para reintentar.')
                                            } else {
                                                oData.editar = null;
                                                HemodialisisUci.nuevoRegistro = null;
                                            }
                                        },
                                        oninput: (e) => {
                                            HemodialisisUci.getRegistro(oData.id).observacion = (e.target.value.length !== 0 ? e.target.value : null);
                                        },
                                        
                                        value: (HemodialisisUci.getRegistro(oData.id).observacion !== null ? HemodialisisUci.getRegistro(oData.id).observacion : '')

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
                                        disabled: (TurnosUci.nuevoTurno !== null && TurnosUci.nuevoTurno.gestion == 1 ? (PacientesUCI.fechaHoraTurno != oData.fechaHoraTurno ? 'disabled' : '') : 'disabled'),
                                        onclick: () => {
                                            HemodialisisUci.nuevoRegistro = null
                                            HemodialisisUci.verRegistro(oData);
                                        },
                                    },
                                        'Editar',
                                    ),
                                    m("button.btn.btn-xs.btn-block.btn-danger[type='button']", {
                                        class: (oData.editar && HemodialisisUci.editarAll == false ? '' : 'd-none'),
                                        disabled: (PacientesUCI.fechaHoraTurno != oData.fechaHoraTurno ? 'disabled' : ''),
                                        onclick: () => {
                                            oData.editar = null;
                                            HemodialisisUci.nuevoRegistro = null;
                                        },
                                    },
                                        'Cancelar Edición',
                                    ),
                                    m("button.btn.btn-xs.btn-dark[type='button']", {
                                        class: (PacientesUCI.fechaHoraTurno != oData.fechaHoraTurno && oData.id == 'ParcheLimpioSeco' ? '' : 'd-none'),
                                        onclick: (el) => {
                                            HemodialisisUci.loaderRows = true;
                                            HemodialisisUci.copyAllRegistros();
                                            el.target.classList.add('d-none');

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
        let table = document.getElementById('table-hemodialisis');
        // clear first
        if (table != null) {
            $('#table-hemodialisis').DataTable().clear().destroy();
        }
    }

    static getRegistro(id) {

        if (id == 'ParcheLimpioSeco' && HemodialisisUci.registros[0].id == id) {
            return HemodialisisUci.registros[0];
        } else if (id == 'FechaCuracionParche' && HemodialisisUci.registros[1].id == id) {
            return HemodialisisUci.registros[1];
        } else if (id == 'TodosAccesosTapados' && HemodialisisUci.registros[2].id == id) {
            return HemodialisisUci.registros[2];
        } else if (id == 'RegistroNumerosDias' && HemodialisisUci.registros[3].id == id) {
            return HemodialisisUci.registros[3];
        } else if (id == 'RegistroCambioEquipo' && HemodialisisUci.registros[4].id == id) {
            return HemodialisisUci.registros[4];
        } else {
            return {
                editar: null
            };
        }

    }

    static editarTodo() {
        return HemodialisisUci.registros.map((v, i) => {
            HemodialisisUci.registros[i].editar = true;
        });
    }

    static cancelarTodo() {
        return HemodialisisUci.registros.map((v, i) => {
            delete HemodialisisUci.registros[i].editar;
        });

    }

    static async guardarTodo() {

        HemodialisisUci.editarAll = false;
        HemodialisisUci.cancelarTodo();

        Promise.all(
            HemodialisisUci.registros.map(async (v) => {
                await FecthUci.actualizarSeccion(v);
            }),
        ).then(() => {
            HemodialisisUci.loaderRows = false;
        });


        HemodialisisUci.filterRegistros();

        m.redraw();


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

                        HemodialisisUci.show = !HemodialisisUci.show;
                    }

                }, [
                    m("th.tx-semibold[scope='col'][colspan='12']",
                        "CATETER VIA CENTRAL O HEMODIALISIS"
                    ),

                ])
            ),
            m("tbody.bd.bd-2", {
                style: { "border-color": "#5173a1" },
                class: (HemodialisisUci.show ? '' : 'd-none')
            }, [

                m("tr.bd.bd-2.tx-uppercase.d-none", {
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
                m("tr.bd.bd-2.d-none", {
                    style: { "border-color": "#5173a1" },
                    class: (TurnosUci.nuevoTurno !== null && TurnosUci.nuevoTurno.gestion == 1 ? '' : 'd-none'),
                }, [
                    m("td.tx-14.tx-normal.d-none[colspan='3']",
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
                            label: "Parche limpio y seco"
                        }, {
                            id: "FechaCuracionParche",
                            label: "Fecha de curación sobre parche"
                        },
                        {
                            id: "TodosAccesosTapados",
                            label: "Todos los accesos tapados"
                        },
                        {
                            id: "RegistroNumerosDias",
                            label: "Registro de números de días"
                        },
                        {
                            id: "RegistroCambioEquipo",
                            label: "Registro de cambio de equipo"
                        }
                        ].map(x =>
                            m('option[id="' + x.id + '"]', x.label)
                        ))
                    ),
                    m("td.tx-14.tx-normal.d-none[colspan='3']",
                        (HemodialisisUci.nuevoRegistro !== null ? [
                            m('div.d-flex', [
                                m("input", {
                                    id: "_am" + HemodialisisUci.nuevoRegistro.id,
                                    class: "form-control tx-semibold tx-14",
                                    type: "text",
                                    placeholder: "...",
                                    oninput: (e) => {
                                        if (PacientesUCI.numeroTurno == 1) {
                                            HemodialisisUci.nuevoRegistro.am = (e.target.value.length !== 0 ? e.target.value : null);
                                        } else {
                                            e.target.value = '';
                                        }
                                    },
                                    value: HemodialisisUci.nuevoRegistro.am

                                })

                            ]),
                        ] : [])
                    ),
                    m("td.tx-14.tx-normal.d-none[colspan='3']",
                        (HemodialisisUci.nuevoRegistro !== null ? [
                            m('div.d-flex', [
                                m("input", {
                                    id: "_pm" + HemodialisisUci.nuevoRegistro.id,
                                    class: "form-control tx-semibold tx-14",
                                    type: "text",
                                    placeholder: "...",
                                    oninput: (e) => {
                                        if (PacientesUCI.numeroTurno == 2) {
                                            HemodialisisUci.nuevoRegistro.pm = (e.target.value.length !== 0 ? e.target.value : null);
                                        } else {
                                            e.target.value = '';
                                        }
                                    },
                                    value: HemodialisisUci.nuevoRegistro.pm

                                })

                            ]),
                        ] : [])
                    ),

                    m("td.tx-14.tx-normal.d-none[colspan='3']",
                        (HemodialisisUci.nuevoRegistro !== null ? [
                            m('div.d-flex', [
                                m("input", {
                                    id: "_hs" + HemodialisisUci.nuevoRegistro.id,
                                    class: "form-control tx-semibold tx-14",
                                    type: "text",
                                    placeholder: "...",
                                    oninput: (e) => {
                                        if (PacientesUCI.numeroTurno == 3) {
                                            HemodialisisUci.nuevoRegistro.hs = (e.target.value.length !== 0 ? e.target.value : null);
                                        } else {
                                            e.target.value = '';
                                        }
                                    },
                                    value: HemodialisisUci.nuevoRegistro.hs

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
                        (HemodialisisUci.nuevoRegistro !== null ? [
                            m("input", {
                                id: "_observacion" + HemodialisisUci.nuevoRegistro.id,
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
                m("tr.tx-uppercase", [
                    m("td[colspan='12'][align='right']", [
                        m("button.btn.btn-xs.btn-dark.mg-1[type='button']", {
                            class: (HemodialisisUci.editarAll == false ? (HemodialisisUci.loaderRows == true ? 'd-none' : '') : 'd-none'),
                            onclick: () => {

                                HemodialisisUci.editarAll = true;
                                HemodialisisUci.editarTodo();
                                console.log('ll', HemodialisisUci.registros)


                            },
                        },
                            'Editar Todo',
                        ),
                        m("button.btn.btn-xs.btn-danger.mg-1[type='button']", {
                            class: (HemodialisisUci.editarAll == true ? '' : 'd-none'),
                            onclick: (el) => {

                                HemodialisisUci.editarAll = false;
                                HemodialisisUci.cancelarTodo();
                                console.log('ll', HemodialisisUci.registros)

                            },
                        },
                            'Cancelar',
                        ),
                    ]),
                ]),
                m("tr.tx-uppercase.mg-t-20", {
                    class: (HemodialisisUci.loaderRows == true ? '' : 'd-none'),
                }, [
                    m("td[colspan='12']", [
                        m('div.pd-20', [
                            m(Loader)
                        ])

                    ])
                ]),
                m("tr.tx-uppercase.mg-t-20", {
                    class: (HemodialisisUci.loaderRows == false ? '' : 'd-none'),
                }, [
                    m("td[colspan='12']",
                        {
                            class: (HemodialisisUci.show ? '' : 'd-none'),
                        },
                        (HemodialisisUci.registros.length != 0 ? [PacientesUCI.vTable('table-hemodialisis', HemodialisisUci.getRegistros(), HemodialisisUci.arqTable())] : [])

                    ),
                ]),
                m("tr.tx-uppercase", [
                    m("td[colspan='12'][align='right']", [
                        m("button.btn.btn-xs.btn-dark.mg-1[type='button']", {
                            class: (HemodialisisUci.editarAll == true ? '' : 'd-none'),

                            onclick: () => {

                                HemodialisisUci.loaderRows = true;
                                HemodialisisUci.guardarTodo();

                            },
                        },
                            'Guardar Todo',
                        ),

                    ]),
                ]),
                m('br')
            ]),
        ]
    }
}

export default HemodialisisUci;