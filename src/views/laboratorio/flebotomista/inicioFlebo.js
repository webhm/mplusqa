import m from "mithril";
import App from "../../../models/App";
import HeaderPublic from "../../layout/headerPublic";
import P2PMessage from "../../../models/P2PMessage";
import Errors from "../../utils/errors";
import Loader from "../../utils/loader";
import Table from "../../utils/table";

function stopwatchModel() {
    return {
        interval: null,
        seconds: 100,
        isPaused: false
    };
}

const actions = {
    showFilter: true,
    showSearch: true,
    show: false,
    increment(model) {

        if (InicioFlebotomista.pedidos !== null && InicioFlebotomista.pedidos.length !== 0 && InicioFlebotomista.reLoader) {
            model.seconds--;
            if (model.seconds == 0) {
                model.seconds = 100;
                InicioFlebotomista.pedidos = null;
                InicioFlebotomista.fetchPendientes();
                InicioFlebotomista.tomasPendientes = null;
                InicioFlebotomista.fetchTomasPendientes();
            }
            m.redraw();
        }

    },

    start(model) {
        model.interval = setInterval(actions.increment, 1000, model);
    },
    stop(model) {
        model.interval = clearInterval(model.interval);
    },
    reset(model) {
        model.seconds = 100;
    },
    toggle(model) {
        if (model.isPaused) {
            actions.start(model);
        } else {
            actions.stop(model);
        }
        model.isPaused = !model.isPaused;
    }
};

function Stopwatch() {
    const model = stopwatchModel();
    actions.start(model);
    return {
        view() {
            return [
                m("div.mg-b-0", [
                    m("div.progress.ht-4.mg-b-0.op-5",
                        m(".progress-bar.bg-primary.[role='progressbar'][aria-valuenow='" + model.seconds + "'][aria-valuemin='0'][aria-valuemax='60']", {
                            oncreate: (el) => {
                                el.dom.style.width = "100%";

                            },
                            onupdate: (el) => {
                                el.dom.style.width = model.seconds + "%";

                            },

                        })
                    )
                ]),

            ];



        },
        onremove() {
            actions.stop(model);
        },

    };
};

class Reloj {
    constructor(id) {
        // Guardar el elemento div en una propiedad de la clase
        this.div = document.getElementById(id);
        // Iniciar el intervalo que actualiza el reloj cada segundo
        this.intervalo = setInterval(() => this.actualizar(), 1000);
    }

    // El método actualizar obtiene la hora actual y la muestra en el div
    actualizar() {
        // Obtener la hora, los minutos y los segundos
        let hora = new Date().getHours();
        let minutos = new Date().getMinutes();
        let segundos = new Date().getSeconds();
        // Añadir un cero delante si son menores de 10
        if (hora < 10) hora = "0" + hora;
        if (minutos < 10) minutos = "0" + minutos;
        if (segundos < 10) segundos = "0" + segundos;
        // Formar el texto del reloj con el formato hh:mm:ss
        let texto = hora + ":" + minutos + ":" + segundos;
        // Mostrar el texto en el div
        this.div.textContent = texto;
    }

    // El método detener limpia el intervalo y detiene el reloj
    detener() {
        clearInterval(this.intervalo);
    }
}

class MenuFlebot {

    static opcPendientes = true;
    static opcGestionados = true;
    static showPendientes = true;
    static showGestionados = true;

