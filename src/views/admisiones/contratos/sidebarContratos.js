import m from "mithril";

class Menu {
    static modulos = [{
            page: 'admisiones/contratos/nuevo',
            label: 'Nuevo Contrato',
            profile: 'PERFIL_ADMISIONES_METROPLUS',
        },
        {
            page: 'admisiones/contratos',
            label: 'Contratos Digitalizados',
            profile: 'PERFIL_ADMISIONES_METROPLUS',
        }
    ];
}

class MenuSidebar {
    view() {
        if (Menu.modulos.length !== 0) {
            return [
                Menu.modulos.map(function(_v, _i, _contentData) {

                    return [
                        m(m.route.Link, { href: "/" + _v.page, class: ((SidebarContratos.page == _v.page) ? "active" : "") }, [
                            _v.label
                        ])

                    ]



                })
            ]
        }

    }

};




class SidebarContratos {
    oninit(_data) {
        SidebarContratos.page = _data.attrs.page;
    }
    view() {
        return [
            m(".sidebar.sidebar-fixed.sidebar-components[id='sidebarMenu']", [
                m("div.sidebar-header", [
                    m("a[href=''][id='mainMenuOpen']",
                        m("i[data-feather='menu']")
                    ),
                    m("h5",
                        "Menu"
                    ),
                    m("a[href=''][id='sidebarMenuClose']",
                        m("i[data-feather='x']")
                    )
                ]),
                m("div.sidebar-body",
                    m("ul.sidebar-nav", [
                        m("li.nav-label.mg-b-15",
                            "Admisiones"
                        ),
                        m("li.nav-item.show", [

                            m(m.route.Link, { href: "/admisiones/contratos", class: "nav-link with-sub" }, [
                                m("i[data-feather='layout']"),
                                " Contratos Digitalizadas "
                            ]),
                            m("nav.nav", [

                                m(MenuSidebar)

                            ])
                        ]),

                    ])
                )
            ])
        ];
    }

};

export default SidebarContratos;