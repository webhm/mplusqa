import m from "mithril";
import PacientesUCI from "./pacientesUci";
import TurnosUci from "./turnosUci";
import FecthUci from "./fecthUci";

class Ventilatorio {
    id = null;
    orden = null;
    nro = null;
    fechaHoraTurno = null;
    ventilatorio = null;
    condicion = null;
    hora = null;
    editar = null;
    seccion = 'Ventilatorios';
    constructor() {
        this.id = this.id;
        this.orden = this.orden;
        this.nro = this.nro;
        this.fechaHoraTurno = this.fechaHoraTurno;
        this.ventilatorio = this.ventilatorio;
        this.condicion = this.condicion;
        this.hora = this.hora;
        this.editar = this.editar;
        this.seccion = this.seccion;
    }
}


class VentilatoriosUci {
    static registros = [];
    static allRegistros = [];
    static nuevoRegistro = null;
    static show = false;
    static setHora = null;
    static setCondicion = null;
    static sCells = [];
    static sRowsHeaders = [];
    static sColumns = [];
    static sRows = [];

    static validarRegistro() {

    }
    static iniciarRegistro() {
        VentilatoriosUci.nuevoRegistro = new Ventilatorio();
    }
    static agregarRegistro() {

        if (VentilatoriosUci.allRegistros.length == 0) {
            VentilatoriosUci.nuevoRegistro.nro = 1;
            VentilatoriosUci.allRegistros.push(VentilatoriosUci.nuevoRegistro);
        } else {
            VentilatoriosUci.nuevoRegistro.nro = (VentilatoriosUci.allRegistros[VentilatoriosUci.allRegistros.length - 1].nro + 1);
            VentilatoriosUci.allRegistros.push(VentilatoriosUci.nuevoRegistro);
        }
    }
    static verRegistro(registro) {
        registro.editar = true;
        VentilatoriosUci.nuevoRegistro = registro;
        console.log(VentilatoriosUci.nuevoRegistro)
    }
    static editarRegistro() {
        VentilatoriosUci.nuevoRegistro.editar = null;
        VentilatoriosUci.allRegistros.map((_v, _i) => {
            if (_v.nro == VentilatoriosUci.nuevoRegistro.nro) {
                VentilatoriosUci.allRegistros[_i] = VentilatoriosUci.nuevoRegistro;
            }
        });

    }
    static eliminarRegistro(obj) {


        let hash = {};
        let res = [];
        let _arr = [];
        let result = [];
        let resultNro = [];

        VentilatoriosUci.allRegistros.map((_v, _i) => {
            if (_v.nro !== obj.nro) {
                res.push(_v);
            }
        });

        result = res.sort((a, b) => b.nro - a.nro);
        // Quitar duplicados
        resultNro = result.filter(o => hash[o.nro] ? false : hash[o.nro] = true);

        _arr = resultNro.sort((a, b) => a.nro - b.nro);

        VentilatoriosUci.allRegistros = _arr;

    }

