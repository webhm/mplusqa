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
import CuidadosUci2 from "./cuidadosUci2";
import MarcapasosUci from "./marcapasos";
import FecthUci from "./fecthUci";
import VentilatoriosUci from "./ventilatorios";
import GasesUci from "./gasesUci";
import OxigenacionUci from "./oxigenacionUci";


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

    constructor(_data) {

        super();
        App.setTitle("Pacientes U.C.I.");
        this.view = PacientesUCI.page;
        PacientesUCI.numeroHistoriaClinica = _data.attrs.numeroHistoriaClinica;
        PacientesUCI.numeroAtencion = _data.attrs.numeroAtencion;
        PacientesUCI.numeroTurno = (_data.attrs.numeroTurno !== undefined ? _data.attrs.numeroTurno : null);
        PacientesUCI.usuarioTurno = _data.attrs.usuario;
        PacientesUCI.validarAtencion();

    }

    oncreate(_data) {
        console.log('data', _data);
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

        CuidadosUci2.show = true;

        ViasUci.show = true;
        ViasUci.registros = PacientesUCI.parseSeccion(Array.from(document.getElementById('sec_Vias').options));

        AccesosUci.show = true;
        AccesosUci.registros = PacientesUCI.parseSeccion(Array.from(document.getElementById('sec_Accesos').options));

        CateterUci.show = true;

        VentilacionUci.show = true;

        HemodialisisUci.show = true;

        CultivosUci.show = true;
        CultivosUci.registros = PacientesUCI.parseSeccion(Array.from(document.getElementById('sec_Cultivos').options));

        MarcapasosUci.show = true;

        GasesUci.show = true;
        GasesUci.registros = PacientesUCI.parseSeccion(Array.from(document.getElementById('sec_Gases').options));

        OxigenacionUci.show = true;

        VentilatoriosUci.show = true;

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
                                            if (confirm("¿Esta Ud seguro de registrar un nuevo turno para este paciente?") == true) {
                                                TurnosUci.iniciarTurno();
                                                PacientesUCI.vReloadTable('table-turnos', TurnosUci.getTurnos());

                                            }



                                        }
                                    }, "Registrar Nuevo Turno"),
                                    (FecthUci.dataSecciones.length > 0 ? [
                                        m("button.btn.btn-xs.btn-secondary.tx-semibold.tx-14[type='button']", {
                                            onclick: () => {
                                                m.route.set('/uci/pacientes/historial/', {
                                                    numeroHistoriaClinica: PacientesUCI.numeroHistoriaClinica,
                                                    numeroAtencion: PacientesUCI.numeroAtencion,
                                                    usuario: PacientesUCI.usuarioTurno
                                                })
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
        let ETCO2 = 0;
        let FIO2 = 0;
        let TiempoInspiratorio = 0;
        let RelacionInspiracionEspiracion = 0;
        let ResistenciaInspiratoria = 0;
        let ComplianceEstatica = 0;
        let FRPT = 0;
        let FRV = 0;
        let VolumenMinutoEspiradoPaciente = 0;
        let VolumenMinutoEspiradoMaquina = 0;
        let VolumenTidalEspiradoPaciente = 0;
        let VolumenTidalEspiradoMaquina = 0;
        let PresionSoporte = 0;
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
            if (col.id == 'ETCO2') {
                ETCO2++;
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

        columnas = [VolumenAltaFrecuencia, ModoVentilatorio, PresionInspiratoria, DCO2, AmplitudDO2, Flujo, PresionMediaVia, Hercios, PresionBalonTuboOrotraqueal, NivelTuboOrotraqueal, VolumenFugas, ETCO2, FIO2, TiempoInspiratorio, RelacionInspiracionEspiracion, ResistenciaInspiratoria, ComplianceEstatica, FRPT, FRV, VolumenMinutoEspiradoPaciente, VolumenMinutoEspiradoMaquina, VolumenTidalEspiradoPaciente, VolumenTidalEspiradoMaquina, PresionSoporte, AutoPeep, PEEP, PresionMedia, PresionPico];

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
            if (col.id == 'ETCO2') {
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
                title: "Parámetro:",
            });
            VentilatoriosUci.sColumns.push({
                title: "Hora:",
            });
        }

        VentilatoriosUci.sColumns.push({
            title: "Opciones:",
        });

        VentilatoriosUci.sRows = [];
        VentilatoriosUci.sRows = [{
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
                visible: true,
                aTargets: [2],
                orderable: false,

            },
            {
                mRender: function(data, type, full) {
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
                fnCreatedCell: function(nTd, sData, oData, iRow, iCol) {
                    return m.mount(nTd, {
                        view: () => {
                            return [
                                m('div.text-center.pd-l-0.pd-r-0', {
                                    ondblclick: (e) => {
                                        VentilatoriosUci.nuevoRegistro = null;
                                        valores.filter((v, i) => {

                                            if (v.id == oData.id) {
                                                let _i = v.idObj[index];

                                                console.log(88, _i)
                                                VentilatoriosUci.verRegistro(resultNro[_i]);
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

                                                    VentilatoriosUci.eliminarRegistro(resultNro[_i]);
                                                    FecthUci.eliminarSeccion(resultNro[_i]);
                                                    VentilatoriosUci.nuevoRegistro = null;
                                                    VentilatoriosUci.destroyTable();
                                                    VentilatoriosUci.filterRegistros();
                                                    VentilatoriosUci.show = false;
                                                    m.redraw();
                                                    setTimeout(() => {
                                                        VentilatoriosUci.show = true;
                                                        m.redraw();
                                                    }, 100);
                                                }
                                            })


                                        }
                                    },
                                    oncreate: (el) => {
                                        valores.filter((v, i) => {

                                            if (v.id == oData.id) {
                                                let _i = v.idObj[index];

                                                if (resultNro[_i] !== undefined) {
                                                    if (resultNro[_i].condicion !== null) {
                                                        el.dom.innerHTML = resultNro[_i].condicion;
                                                    } else {
                                                        el.dom.innerHTML = '<button type="button" class="btn btn-xs btn-success btn-block tx-12">Registrar</button>';
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
                fnCreatedCell: function(nTd, sData, oData, iRow, iCol) {
                    return m.mount(nTd, {
                        view: () => {
                            return [
                                m('div.text-center.pd-l-0.pd-r-0', {
                                    ondblclick: (e) => {
                                        VentilatoriosUci.nuevoRegistro = null
                                        valores.filter((v, i) => {

                                            if (v.id == oData.id) {
                                                let _i = v.idObj[index];
                                                VentilatoriosUci.verRegistro(resultNro[_i]);
                                            }
                                        })

                                    },
                                    oncreate: (el) => {
                                        valores.filter((v, i) => {

                                            if (v.id == oData.id) {
                                                let _i = v.idObj[index];

                                                if (resultNro[_i] !== undefined) {
                                                    if (resultNro[_i].hora !== null) {
                                                        el.dom.innerHTML = resultNro[_i].hora;
                                                    } else {
                                                        el.dom.innerHTML = '';
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

        VentilatoriosUci.sRows.push({
            fnCreatedCell: function(nTd, sData, oData, iRow, iCol) {
                return m.mount(nTd, {
                    view: () => {
                        return [
                            m("div.btn-block.btn-group.wd-100p.pd-5", [

                                m("button.btn.btn-xs.btn-block.btn-danger[type='button']", {
                                        class: (VentilatoriosUci.nuevoRegistro !== null && VentilatoriosUci.nuevoRegistro.editar && VentilatoriosUci.nuevoRegistro.id == oData.id ? '' : 'd-none'),
                                        disabled: (PacientesUCI.fechaHoraTurno != oData.fechaHoraTurno ? 'disabled' : ''),
                                        onclick: () => {
                                            oData.editar = null;
                                            VentilatoriosUci.nuevoRegistro = null;
                                        },
                                    },
                                    'Cancelar Edición',
                                ),
                                m("button.btn.btn-xs.btn-dark[type='button']", {
                                        //class: (PacientesUCI.fechaHoraTurno != oData.fechaHoraTurno ? '' : 'd-none'),
                                        onclick: () => {

                                            if (oData.condicion == null) {
                                                alert('No se permite copiar. Ya existe un registro disponible.');
                                                throw 'No se permite copiar. Ya existe un registro disponible.'
                                            }

                                            VentilatoriosUci.iniciarRegistro();
                                            VentilatoriosUci.nuevoRegistro.id = oData.id;
                                            VentilatoriosUci.nuevoRegistro.ventilatorio = oData.ventilatorio;
                                            VentilatoriosUci.nuevoRegistro.orden = oData.orden;
                                            VentilatoriosUci.nuevoRegistro.numeroTurno = PacientesUCI.numeroTurno;
                                            VentilatoriosUci.nuevoRegistro.fechaHoraTurno = PacientesUCI.fechaHoraTurno;

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

        VentilatoriosUci.sRows.map((c, i) => {
            VentilatoriosUci.sRows[i].aTargets = [i];
        })


        return _arr;

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
            // pageLength: 3,
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
                                                el.dom.value = oData.usuarioTurno;
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
                                                disabled: (oData.status == 1 && FecthUci.loaderSecciones == true ? '' : 'disabled'),
                                                onclick: () => {
                                                    TurnosUci.nuevoTurno = oData;
                                                    oData.iniciarGestion();
                                                    PacientesUCI.fechaHoraTurno = oData.fechaTurno + ' ' + oData.horaTurno;

                                                    CuidadosUci2.registros = PacientesUCI.parseSeccionCuidadosGenerales(Array.from(document.getElementById('sec_CuidadosGenerales').options));
                                                    PacientesUCI.setTurnoSeccionCuidadosGenerales(Array.from(document.getElementById('sec_CuidadosGenerales').options))

                                                    CateterUci.registros = PacientesUCI.parseSeccionCateter(Array.from(document.getElementById('sec_Cateter').options));
                                                    PacientesUCI.setTurnoSeccionCateter(Array.from(document.getElementById('sec_Cateter').options));

                                                    VentilacionUci.registros = PacientesUCI.parseSeccionVentilacion(Array.from(document.getElementById('sec_Ventilacion').options));
                                                    PacientesUCI.setTurnoSeccionVentilacion(Array.from(document.getElementById('sec_Ventilacion').options));

                                                    HemodialisisUci.registros = PacientesUCI.parseSeccionHemodialisis(Array.from(document.getElementById('sec_Hemodialisis').options));
                                                    PacientesUCI.setTurnoSeccionHemodialisis(Array.from(document.getElementById('sec_Hemodialisis').options));

                                                    MarcapasosUci.registros = PacientesUCI.parseSeccionMarcapasos(Array.from(document.getElementById('sec_Marcapasos').options));
                                                    PacientesUCI.setTurnoSeccionMarcapasos(Array.from(document.getElementById('sec_Marcapasos').options));

                                                    VentilatoriosUci.allRegistros = PacientesUCI.parseSeccionVentilatorios_AllRegistros(Array.from(document.getElementById('sec_Ventilatorios').options));
                                                    PacientesUCI.setTurnoSeccionVentilatorios(Array.from(document.getElementById('sec_Ventilatorios').options));
                                                    VentilatoriosUci.registros = PacientesUCI.parseSeccionVentilatorios_v2(Array.from(document.getElementById('sec_Ventilatorios').options));


                                                    OxigenacionUci.registros = PacientesUCI.parseSeccionOxigenacion(Array.from(document.getElementById('sec_Oxigenacion').options));
                                                    PacientesUCI.setTurnoSeccionOxigenacion(Array.from(document.getElementById('sec_Oxigenacion').options));

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
                                    m('div.text-center', [
                                        m("button.btn.btn-xs.btn-block.btn-danger.tx-13[type='button']", {
                                                disabled: (oData.status == 1 && FecthUci.loaderSecciones == true ? '' : 'disabled'),

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
            PacientesUCI.vMain()
        ];
    }
}


export default PacientesUCI;