import m from "mithril";
import App from "../../../models/App";
import Loader from "../../utils/loader";
import Errors from "../../utils/errors";

class Ventilacion {
    id = null;
    ventilacion = null;
    ubicacion = null;
    tipo = null;
    inicio = null;
    retiro = null;
    curacion = null;
    condicion = null;
    observacion = null;
    constructor() {
        this.id = this.id;
        this.ventilacion = this.ventilacion;
        this.ubicacion = this.ubicacion;
        this.tipo = this.tipo;
        this.inicio = this.inicio;
        this.retiro = this.retiro;
        this.curacion = this.curacion;
        this.condicion = this.condicion;
        this.observacion = this.observacion;
    }
}


class VentilcacionUci {
    static registros = [];
    static nuevoRegistro = null;
    static show = false;
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