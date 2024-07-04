import m from "mithril";
import App from "../../../models/App";
import Sidebar from "../sidebarUci";
import Loader from "../../utils/loader";
import Errors from "../../utils/errors";
import ApiHTTP from "../../../models/ApiHTTP";
import TableUCI from "../../utils/tableUci";
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
import MedidasUci from "./medidasUci";
import ComburTestUci from "./comburTestUci";
import GasesMedUci from "./gasesMedUci";
import UlcerasUciPed from "./ulcerasUciPed";
import ValoracionUciNeo from "./valorarionUciNeo";
import PrescripcionesUci from "./prescripcionesUci";
import TestScoreUciNeo from "./testScore";
import MucosasUciNeo from "./mucosasUci";
import EliminacionUciNeo from "./eliminacionUci";
import SistemaNervioso from "./sistemaNervioso";
import OmbligoUci from "./ombligoUci";
import HigieneUci from "./higieneUci";


// Pacientes UCI
class PacientesUCI extends App {

    static pacientes = null;
    static dataPte = null;
    static numeroHistoriaClinica = null;
    static numeroAtencion = null;
    static numeroTurno = null;
    static usuarioTurno = null;
    static fechaHoraTurno = null;
    static idFiltro = 1;
    static fechaHasta = null;
    static fechaDesde = null;
    static tipoAtencion = null;

    constructor(_data) {

        super();
        App.setTitle("Bitácora U.C.I.");
        this.view = PacientesUCI.page;
        PacientesUCI.numeroHistoriaClinica = _data.attrs.numeroHistoriaClinica;
        PacientesUCI.numeroAtencion = _data.attrs.numeroAtencion;
        PacientesUCI.numeroTurno = (_data.attrs.numeroTurno !== undefined ? _data.attrs.numeroTurno : null);
        PacientesUCI.usuarioTurno = _data.attrs.usuario;
        PacientesUCI.validarAtencion();
        PacientesUCI.validarTipoAtencion();

    }

    oncreate(_data) {
        console.log('data', _data);
    }

    static validarTipoAtencion() {
        FecthUci.validarTipoAtencion();
    }

    static validarAtencion() {
        FecthUci.validarAtencion();
    }

    static extraerFechaHoraTurnoVigente() {
        let turnos = TurnosUci.getTurnos();
        let lastTurno = turnos[turnos.length - 1];
        PacientesUCI.fechaHoraTurno = lastTurno.fechaHoraTurno;
    }

