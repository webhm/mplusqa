import m from "mithril";
import App from "../../models/App";

class MenuAdmin {
    static modulos = [{
        page: 'administracion/medicos/metrovirtual',
        label: 'Médicos MetroVirtual',
        profile: 'PERFIL_ADM_MEDICOS_METROVIRTUAL',
    }, {
        page: 'administracion/pacientes/metrovirtual',
        label: 'Pacientes MetroVirtual',
        profile: 'PERFIL_ADM_MEDICOS_METROVIRTUAL',
    }];
}

class MenuSidebar {
    view() {
        if (MenuAdmin.modulos.length !== 0) {
            return [
                MenuAdmin.modulos.map(function (_v, _i, _contentData) {

                    if (App.hasProfile(_v.profile)) {
                        return [
                            m(m.route.Link, {
                                href: "/" + _v.page,
                                class: ((SidebarAdmin.page == _v.page) ? "active" : ""),
                            }, [
                                _v.label
                            ])

                        ]
                    }



                })
            ]
        }

    }

};




class SidebarAdmin {
    oninit(_data) {
        SidebarAdmin.page = _data.attrs.page;
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
                            "Administración"
                        ),
                        m("li.nav-item.show", [

                            m(m.route.Link, { href: "/administracion", class: "nav-link with-sub" }, [
                                m("i[data-feather='layout']"),
                                " Administración"
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

export default SidebarAdmin;