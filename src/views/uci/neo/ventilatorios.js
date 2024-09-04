import m from "mithril";
import FecthUci from "./fecthUci";
import PacientesUCI from "./pacientesUci";
import TurnosUci from "./turnosUci";

class Valoracion {
    id = null;
    nro = null;
    fechaHoraTurno = null;
    tipo = null;
    valor = null;
    timestamp = null;
    editar = null;
    tipoBit = 'UCINEO';
    seccion = 'Ventilatorios';
    constructor() {
        this.id = this.id;
        this.nro = this.nro;
        this.fechaHoraTurno = this.fechaHoraTurno;
        this.tipo = this.tipo;
        this.valor = this.valor;
        this.timestamp = this.timestamp;
        this.editar = this.editar;
        this.tipoBit = this.tipoBit;
        this.seccion = this.seccion;
    }
}

class VentilatoriosNeo {

    static registros = [];
    static nuevoRegistro = null;
    static show = false;
    static showOtros = false;

    static validarRegistro() {

    }

    static iniciarRegistro() {
        VentilatoriosNeo.nuevoRegistro = new Valoracion();
    }

    static agregarRegistro() {
        if (VentilatoriosNeo.registros.length == 0) {
            VentilatoriosNeo.nuevoRegistro.nro = 1;
            VentilatoriosNeo.registros.push(VentilatoriosNeo.nuevoRegistro);
        } else {
            VentilatoriosNeo.nuevoRegistro.nro = (VentilatoriosNeo.registros[VentilatoriosNeo.registros.length - 1].nro + 1);
            VentilatoriosNeo.registros.push(VentilatoriosNeo.nuevoRegistro);
        }
    }

    static verRegistro(registro) {
        registro.editar = true;
        VentilatoriosNeo.nuevoRegistro = registro;
    }

    static editarRegistro() {
        VentilatoriosNeo.nuevoRegistro.editar = null;
        VentilatoriosNeo.registros.map((_v, _i) => {
            if (_v.nro == VentilatoriosNeo.nuevoRegistro.nro) {
                VentilatoriosNeo.registros[_i] = VentilatoriosNeo.nuevoRegistro;
            }
        });

    }

    static eliminarRegistro(obj) {

        let res = [];
        VentilatoriosNeo.registros.map((_v, _i) => {
            if (_v.nro !== obj.nro) {
                res.push(_v);
            }
        });

        VentilatoriosNeo.registros = res;

    }

