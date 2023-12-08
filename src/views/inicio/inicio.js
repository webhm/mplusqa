import m from 'mithril';
import App from '../../models/App';
import SidebarRight from '../layout/sidebarRight';

class MenuInicio {

    isContent = false;
    view() {
        return [
            m("li.bg-primary.wd-100p.nav-item.d-none",

                m(m.route.Link, { href: "/inicio", class: "nav-link" }, [
                    m("i[data-feather='layout']"),
                    " Inicio "
                ])


            ),

        ]
    }
}

class ModulesAccess {

    view(_data) {

        return [

            (_data.attrs.profiles.includes('PERFIL_ADMISIONES_METROPLUS') ? [
                m("div.col-sm-6.col-lg-3.mg-t-20.mg-sm-t-30.mg-lg-t-0.mg-b-10",

                    m("a[href='/admisiones']", {
                        style: { 'color': "#325a98" }
                    }, [
                        m("div.card.card-help", [
                            m("div.card-body.tx-13", [
                                m("div.tx-60.lh-0.mg-b-15", {
                                        style: { 'color': "#325a98" }
                                    },
                                    m("i.fas.fa-folder-open")
                                ),

                                m("p.tx-color-03.mg-b-0.tx-semibold",
                                    "Admisiones"
                                )
                            ])

                        ])
                    ])
                ),
            ] : []),
            (_data.attrs.profiles.includes('PERFIL_ENDOSCOPIA_METROPLUS') ? [
                m("div.col-sm-6.col-lg-3.mg-t-20.mg-sm-t-30.mg-lg-t-0.mg-b-10",

                    m("a[href='/endoscopia']", {
                        style: { 'color': "#325a98" }
                    }, [
                        m("div.card.card-help", [
                            m("div.card-body.tx-13", [
                                m("div.tx-60.lh-0.mg-b-15", {
                                        style: { 'color': "#325a98" }
                                    },
                                    m("i.fas.fa-compact-disc")
                                ),

                                m("p.tx-color-03.mg-b-0.tx-semibold",
                                    "Endoscopía"
                                )
                            ])

                        ])
                    ])
                ),
            ] : []),
            (_data.attrs.profiles.includes('EMERGENCIA_METROPLUS') ? [
                m("div.col-sm-6.col-lg-3.mg-t-20.mg-sm-t-30.mg-lg-t-0.mg-b-10",

                    m("a[href='/emergencia']", {
                        style: { 'color': "#325a98" }
                    }, [
                        m("div.card.card-help", [
                            m("div.card-body.tx-13", [
                                m("div.tx-60.lh-0.mg-b-15", {
                                        style: { 'color': "#325a98" }
                                    },
                                    m("i.fas.fa-first-aid")
                                ),

                                m("p.tx-color-03.mg-b-0.tx-semibold",
                                    "Emergencia"
                                )
                            ])

                        ])
                    ])
                ),
            ] : []),
            (_data.attrs.profiles.includes('FARMACIA_METROPLUS') ? [
                m("div.col-sm-6.col-lg-3.mg-t-20.mg-sm-t-30.mg-lg-t-0.mg-b-10",

                    m("a[href='/farmacia']", {
                        style: { 'color': "#325a98" }
                    }, [
                        m("div.card.card-help", [
                            m("div.card-body.tx-13", [
                                m("div.tx-60.lh-0.mg-b-15", {
                                        style: { 'color': "#325a98" }
                                    },
                                    m("i.fas.fa-pills")
                                ),

                                m("p.tx-color-03.mg-b-0.tx-semibold",
                                    "Farmacia"
                                )
                            ])

                        ])
                    ])
                ),
            ] : []),
            (_data.attrs.profiles.includes('PERFIL_IMAGEN_METROPLUS') ? [
                m("div.col-sm-6.col-lg-3.mg-t-20.mg-sm-t-30.mg-lg-t-0.mg-b-10",

                    m("a[href='/imagen']", {
                        style: { 'color': "#325a98" }
                    }, [
                        m("div.card.card-help", [
                            m("div.card-body.tx-13", [
                                m("div.tx-60.lh-0.mg-b-15", {
                                        style: { 'color': "#325a98" }
                                    },
                                    m("i.fas.fa-file-prescription")
                                ),

                                m("p.tx-color-03.mg-b-0.tx-semibold",
                                    "Imagen"
                                )
                            ])

                        ])
                    ])
                ),
            ] : []),
            (_data.attrs.profiles.includes('LABORATORIO_METROPLUS') ? [
                m("div.col-sm-6.col-lg-3.mg-t-20.mg-sm-t-30.mg-lg-t-0.mg-b-10",

                    m("a[href='/laboratorio']", {
                        style: { 'color': "#325a98" }
                    }, [
                        m("div.card.card-help", [
                            m("div.card-body.tx-13", [
                                m("div.tx-60.lh-0.mg-b-15", {
                                        style: { 'color': "#325a98" }
                                    },
                                    m("i.fas.fa-microscope")
                                ),

                                m("p.tx-color-03.mg-b-0.tx-semibold",
                                    "Laboratorio"
                                )
                            ])

                        ])
                    ])
                ),
            ] : []),
            (_data.attrs.profiles.includes('PERFIL_HOSPITALIZACION_METROPLUS') ? [
                m("div.col-sm-6.col-lg-3.mg-t-20.mg-sm-t-30.mg-lg-t-0.mg-b-10",

                    m("a[href='/hospitalizacion']", {
                        style: { 'color': "#325a98" }
                    }, [
                        m("div.card.card-help", [
                            m("div.card-body.tx-13", [
                                m("div.tx-60.lh-0.mg-b-15", {
                                        style: { 'color': "#325a98" }
                                    },
                                    m("i.fas.fa-procedures")
                                ),

                                m("p.tx-color-03.mg-b-0.tx-semibold",
                                    "Hospitalización"
                                )
                            ])

                        ])
                    ])
                ),
            ] : []),
            (_data.attrs.profiles.includes('PERFIL_UCI_METROPLUS') ? [
                m("div.col-sm-6.col-lg-3.mg-t-20.mg-sm-t-30.mg-lg-t-0.mg-b-10",

                    m("a[href='/uci']", {
                        style: { 'color': "#325a98" }
                    }, [
                        m("div.card.card-help", [
                            m("div.card-body.tx-13", [
                                m("div.tx-60.lh-0.mg-b-15", {
                                        style: { 'color': "#325a98" }
                                    },
                                    m("i.fas.fa-procedures")
                                ),

                                m("p.tx-color-03.mg-b-0.tx-semibold",
                                    "U.C.I."
                                )
                            ])

                        ])
                    ])
                ),
            ] : []),

            (_data.attrs.profiles.includes('BCO_SANGRE_METROPLUS') ? [
                m("div.col-sm-6.col-lg-3.mg-t-20.mg-sm-t-30.mg-lg-t-0.mg-b-10",
                    m("a[href='/bco-sangre']", {
                        style: { 'color': "#325a98" }
                    }, [
                        m("div.card.card-help", [
                            m("div.card-body.tx-13", [
                                m("div.tx-60.lh-0.mg-b-15", {
                                        style: { 'color': "#325a98" }
                                    },
                                    m("i.fas.fa-burn.tx-55")
                                ),

                                m("p.tx-color-03.mg-b-0.tx-semibold",
                                    "Banco de Sangre"
                                )
                            ])

                        ])
                    ])

                ),
            ] : []),
            (_data.attrs.profiles.includes('PERFIL_ADMINISTRACION_METROPLUS') ? [
                m("div.col-sm-6.col-lg-3.mg-t-20.mg-sm-t-30.mg-lg-t-0.mg-b-10",
                    m("a[href='/administracion']", {
                        style: { 'color': "#325a98" }
                    }, [
                        m("div.card.card-help", [
                            m("div.card-body.tx-13", [
                                m("div.tx-60.lh-0.mg-b-15", {
                                        style: { 'color': "#325a98" }
                                    },
                                    m("i.fas.fa-cog")
                                ),

                                m("p.tx-color-03.mg-b-0.tx-semibold",
                                    "Administraciòn"
                                )
                            ])

                        ])
                    ])
                ),
            ] : []),
            (_data.attrs.profiles.includes('TR_METROPLUS') ? [
                m("div.col-sm-6.col-lg-3.mg-t-20.mg-sm-t-30.mg-lg-t-0.mg-b-10",

                    m("a[href='/terapia-respiratoria']", {
                        style: { 'color': "#325a98" }
                    }, [
                        m("div.card.card-help", [
                            m("div.card-body.tx-13", [
                                m("div.tx-60.lh-0.mg-b-15", {
                                        style: { 'color': "#325a98" }
                                    },
                                    m("i.fas.fa-user-md")
                                ),

                                m("p.tx-color-03.mg-b-0.tx-semibold",
                                    "Terapia Respiratoria"
                                )
                            ])

                        ])
                    ])
                ),
            ] : []),

        ];


    }


}

