import m from "mithril";
import Loader from "../../utils/loader";
import Calendario from "./calendario2";



class ProximasCitas {
    static citas = null;

    view() {
        if (ProximasCitas.citas !== null && ProximasCitas.citas.length > 0) {
            return ProximasCitas.citas.map((_v, _i) => {
                if (_v.tipo == 1 && _i <= 5) {
                    return [
                        m("a.schedule-item.bd-l.bd-2", {
                            style: {
                                "cursor": "pointer",
                            },
                            onclick: (e) => {
                                e.preventDefault();
                                Calendario._goToDate(_v.inicio);

                            }
                        }, [
                            m("span.tx-5.wd-100p.pd-1.pd-r-2.pd-l-5.mg-b-5.tx-semibold", {
                                style: {
                                    "background-color": _v.borderColor,
                                    color: "#fff"
                                }
                            }, _v.tipo == 1 ? " Cita Médica " : _v.tipo == 2 ? " Evento" : " Nota"),
                            m("h6.tx-10", _v.paciente),
                            m("span.tx-5.text-capitalize", moment(_v.inicio, "DD/MM/YYYY HH:mm").format("HH:mm") + " - " + moment(_v.fin, "DD/MM/YYYY HH:mm").format("HH:mm") + " " + moment(_v.fin, "DD/MM/YYYY HH:mm").format("dddd, DD/MM/YYYY")),
                        ]),
                    ];
                }
            });
        } else if (ProximasCitas.citas !== null && ProximasCitas.citas.length == 0) {
            return m(".alert.alert-secondary[role='alert']", "No existen próximas citas.");
        } else {
            return m(Loader);
        }
    }
}

class ProximosEventos {
    static citas = null;

    view() {
        if (ProximosEventos.citas !== null && ProximosEventos.citas.length > 0) {
            return ProximosEventos.citas.map((_v, _i) => {
                if (_v.tipo == 2 && _i <= 5) {
                    return [
                        m("a.schedule-item.bd-l.bd-2", {
                            style: {
                                "cursor": "pointer",
                            },
                            onclick: (e) => {
                                e.preventDefault();
                                Calendario._goToDate(_v.inicio);
                            }
                        }, [
                            m("span.tx-5.wd-100p.pd-1.pd-r-2.pd-l-5.mg-b-5.tx-semibold", {
                                style: {
                                    "background-color": _v.borderColor,
                                    color: "#fff"
                                }
                            }, _v.tipo == 1 ? " Cita Médica " : _v.tipo == 2 ? " Evento" : " Nota"),
                            m("h6.tx-10", _v.title),
                            m("span.tx-5.text-capitalize", moment(_v.inicio, "DD/MM/YYYY HH:mm").format("HH:mm") + " - " + moment(_v.fin, "DD/MM/YYYY HH:mm").format("HH:mm") + " " + moment(_v.fin, "DD/MM/YYYY HH:mm").format("dddd, DD/MM/YYYY")),
                        ]),
                    ];
                }
            });
        } else if (ProximosEventos.citas !== null && ProximosEventos.citas.length == 0) {
            return m(".alert.alert-secondary[role='alert']", "No existen próximos eventos.");
        } else {
            return m(Loader);
        }
    }
}

class CitasAnteriores {
    static citas = null;
    view() {
        if (CitasAnteriores.citas !== null && CitasAnteriores.citas.length > 0) {
            return CitasAnteriores.citas.map((_v, _i) => {
                if (_v.tipo == 2 && _i <= 5) {
                    return [
                        m("a.schedule-item.bd-l.bd-2", {
                            style: {
                                "cursor": "pointer",
                            },
                            onclick: (e) => {
                                e.preventDefault();
                                Calendario._goToDate(_v.inicio);

                            }
                        }, [
                            m("span.tx-5.wd-100p.pd-1.pd-r-2.pd-l-5.mg-b-5.tx-semibold", {
                                style: {
                                    "background-color": _v.borderColor,
                                    color: "#fff"
                                }
                            }, _v.tipo == 1 ? " Cita Médica " : _v.tipo == 2 ? " Evento" : " Nota"),
                            m("h6.tx-10", _v.paciente),
                            m("span.tx-5.text-capitalize", moment(_v.inicio, "DD/MM/YYYY HH:mm").format("HH:mm") + " - " + moment(_v.fin, "DD/MM/YYYY HH:mm").format("HH:mm") + " " + moment(_v.fin, "DD/MM/YYYY HH:mm").format("dddd, DD/MM/YYYY")),
                        ]),
                    ];
                }
            });
        } else if (CitasAnteriores.citas !== null && CitasAnteriores.citas.length == 0) {
            return m(".alert.alert-secondary[role='alert']", "No existen citas anteriores.");
        } else {
            return m(Loader);
        }
    }
}


