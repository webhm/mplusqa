import m from "mithril";

class Errors {

    type = 0;
    error = null;

    constructor(_data) {
        this.type = _data.attrs.type;
        this.error = _data.attrs.error;
    }

    setFethError(message) {
        return [
            m("p.tx-danger.pd-0.mg-b-2.mg-t-5", [
                m('i.fas.fa-exclamation-triangle'),
                " Error: "
            ]),
            m("p.tx-justify.tx-danger.tx-color-03.mg-b-30",
                "Lo sentimos, no pudimos completar con éxito esta petición. Recarga esta página nuevamente. Si el inconveniente persiste comunícate a nuestra Mesa de Ayuda CONCAS 02 399 8000 Ext: 2020.",
                m('br'),
                "Descripción: " + message
            )
        ]
    }

    setLogicError(_data) {
        return [
            m("p.tx-danger.pd-0.mg-b-2", [
                m('i.fas.fa-exclamation-triangle'),
                " Error:"
            ]),
            m("p.tx-danger.tx-color-03.mg-b-30",
                "Lo sentimos, no pudimos completar con éxito esta petición. Recarga esta página nuevamente. Si el inconveniente persiste comunícate a nuestra Mesa de Ayuda CONCAS 02 399 8000 Ext: 2020.",
            )
        ]
    }

    setCustomError(_data) {
        return [
            m("p.tx-danger.pd-0.mg-b-2", [
                m('i.fas.fa-exclamation-triangle'),
                " Error:"
            ]),
            m("p.tx-danger.tx-color-03.mg-b-30",
                _data.message
            )
        ]
    }


    view() {
        if (this.type == 0) {
            return [
                this.setLogicError(this.error)
            ];
        }
        if (this.type == 1) {
            return [
                this.setFethError(this.error)
            ];
        }
        if (this.type == 2) {
            return [
                this.setCustomError(this.error)
            ];
        }

    }

}

export default Errors;