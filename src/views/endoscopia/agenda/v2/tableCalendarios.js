import m from "mithril";
import App from "../../../../models/App";
import Calendario from "./calendario4";



class TableCalendarios {

    static cal = {
        id: 1,
        idFilter: 0,
    };

    static calendarios = [];
    static idsCalendarios = [];
    static citas = [];
    static idFilter = null;

    static eliminarNuevoCal(id) {

        let res = [];
        let salas = [];

        TableCalendarios.calendarios.map((_v, _i) => {
            if (_v.id != id) {
                res.push(_v);
            }
        });

        TableCalendarios.calendarios = res;
        TableCalendarios.calendarios.map((_v, _i) => {
            TableCalendarios.calendarios[_i].id = (_i + 1);
        });

        TableCalendarios.calendarios.map((_v) => {
            salas.push(_v.idFilter);
        });

        Calendario.setFilterRouteSalas(salas);

    }

    static agregarNuevoCal() {

        TableCalendarios.calendarios.push({
            id: (TableCalendarios.calendarios.length + 1),
            idFilter: 0,
        });
        let lastCal = TableCalendarios.calendarios[TableCalendarios.calendarios.length - 1];
        TableCalendarios.setCalendar(lastCal.id, lastCal.idFilter);

    };

    static setFilterCal(id, idFilter) {

        // Validacion is ya existe widget calendario
        TableCalendarios.calendarios.map((_v) => {
            if (_v.idFilter == idFilter) {
                let error = 'Ya existe un calendario con ese Id.';
                alert(error);
                console.error(error);
                throw error;
            }

        });

        TableCalendarios.calendarios.map((_v, _i) => {
            if (_v.id == id) {
                TableCalendarios.calendarios[_i].idFilter = idFilter;
            }
        });

        let salas = [];
        TableCalendarios.calendarios.map((_v, _i) => {
            salas.push(_v.idFilter);
            if (_v.id == id) {
                setTimeout(() => {
                    Calendario.reloadCalendar(_v.id, _v.idFilter);
                }, 100);
            }
        });

        Calendario.setFilterRouteSalas(salas);


    }




