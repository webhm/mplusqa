import m from "mithril";
import PacientesUCI from "./pacientesUci";
import FecthUci from "./fecthUci";
import TurnosUci from "./turnosUci";



class Prescripcion {
    id = null;
    nro = null;
    numeroTurno = null;
    fechaHoraTurno = null;
    tipo = null;
    prescripcion = null;
    frecuencia = null;
    horaPres = null;
    hora = null; // Feha y hora del registro Médico
    medico = null;
    timestamp = null; // Fecha y hora del registro de enfermeria
    status = null; // 1: Registrado 2: Administrado 3: No Administrado 4: Reaplazar 5: Suspender Administracion 6:Eliminado
    velocidadInfusion = null;
    unidadMedida = null;
    comentario = null;
    label = null;
    editar = null;
    seccion = 'PrescripcionesUci';
    constructor() {
        this.id = this.id;
        this.nro = this.nro;
        this.numeroTurno = this.numeroTurno;
        this.fechaHoraTurno = this.fechaHoraTurno;
        this.tipo = this.tipo;
        this.prescripcion = this.prescripcion;
        this.frecuencia = this.frecuencia;
        this.horaPres = this.horaPres;
        this.hora = this.hora;
        this.medico = this.medico;
        this.timestamp = this.timestamp;
        this.status = this.status;
        this.velocidadInfusion = this.velocidadInfusion;
        this.unidadMedida = this.unidadMedida;
        this.comentario = this.comentario;
        this.label = this.label;
        this.editar = this.editar;
        this.seccion = this.seccion;
    }

}


class PrescripcionesUci {
    static allRegistros = [];
    static registros = [];
    static nuevoRegistro = null;
    static show = false;
    static setFecha = null;
    static setHora = null;
    static setValores = null;
    static sCells = [];
    static sRowsHeaders = [];
    static sColumns = [];
    static sRows = [];
    static validarRegistro() {}
    static iniciarRegistro() {
        PrescripcionesUci.nuevoRegistro = new Prescripcion();
    }
    static agregarRegistro() {
        if (PrescripcionesUci.allRegistros.length == 0) {
            PrescripcionesUci.nuevoRegistro.nro = 1;
            PrescripcionesUci.allRegistros.push(PrescripcionesUci.nuevoRegistro);
        } else {
            PrescripcionesUci.nuevoRegistro.nro = (PrescripcionesUci.allRegistros[PrescripcionesUci.allRegistros.reverse().length - 1].nro + 1);
            PrescripcionesUci.allRegistros.push(PrescripcionesUci.nuevoRegistro);
        }
    }
    static verRegistro(registro) {
        registro.editar = true;
        PrescripcionesUci.nuevoRegistro = registro;
    }
    static editarRegistro() {
        PrescripcionesUci.nuevoRegistro.editar = null;
        PrescripcionesUci.allRegistros.map((_v, _i) => {
            if (_v.nro == PrescripcionesUci.nuevoRegistro.nro) {
                PrescripcionesUci.allRegistros[_i] = PrescripcionesUci.nuevoRegistro;
            }
        });

    }
    static eliminarRegistro(obj) {


        let hash = {};
        let res = [];
        let _arr = [];
        let result = [];
        let resultNro = [];

        PrescripcionesUci.allRegistros.map((_v, _i) => {
            if (_v.nro !== obj.nro) {
                res.push(_v);
            }
        });

        result = res.sort((a, b) => b.nro - a.nro);
        // Quitar duplicados
        resultNro = result.filter(o => hash[o.nro] ? false : hash[o.nro] = true);

        _arr = resultNro.sort((a, b) => a.nro - b.nro);

        PrescripcionesUci.allRegistros = _arr;

    }
    static filterHorarios() {

        let horarios = [];
        let horariosOrdenados = [];
        let registros = PrescripcionesUci.allRegistros;


        if (registros.length > 0) {
            for (let index = 0; index < registros.length; index++) {
                if (registros[index].status == 1) {
                    horarios.push({
                        'fechaHora': moment(registros[index].timestamp, 'DD-MM-YYYY HH:mm').format('DD-MM-YYYY') + ' ' + registros[index].hora,
                        'hora': registros[index].hora,
                    });
                }

            }

            horariosOrdenados = horarios.sort((a, b) => moment(a.fechaHora, 'DD-MM-YYYY HH:mm').unix() - moment(b.fechaHora, 'DD-MM-YYYY HH:mm').unix());

            console.log(2222, horariosOrdenados)



            let _hoy = moment().format('DD-MM-YYYY');
            let _mana = moment(_hoy, 'DD-MM-YYYY').add(1, 'days').format('DD-MM-YYYY');

            let __startTime = moment(_hoy + " 07:00", 'DD-MM-YYYY HH:mm').format('YYYY-MM-DDTHH:mm');
            let __endTime = moment(_mana + " 08:00", 'DD-MM-YYYY HH:mm').format('YYYY-MM-DDTHH:mm');

            let __duration = moment.duration(moment(__endTime).diff(__startTime));
            let __hours = __duration.asHours();

            for (let i = 0; __hours > i; i++) {
                let fechaHora = moment(__startTime).add(i, 'hours').format('DD-MM-YYYY HH:mm');
                let hora = moment(__startTime).add(i, 'hours').format('HH:mm');
                PrescripcionesUci.sColumns.push({
                    fechaHora: fechaHora,
                    title: hora,
                });
            }
        }


    }
    static validarStatus(data, timestamp) {




        let _p = PrescripcionesUci.allRegistros.filter(v => v.prescripcion == data.prescripcion && v.velocidadInfusion == '' && moment(v.timestamp, 'DD-MM-YYYY HH:mm').unix() >= moment(timestamp, 'DD-MM-YYYY HH:mm').unix() && moment(v.timestamp, 'DD-MM-YYYY HH:mm').unix() < moment(timestamp, 'DD-MM-YYYY HH:mm').add(1, 'hours').unix());
        return _p[0];

    }
    static validarDeshacer(data, timestamp = '') {

        let _p = PrescripcionesUci.allRegistros.filter(v => v.prescripcion == data.prescripcion && v.status == 5);
        return _p[0];

    }



