import m from "mithril";
import FecthUci from "./fecthUci";
import PacientesUCI from "./pacientesUci";
import TurnosUci from "./turnosUci";

class Ulcera {
    id = null;
    nro = null;
    fechaHoraTurno = null;
    trae = null;
    localizacion = null;
    inicio = null;
    grado = null;
    editar = null;
    tipoBit = 'UCINEO';
    seccion = 'UlcerasPed';
    constructor() {
        this.id = this.id;
        this.nro = this.nro;
        this.fechaHoraTurno = this.fechaHoraTurno;
        this.trae = this.trae;
        this.localizacion = this.localizacion;
        this.inicio = this.inicio;
        this.grado = this.grado;
        this.editar = this.editar;
        this.tipoBit = this.tipoBit;
        this.seccion = this.seccion;
    }
}


class UlcerasUciPed {

    static registros = [];
    static nuevoRegistro = null;
    static show = false;
    static showOtros = false;

    static validarRegistro() {

    }

    static iniciarRegistro() {
        UlcerasUciPed.nuevoRegistro = new Ulcera();
    }

    static agregarRegistro() {
        if (UlcerasUciPed.registros.length == 0) {
            UlcerasUciPed.nuevoRegistro.nro = 1;
            UlcerasUciPed.registros.push(UlcerasUciPed.nuevoRegistro);
        } else {
            UlcerasUciPed.nuevoRegistro.nro = (UlcerasUciPed.registros[UlcerasUciPed.registros.length - 1].nro + 1);
            UlcerasUciPed.registros.push(UlcerasUciPed.nuevoRegistro);
        }
    }

    static verRegistro(registro) {
        registro.editar = true;
        UlcerasUciPed.nuevoRegistro = registro;
    }

    static editarRegistro() {
        UlcerasUciPed.nuevoRegistro.editar = null;
        UlcerasUciPed.registros.map((_v, _i) => {
            if (_v.nro == UlcerasUciPed.nuevoRegistro.nro) {
                UlcerasUciPed.registros[_i] = UlcerasUciPed.nuevoRegistro;
            }
        });

    }

    static eliminarRegistro(obj) {

        let res = [];
        UlcerasUciPed.registros.map((_v, _i) => {
            if (_v.nro !== obj.nro) {
                res.push(_v);
            }
        });

        UlcerasUciPed.registros = res;

    }