class iMdodule {
    view() {
        return [
            m("div.row", [
                m("div.col-sm-6.col-lg-3",
                    m("div.card.card-help", [
                        m("div.card-body.tx-13", [
                            m("div.tx-60.lh-0.mg-b-15",
                                m("i.icon.ion-ios-cog")
                            ),
                            m("h5",
                                m("a.link-01[href='']",
                                    "Integrations"
                                )
                            ),
                            m("p.tx-color-03.mg-b-0",
                                "Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molesti..."
                            )
                        ]),
                        m("div.card-footer.tx-13", [
                            m("span",
                                "18 Topics"
                            ),
                            m("a.tx-18.lh-0[href='']",
                                m("i.icon.ion-md-arrow-forward")
                            )
                        ])
                    ])
                ),
                m("div.col-sm-6.col-lg-3.mg-t-20.mg-sm-t-0",
                    m("div.card.card-help", [
                        m("div.card-body.tx-13", [
                            m("div.tx-60.lh-0.mg-b-15",
                                m("i.icon.ion-ios-laptop")
                            ),
                            m("h5",
                                m("a.link-01[href='']",
                                    "Supported Devices"
                                )
                            ),
                            m("p.tx-color-03.mg-b-0",
                                "Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molesti..."
                            )
                        ]),
                        m("div.card-footer.tx-13", [
                            m("span",
                                "22 Topics"
                            ),
                            m("a.tx-18.lh-0[href='']",
                                m("i.icon.ion-md-arrow-forward")
                            )
                        ])
                    ])
                ),
                m("div.col-sm-6.col-lg-3.mg-t-20.mg-sm-t-30.mg-lg-t-0",
                    m("div.card.card-help", [
                        m("div.card-body.tx-13", [
                            m("div.tx-60.lh-0.mg-b-15",
                                m("i.icon.ion-ios-cart")
                            ),
                            m("h5",
                                m("a.link-01[href='']", [
                                    "Pricing ",
                                    m.trust("&amp;"),
                                    " Billing"
                                ])
                            ),
                            m("p.tx-color-03.mg-b-0",
                                "Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molesti..."
                            )
                        ]),
                        m("div.card-footer.tx-13", [
                            m("span",
                                "11 Topics"
                            ),
                            m("a.tx-18.lh-0[href='']",
                                m("i.icon.ion-md-arrow-forward")
                            )
                        ])
                    ])
                ),
                m("div.col-sm-6.col-lg-3.mg-t-20.mg-sm-t-30.mg-lg-t-0",
                    m("div.card.card-help", [
                        m("div.card-body.tx-13", [
                            m("div.tx-60.lh-0.mg-b-15",
                                m("i.icon.ion-ios-filing")
                            ),
                            m("h5",
                                m("a.link-01[href='']",
                                    "Features"
                                )
                            ),
                            m("p.tx-color-03.mg-b-0",
                                "Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molesti..."
                            )
                        ]),
                        m("div.card-footer.tx-13", [
                            m("span",
                                "15 Topics"
                            ),
                            m("a.tx-18.lh-0[href='']",
                                m("i.icon.ion-md-arrow-forward")
                            )
                        ])
                    ])
                )
            ])

        ]
    }
};