    view() {
        return [
            m("div.content.content-components", {
                    style: { "margin-right": "0px", "margin-left": "0px" }
                },
                m(
                    "div.container", {
                        style: { "max-width": "100%" },
                    }, [

                        m("div.d-flex", [
                            m("div.flex-grow-1",
                                m("h1.df-title.mg-t-0.mg-b-0", [
                                    "Laboratorio: Toma de Muestras:",

                                ])
                            ),

                            m("div.d-flex.mg-l-auto",

                                m("div[id='reloj'].df-title.mg-t-0.mg-b-0", {
                                    oncreate: () => {
                                        return new Reloj("reloj");
                                    },
                                }),
                                m("i", {
                                    title: " Editar ",
                                    class: "fas fa-clock mg-l-4 mg-t-10 tx-32 tx-light",
                                })
                            ),
                        ]),


                        m("div.row.mg-t-20", {
                            class: InicioFlebotomista.showConfigToma == undefined ||
                                InicioFlebotomista.showConfigToma == false ?
                                "" : "d-none",
                        }, [
                            m(
                                "li.list-item.bg-success.wd-100p[role='button']", {
                                    style: { "cursor": "pointer" },
                                    class: InicioFlebotomista.showGestionados ? 'd-none' : '',
                                    onclick: () => {
                                        InicioFlebotomista.showPendientes = !InicioFlebotomista.showPendientes;
                                        InicioFlebotomista.reLoader = !InicioFlebotomista.reLoader;
                                        if (InicioFlebotomista.pedidos == null) {
                                            InicioFlebotomista.fetchPendientes();
                                        }
                                        if (InicioFlebotomista.tomasPendientes == null) {
                                            InicioFlebotomista.fetchTomasPendientes();
                                        }

                                    },
                                }, [
                                    m("div.media", [
                                        m(
                                            "div.wd-60.tx-center.pd-10 bg-litecoin",
                                            m("i.fas.fa-flask.tx-20.tx-white")
                                        ),
                                        m("div.media-body.mg-l-15[role='button']", [
                                            m(
                                                "p.tx-30.mg-b-0.tx-white[role='button']",
                                                (InicioFlebotomista.pedidos != null ? InicioFlebotomista.pedidos.data.length : '') + " Pendientes"
                                            ),
                                        ]),
                                    ]),

                                ]),
                            m('div.bg-white.wd-100p.pd-2', {
                                class: InicioFlebotomista.showPendientes ? '' : 'd-none'
                            }, [
                                m("div.d-flex.bg-gray-200", [
                                    m("div.pd-10.wd-10p.tx-center.tx-semibold[role='button']", {
                                            style: { "cursor": "pointer" },
                                            class: (InicioFlebotomista.classToma[0] ? 'bg-gray-200' : 'bg-gray-500'),
                                            onclick: () => {
                                                InicioFlebotomista.resetClassToma();
                                                InicioFlebotomista.classToma[0] = true;
                                                InicioFlebotomista.idToma = "TOMA1";
                                            },
                                        },
                                        "TOMA 1"
                                    ),
                                    m("div.pd-10.wd-10p.tx-center.tx-semibold[role='button']", {
                                            style: { "cursor": "pointer" },
                                            class: (InicioFlebotomista.classToma[1] ? 'bg-gray-200' : 'bg-gray-500'),
                                            onclick: () => {
                                                InicioFlebotomista.resetClassToma();
                                                InicioFlebotomista.classToma[1] = true;
                                                InicioFlebotomista.idToma = "TOMA2";
                                            },
                                        },
                                        "TOMA 2"
                                    ),
                                    m("div.pd-10.wd-10p.tx-center.tx-semibold[role='button']", {
                                            style: { "cursor": "pointer" },
                                            class: (InicioFlebotomista.classToma[2] ? 'bg-gray-200' : 'bg-gray-500'),
                                            onclick: () => {
                                                InicioFlebotomista.resetClassToma();
                                                InicioFlebotomista.classToma[2] = true;
                                                InicioFlebotomista.idToma = "TOMA3";
                                            },
                                        },
                                        "TOMA 3"
                                    ),
                                    m("div.pd-10.wd-10p.tx-center.tx-semibold[role='button']", {
                                            style: { "cursor": "pointer" },
                                            class: (InicioFlebotomista.classToma[3] ? 'bg-gray-200' : 'bg-gray-500'),
                                            onclick: () => {
                                                InicioFlebotomista.resetClassToma();
                                                InicioFlebotomista.classToma[3] = true;
                                                InicioFlebotomista.idToma = "TOMA4";
                                            },
                                        },
                                        "TOMA 4"
                                    ),
                                    m("div.pd-10.wd-10p.tx-center.tx-semibold[role='button']", {
                                            style: { "cursor": "pointer" },
                                            class: (InicioFlebotomista.classToma[4] ? 'bg-gray-200' : 'bg-gray-500'),
                                            onclick: () => {
                                                InicioFlebotomista.resetClassToma();
                                                InicioFlebotomista.classToma[4] = true;
                                                InicioFlebotomista.idToma = "TOMA5";
                                            },
                                        },
                                        "TOMA 5"
                                    ),
                                    m("div.pd-10 .wd-30p.tx-center.tx-semibold[role='button']", {
                                            style: { "cursor": "pointer" },
                                            class: (InicioFlebotomista.classToma[5] ? 'bg-gray-200' : 'bg-gray-500'),
                                            onclick: () => {
                                                InicioFlebotomista.resetClassToma();
                                                InicioFlebotomista.classToma[5] = true;
                                                if (InicioFlebotomista.tomasPendientes == null) {
                                                    InicioFlebotomista.fetchTomasPendientes();
                                                }

                                            },
                                        }, ["Tomas Pendientes ",
                                            (InicioFlebotomista.tomasPendientes !== null && InicioFlebotomista.tomasPendientes.data.length !== 0 ? [
                                                m('span.mg-l-5.tx-14.tx-semibold.badge.badge-danger', InicioFlebotomista.tomasPendientes.data.length)
                                            ] : [
                                                m('span.mg-l-5.tx-14.tx-semibold.badge.badge-danger', 0)
                                            ])
                                        ]

                                    ),
                                    m("div.pd-10.bg-gray-500.wd-20p.tx-center.tx-semibold[role='button']", {
                                            style: { "cursor": "pointer" },
                                            onclick: () => {
                                                InicioFlebotomista.pedidos = null;
                                                InicioFlebotomista.fetchPendientes();
                                            }
                                        },
                                        "Actualizar"
                                    )
                                ]),
                                m('div.pd-5', [
                                    m(Stopwatch)
                                ]),


                                m("div.wd-100p.bg-white.pd-10", {
                                    class: (InicioFlebotomista.classToma[5] ? 'd-none' : ''),
                                }, [
                                    (InicioFlebotomista.pedidos !== null && InicioFlebotomista.pedidos.status) ? [

                                        InicioFlebotomista.vTablePedidos('table-pedidos', InicioFlebotomista.pedidos.data, InicioFlebotomista.arqTablePedidos())
                                    ] : (InicioFlebotomista.pedidos !== null && (!InicioFlebotomista.pedidos.status || InicioFlebotomista.pedidos.status == null)) ? [
                                        m(Errors, { type: (!InicioFlebotomista.pedidos.status ? 1 : 0), error: InicioFlebotomista.pedidos })
                                    ] : [
                                        m(Loader)
                                    ]
                                ]),
                                m("div.wd-100p.bg-white.pd-10", {
                                    class: (InicioFlebotomista.classToma[5] ? '' : 'd-none'),
                                }, [
                                    (InicioFlebotomista.tomasPendientes !== null && InicioFlebotomista.tomasPendientes.status) ? [

                                        InicioFlebotomista.vTablePedidos('table-tomasPendientes', InicioFlebotomista.tomasPendientes.data, InicioFlebotomista.arqTableTomasPendientes())
                                    ] : (InicioFlebotomista.tomasPendientes !== null && (!InicioFlebotomista.tomasPendientes.status || InicioFlebotomista.tomasPendientes.status == null)) ? [
                                        m(Errors, { type: (!InicioFlebotomista.tomasPendientes.status ? 1 : 0), error: InicioFlebotomista.tomasPendientes })
                                    ] : [
                                        m(Loader)
                                    ]
                                ]),

                            ]),


                        ]),
                    ]
                )
            ),
        ];
    }
}

