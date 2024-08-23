import m from "mithril";
import App from "../../../models/App";
import HeaderPrivate from "../../layout/headerPrivate";
import SidebarAdmin from "../sidebarAdmin";
import Loader from "../../utils/loader";
import Errors from "../../utils/errors";
import Table from "../../utils/table";
import { Stopwatch } from "../../utils/stopWatch";
import ApiHTTP from "../../../models/ApiHTTP";
import qrcode from "qrcode";


// Administración MV

class usrMPlus extends App {
    static usuarios = null;
    static dataUser = null;
    static idUsr = null;
    static idFiltro = 1;
    constructor(_data) {
        super();
        if (App.isAuthenticated() && App.hasProfile('PERFIL_ADMINISTRACION_METROPLUS')) {
            App.setTitle("Usuarios MetroPlus");
            this.view = usrMPlus.page;
        }
    }
    oncreate(_data) {
        if (_data.attrs.idFiltro !== undefined) {
            usrMPlus.idFiltro = _data.attrs.idFiltro;
        }
        usrMPlus.fetchData().then((_data) => {
            usrMPlus.usuarios = _data;
        });
    }
    onupdate(_data) {

        if (_data.attrs.idUsr !== undefined) {
            usrMPlus.idUsr = _data.attrs.idUsr;
            m.redraw();
        } else {
            usrMPlus.idUsr = null;
            m.redraw();
        }

    }
    static vHeader() {
        return m(HeaderPrivate, { userName: App.userName });
    }
    static vMain() {
        return [
            m("div.content.content-components",
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
                            m(m.route.Link, { href: "/administracion", }, [
                                'Administración'
                            ]),
                        ),
                        m("li.breadcrumb-item.active[aria-current='page']",
                            App.title
                        )
                    ]),
                    m("h1.df-title.mg-t-20.mg-b-20",
                        App.title + ":"
                    ),

