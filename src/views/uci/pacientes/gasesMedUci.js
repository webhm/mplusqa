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
    seccion = 'GasesMed';
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


class GasesMedUci {
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
        GasesMedUci.nuevoRegistro = new Medida();
    }
    static agregarRegistro() {

        if (GasesMedUci.allRegistros.length == 0) {
            GasesMedUci.nuevoRegistro.nro = 1;
            GasesMedUci.allRegistros.push(GasesMedUci.nuevoRegistro);
        } else {
            GasesMedUci.nuevoRegistro.nro = (GasesMedUci.allRegistros[GasesMedUci.allRegistros.reverse().length - 1].nro + 1);
            GasesMedUci.allRegistros.push(GasesMedUci.nuevoRegistro);
        }
    }
    static verRegistro(registro) {
        registro.editar = true;
        GasesMedUci.nuevoRegistro = registro;
        console.log(GasesMedUci.nuevoRegistro)
    }
    static editarRegistro() {
        GasesMedUci.nuevoRegistro.editar = null;
        GasesMedUci.allRegistros.map((_v, _i) => {
            if (_v.nro == GasesMedUci.nuevoRegistro.nro) {
                GasesMedUci.allRegistros[_i] = GasesMedUci.nuevoRegistro;
            }
        });

    }
    static eliminarRegistro(obj) {


        let hash = {};
        let res = [];
        let _arr = [];
        let result = [];
        let resultNro = [];

        GasesMedUci.allRegistros.map((_v, _i) => {
            if (_v.nro !== obj.nro) {
                res.push(_v);
            }
        });

        result = res.sort((a, b) => b.nro - a.nro);
        // Quitar duplicados
        resultNro = result.filter(o => hash[o.nro] ? false : hash[o.nro] = true);

        _arr = resultNro.sort((a, b) => a.nro - b.nro);

        GasesMedUci.allRegistros = _arr;

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

        result = GasesMedUci.allRegistros;
        r = result.sort((a, b) => b.nro - a.nro);
        // Quitar duplicados
        resultNro = r.filter(o => hash[o.nro] ? false : hash[o.nro] = true).sort((a, b) => a.nro - b.nro);
        // Quitar duplicados
        resultId = resultNro.filter(o => hash[o.id] ? false : hash[o.id] = true);
        // 'data-orden'ar desc
        _arr = resultId.sort((a, b) => a.orden - b.orden);

        GasesMedUci.registros = _arr;

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


    }
    static destroyTable() {
        let table = document.getElementById('table-gasesmed');
        // clear first
        if (table != null) {
            $('#table-gasesmed').DataTable().clear().destroy();

        }
    }
    static getRegistros() {
        return GasesMedUci.registros;
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
            columns: GasesMedUci.sColumns,
            aoColumnDefs: GasesMedUci.sRows,
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
                        if (GasesMedUci.show) {
                            GasesMedUci.destroyTable();
                        }
                        GasesMedUci.show = !GasesMedUci.show;
                    }
                }, [
                    m("th.tx-semibold[scope='col'][colspan='12']",
                        "GASES MEDICINALES"
                    ),

                ])
            ),
            m("tbody.bd.bd-2", {
                style: { "border-color": "#5173a1" },
                class: (GasesMedUci.show ? '' : 'd-none')
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
                m("tr.bd.bd-2", {
                    style: { "border-color": "#5173a1" },
                    class: (TurnosUci.nuevoTurno !== null && TurnosUci.nuevoTurno.gestion == 1 ? '' : 'd-none'),
                }, [
                    m("td.tx-14.tx-normal.d-none[colspan='3']",
                        (GasesMedUci.nuevoRegistro !== null ? [
                            m('div.d-flex', [
                                m("input", {
                                    class: "form-control tx-semibold tx-14",
                                    type: "text",
                                    placeholder: "...",
                                    disabled: true,
                                    value: GasesMedUci.nuevoRegistro.medida,
                                })

                            ]),
                        ] : [])
                    ),
                    m("td.tx-14.tx-normal.d-none[colspan='4']",
                        m('select.tx-semibold', {
                            id: 'sec_GasesMed',
                            disabled: true,
                            onchange: (e) => {
                                let _id = e.target.options[e.target.selectedIndex].id;
                                let _value = e.target.options[e.target.selectedIndex].value;
                                GasesMedUci.iniciarRegistro();
                                GasesMedUci.nuevoRegistro.id = _id;
                                GasesMedUci.nuevoRegistro.medida = _value;
                            },
                            class: "custom-select",
                            value: (GasesMedUci.nuevoRegistro !== null ? GasesMedUci.nuevoRegistro.medida : 0),
                        }, m("option[value='0']", 'Seleccione...'), [{
                            orden: 1,
                            id: "AireComprimido",
                            label: "AIRE COMPRIMIDO (PORCENTAJE)"
                        }, {
                            orden: 2,
                            id: "Heliox",
                            label: "HELIOX (LITROS)"
                        }, {
                            orden: 3,
                            id: "OxidoNitrico",
                            label: "OXIDO NITRICO (PARTES POR MILLON)"
                        }].map(x =>
                            m('option[id="' + x.id + '"][orden="' + x.orden + '"]', x.label)
                        ))
                    ),
                    m("td.tx-14.tx-normal.d-none[colspan='4']",
                        (GasesMedUci.nuevoRegistro !== null ? [
                            m('div.d-flex', [
                                m("input", {
                                    id: "_valor" + GasesMedUci.nuevoRegistro.id,
                                    class: "form-control tx-semibold tx-14",
                                    type: "text",
                                    placeholder: "...",
                                    oncreate: (el) => {
                                        if (GasesMedUci.nuevoRegistro.valor != undefined) {
                                            el.dom.value = GasesMedUci.nuevoRegistro.valor;
                                        }
                                    },
                                    oninput: (e) => {
                                        GasesMedUci.nuevoRegistro.valor = (e.target.value.length !== 0 ? e.target.value : null);
                                    },
                                    value: GasesMedUci.nuevoRegistro.valor
                                })

                            ]),
                        ] : [])
                    ),
                    m("td.tx-14.tx-normal.d-none[colspan='4']",
                        (GasesMedUci.nuevoRegistro !== null ? [
                            m('div.d-flex', [
                                m("input.form-control[type='text'][placeholder='HH:mm']", {
                                    id: "horaMedida" + GasesMedUci.nuevoRegistro.id,
                                    oncreate: (el) => {
                                        if (GasesMedUci.nuevoRegistro.hora != undefined) {
                                            el.dom.value = GasesMedUci.nuevoRegistro.hora;
                                        }
                                        if (GasesMedUci.nuevoRegistro.hora == null) {
                                            if (GasesMedUci.setHora != undefined) {
                                                GasesMedUci.nuevoRegistro.hora = GasesMedUci.setHora;
                                                el.dom.value = GasesMedUci.setHora;
                                            }
                                        }

                                    },
                                    oninput: (e) => {
                                        setTimeout(() => {
                                            //GasesMedUci.nuevoRegistro.hora = moment(PacientesUCI.fechaHoraTurno, 'DD-MM-YYYY HH:mm').format('DD-MM-YYYY') + ' ' + e.target.value;
                                            GasesMedUci.setHora = (e.target.value.length !== 0 ? e.target.value : null);
                                            GasesMedUci.nuevoRegistro.hora = (e.target.value.length !== 0 ? e.target.value : null);
                                        }, 50);
                                    },
                                    onkeypress: (e) => {
                                        if (e.keyCode == 13) {
                                            GasesMedUci.nuevoRegistro.numeroTurno = PacientesUCI.numeroTurno;
                                            GasesMedUci.nuevoRegistro.fechaHoraTurno = PacientesUCI.fechaHoraTurno;
                                            if (GasesMedUci.nuevoRegistro.editar == null) {
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
                                            } else {
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
                    m("td[colspan='12'][id='registrosGasesMedUci']", { style: "max-width: 150px;overflow: auto;" },
                        (GasesMedUci.show != false ? [PacientesUCI.vTable('table-gasesmed', GasesMedUci.getRegistros(), GasesMedUci.arqTable())] : [])
                    ),
                ]),
            ]),
        ]
    }
}

export default GasesMedUci;