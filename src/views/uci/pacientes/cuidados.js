import m from "mithril";
import PacientesUCI from "./pacientesUci";
import FecthUci from "./fecthUci";
import TurnosUci from "./turnosUci";

class Cuidado {
    id = null;
    nro = null;
    cuidado = null;
    frecuencia = null;
    am = null;
    pm = null;
    hs = null;
    editar = null;
    seccion = 'CuidadosGenerales';
    fechaHoraTurno = null;
    constructor() {
        this.id = this.id;
        this.nro = this.nro;
        this.cuidado = this.cuidado;
        this.frecuencia = this.frecuencia;
        this.am = this.pm;
        this.pm = this.pm;
        this.hs = this.hs;
        this.editar = this.editar;
        this.seccion = this.seccion;
        this.fechaHoraTurno = this.fechaHoraTurno;
    }
}


class CuidadosUci {
    static registros = [];
    static nuevoRegistro = null;
    static show = false;

    static validarRegistro() {

    }
    static iniciarRegistro() {
        CuidadosUci.nuevoRegistro = new Cuidado();
    }
    static agregarRegistro() {

        if (CuidadosUci.registros.length == 0) {
            CuidadosUci.nuevoRegistro.nro = 1;
            CuidadosUci.registros.push(CuidadosUci.nuevoRegistro);
        } else {
            CuidadosUci.nuevoRegistro.nro = (CuidadosUci.registros[CuidadosUci.registros.length - 1].nro + 1);
            CuidadosUci.registros.push(CuidadosUci.nuevoRegistro);
        }


    }
    static verRegistro(registro) {
        registro.editar = true;
        CuidadosUci.nuevoRegistro = registro;
    }
    static editarRegistro() {
        CuidadosUci.nuevoRegistro.editar = null;
        CuidadosUci.registros.map((_v, _i) => {
            if (_v.nro == CuidadosUci.nuevoRegistro.nro) {
                CuidadosUci.registros[_i] = CuidadosUci.nuevoRegistro;
            }
        });

    }
    static eliminarRegistro(obj) {

        let res = [];
        CuidadosUci.registros.map((_v, _i) => {

            if (_v.nro !== obj.nro) {
                res.push(_v);
            }

        });

        CuidadosUci.registros = res;

    }
    static getRegistros() {
        return CuidadosUci.registros;
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
                    title: "Order Turno°:",

                }, {
                    title: "Order N°:",
                }, {
                    title: "Turno:",
                },

                {
                    title: "Cuidado:",
                },
                {
                    title: "Frecuencia:",
                },
                {
                    title: "AM:",
                },

