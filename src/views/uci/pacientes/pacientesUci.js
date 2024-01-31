import m from "mithril";
import App from "../../../models/App";
import Sidebar from "../sidebarUci";
import Loader from "../../utils/loader";
import Errors from "../../utils/errors";
import TableUCI from "../../utils/tableUci";
import ApiHTTP from "../../../models/ApiHTTP";
import TurnosUci from "./turnosUci";
import ViasUci from "./viasUci";
import AccesosUci from "./accesosUci";
import CateterUci from "./catetarUci";
import VentilacionUci from "./ventilacionUci";
import HemodialisisUci from "./hemodialisis";
import CultivosUci from "./cultivosUci";
import CuidadosUci from "./cuidados";
import MarcapasosUci from "./marcapasos";
import FecthUci from "./fecthUci";
import VentilatoriosUci from "./ventilatorios";


// Pacientes UCI
class PacientesUCI extends App {
    static pacientes = null;
    static dataPte = null;
    static numeroHistoriaClinica = null;
    static numeroAtencion = null;
    static numeroTurno = null;
    static fechaHoraTurno = null;
    static idFiltro = 1;
    static fechaHasta = null;
    static fechaDesde = null;
    constructor(_data) {
        super();
        App.setTitle("Pacientes U.C.I.");
        this.view = PacientesUCI.page;
        PacientesUCI.numeroHistoriaClinica = _data.attrs.numeroHistoriaClinica;
        PacientesUCI.numeroAtencion = _data.attrs.numeroAtencion;
        PacientesUCI.numeroTurno = (_data.attrs.numeroTurno !== undefined ? _data.attrs.numeroTurno : null);
        PacientesUCI.validarAtencion();

    }
    oncreate(_data) {
        console.log('data', _data);

    }



    static validarAtencion() {

        FecthUci.validarAtencion();
    }

    static showSecciones() {
        CuidadosUci.show = true;
        CuidadosUci.registros = PacientesUCI.parseSeccion(Array.from(document.getElementById('sec_CuidadosGenerales').options));

        ViasUci.show = true;
        ViasUci.registros = PacientesUCI.parseSeccion(Array.from(document.getElementById('sec_Vias').options));

        AccesosUci.show = true;
        AccesosUci.registros = PacientesUCI.parseSeccion(Array.from(document.getElementById('sec_Accesos').options));

        CateterUci.show = true;
        CateterUci.registros = PacientesUCI.parseSeccionCateter(Array.from(document.getElementById('sec_Cateter').options));

        VentilacionUci.show = true;
        VentilacionUci.registros = PacientesUCI.parseSeccionVentilacion(Array.from(document.getElementById('sec_Ventilacion').options));

        HemodialisisUci.show = true;
        HemodialisisUci.registros = PacientesUCI.parseSeccionHemodialisis(Array.from(document.getElementById('sec_Hemodialisis').options));

        CultivosUci.show = true;
        CultivosUci.registros = PacientesUCI.parseSeccion(Array.from(document.getElementById('sec_Cultivos').options));

        MarcapasosUci.show = true;
        MarcapasosUci.registros = PacientesUCI.parseSeccionMarcapasos(Array.from(document.getElementById('sec_Marcapasos').options));

        VentilatoriosUci.show = true;
        VentilatoriosUci.registros = PacientesUCI.parseSeccionVentilatorios(Array.from(document.getElementById('sec_Ventilatorios').options));


    }


