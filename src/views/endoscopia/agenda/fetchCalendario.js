import m from "mithril";
import Calendario from "./calendario2";
import { OptionSelect } from "./widgets";


class FetchCalendario {

    static fetch() {

        Calendario.setLoader();
        return m.request({
            method: "GET",
            url: "https://api.hospitalmetropolitano.org/v2/date/citas/agendadas",
            params: {
                idCalendar: Calendario.idCalendar
            },
            headers: {
                "Content-Type": "application/json; charset=utf-8"
            }
        }).then(function(res) {
            Calendario.setLoader();
            Calendario.citas = {
                status: res.status,
                data: res.citasAgendadas,
                colorsCalendar: res.colorsCalendar
            };

            Calendario.setSidebar();
            Calendario.setCalendar();
        }).catch(function(e) {
            Calendario.setLoader();
            Calendario.citas = {
                status: null,
                message: e
            };
        });
    }

    static reloadFetchAgenda() {
        try {
            setTimeout(() => {
                return m.request({
                    method: "GET",
                    url: "https://api.hospitalmetropolitano.org/v2/date/citas/agendadas",
                    params: {
                        idCalendar: Calendario.idCalendar,
                        searchPaciente: Calendario.searchPaciente
                    },
                    headers: {
                        "Content-Type": "application/json; charset=utf-8"
                    }
                }).then(function(res) {
                    if (res.status) {
                        Calendario.citas = {
                            status: res.status,
                            data: res.citasAgendadas,
                            colorsCalendar: res.colorsCalendar
                        };
                        Calendario.reloadCalendar();
                        OptionSelect.reloadSelect();
                        Calendario.reloadSidebarCitas();
                    } else {
                        Calendario.setLoader();
                        Calendario.citas = {
                            status: res.status,
                            message: res.message

                        };
                    }

                }).catch(function(e) {
                    Calendario.setLoader();
                    Calendario.citas = {
                        status: null,
                        message: e
                    };
                });
            }, 50);
        } catch (error) {
            Calendario.setLoader();
            Calendario.citas = {
                status: null,
                message: error
            };
        }



    }

    static fetchPerfilAgenda() {
        try {
            Calendario.setLoader();
            return m.request({
                method: "POST",
                url: "https://api.hospitalmetropolitano.org/v2/date/citas/perfil",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": localStorage.userToken
                }
            }).then(function(res) {
                if (res.status) {
                    Calendario.calendarios = res.data.calendarios;
                    if (Calendario.idCalendar == null) {
                        Calendario.idCalendar = res.data.agendas;
                    }
                    m.route.set("/endoscopia/agendas/calendario/", {
                        idCalendar: encodeURIComponent(Calendario.idCalendar)
                    });
                    FetchCalendario.fetch();
                } else {
                    Calendario.setLoader();
                    Calendario.citas = {
                        status: res.status,
                        message: res.message

                    };
                }
            }).catch(function(e) {
                Calendario.setLoader();
                Calendario.citas = {
                    status: null,
                    message: e
                };
            });
        } catch (error) {
            Calendario.setLoader();
            Calendario.citas = {
                status: null,
                message: error
            };
        }
    }

}

export default FetchCalendario;