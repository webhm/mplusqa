import m from "mithril";
import App from "../../../../models/App";
import Sidebar from "../../sidebarUci";
import TableUCI from "../../../utils/tableUci";
import TurnosUci from "./turnosUci";
import ViasUci from "./viasUci";
import AccesosUci from "./accesosUci";
import CateterUci from "./catetarUci";
import VentilacionUci from "./ventilacionUci";
import HemodialisisUci from "./hemodialisis";
import CultivosUci from "./cultivosUci";
import CuidadosUci2 from "./cuidadosUci2";
import MarcapasosUci from "./marcapasos";
import FecthUci from "./fecthUci";
import VentilatoriosUci from "./ventilatorios";
import GasesUci from "./gasesUci";
import OxigenacionUci from "./oxigenacionUci";
import MedidasUci from "./medidiasUci";
import GasesMedUci from "./gasesMedUci";
import ComburTestUci from "./comburTestUci";
import UlcerasUciPed from "./ulcerasUciPed";
import PrescripcionesUci from "./prescripcionesUci";
import TurnosUciHistorial from "./turnosUci";


// Pacientes UCI
class PacientesUCIHistorial extends App {

    static pacientes = null;
    static dataPte = null;
    static numeroHistoriaClinica = null;
    static numeroAtencion = null;
    static numeroTurno = null;
    static usuarioTurno = null;
    static fechaHoraTurno = null;
    static idFiltro = 1;
    static fechaHasta = null;
    static horaHasta = null;
    static fechaDesde = null;
    static horaDesde = null;
    static fechaBusqueda = null;

    constructor(_data) {

        super();
        App.setTitle("Historial Bitácora U.C.I.");
        this.view = PacientesUCIHistorial.page;
        PacientesUCIHistorial.numeroHistoriaClinica = _data.attrs.numeroHistoriaClinica;
        PacientesUCIHistorial.numeroAtencion = _data.attrs.numeroAtencion;
        PacientesUCIHistorial.numeroTurno = (_data.attrs.numeroTurno !== undefined ? _data.attrs.numeroTurno : null);
        PacientesUCIHistorial.usuarioTurno = _data.attrs.usuario;
        PacientesUCIHistorial.validarAtencion();

    }

    oncreate(_data) {
        console.log('data', _data);
    }



    static validarAtencion() {

        // FecthUci.validarAtencionHistorial();


    }

    static extraerFechaHoraTurnoVigente() {
        let turnos = TurnosUci.getTurnos();
        let lastTurno = turnos[turnos.length - 1];
        PacientesUCIHistorial.fechaHoraTurno = lastTurno.fechaHoraTurno;
    }

    static loadSecs() {

        CuidadosUci2.registros = PacientesUCIHistorial.parseSeccionCuidadosGenerales(Array.from(document.getElementById('sec_CuidadosGenerales').options));
        // PacientesUCIHistorial.setTurnoSeccionCuidadosGenerales(Array.from(document.getElementById('sec_CuidadosGenerales').options))

        CateterUci.registros = PacientesUCIHistorial.parseSeccionCateter(Array.from(document.getElementById('sec_Cateter').options));
        // PacientesUCIHistorial.setTurnoSeccionCateter(Array.from(document.getElementById('sec_Cateter').options));

        VentilacionUci.registros = PacientesUCIHistorial.parseSeccionVentilacion(Array.from(document.getElementById('sec_Ventilacion').options));
        // PacientesUCIHistorial.setTurnoSeccionVentilacion(Array.from(document.getElementById('sec_Ventilacion').options));

        HemodialisisUci.registros = PacientesUCIHistorial.parseSeccionHemodialisis(Array.from(document.getElementById('sec_Hemodialisis').options));
        //  PacientesUCIHistorial.setTurnoSeccionHemodialisis(Array.from(document.getElementById('sec_Hemodialisis').options));

        MarcapasosUci.registros = PacientesUCIHistorial.parseSeccionMarcapasos(Array.from(document.getElementById('sec_Marcapasos').options));
        //  PacientesUCIHistorial.setTurnoSeccionMarcapasos(Array.from(document.getElementById('sec_Marcapasos').options));

        VentilatoriosUci.allRegistros = PacientesUCIHistorial.parseSeccionVentilatorios_AllRegistros(Array.from(document.getElementById('sec_Ventilatorios').options));
        // PacientesUCIHistorial.setTurnoSeccionVentilatorios(Array.from(document.getElementById('sec_Ventilatorios').options));
        VentilatoriosUci.registros = PacientesUCIHistorial.parseSeccionVentilatorios_v2(Array.from(document.getElementById('sec_Ventilatorios').options));

        GasesUci.allRegistros = PacientesUCIHistorial.parseSeccionGases_AllRegistros(Array.from(document.getElementById('sec_Gases').options));
        // PacientesUCIHistorial.setTurnoSeccionGases(Array.from(document.getElementById('sec_Gases').options));
        GasesUci.registros = PacientesUCIHistorial.parseSeccionGases_v2(Array.from(document.getElementById('sec_Gases').options));

        OxigenacionUci.registros = PacientesUCIHistorial.parseSeccionOxigenacion(Array.from(document.getElementById('sec_Oxigenacion').options));
        // PacientesUCIHistorial.setTurnoSeccionOxigenacion(Array.from(document.getElementById('sec_Oxigenacion').options));

        MedidasUci.allRegistros = PacientesUCIHistorial.parseSeccionMedidas_AllRegistros(Array.from(document.getElementById('sec_Medidas').options));
        //PacientesUCIHistorial.setTurnoSeccionMedidas(Array.from(document.getElementById('sec_Medidas').options));
        MedidasUci.registros = PacientesUCIHistorial.parseSeccionMedidas_v2(Array.from(document.getElementById('sec_Medidas').options));

        ComburTestUci.allRegistros = PacientesUCIHistorial.parseSeccionComburTest_AllRegistros(Array.from(document.getElementById('sec_ComburTest').options));
        //PacientesUCIHistorial.setTurnoSeccionComburTest(Array.from(document.getElementById('sec_ComburTest').options));
        ComburTestUci.registros = PacientesUCIHistorial.parseSeccionComburTest_v2(Array.from(document.getElementById('sec_ComburTest').options));

        GasesMedUci.allRegistros = PacientesUCIHistorial.parseSeccionGasesMed_AllRegistros(Array.from(document.getElementById('sec_GasesMed').options));
        // PacientesUCIHistorial.setTurnoSeccionGasesMed(Array.from(document.getElementById('sec_GasesMed').options));
        GasesMedUci.registros = PacientesUCIHistorial.parseSeccionGasesMed_v2(Array.from(document.getElementById('sec_GasesMed').options));

        PrescripcionesUci.allRegistros = PacientesUCIHistorial.parseSeccionPrescripcionesUci_AllRegistros(Array.from(document.getElementById('sec_PrescripcionesUci').options));
        PrescripcionesUci.registros = PacientesUCIHistorial.parseSeccionPrescripcionesUci_v2(Array.from(document.getElementById('sec_PrescripcionesUci').options));

        PacientesUCIHistorial.showSecciones();
    }

    static resetSecs() {

        CuidadosUci2.show = false;

        ViasUci.show = false;

        AccesosUci.show = false;

        CateterUci.show = false;

        VentilacionUci.show = false;

        HemodialisisUci.show = false;

        CultivosUci.show = false;

        MarcapasosUci.show = false;

        GasesUci.show = false;
        GasesUci.destroyTable();

        OxigenacionUci.show = false;

        VentilatoriosUci.show = false;
        VentilatoriosUci.destroyTable();

        PrescripcionesUci.show = false;
        PrescripcionesUci.destroyTable();

        m.redraw();

    }