                    m("div", [

                        (usrMPlus.usuarios !== null && usrMPlus.usuarios.status) ? [
                            m(".modal.calendar-modal-event[id='modalViewQR'][role='dialog'][aria-hidden='true']",
                                m(".modal-dialog.modal-dialog-centered.modal-sm[role='document']",
                                    m("div.modal-content", [
                                        m("div.modal-header.bg-primary", [
                                            m("h6.event-title.text-semibold", 'Pasaporte QR:'),
                                            m("nav.nav.nav-modal-event", [
                                                m("a.nav-link[href='#'][data-dismiss='modal']",
                                                    m("i[data-feather='x']")
                                                )
                                            ])
                                        ]),
                                        m("div.modal-body", [
                                            m("div.row.col-12", [
                                                m("label.tx-11.tx-medium.tx-spacing-1.tx-color-03",
                                                    "*Escanee con su teléfono para continuar."
                                                ),
                                                m("p.event-start-date.tx-center", [
                                                    m('canvas.qr.wd-100p')
                                                ])
                                            ]),
                                        ])
                                    ])
                                )
                            ),
                            m("div.table-content.col-12.pd-r-0.pd-l-0", [
                                m("div.d-flex.align-items-center.justify-content-between.mg-t-10", [
                                    m("h5.mg-b-0",
                                        "Todos los Usuarios:",
                                        m("span.badge.bg-litecoin.tx-white.tx-semibold.pd-l-10.pd-r-10.mg-l-5.tx-15", {
                                                oncreate: (el) => {
                                                    if (usrMPlus.idFiltro == 1) {
                                                        el.dom.innerHTML = 'Grp-radius-Medicos';
                                                    }
                                                    if (usrMPlus.idFiltro == 2) {
                                                        el.dom.innerHTML = 'Grp-radius-Residentes';
                                                    }
                                                },
                                                onupdate: (el) => {
                                                    if (usrMPlus.idFiltro == 1) {
                                                        el.dom.innerHTML = 'Grp-radius-Medicos';
                                                    }
                                                    if (usrMPlus.idFiltro == 2) {
                                                        el.dom.innerHTML = 'Grp-radius-Residentes';
                                                    }
                                                }
                                            }

                                        )

                                    ),
                                    m("div.d-flex.tx-14", [

                                        m("div.dropdown.dropleft", [

                                            m("div.link-03.lh-0.mg-l-5[id='dropdownMenuButton'][data-toggle='dropdown'][aria-haspopup='true'][aria-expanded='false']", {
                                                    style: { "cursor": "pointer" },
                                                    title: "Filtrar"
                                                },
                                                m("i.fas.fa-filter.tx-18.pd-5")
                                            ),
                                            m(".dropdown-menu.tx-13[aria-labelledby='dropdownMenuButton']", [
                                                m("h6.dropdown-header.tx-uppercase.tx-12.tx-bold.tx-inverse",
                                                    "FILTROS:"
                                                ),
                                                m(m.route.Link, {
                                                    class: 'dropdown-item',
                                                    href: "/administracion/metroplus/?idFiltro=1",
                                                    onclick: (e) => {
                                                        usrMPlus.reloadData(1);
                                                        usrMPlus.fetchData().then((_data) => {
                                                            usrMPlus.usuarios = _data;
                                                        });
                                                    }
                                                }, [
                                                    "Grp-radius-Medicos"
                                                ]),
                                                m(m.route.Link, {
                                                    class: 'dropdown-item',
                                                    href: "/administracion/metroplus/?idFiltro=2",
                                                    onclick: (e) => {
                                                        usrMPlus.reloadData(2);
                                                        usrMPlus.fetchData().then((_data) => {
                                                            usrMPlus.usuarios = _data;
                                                        });
                                                    }
                                                }, [
                                                    "Grp-radius-Residentes"
                                                ]),


                                            ])
                                        ])
                                    ])
                                ]),

                            ]),
                            usrMPlus.vTableUsuarios('table-usr', usrMPlus.usuarios.data, usrMPlus.arqTable())
                        ] : (usrMPlus.usuarios !== null && (!usrMPlus.usuarios.status || usrMPlus.usuarios.status == null)) ? [
                            m(Errors, { type: (!usrMPlus.usuarios.status ? 1 : 0), error: usrMPlus.usuarios })
                        ] : [
                            m(Loader)
                        ]
                    ]),



                ])
            ),
            m("div.section-nav", {
                class: (usrMPlus.usuarios !== null ? '' : 'd-none')
            }, [
                m("label.nav-label",
                    usrMPlus.title + ":"
                ),
                m("div.mg-t-10.bg-white", {

                    },

                    m("div.mg-t-10.bg-white",
                        m("div.card-header.pd-t-20.pd-b-0.bd-b-0", [
                            m("h6.lh-5.mg-b-5",
                                "N° de Resultados:"
                            ),

                        ]),
                        m("div.card-body.pd-0", [
                            m("div.pd-t-10.pd-b-0.pd-x-20.d-flex.align-items-baseline", [
                                m("h2.tx-normal.tx-rubik.mg-b-0.mg-r-5",
                                    (usrMPlus.usuarios !== null ? usrMPlus.usuarios.data.length : 0)
                                ),
                                m("div.tx-14", [
                                    m("divv.lh-0.tx-gray-300", 'Resultado(s)')
                                ])
                            ]),

                        ])
                    ),
                    m("div.pd-20", [
                        m(Stopwatch)
                    ])
                ),

            ])
        ];
    }
    static vMainProfile() {
        usrMPlus.fetchProfile();
        return [
            m("div.content.content-components",
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
                            m(m.route.Link, { href: "/administracion", }, [
                                'Administración'
                            ]),
                        ),
                        m("li.breadcrumb-item.active[aria-current='page']",
                            usrMPlus.title
                        )
                    ]),
                    m("h1.df-title.mg-t-20.mg-b-10",
                        usrMPlus.title + ":"
                    ),
                    (usrMPlus.dataUser !== null ? [
                        m('div.table-responsive', [
                            m("table.table.table-bordered.table-sm.tx-14", [
                                m("thead",

                                    m("tr.bg-litecoin.op-9.tx-white.tx-uppercase", [
                                        m("th[scope='col'][colspan='10']",
                                            "DATOS DEL USUARIO: " + usrMPlus.dataUser.samaccountname
                                        ),

                                    ])
                                ),
                                m("tbody", [
                                    m("tr", [
                                        m("th", {
                                                style: { "background-color": "#a8bed6" }
                                            },
                                            "Nombres Completos:"
                                        ),
                                        m("td[colspan='4']", {
                                            style: { "background-color": "#eaeff5" }

                                        }, usrMPlus.dataUser.sn + ' ' + usrMPlus.dataUser.cn),
                                        m("th", {
                                                style: { "background-color": "#a8bed6" }
                                            },
                                            "Grupo:"
                                        ),
                                        m("td[colspan='4']", {
                                            style: { "background-color": "#eaeff5" }

                                        }, usrMPlus.dataUser.grupo),

                                    ]),

                                    m("tr", [
                                        m("th", {
                                                style: { "background-color": "#a8bed6" }
                                            },
                                            "Correo electrónico:"
                                        ),
                                        m("td[colspan='4']", {
                                                style: { "background-color": "#eaeff5" }

                                            },
                                            usrMPlus.dataUser.mail
                                        ),
                                        m("th", {
                                                style: { "background-color": "#a8bed6" }
                                            },
                                            "Historial de Actividad:"
                                        ),
                                        m("td[colspan='4']", {
                                                style: { "background-color": "#eaeff5" }

                                            },
                                            m('.tx-12.d-block', 'Creado: ' + usrMPlus.dataUser.whencreated),
                                            m('.tx-12.d-block', 'Actualizado: ' + usrMPlus.dataUser.whenchanged),
                                            m('.tx-12.d-block', 'Última Contraseña: ' + usrMPlus.dataUser.pwdlastset),
                                            m('.tx-12.d-block', 'Último Acceso: ' + usrMPlus.dataUser.lastlogontimestamp),
                                        ),



                                    ]),
                                ]),

                                m("tbody", [


                                    m("tr.d-print-none.bg-litecoin.op-9.tx-white.", [
                                        m("th[scope='col'][colspan='10']",
                                            "OPCIONES DISPONIBLES:"
                                        ),

                                    ]),
                                    m("tr.d-print-none", [

                                        m("td[colspan='10']", {
                                                style: { "background-color": "#eaeff5" }

                                            },
                                            m("ul.nav.nav-tabs[id='myTab'][role='tablist']", {}, [
                                                m("li.nav-item",
                                                    m("a.nav-link[id='home-tab'][data-toggle='tab'][href='#home'][role='tab'][aria-controls='home'][aria-selected='true']", {
                                                            style: { "color": "#476ba3" }
                                                        },
                                                        m("i.fas.fa-file-alt.pd-1.mg-r-2"),

                                                        " HOJA 005"
                                                    )
                                                ),
                                                m("li.nav-item",
                                                    m("a.nav-link[id='home-muestra'][data-toggle='tab'][href='#muestra'][role='tab'][aria-controls='muestra']", {
                                                            style: { "color": "#476ba3" }
                                                        },
                                                        m("i.fas.fa-edit.pd-1.mg-r-2"),

                                                        " TOMA DE MUESTRA "
                                                    )
                                                ),
                                                m("li.nav-item",
                                                    m("a.nav-link[id='home-recep'][data-toggle='tab'][href='#recep'][role='tab'][aria-controls='recep']", {
                                                            style: { "color": "#476ba3" }
                                                        },
                                                        m("i.fas.fa-inbox.pd-1.mg-r-2"),

                                                        " RECEP. DE MUESTRA "
                                                    )
                                                ),
                                                m("li.nav-item",
                                                    m("a.nav-link[id='home-comment'][data-toggle='tab'][href='#comment'][role='tab'][aria-controls='comment']", {
                                                            style: { "color": "#476ba3" }
                                                        },
                                                        m("i.fas.fa-inbox.pd-1.mg-r-2"),

                                                        " COMENTARIOS "
                                                    )
                                                ),



                                            ]),
                                        ),


                                    ]),
                                    m("tr.d-print-none", [

                                        m("td[colspan='10']",
                                            m(".tab-content.bd.bd-gray-300.bd-t-0[id='myTab']", [
                                                m(".tab-pane.fade[id='home'][role='tabpanel'][aria-labelledby='home-tab']", [

                                                ]),
                                                m(".tab-pane.fade[id='muestra'][role='tabpanel'][aria-labelledby='home-muestra']", [

                                                ]),

                                                m(".tab-pane.fade[id='recep'][role='tabpanel'][aria-labelledby='home-recep']", [

                                                ]),
                                                m(".tab-pane.fade[id='comment'][role='tabpanel'][aria-labelledby='home-comment']", [
                                                    m("p.mg-5", [
                                                        m("span.badge.badge-light.wd-100p.tx-14",
                                                            "Observaciones",
                                                        ),
                                                        m("textarea.form-control.mg-t-5[rows='5'][placeholder='Observaciones']", {
                                                            //oninput: function (e) { Observaciones.observaciones = e.target.value; },
                                                            // value: Observaciones.observaciones,
                                                        }),
                                                        m("div.mg-0.mg-t-5.text-right", [

                                                            m("button.btn.btn-xs.btn-primary.mg-l-2.tx-semibold[type='button']", {
                                                                onclick: function() {

                                                                },
                                                            }, [
                                                                m("i.fas.fa-paper-plane.mg-r-5", )
                                                            ], "Guardar"),


                                                        ]),
                                                        m("hr.wd-100p.mg-t-5.mg-b-5"),

                                                    ]),
                                                    m("p.mg-5", [
                                                        m("span.badge.badge-light.wd-100p.tx-14",
                                                            "Historial de Observaciones",
                                                        ),
                                                        m("table.table.table-sm[id='table-observaciones'][width='100%']")
                                                    ]),
                                                ]),

                                            ])
                                        ),


                                    ])


                                ])
                            ])
                        ])
                    ] : [
                        m(Loader)
                    ])
                ])
            ),
        ];
    }
    static vMenu() {
        return m(SidebarAdmin, { page: 'administracion/metroplus' });
    }
    static reloadData(idFiltro) {
        usrMPlus.usuarios = null;
        usrMPlus.idFiltro = idFiltro;
    }
    static fetchProfile() {


        if (usrMPlus.usuarios !== null && usrMPlus.usuarios.status) {
            return usrMPlus.usuarios.data.map(function(_val, _i, _contentData) {
                if (usrMPlus.idUsr == _val.samaccountname) {
                    usrMPlus.dataUser = _val;
                }
            })
        }


    }
    static fetchData() {

        let _queryString = '?idFiltro=' + usrMPlus.idFiltro;

        return m.request({
                method: "GET",
                url: ApiHTTP.apiUrl + "/v2/sso/usuarios/metroplus" + _queryString,
                headers: {
                    "Content-Type": "application/json; charset=utf-8",
                },
            })
            .then(function(result) {
                return result;
            })
            .catch(function(e) {
                return {
                    'status': null,
                    'message': e
                };
            });

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
            columns: [{
                    title: "N° : ",
                },
                {
                    title: "Usuario AD:",
                },
                {
                    title: "Nombres:",
                },
                {
                    title: "Apellidos:",
                },
                {
                    title: "E-mail:",
                },
                {
                    title: "Opciones:",
                }
            ],
            aoColumnDefs: [{
                    mRender: function(data, type, row, meta) {
                        return meta.row + meta.settings._iDisplayStart + 1;
                    },
                    visible: true,
                    aTargets: [0],
                    orderable: false,
                },
                {
                    mRender: function(data, type, full) {
                        return full.samaccountname;
                    },
                    visible: true,
                    aTargets: [1],
                    orderable: true,

                },
                {
                    mRender: function(data, type, full) {
                        return full.sn;

                    },
                    visible: true,
                    aTargets: [2],
                    orderable: true,

                }, {
                    mRender: function(data, type, full) {
                        return full.cn;

                    },
                    visible: true,
                    aTargets: [3],
                    orderable: true,

                }, {
                    mRender: function(data, type, full) {
                        return full.mail;

                    },
                    visible: true,
                    aTargets: [4],
                    orderable: true,

                },
                {
                    mRender: function(data, type, full) {
                        return ''

                    },
                    visible: true,
                    aTargets: [5],
                    orderable: true,

                }


            ],
            fnRowCallback: function(nRow, aData, iDisplayIndex, iDisplayIndexFull) {

                m.mount(nRow, {
                    view: () => {
                        return [
                            m("td", [
                                (iDisplayIndexFull + 1)
                            ]),
                            m("td", [
                                aData.samaccountname
                            ]),
                            m("td", [
                                aData.sn
                            ]),
                            m("td", [
                                aData.cn
                            ]),
                            m("td", [
                                aData.mail,
                                m('br'),
                                m("span.tx-12[data-toggle='collapse'][href='#collapseExample_" + aData.samaccountname + "'][role='button'][aria-expanded='false'][aria-controls='collapseExample_" + aData.samaccountname + "']", {
                                        style: 'cursor:pointer;'
                                    },
                                    'Creado: ' + aData.whencreated
                                ),
                                m(".collapse[id='collapseExample_" + aData.samaccountname + "']", [
                                    m('.tx-12.d-block', 'Actualizado: ' + aData.whenchanged),
                                    m('.tx-12.d-block', 'Última Contraseña: ' + aData.pwdlastset),
                                    m('.tx-12.d-block', 'Último Acceso: ' + aData.lastlogontimestamp),
                                ])
                            ]),


                            m("td", [
                                m('button.btn.btn-sm.btn-block.tx-semibold.tx-white.d-none', {
                                    style: { "background-color": "#185b98" },
                                    onclick: () => {
                                        m.route.set('/administracion/metroplus/', {
                                            idUsr: aData.samaccountname
                                        });
                                    }
                                }, 'Ver'),
                                m('button.btn.btn-secondary.tx-12', {
                                    style: { "background-color": "#185b98" },
                                    onclick: () => {

                                        let modal = $('#modalViewQR');
                                        modal.modal('show');

                                        let canvasElement = document.querySelector('canvas.qr');
                                        qrcode.toCanvas(
                                            canvasElement,
                                            'https://pasaportes.hospitalmetropolitano.org/hospitalizacion/pasaporte?idPasaporte=63637201', {
                                                width: 250
                                            }
                                        );

                                    }

                                }, [
                                    " Ver QR "
                                ]),
                            ])






                        ];
                    },
                });



            },
        };
    }
    static vTableUsuarios(idTable, dataTable, arqTable) {
        return [
            m(Table, { idTable: idTable, dataTable: dataTable, arqTable: arqTable })
        ]
    }
    static page() {
        return [
            usrMPlus.vHeader(),
            usrMPlus.vMenu(),
            (usrMPlus.idUsr == null ? [
                usrMPlus.vMain()
            ] : [
                usrMPlus.vMainProfile()
            ])
        ];
    }
}


export default usrMPlus;