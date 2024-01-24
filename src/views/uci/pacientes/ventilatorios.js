import m from "mithril";
import App from "../../../models/App";
import Loader from "../../utils/loader";
import Errors from "../../utils/errors";

class Ventilatorio {
    id = null;
    ventilatorio = null;
    condicion = null;
    hora = null;
    constructor() {
        this.id = this.id;
        this.ventilatorio = this.ventilatorio;
        this.condicion = this.condicion;
        this.hora = this.hora;
    }
}


class VentilatoriosUci {
    static registros = [];
    static nuevoRegistro = null;
    static show = false;
    static validarRegistro() {

    }
    static iniciarRegistro() {
        VentilatoriosUci.nuevoRegistro = new Ventilatorio();
    }
    static agregarRegistro() {
        VentilatoriosUci.registros.push(VentilatoriosUci.nuevoRegistro);
    }
    static eliminarRegistro() {

    }
    static getRegistros() {
        return VentilatoriosUci.registros;
    }
}

export default VentilatoriosUci;