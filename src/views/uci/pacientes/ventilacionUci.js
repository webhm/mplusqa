import m from "mithril";
import App from "../../../models/App";
import Loader from "../../utils/loader";
import Errors from "../../utils/errors";

class Ventilacion {
    id = null;
    ventilacion = null;
    am = null;
    pm = null;
    hs = null;
    observacion = null;
    constructor() {
        this.id = this.id;
        this.ventilacion = this.ventilacion;
        this.am = this.am;
        this.pm = this.pm;
        this.hs = this.hs;
        this.observacion = this.observacion;
    }
}


class VentilcacionUci {
    static registros = [];
    static nuevoRegistro = null;
    static show = true;
    static validarRegistro() {

    }
    static iniciarRegistro() {
        VentilcacionUci.nuevoRegistro = new Ventilacion();
    }
    static agregarRegistro() {
        VentilcacionUci.registros.push(VentilcacionUci.nuevoRegistro);
    }
    static eliminarRegistro() {

    }
    static getRegistros() {
        return VentilcacionUci.registros;
    }
}

export default VentilcacionUci;