    static getRegistros() {
        return UlcerasUciPed.registros;
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
                    title: "Trae:",
                },
                {
                    title: "Fecha de Inicio:",
                },
                {
                    title: "Localización:",
                },
                {
                    title: "Grado:",
                },
                {
                    title: "Opciones:",
                }
            ],
            aoColumnDefs: [{
                    mRender: function(data, type, full) {
                        return full.fechaHoraTurno;
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
                        return full.nro;
                    },

                    visible: false,
                    aTargets: [3],
                    orderable: false,

                },

                {
                    mRender: function(data, type, full) {
                        return full.trae != null ? full.trae : '<div class="text-center pd-l-0 pd-r-0"><hr style="border-color:#001737;"/></div>';
                    },

                    visible: true,
                    aTargets: [4],
                    orderable: true,

                },
                {
                    mRender: function(data, type, full) {
                        return (full.inicio != null ? full.inicio : '<div class="text-center pd-l-0 pd-r-0"><hr style="border-color:#001737;"/></div>');
                    },
                    visible: true,
                    aTargets: [5],
                    orderable: true,

                },
                {
                    mRender: function(data, type, full) {
                        return (full.localizacion != null ? full.localizacion : '<div class="text-center pd-l-0 pd-r-0"><hr style="border-color:#001737;"/></div>');
                    },
                    visible: true,
                    aTargets: [6],
                    orderable: true,
                },
                {
                    mRender: function(data, type, full) {
                        return (full.grado != null ? full.grado : '<div class="text-center pd-l-0 pd-r-0"><hr style="border-color:#001737;"/></div>');
                    },
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
                                                disabled: (TurnosUci.nuevoTurno !== null && TurnosUci.nuevoTurno.gestion == 1 ? (PacientesUCI.fechaHoraTurno != oData.fechaHoraTurno ? 'disabled' : '') : 'disabled'),
                                                onclick: () => {
                                                    UlcerasUciPed.nuevoRegistro = null
                                                    UlcerasUciPed.verRegistro(oData);
                                                },
                                            },
                                            'Editar',
                                        ),
                                        m("button.btn.btn-xs.btn-block.btn-outline-danger[type='button']", {
                                                class: (oData.editar ? '' : 'd-none'),
                                                disabled: (PacientesUCI.fechaHoraTurno != oData.fechaHoraTurno ? 'disabled' : ''),

                                                onclick: () => {
                                                    oData.editar = null;
                                                    UlcerasUciPed.nuevoRegistro = null;
                                                },
                                            },
                                            'Cancelar Edición',
                                        ),
                                        m("button.btn.btn-xs.btn-danger[type='button']", {
                                                class: (oData.editar ? 'd-none' : ''),
                                                disabled: (TurnosUci.nuevoTurno !== null && TurnosUci.nuevoTurno.gestion == 1 ? (PacientesUCI.fechaHoraTurno != oData.fechaHoraTurno ? 'disabled' : '') : 'disabled'),
                                                onclick: () => {
                                                    if (confirm("¿Esta Ud seguro de eliminar este registro?") == true) {
                                                        UlcerasUciPed.eliminarRegistro(oData);
                                                        FecthUci.eliminarSeccion(oData);
                                                        UlcerasUciPed.nuevoRegistro = null;
                                                        PacientesUCI.vReloadTable('table-ulceras-uci-neo', UlcerasUciPed.getRegistros());
                                                    }
                                                },
                                            },
                                            'Eliminar',
                                        ),
                                        m("button.btn.btn-xs.btn-dark[type='button']", {
                                                class: (PacientesUCI.fechaHoraTurno != oData.fechaHoraTurno ? '' : 'd-none'),
                                                onclick: () => {
                                                    UlcerasUciPed.iniciarRegistro();
                                                    UlcerasUciPed.nuevoRegistro.id = oData.id;
                                                    UlcerasUciPed.nuevoRegistro.via = oData.via;
                                                    UlcerasUciPed.nuevoRegistro.ubicacion = oData.ubicacion;
                                                    UlcerasUciPed.nuevoRegistro.tipo = oData.tipo;
                                                    UlcerasUciPed.nuevoRegistro.inicio = oData.inicio;
                                                    UlcerasUciPed.nuevoRegistro.retiro = oData.retiro;
                                                    UlcerasUciPed.nuevoRegistro.curacion = oData.curacion;
                                                    UlcerasUciPed.nuevoRegistro.condicion = oData.condicion;
                                                    UlcerasUciPed.nuevoRegistro.observacion = oData.observacion;
                                                    UlcerasUciPed.nuevoRegistro.numeroTurno = PacientesUCI.numeroTurno;
                                                    UlcerasUciPed.nuevoRegistro.fechaHoraTurno = PacientesUCI.fechaHoraTurno;

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
            fnRowCallback: function(nRow, aData, iDisplayIndex, iDisplayIndexFull) {

            },
        };
    }

    static destroyTable() {
        let table = document.getElementById('table-ulceras-uci-neo');
        // clear first
        if (table != null) {
            $('#table-ulceras-uci-neo').DataTable().clear().destroy();

        }
    }


    view() {
        return [
            m("thead.bd.bd-2", {
                    style: { "border-color": "#5173a1" },
                    class: (TurnosUci.nuevoTurno !== null && TurnosUci.nuevoTurno.gestion == 1 ? '' : 'd-none'),

                },

                m("tr.tx-uppercase", {
                    class: (PacientesUCI.tipoAtencion !== null && PacientesUCI.tipoAtencion !== 'NEO' ? '' : 'd-none'),

                    style: { "background-color": "#CCCCFF" },
                    onclick: () => {
                        if (UlcerasUciPed.show) {
                            UlcerasUciPed.destroyTable();
                        }
                        UlcerasUciPed.show = !UlcerasUciPed.show;
                    }
                }, [
                    m("th.tx-semibold[scope='col'][colspan='12']",
                        "VALORACIÓN FÍSICA:"
                    ),

                ])
            ),
            m("tbody.bd.bd-2", {
                style: { "border-color": "#5173a1" },
                class: (UlcerasUciPed.show ? '' : 'd-none')
            }, [

                m("tr.bd.bd-2.tx-uppercase", {
                    style: { "background-color": "rgb(238, 249, 200)", "border-color": "#5173a1" },
                    class: (TurnosUci.nuevoTurno !== null && TurnosUci.nuevoTurno.gestion == 1 ? '' : 'd-none'),
                }, [
                    m("th[scope='col'][colspan='3']",
                        "TRAE: "
                    ),
                    m("th[scope='col'][colspan='3']",
                        "FECHA DE INICIO: "
                    ),
                    m("th[scope='col'][colspan='3']",
                        "LOCALIZACIÓN: "
                    ),
                    m("th[scope='col'][colspan='3']",
                        "GRADO: "
                    )

                ]),
                m("tr.bd.bd-2", {
                    style: { "border-color": "#5173a1" },
                    class: (TurnosUci.nuevoTurno !== null && TurnosUci.nuevoTurno.gestion == 1 ? '' : 'd-none'),

                }, [


                    m("td.tx-normal[colspan='3']",


                        m("div.input-group", [
                            m("div.input-group-append",
                                m("button.btn.btn-xs.btn-light[type='button']", {
                                        title: "Nuevo",
                                        onclick: () => {
                                            if (UlcerasUciPed.nuevoRegistro == null) {
                                                UlcerasUciPed.iniciarRegistro();
                                            } else {
                                                UlcerasUciPed.nuevoRegistro = null;
                                            }

                                        }
                                    },
                                    m("i.fas.fa-plus")
                                )
                            ),
                            (UlcerasUciPed.nuevoRegistro !== null ? [
                                m("input", {
                                    id: "traeUlcera",
                                    class: "form-control tx-semibold tx-14",
                                    type: "text",
                                    placeholder: "...",
                                    oninput: (e) => {
                                        UlcerasUciPed.nuevoRegistro.trae = (e.target.value.length !== 0 ? e.target.value : null);
                                        console.log(5454, UlcerasUciPed.nuevoRegistro)
                                    },
                                    value: UlcerasUciPed.nuevoRegistro.trae

                                }),
                            ] : [])


                        ])



                    ),
                    m("td.tx-normal[colspan='3']",
                        (UlcerasUciPed.nuevoRegistro !== null ? [
                            m("input[type='text'][placeholder='DD/MM/YYYY']", {
                                id: "fechaInicioUlcera",
                                class: "form-control tx-semibold tx-14",
                                oncreate: (el) => {
                                    if (UlcerasUciPed.nuevoRegistro.inicio !== undefined) {
                                        el.dom.value = UlcerasUciPed.nuevoRegistro.inicio;
                                    }
                                    setTimeout(() => {
                                        new Cleave("#fechaInicioUlcera", {
                                            date: true,
                                            datePattern: ["d", "m", "Y"]
                                        });
                                    }, 50);
                                },
                                oninput: (e) => {
                                    setTimeout(() => {
                                        UlcerasUciPed.nuevoRegistro.inicio = e.target.value;
                                    }, 50);
                                },
                            }),
                        ] : [])

                    ),
                    m("td.tx-normal[colspan='3']",
                        (UlcerasUciPed.nuevoRegistro !== null ? [
                            m("input", {
                                id: "localizacionUlcera",
                                class: "form-control tx-semibold tx-14",
                                type: "text",
                                placeholder: "...",
                                oninput: (e) => {
                                    UlcerasUciPed.nuevoRegistro.localizacion = (e.target.value.length !== 0 ? e.target.value : null);
                                },
                                value: UlcerasUciPed.nuevoRegistro.localizacion
                            })
                        ] : [])
                    ),
                    m("td.tx-normal[colspan='3']",
                        (UlcerasUciPed.nuevoRegistro !== null ? [
                            m("input", {
                                id: "gradoUlcera",
                                class: "form-control tx-semibold tx-14",
                                type: "text",
                                placeholder: "...",
                                value: UlcerasUciPed.nuevoRegistro.grado,
                                oninput: (e) => {
                                    console.log(9898, UlcerasUciPed.nuevoRegistro)
                                    UlcerasUciPed.nuevoRegistro.grado = (e.target.value.length !== 0 ? e.target.value : null);
                                },
                                onkeypress: (e) => {
                                    if (e.keyCode == 13) {
                                        UlcerasUciPed.nuevoRegistro.numeroTurno = PacientesUCI.numeroTurno;
                                        UlcerasUciPed.nuevoRegistro.fechaHoraTurno = PacientesUCI.fechaHoraTurno;
                                        if (UlcerasUciPed.nuevoRegistro.editar == null) {
                                            UlcerasUciPed.agregarRegistro();
                                            UlcerasUciPed.nuevoRegistro.id = UlcerasUciPed.nuevoRegistro.nro + 'Ulcera';
                                            FecthUci.registrarSeccion(UlcerasUciPed.nuevoRegistro);
                                            UlcerasUciPed.nuevoRegistro = null;
                                            PacientesUCI.vReloadTable('table-ulceras-uci-neo', UlcerasUciPed.getRegistros());
                                        } else {
                                            UlcerasUciPed.editarRegistro();
                                            FecthUci.actualizarSeccion(UlcerasUciPed.nuevoRegistro);
                                            UlcerasUciPed.nuevoRegistro = null;
                                            PacientesUCI.vReloadTable('table-ulceras-uci-neo', UlcerasUciPed.getRegistros());
                                        }
                                    }
                                },
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
                        (UlcerasUciPed.show != false ? [PacientesUCI.vTable('table-ulceras-uci-neo', UlcerasUciPed.getRegistros(), UlcerasUciPed.arqTable())] : [])
                    ),
                ]),
                m('br')
            ]),
        ];
    }


}

export default UlcerasUciPed;