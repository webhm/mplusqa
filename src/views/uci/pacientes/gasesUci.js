import m from "mithril";
import PacientesUCI from "./pacientesUci";
import FecthUci from "./fecthUci";
import TurnosUci from "./turnosUci";

class Gas {
    id = null;
    nro = null;
    fechaHoraTurno = null;
    gas = null;
    fechaHora = null;
    fecha = null;
    hora = null;
    valores = null;
    editar = null;
    seccion = 'Gases';
    constructor() {
        this.id = this.id;
        this.nro = this.nro;
        this.fechaHoraTurno = this.fechaHoraTurno;
        this.gas = this.gas;
        this.fechaHora = this.fechaHora;
        this.fecha = this.fecha;
        this.hora = this.hora;
        this.valores = this.valores;
        this.editar = this.editar;
        this.seccion = this.seccion;
    }
}


class GasesUci {
    static allRegistros = [];
    static registros = [];
    static nuevoRegistro = null;
    static show = false;
    static setFecha = null;
    static setHora = null;
    static setValores = null;
    static sCells = [];
    static sRowsHeaders = [];
    static sColumns = [];
    static sRows = [];


    static validarRegistro() {

    }
    static iniciarRegistro() {
        GasesUci.nuevoRegistro = new Gas();
    }
    static agregarRegistro() {

        if (GasesUci.allRegistros.length == 0) {
            GasesUci.nuevoRegistro.nro = 1;
            GasesUci.allRegistros.push(GasesUci.nuevoRegistro);
        } else {
            GasesUci.nuevoRegistro.nro = (GasesUci.allRegistros[GasesUci.allRegistros.reverse().length - 1].nro + 1);
            GasesUci.allRegistros.push(GasesUci.nuevoRegistro);
        }
    }
    static verRegistro(registro) {
        registro.editar = true;
        GasesUci.nuevoRegistro = registro;
        console.log(GasesUci.nuevoRegistro)
    }
    static editarRegistro() {
        GasesUci.nuevoRegistro.editar = null;
        GasesUci.allRegistros.map((_v, _i) => {
            if (_v.nro == GasesUci.nuevoRegistro.nro) {
                GasesUci.allRegistros[_i] = GasesUci.nuevoRegistro;
            }
        });

    }
    static eliminarRegistro(obj) {


        let hash = {};
        let res = [];
        let _arr = [];
        let result = [];
        let resultNro = [];

        GasesUci.allRegistros.map((_v, _i) => {
            if (_v.nro !== obj.nro) {
                res.push(_v);
            }
        });

        result = res.sort((a, b) => b.nro - a.nro);
        // Quitar duplicados
        resultNro = result.filter(o => hash[o.nro] ? false : hash[o.nro] = true);

        _arr = resultNro.sort((a, b) => a.nro - b.nro);

        GasesUci.allRegistros = _arr;

    }