// class InicioFlebotomista extends App {
class InicioFlebotomista extends App {

    static isConnect = false;
    static peer = null;
    static otherPeer;
    static peerMessage;
    static showConfigToma = false;
    static idToma = null;
    static usrToma = null;
    static pedidos = null;
    static tomasPendientes = null;
    static reLoader = false;
    static classToma = [false, false, false, false, false, false];

    constructor() {
        super();
        App.title = "Flebotomia - Inicio";
        this.view = this.page;
    }

    static autorizar() {
        App.autorizarMSA('InicioFlebotomista');
    }

    static resetClassToma() {
        InicioFlebotomista.classToma = [false, false, false, false, false, false];
    }

    static desautorizar() {
        App.desAutorizarApp('InicioFlebotomista');
    }

    static getUsrToma() {
        if (localStorage.authTokenInicioFlebotomista !== undefined) {
            let _usr = JSON.parse(localStorage.authTokenInicioFlebotomista);
            let frg = _usr.user.split("@");
            let result = frg[0];
            return result;
        } else {
            return 'Sin Nombre';

        }
    }

    static getToma() {
        if (localStorage.peerId == undefined) {
            return 'Sin Nombre';
        } else {
            return localStorage.peerId;
        }
    }

    static fetchLlamada(at, id, numero) {

        return m.request({
                method: "POST",
                url: "https://lisa.hospitalmetropolitano.org/v1/procesos/call-toma",
                body: {
                    atencion: at,
                    wid: id,
                    modulo: numero,
                    toma: InicioFlebotomista.idToma
                },
                headers: {
                    "Content-Type": "application/json; charset=utf-8",
                },
            })
            .then(function(result) {

                alert('Proceso realizado con éxito.');
                InicioFlebotomista.pedidos = null;
                InicioFlebotomista.fetchPendientes();
            })
            .catch(function(e) {
                return {
                    'status': null,
                    'message': e
                };
            });
    }

