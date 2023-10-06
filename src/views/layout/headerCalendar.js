import m from "mithril";
import SidebarRight from "./sidebarRight";

class MenuHeader {

    view() {

        return [
            m("li.nav-item",
                m(m.route.Link, { href: "/inicio", class: "nav-link" }, [
                    m("i[data-feather='layout']"),
                    " Inicio "
                ])
            ),

        ]



    }


}

// HeaderCalendar
class HeaderCalendar {

    view(_data) {
        return [
            m("header.navbar.navbar-header.navbar-header-fixed", [
                m("a.burger-menu.d-none[href=''][id='sidebarMenuOpen']",
                    m("i[data-feather='arrow-left']")
                ),
                m("a.burger-menu.d-lg-none[href=''][id='calendarSidebarShow']",
                    m("i[data-feather='arrow-left']")
                ),

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
                        m('div.d-lg-none', [
                            m(MenuHeader)
                        ]),

                    ])
                ]),
                m(SidebarRight, { userName: _data.attrs.userName })
            ])
        ];
    }
}






export default HeaderCalendar;