    static setCalendar(idCal, idFilter) {

        setTimeout(() => {

            $("#calendar" + idCal).fullCalendar({
                height: "parent",
                header: {
                    left: "prev,next today",
                    center: "title",
                    right: ""
                },

                navLinks: true,
                selectable: true,
                defaultDate: moment().format("YYYY-MM-DD"),
                selectLongPressDelay: 100,
                nowIndicator: true,
                editable: false,
                defaultView: "agendaDay",
                minTime: "07:00:00",
                maxTime: "23:30:00",
                slotDuration: "00:30:00",
                slotLabelInterval: 30,
                slotLabelFormat: "HH:mma",
                slotMinutes: 30,
                timeFormat: "HH:mma",
                allDaySlot: false,
                views: {
                    agenda: {
                        columnHeaderHtml: function(mom) {
                            return ("<span>" + mom.format("ddd") + "</span>" + "<span>" + mom.format("DD") + "</span>");
                        }
                    },
                    day: {
                        titleFormat: "dddd DD MMMM YYYY",
                        columnHeader: false
                    },
                    listMonth: {
                        listDayFormat: "ddd DD",
                        listDayAltFormat: false
                    },
                    listWeek: {
                        listDayFormat: "ddd DD",
                        listDayAltFormat: false
                    },
                    agendaThreeDay: {
                        type: "agenda",
                        duration: {
                            days: 3
                        },
                        titleFormat: "MMMM YYYY"
                    }
                },
                eventSources: [],
                eventAfterAllRender: function(view) {

                    if (view.name === "listMonth" || view.name === "listWeek") {
                        var dates = view.el.find(".fc-list-heading-main");
                        dates.each(function() {
                            var text = $(this).text().split(" ");
                            var now = moment().format("DD");

                            $(this).html(text[0] + "<span>" + text[1] + "</span>");
                            if (now === text[1]) {
                                $(this).addClass("now");
                            }
                        });


                    }

                    /*
                    let horaScroll = moment().format('HH:00:00');
                    $("#" + idCal + " .fc-scroller").animate({
                        scrollTop: $('[data-time="' + horaScroll + '"]').position().top // Scroll to 01:00 pm
                    }, 2500);
                    */



                    $('[data-toggle="tooltip"]').tooltip({
                        template: '<div class=" tooltip tooltip-dark " role="tooltip">' + '<div class= "arrow" ></div>' + '<div class="tooltip-inner"></div>' + "</div > "
                    });




                },
                eventRender: function(event, element) {

                    let nacimiento = moment(event.fecha_nacimiento, "DD/MM/YYYY");
                    let hoy = moment();
                    let anios = hoy.diff(nacimiento, "years");
                    let eBorderColor = event.borderColor ? event.borderColor : event.borderColor;
                    let _calendarios = "";

                    if (event.calendarios !== undefined && Object.keys(event.calendarios).length !== 0) {
                        for (let i = 0; i < Object.keys(event.calendarios).length; i++) {
                            let key = Object.keys(event.calendarios)[i];
                            _calendarios += i + 1 + ".- " + event.calendarios[key].CALENDAR + " <br> ";
                        }
                    }

                    element.find(".fc-title").parent().attr("data-toggle", "tooltip");
                    element.find(".fc-title").parent().attr("data-html", "true");
                    element.find(".fc-title").parent().attr("data-placement", "left");

                    if (event.tipo == 1) {
                        element.find(".fc-title").parent().attr("title", "<div class='wd-50px text-left'>" + (event.userEdit !== undefined ? event.userEdit + ' esta modificando esta cita.' : 'Cita Médica: ') + "</div> <br> <div class='wd-50px text-left'>Paciente:</div> <div class='wd-50px text-left'>" + event.paciente + "  </div> <div class='wd-50px text-left'>" + anios + " Años - " + (
                            event.sexo == "M" ? "Masculino" : "Femenino"
                        ) + "  </div> <br> <div class='wd-50px text-left'>Fecha Y Hora:</div> <div class='wd-50px text-right text-capitalize'>" + moment(event.inicio, "DD/MM/YYYY HH:mm").format("HH:mm") + " - " + moment(event.fin, "DD/MM/YYYY HH:mm").format("HH:mm") + " <br> " + moment(event.fin, "DD/MM/YYYY HH:mm").format("dddd, DD/MM/YYYY") + "  </div> <br>  " + "<div class='wd-50px text-left'>Agendas:</div> <div class='wd-50px text-left'>" + _calendarios + "</div>  ");
                    }

                    if (event.tipo == 2) {
                        element.find(".fc-title").parent().attr("title", "<div class='wd-50px text-left'>" + event.title + "  </div> <br>" + "<div class='wd-50px text-left'>Agendas:</div> <div class='wd-50px text-left'>" + _calendarios + "</div>  ");
                    }

                    if (event.tipo == 3) {
                        element.find(".fc-title").parent().parent().css("width", "35%");
                        element.find(".fc-title").parent().attr("title", "<div class='wd-50px text-left'>" + event.title + "  </div> " + "<br> <div class='wd-50px text-left'>Fecha Y Hora:</div> <div class='wd-50px text-right text-capitalize'>" + moment(event.inicio, "DD/MM/YYYY HH:mm").format("HH:mm") + " - " + moment(event.fin, "DD/MM/YYYY HH:mm").format("HH:mm") + " <br> " + moment(event.fin, "DD/MM/YYYY HH:mm").format("dddd, DD/MM/YYYY") + "  </div> <br> " + "<div class='wd-50px text-left'>Agendas:</div> <div class='wd-50px text-left'>" + _calendarios + "</div>  ");
                    }

                    if (event.editable) {
                        element.find(".fc-content").css({ "background-color": "#dc3545", color: "#fff" });
                        element.find(".fc-title").css({ "background-color": "#dc3545", color: "#fff", "font-size": "10px" });
                    } else {
                        element.find(".fc-title").css({ "font-size": "10px" });
                        element.find(".fc-list-item-time").css({ color: eBorderColor, borderColor: eBorderColor });
                        element.find(".fc-list-item-title").css({ borderColor: eBorderColor });
                        element.css("borderLeftColor", eBorderColor);
                    }
                },
                eventDrop: function(calEvent) {
                    if (calEvent.editable) {
                        if (calEvent.userEdit !== undefined && calEvent.userEdit == App.userName) {
                            setTimeout(() => {
                                // Cita.setUpdate(calEvent);
                            }, 50);
                        } else {
                            Calendario.reloadAllCalendars();
                        }
                    }


                },
                eventResize: function(calEvent) {
                    if (calEvent.editable) {
                        if (calEvent.userEdit !== undefined && calEvent.userEdit == App.userName) {
                            setTimeout(() => {
                                // Cita.setUpdate(calEvent);
                            }, 50);
                        } else {
                            Calendario.reloadAllCalendars();
                        }
                    }
                },

            });

            $(".select2-modal").select2({ minimumResultsForSearch: Infinity, dropdownCssClass: "select2-dropdown-modal" });


            let _c = $("#calendar" + idCal).fullCalendar("getCalendar");

            // Display calendar event modal
            _c.on("eventClick", function(calEvent, jsEvent, view) {

                if (calEvent.tipo == 1 && !calEvent.editable) {
                    //  Cita.verCita(calEvent);
                }

                if (calEvent.tipo == 1 && calEvent.editable) {
                    if (calEvent.userEdit !== undefined && calEvent.userEdit == App.userName) {
                        setTimeout(() => {
                            //  Cita.verUpdate(calEvent);
                        }, 50);
                    }
                }

                if (calEvent.tipo > 1 && !calEvent.editable) {
                    // Cita.verEvento(calEvent);
                }

            });

            _c.option("select", function(startDate, endDate) {

                let fecha = moment(startDate).format("DD/MM/YYYY HH:mm");
                if (moment(fecha, "DD/MM/YYYY HH:mm").unix() > moment().unix()) {
                    console.log(5, idCal)
                        //  Cita.crearCita(startDate, endDate);
                }
            });


        }, 50);


    }





