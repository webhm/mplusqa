import m from "mithril";
import FecthUci from "./fecthUci";
import PacientesUCI from "./pacientesUci";
import TurnosUci from "./turnosUci";

class Valoracion {
    id = null;
    nro = null;
    fechaHoraTurno = null;
    tipo = null;
    valoracion = null;
    editar = null;
    seccion = 'ValoracionFisicaNeo';
    constructor() {
        this.id = this.id;
        this.nro = this.nro;
        this.fechaHoraTurno = this.fechaHoraTurno;
        this.tipo = this.tipo;
        this.valoracion = this.valoracion;
        this.editar = this.editar;
        this.seccion = this.seccion;
    }
}

class ValoracionUciNeo {

    static registros = [];
    static nuevoRegistro = null;
    static show = false;
    static showOtros = false;

    static validarRegistro() {

    }

    static iniciarRegistro() {
        ValoracionUciNeo.nuevoRegistro = new Valoracion();
    }

    static agregarRegistro() {
        if (ValoracionUciNeo.registros.length == 0) {
            ValoracionUciNeo.nuevoRegistro.nro = 1;
            ValoracionUciNeo.registros.push(ValoracionUciNeo.nuevoRegistro);
        } else {
            ValoracionUciNeo.nuevoRegistro.nro = (ValoracionUciNeo.registros[ValoracionUciNeo.registros.length - 1].nro + 1);
            ValoracionUciNeo.registros.push(ValoracionUciNeo.nuevoRegistro);
        }
    }

    static verRegistro(registro) {
        registro.editar = true;
        ValoracionUciNeo.nuevoRegistro = registro;
    }

    static editarRegistro() {
        ValoracionUciNeo.nuevoRegistro.editar = null;
        ValoracionUciNeo.registros.map((_v, _i) => {
            if (_v.nro == ValoracionUciNeo.nuevoRegistro.nro) {
                ValoracionUciNeo.registros[_i] = ValoracionUciNeo.nuevoRegistro;
            }
        });

    }

    static eliminarRegistro(obj) {

        let res = [];
        ValoracionUciNeo.registros.map((_v, _i) => {
            if (_v.nro !== obj.nro) {
                res.push(_v);
            }
        });

        ValoracionUciNeo.registros = res;

    }

    static getRegistros() {
        return ValoracionUciNeo.registros;
    }

