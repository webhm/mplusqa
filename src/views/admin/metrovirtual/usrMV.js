import m from "mithril";
import App from "../../../models/App";
import HeaderPrivate from "../../layout/headerPrivate";
import SidebarAdmin from "../sidebarAdmin";
import Loader from "../../utils/loader";
import Errors from "../../utils/errors";
import Table from "../../utils/table";
import { Stopwatch } from "../../utils/stopWatch";
import ApiHTTP from "../../../models/ApiHTTP";
import ErrorMetroplus from "../../../models/Error";

// Administración MV

class NotificacionesService {
  constructor(
    canal,
    estado,
    usuario,
    celular,
    correoElectronico,
    historialNotificaciones = []
  ) {
    this.canal = canal;
    this.estado = estado;
    this.usuario = usuario;
    this.celular = celular;
    this.correoElectronico = correoElectronico;
    this.historialNotificaciones = historialNotificaciones;
  }

  // Método estático para guardar la suscripción en el array de suscripciones en local storage
  static guardarEnLocalStorage(suscripcion) {
    const suscripciones = NotificacionesService.obtenerTodasDeLocalStorage();
    const index = suscripciones.findIndex(
      (s) => s.canal === suscripcion.canal && s.usuario === suscripcion.usuario
    );

    if (index !== -1) {
      // Si la suscripción ya existe, actualizamos su estado y el historial de notificaciones
      suscripciones[index].estado = suscripcion.estado;
      suscripciones[index].celular = suscripcion.celular;
      suscripciones[index].correoElectronico = suscripcion.correoElectronico;
      suscripciones[index].historialNotificaciones =
        suscripcion.historialNotificaciones;
    } else {
      // Si no existe, la agregamos
      suscripciones.push(suscripcion);
    }

    localStorage.setItem("Notificaciones", JSON.stringify(suscripciones));
  }

  // Método estático para obtener todas las suscripciones desde local storage
  static obtenerTodasDeLocalStorage() {
    const suscripcionesJSON = localStorage.getItem("Notificaciones");
    return suscripcionesJSON ? JSON.parse(suscripcionesJSON) : [];
  }

  // Método estático para obtener las suscripciones de un usuario específico
  static obtenerPorUsuario(usuario) {
    const suscripciones = NotificacionesService.obtenerTodasDeLocalStorage();
    return suscripciones.filter(
      (suscripcion) => suscripcion.usuario === usuario
    );
  }

  // Método estático para actualizar el estado de una suscripción específica
  static actualizarEstado(canal, usuario, nuevoEstado) {
    const suscripciones = NotificacionesService.obtenerTodasDeLocalStorage();
    const index = suscripciones.findIndex(
      (s) => s.canal === canal && s.usuario === usuario
    );
    if (index !== -1) {
      suscripciones[index].estado = nuevoEstado;
      localStorage.setItem("Notificaciones", JSON.stringify(suscripciones));
    }
  }

  // Método estático para actualizar el usuario de una suscripción específica
  static actualizarUsuario(canal, usuario, nuevoUsuario) {
    const suscripciones = NotificacionesService.obtenerTodasDeLocalStorage();
    const index = suscripciones.findIndex(
      (s) => s.canal === canal && s.usuario === usuario
    );
    if (index !== -1) {
      suscripciones[index].usuario = nuevoUsuario;
      localStorage.setItem("Notificaciones", JSON.stringify(suscripciones));
    }
  }

  // Método estático para eliminar una suscripción específica
  static eliminarSuscripcion(canal, usuario) {
    let suscripciones = NotificacionesService.obtenerTodasDeLocalStorage();
    suscripciones = suscripciones.filter(
      (s) => !(s.canal === canal && s.usuario === usuario)
    );
    localStorage.setItem("Notificaciones", JSON.stringify(suscripciones));
  }

  // Método estático para agregar una notificación al historial de una suscripción específica
  static agregarNotificacion(
    canal,
    usuario,
    mensaje,
    fechaHoraEnvio,
    statusEnvio,
    celular,
    correoElectronico
  ) {
    const suscripciones = NotificacionesService.obtenerTodasDeLocalStorage();
    const index = suscripciones.findIndex(
      (s) => s.canal === canal && s.usuario === usuario
    );
    if (index !== -1) {
      const notificacion = {
        mensaje,
        fechaHoraEnvio,
        statusEnvio,
        celular,
        correoElectronico,
      };
      suscripciones[index].historialNotificaciones.push(notificacion);
      localStorage.setItem("Notificaciones", JSON.stringify(suscripciones));
    }
  }

  // Método estático para obtener el historial de notificaciones de una suscripción específica
  static obtenerHistorial(canal, usuario) {
    const suscripciones = NotificacionesService.obtenerTodasDeLocalStorage();
    const suscripcion = suscripciones.find(
      (s) => s.canal === canal && s.usuario === usuario
    );
    return suscripcion ? suscripcion.historialNotificaciones : [];
  }
}

class Suscripcion {
  constructor(canal, estado, usuario) {
    this.canal = canal;
    this.estado = estado;
    this.usuario = usuario;
  }

  // Método estático para guardar la suscripción en el array de suscripciones en local storage
  static guardarEnLocalStorage(suscripcion) {
    const suscripciones = Suscripcion.obtenerTodasDeLocalStorage();
    const index = suscripciones.findIndex(
      (s) => s.canal === suscripcion.canal && s.usuario === suscripcion.usuario
    );

    if (index !== -1) {
      // Si la suscripción ya existe, actualizamos su estado
      suscripciones[index].estado = suscripcion.estado;
    } else {
      // Si no existe, la agregamos
      suscripciones.push(suscripcion);
    }

    localStorage.setItem("Whatsapp", JSON.stringify(suscripciones));
  }

  // Método estático para obtener todas las suscripciones desde local storage
  static obtenerTodasDeLocalStorage() {
    const suscripcionesJSON = localStorage.getItem("Whatsapp");
    return suscripcionesJSON ? JSON.parse(suscripcionesJSON) : [];
  }

  // Método estático para obtener las suscripciones de un usuario específico
  static obtenerPorUsuario(usuario) {
    const suscripciones = Suscripcion.obtenerTodasDeLocalStorage();
    return suscripciones.filter(
      (suscripcion) => suscripcion.usuario === usuario
    );
  }

  // Método estático para actualizar el estado de una suscripción específica
  static actualizarEstado(canal, usuario, nuevoEstado) {
    const suscripciones = Suscripcion.obtenerTodasDeLocalStorage();
    const index = suscripciones.findIndex(
      (s) => s.canal === canal && s.usuario === usuario
    );
    if (index !== -1) {
      suscripciones[index].estado = nuevoEstado;
      localStorage.setItem("Whatsapp", JSON.stringify(suscripciones));
    }
  }

  // Método estático para actualizar el usuario de una suscripción específica
  static actualizarUsuario(canal, usuario, nuevoUsuario) {
    const suscripciones = Suscripcion.obtenerTodasDeLocalStorage();
    const index = suscripciones.findIndex(
      (s) => s.canal === canal && s.usuario === usuario
    );
    if (index !== -1) {
      suscripciones[index].usuario = nuevoUsuario;
      localStorage.setItem("Whatsapp", JSON.stringify(suscripciones));
    }
  }

