import m from "mithril";

class RouteCal {

    static setRoute(param, id) {

        if (id == 'idCalendar') {
            m.route.set("/endoscopia/agendas/calendario/", {
                idCalendar: encodeURIComponent(param),
            });
        }


    }




}

export default RouteCal;