    static getRegistros() {
        return VentilatoriosNeo.registros;
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
                oAria: {
                    sSortAscending: ": Activar para ordenar la columna de manera ascendente",
                    sSortDescending: ": Activar para ordenar la columna de manera descendente",
                },
            },
            cache: false,
            destroy: true,
            order: [
                [0, 'desc'],
                [1, 'desc']
            ],
            columns: [{
                title: "order Turno:",
            },
            {
                title: "order N°:",
            },
            {
                title: "Turno:",
            },
            {
                title: "N°:",
            },
            {
                title: "Tipo:",
            },
            {
                title: "Hora:",
            },
            {
                title: "Valor:",
            },
            {
                title: "Cantidad:",
            },
            {
                title: "Opciones:",
            }
            ],
            aoColumnDefs: [{
                mRender: function (data, type, full) {
                    return full.fechaHoraTurno;
                },
                visible: false,
                aTargets: [0],
                orderable: true,
            },
            {
                mRender: function (data, type, full) {
                    return full.nro;
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
                visible: true,
                aTargets: [2],
                orderable: false,

            },
            {
                mRender: function (data, type, full) {
                    return full.nro;
                },

                visible: false,
                aTargets: [3],
                orderable: false,

            },

            {
                mRender: function (data, type, full) {
                    return full.tipo != null ? full.tipo : '<div class="text-center pd-l-0 pd-r-0"><hr style="border-color:#001737;"/></div>';
                },

                visible: true,
                aTargets: [4],
                orderable: true,

            },
            {
                mRender: function (data, type, full) {
                    return full.hora != null ? full.hora : '<div class="text-center pd-l-0 pd-r-0"><hr style="border-color:#001737;"/></div>';
                },

                visible: true,
                aTargets: [5],
                orderable: true,

            },
            {
                mRender: function (data, type, full) {
                    return (full.valor != null ? full.valor : '<div class="text-center pd-l-0 pd-r-0"><hr style="border-color:#001737;"/></div>');
                },
                visible: true,
                aTargets: [6],
                orderable: true,

            },
            {
                mRender: function (data, type, full) {
                    return (full.cantidad != null ? full.cantidad : '<div class="text-center pd-l-0 pd-r-0"><hr style="border-color:#001737;"/></div>');
                },
                visible: false,
                aTargets: [7],
                orderable: true,

            },

            {
                fnCreatedCell: function (nTd, sData, oData, iRow, iCol) {
                    return m.mount(nTd, {
                        view: () => {
                            return [
                                m("div.btn-block.btn-group.wd-100p.pd-5", [
                                    m("button.btn.btn-xs.btn-success[type='button']", {
                                        class: (oData.editar ? 'd-none' : ''),
                                        disabled: (TurnosUci.nuevoTurno !== null && TurnosUci.nuevoTurno.gestion == 1 ? (PacientesUCI.fechaHoraTurno != oData.fechaHoraTurno ? 'disabled' : '') : 'disabled'),
                                        onclick: () => {
                                            VentilatoriosNeo.nuevoRegistro = null
                                            VentilatoriosNeo.verRegistro(oData);
                                        },
                                    },
                                        'Editar',
                                    ),
                                    m("button.btn.btn-xs.btn-block.btn-outline-danger[type='button']", {
                                        class: (oData.editar ? '' : 'd-none'),
                                        disabled: (PacientesUCI.fechaHoraTurno != oData.fechaHoraTurno ? 'disabled' : ''),

                                        onclick: () => {
                                            oData.editar = null;
                                            VentilatoriosNeo.nuevoRegistro = null;
                                        },
                                    },
                                        'Cancelar Edición',
                                    ),
                                    m("button.btn.btn-xs.btn-danger[type='button']", {
                                        class: (oData.editar ? 'd-none' : ''),
                                        disabled: (TurnosUci.nuevoTurno !== null && TurnosUci.nuevoTurno.gestion == 1 ? (PacientesUCI.fechaHoraTurno != oData.fechaHoraTurno ? 'disabled' : '') : 'disabled'),
                                        onclick: () => {
                                            if (confirm("¿Esta Ud seguro de eliminar este registro?") == true) {
                                                VentilatoriosNeo.eliminarRegistro(oData);
                                                FecthUci.eliminarSeccion(oData);
                                                VentilatoriosNeo.nuevoRegistro = null;
                                                PacientesUCI.vReloadTable('table-VentilatoriosNeo', VentilatoriosNeo.getRegistros());
                                            }
                                        },
                                    },
                                        'Eliminar',
                                    ),
                                    m("button.btn.btn-xs.btn-dark[type='button']", {
                                        class: (PacientesUCI.fechaHoraTurno != oData.fechaHoraTurno ? '' : 'd-none'),
                                        onclick: () => {
                                            VentilatoriosNeo.iniciarRegistro();
                                            VentilatoriosNeo.nuevoRegistro.id = oData.id;
                                            VentilatoriosNeo.nuevoRegistro.tipo = oData.tipo;
                                            VentilatoriosNeo.nuevoRegistro.valor = oData.valor;
                                            VentilatoriosNeo.nuevoRegistro.hora = oData.hora;
                                            VentilatoriosNeo.nuevoRegistro.numeroTurno = PacientesUCI.numeroTurno;
                                            VentilatoriosNeo.nuevoRegistro.fechaHoraTurno = PacientesUCI.fechaHoraTurno;

                                        },
                                    },
                                        'Copiar',
                                    ),
                                ])

                            ]
                        }
                    });
                },
                width: '10%',
                visible: true,
                aTargets: [8],
                orderable: true,

            }
            ],
            fnRowCallback: function (nRow, aData, iDisplayIndex, iDisplayIndexFull) {

            },
        };
    }

    static destroyTable() {
        let table = document.getElementById('table-VentilatoriosNeo');
        // clear first
        if (table != null) {
            $('#table-VentilatoriosNeo').DataTable().clear().destroy();

        }
    }

    static validarRegistroUnicoPorTurno(tipo) {
        VentilatoriosNeo.registros.map((_v, _i) => {
            if (_v.tipo == tipo && _v.hora == VentilatoriosNeo.nuevoRegistro.hora && _v.numeroTurno == PacientesUCI.numeroTurno) {
                throw 'error';
            }
        });
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
                        if (VentilatoriosNeo.show) {
                            VentilatoriosNeo.destroyTable();
                        }
                        VentilatoriosNeo.show = !VentilatoriosNeo.show;
                    }
                }, [
                    m("th.tx-semibold[scope='col'][colspan='12']",
                        "OXIGENOTERAPIA Y VENTILACIÓN MECÁNICA:"
                    ),

                ])
            ),
            m("tbody.bd.bd-2", {
                style: { "border-color": "#5173a1" },
                class: (VentilatoriosNeo.show ? '' : 'd-none')
            }, [

                m("tr.bd.bd-2.tx-uppercase", {
                    style: { "background-color": "rgb(238, 249, 200)", "border-color": "#5173a1" },
                    class: (TurnosUci.nuevoTurno !== null && TurnosUci.nuevoTurno.gestion == 1 ? '' : 'd-none'),
                }, [
                    m("th[scope='col'][colspan='4']",
                        "TIPO: "
                    ),

                    m("th[scope='col'][colspan='4']",
                        "HORA: "
                    ),
                    m("th[scope='col'][colspan='4']",
                        "VALOR: "
                    ),
                ]),
                m("tr.bd.bd-2", {
                    style: { "border-color": "#5173a1" },
                    class: (TurnosUci.nuevoTurno !== null && TurnosUci.nuevoTurno.gestion == 1 ? '' : 'd-none'),

                }, [

                    m("td.tx-normal[colspan='4']",
                        m("div.input-group", [
                            m("div.input-group-append",
                                m("button.btn.btn-xs.btn-light[type='button']", {
                                    title: "Nuevo",
                                    onclick: () => {
                                        if (VentilatoriosNeo.nuevoRegistro == null) {
                                            VentilatoriosNeo.iniciarRegistro();
                                        } else {
                                            VentilatoriosNeo.nuevoRegistro = null;
                                        }
                                    }
                                },
                                    m("i.fas.fa-plus")
                                )
                            ),
                            (VentilatoriosNeo.nuevoRegistro !== null ? [

                                m('select.tx-semibold', {
                                    id: 'sec_VentilatoriosNeo',
                                    onchange: (e) => {
                                        let _id = e.target.options[e.target.selectedIndex].id;
                                        let _value = e.target.options[e.target.selectedIndex].value;
                                        if (VentilatoriosNeo.nuevoRegistro == null) {
                                            VentilatoriosNeo.nuevoRegistro.id = _id;
                                            VentilatoriosNeo.nuevoRegistro.tipo = _value;
                                        } else {
                                            VentilatoriosNeo.nuevoRegistro.id = _id;
                                            VentilatoriosNeo.nuevoRegistro.tipo = _value;
                                        }
                                    },
                                    class: "custom-select",
                                    value: (VentilatoriosNeo.nuevoRegistro !== null ? VentilatoriosNeo.nuevoRegistro.tipo : 0),
                                }, [{
                                    orden: 1,
                                    id: "ModoVentilatorio",
                                    label: "MODO VENTILATORIO"
                                },
                                {
                                    orden: 2,
                                    id: "FIO2",
                                    label: "FIO2"
                                },
                                {
                                    orden: 3,
                                    id: "Flujo",
                                    label: "FLUJO"
                                },
                                {
                                    orden: 4,
                                    id: "VolumenMinutoEspiradoMaquina",
                                    label: "VOLUMEN MINUTO ESPIRADO MÁQUINA"
                                },
                                {
                                    orden: 5,
                                    id: "VolumenTidalEspiradoMaquina",
                                    label: "VOLUMEN TIDAL ESPIRADO MÁQUINA"
                                },
                                {
                                    orden: 6,
                                    id: "PresionInspiratoriaMaxima",
                                    label: "PRESION INSPIRATORIA MAXIMA / PIP"
                                },
                                {
                                    orden: 7,
                                    id: "PEEP",
                                    label: "PEEP"
                                },
                                {
                                    orden: 8,
                                    id: "TiempoInspiracion",
                                    label: "TIEMPO INSPIRACIÓN"
                                },
                                {
                                    orden: 9,
                                    id: "TiempoEspiracion",
                                    label: "TIEMPO ESPIRACIÓN"
                                },
                                {
                                    orden: 10,
                                    id: "FRV",
                                    label: "FRECUENCIA RESPIRATORIA MÁQUINA"
                                },
                                {
                                    orden: 11,
                                    id: "RelacionInspiracionEspiracion",
                                    label: "RELACIÓN INSPIRACION - ESPIRACION"
                                },
                                {
                                    orden: 12,
                                    id: "Amplitud",
                                    label: "AMPLITUD"
                                },
                                {
                                    orden: 13,
                                    id: "Hercios",
                                    label: "HERCIOS"
                                }, {
                                    orden: 14,
                                    id: "PresionMediaViaArea",
                                    label: "PRESION MEDIA VIA AÉREA"
                                }, {
                                    orden: 15,
                                    id: "OxigenoLitrosMinuto",
                                    label: "OXÍGENO LITROS POR MINUTO"
                                }, {
                                    orden: 16,
                                    id: "ComplianceResistencia",
                                    label: "COMPLIANCE / RESISTENCIA"
                                },
                                {
                                    orden: 17,
                                    id: "Co2",
                                    label: "CO2"
                                }, {
                                    orden: 18,
                                    id: "AireComprimido",
                                    label: "AIRE COMPRIMIDO (PORCENTAJE)"
                                }, {
                                    orden: 19,
                                    id: "OxidoNitrico",
                                    label: "ÓXIDO NÍTRICO"
                                },
                                ].map(x =>
                                    m('option[id="' + x.id + '"]', x.label)
                                ))
                            ] : [])
                        ])
                    ),
                    m("td.tx-normal[colspan='4']",
                        (VentilatoriosNeo.nuevoRegistro !== null ? [
                            m("input[type='text'][placeholder='HH:mm']", {
                                id: 'horaValorVentilatoriosNeo',
                                class: 'form-control',
                                oncreate: (el) => {

                                    if (VentilatoriosNeo.nuevoRegistro !== null && VentilatoriosNeo.nuevoRegistro.hora !== null) {
                                        el.dom.value = VentilatoriosNeo.nuevoRegistro.hora;
                                    }

                                    setTimeout(() => {
                                        new Cleave("#" + el.dom.id, {
                                            time: true,
                                            timePattern: ['h', 'm']
                                        });
                                    }, 90);

                                },
                                oninput: (e) => {
                                    setTimeout(() => {
                                        try {
                                            //GasesUci.nuevoRegistro.hora = moment(PacientesUCI.fechaHoraTurno, 'DD-MM-YYYY HH:mm').format('DD-MM-YYYY') + ' ' + e.target.value;
                                            VentilatoriosNeo.setHora = (e.target.value.length !== 0 ? e.target.value : null);
                                            VentilatoriosNeo.nuevoRegistro.hora = (e.target.value.length !== 0 ? e.target.value : null);
                                            VentilatoriosNeo.validarRegistroUnicoPorTurno(VentilatoriosNeo.nuevoRegistro.tipo);
                                        } catch (error) {
                                            VentilatoriosNeo.nuevoRegistro = null;
                                            $.alert('No es posible ingresar este valor. Ya existe este registro.');
                                        }
                                    }, 50);
                                },

                            }),
                        ] : [])
                    ),
                    m("td.tx-normal[colspan='4']",
                        (VentilatoriosNeo.nuevoRegistro !== null ? [
                            m("input[type='text'][placeholder='Valor']", {
                                id: 'cantidadValorVentilatoriosNeo',
                                class: 'form-control',
                                oncreate: (el) => {

                                    if (VentilatoriosNeo.nuevoRegistro !== null && VentilatoriosNeo.nuevoRegistro.valor !== null) {
                                        el.dom.value = VentilatoriosNeo.nuevoRegistro.valor;
                                    }



                                },
                                oninput: (e) => {
                                    setTimeout(() => {
                                        //GasesUci.nuevoRegistro.hora = moment(PacientesUCI.fechaHoraTurno, 'DD-MM-YYYY HH:mm').format('DD-MM-YYYY') + ' ' + e.target.value;
                                        VentilatoriosNeo.nuevoRegistro.valor = (e.target.value.length !== 0 ? e.target.value : null);

                                    }, 50);
                                },
                                onkeypress: (e) => {
                                    if (e.keyCode == 13) {
                                        VentilatoriosNeo.nuevoRegistro.numeroTurno = PacientesUCI.numeroTurno;
                                        VentilatoriosNeo.nuevoRegistro.fechaHoraTurno = PacientesUCI.fechaHoraTurno;
                                        VentilatoriosNeo.nuevoRegistro.timestamp = moment().format('DD-MM-YYYY') + ' ' + VentilatoriosNeo.nuevoRegistro.hora;

                                        if (moment(VentilatoriosNeo.nuevoRegistro.timestamp, "DD-MM-YYYY HH:mm", true).isValid() == false) {
                                            $.alert(VentilatoriosNeo.nuevoRegistro.timestamp + ' El valor de Hora no tiene el formato HH:mm necesario.');
                                        } else if (VentilatoriosNeo.nuevoRegistro.valor == null || VentilatoriosNeo.nuevoRegistro.valor.length == 0) {
                                            $.alert('El campo Tipo o Valor no puede ser vacio.');
                                        } else {
                                            if (VentilatoriosNeo.nuevoRegistro.editar == null) {
                                                VentilatoriosNeo.agregarRegistro();
                                                FecthUci.registrarSeccion(VentilatoriosNeo.nuevoRegistro);
                                                VentilatoriosNeo.nuevoRegistro = null;
                                                PacientesUCI.vReloadTable('table-VentilatoriosNeo', VentilatoriosNeo.getRegistros());
                                            } else {
                                                VentilatoriosNeo.editarRegistro();
                                                FecthUci.actualizarSeccion(VentilatoriosNeo.nuevoRegistro);
                                                VentilatoriosNeo.nuevoRegistro = null;
                                                PacientesUCI.vReloadTable('table-VentilatoriosNeo', VentilatoriosNeo.getRegistros());
                                            }
                                        }


                                    }
                                },
                            }),
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
                        (VentilatoriosNeo.show != false ? [PacientesUCI.vTable('table-VentilatoriosNeo', VentilatoriosNeo.getRegistros(), VentilatoriosNeo.arqTable())] : [])
                    ),
                ]),
                m('br')
            ]),
        ];
    }


}

export default VentilatoriosNeo;