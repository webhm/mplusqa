import m from "mithril";

class FetchCalendario {

    static fetchCitas(Calendario) {
        try {
            Calendario.setLoader();
            return m.request({
                method: "GET",
                url: "https://api.hospitalmetropolitano.org/v2/date/citas/agendadas",
                params: {
                    idCalendar: (Calendario.idFilter !== null ? Calendario.idFilter : Calendario.idCalendar)
                },
                headers: {
                    "Content-Type": "application/json; charset=utf-8"
                },
            }).then((res) => {
                Calendario.setLoader();
                Calendario.setSidebar();
                if (res.status) {
                    Calendario.citas = {
                        status: res.status,
                        data: res.citasAgendadas,
                        colorsCalendar: res.colorsCalendar
                    };

                } else {
                    Calendario.error = {
                        status: res.status,
                        message: res.message
                    };
                }
            }).catch((e) => {
                Calendario.setLoader();
                Calendario.error = {
                    status: null,
                    message: e
                };
            });
        } catch (error) {
            Calendario.setLoader();
            Calendario.error = {
                status: null,
                message: error
            };
        }
    }

    static fetchPerfilAgenda(Calendario) {
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
                Calendario.setLoader();
                if (res.status) {
                    Calendario.calendarios = res.data.calendarios;
                    if (Calendario.idCalendar == null) {
                        Calendario.idCalendar = res.data.agendas;
                    }
                    Calendario.fetchCitas();
                } else {
                    Calendario.error = {
                        status: res.status,
                        message: res.message
                    };
                }
            }).catch(function(e) {
                Calendario.setLoader();
                Calendario.error = {
                    status: null,
                    message: e
                };
            });
        } catch (error) {
            Calendario.setLoader();
            Calendario.error = {
                status: null,
                message: error
            };
        }
    }

}

export default FetchCalendario;