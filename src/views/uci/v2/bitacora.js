import m from "mithril";
import App from "../../../models/App";
import HeaderPrivate from "../../layout/headerPrivate";
import Loader from "../../utils/loader";
import Errors from "../../utils/errors";
import Table from "../../utils/table";
import { Stopwatch } from "../../utils/stopWatch";
import ApiHTTP from "../../../models/ApiHTTP";
import ErrorMetroplus from "../../../models/Error";
import { TurnosUCI, Turno } from "./turnosUCI";

// BitacoraUCI UCI v2

class BitacoraUCI extends App {

    loader = false;
    error = false;
    message = '';
    turnos = null;
    nuevoTurno = null;
    numeroHistoriaClinica = null;
    numeroAtencion = null;
    numeroTurno = null;
    usuarioTurno = null;

    constructor(_data) {

        super();
        App.setTitle("Bitácora U.C.I. v2");

    }

    oninit() {
        this.message = 'Preparando todo. Un momento por favor.';
    }

    async oncreate(_data) {

        // Validar Parametros para el Inicio del Registro
        await new Promise(r => setTimeout(r, 250));
        this.valParams(_data.attrs.numeroHistoriaClinica, _data.attrs.numeroAtencion, _data.attrs.numeroTurno, _data.attrs.usuario)

    }

    async valParams(numeroHistoriaClinica, numeroAtencion, numeroTurno, usuario) {

        try {

            await new Promise(r => setTimeout(r, 250));
            if (numeroHistoriaClinica == undefined) {
                throw new ErrorMetroplus("Error HTTP", { cause: 'Número de Historia Clinica no existe.' });
            }

            this.message = 'Número de Historia Clinica validado.';
            m.redraw();


            await new Promise(r => setTimeout(r, 250));
            if (numeroAtencion == undefined) {
                throw new ErrorMetroplus("Error HTTP", { cause: 'Número de Atención no existe.' });
            }

            this.message = 'Número de Atención validado.';
            m.redraw();

            await new Promise(r => setTimeout(r, 250));
            if (numeroTurno == undefined) {
                throw new ErrorMetroplus("Error HTTP", { cause: 'Número de Turno no existe.' });
            }

            this.message = 'Número de Turno validado.';
            m.redraw();

            await new Promise(r => setTimeout(r, 250));
            if (usuario == undefined) {
                throw new ErrorMetroplus("Error HTTP", { cause: 'Usuario de Turno no existe.' });
            }

            this.message = 'Usuario de Turno validado.';
            m.redraw();

            await new Promise(r => setTimeout(r, 250));
            this.message = 'Todo listo. Bienvenido.';
            m.redraw();

            await new Promise(r => setTimeout(r, 250));
            this.loader = true;
            this.error = false;
            this.numeroHistoriaClinica = numeroHistoriaClinica;
            this.numeroAtencion = numeroAtencion;
            this.numeroTurno = numeroTurno;
            this.usuarioTurno = usuario;
            m.redraw();


        } catch (error) {

            this.loader = true;
            this.error = true;
            this.message = error.cause;
            m.redraw();

        }

    }



    view(_data) {
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
                                (this.loader == true && this.error == false && this.turnos !== null ? [
                                    m("td[colspan='6']",),
                                    m("td[colspan='6']",
                                        m(Turno, {
                                            numeroHistoriaClinica: this.numeroHistoriaClinica,
                                            numeroAtencion: this.numeroAtencion,
                                            usuarioTurno: this.usuarioTurno,
                                            oncreate: (_data) => {
                                                this.nuevoTurno = _data.state;
                                                console.log(77, this)


                                            }
                                        }),
                                        m("button.btn.btn-xs.btn-secondary.tx-semibold.tx-14[type='button']", {
                                            onclick: () => {

                                            }
                                        }, "Ver Historial")
                                    ),
                                ] : [])



                            ]),
                            m("tr.bd.bd-2.text-right", {
                                style: { "border-color": "#5173a1" }
                            }, [

                                m("td[colspan='12']",
                                    (this.loader == false && this.error == false ? [
                                        this.vSys()
                                    ] : this.loader == true && this.error == true ? [
                                        this.vError()
                                    ] : this.loader == true && this.error == false ? [
                                        m(TurnosUCI, {
                                            numeroHistoriaClinica: this.numeroHistoriaClinica,
                                            numeroAtencion: this.numeroAtencion,
                                            usuarioTurno: this.usuarioTurno,
                                            oncreate: (_data) => {
                                                this.turnos = _data.state;


                                            }
                                        })
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
                    this.message
                )
            ])

        ]

    }

    vSys() {
        return [
            m('div.pd-10.text-center.mg-t-250', [

                m(".spinner-grow[role='status']",
                    m("span.sr-only",
                        "Loading..."
                    )
                ),
                m('div.text-center.tx-semibold.pd-5.mg-b-250', [

                    m("p.tx-color-03.mg-0",
                        this.message
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