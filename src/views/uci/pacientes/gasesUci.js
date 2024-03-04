import m from "mithril";
import App from "../../../models/App";
import Loader from "../../utils/loader";
import Errors from "../../utils/errors";
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
        let PH = 0;
        let PaCO2 = 0;
        let PaO2 = 0;
        let HCO3 = 0;
        let TC02 = 0;
        let ExcesoBase = 0;
        let FiO2 = 0;
        let PaO2FiO2 = 0;
        let SaO2 = 0;
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

        columnas = [PH, PaCO2, PaO2, HCO3, TC02, ExcesoBase, FiO2, PaO2FiO2, SaO2, Lactato, Na, K];

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
                title: "Fecha y Hora:",
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
                visible: true,
                aTargets: [2],
                orderable: false,

            },
            {
                mRender: function(data, type, full) {
                    return full.gas;
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
                                m('div.text-center.pd-l-0.pd-r-0', {
                                    ondblclick: (e) => {
                                        GasesUci.nuevoRegistro = null;
                                        valores.filter((v, i) => {

                                            if (v.id == oData.id) {
                                                let _i = v.idObj[index];
                                                GasesUci.verRegistro(resultNro[_i]);
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
                                                }
                                            })


                                        }
                                    },
                                    oncreate: (el) => {
                                        valores.filter((v, i) => {
                                            if (v.id == oData.id) {
                                                let _i = v.idObj[index];
                                                if (resultNro[_i] !== undefined) {
                                                    if (resultNro[_i].fechaHora !== null) {
                                                        el.dom.innerHTML = resultNro[_i].fechaHora;
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
            GasesUci.sRows.push({
                fnCreatedCell: function(nTd, sData, oData, iRow, iCol) {
                    return m.mount(nTd, {
                        view: () => {
                            return [
                                m('div.text-center.pd-l-0.pd-r-0', {
                                    ondblclick: (e) => {
                                        GasesUci.nuevoRegistro = null
                                        valores.filter((v, i) => {
                                            if (v.id == oData.id) {
                                                let _i = v.idObj[index];
                                                GasesUci.verRegistro(resultNro[_i]);
                                            }
                                        })

                                    },
                                    oncreate: (el) => {
                                        valores.filter((v, i) => {
                                            if (v.id == oData.id) {
                                                let _i = v.idObj[index];
                                                if (resultNro[_i] !== undefined) {
                                                    if (resultNro[_i].valores !== null) {
                                                        el.dom.innerHTML = resultNro[_i].valores;
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

        GasesUci.sRows.push({
            fnCreatedCell: function(nTd, sData, oData, iRow, iCol) {
                return m.mount(nTd, {
                    view: () => {
                        return [
                            m("div.btn-block.btn-group.wd-100p.pd-5", [

                                m("button.btn.btn-xs.btn-block.btn-danger[type='button']", {
                                        class: (GasesUci.nuevoRegistro !== null && GasesUci.nuevoRegistro.editar && GasesUci.nuevoRegistro.id == oData.id ? '' : 'd-none'),
                                        disabled: (PacientesUCI.fechaHoraTurno != oData.fechaHoraTurno ? 'disabled' : ''),
                                        onclick: () => {
                                            oData.editar = null;
                                            GasesUci.nuevoRegistro = null;
                                        },
                                    },
                                    'Cancelar Edición',
                                ),
                                m("button.btn.btn-xs.btn-dark[type='button']", {
                                        //class: (PacientesUCI.fechaHoraTurno != oData.fechaHoraTurno ? '' : 'd-none'),
                                        onclick: () => {

                                            if (oData.gas == null) {
                                                alert('No se permite copiar. Ya existe un registro disponible.');
                                                throw 'No se permite copiar. Ya existe un registro disponible.'
                                            }
                                            GasesUci.iniciarRegistro();
                                            GasesUci.nuevoRegistro.id = oData.id;
                                            GasesUci.nuevoRegistro.gas = oData.gas;
                                            GasesUci.nuevoRegistro.orden = oData.orden;
                                            GasesUci.nuevoRegistro.numeroTurno = PacientesUCI.numeroTurno;
                                            GasesUci.nuevoRegistro.fechaHoraTurno = PacientesUCI.fechaHoraTurno;

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


    }

    static destroyTable() {
        let table = document.getElementById('table-gases');
        // clear first
        if (table != null) {
            $('#table-gases').DataTable().clear().destroy();

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
            cache: false,
            destroy: true,
            order: false,
            pageLength: 100,
            columns: GasesUci.sColumns,
            aoColumnDefs: GasesUci.sRows,
            fnRowCallback: function(nRow, aData, iDisplayIndex, iDisplayIndexFull) {

            },
        };
    }


    view() {
        return [
            m("thead.bd.bd-2", {
                    style: { "border-color": "#5173a1" }
                },

                m("tr.tx-uppercase", {

                    style: { "background-color": "#CCCCFF" },
                    class: (GasesUci.show ? '' : 'd-none')

                }, [
                    m("th.tx-semibold[scope='col'][colspan='12']",
                        "GASOMETRIAS / HORAS:"
                    ),

                ])
            ),
            m("tbody.bd.bd-2", {
                style: { "border-color": "#5173a1" },
                class: (GasesUci.show ? '' : 'd-none')
            }, [



                m("tr.bd.bd-2.tx-uppercase", {
                    style: { "background-color": "rgb(238, 249, 200)", "border-color": "#5173a1" },
                    class: (TurnosUci.nuevoTurno !== null && TurnosUci.nuevoTurno.gestion == 1 ? '' : 'd-none'),

                }, [
                    m("th[scope='col'][colspan='4']",
                        "GASOMETRIAS:"
                    ),
                    m("th[scope='col'][colspan='4']",
                        "FECHA Y HORA:"
                    ),
                    m("th[scope='col'][colspan='4']",
                        "VALORES:"
                    ),

                ]),
                m("tr.bd.bd-2", {
                    style: { "border-color": "#5173a1" },
                    class: (TurnosUci.nuevoTurno !== null && TurnosUci.nuevoTurno.gestion == 1 ? '' : 'd-none'),

                }, [
                    m("td.tx-14.tx-normal[colspan='4']",
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
                                id: "PH",
                                orden: 1,
                                label: "PH"
                            },
                            {
                                id: "PaCO2",
                                orden: 2,
                                label: "PaCO2"
                            },
                            {
                                id: "PaO2",
                                orden: 3,
                                label: "PaO2"
                            },
                            {
                                id: "HCO3",
                                orden: 4,
                                label: "HCO3"
                            },
                            {
                                id: "TC02",
                                orden: 5,
                                label: "TC02"
                            },
                            {
                                id: "ExcesoBase",
                                orden: 6,
                                label: "EXCESO DE BASE"
                            },
                            {
                                id: "FiO2",
                                orden: 7,
                                label: "FiO2 %"
                            },
                            {
                                id: "PaO2FiO2",
                                orden: 8,
                                label: "PaO2 / FiO2"
                            },
                            {
                                id: "SaO2",
                                orden: 9,
                                label: "SaO2"
                            },
                            {
                                id: "Lactato",
                                orden: 10,
                                label: "LACTATO"
                            },
                            {
                                id: "Na",
                                orden: 11,
                                label: "Na"
                            },
                            {
                                id: "K",
                                orden: 12,
                                label: "K"
                            }
                        ].map(x =>
                            m('option[id="' + x.id + '"][orden="' + x.orden + '"]', x.label)
                        ))
                    ),
                    m("td.tx-14.tx-normal.wd-40p[colspan='4']",
                        (GasesUci.nuevoRegistro !== null ? [
                            m('div.d-flex', [
                                m("input.form-control[type='text'][placeholder='DD/MM/YYYY']", {
                                    id: "gasesFecha" + GasesUci.nuevoRegistro.id,
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

                                        setTimeout(() => {
                                            new Cleave("#gasesFecha" + GasesUci.nuevoRegistro.id, {
                                                date: true,
                                                datePattern: ["d", "m", "Y"]
                                            });
                                        }, 50);
                                    },
                                    oninput: (e) => {
                                        setTimeout(() => {
                                            GasesUci.setFecha = e.target.value;
                                            GasesUci.nuevoRegistro.fecha = e.target.value;
                                        }, 50);
                                    },
                                }),
                                m("input.form-control[type='text'][placeholder='HH:mm']", {
                                    id: "gasesHora" + GasesUci.nuevoRegistro.id,
                                    oncreate: (el) => {
                                        if (GasesUci.nuevoRegistro.hora != undefined) {
                                            el.dom.value = GasesUci.nuevoRegistro.hora;
                                        }


                                        if (GasesUci.nuevoRegistro.hora == null) {
                                            if (GasesUci.setHora != undefined) {
                                                GasesUci.nuevoRegistro.hora = GasesUci.setHora;
                                                el.dom.value = GasesUci.setHora;
                                            }
                                        }

                                        setTimeout(() => {
                                            new Cleave("#gasesHora" + GasesUci.nuevoRegistro.id, {
                                                time: true,
                                                timePattern: ['h', 'm']
                                            });
                                        }, 50);
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
                    m("td.tx-14.tx-normal.wd-40p[colspan='4']",
                        (GasesUci.nuevoRegistro !== null ? [
                            m('div.d-flex', [
                                m("input", {
                                    id: "valores" + GasesUci.nuevoRegistro.id,
                                    class: "form-control tx-semibold tx-14",
                                    type: "text",
                                    placeholder: "...",
                                    oncreate: (el) => {

                                        if (GasesUci.setValores != undefined) {
                                            el.dom.value = GasesUci.setValores;
                                        }
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
                m("tr.tx-uppercase.mg-t-20", [
                    m("td[colspan='12']",
                        (GasesUci.show != false ? [PacientesUCI.vTable('table-gases', GasesUci.getRegistros(), GasesUci.arqTable())] : [])
                    ),
                ]),
            ]),
        ]
    }
}

export default GasesUci;