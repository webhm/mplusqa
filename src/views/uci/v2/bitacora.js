import m from "mithril";
import App from "../../../models/App";
import HeaderPrivate from "../../layout/headerPrivate";
import Loader from "../../utils/loader";
import Errors from "../../utils/errors";
import Table from "../../utils/table";
import { Stopwatch } from "../../utils/stopWatch";
import ApiHTTP from "../../../models/ApiHTTP";
import ErrorMetroplus from "../../../models/Error";

// BitacoraUCI UCI v2

class BitacoraUCI extends App {

    loaderSys = false;
    errorSys = false;
    messageSys = '';


    constructor(_data) {

        super();
        App.setTitle("Bitácora U.C.I. v2");

    }

    oninit() {
        this.messageSys = 'Preparando todo. Verificando parámetros. Un momento por favor.';
        this.view = this.vMain;
    }

    oncreate(_data) {

        // Validar Parametros para el Inicio del Registro
        setTimeout(() => {
            this.valParams(_data.attrs.numeroHistoriaClinica, _data.attrs.numeroAtencion, _data.attrs.numeroTurno, _data.attrs.usuarioTurno)
        }, 300);
    }

    valParams(numeroHistoriaClinica, numeroAtencion, numeroTurno, usuarioTurno) {

        try {


            if (numeroHistoriaClinica == undefined) {
                throw new ErrorMetroplus("Error HTTP", { cause: 'Número de Historia Clinica no existe.' });
            }

            this.messageSys = 'Número de Historia Clinica validada';
            m.redraw();


            if (numeroAtencion == undefined) {
                throw new ErrorMetroplus("Error HTTP", { cause: 'Número de Atención no existe.' });
            }

            this.messageSys = 'Número de Atención validada';
            m.redraw();

            this.messageSys = 'todo bien';

            this.loaderSys = true;
            this.errorSys = false;
            m.redraw();


        } catch (error) {

            this.errorSys = true;
            this.messageSys = error.cause;
            m.redraw();

        }

    }

    vMain() {
        return [
            m("div.content.content-components", {
                style: { "margin-right": "0px", "margin-left": "0px", "margin-top": "0px" }
            },
                m("div.container.mg-l-0.mg-r-0", {
                    style: { "max-width": "100%" }
                }, [
                    m("table.table.table-bordered.table-sm.tx-14", [
                        m("thead.bd.bd-2", {
                            style: { "border-color": "#5173a1" }
                        },

                            m("tr.tx-uppercase", {
                                style: { "background-color": "#CCCCFF", }
                            }, [
                                m("th[scope='col'][colspan='12']",
                                    "Bitácora U.C.I:"
                                ),

                            ])
                        ),
                        m('tbody.bd.bd-2', {
                            style: { "border-color": "#5173a1" }
                        }, [

                            m("tr.bd.bd-2.text-right", {
                                style: { "border-color": "#5173a1" }
                            }, [
                                m("td[colspan='12']",
                                    (this.loaderSys == false && this.errorSys == false ? [
                                        this.vSys()
                                    ] : this.loaderSys == false && this.errorSys == true ? [
                                        this.vError()
                                    ] : this.loaderSys == true && this.errorSys == false ? [
                                        m('div.text-center.tx-semibold.pd-5', [
                                            m("p.tx-color-03",
                                                this.messageSys
                                            ),
                                            m("p.tx-color-03.pd-0.mg-b-2", [
                                                App.title
                                            ]),
                                        ])
                                    ] : [])
                                ),

                            ]),



                        ]),
                    ]),

                ])
            ),
        ];
    }

    vError() {
        return [
            m('div.text-left.tx-semibold.pd-5', [
                m("p.tx-danger.pd-0.mg-b-2", [
                    m('i.fas.fa-exclamation-triangle'),
                    " Error:"
                ]),
                m("p.tx-danger.tx-color-03.mg-b-30",
                    this.messageSys
                )
            ])

        ]

    }

    vSys() {
        return [
            m('div.pd-10.text-center', [
                m(Loader),
                m('div.text-center.tx-semibold.pd-5', [

                    m("p.tx-color-03.mg-b-30",
                        this.messageSys
                    ),
                    m("p.tx-color-03.pd-0.mg-b-2", [
                        App.title
                    ]),
                ])
            ])
        ]


    }




}


export default BitacoraUCI;