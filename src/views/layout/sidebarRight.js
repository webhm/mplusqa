import m from 'mithril';

class SidebarRight {
    view(_data) {
        return [
            m("div.navbar-right", {
                oncreate: () => {
                    loadCustomPage();
                }
            }, [
                m("div.dropdown.dropdown-profile", [
                    m("a.dropdown-link[href=''][data-toggle='dropdown'][data-display='static'][title='Usuario']",


                        m("div.d-inline.tx-color-03.tx-14.tx-semibold.mg-b-0.mg-r-6",
                            _data.attrs.userName
                        ),
                        m("div.avatar.avatar-sm.tx-color-01",
                            m("i[data-feather='user']"),
                        )
                    ),

                    m("div.dropdown-menu.dropdown-menu-right.tx-13", [
                        m("div.tx-18.tx-semibold.mg-b-0",
                            _data.attrs.userName
                        ),
                        m("p.mg-b-25.tx-12.tx-color-03", [
                            'Usuario'
                        ]),
                        m("div.dropdown-divider"),
                        m('button.btn.btn-xs.btn-block.btn-light.tx-inverse', {
                            onclick: (e) => {
                                m.route.set('/salir');
                            }
                        }, [
                            m("i[data-feather='log-out']"),
                            " Salir ",
                        ]),





                    ])
                ]),

                m("div.dropdown.dropdown-notification.pd-b-3.d-none", {
                    style: { "margin-left": "0px" }
                }, [
                    m("a.dropdown-link.new-indicator[href=''][data-toggle='dropdown'][title='Notificaciones']", [
                        m("i.tx-14[data-feather='bell']"),
                        m("span.  ",
                            "2"
                        )
                    ]),
                    m("div.dropdown-menu.dropdown-menu-right", [
                        m("div.dropdown-header",
                            "Notifications"
                        ),
                        m("a.dropdown-item[href='']",
                            m("div.media", [
                                m("div.avatar.avatar-sm.avatar-online",
                                    m("img.rounded-circle[src='../../assets/img/img6.jpg'][alt='']")
                                ),
                                m("div.media-body.mg-l-15", [
                                    m("p", [
                                        "Congratulate ",
                                        m("strong",
                                            "Socrates Itumay"
                                        ),
                                        " for work anniversaries"
                                    ]),
                                    m("span",
                                        "Mar 15 12:32pm"
                                    )
                                ])
                            ])
                        ),
                        m("a.dropdown-item[href='']",
                            m("div.media", [
                                m("div.avatar.avatar-sm.avatar-online",
                                    m("img.rounded-circle[src='../../assets/img/img8.jpg'][alt='']")
                                ),
                                m("div.media-body.mg-l-15", [
                                    m("p", [
                                        m("strong",
                                            "Joyce Chua"
                                        ),
                                        " just created a new blog post"
                                    ]),
                                    m("span",
                                        "Mar 13 04:16am"
                                    )
                                ])
                            ])
                        ),
                        m("a.dropdown-item[href='']",
                            m("div.media", [
                                m("div.avatar.avatar-sm.avatar-online",
                                    m("img.rounded-circle[src='../../assets/img/img7.jpg'][alt='']")
                                ),
                                m("div.media-body.mg-l-15", [
                                    m("p", [
                                        m("strong",
                                            "Althea Cabardo"
                                        ),
                                        " just created a new blog post"
                                    ]),
                                    m("span",
                                        "Mar 13 02:56am"
                                    )
                                ])
                            ])
                        ),
                        m("a.dropdown-item[href='']",
                            m("div.media", [
                                m("div.avatar.avatar-sm.avatar-online",
                                    m("img.rounded-circle[src='../../assets/img/img9.jpg'][alt='']")
                                ),
                                m("div.media-body.mg-l-15", [
                                    m("p", [
                                        m("strong",
                                            "Adrian Monino"
                                        ),
                                        " added new comment on your photo"
                                    ]),
                                    m("span",
                                        "Mar 12 10:40pm"
                                    )
                                ])
                            ])
                        ),
                        m("div.dropdown-footer",
                            m("a[href='']",
                                "View all Notifications"
                            )
                        )
                    ])
                ]),
                m('div', [
                    m("a.tx-color-01.tx-semibold[href='/salir'][title='Salir']",
                        m("div.avatar.avatar-sm",
                            m("i[data-feather='log-out']"),
                        )
                    )
                ])
            ])

        ];
    }
};