    static comprobarFrecuencia(data, horario, fechaHora) {


        let _h = moment.duration(horario).asHours();
        let _ho = moment.duration(data.hora).asHours();
        let fechaHorarioUnix = moment(fechaHora, 'DD-MM-YYYY HH:mm').unix();
        let fechaPresUnix = moment(moment(data.timestamp, 'DD-MM-YYYY HH:mm').format('DD-MM-YYYY') + ' ' + data.horaPres, 'DD-MM-YYYY HH:mm').unix();
        let fechaPresUnixPasado = moment(moment().format('DD-MM-YYYY') + ' ' + '10:00', 'DD-MM-YYYY HH:mm').unix();
        let fechaPres = moment(moment(data.timestamp, 'DD-MM-YYYY HH:mm').format('DD-MM-YYYY') + ' ' + data.horaPres, 'DD-MM-YYYY HH:mm');

        // Es de hoy
        if (data.frecuencia !== '0' && moment(data.timestamp, 'DD-MM-YYYY HH:mm').format('DD-MM-YYYY') == moment().format('DD-MM-YYYY')) {

            if (fechaHorarioUnix >= fechaPresUnix && (_h - _ho) % data.frecuencia == 0) {
                return true;
            } else {
                return false;
            }

        } else if (data.frecuencia !== '0' && moment(data.timestamp, 'DD-MM-YYYY HH:mm').format('DD-MM-YYYY') != moment().format('DD-MM-YYYY')) {

            if (fechaHorarioUnix <= fechaPresUnixPasado && (_h - _ho) % data.frecuencia == 0) {
                return true;
            } else {
                return false;
            }

        } else {
            return false;
        }



    }


    static filterRegistros() {

        let result = [];
        let resultId = [];
        let resultNro = [];
        let _arr = [];
        let hash = {};
        let columnas = [];
        let filas = [];
        let valores = [];
        let r = [];

        result = PrescripcionesUci.allRegistros;

        r = result.sort((a, b) => b.nro - a.nro);
        // Quitar duplicados
        resultNro = r.filter(o => hash[o.nro] ? false : hash[o.nro] = true).sort((a, b) => a.nro - b.nro);
        // Quitar duplicados
        // resultId = resultNro.filter(o => hash[o.id] ? false : hash[o.id] = true);
        // Solo obtener prescripciones
        resultId = resultNro.filter(o => o.status == 1);

        console.log(777, resultId)

        PrescripcionesUci.registros = resultId;

        PrescripcionesUci.setTableRegistros();

    }

