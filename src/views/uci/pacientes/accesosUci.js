import m from "mithril";
import App from "../../../models/App";
import Loader from "../../utils/loader";
import Errors from "../../utils/errors";

class Acceso {
    id = null;
    acceso = null;
    ubicacion = null;
    tipo = null;
    inicio = null;
    retiro = null;
    curacion = null;
    condicion = null;
    observacion = null;
    constructor() {
        this.id = this.id;
        this.acceso = this.acceso;
        this.ubicacion = this.ubicacion;
        this.tipo = this.tipo;
        this.inicio = this.inicio;
        this.retiro = this.retiro;
        this.curacion = this.curacion;
        this.condicion = this.condicion;
        this.observacion = this.observacion;
    }
}


class AccesosUci {
    static registros = [];
    static nuevoRegistro = null;
    static show = true;
    static validarRegistro() {

    }
    static iniciarRegistro() {
        AccesosUci.nuevoRegistro = new Acceso();
    }
    static agregarRegistro() {
        AccesosUci.registros.push(AccesosUci.nuevoRegistro);
    }
    static eliminarRegistro() {

    }
    static getRegistros() {
        return AccesosUci.registros;
    }
}

export default AccesosUci;