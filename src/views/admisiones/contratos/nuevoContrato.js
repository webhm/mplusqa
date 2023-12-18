import m from "mithril";
import App from "../../../models/App";
import HeaderPrivate from "../../layout/headerPrivate";
import Sidebar from "./sidebarContratos";
import Loader from "../../utils/loader";


class Uploads {
    static files = [];
    static detalle = [];
    static error = "";
    static showFor = "";
    static uploadService() {
        let postData = new FormData($('#uploadForm')[0]);
        return fetch('https://api.hospitalmetropolitano.org/v2/metroplus/admisiones/uploads', {
            method: "POST",
            body: postData,
        }).then(function(response) {
            return response.json();
        }).then(function(data) {
            console.log('data = ', data);
            alert('Proceso realizado con éxito');
            m.route.set('/admisiones/contrato/?numeroHistoriaClinica=' + NuevoContrato.data.nhc + '&numeroAdmision=' + NuevoContrato.data.adm + '&track=view');
        }).catch(function(err) {
            console.error(err);
        });
    }

    static loadFile(event) {


        if (Uploads.files.length > 0) {
            alert("No se puede subir mas de un documento al mismo tiempo.");
            throw "No se puede subir mas de un documento al mismo tiempo.";
        } else {
            Array.from(event.target.files).forEach((file) => {
                Uploads.files.push(file);
            })
        }

    }
    view() {
        return [
            m("div.mg-t-10.d-flex", {}, [
                Uploads.files.length == 0 ? [
                    m('p', 'No existe archivos.')
                ] : Uploads.files.length > 0 ? [
                    Uploads.files.map(function(_v, _i, _contentData) {
                        return [
                            m("div.col-6.col-sm-4.col-md-3.col-xl-3.mg-b-5.mg-t-5",
                                m("div.card.card-file", [
                                    m("div.card-file-thumb.tx-primary",
                                        m("i.far.fa-file")
                                    ),
                                    m("div.card-body", [
                                        m(".d-inline.tx-5",
                                            _v.name
                                        ),
                                    ])
                                ])
                            ),
                        ]

                    })


                ] : []
            ]),

            m('form.mg-t-50', {
                enctype: "multipart/form-data",
                id: 'uploadForm',

            }, [
                m('div.custom-file.mg-b-5', [
                    m("label.custom-file-label[for='uploadFiles']",
                        " Subir Archivos "
                    ),
                    m("input[type='hidden'][name='nhc']", {
                        value: NuevoContrato.data.nhc
                    }),
                    m("input[type='hidden'][name='adm']", {
                        value: NuevoContrato.data.adm
                    }),
                    m("input[type='hidden'][name='pte']", {
                        value: NuevoContrato.data.pte
                    }),
                    m("input[type='hidden'][name='fecha']", {
                        value: moment().format('DD-MM-YYYY')
                    }),
                    m("input[type='hidden'][name='usr']", {
                        value: App.userName
                    }),
                    m("input.custom-file-input[autofocus][id='uploadFiles'][name='uploadFiles'][type='file'][multiple='true']", {
                        onchange: (e) => {
                            Uploads.loadFile(e);
                        }
                    }),

                ])




            ]),


        ];



    }
};


// Nuevo Contrato Admisiones MV