    static arqTable() {
        return {
            data: null,
            dom: 'ltp',
            language: {
                searchPlaceholder: "Buscar...",
                sSearch: "",
                lengthMenu: "Mostrar _MENU_ registros por página",
                sProcessing: "Procesando...",
                sZeroRecords: "Todavía no tienes resultados disponibles.",
                sEmptyTable: "Ningún dato disponible en esta tabla",
                sInfo: "Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros",
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
                    sSortAscending: ": Activar para ordenar la columna de manera ascendente",
                    sSortDescending: ": Activar para ordenar la columna de manera descendente",
                },
            },
            cache: false,
            destroy: true,
            order: [
                [0, 'desc'],
                [1, 'desc']
            ],
            columns: [{
                    title: "order Turno:",
                },
                {
                    title: "order N°:",
                },
                {
                    title: "Turno:",
                },
                {
                    title: "N°:",
                },
                {
                    title: "Tipo:",
                },
                {
                    title: "Valor:",
                },
                {
                    title: "Opciones:",
                }
            ],
            aoColumnDefs: [{
                    mRender: function(data, type, full) {
                        return full.fechaHoraTurno;
                    },
                    visible: false,
                    aTargets: [0],
                    orderable: true,
                },
                {
                    mRender: function(data, type, full) {
                        return full.nro;
                    },
                    visible: false,
                    aTargets: [1],
                    orderable: true,

                },
                {
                    fnCreatedCell: function(nTd, sData, oData, iRow, iCol) {
                        return m.mount(nTd, {
                            view: () => {
                                return [
                                    m('div.text-center.pd-5', [
                                        m("button.btn-xs.btn-block.tx-semibold[type='button']", {
                                                class: (PacientesUCI.fechaHoraTurno == oData.fechaHoraTurno ? 'bg-warning' : 'bg-light')
                                            },
                                            (oData.numeroTurno == 1 ? 'AM' + ': ' + moment(oData.fechaHoraTurno, 'DD-MM-YYYY HH:mm').format('DD/MM/YYYY HH:mm') : ''),
                                            (oData.numeroTurno == 2 ? 'PM' + ': ' + moment(oData.fechaHoraTurno, 'DD-MM-YYYY HH:mm').format('DD/MM/YYYY HH:mm') : ''),
                                            (oData.numeroTurno == 3 ? 'HS' + ': ' + moment(oData.fechaHoraTurno, 'DD-MM-YYYY HH:mm').format('DD/MM/YYYY HH:mm') : ''),
                                        ),
                                    ])

                                ]
                            }
                        });
                    },
                    width: '15%',
                    visible: true,
                    aTargets: [2],
                    orderable: false,

                },
                {
                    mRender: function(data, type, full) {
                        return full.nro;
                    },

                    visible: false,
                    aTargets: [3],
                    orderable: false,

                },

                {
                    mRender: function(data, type, full) {
                        return full.tipo != null ? full.tipo : '<div class="text-center pd-l-0 pd-r-0"><hr style="border-color:#001737;"/></div>';
                    },

                    visible: true,
                    aTargets: [4],
                    orderable: true,

                },
                {
                    mRender: function(data, type, full) {
                        return (full.valor != null ? full.valor : '<div class="text-center pd-l-0 pd-r-0"><hr style="border-color:#001737;"/></div>');
                    },
                    visible: true,
                    aTargets: [5],
                    orderable: true,

                },

                {
                    fnCreatedCell: function(nTd, sData, oData, iRow, iCol) {
                        return m.mount(nTd, {
                            view: () => {
                                return [
                                    m("div.btn-block.btn-group.wd-100p.pd-5", [
                                        m("button.btn.btn-xs.btn-success[type='button']", {
                                                class: (oData.editar ? 'd-none' : ''),
                                                disabled: (TurnosUci.nuevoTurno !== null && TurnosUci.nuevoTurno.gestion == 1 ? (PacientesUCI.fechaHoraTurno != oData.fechaHoraTurno ? 'disabled' : '') : 'disabled'),
                                                onclick: () => {
                                                    ValoracionUciNeo.nuevoRegistro = null
                                                    ValoracionUciNeo.verRegistro(oData);
                                                },
                                            },
                                            'Editar',
                                        ),
                                        m("button.btn.btn-xs.btn-block.btn-outline-danger[type='button']", {
                                                class: (oData.editar ? '' : 'd-none'),
                                                disabled: (PacientesUCI.fechaHoraTurno != oData.fechaHoraTurno ? 'disabled' : ''),

                                                onclick: () => {
                                                    oData.editar = null;
                                                    ValoracionUciNeo.nuevoRegistro = null;
                                                },
                                            },
                                            'Cancelar Edición',
                                        ),
                                        m("button.btn.btn-xs.btn-danger[type='button']", {
                                                class: (oData.editar ? 'd-none' : ''),
                                                disabled: (TurnosUci.nuevoTurno !== null && TurnosUci.nuevoTurno.gestion == 1 ? (PacientesUCI.fechaHoraTurno != oData.fechaHoraTurno ? 'disabled' : '') : 'disabled'),
                                                onclick: () => {
                                                    if (confirm("¿Esta Ud seguro de eliminar este registro?") == true) {
                                                        ValoracionUciNeo.eliminarRegistro(oData);
                                                        FecthUci.eliminarSeccion(oData);
                                                        ValoracionUciNeo.nuevoRegistro = null;
                                                        PacientesUCI.vReloadTable('table-valoracion-uci-neo', ValoracionUciNeo.getRegistros());
                                                    }
                                                },
                                            },
                                            'Eliminar',
                                        ),
                                        m("button.btn.btn-xs.btn-dark[type='button']", {
                                                class: (PacientesUCI.fechaHoraTurno != oData.fechaHoraTurno ? '' : 'd-none'),
                                                onclick: () => {
                                                    ValoracionUciNeo.iniciarRegistro();
                                                    ValoracionUciNeo.nuevoRegistro.id = oData.id;
                                                    ValoracionUciNeo.nuevoRegistro.via = oData.via;
                                                    ValoracionUciNeo.nuevoRegistro.ubicacion = oData.ubicacion;
                                                    ValoracionUciNeo.nuevoRegistro.tipo = oData.tipo;
                                                    ValoracionUciNeo.nuevoRegistro.inicio = oData.inicio;
                                                    ValoracionUciNeo.nuevoRegistro.retiro = oData.retiro;
                                                    ValoracionUciNeo.nuevoRegistro.curacion = oData.curacion;
                                                    ValoracionUciNeo.nuevoRegistro.condicion = oData.condicion;
                                                    ValoracionUciNeo.nuevoRegistro.observacion = oData.observacion;
                                                    ValoracionUciNeo.nuevoRegistro.numeroTurno = PacientesUCI.numeroTurno;
                                                    ValoracionUciNeo.nuevoRegistro.fechaHoraTurno = PacientesUCI.fechaHoraTurno;

                                                },
                                            },
                                            'Copiar',
                                        ),
                                    ])

                                ]
                            }
                        });
                    },
                    width: '10%',
                    visible: true,
                    aTargets: [6],
                    orderable: true,

                }


            ],
            fnRowCallback: function(nRow, aData, iDisplayIndex, iDisplayIndexFull) {

            },
        };
    }

    static destroyTable() {
        let table = document.getElementById('table-valoracion-uci-neo');
        // clear first
        if (table != null) {
            $('#table-valoracion-uci-neo').DataTable().clear().destroy();

        }
    }

    view() {
        return [
            m("thead.bd.bd-2", {
                    style: { "border-color": "#5173a1" },
                    class: (TurnosUci.nuevoTurno !== null && TurnosUci.nuevoTurno.gestion == 1 ? '' : 'd-none'),

                },

                m("tr.tx-uppercase", {
                    // class: (PacientesUCI.tipoAtencion !== null && PacientesUCI.tipoAtencion == 'NEO' ? '' : 'd-none'),
                    style: { "background-color": "#CCCCFF" },
                    onclick: () => {
                        if (ValoracionUciNeo.show) {
                            ValoracionUciNeo.destroyTable();
                        }
                        ValoracionUciNeo.show = !ValoracionUciNeo.show;
                    }
                }, [
                    m("th.tx-semibold[scope='col'][colspan='12']",
                        "VALORACIÓN FISICA:"
                    ),

                ])
            ),
            m("tbody.bd.bd-2", {
                style: { "border-color": "#5173a1" },
                class: (ValoracionUciNeo.show ? '' : 'd-none')
            }, [

                m("tr.bd.bd-2.tx-uppercase", {
                    style: { "background-color": "rgb(238, 249, 200)", "border-color": "#5173a1" },
                    class: (TurnosUci.nuevoTurno !== null && TurnosUci.nuevoTurno.gestion == 1 ? '' : 'd-none'),
                }, [
                    m("th[scope='col'][colspan='6']",
                        "TIPO: "
                    ),
                    m("th[scope='col'][colspan='6']",
                        "VALOR: "
                    )
                ]),
                m("tr.bd.bd-2", {
                    style: { "border-color": "#5173a1" },
                    class: (TurnosUci.nuevoTurno !== null && TurnosUci.nuevoTurno.gestion == 1 ? '' : 'd-none'),

                }, [

                    m("td.tx-normal[colspan='6']",
                        m("div.input-group", [
                            m("div.input-group-append",
                                m("button.btn.btn-xs.btn-light[type='button']", {
                                        title: "Nuevo",
                                        onclick: () => {
                                            if (ValoracionUciNeo.nuevoRegistro == null) {
                                                ValoracionUciNeo.iniciarRegistro();
                                            } else {
                                                ValoracionUciNeo.nuevoRegistro = null;
                                            }
                                        }
                                    },
                                    m("i.fas.fa-plus")
                                )
                            ),
                            (ValoracionUciNeo.nuevoRegistro !== null ? [

                                m('select.tx-semibold', {
                                    id: 'sec_TipoValoracion',
                                    onchange: (e) => {
                                        let _id = e.target.options[e.target.selectedIndex].id;
                                        let _value = e.target.options[e.target.selectedIndex].value;
                                        if (ValoracionUciNeo.nuevoRegistro == null) {
                                            ValoracionUciNeo.nuevoRegistro.id = _id;
                                            ValoracionUciNeo.nuevoRegistro.tipo = _value;
                                        } else {
                                            ValoracionUciNeo.nuevoRegistro.id = _id;
                                            ValoracionUciNeo.nuevoRegistro.tipo = _value;
                                        }

                                        document.getElementById('valorValoracionTONO').hidden = true;
                                        document.getElementById('valorValoracionCABEZA').hidden = true;
                                        document.getElementById('valorValoracionABDOMEN').hidden = true;
                                        document.getElementById('valorValoracionCORDONUMBILICAL').hidden = true;

                                        if (ValoracionUciNeo.nuevoRegistro.tipo == 'TONO') {
                                            document.getElementById('valorValoracionTONO').hidden = false;
                                        }
                                        if (ValoracionUciNeo.nuevoRegistro.tipo == 'CABEZA') {
                                            document.getElementById('valorValoracionCABEZA').hidden = false;
                                        }
                                        if (ValoracionUciNeo.nuevoRegistro.tipo == 'ABDOMEN') {
                                            document.getElementById('valorValoracionABDOMEN').hidden = false;
                                        }
                                        if (ValoracionUciNeo.nuevoRegistro.tipo == 'CORDON UMBILICAL') {
                                            document.getElementById('valorValoracionCORDONUMBILICAL').hidden = false;
                                        }
                                    },
                                    class: "custom-select",
                                    value: (ValoracionUciNeo.nuevoRegistro !== null ? ValoracionUciNeo.nuevoRegistro.tipo : 0),
                                }, [{
                                        id: "Tono",
                                        label: "TONO"
                                    },
                                    {
                                        id: "Cabeza",
                                        label: "CABEZA"
                                    },
                                    {
                                        id: "Abdomen",
                                        label: "ABDOMEN"
                                    },
                                    {
                                        id: "CordonUmbilical",
                                        label: "CORDON UMBILICAL"
                                    },
                                ].map(x =>
                                    m('option[id="' + x.id + '"]', x.label)
                                ))
                            ] : [])
                        ])
                    ),
                    m("td.tx-normal[colspan='6']",
                        (ValoracionUciNeo.nuevoRegistro !== null ? [
                            m('select.tx-semibold', {
                                id: 'valorValoracionTONO',
                                oncreate: (el) => {
                                    console.log(5454, el)
                                    if (ValoracionUciNeo.nuevoRegistro.tipo == 'TONO') {
                                        el.dom.hidden = false;
                                    } else {
                                        el.dom.hidden = true;
                                    }

                                },
                                onchange: (e) => {
                                    let _id = e.target.options[e.target.selectedIndex].id;
                                    let _value = e.target.options[e.target.selectedIndex].value;
                                    ValoracionUciNeo.nuevoRegistro.valor = _value;
                                },
                                onkeypress: (e) => {
                                    if (e.keyCode == 13) {
                                        ValoracionUciNeo.nuevoRegistro.numeroTurno = PacientesUCI.numeroTurno;
                                        ValoracionUciNeo.nuevoRegistro.fechaHoraTurno = PacientesUCI.fechaHoraTurno;
                                        if (ValoracionUciNeo.nuevoRegistro.editar == null) {
                                            ValoracionUciNeo.agregarRegistro();
                                            ValoracionUciNeo.nuevoRegistro.id = ValoracionUciNeo.nuevoRegistro.nro + 'ValoracionFisica';
                                            FecthUci.registrarSeccion(ValoracionUciNeo.nuevoRegistro);
                                            ValoracionUciNeo.nuevoRegistro = null;
                                            PacientesUCI.vReloadTable('table-valoracion-uci-neo', ValoracionUciNeo.getRegistros());
                                        } else {
                                            ValoracionUciNeo.editarRegistro();
                                            FecthUci.actualizarSeccion(ValoracionUciNeo.nuevoRegistro);
                                            ValoracionUciNeo.nuevoRegistro = null;
                                            PacientesUCI.vReloadTable('table-valoracion-uci-neo', ValoracionUciNeo.getRegistros());
                                        }
                                    }
                                },
                                class: "custom-select",
                                value: (ValoracionUciNeo.nuevoRegistro !== null ? ValoracionUciNeo.nuevoRegistro.valor : 0),
                            }, m("option[value='0']", 'Seleccione...'), [{
                                    id: "AdecuadoEdad",
                                    label: "ADECUADO PARA LA EDAD"
                                },
                                {
                                    id: "Hipotonico",
                                    label: "HIPOTONICO"
                                },
                                {
                                    id: "Hipertonico",
                                    label: "HIPERTONICO"
                                },
                                {
                                    id: "Temblores",
                                    label: "TEMBLORES"
                                },
                            ].map(x =>
                                m('option[id="' + x.id + '"]', x.label)
                            )),
                            m('select.tx-semibold', {
                                id: 'valorValoracionCABEZA',
                                oncreate: (el) => {
                                    if (ValoracionUciNeo.nuevoRegistro.tipo == 'CABEZA') {
                                        el.dom.hidden = false;
                                    } else {
                                        el.dom.hidden = true;
                                    }

                                },
                                onchange: (e) => {
                                    let _id = e.target.options[e.target.selectedIndex].id;
                                    let _value = e.target.options[e.target.selectedIndex].value;
                                    ValoracionUciNeo.nuevoRegistro.valor = _value;
                                },
                                onkeypress: (e) => {
                                    if (e.keyCode == 13) {
                                        ValoracionUciNeo.nuevoRegistro.numeroTurno = PacientesUCI.numeroTurno;
                                        ValoracionUciNeo.nuevoRegistro.fechaHoraTurno = PacientesUCI.fechaHoraTurno;
                                        if (ValoracionUciNeo.nuevoRegistro.editar == null) {
                                            ValoracionUciNeo.agregarRegistro();
                                            ValoracionUciNeo.nuevoRegistro.id = ValoracionUciNeo.nuevoRegistro.nro + 'ValoracionFisica';
                                            FecthUci.registrarSeccion(ValoracionUciNeo.nuevoRegistro);
                                            ValoracionUciNeo.nuevoRegistro = null;
                                            PacientesUCI.vReloadTable('table-valoracion-uci-neo', ValoracionUciNeo.getRegistros());
                                        } else {
                                            ValoracionUciNeo.editarRegistro();
                                            FecthUci.actualizarSeccion(ValoracionUciNeo.nuevoRegistro);
                                            ValoracionUciNeo.nuevoRegistro = null;
                                            PacientesUCI.vReloadTable('table-valoracion-uci-neo', ValoracionUciNeo.getRegistros());
                                        }
                                    }
                                },
                                class: "custom-select",
                                value: (ValoracionUciNeo.nuevoRegistro !== null ? ValoracionUciNeo.nuevoRegistro.valor : 0),
                            }, m("option[value='0']", 'Seleccione...'), [{
                                    id: "FontanelaNormotensa",
                                    label: "FONTANELA NORMOTENSA"
                                },
                                {
                                    id: "FontanelaTensa",
                                    label: "FONTANELA TENSA"
                                },
                                {
                                    id: "FontanelaAbombada",
                                    label: "FONTANELA ABOMBADA"
                                },
                                {
                                    id: "FontanelaDeprimida",
                                    label: "FONTANELA DEPRIMIDA"
                                },
                            ].map(x =>
                                m('option[id="' + x.id + '"]', x.label)
                            )),
                            m('select.tx-semibold', {
                                id: 'valorValoracionABDOMEN',
                                oncreate: (el) => {
                                    if (ValoracionUciNeo.nuevoRegistro.tipo == 'ABDOMEN') {
                                        el.dom.hidden = false;
                                    } else {
                                        el.dom.hidden = true;
                                    }

                                },
                                onchange: (e) => {
                                    let _id = e.target.options[e.target.selectedIndex].id;
                                    let _value = e.target.options[e.target.selectedIndex].value;
                                    ValoracionUciNeo.nuevoRegistro.valor = _value;
                                },
                                onkeypress: (e) => {
                                    if (e.keyCode == 13) {
                                        ValoracionUciNeo.nuevoRegistro.numeroTurno = PacientesUCI.numeroTurno;
                                        ValoracionUciNeo.nuevoRegistro.fechaHoraTurno = PacientesUCI.fechaHoraTurno;
                                        if (ValoracionUciNeo.nuevoRegistro.editar == null) {
                                            ValoracionUciNeo.agregarRegistro();
                                            ValoracionUciNeo.nuevoRegistro.id = ValoracionUciNeo.nuevoRegistro.nro + 'ValoracionFisica';
                                            FecthUci.registrarSeccion(ValoracionUciNeo.nuevoRegistro);
                                            ValoracionUciNeo.nuevoRegistro = null;
                                            PacientesUCI.vReloadTable('table-valoracion-uci-neo', ValoracionUciNeo.getRegistros());
                                        } else {
                                            ValoracionUciNeo.editarRegistro();
                                            FecthUci.actualizarSeccion(ValoracionUciNeo.nuevoRegistro);
                                            ValoracionUciNeo.nuevoRegistro = null;
                                            PacientesUCI.vReloadTable('table-valoracion-uci-neo', ValoracionUciNeo.getRegistros());
                                        }
                                    }
                                },
                                class: "custom-select",
                                value: (ValoracionUciNeo.nuevoRegistro !== null ? ValoracionUciNeo.nuevoRegistro.valor : 0),
                            }, m("option[value='0']", 'Seleccione...'), [{
                                    id: "Blando",
                                    label: "BLANDO"
                                },
                                {
                                    id: "Distendido",
                                    label: "DISTENDIDO"
                                },
                                {
                                    id: "Globoso",
                                    label: "GLOBOSO"
                                },
                                {
                                    id: "AsasAintestinalesVisibles",
                                    label: "ASAS AINTESTINALES VISIBLES"
                                },
                            ].map(x =>
                                m('option[id="' + x.id + '"]', x.label)
                            )),
                            m('select.tx-semibold', {
                                id: 'valorValoracionCORDONUMBILICAL',
                                oncreate: (el) => {
                                    if (ValoracionUciNeo.nuevoRegistro.tipo == 'CORDON UMBILICAL') {
                                        el.dom.hidden = false;
                                    } else {
                                        el.dom.hidden = true;
                                    }

                                },
                                onchange: (e) => {
                                    let _id = e.target.options[e.target.selectedIndex].id;
                                    let _value = e.target.options[e.target.selectedIndex].value;
                                    ValoracionUciNeo.nuevoRegistro.valor = _value;
                                },
                                onkeypress: (e) => {
                                    if (e.keyCode == 13) {
                                        ValoracionUciNeo.nuevoRegistro.numeroTurno = PacientesUCI.numeroTurno;
                                        ValoracionUciNeo.nuevoRegistro.fechaHoraTurno = PacientesUCI.fechaHoraTurno;
                                        if (ValoracionUciNeo.nuevoRegistro.editar == null) {
                                            ValoracionUciNeo.agregarRegistro();
                                            ValoracionUciNeo.nuevoRegistro.id = ValoracionUciNeo.nuevoRegistro.nro + 'ValoracionFisica';
                                            FecthUci.registrarSeccion(ValoracionUciNeo.nuevoRegistro);
                                            ValoracionUciNeo.nuevoRegistro = null;
                                            PacientesUCI.vReloadTable('table-valoracion-uci-neo', ValoracionUciNeo.getRegistros());
                                        } else {
                                            ValoracionUciNeo.editarRegistro();
                                            FecthUci.actualizarSeccion(ValoracionUciNeo.nuevoRegistro);
                                            ValoracionUciNeo.nuevoRegistro = null;
                                            PacientesUCI.vReloadTable('table-valoracion-uci-neo', ValoracionUciNeo.getRegistros());
                                        }
                                    }
                                },
                                class: "custom-select",
                                value: (ValoracionUciNeo.nuevoRegistro !== null ? ValoracionUciNeo.nuevoRegistro.valor : 0),
                            }, m("option[value='0']", 'Seleccione...'), [{
                                    id: "Normal",
                                    label: "NORMAL"
                                },
                                {
                                    id: "Enrojecido",
                                    label: "ENROJECIDO"
                                },
                                {
                                    id: "Secreciones",
                                    label: "SECRECIONES"
                                }

                            ].map(x =>
                                m('option[id="' + x.id + '"]', x.label)
                            )),
                        ] : [])
                    ),
                ]),
                m("tr.tx-uppercase", {
                    style: { "background-color": "#eaeff5" }
                }, [
                    m("th[scope='col'][colspan='12']",
                        "Registros: "
                    ),
                ]),
                m("tr.tx-uppercase.mg-t-20", [
                    m("td[colspan='12']",
                        (ValoracionUciNeo.show != false ? [PacientesUCI.vTable('table-valoracion-uci-neo', ValoracionUciNeo.getRegistros(), ValoracionUciNeo.arqTable())] : [])
                    ),
                ]),
                m('br')
            ]),
        ];
    }


}

export default ValoracionUciNeo;