import m from "mithril";
import App from "../../../models/App";
import Loader from "../../utils/loader";
import Errors from "../../utils/errors";

class Ventilatorio {
    id = null;
    ventilatorio = null;
    ubicacion = null;
    tipo = null;
    inicio = null;
    retiro = null;
    curacion = null;
    condicion = null;
    observacion = null;
    constructor() {
        this.id = this.id;
        this.ventilatorio = this.ventilatorio;
        this.ubicacion = this.ubicacion;
        this.tipo = this.tipo;
        this.inicio = this.inicio;
        this.retiro = this.retiro;
        this.curacion = this.curacion;
        this.condicion = this.condicion;
        this.observacion = this.observacion;
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