    oninit(_data) {


        TableCalendarios.idsCalendarios = _data.attrs.calendarios;
        TableCalendarios.idFilter = _data.attrs.idFilter;
        TableCalendarios.citas = _data.attrs.citas;

        TableCalendarios.calendarios = [];

        if (TableCalendarios.idFilter !== null) {
            let _agendas = null;
            let _i = 1;
            TableCalendarios.idsCalendarios.map((_v) => {
                if (_v.TIPO == 1) {
                    let indice = TableCalendarios.idFilter.indexOf(',');
                    if (indice > 0) {
                        _agendas = TableCalendarios.idFilter.split(',');
                        if (_agendas.includes(_v.IDCALENDAR)) {
                            TableCalendarios.calendarios.push({
                                id: _i,
                                idFilter: _v.IDCALENDAR
                            });
                            _i++;
                        }
                    } else {
                        if (_v.IDCALENDAR == TableCalendarios.idFilter) {
                            TableCalendarios.calendarios.push({
                                id: _i,
                                idFilter: _v.IDCALENDAR
                            });
                            _i++;
                        }
                    }
                }
            });


            if (TableCalendarios.calendarios.length !== 0) {
                TableCalendarios.calendarios.map((_v) => {
                    TableCalendarios.setCalendar(_v.id, _v.idFilter);
                    setTimeout(() => {
                        Calendario.reloadCalendar(_v.id, _v.idFilter);
                    }, 100);
                });
            } else {
                TableCalendarios.calendarios.push(TableCalendarios.cal);
                TableCalendarios.setCalendar(1, 0);
            }

        } else {
            TableCalendarios.calendarios.push(TableCalendarios.cal);
            TableCalendarios.setCalendar(1, 0);
        }



    }

    view() {
        return [
            m("table.table.tx-10", [
                m("tbody", [
                    m("tr", [
                        TableCalendarios.calendarios.map((a, b) =>
                            m("td", {
                                    style: { "width": "30px" }
                                },
                                m('div', [
                                    m("div.input-group", [
                                        m('select.tx-semibold.tx-primary', {
                                                onchange: (e) => {
                                                    try {

                                                        let idCalendar = e.target.options[e.target.options.selectedIndex].value;

                                                        if (idCalendar != 0) {

                                                            TableCalendarios.setFilterCal(a.id, idCalendar);


                                                        }


                                                    } catch (error) {
                                                        e.preventDefault();
                                                    }

                                                },
                                                class: "custom-select",
                                                value: a.idFilter,
                                            }, m("option[value='0']", 'Seleccione...'),
                                            TableCalendarios.idsCalendarios.map(x =>
                                                (x.TIPO == 1 ? [
                                                    m('option', {
                                                        id: a.id,
                                                        value: x.IDCALENDAR,
                                                    }, x.CALENDAR)
                                                ] : [])
                                            )
                                        ),
                                        (a.id == 1 ? [

                                            m("div.input-group-append", {
                                                class: (TableCalendarios.calendarios.length > 1 ? 'd-none' : '')
                                            }, [
                                                m("button.btn.btn-outline-light[type='button']", {
                                                        title: "Agregar Calendario",
                                                        onclick: () => {
                                                            TableCalendarios.agregarNuevoCal();
                                                        }
                                                    },
                                                    m("i.fas.fa-plus-circle")
                                                )
                                            ])
                                        ] : [
                                            m("div.input-group-append", [
                                                m("button.btn.btn-outline-light[type='button']", {
                                                        title: "Eliminar Calendario",
                                                        onclick: () => {
                                                            TableCalendarios.eliminarNuevoCal(a.id);
                                                        }
                                                    },
                                                    m("i.fas.fa-times-circle")
                                                )
                                            ])

                                        ])

                                    ])
                                ]),
                                m('div.ht-600', [
                                    m("div.calendar-content-body", {
                                        id: 'calendar' + a.id,

                                    }),
                                ])

                            ),
                        ),
                    ]),

                ])
            ])
        ]

    }
}

export default TableCalendarios;