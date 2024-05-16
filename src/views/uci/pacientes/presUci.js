import m from "mithril";
import PacientesUCI from "./pacientesUci";
import FecthUci from "./fecthUci";
import TurnosUci from "./turnosUci";

class Prescripcion {
    id = null;
    nro = null;
    fechaHoraTurno = null;
    tipo = null;
    prescripcion = null;
    medico = null;
    editar = null;
    seccion = 'PrescripcionesUci';
    constructor() {
        this.id = this.id;
        this.nro = this.nro;
        this.fechaHoraTurno = this.fechaHoraTurno;
        this.tipo = this.tipo;
        this.prescripcion = this.prescripcion;
        this.medico = this.medico;
        this.editar = this.editar;
        this.seccion = this.seccion;
    }
}


class PrescripcionesUci {
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
    static validarRegistro() {}
    static iniciarRegistro() {
        PrescripcionesUci.nuevoRegistro = new Prescripcion();
    }
    static agregarRegistro() {

        if (PrescripcionesUci.allRegistros.length == 0) {
            PrescripcionesUci.nuevoRegistro.nro = 1;
            PrescripcionesUci.allRegistros.push(PrescripcionesUci.nuevoRegistro);
        } else {
            PrescripcionesUci.nuevoRegistro.nro = (PrescripcionesUci.allRegistros[PrescripcionesUci.allRegistros.reverse().length - 1].nro + 1);
            PrescripcionesUci.allRegistros.push(PrescripcionesUci.nuevoRegistro);
        }
    }
    static verRegistro(registro) {
        registro.editar = true;
        PrescripcionesUci.nuevoRegistro = registro;
        console.log(PrescripcionesUci.nuevoRegistro)
    }
    static editarRegistro() {
        PrescripcionesUci.nuevoRegistro.editar = null;
        PrescripcionesUci.allRegistros.map((_v, _i) => {
            if (_v.nro == PrescripcionesUci.nuevoRegistro.nro) {
                PrescripcionesUci.allRegistros[_i] = PrescripcionesUci.nuevoRegistro;
            }
        });

    }
    static eliminarRegistro(obj) {


        let hash = {};
        let res = [];
        let _arr = [];
        let result = [];
        let resultNro = [];

        PrescripcionesUci.allRegistros.map((_v, _i) => {
            if (_v.nro !== obj.nro) {
                res.push(_v);
            }
        });

        result = res.sort((a, b) => b.nro - a.nro);
        // Quitar duplicados
        resultNro = result.filter(o => hash[o.nro] ? false : hash[o.nro] = true);

        _arr = resultNro.sort((a, b) => a.nro - b.nro);

        PrescripcionesUci.allRegistros = _arr;

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

        result = PrescripcionesUci.allRegistros;

        r = result.sort((a, b) => b.nro - a.nro);
        // Quitar duplicados
        resultNro = r.filter(o => hash[o.nro] ? false : hash[o.nro] = true).sort((a, b) => a.nro - b.nro);
        // Quitar duplicados
        resultId = resultNro.filter(o => hash[o.id] ? false : hash[o.id] = true);
        // 'data-orden'ar desc
        _arr = resultId.sort((a, b) => a.orden - b.orden);

        PrescripcionesUci.registros = _arr;

        // Establecer Columnas
        let _08 = 0;
        let _09 = 0;
        let _10 = 0;
        let _11 = 0;
        let _12 = 0;
        let _13 = 0;
        let _14 = 0;
        let _15 = 0;
        let _16 = 0;
        let _17 = 0;
        let _18 = 0;
        let _19 = 0;
        let _20 = 0;
        let _21 = 0;
        let _22 = 0;
        let _23 = 0;
        let _24 = 0;

        resultNro.map((col, i) => {
            if (col.id == '08') {
                _08++;
            }
            if (col.id == '09') {
                _09++;
            }
        });

        columnas = [_08, _09];

        resultNro.map((col, i) => {
            let fila = {};
            if (col.id == '08') {
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
            if (col.id == '09') {
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

        PrescripcionesUci.sColumns = [];
        PrescripcionesUci.sColumns = [{
                title: "Turno: ",
            },
            {
                title: "Order Nro : ",
            },
            {
                title: "Turno: ",
            },
            {
                title: "Prescripción:",
            },

        ];

        let orderCol = columnas.sort((a, b) => b - a);

        if (orderCol[0] == 0) {
            orderCol[0] = 1;
        }

        for (let index = 0; index <= columnas.length; index++) {
            PrescripcionesUci.sColumns.push({
                title: '4',
            });
        }


        PrescripcionesUci.sRows = [];
        PrescripcionesUci.sRows = [{
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
                    return full.prescripcion;
                },
                fnCreatedCell: function(nTd, sData, oData, iRow, iCol) {
                    return m.mount(nTd, {
                        view: () => {
                            return [
                                m('div', {
                                    id: 'PrescripcionUci_' + oData.id,
                                }, [oData.prescripcion]),

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
            PrescripcionesUci.sRows.push({
                fnCreatedCell: function(nTd, sData, oData, iRow, iCol) {
                    return m.mount(nTd, {
                        view: () => {
                            return [
                                m('div', {

                                }, ['div'])
                            ]
                        }
                    });
                },
                visible: true,
                aTargets: null,
                orderable: true,

            });
            PrescripcionesUci.sRows.push({
                fnCreatedCell: function(nTd, sData, oData, iRow, iCol) {
                    return m.mount(nTd, {
                        view: () => {
                            return [
                                m('div', {

                                }, ['div']),

                            ]
                        }
                    });
                },
                visible: true,
                aTargets: null,
                orderable: true,
            });
        }



        PrescripcionesUci.sRows.map((c, i) => {
            PrescripcionesUci.sRows[i].aTargets = [i];
        });


    }

    static destroyTable() {
        let table = document.getElementById("table-prescripciones");
        // clear first
        if (table != null) {
            $("#table-prescripciones").DataTable().clear().destroy();

        }
    }

    static getRegistros() {
        // return PrescripcionesUci.registros;
        return [{
            id: 1,
            nro: 1,
            prescripcion: 'test',
            tipo: 'medicacion',
            medico: 'ffff',
            editar: true,
            seccion: 'PrescripcionesUci'
        }];
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
            columns: PrescripcionesUci.sColumns,
            aoColumnDefs: PrescripcionesUci.sRows,
            fnRowCallback: function(nRow, aData, iDisplayIndex, iDisplayIndexFull) {

            },
        };
    }

    oninit() {
        PrescripcionesUci.filterRegistros();
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
                        if (PrescripcionesUci.show) {
                            PrescripcionesUci.destroyTable();
                        }
                        PrescripcionesUci.show = !PrescripcionesUci.show;
                    }

                }, [
                    m("th.tx-semibold[scope='col'][colspan='12']",
                        "PRESCRIPCIONES"
                    ),

                ])
            ),
            m("tbody.bd.bd-2", {
                style: { "border-color": "#5173a1" },
                class: (PrescripcionesUci.show ? '' : 'd-none')
            }, [



                m("tr.bd.bd-2.tx-uppercase.d-none", {
                    style: { "background-color": "rgb(238, 249, 200)", "border-color": "#5173a1" },
                    class: (TurnosUci.nuevoTurno !== null && TurnosUci.nuevoTurno.gestion == 1 ? '' : 'd-none'),

                }, [
                    m("th[scope='col'][colspan='4']",
                        "PRESCRIPCIONES:"
                    ),
                    m("th[scope='col'][colspan='4']",
                        "HORA:"
                    ),


                ]),
                m("tr.bd.bd-2", {
                    style: { "border-color": "#5173a1" },
                    class: (TurnosUci.nuevoTurno !== null && TurnosUci.nuevoTurno.gestion == 1 ? '' : 'd-none'),

                }, [
                    m("td.tx-14.tx-normal.d-none[colspan='4']",
                        (PrescripcionesUci.nuevoRegistro !== null ? [
                            m('div.d-flex', [
                                m("input", {
                                    class: "form-control tx-semibold tx-14",
                                    type: "text",
                                    placeholder: "...",
                                    disabled: true,
                                    value: PrescripcionesUci.nuevoRegistro.gas,
                                })

                            ]),
                        ] : [])
                    ),
                    m("td.tx-14.tx-normal.d-none[colspan='4']",
                        m('select.tx-semibold', {
                            id: 'sec_PrescripcionesUci',
                            onchange: (e) => {
                                let _id = e.target.options[e.target.selectedIndex].id;
                                let _value = e.target.options[e.target.selectedIndex].value;
                                if (PrescripcionesUci.nuevoRegistro == null) {
                                    PrescripcionesUci.iniciarRegistro();
                                    PrescripcionesUci.nuevoRegistro.id = _id;
                                    PrescripcionesUci.nuevoRegistro.gas = _value;
                                } else {
                                    PrescripcionesUci.nuevoRegistro.id = _id;
                                    PrescripcionesUci.nuevoRegistro.gas = _value;
                                }
                            },
                            class: "custom-select",
                            value: (PrescripcionesUci.nuevoRegistro !== null ? PrescripcionesUci.nuevoRegistro.gas : 0),
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
                                id: "SaO2",
                                orden: 7,
                                label: "SaO2"
                            },
                            {
                                id: "FiO2",
                                orden: 8,
                                label: "FiO2 %"
                            },
                            {
                                id: "PaO2FiO2",
                                orden: 9,
                                label: "PaO2 / FiO2"
                            },

                            {
                                id: "IndiceOxigenacion",
                                orden: 10,
                                label: "Indice de Oxigenacion"
                            },
                            {
                                id: "Lactato",
                                orden: 11,
                                label: "LACTATO"
                            },
                            {
                                id: "Na",
                                orden: 12,
                                label: "Na"
                            },
                            {
                                id: "K",
                                orden: 13,
                                label: "K"
                            }
                        ].map(x =>
                            m('option[id="' + x.id + '"][orden="' + x.orden + '"]', x.label)
                        ))
                    ),
                    m("td.tx-14.tx-normal.wd-40p.d-none[colspan='4']",
                        (PrescripcionesUci.nuevoRegistro !== null ? [
                            m('div.d-flex', [
                                m("input.form-control.d-none[type='text'][placeholder='DD/MM/YYYY']", {
                                    id: "_gasesFecha" + PrescripcionesUci.nuevoRegistro.id,
                                    oncreate: (el) => {
                                        if (PrescripcionesUci.nuevoRegistro.fecha != undefined) {
                                            el.dom.value = PrescripcionesUci.nuevoRegistro.fecha;
                                        }

                                        if (PrescripcionesUci.nuevoRegistro.fecha == null) {
                                            if (PrescripcionesUci.setFecha != undefined) {
                                                PrescripcionesUci.nuevoRegistro.fecha = PrescripcionesUci.setFecha;
                                                el.dom.value = PrescripcionesUci.setFecha;
                                            }
                                        }


                                    },
                                    oninput: (e) => {
                                        setTimeout(() => {
                                            PrescripcionesUci.setFecha = e.target.value;
                                            PrescripcionesUci.nuevoRegistro.fecha = e.target.value;
                                        }, 50);
                                    },
                                }),
                                m("input.form-control[type='text'][placeholder='HH:mm']", {
                                    id: "_gasesHora" + PrescripcionesUci.nuevoRegistro.id,
                                    oncreate: (el) => {
                                        if (PrescripcionesUci.nuevoRegistro.hora != undefined) {
                                            el.dom.value = PrescripcionesUci.nuevoRegistro.hora;
                                        }


                                        if (PrescripcionesUci.nuevoRegistro.hora == null) {
                                            if (PrescripcionesUci.setHora != undefined) {
                                                PrescripcionesUci.nuevoRegistro.hora = PrescripcionesUci.setHora;
                                                PrescripcionesUci.nuevoRegistro.fechaHora = PrescripcionesUci.nuevoRegistro.fecha + ' ' + PrescripcionesUci.nuevoRegistro.hora;
                                                el.dom.value = PrescripcionesUci.setHora;
                                            }
                                        }


                                    },
                                    oninput: (e) => {
                                        setTimeout(() => {
                                            PrescripcionesUci.setHora = e.target.value;
                                            PrescripcionesUci.nuevoRegistro.hora = e.target.value;
                                            PrescripcionesUci.nuevoRegistro.fechaHora = PrescripcionesUci.nuevoRegistro.fecha + ' ' + PrescripcionesUci.nuevoRegistro.hora;
                                        }, 50);
                                    },
                                }),
                            ]),

                        ] : [])
                    ),
                    m("td.tx-14.tx-normal.wd-40p.d-none[colspan='4']",
                        (PrescripcionesUci.nuevoRegistro !== null ? [
                            m('div.d-flex', [
                                m("input", {
                                    id: "_valores" + PrescripcionesUci.nuevoRegistro.id,
                                    class: "form-control tx-semibold tx-14",
                                    type: "text",
                                    placeholder: "...",
                                    oncreate: (el) => {

                                        if (PrescripcionesUci.nuevoRegistro.valores != undefined) {
                                            el.dom.value = PrescripcionesUci.nuevoRegistro.valores;
                                        }
                                    },
                                    onkeypress: (e) => {
                                        if (e.keyCode == 13) {
                                            PrescripcionesUci.nuevoRegistro.numeroTurno = PacientesUCI.numeroTurno;
                                            PrescripcionesUci.nuevoRegistro.fechaHoraTurno = PacientesUCI.fechaHoraTurno;
                                            if (PrescripcionesUci.nuevoRegistro.editar == null) {
                                                PrescripcionesUci.agregarRegistro();
                                                FecthUci.registrarSeccion(PrescripcionesUci.nuevoRegistro);
                                                PrescripcionesUci.nuevoRegistro = null;
                                                PrescripcionesUci.destroyTable();
                                                PrescripcionesUci.filterRegistros();
                                                PrescripcionesUci.show = false;
                                                m.redraw();
                                                setTimeout(() => {
                                                    PrescripcionesUci.show = true;
                                                    m.redraw();
                                                }, 100);
                                            } else {
                                                PrescripcionesUci.editarRegistro();
                                                FecthUci.actualizarSeccion(PrescripcionesUci.nuevoRegistro);
                                                PrescripcionesUci.nuevoRegistro = null;
                                                PrescripcionesUci.destroyTable();
                                                PrescripcionesUci.filterRegistros();
                                                PrescripcionesUci.show = false;
                                                m.redraw();
                                                setTimeout(() => {
                                                    PrescripcionesUci.show = true;
                                                    m.redraw();
                                                }, 100);
                                            }
                                        }
                                    },
                                    oninput: (e) => {
                                        PrescripcionesUci.setValores = (e.target.value.length !== 0 ? e.target.value : null);
                                        PrescripcionesUci.nuevoRegistro.valores = (e.target.value.length !== 0 ? e.target.value : null);
                                    },
                                    value: PrescripcionesUci.nuevoRegistro.valores
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
                    m("td[colspan='12'][id='registrosPrescripcionesUci']", { style: "max-width: 150px;overflow: auto;" },
                        (PrescripcionesUci.show != false ? [PacientesUCI.vTable('table-prescripciones', PrescripcionesUci.getRegistros(), PrescripcionesUci.arqTable())] : [])
                    ),
                ]),
            ]),
        ]
    }
}

export default PrescripcionesUci;