    static filterRegistros() {

        let result = [];
        let resultId = [];
        let resultNro = [];
        let _arr = [];
        let hash = {};
        let columnas = [];
        let filas = [];
        let valores = [];

        result = VentilatoriosUci.allRegistros;

        console.log(11, result)
        // Quitar duplicados
        resultNro = result.filter(o => hash[o.nro] ? false : hash[o.nro] = true);
        // Quitar duplicados
        resultId = resultNro.filter(o => hash[o.id] ? false : hash[o.id] = true);

        // 'data-orden'ar desc
        _arr = resultId.sort((a, b) => a.orden - b.orden);

        VentilatoriosUci.registros = _arr;

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

        columnas = [VolumenAltaFrecuencia, ModoVentilatorio, PresionInspiratoria, DCO2, AmplitudDO2, Flujo, PresionMediaVia, Hercios, PresionBalonTuboOrotraqueal, NivelTuboOrotraqueal, VolumenFugas, FIO2, TiempoInspiratorio, RelacionInspiracionEspiracion, ResistenciaInspiratoria, ComplianceEstatica, FRPT, FRV, VolumenMinutoEspiradoPaciente, VolumenMinutoEspiradoMaquina, VolumenTidalEspiradoPaciente, VolumenTidalEspiradoMaquina, PresionSoporte, AutoPeep, PEEP, PresionMedia, PresionPico];

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

        // 'data-orden'ar Columnas
        let orderCol = columnas.sort((a, b) => b - a);

        if (orderCol[0] == 0) {
            orderCol[0] = 1;
        }

        for (let index = 0; index < orderCol[0]; index++) {
            VentilatoriosUci.sColumns.push({
                title: "Condición:",
            });
            VentilatoriosUci.sColumns.push({
                title: "Hora:",
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
            mRender: function (data, type, full) {
                return full.ventilatorio;
            },

            visible: true,
            aTargets: [3],
            orderable: true,

        },
        ];

        // 'data-orden'ar Filas
        for (let index = 0; index < orderCol[0]; index++) {
            VentilatoriosUci.sRows.push({
                fnCreatedCell: function (nTd, sData, oData, iRow, iCol) {
                    return m.mount(nTd, {
                        view: () => {
                            return [
                                m('div.text-center.pd-l-0.pd-r-0', {

                                    oncreate: (el) => {
                                        valores.filter((v, i) => {
                                            let _i = v.idObj[index];
                                            if (v.id == oData.id) {
                                                if (resultNro[_i] !== undefined) {
                                                    if (resultNro[_i].condicion !== null) {
                                                        el.dom.innerHTML = (resultNro[_i].condicion == 'undefined' ? 1 : resultNro[_i].condicio);

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

                                    oncreate: (el) => {
                                        valores.filter((v, i) => {
                                            let _i = v.idObj[index];
                                            if (v.id == oData.id) {
                                                if (resultNro[_i] !== undefined) {
                                                    if (resultNro[_i].hora !== null) {
                                                        if (resultNro[_i].hora == 'UNDEFINED') {

                                                            el.dom.innerHTML = '<div class="text-center tx-danger pd-l-0 pd-r-0"><hr style="border-color:#001737;"/></div>';
                                                        } else {
                                                            el.dom.innerHTML = resultNro[_i].hora;
                                                        }
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
        });


    }

    static destroyTable() {
        let table = document.getElementById('table-ventilatorios');
        // clear first
        if (table != null) {
            $('#table-ventilatorios').DataTable().clear().destroy();

        }
    }

    static getRegistros() {
        return VentilatoriosUci.registros;
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

            },
            cache: false,
            destroy: true,
            order: false,
            pageLength: 100,
            columns: VentilatoriosUci.sColumns,
            aoColumnDefs: VentilatoriosUci.sRows,
            fnRowCallback: function (nRow, aData, iDisplayIndex, iDisplayIndexFull) {

            },
        };
    }

    view() {
        return [
            m("thead.bd.bd-2", {
                style: { "border-color": "#5173a1" },
                class: (FecthUci.dataHistorial.length !== 0 ? '' : 'd-none'),

            },
                m("tr.tx-uppercase", {

                    style: { "background-color": "#CCCCFF" },
                    onclick: () => {
                        VentilatoriosUci.show = !VentilatoriosUci.show;
                    }

                }, [
                    m("th.tx-semibold[scope='col'][colspan='12']",
                        "MODOS VENTILATORIOS / VARIABLES"
                    ),

                ])
            ),
            m("tbody.bd.bd-2", {
                style: { "border-color": "#5173a1" },
                class: (VentilatoriosUci.show ? '' : 'd-none')
            }, [



                m("tr.bd.bd-2.tx-uppercase", {
                    style: { "background-color": "rgb(238, 249, 200)", "border-color": "#5173a1" },
                    class: (TurnosUci.nuevoTurno !== null && TurnosUci.nuevoTurno.gestion == 1 ? '' : 'd-none'),
                }, [
                    m("th[scope='col'][colspan='4']",
                        "VENTILATORIOS/VARIABLES:"
                    ),
                    m("th[scope='col'][colspan='4']",
                        "CONDICIÓN: "
                    ),
                    m("th[scope='col'][colspan='4']",
                        "HORA: "
                    ),


                ]),
                m("tr.bd.bd-2", {
                    style: { "border-color": "#5173a1" },
                    class: (TurnosUci.nuevoTurno !== null && TurnosUci.nuevoTurno.gestion == 1 ? '' : 'd-none'),
                }, [
                    m("td.tx-14.tx-normal[colspan='3']",
                        (VentilatoriosUci.nuevoRegistro !== null ? [
                            m('div.d-flex', [
                                m("input", {
                                    class: "form-control tx-semibold tx-14",
                                    type: "text",
                                    placeholder: "...",
                                    disabled: true,
                                    value: VentilatoriosUci.nuevoRegistro.ventilatorio,
                                })

                            ]),
                        ] : [])
                    ),
                    m("td.tx-14.tx-normal.d-none[colspan='4']",
                        m('select.tx-semibold', {
                            id: 'sec_Ventilatorios',
                            disabled: true,
                            onchange: (e) => {
                                let _id = e.target.options[e.target.selectedIndex].id;
                                let _value = e.target.options[e.target.selectedIndex].value;
                                VentilatoriosUci.iniciarRegistro();
                                VentilatoriosUci.nuevoRegistro.id = _id;
                                VentilatoriosUci.nuevoRegistro.ventilatorio = _value;
                            },
                            class: "custom-select",
                            value: (VentilatoriosUci.nuevoRegistro !== null ? VentilatoriosUci.nuevoRegistro.ventilatorio : 0),
                        }, m("option[value='0']", 'Seleccione...'), [
                            {
                                orden: 1,
                                id: "ModoVentilatorio",
                                label: "MODO VENTILATORIO"
                            }, {
                                orden: 2,
                                id: "PresionInspiratoria",
                                label: "PRESIÓN INSPIRATORIA"
                            }, {
                                orden: 3,
                                id: "PresionPico",
                                label: "PRESIÓN PICO"
                            }, {
                                orden: 4,
                                id: "PresionMedia",
                                label: "PRESIÓN MEDIA"
                            }, {
                                orden: 5,
                                id: "PEEP",
                                label: "PEEP"
                            }, {
                                orden: 6,
                                id: "AutoPeep",
                                label: "AUTO PEEP"
                            }, {
                                orden: 7,
                                id: "PresionSoporte",
                                label: "PRESIÓN SOPORTE"
                            }, {
                                orden: 8,
                                id: "PorcentajeVolumenMinuto",
                                label: "PORCENTAJE VOLUMEN MINUTO"
                            }, {
                                orden: 9,
                                id: "VolumenTidalEspiradoMaquina",
                                label: "VOLUMEN TIDAL ESPIRADO MÁQUINA"
                            }, {
                                orden: 10,
                                id: "VolumenTidalEspiradoPaciente",
                                label: "VOLUMEN TIDAL ESPIRADO PACIENTE"
                            }, {
                                orden: 11,
                                id: "VolumenMinutoEspiradoMaquina",
                                label: "VOLUMEN MINUTO ESPIRADO MÁQUINA"
                            }, {
                                orden: 12,
                                id: "VolumenMinutoEspiradoPaciente",
                                label: "VOLUMEN MINUTO ESPIRADO PACIENTE"
                            },
                            {
                                orden: 13,
                                id: "FRV",
                                label: "FRECUENCIA RESPIRATORIA MÁQUINA"
                            },
                            {
                                orden: 14,
                                id: "FRPT",
                                label: "FRECUENCIA RESPIRATORIA ESPONTÁNEA"
                            },
                            {
                                orden: 15,
                                id: "ComplianceEstatica",
                                label: "COMPLIANCE ESTÁTICA"
                            },
                            {
                                orden: 16,
                                id: "ComplianceDinamica",
                                label: "COMPLIANCE DINÁMICA"
                            },
                            {
                                orden: 17,
                                id: "ResistenciaInspiratoria",
                                label: "RESISTENCIA INSPIRATORIA"
                            },
                            {
                                orden: 18,
                                id: "RelacionInspiracionEspiracion",
                                label: "RELACIÓN INSPIRACION - ESPIRACION"
                            },
                            {
                                orden: 19,
                                id: "TiempoInspiratorio",
                                label: "TIEMPO INSPIRATORIO"
                            },
                            {
                                orden: 20,
                                id: "FIO2",
                                label: "FIO2"
                            },
                            {
                                orden: 21,
                                id: "VolumenFugas",
                                label: "VOLUMEN FUGAS"
                            },
                            {
                                orden: 22,
                                id: "NivelTuboOrotraqueal",
                                label: "NIVEL TUBO OROTRAQUEAL"
                            },
                            {
                                orden: 23,
                                id: "PresionBalonTuboOrotraqueal",
                                label: "PRESIÓN BALÓN TUBO OROTRAQUEAL"
                            },
                            {
                                orden: 24,
                                id: "Hercios",
                                label: "HERCIOS"
                            },
                            {
                                orden: 25,
                                id: "PresionMediaVia",
                                label: "PRESION MEDIA-VIA"
                            },
                            {
                                orden: 26,
                                id: "Flujo",
                                label: "FLUJO"
                            },
                            {
                                orden: 27,
                                id: "AmplitudDO2",
                                label: "AMPLITUD / DO2"
                            },
                            {
                                orden: 28,
                                id: "DCO2",
                                label: "DCO2"
                            },
                            {
                                orden: 29,
                                id: "VolumenAltaFrecuencia",
                                label: "VOLUMEN ALTA FRECUENCIA"
                            },
                        ].map(x =>
                            m('option[id="' + x.id + '"][orden="' + x.orden + '"]', x.label)
                        ))
                    ),
                    m("td.tx-14.tx-normal[colspan='4']",
                        (VentilatoriosUci.nuevoRegistro !== null ? [
                            m('div.d-flex', [
                                m("input", {
                                    id: "condicion" + VentilatoriosUci.nuevoRegistro.id,
                                    class: "form-control tx-semibold tx-14",
                                    type: "text",
                                    placeholder: "...",
                                    oncreate: (el) => {
                                        if (VentilatoriosUci.nuevoRegistro.condicion != undefined) {
                                            el.dom.value = VentilatoriosUci.nuevoRegistro.condicion;
                                        }
                                    },
                                    oninput: (e) => {
                                        VentilatoriosUci.setCondicion = (e.target.value.length !== 0 ? e.target.value : null);
                                        VentilatoriosUci.nuevoRegistro.condicion = (e.target.value.length !== 0 ? e.target.value : null);
                                    },
                                    value: VentilatoriosUci.nuevoRegistro.condicion
                                })

                            ]),
                        ] : [])
                    ),
                    m("td.tx-14.tx-normal[colspan='4']",
                        (VentilatoriosUci.nuevoRegistro !== null ? [
                            m('div.d-flex', [
                                m("input.form-control[type='text'][placeholder='HH:mm']", {
                                    id: "horaVentilatorio" + VentilatoriosUci.nuevoRegistro.id,
                                    oncreate: (el) => {
                                        if (VentilatoriosUci.nuevoRegistro.hora != undefined) {
                                            el.dom.value = VentilatoriosUci.nuevoRegistro.hora;
                                        }
                                        if (VentilatoriosUci.nuevoRegistro.editar == null) {
                                            if (VentilatoriosUci.setHora != undefined) {
                                                el.dom.value = VentilatoriosUci.setHora;
                                            }
                                        }

                                        setTimeout(() => {
                                            new Cleave("#horaVentilatorio" + VentilatoriosUci.nuevoRegistro.id, {
                                                time: true,
                                                timePattern: ['h', 'm']
                                            });
                                        }, 50);
                                    },
                                    oninput: (e) => {
                                        setTimeout(() => {
                                            //VentilatoriosUci.nuevoRegistro.hora = moment(PacientesUCI.fechaHoraTurno, 'DD-MM-YYYY HH:mm').format('DD-MM-YYYY') + ' ' + e.target.value;
                                            VentilatoriosUci.setHora = (e.target.value.length !== 0 ? e.target.value : null);
                                            VentilatoriosUci.nuevoRegistro.hora = (e.target.value.length !== 0 ? e.target.value : null);

                                        }, 50);
                                    },
                                    onkeypress: (e) => {
                                        if (e.keyCode == 13) {
                                            VentilatoriosUci.nuevoRegistro.numeroTurno = PacientesUCI.numeroTurno;
                                            VentilatoriosUci.nuevoRegistro.fechaHoraTurno = PacientesUCI.fechaHoraTurno;
                                            if (VentilatoriosUci.nuevoRegistro.editar == null) {
                                                VentilatoriosUci.agregarRegistro();
                                                FecthUci.registrarSeccion(VentilatoriosUci.nuevoRegistro);
                                                VentilatoriosUci.nuevoRegistro = null;
                                                VentilatoriosUci.destroyTable();
                                                VentilatoriosUci.filterRegistros();
                                                VentilatoriosUci.show = false;
                                                m.redraw();
                                                setTimeout(() => {
                                                    VentilatoriosUci.show = true;
                                                    m.redraw();
                                                }, 100);
                                            } else {
                                                VentilatoriosUci.editarRegistro();
                                                FecthUci.actualizarSeccion(VentilatoriosUci.nuevoRegistro);
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
                                        }
                                    },
                                }),
                            ]),
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
                        (VentilatoriosUci.show != false ? [PacientesUCI.vTable('table-ventilatorios', VentilatoriosUci.getRegistros(), VentilatoriosUci.arqTable())] : [])
                    ),
                ]),
            ]),
        ]
    }
}

export default VentilatoriosUci;