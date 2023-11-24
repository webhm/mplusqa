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

        if (Flebotomista.pedidos !== null && Flebotomista.pedidos.length !== 0 && Flebotomista.reLoader) {
            model.seconds--;
            if (model.seconds == 0) {
                model.seconds = 100;
                Flebotomista.pedidos = null;
                Flebotomista.fetchPendientes();
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
            m(
                "div.content.content-components",
                m(
                    "div.container", {
                        style: { "max-width": "100%" },
                    }, [

                        m("div.d-flex", [
                            m(
                                "div.flex-grow-1",
                                m("h1.df-title.mg-t-20.mg-b-10", [
                                    "Laboratorio: ",
                                    m(
                                        "span.tx-40.badge.bg-litecoin.pd-10.tx-white.mg-r-10",
                                        Flebotomista.getToma()
                                    ),
                                    m("i.fas.fa-edit.tx-40.tx-light", {
                                        title: " Editar ",
                                        onclick: () => {
                                            Flebotomista.showConfigToma = !Flebotomista.showConfigToma;
                                        },
                                    }),
                                ])
                            ),

                            m(
                                "div.d-flex.mg-l-auto",

                                m("div[id='reloj'].df-title.mg-t-20.mg-b-10", {
                                    oncreate: () => {
                                        return new Reloj("reloj");
                                    },
                                }),
                                m("i", {
                                    title: " Editar ",
                                    class: "fas fa-clock mg-l-4 mg-t-30 tx-32 tx-light",
                                })
                            ),
                        ]),

                        m(
                            "div.mg-t-20.d.flex", {
                                class: Flebotomista.showConfigToma == undefined ||
                                    Flebotomista.showConfigToma == false ?
                                    "d-none" : "",
                            }, [
                                m("fieldset.form-fieldset", [
                                    m("legend.pd-2", "MODIFICAR TOMA:"),
                                    m("div.tx-30", [
                                        m("div.custom-control.custom-radio", [
                                            m(
                                                "input.custom-control-input[type='radio'][id='customRadio1'][name='customRadio']", {
                                                    checked: Flebotomista.idToma == "TOMA1" ? true : false,
                                                    onchange: (event) => {
                                                        Flebotomista.idToma = "TOMA1";
                                                        localStorage.setItem("peerId", Flebotomista.idToma);
                                                    },
                                                }
                                            ),
                                            m(
                                                "label.custom-control-label[for='customRadio1']",
                                                "TOMA 1"
                                            ),
                                        ]),
                                        m("div.custom-control.custom-radio", [
                                            m(
                                                "input.custom-control-input[type='radio'][id='customRadio2'][name='customRadio']", {
                                                    checked: Flebotomista.idToma == "TOMA2" ? true : false,
                                                    onchange: (event) => {
                                                        Flebotomista.idToma = "TOMA2";
                                                        localStorage.setItem("peerId", Flebotomista.idToma);
                                                    },
                                                }
                                            ),
                                            m(
                                                "label.custom-control-label[for='customRadio2']",
                                                "TOMA  2"
                                            ),
                                        ]),
                                        m("div.custom-control.custom-radio", [
                                            m(
                                                "input.custom-control-input[type='radio'][id='customRadio3'][name='customRadio']", {
                                                    checked: Flebotomista.idToma == "TOMA3" ? true : false,
                                                    onchange: (event) => {
                                                        Flebotomista.idToma = "TOMA3";
                                                        localStorage.setItem("peerId", Flebotomista.idToma);
                                                    },
                                                }
                                            ),
                                            m(
                                                "label.custom-control-label[for='customRadio3']",
                                                "TOMA  3"
                                            ),
                                        ]),
                                        m("div.custom-control.custom-radio", [
                                            m(
                                                "input.custom-control-input[type='radio'][id='customRadio4'][name='customRadio']", {
                                                    checked: Flebotomista.idToma == "TOMA4" ? true : false,
                                                    onchange: (event) => {
                                                        Flebotomista.idToma = "TOMA4";
                                                        localStorage.setItem("peerId", Flebotomista.idToma);
                                                    },
                                                }
                                            ),
                                            m(
                                                "label.custom-control-label[for='customRadio4']",
                                                "TOMA  4"
                                            ),
                                        ]),
                                        m("div.custom-control.custom-radio", [
                                            m(
                                                "input.custom-control-input[type='radio'][id='customRadio5'][name='customRadio']", {
                                                    checked: Flebotomista.idToma == "TOMA5" ? true : false,
                                                    onchange: (event) => {

                                                        Flebotomista.idToma = "TOMA5";
                                                        localStorage.setItem("peerId", Flebotomista.idToma);

                                                    },
                                                }
                                            ),
                                            m(
                                                "label.custom-control-label[for='customRadio5']",
                                                "TOMA 5"
                                            ),
                                        ]),
                                    ]),
                                ]),
                            ]
                        ),
                        m(
                            "div.row.mg-t-20", {
                                class: Flebotomista.showConfigToma == undefined ||
                                    Flebotomista.showConfigToma == false ?
                                    "" : "d-none",
                            }, [
                                m(
                                    "li.list-item.bg-success.wd-100p", {
                                        class: Flebotomista.showGestionados ? 'd-none' : '',
                                        onclick: () => {
                                            Flebotomista.showPendientes = !Flebotomista.showPendientes;
                                            Flebotomista.reLoader = !Flebotomista.reLoader;
                                            if (Flebotomista.pedidos == null) {
                                                Flebotomista.fetchPendientes();
                                            }

                                        },
                                    }, [
                                        m("div.media", [
                                            m(
                                                "div.wd-60.tx-center.pd-10 bg-litecoin",
                                                m("i.fas.fa-flask.tx-30.tx-white")
                                            ),
                                            m("div.media-body.mg-l-15", [
                                                m(
                                                    "p.tx-40.mg-b-0.tx-white",
                                                    "Pendientes"
                                                ),
                                            ]),
                                        ]),

                                    ]),
                                m('div.bg-white.wd-100p.pd-2', {
                                    class: Flebotomista.showPendientes ? '' : 'd-none'
                                }, [

                                    m("div.d-flex.bg-gray-200", [
                                        m("div.pd-10.bg-gray-300.flex-grow-1",
                                            "Usuario: " + Flebotomista.getUsrToma()
                                        ),

                                        m("div.pd-10.bg-gray-500", {
                                                style: { "cursor": "pointer" },
                                                onclick: () => {
                                                    Flebotomista.pedidos = null;
                                                    Flebotomista.fetchPendientes();
                                                }
                                            },
                                            "Actualizar"
                                        )
                                    ]),
                                    m('div.pd-5', [
                                        m(Stopwatch)
                                    ]),

                                    m("div.wd-100p.bg-white.pd-10", [
                                        (Flebotomista.pedidos !== null && Flebotomista.pedidos.status) ? [

                                            Flebotomista.vTablePedidos('table-pedidos', Flebotomista.pedidos.data, Flebotomista.arqTablePedidos())
                                        ] : (Flebotomista.pedidos !== null && (!Flebotomista.pedidos.status || Flebotomista.pedidos.status == null)) ? [
                                            m(Errors, { type: (!Flebotomista.pedidos.status ? 1 : 0), error: Flebotomista.pedidos })
                                        ] : [
                                            m(Loader)
                                        ]
                                    ]),

                                ]),
                                m(
                                    "li.list-item.bg-white.wd-100p", {
                                        class: Flebotomista.showPendientes ? 'd-none' : '',
                                        onclick: () => {
                                            Flebotomista.showGestionados = !Flebotomista.showGestionados;
                                        },
                                    }, [
                                        m("div.media", [
                                            m(
                                                "div.wd-60.tx-center.pd-10 bg-litecoin",
                                                m("i.fas.fa-file-alt.tx-30.tx-white")
                                            ),
                                            m("div.media-body.mg-l-15", [
                                                m(
                                                    "p.tx-40.mg-b-0",
                                                    "Gestionados"
                                                ),
                                            ]),
                                        ]),
                                    ]),
                                m(
                                    "li.list-item.bg-white.wd-100p", {
                                        class: Flebotomista.showPendientes ? 'd-none' : '',
                                    }, [
                                        m("div.media.wd-100p", [
                                            m(
                                                "div.wd-60.tx-center.pd-10.bg-litecoin",
                                                m("i.fas.fa-user.tx-30.tx-white")
                                            ),
                                            m("div.media-body.mg-l-15", [
                                                m("button.btn.btn-xs.btn-brand-02.btn-block.tx-semibold.mg-t-1.tx-18", {
                                                    class: (localStorage.authTokenFlebotomista !== undefined ? 'd-none' : ''),
                                                    onclick: () => {
                                                        Flebotomista.autorizar();
                                                    },
                                                }, [
                                                    m("img.mg-r-2.pd-8[src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHYAAAB2CAYAAAAdp2cRAAAABHNCSVQICAgIfAhkiAAAAZ5JREFUeJzt17FNHFEYRtE3qxUJkmtw5hBRASKhBMf04cA4cEwLWwfRVgCiA2qw5MCSvc85It0Z6eqc8J/ke7rRLL+/XT+M3e77qDqdflz+fHl4f358+To3WLOa3dYDOA9ho4SNEjZK2Chho4SNEjZK2Chho4SNEjZK2Chho4SNEjZK2Chho4SNEjZK2Chho4SNEjZK2Chho4SNEjZK2Chho4SNEjZK2Chho4SNEjZK2Chho4SNEjZK2Chho4SNEjZK2Chho4SNEjZK2Chho4SNEjZK2Chho4QFAIDl6unX/Rjzfush57McXu8+Hd5f/zx/Oa6/ZT37MefnZRk3Ww85lznn8eMvS/bNY/iPzRI2StgoYaOEjRI2StgoYaOEjRI2StgoYaOEjRI2StgoYaOEjRI2StgoYaOEjRI2StgoYaOEjRI2StgoYaOEjRI2StgoYaOEjRI2StgoYaOEjRI2StgoYaOEjRI2StgoYaOEjRI2StgoYaOEjRI2StgoYaOEjRI2aj9OF4e5/3vcesjZ/Nu/fXTeLfN25SWr+g/+GiEp5JSeMAAAAABJRU5ErkJggg=='][alt='Microsoft'][width='5%'][height='5%']"),
                                                    " Autorizar Usuario "
                                                ]),
                                                m('div.tx-40.mg-b-0', {
                                                    class: (localStorage.authTokenFlebotomista == undefined ? 'd-none' : ''),
                                                }, [
                                                    m('div.d-inline',
                                                        "Usuario: " + Flebotomista.getUsrToma()
                                                    ),
                                                    m("i.fas.fa-edit.tx-40.tx-light.mg-l-15", {
                                                        title: " Editar ",
                                                        onclick: () => {
                                                            Flebotomista.desautorizar();
                                                        },
                                                    }),
                                                ])
                                            ]),
                                        ]),
                                    ]
                                )

                            ]
                        ),
                    ]
                )
            ),
        ];
    }
}