    static vMainProfile() {
        return [
            m("div.content.content-components", {
                    style: { "margin-right": "0px", "margin-left": "0px", "margin-top": "0px" }
                },
                m("div.container.mg-l-0.mg-r-0", {
                    style: { "max-width": "100%" }
                }, [
                    m("table.table.table-bordered.table-sm.tx-14", [
                        m("thead.bd.bd-2", {
                                style: { "border-color": "#5173a1" }
                            },

                            m("tr.tx-uppercase", {
                                style: { "background-color": "#CCCCFF", }
                            }, [
                                m("th[scope='col'][colspan='12']",
                                    "Registro de Turnos:"
                                ),

                            ])
                        ),
                        m('tbody.bd.bd-2', {
                            style: { "border-color": "#5173a1" }
                        }, [

                            m("tr.bd.bd-2.text-right", {
                                style: { "border-color": "#5173a1" }
                            }, [
                                m("td[colspan='6']", ),
                                m("td[colspan='6']",
                                    m("button.btn.btn-xs.btn-primary.tx-semibold.tx-14.mg-r-2[type='button']", {
                                        onclick: () => {
                                            TurnosUci.iniciarTurno();
                                            PacientesUCI.vReloadTable('table-turnos', TurnosUci.getTurnos());
                                        }
                                    }, "Registrar Nuevo Turno"),
                                    (FecthUci.dataSecciones.length > 0 ? [
                                        m("button.btn.btn-xs.btn-secondary.tx-semibold.tx-14[type='button']", {
                                            onclick: () => {
                                                PacientesUCI.showSecciones();
                                            }
                                        }, "Ver Historial")
                                    ] : [])
                                ),

                            ]),
                            m("tr", [
                                m("td[colspan='12']", [
                                    PacientesUCI.vTable('table-turnos', TurnosUci.getTurnos(), PacientesUCI.arqTableTurnos())
                                ])
                            ]),
                            m('br')

                        ]),
                        // Cuidados Generales
                        m(CuidadosUci),
                        // Vias
                        m(ViasUci),
                        // Accesos
                        m(AccesosUci),
                        // Cateter
                        m(CateterUci),
                        // Manejo de Ventilzacion
                        m(VentilacionUci),
                        // Hemodialisis
                        m(HemodialisisUci),
                        // Cultivos
                        m(CultivosUci),
                        // Marcapasos
                        m(MarcapasosUci),
                        // Ventilatorios
                        m(VentilatoriosUci),

                    ])
                ])
            ),
        ];
    }
    static vMenu() {
        return m(Sidebar, { page: 'uci/pacientes' });
    }

    static parseSeccionCateter(options) {
        let res = [];
        let result = [];
        let _arr = [];
        let hash = {};

        options.map((option) => {
            FecthUci.dataSecciones.filter((obj) => {
                let _obj = JSON.parse(obj.DATASECCION);
                if (_obj.id === option.id) {
                    res.push(_obj);
                }
            });
        });

        console.log(88, res)

        return res;
    }

    static parseSeccionVentilacion(options) {
        let res = [];
        let result = [];
        let _arr = [];
        let hash = {};

        options.map((option) => {
            FecthUci.dataSecciones.filter((obj) => {
                let _obj = JSON.parse(obj.DATASECCION);
                if (_obj.id === option.id) {
                    res.push(_obj);
                }
            });
        });

        return res;
    }

    static parseSeccionHemodialisis(options) {
        let res = [];
        let result = [];
        let _arr = [];
        let hash = {};

        options.map((option) => {
            FecthUci.dataSecciones.filter((obj) => {
                let _obj = JSON.parse(obj.DATASECCION);
                if (_obj.id === option.id) {
                    res.push(_obj);
                }
            });
        });

        return res;
    }

    static parseSeccionMarcapasos(options) {
        let res = [];
        let result = [];
        let _arr = [];
        let hash = {};

        options.map((option) => {
            FecthUci.dataSecciones.filter((obj) => {
                let _obj = JSON.parse(obj.DATASECCION);
                if (_obj.id === option.id) {
                    res.push(_obj);
                }
            });
        });

        return res;
    }

    static parseSeccionVentilatorios(options) {
        let res = [];
        let result = [];
        let _arr = [];
        let hash = {};

        options.map((option) => {
            FecthUci.dataSecciones.filter((obj) => {
                let _obj = JSON.parse(obj.DATASECCION);
                if (_obj.id === option.id) {
                    res.push(_obj);
                }
            });
        });

        return res;
    }

