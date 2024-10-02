import m from "mithril";
import PacientesUCI from "./pacientesUci";
import FecthUci from "./fecthUci";
import TurnosUci from "./turnosUci";
import Loader from "../../utils/loader";

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
    static allRegistros = [];
    static registros = [];
    static nuevoRegistro = null;
    static show = false;
    static editarAll = false;
    static loaderRows = false;

    static validarRegistro() {

    }
    static iniciarRegistro() {
        CateterUci.nuevoRegistro = new Cateter();
    }
    static agregarRegistro() {
        if (CateterUci.allRegistros.length == 0) {
            CateterUci.nuevoRegistro.nro = 1;
            CateterUci.allRegistros.push(CateterUci.nuevoRegistro);
        } else {
            CateterUci.nuevoRegistro.nro = (CateterUci.allRegistros[CateterUci.allRegistros.length - 1].nro + 1);
            CateterUci.allRegistros.push(CateterUci.nuevoRegistro);
        }
    }
    static verRegistro(registro) {
        registro.editar = true;
        CateterUci.nuevoRegistro = registro;
        console.log(CateterUci.nuevoRegistro)
    }
    static editarRegistro() {
        CateterUci.nuevoRegistro.editar = null;
        CateterUci.allRegistros.map((_v, _i) => {
            if (_v.nro == CateterUci.nuevoRegistro.nro) {
                CateterUci.allRegistros[_i] = CateterUci.nuevoRegistro;
            }
        });

    }
    static eliminarRegistro(obj) {

        CateterUci.registros = PacientesUCI.extractSeccion(Array.from(document.getElementById('sec_Cateter').options));

        let hash = {};
        let res = [];
        let _arr = [];
        let result = [];
        let resultId = [];

        CateterUci.registros.map((_v, _i) => {
            if (_v.nro !== obj.nro) {
                res.push(_v);
            }
        });

        result = res.sort((a, b) => b.nro - a.nro);

        resultId = result.filter(o => hash[o.id] ? false : hash[o.id] = true);
        // Ordenar desc
        _arr = resultId.sort((a, b) => a.nro - b.nro);

        CateterUci.registros = _arr;

    }
    static filterRegistros() {

        let result = [];
        let resultId = [];
        let _arr = [];
        let hash = {};

        result = CateterUci.allRegistros.sort((a, b) => b.nro - a.nro);
        // Quitar duplicados
        resultId = result.filter(o => hash[o.id] ? false : hash[o.id] = true);
        // Ordenar desc
        _arr = resultId.sort((a, b) => a.nro - b.nro);

        CateterUci.registros = _arr;

    }

    static copyAllRegistros() {

        let re = [];
        let res = [];
        let result = [];
        let resultNro = [];
        let hash = {};



        re = CateterUci.allRegistros;

        result = re.sort((a, b) => b.nro - a.nro);
        // Quitar duplicados
        resultNro = result.filter(o => hash[o.id] ? false : hash[o.id] = true).sort((a, b) => a.nro - b.nro);

        resultNro.map((_v, _i) => {
            CateterUci.iniciarRegistro();
            CateterUci.nuevoRegistro.id = _v.id;
            CateterUci.nuevoRegistro.cateter = _v.cateter;
            if (PacientesUCI.numeroTurno != 1) {
                CateterUci.nuevoRegistro.observacion = _v.observacion;
                CateterUci.nuevoRegistro.am = _v.am;
                CateterUci.nuevoRegistro.pm = _v.pm;
                CateterUci.nuevoRegistro.hs = _v.hs;
            }
            CateterUci.nuevoRegistro.numeroTurno = PacientesUCI.numeroTurno;
            CateterUci.nuevoRegistro.fechaHoraTurno = PacientesUCI.fechaHoraTurno;
            res.push(CateterUci.nuevoRegistro);
            CateterUci.nuevoRegistro = null;
        });


        CateterUci.allRegistros.push.apply(CateterUci.allRegistros, res);
        // Asignar Nro

        CateterUci.allRegistros.map((_v, _i) => {
            if (_v.nro == null) {
                CateterUci.allRegistros[_i].nro = (_i + 1);
                if (_v.id == res.id) {
                    res.nro = CateterUci.allRegistros[_i].nro;
                }

            }


        });


        console.log(7788, res)

     
        
        FecthUci.registrarAllSeccion(res).then(() => {
            setTimeout(() => {
                CateterUci.filterRegistros();
                m.redraw();
                setTimeout(() => {
                    CateterUci.loaderRows = false;
                    PacientesUCI.vReloadTable('table-cateter', CateterUci.getRegistros());
                    m.redraw();
                }, 100);
            }, 100);
        });




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
                                        class: (PacientesUCI.fechaHoraTurno != oData.fechaHoraTurno ? 'bg-light' : 'bg-warning')
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
                    return full.cateter;
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
                                    class: (oData.editar == true || CateterUci.getRegistro(oData.id).editar == true ? 'd-none' : ''),
                                    ondblclick: (e) => {
                                        if (CateterUci.editarAll == true) {
                                            $.alert('Ud esta editando toda la sección. Cancele esta operación para reintentar.')
                                        } else {
                                            CateterUci.nuevoRegistro = null
                                            CateterUci.verRegistro(oData);
                                        }
                                    },
                                }, (oData.am !== null ? oData.am : m.trust('<div class="text-center pd-l-0 pd-r-0"><hr style="border-color:#001737;"/></div>'))),
                                (CateterUci.nuevoRegistro !== null || (CateterUci.getRegistro(oData.id).editar == true) ? [
                                    m("input", {
                                        id: "am" + CateterUci.getRegistro(oData.id).id,
                                        class: "form-control tx-semibold tx-14 " + (CateterUci.getRegistro(oData.id).editar == true ? '' : 'd-none'),
                                        type: "text",
                                        placeholder: "...",
                                        ondblclick: (e) => {
                                            if (CateterUci.editarAll == true) {
                                                $.alert('Ud esta editando toda la sección. Cancele esta operación para reintentar.')
                                            } else {
                                                oData.editar = null;
                                                CateterUci.nuevoRegistro = null;
                                            }
                                        },
                                        onkeypress: (e) => {
                                            if (e.keyCode == 13) {

                                                if (CateterUci.editarAll == true) {
                                                    $.alert('Ud esta editando toda la sección. Cancele esta operación para reintentar.')
                                                } else {
                                                    if (CateterUci.nuevoRegistro.editar == null) {
                                                        CateterUci.nuevoRegistro.numeroTurno = PacientesUCI.numeroTurno;
                                                        CateterUci.nuevoRegistro.fechaHoraTurno = PacientesUCI.fechaHoraTurno;
                                                        CateterUci.agregarRegistro();
                                                        FecthUci.registrarSeccion(CateterUci.nuevoRegistro);
                                                        CateterUci.nuevoRegistro = null;
                                                        CateterUci.filterRegistros();
                                                    } else {
                                                        CateterUci.editarRegistro();
                                                        FecthUci.actualizarSeccion(CateterUci.nuevoRegistro);
                                                        CateterUci.nuevoRegistro = null;
                                                        CateterUci.filterRegistros();

                                                    }

                                                }

                                            }
                                        },
                                        oninput: (e) => {
                                            if (PacientesUCI.numeroTurno == 1) {
                                                CateterUci.getRegistro(oData.id).am = (e.target.value.length !== 0 ? e.target.value : null);
                                            } else {
                                                e.preventDefault();
                                            }
                                        },
                                        value: (CateterUci.getRegistro(oData.id).am !== null ? CateterUci.getRegistro(oData.id).am : '')
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
                                    class: (oData.editar == true || CateterUci.getRegistro(oData.id).editar == true ? 'd-none' : ''),
                                    ondblclick: (e) => {
                                        if (CateterUci.editarAll == true) {
                                            $.alert('Ud esta editando toda la sección. Cancele esta operación para reintentar.')
                                        } else {
                                            CateterUci.nuevoRegistro = null
                                            CateterUci.verRegistro(oData);
                                        }
                                    },
                                }, (oData.pm !== null ? oData.pm : m.trust('<div class="text-center pd-l-0 pd-r-0"><hr style="border-color:#001737;"/></div>'))),
                                (CateterUci.nuevoRegistro !== null || (CateterUci.getRegistro(oData.id).editar == true) ? [
                                    m("input", {
                                        id: "pm" + CateterUci.getRegistro(oData.id).id,
                                        class: "form-control tx-semibold tx-14 " + (CateterUci.getRegistro(oData.id).editar == true ? '' : 'd-none'),
                                        type: "text",
                                        placeholder: "...",
                                        ondblclick: (e) => {
                                            if (CateterUci.editarAll == true) {
                                                $.alert('Ud esta editando toda la sección. Cancele esta operación para reintentar.')
                                            } else {
                                                oData.editar = null;
                                                CateterUci.nuevoRegistro = null;
                                            }
                                        },
                                        onkeypress: (e) => {
                                            if (e.keyCode == 13) {

                                                if (CateterUci.editarAll == true) {
                                                    $.alert('Ud esta editando toda la sección. Cancele esta operación para reintentar.')
                                                } else {

                                                    if (CateterUci.nuevoRegistro.editar == null) {
                                                        CateterUci.nuevoRegistro.numeroTurno = PacientesUCI.numeroTurno;
                                                        CateterUci.nuevoRegistro.fechaHoraTurno = PacientesUCI.fechaHoraTurno;
                                                        CateterUci.agregarRegistro();
                                                        FecthUci.registrarSeccion(CateterUci.nuevoRegistro);
                                                        CateterUci.nuevoRegistro = null;
                                                        CateterUci.filterRegistros();
                                                    } else {
                                                        CateterUci.editarRegistro();
                                                        FecthUci.actualizarSeccion(CateterUci.nuevoRegistro);
                                                        CateterUci.nuevoRegistro = null;
                                                        CateterUci.filterRegistros();

                                                    }

                                                }

                                            }
                                        },
                                        oninput: (e) => {
                                            if (PacientesUCI.numeroTurno == 2) {
                                                CateterUci.getRegistro(oData.id).pm = (e.target.value.length !== 0 ? e.target.value : null);
                                            } else {
                                                e.preventDefault();
                                            }
                                        },
                                        value: (CateterUci.getRegistro(oData.id).pm !== null ? CateterUci.getRegistro(oData.id).pm : '')
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
                                    class: (oData.editar == true || CateterUci.getRegistro(oData.id).editar == true ? 'd-none' : ''),
                                    ondblclick: (e) => {
                                        if (CateterUci.editarAll == true) {
                                            $.alert('Ud esta editando toda la sección. Cancele esta operación para reintentar.')
                                        } else {
                                            CateterUci.nuevoRegistro = null
                                            CateterUci.verRegistro(oData);
                                        }
                                    },
                                }, (oData.hs !== null ? oData.hs : m.trust('<div class="text-center pd-l-0 pd-r-0"><hr style="border-color:#001737;"/></div>'))),
                                (CateterUci.nuevoRegistro !== null || (CateterUci.getRegistro(oData.id).editar == true) ? [
                                    m("input", {
                                        id: "hs" + CateterUci.getRegistro(oData.id).id,
                                        class: "form-control tx-semibold tx-14 " + (CateterUci.getRegistro(oData.id).editar == true ? '' : 'd-none'),
                                        type: "text",
                                        placeholder: "...",
                                        ondblclick: (e) => {
                                            if (CateterUci.editarAll == true) {
                                                $.alert('Ud esta editando toda la sección. Cancele esta operación para reintentar.')
                                            } else {
                                                oData.editar = null;
                                                CateterUci.nuevoRegistro = null;
                                            }
                                        },
                                        onkeypress: (e) => {
                                            if (e.keyCode == 13) {

                                                if (CateterUci.editarAll == true) {
                                                    $.alert('Ud esta editando toda la sección. Cancele esta operación para reintentar.')
                                                } else {

                                                    if (CateterUci.nuevoRegistro.editar == null) {
                                                        CateterUci.nuevoRegistro.numeroTurno = PacientesUCI.numeroTurno;
                                                        CateterUci.nuevoRegistro.fechaHoraTurno = PacientesUCI.fechaHoraTurno;
                                                        CateterUci.agregarRegistro();
                                                        FecthUci.registrarSeccion(CateterUci.nuevoRegistro);
                                                        CateterUci.nuevoRegistro = null;
                                                        CateterUci.filterRegistros();
                                                    } else {
                                                        CateterUci.editarRegistro();
                                                        FecthUci.actualizarSeccion(CateterUci.nuevoRegistro);
                                                        CateterUci.nuevoRegistro = null;
                                                        CateterUci.filterRegistros();

                                                    }

                                                }

                                            }
                                        },
                                        oninput: (e) => {
                                            if (PacientesUCI.numeroTurno == 3) {
                                                CateterUci.getRegistro(oData.id).hs = (e.target.value.length !== 0 ? e.target.value : null);
                                            } else {
                                                e.preventDefault();
                                            }
                                        },
                                        value: (CateterUci.getRegistro(oData.id).hs !== null ? CateterUci.getRegistro(oData.id).hs : '')

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
                                    class: (oData.editar == true || CateterUci.getRegistro(oData.id).editar == true ? 'd-none' : ''),
                                    ondblclick: (e) => {
                                        if (CateterUci.editarAll == true) {
                                            $.alert('Ud esta editando toda la sección. Cancele esta operación para reintentar.')
                                        } else {
                                            CateterUci.nuevoRegistro = null
                                            CateterUci.verRegistro(oData);
                                        }
                                    },
                                }, (oData.observacion !== null ? oData.observacion : m.trust('<div class="text-center pd-l-0 pd-r-0"><hr style="border-color:#001737;"/></div>'))),
                                (CateterUci.nuevoRegistro !== null || (CateterUci.getRegistro(oData.id).editar == true) ? [
                                    m("input", {
                                        id: "observacion" + CateterUci.getRegistro(oData.id).id,
                                        class: "form-control tx-semibold tx-14 " + (CateterUci.getRegistro(oData.id).editar == true ? '' : 'd-none'),
                                        type: "text",
                                        placeholder: "...",
                                        onkeypress: (e) => {
                                            if (e.keyCode == 13) {

                                                if (CateterUci.editarAll == true) {
                                                    $.alert('Ud esta editando toda la sección. Cancele esta operación para reintentar.')
                                                } else {

                                                    if (CateterUci.nuevoRegistro.editar == null) {
                                                        CateterUci.nuevoRegistro.numeroTurno = PacientesUCI.numeroTurno;
                                                        CateterUci.nuevoRegistro.fechaHoraTurno = PacientesUCI.fechaHoraTurno;
                                                        CateterUci.agregarRegistro();
                                                        FecthUci.registrarSeccion(CateterUci.nuevoRegistro);
                                                        CateterUci.nuevoRegistro = null;
                                                        CateterUci.filterRegistros();
                                                    } else {
                                                        CateterUci.editarRegistro();
                                                        FecthUci.actualizarSeccion(CateterUci.nuevoRegistro);
                                                        CateterUci.nuevoRegistro = null;
                                                        CateterUci.filterRegistros();

                                                    }

                                                }

                                            }
                                        },
                                        ondblclick: (e) => {
                                            if (CateterUci.editarAll == true) {
                                                $.alert('Ud esta editando toda la sección. Cancele esta operación para reintentar.')
                                            } else {
                                                oData.editar = null;
                                                CateterUci.nuevoRegistro = null;
                                            }
                                        },
                                        oninput: (e) => {
                                            CateterUci.getRegistro(oData.id).observacion = (e.target.value.length !== 0 ? e.target.value : null);
                                        },
                                        value: (CateterUci.getRegistro(oData.id).observacion !== null ? CateterUci.getRegistro(oData.id).observacion : '')

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
                                        disabled: (TurnosUci.nuevoTurno !== null && TurnosUci.nuevoTurno.gestion == 1 ? (PacientesUCI.fechaHoraTurno != oData.fechaHoraTurno ? 'disabled' : '') : 'disabled'),
                                        onclick: () => {
                                            CateterUci.nuevoRegistro = null
                                            CateterUci.verRegistro(oData);
                                        },
                                    },
                                        'Editar',
                                    ),
                                    m("button.btn.btn-xs.btn-block.btn-danger[type='button']", {
                                        class: (oData.editar && CateterUci.editarAll == false ? '' : 'd-none'),
                                        disabled: (PacientesUCI.fechaHoraTurno != oData.fechaHoraTurno ? 'disabled' : ''),

                                        onclick: () => {
                                            oData.editar = null;
                                            CateterUci.nuevoRegistro = null;
                                        },
                                    },
                                        'Cancelar Edición',
                                    ),

                                    m("button.btn.btn-xs.btn-dark[type='button'][id='copyAll']", {
                                        class: (PacientesUCI.fechaHoraTurno != oData.fechaHoraTurno && oData.id == 'RecoletcorVejiga' ? '' : 'd-none'),
                                        onclick: (el) => {
                                            CateterUci.loaderRows = true;
                                            CateterUci.copyAllRegistros();
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
        let table = document.getElementById('table-cateter');
        // clear first
        if (table != null) {
            $('#table-cateter').DataTable().clear().destroy();
        }
    }

    static getRegistro(id) {

        if (id == 'RecoletcorVejiga' && CateterUci.registros[0].id == id) {
            return CateterUci.registros[0];
        } else if (id == 'RecolectorNoTocaPiso' && CateterUci.registros[1].id == id) {
            return CateterUci.registros[1];
        } else if (id == 'OrinaRecolector' && CateterUci.registros[2].id == id) {
            return CateterUci.registros[2];
        } else if (id == 'SondaFijadaMuslo' && CateterUci.registros[3].id == id) {
            return CateterUci.registros[3];
        } else if (id == 'RegistroAseoGenital' && CateterUci.registros[4].id == id) {
            return CateterUci.registros[4];
        } else if (id == 'RegistroDiasCateter' && CateterUci.registros[5].id == id) {
            return CateterUci.registros[5];
        } else {
            return {
                editar: null
            };
        }

    }

    static editarTodo() {
        return CateterUci.registros.map((v, i) => {
            CateterUci.registros[i].editar = true;
        });
    }

    static cancelarTodo() {
        return CateterUci.registros.map((v, i) => {
            delete CateterUci.registros[i].editar;
        });

    }

    static async guardarTodo() {

        CateterUci.editarAll = false;
        CateterUci.cancelarTodo();

        Promise.all(
            CateterUci.registros.map(async (v) => {
                await FecthUci.actualizarSeccion(v);
            }),
        ).then(() => {
            CateterUci.loaderRows = false;
            console.log(66)
        });


        CateterUci.filterRegistros();

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

                        CateterUci.show = !CateterUci.show;
                    }

                }, [
                    m("th.tx-semibold[scope='col'][colspan='12']",
                        "CATETER URINARIO"
                    ),

                ])
            ),
            m("tbody.bd.bd-2", {
                style: { "border-color": "#5173a1" },
                class: (CateterUci.show ? '' : 'd-none')
            }, [



                m("tr.bd.bd-2.tx-uppercase.d-none", {
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
                m("tr.bd.bd-2.d-none", {
                    style: { "border-color": "#5173a1" },
                    class: (TurnosUci.nuevoTurno !== null && TurnosUci.nuevoTurno.gestion == 1 ? '' : 'd-none'),
                }, [
                    m("td.tx-14.tx-normal.d-none[colspan='3']",
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
                            label: "Recolector más abajo que vejiga"
                        }, {
                            id: "RecolectorNoTocaPiso",
                            label: "Recolector no toca piso"
                        }, {
                            id: "OrinaRecolector",
                            label: "Orina hasta 50% en recolector"
                        },
                        {
                            id: "SondaFijadaMuslo",
                            label: "Sonda fijada en muslo"
                        },
                        {
                            id: "RegistroAseoGenital",
                            label: "Registro de aseo genital"
                        },
                        {
                            id: "RegistroDiasCateter",
                            label: "Registro n° de días de cateter"
                        }
                        ].map(x =>
                            m('option[id="' + x.id + '"]', x.label)
                        ))
                    ),
                    m("td.tx-14.tx-normal.d-none[colspan='3']",
                        (CateterUci.nuevoRegistro !== null ? [
                            m('div.d-flex', [
                                m("input", {
                                    id: "_am" + CateterUci.nuevoRegistro.id,
                                    class: "form-control tx-semibold tx-14",
                                    type: "text",
                                    placeholder: "...",
                                    oninput: (e) => {
                                        if (PacientesUCI.numeroTurno == 1) {
                                            CateterUci.nuevoRegistro.am = (e.target.value.length !== 0 ? e.target.value : null);
                                        } else {
                                            e.target.value = '';
                                        }
                                    },
                                    value: CateterUci.nuevoRegistro.am,

                                })

                            ]),
                        ] : [])
                    ),
                    m("td.tx-14.tx-normal.d-none[colspan='3']",
                        (CateterUci.nuevoRegistro !== null ? [
                            m('div.d-flex', [
                                m("input", {
                                    id: "_pm" + CateterUci.nuevoRegistro.id,
                                    class: "form-control tx-semibold tx-14",
                                    type: "text",
                                    placeholder: "...",
                                    oninput: (e) => {
                                        if (PacientesUCI.numeroTurno == 2) {
                                            CateterUci.nuevoRegistro.pm = (e.target.value.length !== 0 ? e.target.value : null);
                                        } else {
                                            e.target.value = '';
                                        }
                                    },
                                    value: CateterUci.nuevoRegistro.pm,

                                })

                            ]),
                        ] : [])
                    ),

                    m("td.tx-14.tx-normal.d-none[colspan='3']",
                        (CateterUci.nuevoRegistro !== null ? [
                            m('div.d-flex', [
                                m("input", {
                                    id: "_hs" + CateterUci.nuevoRegistro.id,
                                    class: "form-control tx-semibold tx-14",
                                    type: "text",
                                    placeholder: "...",
                                    oninput: (e) => {
                                        if (PacientesUCI.numeroTurno == 3) {
                                            CateterUci.nuevoRegistro.hs = (e.target.value.length !== 0 ? e.target.value : null);
                                        } else {
                                            e.target.value = '';
                                        }
                                    },
                                    value: CateterUci.nuevoRegistro.hs,

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
                m('tr.bd.bd-2.d-none', {
                    style: { "border-color": "#5173a1" },
                    class: (TurnosUci.nuevoTurno !== null && TurnosUci.nuevoTurno.gestion == 1 ? '' : 'd-none'),
                }, [
                    m("td.tx-14.tx-normal[colspan='12']",
                        (CateterUci.nuevoRegistro !== null ? [
                            m("input", {
                                id: "_observacion" + CateterUci.nuevoRegistro.id,
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
                                            CateterUci.nuevoRegistro = null;
                                            CateterUci.filterRegistros();
                                        } else {
                                            CateterUci.editarRegistro();
                                            FecthUci.actualizarSeccion(CateterUci.nuevoRegistro);
                                            CateterUci.nuevoRegistro = null;
                                            CateterUci.filterRegistros();

                                        }
                                    }
                                },
                                oninput: (e) => {
                                    CateterUci.nuevoRegistro.observacion = (e.target.value.length !== 0 ? e.target.value : null);
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
                m("tr.tx-uppercase", [
                    m("td[colspan='12'][align='right']", [
                        m("button.btn.btn-xs.btn-dark.mg-1[type='button']", {
                            class: (CateterUci.editarAll == false ? (CateterUci.loaderRows == true ? 'd-none' : '') : 'd-none'),
                            onclick: () => {

                                CateterUci.editarAll = true;
                                CateterUci.editarTodo();
                                console.log('ll', CateterUci.registros)


                            },
                        },
                            'Editar Todo',
                        ),
                        m("button.btn.btn-xs.btn-danger.mg-1[type='button']", {
                            class: (CateterUci.editarAll == true ? '' : 'd-none'),
                            onclick: (el) => {

                                CateterUci.editarAll = false;
                                CateterUci.cancelarTodo();
                                console.log('ll', CateterUci.registros)

                            },
                        },
                            'Cancelar',
                        ),
                    ]),
                ]),
                m("tr.tx-uppercase.mg-t-20", {
                    class: (CateterUci.loaderRows == true ? '' : 'd-none'),
                }, [
                    m("td[colspan='12']", [
                        m('div.pd-20', [
                            m(Loader)
                        ])

                    ])
                ]),
                m("tr.tx-uppercase.mg-t-20", {
                    class: (CateterUci.loaderRows == false ? '' : 'd-none'),
                }, [
                    m("td[colspan='12']",
                        {
                            class: (CateterUci.show ? '' : 'd-none'),
                        },
                        (CateterUci.registros.length != 0 ? [PacientesUCI.vTable('table-cateter', CateterUci.getRegistros(), CateterUci.arqTable())] : [])

                    ),
                ]),
                m("tr.tx-uppercase", [
                    m("td[colspan='12'][align='right']", [
                        m("button.btn.btn-xs.btn-dark.mg-1[type='button']", {
                            class: (CateterUci.editarAll == true ? '' : 'd-none'),

                            onclick: () => {

                                CateterUci.loaderRows = true;
                                CateterUci.guardarTodo();

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

export default CateterUci;