// class Flebotomista extends App {
class Flebotomista extends App {

    static isConnect = false;
    static peer = null;
    static otherPeer;
    static peerMessage;
    static showConfigToma = false;
    static idToma = null;
    static usrToma = null;
    static pedidos = null;
    static reLoader = false;

    constructor() {
        super();
        App.title = "Flebotomia";
        this.view = this.page;
    }

    static autorizar() {
        App.autorizarMSA('Flebotomista');
    }

    static desautorizar() {
        App.desAutorizarApp('Flebotomista');
    }

    static getUsrToma() {
        if (localStorage.authTokenFlebotomista !== undefined) {
            let _usr = JSON.parse(localStorage.authTokenFlebotomista);
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
                    toma: localStorage.peerId
                },
                headers: {
                    "Content-Type": "application/json; charset=utf-8",
                },
            })
            .then(function(result) {
                alert('Proceso realizado con éxito.');
            })
            .catch(function(e) {
                return {
                    'status': null,
                    'message': e
                };
            });
    }

    static fetchPendientes() {

        let _query = '';
        if (localStorage.peerId !== undefined) {
            _query = '&toma=' + localStorage.peerId;
        }

        return m.request({
                method: "GET",
                url: "https://lisa.hospitalmetropolitano.org/v1/listar?type=ingresadasFlebotomia&idFiltro=4" + _query,
                headers: {
                    "Content-Type": "application/json; charset=utf-8",
                },
            })
            .then(function(result) {
                Flebotomista.pedidos = result;
                return result;
            })
            .catch(function(e) {
                return {
                    'status': null,
                    'message': e
                };
            });
    }

    static vTablePedidos(idTable, dataTable, arqTable) {
        return [
            m(Table, { idTable: idTable, dataTable: dataTable, arqTable: arqTable })
        ]
    }

    static arqTablePedidos(idTable, dataTable, arqTable) {

        return {
            data: Flebotomista.pedidos,
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
                    title: "OPCIONES:",
                },


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
                                                    Flebotomista.fetchLlamada(oData.cdAtendimento, oData.wid, oData.numero);
                                                },
                                                class: (oData.call == 1 ? 'bg-success' : 'bg-warning'),
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
                    visible: true,
                    aTargets: [0],
                    orderable: true,
                },

                {
                    mRender: function(data, type, full) {
                        return full.codigoPedido;
                    },
                    fnCreatedCell: function(nTd, sData, oData, iRow, iCol) {


                        return m.mount(nTd, {
                            view: () => {
                                return m('.d-block.pd-0.mg-0', oData.codigoPedido)
                            }
                        });
                    },
                    visible: true,
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
                }, {
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
                                    m("a.btn-xs.btn-block.text-white.text-center[role='button']", {
                                            href: "https://metroplus.hospitalmetropolitano.org/laboratorio/flebotomista/pedido?numeroHistoriaClinica=" + oData.numeroHistoriaClinica + "&numeroAtencion=" + oData.cdAtendimento + "&numeroPedido=" + oData.codigoPedido + "&idTimeRecord=0&track=view",
                                            target: "_blank",
                                            style: { "background-color": "#185b98" },
                                        },
                                        m('i.fas.fa-folder-open.tx-22'),
                                        m('div.tx-12.tx-semibold', 'Ver'),
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



    getConnectRTC() {
        return new Promise(function(resolve, reject) {


            Flebotomista.idToma =
                localStorage.getItem("peerId") !== undefined ?
                localStorage.getItem("peerId") :
                Flebotomista.idToma;

            Flebotomista.peer = new P2PMessage((id) => {

                Flebotomista.peer.peer.onError((error) => {
                    console.log(' ee ', error)
                });

            });

        });
    }

    vHeader() {
        return m(HeaderPublic);
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

export default Flebotomista;