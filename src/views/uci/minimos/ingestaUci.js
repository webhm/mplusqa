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
    editar = null;
    tipoBit = 'UCIMINIMOS';
    seccion = 'IngestaUci';
    constructor() {
        this.id = this.id;
        this.nro = this.nro;
        this.fechaHoraTurno = this.fechaHoraTurno;
        this.tipo = this.tipo;
        this.valor = this.valor;
        this.editar = this.editar;
        this.tipoBit = this.tipoBit;
        this.seccion = this.seccion;
    }
}

class IngestaUciNeo {

    static registros = [];
    static nuevoRegistro = null;
    static show = false;
    static showOtros = false;

    static validarRegistro() {

    }

    static iniciarRegistro() {
        IngestaUciNeo.nuevoRegistro = new Valoracion();
    }

    static agregarRegistro() {
        if (IngestaUciNeo.registros.length == 0) {
            IngestaUciNeo.nuevoRegistro.nro = 1;
            IngestaUciNeo.registros.push(IngestaUciNeo.nuevoRegistro);
        } else {
            IngestaUciNeo.nuevoRegistro.nro = (IngestaUciNeo.registros[IngestaUciNeo.registros.length - 1].nro + 1);
            IngestaUciNeo.registros.push(IngestaUciNeo.nuevoRegistro);
        }
    }

    static verRegistro(registro) {
        registro.editar = true;
        IngestaUciNeo.nuevoRegistro = registro;
    }

    static editarRegistro() {
        IngestaUciNeo.nuevoRegistro.editar = null;
        IngestaUciNeo.registros.map((_v, _i) => {
            if (_v.nro == IngestaUciNeo.nuevoRegistro.nro) {
                IngestaUciNeo.registros[_i] = IngestaUciNeo.nuevoRegistro;
            }
        });

    }

    static eliminarRegistro(obj) {

        let res = [];
        IngestaUciNeo.registros.map((_v, _i) => {
            if (_v.nro !== obj.nro) {
                res.push(_v);
            }
        });

        IngestaUciNeo.registros = res;

    }

    static getRegistros() {
        return IngestaUciNeo.registros;
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
                    title: "Valor:",
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
                        return full.tipo != null ? full.tipo : '<div class="text-center pd-l-0 pd-r-0"><hr style="border-color:#001737;"/></div>';
                    },