class BuscadorItems {
    static searchField = "";
    static data = [];
    static loader = false;
    static loadItems() {
        $.fn.dataTable.ext.errMode = "none";
        var table = $("#table-items").DataTable({
            data: BuscadorItems.data,
            dom: "ltp",
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
                    sPrevious: "Anterior"
                },
                oAria: {
                    sSortAscending: ": Activar para ordenar la columna de manera ascendente",
                    sSortDescending: ": Activar para ordenar la columna de manera descendente"
                }
            },
            cache: false,
            order: [
                [2, "Asc"]
            ],
            destroy: true,
            columns: [{
                    title: "N°:"
                },
                {
                    title: "Código:"
                },
                {
                    title: "Item:"
                },

                {
                    title: "Duración:"
                }, {
                    title: "Opciones:"
                },
            ],
            aoColumnDefs: [{
                    mRender: function(data, type, row, meta) {
                        return meta.row + meta.settings._iDisplayStart + 1;
                    },
                    visible: true,
                    aTargets: [0]
                },
                {
                    mRender: function(data, type, full) {
                        return full.CD_ITEM_AGENDAMENTO;
                    },
                    visible: true,
                    aTargets: [1]
                },
                {
                    mRender: function(data, type, full) {
                        return full.DS_ITEM_AGENDAMENTO;
                    },
                    visible: true,
                    aTargets: [2]
                },

                {
                    mRender: function(data, type, full) {
                        return ('<b class="tx-14 tx-semibold tx-danger">' + full.DURACION + " Min. </b>");
                    },
                    visible: true,
                    aTargets: [3]
                }, {
                    mRender: function(data, type, full) {
                        return "OPCIONES";
                    },
                    visible: true,
                    aTargets: [4]
                },
            ],
            fnRowCallback: function(nRow, aData, iDisplayIndex, iDisplayIndexFull) {},
            drawCallback: function(settings) {
                settings.aoData.map(function(_i) {
                    m.mount(_i.anCells[4], {
                        view: function() {
                            return [
                                m("button.btn.btn-sm.btn-block.btn-primary[type='button']", {
                                    onclick: () => {
                                        Calendario.setItem(_i._aData);
                                    }
                                }, "Seleccionar"),
                            ];
                        }
                    });
                });
            }
        });

        $(".dataTables_length select").select2({ minimumResultsForSearch: Infinity });

        return table;
    }
    static fetchSearch() {
        BuscadorItems.loader = true;
        BuscadorItems.data = [];

        m.request({
            method: "POST",
            url: "https://api.hospitalmetropolitano.org/v2/date/items",
            body: {
                searchField: BuscadorItems.searchField
            },
            headers: {
                "Content-Type": "application/json; charset=utf-8"
            }
        }).then(function(res) {
            BuscadorItems.loader = false;
            BuscadorItems.data = res.data;
            BuscadorItems.loadItems();
        }).catch(function(e) {});
    }
    view() {
        return [
            m("div.mg-t-10.pd-10.wd-100p", {
                class: BuscadorItems.loader ? "" : "d-none"
            }, m("div.placeholder-paragraph", [m("div.line"), m("div.line")])),
            m("div.mg-t-10.pd-10.wd-100p", {
                class: BuscadorItems.loader ? "d-none" : ""
            }, m("table.table.table-sm.tx-11[id='table-items'][width='100%']")),
        ];
    }
}

