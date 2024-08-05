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

        VerContrato.loader = true;

        let postData = new FormData($('#uploadForm')[0]);
        return fetch('https://api.hospitalmetropolitano.org/v2/metroplus/admisiones/uploads', {
            method: "POST",
            body: postData,
        }).then(function(response) {
            return response.json();
        }).then(function(data) {
            setTimeout(() => {
                VerContrato.loader = false;
                console.log('data = ', data);
                Uploads.files = [];
                VerContrato.fetchContrato();
                alert('Proceso realizado con éxito');

            }, 1000);
        }).catch(function(err) {
            console.error(err);
        });
    }

    static loadFile(event) {


        if (Uploads.files.length > 0) {
            alert("No se puede subir mas de un documento al mismo tiempo.");
            throw "No se puede subir mas de un documento al mismo tiempo.";
        } else if (GetUploads.files.length == 9) {
            alert("No se puede subir mas documentos en este registro.");
            throw "No se puede subir mas documentos en este registro.";
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
                        value: VerContrato.data.NHC
                    }),
                    m("input[type='hidden'][name='adm']", {
                        value: VerContrato.data.ADM
                    }),
                    m("input[type='hidden'][name='pte']", {
                        value: VerContrato.data.PACIENTE
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
            ])
        ];
    }
};

class GetUploads {
    static files = [];
    view() {
        return [
            m("div.mg-t-10.d-flex", {}, [
                GetUploads.files.length == 0 ? [
                    m('p', 'No existe archivos.')
                ] : GetUploads.files.length > 0 ? [
                    GetUploads.files.map(function(_v, _i, _contentData) {
                        return [
                            m("div.col-6.col-sm-4.col-md-3.col-xl-3.mg-b-5.mg-t-5",
                                m("div.card.card-file", [
                                    m("div.dropdown-file", [
                                        m("a.dropdown-link[href=''][data-toggle='dropdown']",
                                            m("svg.feather.feather-more-vertical[xmlns='http://www.w3.org/2000/svg'][width='24'][height='24'][viewBox='0 0 24 24'][fill='none'][stroke='currentColor'][stroke-width='2'][stroke-linecap='round'][stroke-linejoin='round']", [
                                                m("circle[cx='12'][cy='12'][r='1']"),
                                                m("circle[cx='12'][cy='5'][r='1']"),
                                                m("circle[cx='12'][cy='19'][r='1']")
                                            ])
                                        ),
                                        m("div.dropdown-menu.dropdown-menu-right", [

                                            m("a.dropdown-item.tx-danger[href='#']", {
                                                onclick: (e) => {
                                                    e.preventDefault();
                                                    let text = "MetroPlus\nEsta Ud. seguro de eliminar este archivo.";
                                                    if (confirm(text) == true) {
                                                        VerContrato.deleteFile(_v.DeleteFile);
                                                    }
                                                }
                                            }, [

                                                "Eliminar"
                                            ]),
                                            m("a.dropdown-item[href='" + _v.DownloadFile + "'][target='_blank']", [

                                                "Descargar"
                                            ]),

                                        ])
                                    ]),
                                    m("div.card-file-thumb.tx-primary",
                                        m("i.far.fa-file")
                                    ),
                                    m("div.card-body", [
                                        m(".d-inline.tx-4",
                                            'Fecha: ' + _v.FECHA
                                        ),
                                        m('br'),
                                        m(".d-inline.tx-5",
                                            _v.FILENAME
                                        ),
                                    ])
                                ])
                            )
                        ]
                    })
                ] : []
            ])
        ];
    }
};