                    visible: true,
                    aTargets: [4],
                    orderable: true,

                },
                {
                    mRender: function(data, type, full) {
                        return (full.valor != null ? full.valor : '<div class="text-center pd-l-0 pd-r-0"><hr style="border-color:#001737;"/></div>');
                    },
                    visible: true,
                    aTargets: [5],
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
                                                    IngestaUciNeo.nuevoRegistro = null
                                                    IngestaUciNeo.verRegistro(oData);
                                                },
                                            },
                                            'Editar',
                                        ),
                                        m("button.btn.btn-xs.btn-block.btn-outline-danger[type='button']", {
                                                class: (oData.editar ? '' : 'd-none'),
                                                disabled: (PacientesUCI.fechaHoraTurno != oData.fechaHoraTurno ? 'disabled' : ''),

                                                onclick: () => {
                                                    oData.editar = null;
                                                    IngestaUciNeo.nuevoRegistro = null;
                                                },
                                            },
                                            'Cancelar Edición',
                                        ),
                                        m("button.btn.btn-xs.btn-danger[type='button']", {
                                                class: (oData.editar ? 'd-none' : ''),
                                                disabled: (TurnosUci.nuevoTurno !== null && TurnosUci.nuevoTurno.gestion == 1 ? (PacientesUCI.fechaHoraTurno != oData.fechaHoraTurno ? 'disabled' : '') : 'disabled'),
                                                onclick: () => {
                                                    if (confirm("¿Esta Ud seguro de eliminar este registro?") == true) {
                                                        IngestaUciNeo.eliminarRegistro(oData);
                                                        FecthUci.eliminarSeccion(oData);
                                                        IngestaUciNeo.nuevoRegistro = null;
                                                        PacientesUCI.vReloadTable('table-ingesta', IngestaUciNeo.getRegistros());
                                                    }
                                                },
                                            },
                                            'Eliminar',
                                        ),
                                        m("button.btn.btn-xs.btn-dark[type='button']", {
                                                class: (PacientesUCI.fechaHoraTurno != oData.fechaHoraTurno ? '' : 'd-none'),
                                                onclick: () => {
                                                    IngestaUciNeo.iniciarRegistro();
                                                    IngestaUciNeo.nuevoRegistro.id = oData.id;
                                                    IngestaUciNeo.nuevoRegistro.tipo = oData.tipo;
                                                    IngestaUciNeo.nuevoRegistro.valor = oData.valor;
                                                    IngestaUciNeo.nuevoRegistro.numeroTurno = PacientesUCI.numeroTurno;
                                                    IngestaUciNeo.nuevoRegistro.fechaHoraTurno = PacientesUCI.fechaHoraTurno;

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
                    aTargets: [6],
                    orderable: true,

                }


            ],
            fnRowCallback: function(nRow, aData, iDisplayIndex, iDisplayIndexFull) {

            },
        };
    }

    static destroyTable() {
        let table = document.getElementById('table-ingesta');
        // clear first
        if (table != null) {
            $('#table-ingesta').DataTable().clear().destroy();

        }
    }

    view() {
        return [
            m("thead.bd.bd-2", {
                    style: { "border-color": "#5173a1" },
                    class: (TurnosUci.nuevoTurno !== null && TurnosUci.nuevoTurno.gestion == 1 ? '' : 'd-none'),

                },

                m("tr.tx-uppercase", {
                    // class: (PacientesUCI.tipoAtencion !== null && PacientesUCI.tipoAtencion == 'NEO' ? '' : 'd-none'),
                    style: { "background-color": "#CCCCFF" },
                    onclick: () => {
                        if (IngestaUciNeo.show) {
                            IngestaUciNeo.destroyTable();
                        }
                        IngestaUciNeo.show = !IngestaUciNeo.show;
                    }
                }, [
                    m("th.tx-semibold[scope='col'][colspan='12']",
                        "INGESTA:"
                    ),

                ])
            ),
            m("tbody.bd.bd-2", {
                style: { "border-color": "#5173a1" },
                class: (IngestaUciNeo.show ? '' : 'd-none')
            }, [

                m("tr.bd.bd-2.tx-uppercase", {
                    style: { "background-color": "rgb(238, 249, 200)", "border-color": "#5173a1" },
                    class: (TurnosUci.nuevoTurno !== null && TurnosUci.nuevoTurno.gestion == 1 ? '' : 'd-none'),
                }, [
                    m("th[scope='col'][colspan='6']",
                        "TIPO: "
                    ),
                    m("th[scope='col'][colspan='6']",
                        "VALOR: "
                    )
                ]),
                m("tr.bd.bd-2", {
                    style: { "border-color": "#5173a1" },
                    class: (TurnosUci.nuevoTurno !== null && TurnosUci.nuevoTurno.gestion == 1 ? '' : 'd-none'),

                }, [

                    m("td.tx-normal[colspan='6']",
                        m("div.input-group", [
                            m("div.input-group-append",
                                m("button.btn.btn-xs.btn-light[type='button']", {
                                        title: "Nuevo",
                                        onclick: () => {
                                            if (IngestaUciNeo.nuevoRegistro == null) {
                                                IngestaUciNeo.iniciarRegistro();
                                            } else {
                                                IngestaUciNeo.nuevoRegistro = null;
                                            }
                                        }
                                    },
                                    m("i.fas.fa-plus")
                                )
                            ),
                            (IngestaUciNeo.nuevoRegistro !== null ? [

                                m('select.tx-semibold', {
                                    id: 'sec_TipoIngesta',
                                    onchange: (e) => {
                                        let _id = e.target.options[e.target.selectedIndex].id;
                                        let _value = e.target.options[e.target.selectedIndex].value;
                                        if (IngestaUciNeo.nuevoRegistro == null) {
                                            IngestaUciNeo.nuevoRegistro.id = _id;
                                            IngestaUciNeo.nuevoRegistro.tipo = _value;
                                        } else {
                                            IngestaUciNeo.nuevoRegistro.id = _id;
                                            IngestaUciNeo.nuevoRegistro.tipo = _value;
                                        }


                                    },
                                    class: "custom-select",
                                    value: (IngestaUciNeo.nuevoRegistro !== null ? IngestaUciNeo.nuevoRegistro.tipo : 0),
                                }, m("option[value='0']", 'Seleccione...'), [{
                                        id: "SenoMaterno",
                                        label: "Seno Materno"
                                    },
                                    {
                                        id: "Formula",
                                        label: "Fórmula"
                                    }
                                ].map(x =>
                                    m('option[id="' + x.id + '"]', x.label)
                                ))
                            ] : [])
                        ])
                    ),
                    m("td.tx-normal[colspan='6']",
                        (IngestaUciNeo.nuevoRegistro !== null ? [
                            m('select.tx-semibold', {
                                id: 'valorEliminacion',
                                onchange: (e) => {
                                    let _id = e.target.options[e.target.selectedIndex].id;
                                    let _value = e.target.options[e.target.selectedIndex].value;
                                    IngestaUciNeo.nuevoRegistro.valor = _value;
                                },
                                onkeypress: (e) => {
                                    if (e.keyCode == 13) {
                                        IngestaUciNeo.nuevoRegistro.numeroTurno = PacientesUCI.numeroTurno;
                                        IngestaUciNeo.nuevoRegistro.fechaHoraTurno = PacientesUCI.fechaHoraTurno;
                                        if (IngestaUciNeo.nuevoRegistro.editar == null) {
                                            IngestaUciNeo.agregarRegistro();
                                            IngestaUciNeo.nuevoRegistro.id = IngestaUciNeo.nuevoRegistro.nro + 'Eliminacion';
                                            FecthUci.registrarSeccion(IngestaUciNeo.nuevoRegistro);
                                            IngestaUciNeo.nuevoRegistro = null;
                                            PacientesUCI.vReloadTable('table-ingesta', IngestaUciNeo.getRegistros());
                                        } else {
                                            IngestaUciNeo.editarRegistro();
                                            FecthUci.actualizarSeccion(IngestaUciNeo.nuevoRegistro);
                                            IngestaUciNeo.nuevoRegistro = null;
                                            PacientesUCI.vReloadTable('table-ingesta', IngestaUciNeo.getRegistros());
                                        }
                                    }
                                },
                                class: "custom-select",
                                value: (IngestaUciNeo.nuevoRegistro !== null ? IngestaUciNeo.nuevoRegistro.valor : 0),
                            }, m("option[value='0']", 'Seleccione...'), [{
                                    id: "X",
                                    label: "Sí (X)"
                                },
                                {
                                    id: "-",
                                    label: "No (-)"
                                },
                                {
                                    id: "+",
                                    label: "Poco (+)"
                                },
                                {
                                    id: "++",
                                    label: "Mucho (++)"
                                },
                                {
                                    id: "+++",
                                    label: "Poco (+++)"
                                },
                                {
                                    id: "++++",
                                    label: "Mucho (++++)"
                                },
                                {
                                    id: "FORMULA LIQUIDA LECHE (ENFAMIL PREMIUM E1) 20 KILOCALORIAS",
                                    label: "FORMULA LIQUIDA LECHE (ENFAMIL PREMIUM E1) 20 KILOCALORIAS"
                                },
                                {
                                    id: "FORMULA LIQUIDA LECHE (SIMILAC TOTAL CONFORT ETAPA 1)",
                                    label: "FORMULA LIQUIDA LECHE (SIMILAC TOTAL CONFORT ETAPA 1)"
                                },
                                {
                                    id: "FORMULA LIQUIDA LECHE S26 GOLD RFT (ALULA) 70 MILILITROS",
                                    label: "FORMULA LIQUIDA LECHE S26 GOLD RFT (ALULA) 70 MILILITROS"
                                },
                                {
                                    id: "FORMULA LIQUIDA LECHE(NAN PREMATURO DSHL 024-1)70 MILILITROS",
                                    label: "FORMULA LIQUIDA LECHE(NAN PREMATURO DSHL 024-1)70 MILILITROS"
                                },
                                {
                                    id: "FORMULA LIQUIDA LECHE(NUTRILON)20 KILOCALORIAS/90 MILILITROS",
                                    label: "FORMULA LIQUIDA LECHE(NUTRILON)20 KILOCALORIAS/90 MILILITROS"
                                },
                                {
                                    id: "FORMULA POLVO LECHE (ENFAMIL CONFORT PREMIUM) 400 GRAMOS",
                                    label: "FORMULA POLVO LECHE (ENFAMIL CONFORT PREMIUM) 400 GRAMOS"
                                },
                                {
                                    id: "FORMULA POLVO LECHE (ISOMIL ETAPA 1) 400 GRAMOS",
                                    label: "FORMULA POLVO LECHE (ISOMIL ETAPA 1) 400 GRAMOS"
                                },
                                {
                                    id: "FORMULA POLVO LECHE (NAN PREMATURO) 400 GRAMOS",
                                    label: "FORMULA POLVO LECHE (NAN PREMATURO) 400 GRAMOS"
                                },
                                {
                                    id: "FORMULA POLVO LECHE (NEOCATE)",
                                    label: "FORMULA POLVO LECHE (NEOCATE)"
                                },
                                {
                                    id: "FORMULA POLVO LECHE (NESSUCAR) 550 GRAMOS",
                                    label: "FORMULA POLVO LECHE (NESSUCAR) 550 GRAMOS"
                                },
                                {
                                    id: "FORMULA POLVO LECHE (NUTRAMIGEN PREMIUM LGG) 357 GRAMOS",
                                    label: "FORMULA POLVO LECHE (NUTRAMIGEN PREMIUM LGG) 357 GRAMOS"
                                },
                                {
                                    id: "FORMULA POLVO LECHE (NUTRILON PEPTI JUNIOR) 400 GRAMOS",
                                    label: "FORMULA POLVO LECHE (NUTRILON PEPTI JUNIOR) 400 GRAMOS"
                                },
                                {
                                    id: "FORMULA POLVO LECHE (S26 GOLD CONFORT E1) 400 GRAMOS",
                                    label: "FORMULA POLVO LECHE (S26 GOLD CONFORT E1) 400 GRAMOS"
                                },
                                {
                                    id: "FORMULA POLVO LECHE (SIMILAC NEOSURE) 370 GRAMOS",
                                    label: "FORMULA POLVO LECHE (SIMILAC NEOSURE) 370 GRAMOS"
                                },
                                {
                                    id: "FORMULA POLVO LECHE(SIMILAC SENSITIVE SIN LACTOSA) 375 GRAMOS",
                                    label: "FORMULA POLVO LECHE(SIMILAC SENSITIVE SIN LACTOSA) 375 GRAMOS"
                                },
                            ].map(x =>
                                m('option[id="' + x.id + '"]', x.label)
                            ))
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
                        (IngestaUciNeo.show != false ? [PacientesUCI.vTable('table-ingesta', IngestaUciNeo.getRegistros(), IngestaUciNeo.arqTable())] : [])
                    ),
                ]),
                m('br')
            ]),
        ];
    }


}

export default IngestaUciNeo;