    static copyAllRegistros(_options) {

        let res = [];
        let hash = {};

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
            if (_v.nro == null) {
                GasesUci.allRegistros[_i].nro = (_i + 1);
                if (_v.id == res.id) {
                    res.nro = GasesUci.allRegistros[_i].nro;
                }

            }

        });

        FecthUci.registrarAllSeccion(res);

    }

    static eliminarAllRegistros() {


        let res = [];
        let result = [];
        let resultNro = [];
        let hash = {};

        res = GasesUci.allRegistros;

        result = res.sort((a, b) => b.nro - a.nro);
        // Quitar duplicados
        resultNro = result.filter(o => hash[o.id] ? false : hash[o.id] = true);

        resultNro.map((_v, _i) => {
            GasesUci.eliminarRegistro(_v);
            FecthUci.eliminarSeccion(_v);
        });


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

        result = GasesUci.allRegistros;

        r = result.sort((a, b) => b.nro - a.nro);
        // Quitar duplicados
        resultNro = r.filter(o => hash[o.nro] ? false : hash[o.nro] = true).sort((a, b) => a.nro - b.nro);
        // Quitar duplicados
        resultId = resultNro.filter(o => hash[o.id] ? false : hash[o.id] = true);
        // 'data-orden'ar desc
        _arr = resultId.sort((a, b) => a.orden - b.orden);

        GasesUci.registros = _arr;

        // Establecer Columnas
        let GasometriaVenosa = 0;
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
            if (col.id == 'GasometriaVenosa') {
                GasometriaVenosa++;
            }
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

        columnas = [GasometriaVenosa, PH, PaCO2, PaO2, HCO3, TC02, ExcesoBase, FiO2, PaO2FiO2, SaO2, IndiceOxigenacion, Lactato, Na, K];

        resultNro.map((col, i) => {
            let fila = {};
            if (col.id == 'GasometriaVenosa') {
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
                                                        function () {
                                                            isAnimating = false;
                                                        })
                                                }, 250);

                                                setTimeout(() => {
                                                    let isAnimating = true;
                                                    $('#registrosGasesUci').animate({
                                                        scrollLeft: '+=460'
                                                    },
                                                        700, "easeInOutSine",
                                                        function () {
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
                fnCreatedCell: function (nTd, sData, oData, iRow, iCol) {
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
                                                        function () {
                                                            isAnimating = false;
                                                        })
                                                }, 250);

                                                setTimeout(() => {
                                                    let isAnimating = true;
                                                    $('#registrosGasesUci').animate({
                                                        scrollLeft: '+=460'
                                                    },
                                                        700, "easeInOutSine",
                                                        function () {
                                                            isAnimating = false;
                                                        })
                                                }, 250);

                                            }
                                        })
                                    },
                                    onclick: (e) => {
                                        e.preventDefault();
                                    },
                                    /*
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
                                    */
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
                                                        function () {
                                                            isAnimating = false;
                                                        })
                                                }, 250);

                                                setTimeout(() => {
                                                    let isAnimating = true;
                                                    $('#registrosGasesUci').animate({
                                                        scrollLeft: '+=460'
                                                    },
                                                        700, "easeInOutSine",
                                                        function () {
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
            fnCreatedCell: function (nTd, sData, oData, iRow, iCol) {
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


    }

    static destroyTable() {
        let table = document.getElementById("table-gases");
        // clear first
        if (table != null) {
            $("#table-gases").DataTable().clear().destroy();

        }
    }

    static getRegistros() {
        return GasesUci.registros;
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
            columns: GasesUci.sColumns,
            aoColumnDefs: GasesUci.sRows,
            fnRowCallback: function (nRow, aData, iDisplayIndex, iDisplayIndexFull) {

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
                        if (GasesUci.show) {
                            GasesUci.destroyTable();
                        }
                        GasesUci.show = !GasesUci.show;
                    }


                }, [
                    m("th.tx-semibold[scope='col'][colspan='12']",
                        "GASOMETRIAS / HORAS"
                    ),

                ])
            ),
            m("tbody.bd.bd-2", {
                style: { "border-color": "#5173a1" },
                class: (GasesUci.show ? '' : 'd-none')
            }, [



                m("tr.bd.bd-2.tx-uppercase.d-none", {
                    style: { "background-color": "rgb(238, 249, 200)", "border-color": "#5173a1" },
                    class: (TurnosUci.nuevoTurno !== null && TurnosUci.nuevoTurno.gestion == 1 ? '' : 'd-none'),

                }, [
                    m("th[scope='col'][colspan='4']",
                        "GASOMETRIAS:"
                    ),
                    m("th[scope='col'][colspan='4']",
                        "HORA:"
                    ),
                    m("th[scope='col'][colspan='4']",
                        "VALOR:"
                    ),

                ]),
                m("tr.bd.bd-2", {
                    style: { "border-color": "#5173a1" },
                    class: (TurnosUci.nuevoTurno !== null && TurnosUci.nuevoTurno.gestion == 1 ? '' : 'd-none'),

                }, [
                    m("td.tx-14.tx-normal.d-none[colspan='4']",
                        (GasesUci.nuevoRegistro !== null ? [
                            m('div.d-flex', [
                                m("input", {
                                    class: "form-control tx-semibold tx-14",
                                    type: "text",
                                    placeholder: "...",
                                    disabled: true,
                                    value: GasesUci.nuevoRegistro.gas,
                                })

                            ]),
                        ] : [])
                    ),
                    m("td.tx-14.tx-normal.d-none[colspan='4']",
                        m('select.tx-semibold', {
                            id: 'sec_Gases',
                            onchange: (e) => {
                                let _id = e.target.options[e.target.selectedIndex].id;
                                let _value = e.target.options[e.target.selectedIndex].value;
                                if (GasesUci.nuevoRegistro == null) {
                                    GasesUci.iniciarRegistro();
                                    GasesUci.nuevoRegistro.id = _id;
                                    GasesUci.nuevoRegistro.gas = _value;
                                } else {
                                    GasesUci.nuevoRegistro.id = _id;
                                    GasesUci.nuevoRegistro.gas = _value;
                                }
                            },
                            class: "custom-select",
                            value: (GasesUci.nuevoRegistro !== null ? GasesUci.nuevoRegistro.gas : 0),
                            disabled: true,
                        }, m("option[value='0']", 'Seleccione...'), [{
                            id: "GasometriaVenosa",
                            orden: 1,
                            label: "GASOMETRÍA VENOSA"
                        }, {
                            id: "PH",
                            orden: 2,
                            label: "PH"
                        },
                        {
                            id: "PaCO2",
                            orden: 3,
                            label: "PaCO2"
                        },
                        {
                            id: "PaO2",
                            orden: 4,
                            label: "PaO2"
                        },
                        {
                            id: "HCO3",
                            orden: 5,
                            label: "HCO3"
                        },
                        {
                            id: "TC02",
                            orden: 6,
                            label: "TC02"
                        },
                        {
                            id: "ExcesoBase",
                            orden: 7,
                            label: "EXCESO DE BASE"
                        },
                        {
                            id: "SaO2",
                            orden: 8,
                            label: "SaO2"
                        },
                        {
                            id: "FiO2",
                            orden: 9,
                            label: "FiO2 %"
                        },
                        {
                            id: "PaO2FiO2",
                            orden: 10,
                            label: "PaO2 / FiO2"
                        },

                        {
                            id: "IndiceOxigenacion",
                            orden: 11,
                            label: "Indice de Oxigenacion"
                        },
                        {
                            id: "Lactato",
                            orden: 12,
                            label: "LACTATO"
                        },
                        {
                            id: "Na",
                            orden: 13,
                            label: "Na"
                        },
                        {
                            id: "K",
                            orden: 14,
                            label: "K"
                        }
                        ].map(x =>
                            m('option[id="' + x.id + '"][orden="' + x.orden + '"]', x.label)
                        ))
                    ),
                    m("td.tx-14.tx-normal.wd-40p.d-none[colspan='4']",
                        (GasesUci.nuevoRegistro !== null ? [
                            m('div.d-flex', [
                                m("input.form-control.d-none[type='text'][placeholder='DD/MM/YYYY']", {
                                    id: "_gasesFecha" + GasesUci.nuevoRegistro.id,
                                    oncreate: (el) => {
                                        if (GasesUci.nuevoRegistro.fecha != undefined) {
                                            el.dom.value = GasesUci.nuevoRegistro.fecha;
                                        }

                                        if (GasesUci.nuevoRegistro.fecha == null) {
                                            if (GasesUci.setFecha != undefined) {
                                                GasesUci.nuevoRegistro.fecha = GasesUci.setFecha;
                                                el.dom.value = GasesUci.setFecha;
                                            }
                                        }


                                    },
                                    oninput: (e) => {
                                        setTimeout(() => {
                                            GasesUci.setFecha = e.target.value;
                                            GasesUci.nuevoRegistro.fecha = e.target.value;
                                        }, 50);
                                    },
                                }),
                                m("input.form-control[type='text'][placeholder='HH:mm']", {
                                    id: "_gasesHora" + GasesUci.nuevoRegistro.id,
                                    oncreate: (el) => {
                                        if (GasesUci.nuevoRegistro.hora != undefined) {
                                            el.dom.value = GasesUci.nuevoRegistro.hora;
                                        }


                                        if (GasesUci.nuevoRegistro.hora == null) {
                                            if (GasesUci.setHora != undefined) {
                                                GasesUci.nuevoRegistro.hora = GasesUci.setHora;
                                                GasesUci.nuevoRegistro.fechaHora = GasesUci.nuevoRegistro.fecha + ' ' + GasesUci.nuevoRegistro.hora;
                                                el.dom.value = GasesUci.setHora;
                                            }
                                        }


                                    },
                                    oninput: (e) => {
                                        setTimeout(() => {
                                            GasesUci.setHora = e.target.value;
                                            GasesUci.nuevoRegistro.hora = e.target.value;
                                            GasesUci.nuevoRegistro.fechaHora = GasesUci.nuevoRegistro.fecha + ' ' + GasesUci.nuevoRegistro.hora;
                                        }, 50);
                                    },
                                }),
                            ]),

                        ] : [])
                    ),
                    m("td.tx-14.tx-normal.wd-40p.d-none[colspan='4']",
                        (GasesUci.nuevoRegistro !== null ? [
                            m('div.d-flex', [
                                m("input", {
                                    id: "_valores" + GasesUci.nuevoRegistro.id,
                                    class: "form-control tx-semibold tx-14",
                                    type: "text",
                                    placeholder: "...",
                                    oncreate: (el) => {

                                        if (GasesUci.nuevoRegistro.valores != undefined) {
                                            el.dom.value = GasesUci.nuevoRegistro.valores;
                                        }
                                    },
                                    onkeypress: (e) => {
                                        if (e.keyCode == 13) {
                                            GasesUci.nuevoRegistro.numeroTurno = PacientesUCI.numeroTurno;
                                            GasesUci.nuevoRegistro.fechaHoraTurno = PacientesUCI.fechaHoraTurno;
                                            if (GasesUci.nuevoRegistro.editar == null) {
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
                                            } else {
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
                                            }
                                        }
                                    },
                                    oninput: (e) => {
                                        GasesUci.setValores = (e.target.value.length !== 0 ? e.target.value : null);
                                        GasesUci.nuevoRegistro.valores = (e.target.value.length !== 0 ? e.target.value : null);
                                    },
                                    value: GasesUci.nuevoRegistro.valores
                                })

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
                m("tr.tx-uppercase", [
                    m("td[colspan='12'][align='right']", [
                        m("button.btn.btn-xs.btn-dark.mg-1[type='button']", {

                            onclick: () => {

                                GasesUci.copyAllRegistros(Array.from(document.getElementById('sec_Gases').options));
                                setTimeout(() => {
                                    GasesUci.destroyTable();
                                    GasesUci.filterRegistros();
                                    GasesUci.show = false;
                                    m.redraw();
                                    setTimeout(() => {
                                        GasesUci.show = true;
                                        m.redraw();
                                    }, 100);
                                }, 100);

                            },
                        },
                            'Copiar',
                        ),
                        m("button.btn.btn-xs.btn-danger.mg-1[type='button']", {

                            onclick: (el) => {

                                if (GasesUci.allRegistros.length > 0) {
                                    GasesUci.eliminarAllRegistros();
                                    setTimeout(() => {
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
                                    $.alert('No existen registros para eliminar.');
                                }

                            },
                        },
                            'Eliminar',
                        ),
                    ]),
                ]),
                m("tr.tx-uppercase.mg-t-20", [
                    m("td[colspan='12'][id='registrosGasesUci']", { style: "max-width: 150px;overflow: auto;" },
                        (GasesUci.show != false ? [PacientesUCI.vTable('table-gases', GasesUci.getRegistros(), GasesUci.arqTable())] : [])
                    ),
                ]),
            ]),
        ]
    }
}

export default GasesUci;