    static fetchPendientes() {

        return m.request({
                method: "GET",
                url: "https://lisa.hospitalmetropolitano.org/v1/listar?type=ingresadasFlebotomia&idFiltro=4",
                headers: {
                    "Content-Type": "application/json; charset=utf-8",
                },
            })
            .then(function(result) {

                let hash = {};
                let res = result;
                let filtrados = res.data.filter(o => hash[o.paciente] ? false : hash[o.paciente] = true);
                res.data = filtrados
                InicioFlebotomista.pedidos = res;
                return result;

            })
            .catch(function(e) {

                return {
                    'status': null,
                    'message': e
                };

            });
    }

    static fetchTomasPendientes() {

        return m.request({
                method: "GET",
                url: "https://lisa.hospitalmetropolitano.org/v1/listar?type=ingresadasFlebotomia&idFiltro=6",
                headers: {
                    "Content-Type": "application/json; charset=utf-8",
                },
            })
            .then(function(result) {

                InicioFlebotomista.tomasPendientes = result;
                return result;

            })
            .catch(function(e) {

                return {
                    'status': null,
                    'message': e
                };

            });
    }

    static tomaPendiente(sc) {

        return m.request({
                method: "POST",
                url: "https://lisa.hospitalmetropolitano.org/v1/procesos/toma-pendiente",
                body: {
                    sc: sc
                },
                headers: {
                    "Content-Type": "application/json; charset=utf-8",
                },
            })
            .then(function(response) {
                if (response.status) {
                    InicioFlebotomista.tomasPendientes = null;
                    InicioFlebotomista.fetchTomasPendientes();
                    InicioFlebotomista.pedidos = null;
                    InicioFlebotomista.fetchPendientes();
                    alert('Preceso realizado con éxito.');
                } else {
                    alert('Error. No pudimos completar esta petición.');
                }

            })
            .catch(function(e) {
                alert('Error: ' + e);
            });
    }