class BuscadorPacientes {
    static searchField = "";
    static data = [];
    static loader = false;
    static loadPacientes() {
        $.fn.dataTable.ext.errMode = "none";
        var table = $("#table-pacientes").DataTable({
            data: BuscadorPacientes.data,
            dom: "ltp",
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
                    sPrevious: "Anterior"
                },
                oAria: {
                    sSortAscending: ": Activar para ordenar la columna de manera ascendente",
                    sSortDescending: ": Activar para ordenar la columna de manera descendente"
                }
            },
            cache: false,
            order: [
                [2, "Asc"]
            ],
            destroy: true,
            columns: [{
                    title: "N°:"
                },
                {
                    title: "NHC:"
                },
                {
                    title: "Paciente:"
                },
                {
                    title: "Edad:"
                }, {
                    title: "Sexo:"
                }, {
                    title: "F. Nacimiento:"
                }, {
                    title: "Opciones:"
                },
            ],
            aoColumnDefs: [{
                    mRender: function(data, type, row, meta) {
                        return meta.row + meta.settings._iDisplayStart + 1;
                    },
                    visible: true,
                    aTargets: [0]
                },
                {
                    mRender: function(data, type, full) {
                        return full.CD_PACIENTE;
                    },
                    visible: true,
                    aTargets: [1]
                },
                {
                    mRender: function(data, type, full) {
                        return full.NM_PACIENTE;
                    },
                    visible: true,
                    aTargets: [2],
                    width: "60%"
                },
                {
                    mRender: function(data, type, full) {
                        return full.EDAD;
                    },
                    visible: true,
                    aTargets: [3]
                }, {
                    mRender: function(data, type, full) {
                        return full.TP_SEXO;
                    },
                    visible: true,
                    aTargets: [4]
                }, {
                    mRender: function(data, type, full) {
                        return full.DT_NASCIMENTO;
                    },
                    visible: true,
                    aTargets: [5]
                }, {
                    mRender: function(data, type, full) {
                        return "OPCIONES";
                    },
                    visible: true,
                    aTargets: [6]
                },
            ],
            fnRowCallback: function(nRow, aData, iDisplayIndex, iDisplayIndexFull) {},
            drawCallback: function(settings) {
                settings.aoData.map(function(_i) {
                    m.mount(_i.anCells[6], {
                        view: function() {
                            return [
                                m("button.btn.btn-sm.btn-block.btn-primary[type='button']", {
                                    onclick: () => {

                                        Calendario.setPaciente(_i._aData);

                                    }
                                }, "Seleccionar"),
                            ];
                        }
                    });
                });
            }
        });

        $(".dataTables_length select").select2({ minimumResultsForSearch: Infinity });

        return table;
    }
    static fetchSearch() {
        BuscadorPacientes.loader = true;
        BuscadorPacientes.data = [];

        m.request({
            method: "POST",
            url: "https://api.hospitalmetropolitano.org/v2/date/pacientes",
            body: {
                searchField: BuscadorPacientes.searchField
            },
            headers: {
                "Content-Type": "application/json; charset=utf-8"
            }
        }).then(function(res) {
            BuscadorPacientes.loader = false;
            BuscadorPacientes.data = res.data;
            BuscadorPacientes.loadPacientes();
        }).catch(function(e) {});
    }
    view() {
        return [
            m("div.mg-t-10.pd-10.wd-100p", {
                class: BuscadorPacientes.loader ? "" : "d-none"
            }, m("div.placeholder-paragraph", [m("div.line"), m("div.line")])),
            m("div.mg-t-10.pd-10.wd-100p", {
                class: BuscadorPacientes.loader ? "d-none" : ""
            }, m("table.table.table-sm.tx-11[id='table-pacientes'][width='100%']")),
        ];
    }
}


export { ProximasCitas, ProximosEventos, CitasAnteriores, BuscadorItems, BuscadorPacientes };