function loadCustomPage() {

    feather.replace();

    ////////// NAVBAR //////////

    // Initialize PerfectScrollbar of navbar menu for mobile only
    if (window.matchMedia('(max-width: 991px)').matches) {
        const psNavbar = new PerfectScrollbar('#navbarMenu', {
            suppressScrollX: true
        });
    }

    // Showing sub-menu of active menu on navbar when mobile
    function showNavbarActiveSub() {
        if (window.matchMedia('(max-width: 991px)').matches) {
            $('#navbarMenu .active').addClass('show');
        } else {
            $('#navbarMenu .active').removeClass('show');
        }
    }

    showNavbarActiveSub()
    $(window).resize(function() {
        showNavbarActiveSub()
    })

    // Initialize backdrop for overlay purpose
    $('body').append('<div class="backdrop"></div>');


    // Showing sub menu of navbar menu while hiding other siblings
    $('.navbar-menu .with-sub .nav-link').on('click', function(e) {
        e.preventDefault();
        $(this).parent().toggleClass('show');
        $(this).parent().siblings().removeClass('show');

        if (window.matchMedia('(max-width: 991px)').matches) {
            psNavbar.update();
        }
    })

    // Closing dropdown menu of navbar menu
    $(document).on('click touchstart', function(e) {
        e.stopPropagation();

        // closing nav sub menu of header when clicking outside of it
        if (window.matchMedia('(min-width: 992px)').matches) {
            var navTarg = $(e.target).closest('.navbar-menu .nav-item').length;
            if (!navTarg) {
                $('.navbar-header .show').removeClass('show');
            }
        }
    })

    $('#mainMenuClose').on('click', function(e) {
        e.preventDefault();
        $('body').removeClass('navbar-nav-show');
    });

    $('#sidebarMenuOpen').on('click', function(e) {
        e.preventDefault();
        $('body').addClass('sidebar-show');
    })

    // Navbar Search
    $('#navbarSearch').on('click', function(e) {
        e.preventDefault();
        $('.navbar-search').addClass('visible');
        $('.backdrop').addClass('show');
    })

    $('#navbarSearchClose').on('click', function(e) {
        e.preventDefault();
        $('.navbar-search').removeClass('visible');
        $('.backdrop').removeClass('show');
    })



    ////////// SIDEBAR //////////

    // Initialize PerfectScrollbar for sidebar menu
    if ($('#sidebarMenu').length) {
        const psSidebar = new PerfectScrollbar('#sidebarMenu', {
            suppressScrollX: true
        });


        // Showing sub menu in sidebar
        $('.sidebar-nav .with-sub').on('click', function(e) {
            e.preventDefault();
            $(this).parent().toggleClass('show');

            psSidebar.update();
        })
    }


    $('#mainMenuOpen').on('click touchstart', function(e) {
        e.preventDefault();
        $('body').addClass('navbar-nav-show');
    })

    $('#sidebarMenuClose').on('click', function(e) {
        e.preventDefault();
        $('body').removeClass('sidebar-show');
    })

    // hide sidebar when clicking outside of it
    $(document).on('click touchstart', function(e) {
        e.stopPropagation();

        // closing of sidebar menu when clicking outside of it
        if (!$(e.target).closest('.burger-menu').length) {
            var sb = $(e.target).closest('.sidebar').length;
            var nb = $(e.target).closest('.navbar-menu-wrapper').length;
            if (!sb && !nb) {
                if ($('body').hasClass('navbar-nav-show')) {
                    $('body').removeClass('navbar-nav-show');
                } else {
                    $('body').removeClass('sidebar-show');
                }
            }
        }
    });

};



export default SidebarRight;