    static deshacerTomaPendiente(sc) {

        return m.request({
                method: "POST",
                url: "https://lisa.hospitalmetropolitano.org/v1/procesos/deshacer-toma-pendiente",
                body: {
                    sc: sc
                },
                headers: {
                    "Content-Type": "application/json; charset=utf-8",
                },
            })
            .then(function(response) {
                if (response.status) {
                    InicioFlebotomista.tomasPendientes = null;
                    InicioFlebotomista.fetchTomasPendientes();
                    InicioFlebotomista.pedidos = null;
                    InicioFlebotomista.fetchPendientes();
                    alert('Preceso realizado con éxito.');
                } else {
                    alert('Error. No pudimos completar esta petición.');
                }

            })
            .catch(function(e) {
                alert('Error: ' + e);
            });
    }

    static vTablePedidos(idTable, dataTable, arqTable) {
        return [
            m(Table, { idTable: idTable, dataTable: dataTable, arqTable: arqTable })
        ]
    }

    static arqTablePedidos(idTable, dataTable, arqTable) {

        return {
            data: InicioFlebotomista.pedidos,
            dom: 't',
            responsive: true,
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
            pageLength: 100,
            destroy: true,
            order: [
                [1, 'desc']
            ],
            columns: [{
                    title: "LLAMAR",
                },
                {
                    title: "SC:",
                },
                {
                    title: "PACIENTE:",
                },
                {
                    title: "NHC:",
                },
                {
                    title: "DEJAR PENDIENTE:",
                }
            ],
            aoColumnDefs: [{
                    mRender: function(data, type, row, meta) {
                        return meta.row + meta.settings._iDisplayStart + 1;
                    },
                    fnCreatedCell: function(nTd, sData, oData, iRow, iCol) {

                        return m.mount(nTd, {
                            view: () => {
                                return [
                                    m('div.text-center', [
                                        m("button.btn-xs[type='button']", {
                                                onclick: () => {
                                                    InicioFlebotomista.fetchLlamada(oData.cdAtendimento, oData.wid, oData.numero);

                                                },
                                                class: 'bg-warning',
                                            },
                                            m('i.fas.fa-bell.tx-22'),
                                            m('div.tx-12.tx-semibold', 'Llamar'),
                                            m('div.d-inline.tx-12.tx-semibold.tx-danger', ''),
                                        )
                                    ])

                                ]
                            }
                        });
                    },
                    width: '10%',
                    visible: true,
                    aTargets: [0],
                    orderable: true,
                },

                {
                    mRender: function(data, type, full) {
                        return full.wid;
                    },

                    visible: false,
                    aTargets: [1],
                    orderable: true,
                },
                {
                    mRender: function(data, type, full) {
                        return full.paciente;
                    },
                    fnCreatedCell: function(nTd, sData, oData, iRow, iCol) {
                        return m.mount(nTd, {
                            view: () => {
                                return [
                                    m('.d-block.pd-0.mg-0.tx-12.tx-primary.op-9', oData.sector),
                                    m('.d-block.pd-0.mg-0', oData.paciente),
                                ]
                            }
                        });
                    },
                    visible: true,
                    aTargets: [2],
                    orderable: true,
                },
                {
                    mRender: function(data, type, full) {
                        return full.numeroHistoriaClinica;

                    },
                    fnCreatedCell: function(nTd, sData, oData, iRow, iCol) {
                        return m.mount(nTd, {
                            view: () => {
                                return m('.d-block.pd-0.mg-0', oData.numeroHistoriaClinica)
                            }
                        });
                    },
                    visible: true,
                    aTargets: [3],
                    orderable: true,

                },
                {
                    fnCreatedCell: function(nTd, sData, oData, iRow, iCol) {
                        return m.mount(nTd, {
                            view: () => {
                                return [
                                    m("button.btn.btn-xs.btn-outline-danger.btn-block.tx-semibold[type='button']", {
                                            onclick: (e) => {
                                                if (confirm("¿Esta Ud. seguro de confirmar este pedido como Pendiente?") == true) {
                                                    InicioFlebotomista.tomaPendiente(oData.codigoPedido)
                                                } else {
                                                    alert('Ok. Operación Cancelada')
                                                }
                                            }
                                        },
                                        "Dejar Pendiente"
                                    )
                                ]
                            }
                        });


                    },
                    visible: true,
                    aTargets: [4],
                    orderable: true,

                }


            ],


        }

    };

