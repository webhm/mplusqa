import m from "mithril";
import App from "../../models/App";
import HeaderPrivate from "../layout/headerPrivate";
import SidebarAdmin from "./sidebarAdmin";

// Administración

class Administracion extends App {

    constructor() {
        super();
        if (App.isAuthenticated() && App.hasProfile('PERFIL_ADMINISTRACION_METROPLUS')) {
            App.setTitle("Administración");
            this.view = this.page;
        }
    }

    vHeader() {
        return m(HeaderPrivate, { userName: App.userName });
    }

    vMain() {
        return [

            m("div.content.content-components", {

                },
                m("div.container.mg-l-0.mg-r-0", {
                    style: { "max-width": "100%" }
                }, [
                    m("ol.breadcrumb.df-breadcrumbs", [
                        m("li.breadcrumb-item",
                            m(m.route.Link, { href: "/", }, [
                                "MetroPlus"

                            ]),

                        ),
                        m("li.breadcrumb-item.active[aria-current='page']",
                            App.title
                        )
                    ]),
                    m("h1.df-title.mg-t-20.mg-b-10",
                        App.title + ":"
                    ),

                    m("div.row", [

                        (App.hasProfile('PERFIL_ADM_MEDICOS_METROVIRTUAL') ? [m("div.col-sm-6.col-lg-3.mg-t-20.mg-sm-t-30.mg-lg-t-0.mg-b-10",

                            m("a[href='/administracion/medicos/metrovirtual']", {
                                style: { 'color': "#325a98" }
                            }, [
                                m("div.card.card-help", [
                                    m("div.card-body.tx-13", [
                                        m("div.tx-60.lh-0.mg-b-15", {
                                                style: { 'color': "#325a98" }
                                            },
                                            m("i.fas.fa-users")
                                        ),

                                        m("p.tx-color-03.mg-b-0.tx-semibold",
                                            "Médicos MetroVirtual"
                                        )
                                    ])

                                ])
                            ])
                        )] : []),
                        (App.hasProfile('PERFIL_ADM_PACIENTES_METROVIRTUAL') ? [m("div.col-sm-6.col-lg-3.mg-t-20.mg-sm-t-30.mg-lg-t-0.mg-b-10",

                            m("a[href='/administracion/pacientes/metrovirtual']", {
                                style: { 'color': "#325a98" }
                            }, [
                                m("div.card.card-help", [
                                    m("div.card-body.tx-13", [
                                        m("div.tx-60.lh-0.mg-b-15", {
                                                style: { 'color': "#325a98" }
                                            },
                                            m("i.fas.fa-users")
                                        ),

                                        m("p.tx-color-03.mg-b-0.tx-semibold",
                                            "Pacientes MetroVirtual"
                                        )
                                    ])

                                ])
                            ])
                        )] : []),









                    ]),

                ])
            ),
        ];
    }

    vMenu() {
        return m(SidebarAdmin);
    }

    page() {
        return [
            this.vHeader(),
            this.vMenu(),
            this.vMain()
        ];
    }



}

export default Administracion;