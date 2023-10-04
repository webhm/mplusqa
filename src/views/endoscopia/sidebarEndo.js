import m from "mithril";
import App from "../../models/App";
import Menu from "./menuEndo";


class MenuSidebar {
    view() {
        if (Menu.modulos.length !== 0) {
            return [
                Menu.modulos.map(function (_v, _i, _contentData) {
                    if (App.hasProfile(_v.profile)) {
                        return [
                            m(m.route.Link, { href: "/" + _v.page, class: ((SidebarEndo.page == _v.page) ? "active" : "") }, [
                                _v.label
                            ])
                        ]
                    }



                })
            ]
        }

    }

};




class SidebarEndo {
    oninit(_data) {
        SidebarEndo.page = _data.attrs.page;
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
                            "Endoscopía"
                        ),
                        m("li.nav-item.show", [

                            m(m.route.Link, { href: "/endoscopía", class: "nav-link with-sub" }, [
                                m("i[data-feather='layout']"),
                                " Endoscopía "
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

export default SidebarEndo;