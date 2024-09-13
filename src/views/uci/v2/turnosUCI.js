import m from "mithril";
import FetchUci from "./fetchUci";
import TableUCI from "../../utils/tableUci";
import Loader from "../../utils/loader";

class Turno {

    numeroHistoriaClinica = null;
    numeroAtencion = null;
    numeroTurno = null;
    fechaTurno = null;
    horaTurno = null;
    fechaHoraTurno = null;
    usuarioTurno = null;
    usuarioActual = null;
    paciente = null;
    especialidad = null;
    statusHora = 0; // [0 => Hora sin modificar, 2 Hora modificada]
    status = 0; // [1 => Turno Abierto, 2 Turno Cerrado]
    gestion = 0;

    constructor() {



    }

    oninit(_data) {

        this.numeroHistoriaClinica = _data.attrs.numeroHistoriaClinica;
        this.numeroAtencion = _data.attrs.numeroAtencion;
        this.usuarioTurno = _data.attrs.usuarioTurno;

    }

    abrirTurno() {
        if (this.status == 0) {
            this.status = 1;
        }

        console.info(this)
    }
    reAbrirTurno() {
        if (this.status == 2) {
            this.status = 1;
        }
    }
    cerrarTurno() {
        this.gestion = 2;
        this.status = 2;
    }
    iniciarGestion() {

        try {
            if (this.usuarioTurno != this.usuarioActual) {
                throw 'asumir';
            }

            if (this.gestion == 0) {
                this.gestion = 1;
            }

        } catch (error) {

            if (error == 'asumir') {
                $.alert('Aes necesario asumir nates de ocntinar')
            }

        }




    }


    view(_data) {
        return [
            m("button.btn.btn-xs.btn-primary.tx-semibold.tx-14.mg-r-2[type='button']", {
                onclick: () => {


                    $.confirm({
                        title: 'Registrar Nuevo Turno',
                        content: '¿Esta Ud seguro de registrar un nuevo turno para este paciente?',
                        buttons: {
                            confirm: {
                                text: 'Confirmar',
                                btnClass: "btn-success op-8",
                                action: function () {
                                    _data.state.abrirTurno();
                                }
                            },
                            cancel: {
                                btnClass: "btn-danger op-8",
                                text: 'Cancelar',
                            }

                        }
                    });


                }
            }, "Registrar Nuevo Turno"),
        ]
    }


}


class TurnosUCI {

    loader = false;
    error = false;
    message = '';
    turnos = []; // Lista de Turnos

    constructor() {

    }

    oninit(_data) {
        this.getTurnos(_data.attrs.numeroHistoriaClinica, _data.attrs.numeroAtencion, _data.attrs.usuarioTurno);
    }

    setTurno(turno, usuarioTurno) {
        let t = new Turno();
        t.numeroAtencion = turno.ATENCION;
        t.fechaHoraTurno = turno.FECHA;
        t.numeroHistoriaClinica = turno.NHC;
        t.numeroTurno = parseInt(turno.PK_TURNO);
        t.status = parseInt(turno.STATUS);
        t.statusHora = turno.STATUS_HORA;
        t.fechaTurno = moment(turno.FECHA, 'DD-MM-YYYY HH:mm').format('DD-MM-YYYY');
        t.horaTurno = moment(turno.FECHA, 'DD-MM-YYYY HH:mm').format('HH:mm');
        t.usuarioTurno = turno.USUARIO;
        t.usuarioActual = usuarioTurno;
        return t;
    }

    setNuevoTurno() {
        if (this.turnos.length > 0) {
            $.alert('Noe sposible abri run nuevo turno')
        }

    }

    validarHorarioTurnos(turnos, usuarioTurno) {
        // Validar turnos dentro de las 24 horas
        turnos.map((_v, _i) => {
            if (_i < 2) {
                this.turnos.push(this.setTurno(_v, usuarioTurno));
            }
        });
    }


