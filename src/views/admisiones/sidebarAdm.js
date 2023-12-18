import m from "mithril";
import App from "../../models/App";

class MenuAdm {
    static modulos = [{
        page: 'admisiones/contratos',
        label: 'Contratos Digitalizados',
        profile: 'PERFIL_ADMISIONES_METROPLUS',
    }];
}

class MenuSidebar {
    view() {
        if (MenuAdm.modulos.length !== 0) {
            return [
                MenuAdm.modulos.map(function(_v, _i, _contentData) {

                    if (App.hasProfile(_v.profile)) {
                        return [
                            m(m.route.Link, { href: "/" + _v.page, class: ((SidebarAdm.page == _v.page) ? "active" : "") }, [
                                _v.label
                            ])

                        ]
                    }



                })
            ]
        }

    }

};




class SidebarAdm {
    oninit(_data) {
        SidebarAdm.page = _data.attrs.page;
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

                            m(m.route.Link, { href: "/admisiones", class: "nav-link with-sub" }, [
                                m("i[data-feather='layout']"),
                                " Admisiones "
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

export default SidebarAdm;