    static parseSeccion(options) {
        let res = [];
        let result = [];
        let _arr = [];
        let hash = {};

        // console.log(33, FecthUci.dataSecciones)

        options.map((option) => {
            FecthUci.dataSecciones.filter((obj) => {
                let _obj = JSON.parse(obj.DATASECCION);
                if (_obj.id === option.id) {
                    res.push(_obj);
                }
            });
        });

        // Quitar duplicados
        result = res.filter(o => hash[o.nro] ? false : hash[o.nro] = true);
        // console.log(33, result);

        // Ordenar desc
        _arr = result.sort((a, b) => a.nro - b.nro);
        // console.log(22, _arr)
        return _arr;
    }

    static setTurnoSeccionCateter(_options, _class) {

        let res = [];
        let result = [];
        let _arr = [];
        let hash = {};
        let crear = false;

        if (_class.registros.length == 0) {
            crear = true;
        }

        if (_class.registros.length > 0) {
            let registros = _class.registros.filter(_v => _v.numeroTurno == PacientesUCI.numeroTurno);
            if (registros.length == 0) {
                crear = true;
            }
        }

        if (crear) {
            _options.map((option) => {
                if (option.value != 0) {
                    _class.iniciarRegistro();
                    _class.nuevoRegistro.id = option.id;
                    _class.nuevoRegistro.cateter = option.value;
                    _class.nuevoRegistro.numeroTurno = PacientesUCI.numeroTurno;
                    _class.nuevoRegistro.fechaHoraTurno = PacientesUCI.fechaHoraTurno;
                    _class.agregarRegistro();
                    FecthUci.registrarSeccion(_class.nuevoRegistro);
                    res.push(_class.nuevoRegistro);
                    _class.nuevoRegistro = null;
                }

            });
        }

        console.log(99, res)

        // Quitar duplicados
        // result = res.filter(o => hash[o.nro] ? false : hash[o.nro] = true);
        // Ordenar desc
        //  _arr = result.sort((a, b) => a.nro - b.nro);
        return res;
    }

    static setTurnoSeccionVentilacion(_options, _class) {

        let res = [];
        let result = [];
        let _arr = [];
        let hash = {};
        let crear = false;

        if (_class.registros.length == 0) {
            crear = true;
        }

        if (_class.registros.length > 0) {
            let registros = _class.registros.filter(_v => _v.numeroTurno == PacientesUCI.numeroTurno);
            if (registros.length == 0) {
                crear = true;
            }
        }

        if (crear) {
            _options.map((option) => {
                if (option.value != 0) {
                    _class.iniciarRegistro();
                    _class.nuevoRegistro.id = option.id;
                    _class.nuevoRegistro.ventilacion = option.value;
                    _class.nuevoRegistro.numeroTurno = PacientesUCI.numeroTurno;
                    _class.nuevoRegistro.fechaHoraTurno = PacientesUCI.fechaHoraTurno;
                    _class.agregarRegistro();
                    FecthUci.registrarSeccion(_class.nuevoRegistro);
                    res.push(_class.nuevoRegistro);
                    _class.nuevoRegistro = null;
                }

            });
        }

        // Quitar duplicados
        // result = res.filter(o => hash[o.nro] ? false : hash[o.nro] = true);
        // Ordenar desc
        // _arr = result.sort((a, b) => a.nro - b.nro);
        return res;
    }

