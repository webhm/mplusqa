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
    editar = null;
    seccion = 'ComburTest';
    constructor() {
        this.id = this.id;
        this.orden = this.orden;
        this.nro = this.nro;
        this.fechaHoraTurno = this.fechaHoraTurno;
        this.medida = this.medida;
        this.valor = this.valor;
        this.hora = this.hora;
        this.editar = this.editar;
        this.seccion = this.seccion;
    }
}


class ComburTestUci {
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
        ComburTestUci.nuevoRegistro = new Medida();
    }
    static agregarRegistro() {

        if (ComburTestUci.allRegistros.length == 0) {
            ComburTestUci.nuevoRegistro.nro = 1;
            ComburTestUci.allRegistros.push(ComburTestUci.nuevoRegistro);
        } else {
            ComburTestUci.nuevoRegistro.nro = (ComburTestUci.allRegistros[ComburTestUci.allRegistros.reverse().length - 1].nro + 1);
            ComburTestUci.allRegistros.push(ComburTestUci.nuevoRegistro);
        }
    }
    static verRegistro(registro) {
        registro.editar = true;
        ComburTestUci.nuevoRegistro = registro;
        console.log(ComburTestUci.nuevoRegistro)
    }
    static editarRegistro() {
        ComburTestUci.nuevoRegistro.editar = null;
        ComburTestUci.allRegistros.map((_v, _i) => {
            if (_v.nro == ComburTestUci.nuevoRegistro.nro) {
                ComburTestUci.allRegistros[_i] = ComburTestUci.nuevoRegistro;
            }
        });

    }
    static eliminarRegistro(obj) {


        let hash = {};
        let res = [];
        let _arr = [];
        let result = [];
        let resultNro = [];

        ComburTestUci.allRegistros.map((_v, _i) => {
            if (_v.nro !== obj.nro) {
                res.push(_v);
            }
        });

        result = res.sort((a, b) => b.nro - a.nro);
        // Quitar duplicados
        resultNro = result.filter(o => hash[o.nro] ? false : hash[o.nro] = true);

        _arr = resultNro.sort((a, b) => a.nro - b.nro);

        ComburTestUci.allRegistros = _arr;

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

        result = ComburTestUci.allRegistros;
        r = result.sort((a, b) => b.nro - a.nro);
        // Quitar duplicados
        resultNro = r.filter(o => hash[o.nro] ? false : hash[o.nro] = true).sort((a, b) => a.nro - b.nro);
        // Quitar duplicados
        resultId = resultNro.filter(o => hash[o.id] ? false : hash[o.id] = true);
        // 'data-orden'ar desc
        _arr = resultId.sort((a, b) => a.orden - b.orden);

        ComburTestUci.registros = _arr;

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


                                                setTimeout(() => {
                                                    let isAnimating = true;
                                                    $('html,body').animate({ scrollTop: $("#ComburTest_" + oData.id).offset().top }, 700, "easeInOutSine", function() {
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

                                                    setTimeout(() => {
                                                        let isAnimating = true;
                                                        $('html,body').animate({ scrollTop: $("#ComburTest_" + oData.id).offset().top }, 700, "easeInOutSine", function() {
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


                                                setTimeout(() => {
                                                    let isAnimating = true;
                                                    $('html,body').animate({ scrollTop: $("#ComburTest_" + oData.id).offset().top }, 700, "easeInOutSine", function() {
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

                                                    setTimeout(() => {
                                                        let isAnimating = true;
                                                        $('html,body').animate({ scrollTop: $("#ComburTest_" + oData.id).offset().top }, 700, "easeInOutSine", function() {
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

                                                    setTimeout(() => {
                                                        let isAnimating = true;
                                                        $('html,body').animate({ scrollTop: $("#ComburTest_" + oData.id).offset().top }, 700, "easeInOutSine", function() {
                                                            isAnimating = false;
                                                        })
                                                    }, 250);
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

                                                    setTimeout(() => {
                                                        let isAnimating = true;
                                                        $('html,body').animate({ scrollTop: $("#ComburTest_" + oData.id).offset().top }, 700, "easeInOutSine", function() {
                                                            isAnimating = false;
                                                        })
                                                    }, 250);
                                                }
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

                                            setTimeout(() => {
                                                let isAnimating = true;
                                                $('html,body').animate({ scrollTop: $("#ComburTest_" + oData.id).offset().top }, 700, "easeInOutSine", function() {
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


    }
    static destroyTable() {
        let table = document.getElementById('table-comburtest');
        // clear first
        if (table != null) {
            $('#table-comburtest').DataTable().clear().destroy();

        }
    }
    static getRegistros() {
        return ComburTestUci.registros;
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
            retrieve: true,
            cache: false,
            destroy: true,
            order: false,
            pageLength: 100,
            columns: ComburTestUci.sColumns,
            aoColumnDefs: ComburTestUci.sRows,
            fnRowCallback: function(nRow, aData, iDisplayIndex, iDisplayIndexFull) {

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
                        if (ComburTestUci.show) {
                            ComburTestUci.destroyTable();
                        }
                        ComburTestUci.show = !ComburTestUci.show;
                    }


                }, [
                    m("th.tx-semibold[scope='col'][colspan='12']",
                        "COMBUR TEST"
                    ),

                ])
            ),
            m("tbody.bd.bd-2", {
                style: { "border-color": "#5173a1" },
                class: (ComburTestUci.show ? '' : 'd-none')
            }, [



                m("tr.bd.bd-2.tx-uppercase.d-none", {
                    style: { "background-color": "rgb(238, 249, 200)", "border-color": "#5173a1" },
                    class: (TurnosUci.nuevoTurno !== null && TurnosUci.nuevoTurno.gestion == 1 ? '' : 'd-none'),
                }, [
                    m("th[scope='col'][colspan='4']",
                        "MEDIDA:"
                    ),
                    m("th[scope='col'][colspan='4']",
                        "VALOR: "
                    ),
                    m("th[scope='col'][colspan='4']",
                        "HORA: "
                    ),


                ]),
                m("tr.bd.bd-2.d-none", {
                    style: { "border-color": "#5173a1" },
                    class: (TurnosUci.nuevoTurno !== null && TurnosUci.nuevoTurno.gestion == 1 ? '' : 'd-none'),
                }, [
                    m("td.tx-14.tx-normal.d-none[colspan='3']",
                        (ComburTestUci.nuevoRegistro !== null ? [
                            m('div.d-flex', [
                                m("input", {
                                    class: "form-control tx-semibold tx-14",
                                    type: "text",
                                    placeholder: "...",
                                    disabled: true,
                                    value: ComburTestUci.nuevoRegistro.medida,
                                })

                            ]),
                        ] : [])
                    ),
                    m("td.tx-14.tx-normal.d-none[colspan='4']",
                        m('select.tx-semibold', {
                            id: 'sec_ComburTest',
                            disabled: true,
                            onchange: (e) => {
                                let _id = e.target.options[e.target.selectedIndex].id;
                                let _value = e.target.options[e.target.selectedIndex].value;
                                ComburTestUci.iniciarRegistro();
                                ComburTestUci.nuevoRegistro.id = _id;
                                ComburTestUci.nuevoRegistro.medida = _value;
                            },
                            class: "custom-select",
                            value: (ComburTestUci.nuevoRegistro !== null ? ComburTestUci.nuevoRegistro.medida : 0),
                        }, m("option[value='0']", 'Seleccione...'), [{
                            orden: 1,
                            id: "cbPH",
                            label: "PH"
                        }, {
                            orden: 2,
                            id: "cbProteinas",
                            label: "PROTEINAS"
                        }, {
                            orden: 3,
                            id: "cbDensidad",
                            label: "DENSIDAD"
                        }, {
                            orden: 4,
                            id: "cbGlucosa",
                            label: "GLUCOSA"
                        }, {
                            orden: 5,
                            id: "cbSangre",
                            label: "SANGRE"
                        }, {
                            orden: 6,
                            id: "cbCetonas",
                            label: "CETONAS"
                        }, {
                            orden: 7,
                            id: "cbLeucocitos",
                            label: "LEUCOCITOS"
                        }, {
                            orden: 8,
                            id: "cbNitritos",
                            label: "NITRITOS"
                        }, {
                            orden: 9,
                            id: "cbUrobilinogeno",
                            label: "UROBILINOGENO",
                        }, {
                            orden: 10,
                            id: "cbBilirubina",
                            label: "BILIRRUBINA"
                        }].map(x =>
                            m('option[id="' + x.id + '"][orden="' + x.orden + '"]', x.label)
                        ))
                    ),
                    m("td.tx-14.tx-normal.d-none[colspan='4']",
                        (ComburTestUci.nuevoRegistro !== null ? [
                            m('div.d-flex', [
                                m("input", {
                                    id: "_valor" + ComburTestUci.nuevoRegistro.id,
                                    class: "form-control tx-semibold tx-14",
                                    type: "text",
                                    placeholder: "...",
                                    oncreate: (el) => {
                                        if (ComburTestUci.nuevoRegistro.valor != undefined) {
                                            el.dom.value = ComburTestUci.nuevoRegistro.valor;
                                        }
                                    },
                                    oninput: (e) => {
                                        ComburTestUci.nuevoRegistro.valor = (e.target.value.length !== 0 ? e.target.value : null);
                                    },
                                    value: ComburTestUci.nuevoRegistro.valor
                                })

                            ]),
                        ] : [])
                    ),
                    m("td.tx-14.tx-normal.d-none[colspan='4']",
                        (ComburTestUci.nuevoRegistro !== null ? [
                            m('div.d-flex', [
                                m("input.form-control[type='text'][placeholder='HH:mm']", {
                                    id: "horaMedida" + ComburTestUci.nuevoRegistro.id,
                                    oncreate: (el) => {
                                        if (ComburTestUci.nuevoRegistro.hora != undefined) {
                                            el.dom.value = ComburTestUci.nuevoRegistro.hora;
                                        }
                                        if (ComburTestUci.nuevoRegistro.hora == null) {
                                            if (ComburTestUci.setHora != undefined) {
                                                ComburTestUci.nuevoRegistro.hora = ComburTestUci.setHora;
                                                el.dom.value = ComburTestUci.setHora;
                                            }
                                        }

                                    },
                                    oninput: (e) => {
                                        setTimeout(() => {
                                            //ComburTestUci.nuevoRegistro.hora = moment(PacientesUCI.fechaHoraTurno, 'DD-MM-YYYY HH:mm').format('DD-MM-YYYY') + ' ' + e.target.value;
                                            ComburTestUci.setHora = (e.target.value.length !== 0 ? e.target.value : null);
                                            ComburTestUci.nuevoRegistro.hora = (e.target.value.length !== 0 ? e.target.value : null);
                                        }, 50);
                                    },
                                    onkeypress: (e) => {
                                        if (e.keyCode == 13) {
                                            ComburTestUci.nuevoRegistro.numeroTurno = PacientesUCI.numeroTurno;
                                            ComburTestUci.nuevoRegistro.fechaHoraTurno = PacientesUCI.fechaHoraTurno;
                                            if (ComburTestUci.nuevoRegistro.editar == null) {
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
                                            } else {
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
                    m("td[colspan='12']", { style: "max-width: 150px;overflow: auto;" },
                        (ComburTestUci.show != false ? [PacientesUCI.vTable('table-comburtest', ComburTestUci.getRegistros(), ComburTestUci.arqTable())] : [])
                    ),
                ]),
            ]),
        ]
    }
}

export default ComburTestUci;