    static extraerInfusiones(data) {
        let iText = '';
        let infusiones = [];
        infusiones = PrescripcionesUci.allRegistros.filter(o => o.prescripcion == data.prescripcion && o.velocidadInfusion != undefined && o.velocidadInfusion != '' && o.status == 2);

        if (infusiones.length > 0) {
            for (let index = 0; index < infusiones.length; index++) {
                const element = infusiones[index];
                let _button = '<i id="velocidadInfusion_' + index + '" class="fas fa-times-circle tx-danger"></i>';
                iText += 'Velocidad: ' + element.velocidadInfusion + ' ' + element.unidadMedida + ' Fecha: ' + element.timestamp + ' Usuario: ' + element.usuarioTurno + ' ' + _button + '</br>';

            }
        }


        return iText;

    }

    static addEventoEliminarInfusion(data) {

        let infusiones = [];
        infusiones = PrescripcionesUci.allRegistros.filter(o => o.prescripcion == data.prescripcion && o.velocidadInfusion != undefined && o.velocidadInfusion != '' && o.status == 2);
        if (infusiones.length > 0) {
            for (let index = 0; index < infusiones.length; index++) {
                const element = infusiones[index];
                document.getElementById("velocidadInfusion_" + index).onclick = function() { PrescripcionesUci.deshacerVelocidadInfusion(element); };
            }
        }

    }

    static extraerAdministraciones(data) {
        let iText = '';
        let infusiones = [];
        infusiones = PrescripcionesUci.allRegistros.filter(o => o.prescripcion == data.prescripcion && o.status != 4 && o.status > 1 && o.velocidadInfusion == '');

        if (infusiones.length > 0) {
            for (let index = 0; index < infusiones.length; index++) {



                const element = infusiones[index];

                if (element.status == '2') {
                    element.statusLabel = 'Administrado';
                }

                if (element.status == '3') {
                    element.statusLabel = 'No Administrado';
                }

                if (element.status == '5') {
                    element.statusLabel = 'Cancelado';
                }

                if (element.status == '2' || element.status == '3' || element.status == '5') {
                    iText += 'Status: ' + element.statusLabel + ' Fecha: ' + element.timestamp + ' Usuario: ' + element.usuarioTurno + '</br>';

                }

            }
        }


        return iText;

    }

    static extraerRevisiones(data) {
        let iText = '';
        let infusiones = [];
        infusiones = PrescripcionesUci.allRegistros.filter(o => o.prescripcion == data.prescripcion && o.status == 4);

        if (infusiones.length > 0) {
            for (let index = 0; index < infusiones.length; index++) {
                const element = infusiones[index];
                iText += 'Fecha: ' + element.timestamp + ' Comentario: ' + element.comentario + ' Usuario: ' + element.usuarioTurno + '</br>';
            }
        }


        return iText;

    }
    static deshacerVelocidadInfusion(_obj) {

        $.confirm({
            title: 'Historial de Infusiones',
            content: '¿Esta Ud. seguro de eliminar este registro?',


        });


    }