    getTurnos(numeroHistoriaClinica, numeroAtencion, usuarioTurno) {
        FetchUci.validarAtencion(numeroHistoriaClinica, numeroAtencion).then((_data) => {
            this.validarHorarioTurnos(_data.data.dataTurnos, usuarioTurno);
            this.loader = true;
            this.error = false;
        }).catch((err) => {
            this.loader = true;
            this.error = true;
            this.turnos = { status: false, message: err.message };
            console.error(err)
        });
    }

    vError() {
        return [
            m('div.text-left.tx-semibold.pd-5', [
                m("p.tx-danger.pd-0.mg-b-2", [
                    m('i.fas.fa-exclamation-triangle'),
                    " Error:"
                ]),
                m("p.tx-danger.tx-color-03.mg-b-30",
                    this.message
                )
            ])

        ]

    }

    vSys() {
        return [
            m('div.pd-10', [
                m(Loader)
            ])
        ]


    }

    vTable(idTable, dataTable, arqTable) {
        return [
            m(TableUCI, { idTable: idTable, dataTable: dataTable, arqTable: arqTable })
        ]
    }



    arqTableTurnos() {
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
            orden: false,
            destroy: true,
            // pageLength: 3,
            columns: [{
                title: "Tipo: ",
            },
            {
                title: "Fecha:",
            },
            {
                title: "Hora:",
            },
            {
                title: "Usuario:",
            },
            {
                title: "Paciente:",
            },

            {
                title: "Especialidad:",
            },
            {
                title: "Status:",
            },

            {
                title: "Gestionar:",
            },
            {
                title: "Abrir/Cerrar:",
            },
            {
                title: "Asumir:",
            },
            {
                title: "Cancelar:",
            }
            ],
            aoColumnDefs: [{
                fnCreatedCell: function (nTd, sData, oData, iRow, iCol) {



                    return m.mount(nTd, {
                        view: () => {
                            return [
                                m('div.text-center', [
                                    m("button.btn-xs.btn-block.tx-semibold.tx-15[type='button']", {
                                        class: (oData.gestion == 1 ? 'bg-warning' : 'bg-light')
                                    },
                                        (oData.numeroTurno == 1 ? 'AM' : ''),
                                        (oData.numeroTurno == 2 ? 'PM' : ''),
                                        (oData.numeroTurno == 3 ? 'HS' : ''),
                                    ),
                                ])

                            ]
                        }
                    });
                },
                width: '5%',
                visible: true,
                aTargets: [0],
                orderable: false,
            },
            {

                fnCreatedCell: function (nTd, sData, oData, iRow, iCol) {
                    return m.mount(nTd, {
                        view: () => {
                            return [
                                m("input.form-control.tx-13.tx-semibold[type='text'][placeholder='DD/MM/YYYY']", {
                                    id: 'fechaTurno',
                                    disabled: true,
                                    oncreate: (el) => {
                                        if (oData.fechaTurno !== undefined) {
                                            el.dom.value = moment(oData.fechaTurno, 'DD-MM-YYYY').format('DD/MM/YYYY');
                                        }
                                        setTimeout(() => {
                                            new Cleave("#fechaTurno", {
                                                date: true,
                                                datePattern: ["d", "m", "Y"]
                                            });
                                        }, 50);
                                    },
                                }),
                            ]
                        }
                    });
                },
                width: '15%',
                visible: true,
                aTargets: [1],
                orderable: false,

            },
            {
                fnCreatedCell: function (nTd, sData, oData, iRow, iCol) {


                    let _d = true;
                    return m.mount(nTd, {
                        view: () => {
                            return [

                                m("div.input-group", [
                                    m("input.form-control.tx-13.tx-semibold[type='text'][placeholder='HH:mm]", {
                                        id: 'horaTurno' + iRow,
                                        disabled: _d,
                                        oncreate: (el) => {
                                            if (oData.horaTurno !== undefined) {
                                                el.dom.value = oData.horaTurno;
                                            }
                                            setTimeout(() => {
                                                new Cleave("#horaTurno" + iRow, {
                                                    time: true,
                                                    timePattern: ['h', 'm']
                                                });
                                            }, 50);
                                        },
                                        oninput: (e) => {
                                            setTimeout(() => { }, 50);
                                        },
                                        onkeypress: (e) => {
                                            if (e.keyCode == 13) {
                                                _d = true;
                                            }
                                        },
                                    }),
                                    m("div.input-group-append", {
                                        class: (oData.status == 1 && oData.statusHora == 1 ? '' : 'd-none')
                                    },
                                        m("button.btn.btn-xs.btn-light[type='button']", {
                                            title: "Editar Hora",
                                            onclick: () => {
                                                _d = !_d;

                                            }
                                        },
                                            m("i.fas.fa-edit")
                                        )
                                    )
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

                fnCreatedCell: function (nTd, sData, oData, iRow, iCol) {
                    return m.mount(nTd, {
                        view: () => {
                            return [
                                m("input.form-control.tx-13.tx-semibold[type='text']", {
                                    disabled: 'disabled',
                                    oncreate: (el) => {
                                        if (oData.usuarioTurno !== undefined) {
                                            el.dom.value = oData.usuarioTurno;
                                        }
                                    },
                                }),
                            ]
                        }
                    });
                },
                width: '15%',
                visible: true,
                aTargets: [3],
                orderable: false,

            },
            {
                mRender: function (data, type, full) {
                    return full.paciente;
                },
                visible: false,
                aTargets: [4],
                orderable: false,
            },
            {
                mRender: function (data, type, full) {
                    return full.especialidad;
                },
                visible: false,
                aTargets: [5],
                orderable: false,


            },
            {
                fnCreatedCell: function (nTd, sData, oData, iRow, iCol) {

                    return m.mount(nTd, {
                        view: () => {
                            return [
                                m('div.text-center', [
                                    m("button.btn-xs.btn-block.tx-semibold.tx-13[type='button']", {
                                        class: (oData.status == 1 || oData.status == 4 ? 'bg-warning' : 'bg-success'),
                                    },
                                        (oData.status == 1 ? 'Turno Abierto' : ''),
                                        (oData.status == 2 ? 'Turno Cerrado' : ''),
                                        (oData.status == 4 ? 'Turno Abierto' : ''),
                                    ),

                                ])

                            ]
                        }
                    });
                },
                width: '10%',
                visible: true,
                aTargets: [6],
                orderable: false,
            },
            {
                fnCreatedCell: function (nTd, sData, oData, iRow, iCol) {
                    return m.mount(nTd, {
                        view: () => {
                            return [
                                m('div.text-center', [
                                    m("button.btn.btn-xs.btn-block.btn-success.tx-13.tx-semibold[type='button']", {

                                        onclick: () => {

                                            oData.iniciarGestion()


                                        },

                                    },
                                        'Gestionar',
                                    ),


                                ])

                            ]
                        }
                    });
                },
                width: '10%',
                visible: true,
                aTargets: [7],
                orderable: false,

            },
            {
                fnCreatedCell: function (nTd, sData, oData, iRow, iCol) {
                    return m.mount(nTd, {
                        view: () => {
                            return [

                                m('div.text-center', {

                                    class: ((oData.status == 1 || oData.status == 4) ? '' : 'd-none'),
                                }, [
                                    m("button.btn.btn-xs.btn-block.btn-danger.tx-13.tx-semibold[type='button']", {
                                        onclick: () => { },
                                    },
                                        'Cerrar',
                                    ),


                                ]),
                                m('div.text-center', {
                                    class: (oData.status == 2 ? '' : 'd-none'),
                                }, [
                                    m("button.btn.btn-xs.btn-block.btn-success.tx-13.tx-semibold[type='button']", {
                                        disabled: (oData.status == 2 ? '' : 'disabled'),
                                        onclick: () => { },
                                    },
                                        'Abrir',
                                    ),


                                ])

                            ]
                        }
                    });
                },
                width: '10%',
                visible: true,
                aTargets: [8],
                orderable: false,

            },
            {
                fnCreatedCell: function (nTd, sData, oData, iRow, iCol) {
                    return m.mount(nTd, {
                        view: () => {
                            return [
                                m('div.text-center', [
                                    m("button.btn.btn-xs.btn-block.btn-warning.tx-13.tx-semibold[type='button']", {

                                        onclick: () => {

                                            $.confirm({
                                                title: '¿Asumir?',
                                                content: '' +
                                                    '<form action="" class="formName">' +
                                                    '<div class="form-group ">' +
                                                    '<label>Comentario:</label>' +
                                                    '<textarea placeholder="Comentario" class="comment form-control wd-100p" rows="3" required></textarea>' +
                                                    '</div>' +
                                                    '</form>',
                                                buttons: {
                                                    formSubmit: {
                                                        text: 'Confirmar',
                                                        btnClass: 'btn-success op-8',
                                                        action: function () {
                                                            let comment = this.$content.find('.comment').val();
                                                            if (!comment) {
                                                                $.alert('Un comentario es obligatorio.');
                                                                return false;
                                                            }
                                                            // $.alert('Ud asumira todos los registros de esta turno.');
                                                        }
                                                    },
                                                    cancel: {
                                                        btnClass: "btn-danger op-8",
                                                        text: 'Cancelar',
                                                    }

                                                }

                                            });

                                        },
                                    },
                                        'Asumir',
                                    ),

                                ])

                            ]
                        }
                    });
                },
                width: '10%',
                visible: true,
                aTargets: [9],
                orderable: false,

            },
            {
                fnCreatedCell: function (nTd, sData, oData, iRow, iCol) {
                    return m.mount(nTd, {
                        view: () => {
                            return [
                                m('div.text-center', [
                                    m("button.btn.btn-xs.btn-block.btn-danger.tx-13.tx-semibold[type='button']", {
                                        disabled: ((oData.status == 1 || oData.status == 4) ? '' : 'disabled'),

                                        onclick: () => {

                                            $.confirm({
                                                title: '¿Cancelar?',
                                                content: '' +
                                                    '<form action="" class="formName">' +
                                                    '<div class="form-group ">' +
                                                    '<label>Comentario:</label>' +
                                                    '<textarea placeholder="Comentario" class="comment form-control wd-100p" rows="3" required></textarea>' +
                                                    '</div>' +
                                                    '</form>',
                                                buttons: {
                                                    formSubmit: {
                                                        text: 'Confirmar',
                                                        btnClass: 'btn-success op-8',
                                                        action: function () {
                                                            let comment = this.$content.find('.comment').val();
                                                            if (!comment) {
                                                                $.alert('Un comentario es obligatorio.');
                                                                return false;
                                                            }
                                                            // $.alert('Ud asumira todos los registros de esta turno.');
                                                        }
                                                    },
                                                    cancel: {
                                                        btnClass: "btn-danger op-8",
                                                        text: 'Cancelar',
                                                    }

                                                }

                                            });

                                        },
                                    },
                                        'Cancelar',
                                    ),

                                ])

                            ]
                        }
                    });
                },
                width: '10%',
                visible: true,
                aTargets: [10],
                orderable: false,

            }


            ],
            fnRowCallback: function (nRow, aData, iDisplayIndex, iDisplayIndexFull) {

            },
        };
    }


    view() {
        return [
            (this.loader == false && this.error == false ? [
                this.vSys()
            ] : this.loader == true && this.error == true ? [
                this.vError()
            ] : this.loader == true && this.error == false ? [
                this.vTable('table-turnos', this.turnos, this.arqTableTurnos()),
                m('br')
            ] : [])
        ]
    }

}

export { TurnosUCI, Turno };