    static setTurnoSeccionHemodialisis(_options, _class) {

        let res = [];
        let result = [];
        let _arr = [];
        let hash = {};
        let crear = false;

        if (_class.registros.length == 0) {
            crear = true;
        }

        if (_class.registros.length > 0) {
            let registros = _class.registros.filter(_v => _v.numeroTurno == PacientesUCI.numeroTurno);
            if (registros.length == 0) {
                crear = true;
            }
        }

        if (crear) {
            _options.map((option) => {
                if (option.value != 0) {
                    _class.iniciarRegistro();
                    _class.nuevoRegistro.id = option.id;
                    _class.nuevoRegistro.hemo = option.value;
                    _class.nuevoRegistro.numeroTurno = PacientesUCI.numeroTurno;
                    _class.nuevoRegistro.fechaHoraTurno = PacientesUCI.fechaHoraTurno;
                    _class.agregarRegistro();
                    FecthUci.registrarSeccion(_class.nuevoRegistro);
                    res.push(_class.nuevoRegistro);
                    _class.nuevoRegistro = null;
                }

            });
        }

        // Quitar duplicados
        // result = res.filter(o => hash[o.nro] ? false : hash[o.nro] = true);
        // Ordenar desc
        // _arr = result.sort((a, b) => a.nro - b.nro);
        return res;
    }

    static setTurnoSeccionMarcapasos(_options, _class) {

        let res = [];
        let result = [];
        let _arr = [];
        let hash = {};
        let crear = false;

        if (_class.registros.length == 0) {
            crear = true;
        }

        if (_class.registros.length > 0) {
            let registros = _class.registros.filter(_v => _v.numeroTurno == PacientesUCI.numeroTurno);
            if (registros.length == 0) {
                crear = true;
            }
        }

        if (crear) {
            _options.map((option) => {
                if (option.value != 0) {
                    _class.iniciarRegistro();
                    _class.nuevoRegistro.id = option.id;
                    _class.nuevoRegistro.hora = option.value;
                    _class.nuevoRegistro.numeroTurno = PacientesUCI.numeroTurno;
                    _class.nuevoRegistro.fechaHoraTurno = PacientesUCI.fechaHoraTurno;
                    _class.agregarRegistro();
                    FecthUci.registrarSeccion(_class.nuevoRegistro);
                    res.push(_class.nuevoRegistro);
                    _class.nuevoRegistro = null;
                }

            });
        }

        // Quitar duplicados
        // result = res.filter(o => hash[o.nro] ? false : hash[o.nro] = true);
        // Ordenar desc
        // _arr = result.sort((a, b) => a.nro - b.nro);
        return res;
    }

    static setTurnoSeccionVentilatorios(_options, _class) {

        let res = [];
        let result = [];
        let _arr = [];
        let hash = {};
        let crear = false;

        if (_class.registros.length == 0) {
            crear = true;
        }

        if (_class.registros.length > 0) {
            let registros = _class.registros.filter(_v => _v.numeroTurno == PacientesUCI.numeroTurno);
            if (registros.length == 0) {
                crear = true;
            }
        }

        if (crear) {
            _options.map((option) => {
                if (option.value != 0) {
                    _class.iniciarRegistro();
                    _class.nuevoRegistro.id = option.id;
                    _class.nuevoRegistro.ventilatorio = option.value;
                    _class.nuevoRegistro.numeroTurno = PacientesUCI.numeroTurno;
                    _class.nuevoRegistro.fechaHoraTurno = PacientesUCI.fechaHoraTurno;
                    _class.agregarRegistro();
                    FecthUci.registrarSeccion(_class.nuevoRegistro);
                    res.push(_class.nuevoRegistro);
                    _class.nuevoRegistro = null;
                }

            });
        }

        // Quitar duplicados
        // result = res.filter(o => hash[o.nro] ? false : hash[o.nro] = true);
        // Ordenar desc
        // _arr = result.sort((a, b) => a.nro - b.nro);
        return res;
    }