    static setTableRegistros() {

        // Extraer prescripciones 

        // Extablecer columnas por horarios
        PrescripcionesUci.sColumns = [];
        PrescripcionesUci.sColumns = [{
                title: "Turno:",
            },
            {
                title: "Order Nro : ",
            },
            {
                title: "Turno: ",
            },
            {
                title: "Tipo:",
            },
            {
                title: "Prescripción:",
            },

        ];
        PrescripcionesUci.filterHorarios();

        // Generar Filas por valores
        PrescripcionesUci.sRows = [];
        PrescripcionesUci.sRows = [{
                mRender: function(data, type, full) {
                    return '';
                },
                visible: false,
                aTargets: [0],
                orderable: true,
            },
            {
                mRender: function(data, type, full) {
                    return '';
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

                                ])

                            ]
                        }
                    });
                },
                width: '15%',
                visible: false,
                aTargets: [2],
                orderable: false,

            },
            {
                mRender: function(data, type, full) {
                    return full.tipo;
                },
                fnCreatedCell: function(nTd, sData, oData, iRow, iCol) {
                    return m.mount(nTd, {
                        view: () => {
                            return [
                                m('div.tx-12.tx-semibold', {
                                    oncreate: (el) => {
                                        let _det = PrescripcionesUci.validarDeshacer(oData);
                                        if (_det !== undefined && _det.status == 5) {

                                            el.dom.parentElement.className = 'tx-12 tx-semibold bg-light op-5';
                                        }


                                    },
                                }, [oData.tipo]),

                            ]
                        }
                    });
                },
                visible: true,
                aTargets: [3],
                orderable: true,

            },
            {
                mRender: function(data, type, full) {
                    return full.prescripcion;
                },
                fnCreatedCell: function(nTd, sData, oData, iRow, iCol) {
                    return m.mount(nTd, {
                        view: () => {
                            return [
                                m('div.tx-12.tx-semibold', {
                                    id: 'PrescripcionUci_' + oData.id,
                                    /*
                                    oncontextmenu: (e) => {
                                        e.preventDefault();

                                        $.confirm({
                                            title: '¿Esta Ud. seguro de eliminar esta prescripción?',
                                            content: '',
                                            buttons: {
                                                SI: {
                                                    btnClass: "btn-success op-8",
                                                    text: 'Sí',
                                                    action: function() {


                                                        console.log('pppp', oData)
                                                            //  PrescripcionesUci.eliminarRegistro(oData);
                                                            //  FecthUci.eliminarSeccion(oData);


                                                        console.log('pppp', oData)
                                                        PrescripcionesUci.nuevoRegistro = oData;
                                                        PrescripcionesUci.nuevoRegistro.timestamp = moment().format('DD-MM-YYYY HH:mm');
                                                        PrescripcionesUci.nuevoRegistro.status = 6;
                                                        PrescripcionesUci.editarRegistro();
                                                        FecthUci.actualizarSeccion(PrescripcionesUci.nuevoRegistro);
                                                        PrescripcionesUci.nuevoRegistro = null;
                                                        PrescripcionesUci.destroyTable();
                                                        PrescripcionesUci.filterRegistros();
                                                        PrescripcionesUci.show = false;
                                                        m.redraw();
                                                        setTimeout(() => {
                                                            PrescripcionesUci.show = true;
                                                            m.redraw();
                                                        }, 100);


                                                    }
                                                },
                                                cancel: {
                                                    btnClass: "btn-danger op-8",
                                                    text: 'Cancelar',
                                                }

                                            }

                                        });


                                    },
                                    */
                                    ondblclick: () => {

                                        if (oData.frecuencia !== '0') {
                                            $.alert({
                                                columnClass: 'col-md-12',
                                                title: 'Detalle de Prescripción',
                                                content: '' +
                                                    '<b>Prescripción:</b> ' + oData.prescripcion + ' <br/>' +
                                                    '<b>Fecha:</b> ' + oData.timestamp + ' <br/>' +
                                                    '<b>Médico:</b> ' + oData.medico + ' <br/>' +
                                                    '<b>Hora Inicio:</b> ' + oData.hora + '<br/>' +
                                                    '<b>Frecuencia:</b> ' + oData.label + '<br/>' +

                                                    '<b>Revisiones o Reaplazamientos::</b>' +
                                                    '<div>' + PrescripcionesUci.extraerRevisiones(oData) + '</div>' +
                                                    '<br/>',
                                                buttons: {

                                                    Ok: {
                                                        btnClass: "btn-light op-8",
                                                        text: 'Ok',
                                                    }

                                                }
                                            });
                                        } else {
                                            $.alert({
                                                columnClass: 'col-md-12',
                                                title: 'Detalle de Prescripción',
                                                content: '' +
                                                    '<b>Prescripción:</b> ' + oData.prescripcion + ' <br/>' +
                                                    '<b>Fecha:</b> ' + oData.timestamp + ' <br/>' +
                                                    '<b>Médico:</b> ' + oData.medico + ' <br/>' +
                                                    '<b>Hora Inicio:</b> ' + oData.hora + '<br/>' +
                                                    '<b>Frecuencia:</b> ' + oData.label + '<br/>' +

                                                    '<b>Historial de Modificaciones:</b>' +
                                                    '<div>' + PrescripcionesUci.extraerAdministraciones(oData) + '</div>' +
                                                    '<br/>',
                                                buttons: {

                                                    Ok: {
                                                        btnClass: "btn-light op-8",
                                                        text: 'Ok',
                                                    }

                                                }

                                            });
                                        }


                                    },
                                    oncreate: (el) => {
                                        let _det = PrescripcionesUci.validarDeshacer(oData);
                                        if (_det !== undefined && _det.status == 5) {

                                            el.dom.parentElement.className = 'tx-12 tx-semibold bg-light op-5';
                                        }
                                        // validar si son de hoy
                                        if (moment(oData.timestamp, 'DD-MM-YYYY HH:mm').format('DD-MM-YYYY') !== moment().format('DD-MM-YYYY')) {
                                            el.dom.parentElement.className = 'tx-12 tx-semibold bg-warning op-8';
                                        }
                                    },
                                }, [oData.prescripcion + ' (' + oData.label + ')']),

                            ]
                        }
                    });
                },
                visible: true,
                aTargets: [4],
                orderable: true,

            },
        ];

        // Filas
        let horas = PrescripcionesUci.sColumns;
        for (let index = 5; index < horas.length; index++) {
            PrescripcionesUci.sRows.push({
                fnCreatedCell: function(nTd, sData, oData, iRow, iCol) {

                    return m.mount(nTd, {
                        view: () => {
                            return [
                                m('div.text-center', {

                                }, [

                                    (PrescripcionesUci.validarStatus(oData, horas[index].fechaHora) != false ? [
                                        m("i.fa.fa-check-square.tx-20", {

                                            oncreate: (el) => {

                                                let _det = undefined;
                                                _det = PrescripcionesUci.validarStatus(oData, horas[index].fechaHora)


                                                if (oData.frecuencia != 0 || _det !== undefined) {
                                                    let _det = undefined;
                                                    _det = PrescripcionesUci.validarStatus(oData, horas[index].fechaHora)

                                                    if (_det !== undefined && _det.status == 2 && oData.frecuencia !== '0') {
                                                        // Administrado
                                                        el.dom.className = "fa fa-check-square tx-20 tx-success";
                                                    } else if (_det !== undefined && _det.status == 2 && oData.frecuencia == '0') {
                                                        // Administrado
                                                        el.dom.className = "fa fa-check-square tx-20 tx-success";
                                                    } else if (_det !== undefined && _det.status == 3) {
                                                        // No Administrado
                                                        el.dom.className = "fa fa-check-square tx-20 tx-danger ";
                                                    } else if (_det !== undefined && _det.status == 5 && oData.frecuencia !== '0') {
                                                        // Deshacer Verificacion
                                                        el.dom.className = "fa fa-check-square tx-20 tx-dark op-2";
                                                    } else if (_det !== undefined && _det.status == 5 && oData.frecuencia == '0') {
                                                        // Deshacer Verificacion
                                                        el.dom.className = "fa fa-check-square tx-20 tx-dark op-2";

                                                    } else {
                                                        let _det = undefined;
                                                        _det = PrescripcionesUci.validarDeshacer(oData, horas[index].fechaHora);
                                                        if (_det !== undefined && _det.status == 5) {
                                                            if (PrescripcionesUci.comprobarFrecuencia(oData, horas[index].title, horas[index].fechaHora) != false) {

                                                                el.dom.className = "fa fa-check-square tx-20 tx-dark op-2";
                                                            } else {
                                                                el.dom.className = "";
                                                            }
                                                        } else {

                                                            if (PrescripcionesUci.comprobarFrecuencia(oData, horas[index].title, horas[index].fechaHora) != false) {



                                                                let __startTime = moment().format('YYYY-MM-DDTHH:mm');
                                                                let __endTime = moment(horas[index].fechaHora, 'DD-MM-YYYY HH:mm').format('YYYY-MM-DDTHH:mm');

                                                                let __duration = moment.duration(moment(__endTime).diff(__startTime));
                                                                let __hours = __duration.asHours();

                                                                if (__hours <= -2) {
                                                                    el.dom.className = "fa fa-check-square tx-20 tx-orange ";
                                                                } else {
                                                                    el.dom.className = "fa fa-check-square tx-20 tx-teal ";
                                                                }




                                                            } else {
                                                                el.dom.className = "";
                                                            }
                                                        }
                                                    }
                                                } else {

                                                    let fechaHorario = moment(horas[index].fechaHora, 'DD-MM-YYYY HH:mm').unix();
                                                    let fechaPres = moment(moment(oData.timestamp, 'DD-MM-YYYY HH:mm').format('DD-MM-YYYY') + ' ' + oData.horaPres, 'DD-MM-YYYY HH:mm').unix();

                                                    if (fechaHorario == fechaPres && oData.label == 'EN ESTE MOMENTO') {


                                                        let __startTime = moment().format('YYYY-MM-DDTHH:mm');
                                                        let __endTime = moment(horas[index].fechaHora, 'DD-MM-YYYY HH:mm').format('YYYY-MM-DDTHH:mm');

                                                        let __duration = moment.duration(moment(__endTime).diff(__startTime));
                                                        let __hours = __duration.asHours();

                                                        if (__hours <= -2) {
                                                            el.dom.className = "fa fa-check-square tx-20 tx-orange ";
                                                        } else {
                                                            el.dom.className = "fa fa-check-square tx-20 tx-teal ";
                                                        }


                                                    } else {
                                                        el.dom.className = "pd-20 tx-20 tx-white";
                                                        el.dom.innerHTML = " ";
                                                    }

                                                }


                                            }
                                        })
                                    ] : []),

                                ])
                            ]
                        }
                    });
                },
                visible: true,
                aTargets: null,
                orderable: true,

            });

        }



        PrescripcionesUci.sRows.map((c, i) => {
            PrescripcionesUci.sRows[i].aTargets = [i];
        });



    }
    static destroyTable() {
        let table = document.getElementById("table-prescripciones");
        // clear first
        if (table != null) {
            $("#table-prescripciones").DataTable().clear().destroy();

        }
    }
    static getRegistros() {
        return PrescripcionesUci.registros;

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

            },
            retrieve: true,
            cache: false,
            destroy: true,
            order: [
                [3, 'asc'],
                [4, 'asc'],

            ],
            pageLength: 100,
            columns: PrescripcionesUci.sColumns,
            aoColumnDefs: PrescripcionesUci.sRows,
            fnRowCallback: function(nRow, aData, iDisplayIndex, iDisplayIndexFull) {

            },
        };
    }



    view() {
        return [
            m("thead.bd.bd-2", {
                    style: { "border-color": "#5173a1" },
                },
                m("tr.tx-uppercase", {
                    style: { "background-color": "#CCCCFF" },
                    onclick: () => {

                        PrescripcionesUci.show = !PrescripcionesUci.show;
                    }

                }, [
                    m("th.tx-semibold[scope='col'][colspan='12']",
                        "PRESCRIPCIONES"
                    ),

                ])
            ),
            m("tbody.bd.bd-2", {
                style: { "border-color": "#5173a1" },
                class: (PrescripcionesUci.show ? '' : 'd-none')
            }, [



                m("tr.bd.bd-2.tx-uppercase", {
                    style: { "background-color": "rgb(238, 249, 200)", "border-color": "#5173a1" },
                    class: (TurnosUci.nuevoTurno !== null && TurnosUci.nuevoTurno.gestion == 1 ? '' : 'd-none'),

                }, [
                    m("th[scope='col'][colspan='6']",
                        "TIPO DE PRESCRIPCION:"
                    ),
                    m("th[scope='col'][colspan='6']",
                        "PRESCRIPCIÓN:"
                    ),


                ]),
                m("tr.bd.bd-2", {
                    style: { "border-color": "#5173a1" },
                    class: (TurnosUci.nuevoTurno !== null && TurnosUci.nuevoTurno.gestion == 1 ? '' : 'd-none'),

                }, [

                    m("td.tx-14.tx-normal.wd-50p[colspan='6']",
                        m('select.tx-semibold', {
                            id: 'sec_PrescripcionesUci',
                            onchange: (e) => {
                                let _id = e.target.options[e.target.selectedIndex].id;
                                let _value = e.target.options[e.target.selectedIndex].value;
                                if (PrescripcionesUci.nuevoRegistro == null) {
                                    PrescripcionesUci.iniciarRegistro();
                                    PrescripcionesUci.nuevoRegistro.id = _id;
                                    PrescripcionesUci.nuevoRegistro.tipo = _value;
                                } else {
                                    PrescripcionesUci.nuevoRegistro.id = _id;
                                    PrescripcionesUci.nuevoRegistro.tipo = _value;
                                }
                            },
                            class: "custom-select",
                            value: (PrescripcionesUci.nuevoRegistro !== null && PrescripcionesUci.nuevoRegistro.tipo !== null ? PrescripcionesUci.nuevoRegistro.tipo : 0),
                        }, m("option[value='0']", 'Seleccione...'), [{
                                id: "Medicacion",
                                label: "MEDICACIÓN"
                            },
                            {
                                id: "TerapiaRespiratoria",
                                label: "TERAPIA RESPIRATORIA"
                            },
                            {
                                id: "BombasInfusion",
                                label: "BOMBAS DE INFUSION"
                            },
                            {
                                id: "Nutricion",
                                label: "NUTRICIÓN"
                            },

                        ].map(x =>
                            m('option[id="' + x.id + '"][value="' + x.id + '"]', x.label)
                        ))
                    ),
                    m("td.tx-14.tx-normal.wd-50p[colspan='6']",
                        (PrescripcionesUci.nuevoRegistro !== null ? [
                            m('div.d-flex', [
                                m("input", {
                                    id: "pres" + PrescripcionesUci.nuevoRegistro.id,
                                    class: "form-control tx-semibold tx-14",
                                    type: "text",
                                    placeholder: "...",
                                    oncreate: (el) => {

                                        if (PrescripcionesUci.nuevoRegistro.prescripcion != undefined) {
                                            el.dom.value = PrescripcionesUci.nuevoRegistro.prescripcion;
                                        }
                                    },

                                    oninput: (e) => {
                                        PrescripcionesUci.nuevoRegistro.prescripcion = (e.target.value.length !== 0 ? e.target.value : null);
                                    },
                                    value: PrescripcionesUci.nuevoRegistro.prescripcion
                                })
                            ]),

                        ] : [])
                    ),

                ]),
                m("tr.bd.bd-2.tx-uppercase", {
                    style: { "background-color": "rgb(238, 249, 200)", "border-color": "#5173a1" },
                    class: (TurnosUci.nuevoTurno !== null && TurnosUci.nuevoTurno.gestion == 1 ? '' : 'd-none'),

                }, [
                    m("th[scope='col'][colspan='6']",
                        "HORA / FRECUENCIA:"
                    ),
                    m("th[scope='col'][colspan='6']",
                        "MÉDICO:"
                    ),


                ]),
                m("tr.bd.bd-2", {
                    style: { "border-color": "#5173a1" },
                    class: (TurnosUci.nuevoTurno !== null && TurnosUci.nuevoTurno.gestion == 1 ? '' : 'd-none'),
                }, [
                    m("td.tx-14.tx-normal.wd-50p[colspan='6']",

                        (PrescripcionesUci.nuevoRegistro !== null ? [
                            m('div.d-flex', [


                                m("input.form-control[type='text'][placeholder='HH:mm']", {
                                    id: "horaPres" + PrescripcionesUci.nuevoRegistro.id,
                                    oncreate: (el) => {
                                        if (PrescripcionesUci.nuevoRegistro.hora != undefined) {
                                            el.dom.value = PrescripcionesUci.nuevoRegistro.hora;
                                        }

                                        setTimeout(() => {

                                            new Cleave("#horaPres" + PrescripcionesUci.nuevoRegistro.id, {
                                                time: true,
                                                timePattern: ['h', 'm']
                                            });

                                        }, 50);


                                    },
                                    oninput: (e) => {
                                        setTimeout(() => {
                                            if (PrescripcionesUci.nuevoRegistro.editar == null) {
                                                PrescripcionesUci.nuevoRegistro.horaPres = e.target.value;
                                                PrescripcionesUci.nuevoRegistro.hora = e.target.value;
                                            } else {
                                                if (PrescripcionesUci.nuevoRegistro.frecuencia == '0') {
                                                    PrescripcionesUci.nuevoRegistro.horaPres = e.target.value;
                                                    PrescripcionesUci.nuevoRegistro.hora = e.target.value;
                                                } else {
                                                    PrescripcionesUci.nuevoRegistro.hora = e.target.value;
                                                }
                                            }
                                        }, 50);
                                    },
                                }),
                                m('select.tx-semibold', {
                                    id: 'sec_FrecuenciaPres',
                                    onchange: (e) => {
                                        let _label = e.target.options[e.target.selectedIndex].label;
                                        let _value = e.target.options[e.target.selectedIndex].value;
                                        PrescripcionesUci.nuevoRegistro.frecuencia = _value;
                                        PrescripcionesUci.nuevoRegistro.label = _label;
                                    },
                                    class: "custom-select",
                                    value: (PrescripcionesUci.nuevoRegistro !== null && PrescripcionesUci.nuevoRegistro.frecuencia !== null ? PrescripcionesUci.nuevoRegistro.frecuencia : 0),
                                }, m("option[value='0']", 'Seleccione...'), [{
                                        id: 1,
                                        value: 1,
                                        label: "CADA HORA"
                                    },
                                    {
                                        id: 2,
                                        value: 2,
                                        label: "CADA 2 HORAS"
                                    },
                                    {
                                        id: 3,
                                        value: 4,
                                        label: "CADA 4 HORAS"
                                    },
                                    {
                                        id: 4,
                                        value: 6,
                                        label: "CADA 6 HORAS"
                                    },
                                    {
                                        id: 5,
                                        value: 8,
                                        label: "CADA 8 HORAS"
                                    },
                                    {
                                        id: 6,
                                        value: 12,
                                        label: "CADA 12 HORAS"
                                    },
                                    {
                                        id: 7,
                                        value: 23,
                                        label: "CADA DÍA"
                                    },
                                    {
                                        id: 8,
                                        value: 0,
                                        label: "POR RAZONES NECESARIAS"
                                    },
                                    {
                                        id: 9,
                                        value: 0,
                                        label: "CONTINUO"
                                    },
                                    {
                                        id: 10,
                                        value: 0,
                                        label: "EN ESTE MOMENTO"
                                    },
                                ].map(x =>
                                    m('option[id="' + x.id + '"][value="' + x.value + '"][label="' + x.label + '"]', x.label)
                                )),

                            ]),
                        ] : [])
                    ),
                    m("td.tx-14.tx-normal.wd-50p[colspan='6']",
                        (PrescripcionesUci.nuevoRegistro !== null ? [
                            m('div.d-flex', [
                                m("input", {
                                    id: "medicoPress" + PrescripcionesUci.nuevoRegistro.id,
                                    class: "form-control tx-semibold tx-14",
                                    type: "text",
                                    placeholder: "...",
                                    oncreate: (el) => {

                                        if (PrescripcionesUci.nuevoRegistro.medico != undefined) {
                                            el.dom.value = PrescripcionesUci.nuevoRegistro.medico;
                                        }
                                    },
                                    onkeypress: (e) => {
                                        if (e.keyCode == 13) {
                                            PrescripcionesUci.nuevoRegistro.numeroTurno = PacientesUCI.numeroTurno;
                                            PrescripcionesUci.nuevoRegistro.fechaHoraTurno = PacientesUCI.fechaHoraTurno;
                                            PrescripcionesUci.nuevoRegistro.usuarioTurno = PacientesUCI.usuarioTurno;
                                            if (PrescripcionesUci.nuevoRegistro.editar == null) {
                                                console.log(8787, PrescripcionesUci.nuevoRegistro)
                                                setTimeout(() => {
                                                    PrescripcionesUci.nuevoRegistro.timestamp = moment().format('DD-MM-YYYY HH:mm');
                                                    PrescripcionesUci.nuevoRegistro.status = 1;
                                                    PrescripcionesUci.agregarRegistro();
                                                    FecthUci.registrarSeccion(PrescripcionesUci.nuevoRegistro);
                                                    PrescripcionesUci.nuevoRegistro = null;
                                                    PrescripcionesUci.destroyTable();
                                                    PrescripcionesUci.filterRegistros();
                                                    PrescripcionesUci.show = false;
                                                    m.redraw();
                                                    setTimeout(() => {
                                                        PrescripcionesUci.show = true;
                                                        m.redraw();
                                                    }, 100);
                                                }, 100);

                                            } else {

                                                setTimeout(() => {
                                                    PrescripcionesUci.nuevoRegistro.timestamp = moment().format('DD-MM-YYYY HH:mm');
                                                    PrescripcionesUci.nuevoRegistro.status = 1;
                                                    PrescripcionesUci.editarRegistro();
                                                    FecthUci.actualizarSeccion(PrescripcionesUci.nuevoRegistro);
                                                    PrescripcionesUci.nuevoRegistro = null;
                                                    PrescripcionesUci.destroyTable();
                                                    PrescripcionesUci.filterRegistros();
                                                    PrescripcionesUci.show = false;
                                                    m.redraw();
                                                    setTimeout(() => {
                                                        PrescripcionesUci.show = true;
                                                        m.redraw();
                                                    }, 100);
                                                }, 100);

                                            }
                                        }
                                    },
                                    oninput: (e) => {
                                        PrescripcionesUci.nuevoRegistro.medico = (e.target.value.length !== 0 ? e.target.value : null);
                                    },
                                    value: PrescripcionesUci.nuevoRegistro.medico
                                })

                            ]),
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
                    m("td[colspan='12'][id='registrosPrescripcionesUci']", { style: "max-width: 150px;overflow: auto;" },
                        (PrescripcionesUci.show != false ? [PacientesUCI.vTable('table-prescripciones', PrescripcionesUci.getRegistros(), PrescripcionesUci.arqTable())] : [])
                    ),
                ]),
            ]),
        ]
    }
}



export default PrescripcionesUci;