    static showSecciones() {

        PacientesUCI.extraerFechaHoraTurnoVigente();

        // CuidadosUci2.show = true;

        // ViasUci.show = true;
        // ViasUci.registros = PacientesUCI.parseSeccion(Array.from(document.getElementById('sec_Vias').options));

        // AccesosUci.show = true;
        // AccesosUci.registros = PacientesUCI.parseSeccion(Array.from(document.getElementById('sec_Accesos').options));


        //  CateterUci.show = true;

        //  VentilacionUci.show = true;

        //  HemodialisisUci.show = true;

        //  CultivosUci.show = true;
        // CultivosUci.registros = PacientesUCI.parseSeccion(Array.from(document.getElementById('sec_Cultivos').options));

        //   MarcapasosUci.show = true;

        //  GasesUci.show = true;

        //  OxigenacionUci.show = true;

        //  VentilatoriosUci.show = true;

        //  MedidasUci.show = true;

        //  ComburTestUci.show = true;

        // GasesMedUci.show = true;

        // Pediatrica y Neo
        // UlcerasUciPed.registros = PacientesUCI.parseAllSeccion('UlcerasPed');

        TestScoreUciNeo.registros = PacientesUCI.parseAllSeccion('TestScoreUci');

        MucosasUciNeo.registros = PacientesUCI.parseAllSeccion('PielMucosasUci');

        EliminacionUciNeo.registros = PacientesUCI.parseAllSeccion('EliminacionUci');

        SistemaNervioso.registros = PacientesUCI.parseAllSeccion('SistemaNerviosoUci');

        OmbligoUci.registros = PacientesUCI.parseAllSeccion('OmbligoUci');

        HigieneUci.registros = PacientesUCI.parseAllSeccion('HigieneUci');





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

                                            $.confirm({
                                                title: 'Registrar Nuevo Turno',
                                                content: '¿Esta Ud seguro de registrar un nuevo turno para este paciente?',
                                                buttons: {
                                                    confirm: {
                                                        text: 'Confirmar',
                                                        btnClass: "btn-success op-8",
                                                        action: function() {
                                                            TurnosUci.iniciarTurno();
                                                            PacientesUCI.vReloadTable('table-turnos', TurnosUci.getTurnos());
                                                        }
                                                    },
                                                    cancel: {
                                                        btnClass: "btn-danger op-8",
                                                        text: 'Cancelar',
                                                    }

                                                }
                                            });


                                        }
                                    }, "Registrar Nuevo Turno"),
                                    m("button.btn.btn-xs.btn-secondary.tx-semibold.tx-14[type='button']", {
                                        onclick: () => {
                                            m.route.set('/uci/pacientes/intermedios/historial/', {
                                                numeroHistoriaClinica: PacientesUCI.numeroHistoriaClinica,
                                                numeroAtencion: PacientesUCI.numeroAtencion,
                                                usuario: PacientesUCI.usuarioTurno
                                            })
                                        }
                                    }, "Ver Historial")
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
                        // m(CuidadosUci2),

                        // Accesos
                        //  m(AccesosUci),

                        // Marcapasos
                        // m(MarcapasosUci),
                        // Ventilatorios
                        // m(VentilatoriosUci),
                        // Ventilatorios

                        // ComburTest
                        // m(ComburTestUci),
                        // UlcerasUciPed
                        // m(UlcerasUciPed),
                        // ValoracionUciNeo
                        // m(ValoracionUciNeo),
                        // Test de Score
                        m(TestScoreUciNeo),
                        // Mucusas Uci Neo
                        m(MucosasUciNeo),
                        // EliminacionUci Neo
                        m(EliminacionUciNeo),
                        // Sistema Nervisos
                        m(SistemaNervioso),
                        // Ombligo
                        m(OmbligoUci),
                        // Higiene Uci
                        m(HigieneUci),
                        // Osigenacion
                        m(OxigenacionUci),

                    ]),
                    m('div.ht-100'),
                ])
            ),
        ];
    }

    static vMenu() {
        return m(Sidebar, { page: 'uci/pacientes/neo' });
    }

    static parseSeccionCateter(options) {
        let res = [];
        let result = [];
        let resultId = [];
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

        result = res.sort((a, b) => b.nro - a.nro);
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
            FecthUci.dataSecciones.filter((obj) => {
                let _obj = JSON.parse(obj.DATASECCION);
                if (_obj.id === option.id) {
                    res.push(_obj);
                }
            });
        });

        result = res.sort((a, b) => b.nro - a.nro);
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
            FecthUci.dataSecciones.filter((obj) => {
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
            FecthUci.dataSecciones.filter((obj) => {
                let _obj = JSON.parse(obj.DATASECCION);
                if (_obj.id === option.id) {
                    res.push(_obj);
                }
            });
        });

        result = res.sort((a, b) => b.nro - a.nro);
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
            FecthUci.dataSecciones.filter((obj) => {
                let _obj = JSON.parse(obj.DATASECCION);
                if (_obj.id === option.id) {
                    res.push(_obj);
                }
            });
        });

        result = res.sort((a, b) => b.nro - a.nro);
        // Quitar duplicados
        resultId = result.filter(o => hash[o.id] ? false : hash[o.id] = true);
        // Ordenar desc
        _arr = resultId.sort((a, b) => a.nro - b.nro);

        console.log(88, _arr)

        return _arr;
    }

    static parseSeccionOxigenacion(options) {
        let res = [];
        let result = [];
        let resultId = [];
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

        result = res.sort((a, b) => b.nro - a.nro);
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
            FecthUci.dataSecciones.filter((obj) => {
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
            FecthUci.dataSecciones.filter((obj) => {
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

        VentilatoriosUci.setTableRegistros(resultNro);

        return _arr;

    }

    static parseSeccionGases_AllRegistros(options) {

        let res = [];
        let result = [];
        let resultNro = [];
        let hash = {};

        options.map((option) => {
            FecthUci.dataSecciones.filter((obj) => {
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

    static parseSeccionPrescripcionesUci_AllRegistros(options) {

        let res = [];
        let result = [];
        let resultNro = [];
        let hash = {};

        options.map((option) => {
            FecthUci.dataSecciones.filter((obj) => {
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
            FecthUci.dataSecciones.filter((obj) => {
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
                title: "Valores:",
            });
        }

        GasesUci.sColumns.push({
            title: "Opciones:",
        });

        GasesUci.sRows = [];
        GasesUci.sRows = [{
                mRender: function(data, type, full) {
                    return full.fechaHoraTurno;
                },
                visible: false,
                aTargets: [0],
                orderable: true,
            },
            {
                mRender: function(data, type, full) {
                    return full.orden;
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
                visible: false,
                aTargets: [2],
                orderable: false,

            },
            {
                mRender: function(data, type, full) {
                    return full.gas;
                },
                fnCreatedCell: function(nTd, sData, oData, iRow, iCol) {
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
                fnCreatedCell: function(nTd, sData, oData, iRow, iCol) {
                    return m.mount(nTd, {
                        view: () => {
                            return [
                                m('div', {
                                    ondblclick: (e) => {
                                        GasesUci.nuevoRegistro = null
                                        valores.filter((v, i) => {

                                            if (v.id == oData.id) {
                                                let _i = v.idObj[index];
                                                GasesUci.verRegistro(resultNro[_i]);
                                                if (GasesUci.nuevoRegistro !== null && GasesUci.nuevoRegistro.hora == null) {
                                                    if (GasesUci.setHora != undefined) {
                                                        GasesUci.nuevoRegistro.hora = GasesUci.setHora;
                                                        document.getElementById('gasesHora' + resultNro[_i].nro).value = GasesUci.setHora;
                                                    }
                                                }
                                                document.getElementById('gasesHora' + resultNro[_i].nro).className = "form-control tx-semibold tx-14";
                                                document.getElementById('txtGasesHora' + resultNro[_i].nro).className = "text-center pd-l-0 pd-r-0 d-none";
                                                document.getElementById('gasesValores' + resultNro[_i].nro).className = "form-control";
                                                document.getElementById('txtGasesValores' + resultNro[_i].nro).className = "text-center pd-l-0 pd-r-0 d-none";
                                                if (document.getElementById('btn' + resultNro[_i].nro) != null) {
                                                    document.getElementById('btn' + resultNro[_i].nro).className = "btn btn-xs btn-success btn-block tx-12 d-none";
                                                    setTimeout(() => {
                                                        new Cleave("#gasesHora" + resultNro[_i].nro, {
                                                            time: true,
                                                            timePattern: ['h', 'm']
                                                        });
                                                    }, 90);
                                                }

                                                let tt = $('#Gases_' + oData.id).offset().top;
                                                setTimeout(() => {
                                                    let isAnimating = true;
                                                    $('html,body').animate({
                                                            scrollTop: tt
                                                        },
                                                        700, "easeInOutSine",
                                                        function() {
                                                            isAnimating = false;
                                                        })
                                                }, 250);

                                                setTimeout(() => {
                                                    let isAnimating = true;
                                                    $('#registrosGasesUci').animate({
                                                            scrollLeft: '+=460'
                                                        },
                                                        700, "easeInOutSine",
                                                        function() {
                                                            isAnimating = false;
                                                        })
                                                }, 250);

                                            }
                                        });



                                    },
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
                                                        el.dom.innerHTML = '';
                                                    }
                                                } else {
                                                    el.dom.innerHTML = '<div class="text-center pd-l-0 pd-r-0"><hr style="border-color:#001737;"/></div>';
                                                }
                                            }
                                        })
                                    }
                                }, []),
                                m('div.d-flex', [
                                    m("input[type='text'][placeholder='HH:mm']", {
                                        oncreate: (el) => {
                                            valores.filter((v, i) => {
                                                if (v.id == oData.id) {
                                                    let _i = v.idObj[index];
                                                    if (resultNro[_i] !== undefined) {
                                                        if (resultNro[_i].hora !== null) {
                                                            el.dom.value = resultNro[_i].hora;
                                                            el.dom.id = "gasesHora" + resultNro[_i].nro;
                                                            el.dom.className = "form-control d-none";


                                                            setTimeout(() => {
                                                                new Cleave("#" + el.dom.id, {
                                                                    time: true,
                                                                    timePattern: ['h', 'm']
                                                                });
                                                            }, 90);

                                                        } else {
                                                            el.dom.id = "gasesHora" + resultNro[_i].nro;
                                                            el.dom.className = "form-control d-none";
                                                        }
                                                    } else {
                                                        el.dom.className = "form-control d-none";

                                                    }
                                                }
                                            })




                                        },
                                        oninput: (e) => {
                                            setTimeout(() => {
                                                //GasesUci.nuevoRegistro.hora = moment(PacientesUCI.fechaHoraTurno, 'DD-MM-YYYY HH:mm').format('DD-MM-YYYY') + ' ' + e.target.value;
                                                GasesUci.setHora = (e.target.value.length !== 0 ? e.target.value : null);
                                                GasesUci.nuevoRegistro.hora = (e.target.value.length !== 0 ? e.target.value : null);

                                            }, 50);
                                        },

                                    }),
                                ]),
                            ]
                        }
                    });
                },
                visible: true,
                aTargets: null,
                orderable: true,

            });
            GasesUci.sRows.push({
                fnCreatedCell: function(nTd, sData, oData, iRow, iCol) {
                    return m.mount(nTd, {
                        view: () => {
                            return [
                                m('div', {
                                    ondblclick: (e) => {
                                        GasesUci.nuevoRegistro = null;
                                        valores.filter((v, i) => {

                                            if (v.id == oData.id) {
                                                let _i = v.idObj[index];

                                                GasesUci.verRegistro(resultNro[_i]);
                                                if (GasesUci.nuevoRegistro !== null && GasesUci.nuevoRegistro.hora == null) {
                                                    if (GasesUci.setHora != undefined) {
                                                        GasesUci.nuevoRegistro.hora = GasesUci.setHora;
                                                        document.getElementById('gasesHora' + resultNro[_i].nro).value = GasesUci.setHora;
                                                    }
                                                }
                                                document.getElementById('gasesHora' + resultNro[_i].nro).className = "form-control tx-semibold tx-14";
                                                document.getElementById('txtGasesHora' + resultNro[_i].nro).className = "text-center pd-l-0 pd-r-0 d-none";
                                                document.getElementById('gasesValores' + resultNro[_i].nro).className = "form-control";
                                                document.getElementById('txtGasesValores' + resultNro[_i].nro).className = "text-center pd-l-0 pd-r-0 d-none";
                                                if (document.getElementById('btn' + resultNro[_i].nro) != null) {
                                                    document.getElementById('btn' + resultNro[_i].nro).className = "btn btn-xs btn-success btn-block tx-12 d-none";
                                                    setTimeout(() => {
                                                        new Cleave("#gasesHora" + resultNro[_i].nro, {
                                                            time: true,
                                                            timePattern: ['h', 'm']
                                                        });
                                                    }, 90);
                                                }

                                                let tt = $('#Gases_' + oData.id).offset().top;
                                                setTimeout(() => {
                                                    let isAnimating = true;
                                                    $('html,body').animate({
                                                            scrollTop: tt
                                                        },
                                                        700, "easeInOutSine",
                                                        function() {
                                                            isAnimating = false;
                                                        })
                                                }, 250);

                                                setTimeout(() => {
                                                    let isAnimating = true;
                                                    $('#registrosGasesUci').animate({
                                                            scrollLeft: '+=460'
                                                        },
                                                        700, "easeInOutSine",
                                                        function() {
                                                            isAnimating = false;
                                                        })
                                                }, 250);


                                            }
                                        })
                                    },
                                    onclick: (e) => {
                                        e.preventDefault();
                                    },

                                    oncontextmenu: (e) => {
                                        e.preventDefault();
                                        if (index == 0) {
                                            alert('No se puede eliminar el registro predeterminado.');
                                            throw 'No se puede eliminar el registro predeterminado.';
                                        }

                                        if (confirm("¿Esta Ud seguro de eliminar este registro?") == true) {
                                            valores.filter((v, i) => {

                                                if (v.id == oData.id) {
                                                    let _i = v.idObj[index];

                                                    setTimeout(() => {
                                                        GasesUci.eliminarRegistro(resultNro[_i]);
                                                        FecthUci.eliminarSeccion(resultNro[_i]);
                                                        GasesUci.nuevoRegistro = null;
                                                        GasesUci.destroyTable();
                                                        GasesUci.filterRegistros();
                                                        GasesUci.show = false;
                                                        m.redraw();
                                                        setTimeout(() => {
                                                            GasesUci.show = true;
                                                            m.redraw();
                                                        }, 100);
                                                    }, 100);

                                                    let tt = $('#Gases_' + oData.id).offset().top;
                                                    setTimeout(() => {
                                                        let isAnimating = true;
                                                        $('html,body').animate({
                                                                scrollTop: tt
                                                            },
                                                            700, "easeInOutSine",
                                                            function() {
                                                                isAnimating = false;
                                                            })
                                                    }, 250);

                                                    setTimeout(() => {
                                                        let isAnimating = true;
                                                        $('#registrosGasesUci').animate({
                                                                scrollLeft: '+=460'
                                                            },
                                                            700, "easeInOutSine",
                                                            function() {
                                                                isAnimating = false;
                                                            })
                                                    }, 250);


                                                }
                                            })


                                        }
                                    },
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
                                                        el.dom.innerHTML = '<button type="button" id="btn' + resultNro[_i].nro + '" class="btn btn-xs btn-success btn-block tx-12">Registrar</button>';
                                                    }
                                                } else {
                                                    el.dom.innerHTML = '<div class="text-center pd-l-0 pd-r-0"><hr style="border-color:#001737;"/></div>';
                                                }
                                            }
                                        })
                                    }

                                }, []),
                                m('div.d-flex', [
                                    m("input", {

                                        type: "text",
                                        placeholder: "...",
                                        oncreate: (el) => {

                                            valores.filter((v, i) => {
                                                if (v.id == oData.id) {
                                                    let _i = v.idObj[index];
                                                    if (resultNro[_i] !== undefined) {
                                                        if (resultNro[_i].valores !== null) {
                                                            el.dom.value = resultNro[_i].valores;
                                                            el.dom.id = "gasesValores" + resultNro[_i].nro;
                                                            el.dom.className = "form-control tx-semibold tx-14 d-none";

                                                        } else {
                                                            el.dom.id = "gasesValores" + resultNro[_i].nro;
                                                            el.dom.className = "form-control tx-semibold tx-14 d-none";
                                                        }
                                                    } else {
                                                        el.dom.className = "form-control tx-semibold tx-14 d-none";

                                                    }
                                                }
                                            })
                                        },
                                        oninput: (e) => {
                                            GasesUci.nuevoRegistro.valores = (e.target.value.length !== 0 ? e.target.value : null);
                                        },
                                        onkeypress: (e) => {
                                            if (e.keyCode == 13) {
                                                GasesUci.nuevoRegistro.numeroTurno = PacientesUCI.numeroTurno;
                                                GasesUci.nuevoRegistro.fechaHoraTurno = PacientesUCI.fechaHoraTurno;
                                                GasesUci.nuevoRegistro.fechaHoraTurno = PacientesUCI.fechaHoraTurno;

                                                if (GasesUci.nuevoRegistro.editar == null) {

                                                    setTimeout(() => {
                                                        GasesUci.agregarRegistro();
                                                        FecthUci.registrarSeccion(GasesUci.nuevoRegistro);
                                                        GasesUci.nuevoRegistro = null;
                                                        GasesUci.destroyTable();
                                                        GasesUci.filterRegistros();
                                                        GasesUci.show = false;
                                                        m.redraw();
                                                        setTimeout(() => {
                                                            GasesUci.show = true;
                                                            m.redraw();
                                                        }, 100);
                                                    }, 100);

                                                } else {

                                                    setTimeout(() => {
                                                        GasesUci.editarRegistro();
                                                        FecthUci.actualizarSeccion(GasesUci.nuevoRegistro);
                                                        GasesUci.nuevoRegistro = null;
                                                        GasesUci.destroyTable();
                                                        GasesUci.filterRegistros();
                                                        GasesUci.show = false;
                                                        m.redraw();
                                                        setTimeout(() => {
                                                            GasesUci.show = true;
                                                            m.redraw();
                                                        }, 100);
                                                    }, 100);

                                                }

                                                let tt = $('#Gases_' + oData.id).offset().top;
                                                setTimeout(() => {
                                                    let isAnimating = true;
                                                    $('html,body').animate({
                                                            scrollTop: tt
                                                        },
                                                        700, "easeInOutSine",
                                                        function() {
                                                            isAnimating = false;
                                                        })
                                                }, 250);

                                                setTimeout(() => {
                                                    let isAnimating = true;
                                                    $('#registrosGasesUci').animate({
                                                            scrollLeft: '+=460'
                                                        },
                                                        700, "easeInOutSine",
                                                        function() {
                                                            isAnimating = false;
                                                        })
                                                }, 250);

                                            }
                                        },

                                    })

                                ]),
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
            fnCreatedCell: function(nTd, sData, oData, iRow, iCol) {
                return m.mount(nTd, {
                    view: () => {
                        return [
                            m("div.btn-block.btn-group.wd-100p.pd-5", [

                                m("button.btn.btn-xs.btn-block.btn-danger[type='button']", {
                                        class: (GasesUci.nuevoRegistro !== null && GasesUci.nuevoRegistro.editar && GasesUci.nuevoRegistro.id == oData.id ? '' : 'd-none'),
                                        onclick: () => {
                                            oData.editar = null;
                                            document.getElementById('gasesValores' + GasesUci.nuevoRegistro.nro).className = "form-control tx-semibold tx-14 d-none";
                                            document.getElementById('txtGasesValores' + GasesUci.nuevoRegistro.nro).className = "text-center pd-l-0 pd-r-0";
                                            document.getElementById('gasesHora' + GasesUci.nuevoRegistro.nro).className = "form-control d-none";
                                            document.getElementById('txtGasesHora' + GasesUci.nuevoRegistro.nro).className = "text-center pd-l-0 pd-r-0";
                                            if (document.getElementById('btn' + GasesUci.nuevoRegistro.nro) != null) {
                                                document.getElementById('btn' + GasesUci.nuevoRegistro.nro).className = "btn btn-xs btn-success btn-block tx-12";
                                            }

                                            GasesUci.nuevoRegistro = null;
                                        },
                                    },
                                    'Cancelar Edición',
                                ),
                                m("button.btn.btn-xs.btn-dark[type='button']", {
                                        //class: (PacientesUCI.fechaHoraTurno != oData.fechaHoraTurno ? '' : 'd-none'),
                                        onclick: () => {

                                            if (oData.hora == null) {
                                                alert('No se permite copiar. Ya existe un registro disponible.');
                                                throw 'No se permite copiar. Ya existe un registro disponible.'
                                            }
                                            GasesUci.iniciarRegistro();
                                            GasesUci.nuevoRegistro.id = oData.id;
                                            GasesUci.nuevoRegistro.gas = oData.gas;
                                            GasesUci.nuevoRegistro.orden = oData.orden;
                                            if (GasesUci.setHora != undefined) {
                                                GasesUci.nuevoRegistro.hora = GasesUci.setHora;
                                            } else {
                                                GasesUci.nuevoRegistro.hora = oData.hora;
                                            }
                                            GasesUci.nuevoRegistro.fechaHora = oData.fechaHora;
                                            GasesUci.nuevoRegistro.numeroTurno = PacientesUCI.numeroTurno;
                                            GasesUci.nuevoRegistro.fechaHoraTurno = PacientesUCI.fechaHoraTurno;


                                            setTimeout(() => {
                                                GasesUci.agregarRegistro();
                                                FecthUci.registrarSeccion(GasesUci.nuevoRegistro);
                                                GasesUci.nuevoRegistro = null;
                                                GasesUci.destroyTable();
                                                GasesUci.filterRegistros();
                                                GasesUci.show = false;
                                                m.redraw();
                                                setTimeout(() => {
                                                    GasesUci.show = true;
                                                    m.redraw();
                                                }, 100);
                                            }, 100);

                                            setTimeout(() => {
                                                let isAnimating = true;
                                                $('html,body').animate({ scrollTop: $("#Gases_" + oData.id).offset().top }, 700, "easeInOutSine", function() {
                                                    isAnimating = false;
                                                })
                                            }, 250);

                                            setTimeout(() => {
                                                let isAnimating = true;
                                                $('#registrosGasesUci').animate({
                                                        scrollLeft: '+=460'
                                                    },
                                                    700, "easeInOutSine",
                                                    function() {
                                                        isAnimating = false;
                                                    })
                                            }, 250);

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
            FecthUci.dataSecciones.filter((obj) => {
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
        });

        columnas = [GastoCardiaco, IndiceCardiaco, VolumenSistolico, PresionCapilarPulmonar, IndiceResistenciaVascularSistemicaIndexada, ResistenciaVascularSistemica, IndiceResistenciaVascularPulmonarIndexada, PresionCuna, PresionArteriaPulmonar, TransporteArterialOxigeno, ConcentracionOxigeno, PresionPerfusionCerebral, PresionIntraCraneal, PresionIntraAbdominal, PresionVenosaCentral, PresionVenosaCentralAuricula, Biss];

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
                title: "Valor:",
            });
            MedidasUci.sColumns.push({
                title: "Hora:",
            });
        }

        MedidasUci.sColumns.push({
            title: "Opciones:",
        });

        MedidasUci.sRows = [];
        MedidasUci.sRows = [{
                mRender: function(data, type, full) {
                    return full.fechaHoraTurno;
                },
                visible: false,
                aTargets: [0],
                orderable: true,
            },
            {
                mRender: function(data, type, full) {
                    return full.orden;
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
                visible: false,
                aTargets: [2],
                orderable: false,

            },
            {
                mRender: function(data, type, full) {
                    return full.medida;
                },
                fnCreatedCell: function(nTd, sData, oData, iRow, iCol) {
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
                fnCreatedCell: function(nTd, sData, oData, iRow, iCol) {
                    return m.mount(nTd, {
                        view: () => {
                            return [
                                m('div', {
                                    ondblclick: (e) => {
                                        MedidasUci.nuevoRegistro = null;
                                        valores.filter((v, i) => {

                                            if (v.id == oData.id) {
                                                let _i = v.idObj[index];

                                                MedidasUci.verRegistro(resultNro[_i]);

                                                if (MedidasUci.nuevoRegistro !== null && MedidasUci.nuevoRegistro.hora == null) {
                                                    if (MedidasUci.setHora != undefined) {
                                                        MedidasUci.nuevoRegistro.hora = MedidasUci.setHora;
                                                        document.getElementById('medidasHora' + resultNro[_i].nro).value = MedidasUci.setHora;
                                                    }
                                                }

                                                document.getElementById('medidasHora' + resultNro[_i].nro).className = "form-control tx-semibold tx-14";
                                                document.getElementById('txtMedidasHora' + resultNro[_i].nro).className = "text-center pd-l-0 pd-r-0 d-none";
                                                document.getElementById('medidasValor' + resultNro[_i].nro).className = "form-control";
                                                document.getElementById('txtMedidasValor' + resultNro[_i].nro).className = "text-center pd-l-0 pd-r-0 d-none";
                                                if (document.getElementById('btn' + resultNro[_i].nro) != null) {
                                                    document.getElementById('btn' + resultNro[_i].nro).className = "btn btn-xs btn-success btn-block tx-12 d-none";
                                                    setTimeout(() => {
                                                        new Cleave("#medidasHora" + resultNro[_i].nro, {
                                                            time: true,
                                                            timePattern: ['h', 'm']
                                                        });
                                                    }, 90);
                                                }


                                                let tt = $('#MedidasUci_' + oData.id).offset().top;
                                                setTimeout(() => {
                                                    let isAnimating = true;
                                                    $('html,body').animate({
                                                            scrollTop: tt
                                                        },
                                                        700, "easeInOutSine",
                                                        function() {
                                                            isAnimating = false;
                                                        })
                                                }, 250);


                                                setTimeout(() => {
                                                    let isAnimating = true;
                                                    $('#registrosMedidasUci').animate({
                                                            scrollLeft: '+=460'
                                                        },
                                                        700, "easeInOutSine",
                                                        function() {
                                                            isAnimating = false;
                                                        })
                                                }, 250);

                                            }
                                        })
                                    },
                                    onclick: (e) => {
                                        e.preventDefault();
                                    },

                                    oncontextmenu: (e) => {
                                        e.preventDefault();
                                        if (index == 0) {
                                            alert('No se puede eliminar el registro predeterminado.');
                                            throw 'No se puede eliminar el registro predeterminado.';
                                        }

                                        if (confirm("¿Esta Ud seguro de eliminar este registro?") == true) {
                                            valores.filter((v, i) => {

                                                if (v.id == oData.id) {
                                                    let _i = v.idObj[index];

                                                    setTimeout(() => {
                                                        MedidasUci.eliminarRegistro(resultNro[_i]);
                                                        FecthUci.eliminarSeccion(resultNro[_i]);
                                                        MedidasUci.nuevoRegistro = null;
                                                        MedidasUci.destroyTable();
                                                        MedidasUci.filterRegistros();
                                                        MedidasUci.show = false;
                                                        m.redraw();
                                                        setTimeout(() => {
                                                            MedidasUci.show = true;
                                                            m.redraw();
                                                        }, 100);
                                                    }, 100);


                                                    let tt = $('#MedidasUci_' + oData.id).offset().top;
                                                    setTimeout(() => {
                                                        let isAnimating = true;
                                                        $('html,body').animate({
                                                                scrollTop: tt
                                                            },
                                                            700, "easeInOutSine",
                                                            function() {
                                                                isAnimating = false;
                                                            })
                                                    }, 250);

                                                    setTimeout(() => {
                                                        let isAnimating = true;
                                                        $('#registrosMedidasUci').animate({
                                                                scrollLeft: '+=460'
                                                            },
                                                            700, "easeInOutSine",
                                                            function() {
                                                                isAnimating = false;
                                                            })
                                                    }, 250);

                                                }
                                            })


                                        }
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
                                                        el.dom.innerHTML = '<button type="button" id="btn' + resultNro[_i].nro + '" class="btn btn-xs btn-success btn-block tx-12">Registrar</button>';
                                                    }
                                                } else {
                                                    el.dom.innerHTML = '<div class="text-center pd-l-0 pd-r-0"><hr style="border-color:#001737;"/></div>';
                                                }
                                            }
                                        })
                                    }

                                }, []),
                                m('div.d-flex', [
                                    m("input", {
                                        type: "text",
                                        placeholder: "...",
                                        oncreate: (el) => {
                                            valores.filter((v, i) => {
                                                if (v.id == oData.id) {
                                                    let _i = v.idObj[index];
                                                    if (resultNro[_i] !== undefined) {
                                                        if (resultNro[_i].valor !== null) {
                                                            el.dom.value = resultNro[_i].valor;
                                                            el.dom.id = "medidasValor" + resultNro[_i].nro;
                                                            el.dom.className = "form-control tx-semibold tx-14 d-none";

                                                        } else {
                                                            el.dom.id = "medidasValor" + resultNro[_i].nro;
                                                            el.dom.className = "form-control tx-semibold tx-14 d-none";
                                                        }
                                                    } else {
                                                        el.dom.className = "form-control tx-semibold tx-14 d-none";

                                                    }
                                                }
                                            })
                                        },
                                        oninput: (e) => {
                                            MedidasUci.nuevoRegistro.valor = (e.target.value.length !== 0 ? e.target.value : null);
                                        },


                                    })

                                ]),
                            ]
                        }
                    });
                },
                visible: true,
                aTargets: null,
                orderable: true,

            });
            MedidasUci.sRows.push({
                fnCreatedCell: function(nTd, sData, oData, iRow, iCol) {
                    return m.mount(nTd, {
                        view: () => {
                            return [
                                m('div', {
                                    ondblclick: (e) => {
                                        MedidasUci.nuevoRegistro = null;
                                        valores.filter((v, i) => {
                                            if (v.id == oData.id) {
                                                let _i = v.idObj[index];
                                                MedidasUci.verRegistro(resultNro[_i]);
                                                if (MedidasUci.nuevoRegistro !== null && MedidasUci.nuevoRegistro.hora == null) {
                                                    if (MedidasUci.setHora != undefined) {
                                                        MedidasUci.nuevoRegistro.hora = MedidasUci.setHora;
                                                        document.getElementById('medidasHora' + resultNro[_i].nro).value = MedidasUci.setHora;
                                                    }
                                                }
                                                document.getElementById('medidasHora' + resultNro[_i].nro).className = "form-control tx-semibold tx-14";
                                                document.getElementById('txtMedidasHora' + resultNro[_i].nro).className = "text-center pd-l-0 pd-r-0 d-none";
                                                document.getElementById('medidasValor' + resultNro[_i].nro).className = "form-control";
                                                document.getElementById('txtMedidasValor' + resultNro[_i].nro).className = "text-center pd-l-0 pd-r-0 d-none";
                                                if (document.getElementById('btn' + resultNro[_i].nro) != null) {
                                                    document.getElementById('btn' + resultNro[_i].nro).className = "btn btn-xs btn-success btn-block tx-12 d-none";
                                                    setTimeout(() => {
                                                        new Cleave("#medidasHora" + resultNro[_i].nro, {
                                                            time: true,
                                                            timePattern: ['h', 'm']
                                                        });
                                                    }, 90);
                                                }



                                                let tt = $('#MedidasUci_' + oData.id).offset().top;
                                                setTimeout(() => {
                                                    let isAnimating = true;
                                                    $('html,body').animate({
                                                            scrollTop: tt
                                                        },
                                                        700, "easeInOutSine",
                                                        function() {
                                                            isAnimating = false;
                                                        })
                                                }, 250);

                                                setTimeout(() => {
                                                    let isAnimating = true;
                                                    $('#registrosMedidasUci').animate({
                                                            scrollLeft: '+=460'
                                                        },
                                                        700, "easeInOutSine",
                                                        function() {
                                                            isAnimating = false;
                                                        })
                                                }, 250);



                                            }
                                        })
                                    },
                                    onclick: (e) => {
                                        e.preventDefault();
                                    },

                                    oncontextmenu: (e) => {
                                        e.preventDefault();
                                        if (index == 0) {
                                            alert('No se puede eliminar el registro predeterminado.');
                                            throw 'No se puede eliminar el registro predeterminado.';
                                        }

                                        if (confirm("¿Esta Ud seguro de eliminar este registro?") == true) {
                                            valores.filter((v, i) => {

                                                if (v.id == oData.id) {
                                                    let _i = v.idObj[index];

                                                    setTimeout(() => {
                                                        MedidasUci.eliminarRegistro(resultNro[_i]);
                                                        FecthUci.eliminarSeccion(resultNro[_i]);
                                                        MedidasUci.nuevoRegistro = null;
                                                        MedidasUci.destroyTable();
                                                        MedidasUci.filterRegistros();
                                                        MedidasUci.show = false;
                                                        m.redraw();
                                                        setTimeout(() => {
                                                            MedidasUci.show = true;
                                                            m.redraw();
                                                        }, 100);
                                                    }, 100);


                                                    let tt = $('#MedidasUci_' + oData.id).offset().top;
                                                    setTimeout(() => {
                                                        let isAnimating = true;
                                                        $('html,body').animate({
                                                                scrollTop: tt
                                                            },
                                                            700, "easeInOutSine",
                                                            function() {
                                                                isAnimating = false;
                                                            })
                                                    }, 250);


                                                    setTimeout(() => {
                                                        let isAnimating = true;
                                                        $('#registrosMedidasUci').animate({
                                                                scrollLeft: '+=460'
                                                            },
                                                            700, "easeInOutSine",
                                                            function() {
                                                                isAnimating = false;
                                                            })
                                                    }, 250);
                                                }
                                            })


                                        }
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
                                                        el.dom.innerHTML = '';
                                                    }
                                                } else {
                                                    el.dom.innerHTML = '<div class="text-center pd-l-0 pd-r-0"><hr style="border-color:#001737;"/></div>';
                                                }
                                            }
                                        })
                                    }

                                }, []),
                                m('div.d-flex', [
                                    m("input[type='text'][placeholder='HH:mm']", {

                                        oncreate: (el) => {
                                            valores.filter((v, i) => {
                                                if (v.id == oData.id) {
                                                    let _i = v.idObj[index];
                                                    if (resultNro[_i] !== undefined) {
                                                        if (resultNro[_i].hora !== null) {
                                                            el.dom.value = resultNro[_i].hora;
                                                            el.dom.id = "medidasHora" + resultNro[_i].nro;
                                                            el.dom.className = "form-control d-none";


                                                            setTimeout(() => {
                                                                new Cleave("#" + el.dom.id, {
                                                                    time: true,
                                                                    timePattern: ['h', 'm']
                                                                });
                                                            }, 90);

                                                        } else {
                                                            el.dom.id = "medidasHora" + resultNro[_i].nro;
                                                            el.dom.className = "form-control d-none";
                                                        }
                                                    } else {
                                                        el.dom.className = "form-control d-none";

                                                    }
                                                }
                                            })





                                        },
                                        oninput: (e) => {
                                            setTimeout(() => {
                                                MedidasUci.setHora = (e.target.value.length !== 0 ? e.target.value : null);
                                                MedidasUci.nuevoRegistro.hora = (e.target.value.length !== 0 ? e.target.value : null);
                                            }, 50);
                                        },
                                        onkeypress: (e) => {
                                            if (e.keyCode == 13) {
                                                MedidasUci.nuevoRegistro.numeroTurno = PacientesUCI.numeroTurno;
                                                MedidasUci.nuevoRegistro.fechaHoraTurno = PacientesUCI.fechaHoraTurno;
                                                if (MedidasUci.nuevoRegistro.editar == null) {

                                                    setTimeout(() => {
                                                        MedidasUci.agregarRegistro();
                                                        FecthUci.registrarSeccion(MedidasUci.nuevoRegistro);
                                                        MedidasUci.nuevoRegistro = null;
                                                        MedidasUci.destroyTable();
                                                        MedidasUci.filterRegistros();
                                                        MedidasUci.show = false;
                                                        m.redraw();
                                                        setTimeout(() => {
                                                            MedidasUci.show = true;
                                                            m.redraw();
                                                        }, 100);
                                                    }, 100);

                                                } else {


                                                    setTimeout(() => {
                                                        MedidasUci.editarRegistro();
                                                        FecthUci.actualizarSeccion(MedidasUci.nuevoRegistro);
                                                        MedidasUci.nuevoRegistro = null;
                                                        MedidasUci.destroyTable();
                                                        MedidasUci.filterRegistros();
                                                        MedidasUci.show = false;
                                                        m.redraw();
                                                        setTimeout(() => {
                                                            MedidasUci.show = true;
                                                            m.redraw();
                                                        }, 100);
                                                    }, 100);


                                                }

                                                let tt = $('#MedidasUci_' + oData.id).offset().top;
                                                setTimeout(() => {
                                                    let isAnimating = true;
                                                    $('html,body').animate({
                                                            scrollTop: tt
                                                        },
                                                        700, "easeInOutSine",
                                                        function() {
                                                            isAnimating = false;
                                                        })
                                                }, 250);

                                                setTimeout(() => {
                                                    let isAnimating = true;
                                                    $('#registrosMedidasUci').animate({
                                                            scrollLeft: '+=460'
                                                        },
                                                        700, "easeInOutSine",
                                                        function() {
                                                            isAnimating = false;
                                                        })
                                                }, 250);

                                            }
                                        },

                                    }),
                                ]),
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
            fnCreatedCell: function(nTd, sData, oData, iRow, iCol) {
                return m.mount(nTd, {
                    view: () => {
                        return [
                            m("div.btn-block.btn-group.wd-100p.pd-5", [

                                m("button.btn.btn-xs.btn-block.btn-danger[type='button']", {
                                        class: (MedidasUci.nuevoRegistro !== null && MedidasUci.nuevoRegistro.editar && MedidasUci.nuevoRegistro.id == oData.id ? '' : 'd-none'),
                                        onclick: () => {
                                            oData.editar = null;
                                            document.getElementById('medidasValor' + MedidasUci.nuevoRegistro.nro).className = "form-control tx-semibold tx-14 d-none";
                                            document.getElementById('txtMedidasValor' + MedidasUci.nuevoRegistro.nro).className = "text-center pd-l-0 pd-r-0";
                                            document.getElementById('medidasHora' + MedidasUci.nuevoRegistro.nro).className = "form-control d-none";
                                            document.getElementById('txtMedidasHora' + MedidasUci.nuevoRegistro.nro).className = "text-center pd-l-0 pd-r-0";
                                            if (document.getElementById('btn' + MedidasUci.nuevoRegistro.nro) != null) {
                                                document.getElementById('btn' + MedidasUci.nuevoRegistro.nro).className = "btn btn-xs btn-success btn-block tx-12";
                                            }

                                            MedidasUci.nuevoRegistro = null;
                                        },
                                    },
                                    'Cancelar Edición',
                                ),
                                m("button.btn.btn-xs.btn-dark[type='button']", {
                                        //class: (PacientesUCI.fechaHoraTurno != oData.fechaHoraTurno ? '' : 'd-none'),
                                        onclick: () => {
                                            if (oData.valor == null) {
                                                alert('No se permite copiar. Ya existe un registro disponible.');
                                                throw 'No se permite copiar. Ya existe un registro disponible.'
                                            }
                                            MedidasUci.iniciarRegistro();
                                            MedidasUci.nuevoRegistro.id = oData.id;
                                            MedidasUci.nuevoRegistro.medida = oData.medida;
                                            MedidasUci.nuevoRegistro.orden = oData.orden;
                                            MedidasUci.nuevoRegistro.rango = oData.rango;
                                            MedidasUci.nuevoRegistro.instrumento = oData.instrumento;
                                            MedidasUci.nuevoRegistro.numeroTurno = PacientesUCI.numeroTurno;
                                            MedidasUci.nuevoRegistro.fechaHoraTurno = PacientesUCI.fechaHoraTurno;

                                            setTimeout(() => {
                                                MedidasUci.agregarRegistro();
                                                FecthUci.registrarSeccion(MedidasUci.nuevoRegistro);
                                                MedidasUci.nuevoRegistro = null;
                                                MedidasUci.destroyTable();
                                                MedidasUci.filterRegistros();
                                                MedidasUci.show = false;
                                                m.redraw();
                                                setTimeout(() => {
                                                    MedidasUci.show = true;
                                                    m.redraw();
                                                }, 100);
                                            }, 100);

                                            let tt = $('#MedidasUci_' + oData.id).offset().top;
                                            setTimeout(() => {
                                                let isAnimating = true;
                                                $('html,body').animate({
                                                        scrollTop: tt
                                                    },
                                                    700, "easeInOutSine",
                                                    function() {
                                                        isAnimating = false;
                                                    })
                                            }, 250);

                                            setTimeout(() => {
                                                let isAnimating = true;
                                                $('#registrosMedidasUci').animate({
                                                        scrollLeft: '+=460'
                                                    },
                                                    700, "easeInOutSine",
                                                    function() {
                                                        isAnimating = false;
                                                    })
                                            }, 250);

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
            FecthUci.dataSecciones.filter((obj) => {
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
                title: "Valor:",
            });
            ComburTestUci.sColumns.push({
                title: "Hora:",
            });
        }

        ComburTestUci.sColumns.push({
            title: "Opciones:",
        });

        ComburTestUci.sRows = [];
        ComburTestUci.sRows = [{
                mRender: function(data, type, full) {
                    return full.fechaHoraTurno;
                },
                visible: false,
                aTargets: [0],
                orderable: true,
            },
            {
                mRender: function(data, type, full) {
                    return full.orden;
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
                visible: false,
                aTargets: [2],
                orderable: false,

            },
            {
                mRender: function(data, type, full) {
                    return full.medida;
                },
                fnCreatedCell: function(nTd, sData, oData, iRow, iCol) {
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
                fnCreatedCell: function(nTd, sData, oData, iRow, iCol) {
                    return m.mount(nTd, {
                        view: () => {
                            return [
                                m('div', {
                                    ondblclick: (e) => {
                                        ComburTestUci.nuevoRegistro = null;
                                        valores.filter((v, i) => {

                                            if (v.id == oData.id) {
                                                let _i = v.idObj[index];

                                                ComburTestUci.verRegistro(resultNro[_i]);

                                                if (ComburTestUci.nuevoRegistro !== null && ComburTestUci.nuevoRegistro.hora == null) {
                                                    if (ComburTestUci.setHora != undefined) {
                                                        ComburTestUci.nuevoRegistro.hora = ComburTestUci.setHora;
                                                        document.getElementById('comburHora' + resultNro[_i].nro).value = ComburTestUci.setHora;
                                                    }
                                                }

                                                document.getElementById('comburHora' + resultNro[_i].nro).className = "form-control tx-semibold tx-14";
                                                document.getElementById('txtComburHora' + resultNro[_i].nro).className = "text-center pd-l-0 pd-r-0 d-none";
                                                document.getElementById('comburValor' + resultNro[_i].nro).className = "form-control";
                                                document.getElementById('txtComburValor' + resultNro[_i].nro).className = "text-center pd-l-0 pd-r-0 d-none";
                                                if (document.getElementById('btn' + resultNro[_i].nro) != null) {
                                                    document.getElementById('btn' + resultNro[_i].nro).className = "btn btn-xs btn-success btn-block tx-12 d-none";
                                                    setTimeout(() => {
                                                        new Cleave("#comburHora" + resultNro[_i].nro, {
                                                            time: true,
                                                            timePattern: ['h', 'm']
                                                        });
                                                    }, 90);
                                                }


                                                let tt = $('#ComburTest_' + oData.id).offset().top;
                                                setTimeout(() => {
                                                    let isAnimating = true;
                                                    $('html,body').animate({
                                                            scrollTop: tt
                                                        },
                                                        700, "easeInOutSine",
                                                        function() {
                                                            isAnimating = false;
                                                        })
                                                }, 250);

                                                setTimeout(() => {
                                                    let isAnimating = true;
                                                    $('#registrosComburTest').animate({
                                                            scrollLeft: '+=460'
                                                        },
                                                        700, "easeInOutSine",
                                                        function() {
                                                            isAnimating = false;
                                                        })
                                                }, 250);

                                            }
                                        })
                                    },
                                    onclick: (e) => {
                                        e.preventDefault();
                                    },

                                    oncontextmenu: (e) => {
                                        e.preventDefault();
                                        if (index == 0) {
                                            alert('No se puede eliminar el registro predeterminado.');
                                            throw 'No se puede eliminar el registro predeterminado.';
                                        }

                                        if (confirm("¿Esta Ud seguro de eliminar este registro?") == true) {
                                            valores.filter((v, i) => {

                                                if (v.id == oData.id) {
                                                    let _i = v.idObj[index];
                                                    setTimeout(() => {
                                                        ComburTestUci.eliminarRegistro(resultNro[_i]);
                                                        FecthUci.eliminarSeccion(resultNro[_i]);
                                                        ComburTestUci.nuevoRegistro = null;
                                                        ComburTestUci.destroyTable();
                                                        ComburTestUci.filterRegistros();
                                                        ComburTestUci.show = false;
                                                        m.redraw();
                                                        setTimeout(() => {
                                                            ComburTestUci.show = true;
                                                            m.redraw();
                                                        }, 100);
                                                    }, 100);

                                                    let tt = $('#ComburTest_' + oData.id).offset().top;
                                                    setTimeout(() => {
                                                        let isAnimating = true;
                                                        $('html,body').animate({
                                                                scrollTop: tt
                                                            },
                                                            700, "easeInOutSine",
                                                            function() {
                                                                isAnimating = false;
                                                            })
                                                    }, 250);

                                                    setTimeout(() => {
                                                        let isAnimating = true;
                                                        $('#registrosComburTest').animate({
                                                                scrollLeft: '+=460'
                                                            },
                                                            700, "easeInOutSine",
                                                            function() {
                                                                isAnimating = false;
                                                            })
                                                    }, 250);
                                                }
                                            })


                                        }
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
                                                        el.dom.innerHTML = '<button type="button" id="btn' + resultNro[_i].nro + '" class="btn btn-xs btn-success btn-block tx-12">Registrar</button>';
                                                    }
                                                } else {
                                                    el.dom.innerHTML = '<div class="text-center pd-l-0 pd-r-0"><hr style="border-color:#001737;"/></div>';
                                                }
                                            }
                                        })
                                    }

                                }, []),
                                m('div.d-flex', [
                                    m("input", {
                                        type: "text",
                                        placeholder: "...",
                                        oncreate: (el) => {
                                            valores.filter((v, i) => {
                                                if (v.id == oData.id) {
                                                    let _i = v.idObj[index];
                                                    if (resultNro[_i] !== undefined) {
                                                        if (resultNro[_i].valor !== null) {
                                                            el.dom.value = resultNro[_i].valor;
                                                            el.dom.id = "comburValor" + resultNro[_i].nro;
                                                            el.dom.className = "form-control tx-semibold tx-14 d-none";

                                                        } else {
                                                            el.dom.id = "comburValor" + resultNro[_i].nro;
                                                            el.dom.className = "form-control tx-semibold tx-14 d-none";
                                                        }
                                                    } else {
                                                        el.dom.className = "form-control tx-semibold tx-14 d-none";

                                                    }
                                                }
                                            })
                                        },
                                        oninput: (e) => {
                                            ComburTestUci.nuevoRegistro.valor = (e.target.value.length !== 0 ? e.target.value : null);
                                        },


                                    })

                                ]),
                            ]
                        }
                    });
                },
                visible: true,
                aTargets: null,
                orderable: true,

            });
            ComburTestUci.sRows.push({
                fnCreatedCell: function(nTd, sData, oData, iRow, iCol) {
                    return m.mount(nTd, {
                        view: () => {
                            return [
                                m('div', {
                                    ondblclick: (e) => {
                                        ComburTestUci.nuevoRegistro = null;
                                        valores.filter((v, i) => {
                                            if (v.id == oData.id) {
                                                let _i = v.idObj[index];
                                                ComburTestUci.verRegistro(resultNro[_i]);
                                                if (ComburTestUci.nuevoRegistro !== null && ComburTestUci.nuevoRegistro.hora == null) {
                                                    if (ComburTestUci.setHora != undefined) {
                                                        ComburTestUci.nuevoRegistro.hora = ComburTestUci.setHora;
                                                        document.getElementById('comburHora' + resultNro[_i].nro).value = ComburTestUci.setHora;
                                                    }
                                                }
                                                document.getElementById('comburHora' + resultNro[_i].nro).className = "form-control tx-semibold tx-14";
                                                document.getElementById('txtComburHora' + resultNro[_i].nro).className = "text-center pd-l-0 pd-r-0 d-none";
                                                document.getElementById('comburValor' + resultNro[_i].nro).className = "form-control";
                                                document.getElementById('txtComburValor' + resultNro[_i].nro).className = "text-center pd-l-0 pd-r-0 d-none";
                                                if (document.getElementById('btn' + resultNro[_i].nro) != null) {
                                                    document.getElementById('btn' + resultNro[_i].nro).className = "btn btn-xs btn-success btn-block tx-12 d-none";
                                                    setTimeout(() => {
                                                        new Cleave("#comburHora" + resultNro[_i].nro, {
                                                            time: true,
                                                            timePattern: ['h', 'm']
                                                        });
                                                    }, 90);
                                                }


                                                let tt = $('#ComburTest_' + oData.id).offset().top;
                                                setTimeout(() => {
                                                    let isAnimating = true;
                                                    $('html,body').animate({
                                                            scrollTop: tt
                                                        },
                                                        700, "easeInOutSine",
                                                        function() {
                                                            isAnimating = false;
                                                        })
                                                }, 250);


                                                setTimeout(() => {
                                                    let isAnimating = true;
                                                    $('#registrosComburTest').animate({
                                                            scrollLeft: '+=460'
                                                        },
                                                        700, "easeInOutSine",
                                                        function() {
                                                            isAnimating = false;
                                                        })
                                                }, 250);

                                            }
                                        })
                                    },
                                    onclick: (e) => {
                                        e.preventDefault();
                                    },

                                    oncontextmenu: (e) => {
                                        e.preventDefault();
                                        if (index == 0) {
                                            alert('No se puede eliminar el registro predeterminado.');
                                            throw 'No se puede eliminar el registro predeterminado.';
                                        }

                                        if (confirm("¿Esta Ud seguro de eliminar este registro?") == true) {
                                            valores.filter((v, i) => {

                                                if (v.id == oData.id) {
                                                    let _i = v.idObj[index];

                                                    setTimeout(() => {
                                                        ComburTestUci.eliminarRegistro(resultNro[_i]);
                                                        FecthUci.eliminarSeccion(resultNro[_i]);
                                                        ComburTestUci.nuevoRegistro = null;
                                                        ComburTestUci.destroyTable();
                                                        ComburTestUci.filterRegistros();
                                                        ComburTestUci.show = false;
                                                        m.redraw();
                                                        setTimeout(() => {
                                                            ComburTestUci.show = true;
                                                            m.redraw();
                                                        }, 100);
                                                    }, 100);

                                                    let tt = $('#ComburTest_' + oData.id).offset().top;
                                                    setTimeout(() => {
                                                        let isAnimating = true;
                                                        $('html,body').animate({
                                                                scrollTop: tt
                                                            },
                                                            700, "easeInOutSine",
                                                            function() {
                                                                isAnimating = false;
                                                            })
                                                    }, 250);

                                                    setTimeout(() => {
                                                        let isAnimating = true;
                                                        $('#registrosComburTest').animate({
                                                                scrollLeft: '+=460'
                                                            },
                                                            700, "easeInOutSine",
                                                            function() {
                                                                isAnimating = false;
                                                            })
                                                    }, 250);
                                                }
                                            })


                                        }
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
                                                        el.dom.innerHTML = '';
                                                    }
                                                } else {
                                                    el.dom.innerHTML = '<div class="text-center pd-l-0 pd-r-0"><hr style="border-color:#001737;"/></div>';
                                                }
                                            }
                                        })
                                    }

                                }, []),
                                m('div.d-flex', [
                                    m("input[type='text'][placeholder='HH:mm']", {

                                        oncreate: (el) => {
                                            valores.filter((v, i) => {
                                                if (v.id == oData.id) {
                                                    let _i = v.idObj[index];
                                                    if (resultNro[_i] !== undefined) {
                                                        if (resultNro[_i].hora !== null) {
                                                            el.dom.value = resultNro[_i].hora;
                                                            el.dom.id = "comburHora" + resultNro[_i].nro;
                                                            el.dom.className = "form-control d-none";


                                                            setTimeout(() => {
                                                                new Cleave("#" + el.dom.id, {
                                                                    time: true,
                                                                    timePattern: ['h', 'm']
                                                                });
                                                            }, 90);

                                                        } else {
                                                            el.dom.id = "comburHora" + resultNro[_i].nro;
                                                            el.dom.className = "form-control d-none";
                                                        }
                                                    } else {
                                                        el.dom.className = "form-control d-none";

                                                    }
                                                }
                                            })





                                        },
                                        oninput: (e) => {
                                            setTimeout(() => {
                                                ComburTestUci.setHora = (e.target.value.length !== 0 ? e.target.value : null);
                                                ComburTestUci.nuevoRegistro.hora = (e.target.value.length !== 0 ? e.target.value : null);
                                            }, 50);
                                        },
                                        onkeypress: (e) => {
                                            if (e.keyCode == 13) {
                                                ComburTestUci.nuevoRegistro.numeroTurno = PacientesUCI.numeroTurno;
                                                ComburTestUci.nuevoRegistro.fechaHoraTurno = PacientesUCI.fechaHoraTurno;
                                                if (ComburTestUci.nuevoRegistro.editar == null) {
                                                    setTimeout(() => {
                                                        ComburTestUci.agregarRegistro();
                                                        FecthUci.registrarSeccion(ComburTestUci.nuevoRegistro);
                                                        ComburTestUci.nuevoRegistro = null;
                                                        ComburTestUci.destroyTable();
                                                        ComburTestUci.filterRegistros();
                                                        ComburTestUci.show = false;
                                                        m.redraw();
                                                        setTimeout(() => {
                                                            ComburTestUci.show = true;
                                                            m.redraw();
                                                        }, 100);
                                                    }, 100);


                                                } else {

                                                    setTimeout(() => {
                                                        ComburTestUci.editarRegistro();
                                                        FecthUci.actualizarSeccion(ComburTestUci.nuevoRegistro);
                                                        ComburTestUci.nuevoRegistro = null;
                                                        ComburTestUci.destroyTable();
                                                        ComburTestUci.filterRegistros();
                                                        ComburTestUci.show = false;
                                                        m.redraw();
                                                        setTimeout(() => {
                                                            ComburTestUci.show = true;
                                                            m.redraw();
                                                        }, 100);
                                                    }, 100);

                                                }

                                                let tt = $('#ComburTest_' + oData.id).offset().top;
                                                setTimeout(() => {
                                                    let isAnimating = true;
                                                    $('html,body').animate({
                                                            scrollTop: tt
                                                        },
                                                        700, "easeInOutSine",
                                                        function() {
                                                            isAnimating = false;
                                                        })
                                                }, 250);

                                                setTimeout(() => {
                                                    let isAnimating = true;
                                                    $('#registrosComburTest').animate({
                                                            scrollLeft: '+=460'
                                                        },
                                                        700, "easeInOutSine",
                                                        function() {
                                                            isAnimating = false;
                                                        })
                                                }, 250);
                                            }
                                        },

                                    }),
                                ]),
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
            fnCreatedCell: function(nTd, sData, oData, iRow, iCol) {
                return m.mount(nTd, {
                    view: () => {
                        return [
                            m("div.btn-block.btn-group.wd-100p.pd-5", [

                                m("button.btn.btn-xs.btn-block.btn-danger[type='button']", {
                                        class: (ComburTestUci.nuevoRegistro !== null && ComburTestUci.nuevoRegistro.editar && ComburTestUci.nuevoRegistro.id == oData.id ? '' : 'd-none'),
                                        onclick: () => {
                                            oData.editar = null;
                                            document.getElementById('comburValor' + ComburTestUci.nuevoRegistro.nro).className = "form-control tx-semibold tx-14 d-none";
                                            document.getElementById('txtComburValor' + ComburTestUci.nuevoRegistro.nro).className = "text-center pd-l-0 pd-r-0";
                                            document.getElementById('comburHora' + ComburTestUci.nuevoRegistro.nro).className = "form-control d-none";
                                            document.getElementById('txtComburHora' + ComburTestUci.nuevoRegistro.nro).className = "text-center pd-l-0 pd-r-0";
                                            if (document.getElementById('btn' + ComburTestUci.nuevoRegistro.nro) != null) {
                                                document.getElementById('btn' + ComburTestUci.nuevoRegistro.nro).className = "btn btn-xs btn-success btn-block tx-12";
                                            }
                                            ComburTestUci.nuevoRegistro = null;
                                        },
                                    },
                                    'Cancelar Edición',
                                ),
                                m("button.btn.btn-xs.btn-dark[type='button']", {
                                        //class: (PacientesUCI.fechaHoraTurno != oData.fechaHoraTurno ? '' : 'd-none'),
                                        onclick: () => {
                                            if (oData.valor == null) {
                                                alert('No se permite copiar. Ya existe un registro disponible.');
                                                throw 'No se permite copiar. Ya existe un registro disponible.'
                                            }
                                            ComburTestUci.iniciarRegistro();
                                            ComburTestUci.nuevoRegistro.id = oData.id;
                                            ComburTestUci.nuevoRegistro.medida = oData.medida;
                                            ComburTestUci.nuevoRegistro.orden = oData.orden;
                                            ComburTestUci.nuevoRegistro.numeroTurno = PacientesUCI.numeroTurno;
                                            ComburTestUci.nuevoRegistro.fechaHoraTurno = PacientesUCI.fechaHoraTurno;

                                            setTimeout(() => {
                                                ComburTestUci.agregarRegistro();
                                                FecthUci.registrarSeccion(ComburTestUci.nuevoRegistro);
                                                ComburTestUci.nuevoRegistro = null;
                                                ComburTestUci.destroyTable();
                                                ComburTestUci.filterRegistros();
                                                ComburTestUci.show = false;
                                                m.redraw();
                                                setTimeout(() => {
                                                    ComburTestUci.show = true;
                                                    m.redraw();
                                                }, 100);
                                            }, 100);

                                            let tt = $('#ComburTest_' + oData.id).offset().top;
                                            setTimeout(() => {
                                                let isAnimating = true;
                                                $('html,body').animate({
                                                        scrollTop: tt
                                                    },
                                                    700, "easeInOutSine",
                                                    function() {
                                                        isAnimating = false;
                                                    })
                                            }, 250);

                                            setTimeout(() => {
                                                let isAnimating = true;
                                                $('#registrosComburTest').animate({
                                                        scrollLeft: '+=460'
                                                    },
                                                    700, "easeInOutSine",
                                                    function() {
                                                        isAnimating = false;
                                                    })
                                            }, 250);




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
            FecthUci.dataSecciones.filter((obj) => {
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
                title: "Valor:",
            });
            GasesMedUci.sColumns.push({
                title: "Hora:",
            });
        }

        GasesMedUci.sColumns.push({
            title: "Opciones:",
        });

        GasesMedUci.sRows = [];
        GasesMedUci.sRows = [{
                mRender: function(data, type, full) {
                    return full.fechaHoraTurno;
                },
                visible: false,
                aTargets: [0],
                orderable: true,
            },
            {
                mRender: function(data, type, full) {
                    return full.orden;
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
                visible: false,
                aTargets: [2],
                orderable: false,

            },
            {
                mRender: function(data, type, full) {
                    return full.medida;
                },
                fnCreatedCell: function(nTd, sData, oData, iRow, iCol) {
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
                fnCreatedCell: function(nTd, sData, oData, iRow, iCol) {
                    return m.mount(nTd, {
                        view: () => {
                            return [
                                m('div', {
                                    ondblclick: (e) => {
                                        GasesMedUci.nuevoRegistro = null;
                                        valores.filter((v, i) => {

                                            if (v.id == oData.id) {
                                                let _i = v.idObj[index];

                                                GasesMedUci.verRegistro(resultNro[_i]);

                                                if (GasesMedUci.nuevoRegistro !== null && GasesMedUci.nuevoRegistro.hora == null) {
                                                    if (GasesMedUci.setHora != undefined) {
                                                        GasesMedUci.nuevoRegistro.hora = GasesMedUci.setHora;
                                                        document.getElementById('gasesMedHora' + resultNro[_i].nro).value = GasesMedUci.setHora;
                                                    }
                                                }

                                                document.getElementById('gasesMedHora' + resultNro[_i].nro).className = "form-control tx-semibold tx-14";
                                                document.getElementById('txtGasesMedHora' + resultNro[_i].nro).className = "text-center pd-l-0 pd-r-0 d-none";
                                                document.getElementById('gasesMedValor' + resultNro[_i].nro).className = "form-control";
                                                document.getElementById('txtGasesMedValor' + resultNro[_i].nro).className = "text-center pd-l-0 pd-r-0 d-none";
                                                if (document.getElementById('btn' + resultNro[_i].nro) != null) {
                                                    document.getElementById('btn' + resultNro[_i].nro).className = "btn btn-xs btn-success btn-block tx-12 d-none";
                                                    setTimeout(() => {
                                                        new Cleave("#gasesMedHora" + resultNro[_i].nro, {
                                                            time: true,
                                                            timePattern: ['h', 'm']
                                                        });
                                                    }, 90);
                                                }

                                                let tt = $('#GasesMed_' + oData.id).offset().top;
                                                setTimeout(() => {
                                                    let isAnimating = true;
                                                    $('html,body').animate({
                                                            scrollTop: tt
                                                        },
                                                        700, "easeInOutSine",
                                                        function() {
                                                            isAnimating = false;
                                                        })
                                                }, 250);


                                                setTimeout(() => {
                                                    let isAnimating = true;
                                                    $('#registrosGasesMedUci').animate({
                                                            scrollLeft: '+=460'
                                                        },
                                                        700, "easeInOutSine",
                                                        function() {
                                                            isAnimating = false;
                                                        })
                                                }, 250);

                                            }
                                        })
                                    },
                                    onclick: (e) => {
                                        e.preventDefault();
                                    },

                                    oncontextmenu: (e) => {
                                        e.preventDefault();
                                        if (index == 0) {
                                            alert('No se puede eliminar el registro predeterminado.');
                                            throw 'No se puede eliminar el registro predeterminado.';
                                        }

                                        if (confirm("¿Esta Ud seguro de eliminar este registro?") == true) {
                                            valores.filter((v, i) => {

                                                if (v.id == oData.id) {
                                                    let _i = v.idObj[index];

                                                    setTimeout(() => {
                                                        GasesMedUci.eliminarRegistro(resultNro[_i]);
                                                        FecthUci.eliminarSeccion(resultNro[_i]);
                                                        GasesMedUci.nuevoRegistro = null;
                                                        GasesMedUci.destroyTable();
                                                        GasesMedUci.filterRegistros();
                                                        GasesMedUci.show = false;
                                                        m.redraw();
                                                        setTimeout(() => {
                                                            GasesMedUci.show = true;
                                                            m.redraw();
                                                        }, 100);
                                                    }, 100);

                                                    let tt = $('#GasesMed_' + oData.id).offset().top;
                                                    setTimeout(() => {
                                                        let isAnimating = true;
                                                        $('html,body').animate({
                                                                scrollTop: tt
                                                            },
                                                            700, "easeInOutSine",
                                                            function() {
                                                                isAnimating = false;
                                                            })
                                                    }, 250);

                                                    setTimeout(() => {
                                                        let isAnimating = true;
                                                        $('#registrosGasesMedUci').animate({
                                                                scrollLeft: '+=460'
                                                            },
                                                            700, "easeInOutSine",
                                                            function() {
                                                                isAnimating = false;
                                                            })
                                                    }, 250);


                                                }
                                            })


                                        }
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
                                                        el.dom.innerHTML = '<button type="button" id="btn' + resultNro[_i].nro + '" class="btn btn-xs btn-success btn-block tx-12">Registrar</button>';
                                                    }
                                                } else {
                                                    el.dom.innerHTML = '<div class="text-center pd-l-0 pd-r-0"><hr style="border-color:#001737;"/></div>';
                                                }
                                            }
                                        })
                                    }

                                }, []),
                                m('div.d-flex', [
                                    m("input", {
                                        type: "text",
                                        placeholder: "...",
                                        oncreate: (el) => {
                                            valores.filter((v, i) => {
                                                if (v.id == oData.id) {
                                                    let _i = v.idObj[index];
                                                    if (resultNro[_i] !== undefined) {
                                                        if (resultNro[_i].valor !== null) {
                                                            el.dom.value = resultNro[_i].valor;
                                                            el.dom.id = "gasesMedValor" + resultNro[_i].nro;
                                                            el.dom.className = "form-control tx-semibold tx-14 d-none";

                                                        } else {
                                                            el.dom.id = "gasesMedValor" + resultNro[_i].nro;
                                                            el.dom.className = "form-control tx-semibold tx-14 d-none";
                                                        }
                                                    } else {
                                                        el.dom.className = "form-control tx-semibold tx-14 d-none";

                                                    }
                                                }
                                            })
                                        },
                                        oninput: (e) => {
                                            GasesMedUci.nuevoRegistro.valor = (e.target.value.length !== 0 ? e.target.value : null);
                                        },


                                    })

                                ]),
                            ]
                        }
                    });
                },
                visible: true,
                aTargets: null,
                orderable: true,

            });
            GasesMedUci.sRows.push({
                fnCreatedCell: function(nTd, sData, oData, iRow, iCol) {
                    return m.mount(nTd, {
                        view: () => {
                            return [
                                m('div', {
                                    ondblclick: (e) => {
                                        GasesMedUci.nuevoRegistro = null;
                                        valores.filter((v, i) => {
                                            if (v.id == oData.id) {
                                                let _i = v.idObj[index];
                                                GasesMedUci.verRegistro(resultNro[_i]);
                                                if (GasesMedUci.nuevoRegistro !== null && GasesMedUci.nuevoRegistro.hora == null) {
                                                    if (GasesMedUci.setHora != undefined) {
                                                        GasesMedUci.nuevoRegistro.hora = GasesMedUci.setHora;
                                                        document.getElementById('gasesMedHora' + resultNro[_i].nro).value = GasesMedUci.setHora;
                                                    }
                                                }
                                                document.getElementById('gasesMedHora' + resultNro[_i].nro).className = "form-control tx-semibold tx-14";
                                                document.getElementById('txtGasesMedHora' + resultNro[_i].nro).className = "text-center pd-l-0 pd-r-0 d-none";
                                                document.getElementById('gasesMedValor' + resultNro[_i].nro).className = "form-control";
                                                document.getElementById('txtGasesMedValor' + resultNro[_i].nro).className = "text-center pd-l-0 pd-r-0 d-none";
                                                if (document.getElementById('btn' + resultNro[_i].nro) != null) {
                                                    document.getElementById('btn' + resultNro[_i].nro).className = "btn btn-xs btn-success btn-block tx-12 d-none";
                                                    setTimeout(() => {
                                                        new Cleave("#gasesMedHora" + resultNro[_i].nro, {
                                                            time: true,
                                                            timePattern: ['h', 'm']
                                                        });
                                                    }, 90);
                                                }

                                                let tt = $('#GasesMed_' + oData.id).offset().top;
                                                setTimeout(() => {
                                                    let isAnimating = true;
                                                    $('html,body').animate({
                                                            scrollTop: tt
                                                        },
                                                        700, "easeInOutSine",
                                                        function() {
                                                            isAnimating = false;
                                                        })
                                                }, 250);

                                                setTimeout(() => {
                                                    let isAnimating = true;
                                                    $('#registrosGasesMedUci').animate({
                                                            scrollLeft: '+=460'
                                                        },
                                                        700, "easeInOutSine",
                                                        function() {
                                                            isAnimating = false;
                                                        })
                                                }, 250);

                                            }
                                        })
                                    },
                                    onclick: (e) => {
                                        e.preventDefault();
                                    },

                                    oncontextmenu: (e) => {
                                        e.preventDefault();
                                        if (index == 0) {
                                            alert('No se puede eliminar el registro predeterminado.');
                                            throw 'No se puede eliminar el registro predeterminado.';
                                        }

                                        if (confirm("¿Esta Ud seguro de eliminar este registro?") == true) {
                                            valores.filter((v, i) => {

                                                if (v.id == oData.id) {
                                                    let _i = v.idObj[index];

                                                    setTimeout(() => {
                                                        GasesMedUci.eliminarRegistro(resultNro[_i]);
                                                        FecthUci.eliminarSeccion(resultNro[_i]);
                                                        GasesMedUci.nuevoRegistro = null;
                                                        GasesMedUci.destroyTable();
                                                        GasesMedUci.filterRegistros();
                                                        GasesMedUci.show = false;
                                                        m.redraw();
                                                        setTimeout(() => {
                                                            GasesMedUci.show = true;
                                                            m.redraw();
                                                        }, 100);
                                                    }, 100);

                                                    let tt = $('#GasesMed_' + oData.id).offset().top;
                                                    setTimeout(() => {
                                                        let isAnimating = true;
                                                        $('html,body').animate({
                                                                scrollTop: tt
                                                            },
                                                            700, "easeInOutSine",
                                                            function() {
                                                                isAnimating = false;
                                                            })
                                                    }, 250);

                                                    setTimeout(() => {
                                                        let isAnimating = true;
                                                        $('#registrosGasesMedUci').animate({
                                                                scrollLeft: '+=460'
                                                            },
                                                            700, "easeInOutSine",
                                                            function() {
                                                                isAnimating = false;
                                                            })
                                                    }, 250);


                                                }
                                            })


                                        }
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
                                                        el.dom.innerHTML = '';
                                                    }
                                                } else {
                                                    el.dom.innerHTML = '<div class="text-center pd-l-0 pd-r-0"><hr style="border-color:#001737;"/></div>';
                                                }
                                            }
                                        })
                                    }

                                }, []),
                                m('div.d-flex', [
                                    m("input[type='text'][placeholder='HH:mm']", {

                                        oncreate: (el) => {
                                            valores.filter((v, i) => {
                                                if (v.id == oData.id) {
                                                    let _i = v.idObj[index];
                                                    if (resultNro[_i] !== undefined) {
                                                        if (resultNro[_i].hora !== null) {
                                                            el.dom.value = resultNro[_i].hora;
                                                            el.dom.id = "gasesMedHora" + resultNro[_i].nro;
                                                            el.dom.className = "form-control d-none";

                                                            setTimeout(() => {
                                                                new Cleave("#" + el.dom.id, {
                                                                    time: true,
                                                                    timePattern: ['h', 'm']
                                                                });
                                                            }, 90);

                                                        } else {
                                                            el.dom.id = "gasesMedHora" + resultNro[_i].nro;
                                                            el.dom.className = "form-control d-none";
                                                        }
                                                    } else {
                                                        el.dom.className = "form-control d-none";

                                                    }
                                                }
                                            })





                                        },
                                        oninput: (e) => {
                                            setTimeout(() => {
                                                GasesMedUci.setHora = (e.target.value.length !== 0 ? e.target.value : null);
                                                GasesMedUci.nuevoRegistro.hora = (e.target.value.length !== 0 ? e.target.value : null);
                                            }, 50);
                                        },
                                        onkeypress: (e) => {
                                            if (e.keyCode == 13) {
                                                GasesMedUci.nuevoRegistro.numeroTurno = PacientesUCI.numeroTurno;
                                                GasesMedUci.nuevoRegistro.fechaHoraTurno = PacientesUCI.fechaHoraTurno;
                                                if (GasesMedUci.nuevoRegistro.editar == null) {

                                                    setTimeout(() => {
                                                        GasesMedUci.agregarRegistro();
                                                        FecthUci.registrarSeccion(GasesMedUci.nuevoRegistro);
                                                        GasesMedUci.nuevoRegistro = null;
                                                        GasesMedUci.destroyTable();
                                                        GasesMedUci.filterRegistros();
                                                        GasesMedUci.show = false;
                                                        m.redraw();
                                                        setTimeout(() => {
                                                            GasesMedUci.show = true;
                                                            m.redraw();
                                                        }, 100);
                                                    }, 100);



                                                } else {

                                                    setTimeout(() => {
                                                        GasesMedUci.editarRegistro();
                                                        FecthUci.actualizarSeccion(GasesMedUci.nuevoRegistro);
                                                        GasesMedUci.nuevoRegistro = null;
                                                        GasesMedUci.destroyTable();
                                                        GasesMedUci.filterRegistros();
                                                        GasesMedUci.show = false;
                                                        m.redraw();
                                                        setTimeout(() => {
                                                            GasesMedUci.show = true;
                                                            m.redraw();
                                                        }, 100);
                                                    }, 100);


                                                }

                                                let tt = $('#GasesMed_' + oData.id).offset().top;
                                                setTimeout(() => {
                                                    let isAnimating = true;
                                                    $('html,body').animate({
                                                            scrollTop: tt
                                                        },
                                                        700, "easeInOutSine",
                                                        function() {
                                                            isAnimating = false;
                                                        })
                                                }, 250);

                                                setTimeout(() => {
                                                    let isAnimating = true;
                                                    $('#registrosGasesMedUci').animate({
                                                            scrollLeft: '+=460'
                                                        },
                                                        700, "easeInOutSine",
                                                        function() {
                                                            isAnimating = false;
                                                        })
                                                }, 250);
                                            }
                                        },

                                    }),
                                ]),
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
            fnCreatedCell: function(nTd, sData, oData, iRow, iCol) {
                return m.mount(nTd, {
                    view: () => {
                        return [
                            m("div.btn-block.btn-group.wd-100p.pd-5", [

                                m("button.btn.btn-xs.btn-block.btn-danger[type='button']", {
                                        class: (GasesMedUci.nuevoRegistro !== null && GasesMedUci.nuevoRegistro.editar && GasesMedUci.nuevoRegistro.id == oData.id ? '' : 'd-none'),
                                        onclick: () => {
                                            oData.editar = null;
                                            document.getElementById('gasesMedValor' + GasesMedUci.nuevoRegistro.nro).className = "form-control tx-semibold tx-14 d-none";
                                            document.getElementById('txtGasesMedValor' + GasesMedUci.nuevoRegistro.nro).className = "text-center pd-l-0 pd-r-0";
                                            document.getElementById('gasesMedHora' + GasesMedUci.nuevoRegistro.nro).className = "form-control d-none";
                                            document.getElementById('txtGasesMedHora' + GasesMedUci.nuevoRegistro.nro).className = "text-center pd-l-0 pd-r-0";
                                            if (document.getElementById('btn' + GasesMedUci.nuevoRegistro.nro) != null) {
                                                document.getElementById('btn' + GasesMedUci.nuevoRegistro.nro).className = "btn btn-xs btn-success btn-block tx-12";
                                            }
                                            GasesMedUci.nuevoRegistro = null;
                                        },
                                    },
                                    'Cancelar Edición',
                                ),
                                m("button.btn.btn-xs.btn-dark[type='button']", {
                                        //class: (PacientesUCI.fechaHoraTurno != oData.fechaHoraTurno ? '' : 'd-none'),
                                        onclick: () => {
                                            if (oData.valor == null) {
                                                alert('No se permite copiar. Ya existe un registro disponible.');
                                                throw 'No se permite copiar. Ya existe un registro disponible.'
                                            }

                                            GasesMedUci.iniciarRegistro();
                                            GasesMedUci.nuevoRegistro.id = oData.id;
                                            GasesMedUci.nuevoRegistro.medida = oData.medida;
                                            GasesMedUci.nuevoRegistro.orden = oData.orden;
                                            GasesMedUci.nuevoRegistro.numeroTurno = PacientesUCI.numeroTurno;
                                            GasesMedUci.nuevoRegistro.fechaHoraTurno = PacientesUCI.fechaHoraTurno;

                                            setTimeout(() => {
                                                GasesMedUci.agregarRegistro();
                                                FecthUci.registrarSeccion(GasesMedUci.nuevoRegistro);
                                                GasesMedUci.nuevoRegistro = null;
                                                GasesMedUci.destroyTable();
                                                GasesMedUci.filterRegistros();
                                                GasesMedUci.show = false;
                                                m.redraw();
                                                setTimeout(() => {
                                                    GasesMedUci.show = true;
                                                    m.redraw();
                                                }, 100);
                                            }, 100);

                                            let tt = $('#GasesMed_' + oData.id).offset().top;
                                            setTimeout(() => {
                                                let isAnimating = true;
                                                $('html,body').animate({
                                                        scrollTop: tt
                                                    },
                                                    700, "easeInOutSine",
                                                    function() {
                                                        isAnimating = false;
                                                    })
                                            }, 250);


                                            setTimeout(() => {
                                                let isAnimating = true;
                                                $('#registrosGasesMedUci').animate({
                                                        scrollLeft: '+=460'
                                                    },
                                                    700, "easeInOutSine",
                                                    function() {
                                                        isAnimating = false;
                                                    })
                                            }, 250);

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
            aTargets: null,
            orderable: true,

        });

        GasesMedUci.sRows.map((c, i) => {
            GasesMedUci.sRows[i].aTargets = [i];
        });

        return _arr;

    }

    static parseSeccionPrescripcionesUci_v2(options) {


        let res = [];
        let result = [];
        let resultId = [];
        let resultNro = [];
        let _arr = [];
        let hash = {};


        options.map((option) => {
            FecthUci.dataSecciones.filter((obj) => {
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


    static parseSeccionMedidas_AllRegistros(options) {

        let res = [];
        let result = [];
        let resultNro = [];
        let hash = {};

        options.map((option) => {
            FecthUci.dataSecciones.filter((obj) => {
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
            FecthUci.dataSecciones.filter((obj) => {
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
            FecthUci.dataSecciones.filter((obj) => {
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
            FecthUci.dataSecciones.filter((obj) => {
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
            FecthUci.dataSecciones.filter((obj) => {
                let _obj = JSON.parse(obj.DATASECCION);
                if (_obj.id === option.id) {
                    res.push(_obj);
                }
            });
        });

        result = res.sort((a, b) => b.nro - a.nro);
        // Quitar duplicados
        resultId = result.filter(o => hash[o.id] ? false : hash[o.id] = true);
        // Ordenar desc
        _arr = resultId.sort((a, b) => a.nro - b.nro);

        return _arr;
    }

    static parseAllSeccion(idSeccion) {
        let res = [];
        let result = [];
        let _arr = [];
        let hash = {};


        FecthUci.dataSecciones.map((obj) => {
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

    static parseSeccion(options) {
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
            let registros = CuidadosUci2.registros.filter(_v => _v.fechaHoraTurno == PacientesUCI.fechaHoraTurno);
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
                    CuidadosUci2.nuevoRegistro.numeroTurno = PacientesUCI.numeroTurno;
                    CuidadosUci2.nuevoRegistro.fechaHoraTurno = PacientesUCI.fechaHoraTurno;
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
            let registros = CateterUci.registros.filter(_v => _v.fechaHoraTurno == PacientesUCI.fechaHoraTurno);
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
                    CateterUci.nuevoRegistro.numeroTurno = PacientesUCI.numeroTurno;
                    CateterUci.nuevoRegistro.fechaHoraTurno = PacientesUCI.fechaHoraTurno;
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
            let registros = VentilacionUci.registros.filter(_v => _v.fechaHoraTurno == PacientesUCI.fechaHoraTurno);
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
                    VentilacionUci.nuevoRegistro.numeroTurno = PacientesUCI.numeroTurno;
                    VentilacionUci.nuevoRegistro.fechaHoraTurno = PacientesUCI.fechaHoraTurno;
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
            let registros = HemodialisisUci.registros.filter(_v => _v.fechaHoraTurno == PacientesUCI.fechaHoraTurno);
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
                    HemodialisisUci.nuevoRegistro.numeroTurno = PacientesUCI.numeroTurno;
                    HemodialisisUci.nuevoRegistro.fechaHoraTurno = PacientesUCI.fechaHoraTurno;
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
            let registros = MarcapasosUci.registros.filter(_v => _v.fechaHoraTurno == PacientesUCI.fechaHoraTurno);
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
                    MarcapasosUci.nuevoRegistro.numeroTurno = PacientesUCI.numeroTurno;
                    MarcapasosUci.nuevoRegistro.fechaHoraTurno = PacientesUCI.fechaHoraTurno;
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
            let registros = OxigenacionUci.registros.filter(_v => _v.fechaHoraTurno == PacientesUCI.fechaHoraTurno);
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
                    OxigenacionUci.nuevoRegistro.numeroTurno = PacientesUCI.numeroTurno;
                    OxigenacionUci.nuevoRegistro.fechaHoraTurno = PacientesUCI.fechaHoraTurno;
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

    static setTurnoSeccionMedidas(_options) {

        let res = [];
        let crear = false;

        if (MedidasUci.allRegistros.length == 0) {
            crear = true;
        }

        /*

        if (VentilatoriosUci.registros.length > 0) {
            let registros = VentilatoriosUci.registros.filter(_v => _v.fechaHoraTurno == PacientesUCI.fechaHoraTurno);
            if (registros.length == 0) {
                crear = true;
            }
        }

        */



        if (crear) {
            _options.map((option) => {
                if (option.value != 0) {
                    MedidasUci.iniciarRegistro();
                    MedidasUci.nuevoRegistro.id = option.id;
                    MedidasUci.nuevoRegistro.medida = option.value;
                    MedidasUci.nuevoRegistro.orden = option.getAttribute('orden');
                    MedidasUci.nuevoRegistro.rango = option.getAttribute('rango');
                    MedidasUci.nuevoRegistro.instrumento = option.getAttribute('instrumento');
                    MedidasUci.nuevoRegistro.numeroTurno = PacientesUCI.numeroTurno;
                    MedidasUci.nuevoRegistro.fechaHoraTurno = PacientesUCI.fechaHoraTurno;
                    res.push(MedidasUci.nuevoRegistro);
                    MedidasUci.nuevoRegistro = null;
                }
            });

            MedidasUci.allRegistros.push.apply(MedidasUci.allRegistros, res);

            // Asignar Nro
            MedidasUci.allRegistros.map((_v, _i) => {
                MedidasUci.allRegistros[_i].nro = (_i + 1);
            });


            FecthUci.registrarAllSeccion(MedidasUci.allRegistros);

        }


    }

    static setTurnoSeccionComburTest(_options) {

        let res = [];
        let crear = false;

        if (ComburTestUci.allRegistros.length == 0) {
            crear = true;
        }

        /*

        if (VentilatoriosUci.registros.length > 0) {
            let registros = VentilatoriosUci.registros.filter(_v => _v.fechaHoraTurno == PacientesUCI.fechaHoraTurno);
            if (registros.length == 0) {
                crear = true;
            }
        }

        */



        if (crear) {
            _options.map((option) => {
                if (option.value != 0) {
                    ComburTestUci.iniciarRegistro();
                    ComburTestUci.nuevoRegistro.id = option.id;
                    ComburTestUci.nuevoRegistro.medida = option.value;
                    ComburTestUci.nuevoRegistro.orden = option.getAttribute('orden');
                    ComburTestUci.nuevoRegistro.numeroTurno = PacientesUCI.numeroTurno;
                    ComburTestUci.nuevoRegistro.fechaHoraTurno = PacientesUCI.fechaHoraTurno;
                    res.push(ComburTestUci.nuevoRegistro);
                    ComburTestUci.nuevoRegistro = null;
                }
            });

            ComburTestUci.allRegistros.push.apply(ComburTestUci.allRegistros, res);

            // Asignar Nro
            ComburTestUci.allRegistros.map((_v, _i) => {
                ComburTestUci.allRegistros[_i].nro = (_i + 1);
            });


            FecthUci.registrarAllSeccion(ComburTestUci.allRegistros);

        }


    }

    static setTurnoSeccionGasesMed(_options) {

        let res = [];
        let crear = false;

        if (GasesMedUci.allRegistros.length == 0) {
            crear = true;
        }

        /*

        if (VentilatoriosUci.registros.length > 0) {
            let registros = VentilatoriosUci.registros.filter(_v => _v.fechaHoraTurno == PacientesUCI.fechaHoraTurno);
            if (registros.length == 0) {
                crear = true;
            }
        }

        */



        if (crear) {
            _options.map((option) => {
                if (option.value != 0) {
                    GasesMedUci.iniciarRegistro();
                    GasesMedUci.nuevoRegistro.id = option.id;
                    GasesMedUci.nuevoRegistro.medida = option.value;
                    GasesMedUci.nuevoRegistro.orden = option.getAttribute('orden');
                    GasesMedUci.nuevoRegistro.numeroTurno = PacientesUCI.numeroTurno;
                    GasesMedUci.nuevoRegistro.fechaHoraTurno = PacientesUCI.fechaHoraTurno;
                    res.push(GasesMedUci.nuevoRegistro);
                    GasesMedUci.nuevoRegistro = null;
                }
            });

            GasesMedUci.allRegistros.push.apply(GasesMedUci.allRegistros, res);

            // Asignar Nro
            GasesMedUci.allRegistros.map((_v, _i) => {
                GasesMedUci.allRegistros[_i].nro = (_i + 1);
            });


            FecthUci.registrarAllSeccion(GasesMedUci.allRegistros);

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
            let registros = VentilatoriosUci.registros.filter(_v => _v.fechaHoraTurno == PacientesUCI.fechaHoraTurno);
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
                    VentilatoriosUci.nuevoRegistro.numeroTurno = PacientesUCI.numeroTurno;
                    VentilatoriosUci.nuevoRegistro.fechaHoraTurno = PacientesUCI.fechaHoraTurno;
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

    static setTurnoSeccionGases(_options) {

        let res = [];
        let crear = false;

        if (GasesUci.allRegistros.length == 0) {
            crear = true;
        }


        if (crear) {
            _options.map((option) => {
                if (option.value != 0) {
                    GasesUci.iniciarRegistro();
                    GasesUci.nuevoRegistro.id = option.id;
                    GasesUci.nuevoRegistro.orden = option.getAttribute('orden');
                    GasesUci.nuevoRegistro.gas = option.value;
                    GasesUci.nuevoRegistro.numeroTurno = PacientesUCI.numeroTurno;
                    GasesUci.nuevoRegistro.fechaHoraTurno = PacientesUCI.fechaHoraTurno;
                    res.push(GasesUci.nuevoRegistro);
                    GasesUci.nuevoRegistro = null;
                }
            });

            GasesUci.allRegistros.push.apply(GasesUci.allRegistros, res);

            // Asignar Nro
            GasesUci.allRegistros.map((_v, _i) => {
                GasesUci.allRegistros[_i].nro = (_i + 1);
            });


            FecthUci.registrarAllSeccion(GasesUci.allRegistros);

        }


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
                    title: "Gestionar:",
                },
                {
                    title: "Abrir/Cerrar:",
                },
                {
                    title: "Asumir:",
                },
                {
                    title: "Cancelar:",
                }
            ],
            aoColumnDefs: [{
                    fnCreatedCell: function(nTd, sData, oData, iRow, iCol) {



                        return m.mount(nTd, {
                            view: () => {
                                return [
                                    m('div.text-center', [
                                        m("button.btn-xs.btn-block.tx-semibold.tx-15[type='button']", {
                                                class: (PacientesUCI.fechaHoraTurno == oData.fechaHoraTurno && oData.gestion == 1 ? 'bg-warning' : 'bg-light')
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
                    width: '15%',
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
                                            id: 'horaTurno' + iRow,
                                            disabled: _d,
                                            oncreate: (el) => {
                                                if (oData.horaTurno !== undefined) {
                                                    el.dom.value = oData.horaTurno;
                                                }
                                                setTimeout(() => {
                                                    new Cleave("#horaTurno" + iRow, {
                                                        time: true,
                                                        timePattern: ['h', 'm']
                                                    });
                                                }, 50);
                                            },
                                            oninput: (e) => {
                                                setTimeout(() => {
                                                    TurnosUci.nuevoTurno.horaTurno = e.target.value;
                                                }, 50);
                                            },
                                            onkeypress: (e) => {
                                                if (e.keyCode == 13) {
                                                    _d = true;
                                                    PacientesUCI.fechaHoraTurno = oData.fechaHoraTurno;
                                                    FecthUci.actualizarHoraAtencion();
                                                }
                                            },
                                        }),
                                        m("div.input-group-append", {
                                                class: (oData.status == 1 && oData.statusHora == 1 ? '' : 'd-none')
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
                    width: '15%',
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
                                                class: (oData.status == 1 || oData.status == 4 ? 'bg-warning' : 'bg-success'),
                                            },
                                            (oData.status == 1 ? 'Turno Abierto' : ''),
                                            (oData.status == 2 ? 'Turno Cerrado' : ''),
                                            (oData.status == 4 ? 'Turno Abierto' : ''),
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
                                        m("button.btn.btn-xs.btn-block.btn-success.tx-13.tx-semibold[type='button']", {
                                                disabled: (oData.status == 1 && FecthUci.loaderSecciones == true ? '' : 'disabled'),
                                                onclick: () => {

                                                    oData.statusHora = 2;
                                                    TurnosUci.nuevoTurno = oData;

                                                    oData.iniciarGestion();

                                                    PacientesUCI.fechaHoraTurno = oData.fechaTurno + ' ' + oData.horaTurno;

                                                    // CuidadosUci2.registros = PacientesUCI.parseSeccionCuidadosGenerales(Array.from(document.getElementById('sec_CuidadosGenerales').options));
                                                    // PacientesUCI.setTurnoSeccionCuidadosGenerales(Array.from(document.getElementById('sec_CuidadosGenerales').options))

                                                    //    CateterUci.registros = PacientesUCI.parseSeccionCateter(Array.from(document.getElementById('sec_Cateter').options));
                                                    //   PacientesUCI.setTurnoSeccionCateter(Array.from(document.getElementById('sec_Cateter').options));

                                                    //   VentilacionUci.registros = PacientesUCI.parseSeccionVentilacion(Array.from(document.getElementById('sec_Ventilacion').options));
                                                    //   PacientesUCI.setTurnoSeccionVentilacion(Array.from(document.getElementById('sec_Ventilacion').options));

                                                    // HemodialisisUci.registros = PacientesUCI.parseSeccionHemodialisis(Array.from(document.getElementById('sec_Hemodialisis').options));
                                                    //  PacientesUCI.setTurnoSeccionHemodialisis(Array.from(document.getElementById('sec_Hemodialisis').options));

                                                    //  MarcapasosUci.registros = PacientesUCI.parseSeccionMarcapasos(Array.from(document.getElementById('sec_Marcapasos').options));
                                                    //  PacientesUCI.setTurnoSeccionMarcapasos(Array.from(document.getElementById('sec_Marcapasos').options));

                                                    //   VentilatoriosUci.allRegistros = PacientesUCI.parseSeccionVentilatorios_AllRegistros(Array.from(document.getElementById('sec_Ventilatorios').options));
                                                    //    PacientesUCI.setTurnoSeccionVentilatorios(Array.from(document.getElementById('sec_Ventilatorios').options));
                                                    //    VentilatoriosUci.registros = PacientesUCI.parseSeccionVentilatorios_v2(Array.from(document.getElementById('sec_Ventilatorios').options));

                                                    //  GasesUci.allRegistros = PacientesUCI.parseSeccionGases_AllRegistros(Array.from(document.getElementById('sec_Gases').options));
                                                    //  PacientesUCI.setTurnoSeccionGases(Array.from(document.getElementById('sec_Gases').options));
                                                    //  GasesUci.registros = PacientesUCI.parseSeccionGases_v2(Array.from(document.getElementById('sec_Gases').options));

                                                    OxigenacionUci.registros = PacientesUCI.parseSeccionOxigenacion(Array.from(document.getElementById('sec_Oxigenacion').options));
                                                    PacientesUCI.setTurnoSeccionOxigenacion(Array.from(document.getElementById('sec_Oxigenacion').options));

                                                    // MedidasUci.allRegistros = PacientesUCI.parseSeccionMedidas_AllRegistros(Array.from(document.getElementById('sec_Medidas').options));
                                                    // PacientesUCI.setTurnoSeccionMedidas(Array.from(document.getElementById('sec_Medidas').options));
                                                    // MedidasUci.registros = PacientesUCI.parseSeccionMedidas_v2(Array.from(document.getElementById('sec_Medidas').options));

                                                    //  ComburTestUci.allRegistros = PacientesUCI.parseSeccionComburTest_AllRegistros(Array.from(document.getElementById('sec_ComburTest').options));
                                                    //  PacientesUCI.setTurnoSeccionComburTest(Array.from(document.getElementById('sec_ComburTest').options));
                                                    //  ComburTestUci.registros = PacientesUCI.parseSeccionComburTest_v2(Array.from(document.getElementById('sec_ComburTest').options));

                                                    //  GasesMedUci.allRegistros = PacientesUCI.parseSeccionGasesMed_AllRegistros(Array.from(document.getElementById('sec_GasesMed').options));
                                                    //  PacientesUCI.setTurnoSeccionGasesMed(Array.from(document.getElementById('sec_GasesMed').options));
                                                    //  GasesMedUci.registros = PacientesUCI.parseSeccionGasesMed_v2(Array.from(document.getElementById('sec_GasesMed').options));

                                                    //  PrescripcionesUci.allRegistros = PacientesUCI.parseSeccionPrescripcionesUci_AllRegistros(Array.from(document.getElementById('sec_PrescripcionesUci').options));
                                                    //  PrescripcionesUci.registros = PacientesUCI.parseSeccionPrescripcionesUci_v2(Array.from(document.getElementById('sec_PrescripcionesUci').options));


                                                    PacientesUCI.showSecciones();
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
                                    m('div.text-center', {
                                        class: (FecthUci.loaderSecciones == false ? '' : 'd-none'),
                                    }, [
                                        m("button.btn.btn-xs.btn-block.btn-secondary.tx-13.tx-semibold[type='button']", {
                                                disabled: 'disabled',
                                            },
                                            'Espere...',
                                        ),
                                    ]),
                                    m('div.text-center', {

                                        class: ((oData.status == 1 || oData.status == 4) && FecthUci.loaderSecciones == true ? '' : 'd-none'),
                                    }, [
                                        m("button.btn.btn-xs.btn-block.btn-danger.tx-13.tx-semibold[type='button']", {
                                                disabled: ((oData.status == 1 || oData.status == 4) && FecthUci.loaderSecciones == true ? '' : 'disabled'),
                                                onclick: () => {
                                                    FecthUci.loaderSecciones = false;
                                                    oData.cerrarTurno();
                                                    FecthUci.cerrarTurno(oData);
                                                },
                                            },
                                            'Cerrar',
                                        ),


                                    ]),
                                    m('div.text-center', {
                                        class: (oData.status == 2 && FecthUci.loaderSecciones == true ? '' : 'd-none'),
                                    }, [
                                        m("button.btn.btn-xs.btn-block.btn-success.tx-13.tx-semibold[type='button']", {
                                                disabled: (oData.status == 2 && oData.numeroTurno == PacientesUCI.numeroTurno && FecthUci.loaderSecciones == true ? '' : 'disabled'),
                                                onclick: () => {
                                                    FecthUci.loaderSecciones = false;
                                                    oData.reAbrirTurno();
                                                    FecthUci.reAbrirTurno(oData);
                                                },
                                            },
                                            'Abrir',
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

                },
                {
                    fnCreatedCell: function(nTd, sData, oData, iRow, iCol) {
                        return m.mount(nTd, {
                            view: () => {
                                return [
                                    m('div.text-center', [
                                        m("button.btn.btn-xs.btn-block.btn-warning.tx-13.tx-semibold[type='button']", {
                                                disabled: (oData.status == 1 && FecthUci.loaderSecciones == true ? '' : 'disabled'),

                                                onclick: () => {

                                                    $.confirm({
                                                        title: '¿Asumir?',
                                                        content: '' +
                                                            '<form action="" class="formName">' +
                                                            '<div class="form-group ">' +
                                                            '<label>Comentario:</label>' +
                                                            '<textarea placeholder="Comentario" class="comment form-control wd-100p" rows="3" required></textarea>' +
                                                            '</div>' +
                                                            '</form>',
                                                        buttons: {
                                                            formSubmit: {
                                                                text: 'Confirmar',
                                                                btnClass: 'btn-success op-8',
                                                                action: function() {
                                                                    let comment = this.$content.find('.comment').val();
                                                                    if (!comment) {
                                                                        $.alert('Un comentario es obligatorio.');
                                                                        return false;
                                                                    }
                                                                    // $.alert('Ud asumira todos los registros de esta turno.');
                                                                    FecthUci.loaderSecciones = false;
                                                                    FecthUci.asumirTurno(oData, PacientesUCI.usuarioTurno, comment);
                                                                }
                                                            },
                                                            cancel: {
                                                                btnClass: "btn-danger op-8",
                                                                text: 'Cancelar',
                                                            }

                                                        }

                                                    });

                                                },
                                            },
                                            'Asumir',
                                        ),

                                    ])

                                ]
                            }
                        });
                    },
                    width: '10%',
                    visible: true,
                    aTargets: [9],
                    orderable: false,

                },
                {
                    fnCreatedCell: function(nTd, sData, oData, iRow, iCol) {
                        return m.mount(nTd, {
                            view: () => {
                                return [
                                    m('div.text-center', [
                                        m("button.btn.btn-xs.btn-block.btn-danger.tx-13.tx-semibold[type='button']", {
                                                disabled: ((oData.status == 1 || oData.status == 4) && FecthUci.loaderSecciones == true ? '' : 'disabled'),

                                                onclick: () => {

                                                    $.confirm({
                                                        title: '¿Cancelar?',
                                                        content: '' +
                                                            '<form action="" class="formName">' +
                                                            '<div class="form-group ">' +
                                                            '<label>Comentario:</label>' +
                                                            '<textarea placeholder="Comentario" class="comment form-control wd-100p" rows="3" required></textarea>' +
                                                            '</div>' +
                                                            '</form>',
                                                        buttons: {
                                                            formSubmit: {
                                                                text: 'Confirmar',
                                                                btnClass: 'btn-success op-8',
                                                                action: function() {
                                                                    let comment = this.$content.find('.comment').val();
                                                                    if (!comment) {
                                                                        $.alert('Un comentario es obligatorio.');
                                                                        return false;
                                                                    }
                                                                    // $.alert('Ud asumira todos los registros de esta turno.');
                                                                    FecthUci.loaderSecciones = false;
                                                                    FecthUci.cancelarTurno(oData, PacientesUCI.usuarioTurno, comment);
                                                                }
                                                            },
                                                            cancel: {
                                                                btnClass: "btn-danger op-8",
                                                                text: 'Cancelar',
                                                            }

                                                        }

                                                    });

                                                },
                                            },
                                            'Cancelar',
                                        ),

                                    ])

                                ]
                            }
                        });
                    },
                    width: '10%',
                    visible: true,
                    aTargets: [10],
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
            PacientesUCI.vMain()
        ];
    }
}


export default PacientesUCI;