    static arqTableTomasPendientes(idTable, dataTable, arqTable) {

        return {
            data: InicioFlebotomista.tomasPendientes,
            dom: 't',
            responsive: true,
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
            pageLength: 100,
            destroy: true,
            order: [
                [1, 'desc']
            ],
            columns: [{
                    title: "LLAMAR",
                },
                {
                    title: "SC:",
                },
                {
                    title: "PACIENTE:",
                },
                {
                    title: "NHC:",
                },
                {
                    title: "DESHACER PENDIENTE:",
                }
            ],
            aoColumnDefs: [{
                    mRender: function(data, type, row, meta) {
                        return meta.row + meta.settings._iDisplayStart + 1;
                    },
                    fnCreatedCell: function(nTd, sData, oData, iRow, iCol) {

                        return m.mount(nTd, {
                            view: () => {
                                return [
                                    m('div.text-center', [
                                        m("button.btn-xs[type='button']", {
                                                onclick: () => {
                                                    InicioFlebotomista.fetchLlamada(oData.cdAtendimento, oData.wid, oData.numero);

                                                },
                                                class: 'bg-warning',
                                            },
                                            m('i.fas.fa-bell.tx-22'),
                                            m('div.tx-12.tx-semibold', 'Llamar'),
                                            m('div.d-inline.tx-12.tx-semibold.tx-danger', ''),
                                        )
                                    ])

                                ]
                            }
                        });
                    },
                    width: '10%',
                    visible: false,
                    aTargets: [0],
                    orderable: true,
                },

                {
                    mRender: function(data, type, full) {
                        return full.wid;
                    },

                    visible: false,
                    aTargets: [1],
                    orderable: true,
                },
                {
                    mRender: function(data, type, full) {
                        return full.paciente;
                    },
                    fnCreatedCell: function(nTd, sData, oData, iRow, iCol) {
                        return m.mount(nTd, {
                            view: () => {
                                return [
                                    m('.d-block.pd-0.mg-0.tx-12.tx-primary.op-9', oData.sector),
                                    m('.d-block.pd-0.mg-0', oData.paciente),
                                ]
                            }
                        });
                    },
                    visible: true,
                    aTargets: [2],
                    orderable: true,
                },
                {
                    mRender: function(data, type, full) {
                        return full.numeroHistoriaClinica;

                    },
                    fnCreatedCell: function(nTd, sData, oData, iRow, iCol) {
                        return m.mount(nTd, {
                            view: () => {
                                return m('.d-block.pd-0.mg-0', oData.numeroHistoriaClinica)
                            }
                        });
                    },
                    visible: true,
                    aTargets: [3],
                    orderable: true,

                },
                {
                    fnCreatedCell: function(nTd, sData, oData, iRow, iCol) {
                        return m.mount(nTd, {
                            view: () => {
                                return [
                                    m("button.btn.btn-xs.btn-outline-danger.btn-block.tx-semibold[type='button']", {
                                            onclick: (e) => {
                                                if (confirm("¿Esta Ud. seguro de confirmar este pedido como Pendiente?") == true) {
                                                    InicioFlebotomista.deshacerTomaPendiente(oData.codigoPedido)
                                                } else {
                                                    alert('Ok. Operación Cancelada')
                                                }
                                            }
                                        },
                                        "Deshacer Pendiente"
                                    )
                                ]
                            }
                        });


                    },
                    visible: true,
                    aTargets: [4],
                    orderable: true,

                }


            ],


        }

    };

    oncreate(_data) {

        if (_data.attrs.idToma != undefined) {
            InicioFlebotomista.idToma = _data.attrs.idToma;
        }

    }



    vHeader() {
        return [m(HeaderPublic)];
    }

    vMain() {
        return [m(MenuFlebot)];
    }

    page() {
        return [
            this.vHeader(),
            this.vMain()
        ];
    }
}

export default InicioFlebotomista;