                {
                    title: "PM:",
                },
                {
                    title: "HS:",
                },
                {
                    title: "Opciones:",
                },


            ],
            aoColumnDefs: [{
                    mRender: function(data, type, full) {
                        return full.numeroTurno;
                    },
                    visible: false,
                    aTargets: [0],
                    orderable: true,
                },
                {
                    mRender: function(data, type, full) {
                        return full.nro;
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
                                                class: (PacientesUCI.numeroTurno !== oData.numeroTurno ? 'bg-light' : 'bg-warning')
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
                    width: '12%',
                    visible: true,
                    aTargets: [2],
                    orderable: true,

                },
                {
                    mRender: function(data, type, full) {
                        return full.cuidado;
                    },
                    width: '19%',
                    visible: true,
                    aTargets: [3],
                    orderable: true,

                },
                {
                    mRender: function(data, type, full) {
                        return (full.frecuencia != null ? full.frecuencia : '<div class="text-center pd-l-0 pd-r-0"><hr style="border-color:#001737;"/></div>');
                    },
                    width: '10%',
                    visible: true,
                    aTargets: [4],
                    orderable: true,

                },
                {
                    mRender: function(data, type, full) {
                        return (full.am != null ? full.am : '<div class="text-center pd-l-0 pd-r-0"><hr style="border-color:#001737;"/></div>');
                    },
                    width: '10%',
                    visible: true,
                    aTargets: [5],
                    orderable: true,
                },
                {
                    mRender: function(data, type, full) {
                        return (full.pm != null ? full.pm : '<div class="text-center pd-l-0 pd-r-0"><hr style="border-color:#001737;"/></div>');
                    },
                    width: '10%',
                    visible: true,
                    aTargets: [6],
                    orderable: true,
                },
                {
                    mRender: function(data, type, full) {
                        return (full.hs != null ? full.hs : '<div class="text-center pd-l-0 pd-r-0"><hr style="border-color:#001737;"/></div>');
                    },
                    width: '10%',
                    visible: true,
                    aTargets: [7],
                    orderable: true,
                },

                {
                    fnCreatedCell: function(nTd, sData, oData, iRow, iCol) {
                        return m.mount(nTd, {
                            view: () => {
                                return [
                                    m("div.btn-block.btn-group.wd-100p.pd-5", [
                                        m("button.btn.btn-xs.btn-success[type='button']", {
                                                class: (oData.editar ? 'd-none' : ''),
                                                disabled: (PacientesUCI.numeroTurno != oData.numeroTurno ? 'disabled' : ''),
                                                onclick: () => {
                                                    CuidadosUci.nuevoRegistro = null
                                                    CuidadosUci.verRegistro(oData);
                                                },
                                            },
                                            'Editar',
                                        ),
                                        m("button.btn.btn-xs.btn-block.btn-outline-danger[type='button']", {
                                                class: (oData.editar ? '' : 'd-none'),
                                                disabled: (PacientesUCI.numeroTurno != oData.numeroTurno ? 'disabled' : ''),

                                                onclick: () => {
                                                    oData.editar = null;
                                                    CuidadosUci.nuevoRegistro = null;
                                                },
                                            },
                                            'Cancelar Edición',
                                        ),
                                        m("button.btn.btn-xs.btn-danger[type='button']", {
                                                class: (oData.editar ? 'd-none' : ''),
                                                disabled: (PacientesUCI.numeroTurno != oData.numeroTurno ? 'disabled' : ''),

                                                onclick: () => {

                                                    if (confirm("¿Esta Ud seguro de eliminar este registro?") == true) {
                                                        CuidadosUci.eliminarRegistro(oData);
                                                        FecthUci.eliminarSeccion(oData);
                                                        CuidadosUci.nuevoRegistro = null;
                                                        PacientesUCI.vReloadTable('table-cuidados', CuidadosUci.getRegistros());
                                                    }




                                                },
                                            },
                                            'Eliminar',
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

                    class: (CuidadosUci.show ? '' : 'd-none')
                }, [
                    m("th.tx-semibold[scope='col'][colspan='12']",
                        "CUIDADOS GENERALES: "
                    ),


                ]),


            ),
            m("tbody.bd.bd-2", {
                style: { "border-color": "#5173a1" },
                class: (CuidadosUci.show ? '' : 'd-none'),

            }, [
                m("tr.bd.bd-2.tx-uppercase", {
                    class: (TurnosUci.nuevoTurno !== null && TurnosUci.nuevoTurno.gestion == 1 ? '' : 'd-none'),

                    style: { "background-color": "rgb(238, 249, 200)", "border-color": "#5173a1" }
                }, [
                    m("th[scope='col'][colspan='3']",
                        "CUIDADOS: "
                    ),
                    m("th[scope='col'][colspan='3']",
                        "FRECUENCIA: "
                    ),
                    m("th[scope='col'][colspan='2']",
                        "AM: "
                    ),
                    m("th[scope='col'][colspan='2']",
                        "PM: "
                    ),
                    m("th[scope='col'][colspan='2']",
                        "HS: "
                    ),

                ]),
                m("tr.bd.bd-2", {
                    style: { "border-color": "#5173a1" },
                    class: (TurnosUci.nuevoTurno !== null && TurnosUci.nuevoTurno.gestion == 1 ? '' : 'd-none')

                }, [

                    m("td.tx-14.tx-normal[colspan='3']",
                        m('select.tx-semibold', {
                            id: 'sec_CuidadosGenerales',
                            onchange: (e) => {
                                let _id = e.target.options[e.target.selectedIndex].id;
                                let _value = e.target.options[e.target.selectedIndex].value;
                                if (CuidadosUci.nuevoRegistro == null) {
                                    CuidadosUci.iniciarRegistro();
                                    CuidadosUci.nuevoRegistro.id = _id;
                                    CuidadosUci.nuevoRegistro.cuidado = _value;
                                } else {
                                    CuidadosUci.nuevoRegistro.id = _id;
                                    CuidadosUci.nuevoRegistro.cuidado = _value;
                                }
                            },
                            class: "custom-select",
                            value: (CuidadosUci.nuevoRegistro !== null ? CuidadosUci.nuevoRegistro.cuidado : 0),
                        }, m("option[value='0']", 'Seleccione...'), [{
                                id: "CambiosPosicion",
                                label: "CAMBIOS DE POSICIÓN"
                            }, {
                                id: "CuidadosPiel",
                                label: "CUIDADOS DE PIEL"
                            }, {
                                id: "HigieneOral",
                                label: "HIGIENE ORAL"
                            }, {
                                id: "TerapiaRespiratoria",
                                label: "TERAPIA RESPIRATORIA"
                            }, {
                                id: "AspiracionSecrreciones",
                                label: "ASPIRACIÓN DE SECRECIONES"
                            }, {
                                id: "ControlDrenajes",
                                label: "CONTROL DE DRENAJES"
                            }, {
                                id: "ControlSangrado",
                                label: "CONTROL DE SANGRADO"
                            }, {
                                id: "ControlNeurologico",
                                label: "CONTROL NEUROLÓGICO"
                            }, {
                                id: "EsquemaInsulima",
                                label: "ESQUEMA DE INSULINA"
                            },
                            {
                                id: "Posicion",
                                label: "POSICIÓN"
                            },
                            {
                                id: "Asilamiento",
                                label: "AISLAMIENTO"
                            },
                            {
                                id: "ControlTemperaturaMediosFisicos",
                                label: "CONTROL DE TEMPERATURA POR MEDIOS FÍSICOS"
                            },
                            {
                                id: "ControlMarcapasos",
                                label: "CONTROL DE MARCAPASOS"
                            },
                            {
                                id: "ControlPresionVenosaCentral",
                                label: "CONTROL DE PRESION VENOSA CENTRAL"
                            },
                            {
                                id: "RehabilitacionMotora",
                                label: "REHABILITACIÓN MOTORA"
                            },
                            {
                                id: "EnemaEvacuante",
                                label: "ENEMA EVACUANTE"
                            },
                            {
                                id: "ControlPulsosDistales",
                                label: "CONTROL DE PULSOS DISTALES"
                            }
                        ].map(x =>
                            m('option[id="' + x.id + '"]', x.label)
                        ))
                    ),
                    m("td.tx-14.tx-normal[colspan='3']",
                        (CuidadosUci.nuevoRegistro !== null ? [
                            m("input", {
                                id: "frecuencia" + CuidadosUci.nuevoRegistro.id,
                                class: "form-control tx-semibold tx-14",
                                type: "text",
                                placeholder: "...",
                                oninput: (e) => {
                                    CuidadosUci.nuevoRegistro.frecuencia = e.target.value;
                                },
                                value: CuidadosUci.nuevoRegistro.frecuencia
                            })
                        ] : [])
                    ),
                    m("td.tx-14.tx-normal[colspan='2']",
                        (CuidadosUci.nuevoRegistro !== null ? [
                            m("input", {
                                id: "am" + CuidadosUci.nuevoRegistro.id,
                                class: "form-control tx-semibold tx-14",
                                type: "text",
                                placeholder: "...",
                                oninput: (e) => {
                                    CuidadosUci.nuevoRegistro.am = e.target.value;
                                },
                                value: CuidadosUci.nuevoRegistro.am
                            })
                        ] : [])
                    ),
                    m("td.tx-14.tx-normal[colspan='2']",
                        (CuidadosUci.nuevoRegistro !== null ? [
                            m("input", {
                                id: "pm" + CuidadosUci.nuevoRegistro.id,
                                class: "form-control tx-semibold tx-14",
                                type: "text",
                                placeholder: "...",
                                oninput: (e) => {
                                    CuidadosUci.nuevoRegistro.pm = e.target.value;
                                },
                                value: CuidadosUci.nuevoRegistro.pm
                            })
                        ] : [])
                    ),

                    m("td.tx-14.tx-normal[colspan='2']",
                        (CuidadosUci.nuevoRegistro !== null ? [
                            m("input", {
                                id: "hs" + CuidadosUci.nuevoRegistro.id,
                                class: "form-control tx-semibold tx-14",
                                type: "text",
                                placeholder: "...",
                                onkeypress: (e) => {
                                    if (e.keyCode == 13) {
                                        CuidadosUci.nuevoRegistro.numeroTurno = PacientesUCI.numeroTurno;
                                        CuidadosUci.nuevoRegistro.fechaHoraTurno = PacientesUCI.fechaHoraTurno;
                                        if (CuidadosUci.nuevoRegistro.editar == null) {
                                            CuidadosUci.agregarRegistro();
                                            FecthUci.registrarSeccion(CuidadosUci.nuevoRegistro);
                                            CuidadosUci.nuevoRegistro = null;
                                            PacientesUCI.vReloadTable('table-cuidados', CuidadosUci.getRegistros());
                                        } else {
                                            CuidadosUci.editarRegistro();
                                            FecthUci.actualizarSeccion(CuidadosUci.nuevoRegistro);
                                            CuidadosUci.nuevoRegistro = null;
                                            PacientesUCI.vReloadTable('table-cuidados', CuidadosUci.getRegistros());
                                        }


                                    }
                                },
                                oninput: (e) => {
                                    CuidadosUci.nuevoRegistro.hs = e.target.value;
                                },
                                value: CuidadosUci.nuevoRegistro.hs
                            })
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
                        (CuidadosUci.show != false ? [PacientesUCI.vTable('table-cuidados', CuidadosUci.getRegistros(), CuidadosUci.arqTable())] : [])
                    ),
                ]),
                m('br')

            ]),


        ]
    }

}

export default CuidadosUci;