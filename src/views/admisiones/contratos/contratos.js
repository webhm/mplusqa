import m from "mithril";
import App from "../../../models/App";
import HeaderPrivate from "../../layout/headerPrivate";
import Sidebar from "./sidebarContratos";
import Loader from "../../utils/loader";
import Errors from "../../utils/errors";
import Table from "../../utils/table";
import { Stopwatch } from "../../utils/stopWatch";
import ApiHTTP from "../../../models/ApiHTTP";


// Contratos Admisiones MV

class Contratos extends App {
    static contratos = null;
    static dataContrato = null;
    static idFiltro = 1;
    constructor(_data) {
        super();
        if (App.isAuthenticated() && App.hasProfile('PERFIL_ADMISIONES_METROPLUS')) {
            App.setTitle("Contratos Digitalizados");
            this.view = Contratos.page;
        }
    }
    oncreate(_data) {
        if (_data.attrs.idFiltro !== undefined) {
            Contratos.idFiltro = _data.attrs.idFiltro;
        }
        Contratos.fetchData().then((_data) => {
            Contratos.contratos = _data;
        });
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
                            m(m.route.Link, { href: "/admisiones", }, [
                                'Admisiones'
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

                        (Contratos.contratos !== null && Contratos.contratos.status) ? [
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
                                        "Todos los Contratos:",
                                        m("span.badge.bg-litecoin.tx-white.tx-semibold.pd-l-10.pd-r-10.mg-l-5.tx-15", {
                                                oncreate: (el) => {
                                                    if (Contratos.idFiltro == 1) {
                                                        el.dom.innerHTML = 'Contratos de Hoy';
                                                    }
                                                    if (Contratos.idFiltro == 2) {
                                                        el.dom.innerHTML = 'Todos los Contratos';
                                                    }
                                                },
                                                onupdate: (el) => {
                                                    if (Contratos.idFiltro == 1) {
                                                        el.dom.innerHTML = 'Contratos de Hoy';
                                                    }
                                                    if (Contratos.idFiltro == 2) {
                                                        el.dom.innerHTML = 'Todos los Contratos';
                                                    }
                                                }
                                            }

                                        )

                                    ),
                                    m("div.d-flex.tx-14", [
                                        m("div", [
                                            m("div.link-03.lh-0.mg-l-6", {
                                                    id: "expExcel",
                                                    style: { "cursor": "pointer" },
                                                    title: "Exportar a Excel",
                                                    onclick: (e) => {
                                                        e.preventDefault();
                                                        $('#table-contratos').DataTable().buttons(0, 0).trigger();
                                                    }
                                                },
                                                m("i.fas.fa-file-excel.tx-18.pd-5")
                                            ),
                                        ]),
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
                                                    href: "/admisiones/contratos/?idFiltro=1",
                                                    onclick: (e) => {
                                                        Contratos.reloadData(1);
                                                        Contratos.fetchData().then((_data) => {
                                                            Contratos.contratos = _data;
                                                        });
                                                    }
                                                }, [
                                                    'Contratos de Hoy'
                                                ]),
                                                m(m.route.Link, {
                                                    class: 'dropdown-item',
                                                    href: "/admisiones/contratos/?idFiltro=2",
                                                    onclick: (e) => {
                                                        Contratos.reloadData(2);
                                                        Contratos.fetchData().then((_data) => {
                                                            Contratos.contratos = _data;
                                                        });
                                                    }
                                                }, [
                                                    'Todos los Contratos'
                                                ]),


                                            ])
                                        ])
                                    ])
                                ]),

                            ]),
                            Contratos.vTableUsuarios('table-contratos', Contratos.contratos.data, Contratos.arqTable())
                        ] : (Contratos.contratos !== null && (!Contratos.contratos.status || Contratos.contratos.status == null)) ? [
                            m(Errors, { type: (!Contratos.contratos.status ? 1 : 0), error: Contratos.contratos })
                        ] : [
                            m('div.pd-t-5'),
                            m(Loader)
                        ]
                    ]),



                ])
            ),
            m("div.section-nav", {
                class: (Contratos.contratos !== null ? '' : 'd-none')
            }, [
                m("label.nav-label",
                    Contratos.title + ":"
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
                                    (Contratos.contratos !== null ? Contratos.contratos.data.length : 0)
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
    static vMenu() {
        return m(Sidebar, { page: 'admisiones/contratos' });
    }
    static reloadData(idFiltro) {
        Contratos.contratos = null;
        Contratos.idFiltro = idFiltro;
    }
    static fetchData() {

        let _queryString = '?idFiltro=' + Contratos.idFiltro;

        return m.request({
                method: "GET",
                url: ApiHTTP.apiUrl + "/v2/metroplus/admisiones/contratos" + _queryString,
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
    static fetchEliminar(numeroHistoriaClinica, numeroAdmision) {

        return m.request({
                method: "DELETE",
                url: ApiHTTP.apiUrl + "/v2/metroplus/admisiones/contrato?numeroHistoriaClinica=" + numeroHistoriaClinica + "&numeroAdmision=" + numeroAdmision,
                headers: {
                    "Content-Type": "application/json; charset=utf-8",
                },
            })
            .then(function(result) {
                if (result.status) {
                    Contratos.reloadData(Contratos.idFiltro);
                    Contratos.fetchData().then((_data) => {
                        Contratos.contratos = _data;
                    });
                } else {
                    alert(result.message);
                }
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
            dom: 'ltip',
            buttons: [{
                extend: "excel",
            }],
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
                    title: "PACIENTE:",
                },
                {
                    title: "HCL:",
                },
                {
                    title: "ADM:",
                },
                {
                    title: "FECHA:",
                },
                {
                    title: "CAJERO:",
                },

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
                        return full.PACIENTE;
                    },
                    visible: true,
                    aTargets: [1],
                    orderable: true,

                },
                {
                    mRender: function(data, type, full) {
                        return full.NHC;

                    },
                    visible: true,
                    aTargets: [2],
                    orderable: true,

                }, {
                    mRender: function(data, type, full) {
                        return full.ADM;

                    },
                    visible: true,
                    aTargets: [3],
                    orderable: true,

                }, {
                    mRender: function(data, type, full) {
                        return full.FECHA;

                    },
                    visible: true,
                    aTargets: [4],
                    orderable: true,

                },
                {
                    mRender: function(data, type, full) {
                        return full.USUARIO;

                    },
                    visible: true,
                    aTargets: [5],
                    orderable: true,

                },



            ],
            fnRowCallback: function(nRow, aData, iDisplayIndex, iDisplayIndexFull) {

                m.mount(nRow, {
                    view: () => {
                        return [
                            m("td", [
                                (iDisplayIndexFull + 1)
                            ]),
                            m("td", [
                                aData.PACIENTE,
                            ]),
                            m("td", [
                                aData.NHC
                            ]),
                            m("td", [
                                aData.ADM
                            ]),
                            m("td", [
                                aData.FECHA
                            ]),
                            m("td", [
                                aData.USUARIO
                            ]),
                            m("td.text-center", [
                                m('button.btn.btn-block.btn-secondary.tx-12', {
                                    style: { "background-color": "#185b98" },
                                    onclick: () => {
                                        m.route.set('/admisiones/contrato/', {
                                            numeroHistoriaClinica: aData.NHC,
                                            numeroAdmision: aData.ADM,
                                        });
                                    }
                                }, " Ver "),


                            ]),
                            m("td.text-center", [

                                m('button.btn.btn-block.btn-danger.tx-12', {
                                    onclick: () => {

                                        let text = "MetroPlus\nEsta Ud. seguro de eliminar este registro.";
                                        if (confirm(text) == true) {
                                            Contratos.fetchEliminar(aData.NHC, aData.ADM);
                                        }

                                    }
                                }, " Eliminar "),

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
            Contratos.vHeader(),
            Contratos.vMenu(),
            Contratos.vMain()
        ];
    }
}


export default Contratos;