  // Método estático para eliminar una suscripción específica
  static eliminarSuscripcion(canal, usuario) {
    let suscripciones = Suscripcion.obtenerTodasDeLocalStorage();
    suscripciones = suscripciones.filter(
      (s) => !(s.canal === canal && s.usuario === usuario)
    );
    localStorage.setItem("Whatsapp", JSON.stringify(suscripciones));
  }
}

class SuscripcionApp {
  constructor(canal, estado, usuario) {
    this.canal = canal;
    this.estado = estado;
    this.usuario = usuario;
  }

  // Método estático para guardar la suscripción en el array de suscripciones en local storage
  static guardarEnLocalStorage(suscripcion) {
    const suscripciones = SuscripcionApp.obtenerTodasDeLocalStorage();
    const index = suscripciones.findIndex(
      (s) => s.canal === suscripcion.canal && s.usuario === suscripcion.usuario
    );

    if (index !== -1) {
      // Si la suscripción ya existe, actualizamos su estado
      suscripciones[index].estado = suscripcion.estado;
    } else {
      // Si no existe, la agregamos
      suscripciones.push(suscripcion);
    }

    localStorage.setItem("App", JSON.stringify(suscripciones));
  }

  // Método estático para obtener todas las suscripciones desde local storage
  static obtenerTodasDeLocalStorage() {
    const suscripcionesJSON = localStorage.getItem("App");
    return suscripcionesJSON ? JSON.parse(suscripcionesJSON) : [];
  }

  // Método estático para obtener las suscripciones de un usuario específico
  static obtenerPorUsuario(usuario) {
    const suscripciones = SuscripcionApp.obtenerTodasDeLocalStorage();
    return suscripciones.filter(
      (suscripcion) => suscripcion.usuario === usuario
    );
  }

  // Método estático para actualizar el estado de una suscripción específica
  static actualizarEstado(canal, usuario, nuevoEstado) {
    const suscripciones = SuscripcionApp.obtenerTodasDeLocalStorage();
    const index = suscripciones.findIndex(
      (s) => s.canal === canal && s.usuario === usuario
    );
    if (index !== -1) {
      suscripciones[index].estado = nuevoEstado;
      localStorage.setItem("App", JSON.stringify(suscripciones));
    }
  }

  // Método estático para actualizar el usuario de una suscripción específica
  static actualizarUsuario(canal, usuario, nuevoUsuario) {
    const suscripciones = SuscripcionApp.obtenerTodasDeLocalStorage();
    const index = suscripciones.findIndex(
      (s) => s.canal === canal && s.usuario === usuario
    );
    if (index !== -1) {
      suscripciones[index].usuario = nuevoUsuario;
      localStorage.setItem("App", JSON.stringify(suscripciones));
    }
  }

  // Método estático para eliminar una suscripción específica
  static eliminarSuscripcion(canal, usuario) {
    let suscripciones = SuscripcionApp.obtenerTodasDeLocalStorage();
    suscripciones = suscripciones.filter(
      (s) => !(s.canal === canal && s.usuario === usuario)
    );
    localStorage.setItem("App", JSON.stringify(suscripciones));
  }
}

class usrMV extends App {
  usuarios = null;
  dataUser = null;
  dataAtenciones = null;
  dataCirugias = null;
  dataResLab = null;
  dataResImg = null;
  dataQsecs = null;
  dataRsecs = null;
  idUsr = null;
  idFiltro = null;
  constructor(_data) {
    super();
    if (
      App.isAuthenticated() &&
      App.hasProfile("PERFIL_ADM_PACIENTES_METROVIRTUAL")
    ) {
      App.setTitle("Pacientes MetroVirtual");
      this.view = this.page;
    }
    localStorage.removeItem("Notificaciones");
  }

  oncreate(_data) {
    // Set variables pra iniciar clase

    // Set params URL
    if (_data.attrs.idFiltro !== undefined) {
      this.idFiltro = _data.attrs.idFiltro;
    }

    if (_data.attrs.idUsr !== undefined) {
      this.idUsr = _data.attrs.idUsr;
    }

    // Carga busqueda de usuarios por filtro en URL
    if (_data.attrs.idFiltro !== undefined && _data.attrs.idUsr == undefined) {
      this.usuarios = null;
      this.loadUsuarios();
    }

    // Carga busqueda de usuarios por filtro por default
    if (_data.attrs.idFiltro == undefined && _data.attrs.idUsr == undefined) {
      this.idFiltro = 1;
      this.usuarios = null;
      this.loadUsuarios();
    }

    // Carga perfil de usario por PARAM URL
    if (_data.attrs.idUsr !== undefined && _data.attrs.idFiltro == undefined) {
      this.dataUser = null;
      this.loadProfile();
    }
  }

  onupdate(_data) {
    // Carga busqueda de usuarios por filtro por default
    if (
      _data.attrs.idFiltro == undefined &&
      _data.attrs.idUsr == undefined &&
      this.idFiltro == null
    ) {
      this.idUsr = null;
      this.idFiltro = 1;
      this.usuarios = null;
      this.loadUsuarios();
    }

    // Set para filtros
    if (
      _data.attrs.idFiltro !== undefined &&
      _data.attrs.idUsr == undefined &&
      this.idFiltro == null
    ) {
      if (_data.attrs.idFiltro !== undefined) {
        this.idFiltro = _data.attrs.idFiltro;
      }

      // Carga busqueda de usuarios por filtro en URL
      if (
        _data.attrs.idFiltro !== undefined &&
        _data.attrs.idUsr == undefined
      ) {
        this.idFiltro = _data.attrs.idFiltro;
        this.usuarios = null;
        this.loadUsuarios();
      }

      // Carga busqueda de usuarios por filtro por default
      if (_data.attrs.idFiltro == undefined && _data.attrs.idUsr == undefined) {
        this.idFiltro = 1;
        this.usuarios = null;
        this.loadUsuarios();
      }
    }

    // Set para idUsr
    if (
      _data.attrs.idUsr !== undefined &&
      _data.attrs.idFiltro == undefined &&
      this.idUsr == null
    ) {
      if (_data.attrs.idUsr !== undefined) {
        this.idUsr = _data.attrs.idUsr;
      }

      // Carga perfil de usario por PARAM URL
      if (
        _data.attrs.idUsr !== undefined &&
        _data.attrs.idFiltro == undefined
      ) {
        this.dataUser = null;
        this.loadProfile();
      }
    }
  }

  reloadData() {
    this.idFiltro = null;
    this.idUsr = null;
  }

  loadUsuarios() {
    this.fetchData()
      .then((_data) => {
        this.usuarios = _data;
      })
      .catch((err) => {
        this.usuarios = { status: false, message: err.message };
        console.error(err);
      });
  }

  loadProfile() {
    this.fetchProfile()
      .then((_data) => {
        this.dataUser = _data;
        this.dataQsecs = null;
        this.dataRsecs = null;
        this.dataAtenciones = null;
        this.dataResLab = null;
        this.dataResImg = null;
        this.loadPreguntasSeguridad();
        this.loadRespuestasSeguridad();
        this.loadAtenciones();
        this.loadResLab();
        this.loadResImg();
        this.loadCirugias();
      })
      .catch((err) => {
        this.dataUser = { status: false, message: err.message };
        console.error(err);
      });
  }