class Inicio extends App {
    constructor() {
        super();
        if (App.isAuthenticated()) {
            App.setTitle("Inicio");
            this.view = this.page;
        }
    }

    page() {

        return [
            m("header.navbar.navbar-header.navbar-header-fixed", [

                m("div.navbar-brand",
                    m(m.route.Link, { href: "/", class: "df-logo" }, [
                        "Metro",
                        m("span",
                            "Plus+"
                        ),

                    ]),


                ),
                m(".navbar-menu-wrapper[id='navbarMenu']", [
                    m("div.navbar-menu-header", [
                        m(m.route.Link, { href: "/", class: "df-logo" }, [
                            "Metro",
                            m("span",
                                "Plus+"
                            ),

                        ]),
                        m("a[id='mainMenuClose'][href='']",
                            m("i[data-feather='x']")
                        )
                    ]),
                    m("ul.nav.navbar-menu", [
                        m("li.nav-label.pd-l-20.pd-lg-l-25.d-lg-none",
                            "Menu"
                        ),
                        m(MenuInicio),

                    ])
                ]),
                m(SidebarRight, { userName: App.userName })
            ]),
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

                    m("div.row.tx-14", [
                        m(ModulesAccess, { profiles: App.auth.user.profile }),
                    ]),

                ])
            ),
        ];

    }
}


export default Inicio;