// Ver Contrato Admisiones MV
class VerContrato extends App {
    static data = [];
    static numeroHistoriaClinica = null;
    static numeroAdmision = null;
    static loader = false;
    constructor(_data) {
        super();
        if (App.isAuthenticated() && App.hasProfile('PERFIL_ADMISIONES_METROPLUS')) {
            App.setTitle("Ver Contrato");
            this.view = VerContrato.page;
            VerContrato.numeroHistoriaClinica = _data.attrs.numeroHistoriaClinica;
            VerContrato.numeroAdmision = _data.attrs.numeroAdmision;
        }
    }
    oncreate() {
        VerContrato.fetchContrato();
    }
    onremove() {
        VerContrato.loader = true;

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
                            m('div', {
                                class: (VerContrato.loader == true || VerContrato.data.length == 0 ? '' : 'd-none')
                            }, m(Loader)),
                            m("div.table-content.col-12.pd-r-0.pd-l-0.pd-b-20.", {
                                class: (VerContrato.loader == false && VerContrato.data.length !== 0 ? '' : 'd-none')
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
                                                                'disabled': 'disabled',
                                                                value: VerContrato.data.NHC

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
                                                                'disabled': 'disabled',
                                                                value: VerContrato.data.ADM
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
                                                                value: VerContrato.data.PACIENTE

                                                            })
                                                        )


                                                    ]),
                                                    m("tr", [
                                                        m("th.tx-semibold.tx-14[colspan='1']", {
                                                                style: { "background-color": "#a8bed6" }
                                                            },
                                                            "Cajero:"
                                                        ),
                                                        m("td[colspan='9']", {
                                                                style: { "background-color": "#eaeff5" }
                                                            },
                                                            m("input", {
                                                                "class": "form-control tx-semibold tx-14",
                                                                "type": "text",
                                                                "placeholder": "Cajero",
                                                                'disabled': 'disabled',
                                                                value: VerContrato.data.USUARIO

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

                                                                        " Adjuntos ",
                                                                        (GetUploads.files.length !== 0 ? [
                                                                            m('span.mg-l-5.tx-14.tx-semibold.badge.badge-danger', GetUploads.files.length)
                                                                        ] : [])
                                                                    )
                                                                ),
                                                                m("li.nav-item",
                                                                    m("a.nav-link[id='home-upload'][data-toggle='tab'][href='#upload'][role='tab'][aria-controls='upload'][aria-selected='true']", {
                                                                            style: { "color": "#476ba3" }
                                                                        },
                                                                        m("i.fas.fa-file-upload.pd-1.mg-r-2"),

                                                                        " Subir "
                                                                    )
                                                                ),
                                                            ]),
                                                        ),


                                                    ]),
                                                    m("tr.d-print-none", [

                                                        m("td[colspan='9']",
                                                            m(".tab-content.bd.bd-gray-300.bd-t-0[id='myTab']", [
                                                                m(".tab-pane.fade[id='home'][role='tabpanel'][aria-labelledby='home-tab']", [
                                                                    m(GetUploads),
                                                                ]),
                                                                m(".tab-pane.fade[id='upload'][role='tabpanel'][aria-labelledby='home-upload']", [
                                                                    m(Uploads),
                                                                    m("div.input-group.mg-t-5",
                                                                        m("button.btn.btn-primary.btn-xs.btn-block.tx-semibold[type='button']", {
                                                                                onclick: (e) => {
                                                                                    Uploads.uploadService();
                                                                                }
                                                                            },
                                                                            "Subir"
                                                                        )
                                                                    )
                                                                ]),
                                                            ]),
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
    static deleteFile(url) {
        VerContrato.loader = true;
        return m.request({
                method: "GET",
                url: url,
                headers: {
                    "Content-Type": "application/json; charset=utf-8",
                },
            })
            .then(function(res) {
                VerContrato.loader = false;
                if (res.status) {
                    alert('Proceso realizado con éxito.');
                    VerContrato.fetchContrato();
                } else {
                    alert('No se pudo completar con éxito esta petición. Reintente nuevamente.');
                }
            })
            .catch(function(e) {
                alert(e)
            })
    }
    static fetchContrato() {

        VerContrato.loader = true;

        return m.request({
                method: "GET",
                url: "https://api.hospitalmetropolitano.org/v2/metroplus/admisiones/contrato?numeroHistoriaClinica=" + VerContrato.numeroHistoriaClinica + '&numeroAdmision=' + VerContrato.numeroAdmision,
                headers: {
                    "Content-Type": "application/json; charset=utf-8",
                },
            })
            .then(function(res) {
                VerContrato.loader = false;
                if (res.status) {
                    VerContrato.data = res.data[0];
                    GetUploads.files = res.uploads;
                }
            })
            .catch(function(e) {
                alert(e)
            })

    }
    static vMenu() {
        return m(Sidebar, { page: 'admisiones/contrato' });
    }
    static page() {
        return [
            VerContrato.vHeader(),
            VerContrato.vMenu(),
            VerContrato.vMain()
        ];
    }
}


export default VerContrato;