    static reloadData(idFiltro) {
        PacientesUCI.pacientes = null;
        PacientesUCI.idFiltro = idFiltro;
    }
    static fetchProfile() {


        if (PacientesUCI.pacientes !== null && PacientesUCI.pacientes.status) {
            return PacientesUCI.pacientes.data.map(function(_val, _i, _contentData) {
                if (PacientesUCI.numeroHistoriaClinica == _val.HC) {
                    PacientesUCI.dataPte = _val;
                }
            })
        }


    }
    static fetchData() {

        let _queryString = '?idFiltro=' + PacientesUCI.idFiltro;

        if (PacientesUCI.idFiltro == 2 && PacientesUCI.fechaDesde !== null) {
            _queryString += '&fechaDesde=' + PacientesUCI.fechaDesde + '&fechaHasta=' + PacientesUCI.fechaHasta;
        }

        return m.request({
                method: "GET",
                url: ApiHTTP.apiUrl + "/v2/pasaportes/generados" + _queryString,
                headers: {
                    "Content-Type": "application/json; charset=utf-8",
                },
            })
            .then(function(result) {
                return result;
            })
            .catch(function(e) {
                return {
                    'status': null,
                    'message': e
                };
            });

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
            columns: [{
                    title: "N° : ",
                },
                {
                    title: "NHC:",
                },
                {
                    title: "Fecha de Admisión:",
                },
                {
                    title: "Paciente:",
                },

                {
                    title: "Especialidad:",
                },

                {
                    title: "Opciones:",
                }
            ],
            aoColumnDefs: [{
                    mRender: function(data, type, row, meta) {
                        return meta.row + meta.settings._iDisplayStart + 1;
                    },
                    visible: true,
                    aTargets: [0],
                    orderable: false,
                },
                {
                    mRender: function(data, type, full) {
                        return full.HC;
                    },
                    visible: true,
                    aTargets: [1],
                    orderable: true,

                },
                {
                    mRender: function(data, type, full) {
                        return full.FECHA_ADMISION;
                    },
                    visible: true,
                    aTargets: [2],
                    orderable: true,

                },
                {
                    mRender: function(data, type, full) {
                        return full.NOMBRE;

                    },
                    visible: true,
                    aTargets: [3],
                    orderable: true,
                    width: '40%'
                }, {
                    mRender: function(data, type, full) {
                        return full.ESPECIALIDAD;

                    },
                    visible: true,
                    aTargets: [4],
                    orderable: true,


                },
                {
                    mRender: function(data, type, full) {
                        return ''

                    },
                    visible: true,
                    aTargets: [5],
                    orderable: true,

                }


            ],
            fnRowCallback: function(nRow, aData, iDisplayIndex, iDisplayIndexFull) {

                m.mount(nRow, {
                    view: () => {
                        return [
                            m("td", [
                                (iDisplayIndexFull + 1)
                            ]),
                            m("td", [
                                aData.HC
                            ]),

                            m("td", [
                                aData.FECHA_ADMISION
                            ]),
                            m("td", [
                                aData.NOMBRE
                            ]),
                            m("td", [
                                aData.ESPECIALIDAD,

                            ]),


                            m("td", [

                                m('button.btn.btn-block.btn-secondary.tx-12', {
                                    style: { "background-color": "#185b98" },
                                    onclick: () => {

                                        m.route.set('/uci/pacientes/', {
                                            numeroHistoriaClinica: aData.HC
                                        })

                                    }

                                }, [
                                    " Ver Paciente "
                                ]),
                            ])






                        ];
                    },
                });



            },
        };
    }

    static arqTableTurnos() {
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
            columns: [{
                    title: "N° : ",
                },
                {
                    title: "Fecha Turno:",
                },
                {
                    title: "Hora Turno:",
                },
                {
                    title: "Usuario Turno:",
                },
                {
                    title: "Paciente:",
                },

                {
                    title: "Especialidad:",
                },
                {
                    title: "Status:",
                },

                {
                    title: "Gestionar:",
                },
                {
                    title: "Cerrar:",
                }
            ],
            aoColumnDefs: [{
                    fnCreatedCell: function(nTd, sData, oData, iRow, iCol) {
                        return m.mount(nTd, {
                            view: () => {
                                return [
                                    m('div.text-center', [
                                        m("button.btn-xs.btn-block.tx-semibold.tx-15[type='button']", {
                                                class: (PacientesUCI.numeroTurno == oData.numeroTurno ? 'bg-warning' : 'bg-light')
                                            },
                                            (oData.numeroTurno == 1 ? 'AM' : ''),
                                            (oData.numeroTurno == 2 ? 'PM' : ''),
                                            (oData.numeroTurno == 3 ? 'HS' : ''),
                                        ),
                                    ])

                                ]
                            }
                        });
                    },

                    visible: true,
                    aTargets: [0],
                    orderable: false,
                },
                {

                    fnCreatedCell: function(nTd, sData, oData, iRow, iCol) {
                        return m.mount(nTd, {
                            view: () => {
                                return [
                                    m("input.form-control.tx-13.tx-semibold[type='text'][placeholder='DD/MM/YYYY']", {
                                        id: 'fechaTurno',
                                        disabled: true,
                                        oncreate: (el) => {
                                            if (oData.fechaTurno !== undefined) {
                                                el.dom.value = moment(oData.fechaTurno, 'DD-MM-YYYY').format('DD/MM/YYYY');
                                            }
                                            setTimeout(() => {
                                                new Cleave("#fechaTurno", {
                                                    date: true,
                                                    datePattern: ["d", "m", "Y"]
                                                });
                                            }, 50);
                                        },
                                    }),
                                ]
                            }
                        });
                    },
                    width: '20%',
                    visible: true,
                    aTargets: [1],
                    orderable: false,

                },
                {
                    fnCreatedCell: function(nTd, sData, oData, iRow, iCol) {

                        let _d = true;
                        return m.mount(nTd, {
                            view: () => {
                                return [

                                    m("div.input-group", [
                                        m("input.form-control.tx-13.tx-semibold[type='text'][placeholder='HH:mm]", {
                                            id: 'horaTurno',
                                            disabled: _d,
                                            oncreate: (el) => {
                                                if (oData.horaTurno !== undefined) {
                                                    el.dom.value = oData.horaTurno;
                                                }
                                                setTimeout(() => {
                                                    new Cleave("#horaTurno", {
                                                        time: true,
                                                        timePattern: ['h', 'm']
                                                    });
                                                }, 50);
                                            },
                                            oninput: (e) => {
                                                setTimeout(() => {
                                                    oData.horaTurno = e.target.value;
                                                    TurnosUci.nuevoTurno.horaTurno = e.target.value;
                                                }, 50);
                                            },
                                            onkeypress: (e) => {
                                                if (e.keyCode == 13) {
                                                    _d = true;
                                                    PacientesUCI.fechaHoraTurno = oData.fechaTurno + ' ' + oData.horaTurno;
                                                    FecthUci.actualizarHoraAtencion();
                                                    PacientesUCI.vReloadTable('table-turnos', TurnosUci.getTurnos());
                                                }
                                            },
                                        }),
                                        m("div.input-group-append", {
                                                class: (oData.status == 1 ? '' : 'd-none')
                                            },
                                            m("button.btn.btn-xs.btn-light[type='button']", {
                                                    title: "Editar Hora",
                                                    onclick: () => {
                                                        _d = !_d;
                                                    }
                                                },
                                                m("i.fas.fa-edit")
                                            )
                                        )
                                    ])

                                ]
                            }
                        });
                    },
                    width: '20%',
                    visible: true,
                    aTargets: [2],
                    orderable: false,

                },
                {

                    fnCreatedCell: function(nTd, sData, oData, iRow, iCol) {
                        return m.mount(nTd, {
                            view: () => {
                                return [
                                    m("input.form-control.tx-13.tx-semibold[type='text']", {
                                        disabled: 'disabled',
                                        oncreate: (el) => {
                                            if (oData.usuarioTurno !== undefined) {
                                                el.dom.value = 'ENFERMERA';
                                            }
                                        },
                                    }),
                                ]
                            }
                        });
                    },
                    width: '20%',
                    visible: true,
                    aTargets: [3],
                    orderable: false,

                },
                {
                    mRender: function(data, type, full) {
                        return full.paciente;
                    },
                    visible: false,
                    aTargets: [4],
                    orderable: false,
                },
                {
                    mRender: function(data, type, full) {
                        return full.especialidad;
                    },
                    visible: false,
                    aTargets: [5],
                    orderable: false,


                },
                {
                    fnCreatedCell: function(nTd, sData, oData, iRow, iCol) {

                        return m.mount(nTd, {
                            view: () => {
                                return [
                                    m('div.text-center', [
                                        m("button.btn-xs.btn-block.tx-semibold.tx-13[type='button']", {
                                                class: (oData.status == 1 ? 'bg-warning' : 'bg-success'),
                                            },
                                            (oData.status == 1 ? 'Turno Abierto' : ''),
                                            (oData.status == 2 ? 'Turno Cerado' : ''),
                                        ),

                                    ])

                                ]
                            }
                        });
                    },
                    width: '10%',
                    visible: true,
                    aTargets: [6],
                    orderable: false,
                },
                {
                    fnCreatedCell: function(nTd, sData, oData, iRow, iCol) {
                        return m.mount(nTd, {
                            view: () => {
                                return [
                                    m('div.text-center', [
                                        m("button.btn.btn-xs.btn-block.btn-success.tx-13[type='button']", {
                                                disabled: (oData.status == 1 && FecthUci.dataSecciones !== null ? '' : 'disabled'),
                                                onclick: () => {
                                                    TurnosUci.nuevoTurno = oData;
                                                    oData.iniciarGestion();
                                                    PacientesUCI.fechaHoraTurno = oData.fechaTurno + ' ' + oData.horaTurno;
                                                    PacientesUCI.showSecciones();
                                                    PacientesUCI.setTurnoSeccionCateter(Array.from(document.getElementById('sec_Cateter').options), CateterUci);
                                                    PacientesUCI.setTurnoSeccionVentilacion(Array.from(document.getElementById('sec_Ventilacion').options), VentilacionUci);
                                                    PacientesUCI.setTurnoSeccionHemodialisis(Array.from(document.getElementById('sec_Hemodialisis').options), HemodialisisUci);
                                                    PacientesUCI.setTurnoSeccionMarcapasos(Array.from(document.getElementById('sec_Marcapasos').options), MarcapasosUci);
                                                    PacientesUCI.setTurnoSeccionVentilatorios(Array.from(document.getElementById('sec_Ventilatorios').options), VentilatoriosUci);

                                                },
                                            },
                                            'Gestionar',
                                        ),


                                    ])

                                ]
                            }
                        });
                    },
                    width: '10%',
                    visible: true,
                    aTargets: [7],
                    orderable: false,

                },
                {
                    fnCreatedCell: function(nTd, sData, oData, iRow, iCol) {
                        return m.mount(nTd, {
                            view: () => {
                                return [
                                    m('div.text-center', [
                                        m("button.btn.btn-xs.btn-block.btn-danger.tx-13[type='button']", {
                                                disabled: (oData.status == 1 && FecthUci.dataSecciones !== null ? '' : 'disabled'),

                                                onclick: () => {
                                                    oData.cerrarTurno();
                                                    FecthUci.cerrarTurno();
                                                },
                                            },
                                            'Cerrar',
                                        ),

                                    ])

                                ]
                            }
                        });
                    },
                    width: '10%',
                    visible: true,
                    aTargets: [8],
                    orderable: false,

                }


            ],
            fnRowCallback: function(nRow, aData, iDisplayIndex, iDisplayIndexFull) {

            },
        };
    }



    static vReloadTable(idTable, _data) {
        $('#' + idTable).DataTable().clear().rows.add(_data).draw();
    }


    static vTable(idTable, dataTable, arqTable) {
        return [
            m(TableUCI, { idTable: idTable, dataTable: dataTable, arqTable: arqTable })
        ]
    }

    static page() {
        return [
            PacientesUCI.vMainProfile()
        ];
    }
}


export default PacientesUCI;