  loadCirugias() {
    this.fetchCirugias()
      .then((_data) => {
        this.dataCirugias = _data;
      })
      .catch((err) => {
        this.dataCirugias = { status: false, message: err.message };
        console.error(err);
      });
  }

  loadResImg() {
    this.fetchResImg()
      .then((_data) => {
        this.dataResImg = _data;
      })
      .catch((err) => {
        this.dataResImg = { status: false, message: err.message };
        console.error(err);
      });
  }

  loadResLab() {
    this.fetchResLab()
      .then((_data) => {
        this.dataResLab = _data;
      })
      .catch((err) => {
        this.dataResLab = { status: false, message: err.message };
        console.error(err);
      });
  }

  loadAtenciones() {
    this.fetchAtenciones()
      .then((_data) => {
        this.dataAtenciones = _data;
      })
      .catch((err) => {
        this.dataAtenciones = { status: false, message: err.message };
        console.error(err);
      });
  }

  loadPreguntasSeguridad() {
    this.fetchPreguntasSeguridad()
      .then((_data) => {
        this.dataQsecs = _data;
      })
      .catch((err) => {
        this.dataQsecs = { status: false, message: err.message };
        console.error(err);
      });
  }

  loadRespuestasSeguridad() {
    this.fetchRespuestasSeguridad()
      .then((_data) => {
        this.dataRsecs = _data;
        console.log(_data);
      })
      .catch((err) => {
        this.dataRsecs = { status: false, message: err.message };
        console.error(err);
      });
  }

