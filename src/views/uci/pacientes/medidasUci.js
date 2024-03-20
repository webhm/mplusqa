import m from "mithril";
import PacientesUCI from "./pacientesUci";
import TurnosUci from "./turnosUci";
import FecthUci from "./fecthUci";

class Medida {
    id = null;
    orden = null;
    nro = null;
    fechaHoraTurno = null;
    medida = null;
    valor = null;
    hora = null;
    rango = null;
    instrumento = null;
    editar = null;
    seccion = 'Medidas';
    constructor() {
        this.id = this.id;
        this.orden = this.orden;
        this.nro = this.nro;
        this.fechaHoraTurno = this.fechaHoraTurno;
        this.medida = this.medida;
        this.valor = this.valor;
        this.hora = this.hora;
        this.rango = this.rango;
        this.instrumento = this.instrumento;
        this.editar = this.editar;
        this.seccion = this.seccion;
    }
}


class MedidasUci {
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
        MedidasUci.nuevoRegistro = new Medida();
    }
    static agregarRegistro() {

        if (MedidasUci.allRegistros.length == 0) {
            MedidasUci.nuevoRegistro.nro = 1;
            MedidasUci.allRegistros.push(MedidasUci.nuevoRegistro);
        } else {
            MedidasUci.nuevoRegistro.nro = (MedidasUci.allRegistros[MedidasUci.allRegistros.reverse().length - 1].nro + 1);
            MedidasUci.allRegistros.push(MedidasUci.nuevoRegistro);
        }
    }
    static verRegistro(registro) {
        registro.editar = true;
        MedidasUci.nuevoRegistro = registro;
        console.log(MedidasUci.nuevoRegistro)
    }
    static editarRegistro() {
        MedidasUci.nuevoRegistro.editar = null;
        MedidasUci.allRegistros.map((_v, _i) => {
            if (_v.nro == MedidasUci.nuevoRegistro.nro) {
                MedidasUci.allRegistros[_i] = MedidasUci.nuevoRegistro;
            }
        });

    }
    static eliminarRegistro(obj) {


        let hash = {};
        let res = [];
        let _arr = [];
        let result = [];
        let resultNro = [];

        MedidasUci.allRegistros.map((_v, _i) => {
            if (_v.nro !== obj.nro) {
                res.push(_v);
            }
        });

        result = res.sort((a, b) => b.nro - a.nro);
        // Quitar duplicados
        resultNro = result.filter(o => hash[o.nro] ? false : hash[o.nro] = true);

        _arr = resultNro.sort((a, b) => a.nro - b.nro);

        MedidasUci.allRegistros = _arr;

    }

    static valorarRango(valor, id) {

        if (id == 'GastoCardiaco') {
            if (valor > 4) {
                return valor + ' Fuera del rango';
            } else {
                return valor;
            }

        }
        if (id == 'IndiceCardiaco') {
            if (valor > 5) {
                return valor + ' Fuera del rango';
            } else {
                return valor;
            }
        }
        if (id == 'VolumenSistolico') {
            if (valor > 100) {
                return valor + ' Fuera del rango';
            } else {
                return valor;
            }
        }
        if (id == 'PresionCapilarPulmonar') {
            if (valor > 12) {
                return valor + ' Fuera del rango';
            } else {
                return valor;
            }
        }
        if (id == 'IndiceResistenciaVascularSistemicaIndexada') {
            if (valor > 500) {
                return valor + ' Fuera del rango';
            } else {
                return valor;
            }
        }
        if (id == 'ResistenciaVascularSistemica') {
            if (valor > 1200) {
                return valor + ' Fuera del rango';
            } else {
                return valor;
            }
        }
        if (id == 'IndiceResistenciaVascularPulmonarIndexada') {
            if (valor > 240) {
                return valor + ' Fuera del rango';
            } else {
                return valor;
            }
        }
        if (id == 'PresionCuna') {
            if (valor > 12) {
                return valor + ' Fuera del rango';
            } else {
                return valor;
            }
        }
        if (id == 'PresionArteriaPulmonar') {
            if (valor > 15) {
                return valor + ' Fuera del rango';
            } else {
                return valor;
            }
        }
        if (id == 'TransporteArterialOxigeno') {
            if (valor > 1050) {
                return valor + ' Fuera del rango';
            } else {
                return valor;
            }
        }
        if (id == 'ConcentracionOxigeno') {
            if (valor > 80) {
                return valor + ' Fuera del rango';
            } else {
                return valor;
            }
        }
        if (id == 'PresionPerfusionCerebral') {
            if (valor > 75) {
                return valor + ' Fuera del rango';
            } else {
                return valor;
            }
        }
        if (id == 'PresionIntraCraneal') {
            if (valor > 15) {
                return valor + ' Fuera del rango';
            } else {
                return valor;
            }
        }
        if (id == 'PresionIntraAbdominal') {
            if (valor > 10) {
                return valor + ' Fuera del rango';
            } else {
                return valor;
            }
        }
        if (id == 'PresionVenosaCentral') {
            if (valor > 12) {
                return valor + ' Fuera del rango';
            } else {
                return valor;
            }
        }
        if (id == 'PresionVenosaCentralAuricula') {
            if (valor > 6) {
                return valor + ' Fuera del rango';
            } else {
                return valor;
            }
        }
        if (id == 'Biss') {
            if (valor > 60) {
                return valor + ' Fuera del rango';
            } else {
                return valor;
            }
        }


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
        let r = [];

        result = MedidasUci.allRegistros;
        r = result.sort((a, b) => b.nro - a.nro);
        // Quitar duplicados
        resultNro = r.filter(o => hash[o.nro] ? false : hash[o.nro] = true).sort((a, b) => a.nro - b.nro);
        // Quitar duplicados
        resultId = resultNro.filter(o => hash[o.id] ? false : hash[o.id] = true);
        // 'data-orden'ar desc
        _arr = resultId.sort((a, b) => a.orden - b.orden);

        MedidasUci.registros = _arr;

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
                visible: true,
                aTargets: [2],
                orderable: false,

            },
            {
                mRender: function(data, type, full) {
                    return full.medida;
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
                                m('div.text-center.pd-l-0.pd-r-0', {
                                    ondblclick: (e) => {
                                        MedidasUci.nuevoRegistro = null;
                                        valores.filter((v, i) => {

                                            if (v.id == oData.id) {
                                                let _i = v.idObj[index];
                                                MedidasUci.verRegistro(resultNro[_i]);
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
                                                }
                                            })


                                        }
                                    },
                                    oncreate: (el) => {
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
                                                    } else {
                                                        el.dom.innerHTML = '<button type="button" class="btn btn-xs btn-success btn-block tx-12 ">Registrar</button>';
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
            MedidasUci.sRows.push({
                fnCreatedCell: function(nTd, sData, oData, iRow, iCol) {
                    return m.mount(nTd, {
                        view: () => {
                            return [
                                m('div.text-center.pd-l-0.pd-r-0', {
                                    ondblclick: (e) => {
                                        MedidasUci.nuevoRegistro = null
                                        valores.filter((v, i) => {
                                            if (v.id == oData.id) {
                                                let _i = v.idObj[index];
                                                MedidasUci.verRegistro(resultNro[_i]);
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


    }
    static destroyTable() {
        let table = document.getElementById('table-medidas');
        // clear first
        if (table != null) {
            $('#table-medidas').DataTable().clear().destroy();

        }
    }
    static getRegistros() {
        return MedidasUci.registros;
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
            columns: MedidasUci.sColumns,
            aoColumnDefs: MedidasUci.sRows,
            fnRowCallback: function(nRow, aData, iDisplayIndex, iDisplayIndexFull) {

            },
        };
    }
    view() {
        return [
            m("thead.bd.bd-2", {
                    style: { "border-color": "#5173a1" },
                },
                m("tr.tx-uppercase", {

                    style: { "background-color": "#CCCCFF" },
                    onclick: () => {
                        MedidasUci.show = !MedidasUci.show;
                    }


                }, [
                    m("th.tx-semibold[scope='col'][colspan='12']",
                        "MEDIDAS UCI"
                    ),

                ])
            ),
            m("tbody.bd.bd-2", {
                style: { "border-color": "#5173a1" },
                class: (MedidasUci.show ? '' : 'd-none')
            }, [



                m("tr.bd.bd-2.tx-uppercase", {
                    style: { "background-color": "rgb(238, 249, 200)", "border-color": "#5173a1" },
                    class: (TurnosUci.nuevoTurno !== null && TurnosUci.nuevoTurno.gestion == 1 ? '' : 'd-none'),
                }, [
                    m("th[scope='col'][colspan='4']",
                        "NOMBRE Y UNIDAD DE MEDIDA:"
                    ),
                    m("th[scope='col'][colspan='4']",
                        "VALOR: "
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
                        (MedidasUci.nuevoRegistro !== null ? [
                            m('div.d-flex', [
                                m("input", {
                                    class: "form-control tx-semibold tx-14",
                                    type: "text",
                                    placeholder: "...",
                                    disabled: true,
                                    value: MedidasUci.nuevoRegistro.medida,
                                })

                            ]),
                        ] : [])
                    ),
                    m("td.tx-14.tx-normal.d-none[colspan='4']",
                        m('select.tx-semibold', {
                            id: 'sec_Medidas',
                            disabled: true,
                            onchange: (e) => {
                                let _id = e.target.options[e.target.selectedIndex].id;
                                let _value = e.target.options[e.target.selectedIndex].value;
                                MedidasUci.iniciarRegistro();
                                MedidasUci.nuevoRegistro.id = _id;
                                MedidasUci.nuevoRegistro.medida = _value;
                            },
                            class: "custom-select",
                            value: (MedidasUci.nuevoRegistro !== null ? MedidasUci.nuevoRegistro.medida : 0),
                        }, m("option[value='0']", 'Seleccione...'), [{
                                orden: 1,
                                id: "GastoCardiaco",
                                label: "GASTO CARDIACO (LITRO/MINUTO/M2)",
                                rango: "3 a 4 Litro/minuto/m2",
                                instrumento: "Monitor multiparámetros"
                            }, {
                                orden: 2,
                                id: "IndiceCardiaco",
                                label: "INDICE CARDIACO (LITRO/MINUTO/M2)",
                                rango: "3 a 5 Litro/minuto/m2",
                                instrumento: "Monitor multiparámetros"
                            }, {
                                orden: 3,
                                id: "VolumenSistolico",
                                label: "VOLUMEN SISTOLICO (MILILITROS)",
                                rango: "50 a 100 ml",
                                intrumento: "Monitor multiparámetros"
                            }, {
                                orden: 4,
                                id: "PresionCapilarPulmonar",
                                label: "PRESION CAPILAR PULMONAR (MILILITROS DE MERCURIO)",
                                rango: "6 a 12 mmHg",
                                intrumento: "Monitor multiparámetros"
                            }, {
                                orden: 5,
                                id: "IndiceResistenciaVascularSistemicaIndexada",
                                label: "INDICE DE RESISTENCIA VASCULAR SISTEMICA INDEXADAS (DINAS)",
                                rango: "1200 - 2500 Dinas",
                                intrumento: "Monitor multiparámetros"
                            }, {
                                orden: 6,
                                id: "ResistenciaVascularSistemica",
                                label: "RESISTENCIA VASCULAR SISTEMICA (DINAS)",
                                rango: "800 – 1200 Dinas",
                                intrumento: "Monitor multiparámetros"
                            }, {
                                orden: 7,
                                id: "IndiceResistenciaVascularPulmonarIndexada",
                                label: "INDICE DE RESISTENCIA VASCULAR PULMONAR INDEXADAS (DINAS)",
                                rango: "80 – 240 Dinas",
                                intrumento: "Monitor multiparámetros"
                            }, {
                                orden: 8,
                                id: "PresionCuna",
                                label: "PRESION EN CUÑA (MILILITROS DE MERCURIO)",
                                rango: "2 – 12 mmHg",
                                intrumento: "Monitor multiparámetros"
                            }, {
                                orden: 9,
                                id: "PresionArteriaPulmonar",
                                label: "PRESION DE ARTERIA PULMONAR (MILILITROS DE MERCURIO)",
                                rango: "8 - 15 mmHg",
                                intrumento: "Monitor multiparámetros"
                            }, {
                                orden: 10,
                                id: "TransporteArterialOxigeno",
                                label: "TRANSPORTE ARTERIAL DE OXIGENO (MILILITRO/MINUTO)",
                                rango: "850 - 1050 ml/min",
                                intrumento: "Manual"
                            }, {
                                orden: 11,
                                id: "ConcentracionOxigeno",
                                label: "CONCENTRACION DE OXIGENO (LITROS)",
                                rango: "50 - 80 Litros",
                                intrumento: "Manual"
                            },
                            {
                                orden: 12,
                                id: "PresionPerfusionCerebral",
                                label: "PRESION DE PERFUSION CEREBRAL (MILILITROS DE MERCURIO)",
                                rango: "65 - 75 mmHg",
                                intrumento: "Manual"
                            },
                            {
                                orden: 13,
                                id: "PresionIntraCraneal",
                                label: "PRESIÓN INTRA CRANEAL (MILIMETROS DE AGUA)",
                                rango: "5 - 15 mm",
                                intrumento: "Manual"
                            },
                            {
                                orden: 14,
                                id: "PresionIntraAbdominal",
                                label: "PRESIÓN INTRA ABDOMINAL (MILIMETROS DE AGUA)",
                                rango: "5 - 10 mm",
                                intrumento: "Manual"
                            },
                            {
                                orden: 15,
                                id: "PresionVenosaCentral",
                                label: "PRESIÓN VENOSA CENTRAL (MILIMETROS DE AGUA)",
                                rango: "6 - 12 mm",
                                intrumento: "Manual"
                            },
                            {
                                orden: 16,
                                id: "PresionVenosaCentralAuricula",
                                label: "PRESIÓN VENOSA CENTRAL EN AURICULA (MILIMETROS DE MERCURIO)",
                                rango: "2 - 6 mm",
                                intrumento: "Manual"
                            },
                            {
                                orden: 17,
                                id: "Biss",
                                label: "BISS (MONITOR)",
                                rango: "40 - 60",
                                intrumento: "Monitor"
                            }
                        ].map(x =>
                            m('option[id="' + x.id + '"][orden="' + x.orden + '"][rango="' + x.rango + '"][intrumento="' + x.intrumento + '"]', x.label)
                        ))
                    ),
                    m("td.tx-14.tx-normal[colspan='4']",
                        (MedidasUci.nuevoRegistro !== null ? [
                            m('div.d-flex', [
                                m("input", {
                                    id: "valor" + MedidasUci.nuevoRegistro.id,
                                    class: "form-control tx-semibold tx-14",
                                    type: "text",
                                    placeholder: "...",
                                    oncreate: (el) => {
                                        if (MedidasUci.nuevoRegistro.valor != undefined) {
                                            el.dom.value = MedidasUci.nuevoRegistro.valor;
                                        }
                                    },
                                    oninput: (e) => {
                                        MedidasUci.nuevoRegistro.valor = (e.target.value.length !== 0 ? e.target.value : null);
                                    },
                                    value: MedidasUci.nuevoRegistro.valor
                                })

                            ]),
                        ] : [])
                    ),
                    m("td.tx-14.tx-normal[colspan='4']",
                        (MedidasUci.nuevoRegistro !== null ? [
                            m('div.d-flex', [
                                m("input.form-control[type='text'][placeholder='HH:mm']", {
                                    id: "horaMedida" + MedidasUci.nuevoRegistro.id,
                                    oncreate: (el) => {
                                        if (MedidasUci.nuevoRegistro.hora != undefined) {
                                            el.dom.value = MedidasUci.nuevoRegistro.hora;
                                        }
                                        if (MedidasUci.nuevoRegistro.hora == null) {
                                            if (MedidasUci.setHora != undefined) {
                                                MedidasUci.nuevoRegistro.hora = MedidasUci.setHora;
                                                el.dom.value = MedidasUci.setHora;
                                            }
                                        }
                                        setTimeout(() => {
                                            new Cleave("#horaMedida" + MedidasUci.nuevoRegistro.id, {
                                                time: true,
                                                timePattern: ['h', 'm']
                                            });
                                        }, 50);
                                    },
                                    oninput: (e) => {
                                        setTimeout(() => {
                                            //MedidasUci.nuevoRegistro.hora = moment(PacientesUCI.fechaHoraTurno, 'DD-MM-YYYY HH:mm').format('DD-MM-YYYY') + ' ' + e.target.value;
                                            MedidasUci.setHora = (e.target.value.length !== 0 ? e.target.value : null);
                                            MedidasUci.nuevoRegistro.hora = (e.target.value.length !== 0 ? e.target.value : null);
                                        }, 50);
                                    },
                                    onkeypress: (e) => {
                                        if (e.keyCode == 13) {
                                            MedidasUci.nuevoRegistro.numeroTurno = PacientesUCI.numeroTurno;
                                            MedidasUci.nuevoRegistro.fechaHoraTurno = PacientesUCI.fechaHoraTurno;
                                            if (MedidasUci.nuevoRegistro.editar == null) {
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
                                            } else {
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
                        (MedidasUci.show != false ? [PacientesUCI.vTable('table-medidas', MedidasUci.getRegistros(), MedidasUci.arqTable())] : [])
                    ),
                ]),
            ]),
        ]
    }
}

export default MedidasUci;