class NuevoContrato extends App {
    static data = [];
    static loader = false;
    constructor(_data) {
        super();
        if (App.isAuthenticated() && App.hasProfile('PERFIL_ADMISIONES_METROPLUS')) {
            App.setTitle("Nuevo Contrato");
            this.view = NuevoContrato.page;
        }
    }
    static vHeader() {
        return m(HeaderPrivate, { userName: App.userName });
    }
    static vMain() {
        return [
            m("div.content.content-components", {},
                m("div.container.mg-l-0.mg-r-0", {
                    style: { "max-width": "100%" }
                }, [

                    m("ol.breadcrumb.df-breadcrumbs", [
                        m("li.breadcrumb-item",
                            m(m.route.Link, { href: "/", }, [
                                "MetroPlus"
                            ]),
                        ),
                        m("li.breadcrumb-item",
                            m(m.route.Link, { href: "/admisiones", }, [
                                'Admisiones'
                            ]),
                        ),
                        m("li.breadcrumb-item",
                            m(m.route.Link, { href: "/admisiones/contratos", }, [
                                'Contratos Digitalizados'
                            ]),
                        ),
                        m("li.breadcrumb-item.active[aria-current='page']",
                            App.title
                        )
                    ]),

                    m("h1.df-title.mg-b-10.mg-l-5",
                        App.title + ":"
                    ),

                    m("div.row.animated.fadeInUp", [

                        m("div.col-12", [
                            (NuevoContrato.loader ? [
                                m(Loader)
                            ] : []),
                            m("div.table-content.col-12.pd-r-0.pd-l-0.pd-b-20.", {
                                class: (NuevoContrato.loader ? 'd-none' : '')
                            }, [
                                m("div.bg-white.bd.pd-20.pd-lg-30.d-flex.flex-column.justify-content-end", [



                                    m('div.table-responsive', [

                                        m('form', {}, [
                                            m("table.table.table-bordered.table-sm.tx-12", [

                                                m("thead",

                                                    m("tr.bg-litecoin.op-9.tx-white", [
                                                        m("th[scope='col'][colspan='10']",
                                                            "DATOS DEL PACIENTE:"
                                                        ),

                                                    ])
                                                ),
                                                m("tbody", [
                                                    m("tr", [
                                                        m("th.tx-semibold.tx-14[colspan='1'][width='20%']", {
                                                                style: { "background-color": "#a8bed6" }
                                                            },
                                                            "Historia Clínica:"
                                                        ),
                                                        m("td[colspan='9']", {
                                                                style: { "background-color": "#eaeff5" }
                                                            },
                                                            m("input", {
                                                                "class": "form-control tx-semibold tx-14",
                                                                "type": "number",
                                                                "placeholder": "Historia Clínica",
                                                                onkeypress: (e) => {
                                                                    if (e.keyCode == 13) {
                                                                        NuevoContrato.fetchPaciente(NuevoContrato.data.nhc);
                                                                    }
                                                                },
                                                                oninput: (e) => {
                                                                    NuevoContrato.data.nhc = e.target.value;
                                                                }

                                                            })
                                                        )
                                                    ]),
                                                    m("tr", [
                                                        m("th.tx-semibold.tx-14[colspan='1'][width='20%']", {
                                                                style: { "background-color": "#a8bed6" }
                                                            },
                                                            "Nro. de Admisión:"
                                                        ),
                                                        m("td[colspan='9']", {
                                                                style: { "background-color": "#eaeff5" }

                                                            },
                                                            m("input", {
                                                                "class": "form-control tx-semibold tx-14",
                                                                "type": "number",
                                                                "placeholder": "Nro. de Admisión",
                                                                onkeypress: (e) => {
                                                                    if (e.keyCode == 13) {
                                                                        NuevoContrato.fetchPaciente(NuevoContrato.data.nhc);
                                                                    }
                                                                },
                                                                oninput: (e) => {
                                                                    NuevoContrato.data.adm = e.target.value;
                                                                }
                                                            })

                                                        ),
                                                    ]),
                                                    m("tr", [
                                                        m("th.tx-semibold.tx-14[colspan='1']", {
                                                                style: { "background-color": "#a8bed6" }
                                                            },
                                                            "Paciente:"
                                                        ),
                                                        m("td[colspan='9']", {
                                                                style: { "background-color": "#eaeff5" }
                                                            },
                                                            m("input", {
                                                                "class": "form-control tx-semibold tx-14",
                                                                "type": "text",
                                                                "placeholder": "Paciente",
                                                                'disabled': 'disabled',
                                                                value: (NuevoContrato.data !== undefined && NuevoContrato.data.pte !== undefined ? NuevoContrato.data.pte : '')

                                                            })
                                                        )


                                                    ]),




                                                    // INCLUIR AREA DE DEST Y DESTINO FINAL.
                                                    m("tr.d-print-none.bg-litecoin.op-9.tx-white.", [
                                                        m("th[scope='col'][colspan='10']",
                                                            "ADJUNTOS:"
                                                        ),

                                                    ]),
                                                    m("tr.d-print-none", [

                                                        m("td[colspan='10']", {
                                                                style: { "background-color": "#eaeff5" }

                                                            },
                                                            m("ul.nav.nav-tabs[id='myTab'][role='tablist']", [
                                                                m("li.nav-item",
                                                                    m("a.nav-link[id='home-tab'][data-toggle='tab'][href='#home'][role='tab'][aria-controls='home'][aria-selected='true']", {
                                                                            style: { "color": "#476ba3" }
                                                                        },
                                                                        m("i.fas.fa-file-alt.pd-1.mg-r-2"),

                                                                        " Adjuntos "
                                                                    )
                                                                ),


                                                            ]),
                                                        ),


                                                    ]),
                                                    m("tr.d-print-none", [

                                                        m("td[colspan='9']", {

                                                            },
                                                            m(".tab-content.bd.bd-gray-300.bd-t-0[id='myTab']", [
                                                                m(".tab-pane.fade[id='home'][role='tabpanel'][aria-labelledby='home-tab']", [
                                                                    m(Uploads),
                                                                ]),


                                                            ])
                                                        ),


                                                    ]),
                                                    m("tr.d-print-none", [

                                                    ]),
                                                    m("tr", [


                                                        m("td[colspan='10']", {
                                                                style: { "background-color": "#eaeff5" }
                                                            },
                                                            m("div.input-group.mg-t-5",
                                                                m("button.btn.btn-primary.btn-xs.btn-block.tx-semibold[type='button']", {
                                                                        onclick: (e) => {
                                                                            NuevoContrato.sendContrato();


                                                                        }
                                                                    },
                                                                    "Subir Contrato"
                                                                )
                                                            )
                                                        )
                                                    ])
                                                ])
                                            ])
                                        ])
                                    ])
                                ])
                            ])
                        ])
                    ])
                ])
            )
        ];
    }
    static sendContrato() {

        NuevoContrato.loader = true;

        return m.request({
                method: "POST",
                url: "https://api.hospitalmetropolitano.org/v2/metroplus/admisiones/nuevo-contrato",
                body: {
                    fecha: moment().format('DD-MM-YYYY'),
                    nhc: NuevoContrato.data.nhc,
                    adm: NuevoContrato.data.adm,
                    pte: NuevoContrato.data.pte,
                    user: App.userName
                },
                headers: {
                    "Content-Type": "application/json; charset=utf-8",
                },
            })
            .then(function(result) {
                if (result.status) {
                    setTimeout(() => {
                        Uploads.uploadService();
                    }, 1000);
                } else {
                    alert(result.message);
                }
            })
            .catch(function(e) {
                alert(e);
            })

    }
    static fetchPaciente(_nhc) {

        NuevoContrato.data.pte = 'Procesando...';

        m.request({
                method: "POST",
                url: "https://api.hospitalmetropolitano.org/t/v1/buscar-paciente",
                body: {
                    pte: _nhc,
                    tipoBusqueda: 'nhc'
                },
                headers: {
                    "Content-Type": "application/json; charset=utf-8",
                },
            })
            .then(function(res) {
                if (res.status) {
                    NuevoContrato.data.pte = res.data[0].APELLIDOS + ' ' + res.data[0].NOMBRES
                }
            })
            .catch(function(e) {
                alert(e)
            })

    }
    static vMenu() {
        return m(Sidebar, { page: 'admisiones/contratos/nuevo' });
    }
    static page() {
        return [
            NuevoContrato.vHeader(),
            NuevoContrato.vMenu(),
            NuevoContrato.vMain()
        ];
    }
}


export default NuevoContrato;