    static showSecciones() {

        PacientesUCIHistorial.extraerFechaHoraTurnoVigente();

        // CuidadosUci2.show = true;

        //ViasUci.show = true;
        ViasUci.registros = PacientesUCIHistorial.parseSeccion(Array.from(document.getElementById('sec_Vias').options));

        // AccesosUci.show = true;
        AccesosUci.registros = PacientesUCIHistorial.parseSeccion(Array.from(document.getElementById('sec_Accesos').options));

        // CateterUci.show = true;

        // VentilacionUci.show = true;

        //  HemodialisisUci.show = true;

        //  CultivosUci.show = true;
        CultivosUci.registros = PacientesUCIHistorial.parseSeccion(Array.from(document.getElementById('sec_Cultivos').options));

        // MarcapasosUci.show = true;

        // GasesUci.show = true;

        //  OxigenacionUci.show = true;

        //   VentilatoriosUci.show = true;

        //   MedidasUci.show = true;

        //  ComburTestUci.show = true;

        //  GasesMedUci.show = true;

        // Pediatrica y Neo
        //  UlcerasUciPed.show = true;
        UlcerasUciPed.registros = PacientesUCIHistorial.parseAllSeccion('UlcerasPed');





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
            orden: false,
            destroy: true,
            // pageLength: 3,
            columns: [{
                title: "Tipo: ",
            },
            {
                title: "Fecha:",
            },
            {
                title: "Hora:",
            },
            {
                title: "Usuario:",
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
                title: "Asume:",
            },
            {
                title: "Cancela:",
            },

            ],
            aoColumnDefs: [{
                fnCreatedCell: function (nTd, sData, oData, iRow, iCol) {



                    return m.mount(nTd, {
                        view: () => {
                            return [
                                m('div.text-center', [
                                    m("button.btn-xs.btn-block.tx-semibold.tx-15[type='button']", {
                                        class: (PacientesUCIHistorial.fechaHoraTurno == oData.fechaHoraTurno && oData.gestion == 1 ? 'bg-warning' : 'bg-light')
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
                width: '5%',
                visible: true,
                aTargets: [0],
                orderable: false,
            },
            {

                fnCreatedCell: function (nTd, sData, oData, iRow, iCol) {
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

                                    },
                                }),
                            ]
                        }
                    });
                },
                width: '15%',
                visible: true,
                aTargets: [1],
                orderable: false,

            },
            {
                fnCreatedCell: function (nTd, sData, oData, iRow, iCol) {


                    let _d = true;
                    return m.mount(nTd, {
                        view: () => {
                            return [

                                m("div.input-group", [
                                    m("input.form-control.tx-13.tx-semibold[type='text'][placeholder='HH:mm]", {
                                        id: 'horaTurno',
                                        disabled: 'disabled',
                                        oncreate: (el) => {
                                            if (oData.horaTurno !== undefined) {
                                                el.dom.value = oData.horaTurno;
                                            }

                                        },

                                    }),

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

                fnCreatedCell: function (nTd, sData, oData, iRow, iCol) {
                    return m.mount(nTd, {
                        view: () => {
                            return [
                                m("input.form-control.tx-13.tx-semibold[type='text']", {
                                    disabled: 'disabled',
                                    oncreate: (el) => {
                                        if (oData.usuarioTurno !== undefined) {
                                            el.dom.value = oData.usuarioTurno;
                                        }
                                    },
                                }),
                            ]
                        }
                    });
                },
                width: '15%',
                visible: true,
                aTargets: [3],
                orderable: false,

            },
            {
                mRender: function (data, type, full) {
                    return full.paciente;
                },
                visible: false,
                aTargets: [4],
                orderable: false,
            },
            {
                mRender: function (data, type, full) {
                    return full.especialidad;
                },
                visible: false,
                aTargets: [5],
                orderable: false,


            },
            {
                fnCreatedCell: function (nTd, sData, oData, iRow, iCol) {

                    return m.mount(nTd, {
                        view: () => {
                            return [
                                m('div.text-center', [
                                    m("button.btn-xs.btn-block.tx-semibold.tx-13[type='button']", {
                                        class: (oData.status == 1 ? 'bg-warning' : (oData.status == 3 ? 'bg-light' : 'bg-success')),
                                    },
                                        (oData.status == 1 ? 'Turno Abierto' : ''),
                                        (oData.status == 2 ? 'Turno Cerrado' : ''),
                                        (oData.status == 3 ? 'Turno Cancelado' : ''),
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
                fnCreatedCell: function (nTd, sData, oData, iRow, iCol) {

                    return m.mount(nTd, {
                        view: () => {
                            return [
                                m('div.tx-12', [
                                    m('div.d-inline', (oData.cancela != null ? '' : m.trust(oData.asume)))
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
                fnCreatedCell: function (nTd, sData, oData, iRow, iCol) {

                    return m.mount(nTd, {
                        view: () => {
                            return [
                                m('div.tx-12', [
                                    m('div.d-inline', m.trust(oData.cancela))

                                ])

                            ]
                        }
                    });
                },
                width: '10%',
                visible: true,
                aTargets: [8],
                orderable: false,
            },


            ],
            fnRowCallback: function (nRow, aData, iDisplayIndex, iDisplayIndexFull) {

            },
        };
    }

    static parseAllSeccion(idSeccion) {
        let res = [];
        let result = [];
        let _arr = [];
        let hash = {};


        FecthUci.dataHistorial.map((obj) => {
            let _obj = JSON.parse(obj.DATASECCION);
            if (_obj.seccion === idSeccion) {
                res.push(_obj);
            }
        });

        // Quitar duplicados
        result = res.filter(o => hash[o.nro] ? false : hash[o.nro] = true);

        // Ordenar desc
        _arr = result.sort((a, b) => a.nro - b.nro);
        return _arr;
    }


    static vMain() {
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
                                    "Historial de Turnos:"
                                ),

                            ])
                        ),
                        m('tbody.bd.bd-2', {
                            style: { "border-color": "#5173a1" }
                        }, [

                            m("tr.bd.bd-2.text-right", {
                                style: { "border-color": "#5173a1" }
                            }, [

                                m("td.d-flex.justify-content-end[colspan='12']",
                                    m("span.mg-5", 'Desde:'),
                                    m("input.form-control.d-inline.tx-semibold.tx-14.mg-r-2.wd-5p[type='text'][placeholder='DD/MM/YYYY']", {
                                        id: "fechaDesde",
                                        class: "form-control tx-semibold tx-14 wd-15p",

                                        oncreate: (el) => {

                                            el.dom.value = moment().format('DD-MM-YYYY');
                                            PacientesUCIHistorial.fechaDesde = el.dom.value;


                                            setTimeout(() => {
                                                new Cleave("#fechaDesde", {
                                                    date: true,
                                                    datePattern: ["d", "m", "Y"]
                                                });
                                            }, 50);
                                        },
                                        oninput: (e) => {
                                            setTimeout(() => {
                                                PacientesUCIHistorial.fechaDesde = (e.target.value.length !== 0 ? e.target.value : null);
                                            }, 50);
                                        },
                                    }),
                                    m("input.form-control.tx-13.tx-semibold.wd-10p[type='text'][placeholder='HH:mm']", {
                                        id: 'horaDesde',
                                        disabled: 'disabled',

                                        oncreate: (el) => {

                                            el.dom.value = '08:00';

                                            PacientesUCIHistorial.horaDesde = el.dom.value;

                                            setTimeout(() => {
                                                new Cleave("#horaDesde", {
                                                    time: true,
                                                    timePattern: ['h', 'm']
                                                });
                                            }, 50);
                                        },
                                        oninput: (e) => {
                                            setTimeout(() => {
                                                PacientesUCIHistorial.horaDesde = (e.target.value.length !== 0 ? e.target.value : null);
                                            }, 50);
                                        },

                                    }),
                                    m("span.mg-5", 'Hasta:'),
                                    m("input.form-control.d-inline.tx-semibold.tx-14.mg-r-2.wd-10p[type='text'][placeholder='DD/MM/YYYY']", {
                                        id: "fechaHasta",
                                        class: "form-control tx-semibold tx-14 wd-15p",

                                        oncreate: (el) => {

                                            el.dom.value = moment().add(1, 'days').format('DD-MM-YYYY');
                                            PacientesUCIHistorial.fechaHasta = el.dom.value;

                                            setTimeout(() => {
                                                new Cleave("#fechaHasta", {
                                                    date: true,
                                                    datePattern: ["d", "m", "Y"]
                                                });
                                            }, 50);
                                        },
                                        oninput: (e) => {
                                            setTimeout(() => {

                                                PacientesUCIHistorial.fechaHasta = (e.target.value.length !== 0 ? e.target.value : null);



                                            }, 50);
                                        },

                                    }),
                                    m("input.form-control.tx-13.tx-semibold.wd-10p[type='text'][placeholder='HH:mm']", {
                                        id: 'horaHasta',
                                        disabled: 'disabled',

                                        oncreate: (el) => {

                                            el.dom.value = '07:59';

                                            PacientesUCIHistorial.horaHasta = el.dom.value;


                                            setTimeout(() => {
                                                new Cleave("#horaHasta", {
                                                    time: true,
                                                    timePattern: ['h', 'm']
                                                });
                                            }, 50);
                                        },
                                        oninput: (e) => {
                                            setTimeout(() => {



                                                PacientesUCIHistorial.horaHasta = (e.target.value.length !== 0 ? e.target.value : null);
                                            }, 50);
                                        },

                                    }),
                                    m("button.btn.btn-xs.btn-light.tx-semibold.tx-14.mg-r-2.wd-10p[type='button']", {
                                        onclick: () => {


                                            let start = moment(PacientesUCIHistorial.fechaDesde, "DD-MM-YYYY");
                                            let end = moment(PacientesUCIHistorial.fechaHasta, "DD-MM-YYYY");

                                            //Difference in number of days
                                            console.log(99, moment.duration(start.diff(end)).asDays())

                                            if (moment.duration(start.diff(end)).asDays() != -1) {
                                                $.alert('Error de formato o no se puede seleccionar más de 24 horas.');
                                            } else {
                                                if (PacientesUCIHistorial.fechaDesde !== null) {
                                                    let fechaDesde = moment(PacientesUCIHistorial.fechaDesde, 'DD/MM/YYYY').format('DD-MM-YYYY');
                                                    let fechaHasta = moment(PacientesUCIHistorial.fechaHasta, 'DD/MM/YYYY').format('DD-MM-YYYY');
                                                    PacientesUCIHistorial.fechaDesde = fechaDesde;
                                                    PacientesUCIHistorial.fechaHasta = fechaHasta;
                                                    FecthUci.validarAtencionHistorial();
                                                }

                                            }




                                        }
                                    }, "Buscar"),
                                    m("button.btn.btn-xs.btn-primary.tx-semibold.tx-14.mg-r-2.wd-15p[type='button']", {
                                        onclick: () => {
                                            m.route.set('/uci/pacientes/', {
                                                numeroHistoriaClinica: PacientesUCIHistorial.numeroHistoriaClinica,
                                                numeroAtencion: PacientesUCIHistorial.numeroAtencion,
                                                usuario: PacientesUCIHistorial.usuarioTurno

                                            })



                                        }
                                    }, "Registrar Turnos"),

                                ),


                            ]),

                            m("tr", [
                                m("td[colspan='12']", [
                                    (TurnosUciHistorial.getTurnos().length != 0 ? [PacientesUCIHistorial.vTable('table-turnos', TurnosUciHistorial.getTurnos(), PacientesUCIHistorial.arqTableTurnos())] : [])

                                ])
                            ]),
                            m('br'),


                        ]),

                        // Cuidados Generales
                        m(CuidadosUci2),
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
                        // Gasometrias / Horas
                        m(GasesUci),
                        // Oxigenación
                        m(OxigenacionUci),
                        // MedidasUci
                        m(MedidasUci),
                        // ComburTest
                        m(ComburTestUci),
                        // GasesMedUci
                        m(GasesMedUci),
                        // UlcerasUciPed
                        m(UlcerasUciPed),
                        // Prescripciones Uci
                        m(PrescripcionesUci),




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
        let resultId = [];
        let _arr = [];
        let hash = {};

        options.map((option) => {
            FecthUci.dataHistorial.filter((obj) => {
                let _obj = JSON.parse(obj.DATASECCION);
                if (_obj.id === option.id) {
                    res.push(_obj);
                }
            });
        });

        result = res.sort((a, b) => b.numeroTurno - a.numeroTurno);
        // Quitar duplicados
        resultId = result.filter(o => hash[o.id] ? false : hash[o.id] = true);
        // Ordenar desc
        _arr = resultId.sort((a, b) => a.nro - b.nro);

        return _arr;
    }

    static parseSeccionVentilacion(options) {
        let res = [];
        let result = [];
        let resultId = [];
        let _arr = [];
        let hash = {};

        options.map((option) => {
            FecthUci.dataHistorial.filter((obj) => {
                let _obj = JSON.parse(obj.DATASECCION);
                if (_obj.id === option.id) {
                    res.push(_obj);
                }
            });
        });

        result = res.sort((a, b) => b.numeroTurno - a.numeroTurno);
        // Quitar duplicados
        resultId = result.filter(o => hash[o.id] ? false : hash[o.id] = true);
        // Ordenar desc
        _arr = resultId.sort((a, b) => a.nro - b.nro);

        return _arr;
    }

    static parseSeccionHemodialisis_Histoial(options) {
        let res = [];
        let result = [];
        let hash = {};

        options.map((option) => {
            FecthUci.dataHistorial.filter((obj) => {
                let _obj = JSON.parse(obj.DATASECCION);
                if (_obj.id === option.id) {
                    res.push(_obj);
                }
            });
        });

        result = res.filter(o => hash[o.nro] ? false : hash[o.nro] = true);

        return result;
    }

    static parseSeccionHemodialisis(options) {
        let res = [];
        let result = [];
        let resultId = [];
        let _arr = [];
        let hash = {};

        options.map((option) => {
            FecthUci.dataHistorial.filter((obj) => {
                let _obj = JSON.parse(obj.DATASECCION);
                if (_obj.id === option.id) {
                    res.push(_obj);
                }
            });
        });

        result = res.sort((a, b) => b.numeroTurno - a.numeroTurno);

        // Quitar duplicados
        resultId = result.filter(o => hash[o.id] ? false : hash[o.id] = true);
        // Ordenar desc
        _arr = resultId.sort((a, b) => a.nro - b.nro);

        return _arr;
    }

    static parseSeccionMarcapasos(options) {
        let res = [];
        let result = [];
        let resultId = [];
        let _arr = [];
        let hash = {};

        options.map((option) => {
            FecthUci.dataHistorial.filter((obj) => {
                let _obj = JSON.parse(obj.DATASECCION);
                if (_obj.id === option.id) {
                    res.push(_obj);
                }
            });
        });

        result = res.sort((a, b) => b.numeroTurno - a.numeroTurno);

        // Quitar duplicados
        resultId = result.filter(o => hash[o.id] ? false : hash[o.id] = true);
        // Ordenar desc
        _arr = resultId.sort((a, b) => a.nro - b.nro);
        console.log(444, _arr)

        return _arr;
    }

    static parseSeccionOxigenacion(options) {
        let res = [];
        let result = [];
        let resultId = [];
        let _arr = [];
        let hash = {};

        options.map((option) => {
            FecthUci.dataHistorial.filter((obj) => {
                let _obj = JSON.parse(obj.DATASECCION);
                if (_obj.id === option.id) {
                    res.push(_obj);
                }
            });
        });

        result = res.sort((a, b) => b.numeroTurno - a.numeroTurno);

        // Quitar duplicados
        resultId = result.filter(o => hash[o.id] ? false : hash[o.id] = true);
        // Ordenar desc
        _arr = resultId.sort((a, b) => a.nro - b.nro);

        return _arr;
    }


    static parseSeccionVentilatorios_AllRegistros(options) {

        let res = [];
        let result = [];
        let resultNro = [];
        let hash = {};

        options.map((option) => {
            FecthUci.dataHistorial.filter((obj) => {
                let _obj = JSON.parse(obj.DATASECCION);
                if (_obj.id === option.id) {
                    res.push(_obj);
                }
            });
        });


        result = res.sort((a, b) => b.nro - a.nro);

        resultNro = result.filter(o => hash[o.nro] ? false : hash[o.nro] = true);

        return resultNro;

    }

    static parseSeccionPrescripcionesUci_v2(options) {


        let res = [];
        let result = [];
        let resultId = [];
        let resultNro = [];
        let _arr = [];
        let hash = {};


        options.map((option) => {
            FecthUci.dataHistorial.filter((obj) => {
                let _obj = JSON.parse(obj.DATASECCION);
                if (_obj.id === option.id && _obj.seccion == 'PrescripcionesUci') {
                    res.push(_obj);
                }
            });
        });

        if (res.length == 0) {
            res = PrescripcionesUci.allRegistros;
        }

        result = res.sort((a, b) => b.nro - a.nro);

        resultNro = result.filter(o => hash[o.nro] ? false : hash[o.nro] = true).sort((a, b) => a.nro - b.nro);

        // Quitar duplicados
        //_arr = resultNro.filter(o => hash[o.id] ? false : hash[o.id] = true);
        // Ordenar desc
        // _arr = resultId.sort((a, b) => a.orden - b.orden);
        _arr = resultNro.filter(o => o.status == 1);

        // Extablecer columnas por horarios
        PrescripcionesUci.filterRegistros();

        return _arr;

    }


    static parseSeccionPrescripcionesUci_AllRegistros(options) {

        let res = [];
        let result = [];
        let resultNro = [];
        let hash = {};

        options.map((option) => {
            FecthUci.dataHistorial.filter((obj) => {
                let _obj = JSON.parse(obj.DATASECCION);
                if (_obj.id === option.id && _obj.seccion == 'PrescripcionesUci') {
                    res.push(_obj);
                }
            });
        });


        result = res.sort((a, b) => b.nro - a.nro);

        console.log(7777777777777, result)

        resultNro = result.filter(o => hash[o.nro] ? false : hash[o.nro] = true);

        return resultNro;

    }


    static parseSeccionVentilatorios_v2(options) {

        let res = [];
        let result = [];
        let resultId = [];
        let resultNro = [];
        let _arr = [];
        let hash = {};
        let columnas = [];
        let filas = [];
        let valores = [];


        options.map((option) => {
            FecthUci.dataHistorial.filter((obj) => {
                let _obj = JSON.parse(obj.DATASECCION);
                if (_obj.id === option.id) {
                    res.push(_obj);
                }
            });
        });

        if (res.length == 0) {
            res = VentilatoriosUci.allRegistros;
        }

        result = res.sort((a, b) => b.nro - a.nro);

        resultNro = result.filter(o => hash[o.nro] ? false : hash[o.nro] = true).sort((a, b) => a.nro - b.nro);

        // Quitar duplicados
        resultId = resultNro.filter(o => hash[o.id] ? false : hash[o.id] = true);
        // Ordenar desc
        _arr = resultId.sort((a, b) => a.orden - b.orden);


        // Establecer Columnas
        let VolumenAltaFrecuencia = 0;
        let ModoVentilatorio = 0;
        let PresionInspiratoria = 0;
        let DCO2 = 0;
        let AmplitudDO2 = 0;
        let Flujo = 0;
        let PresionMediaVia = 0;
        let Hercios = 0;
        let PresionBalonTuboOrotraqueal = 0;
        let NivelTuboOrotraqueal = 0;
        let VolumenFugas = 0;

        let FIO2 = 0;
        let TiempoInspiratorio = 0;
        let RelacionInspiracionEspiracion = 0;
        let ResistenciaInspiratoria = 0;
        let ComplianceEstatica = 0;
        let ComplianceDinamica = 0;
        let FRPT = 0;
        let FRV = 0;
        let VolumenMinutoEspiradoPaciente = 0;
        let VolumenMinutoEspiradoMaquina = 0;
        let VolumenTidalEspiradoPaciente = 0;
        let VolumenTidalEspiradoMaquina = 0;
        let PresionSoporte = 0;
        let PorcentajeVolumenMinuto = 0;
        let AutoPeep = 0;
        let PEEP = 0;
        let PresionMedia = 0;
        let PresionPico = 0;

        resultNro.map((col, i) => {
            if (col.id == 'VolumenAltaFrecuencia') {
                VolumenAltaFrecuencia++;
            }
            if (col.id == 'ModoVentilatorio') {
                ModoVentilatorio++;
            }
            if (col.id == 'PresionInspiratoria') {
                PresionInspiratoria++;
            }
            if (col.id == 'DCO2') {
                DCO2++;
            }
            if (col.id == 'AmplitudDO2') {
                AmplitudDO2++;
            }
            if (col.id == 'Flujo') {
                Flujo++;
            }
            if (col.id == 'PresionMediaVia') {
                PresionMediaVia++;
            }
            if (col.id == 'Hercios') {
                Hercios++;
            }
            if (col.id == 'PresionBalonTuboOrotraqueal') {
                PresionBalonTuboOrotraqueal++;
            }
            if (col.id == 'NivelTuboOrotraqueal') {
                NivelTuboOrotraqueal++;
            }
            if (col.id == 'VolumenFugas') {
                VolumenFugas++;
            }

            if (col.id == 'FIO2') {
                FIO2++;
            }
            if (col.id == 'TiempoInspiratorio') {
                TiempoInspiratorio++;
            }
            if (col.id == 'RelacionInspiracionEspiracion') {
                RelacionInspiracionEspiracion++;
            }
            if (col.id == 'ResistenciaInspiratoria') {
                ResistenciaInspiratoria++;
            }
            if (col.id == 'ComplianceDinamica') {
                ComplianceDinamica++;
            }
            if (col.id == 'ComplianceEstatica') {
                ComplianceEstatica++;
            }
            if (col.id == 'FRPT') {
                FRPT++;
            }
            if (col.id == 'FRV') {
                FRV++;
            }
            if (col.id == 'VolumenMinutoEspiradoPaciente') {
                VolumenMinutoEspiradoPaciente++;
            }
            if (col.id == 'VolumenMinutoEspiradoMaquina') {
                VolumenMinutoEspiradoMaquina++;
            }
            if (col.id == 'VolumenTidalEspiradoPaciente') {
                VolumenTidalEspiradoPaciente++;
            }
            if (col.id == 'VolumenTidalEspiradoMaquina') {
                VolumenTidalEspiradoMaquina++;
            }
            if (col.id == 'PresionSoporte') {
                PresionSoporte++;
            }
            if (col.id == 'PorcentajeVolumenMinuto') {
                PorcentajeVolumenMinuto++;
            }
            if (col.id == 'AutoPeep') {
                AutoPeep++;
            }
            if (col.id == 'PEEP') {
                PEEP++;
            }
            if (col.id == 'PresionMedia') {
                PresionMedia++;
            }
            if (col.id == 'PresionPico') {
                PresionPico++;
            }
        });

        columnas = [VolumenAltaFrecuencia, ModoVentilatorio, PresionInspiratoria, DCO2, AmplitudDO2, Flujo, PresionMediaVia, Hercios, PresionBalonTuboOrotraqueal, NivelTuboOrotraqueal, VolumenFugas, FIO2, TiempoInspiratorio, RelacionInspiracionEspiracion, ResistenciaInspiratoria, ComplianceEstatica, ComplianceDinamica, FRPT, FRV, VolumenMinutoEspiradoPaciente, VolumenMinutoEspiradoMaquina, VolumenTidalEspiradoPaciente, VolumenTidalEspiradoMaquina, PresionSoporte, PorcentajeVolumenMinuto, AutoPeep, PEEP, PresionMedia, PresionPico];

        resultNro.map((col, i) => {
            let fila = {};
            if (col.id == 'ModoVentilatorio') {
                fila.id = col.id;
                fila.idObj = [];
                fila.idObj.push(i);

                // Verificar si existe
                let f = [];
                f = filas.filter(v => v.id == col.id);

                if (f.length == 0) {
                    filas.push(fila);
                    valores.push(fila);
                }

                if (f.length > 0) {
                    valores.map((v, _i) => {
                        if (v.id == col.id) {
                            valores[_i]['idObj'].push(i);
                        }
                    });
                }


            }
            if (col.id == 'PresionInspiratoria') {
                fila.id = col.id;
                fila.idObj = [];
                fila.idObj.push(i);

                // Verificar si existe
                let f = [];
                f = filas.filter(v => v.id == col.id);

                if (f.length == 0) {
                    filas.push(fila);
                    valores.push(fila);
                }

                if (f.length > 0) {
                    valores.map((v, _i) => {
                        if (v.id == col.id) {
                            valores[_i]['idObj'].push(i);
                        }
                    });
                }


            }
            if (col.id == 'VolumenAltaFrecuencia') {
                fila.id = col.id;
                fila.idObj = [];
                fila.idObj.push(i);

                // Verificar si existe
                let f = [];
                f = filas.filter(v => v.id == col.id);

                if (f.length == 0) {
                    filas.push(fila);
                    valores.push(fila);
                }

                if (f.length > 0) {
                    valores.map((v, _i) => {
                        if (v.id == col.id) {
                            valores[_i]['idObj'].push(i);
                        }
                    });
                }
            }
            if (col.id == 'DCO2') {
                fila.id = col.id;
                fila.idObj = [];
                fila.idObj.push(i);

                // Verificar si existe
                let f = [];
                f = filas.filter(v => v.id == col.id);

                if (f.length == 0) {
                    filas.push(fila);
                    valores.push(fila);
                }

                if (f.length > 0) {
                    valores.map((v, _i) => {
                        if (v.id == col.id) {
                            valores[_i]['idObj'].push(i);
                        }
                    });
                }
            }
            if (col.id == 'AmplitudDO2') {
                fila.id = col.id;
                fila.idObj = [];
                fila.idObj.push(i);

                // Verificar si existe
                let f = [];
                f = filas.filter(v => v.id == col.id);

                if (f.length == 0) {
                    filas.push(fila);
                    valores.push(fila);
                }

                if (f.length > 0) {
                    valores.map((v, _i) => {
                        if (v.id == col.id) {
                            valores[_i]['idObj'].push(i);
                        }
                    });
                }
            }
            if (col.id == 'Flujo') {
                fila.id = col.id;
                fila.idObj = [];
                fila.idObj.push(i);

                // Verificar si existe
                let f = [];
                f = filas.filter(v => v.id == col.id);

                if (f.length == 0) {
                    filas.push(fila);
                    valores.push(fila);
                }

                if (f.length > 0) {
                    valores.map((v, _i) => {
                        if (v.id == col.id) {
                            valores[_i]['idObj'].push(i);
                        }
                    });
                }
            }
            if (col.id == 'PresionMediaVia') {
                fila.id = col.id;
                fila.idObj = [];
                fila.idObj.push(i);

                // Verificar si existe
                let f = [];
                f = filas.filter(v => v.id == col.id);

                if (f.length == 0) {
                    filas.push(fila);
                    valores.push(fila);
                }

                if (f.length > 0) {
                    valores.map((v, _i) => {
                        if (v.id == col.id) {
                            valores[_i]['idObj'].push(i);
                        }
                    });
                }
            }
            if (col.id == 'Hercios') {
                fila.id = col.id;
                fila.idObj = [];
                fila.idObj.push(i);

                // Verificar si existe
                let f = [];
                f = filas.filter(v => v.id == col.id);

                if (f.length == 0) {
                    filas.push(fila);
                    valores.push(fila);
                }

                if (f.length > 0) {
                    valores.map((v, _i) => {
                        if (v.id == col.id) {
                            valores[_i]['idObj'].push(i);
                        }
                    });
                }
            }
            if (col.id == 'PresionBalonTuboOrotraqueal') {
                fila.id = col.id;
                fila.idObj = [];
                fila.idObj.push(i);

                // Verificar si existe
                let f = [];
                f = filas.filter(v => v.id == col.id);

                if (f.length == 0) {
                    filas.push(fila);
                    valores.push(fila);
                }

                if (f.length > 0) {
                    valores.map((v, _i) => {
                        if (v.id == col.id) {
                            valores[_i]['idObj'].push(i);
                        }
                    });
                }
            }
            if (col.id == 'NivelTuboOrotraqueal') {
                fila.id = col.id;
                fila.idObj = [];
                fila.idObj.push(i);

                // Verificar si existe
                let f = [];
                f = filas.filter(v => v.id == col.id);

                if (f.length == 0) {
                    filas.push(fila);
                    valores.push(fila);
                }

                if (f.length > 0) {
                    valores.map((v, _i) => {
                        if (v.id == col.id) {
                            valores[_i]['idObj'].push(i);
                        }
                    });
                }
            }
            if (col.id == 'VolumenFugas') {
                fila.id = col.id;
                fila.idObj = [];
                fila.idObj.push(i);

                // Verificar si existe
                let f = [];
                f = filas.filter(v => v.id == col.id);

                if (f.length == 0) {
                    filas.push(fila);
                    valores.push(fila);
                }

                if (f.length > 0) {
                    valores.map((v, _i) => {
                        if (v.id == col.id) {
                            valores[_i]['idObj'].push(i);
                        }
                    });
                }
            }

            if (col.id == 'FIO2') {
                fila.id = col.id;
                fila.idObj = [];
                fila.idObj.push(i);

                // Verificar si existe
                let f = [];
                f = filas.filter(v => v.id == col.id);

                if (f.length == 0) {
                    filas.push(fila);
                    valores.push(fila);
                }

                if (f.length > 0) {
                    valores.map((v, _i) => {
                        if (v.id == col.id) {
                            valores[_i]['idObj'].push(i);
                        }
                    });
                }
            }
            if (col.id == 'TiempoInspiratorio') {
                fila.id = col.id;
                fila.idObj = [];
                fila.idObj.push(i);

                // Verificar si existe
                let f = [];
                f = filas.filter(v => v.id == col.id);

                if (f.length == 0) {
                    filas.push(fila);
                    valores.push(fila);
                }

                if (f.length > 0) {
                    valores.map((v, _i) => {
                        if (v.id == col.id) {
                            valores[_i]['idObj'].push(i);
                        }
                    });
                }
            }
            if (col.id == 'RelacionInspiracionEspiracion') {
                fila.id = col.id;
                fila.idObj = [];
                fila.idObj.push(i);

                // Verificar si existe
                let f = [];
                f = filas.filter(v => v.id == col.id);

                if (f.length == 0) {
                    filas.push(fila);
                    valores.push(fila);
                }

                if (f.length > 0) {
                    valores.map((v, _i) => {
                        if (v.id == col.id) {
                            valores[_i]['idObj'].push(i);
                        }
                    });
                }
            }
            if (col.id == 'ResistenciaInspiratoria') {
                fila.id = col.id;
                fila.idObj = [];
                fila.idObj.push(i);

                // Verificar si existe
                let f = [];
                f = filas.filter(v => v.id == col.id);

                if (f.length == 0) {
                    filas.push(fila);
                    valores.push(fila);
                }

                if (f.length > 0) {
                    valores.map((v, _i) => {
                        if (v.id == col.id) {
                            valores[_i]['idObj'].push(i);
                        }
                    });
                }
            }

            if (col.id == 'ComplianceEstatica') {
                fila.id = col.id;
                fila.idObj = [];
                fila.idObj.push(i);

                // Verificar si existe
                let f = [];
                f = filas.filter(v => v.id == col.id);

                if (f.length == 0) {
                    filas.push(fila);
                    valores.push(fila);
                }

                if (f.length > 0) {
                    valores.map((v, _i) => {
                        if (v.id == col.id) {
                            valores[_i]['idObj'].push(i);
                        }
                    });
                }
            }
            if (col.id == 'ComplianceDinamica') {
                fila.id = col.id;
                fila.idObj = [];
                fila.idObj.push(i);

                // Verificar si existe
                let f = [];
                f = filas.filter(v => v.id == col.id);

                if (f.length == 0) {
                    filas.push(fila);
                    valores.push(fila);
                }

                if (f.length > 0) {
                    valores.map((v, _i) => {
                        if (v.id == col.id) {
                            valores[_i]['idObj'].push(i);
                        }
                    });
                }
            }
            if (col.id == 'FRPT') {
                fila.id = col.id;
                fila.idObj = [];
                fila.idObj.push(i);

                // Verificar si existe
                let f = [];
                f = filas.filter(v => v.id == col.id);

                if (f.length == 0) {
                    filas.push(fila);
                    valores.push(fila);
                }

                if (f.length > 0) {
                    valores.map((v, _i) => {
                        if (v.id == col.id) {
                            valores[_i]['idObj'].push(i);
                        }
                    });
                }
            }
            if (col.id == 'FRV') {
                fila.id = col.id;
                fila.idObj = [];
                fila.idObj.push(i);

                // Verificar si existe
                let f = [];
                f = filas.filter(v => v.id == col.id);

                if (f.length == 0) {
                    filas.push(fila);
                    valores.push(fila);
                }

                if (f.length > 0) {
                    valores.map((v, _i) => {
                        if (v.id == col.id) {
                            valores[_i]['idObj'].push(i);
                        }
                    });
                }
            }
            if (col.id == 'VolumenMinutoEspiradoPaciente') {
                fila.id = col.id;
                fila.idObj = [];
                fila.idObj.push(i);

                // Verificar si existe
                let f = [];
                f = filas.filter(v => v.id == col.id);

                if (f.length == 0) {
                    filas.push(fila);
                    valores.push(fila);
                }

                if (f.length > 0) {
                    valores.map((v, _i) => {
                        if (v.id == col.id) {
                            valores[_i]['idObj'].push(i);
                        }
                    });
                }
            }
            if (col.id == 'VolumenMinutoEspiradoMaquina') {
                fila.id = col.id;
                fila.idObj = [];
                fila.idObj.push(i);

                // Verificar si existe
                let f = [];
                f = filas.filter(v => v.id == col.id);

                if (f.length == 0) {
                    filas.push(fila);
                    valores.push(fila);
                }

                if (f.length > 0) {
                    valores.map((v, _i) => {
                        if (v.id == col.id) {
                            valores[_i]['idObj'].push(i);
                        }
                    });
                }
            }
            if (col.id == 'VolumenTidalEspiradoPaciente') {
                fila.id = col.id;
                fila.idObj = [];
                fila.idObj.push(i);

                // Verificar si existe
                let f = [];
                f = filas.filter(v => v.id == col.id);

                if (f.length == 0) {
                    filas.push(fila);
                    valores.push(fila);
                }

                if (f.length > 0) {
                    valores.map((v, _i) => {
                        if (v.id == col.id) {
                            valores[_i]['idObj'].push(i);
                        }
                    });
                }
            }
            if (col.id == 'VolumenTidalEspiradoMaquina') {
                fila.id = col.id;
                fila.idObj = [];
                fila.idObj.push(i);

                // Verificar si existe
                let f = [];
                f = filas.filter(v => v.id == col.id);

                if (f.length == 0) {
                    filas.push(fila);
                    valores.push(fila);
                }

                if (f.length > 0) {
                    valores.map((v, _i) => {
                        if (v.id == col.id) {
                            valores[_i]['idObj'].push(i);
                        }
                    });
                }
            }
            if (col.id == 'PresionSoporte') {
                fila.id = col.id;
                fila.idObj = [];
                fila.idObj.push(i);

                // Verificar si existe
                let f = [];
                f = filas.filter(v => v.id == col.id);

                if (f.length == 0) {
                    filas.push(fila);
                    valores.push(fila);
                }

                if (f.length > 0) {
                    valores.map((v, _i) => {
                        if (v.id == col.id) {
                            valores[_i]['idObj'].push(i);
                        }
                    });
                }
            }
            if (col.id == 'PorcentajeVolumenMinuto') {
                fila.id = col.id;
                fila.idObj = [];
                fila.idObj.push(i);

                // Verificar si existe
                let f = [];
                f = filas.filter(v => v.id == col.id);

                if (f.length == 0) {
                    filas.push(fila);
                    valores.push(fila);
                }

                if (f.length > 0) {
                    valores.map((v, _i) => {
                        if (v.id == col.id) {
                            valores[_i]['idObj'].push(i);
                        }
                    });
                }
            }
            if (col.id == 'AutoPeep') {
                fila.id = col.id;
                fila.idObj = [];
                fila.idObj.push(i);

                // Verificar si existe
                let f = [];
                f = filas.filter(v => v.id == col.id);

                if (f.length == 0) {
                    filas.push(fila);
                    valores.push(fila);
                }

                if (f.length > 0) {
                    valores.map((v, _i) => {
                        if (v.id == col.id) {
                            valores[_i]['idObj'].push(i);
                        }
                    });
                }
            }
            if (col.id == 'PEEP') {
                fila.id = col.id;
                fila.idObj = [];
                fila.idObj.push(i);

                // Verificar si existe
                let f = [];
                f = filas.filter(v => v.id == col.id);

                if (f.length == 0) {
                    filas.push(fila);
                    valores.push(fila);
                }

                if (f.length > 0) {
                    valores.map((v, _i) => {
                        if (v.id == col.id) {
                            valores[_i]['idObj'].push(i);
                        }
                    });
                }
            }
            if (col.id == 'PresionMedia') {
                fila.id = col.id;
                fila.idObj = [];
                fila.idObj.push(i);

                // Verificar si existe
                let f = [];
                f = filas.filter(v => v.id == col.id);

                if (f.length == 0) {
                    filas.push(fila);
                    valores.push(fila);
                }

                if (f.length > 0) {
                    valores.map((v, _i) => {
                        if (v.id == col.id) {
                            valores[_i]['idObj'].push(i);
                        }
                    });
                }
            }
            if (col.id == 'PresionPico') {
                fila.id = col.id;
                fila.idObj = [];
                fila.idObj.push(i);

                // Verificar si existe
                let f = [];
                f = filas.filter(v => v.id == col.id);

                if (f.length == 0) {
                    filas.push(fila);
                    valores.push(fila);
                }

                if (f.length > 0) {
                    valores.map((v, _i) => {
                        if (v.id == col.id) {
                            valores[_i]['idObj'].push(i);
                        }
                    });
                }
            }

        });



        VentilatoriosUci.sColumns = [];
        VentilatoriosUci.sColumns = [{
            title: "Turno: ",
        },
        {
            title: "Order Nro : ",
        },
        {
            title: "Turno: ",
        },
        {
            title: "Ventilatorio:",
        },

        ];

        // Ordenar Columnas
        let orderCol = columnas.sort((a, b) => b - a);

        if (orderCol[0] == 0) {
            orderCol[0] = 1;
        }

        for (let index = 0; index < orderCol[0]; index++) {
            VentilatoriosUci.sColumns.push({
                title: "Hora:",
            });
            VentilatoriosUci.sColumns.push({
                title: "Valor:",
            });
        }


        VentilatoriosUci.sRows = [];
        VentilatoriosUci.sRows = [{
            mRender: function (data, type, full) {
                return full.fechaHoraTurno;
            },
            visible: false,
            aTargets: [0],
            orderable: true,
        },
        {
            mRender: function (data, type, full) {
                return full.orden;
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
                                    class: (PacientesUCIHistorial.fechaHoraTurno == oData.fechaHoraTurno ? 'bg-warning' : 'bg-light')
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
            visible: false,
            aTargets: [2],
            orderable: false,

        },
        {
            mRender: function (data, type, full) {
                return full.ventilatorio;
            },

            visible: true,
            aTargets: [3],
            orderable: true,

        },
        ];

        // Ordenar Filas
        for (let index = 0; index < orderCol[0]; index++) {

            VentilatoriosUci.sRows.push({
                fnCreatedCell: function (nTd, sData, oData, iRow, iCol) {
                    return m.mount(nTd, {
                        view: () => {
                            return [
                                m('div.text-center.pd-l-0.pd-r-0', {

                                    onclick: (e) => {
                                        e.preventDefault();
                                    },


                                    oncreate: (el) => {
                                        valores.filter((v, i) => {

                                            if (v.id == oData.id) {
                                                let _i = v.idObj[index];

                                                if (resultNro[_i] !== undefined) {
                                                    if (resultNro[_i].hora !== null) {
                                                        el.dom.innerHTML = (resultNro[_i].condicion == undefined ? '<div class="text-center pd-l-0 pd-r-0"><hr style="border-color:#001737;"/></div>' : resultNro[_i].hora);

                                                    } else {
                                                        el.dom.innerHTML = '<div class="text-center pd-l-0 pd-r-0"><hr style="border-color:#001737;"/></div>';
                                                    }
                                                } else {
                                                    el.dom.innerHTML = '<div class="text-center pd-l-0 pd-r-0"><hr style="border-color:#001737;"/></div>';
                                                }
                                            }
                                        })
                                    }

                                }, [])
                            ]
                        }
                    });
                },
                visible: true,
                aTargets: null,
                orderable: true,

            });
            VentilatoriosUci.sRows.push({
                fnCreatedCell: function (nTd, sData, oData, iRow, iCol) {
                    return m.mount(nTd, {
                        view: () => {
                            return [
                                m('div.text-center.pd-l-0.pd-r-0', {

                                    onclick: (e) => {
                                        e.preventDefault();
                                    },


                                    oncreate: (el) => {
                                        valores.filter((v, i) => {

                                            if (v.id == oData.id) {
                                                let _i = v.idObj[index];

                                                if (resultNro[_i] !== undefined) {
                                                    if (resultNro[_i].condicion !== null) {
                                                        el.dom.innerHTML = (resultNro[_i].condicion == undefined ? '<div class="text-center pd-l-0 pd-r-0"><hr style="border-color:#001737;"/></div>' : resultNro[_i].condicion);

                                                    } else {
                                                        el.dom.innerHTML = '<div class="text-center pd-l-0 pd-r-0"><hr style="border-color:#001737;"/></div>';
                                                    }
                                                } else {
                                                    el.dom.innerHTML = '<div class="text-center pd-l-0 pd-r-0"><hr style="border-color:#001737;"/></div>';
                                                }
                                            }
                                        })
                                    }

                                }, [])
                            ]
                        }
                    });
                },
                visible: true,
                aTargets: null,
                orderable: true,

            });


        }


        VentilatoriosUci.sRows.map((c, i) => {
            VentilatoriosUci.sRows[i].aTargets = [i];
        })


        return _arr;

    }

    static parseSeccionGases_AllRegistros(options) {

        let res = [];
        let result = [];
        let resultNro = [];
        let hash = {};

        options.map((option) => {
            FecthUci.dataHistorial.filter((obj) => {
                let _obj = JSON.parse(obj.DATASECCION);
                if (_obj.id === option.id) {
                    res.push(_obj);
                }
            });
        });


        result = res.sort((a, b) => b.nro - a.nro);

        resultNro = result.filter(o => hash[o.nro] ? false : hash[o.nro] = true);

        return resultNro;

    }

    static parseSeccionGases_v2(options) {

        let res = [];
        let result = [];
        let resultId = [];
        let resultNro = [];
        let _arr = [];
        let hash = {};
        let columnas = [];
        let filas = [];
        let valores = [];


        options.map((option) => {
            FecthUci.dataHistorial.filter((obj) => {
                let _obj = JSON.parse(obj.DATASECCION);
                if (_obj.id === option.id) {
                    res.push(_obj);
                }
            });
        });

        if (res.length == 0) {
            res = GasesUci.allRegistros;
        }

        result = res.sort((a, b) => b.nro - a.nro);

        resultNro = result.filter(o => hash[o.nro] ? false : hash[o.nro] = true).sort((a, b) => a.nro - b.nro);

        // Quitar duplicados
        resultId = resultNro.filter(o => hash[o.id] ? false : hash[o.id] = true);
        // Ordenar desc
        _arr = resultId.sort((a, b) => a.orden - b.orden);

        // Establecer Columnas
        let PH = 0;
        let PaCO2 = 0;
        let PaO2 = 0;
        let HCO3 = 0;
        let TC02 = 0;
        let ExcesoBase = 0;
        let FiO2 = 0;
        let PaO2FiO2 = 0;
        let SaO2 = 0;
        let IndiceOxigenacion = 0;
        let Lactato = 0;
        let Na = 0;
        let K = 0;


        resultNro.map((col, i) => {
            if (col.id == 'PH') {
                PH++;
            }
            if (col.id == 'PaCO2') {
                PaCO2++;
            }
            if (col.id == 'PaO2') {
                PaO2++;
            }
            if (col.id == 'HCO3') {
                HCO3++;
            }
            if (col.id == 'TC02') {
                TC02++;
            }
            if (col.id == 'ExcesoBase') {
                ExcesoBase++;
            }
            if (col.id == 'FiO2') {
                FiO2++;
            }
            if (col.id == 'PaO2FiO2') {
                PaO2FiO2++;
            }
            if (col.id == 'SaO2') {
                SaO2++;
            }
            if (col.id == 'IndiceOxigenacion') {
                IndiceOxigenacion++;
            }
            if (col.id == 'Lactato') {
                Lactato++;
            }
            if (col.id == 'VolumenFugas') {
                VolumenFugas++;
            }
            if (col.id == 'Na') {
                Na++;
            }
            if (col.id == 'K') {
                K++;
            }

        });

        columnas = [PH, PaCO2, PaO2, HCO3, TC02, ExcesoBase, FiO2, PaO2FiO2, SaO2, IndiceOxigenacion, Lactato, Na, K];

        resultNro.map((col, i) => {
            let fila = {};
            if (col.id == 'PH') {
                fila.id = col.id;
                fila.idObj = [];
                fila.idObj.push(i);

                // Verificar si existe
                let f = [];
                f = filas.filter(v => v.id == col.id);

                if (f.length == 0) {
                    filas.push(fila);
                    valores.push(fila);
                }

                if (f.length > 0) {
                    valores.map((v, _i) => {
                        if (v.id == col.id) {
                            valores[_i]['idObj'].push(i);
                        }
                    });
                }


            }
            if (col.id == 'PaCO2') {
                fila.id = col.id;
                fila.idObj = [];
                fila.idObj.push(i);

                // Verificar si existe
                let f = [];
                f = filas.filter(v => v.id == col.id);

                if (f.length == 0) {
                    filas.push(fila);
                    valores.push(fila);
                }

                if (f.length > 0) {
                    valores.map((v, _i) => {
                        if (v.id == col.id) {
                            valores[_i]['idObj'].push(i);
                        }
                    });
                }


            }
            if (col.id == 'PaO2') {
                fila.id = col.id;
                fila.idObj = [];
                fila.idObj.push(i);

                // Verificar si existe
                let f = [];
                f = filas.filter(v => v.id == col.id);

                if (f.length == 0) {
                    filas.push(fila);
                    valores.push(fila);
                }

                if (f.length > 0) {
                    valores.map((v, _i) => {
                        if (v.id == col.id) {
                            valores[_i]['idObj'].push(i);
                        }
                    });
                }
            }
            if (col.id == 'HCO3') {
                fila.id = col.id;
                fila.idObj = [];
                fila.idObj.push(i);

                // Verificar si existe
                let f = [];
                f = filas.filter(v => v.id == col.id);

                if (f.length == 0) {
                    filas.push(fila);
                    valores.push(fila);
                }

                if (f.length > 0) {
                    valores.map((v, _i) => {
                        if (v.id == col.id) {
                            valores[_i]['idObj'].push(i);
                        }
                    });
                }
            }
            if (col.id == 'TC02') {
                fila.id = col.id;
                fila.idObj = [];
                fila.idObj.push(i);

                // Verificar si existe
                let f = [];
                f = filas.filter(v => v.id == col.id);

                if (f.length == 0) {
                    filas.push(fila);
                    valores.push(fila);
                }

                if (f.length > 0) {
                    valores.map((v, _i) => {
                        if (v.id == col.id) {
                            valores[_i]['idObj'].push(i);
                        }
                    });
                }
            }
            if (col.id == 'ExcesoBase') {
                fila.id = col.id;
                fila.idObj = [];
                fila.idObj.push(i);

                // Verificar si existe
                let f = [];
                f = filas.filter(v => v.id == col.id);

                if (f.length == 0) {
                    filas.push(fila);
                    valores.push(fila);
                }

                if (f.length > 0) {
                    valores.map((v, _i) => {
                        if (v.id == col.id) {
                            valores[_i]['idObj'].push(i);
                        }
                    });
                }
            }
            if (col.id == 'FiO2') {
                fila.id = col.id;
                fila.idObj = [];
                fila.idObj.push(i);

                // Verificar si existe
                let f = [];
                f = filas.filter(v => v.id == col.id);

                if (f.length == 0) {
                    filas.push(fila);
                    valores.push(fila);
                }

                if (f.length > 0) {
                    valores.map((v, _i) => {
                        if (v.id == col.id) {
                            valores[_i]['idObj'].push(i);
                        }
                    });
                }
            }
            if (col.id == 'PaO2FiO2') {
                fila.id = col.id;
                fila.idObj = [];
                fila.idObj.push(i);

                // Verificar si existe
                let f = [];
                f = filas.filter(v => v.id == col.id);

                if (f.length == 0) {
                    filas.push(fila);
                    valores.push(fila);
                }

                if (f.length > 0) {
                    valores.map((v, _i) => {
                        if (v.id == col.id) {
                            valores[_i]['idObj'].push(i);
                        }
                    });
                }
            }
            if (col.id == 'SaO2') {
                fila.id = col.id;
                fila.idObj = [];
                fila.idObj.push(i);

                // Verificar si existe
                let f = [];
                f = filas.filter(v => v.id == col.id);

                if (f.length == 0) {
                    filas.push(fila);
                    valores.push(fila);
                }

                if (f.length > 0) {
                    valores.map((v, _i) => {
                        if (v.id == col.id) {
                            valores[_i]['idObj'].push(i);
                        }
                    });
                }
            }
            if (col.id == 'IndiceOxigenacion') {
                fila.id = col.id;
                fila.idObj = [];
                fila.idObj.push(i);

                // Verificar si existe
                let f = [];
                f = filas.filter(v => v.id == col.id);

                if (f.length == 0) {
                    filas.push(fila);
                    valores.push(fila);
                }

                if (f.length > 0) {
                    valores.map((v, _i) => {
                        if (v.id == col.id) {
                            valores[_i]['idObj'].push(i);
                        }
                    });
                }
            }
            if (col.id == 'Lactato') {
                fila.id = col.id;
                fila.idObj = [];
                fila.idObj.push(i);

                // Verificar si existe
                let f = [];
                f = filas.filter(v => v.id == col.id);

                if (f.length == 0) {
                    filas.push(fila);
                    valores.push(fila);
                }

                if (f.length > 0) {
                    valores.map((v, _i) => {
                        if (v.id == col.id) {
                            valores[_i]['idObj'].push(i);
                        }
                    });
                }
            }
            if (col.id == 'Na') {
                fila.id = col.id;
                fila.idObj = [];
                fila.idObj.push(i);

                // Verificar si existe
                let f = [];
                f = filas.filter(v => v.id == col.id);

                if (f.length == 0) {
                    filas.push(fila);
                    valores.push(fila);
                }

                if (f.length > 0) {
                    valores.map((v, _i) => {
                        if (v.id == col.id) {
                            valores[_i]['idObj'].push(i);
                        }
                    });
                }
            }
            if (col.id == 'K') {
                fila.id = col.id;
                fila.idObj = [];
                fila.idObj.push(i);

                // Verificar si existe
                let f = [];
                f = filas.filter(v => v.id == col.id);

                if (f.length == 0) {
                    filas.push(fila);
                    valores.push(fila);
                }

                if (f.length > 0) {
                    valores.map((v, _i) => {
                        if (v.id == col.id) {
                            valores[_i]['idObj'].push(i);
                        }
                    });
                }
            }
        });

        GasesUci.sColumns = [];
        GasesUci.sColumns = [{
            title: "Turno: ",
        },
        {
            title: "Order Nro : ",
        },
        {
            title: "Turno: ",
        },
        {
            title: "Gases:",
        },

        ];

        // 'data-orden'ar Columnas
        let orderCol = columnas.sort((a, b) => b - a);

        if (orderCol[0] == 0) {
            orderCol[0] = 1;
        }

        for (let index = 0; index < orderCol[0]; index++) {
            GasesUci.sColumns.push({
                title: "Hora:",
            });
            GasesUci.sColumns.push({
                title: "Valor:",
            });
        }

        GasesUci.sColumns.push({
            title: "Opciones:",
        });

        GasesUci.sRows = [];
        GasesUci.sRows = [{
            mRender: function (data, type, full) {
                return full.fechaHoraTurno;
            },
            visible: false,
            aTargets: [0],
            orderable: true,
        },
        {
            mRender: function (data, type, full) {
                return full.orden;
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
                                    class: (PacientesUCIHistorial.fechaHoraTurno == oData.fechaHoraTurno ? 'bg-warning' : 'bg-light')
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
            visible: false,
            aTargets: [2],
            orderable: false,

        },
        {
            mRender: function (data, type, full) {
                return full.gas;
            },
            fnCreatedCell: function (nTd, sData, oData, iRow, iCol) {
                return m.mount(nTd, {
                    view: () => {
                        return [
                            m('div', {
                                id: 'Gases_' + oData.id,
                            }, [oData.gas]),

                        ]
                    }
                });
            },

            visible: true,
            aTargets: [3],
            orderable: true,

        },
        ];

        // 'data-orden'ar Filas
        for (let index = 0; index < orderCol[0]; index++) {
            GasesUci.sRows.push({
                fnCreatedCell: function (nTd, sData, oData, iRow, iCol) {
                    return m.mount(nTd, {
                        view: () => {
                            return [
                                m('div', {

                                    oncreate: (el) => {
                                        el.dom.className = "text-center pd-l-0 pd-r-0";

                                        valores.filter((v, i) => {

                                            if (v.id == oData.id) {
                                                let _i = v.idObj[index];

                                                if (resultNro[_i] !== undefined) {
                                                    if (resultNro[_i].hora !== null) {
                                                        el.dom.id = "txtGasesHora" + resultNro[_i].nro;
                                                        el.dom.innerHTML = resultNro[_i].hora;
                                                    } else {
                                                        el.dom.id = "txtGasesHora" + resultNro[_i].nro;
                                                        el.dom.innerHTML = '<div class="text-center pd-l-0 pd-r-0"><hr style="border-color:#001737;"/></div>';
                                                    }
                                                } else {
                                                    el.dom.innerHTML = '<div class="text-center pd-l-0 pd-r-0"><hr style="border-color:#001737;"/></div>';
                                                }
                                            }
                                        })
                                    }
                                }, []),

                            ]
                        }
                    });
                },
                visible: true,
                aTargets: null,
                orderable: true,

            });
            GasesUci.sRows.push({
                fnCreatedCell: function (nTd, sData, oData, iRow, iCol) {
                    return m.mount(nTd, {
                        view: () => {
                            return [
                                m('div', {


                                    oncreate: (el) => {
                                        el.dom.className = "text-center pd-l-0 pd-r-0";

                                        valores.filter((v, i) => {
                                            if (v.id == oData.id) {
                                                let _i = v.idObj[index];
                                                if (resultNro[_i] !== undefined) {
                                                    if (resultNro[_i].valores !== null) {
                                                        el.dom.innerHTML = resultNro[_i].valores;
                                                        el.dom.id = "txtGasesValores" + resultNro[_i].nro;
                                                    } else {
                                                        el.dom.id = "txtGasesValores" + resultNro[_i].nro;
                                                        el.dom.innerHTML = '<div class="text-center pd-l-0 pd-r-0"><hr style="border-color:#001737;"/></div>';
                                                    }
                                                } else {
                                                    el.dom.innerHTML = '<div class="text-center pd-l-0 pd-r-0"><hr style="border-color:#001737;"/></div>';
                                                }
                                            }
                                        })
                                    }

                                }, []),

                            ]
                        }
                    });
                },
                visible: true,
                aTargets: null,
                orderable: true,
            });
        }

        GasesUci.sRows.push({
            fnCreatedCell: function (nTd, sData, oData, iRow, iCol) {
                return m.mount(nTd, {
                    view: () => {
                        return [

                        ]
                    }
                });
            },
            width: '5%',
            visible: false,
            aTargets: null,
            orderable: true,

        });

        GasesUci.sRows.map((c, i) => {
            GasesUci.sRows[i].aTargets = [i];
        });


        return _arr;

    }

    static parseSeccionMedidas_v2(options) {

        let res = [];
        let result = [];
        let resultId = [];
        let resultNro = [];
        let _arr = [];
        let hash = {};
        let columnas = [];
        let filas = [];
        let valores = [];


        options.map((option) => {
            FecthUci.dataHistorial.filter((obj) => {
                let _obj = JSON.parse(obj.DATASECCION);
                if (_obj.id === option.id) {
                    res.push(_obj);
                }
            });
        });

        if (res.length == 0) {
            res = MedidasUci.allRegistros;
        }

        result = res.sort((a, b) => b.nro - a.nro);

        resultNro = result.filter(o => hash[o.nro] ? false : hash[o.nro] = true).sort((a, b) => a.nro - b.nro);

        // Quitar duplicados
        resultId = resultNro.filter(o => hash[o.id] ? false : hash[o.id] = true);
        // Ordenar desc
        _arr = resultId.sort((a, b) => a.orden - b.orden);

        // Establecer Columnas
        let GastoCardiaco = 0;
        let IndiceCardiaco = 0;
        let VolumenSistolico = 0;
        let PresionCapilarPulmonar = 0;
        let IndiceResistenciaVascularSistemicaIndexada = 0;
        let ResistenciaVascularSistemica = 0;
        let IndiceResistenciaVascularPulmonarIndexada = 0;
        let PresionCuna = 0;
        let PresionArteriaPulmonar = 0;
        let TransporteArterialOxigeno = 0;
        let ConcentracionOxigeno = 0;
        let PresionPerfusionCerebral = 0;
        let PresionIntraCraneal = 0;
        let PresionIntraAbdominal = 0;
        let PresionVenosaCentral = 0;
        let PresionVenosaCentralAuricula = 0;
        let Biss = 0;
        let Contrapulsacion = 0;


        resultNro.map((col, i) => {
            if (col.id == 'GastoCardiaco') {
                GastoCardiaco++;
            }
            if (col.id == 'IndiceCardiaco') {
                IndiceCardiaco++;
            }
            if (col.id == 'VolumenSistolico') {
                VolumenSistolico++;
            }
            if (col.id == 'PresionCapilarPulmonar') {
                PresionCapilarPulmonar++;
            }
            if (col.id == 'IndiceResistenciaVascularSistemicaIndexada') {
                IndiceResistenciaVascularSistemicaIndexada++;
            }
            if (col.id == 'ResistenciaVascularSistemica') {
                ResistenciaVascularSistemica++;
            }
            if (col.id == 'IndiceResistenciaVascularPulmonarIndexada') {
                IndiceResistenciaVascularPulmonarIndexada++;
            }
            if (col.id == 'PresionCuna') {
                PresionCuna++;
            }
            if (col.id == 'PresionArteriaPulmonar') {
                PresionArteriaPulmonar++;
            }
            if (col.id == 'TransporteArterialOxigeno') {
                TransporteArterialOxigeno++;
            }
            if (col.id == 'ConcentracionOxigeno') {
                ConcentracionOxigeno++;
            }
            if (col.id == 'PresionPerfusionCerebral') {
                PresionPerfusionCerebral++;
            }
            if (col.id == 'PresionIntraCraneal') {
                PresionIntraCraneal++;
            }
            if (col.id == 'PresionIntraAbdominal') {
                PresionIntraAbdominal++;
            }
            if (col.id == 'PresionVenosaCentral') {
                PresionVenosaCentral++;
            }
            if (col.id == 'PresionVenosaCentralAuricula') {
                PresionVenosaCentralAuricula++;
            }
            if (col.id == 'Biss') {
                Biss++;
            }
            if (col.id == 'Contrapulsacion') {
                Contrapulsacion++;
            }
        });

        columnas = [GastoCardiaco, IndiceCardiaco, VolumenSistolico, PresionCapilarPulmonar, IndiceResistenciaVascularSistemicaIndexada, ResistenciaVascularSistemica, IndiceResistenciaVascularPulmonarIndexada, PresionCuna, PresionArteriaPulmonar, TransporteArterialOxigeno, ConcentracionOxigeno, PresionPerfusionCerebral, PresionIntraCraneal, PresionIntraAbdominal, PresionVenosaCentral, PresionVenosaCentralAuricula, Biss, Contrapulsacion];

        resultNro.map((col, i) => {
            let fila = {};
            if (col.id == 'GastoCardiaco') {
                fila.id = col.id;
                fila.idObj = [];
                fila.idObj.push(i);

                // Verificar si existe
                let f = [];
                f = filas.filter(v => v.id == col.id);

                if (f.length == 0) {
                    filas.push(fila);
                    valores.push(fila);
                }

                if (f.length > 0) {
                    valores.map((v, _i) => {
                        if (v.id == col.id) {
                            valores[_i]['idObj'].push(i);
                        }
                    });
                }


            }
            if (col.id == 'IndiceCardiaco') {
                fila.id = col.id;
                fila.idObj = [];
                fila.idObj.push(i);

                // Verificar si existe
                let f = [];
                f = filas.filter(v => v.id == col.id);

                if (f.length == 0) {
                    filas.push(fila);
                    valores.push(fila);
                }

                if (f.length > 0) {
                    valores.map((v, _i) => {
                        if (v.id == col.id) {
                            valores[_i]['idObj'].push(i);
                        }
                    });
                }


            }
            if (col.id == 'VolumenSistolico') {
                fila.id = col.id;
                fila.idObj = [];
                fila.idObj.push(i);

                // Verificar si existe
                let f = [];
                f = filas.filter(v => v.id == col.id);

                if (f.length == 0) {
                    filas.push(fila);
                    valores.push(fila);
                }

                if (f.length > 0) {
                    valores.map((v, _i) => {
                        if (v.id == col.id) {
                            valores[_i]['idObj'].push(i);
                        }
                    });
                }
            }
            if (col.id == 'PresionCapilarPulmonar') {
                fila.id = col.id;
                fila.idObj = [];
                fila.idObj.push(i);

                // Verificar si existe
                let f = [];
                f = filas.filter(v => v.id == col.id);

                if (f.length == 0) {
                    filas.push(fila);
                    valores.push(fila);
                }

                if (f.length > 0) {
                    valores.map((v, _i) => {
                        if (v.id == col.id) {
                            valores[_i]['idObj'].push(i);
                        }
                    });
                }
            }
            if (col.id == 'IndiceResistenciaVascularSistemicaIndexada') {
                fila.id = col.id;
                fila.idObj = [];
                fila.idObj.push(i);

                // Verificar si existe
                let f = [];
                f = filas.filter(v => v.id == col.id);

                if (f.length == 0) {
                    filas.push(fila);
                    valores.push(fila);
                }

                if (f.length > 0) {
                    valores.map((v, _i) => {
                        if (v.id == col.id) {
                            valores[_i]['idObj'].push(i);
                        }
                    });
                }
            }
            if (col.id == 'ResistenciaVascularSistemica') {
                fila.id = col.id;
                fila.idObj = [];
                fila.idObj.push(i);

                // Verificar si existe
                let f = [];
                f = filas.filter(v => v.id == col.id);

                if (f.length == 0) {
                    filas.push(fila);
                    valores.push(fila);
                }

                if (f.length > 0) {
                    valores.map((v, _i) => {
                        if (v.id == col.id) {
                            valores[_i]['idObj'].push(i);
                        }
                    });
                }
            }
            if (col.id == 'IndiceResistenciaVascularPulmonarIndexada') {
                fila.id = col.id;
                fila.idObj = [];
                fila.idObj.push(i);

                // Verificar si existe
                let f = [];
                f = filas.filter(v => v.id == col.id);

                if (f.length == 0) {
                    filas.push(fila);
                    valores.push(fila);
                }

                if (f.length > 0) {
                    valores.map((v, _i) => {
                        if (v.id == col.id) {
                            valores[_i]['idObj'].push(i);
                        }
                    });
                }
            }
            if (col.id == 'PresionCuna') {
                fila.id = col.id;
                fila.idObj = [];
                fila.idObj.push(i);

                // Verificar si existe
                let f = [];
                f = filas.filter(v => v.id == col.id);

                if (f.length == 0) {
                    filas.push(fila);
                    valores.push(fila);
                }

                if (f.length > 0) {
                    valores.map((v, _i) => {
                        if (v.id == col.id) {
                            valores[_i]['idObj'].push(i);
                        }
                    });
                }
            }
            if (col.id == 'PresionArteriaPulmonar') {
                fila.id = col.id;
                fila.idObj = [];
                fila.idObj.push(i);

                // Verificar si existe
                let f = [];
                f = filas.filter(v => v.id == col.id);

                if (f.length == 0) {
                    filas.push(fila);
                    valores.push(fila);
                }

                if (f.length > 0) {
                    valores.map((v, _i) => {
                        if (v.id == col.id) {
                            valores[_i]['idObj'].push(i);
                        }
                    });
                }
            }
            if (col.id == 'TransporteArterialOxigeno') {
                fila.id = col.id;
                fila.idObj = [];
                fila.idObj.push(i);

                // Verificar si existe
                let f = [];
                f = filas.filter(v => v.id == col.id);

                if (f.length == 0) {
                    filas.push(fila);
                    valores.push(fila);
                }

                if (f.length > 0) {
                    valores.map((v, _i) => {
                        if (v.id == col.id) {
                            valores[_i]['idObj'].push(i);
                        }
                    });
                }
            }
            if (col.id == 'ConcentracionOxigeno') {
                fila.id = col.id;
                fila.idObj = [];
                fila.idObj.push(i);

                // Verificar si existe
                let f = [];
                f = filas.filter(v => v.id == col.id);

                if (f.length == 0) {
                    filas.push(fila);
                    valores.push(fila);
                }

                if (f.length > 0) {
                    valores.map((v, _i) => {
                        if (v.id == col.id) {
                            valores[_i]['idObj'].push(i);
                        }
                    });
                }
            }
            if (col.id == 'PresionPerfusionCerebral') {
                fila.id = col.id;
                fila.idObj = [];
                fila.idObj.push(i);

                // Verificar si existe
                let f = [];
                f = filas.filter(v => v.id == col.id);

                if (f.length == 0) {
                    filas.push(fila);
                    valores.push(fila);
                }

                if (f.length > 0) {
                    valores.map((v, _i) => {
                        if (v.id == col.id) {
                            valores[_i]['idObj'].push(i);
                        }
                    });
                }
            }
            if (col.id == 'PresionIntraCraneal') {
                fila.id = col.id;
                fila.idObj = [];
                fila.idObj.push(i);

                // Verificar si existe
                let f = [];
                f = filas.filter(v => v.id == col.id);

                if (f.length == 0) {
                    filas.push(fila);
                    valores.push(fila);
                }

                if (f.length > 0) {
                    valores.map((v, _i) => {
                        if (v.id == col.id) {
                            valores[_i]['idObj'].push(i);
                        }
                    });
                }
            }
            if (col.id == 'PresionIntraAbdominal') {
                fila.id = col.id;
                fila.idObj = [];
                fila.idObj.push(i);

                // Verificar si existe
                let f = [];
                f = filas.filter(v => v.id == col.id);

                if (f.length == 0) {
                    filas.push(fila);
                    valores.push(fila);
                }

                if (f.length > 0) {
                    valores.map((v, _i) => {
                        if (v.id == col.id) {
                            valores[_i]['idObj'].push(i);
                        }
                    });
                }
            }
            if (col.id == 'PresionVenosaCentral') {
                fila.id = col.id;
                fila.idObj = [];
                fila.idObj.push(i);

                // Verificar si existe
                let f = [];
                f = filas.filter(v => v.id == col.id);

                if (f.length == 0) {
                    filas.push(fila);
                    valores.push(fila);
                }

                if (f.length > 0) {
                    valores.map((v, _i) => {
                        if (v.id == col.id) {
                            valores[_i]['idObj'].push(i);
                        }
                    });
                }
            }
            if (col.id == 'PresionVenosaCentralAuricula') {
                fila.id = col.id;
                fila.idObj = [];
                fila.idObj.push(i);

                // Verificar si existe
                let f = [];
                f = filas.filter(v => v.id == col.id);

                if (f.length == 0) {
                    filas.push(fila);
                    valores.push(fila);
                }

                if (f.length > 0) {
                    valores.map((v, _i) => {
                        if (v.id == col.id) {
                            valores[_i]['idObj'].push(i);
                        }
                    });
                }
            }
            if (col.id == 'Biss') {
                fila.id = col.id;
                fila.idObj = [];
                fila.idObj.push(i);

                // Verificar si existe
                let f = [];
                f = filas.filter(v => v.id == col.id);

                if (f.length == 0) {
                    filas.push(fila);
                    valores.push(fila);
                }

                if (f.length > 0) {
                    valores.map((v, _i) => {
                        if (v.id == col.id) {
                            valores[_i]['idObj'].push(i);
                        }
                    });
                }
            }
            if (col.id == 'Contrapulsacion') {
                fila.id = col.id;
                fila.idObj = [];
                fila.idObj.push(i);

                // Verificar si existe
                let f = [];
                f = filas.filter(v => v.id == col.id);

                if (f.length == 0) {
                    filas.push(fila);
                    valores.push(fila);
                }

                if (f.length > 0) {
                    valores.map((v, _i) => {
                        if (v.id == col.id) {
                            valores[_i]['idObj'].push(i);
                        }
                    });
                }
            }


        });

        MedidasUci.sColumns = [];
        MedidasUci.sColumns = [{
            title: "Turno: ",
        },
        {
            title: "Order Nro : ",
        },
        {
            title: "Turno: ",
        },
        {
            title: "Nombre y Unidad de Medida:",
        },

        ];

        // 'data-orden'ar Columnas
        let orderCol = columnas.sort((a, b) => b - a);

        if (orderCol[0] == 0) {
            orderCol[0] = 1;
        }

        for (let index = 0; index < orderCol[0]; index++) {
            MedidasUci.sColumns.push({
                title: "Hora:",
            });
            MedidasUci.sColumns.push({
                title: "Valor:",
            });
        }

        MedidasUci.sColumns.push({
            title: "Opciones:",
        });

        MedidasUci.sRows = [];
        MedidasUci.sRows = [{
            mRender: function (data, type, full) {
                return full.fechaHoraTurno;
            },
            visible: false,
            aTargets: [0],
            orderable: true,
        },
        {
            mRender: function (data, type, full) {
                return full.orden;
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
                                    class: (PacientesUCIHistorial.fechaHoraTurno == oData.fechaHoraTurno ? 'bg-warning' : 'bg-light')
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
            visible: false,
            aTargets: [2],
            orderable: false,

        },
        {
            mRender: function (data, type, full) {
                return full.medida;
            },
            fnCreatedCell: function (nTd, sData, oData, iRow, iCol) {
                return m.mount(nTd, {
                    view: () => {
                        return [
                            m('div', {
                                id: 'MedidasUci_' + oData.id,
                            }, [oData.medida]),

                        ]
                    }
                });
            },
            visible: true,
            aTargets: [3],
            orderable: true,

        },
        ];

        // 'data-orden'ar Filas
        for (let index = 0; index < orderCol[0]; index++) {

            MedidasUci.sRows.push({
                fnCreatedCell: function (nTd, sData, oData, iRow, iCol) {
                    return m.mount(nTd, {
                        view: () => {
                            return [
                                m('div', {

                                    onclick: (e) => {
                                        e.preventDefault();
                                    },


                                    oncreate: (el) => {
                                        el.dom.className = "text-center pd-l-0 pd-r-0";

                                        valores.filter((v, i) => {
                                            if (v.id == oData.id) {
                                                let _i = v.idObj[index];
                                                if (resultNro[_i] !== undefined) {
                                                    if (resultNro[_i].hora !== null) {
                                                        el.dom.innerHTML = resultNro[_i].hora;
                                                        el.dom.id = "txtMedidasHora" + resultNro[_i].nro;
                                                    } else {
                                                        el.dom.id = "txtMedidasHora" + resultNro[_i].nro;
                                                        el.dom.innerHTML = '<div class="text-center pd-l-0 pd-r-0"><hr style="border-color:#001737;"/></div>';
                                                    }
                                                } else {
                                                    el.dom.innerHTML = '<div class="text-center pd-l-0 pd-r-0"><hr style="border-color:#001737;"/></div>';
                                                }
                                            }
                                        })
                                    }

                                }, []),

                            ]
                        }
                    });
                },
                visible: true,
                aTargets: null,
                orderable: true,
            });
            MedidasUci.sRows.push({
                fnCreatedCell: function (nTd, sData, oData, iRow, iCol) {
                    return m.mount(nTd, {
                        view: () => {
                            return [
                                m('div', {

                                    onclick: (e) => {
                                        e.preventDefault();
                                    },


                                    oncreate: (el) => {
                                        el.dom.className = "text-center pd-l-0 pd-r-0";

                                        valores.filter((v, i) => {
                                            if (v.id == oData.id) {
                                                let _i = v.idObj[index];
                                                if (resultNro[_i] !== undefined) {
                                                    if (resultNro[_i].valor !== null) {
                                                        let _v = MedidasUci.valorarRango(resultNro[_i].valor, oData.id);
                                                        if (_v.toString().indexOf('Fuera') != -1) {
                                                            el.dom.classList.add("tx-danger");
                                                            el.dom.classList.add("tx-semibold");
                                                            el.dom.title = _v;
                                                        }
                                                        el.dom.innerHTML = resultNro[_i].valor;
                                                        el.dom.id = "txtMedidasValor" + resultNro[_i].nro;
                                                    } else {
                                                        el.dom.id = "txtMedidasValor" + resultNro[_i].nro;
                                                        el.dom.innerHTML = '<div class="text-center pd-l-0 pd-r-0"><hr style="border-color:#001737;"/></div>';
                                                    }
                                                } else {
                                                    el.dom.innerHTML = '<div class="text-center pd-l-0 pd-r-0"><hr style="border-color:#001737;"/></div>';
                                                }
                                            }
                                        })
                                    }

                                }, []),

                            ]
                        }
                    });
                },
                visible: true,
                aTargets: null,
                orderable: true,

            });
        }

        MedidasUci.sRows.push({
            fnCreatedCell: function (nTd, sData, oData, iRow, iCol) {
                return m.mount(nTd, {
                    view: () => {
                        return [


                        ]
                    }
                });
            },
            width: '5%',
            visible: false,
            aTargets: null,
            orderable: true,

        });

        MedidasUci.sRows.map((c, i) => {
            MedidasUci.sRows[i].aTargets = [i];
        });


        return _arr;

    }

    static parseSeccionComburTest_v2(options) {

        let res = [];
        let result = [];
        let resultId = [];
        let resultNro = [];
        let _arr = [];
        let hash = {};
        let columnas = [];
        let filas = [];
        let valores = [];


        options.map((option) => {
            FecthUci.dataHistorial.filter((obj) => {
                let _obj = JSON.parse(obj.DATASECCION);
                if (_obj.id === option.id) {
                    res.push(_obj);
                }
            });
        });

        if (res.length == 0) {
            res = ComburTestUci.allRegistros;
        }

        result = res.sort((a, b) => b.nro - a.nro);

        resultNro = result.filter(o => hash[o.nro] ? false : hash[o.nro] = true).sort((a, b) => a.nro - b.nro);

        // Quitar duplicados
        resultId = resultNro.filter(o => hash[o.id] ? false : hash[o.id] = true);
        // Ordenar desc
        _arr = resultId.sort((a, b) => a.orden - b.orden);

        // Establecer Columnas
        let cbPH = 0;
        let cbProteinas = 0;
        let cbDensidad = 0;
        let cbGlucosa = 0;
        let cbSangre = 0;
        let cbCetonas = 0;
        let cbLeucocitos = 0;
        let cbNitritos = 0;
        let cbUrobilinogeno = 0;
        let cbBilirubina = 0;

        resultNro.map((col, i) => {
            if (col.id == 'cbPH') {
                cbPH++;
            }
            if (col.id == 'cbProteinas') {
                cbProteinas++;
            }
            if (col.id == 'cbDensidad') {
                cbDensidad++;
            }
            if (col.id == 'cbGlucosa') {
                cbGlucosa++;
            }
            if (col.id == 'cbSangre') {
                cbSangre++;
            }
            if (col.id == 'cbCetonas') {
                cbCetonas++;
            }
            if (col.id == 'cbLeucocitos') {
                cbLeucocitos++;
            }
            if (col.id == 'cbNitritos') {
                cbNitritos++;
            }
            if (col.id == 'cbUrobilinogeno') {
                cbUrobilinogeno++;
            }
            if (col.id == 'cbBilirubina') {
                cbBilirubina++;
            }

        });

        columnas = [cbPH, cbProteinas, cbDensidad, cbGlucosa, cbSangre, cbCetonas, cbLeucocitos, cbNitritos, cbUrobilinogeno, cbBilirubina];

        resultNro.map((col, i) => {
            let fila = {};
            if (col.id == 'cbPH') {
                fila.id = col.id;
                fila.idObj = [];
                fila.idObj.push(i);

                // Verificar si existe
                let f = [];
                f = filas.filter(v => v.id == col.id);

                if (f.length == 0) {
                    filas.push(fila);
                    valores.push(fila);
                }

                if (f.length > 0) {
                    valores.map((v, _i) => {
                        if (v.id == col.id) {
                            valores[_i]['idObj'].push(i);
                        }
                    });
                }


            }
            if (col.id == 'cbProteinas') {
                fila.id = col.id;
                fila.idObj = [];
                fila.idObj.push(i);

                // Verificar si existe
                let f = [];
                f = filas.filter(v => v.id == col.id);

                if (f.length == 0) {
                    filas.push(fila);
                    valores.push(fila);
                }

                if (f.length > 0) {
                    valores.map((v, _i) => {
                        if (v.id == col.id) {
                            valores[_i]['idObj'].push(i);
                        }
                    });
                }


            }
            if (col.id == 'cbDensidad') {
                fila.id = col.id;
                fila.idObj = [];
                fila.idObj.push(i);

                // Verificar si existe
                let f = [];
                f = filas.filter(v => v.id == col.id);

                if (f.length == 0) {
                    filas.push(fila);
                    valores.push(fila);
                }

                if (f.length > 0) {
                    valores.map((v, _i) => {
                        if (v.id == col.id) {
                            valores[_i]['idObj'].push(i);
                        }
                    });
                }
            }
            if (col.id == 'cbGlucosa') {
                fila.id = col.id;
                fila.idObj = [];
                fila.idObj.push(i);

                // Verificar si existe
                let f = [];
                f = filas.filter(v => v.id == col.id);

                if (f.length == 0) {
                    filas.push(fila);
                    valores.push(fila);
                }

                if (f.length > 0) {
                    valores.map((v, _i) => {
                        if (v.id == col.id) {
                            valores[_i]['idObj'].push(i);
                        }
                    });
                }
            }
            if (col.id == 'cbSangre') {
                fila.id = col.id;
                fila.idObj = [];
                fila.idObj.push(i);

                // Verificar si existe
                let f = [];
                f = filas.filter(v => v.id == col.id);

                if (f.length == 0) {
                    filas.push(fila);
                    valores.push(fila);
                }

                if (f.length > 0) {
                    valores.map((v, _i) => {
                        if (v.id == col.id) {
                            valores[_i]['idObj'].push(i);
                        }
                    });
                }
            }
            if (col.id == 'cbCetonas') {
                fila.id = col.id;
                fila.idObj = [];
                fila.idObj.push(i);

                // Verificar si existe
                let f = [];
                f = filas.filter(v => v.id == col.id);

                if (f.length == 0) {
                    filas.push(fila);
                    valores.push(fila);
                }

                if (f.length > 0) {
                    valores.map((v, _i) => {
                        if (v.id == col.id) {
                            valores[_i]['idObj'].push(i);
                        }
                    });
                }
            }
            if (col.id == 'cbLeucocitos') {
                fila.id = col.id;
                fila.idObj = [];
                fila.idObj.push(i);

                // Verificar si existe
                let f = [];
                f = filas.filter(v => v.id == col.id);

                if (f.length == 0) {
                    filas.push(fila);
                    valores.push(fila);
                }

                if (f.length > 0) {
                    valores.map((v, _i) => {
                        if (v.id == col.id) {
                            valores[_i]['idObj'].push(i);
                        }
                    });
                }
            }
            if (col.id == 'cbNitritos') {
                fila.id = col.id;
                fila.idObj = [];
                fila.idObj.push(i);

                // Verificar si existe
                let f = [];
                f = filas.filter(v => v.id == col.id);

                if (f.length == 0) {
                    filas.push(fila);
                    valores.push(fila);
                }

                if (f.length > 0) {
                    valores.map((v, _i) => {
                        if (v.id == col.id) {
                            valores[_i]['idObj'].push(i);
                        }
                    });
                }
            }
            if (col.id == 'cbUrobilinogeno') {
                fila.id = col.id;
                fila.idObj = [];
                fila.idObj.push(i);

                // Verificar si existe
                let f = [];
                f = filas.filter(v => v.id == col.id);

                if (f.length == 0) {
                    filas.push(fila);
                    valores.push(fila);
                }

                if (f.length > 0) {
                    valores.map((v, _i) => {
                        if (v.id == col.id) {
                            valores[_i]['idObj'].push(i);
                        }
                    });
                }
            }
            if (col.id == 'cbBilirubina') {
                fila.id = col.id;
                fila.idObj = [];
                fila.idObj.push(i);

                // Verificar si existe
                let f = [];
                f = filas.filter(v => v.id == col.id);

                if (f.length == 0) {
                    filas.push(fila);
                    valores.push(fila);
                }

                if (f.length > 0) {
                    valores.map((v, _i) => {
                        if (v.id == col.id) {
                            valores[_i]['idObj'].push(i);
                        }
                    });
                }
            }

        });

        ComburTestUci.sColumns = [];
        ComburTestUci.sColumns = [{
            title: "Turno: ",
        },
        {
            title: "Order Nro : ",
        },
        {
            title: "Turno: ",
        },
        {
            title: "Medida:",
        },

        ];

        // 'data-orden'ar Columnas
        let orderCol = columnas.sort((a, b) => b - a);

        if (orderCol[0] == 0) {
            orderCol[0] = 1;
        }

        for (let index = 0; index < orderCol[0]; index++) {
            ComburTestUci.sColumns.push({
                title: "Hora:",
            });
            ComburTestUci.sColumns.push({
                title: "Valor:",
            });
        }

        ComburTestUci.sColumns.push({
            title: "Opciones:",
        });

        ComburTestUci.sRows = [];
        ComburTestUci.sRows = [{
            mRender: function (data, type, full) {
                return full.fechaHoraTurno;
            },
            visible: false,
            aTargets: [0],
            orderable: true,
        },
        {
            mRender: function (data, type, full) {
                return full.orden;
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
                                    class: (PacientesUCIHistorial.fechaHoraTurno == oData.fechaHoraTurno ? 'bg-warning' : 'bg-light')
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
            visible: false,
            aTargets: [2],
            orderable: false,

        },
        {
            mRender: function (data, type, full) {
                return full.medida;
            },
            fnCreatedCell: function (nTd, sData, oData, iRow, iCol) {
                return m.mount(nTd, {
                    view: () => {
                        return [
                            m('div', {
                                id: 'ComburTest_' + oData.id,
                            }, [oData.medida]),

                        ]
                    }
                });
            },
            visible: true,
            aTargets: [3],
            orderable: true,

        },
        ];

        // 'data-orden'ar Filas
        for (let index = 0; index < orderCol[0]; index++) {

            ComburTestUci.sRows.push({
                fnCreatedCell: function (nTd, sData, oData, iRow, iCol) {
                    return m.mount(nTd, {
                        view: () => {
                            return [
                                m('div', {

                                    onclick: (e) => {
                                        e.preventDefault();
                                    },


                                    oncreate: (el) => {
                                        el.dom.className = "text-center pd-l-0 pd-r-0";

                                        valores.filter((v, i) => {
                                            if (v.id == oData.id) {
                                                let _i = v.idObj[index];
                                                if (resultNro[_i] !== undefined) {
                                                    if (resultNro[_i].hora !== null) {
                                                        el.dom.innerHTML = resultNro[_i].hora;
                                                        el.dom.id = "txtComburHora" + resultNro[_i].nro;
                                                    } else {
                                                        el.dom.id = "txtComburHora" + resultNro[_i].nro;
                                                        el.dom.innerHTML = '<div class="text-center pd-l-0 pd-r-0"><hr style="border-color:#001737;"/></div>';
                                                    }
                                                } else {
                                                    el.dom.innerHTML = '<div class="text-center pd-l-0 pd-r-0"><hr style="border-color:#001737;"/></div>';
                                                }
                                            }
                                        })
                                    }

                                }, []),

                            ]
                        }
                    });
                },
                visible: true,
                aTargets: null,
                orderable: true,
            });
            ComburTestUci.sRows.push({
                fnCreatedCell: function (nTd, sData, oData, iRow, iCol) {
                    return m.mount(nTd, {
                        view: () => {
                            return [
                                m('div', {

                                    onclick: (e) => {
                                        e.preventDefault();
                                    },


                                    oncreate: (el) => {
                                        el.dom.className = "text-center pd-l-0 pd-r-0";

                                        valores.filter((v, i) => {
                                            if (v.id == oData.id) {
                                                let _i = v.idObj[index];
                                                if (resultNro[_i] !== undefined) {
                                                    if (resultNro[_i].valor !== null) {

                                                        el.dom.innerHTML = resultNro[_i].valor;
                                                        el.dom.id = "txtComburValor" + resultNro[_i].nro;
                                                    } else {
                                                        el.dom.id = "txtComburValor" + resultNro[_i].nro;
                                                        el.dom.innerHTML = '<div class="text-center pd-l-0 pd-r-0"><hr style="border-color:#001737;"/></div>';
                                                    }
                                                } else {
                                                    el.dom.innerHTML = '<div class="text-center pd-l-0 pd-r-0"><hr style="border-color:#001737;"/></div>';
                                                }
                                            }
                                        })
                                    }

                                }, []),

                            ]
                        }
                    });
                },
                visible: true,
                aTargets: null,
                orderable: true,

            });
        }

        ComburTestUci.sRows.push({
            fnCreatedCell: function (nTd, sData, oData, iRow, iCol) {
                return m.mount(nTd, {
                    view: () => {
                        return []
                    }
                });
            },
            width: '5%',
            visible: false,
            aTargets: null,
            orderable: true,

        });

        ComburTestUci.sRows.map((c, i) => {
            ComburTestUci.sRows[i].aTargets = [i];
        });

        return _arr;

    }

    static parseSeccionGasesMed_v2(options) {

        let res = [];
        let result = [];
        let resultId = [];
        let resultNro = [];
        let _arr = [];
        let hash = {};
        let columnas = [];
        let filas = [];
        let valores = [];


        options.map((option) => {
            FecthUci.dataHistorial.filter((obj) => {
                let _obj = JSON.parse(obj.DATASECCION);
                if (_obj.id === option.id) {
                    res.push(_obj);
                }
            });
        });

        if (res.length == 0) {
            res = GasesMedUci.allRegistros;
        }

        result = res.sort((a, b) => b.nro - a.nro);

        resultNro = result.filter(o => hash[o.nro] ? false : hash[o.nro] = true).sort((a, b) => a.nro - b.nro);

        // Quitar duplicados
        resultId = resultNro.filter(o => hash[o.id] ? false : hash[o.id] = true);
        // Ordenar desc
        _arr = resultId.sort((a, b) => a.orden - b.orden);


        // Establecer Columnas
        let AireComprimido = 0;
        let Heliox = 0;
        let OxidoNitrico = 0;

        resultNro.map((col, i) => {
            if (col.id == 'AireComprimido') {
                AireComprimido++;
            }
            if (col.id == 'Heliox') {
                Heliox++;
            }
            if (col.id == 'OxidoNitrico') {
                OxidoNitrico++;
            }
        });

        columnas = [AireComprimido, Heliox, OxidoNitrico];

        resultNro.map((col, i) => {
            let fila = {};
            if (col.id == 'AireComprimido') {
                fila.id = col.id;
                fila.idObj = [];
                fila.idObj.push(i);

                // Verificar si existe
                let f = [];
                f = filas.filter(v => v.id == col.id);

                if (f.length == 0) {
                    filas.push(fila);
                    valores.push(fila);
                }

                if (f.length > 0) {
                    valores.map((v, _i) => {
                        if (v.id == col.id) {
                            valores[_i]['idObj'].push(i);
                        }
                    });
                }


            }
            if (col.id == 'Heliox') {
                fila.id = col.id;
                fila.idObj = [];
                fila.idObj.push(i);

                // Verificar si existe
                let f = [];
                f = filas.filter(v => v.id == col.id);

                if (f.length == 0) {
                    filas.push(fila);
                    valores.push(fila);
                }

                if (f.length > 0) {
                    valores.map((v, _i) => {
                        if (v.id == col.id) {
                            valores[_i]['idObj'].push(i);
                        }
                    });
                }


            }
            if (col.id == 'OxidoNitrico') {
                fila.id = col.id;
                fila.idObj = [];
                fila.idObj.push(i);

                // Verificar si existe
                let f = [];
                f = filas.filter(v => v.id == col.id);

                if (f.length == 0) {
                    filas.push(fila);
                    valores.push(fila);
                }

                if (f.length > 0) {
                    valores.map((v, _i) => {
                        if (v.id == col.id) {
                            valores[_i]['idObj'].push(i);
                        }
                    });
                }
            }
        });

        GasesMedUci.sColumns = [];
        GasesMedUci.sColumns = [{
            title: "Turno: ",
        },
        {
            title: "Order Nro : ",
        },
        {
            title: "Turno: ",
        },
        {
            title: "Medida:",
        },

        ];

        // 'data-orden'ar Columnas
        let orderCol = columnas.sort((a, b) => b - a);

        if (orderCol[0] == 0) {
            orderCol[0] = 1;
        }

        for (let index = 0; index < orderCol[0]; index++) {
            GasesMedUci.sColumns.push({
                title: "Hora:",
            });
            GasesMedUci.sColumns.push({
                title: "Valor:",
            });
        }

        GasesMedUci.sColumns.push({
            title: "Opciones:",
        });

        GasesMedUci.sRows = [];
        GasesMedUci.sRows = [{
            mRender: function (data, type, full) {
                return full.fechaHoraTurno;
            },
            visible: false,
            aTargets: [0],
            orderable: true,
        },
        {
            mRender: function (data, type, full) {
                return full.orden;
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
                                    class: (PacientesUCIHistorial.fechaHoraTurno == oData.fechaHoraTurno ? 'bg-warning' : 'bg-light')
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
            visible: false,
            aTargets: [2],
            orderable: false,

        },
        {
            mRender: function (data, type, full) {
                return full.medida;
            },
            fnCreatedCell: function (nTd, sData, oData, iRow, iCol) {
                return m.mount(nTd, {
                    view: () => {
                        return [
                            m('div', {
                                id: 'GasesMed_' + oData.id,
                            }, [oData.medida]),

                        ]
                    }
                });
            },
            visible: true,
            aTargets: [3],
            orderable: true,

        },
        ];

        // 'data-orden'ar Filas
        for (let index = 0; index < orderCol[0]; index++) {

            GasesMedUci.sRows.push({
                fnCreatedCell: function (nTd, sData, oData, iRow, iCol) {
                    return m.mount(nTd, {
                        view: () => {
                            return [
                                m('div', {

                                    onclick: (e) => {
                                        e.preventDefault();
                                    },


                                    oncreate: (el) => {
                                        el.dom.className = "text-center pd-l-0 pd-r-0";

                                        valores.filter((v, i) => {
                                            if (v.id == oData.id) {
                                                let _i = v.idObj[index];
                                                if (resultNro[_i] !== undefined) {
                                                    if (resultNro[_i].hora !== null) {
                                                        el.dom.innerHTML = resultNro[_i].hora;
                                                        el.dom.id = "txtGasesMedHora" + resultNro[_i].nro;
                                                    } else {
                                                        el.dom.id = "txtGasesMedHora" + resultNro[_i].nro;
                                                        el.dom.innerHTML = '<div class="text-center pd-l-0 pd-r-0"><hr style="border-color:#001737;"/></div>';
                                                    }
                                                } else {
                                                    el.dom.innerHTML = '<div class="text-center pd-l-0 pd-r-0"><hr style="border-color:#001737;"/></div>';
                                                }
                                            }
                                        })
                                    }

                                }, []),

                            ]
                        }
                    });
                },
                visible: true,
                aTargets: null,
                orderable: true,
            });
            GasesMedUci.sRows.push({
                fnCreatedCell: function (nTd, sData, oData, iRow, iCol) {
                    return m.mount(nTd, {
                        view: () => {
                            return [
                                m('div', {

                                    onclick: (e) => {
                                        e.preventDefault();
                                    },


                                    oncreate: (el) => {
                                        el.dom.className = "text-center pd-l-0 pd-r-0";

                                        valores.filter((v, i) => {
                                            if (v.id == oData.id) {
                                                let _i = v.idObj[index];
                                                if (resultNro[_i] !== undefined) {
                                                    if (resultNro[_i].valor !== null) {

                                                        el.dom.innerHTML = resultNro[_i].valor;
                                                        el.dom.id = "txtGasesMedValor" + resultNro[_i].nro;
                                                    } else {
                                                        el.dom.id = "txtGasesMedValor" + resultNro[_i].nro;
                                                        el.dom.innerHTML = '<div class="text-center pd-l-0 pd-r-0"><hr style="border-color:#001737;"/></div>';
                                                    }
                                                } else {
                                                    el.dom.innerHTML = '<div class="text-center pd-l-0 pd-r-0"><hr style="border-color:#001737;"/></div>';
                                                }
                                            }
                                        })
                                    }

                                }, []),

                            ]
                        }
                    });
                },
                visible: true,
                aTargets: null,
                orderable: true,

            });
        }

        GasesMedUci.sRows.push({
            fnCreatedCell: function (nTd, sData, oData, iRow, iCol) {
                return m.mount(nTd, {
                    view: () => {
                        return [

                        ]
                    }
                });
            },
            width: '5%',
            visible: false,
            aTargets: null,
            orderable: true,

        });

        GasesMedUci.sRows.map((c, i) => {
            GasesMedUci.sRows[i].aTargets = [i];
        });

        return _arr;

    }


    static parseSeccionMedidas_AllRegistros(options) {

        let res = [];
        let result = [];
        let resultNro = [];
        let hash = {};

        options.map((option) => {
            FecthUci.dataHistorial.filter((obj) => {
                let _obj = JSON.parse(obj.DATASECCION);
                if (_obj.id === option.id) {
                    res.push(_obj);
                }
            });
        });


        result = res.sort((a, b) => b.nro - a.nro);

        resultNro = result.filter(o => hash[o.nro] ? false : hash[o.nro] = true);

        return resultNro;

    }

    static parseSeccionComburTest_AllRegistros(options) {

        let res = [];
        let result = [];
        let resultNro = [];
        let hash = {};

        options.map((option) => {
            FecthUci.dataHistorial.filter((obj) => {
                let _obj = JSON.parse(obj.DATASECCION);
                if (_obj.id === option.id) {
                    res.push(_obj);
                }
            });
        });


        result = res.sort((a, b) => b.nro - a.nro);

        resultNro = result.filter(o => hash[o.nro] ? false : hash[o.nro] = true);

        return resultNro;

    }

    static parseSeccionGasesMed_AllRegistros(options) {

        let res = [];
        let result = [];
        let resultNro = [];
        let hash = {};

        options.map((option) => {
            FecthUci.dataHistorial.filter((obj) => {
                let _obj = JSON.parse(obj.DATASECCION);
                if (_obj.id === option.id) {
                    res.push(_obj);
                }
            });
        });


        result = res.sort((a, b) => b.nro - a.nro);

        resultNro = result.filter(o => hash[o.nro] ? false : hash[o.nro] = true);

        return resultNro;

    }



    static extractSeccion(options) {

        let res = [];
        let result = [];

        options.map((option) => {
            FecthUci.dataHistorial.filter((obj) => {
                let _obj = JSON.parse(obj.DATASECCION);
                if (_obj.id === option.id) {
                    res.push(_obj);
                }
            });
        });

        result = res.sort((a, b) => b.nro - a.nro);
        return result;

    }

    static parseSeccionCuidadosGenerales(options) {
        let res = [];
        let result = [];
        let resultId = [];
        let _arr = [];
        let hash = {};

        options.map((option) => {
            FecthUci.dataHistorial.filter((obj) => {
                let _obj = JSON.parse(obj.DATASECCION);
                if (_obj.id === option.id && obj.SECCION == 'CuidadosGenerales') {

                    res.push(_obj);
                }
            });
        });

        result = res.sort((a, b) => b.numeroTurno - a.numeroTurno);
        // Quitar duplicados
        resultId = result.filter(o => hash[o.id] ? false : hash[o.id] = true);
        // Ordenar desc
        _arr = resultId.sort((a, b) => a.nro - b.nro);

        return _arr;
    }

    static parseSeccion(options) {
        let res = [];
        let result = [];
        let _arr = [];
        let hash = {};


        options.map((option) => {
            FecthUci.dataHistorial.filter((obj) => {
                let _obj = JSON.parse(obj.DATASECCION);
                if (_obj.id === option.id) {
                    res.push(_obj);
                }
            });
        });

        // Quitar duplicados
        result = res.filter(o => hash[o.nro] ? false : hash[o.nro] = true);

        // Ordenar desc
        _arr = result.sort((a, b) => a.nro - b.nro);
        return _arr;
    }

    static setTurnoSeccionCuidadosGenerales(_options) {

        let res = [];
        let crear = false;

        if (CuidadosUci2.registros.length == 0) {
            crear = true;
        }
        /*

        if (CuidadosUci2.registros.length > 0) {
            let registros = CuidadosUci2.registros.filter(_v => _v.fechaHoraTurno == PacientesUCIHistorial.fechaHoraTurno);
            if (registros.length == 0) {
                copiar = true;
            }
        }

        */

        if (crear) {

            _options.map((option) => {
                if (option.value != 0) {
                    CuidadosUci2.iniciarRegistro();
                    CuidadosUci2.nuevoRegistro.id = option.id;
                    CuidadosUci2.nuevoRegistro.cuidado = option.value;
                    CuidadosUci2.nuevoRegistro.numeroTurno = PacientesUCIHistorial.numeroTurno;
                    CuidadosUci2.nuevoRegistro.fechaHoraTurno = PacientesUCIHistorial.fechaHoraTurno;
                    res.push(CuidadosUci2.nuevoRegistro);
                    CuidadosUci2.nuevoRegistro = null;
                }
            });

            CuidadosUci2.registros.push.apply(CuidadosUci2.registros, res);
            // Asignar Nro
            CuidadosUci2.registros.map((_v, _i) => {
                CuidadosUci2.registros[_i].nro = (_i + 1);
            });
            FecthUci.registrarAllSeccion(CuidadosUci2.registros);

        }

    }


    static setTurnoSeccionCateter(_options) {

        let res = [];
        let crear = false;

        if (CateterUci.registros.length == 0) {
            crear = true;
        }

        /*

        if (CateterUci.registros.length > 0) {
            let registros = CateterUci.registros.filter(_v => _v.fechaHoraTurno == PacientesUCIHistorial.fechaHoraTurno);
            if (registros.length == 0) {
                crear = true;
            }
        }

        */

        if (crear) {
            _options.map((option) => {
                if (option.value != 0) {
                    CateterUci.iniciarRegistro();
                    CateterUci.nuevoRegistro.id = option.id;
                    CateterUci.nuevoRegistro.cateter = option.value;
                    CateterUci.nuevoRegistro.numeroTurno = PacientesUCIHistorial.numeroTurno;
                    CateterUci.nuevoRegistro.fechaHoraTurno = PacientesUCIHistorial.fechaHoraTurno;
                    res.push(CateterUci.nuevoRegistro);
                    CateterUci.nuevoRegistro = null;
                }
            });

            CateterUci.registros.push.apply(CateterUci.registros, res);

            // Asignar Nro
            CateterUci.registros.map((_v, _i) => {
                CateterUci.registros[_i].nro = (_i + 1);
            });

            console.log(88, CateterUci.registros)

            FecthUci.registrarAllSeccion(CateterUci.registros);



        }

    }

    static setTurnoSeccionVentilacion(_options) {

        let res = [];
        let crear = false;

        if (VentilacionUci.registros.length == 0) {
            crear = true;
        }

        /*

        if (VentilacionUci.registros.length > 0) {
            let registros = VentilacionUci.registros.filter(_v => _v.fechaHoraTurno == PacientesUCIHistorial.fechaHoraTurno);
            if (registros.length == 0) {
                crear = true;
            }
        }

        */

        if (crear) {
            _options.map((option) => {
                if (option.value != 0) {
                    VentilacionUci.iniciarRegistro();
                    VentilacionUci.nuevoRegistro.id = option.id;
                    VentilacionUci.nuevoRegistro.ventilacion = option.value;
                    VentilacionUci.nuevoRegistro.numeroTurno = PacientesUCIHistorial.numeroTurno;
                    VentilacionUci.nuevoRegistro.fechaHoraTurno = PacientesUCIHistorial.fechaHoraTurno;
                    res.push(VentilacionUci.nuevoRegistro);
                    VentilacionUci.nuevoRegistro = null;
                }
            });

            VentilacionUci.registros.push.apply(VentilacionUci.registros, res);

            // Asignar Nro
            VentilacionUci.registros.map((_v, _i) => {
                VentilacionUci.registros[_i].nro = (_i + 1);
            });

            console.log(88, VentilacionUci.registros)

            FecthUci.registrarAllSeccion(VentilacionUci.registros);



        }

    }

    static setTurnoSeccionHemodialisis(_options) {

        let res = [];
        let crear = false;

        if (HemodialisisUci.registros.length == 0) {
            crear = true;
        }

        /*

        if (HemodialisisUci.registros.length > 0) {
            let registros = HemodialisisUci.registros.filter(_v => _v.fechaHoraTurno == PacientesUCIHistorial.fechaHoraTurno);
            if (registros.length == 0) {
                crear = true;
            }
        }
        */

        if (crear) {

            _options.map((option) => {
                if (option.value != 0) {
                    HemodialisisUci.iniciarRegistro();
                    HemodialisisUci.nuevoRegistro.id = option.id;
                    HemodialisisUci.nuevoRegistro.hemo = option.value;
                    HemodialisisUci.nuevoRegistro.numeroTurno = PacientesUCIHistorial.numeroTurno;
                    HemodialisisUci.nuevoRegistro.fechaHoraTurno = PacientesUCIHistorial.fechaHoraTurno;
                    res.push(HemodialisisUci.nuevoRegistro);
                    HemodialisisUci.nuevoRegistro = null;
                }
            });

            HemodialisisUci.registros.push.apply(HemodialisisUci.registros, res);

            // Asignar Nro
            HemodialisisUci.registros.map((_v, _i) => {
                HemodialisisUci.registros[_i].nro = (_i + 1);
            });

            console.log(88, HemodialisisUci.registros)

            FecthUci.registrarAllSeccion(HemodialisisUci.registros);



        }


    }

    static setTurnoSeccionMarcapasos(_options) {

        let res = [];
        let crear = false;

        if (MarcapasosUci.registros.length == 0) {
            crear = true;
        }
        /*

        if (MarcapasosUci.registros.length > 0) {
            let registros = MarcapasosUci.registros.filter(_v => _v.fechaHoraTurno == PacientesUCIHistorial.fechaHoraTurno);
            if (registros.length == 0) {
                crear = true;
            }
        }
        */

        if (crear) {
            _options.map((option) => {
                if (option.value != 0) {
                    MarcapasosUci.iniciarRegistro();
                    MarcapasosUci.nuevoRegistro.id = option.id;
                    MarcapasosUci.nuevoRegistro.hora = option.value;
                    MarcapasosUci.nuevoRegistro.numeroTurno = PacientesUCIHistorial.numeroTurno;
                    MarcapasosUci.nuevoRegistro.fechaHoraTurno = PacientesUCIHistorial.fechaHoraTurno;
                    res.push(MarcapasosUci.nuevoRegistro);
                    MarcapasosUci.nuevoRegistro = null;
                }
            });

            MarcapasosUci.registros.push.apply(MarcapasosUci.registros, res);

            // Asignar Nro
            MarcapasosUci.registros.map((_v, _i) => {
                MarcapasosUci.registros[_i].nro = (_i + 1);
            });

            console.log(88, MarcapasosUci.registros)

            FecthUci.registrarAllSeccion(MarcapasosUci.registros);



        }

    }

    static setTurnoSeccionOxigenacion(_options) {

        let res = [];
        let crear = false;

        if (OxigenacionUci.registros.length == 0) {
            crear = true;
        }

        /*

        if (OxigenacionUci.registros.length > 0) {
            let registros = OxigenacionUci.registros.filter(_v => _v.fechaHoraTurno == PacientesUCIHistorial.fechaHoraTurno);
            if (registros.length == 0) {
                crear = true;
            }
        }

        */

        if (crear) {
            _options.map((option) => {
                if (option.value != 0) {
                    OxigenacionUci.iniciarRegistro();
                    OxigenacionUci.nuevoRegistro.id = option.id;
                    OxigenacionUci.nuevoRegistro.oxi = option.value;
                    OxigenacionUci.nuevoRegistro.numeroTurno = PacientesUCIHistorial.numeroTurno;
                    OxigenacionUci.nuevoRegistro.fechaHoraTurno = PacientesUCIHistorial.fechaHoraTurno;
                    res.push(OxigenacionUci.nuevoRegistro);
                    OxigenacionUci.nuevoRegistro = null;
                }
            });

            OxigenacionUci.registros.push.apply(OxigenacionUci.registros, res);

            // Asignar Nro
            OxigenacionUci.registros.map((_v, _i) => {
                OxigenacionUci.registros[_i].nro = (_i + 1);
            });

            console.log(88, OxigenacionUci.registros)

            FecthUci.registrarAllSeccion(OxigenacionUci.registros);



        }

    }

    static setTurnoSeccionVentilatorios(_options) {

        let res = [];
        let crear = false;

        if (VentilatoriosUci.allRegistros.length == 0) {
            crear = true;
        }

        /*

        if (VentilatoriosUci.registros.length > 0) {
            let registros = VentilatoriosUci.registros.filter(_v => _v.fechaHoraTurno == PacientesUCIHistorial.fechaHoraTurno);
            if (registros.length == 0) {
                crear = true;
            }
        }

        */



        if (crear) {
            _options.map((option) => {
                if (option.value != 0) {
                    VentilatoriosUci.iniciarRegistro();
                    VentilatoriosUci.nuevoRegistro.id = option.id;
                    VentilatoriosUci.nuevoRegistro.orden = option.getAttribute('orden');
                    VentilatoriosUci.nuevoRegistro.ventilatorio = option.value;
                    VentilatoriosUci.nuevoRegistro.numeroTurno = PacientesUCIHistorial.numeroTurno;
                    VentilatoriosUci.nuevoRegistro.fechaHoraTurno = PacientesUCIHistorial.fechaHoraTurno;
                    res.push(VentilatoriosUci.nuevoRegistro);
                    VentilatoriosUci.nuevoRegistro = null;
                }
            });

            VentilatoriosUci.allRegistros.push.apply(VentilatoriosUci.allRegistros, res);

            // Asignar Nro
            VentilatoriosUci.allRegistros.map((_v, _i) => {
                VentilatoriosUci.allRegistros[_i].nro = (_i + 1);
            });


            FecthUci.registrarAllSeccion(VentilatoriosUci.allRegistros);

        }


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
            PacientesUCIHistorial.vMain()
        ];
    }
}


export default PacientesUCIHistorial;