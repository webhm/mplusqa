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
    frecuencia = null;
    hora = null; // Feha y hora del registro Médico
    medico = null;
    timestamp = null; // Fecha y hora del registro de enfermeria
    status = null; // 1: Administrado 2: Cancelado 3: Aplazado
    comentario = null;
    editar = null;
    seccion = 'PrescripcionesUci';
    constructor() {
        this.id = this.id;
        this.nro = this.nro;
        this.fechaHoraTurno = this.fechaHoraTurno;
        this.tipo = this.tipo;
        this.prescripcion = this.prescripcion;
        this.frecuencia = this.frecuencia;
        this.hora = this.hora;
        this.medico = this.medico;
        this.timestamp = this.timestamp;
        this.status = this.status;
        this.comentario = this.comentario;
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
    static filterHorarios() {

        let horarios = [];
        let horariosOrdenados = [];
        let registros = PrescripcionesUci.allRegistros;

        console.log(2222, registros)

        if (registros.length > 0) {
            for (let index = 0; index < registros.length; index++) {
                if (registros[index].status == 1) {
                    horarios.push({
                        'fechaHora': moment(registros[index].timestamp, 'DD-MM-YYYY HH:mm').format('DD-MM-YYYY') + ' ' + registros[index].hora,
                        'hora': registros[index].hora,
                    });
                }

            }

            horariosOrdenados = horarios.sort((a, b) => moment(a.fechaHora, 'DD-MM-YYYY HH:mm').unix() - moment(b.fechaHora, 'DD-MM-YYYY HH:mm').unix());

            console.log(84848484, horariosOrdenados)

            let _hoy = moment().format('DD-MM-YYYY');
            let _mana = moment(_hoy, 'DD-MM-YYYY').add(1, 'days').format('DD-MM-YYYY');

            let __startTime = moment(_hoy + " " + horariosOrdenados[0].hora, 'DD-MM-YYYY HH:mm').format('YYYY-MM-DDTHH:mm');
            let __endTime = moment(_mana + " 11:00", 'DD-MM-YYYY HH:mm').format('YYYY-MM-DDTHH:mm');

            let __duration = moment.duration(moment(__endTime).diff(__startTime));
            let __hours = __duration.asHours();

            for (let i = 0; __hours > i; i++) {
                let fechaHora = moment(__startTime).add(i, 'hours').format('DD-MM-YYYY HH:mm');
                let hora = moment(__startTime).add(i, 'hours').format('HH:mm');
                PrescripcionesUci.sColumns.push({
                    fechaHora: fechaHora,
                    title: hora,
                });
            }
        }


    }

    static validarStatus(data, timestamp) {

        let _p = PrescripcionesUci.allRegistros.filter(v => v.prescripcion == data.prescripcion && v.timestamp == timestamp);
        return _p[0];

    }

    static comprobarFrecuencia(data, horario, fechaHora) {
        let _h = moment.duration(horario).asHours();
        let _ho = moment.duration(data.hora).asHours();
        let fechaHorario = moment(fechaHora, 'DD-MM-YYYY HH:mm').unix();
        let fechaPres = moment('15-05-2024 ' + data.hora, 'DD-MM-YYYY HH:mm').unix();

        if (fechaHorario >= fechaPres) {
            if ((_ho > 0 || _ho >= _h) && (_h - _ho) % data.frecuencia == 0) {
                return true;
            } else {
                return false;
            }
        } else {
            return false;
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

        result = PrescripcionesUci.allRegistros;

        r = result.sort((a, b) => b.nro - a.nro);
        // Quitar duplicados
        resultNro = r.filter(o => hash[o.nro] ? false : hash[o.nro] = true).sort((a, b) => a.nro - b.nro);
        // Quitar duplicados
        // resultId = resultNro.filter(o => hash[o.id] ? false : hash[o.id] = true);
        // Solo obtener prescripciones
        resultId = resultNro.filter(o => o.status == 1);

        console.log(777, resultId)

        PrescripcionesUci.registros = resultId;

        PrescripcionesUci.setTableRegistros();

    }
    static setTableRegistros() {

        // Extraer prescripciones 

        // Extablecer columnas por horarios
        PrescripcionesUci.sColumns = [];
        PrescripcionesUci.sColumns = [{
                title: "Turno:",
            },
            {
                title: "Order Nro : ",
            },
            {
                title: "Turno: ",
            },
            {
                title: "Tipo:",
            },
            {
                title: "Prescripción:",
            },

        ];
        PrescripcionesUci.filterHorarios();

        // Generar Filas por valores
        PrescripcionesUci.sRows = [];
        PrescripcionesUci.sRows = [{
                mRender: function(data, type, full) {
                    return '';
                },
                visible: false,
                aTargets: [0],
                orderable: true,
            },
            {
                mRender: function(data, type, full) {
                    return '';
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
                    return full.tipo;
                },
                fnCreatedCell: function(nTd, sData, oData, iRow, iCol) {
                    return m.mount(nTd, {
                        view: () => {
                            return [
                                m('div.tx-12.tx-semibold', [oData.tipo]),

                            ]
                        }
                    });
                },
                visible: true,
                aTargets: [3],
                orderable: true,

            },
            {
                mRender: function(data, type, full) {
                    return full.prescripcion;
                },
                fnCreatedCell: function(nTd, sData, oData, iRow, iCol) {
                    return m.mount(nTd, {
                        view: () => {
                            return [
                                m('div.tx-12.tx-semibold', {
                                    id: 'PrescripcionUci_' + oData.id,
                                    onclick: () => {
                                        $.alert({
                                            title: 'Detalle de Prescripción',
                                            content: '' +
                                                '<b>Prescripción:</b> ' + oData.prescripcion + ' <br/>' +
                                                '<b>Fecha:</b> ' + oData.timestamp + ' <br/>' +
                                                '<b>Médico:</b> ' + oData.medico + ' <br/>' +
                                                '<b>Frecuencia:</b> Cada ' + oData.frecuencia + ' Horas <br/>' +
                                                '<br/>',
                                        });
                                    },
                                }, [oData.prescripcion + ' Cada ' + oData.frecuencia + ' Horas.']),

                            ]
                        }
                    });
                },
                visible: true,
                aTargets: [4],
                orderable: true,

            },
        ];

        // Filas
        let horas = PrescripcionesUci.sColumns;
        for (let index = 5; index < horas.length; index++) {
            PrescripcionesUci.sRows.push({
                fnCreatedCell: function(nTd, sData, oData, iRow, iCol) {

                    return m.mount(nTd, {
                        view: () => {
                            return [
                                m('div.text-center', {
                                    ondblclick: () => {

                                        let _status = 1;
                                        let _obj = null;

                                        try {

                                            let _det = undefined;
                                            _det = PrescripcionesUci.validarStatus(oData, horas[index].fechaHora)
                                            console.log(888, _det)
                                            if (_det !== undefined && _det.status == 2) {
                                                _status = 2;
                                                _obj = _det;
                                                console.log(54, _obj)
                                                throw _obj.timestamp;
                                            }

                                            if (_det == undefined) {
                                                _status = 1;
                                                throw '';
                                            }


                                        } catch (error) {
                                            if (_status == 2) {
                                                $.confirm({
                                                    title: 'Registro de Administración',
                                                    content: 'Fecha de Administración:' + _obj.timestamp + '<br/>' + 'Usuario: ' + _obj.usuarioTurno,
                                                    buttons: {
                                                        cancel: {
                                                            btnClass: "btn-danger op-8",
                                                            text: 'Cancelar',
                                                        }

                                                    }

                                                });
                                            }

                                            if (_status == 1) {
                                                $.confirm({
                                                    title: '¿Registrar Adminstración?',
                                                    content: '' +
                                                        '<form action="" class="formName">' +
                                                        '<div class="form-group ">' +
                                                        '<label>Fecha y Hora:</label>' +
                                                        '<input type="text" id="timestamp" class="form-control" value="' + horas[index].fechaHora + '" disabled>' +
                                                        '</div>' +
                                                        '</form>',
                                                    buttons: {
                                                        formSubmit: {
                                                            text: 'Confirmar',
                                                            btnClass: 'btn-success op-8',
                                                            action: function() {
                                                                setTimeout(() => {
                                                                    PrescripcionesUci.iniciarRegistro();
                                                                    PrescripcionesUci.nuevoRegistro.id = oData.id;
                                                                    PrescripcionesUci.nuevoRegistro.fechaHoraTurno = oData.fechaHoraTurno;
                                                                    PrescripcionesUci.nuevoRegistro.tipo = oData.tipo;
                                                                    PrescripcionesUci.nuevoRegistro.prescripcion = oData.prescripcion;
                                                                    PrescripcionesUci.nuevoRegistro.frecuencia = oData.frecuencia;
                                                                    PrescripcionesUci.nuevoRegistro.hora = oData.hora;
                                                                    PrescripcionesUci.nuevoRegistro.medico = oData.medico;
                                                                    PrescripcionesUci.nuevoRegistro.timestamp = horas[index].fechaHora;
                                                                    PrescripcionesUci.nuevoRegistro.status = 2;
                                                                    PrescripcionesUci.nuevoRegistro.comentario = null;
                                                                    PrescripcionesUci.nuevoRegistro.seccion = oData.seccion;
                                                                    PrescripcionesUci.nuevoRegistro.usuarioTurno = PacientesUCI.usuarioTurno;
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
                                                                }, 100);

                                                            }
                                                        },
                                                        cancel: {
                                                            btnClass: "btn-danger op-8",
                                                            text: 'Cancelar',
                                                        }

                                                    }

                                                });
                                            }

                                        }

                                    },
                                }, [

                                    (PrescripcionesUci.comprobarFrecuencia(oData, horas[index].title, horas[index].fechaHora) != false ? [
                                        m("i.fa.fa-check-square.tx-20.tx-orange", {

                                            oncreate: (el) => {

                                                let _det = undefined;
                                                _det = PrescripcionesUci.validarStatus(oData, horas[index].fechaHora)
                                                console.log(888, _det)
                                                if (_det !== undefined && _det.status == 2) {
                                                    el.dom.className = "fa fa-check-square tx-20 tx-success";
                                                }


                                            }
                                        })
                                    ] : []),

                                ])
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
        return PrescripcionesUci.registros;

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



                m("tr.bd.bd-2.tx-uppercase", {
                    style: { "background-color": "rgb(238, 249, 200)", "border-color": "#5173a1" },
                    class: (TurnosUci.nuevoTurno !== null && TurnosUci.nuevoTurno.gestion == 1 ? '' : 'd-none'),

                }, [
                    m("th[scope='col'][colspan='6']",
                        "TIPO DE PRESCRIPCION:"
                    ),
                    m("th[scope='col'][colspan='6']",
                        "PRESCRIPCIÓN:"
                    ),


                ]),
                m("tr.bd.bd-2", {
                    style: { "border-color": "#5173a1" },
                    class: (TurnosUci.nuevoTurno !== null && TurnosUci.nuevoTurno.gestion == 1 ? '' : 'd-none'),

                }, [

                    m("td.tx-14.tx-normal.wd-50p[colspan='6']",
                        m('select.tx-semibold', {
                            id: 'sec_PrescripcionesUci',
                            onchange: (e) => {
                                let _id = e.target.options[e.target.selectedIndex].id;
                                let _value = e.target.options[e.target.selectedIndex].value;
                                if (PrescripcionesUci.nuevoRegistro == null) {
                                    PrescripcionesUci.iniciarRegistro();
                                    PrescripcionesUci.nuevoRegistro.id = _id;
                                    PrescripcionesUci.nuevoRegistro.tipo = _value;
                                } else {
                                    PrescripcionesUci.nuevoRegistro.id = _id;
                                    PrescripcionesUci.nuevoRegistro.tipo = _value;
                                }
                            },
                            class: "custom-select",
                            value: (PrescripcionesUci.nuevoRegistro !== null && PrescripcionesUci.nuevoRegistro.tipo !== null ? PrescripcionesUci.nuevoRegistro.tipo : 0),
                        }, m("option[value='0']", 'Seleccione...'), [{
                                id: "Medicacion",
                                label: "MEDICACIÓN"
                            },
                            {
                                id: "TerapiaRespiratoria",
                                label: "TERAPIA RESPIRATORIA"
                            },

                        ].map(x =>
                            m('option[id="' + x.id + '"][value="' + x.id + '"]', x.label)
                        ))
                    ),
                    m("td.tx-14.tx-normal.wd-50p[colspan='6']",
                        (PrescripcionesUci.nuevoRegistro !== null ? [
                            m('div.d-flex', [
                                m("input", {
                                    id: "pres" + PrescripcionesUci.nuevoRegistro.id,
                                    class: "form-control tx-semibold tx-14",
                                    type: "text",
                                    placeholder: "...",
                                    oncreate: (el) => {

                                        if (PrescripcionesUci.nuevoRegistro.prescripcion != undefined) {
                                            el.dom.value = PrescripcionesUci.nuevoRegistro.prescripcion;
                                        }
                                    },

                                    oninput: (e) => {
                                        PrescripcionesUci.nuevoRegistro.prescripcion = (e.target.value.length !== 0 ? e.target.value : null);
                                    },
                                    value: PrescripcionesUci.nuevoRegistro.prescripcion
                                })
                            ]),

                        ] : [])
                    ),

                ]),
                m("tr.bd.bd-2.tx-uppercase", {
                    style: { "background-color": "rgb(238, 249, 200)", "border-color": "#5173a1" },
                    class: (TurnosUci.nuevoTurno !== null && TurnosUci.nuevoTurno.gestion == 1 ? '' : 'd-none'),

                }, [
                    m("th[scope='col'][colspan='6']",
                        "HORA / FRECUENCIA:"
                    ),
                    m("th[scope='col'][colspan='6']",
                        "MÉDICO:"
                    ),


                ]),
                m("tr.bd.bd-2", {
                    style: { "border-color": "#5173a1" },
                    class: (TurnosUci.nuevoTurno !== null && TurnosUci.nuevoTurno.gestion == 1 ? '' : 'd-none'),
                }, [
                    m("td.tx-14.tx-normal.wd-50p[colspan='6']",

                        (PrescripcionesUci.nuevoRegistro !== null ? [
                            m('div.d-flex', [


                                m("input.form-control[type='text'][placeholder='HH:mm']", {
                                    id: "horaPres" + PrescripcionesUci.nuevoRegistro.id,
                                    oncreate: (el) => {
                                        if (PrescripcionesUci.nuevoRegistro.hora != undefined) {
                                            el.dom.value = PrescripcionesUci.nuevoRegistro.hora;
                                        }

                                        setTimeout(() => {

                                            new Cleave("#horaPres" + PrescripcionesUci.nuevoRegistro.id, {
                                                time: true,
                                                timePattern: ['h', 'm']
                                            });

                                        }, 50);


                                    },
                                    oninput: (e) => {
                                        setTimeout(() => {
                                            PrescripcionesUci.nuevoRegistro.hora = e.target.value;
                                        }, 50);
                                    },
                                }),
                                m('select.tx-semibold', {
                                    id: 'sec_FrecuenciaPres',
                                    onchange: (e) => {
                                        let _id = e.target.options[e.target.selectedIndex].id;
                                        let _value = e.target.options[e.target.selectedIndex].value;
                                        PrescripcionesUci.nuevoRegistro.frecuencia = _value;
                                    },
                                    class: "custom-select",
                                    value: (PrescripcionesUci.nuevoRegistro !== null && PrescripcionesUci.nuevoRegistro.frecuencia !== null ? PrescripcionesUci.nuevoRegistro.frecuencia : 0),
                                }, m("option[value='0']", 'Seleccione...'), [{
                                        id: 1,
                                        value: 1,
                                        label: "CADA HORA"
                                    },
                                    {
                                        id: 2,
                                        value: 2,
                                        label: "CADA 2 HORAS"
                                    },
                                    {
                                        id: 3,
                                        value: 6,
                                        label: "CADA 6 HORAS"
                                    },
                                ].map(x =>
                                    m('option[id="' + x.id + '"][value="' + x.value + '"]', x.label)
                                )),

                            ]),
                        ] : [])
                    ),
                    m("td.tx-14.tx-normal.wd-50p[colspan='6']",
                        (PrescripcionesUci.nuevoRegistro !== null ? [
                            m('div.d-flex', [
                                m("input", {
                                    id: "medicoPress" + PrescripcionesUci.nuevoRegistro.id,
                                    class: "form-control tx-semibold tx-14",
                                    type: "text",
                                    placeholder: "...",
                                    oncreate: (el) => {

                                        if (PrescripcionesUci.nuevoRegistro.medico != undefined) {
                                            el.dom.value = PrescripcionesUci.nuevoRegistro.medico;
                                        }
                                    },
                                    onkeypress: (e) => {
                                        if (e.keyCode == 13) {
                                            PrescripcionesUci.nuevoRegistro.numeroTurno = PacientesUCI.numeroTurno;
                                            PrescripcionesUci.nuevoRegistro.fechaHoraTurno = PacientesUCI.fechaHoraTurno;
                                            PrescripcionesUci.nuevoRegistro.usuarioTurno = PacientesUCI.usuarioTurno;
                                            if (PrescripcionesUci.nuevoRegistro.editar == null) {
                                                console.log(8787, PrescripcionesUci.nuevoRegistro)
                                                setTimeout(() => {
                                                    PrescripcionesUci.nuevoRegistro.timestamp = moment().format('DD-MM-YYYY HH:mm');
                                                    PrescripcionesUci.nuevoRegistro.status = 1;
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
                                                }, 100);

                                            } else {

                                                setTimeout(() => {
                                                    PrescripcionesUci.nuevoRegistro.timestamp = moment().format('DD-MM-YYYY HH:mm');
                                                    PrescripcionesUci.nuevoRegistro.status = 1;
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
                                                }, 100);

                                            }
                                        }
                                    },
                                    oninput: (e) => {
                                        PrescripcionesUci.nuevoRegistro.medico = (e.target.value.length !== 0 ? e.target.value : null);
                                    },
                                    value: PrescripcionesUci.nuevoRegistro.medico
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