  loadRecoveryAccount() {
    this.fetchRecoveryAccount()
      .then((_data) => {
        if (_data.status) {
          $.alert("Proceso realizado con éxito.");
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }

  vHeader() {
    return m(HeaderPrivate, { userName: App.userName });
  }
  vMain() {
    return [
      m(
        "div.content.content-components",
        m(
          "div.container.mg-l-0.mg-r-0",
          {
            style: { "max-width": "100%" },
          },
          [
            m("ol.breadcrumb.df-breadcrumbs", [
              m(
                "li.breadcrumb-item",
                m(m.route.Link, { href: "/" }, ["MetroPlus"])
              ),
              m(
                "li.breadcrumb-item",
                m(m.route.Link, { href: "/administracion" }, ["Administración"])
              ),
              m("li.breadcrumb-item.active[aria-current='page']", App.title),
            ]),
            m("h1.df-title.mg-t-20.mg-b-20", App.title + ":"),

            m("div", [
              this.usuarios !== null && this.usuarios.status == true
                ? [
                    m("div.table-content.col-12.pd-r-0.pd-l-0", [
                      m(
                        "div.d-flex.align-items-center.justify-content-between.mg-t-10",
                        [
                          m(
                            "h5.mg-b-0",
                            "Todos los Usuarios:",
                            m(
                              "span.badge.bg-litecoin.tx-white.tx-semibold.pd-l-10.pd-r-10.mg-l-5.tx-15",
                              {
                                oncreate: (el) => {
                                  if (this.idFiltro == 1) {
                                    el.dom.innerHTML = "Pacientes de Hoy";
                                  }
                                  if (this.idFiltro == 2) {
                                    el.dom.innerHTML = "Pacientes Anteriores";
                                  }
                                },
                                onupdate: (el) => {
                                  if (this.idFiltro == 1) {
                                    el.dom.innerHTML = "Pacientes de Hoy";
                                  }
                                  if (this.idFiltro == 2) {
                                    el.dom.innerHTML = "Pacientes Anteriores";
                                  }
                                },
                              }
                            )
                          ),
                          m("div.d-flex.tx-14", [
                            m("div.dropdown.dropleft", [
                              m(
                                "div.link-03.lh-0.mg-l-5[id='dropdownMenuButton'][data-toggle='dropdown'][aria-haspopup='true'][aria-expanded='false']",
                                {
                                  style: { cursor: "pointer" },
                                  title: "Filtrar",
                                },
                                m("i.fas.fa-filter.tx-18.pd-5")
                              ),
                              m(
                                ".dropdown-menu.tx-13[aria-labelledby='dropdownMenuButton']",
                                [
                                  m(
                                    "h6.dropdown-header.tx-uppercase.tx-12.tx-bold.tx-inverse",
                                    "FILTROS:"
                                  ),
                                  m(
                                    m.route.Link,
                                    {
                                      class: "dropdown-item",
                                      href: "/administracion/pacientes/metrovirtual/?idFiltro=1",
                                      onclick: (e) => {
                                        this.reloadData();
                                      },
                                    },
                                    ["Pacientes de Hoy"]
                                  ),
                                  m(
                                    m.route.Link,
                                    {
                                      class: "dropdown-item",
                                      href: "/administracion/pacientes/metrovirtual/?idFiltro=2",
                                      onclick: (e) => {
                                        this.reloadData();
                                      },
                                    },
                                    ["Pacientes Anteriores"]
                                  ),
                                ]
                              ),
                            ]),
                          ]),
                        ]
                      ),
                    ]),
                    this.vTableUsuarios(
                      "table-usr",
                      this.usuarios.data,
                      this.arqTable()
                    ),
                    m(
                      m.route.Link,
                      {
                        class: "dropdown-item",
                        href: "/administracion/pacientes/metrovirtual/?idUsr=1501128480",
                        onclick: (e) => {
                          this.reloadData();
                        },
                      },
                      ["CHANG CHAVEZ MARTIN FRANCISCO"]
                    ),
                  ]
                : this.usuarios !== null &&
                  (this.usuarios.status == false ||
                    this.usuarios.status == null)
                ? [
                    m(Errors, {
                      type: this.usuarios.status == false ? 1 : 0,
                      error: this.usuarios.message,
                    }),
                  ]
                : [m(Loader)],
            ]),
          ]
        )
      ),
      m(
        "div.section-nav",
        {
          class: this.usuarios !== null ? "" : "d-none",
        },
        [
          m(
            "div.bg-white",
            {},

            m(
              "div.mg-t-10.bg-white",
              m("div.card-header.pd-t-20.pd-b-0.bd-b-0", [
                m("h6.lh-5.mg-b-5", "N° de Resultados:"),
              ]),
              m("div.card-body.pd-0", [
                m("div.pd-t-10.pd-b-0.pd-x-20.d-flex.align-items-baseline", [
                  m(
                    "h2.tx-normal.tx-rubik.mg-b-0.mg-r-5",
                    this.usuarios !== null && this.usuarios.status == true
                      ? this.usuarios.data.length
                      : 0
                  ),
                  m("div.tx-14", [m("divv.lh-0.tx-gray-300", "Resultado(s)")]),
                ]),
              ])
            ),
            m("div.pd-20", [m(Stopwatch)])
          ),
        ]
      ),
    ];
  }
  vMainProfile() {
    return [
      m(
        "div.content.content-components",
        {
          style: { "margin-right": "0px" },
        },
        m(
          "div.container.mg-l-0.mg-r-0",
          {
            style: { "max-width": "100%" },
          },
          [
            m("ol.breadcrumb.df-breadcrumbs", [
              m(
                "li.breadcrumb-item",
                m(m.route.Link, { href: "/" }, ["MetroPlus"])
              ),
              m(
                "li.breadcrumb-item",
                m(m.route.Link, { href: "/administracion" }, ["Administración"])
              ),
              m("li.breadcrumb-item.active[aria-current='page']", App.title),
            ]),
            m("h1.df-title.mg-t-20.mg-b-10", App.title + ":"),
            this.dataUser !== null && this.dataUser.status == true
              ? [
                  m("div.table-responsive", {}, [
                    m("table.table.table-bordered.table-sm.tx-14", [
                      m(
                        "thead",

                        m("tr.bg-litecoin.op-9.tx-white.tx-uppercase", [
                          m(
                            "th[scope='col'][colspan='10']",
                            "DATOS DEL USUARIO: "
                          ),
                        ])
                      ),
                      m("tbody", [
                        m("tr", [
                          m(
                            "th",
                            {
                              style: { "background-color": "#a8bed6" },
                            },
                            "Nombres Completos:"
                          ),
                          m(
                            "td[colspan='4']",
                            {
                              style: { "background-color": "#eaeff5" },
                            },
                            this.dataUser.data.APELLIDOS +
                              " " +
                              this.dataUser.data.NOMBRES
                          ),
                          m(
                            "th",
                            {
                              style: { "background-color": "#a8bed6" },
                            },
                            "NHC:"
                          ),
                          m(
                            "td[colspan='4']",
                            {
                              style: { "background-color": "#eaeff5" },
                            },
                            this.dataUser.data.NHC
                          ),
                        ]),
                        m("tr", [
                          m(
                            "th",
                            {
                              style: { "background-color": "#a8bed6" },
                            },
                            "Direcciones:"
                          ),
                          m(
                            "td[colspan='8']",
                            {
                              style: { "background-color": "#eaeff5" },
                            },
                            this.dataUser.data.DIRECCIONES.map((v, i) => {
                              return m("p.mg-0.pd-0", v.FIELD);
                            })
                          ),
                        ]),

                        m("tr", [
                          m(
                            "th",
                            {
                              style: { "background-color": "#a8bed6" },
                            },
                            "Correo electrónico:"
                          ),
                          m(
                            "td[colspan='4']",
                            {
                              style: { "background-color": "#eaeff5" },
                            },
                            this.dataUser.data.EMAIL_ACCOUNT.map((v, i) => {
                              return m("p.mg-0.pd-0", v);
                            })
                          ),
                          m(
                            "th",
                            {
                              style: { "background-color": "#a8bed6" },
                            },
                            "Celulares:"
                          ),
                          m(
                            "td[colspan='4']",
                            {
                              style: { "background-color": "#eaeff5" },
                            },
                            this.dataUser.data.CELULARES.map((v, i) => {
                              return m("p.mg-0.pd-0", v.FIELD);
                            })
                          ),
                        ]),
                      ]),

                      m("tbody", [
                        m("tr.d-print-none.bg-litecoin.op-9.tx-white.", [
                          m(
                            "th[scope='col'][colspan='10']",
                            "OPCIONES DISPONIBLES:"
                          ),
                        ]),
                        m("tr.d-print-none", [
                          m(
                            "td[colspan='10']",
                            {
                              style: { "background-color": "#eaeff5" },
                            },
                            m(
                              "ul.nav.nav-tabs[id='myTab'][role='tablist']",
                              {},
                              [
                                m(
                                  "li.nav-item",
                                  m(
                                    "a.nav-link.tx-semibold[id='home-tab'][data-toggle='tab'][href='#home'][role='tab'][aria-controls='home'][aria-selected='true']",
                                    {
                                      style: { color: "#476ba3" },
                                    },

                                    "REESTABLECER CUENTA"
                                  )
                                ),
                                m(
                                  "li.nav-item.d-none",
                                  m(
                                    "a.nav-link.tx-semibold[id='home-canales'][data-toggle='tab'][href='#canales'][role='tab'][aria-controls='canales']",
                                    {
                                      style: { color: "#476ba3" },
                                    },

                                    " CANALES "
                                  )
                                ),
                                m(
                                  "li.nav-item",
                                  m(
                                    "a.nav-link.tx-semibold[id='home-nots'][data-toggle='tab'][href='#nots'][role='tab'][aria-controls='nots']",
                                    {
                                      style: { color: "#476ba3" },
                                    },

                                    "RUTA DEL PACIENTE "
                                  )
                                ),
                              ]
                            )
                          ),
                        ]),
                        m("tr.d-print-none", [
                          m(
                            "td[colspan='10']",
                            m(
                              ".tab-content.bd.bd-gray-300.bd-t-0[id='myTab']",
                              [
                                m(
                                  ".tab-pane.fade[id='home'][role='tabpanel'][aria-labelledby='home-tab']",
                                  [
                                    m("p.mg-0", [
                                      m(
                                        "div.pd-10.tx-semibold",
                                        {
                                          style: {
                                            "background-color": "#a8bed6",
                                          },
                                        },
                                        "Preguntas de Seguridad:"
                                      ),
                                      m(
                                        "div.pd-5",
                                        {
                                          style: {
                                            "background-color": "#eaeff5",
                                          },
                                        },
                                        this.dataQsecs !== null &&
                                          this.dataQsecs.status == true
                                          ? [
                                              m(
                                                "p.pd-0.mg-0.tx-12.tx-uppercase",
                                                {
                                                  class:
                                                    this.dataRsecs.data.Q1 !=
                                                    undefined
                                                      ? ""
                                                      : "d-none",
                                                },
                                                this.dataQsecs.data.Q1
                                              ),
                                              m(
                                                "p.pd-0.mg-l-5.mg-t-0.tx-danger",
                                                this.dataRsecs.data.Q1 !=
                                                  undefined
                                                  ? this.dataRsecs.data.Q1
                                                  : ""
                                              ),
                                              m(
                                                "p.pd-0.mg-0.tx-12.tx-uppercase",
                                                {
                                                  class:
                                                    this.dataRsecs.data.Q2 !=
                                                    undefined
                                                      ? ""
                                                      : "d-none",
                                                },
                                                this.dataQsecs.data.Q2
                                              ),
                                              m(
                                                "p.pd-0.mg-l-5.mg-t-0.tx-danger",
                                                this.dataRsecs.data.Q2 !=
                                                  undefined
                                                  ? this.dataRsecs.data.Q2
                                                  : ""
                                              ),
                                              m(
                                                "p.pd-0.mg-0.tx-12.tx-uppercase",
                                                {
                                                  class:
                                                    this.dataRsecs.data.Q3 !=
                                                    undefined
                                                      ? ""
                                                      : "d-none",
                                                },
                                                this.dataQsecs.data.Q3
                                              ),
                                              m(
                                                "p.pd-0.mg-l-5.mg-t-0.tx-danger",
                                                this.dataRsecs.data.Q3 !=
                                                  undefined
                                                  ? this.dataRsecs.data.Q3
                                                  : ""
                                              ),
                                              m(
                                                "p.pd-0.mg-0.tx-12.tx-uppercase",
                                                {
                                                  class:
                                                    this.dataRsecs.data.Q4 !=
                                                    undefined
                                                      ? ""
                                                      : "d-none",
                                                },
                                                this.dataQsecs.data.Q4
                                              ),
                                              m(
                                                "p.pd-0.mg-l-5.mg-t-0.tx-danger",
                                                this.dataRsecs.data.Q4 !=
                                                  undefined
                                                  ? this.dataRsecs.data.Q4
                                                  : ""
                                              ),
                                              m(
                                                "p.pd-0.mg-0.tx-12.tx-uppercase",
                                                {
                                                  class:
                                                    this.dataRsecs.data.Q5 !=
                                                    undefined
                                                      ? ""
                                                      : "d-none",
                                                },
                                                this.dataQsecs.data.Q5
                                              ),
                                              m(
                                                "p.pd-0.mg-l-5.mg-t-0.tx-danger",
                                                this.dataRsecs.data.Q5 !=
                                                  undefined
                                                  ? this.dataRsecs.data.Q5
                                                  : ""
                                              ),
                                            ]
                                          : this.dataRsecs !== null &&
                                            this.dataRsecs.status == false
                                          ? [
                                              m("p.pd-5", [
                                                m(
                                                  "p.tx-danger.pd-0.mg-b-2.mg-t-5",
                                                  [
                                                    m(
                                                      "i.fas.fa-exclamation-triangle"
                                                    ),
                                                    " Error: ",
                                                  ]
                                                ),
                                                m(
                                                  "p.tx-justify.tx-danger.tx-color-03",
                                                  this.dataRsecs.message
                                                ),
                                              ]),
                                            ]
                                          : [m(Loader)]
                                      ),
                                    ]),
                                    m("p.mg-0", [
                                      m(
                                        "div.pd-10.tx-semibold",
                                        {
                                          style: {
                                            "background-color": "#a8bed6",
                                          },
                                        },
                                        "Historial de Atenciones:"
                                      ),
                                      m(
                                        "div.pd-10",
                                        {
                                          style: {
                                            "background-color": "#eaeff5",
                                          },
                                        },
                                        this.dataAtenciones !== null &&
                                          this.dataAtenciones.status == true
                                          ? [
                                              this.dataAtenciones.data.map(
                                                (v, i) => {
                                                  if (i <= 3) {
                                                    return m(
                                                      "p.mg-0.pd-0.tx-12",
                                                      [
                                                        m(
                                                          "b",
                                                          "FECHA ADMISIÓN: "
                                                        ),
                                                        v.FECHA_ADMISION,
                                                        m(
                                                          "b",
                                                          " ESPECIALIDAD: "
                                                        ),
                                                        v.ESPECIALIDAD,
                                                        m("b", " MÉDICO: "),
                                                        v.MEDICO_TRATANTE,
                                                      ]
                                                    );
                                                  }
                                                }
                                              ),
                                            ]
                                          : this.dataAtenciones !== null &&
                                            this.dataAtenciones.status == false
                                          ? [
                                              m("p.pd-5", [
                                                m(
                                                  "p.tx-danger.pd-0.mg-b-2.mg-t-5",
                                                  [
                                                    m(
                                                      "i.fas.fa-exclamation-triangle"
                                                    ),
                                                    " Error: ",
                                                  ]
                                                ),
                                                m(
                                                  "p.tx-justify.tx-danger.tx-color-03",
                                                  this.dataAtenciones.message
                                                ),
                                              ]),
                                            ]
                                          : [m(Loader)]
                                      ),
                                    ]),
                                    m("p.mg-0", [
                                      m(
                                        "div.pd-10.tx-semibold",
                                        {
                                          style: {
                                            "background-color": "#a8bed6",
                                          },
                                        },
                                        "Resultados de Laboratorio:"
                                      ),
                                      m(
                                        "div.pd-10",
                                        {
                                          style: {
                                            "background-color": "#eaeff5",
                                          },
                                        },
                                        this.dataResLab !== null &&
                                          this.dataResLab.status == true
                                          ? [
                                              this.dataResLab.data.map(
                                                (v, i) => {
                                                  if (i <= 3) {
                                                    return m(
                                                      "p.mg-0.pd-0.tx-12",
                                                      [
                                                        m("b", "FECHA : "),
                                                        v.FECHA,
                                                        m("b", " ORIGEN: "),
                                                        v.ORIGEN,
                                                      ]
                                                    );
                                                  }
                                                }
                                              ),
                                            ]
                                          : this.dataResLab !== null &&
                                            this.dataResLab.status == false
                                          ? [
                                              m("p.pd-5", [
                                                m(
                                                  "p.tx-danger.pd-0.mg-b-2.mg-t-5",
                                                  [
                                                    m(
                                                      "i.fas.fa-exclamation-triangle"
                                                    ),
                                                    " Error: ",
                                                  ]
                                                ),
                                                m(
                                                  "p.tx-justify.tx-danger.tx-color-03",
                                                  this.dataResLab.message
                                                ),
                                              ]),
                                            ]
                                          : [m(Loader)]
                                      ),
                                    ]),
                                    m("p.mg-0", [
                                      m(
                                        "div.pd-10.tx-semibold",
                                        {
                                          style: {
                                            "background-color": "#a8bed6",
                                          },
                                        },
                                        "Resultados de Imagen:"
                                      ),
                                      m(
                                        "div.pd-10",
                                        {
                                          style: {
                                            "background-color": "#eaeff5",
                                          },
                                        },
                                        this.dataResImg !== null &&
                                          this.dataResImg.status == true
                                          ? [
                                              this.dataResImg.data.map(
                                                (v, i) => {
                                                  if (i <= 4) {
                                                    return m(
                                                      "p.mg-0.pd-0.tx-12",
                                                      [
                                                        m("b", "FECHA : "),
                                                        v.FECHA,
                                                        m("b", " ORIGEN: "),
                                                        v.ORIGEN,
                                                      ]
                                                    );
                                                  }
                                                }
                                              ),
                                            ]
                                          : this.dataResImg !== null &&
                                            this.dataResImg.status == false
                                          ? [
                                              m("p.pd-5", [
                                                m(
                                                  "p.tx-danger.pd-0.mg-b-2.mg-t-5",
                                                  [
                                                    m(
                                                      "i.fas.fa-exclamation-triangle"
                                                    ),
                                                    " Error: ",
                                                  ]
                                                ),
                                                m(
                                                  "p.tx-justify.tx-danger.tx-color-03",
                                                  this.dataResImg.message
                                                ),
                                              ]),
                                            ]
                                          : [m(Loader)]
                                      ),
                                    ]),
                                    m("p.mg-0", [
                                      m(
                                        "div.pd-10.tx-semibold",
                                        {
                                          style: {
                                            "background-color": "#a8bed6",
                                          },
                                        },
                                        "Reestablecer Cuenta: *El usuario deberá volver a registrarse despues de esta acción."
                                      ),
                                      m(
                                        "div.pd-10",
                                        {
                                          style: {
                                            "background-color": "#eaeff5",
                                          },
                                        },

                                        m("p.wd-100p", [
                                          m(
                                            "button.btn.btn-xs.btn-block.btn-primary.tx-semibold.tx-white",
                                            {
                                              onclick: () => {
                                                this.loadRecoveryAccount();
                                              },
                                            },

                                            " Restablecer "
                                          ),
                                        ])
                                      ),
                                    ]),
                                  ]
                                ),
                                m(
                                  ".tab-pane.fade[id='canales'][role='tabpanel'][aria-labelledby='home-canales']",
                                  [
                                    m("p.mg-0", [
                                      m(
                                        "div.pd-10.tx-semibold",
                                        {
                                          style: {
                                            "background-color": "#a8bed6",
                                          },
                                        },
                                        "Canales Registrados:"
                                      ),
                                      m(
                                        "div.pd-10",
                                        {
                                          style: {
                                            "background-color": "#eaeff5",
                                          },
                                        },
                                        m(
                                          "div.form-group",
                                          m(
                                            "label.tx-semibold.tx-uppercase.tx-sans.tx-11.tx-medium.tx-spacing-1",
                                            "Canal Whatsapp:"
                                          ),
                                          m("div.input-group", [
                                            m(
                                              "div.custom-control.custom-radio",
                                              [
                                                m(
                                                  "input.custom-control-input[type='radio'][id='wSI'][name='ctrlWhatsapp']",
                                                  {
                                                    onclick: (e) => {
                                                      const miSuscripcion =
                                                        new Suscripcion(
                                                          "Whatsapp",
                                                          true,
                                                          this.idUsr
                                                        );
                                                      Suscripcion.guardarEnLocalStorage(
                                                        miSuscripcion
                                                      );
                                                    },
                                                    //  checked: (Suscripcion.obtenerPorUsuario(this.idUsr) !== null && Suscripcion.obtenerPorUsuario(this.idUsr)[0].estado == true ? true : false)
                                                  }
                                                ),
                                                m(
                                                  "label.custom-control-label[for='wSI']",
                                                  "Si"
                                                ),
                                              ]
                                            ),
                                            m(
                                              "div.custom-control.custom-radio.mg-l-20",
                                              [
                                                m(
                                                  "input.custom-control-input[type='radio'][id='wNO'][name='ctrlWhatsapp']",
                                                  {
                                                    onclick: (e) => {
                                                      Suscripcion.actualizarEstado(
                                                        "Whatsapp",
                                                        this.idUsr,
                                                        false
                                                      );
                                                    },
                                                    // checked: (Suscripcion.obtenerPorUsuario(this.idUsr) !== null && Suscripcion.obtenerPorUsuario(this.idUsr)[0].estado == false ? true : false)
                                                  }
                                                ),
                                                m(
                                                  "label.custom-control-label[for='wNO']",
                                                  "No"
                                                ),
                                              ]
                                            ),
                                          ])
                                        ),
                                        m(
                                          "div.form-group",
                                          m(
                                            "label.tx-semibold.tx-uppercase.tx-sans.tx-11.tx-medium.tx-spacing-1",
                                            "Canal App:"
                                          ),
                                          m("div.input-group", [
                                            m(
                                              "div.custom-control.custom-radio",
                                              [
                                                m(
                                                  "input.custom-control-input[type='radio'][id='aSI'][name='ctrlApp']",
                                                  {
                                                    onclick: (e) => {
                                                      const miSuscripcion =
                                                        new SuscripcionApp(
                                                          "App",
                                                          true,
                                                          this.idUsr
                                                        );
                                                      SuscripcionApp.guardarEnLocalStorage(
                                                        miSuscripcion
                                                      );
                                                    },
                                                    // checked: (SuscripcionApp.obtenerPorUsuario(this.idUsr) !== null && SuscripcionApp.obtenerPorUsuario(this.idUsr)[0].estado == true ? true : false)
                                                  }
                                                ),
                                                m(
                                                  "label.custom-control-label[for='aSI']",
                                                  "Si"
                                                ),
                                              ]
                                            ),
                                            m(
                                              "div.custom-control.custom-radio.mg-l-20",
                                              [
                                                m(
                                                  "input.custom-control-input[type='radio'][id='aNO'][name='ctrlApp']",
                                                  {
                                                    onclick: (e) => {
                                                      SuscripcionApp.actualizarEstado(
                                                        "App",
                                                        this.idUsr,
                                                        false
                                                      );
                                                    },
                                                    //  checked: (SuscripcionApp.obtenerPorUsuario(this.idUsr) !== null && SuscripcionApp.obtenerPorUsuario(this.idUsr)[0].estado == false ? true : false)
                                                  }
                                                ),
                                                m(
                                                  "label.custom-control-label[for='aNO']",
                                                  "No"
                                                ),
                                              ]
                                            ),
                                          ])
                                        )
                                      ),
                                    ]),
                                    m("p.mg-0", [
                                      m(
                                        "div.pd-10",
                                        {
                                          style: {
                                            "background-color": "#eaeff5",
                                          },
                                        },

                                        m("p.wd-100p", [
                                          m(
                                            "button.btn.btn-xs.btn-block.btn-primary.tx-semibold.tx-white",
                                            {
                                              onclick: () => {
                                                setTimeout(() => {
                                                  $.alert(
                                                    "Proceso realizado con éxito."
                                                  );
                                                }, 1000);
                                              },
                                            },

                                            " Guardar Cambios "
                                          ),
                                        ])
                                      ),
                                    ]),
                                  ]
                                ),

                                m(
                                  ".tab-pane.fade[id='nots'][role='tabpanel'][aria-labelledby='home-nots']",
                                  [
                                    m("p.mg-0", [
                                      m(
                                        "div.pd-10.tx-semibold",
                                        {
                                          style: {
                                            "background-color": "#a8bed6",
                                          },
                                        },
                                        "Aviso de Cirugía:"
                                      ),
                                      m(
                                        "div.pd-10",
                                        {
                                          style: {
                                            "background-color": "#eaeff5",
                                          },
                                        },
                                        this.dataCirugias !== null &&
                                          this.dataCirugias.status == true
                                          ? [
                                              this.dataCirugias.data.map(
                                                (v, i) => {
                                                  if (i <= 0) {
                                                    return [
                                                      m(
                                                        "p.mg-0.pd-0.mg-b-0.tx-12.tx-uppercase",
                                                        [
                                                          m(
                                                            "b",
                                                            "Cirugía programada para: "
                                                          ),
                                                          v.FECHA,
                                                          m("b", " a las: "),
                                                          v.HORAs,
                                                          m("b", " Dr/a: "),
                                                          v.CIRUJANO,
                                                        ]
                                                      ),
                                                      m(
                                                        "p.mg-0.pd-0.mg-b-10.tx-12",
                                                        "Activar Notificaciones para recibir detalles de la cirugía programada"
                                                      ),
                                                      m(
                                                        "p.mg-0.pd-0.mg-b-10.tx-12",
                                                        [
                                                          m(
                                                            "div.form-group.row",
                                                            [
                                                              m(
                                                                "label.col-sm-2.col-form-label[for='tipoNotificacion']",
                                                                "Tipo de notificación:"
                                                              ),
                                                              m(
                                                                "div.col-sm-10",
                                                                m('select.tx-semibold', {
                                                                    id: 'sec_TipoNotificacion',
                                                                    class: "custom-select"
                                                                }, [{
                                                                        id: "email",
                                                                        label: "Correo electrónico"
                                                                    },
                                                                    {
                                                                        id: "whatsapp",
                                                                        label: "Whatsapp"
                                                                    }
                                                                ].map(x =>
                                                                    m('option[id="' + x.id + '"]', x.label)
                                                                ))
                                                              ),
                                                              
                                                            ]
                                                          ),
                                                        ]
                                                      ),
                                                      
                                                      m(
                                                        "p.mg-0.pd-0.mg-b-10.tx-12",
                                                        [
                                                          m(
                                                            "div.form-group.row",
                                                            [
                                                              m(
                                                                "label.col-sm-2.col-form-label[for='tipoNotificacion']",
                                                                "Correo electrónico: "
                                                              ),
                                                              m(
                                                                "div.col-sm-10",
                                                                m(
                                                                  "input.form-control[type='email'][id='tipoNotificacion'][placeholder='Correo electrónico']"
                                                                ),
                                                                
                                                              ),
                                                              
                                                            ]
                                                          ),
                                                        ]
                                                      ),
                                                      m(
                                                        "p.mg-0.pd-0.mg-b-10.tx-12",
                                                        [
                                                            m(
                                                                "button.btn.btn-xs.btn-block.btn-primary.tx-semibold.tx-white",
                                                                {
                                                                  onclick: () => {
                                                                    this.loadRecoveryAccount();
                                                                  },
                                                                },
                    
                                                                " Suscribir "
                                                              ),
                                                        ]
                                                      ),
                                                    ];
                                                  }
                                                }
                                              ),
                                            ]
                                          : this.dataCirugias !== null &&
                                            this.dataCirugias.status == false
                                          ? [
                                              m("p.pd-5", [
                                                m(
                                                  "p.tx-danger.pd-0.mg-b-2.mg-t-5",
                                                  [
                                                    m(
                                                      "i.fas.fa-exclamation-triangle"
                                                    ),
                                                    " Error: ",
                                                  ]
                                                ),
                                                m(
                                                  "p.tx-justify.tx-danger.tx-color-03",
                                                  this.dataCirugias.message
                                                ),
                                              ]),
                                            ]
                                          : [m(Loader)]
                                      ),
                                    ]),
                                  ]
                                ),
                              ]
                            )
                          ),
                        ]),
                      ]),
                    ]),
                  ]),
                ]
              : this.dataUser !== null &&
                (this.dataUser.status == false || this.dataUser.status == null)
              ? [
                  m(Errors, {
                    type: this.dataUser.status == false ? 1 : 0,
                    error: this.dataUser.message,
                  }),
                ]
              : [m(Loader)],
          ]
        )
      ),
    ];
  }
  vMenu() {
    return m(SidebarAdmin, { page: "administracion/pacientes/metrovirtual" });
  }

  fetchCirugias() {
    let _queryString = "?NHC=71248701";

    try {
      return m
        .request({
          method: "GET",
          url: ApiHTTP.apiSoaUrl + "/v1/mval/cirugias-paciente" + _queryString,
          headers: {
            "Content-Type": "application/json; charset=utf-8",
            apikey: ApiHTTP.SOAKey,
          },
          extract: function (xhr) {
            return {
              status: xhr.status,
              body: JSON.parse(xhr.responseText),
            };
          },
        })
        .then((response) => {
          if (response.status !== 200) {
            throw new ErrorMetroplus("Error HTTP", {
              cause:
                "La respuesta del servidor no es correcta. Status Response:" +
                response.status,
            });
          }
          return response.body;
        });
    } catch (error) {
      throw new ErrorMetroplus("Error APP", { cause: error.message });
    }
  }

  fetchRecoveryAccount() {
    let _queryString = "?DNI=" + this.idUsr;

    try {
      return m
        .request({
          method: "POST",
          url:
            "https://api.hospitalmetropolitano.org/t/v1/delacmv" + _queryString,
          headers: {
            "Content-Type": "application/json; charset=utf-8",
          },
          extract: function (xhr) {
            return {
              status: xhr.status,
              body: JSON.parse(xhr.responseText),
            };
          },
        })
        .then((response) => {
          if (response.status !== 200) {
            throw new ErrorMetroplus("Error HTTP", {
              cause:
                "La respuesta del servidor no es correcta. Status Response:" +
                response.status,
            });
          }
          return response.body;
        });
    } catch (error) {
      throw new ErrorMetroplus("Error APP", { cause: error.message });
    }
  }

  fetchResImg() {
    let _queryString = "?DNI=" + this.idUsr;

    try {
      return m
        .request({
          method: "GET",
          url: ApiHTTP.apiSoaUrl + "/v1/mval/resimg-paciente" + _queryString,
          headers: {
            "Content-Type": "application/json; charset=utf-8",
            apikey: ApiHTTP.SOAKey,
          },
          extract: function (xhr) {
            return {
              status: xhr.status,
              body: JSON.parse(xhr.responseText),
            };
          },
        })
        .then((response) => {
          if (response.status !== 200) {
            throw new ErrorMetroplus("Error HTTP", {
              cause:
                "La respuesta del servidor no es correcta. Status Response:" +
                response.status,
            });
          }
          return response.body;
        });
    } catch (error) {
      throw new ErrorMetroplus("Error APP", { cause: error.message });
    }
  }

  fetchResLab() {
    let _queryString = "?DNI=" + this.idUsr;

    try {
      return m
        .request({
          method: "GET",
          url: ApiHTTP.apiSoaUrl + "/v1/mval/reslab-paciente" + _queryString,
          headers: {
            "Content-Type": "application/json; charset=utf-8",
            apikey: ApiHTTP.SOAKey,
          },
          extract: function (xhr) {
            return {
              status: xhr.status,
              body: JSON.parse(xhr.responseText),
            };
          },
        })
        .then((response) => {
          if (response.status !== 200) {
            throw new ErrorMetroplus("Error HTTP", {
              cause:
                "La respuesta del servidor no es correcta. Status Response:" +
                response.status,
            });
          }
          return response.body;
        });
    } catch (error) {
      throw new ErrorMetroplus("Error APP", { cause: error.message });
    }
  }

  fetchAtenciones() {
    let _queryString = "?DNI=" + this.idUsr;

    try {
      return m
        .request({
          method: "GET",
          url:
            ApiHTTP.apiSoaUrl + "/v1/mval/atenciones-paciente" + _queryString,
          headers: {
            "Content-Type": "application/json; charset=utf-8",
            apikey: ApiHTTP.SOAKey,
          },
          extract: function (xhr) {
            return {
              status: xhr.status,
              body: JSON.parse(xhr.responseText),
            };
          },
        })
        .then((response) => {
          if (response.status !== 200) {
            throw new ErrorMetroplus("Error HTTP", {
              cause:
                "La respuesta del servidor no es correcta. Status Response:" +
                response.status,
            });
          }
          return response.body;
        });
    } catch (error) {
      throw new ErrorMetroplus("Error APP", { cause: error.message });
    }
  }

  fetchPreguntasSeguridad() {
    let _queryString = "?DNI=" + this.idUsr;

    try {
      return m
        .request({
          method: "GET",
          url: ApiHTTP.apiSoaUrl + "/v1/mval/qsecs" + _queryString,
          headers: {
            "Content-Type": "application/json; charset=utf-8",
            apikey: ApiHTTP.SOAKey,
          },
          extract: function (xhr) {
            return {
              status: xhr.status,
              body: JSON.parse(xhr.responseText),
            };
          },
        })
        .then((response) => {
          if (response.status !== 200) {
            throw new ErrorMetroplus("Error HTTP", {
              cause:
                "La respuesta del servidor no es correcta. Status Response:" +
                response.status,
            });
          }
          return response.body;
        });
    } catch (error) {
      throw new ErrorMetroplus("Error APP", { cause: error.message });
    }
  }

  fetchRespuestasSeguridad() {
    let _queryString = "?DNI=" + this.idUsr;

    try {
      return m
        .request({
          method: "GET",
          url:
            "https://apisoa.hospitalmetropolitano.org/v1/mval/rsecs" +
            _queryString,
          headers: {
            "Content-Type": "application/json; charset=utf-8",
            apikey: ApiHTTP.SOAKey,
          },
          extract: function (xhr) {
            return {
              status: xhr.status,
              body: JSON.parse(xhr.responseText),
            };
          },
        })
        .then((response) => {
          if (response.status !== 200) {
            throw new ErrorMetroplus("Error HTTP", {
              cause:
                "La respuesta del servidor no es correcta. Status Response:" +
                response.status,
            });
          }
          return response.body;
        });
    } catch (error) {
      throw new ErrorMetroplus("Error APP", { cause: error.message });
    }
  }

  fetchProfile() {
    try {
      return m
        .request({
          method: "POST",
          url: "https://api.hospitalmetropolitano.org/v1/account-cvox",
          headers: {
            "Content-Type": "application/json; charset=utf-8",
          },
          body: {
            DNI: this.idUsr,
          },
          extract: function (xhr) {
            return { status: xhr.status, body: JSON.parse(xhr.responseText) };
          },
        })
        .then((response) => {
          if (response.status !== 200) {
            throw new ErrorMetroplus("Error HTTP", {
              cause:
                "La respuesta del servidor no es correcta. Status Response:" +
                response.status,
            });
          }
          return response.body;
        });
    } catch (error) {
      throw new ErrorMetroplus("Error APP", { cause: error.message });
    }
  }

  fetchData() {
    let _queryString = "?idFiltro=" + this.idFiltro;

    try {
      return m
        .request({
          method: "GET",
          url: ApiHTTP.apiSoaUrl + "/v1/sso" + _queryString,
          headers: {
            "Content-Type": "application/json; charset=utf-8",
            apikey: ApiHTTP.SOAKey,
          },
          extract: function (xhr) {
            return {
              status: xhr.status,
              body: JSON.parse(xhr.responseText),
            };
          },
        })
        .then(function (response) {
          if (response.status !== 200) {
            throw new ErrorMetroplus("Error HTTP", {
              cause:
                "La respuesta del servidor no es correcta. Status Response:" +
                response.status,
            });
          }
          return response.body;
        });
    } catch (error) {
      throw new ErrorMetroplus("Error APP", { cause: error.message });
    }
  }
  arqTable() {
    return {
      data: null,
      dom: "ltp",
      language: {
        searchPlaceholder: "Buscar...",
        sSearch: "",
        lengthMenu: "Mostrar _MENU_ registros por página",
        sProcessing: "Procesando...",
        sZeroRecords: "Todavía no tienes resultados disponibles.",
        sEmptyTable: "Ningún dato disponible en esta tabla",
        sInfo:
          "Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros",
        sInfoEmpty: "Mostrando registros del 0 al 0 de un total de 0 registros",
        sInfoFiltered: "(filtrado de un total de _MAX_ registros)",
        sInfoPostFix: "",
        sUrl: "",
        sInfoThousands: ",",
        sLoadingRecords: "Cargando...",
        oPaginate: {
          sFirst: "Primero",
          sLast: "Último",
          sNext: "Siguiente",
          sPrevious: "Anterior",
        },
        oAria: {
          sSortAscending:
            ": Activar para ordenar la columna de manera ascendente",
          sSortDescending:
            ": Activar para ordenar la columna de manera descendente",
        },
      },
      cache: false,
      destroy: true,
      columns: [
        {
          title: "N° : ",
        },
        {
          title: "Usuario:",
        },
        {
          title: "Nombres:",
        },
        {
          title: "Apellidos:",
        },
        {
          title: "E-mail:",
        },
        {
          title: "Opciones:",
        },
      ],
      aoColumnDefs: [
        {
          mRender: function (data, type, row, meta) {
            return meta.row + meta.settings._iDisplayStart + 1;
          },
          visible: true,
          aTargets: [0],
          orderable: false,
        },
        {
          mRender: function (data, type, full) {
            return full.samaccountname;
          },
          visible: true,
          aTargets: [1],
          orderable: true,
        },
        {
          mRender: function (data, type, full) {
            return full.sn;
          },
          visible: true,
          aTargets: [2],
          orderable: true,
        },
        {
          mRender: function (data, type, full) {
            return full.cn;
          },
          visible: true,
          aTargets: [3],
          orderable: true,
        },
        {
          mRender: function (data, type, full) {
            return full.mail;
          },
          visible: true,
          aTargets: [4],
          orderable: true,
        },
        {
          mRender: function (data, type, full) {
            return "";
          },
          visible: true,
          aTargets: [5],
          orderable: true,
        },
      ],
      fnRowCallback: function (nRow, aData, iDisplayIndex, iDisplayIndexFull) {
        m.mount(nRow, {
          view: () => {
            return [
              m("td", [iDisplayIndexFull + 1]),
              m("td", [aData.samaccountname]),
              m("td", [aData.sn]),
              m("td", [aData.cn]),
              m("td", [
                aData.mail,
                m("br"),
                m(
                  "span.tx-12[data-toggle='collapse'][href='#collapseExample_" +
                    aData.samaccountname +
                    "'][role='button'][aria-expanded='false'][aria-controls='collapseExample_" +
                    aData.samaccountname +
                    "']",
                  {
                    style: "cursor:pointer;",
                  },
                  "Creado: " + aData.whencreated
                ),
                m(
                  ".collapse[id='collapseExample_" +
                    aData.samaccountname +
                    "']",
                  [
                    m(".tx-12.d-block", "Actualizado: " + aData.whenchanged),
                    m(
                      ".tx-12.d-block",
                      "Última Contraseña: " + aData.pwdlastset
                    ),
                    m(
                      ".tx-12.d-block",
                      "Último Acceso: " + aData.lastlogontimestamp
                    ),
                  ]
                ),
              ]),

              m("td", [
                m(
                  "button.btn.btn-sm.btn-block.tx-semibold.tx-white",
                  {
                    style: { "background-color": "#185b98" },
                    onclick: () => {
                      m.route.set("/administracion/metrovirtual/", {
                        idUsr: aData.samaccountname,
                      });
                    },
                  },
                  "Ver"
                ),
              ]),
            ];
          },
        });
      },
    };
  }
  vTableUsuarios(idTable, dataTable, arqTable) {
    return [
      m(Table, { idTable: idTable, dataTable: dataTable, arqTable: arqTable }),
    ];
  }
  page() {
    return [
      this.vHeader(),
      this.vMenu(),
      this.idUsr == null ? [this.vMain()] : [this.vMainProfile()],
    ];
  }
}

export default usrMV;
