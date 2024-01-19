import m from "mithril";
import App from "../../../models/App";
import Loader from "../../utils/loader";
import Errors from "../../utils/errors";

class Via {
    id = null;
    via = null;
    ubicacion = null;
    tipo = null;
    inicio = null;
    retiro = null;
    curacion = null;
    condicion = null;
    observacion = null;
    constructor() {
        this.id = this.id;
        this.via = this.via;
        this.ubicacion = this.ubicacion;
        this.tipo = this.tipo;
        this.inicio = this.inicio;
        this.retiro = this.retiro;
        this.curacion = this.curacion;
        this.condicion = this.condicion;
        this.observacion = this.observacion;
    }
}


class ViasUci {
    static registros = [];
    static nuevoRegistro = null;
    static show = true;
    static validarRegistro() {

    }
    static iniciarRegistro() {
        ViasUci.nuevoRegistro = new Via();
    }
    static agregarRegistro() {
        ViasUci.registros.push(ViasUci.nuevoRegistro);
    }
    static eliminarRegistro() {

    }
    static getRegistros() {
        return ViasUci.registros;
    }
}

export default ViasUci;