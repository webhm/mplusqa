import m from "mithril";
import Calendario from "./calendario4";

class SelectMedicos {

    static idFilter = null;
    static medicos = [];
    static calendarios = [];

    static selectInit() {
        $("#agendas").select2({
                templateSelection: function(data, container) {
                    container[0].style["font-size"] = "10px";
                    container[0].style["padding-left"] = "5px";
                    container[0].children[0].remove();
                    // container[0].style.backgroundColor = Calendario.setColor(data.id);
                    return data.text;
                },
                placeholder: "Seleccione...",
                searchInputPlaceholder: "Buscar",
                allowClear: true

            })
            .on("change", function(e) {

                let medicos = $(this).val();
                Calendario.setFilterRouteMedicos(medicos);


            });
    }

    oninit(_data) {

        SelectMedicos.idFilter = _data.attrs.idFilter;
        SelectMedicos.calendarios = _data.attrs.calendarios;
        SelectMedicos.calendarios.map((_v) => {
            if (_v.TIPO == 2) {
                SelectMedicos.medicos.push(_v);
            }
        });

    }

    view() {
        return m("select.tx-5.form-control.select2-limit[multiple='multiple'][id='agendas']", {
            oncreate: (el) => {
                setTimeout(() => {
                    SelectMedicos.selectInit();
                }, 50);
            }
        }, [
            SelectMedicos.medicos.map(function(_v, _i, _contentData) {
                if (SelectMedicos.idFilter !== null && SelectMedicos.idFilter.indexOf(',') > 0) {

                    let _agendas = SelectMedicos.idFilter.split(',');
                    return [
                        m("option.tx-10[value='" + _v.IDCALENDAR + "']", {
                            oncreate: (el) => {
                                if (_agendas.includes(_v.IDCALENDAR)) {
                                    el.dom.selected = true;
                                }
                            }
                        }, _v.CALENDAR),
                    ];

                } else if (SelectMedicos.idFilter !== null && SelectMedicos.idFilter.indexOf(',') < 0) {

                    return [
                        m("option.tx-10[value='" + _v.IDCALENDAR + "']", {
                            oncreate: (el) => {
                                if (SelectMedicos.idFilter == _v.IDCALENDAR) {
                                    el.dom.selected = true;
                                }
                            }
                        }, _v.CALENDAR),
                    ];

                } else {
                    return [
                        m("option.tx-10[value='" + _v.IDCALENDAR + "']", _v.CALENDAR),
                    ];
                }

            }),
        ]);

    }
}

class ProximasCitas {
    static citas = [];

    static orderCitas(citas) {

        let filter = [];
        let res = [];

        citas.events.map((_v, _i) => {
            if (_v.tipo == 1 && moment(_v.inicio, "DD/MM/YYYY HH:mm").unix() > moment().unix()) {
                let idUnix = moment(_v.inicio, "DD/MM/YYYY HH:mm").unix();
                _v.idUnixDate = idUnix;
                filter.push(_v);
            }
        });

        function compareByDate(a, b) {
            return a.idUnixDate - b.idUnixDate;
        }

        filter.sort(compareByDate);

        let _i = 0;
        let data = filter;
        data.map((_v) => {
            if (_i <= 4) {
                res.push(_v);
                _i++;
            }
        });

        ProximasCitas.citas = res;

    }

    oninit(_data) {

        ProximasCitas.orderCitas(_data.attrs.citas);

    }

    view() {
        if (ProximasCitas.citas.length !== 0) {
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
        } else {
            return m(".alert.alert-secondary[role='alert']", "No existen próximas citas.");
        }
    }
}

class CitasAnteriores {

    static citas = [];

    static orderCitas(citas) {

        let filter = [];
        let res = [];

        citas.events.map((_v, _i) => {
            if (_v.tipo == 1 && moment(_v.inicio, "DD/MM/YYYY HH:mm").unix() < moment().unix()) {
                let idUnix = moment(_v.inicio, "DD/MM/YYYY HH:mm").unix();
                _v.idUnixDate = idUnix;
                filter.push(_v);
            }
        });

        function compareByDate(a, b) {
            return a.idUnixDate - b.idUnixDate;
        }

        filter.sort(compareByDate);

        let _i = 0;
        let data = filter.reverse();
        data.map((_v) => {
            if (_i <= 4) {
                res.push(_v);
                _i++;
            }
        });

        CitasAnteriores.citas = res;

    }



    oninit(_data) {

        CitasAnteriores.orderCitas(_data.attrs.citas);

    }

    view() {
        if (CitasAnteriores.citas.length !== 0) {
            return CitasAnteriores.citas.map((_v, _i) => {
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
                                    "background-color": '#10b759',
                                    color: "#fff"
                                }
                            }, _v.tipo == 1 ? " Cita Médica " : _v.tipo == 2 ? " Evento" : " Nota"),
                            m("h6.tx-10", _v.paciente),
                            m("span.tx-5.text-capitalize", moment(_v.inicio, "DD/MM/YYYY HH:mm").format("HH:mm") + " - " + moment(_v.fin, "DD/MM/YYYY HH:mm").format("HH:mm") + " " + moment(_v.fin, "DD/MM/YYYY HH:mm").format("dddd, DD/MM/YYYY")),
                        ]),
                    ];
                }
            });
        } else {
            return m(".alert.alert-secondary[role='alert']", "No existen próximas citas.");
        }
    }
}

export { SelectMedicos, ProximasCitas, CitasAnteriores };